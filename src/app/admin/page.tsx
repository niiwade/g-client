import { DashboardMetrics } from '@/components/admin/dashboard-metrics';
import { RecentActivity } from '@/components/admin/recent-activity';
import { UpcomingCourses } from '@/components/admin/upcoming-courses';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your learning management system
        </p>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingCourses />
      </div>
    </div>
  );
}
