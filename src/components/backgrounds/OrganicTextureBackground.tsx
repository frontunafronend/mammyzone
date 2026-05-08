type Props = {
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Linen-style weave via repeating linear gradients only — no bitmaps, no licensing.
 */
export function OrganicTextureBackground({
  tone = "light",
  className = "",
}: Props) {
  const isDark = tone === "dark";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${isDark ? "opacity-[0.5]" : "opacity-[0.42]"}`}
        style={{
          backgroundImage: isDark
            ? `repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,252,248,0.035) 5px, rgba(255,252,248,0.035) 6px),
               repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(255,252,248,0.028) 5px, rgba(255,252,248,0.028) 6px)`
            : `repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(196,168,130,0.06) 6px, rgba(196,168,130,0.06) 7px),
               repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(196,168,130,0.045) 6px, rgba(196,168,130,0.045) 7px)`,
          mixBlendMode: isDark ? "soft-light" : "multiply",
        }}
      />
    </div>
  );
}
