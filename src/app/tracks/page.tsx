'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for tracks
const tracks = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Unlock your potential with comprehensive training in modern software development.',
    rating: 4.0,
    price: 350,
    image: '/images/software-dev.jpg'
  },
  {
    id: 2,
    title: 'Data Science Mastery',
    description: 'Equip yourself with the skills to analyze, interpret, and leverage data.',
    rating: 4.0,
    price: 350,
    image: '/images/data-science.jpg'
  },
  {
    id: 3,
    title: 'Cloud Computing Expertise',
    description: 'Gain hands-on experience in cloud preparing you to manage scalable...',
    rating: 4.0,
    price: 350,
    image: '/images/cloud-computing.jpg'
  }
];

const TracksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tracks based on search query
  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tracks</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 mt-8 mb-12 w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Track"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tracks Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Tracks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTracks.map((track) => (
            <div key={track.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image: {track.title}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h3>
                <p className="text-gray-600 mb-4">{track.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(track.rating)}
                    </div>
                    <span className="text-gray-600 ml-1">{track.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">${track.price}</span>
                </div>
                
                <Link 
                  href={`/tracks/${track.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Preview course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default TracksPage;
