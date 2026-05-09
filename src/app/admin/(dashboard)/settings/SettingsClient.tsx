"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertSiteSettingAction } from "@/app/actions/admin-settings";

const PRESETS: { key: string; label: string; placeholder: string }[] = [
  { key: "site.phone_display", label: "Site phone (display)", placeholder: "054-425-6903" },
  { key: "site.whatsapp_digits", label: "WhatsApp digits (no +)", placeholder: "972544256903" },
  { key: "site.email", label: "Public email", placeholder: "hello@example.com" },
  { key: "site.instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/…" },
  { key: "booking.default_timezone", label: "Booking default timezone", placeholder: "Asia/Jerusalem" },
  { key: "newsletter.modal_delay_seconds", label: "Newsletter modal delay (seconds)", placeholder: "25" },
  { key: "seo.base_url", label: "SEO base URL", placeholder: "https://mammyzone.co.il" },
  { key: "maintenance.enabled", label: "Maintenance mode (boolean JSON)", placeholder: "false" },
];

function parseValue(raw: string): unknown {
  const t = raw.trim();
  if (!t) return null;
  try {
    return JSON.parse(t) as unknown;
  } catch {
    return t;
  }
}

type Row = { key: string; value: unknown };

type Props = { settings: Row[] };

export function SettingsClient({ settings }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const map = Object.fromEntries(settings.map((s) => [s.key, JSON.stringify(s.value, null, 2)]));

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <section>
        <h2 style={{ fontSize: "1rem" }}>Quick presets</h2>
        <p className="admin-panel__muted">Values accept JSON (numbers/booleans/objects) or plain text.</p>
        <div className="admin-form-grid" style={{ maxWidth: "40rem" }}>
          {PRESETS.map((p) => (
            <form
              key={p.key}
              style={{ borderBottom: "0.5px solid var(--sand)", paddingBottom: "0.75rem" }}
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setPending(true);
                void (async () => {
                  const raw = String(fd.get("value") ?? "");
                  const r = await upsertSiteSettingAction({ key: p.key, value: parseValue(raw) });
                  setPending(false);
                  if (r.ok) router.refresh();
                  else alert(r.error);
                })();
              }}
            >
              <label>
                {p.label} <span className="admin-leads__meta">({p.key})</span>
                <input name="value" defaultValue={map[p.key] ?? ""} placeholder={p.placeholder} />
              </label>
              <button type="submit" disabled={pending}>
                Save
              </button>
            </form>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1rem" }}>Raw keys in database</h2>
        {settings.length === 0 ? (
          <p className="admin-leads__empty">No rows yet. Use presets above or seed the database.</p>
        ) : (
          <div className="admin-leads__table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value (JSON)</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((s) => (
                  <tr key={s.key}>
                    <td className="admin-leads__mono">{s.key}</td>
                    <td>
                      <pre style={{ margin: 0, fontSize: "0.72rem", whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(s.value, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
