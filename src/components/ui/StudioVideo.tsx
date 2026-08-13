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
};

export function StudioVideo({
  src,
  poster,
  className,
  autoPlayInView = false,
  controls = false,
  autoPlay = false,
}: StudioVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlayInView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlayInView, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
      autoPlay={autoPlay}
      aria-hidden={autoPlayInView || undefined}
    />
  );
}
