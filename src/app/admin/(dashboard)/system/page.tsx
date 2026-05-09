import { AdminSystemClient } from "@/components/admin/AdminSystemClient";
import { loadSystemHealthForAdmin } from "@/server/services/system-health-query.service";

export const dynamic = "force-dynamic";

export default async function AdminSystemPage() {
  const health = await loadSystemHealthForAdmin();
  return <AdminSystemClient health={health} />;
}
