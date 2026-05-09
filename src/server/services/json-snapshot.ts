import type { Prisma } from "@prisma/client";

export function toJsonSnapshot(v: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(v)) as Prisma.InputJsonValue;
}
