import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-28" 
      style={{
        backgroundImage: ' url(/student.jpg)'
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90 mix-blend-multiply" aria-hidden="true"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 lg:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Unlock Your Potential with Industry-Leading Courses!
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are designed to empower you to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/tracks" 
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center text-lg"
              >
                Explore Courses
              </Link>
              <Link 
                href="/auth/signup" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors text-center text-lg"
              >
                Get Started Learning
              </Link>
            </div>
          </div>
          
  
        </div>
      </div>
    </section>
  );
}
