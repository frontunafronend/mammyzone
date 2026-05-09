import { redirect } from "next/navigation";
import { AdminNotConfigured } from "@/components/admin/AdminNotConfigured";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminUsernameFromCookies } from "@/server/auth/admin-session";
import { isAdminAuthConfigured } from "@/server/auth/auth-config";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthConfigured()) {
    return <AdminNotConfigured />;
  }

  const user = await getAdminUsernameFromCookies();
  if (!user) redirect("/admin/login");

  return <AdminShell username={user}>{children}</AdminShell>;
}
