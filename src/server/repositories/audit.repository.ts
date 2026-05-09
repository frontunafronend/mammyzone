import type { Prisma } from "@prisma/client";
import { Prisma as PrismaNamespace } from "@prisma/client";
import { getPrisma } from "@/server/db";

function jsonOrUndefined(
  v: Prisma.InputJsonValue | null | undefined,
): Prisma.InputJsonValue | typeof PrismaNamespace.JsonNull | undefined {
  if (v === undefined) return undefined;
  if (v === null) return PrismaNamespace.JsonNull;
  return v;
}

export const auditRepository = {
  async create(input: {
    action: string;
    entityType: string;
    entityId?: string | null;
    before?: Prisma.InputJsonValue | null;
    after?: Prisma.InputJsonValue | null;
    actor?: string | null;
  }) {
    return getPrisma().auditLog.create({
      data: {
        action: input.action.slice(0, 200),
        entityType: input.entityType.slice(0, 120),
        entityId: input.entityId?.slice(0, 120) ?? null,
        before: jsonOrUndefined(input.before),
        after: jsonOrUndefined(input.after),
        actor: input.actor?.slice(0, 120) ?? null,
      },
    });
  },

  async listRecent(take: number) {
    return getPrisma().auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take,
    });
  },
};
