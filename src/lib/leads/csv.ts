import type { StoredLead } from "./types";

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** UTF-8 BOM for Excel */
export function buildLeadsCsv(rows: StoredLead[]): string {
  const header = ["id", "type", "status", "createdAt", "details_json"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        escapeCsv(r.id),
        r.type,
        r.status,
        escapeCsv(r.createdAt),
        escapeCsv(JSON.stringify(r)),
      ].join(","),
    );
  }
  return `\ufeff${lines.join("\n")}\n`;
}
