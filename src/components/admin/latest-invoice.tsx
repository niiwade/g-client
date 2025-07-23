export function LatestInvoice() {
  const invoices = [
    {
      id: 1,
      name: 'James Anderson',
      amount: '$320',
      avatar: 'JA'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      amount: '$210',
      avatar: 'MJ'
    },
    {
      id: 3,
      name: 'David Brown',
      amount: '$315',
      avatar: 'DB'
    },
    {
      id: 4,
      name: 'Orlando Diggs',
      amount: '$250',
      avatar: 'OD'
    }
  ];

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Latest Invoice</h2>
      </div>
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between text-sm font-medium text-gray-500 uppercase tracking-wide">
          <span>Name</span>
          <span>Amount</span>
        </div>
        
        {/* Invoice List */}
        <div className="space-y-3">
          {invoices.map((invoice, index) => (
            <div key={invoice.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className={`w-8 h-8 ${getAvatarColor(index)} rounded-full flex items-center justify-center mr-3`}>
                  <span className="text-white text-xs font-medium">{invoice.avatar}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{invoice.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
