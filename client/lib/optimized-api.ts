import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Extend axios config to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

// Create optimized axios instance with interceptors
const createOptimizedAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for performance optimization
  instance.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {
      // Add request timestamp for performance tracking
      config.metadata = { startTime: Date.now() };
      
      // Add authorization token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request ID for tracking
      config.headers['X-Request-ID'] = generateRequestId();

      // Compress request data for large payloads
      if (config.data && JSON.stringify(config.data).length > 1024) {
        config.headers['Accept-Encoding'] = 'gzip, deflate, br';
      }

      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling and performance tracking
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Calculate response time
      const config = response.config as ExtendedAxiosRequestConfig;
      const responseTime = config.metadata?.startTime ? Date.now() - config.metadata.startTime : 0;
      
      // Log performance in development
      if (import.meta.env.DEV) {
        console.log(`🚀 API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${responseTime}ms`);
      }

      // Warn on slow responses
      if (responseTime > 5000) {
        console.warn(`🐌 Slow API response: ${response.config.url} took ${responseTime}ms`);
      }

      return response;
    },
    (error: AxiosError) => {
      const config = error.config as ExtendedAxiosRequestConfig;
      const responseTime = config?.metadata?.startTime 
        ? Date.now() - config.metadata.startTime 
        : 0;

      // Enhanced error handling
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            // Handle unauthorized - redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
            break;
          case 403:
            console.error('Access forbidden:', data);
            break;
          case 404:
            console.error('Resource not found:', error.config?.url);
            break;
          case 429:
            console.warn('Rate limit exceeded - retrying...');
            // Implement exponential backoff retry logic here
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            console.error('Server error:', status, data);
            break;
          default:
            console.error('API Error:', status, data);
        }

        // Log error with performance data
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${status} (${responseTime}ms)`);
      } else if (error.request) {
        // Network error
        console.error('Network error:', error.message);
      } else {
        // Other error
        console.error('Request setup error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Generate unique request ID
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create the optimized API instance
export const api = createOptimizedAxios();

// Helper functions for common API patterns
export const apiHelpers = {
  // GET with caching
  getCached: async <T>(url: string, cacheKey?: string, cacheDuration = 5 * 60 * 1000): Promise<T> => {
    const key = cacheKey || url;
    const cached = sessionStorage.getItem(`api_cache_${key}`);
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheDuration) {
        return data;
      }
    }

    const response = await api.get<T>(url);
    
    // Cache successful responses
    sessionStorage.setItem(`api_cache_${key}`, JSON.stringify({
      data: response.data,
      timestamp: Date.now(),
    }));

    return response.data;
  },

  // POST with retry logic
  postWithRetry: async <T>(url: string, data: any, maxRetries = 3): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await api.post<T>(url, data);
        return response.data;
      } catch (error) {
        lastError = error;
        
        // Don't retry client errors (4xx)
        if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
          throw error;
        }

        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          console.warn(`Retry attempt ${attempt} after ${delay}ms for ${url}`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  },

  // Batch requests
  batch: async <T>(requests: Array<() => Promise<T>>): Promise<T[]> => {
    // Process requests in chunks to avoid overwhelming the server
    const CHUNK_SIZE = 5;
    const results: T[] = [];
    
    for (let i = 0; i < requests.length; i += CHUNK_SIZE) {
      const chunk = requests.slice(i, i + CHUNK_SIZE);
      const chunkPromises = chunk.map(request => request());
      const chunkResults = await Promise.allSettled(chunkPromises);
      
      chunkResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results[i + index] = result.value;
        } else {
          console.error(`Batch request ${i + index} failed:`, result.reason);
          throw result.reason;
        }
      });
    }
    
    return results;
  },

  // Clear cache
  clearCache: (pattern?: string) => {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('api_cache_')) {
        if (!pattern || key.includes(pattern)) {
          sessionStorage.removeItem(key);
        }
      }
    });
  },
};

// Export types
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

// Common API endpoints with type safety
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
    delete: '/users/profile',
  },
  services: {
    list: '/services',
    create: '/services',
    byId: (id: string) => `/services/${id}`,
    update: (id: string) => `/services/${id}`,
    delete: (id: string) => `/services/${id}`,
    search: '/services/search',
  },
  bookings: {
    list: '/bookings',
    create: '/bookings',
    byId: (id: string) => `/bookings/${id}`,
    update: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    userBookings: '/bookings/user',
    workerBookings: '/bookings/worker',
  },
  workers: {
    list: '/workers',
    byId: (id: string) => `/workers/${id}`,
    register: '/workers/register',
    update: '/workers/profile',
    search: '/workers/search',
    nearby: '/workers/nearby',
    reviews: (id: string) => `/workers/${id}/reviews`,
  },
  chatbot: {
    chat: '/chatbot/chat',
    history: '/chatbot/history',
    feedback: '/chatbot/feedback',
  },
};

export default api;