import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginButtonProps {
  mode?: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ 
  mode = 'login',
  onSuccess,
  onError 
}) => {
  const { refreshUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }

      // Send Google credential to our backend
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          mode // 'login' or 'register'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      // Update auth context with user data
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token);
        
        // Refresh user data in auth context
        await refreshUser();
        
        toast({
          title: "Welcome!",
          description: `Successfully ${mode === 'register' ? 'registered' : 'logged in'} with Google`,
        });

        // Navigate to verification page if needed, otherwise to dashboard
        navigate('/verify-account');
        onSuccess?.();
      }

    } catch (error) {
      console.error('Google authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
      
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: errorMessage,
      });

      onError?.(errorMessage);
    }
  };

  const handleGoogleError = () => {
    const errorMessage = 'Google authentication was cancelled or failed';
    console.error(errorMessage);
    
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: errorMessage,
    });

    onError?.(errorMessage);
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text={mode === 'register' ? 'signup_with' : 'signin_with'}
        theme="outline"
        size="large"
        width="100%"
        logo_alignment="left"
      />
    </div>
  );
};