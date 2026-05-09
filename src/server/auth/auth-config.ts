/**
 * Server-only admin configuration. Never import this module into client components.
 */

import { getEnvPasswordPolicyViolation } from "@/server/services/admin-password-policy";

export function getAdminSessionSecret(): string | null {
  const primary = process.env.ADMIN_SESSION_SECRET?.trim();
  if (primary && primary.length >= 16) return primary;
  const legacy = process.env.ADMIN_ACCESS_KEY?.trim();
  if (legacy && legacy.length >= 8) return legacy;
  return null;
}

export function getAdminCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME?.trim() || "admin";
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password || password.length < 8) return null;

  const policy = getEnvPasswordPolicyViolation(password, username);
  if (policy) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[mammyzone] ADMIN_PASSWORD rejected: ${policy}`);
    }
    return null;
  }

  return { username, password };
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminSessionSecret() && getAdminCredentials());
}
