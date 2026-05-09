export const ADMIN_SESSION_COOKIE = "mz_admin_sess";

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const enc = new TextEncoder();

export type SessionPayload = { exp: number; sub?: string };

function utf8ToB64Url(str: string): string {
  const bytes = enc.encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64UrlToUtf8(b64: string): string {
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const s = atob(b64.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = Uint8Array.from(s, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function b64UrlFromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSha256B64Url(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return b64UrlFromBytes(new Uint8Array(sig));
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

export async function createAdminSessionToken(
  secret: string,
  username: string,
  ttlMs = DEFAULT_TTL_MS,
): Promise<string> {
  const exp = Date.now() + ttlMs;
  const payload = utf8ToB64Url(JSON.stringify({ exp, sub: username } satisfies SessionPayload));
  const sig = await hmacSha256B64Url(secret, payload);
  return `${payload}.${sig}`;
}

export async function parseAdminSessionToken(token: string, secret: string): Promise<SessionPayload | null> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmacSha256B64Url(secret, payload);
  if (!timingSafeEqualStr(expected, sig)) return null;
  try {
    const parsed = JSON.parse(b64UrlToUtf8(payload)) as SessionPayload;
    if (typeof parsed.exp !== "number" || parsed.exp <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}
