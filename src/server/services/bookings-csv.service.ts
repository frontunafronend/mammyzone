import type { BookingRequest, Lead } from "@prisma/client";

type Row = BookingRequest & { lead: Lead | null };

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function buildBookingsCsv(rows: Row[]): string {
  const header = [
    "id",
    "status",
    "reference",
    "offeringTitle",
    "date",
    "timeSlot",
    "timezone",
    "leadName",
    "leadPhone",
    "leadEmail",
    "notes",
    "internalNotes",
    "createdAt",
  ];
  const lines = [header.join(",")];
  for (const b of rows) {
    lines.push(
      [
        escapeCsv(b.id),
        b.status,
        escapeCsv(b.reference),
        escapeCsv(b.offeringTitle),
        escapeCsv(b.date),
        escapeCsv(b.timeSlot),
        escapeCsv(b.timezone),
        escapeCsv(b.lead?.name ?? ""),
        escapeCsv(b.lead?.phone ?? ""),
        escapeCsv(b.lead?.email ?? ""),
        escapeCsv(b.notes),
        escapeCsv(b.internalNotes ?? ""),
        escapeCsv(b.createdAt.toISOString()),
      ].join(","),
    );
  }
  return `\ufeff${lines.join("\n")}\n`;
}
