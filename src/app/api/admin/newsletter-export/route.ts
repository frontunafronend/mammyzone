import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";
import { getAdminSessionSecret } from "@/server/auth/auth-config";
import { listNewsletterSubscribersForExport } from "@/server/services/newsletter-query.service";

export const dynamic = "force-dynamic";

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const secret = getAdminSessionSecret();
  if (!secret) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await parseAdminSessionToken(token, secret) : null;
  if (!session?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const rows = await listNewsletterSubscribersForExport();
    const header = ["id", "email", "source", "language", "status", "subscribedAt"];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push(
        [
          escapeCsv(r.id),
          escapeCsv(r.email),
          escapeCsv(r.source),
          escapeCsv(r.language),
          r.status,
          escapeCsv(r.subscribedAt.toISOString()),
        ].join(","),
      );
    }
    const csv = `\ufeff${lines.join("\n")}\n`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="mammyzone-newsletter.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("newsletter-export", e);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
