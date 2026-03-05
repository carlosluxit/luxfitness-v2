import { clsx } from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  size?: "default" | "large";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  size = "default",
}: SectionHeadingProps) {
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-accent mb-6 md:mb-8 [text-shadow:0_0_20px_rgba(196,163,90,0.5),0_0_40px_rgba(196,163,90,0.2)]">
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-foreground",
          size === "large" ? "text-fluid-display" : "text-fluid-title"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 md:mt-6 text-muted-foreground text-[15px] leading-[1.7]",
            align === "center" ? "max-w-lg mx-auto" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
