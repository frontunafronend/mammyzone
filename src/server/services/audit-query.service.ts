import { auditRepository } from "@/server/repositories/audit.repository";

export async function listAuditLogsForAdmin(take = 300) {
  return auditRepository.listRecent(take);
}
