export function RecentActivity() {
  // Mock data - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'completed',
      subject: 'Introduction to React',
      time: '2 hours ago',
      avatar: '/avatars/john.jpg',
    },
    {
      id: 2,
      user: 'Sarah Smith',
      action: 'enrolled in',
      subject: 'Advanced TypeScript',
      time: '3 hours ago',
      avatar: '/avatars/sarah.jpg',
    },
    {
      id: 3,
      user: 'Michael Brown',
      action: 'submitted assignment for',
      subject: 'Node.js Fundamentals',
      time: '5 hours ago',
      avatar: '/avatars/michael.jpg',
    },
    {
      id: 4,
      user: 'Emily Johnson',
      action: 'received certificate for',
      subject: 'Full Stack Development',
      time: '1 day ago',
      avatar: '/avatars/emily.jpg',
    },
    {
      id: 5,
      user: 'David Wilson',
      action: 'left a review on',
      subject: 'Database Design',
      time: '1 day ago',
      avatar: '/avatars/david.jpg',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.action} <span className="font-medium">{activity.subject}</span>
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {activity.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 border-t border-gray-200">
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all activity
        </a>
      </div>
    </div>
  );
}
