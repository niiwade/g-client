'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

// Wrapped component that uses useSearchParams
function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    const storedToken = localStorage.getItem('signup_token');
    const storedEmail = localStorage.getItem('signup_email');
    
    console.log('=== VERIFY OTP PAGE LOADED ===');
    console.log('Email from URL:', emailParam || 'None');
    console.log('Email from localStorage:', storedEmail || 'None');
    console.log('Token from URL:', tokenParam || 'None');
    console.log('Token from localStorage:', storedToken || 'None');
    
    // Set email from URL param, localStorage, or fallback to known email
    if (emailParam) {
      setEmail(emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Fallback to the known email from auth context
      setEmail('niilantewade77@gmail.com');
    }
    
    if (tokenParam) {
      setAuthToken(tokenParam);
      console.log('Using token from URL');
    } else if (storedToken) {
      setAuthToken(storedToken);
      console.log('Using token from localStorage');
    } else {
      console.log('NO TOKEN AVAILABLE');
    }
    
    console.log('Final email:', emailParam || storedEmail || 'niilantewade77@gmail.com');
    console.log('Final token:', tokenParam || storedToken || 'None');
    console.log('=== END VERIFY OTP SETUP ===');
  }, [searchParams]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const otpCode = otpValues.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits of the OTP code.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        body: JSON.stringify({
          token: otpCode,
          email: email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully! Redirecting to login...');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      } else {
        setError(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Email verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');
    setResendSuccess('');

    try {
      const response = await fetch('/api/auth/resend-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();

      if (response.ok) {
        setResendSuccess('OTP code resent successfully! Please check your email.');
        // Clear the current OTP inputs
        setOtpValues(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setIsResending(false);
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
                  <span className="text-white font-bold text-sm">📱</span>
                </div>
                <span className="font-semibold text-gray-800">OTP Verification</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-purple-200 rounded-full w-full"></div>
                <div className="h-3 bg-purple-100 rounded-full w-3/4"></div>
                <div className="h-3 bg-purple-50 rounded-full w-1/2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <div className="text-purple-600 font-bold text-lg">🔢</div>
                  <div className="text-xs text-gray-600">Code</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">✓</div>
                  <div className="text-xs text-gray-600">Verify</div>
                </div>
              </div>
            </div>
          </div> */}
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Almost There!
          </h2>
          <p className="text-white">
            We&apos;ve sent a verification code to your email. Enter the code to complete your authentication.
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h1>
              <p className="text-gray-600 text-sm">
                We&apos;ve Sent a Verification Code<br />
                to Your Email Address.
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
            
            {resendSuccess && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-sm">{resendSuccess}</p>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-3">
                  Enter OTP Code
                </label>
                <div className="flex gap-3 justify-between">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={otpValues[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  ))}
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
                    Verifying...
                  </div>
                ) : (
                  'Verify'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Didn&apos;t receive the code?{" "}
                <button 
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-1"></div>
                      Resending...
                    </span>
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </p>
            </div>
            
            <div className="mt-4 text-center">
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

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading verification...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
