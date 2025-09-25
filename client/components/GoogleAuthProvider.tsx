import React, { createContext, useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

// Mock context for when Google OAuth is not configured
const MockGoogleContext = createContext({});

const MockGoogleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MockGoogleContext.Provider value={{}}>
      {children}
    </MockGoogleContext.Provider>
  );
};

export const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.warn('Google OAuth Client ID not found. Google authentication will not be available.');
    // Return a mock provider that prevents the "must be used within GoogleOAuthProvider" error
    return <MockGoogleProvider>{children}</MockGoogleProvider>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  );
};