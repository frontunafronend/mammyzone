/** Vine lattice — noon shade across limestone. Decorative; no interaction. */
export function CourtyardLattice({
  tone = "sun",
  className = "",
}: {
  tone?: "sun" | "shade";
  className?: string;
}) {
  return (
    <div
      className={`courtyard-lattice courtyard-lattice--${tone} ${className}`.trim()}
      aria-hidden
    />
  );
}
