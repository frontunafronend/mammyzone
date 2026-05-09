import type { Prisma } from "@prisma/client";
import { auditRepository } from "@/server/repositories/audit.repository";

export async function writeAuditLog(input: {
  action: string;
  entityType: string;
  entityId?: string | null;
  before?: Prisma.InputJsonValue | null;
  after?: Prisma.InputJsonValue | null;
  actor?: string | null;
}): Promise<void> {
  if (!process.env.DATABASE_URL?.trim()) return;
  try {
    await auditRepository.create(input);
  } catch (e) {
    console.error("writeAuditLog", e);
  }
}
