import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";
import { getAdminSessionSecret } from "@/server/auth/auth-config";
import { bookingRequestRepository } from "@/server/repositories/booking-request.repository";
import { buildBookingsCsv } from "@/server/services/bookings-csv.service";

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
    const rows = await bookingRequestRepository.listForAdminTable(500);
    const csv = buildBookingsCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="mammyzone-bookings.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("bookings-export", e);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
