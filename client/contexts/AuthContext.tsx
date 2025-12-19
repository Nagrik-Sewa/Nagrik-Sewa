import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'worker' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isDigiLockerVerified?: boolean;
  preferences?: {
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<any>;
  verifyOTP: (email: string, phoneOTP?: string, emailOTP?: string) => Promise<any>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: 'customer' | 'worker';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          console.log('Auth me response:', response.data);
          setUser(response.data.data.user); // Fix: correct path to user data
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Normalize email on frontend as well
      const normalizedEmail = email.trim().toLowerCase();
      
      console.log('=== AUTHCONTEXT: Starting login request ===');
      console.log('Email (normalized):', normalizedEmail);
      console.log('API Base URL:', api.defaults.baseURL);
      const response = await api.post('/auth/login', { email: normalizedEmail, password });
      console.log('=== AUTHCONTEXT: Login response received ===');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      // Handle the correct response structure from server
      const { user, tokens } = response.data.data;
      const token = tokens.accessToken;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${user.firstName}`,
      });
    } catch (error: any) {
      console.error('=== AUTHCONTEXT: Login error ===');
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      console.error('Error message:', error.message);
      
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
        duration: 5000, // Show error for 5 seconds
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Normalize email
      const normalizedData = {
        ...data,
        email: data.email.trim().toLowerCase(),
        firstName: data.firstName.trim(),
        lastName: data.lastName?.trim() || ''
      };
      
      console.log('Starting registration...', { ...normalizedData, password: '[HIDDEN]' });
      const response = await api.post('/auth/register', normalizedData);
      console.log('Registration response:', response.data);
      
      // Registration returns email and requires OTP verification
      // Don't set user/token yet - need OTP verification first
      const { email, requiresVerification } = response.data.data;
      
      toast({
        title: "Registration Initiated! 🇮🇳",
        description: "Verification codes sent to your phone and email. Please check and verify to complete registration.",
      });

      // Return the response so the component can handle OTP verification
      return response.data;
    } catch (error: any) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    }
  };

  const verifyOTP = async (email: string, phoneOTP?: string, emailOTP?: string) => {
    try {
      // Normalize email and OTP values
      const normalizedEmail = email.trim().toLowerCase();
      const cleanPhoneOTP = phoneOTP?.trim();
      const cleanEmailOTP = emailOTP?.trim();
      
      console.log('Verifying OTP for:', normalizedEmail);
      const response = await api.post('/auth/verify-otp', { 
        email: normalizedEmail, 
        phoneOTP: cleanPhoneOTP, 
        emailOTP: cleanEmailOTP 
      });
      console.log('OTP verification response:', response.data);
      
      // If verification is complete, user gets token and is logged in
      if (response.data.data.token) {
        const { user, token } = response.data.data;
        localStorage.setItem('authToken', token);
        setUser(user);
        
        toast({
          title: "Welcome to Nagrik Sewa! 🇮🇳",
          description: `Account verified successfully! Welcome ${user.firstName}. You are now logged in.`,
        });
      } else {
        // Partial verification
        toast({
          title: "Partial Verification Complete",
          description: response.data.message,
        });
      }
      
      return response.data;
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      const message = error.response?.data?.message || 'OTP verification failed';
      const errorCode = error.response?.data?.errorCode;
      
      // Provide more specific error messages
      let description = message;
      if (errorCode === 'SESSION_EXPIRED') {
        description = 'Your registration session has expired. Please register again.';
      } else if (error.response?.status === 500) {
        description = 'Server error occurred. Please try again or contact support.';
      }
      
      toast({
        title: "Verification failed",
        description: description,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });    // Redirect to home page after logout
    window.location.href = '/';  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await api.patch('/auth/profile', data);
      setUser(response.data.user);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed';
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    verifyOTP,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
