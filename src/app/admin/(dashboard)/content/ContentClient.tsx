"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertContentPageAction } from "@/app/actions/admin-cms";

type PageStatus = "draft" | "published";

type Row = {
  id: string;
  slug: string;
  titleHe: string;
  titleEn: string;
  status: PageStatus;
  updatedAt: string;
};

type Props = { pages: Row[] };

export function ContentClient({ pages }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <>
      <p className="admin-panel__muted">
        Editable blocks for marketing copy. Public MDX blog remains the source of truth for articles; this table is for
        landing snippets and FAQs.
      </p>
      <form
        className="admin-form-grid"
        style={{ marginBottom: "2rem", maxWidth: "42rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setPending(true);
          void (async () => {
            const r = await upsertContentPageAction({
              slug: String(fd.get("slug")),
              titleHe: String(fd.get("titleHe")),
              titleEn: String(fd.get("titleEn")),
              bodyHe: String(fd.get("bodyHe")),
              bodyEn: String(fd.get("bodyEn")),
              seoTitleHe: String(fd.get("seoTitleHe") || ""),
              seoTitleEn: String(fd.get("seoTitleEn") || ""),
              seoDescriptionHe: String(fd.get("seoDescriptionHe") || ""),
              seoDescriptionEn: String(fd.get("seoDescriptionEn") || ""),
              status: String(fd.get("status")) as PageStatus,
            });
            setPending(false);
            if (r.ok) {
              (e.target as HTMLFormElement).reset();
              router.refresh();
            } else alert(r.error);
          })();
        }}
      >
        <h2 style={{ gridColumn: "1 / -1", fontSize: "1rem", margin: 0 }}>Upsert page</h2>
        <label>
          Slug
          <input name="slug" required placeholder="homepage-hero" />
        </label>
        <label>
          Title HE
          <input name="titleHe" required />
        </label>
        <label>
          Title EN
          <input name="titleEn" required />
        </label>
        <label>
          Body HE
          <textarea name="bodyHe" required rows={4} />
        </label>
        <label>
          Body EN
          <textarea name="bodyEn" required rows={4} />
        </label>
        <label>
          SEO title HE
          <input name="seoTitleHe" />
        </label>
        <label>
          SEO title EN
          <input name="seoTitleEn" />
        </label>
        <label>
          SEO description HE
          <textarea name="seoDescriptionHe" rows={2} />
        </label>
        <label>
          SEO description EN
          <textarea name="seoDescriptionEn" rows={2} />
        </label>
        <label>
          Status
          <select name="status" required>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
        <button type="submit" disabled={pending}>
          Save page
        </button>
      </form>

      <div className="admin-leads__table-wrap">
        {pages.length === 0 ? (
          <p className="admin-leads__empty">No content pages yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Slug</th>
                <th>Titles</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id}>
                  <td className="admin-leads__mono">{p.slug}</td>
                  <td>
                    {p.titleHe}
                    <div className="admin-leads__meta">{p.titleEn}</div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge--rose">{p.status}</span>
                  </td>
                  <td className="admin-leads__mono">{p.updatedAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
