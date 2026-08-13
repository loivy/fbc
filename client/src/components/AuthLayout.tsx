import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Two-panel auth shell: form on the left, editorial panel on the right. */
export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  aside,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  aside: ReactNode;
}) {
  return (
    <div className="grid min-h-[100dvh] bg-ink-950 lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link to="/" className="font-display text-xl tracking-tight text-paper-50">
          FBC
        </Link>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm py-12">
            <h1 className="text-3xl tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 leading-relaxed text-paper-400">{subtitle}</p>}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-sm text-paper-400">{footer}</div>}
          </div>
        </div>
      </div>

      <aside className="hidden border-l border-paper-200/10 bg-ink-900 px-12 py-16 lg:flex lg:flex-col lg:justify-center">
        {aside}
      </aside>
    </div>
  );
}

/** Inline, non-transient error. Contrast checked on both page surfaces. */
export function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-[var(--radius-input)] border border-red-400/25 bg-red-950/40 px-3.5 py-2.5 text-sm text-red-300"
    >
      {message}
    </p>
  );
}
