import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionSecret } from "@/server/auth/auth-config";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const secret = getAdminSessionSecret();
  if (!secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("reason", "not_configured");
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const payload = token ? await parseAdminSessionToken(token, secret) : null;
  if (!payload?.sub) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
