'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

type Track = {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  students: string;
  instructor: string;
  rating: number;
  totalRatings: number;
  tags: string[];
  gradient: string;
  image: string;
};

export default function TracksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    trackName: '',
    price: '',
    duration: '',
    instructor: '',
    description: ''
  });
  const [editFormData, setEditFormData] = useState({
    trackName: '',
    price: '',
    duration: '',
    instructor: '',
    description: ''
  });

  const tracks = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      duration: '12 weeks',
      price: '$400',
      students: '10k+',
      instructor: 'Benjamin',
      rating: 4.9,
      totalRatings: 50,
      tags: ['NodeJs', 'ReactJs'],
      gradient: 'from-teal-400 to-teal-600',
      image: '/api/placeholder/280/160'
    },
    {
      id: 2,
      title: 'Cloud Computing',
      description: 'Unlock your potential with comprehensive training in...',
      duration: '12 weeks',
      price: '$350',
      students: '8k+',
      instructor: 'Sarah Johnson',
      rating: 4.7,
      totalRatings: 32,
      tags: ['Azure', 'AWS'],
      gradient: 'from-orange-400 to-orange-600',
      image: '/api/placeholder/280/160'
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Unlock your potential with comprehensive training in...',
      duration: '12 weeks',
      price: '$400',
      students: '12k+',
      instructor: 'Dr. Michael Chen',
      rating: 4.8,
      totalRatings: 45,
      tags: ['PowerBI', 'Python'],
      gradient: 'from-blue-400 to-blue-600',
      image: '/api/placeholder/280/160'
    },
    {
      id: 4,
      title: 'UI/UX',
      description: 'Unlock your potential with comprehensive training in...',
      duration: '8 weeks',
      price: '$250',
      students: '6k+',
      instructor: 'Emma Wilson',
      rating: 4.6,
      totalRatings: 28,
      tags: ['Figma', 'Sketch'],
      gradient: 'from-cyan-400 to-cyan-600',
      image: '/api/placeholder/280/160'
    }
  ];

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">


        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Tracks</h1>
              <p className="text-gray-600">Filter, sort, and access detailed tracks</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Track
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Track"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTracks.map((track) => (
            <div 
              key={track.id} 
              onClick={() => setSelectedTrack(track)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Card Image with Gradient */}
              <div className={`h-40 bg-gradient-to-br ${track.gradient} relative`}>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-gray-900 px-2 py-1 rounded text-sm font-medium">
                    {track.price}
                  </span>
                </div>
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-white rounded-full"></div>
                  <div className="absolute top-16 right-16 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{track.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{track.description}</p>
                
                {/* Duration and Students */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="mr-4">{track.duration}</span>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{track.students}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded ${
                        index === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Track Details Modal */}
        {selectedTrack && (
          <div className="fixed inset-0 bg-transparent  backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{selectedTrack.title}</h2>
                <button 
                  onClick={() => setSelectedTrack(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Track Image */}
              <div className={`h-48 bg-gradient-to-br ${selectedTrack.gradient} rounded-lg mb-6 relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-white rounded-full"></div>
                  <div className="absolute top-16 right-16 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute bottom-16 left-16 w-6 h-6 bg-white rounded-full"></div>
                </div>
                {/* Mountain/landscape silhouette */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Track Info */}
              <div className="space-y-4">
                {/* Duration and Instructor */}
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{selectedTrack.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{selectedTrack.instructor}</span>
                  </div>
                  <div className="ml-auto text-lg font-semibold text-gray-900">
                    {selectedTrack.price}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded ${
                        index === 0 ? 'bg-green-100 text-green-700' : 
                        index === 1 ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedTrack.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedTrack.rating}/{selectedTrack.totalRatings}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedTrack.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => {
                      setEditFormData({
                        trackName: selectedTrack.title,
                        price: selectedTrack.price.replace('$', ''),
                        duration: selectedTrack.duration,
                        instructor: selectedTrack.instructor,
                        description: selectedTrack.description
                      });
                      setIsEditMode(true);
                    }}
                    className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Track Modal */}
        {isEditMode && selectedTrack && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Update Track</h2>
                <button 
                  onClick={() => setIsEditMode(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Form */}
              <form className="space-y-4">
                {/* Track Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Track name
                  </label>
                  <input
                    type="text"
                    value={editFormData.trackName}
                    onChange={(e) => setEditFormData({...editFormData, trackName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter track name"
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
                    placeholder="300"
                  />
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
                    placeholder="12 weeks"
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
                    placeholder="Benjamin"
                  />
                </div>

                {/* Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Picture
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="edit-picture-upload"
                    />
                    <label 
                      htmlFor="edit-picture-upload"
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      Choose file no file chosen
                    </label>
                  </div>
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
                    placeholder="Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"
                  />
                </div>

                {/* Update Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Handle form update here
                    console.log('Update form data:', editFormData);
                    setIsEditMode(false);
                    setSelectedTrack(null);
                    // In a real app, you would update the track data here
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create track
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Track Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Track</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Form */}
              <form className="space-y-4">
                {/* Track Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Track name
                  </label>
                  <input
                    type="text"
                    value={formData.trackName}
                    onChange={(e) => setFormData({...formData, trackName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter track name"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="$0.00"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 12 weeks"
                  />
                </div>

                {/* Instructor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter instructor name"
                  />
                </div>

                {/* Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Picture
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="picture-upload"
                    />
                    <label 
                      htmlFor="picture-upload"
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      Choose file no file chosen
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter track description"
                  />
                </div>

                {/* Create Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Handle form submission here
                    console.log('Form data:', formData);
                    setIsModalOpen(false);
                    // Reset form
                    setFormData({
                      trackName: '',
                      price: '',
                      duration: '',
                      instructor: '',
                      description: ''
                    });
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create track
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
