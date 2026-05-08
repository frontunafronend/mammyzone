import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "white";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  white: "btn-white",
};

type LinkButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type NativeButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: undefined;
} & ComponentPropsWithoutRef<"button">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const cls = `${variantClass[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...linkRest } = props as LinkButtonProps;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...btnRest } = props as NativeButtonProps;
  return (
    <button type={type} className={cls} {...btnRest}>
      {children}
    </button>
  );
}
