import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/server/auth/session";
import { getAdminCredentials, getAdminSessionSecret } from "@/server/auth/auth-config";
import { consumeAdminLoginSlot } from "@/server/services/admin-login-rate-limit";
import type { LeadActionResult } from "@/lib/leads/action-inputs";

const GENERIC_SIGNIN_ERROR = "Unable to sign in. Check your credentials and try again later.";

function hashForCompare(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function constantTimeEqualString(a: string, b: string): boolean {
  try {
    return timingSafeEqual(hashForCompare(a), hashForCompare(b));
  } catch {
    return false;
  }
}

function getLoginClientKey(): string {
  const h = headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = h.get("x-real-ip")?.trim();
  return forwarded || realIp || "unknown";
}

/**
 * Admin sign-in: rate limiting, constant-time comparison, generic errors (no user enumeration).
 * Never logs passwords or credential details.
 */
export async function performAdminLogin(username: string, password: string): Promise<LeadActionResult> {
  const key = getLoginClientKey();
  const secret = getAdminSessionSecret();
  const creds = getAdminCredentials();

  if (!secret || !creds) {
    return {
      ok: false,
      error:
        "Admin sign-in is not configured correctly. Set ADMIN_SESSION_SECRET, ADMIN_USERNAME, and ADMIN_PASSWORD on the server.",
    };
  }

  const u = username.trim();
  const p = password.trim();

  const userOk = constantTimeEqualString(u, creds.username);
  const passOk = constantTimeEqualString(p, creds.password);

  if (!userOk || !passOk) {
    consumeAdminLoginSlot(key);
    return { ok: false, error: GENERIC_SIGNIN_ERROR };
  }

  const token = await createAdminSessionToken(secret, creds.username);
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return { ok: true };
}
