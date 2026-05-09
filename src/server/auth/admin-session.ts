import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, parseAdminSessionToken } from "@/server/auth/session";
import { getAdminSessionSecret } from "@/server/auth/auth-config";

export async function getAdminUsernameFromCookies(): Promise<string | null> {
  const secret = getAdminSessionSecret();
  if (!secret) return null;
  const tok = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!tok) return null;
  const payload = await parseAdminSessionToken(tok, secret);
  return typeof payload?.sub === "string" && payload.sub.length > 0 ? payload.sub : null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  return (await getAdminUsernameFromCookies()) !== null;
}
