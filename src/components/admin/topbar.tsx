'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

export function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout, user, isLoading } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
  };
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div>
          {/* Search functionality */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search "
              className="w-64 rounded-md border border-gray-200 pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          {/* <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button> */}
          

          
          {/* User profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden relative">
                <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">M</span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
              <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push('/admin/dashboard/profile');
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-500" />
                  Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-3"></div>
                      Logging out...
                    </>
                  ) : (
                    <>
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-500" />
                      Logout
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
