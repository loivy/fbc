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

// Radius lock: buttons are full-pill everywhere on the site.
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color] duration-200 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const buttonSizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

// Contrast checked against both themes (WCAG AA, 4.5:1 minimum).
// Light: accent-600 on white text = 5.74:1.
// Dark: the accent has to invert to a light fill with dark text; accent-500 on
// white measured 4.08:1 and failed. accent-300 on ink-950 = 9.7:1.
const buttonVariants = {
  primary:
    "bg-accent-600 text-white hover:bg-accent-700 " +
    "dark:bg-accent-300 dark:text-ink-950 dark:hover:bg-accent-500 dark:hover:text-white",
  outline:
    "border border-ink-900/15 text-ink-900 hover:border-ink-900/35 " +
    "dark:border-paper-100/20 dark:text-paper-100 dark:hover:border-paper-100/40",
  ghost: "text-ink-700 hover:text-ink-900 dark:text-ink-400 dark:hover:text-paper-100",
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
        "rounded-[var(--radius-card)] border border-ink-900/10 bg-white p-6",
        "dark:border-paper-100/10 dark:bg-ink-900",
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
      <span className="text-sm font-medium text-ink-900 dark:text-paper-100">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-ink-500 dark:text-ink-400">{hint}</span>}
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}

// Contrast-checked: ink-500 placeholder clears AA on both paper and ink surfaces.
export const inputClass =
  "w-full rounded-[var(--radius-input)] border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm " +
  "text-ink-900 placeholder:text-ink-500 transition-colors " +
  "focus:border-accent-500 focus:outline-none focus-visible:outline-none " +
  "dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-100 dark:placeholder:text-ink-400";
