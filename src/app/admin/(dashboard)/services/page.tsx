import { ServicesClient } from "./ServicesClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listLessonServicesForAdmin } from "@/server/services/lesson-catalog-query.service";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="servicesTitle" />
        <AdminMuted k="dbConnectServices" />
      </div>
    );
  }

  const rows = await listLessonServicesForAdmin();
  const services = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    titleHe: r.titleHe,
    titleEn: r.titleEn,
    type: r.type,
    durationMinutes: r.durationMinutes,
    price: r.price.toFixed(2),
    currency: r.currency,
    active: r.active,
    featured: r.featured,
  }));

  return (
    <div className="admin-panel">
      <AdminH1 k="servicesTitle" />
      <AdminMuted k="servicesSubtitle" />
      <ServicesClient services={services} />
    </div>
  );
}
