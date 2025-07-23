'use client';

import { useState } from 'react';
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    
    if (success) {
      toast.success('Login successful! Redirecting to dashboard...');
    } else {
      toast.error('Login failed. Please check your credentials.');
      setError('Login failed. Please check your credentials.');
    }
  };
  return (
    <AuthRedirect>
      <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/bg.png')] bg-cover bg-center items-center justify-center p-12">
        <div className="max-w-md text-center">
          {/* Dashboard Illustration */}
          {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-sm mx-auto">
            <div className="space-y-4">
       
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔐</span>
                </div>
                <span className="font-semibold text-gray-800">Secure Access</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-green-200 rounded-full w-full"></div>
                <div className="h-3 bg-green-100 rounded-full w-3/4"></div>
                <div className="h-3 bg-green-50 rounded-full w-1/2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">✓</div>
                  <div className="text-xs text-gray-600">Secure</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">⚡</div>
                  <div className="text-xs text-gray-600">Fast</div>
                </div>
              </div>
            </div>
          </div> */}
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-white">
            Sign in to your admin account to access the dashboard and manage your learning management system.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Client</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600 text-sm">
                Sign in to Your Account to Access<br />
                the Dashboard.
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/auth/reset-password" className="text-blue-600 hover:text-blue-800 font-medium">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Log in'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthRedirect>
  );
}
