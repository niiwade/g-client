import React from 'react';
import CourseCard from './CourseCard';
import type { TechStack } from './CourseCard';

type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  image: string;
  techStack: TechStack[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
};

const techCourses: Course[] = [
  {
    id: 'react-complete',
    title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.8,
    students: 500000,
    price: 199,
    originalPrice: 399,
    image: '/images/courses/react.jpg',
    techStack: ['React', 'JavaScript', 'TypeScript', 'Next.js'] as const,
    duration: '55 hours',
    level: 'Beginner'
  },
  {
    id: 'node-js',
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    instructor: 'Jonas Schmedtmann',
    rating: 4.7,
    students: 350000,
    price: 179,
    originalPrice: 349,
    image: '/images/courses/node.jpg',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JavaScript'] as const,
    duration: '40 hours',
    level: 'Intermediate'
  },
  {
    id: 'nextjs-complete',
    title: 'Next.js & React - The Complete Guide',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.7,
    students: 150000,
    price: 169,
    originalPrice: 299,
    image: '/images/courses/nextjs.jpg',
    techStack: ['Next.js', 'React', 'TypeScript'] as const,
    duration: '35 hours',
    level: 'Intermediate'
  },
  {
    id: 'typescript',
    title: 'Understanding TypeScript - 2024 Edition',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.7,
    students: 280000,
    price: 149,
    originalPrice: 249,
    image: '/images/courses/typescript.jpg',
    techStack: ['TypeScript', 'JavaScript'] as const,
    duration: '25 hours',
    level: 'Beginner'
  },
  {
    id: 'vue-complete',
    title: 'Vue - The Complete Guide (incl. Router & Composition API)',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.7,
    students: 320000,
    price: 189,
    originalPrice: 349,
    image: '/images/courses/vue.jpg',
    techStack: ['Vue', 'JavaScript', 'TypeScript'] as const,
    duration: '45 hours',
    level: 'Beginner'
  },
  {
    id: 'angular-complete',
    title: 'Angular - The Complete Guide (2024 Edition)',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.6,
    students: 420000,
    price: 199,
    originalPrice: 399,
    image: '/images/courses/angular.jpg',
    techStack: ['Angular', 'TypeScript', 'JavaScript'] as const,
    duration: '50 hours',
    level: 'Intermediate'
  }
];

const TechCoursesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What will be next step</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our diverse stack of solutions, including software development, data science, and cloud tools. Sign up today and kickstart your journey!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Tech Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechCoursesSection;
