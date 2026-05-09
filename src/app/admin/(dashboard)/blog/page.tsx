import { BlogClient } from "./BlogClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listBlogPostAdminRegistry } from "@/server/services/cms-query.service";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="blogTitle" />
        <AdminMuted k="dbConnectBlog" />
      </div>
    );
  }

  const posts = await listBlogPostAdminRegistry();
  const mapped = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    titleHe: p.titleHe,
    titleEn: p.titleEn,
    category: p.category,
    tags: p.tags,
    status: p.status,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="admin-panel">
      <AdminH1 k="blogTitle" />
      <AdminMuted k="blogRegistryHint" />
      <BlogClient posts={mapped} />
    </div>
  );
}
