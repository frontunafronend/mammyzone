import { blogPostAdminRepository } from "@/server/repositories/blog-post-admin.repository";
import { contentPageRepository } from "@/server/repositories/content-page.repository";

export async function listContentPagesForAdmin() {
  return contentPageRepository.listOrderedByUpdated();
}

export async function listBlogPostAdminRegistry() {
  return blogPostAdminRepository.listOrderedByUpdated();
}
