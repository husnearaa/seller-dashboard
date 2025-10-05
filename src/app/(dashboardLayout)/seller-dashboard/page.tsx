import { MatrixCard } from "@/components/shared/dashboardLayout/MatrixCard";
import { SalesChart } from "@/components/shared/dashboardLayout/SalesChart";
import { WelcomeHeader } from "@/components/shared/dashboardLayout/WelcomeHeader";

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Metrics Cards */}
        <MatrixCard />
        {/* Sales Chart */}
        <SalesChart />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <RecentOrders />
          <NotificationsAlerts /> */}
        </div>
      </div>
    </div>
  );
}
