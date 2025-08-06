
import EnrolledCourses from '@/components/learner/EnrolledCourses';
import React from 'react';




export default function LearnerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="text-gray-600 mt-2">Track your learning progress and access your courses</p>
      </div>

     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2">
          <EnrolledCourses/>
        </div>

   
      </div>
    </div>
  );
}