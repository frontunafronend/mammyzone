"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertBlogPostAdminAction } from "@/app/actions/admin-cms";

type BlogStatus = "draft" | "published";

type Row = {
  id: string;
  slug: string;
  titleHe: string;
  titleEn: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt: string | null;
  updatedAt: string;
};

type Props = { posts: Row[] };

export function BlogClient({ posts }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <>
      <p className="admin-panel__muted">
        Admin registry for SEO and navigation. MDX files under <code>src</code> remain the authoring source until an
        editor is wired — keep slugs aligned.
      </p>
      <form
        className="admin-form-grid"
        style={{ marginBottom: "2rem", maxWidth: "42rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const tagsRaw = String(fd.get("tags") || "");
          const tags = tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
          setPending(true);
          void (async () => {
            const r = await upsertBlogPostAdminAction({
              slug: String(fd.get("slug")),
              titleHe: String(fd.get("titleHe")),
              titleEn: String(fd.get("titleEn")),
              excerptHe: String(fd.get("excerptHe")),
              excerptEn: String(fd.get("excerptEn")),
              category: String(fd.get("category")),
              tags,
              status: String(fd.get("status")) as BlogStatus,
              publishedAt: String(fd.get("publishedAt") || "") || null,
            });
            setPending(false);
            if (r.ok) {
              (e.target as HTMLFormElement).reset();
              router.refresh();
            } else alert(r.error);
          })();
        }}
      >
        <h2 style={{ gridColumn: "1 / -1", fontSize: "1rem", margin: 0 }}>Upsert blog registry row</h2>
        <label>
          Slug (match MDX)
          <input name="slug" required placeholder="postpartum-recovery-guide" />
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
          Excerpt HE
          <textarea name="excerptHe" required rows={3} />
        </label>
        <label>
          Excerpt EN
          <textarea name="excerptEn" required rows={3} />
        </label>
        <label>
          Category
          <input name="category" required />
        </label>
        <label>
          Tags (comma-separated)
          <input name="tags" placeholder="yoga, postpartum" />
        </label>
        <label>
          Status
          <select name="status" required>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
        <label>
          Published at (optional ISO)
          <input name="publishedAt" type="datetime-local" />
        </label>
        <button type="submit" disabled={pending}>
          Save registry
        </button>
      </form>

      <div className="admin-leads__table-wrap">
        {posts.length === 0 ? (
          <p className="admin-leads__empty">No registry rows yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Slug</th>
                <th>Titles</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td className="admin-leads__mono">{p.slug}</td>
                  <td>
                    {p.titleHe}
                    <div className="admin-leads__meta">{p.titleEn}</div>
                  </td>
                  <td>{p.category}</td>
                  <td>{p.tags.join(", ")}</td>
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
