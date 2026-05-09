import { readFileSync } from "fs";
import { join } from "path";
import { getDatabaseUrlOrNull } from "@/server/config/env";
import { getResolvedLeadStorageDriver } from "@/server/adapters/lead-storage.factory";
import { getPrisma } from "@/server/db";

export type SystemHealthSnapshot = {
  dbConnected: boolean;
  storageDriverLabel: string;
  lastAudit: {
    id: string;
    action: string;
    createdAt: string;
    actor: string | null;
  } | null;
  appVersion: string;
  gitCommit: string | null;
  environmentLabel: string;
};

function readPackageVersion(): string {
  try {
    const raw = readFileSync(join(process.cwd(), "package.json"), "utf8");
    const pkg = JSON.parse(raw) as { version?: string };
    return pkg.version ?? "0.0.0";
  } catch {
    return "unknown";
  }
}

/**
 * Server-only snapshot for authenticated admin system page (no secrets).
 */
export async function loadSystemHealthForAdmin(): Promise<SystemHealthSnapshot> {
  const storageDriverLabel = getResolvedLeadStorageDriver();
  const appVersion = process.env.npm_package_version ?? readPackageVersion();
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.trim();
  const gitCommit = sha ? sha.slice(0, 7) : null;

  const vercelEnv = process.env.VERCEL_ENV?.trim();
  const environmentLabel = [process.env.NODE_ENV ?? "development", vercelEnv].filter(Boolean).join(" · ");

  let dbConnected = false;
  let lastAudit: SystemHealthSnapshot["lastAudit"] = null;

  if (getDatabaseUrlOrNull()) {
    try {
      const prisma = getPrisma();
      await prisma.$queryRaw`SELECT 1`;
      dbConnected = true;
      const row = await prisma.auditLog.findFirst({ orderBy: { createdAt: "desc" } });
      if (row) {
        lastAudit = {
          id: row.id,
          action: row.action,
          createdAt: row.createdAt.toISOString(),
          actor: row.actor,
        };
      }
    } catch {
      dbConnected = false;
    }
  }

  return {
    dbConnected,
    storageDriverLabel,
    lastAudit,
    appVersion,
    gitCommit,
    environmentLabel,
  };
}
