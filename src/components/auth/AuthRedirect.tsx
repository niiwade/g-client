'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return fallback;
  }

  // If authenticated, don't render children (redirect will happen)
  if (isAuthenticated) {
    return null;
  }

  // User is not authenticated, render auth page
  return <>{children}</>;
};

// Loading spinner component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
};
