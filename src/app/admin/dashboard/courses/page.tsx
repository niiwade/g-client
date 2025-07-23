'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

type Course = {
  id: number;
  title: string;
  instructor: string;
  category: string;
  enrollments: number;
  rating: number;
  status: string;
  description?: string;
  duration?: string;
  price?: string;
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addFormData, setAddFormData] = useState({
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: '',
    description: ''
  });
  const [editFormData, setEditFormData] = useState({
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: '',
    description: ''
  });
  const courses = [
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'John Smith',
      category: 'Web Development',
      enrollments: 156,
      rating: 4.8,
      status: 'Published',
      description: 'Learn the fundamentals of React.js and build modern web applications.',
      duration: '8 weeks',
      price: '$299',
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      instructor: 'Sarah Johnson',
      category: 'Programming',
      enrollments: 89,
      rating: 4.6,
      status: 'Published',
      description: 'Master advanced TypeScript concepts and patterns.',
      duration: '6 weeks',
      price: '$249',
    },
    {
      id: 3,
      title: 'Node.js Fundamentals',
      instructor: 'Michael Brown',
      category: 'Backend Development',
      enrollments: 112,
      rating: 4.7,
      status: 'Published',
      description: 'Build scalable backend applications with Node.js.',
      duration: '10 weeks',
      price: '$349',
    },
    {
      id: 4,
      title: 'Full Stack Development',
      instructor: 'Emily Davis',
      category: 'Web Development',
      enrollments: 203,
      rating: 4.9,
      status: 'Published',
      description: 'Complete full stack development course covering frontend and backend.',
      duration: '16 weeks',
      price: '$599',
    },
    {
      id: 5,
      title: 'Database Design',
      instructor: 'David Wilson',
      category: 'Database',
      enrollments: 78,
      rating: 4.5,
      status: 'Draft',
    },
    {
      id: 6,
      title: 'UI/UX Design Principles',
      instructor: 'Jessica Miller',
      category: 'Design',
      enrollments: 145,
      rating: 4.7,
      status: 'Published',
    },
    {
      id: 7,
      title: 'GraphQL Masterclass',
      instructor: 'Alex Morgan',
      category: 'API Development',
      enrollments: 67,
      rating: 4.4,
      status: 'Draft',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and their content
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>All Categories</option>
              <option>Web Development</option>
              <option>Programming</option>
              <option>Backend Development</option>
              <option>Database</option>
              <option>Design</option>
            </select>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollments
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.enrollments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.rating}/5.0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setEditFormData({
                          title: course.title,
                          instructor: course.instructor,
                          category: course.category,
                          duration: course.duration || '',
                          price: course.price?.replace('$', '') || '',
                          description: course.description || ''
                        });
                        setIsEditMode(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
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
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
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

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Course</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={addFormData.title}
                  onChange={(e) => setAddFormData({...addFormData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  value={addFormData.instructor}
                  onChange={(e) => setAddFormData({...addFormData, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter instructor name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={addFormData.category}
                  onChange={(e) => setAddFormData({...addFormData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Programming">Programming</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Database">Database</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={addFormData.duration}
                  onChange={(e) => setAddFormData({...addFormData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 8 weeks"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={addFormData.price}
                  onChange={(e) => setAddFormData({...addFormData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="299"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={addFormData.description}
                  onChange={(e) => setAddFormData({...addFormData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter course description"
                />
              </div>

              {/* Create Button */}
              <button
                type="button"
                onClick={() => {
                  console.log('Add course data:', addFormData);
                  setIsAddModalOpen(false);
                  setAddFormData({
                    title: '',
                    instructor: '',
                    category: '',
                    duration: '',
                    price: '',
                    description: ''
                  });
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Course Modal */}
      {isEditMode && selectedCourse && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Update Course</h2>
              <button 
                onClick={() => setIsEditMode(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  value={editFormData.instructor}
                  onChange={(e) => setEditFormData({...editFormData, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter instructor name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Programming">Programming</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Database">Database</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={editFormData.duration}
                  onChange={(e) => setEditFormData({...editFormData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 8 weeks"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="299"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter course description"
                />
              </div>

              {/* Update Button */}
              <button
                type="button"
                onClick={() => {
                  console.log('Update course data:', editFormData);
                  setIsEditMode(false);
                  setSelectedCourse(null);
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Update Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
