"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createLessonServiceAction, updateLessonServiceAction } from "@/app/actions/admin-services";

type Row = {
  id: string;
  slug: string;
  titleHe: string;
  titleEn: string;
  type: string;
  durationMinutes: number;
  price: string;
  currency: string;
  active: boolean;
  featured: boolean;
};

type Props = { services: Row[] };

export function ServicesClient({ services }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  const toggle = async (id: string, field: "active" | "featured", value: boolean) => {
    setPending(id + field);
    const r = await updateLessonServiceAction({ id, [field]: value });
    setPending(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  };

  return (
    <>
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>New service / lesson</h2>
        <form
          className="admin-form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setPending("new");
            void (async () => {
              const r = await createLessonServiceAction({
                slug: String(fd.get("slug")),
                titleHe: String(fd.get("titleHe")),
                titleEn: String(fd.get("titleEn")),
                descriptionHe: String(fd.get("descriptionHe")),
                descriptionEn: String(fd.get("descriptionEn")),
                type: String(fd.get("type")),
                durationMinutes: Number(fd.get("durationMinutes")),
                price: Number(fd.get("price")),
                currency: String(fd.get("currency") || "ILS"),
              });
              setPending(null);
              if (r.ok) {
                (e.target as HTMLFormElement).reset();
                router.refresh();
              } else alert(r.error);
            })();
          }}
        >
          <label>
            Slug
            <input name="slug" required placeholder="e.g. private-yoga" />
          </label>
          <label>
            Title (HE)
            <input name="titleHe" required />
          </label>
          <label>
            Title (EN)
            <input name="titleEn" required />
          </label>
          <label>
            Description (HE)
            <textarea name="descriptionHe" required rows={3} />
          </label>
          <label>
            Description (EN)
            <textarea name="descriptionEn" required rows={3} />
          </label>
          <label>
            Type
            <input name="type" placeholder="workshop, yoga_class…" />
          </label>
          <label>
            Duration (minutes)
            <input name="durationMinutes" type="number" min={5} defaultValue={60} required />
          </label>
          <label>
            Price
            <input name="price" type="number" min={0} step="1" defaultValue={0} required />
          </label>
          <label>
            Currency
            <input name="currency" defaultValue="ILS" maxLength={3} />
          </label>
          <button type="submit" disabled={pending === "new"}>
            Create
          </button>
        </form>
      </section>

      <div className="admin-leads__table-wrap">
        {services.length === 0 ? (
          <p className="admin-leads__empty">No catalog rows yet. Seed the database or create one above.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Slug</th>
                <th>Titles</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Flags</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="admin-leads__mono">{s.slug}</td>
                  <td>
                    <div>{s.titleHe}</div>
                    <div className="admin-leads__meta">{s.titleEn}</div>
                  </td>
                  <td>{s.type}</td>
                  <td>{s.durationMinutes} min</td>
                  <td>
                    {s.price} {s.currency}
                  </td>
                  <td>
                    <label className="admin-leads__meta">
                      <input
                        type="checkbox"
                        checked={s.active}
                        disabled={pending === `${s.id}active`}
                        onChange={(e) => void toggle(s.id, "active", e.target.checked)}
                      />{" "}
                      Active
                    </label>
                    <br />
                    <label className="admin-leads__meta">
                      <input
                        type="checkbox"
                        checked={s.featured}
                        disabled={pending === `${s.id}featured`}
                        onChange={(e) => void toggle(s.id, "featured", e.target.checked)}
                      />{" "}
                      Featured
                    </label>
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
