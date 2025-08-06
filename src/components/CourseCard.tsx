import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaRegStar, FaUserGraduate } from 'react-icons/fa';

export type TechStack = 'React' | 'Node.js' | 'Next.js' | 'TypeScript' | 'JavaScript' | 'Python' | 'Django' | 'Vue' | 'Angular' | 'Express' | 'MongoDB';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  image: string;
  techStack: TechStack[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const techStackColors = {
  'React': 'bg-blue-100 text-blue-800',
  'Node.js': 'bg-green-100 text-green-800',
  'Next.js': 'bg-black text-white',
  'TypeScript': 'bg-blue-600 text-white',
  'JavaScript': 'bg-yellow-100 text-yellow-800',
  'Python': 'bg-blue-100 text-blue-800',
  'Django': 'bg-green-100 text-green-800',
  'Vue': 'bg-green-100 text-green-800',
  'Angular': 'bg-red-100 text-red-800',
  'Express': 'bg-gray-100 text-gray-800',
  'MongoDB': 'bg-green-100 text-green-800'
};

const CourseCard: React.FC<CourseCardProps> = ({ 
  id, 
  title, 

  rating, 
  students, 
  price, 
  originalPrice,
  image,
  techStack,
  duration,
  level
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <FaStar key={i} className="text-yellow-400" /> : 
        <FaRegStar key={i} className="text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={image} 
          alt={title} 
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {techStack.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className={`text-xs font-semibold px-2 py-1 rounded-md ${techStackColors[tech]}`}
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">
              +{techStack.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2" title={title}>
            {title}
          </h3>
          <div className="flex items-center text-yellow-400 ml-2">
            {renderStars(rating)}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaUserGraduate className="mr-1" />
          <span>{students.toLocaleString()} students</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <span className="text-blue-600 font-medium">{level}</span>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center">
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">${originalPrice}</span>
            )}
            <span className="text-xl font-bold text-blue-600">${price}</span>
          </div>
          <Link 
            href={`/tracks/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;