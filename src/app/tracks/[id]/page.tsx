'use client';

import { useParams, useRouter } from 'next/navigation';
import { FiClock, FiUsers, FiBookOpen, FiAward, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { FaStar, FaRegStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data - In a real app, this would come from an API
const trackData = {
  id: '1',
  title: 'Software Development',
  description: 'Unlock your potential with comprehensive training in modern software development.',
  price: 350,
  rating: 4.0,
  students: 1200,
  duration: '12 weeks',
  level: 'Beginner to Advanced',
  instructor: 'John Doe',
  image: '/images/software-dev.jpg',
  whatYouWillLearn: [
    'Master software development fundamentals',
    'Build real-world applications',
    'Learn modern frameworks and tools',
    'Collaborate on team projects',
    'Prepare for technical interviews'
  ],
  curriculum: [
    {
      week: 1,
      title: 'Introduction to Programming',
      topics: ['Programming Basics', 'Variables & Data Types', 'Control Flow'],
      duration: '4 hours',
      completed: true
    },
    {
      week: 2,
      title: 'Web Development Fundamentals',
      topics: ['HTML & CSS', 'Responsive Design', 'Git Basics'],
      duration: '6 hours',
      completed: true
    },
    {
      week: 3,
      title: 'JavaScript Essentials',
      topics: ['JavaScript Basics', 'DOM Manipulation', 'ES6+ Features'],
      duration: '8 hours',
      completed: false
    },
    // Add more weeks as needed
  ],
  requirements: [
    'Basic computer literacy',
    'No prior programming experience required',
    'A computer with internet access'
  ]
};

const TrackDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [enrolled, setEnrolled] = useState(false);

  // Toggle week expansion
  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-4">{trackData.title}</h1>
                <p className="text-xl mb-6">{trackData.description}</p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(trackData.rating)}
                    </div>
                    <span className="ml-1">{trackData.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-2" />
                    <span>{trackData.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    <span>{trackData.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="mr-2" />
                    <span>{trackData.level}</span>
                  </div>
                </div>
              </div>
              
              {/* Enroll Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-80 mt-6 md:mt-0">
                <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Course Preview</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">${trackData.price}</span>
                  <span className="text-gray-500 line-through">$500</span>
                </div>
                <button 
                  onClick={() => setEnrolled(!enrolled)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {enrolled ? 'Go to Dashboard' : 'Enroll Now'}
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">30-Day Money-Back Guarantee</p>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">This course includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span>12 hours on-demand video</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span>5 articles</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span>10 downloadable resources</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'curriculum'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'instructor'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Instructor
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-gray-700 mb-6">
                    This comprehensive software development course is designed to take you from beginner to job-ready developer. 
                    Youll learn modern web development technologies and best practices through hands-on projects and real-world applications.
                  </p>
                  <p className="text-gray-700 mb-6">This course is perfect for anyone who wants to learn software development from scratch. Whether you&apos;re a complete beginner or have some programming experience, this course will help you build a solid foundation in the latest technologies and best practices.</p>
                  <h3 className="text-xl font-semibold mt-8 mb-4">What You&apos;ll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {trackData.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Requirements</h3>
                  <ul className="space-y-2 mb-8">
                    {trackData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {trackData.curriculum.map((week) => (
                      <div key={week.week} className="border-b border-gray-200 last:border-b-0">
                        <button
                          onClick={() => toggleWeek(week.week)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                        >
                          <div className="flex items-center">
                            {week.completed ? (
                              <FiCheckCircle className="text-green-500 mr-3" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                            )}
                            <div>
                              <h3 className="font-medium">{week.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>{week.topics.length} topics</span>
                                <span className="mx-2">•</span>
                                <span>{week.duration}</span>
                              </div>
                            </div>
                          </div>
                          {expandedWeek === week.week ? (
                            <FaChevronUp className="text-gray-400" />
                          ) : (
                            <FaChevronDown className="text-gray-400" />
                          )}
                        </button>
                        
                        {expandedWeek === week.week && (
                          <div className="px-6 pb-4 pt-2 bg-gray-50">
                            <ul className="space-y-2">
                              {week.topics.map((topic, index) => (
                                <li key={index} className="flex items-center py-2 pl-8">
                                  <FiBookOpen className="text-gray-400 mr-3" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                  <div className="flex items-start">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400 mr-6">
                      JD
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{trackData.instructor}</h3>
                      <p className="text-gray-600 mb-4">Senior Software Engineer</p>
                      <p className="text-gray-700">
                        With over 10 years of experience in software development, John has worked with top tech companies 
                        and helped thousands of students master programming. His teaching approach focuses on practical, 
                        real-world applications of programming concepts.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {renderStars(4.5)}
                      </div>
                      <span className="text-gray-700 font-medium">4.5 course rating • 1,200 ratings</span>
                    </div>
                    
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                              <h4 className="font-medium">Student {review}</h4>
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {renderStars(5)}
                                </div>
                                <span className="text-sm text-gray-500 ml-1">2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">
                            This course was amazing! I learned so much and the instructor was very knowledgeable.
                            The projects were challenging but rewarding.
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-6 text-blue-600 font-medium flex items-center">
                      See all reviews
                      <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="font-semibold text-lg mb-4">Course Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiClock className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{trackData.duration}</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiBookOpen className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lessons</p>
                      <p className="font-medium">{trackData.curriculum.length} weeks</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiAward className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="font-medium">{trackData.level}</p>
                    </div>
                  </li>
                </ul>
                
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  {enrolled ? 'Continue Learning' : 'Enroll Now'}
                </button>
                
                <p className="text-sm text-gray-500 mt-4 text-center">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackDetailPage;