/** Process env flags only — safe for any module (no validation side effects). */

const VERCEL_PROD = process.env.VERCEL_ENV === "production";
const NODE_PROD = process.env.NODE_ENV === "production";

export function isVercelProduction(): boolean {
  return VERCEL_PROD;
}

export function isNodeProduction(): boolean {
  return NODE_PROD;
}
