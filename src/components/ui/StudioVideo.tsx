"use client";

import { useEffect, useRef } from "react";

type StudioVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** When true, autoplay muted while in view. Lightbox uses controls instead. */
  autoPlayInView?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  preload?: "none" | "metadata" | "auto";
  label?: string;
};

export function StudioVideo({
  src,
  poster,
  className,
  autoPlayInView = false,
  controls = false,
  autoPlay = false,
  preload = "metadata",
  label,
}: StudioVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.pause();
      return;
    }
    if (autoPlay) {
      void el.play().catch(() => {});
    }
    if (!autoPlayInView) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, autoPlayInView, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={preload}
      controls={controls}
      autoPlay={autoPlay}
      aria-label={label}
      aria-hidden={label ? undefined : autoPlayInView || undefined}
    />
  );
}
