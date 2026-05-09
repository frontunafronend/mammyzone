import { NewsletterClient } from "./NewsletterClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listNewsletterSubscribersForAdmin } from "@/server/services/newsletter-query.service";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="newsletterTitle" />
        <AdminMuted k="dbConnectNewsletter" />
      </div>
    );
  }

  const rows = await listNewsletterSubscribersForAdmin();

  const mapped = rows.map((r) => ({
    id: r.id,
    email: r.email,
    source: r.source,
    language: r.language,
    status: r.status,
    subscribedAt: r.subscribedAt.toISOString(),
  }));

  return (
    <div className="admin-panel">
      <AdminH1 k="newsletterTitle" />
      <AdminMuted k="newsletterSubtitle" />
      <NewsletterClient rows={mapped} />
    </div>
  );
}
