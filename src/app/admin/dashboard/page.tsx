import { DashboardMetrics } from '@/components/admin/dashboard-metrics';
import { TracksSection } from '@/components/admin/tracks-section';
import { RecentRevenue } from '@/components/admin/recent-revenue';
import { LatestInvoice } from '@/components/admin/latest-invoice';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Admin 👋</h1>
            <p className="text-gray-600">
              Track activity, trends and popular destinations in real time
            </p>
          </div>
        </div>
      </div>
      
      {/* Top Stats Cards */}
      <DashboardMetrics />
      
      {/* Tracks Section */}
      <TracksSection />
      
      {/* Bottom Section - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentRevenue />
        <LatestInvoice />
      </div>
    </div>
  );
}
