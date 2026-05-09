import { AdminUsersClient } from "./AdminUsersClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listSiteUsersForAdmin } from "@/server/services/user-directory-query.service";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="usersTitle" />
        <AdminMuted k="dbConnectUsers" />
      </div>
    );
  }

  const users = await listSiteUsersForAdmin();
  const mapped = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    status: u.status,
    lastLoginDay: u.lastLoginAt ? u.lastLoginAt.toISOString().slice(0, 10) : null,
  }));

  return (
    <div className="admin-panel">
      <AdminUsersClient users={mapped} />
    </div>
  );
}
