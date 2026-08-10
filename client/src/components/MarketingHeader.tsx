import { useState } from "react";
import { Link } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ButtonLink, Container, cn } from "./ui";

const navLinks = [
  { label: "Advisory", href: "#advisory" },
  { label: "Investors", href: "#investors" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-paper-50/85 backdrop-blur-md dark:border-paper-100/10 dark:bg-ink-950/85">
      {/* Height stays under the 80px cap: h-16 desktop. */}
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight">
            FBC
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-700 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-paper-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="px-3 text-sm text-ink-700 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-paper-100"
            >
              Log in
            </Link>
            <ButtonLink to="/signup">Get started</ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden"
          >
            {open ? <XIcon size={22} weight="bold" /> : <ListIcon size={22} weight="bold" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-ink-900/8 md:hidden dark:border-paper-100/10",
          open ? "block" : "hidden",
        )}
      >
        <Container>
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-ink-700 dark:text-ink-400"
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" className="py-2 text-sm text-ink-700 dark:text-ink-400">
              Log in
            </Link>
            <ButtonLink to="/signup" className="mt-2 w-full">
              Get started
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
