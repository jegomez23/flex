"use client";

import Link from "next/link";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

const variants = {
  primary:
    "border-white/10 bg-[linear-gradient(90deg,rgba(155,92,255,0.92),rgba(113,104,255,0.96))] text-white shadow-[0_12px_30px_rgba(155,92,255,0.18)]",
  secondary:
    "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/16 hover:bg-white/[0.07]",
  ghost:
    "border-transparent bg-transparent text-white/66 hover:bg-white/5",
};

export function NeonButton({
  asChild,
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition duration-300 hover:-translate-y-0.5",
    "backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
    sizes[size],
    variants[variant],
    className,
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(buttonClassName, children.props.className),
    });
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export function NeonLink(props) {
  return <Link {...props} />;
}
