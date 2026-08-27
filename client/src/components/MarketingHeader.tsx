import { useState } from "react";
import { Link } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ButtonLink, Container, cn } from "./ui";

// Kept short so the row stays on one line at lg. Anchors are prefixed with "/"
// so they resolve from any page, not just the landing page.
const navLinks = [
  { label: "What we do", href: "/#advisory" },
  { label: "Mentors", href: "/mentors" },
  { label: "Network", href: "/#partners" },
  { label: "Fund", href: "/#fund" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200/10 bg-ink-950/85 backdrop-blur-md">
      {/* Height stays under the 80px cap: h-16 desktop. */}
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl tracking-tight text-paper-50">
            FBC
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-paper-400 transition-colors hover:text-paper-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="px-3 text-sm text-paper-400 transition-colors hover:text-paper-50"
            >
              Log in
            </Link>
            <ButtonLink to="/apply">Submit your company</ButtonLink>
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

      <div className={cn("border-t border-paper-200/10 md:hidden", open ? "block" : "hidden")}>
        <Container>
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-paper-400"
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" className="py-2 text-sm text-paper-400">
              Log in
            </Link>
            <ButtonLink to="/apply" className="mt-2 w-full">
              Submit your company
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
