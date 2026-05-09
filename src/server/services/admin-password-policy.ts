import { isNodeProduction, isVercelProduction } from "@/server/config/runtime-flags";

/** Known-weak values (lowercased). */
const WEAK_SUBSTRINGS = [
  "password",
  "admin123",
  "12345678",
  "123456789",
  "qwerty",
  "welcome",
  "changeme",
  "letmein",
  "mammyzone",
  "ortaltul",
] as const;

export function getAdminPasswordMinimumLength(): number {
  if (isVercelProduction() || isNodeProduction()) return 12;
  return 8;
}

/**
 * Returns an error message if the configured password is unacceptable, or null if OK.
 * Never log the password.
 */
export function getEnvPasswordPolicyViolation(password: string, username: string): string | null {
  const min = getAdminPasswordMinimumLength();
  if (password.length < min) {
    return `ADMIN_PASSWORD must be at least ${min} characters for this environment.`;
  }

  const lower = password.toLowerCase();
  const ulower = username.trim().toLowerCase();

  if (ulower.length >= 3 && lower.includes(ulower)) {
    return "ADMIN_PASSWORD must not contain the username.";
  }

  for (const w of WEAK_SUBSTRINGS) {
    if (lower === w || lower.includes(w)) {
      return "ADMIN_PASSWORD is too common; choose a stronger secret.";
    }
  }

  if (/^(.)\1{7,}$/.test(password)) {
    return "ADMIN_PASSWORD must not be a single repeated character.";
  }

  return null;
}
