import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

/** Small mono label above a section headline. Used sparingly, not on every section. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

// Radius lock: buttons are full-pill everywhere on the site.
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const buttonSizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

/*
  Contrast is measured, not assumed. On the accent-500 fill, white text is
  3.8:1 and fails AA, so the primary button uses near-black text at 5.2:1.
*/
const buttonVariants = {
  primary: "bg-accent-500 text-ink-950 hover:bg-accent-400",
  outline: "border border-paper-200/25 text-paper-50 hover:border-paper-200/55",
  ghost: "text-paper-400 hover:text-paper-50",
} as const;

interface ButtonStyleProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
}

export function buttonClass({ variant = "primary", size = "md", className }: ButtonStyleProps = {}) {
  return cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
}

export function Button({
  children,
  variant,
  size,
  className,
  ...rest
}: ButtonStyleProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  children,
  variant,
  size,
  className,
}: ButtonStyleProps & { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={buttonClass({ variant, size, className })}>
      {children}
    </Link>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-paper-50">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-paper-500">{hint}</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

// paper-400 placeholder on the ink-900 field clears AA.
export const inputClass =
  "w-full rounded-[var(--radius-input)] border border-paper-200/15 bg-ink-900 px-3.5 py-2.5 text-sm " +
  "text-paper-50 placeholder:text-paper-400 transition-colors " +
  "focus:border-accent-500 focus:outline-none focus-visible:outline-none";
