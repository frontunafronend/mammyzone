import { siteUserRepository } from "@/server/repositories/site-user.repository";

export async function listSiteUsersForAdmin() {
  return siteUserRepository.listForAdmin();
}
