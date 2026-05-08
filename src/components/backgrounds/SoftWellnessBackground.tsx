"use client";

import { useId } from "react";

/** SVG fractal noise — same technique as hero grain; no external image file or rights. */
const NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E";

export type SoftWellnessTone = "light" | "dark";

/** `quiet` skips extra noise (hero already has cinematic grain). */
export type SoftWellnessVariant = "full" | "quiet";

type Props = {
  tone?: SoftWellnessTone;
  variant?: SoftWellnessVariant;
  className?: string;
  /** Original inline SVG paths — not stock photography. */
  showBotanical?: boolean;
};

export function SoftWellnessBackground({
  tone = "light",
  variant = "full",
  className = "",
  showBotanical = true,
}: Props) {
  const rawId = useId();
  const patternId = `mz-botanical-${rawId.replace(/:/g, "")}`;
  const isDark = tone === "dark";
  const showNoise = variant === "full";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 90% 72% at 18% 0%, rgba(184, 80, 112, 0.16), transparent 58%),
               radial-gradient(ellipse 75% 55% at 100% 100%, rgba(122, 158, 142, 0.12), transparent 50%)`
            : `radial-gradient(ellipse 74% 56% at 90% 6%, rgba(238, 246, 244, 0.88), transparent 56%),
               radial-gradient(ellipse 70% 54% at 6% 94%, rgba(247, 238, 241, 0.92), transparent 52%),
               radial-gradient(ellipse 50% 42% at 48% 50%, rgba(250, 247, 242, 0.35), transparent 72%)`,
        }}
      />

      <div
        className={`absolute -start-[20%] top-[6%] h-[min(52vw,500px)] w-[min(52vw,500px)] rounded-full blur-3xl ${
          isDark ? "bg-[rgba(122,158,142,0.16)]" : "bg-[rgba(196,222,218,0.38)]"
        } opacity-90`}
      />
      <div
        className={`absolute -end-[16%] bottom-[4%] h-[min(46vw,420px)] w-[min(46vw,420px)] rounded-full blur-3xl ${
          isDark ? "bg-[rgba(184,80,112,0.14)]" : "bg-[rgba(232,196,207,0.42)]"
        } opacity-85`}
      />

      {showNoise ? (
        <div
          className={`absolute inset-0 mix-blend-multiply ${isDark ? "opacity-[0.045]" : "opacity-[0.026]"}`}
          style={{ backgroundImage: `url("${NOISE_DATA_URL}")` }}
        />
      ) : null}

      {showBotanical ? (
        <svg
          className={`absolute inset-0 h-full w-full ${
            isDark ? "text-[rgba(232,196,207,0.55)] opacity-[0.055]" : "text-[var(--rose)] opacity-[0.034]"
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              width="128"
              height="128"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M14 96 Q28 58 52 48 Q38 66 34 100 M102 22 Q84 40 74 60 Q96 44 112 32 M64 118 Q58 86 76 74"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      ) : null}
    </div>
  );
}
