"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Slight stagger index 0–4 for sibling sections */
  stagger?: 0 | 1 | 2 | 3 | 4;
};

export function SectionReveal({
  children,
  className = "",
  stagger = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass =
    stagger === 0
      ? ""
      : stagger === 1
        ? " section-io-delay-1"
        : stagger === 2
          ? " section-io-delay-2"
          : stagger === 3
            ? " section-io-delay-3"
            : " section-io-delay-4";

  return (
    <div
      ref={ref}
      className={`section-io${delayClass}${visible ? " section-io--visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
