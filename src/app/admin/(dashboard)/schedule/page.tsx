import { ScheduleClient } from "./ScheduleClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listActiveLessonServicesForSchedule } from "@/server/services/lesson-catalog-query.service";
import { listLessonSchedulesForAdmin } from "@/server/services/schedule-query.service";

export const dynamic = "force-dynamic";

export default async function AdminSchedulePage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="scheduleTitle" />
        <AdminMuted k="dbConnectSchedule" />
      </div>
    );
  }

  const [services, schedules] = await Promise.all([listActiveLessonServicesForSchedule(), listLessonSchedulesForAdmin()]);

  const serviceOpts = services.map((s) => ({ id: s.id, titleEn: s.titleEn, slug: s.slug }));
  const schedRows = schedules.map((r) => ({
    id: r.id,
    serviceId: r.serviceId,
    serviceTitle: r.service.titleEn,
    date: r.date,
    startTime: r.startTime,
    endTime: r.endTime,
    capacity: r.capacity,
    bookedCount: r.bookedCount,
    active: r.active,
    locationType: r.locationType,
    locationText: r.locationText,
  }));

  return (
    <div className="admin-panel">
      <AdminH1 k="scheduleTitle" />
      <AdminMuted k="scheduleSubtitle" />
      <ScheduleClient services={serviceOpts} schedules={schedRows} />
    </div>
  );
}
