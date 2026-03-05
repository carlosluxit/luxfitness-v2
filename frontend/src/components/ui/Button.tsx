"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { MoveRight } from "lucide-react";

type ButtonVariant = "primary" | "outline" | "text";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const styles: Record<ButtonVariant, string> = {
    primary:
      "gap-3 px-8 py-3.5 text-[13px] tracking-[0.06em] font-medium bg-accent text-background hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(196,163,90,0.25)] group",
    outline:
      "group gap-3 px-7 py-3.5 text-[13px] tracking-[0.04em] text-foreground/60 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] hover:text-foreground",
    text: "gap-2 text-[13px] tracking-[0.02em] text-muted-foreground hover:text-foreground",
  };

  const classes = clsx(
    "inline-flex items-center whitespace-nowrap transition-all duration-500 ease-out",
    styles[variant],
    disabled && "opacity-30 pointer-events-none",
    className
  );

  const inner =
    variant === "primary" ? (
      <>
        <span>{children}</span>
        <MoveRight className="w-4 h-4 text-background/70 group-hover:text-background group-hover:translate-x-0.5 transition-all duration-500" />
      </>
    ) : (
      <span>{children}</span>
    );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}
