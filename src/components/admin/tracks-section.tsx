export function TracksSection() {
  const tracks = [
    {
      id: 1,
      title: 'Software Engineering',
      duration: '12 weeks',
      price: '$400',
      image: 'bg-gradient-to-br from-teal-400 to-teal-600',
      tags: ['NodeJs', 'ReactJs']
    },
    {
      id: 2,
      title: 'Cloud Computing',
      duration: '12 weeks',
      price: '$350',
      image: 'bg-gradient-to-br from-orange-400 to-orange-600',
      tags: ['Azure', 'AWS']
    },
    {
      id: 3,
      title: 'Data Science',
      duration: '12 weeks',
      price: '$400',
      image: 'bg-gradient-to-br from-blue-500 to-blue-700',
      tags: ['PowerBI', 'Python']
    },
    {
      id: 4,
      title: 'UI/UX',
      duration: '8 weeks',
      price: '$250',
      image: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      tags: ['Figma', 'Sketch']
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Course Image */}
            <div className={`h-32 ${track.image} relative flex items-center justify-center`}>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {track.price}
              </div>
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full opacity-30"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full opacity-20"></div>
              </div>
            </div>
            
            {/* Course Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{track.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {track.duration}
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                {track.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      index === 0 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
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
    </div>
  );
}
