import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Use for inner pages that need top spacing below fixed nav */
  withNavOffset?: boolean;
};

/**
 * Consistent horizontal rhythm and optional top offset for non-hero pages.
 */
export function PageShell({
  children,
  className = "",
  withNavOffset = false,
}: PageShellProps) {
  return (
    <div
      className={`page-shell mx-auto w-full max-w-site px-[clamp(1.25rem,5vw,5rem)] ${withNavOffset ? "page-shell--nav-offset" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
