'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

type Course = {
  _id: string;
  id?: number; // Keep for backward compatibility
  title: string;
  instructor: string;
  category: string;
  enrollments: number;
  rating: number;
  status: string;
  description?: string;
  duration?: string;
  price?: string;
  track?: string;
};

export default function CoursesPage() {
  const { token } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addFormData, setAddFormData] = useState({
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: '',
    description: '',
    track: '',
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [editFormData, setEditFormData] = useState({
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: '',
    description: '',
    track: '',
    image: null as File | null
  });

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setIsLoadingCourses(true);
      console.log('=== FETCHING COURSES ===');
      
      const response = await fetch('/api/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      console.log('Fetch courses response:', response.status);
      console.log('Courses data:', data);
      console.log('=== END FETCH COURSES ===');

      if (response.ok) {
        // Handle different response formats
        const coursesArray = Array.isArray(data) ? data : (data.courses || data.data || []);
        
        console.log('=== COURSE DATA STRUCTURE DEBUG ===');
        console.log('Courses array length:', coursesArray.length);
        if (coursesArray.length > 0) {
          console.log('First course structure:', coursesArray[0]);
          console.log('First course ID field:', coursesArray[0].id);
          console.log('First course _id field:', coursesArray[0]._id);
          console.log('All keys in first course:', Object.keys(coursesArray[0]));
          
          // Use _id as the primary identifier
          const courseId = coursesArray[0]._id || coursesArray[0].id;
          console.log('Course identifier to use:', courseId);
        }
        console.log('=== END COURSE STRUCTURE DEBUG ===');
        
        setCourses(coursesArray);
      } else {
        toast.error('Failed to fetch courses');
        console.error('Fetch courses error:', data);
      }
    } catch (error) {
      console.error('Fetch courses network error:', error);
      toast.error('Network error while fetching courses');
    } finally {
      setIsLoadingCourses(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async () => {
    if (!addFormData.title || !addFormData.track) {
      toast.error('Please fill in all required fields (Title and Track)');
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', addFormData.title);
      formData.append('track', addFormData.track);
      formData.append('description', addFormData.description);
      
      if (addFormData.image) {
        formData.append('image', addFormData.image);
      }

      console.log('=== CREATING COURSE ===');
      console.log('Form data being sent:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log('=== END CREATE COURSE LOG ===');

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course created successfully!');
        setIsAddModalOpen(false);
        // Reset form
        setAddFormData({
          title: '',
          instructor: '',
          category: '',
          duration: '',
          price: '',
          description: '',
          track: '',
          image: null
        });
        // Refresh courses list
        fetchCourses();
      } else {
        toast.error(data.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('Create course error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse || !editFormData.title || !editFormData.track) {
      toast.error('Please fill in all required fields (Title and Track)');
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', editFormData.title);
      formData.append('track', editFormData.track);
      
      if (editFormData.image) {
        formData.append('image', editFormData.image);
      }

      console.log('=== UPDATING COURSE ===');
      console.log('Course ID:', selectedCourse._id);
      console.log('Form data being sent:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log('=== END UPDATE COURSE LOG ===');

      const response = await fetch(`/api/courses/${selectedCourse._id}`, {
        method: 'PUT',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course updated successfully!');
        setIsEditMode(false);
        setSelectedCourse(null);
        // Reset form
        setEditFormData({
          title: '',
          instructor: '',
          category: '',
          duration: '',
          price: '',
          description: '',
          track: '',
          image: null
        });
        // Refresh courses list
        fetchCourses();
      } else {
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('Update course error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string, courseTitle: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete the course "${courseTitle}"? This action cannot be undone.`
    );
    
    if (!confirmed) {
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('=== DELETING COURSE ===');
      console.log('Course ID:', courseId);
      console.log('Course Title:', courseTitle);
      console.log('=== END DELETE COURSE LOG ===');

      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log('Delete response:', data);

      if (response.ok) {
        toast.success(`Course "${courseTitle}" deleted successfully!`);
        // Refresh courses list
        fetchCourses();
      } else {
        // Check for specific error types
        if (data.errors && data.errors.some((err: { message: string }) => err.message === 'User is not verified')) {
          toast.error('Your account needs to be verified before you can delete courses. Please check your email for verification instructions.');
        } else {
          toast.error(data.message || data.errors?.[0]?.message || 'Failed to delete course');
        }
      }
    } catch (error) {
      console.error('Delete course error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              {isLoadingCourses ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                      <span className="text-gray-500">Loading courses...</span>
                    </div>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No courses found</p>
                      <p className="text-sm">Get started by creating your first course.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                <tr key={course._id}>
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
                          description: course.description || '',
                          track: course.track || '',
                          image: null
                        });
                        setIsEditMode(true);
                      }}
                      disabled={isLoading}
                      className="text-blue-600 hover:text-blue-900 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course._id, course.title)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                ))
              )}
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
                  Course Title *
                </label>
                <input
                  type="text"
                  value={addFormData.title}
                  onChange={(e) => setAddFormData({...addFormData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course title"
                  required
                />
              </div>

              {/* Track */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Track ID *
                </label>
                <input
                  type="text"
                  value={addFormData.track}
                  onChange={(e) => setAddFormData({...addFormData, track: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter track ID (e.g., 67fd04e1db1ad84c0687b468)"
                  required
                />
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setAddFormData({...addFormData, image: file});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {addFormData.image && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {addFormData.image.name}
                  </p>
                )}
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
                onClick={handleCreateCourse}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  'Create Course'
                )}
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
                  Course Title *
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course title"
                  required
                />
              </div>

              {/* Track */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Track ID *
                </label>
                <input
                  type="text"
                  value={editFormData.track}
                  onChange={(e) => setEditFormData({...editFormData, track: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter track ID (e.g., 67f82d152d80247a28fcc2d0)"
                  required
                />
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setEditFormData({...editFormData, image: file});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {editFormData.image && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {editFormData.image.name}
                  </p>
                )}
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
                onClick={handleUpdateCourse}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Course'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
