import React from 'react';

export function TrafficAnalytics() {
  // In a real application, this would be fetched from an API
  const trafficStats = [
    { name: 'New Subscribers', value: '567K', change: '+3.85%', trend: 'up' },
    { name: 'Conversion Rate', value: '276K', change: '-5.39%', trend: 'down' },
    { name: 'Page Bounce Rate', value: '285', change: '+12.74%', trend: 'up' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section - Would use a real chart library in production */}
      <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Course Engagement & Learning Traffic</h2>
            <p className="text-sm text-gray-500">Jun 1, 2024 - Dec 1, 2025</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">$9,758.00</h3>
            <p className="text-sm text-green-500 text-right">+7.6%</p>
            <p className="text-xs text-gray-500 text-right">Total Revenue</p>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          {/* Placeholder for chart - would use a real chart in production */}
          <div className="text-center text-gray-500">
            <p>Course Engagement Chart</p>
            <p className="text-sm">(Chart visualization would be here)</p>
          </div>
        </div>
      </div>
      
      {/* Traffic Stats */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Traffic Stats</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">Monthly</button>
            <button className="px-3 py-1 text-gray-500 rounded-md text-sm font-medium">Quarterly</button>
            <button className="px-3 py-1 text-gray-500 rounded-md text-sm font-medium">Annually</button>
          </div>
        </div>
        
        {trafficStats.map((stat, index) => (
          <div key={stat.name} className={index !== trafficStats.length - 1 ? "mb-6" : ""}>
            <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <div className="flex items-center">
                <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">than last Week</span>
                <div className="ml-2 h-8 w-16 bg-gray-50 rounded">
                  {/* Mini chart placeholder */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
