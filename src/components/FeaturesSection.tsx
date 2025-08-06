import React from 'react';
import { FiBookOpen, FiUsers, FiAward, FiClock } from 'react-icons/fi';

const features = [
  {
    icon: <FiBookOpen className="w-8 h-8 text-blue-600" />,
    title: '100+ Courses',
    description: 'Wide range of courses to choose from',
  },
  {
    icon: <FiUsers className="w-8 h-8 text-blue-600" />,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals',
  },
  {
    icon: <FiAward className="w-8 h-8 text-blue-600" />,
    title: 'Certification',
    description: 'Get certified upon completion',
  },
  {
    icon: <FiClock className="w-8 h-8 text-blue-600" />,
    title: 'Lifetime Access',
    description: 'Learn at your own pace',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best learning experience with our expert instructors and comprehensive courses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
