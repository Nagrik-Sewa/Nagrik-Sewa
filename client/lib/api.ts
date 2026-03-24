import axios from 'axios';

const resolvedApiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = (resolvedApiBaseUrl && resolvedApiBaseUrl.length > 0
  ? resolvedApiBaseUrl
  : `${window.location.origin}/api`).replace(/\/+$/, '');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
  withCredentials: true, // Enable cookies for cross-origin requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const requestUrl = config.url?.startsWith('http')
      ? config.url
      : `${API_BASE_URL}${config.url?.startsWith('/') ? '' : '/'}${config.url || ''}`;
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${requestUrl}`);
    }
    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API] Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API] Response ${response.status} for ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    
    if (import.meta.env.DEV) {
      console.error(`[API] Error ${status} for ${url}:`, error.response?.data?.message || error.message);
    }
    
    // Don't redirect on 401 for auth endpoints (login/register/verify)
    const isAuthEndpoint = url.includes('/auth/login') || 
                          url.includes('/auth/register') || 
                          url.includes('/auth/verify');
    
    if (status === 401 && !isAuthEndpoint) {
      if (import.meta.env.DEV) {
        console.log('[API] Unauthorized, clearing auth state');
      }
      localStorage.removeItem('authToken');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export const statsApi = {
  getPlatformStats: () => api.get('/stats/platform'),
};
