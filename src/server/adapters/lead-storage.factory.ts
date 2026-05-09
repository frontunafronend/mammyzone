import { AirtableLeadStorage } from "@/server/adapters/airtable-lead.adapter";
import { FileJsonLeadStorage } from "@/server/adapters/file-json-lead.adapter";
import { PrismaLeadStorage } from "@/server/adapters/prisma-lead.adapter";
import { SupabaseLeadStorage } from "@/server/adapters/supabase-lead.adapter";
import type { LeadStorageAdapter } from "@/server/adapters/lead-storage.port";

export type LeadStorageDriverName = "file" | "supabase" | "airtable" | "neon";

let prismaAdapter: PrismaLeadStorage | null = null;

function getPrismaAdapter(): PrismaLeadStorage {
  if (!prismaAdapter) prismaAdapter = new PrismaLeadStorage();
  return prismaAdapter;
}

/** Human-readable label for admin system health (no secrets). */
export function getResolvedLeadStorageDriver(): string {
  const dbUrl = process.env.DATABASE_URL?.trim();
  const raw = (process.env.LEADS_STORAGE_DRIVER ?? "").trim().toLowerCase();
  if (dbUrl && (!raw || raw === "neon")) return "neon (prisma)";
  if (raw === "supabase") return "supabase (stub)";
  if (raw === "airtable") return "airtable (stub)";
  if (raw === "file") return "file (json)";
  if (raw === "neon") return "neon (prisma)";
  if (!dbUrl) return "file (json)";
  return `file (json) [driver=${raw || "default"}]`;
}

/**
 * Resolves lead persistence. With `DATABASE_URL`, Prisma/Neon is default unless `LEADS_STORAGE_DRIVER` overrides.
 */
export function getLeadStorage(): LeadStorageAdapter {
  const dbUrl = process.env.DATABASE_URL?.trim();
  const raw = (process.env.LEADS_STORAGE_DRIVER ?? "").trim().toLowerCase();

  if (dbUrl && (!raw || raw === "neon")) {
    return getPrismaAdapter();
  }

  const driver = raw as LeadStorageDriverName;
  switch (driver) {
    case "supabase":
      return new SupabaseLeadStorage();
    case "airtable":
      return new AirtableLeadStorage();
    case "file":
      return new FileJsonLeadStorage();
    case "neon":
      return getPrismaAdapter();
    default:
      return new FileJsonLeadStorage();
  }
}
