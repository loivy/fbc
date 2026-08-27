import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ButtonLink, Container, cn } from "./ui";

/*
  Nav order mirrors the company hierarchy: the founder network first, capital and
  advisory downstream of it. Advisory is deliberately not the first item.
  Four items keeps the row on one line at lg.
*/
const navLinks = [
  { label: "Founders", to: "/founders" },
  { label: "Investors", to: "/investors" },
  { label: "Advisory", to: "/advisory" },
  { label: "About", to: "/about" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // A route change with the mobile panel still open leaves it covering the new page.
  useEffect(() => setOpen(false), [pathname]);

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
              <Link
                key={link.to}
                to={link.to}
                aria-current={pathname === link.to ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-paper-50",
                  pathname === link.to ? "text-paper-50" : "text-paper-400",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="px-3 text-sm text-paper-400 transition-colors hover:text-paper-50"
            >
              Log in
            </Link>
            <ButtonLink to="/apply">Join FBC</ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            /* -mr-2.5 keeps the icon optically aligned while the tap area stays 44px. */
            className="-mr-2.5 flex h-11 w-11 items-center justify-center md:hidden"
          >
            {open ? <XIcon size={22} weight="bold" /> : <ListIcon size={22} weight="bold" />}
          </button>
        </div>
      </Container>

      <div className={cn("border-t border-paper-200/10 md:hidden", open ? "block" : "hidden")}>
        <Container>
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="py-2 text-sm text-paper-400">
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="py-2 text-sm text-paper-400">
              Log in
            </Link>
            <ButtonLink to="/apply" className="mt-2 w-full">
              Join FBC
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
