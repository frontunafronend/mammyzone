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
export const PALETTE_INLINE_CSS = `:root{--rose:#b85070;--rose-light:#e8c4cf;--rose-pale:#f7eef1;--rose-deep:#7a2d45;--sage:#7a9e8e;--sage-light:#c4deda;--sage-pale:#eef6f4;--sand:#e8ddd0;--sand-deep:#c4a882;--cream:#faf7f2;--cream-warm:#f3ede4;--ink:#2a1f1a;--ink-soft:#5c4a40;--ink-muted:#9a8a80;--white:#fffcf8;--clay:#b85070;--clay-deep:#7a2d45}`;
