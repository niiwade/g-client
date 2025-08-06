// src/components/learner/EnrolledCourses.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { FiBookOpen, FiClock, FiPlay, FiCheckCircle } from 'react-icons/fi';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  image: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

const EnrolledCourses = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'UI/UX Design for Beginners',
      instructor: 'John Doe',
      progress: 60,
      totalLessons: 24,
      completedLessons: 15,
      nextLesson: 'Creating a Design System',
      image: '/images/courses/ui-ux.jpg',
      category: 'Design',
      duration: '2h 30m',
      level: 'Beginner',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      instructor: 'Jane Smith',
      progress: 35,
      totalLessons: 32,
      completedLessons: 11,
      nextLesson: 'Closures and Scope',
      image: '/images/courses/js-advanced.jpg',
      category: 'Development',
      duration: '4h 15m',
      level: 'Advanced',
      rating: 4.9
    }
  ];

  // Add this inside the EnrolledCourses component, before the return statement
const CourseCard = ({ course }: { course: Course }) => {
    return (
      <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
        {/* Course Image */}
        <div className="relative w-full md:w-48 h-40 bg-gray-200">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {course.category}
            </span>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">By {course.instructor}</p>
            </div>
            <div className="flex items-center text-yellow-500 text-sm">
              <FiBookOpen className="mr-1" />
              <span>{course.rating}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress: {course.progress}%</span>
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
          
          {/* Course Meta */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FiClock className="mr-1" /> {course.duration}
              </span>
              <span className="flex items-center">
                <FiPlay className="mr-1" /> {course.level}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-sm text-gray-600 border rounded-md hover:bg-gray-50">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Enrolled Courses</h2>
        <button className="text-blue-600 text-sm font-medium">View All</button>
      </div>
      
      <div className="space-y-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )

};

export default EnrolledCourses;