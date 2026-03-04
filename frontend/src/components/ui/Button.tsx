import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-black font-medium hover:bg-accent-hover active:scale-[0.98]",
  secondary:
    "border border-border text-foreground hover:border-muted hover:bg-surface-hover active:scale-[0.98]",
  ghost: "text-muted-foreground hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wider",
  md: "px-6 py-3 text-sm tracking-wider",
  lg: "px-8 py-4 text-sm tracking-wider",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 ease-out rounded-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-40 pointer-events-none",
    className
  );

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
