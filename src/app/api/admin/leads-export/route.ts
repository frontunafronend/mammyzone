import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";
import { getAdminSessionSecret } from "@/server/auth/auth-config";
import { buildLeadsCsv } from "@/server/services/leads-csv.service";
import { getLeadStorage } from "@/server/adapters/lead-storage.factory";

export const dynamic = "force-dynamic";

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

  try {
    const rows = await getLeadStorage().listAllLeads();
    const csv = buildLeadsCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="mammyzone-leads.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("leads-export", e);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
