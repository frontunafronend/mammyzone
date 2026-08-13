import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement> & { title?: string };

function Svg({ title, children, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      width="1em"
      height="1em"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MarkMat(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="11" width="22" height="14" rx="1.5" {...stroke} />
      <path d="M5 16.5h22" {...stroke} />
    </Svg>
  );
}

export function MarkBelly(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M8 22c1.2-6 4.2-10 8-10s6.8 4 8 10" {...stroke} />
      <circle cx="16" cy="10" r="2.2" {...stroke} />
    </Svg>
  );
}

export function MarkTouch(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="14" r="5" {...stroke} />
      <circle cx="20" cy="18" r="5" {...stroke} />
    </Svg>
  );
}

export function MarkMind(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M8 20c0-5 3.2-9 8-9s8 4 8 9" {...stroke} />
      <path d="M12 20.5c.8 2 2.2 3 4 3s3.2-1 4-3" {...stroke} />
    </Svg>
  );
}

export function MarkCircle(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="16" r="8" {...stroke} />
      <circle cx="16" cy="11" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="11.2" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="20.8" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function MarkRetreat(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M6 22V12l10-6 10 6v10" {...stroke} />
      <path d="M13 22v-6h6v6" {...stroke} />
    </Svg>
  );
}

export const serviceMarks = [
  MarkMat,
  MarkBelly,
  MarkMind,
  MarkTouch,
  MarkCircle,
  MarkRetreat,
] as const;

export const heroMarks = [MarkMat, MarkBelly, MarkTouch, MarkMind] as const;
