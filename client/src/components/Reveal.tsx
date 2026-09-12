import type { ReactNode } from "react";

/**
 * Used to wrap content that previously had a scroll-entry fade-in via
 * Framer Motion. That library's motion.div crashed React's commit phase
 * when unmounted mid-animation while navigating away from a page (e.g.
 * landing -> /apply), which happens on every route change since Reveal
 * wraps nearly all page content. Rendering children directly removes the
 * animation but also the crash; delay/className are kept so call sites
 * don't need to change.
 */
export function Reveal({
  children,
  delay: _delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
