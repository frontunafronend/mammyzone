/**
 * Server-only environment validation. Do not import from client components.
 * Secrets (DATABASE_URL, ADMIN_*) must never be passed to the browser.
 */

import { getEnvPasswordPolicyViolation } from "@/server/services/admin-password-policy";
import { isVercelProduction } from "@/server/config/runtime-flags";

const VERCEL_PROD = isVercelProduction();

/** Re-export for call sites that already import from `env`. */
export { isVercelProduction, isNodeProduction } from "@/server/config/runtime-flags";

function isValidHttpUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export type EnvValidationResult = { ok: true } | { ok: false; errors: string[] };

/**
 * Validates env for **deployed** Vercel production.
 */
export function validateProductionDeploymentEnv(): EnvValidationResult {
  const errors: string[] = [];
  if (!VERCEL_PROD) return { ok: true };

  const db = process.env.DATABASE_URL?.trim();
  if (!db) errors.push("DATABASE_URL is required on Vercel production.");

  const direct = process.env.DIRECT_URL?.trim();
  if (!direct) {
    errors.push(
      "DIRECT_URL is required on Vercel production (Neon non-pooled connection for Prisma; see .env.example).",
    );
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!site) errors.push("NEXT_PUBLIC_SITE_URL is required on Vercel production.");
  else if (!isValidHttpUrl(site)) errors.push("NEXT_PUBLIC_SITE_URL must be a valid http(s) URL.");

  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  const legacy = process.env.ADMIN_ACCESS_KEY?.trim();
  if (secret) {
    if (secret.length < 24) errors.push("ADMIN_SESSION_SECRET must be at least 24 characters on Vercel production.");
  } else if (!legacy || legacy.length < 16) {
    errors.push(
      "Set ADMIN_SESSION_SECRET (24+ characters) or legacy ADMIN_ACCESS_KEY (16+ characters) for session signing.",
    );
  }

  const user = process.env.ADMIN_USERNAME?.trim() || "admin";
  if (user.length < 2) errors.push("ADMIN_USERNAME must be at least 2 characters.");

  const pass = process.env.ADMIN_PASSWORD?.trim();
  if (!pass) errors.push("ADMIN_PASSWORD is required on Vercel production.");
  else {
    const viol = getEnvPasswordPolicyViolation(pass, user);
    if (viol) errors.push(viol);
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true };
}

/**
 * Throws after logging if Vercel production env is invalid (fail deploy early).
 */
export function assertProductionDeploymentEnvOrThrow(): void {
  const r = validateProductionDeploymentEnv();
  if (r.ok) return;
  const msg = `[mammyzone/env] Invalid production environment:\n${r.errors.map((e) => ` - ${e}`).join("\n")}`;
  console.error(msg);
  throw new Error(msg);
}

/** Validated public site URL for server-side use (metadata, emails). */
export function getValidatedPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && isValidHttpUrl(raw)) return raw.replace(/\/+$/, "");
  if (VERCEL_PROD) throw new Error("NEXT_PUBLIC_SITE_URL is missing or invalid.");
  return "http://localhost:3000";
}

export function getDatabaseUrlOrNull(): string | null {
  const u = process.env.DATABASE_URL?.trim();
  return u || null;
}
