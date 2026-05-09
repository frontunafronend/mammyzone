import { AdminAuditLogClient } from "./AdminAuditLogClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listAuditLogsForAdmin } from "@/server/services/audit-query.service";

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="auditTitle" />
        <AdminMuted k="dbConnectAudit" />
      </div>
    );
  }

  const rows = await listAuditLogsForAdmin(300);
  const serialized = rows.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    action: r.action,
    entityType: r.entityType,
    entityId: r.entityId,
    actor: r.actor,
    before: r.before,
    after: r.after,
  }));

  return (
    <div className="admin-panel">
      <AdminAuditLogClient rows={serialized} />
    </div>
  );
}
