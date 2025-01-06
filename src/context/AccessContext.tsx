'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessTokenContextProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AccessTokenContext = createContext<AccessTokenContextProps | undefined>(undefined);

export const AccessTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAccessToken(token);
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};