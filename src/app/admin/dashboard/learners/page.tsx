'use client';

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

type Learner = {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  joinDate: string;
  lastActive: string;
  program?: string;
  gender?: string;
  contact?: string;
  location?: string;
  paid?: string;
  bio?: string;
  avatar?: string;
};

export default function LearnersPage() {
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const learners = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      enrolledCourses: 3,
      completedCourses: 1,
      joinDate: 'Jan 15, 2025',
      lastActive: '2 hours ago',
      program: 'Software Development',
      gender: 'Male',
      contact: '+233410000',
      location: 'Accra, Ghana',
      paid: '$300.00',
      bio: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      avatar: '',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      enrolledCourses: 5,
      completedCourses: 4,
      joinDate: 'Feb 3, 2025',
      lastActive: '1 day ago',
      program: 'Data Science',
      gender: 'Female',
      contact: '+233420000',
      location: 'Kumasi, Ghana',
      paid: '$450.00',
      bio: 'Passionate about data analysis and machine learning applications.',
      avatar: '',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      enrolledCourses: 2,
      completedCourses: 0,
      joinDate: 'Mar 12, 2025',
      lastActive: '3 hours ago',
      program: 'Web Development',
      gender: 'Male',
      contact: '+233430000',
      location: 'Takoradi, Ghana',
      paid: '$200.00',
      bio: 'New to programming, eager to learn modern web technologies.',
      avatar: '',
    },
    {
      id: 4,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      enrolledCourses: 7,
      completedCourses: 5,
      joinDate: 'Dec 5, 2024',
      lastActive: '5 days ago',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      enrolledCourses: 4,
      completedCourses: 2,
      joinDate: 'Apr 18, 2025',
      lastActive: 'Just now',
    },
    {
      id: 6,
      name: 'Jessica Miller',
      email: 'jessica.miller@example.com',
      enrolledCourses: 1,
      completedCourses: 0,
      joinDate: 'May 22, 2025',
      lastActive: '1 hour ago',
    },
    {
      id: 7,
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      enrolledCourses: 6,
      completedCourses: 3,
      joinDate: 'Feb 28, 2025',
      lastActive: '2 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learners</h1>
          <p className="text-muted-foreground">
            Manage your platform users and their progress
          </p>
        </div>
        {/* <button 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Learner
        </button> */}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Search learners..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>All Learners</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>New</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {learners.map((learner) => (
                <tr key={learner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-medium text-gray-600">{learner.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{learner.name}</div>
                        <div className="text-sm text-gray-500">{learner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {learner.enrolledCourses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {learner.completedCourses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {learner.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {learner.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedLearner(learner);
                        setIsViewModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <EyeIcon className="w-4 h-4 inline mr-1" />
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of{' '}
                <span className="font-medium">7</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  {/* Previous icon */}
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  {/* Next icon */}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* View Learner Modal */}
      {isViewModalOpen && selectedLearner && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Learner Details</h2>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedLearner(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Learner Profile */}
            <div className="text-center mb-4">
              {selectedLearner.avatar ? (
                <Image
                  src={selectedLearner.avatar}
                  alt={selectedLearner.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-medium text-gray-600">
                    {selectedLearner.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{selectedLearner.name}</h3>
              <p className="text-sm text-gray-500">{selectedLearner.email}</p>
            </div>

            {/* Learner Information */}
            <div className="space-y-2">
              {/* Program */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Program</span>
                <span className="text-sm text-gray-900">{selectedLearner.program || 'N/A'}</span>
              </div>

              {/* Gender */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Gender</span>
                <span className="text-sm text-gray-900">{selectedLearner.gender || 'N/A'}</span>
              </div>

              {/* Contact */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Contact</span>
                <span className="text-sm text-gray-900">{selectedLearner.contact || 'N/A'}</span>
              </div>

              {/* Location */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Location</span>
                <span className="text-sm text-gray-900">{selectedLearner.location || 'N/A'}</span>
              </div>

              {/* Paid */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Paid</span>
                <span className="text-sm font-semibold text-green-600">{selectedLearner.paid || 'N/A'}</span>
              </div>

              {/* Enrolled Courses */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Enrolled Courses</span>
                <span className="text-sm text-gray-900">{selectedLearner.enrolledCourses}</span>
              </div>

              {/* Completed Courses */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Completed Courses</span>
                <span className="text-sm text-gray-900">{selectedLearner.completedCourses}</span>
              </div>

              {/* Join Date */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Join Date</span>
                <span className="text-sm text-gray-900">{selectedLearner.joinDate}</span>
              </div>

              {/* Last Active */}
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Last Active</span>
                <span className="text-sm text-gray-900">{selectedLearner.lastActive}</span>
              </div>

              {/* Bio */}
              {selectedLearner.bio && (
                <div className="py-1.5">
                  <span className="text-sm font-medium text-gray-600 block mb-1">Bio</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedLearner.bio}</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-4">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedLearner(null);
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
