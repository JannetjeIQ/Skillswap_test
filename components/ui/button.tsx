import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

// Simple button that mimics shadcn style tokens without full generator.
export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-teal-700 px-4 py-2",
    outline:
      "border border-muted bg-card text-foreground hover:bg-muted px-4 py-2",
    ghost: "text-foreground hover:bg-muted px-3 py-2",
  };

  return (
    <button
      className={twMerge(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

