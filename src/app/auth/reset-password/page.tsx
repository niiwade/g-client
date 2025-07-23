'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a token in the URL parameters
    const token = searchParams.get('token');
    if (token) {
      setResetToken(token);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'forgot',
          email: formData.email,
          baseResetURL: `${window.location.origin}/auth/reset-password`
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Reset link sent successfully! Please check your email.');
        setFormData({ email: '', password: '', confirmPassword: '' });
      } else {
        setError(data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reset',
          token: resetToken,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Reset password error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/bg.png')] bg-cover bg-center items-center justify-center p-12">
        <div className="max-w-md text-center">
          {/* Dashboard Illustration */}
          {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-sm mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔑</span>
                </div>
                <span className="font-semibold text-gray-800">Password Reset</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-orange-200 rounded-full w-full"></div>
                <div className="h-3 bg-orange-100 rounded-full w-3/4"></div>
                <div className="h-3 bg-orange-50 rounded-full w-1/2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-orange-600 font-bold text-lg">📬</div>
                  <div className="text-xs text-gray-600">Email</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">🔒</div>
                  <div className="text-xs text-gray-600">Secure</div>
                </div>
              </div>
            </div>
          </div> */}
          
          <h2 className="text-2xl font-bold text-white mb-4 bg-transparent backdrop-blur-xl">
            {resetToken ? 'Reset Your Password' : 'Forgot Your Password?'}
          </h2>
          <p className="text-white bg-transparent backdrop-blur-xl">
            {resetToken 
              ? 'Enter your new password below to complete the reset process.'
              : 'No worries! Enter your email address and we\'ll send you a secure link to reset your password.'
            }
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {resetToken ? 'Set New Password' : 'Reset Password'}
              </h1>
              <p className="text-gray-600 text-sm">
                {resetToken 
                  ? 'Enter your new password below to complete the reset process.'
                  : 'Enter your email address and we\'ll send you a link to reset your password.'
                }
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={resetToken ? handleResetPassword : handleForgotPassword}>
              {!resetToken ? (
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
                    placeholder="Enter your email address"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your new password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {resetToken ? 'Resetting...' : 'Sending...'}
                  </div>
                ) : (
                  resetToken ? 'Reset Password' : 'Send Reset Link'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
