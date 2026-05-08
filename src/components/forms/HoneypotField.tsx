"use client";

import { forwardRef } from "react";

/** Leave empty — bots often fill hidden fields (M040 spam guard). */
export const HoneypotField = forwardRef<HTMLInputElement>(function HoneypotField(_props, ref) {
  return (
    <input
      ref={ref}
      type="text"
      name="_company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hp-trap"
    />
  );
});
