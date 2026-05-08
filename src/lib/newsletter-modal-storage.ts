/** localStorage keys — shared with Footer when user joins from either surface */
export const NL_SUBSCRIBED_KEY = "mz_nl_subscribed";
export const NL_MODAL_SNOOZE_UNTIL_KEY = "mz_nl_modal_snooze_until";

/** First open after load — gentle delay before interrupting */
export const NEWSLETTER_MODAL_FIRST_DELAY_MS = 50_000;

/** Ask again after user dismisses (couple of hours) */
export const NEWSLETTER_MODAL_INTERVAL_MS = 2 * 60 * 60 * 1000;

export function readSnoozeUntil(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(NL_MODAL_SNOOZE_UNTIL_KEY);
    if (!raw) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function writeSnoozeUntil(ts: number) {
  try {
    localStorage.setItem(NL_MODAL_SNOOZE_UNTIL_KEY, String(ts));
  } catch {
    /* private mode / quota */
  }
}

export function isNewsletterSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(NL_SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setNewsletterSubscribed() {
  try {
    localStorage.setItem(NL_SUBSCRIBED_KEY, "1");
  } catch {
    /* ignore */
  }
}
