import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionSecret } from "@/server/auth/auth-config";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";

const HTML_NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
} as const;

function withNoStore(response: NextResponse) {
  for (const [key, value] of Object.entries(HTML_NO_STORE)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const secret = getAdminSessionSecret();
    if (!secret) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("reason", "not_configured");
      return withNoStore(NextResponse.redirect(url));
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const payload = token ? await parseAdminSessionToken(token, secret) : null;
    if (!payload?.sub) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return withNoStore(NextResponse.redirect(url));
    }
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?)$).*)",
  ],
};
