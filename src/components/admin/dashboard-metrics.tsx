export function DashboardMetrics() {
  // Mock data - in a real app, this would come from an API
  const metrics = [
    { 
      name: 'Total Learners', 
      value: '12,450', 
      change: '+16%', 
      trend: 'up',
      changeText: 'vs last month',
      icon: (
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
      )
    },
    { 
      name: 'Revenue', 
      value: '$12,450', 
      change: '+10%', 
      trend: 'up',
      changeText: 'vs last month',
      icon: (
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      )
    },
    { 
      name: 'Invoice', 
      value: '100', 
      change: '+5%', 
      trend: 'up',
      changeText: 'vs last month',
      icon: (
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      )
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.name}</p>
              <h2 className="text-2xl font-bold text-gray-900">{metric.value}</h2>
            </div>
            {metric.icon}
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              {metric.changeText}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
