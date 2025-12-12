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
  verifyOTP: (userId: string, phoneOTP?: string, emailOTP?: string) => Promise<any>;
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
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
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
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      console.log('Starting registration...', data);
      const response = await api.post('/auth/register', data);
      console.log('Registration response:', response.data);
      
      // Registration returns userId and requires OTP verification
      // Don't set user/token yet - need OTP verification first
      const { userId, requiresVerification, testOTP } = response.data.data;
      
      toast({
        title: "Registration Initiated! 🇮🇳",
        description: `Verification codes sent to your phone and email. Please check and verify to complete registration.${testOTP ? ` (Test OTPs - Phone: ${testOTP.phone}, Email: ${testOTP.email})` : ''}`,
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
      });
      throw error;
    }
  };

  const verifyOTP = async (userId: string, phoneOTP?: string, emailOTP?: string) => {
    try {
      const response = await api.post('/auth/verify-otp', { userId, phoneOTP, emailOTP });
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
      toast({
        title: "Verification failed",
        description: message,
        variant: "destructive",
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
    });
  };

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
