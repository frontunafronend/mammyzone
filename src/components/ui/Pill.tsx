import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  sage?: boolean;
  className?: string;
};

export function Pill({ children, sage, className = "" }: PillProps) {
  const base = sage ? "pill pill-sage" : "pill";
  return <span className={`${base} ${className}`.trim()}>{children}</span>;
}
