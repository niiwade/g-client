'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setAuthData: (user: User, token: string) => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('authToken');
      
      if (!storedToken) {
        setIsLoading(false);
        return false;
      }

      console.log('=== CHECKING AUTH WITH SERVER ===');
      console.log('Token present:', !!storedToken);
      
      // Validate token with the server using check-auth endpoint
      const response = await fetch('/api/auth/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();
      
      console.log('Check auth response:', response.status);
      console.log('Check auth data:', data);
      console.log('=== END AUTH CHECK ===');

      if (response.ok && data.success !== false) {
        // Extract user data from response or use defaults
        const userData: User = {
          id: data.user?.id || data.id || '1',
          email: data.user?.email || data.email || 'admin@example.com',
          name: data.user?.name || data.name || `${data.user?.first_name || 'Admin'} ${data.user?.last_name || 'User'}`,
          role: data.user?.role || data.role || 'administrator'
        };
        
        setUser(userData);
        setToken(storedToken);
        
        // Set cookie for middleware
        document.cookie = `authToken=${storedToken}; path=/; max-age=86400; SameSite=strict`;
        
        setIsLoading(false);
        return true;
      } else {
        // Token is invalid, clear auth data
        console.log('Token validation failed, clearing auth data');
        localStorage.removeItem('authToken');
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return false;
      }
      
    } catch (error) {
      console.error('Auth check failed:', error);
      // On network error, keep existing auth if token exists (offline tolerance)
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        console.log('Network error during auth check, maintaining existing session');
        // Keep existing session but log the error
        const defaultUser: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'administrator'
        };
        setUser(defaultUser);
        setToken(storedToken);
        setIsLoading(false);
        return true;
      } else {
        localStorage.removeItem('authToken');
        document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsLoading(false);
        return false;
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Create user object from response or use defaults
        const userData: User = {
          id: data.user?.id || '1',
          email: email,
          name: data.user?.name || 'Admin User',
          role: data.user?.role || 'administrator'
        };
        
        setAuthData(userData, data.token);
        router.push('/admin/dashboard');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      
      if (storedToken) {
        // Call logout API
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear auth data regardless of API response
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      router.push('/auth/login');
    }
  };

  const setAuthData = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
    
    // Set cookie for middleware
    document.cookie = `authToken=${authToken}; path=/; max-age=86400; SameSite=strict`;
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    setAuthData,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
