import { SettingsClient } from "./SettingsClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listSiteSettings } from "@/server/services/site-settings-query.service";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="settingsTitle" />
        <AdminMuted k="dbConnectSettings" />
      </div>
    );
  }

  const rows = await listSiteSettings();
  const settings = rows.map((r) => ({ key: r.key, value: r.value as unknown }));

  return (
    <div className="admin-panel">
      <AdminH1 k="settingsTitle" />
      <AdminMuted k="settingsSubtitle" />
      <SettingsClient settings={settings} />
    </div>
  );
}
