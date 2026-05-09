import { ContentClient } from "./ContentClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listContentPagesForAdmin } from "@/server/services/cms-query.service";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="contentTitle" />
        <AdminMuted k="dbConnectContent" />
      </div>
    );
  }

  const pages = await listContentPagesForAdmin();
  const mapped = pages.map((p) => ({
    id: p.id,
    slug: p.slug,
    titleHe: p.titleHe,
    titleEn: p.titleEn,
    status: p.status,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="admin-panel">
      <AdminH1 k="contentTitle" />
      <AdminMuted k="contentHint" />
      <ContentClient pages={mapped} />
    </div>
  );
}
