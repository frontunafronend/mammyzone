"use client";

import type { ImgHTMLAttributes } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { MEDIA_FALLBACK_PATH } from "@/lib/media/unsplash";

function parseDim(
  v: ImgHTMLAttributes<HTMLImageElement>["width"] | ImgHTMLAttributes<HTMLImageElement>["height"],
  fallback: number,
): number {
  if (typeof v === "number" && Number.isFinite(v) && v > 0) return v;
  if (typeof v === "string") {
    const n = parseInt(v, 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return fallback;
}

/** MDX default `<img>` → same fallback chain as marketing `SafeImage`. */
export function MdxSafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, width, height, className, loading } = props;
  if (!src || typeof src !== "string") return null;

  const w = parseDim(width, 1200);
  const h = parseDim(height, 630);
  const label =
    typeof alt === "string" && alt.trim().length > 0 ? alt.trim() : "Article illustration";

  return (
    <SafeImage
      sources={[src.trim(), MEDIA_FALLBACK_PATH]}
      alt={label}
      width={w}
      height={h}
      className={className}
      loading={loading === "eager" ? "eager" : "lazy"}
      completeChain={false}
    />
  );
}
