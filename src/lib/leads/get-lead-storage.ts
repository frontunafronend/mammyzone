import { AirtableLeadStorage } from "./adapter-airtable";
import { FileJsonLeadStorage } from "./adapter-file-json";
import { SupabaseLeadStorage } from "./adapter-supabase";
import type { LeadStorageAdapter } from "./storage";

export type LeadStorageDriverName = "file" | "supabase" | "airtable";

/**
 * Provider selection for lead persistence.
 *
 * `file` (default): JSON under `LEADS_DATA_DIR` (see adapter-file-json.ts). Writable disk required
 * (local Node, Docker volume). **Not reliable on Vercel** — use Supabase adapter for production serverless.
 */
export function getLeadStorage(): LeadStorageAdapter {
  const raw = (process.env.LEADS_STORAGE_DRIVER ?? "file").trim().toLowerCase();
  const driver = raw as LeadStorageDriverName;
  switch (driver) {
    case "supabase":
      return new SupabaseLeadStorage();
    case "airtable":
      return new AirtableLeadStorage();
    case "file":
    default:
      return new FileJsonLeadStorage();
  }
}
