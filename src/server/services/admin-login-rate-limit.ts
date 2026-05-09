type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 15;

const buckets = new Map<string, Bucket>();

function prune(now: number): void {
  if (buckets.size < 500) return;
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
}

/**
 * In-memory login throttle (per Node instance). Replace with Redis for multi-instance production if needed.
 * @returns true if attempt is allowed, false if rate limited.
 */
export function consumeAdminLoginSlot(clientKey: string): boolean {
  const now = Date.now();
  prune(now);
  const key = clientKey.slice(0, 128) || "unknown";
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= MAX_ATTEMPTS) return false;
  b.count += 1;
  return true;
}
