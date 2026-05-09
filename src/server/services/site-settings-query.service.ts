import { siteSettingRepository } from "@/server/repositories/site-setting.repository";

export async function listSiteSettings() {
  return siteSettingRepository.listAll();
}
