import Image from 'next/image';

export function Topbar() {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div>
          {/* Search functionality */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search or type command..."
              className="w-64 rounded-md border border-gray-200 pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="absolute right-3 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">⌘ K</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          {/* Notifications */}
          <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* User profile */}
          <div className="relative">
            <button className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden relative">
                <Image 
                  src="/" 
                  alt="Admin User"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">Musharof</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
