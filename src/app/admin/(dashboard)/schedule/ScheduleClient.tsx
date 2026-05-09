"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createLessonScheduleAction, updateLessonScheduleAction } from "@/app/actions/admin-schedule";

type ServiceOpt = { id: string; titleEn: string; slug: string };

type SchedRow = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  active: boolean;
  locationType: "studio" | "online" | "home" | "retreat";
  locationText: string | null;
};

type Props = { services: ServiceOpt[]; schedules: SchedRow[] };

const LOC = ["studio", "online", "home", "retreat"] as const;

export function ScheduleClient({ services, schedules }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [from, setFrom] = useState("");

  const filtered = useMemo(() => {
    if (!from) return schedules;
    return schedules.filter((s) => s.date >= from);
  }, [schedules, from]);

  return (
    <>
      <form
        className="admin-form-grid"
        style={{ marginBottom: "2rem", maxWidth: "36rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setPending("create");
          void (async () => {
            const r = await createLessonScheduleAction({
              serviceId: String(fd.get("serviceId")),
              date: String(fd.get("date")),
              startTime: String(fd.get("startTime")),
              endTime: String(fd.get("endTime")),
              capacity: Number(fd.get("capacity")),
              locationType: String(fd.get("locationType")) as (typeof LOC)[number],
              locationText: String(fd.get("locationText") || ""),
            });
            setPending(null);
            if (r.ok) {
              (e.target as HTMLFormElement).reset();
              router.refresh();
            } else alert(r.error);
          })();
        }}
      >
        <h2 style={{ gridColumn: "1 / -1", fontSize: "1rem", margin: 0 }}>New schedule row</h2>
        <label>
          Service
          <select name="serviceId" required>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.titleEn} ({s.slug})
              </option>
            ))}
          </select>
        </label>
        <label>
          Date (Asia/Jerusalem calendar day)
          <input name="date" type="date" required />
        </label>
        <label>
          Start (HH:mm)
          <input name="startTime" type="time" required />
        </label>
        <label>
          End (HH:mm)
          <input name="endTime" type="time" required />
        </label>
        <label>
          Capacity
          <input name="capacity" type="number" min={1} defaultValue={8} required />
        </label>
        <label>
          Location type
          <select name="locationType" required>
            {LOC.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          Location text
          <input name="locationText" placeholder="Studio address or Zoom link label" />
        </label>
        <button type="submit" disabled={pending === "create"}>
          Add schedule
        </button>
      </form>

      <div className="admin-leads__toolbar" style={{ marginBottom: "1rem" }}>
        <label>
          Show from date
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="admin-leads__date" />
        </label>
      </div>

      <div className="admin-leads__table-wrap">
        {services.length === 0 ? (
          <p className="admin-leads__empty">Create at least one service before adding schedules.</p>
        ) : filtered.length === 0 ? (
          <p className="admin-leads__empty">No upcoming rows for this filter.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Cap</th>
                <th>Booked</th>
                <th>Location</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="admin-leads__mono">{s.date}</td>
                  <td>
                    {s.startTime}–{s.endTime}
                  </td>
                  <td>{s.serviceTitle}</td>
                  <td>{s.capacity}</td>
                  <td>{s.bookedCount}</td>
                  <td>
                    <span className="admin-badge">{s.locationType}</span>
                    {s.locationText ? <div className="admin-leads__meta">{s.locationText}</div> : null}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={s.active}
                      disabled={pending === s.id}
                      onChange={(e) => {
                        setPending(s.id);
                        void (async () => {
                          const r = await updateLessonScheduleAction({ id: s.id, active: e.target.checked });
                          setPending(null);
                          if (r.ok) router.refresh();
                          else alert(r.error);
                        })();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
