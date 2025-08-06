'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TechCoursesSection from '@/components/TechCoursesSection';
import Footer from '@/components/Footer';

// Mock data
const courses = [
  {
    id: 1,
    title: 'Software Engineering',
    description: 'Master full-stack development',
    duration: '12 weeks',
    tags: ['Next.js', 'React', 'Node.js']
  },
  {
    id: 2,
    title: 'Cloud Computing',
    description: 'Learn AWS and Azure',
    duration: '10 weeks',
    tags: ['AWS', 'Azure', 'Docker']
  }
];

const stats = [
  { value: '4+', label: 'Courses' },
  { value: '200+', label: 'Students' },
  { value: '250+', label: 'Hours of content' }
];

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
<Header/>

<HeroSection/>
    
      {/* Courses */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-600">{course.duration}</span>
                  <div className="flex space-x-2">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechCoursesSection />

      {/* Stats */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start learning today</h2>
          <p className="text-gray-600 mb-8">
            Join our community of learners and take the first step towards your goals.
          </p>
          <Link 
            href="/auth/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 inline-block"
          >
            Get started
          </Link>
        </div>
      </section>

 
      <FeaturesSection/>
      {/* Footer */}
   <Footer/>
    </div>
  );
}
