import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MarketingHeader } from "./MarketingHeader";
import { Container } from "./ui";

const footerLinks = [
  { label: "Founders", to: "/founders" },
  { label: "Investors", to: "/investors" },
  { label: "Advisory", to: "/advisory" },
  { label: "Mentors", to: "/mentors" },
  { label: "About", to: "/about" },
  { label: "Join FBC", to: "/apply" },
];

/**
 * Shared shell for every public page, so the nav, footer, and page-title
 * handling stay in one place instead of being repeated per page.
 */
export function MarketingLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  const { pathname } = useLocation();

  // This is a client-rendered SPA, so the document title has to be set per route.
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }
  }, [title, description]);

  // useLayoutEffect, not useEffect: this must land before Reveal's children
  // run their whileInView check, or that check sees the old scroll offset and
  // above-the-fold content can mount permanently hidden until a hard refresh.
  useLayoutEffect(() => window.scrollTo({ top: 0 }), [pathname]);

  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <MarketingHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-paper-200/10 py-12">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="font-display text-lg text-paper-50">FBC</p>
            <p className="mt-1 max-w-[38ch] text-sm text-paper-500">
              A curated network for ambitious founders and builders.
            </p>
          </div>
          {/* py-1.5 keeps these above a comfortable tap height on mobile. */}
          <nav className="-my-1.5 flex flex-wrap gap-x-6 text-sm text-paper-400">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="py-1.5 hover:text-paper-50">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
