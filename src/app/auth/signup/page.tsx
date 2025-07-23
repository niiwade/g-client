'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import toast from 'react-hot-toast';

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          contact: formData.contact
        })
      });

      const data = await response.json();
      console.log('=== SIGNUP API RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Data:', data);
      console.log('Token in response:', data.token ? 'YES' : 'NO');
      console.log('Token value:', data.token || 'None');
      console.log('=== END SIGNUP RESPONSE ===');

      if (response.ok) {
        toast.success('Account created successfully! Please check your email for verification code.');
        setSuccess('Account created successfully! Please check your email for verification code.');
        
        // Store signup token and email if provided
        localStorage.setItem('signup_email', formData.email);
        if (data.token) {
          localStorage.setItem('signup_token', data.token);
        }
        
        // Redirect to verify-otp page after 2 seconds
        setTimeout(() => {
          const params = new URLSearchParams();
          params.set('email', formData.email);
          if (data.token) {
            params.set('token', data.token);
          }
          router.push(`/auth/verify-otp?${params.toString()}`);
        }, 2000);
      } else {
        // Handle error response with specific error messages
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          // Show the first error message in toast
          toast.error(data.errors[0].message || 'Registration failed. Please try again.');
          setError(data.errors[0].message || 'Registration failed. Please try again.');
        } else {
          toast.error(data.message || 'Registration failed. Please try again.');
          setError(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
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
                  <span className="text-white font-bold text-sm">📊</span>
                </div>
                <span className="font-semibold text-gray-800">Admin Dashboard</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-blue-200 rounded-full w-full"></div>
                <div className="h-3 bg-blue-100 rounded-full w-3/4"></div>
                <div className="h-3 bg-blue-50 rounded-full w-1/2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">150+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">25</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
              </div>
            </div>
          </div>
           */}
          <h2 className="text-2xl font-bold text-white mb-4 bg-transparent backdrop-blur-xl">
            Manage Your Platform
          </h2>
          <p className="text-white bg-transparent backdrop-blur-xl">
            Create your admin account to access the dashboard and manage your learning management system effortlessly.
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Sign up</h1>
              <p className="text-gray-600 text-sm">
                Create Your Account to Manage and Access<br />
                the Dashboard Effortlessly.
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
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your last name"
                />
              </div>
              
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
              
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your contact number"
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
