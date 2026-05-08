"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import { MEDIA_FALLBACK_PATH } from "@/lib/media/unsplash";

type SafeImageProps = {
  /** Remote URLs first; final entry should be `/media-fallback.svg` when using `completeChain`. */
  sources: readonly string[];
  alt: string;
  /** When true, appends the local SVG once if missing from `sources`. */
  completeChain?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

/**
 * Tries each source in order on `onError` / failed decode, ending on a bundled SVG so the UI never shows a torn image.
 * Local `/…` assets skip the image optimizer (`unoptimized`) for fewer edge-case failures.
 */
export function SafeImage({
  sources,
  alt,
  completeChain = true,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
  loading,
}: SafeImageProps) {
  const chain = useMemo(() => {
    const list = sources
      .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      .map((s) => s.trim());
    if (completeChain && !list.includes(MEDIA_FALLBACK_PATH)) {
      list.push(MEDIA_FALLBACK_PATH);
    }
    if (list.length === 0) {
      return [MEDIA_FALLBACK_PATH];
    }
    return list;
  }, [sources, completeChain]);

  const chainKey = useMemo(() => chain.join("\u0001"), [chain]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [chainKey]);

  const safeIndex = Math.min(index, chain.length - 1);
  const src = chain[safeIndex] ?? MEDIA_FALLBACK_PATH;
  const isLocal = src.startsWith("/");

  const advance = useCallback(() => {
    setIndex((i) => (i >= chain.length - 1 ? i : i + 1));
  }, [chain.length]);

  const onError = useCallback(() => {
    advance();
  }, [advance]);

  const onLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (safeIndex >= chain.length - 1) return;
      if (img.naturalWidth === 0 || img.naturalHeight === 0) advance();
    },
    [advance, chain.length, safeIndex],
  );

  const mergedClassName = [className, "safe-image"].filter(Boolean).join(" ");

  const common = {
    src,
    className: mergedClassName,
    onError,
    onLoad,
    sizes,
    priority,
    unoptimized: isLocal,
    ...(priority ? {} : { loading: loading ?? ("lazy" as const) }),
  };

  const remountKey = `${chainKey}::${safeIndex}`;

  if (fill) {
    return (
      <Image
        key={remountKey}
        {...common}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
      />
    );
  }

  if (width == null || height == null) {
    throw new Error("SafeImage requires width and height unless fill is set");
  }

  return <Image key={remountKey} {...common} alt={alt} width={width} height={height} />;
}
