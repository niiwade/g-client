export function RecentRevenue() {
  const data = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 35 },
    { month: 'Mar', value: 60 },
    { month: 'Apr', value: 45 },
    { month: 'May', value: 50 },
    { month: 'Jun', value: 40 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Revenue</h2>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            {/* Bar */}
            <div className="w-full flex flex-col items-center mb-2">
              <div 
                className="w-8 bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${(item.value / maxValue) * 200}px`,
                  minHeight: '8px'
                }}
              />
            </div>
            {/* Month Label */}
            <span className="text-xs text-gray-500 font-medium">
              {item.month}
            </span>
          </div>
        ))}
      </div>
      
      {/* Y-axis labels */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
      </div>
    </div>
  );
}