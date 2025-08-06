import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <> 
    
    
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">GClient</h1>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link href="/tracks" className="text-gray-700 hover:text-indigo-600">Tracks</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600">Log in</Link>
            <Link 
              href="/auth/signup" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
    
    </>
  )
}
