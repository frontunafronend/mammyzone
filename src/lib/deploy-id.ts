/** Build stamp — changes on every Vercel deploy so mobile can detect a stale page. */
export function getDeployId(): string {
  return (
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_BUILD_ID ||
    "dev"
  );
}

/** Critical palette inlined in HTML so a stale cached stylesheet cannot keep old colors. */
export const PALETTE_INLINE_CSS = `:root{--rose:#7a5c8c;--rose-light:#d4c6dc;--rose-pale:#eee8f2;--rose-deep:#4f3a5c;--sage:#5eb8b2;--sage-light:#c5e8e5;--sage-pale:#e8f5f4;--sand:#e2d6d4;--sand-deep:#b89a90;--cream:#f4f1f3;--cream-warm:#efe8e6;--ink:#2a1e24;--ink-soft:#5a4752;--ink-muted:#948490;--white:#fbf8f7;--clay:#7a5c8c;--clay-deep:#4f3a5c}`;
