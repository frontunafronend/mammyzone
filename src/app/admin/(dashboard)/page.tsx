import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { loadDashboardStats } from "@/server/services/dashboard-query.service";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const stats = await loadDashboardStats();
  return <AdminDashboardClient stats={stats} />;
}
