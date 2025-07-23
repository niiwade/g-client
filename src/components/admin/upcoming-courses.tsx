export function UpcomingCourses() {
  // Mock data - in a real app, this would come from an API
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Jane Cooper',
      startDate: 'July 28, 2025',
      enrollments: 24,
      status: 'Published',
    },
    {
      id: 2,
      title: 'GraphQL Masterclass',
      instructor: 'Alex Morgan',
      startDate: 'August 3, 2025',
      enrollments: 18,
      status: 'Draft',
    },
    {
      id: 3,
      title: 'Responsive UI Design',
      instructor: 'Leslie Alexander',
      startDate: 'August 10, 2025',
      enrollments: 32,
      status: 'Published',
    },
    {
      id: 4,
      title: 'TypeScript for Beginners',
      instructor: 'Robert Fox',
      startDate: 'August 15, 2025',
      enrollments: 12,
      status: 'Draft',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Upcoming Courses
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrollments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.instructor}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.enrollments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all courses
        </a>
      </div>
    </div>
  );
}
