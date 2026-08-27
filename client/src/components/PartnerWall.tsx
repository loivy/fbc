import { useState } from "react";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

export interface Partner {
  name: string;
  /** Root domain. Drives the logo lookup, so only set it when it is certainly right. */
  domain?: string;
  /** A local asset (ideally SVG) wins over the domain lookup. Best-quality option. */
  logoSrc?: string;
  href?: string;
}

/*
  One wall covering both relationships: funds and programmes FBC works with, and
  the programmes members are part of. They are stated together in the note rather
  than split into groups, so no individual name is claimed to be both.

  Ordered by recognition, most recognised first.

  Logos are fetched by domain rather than bundled, because we hold no licence to
  redistribute these brands' logo files. A partner without a confident domain
  falls back to a monogram, which is also what happens if a fetch fails or comes
  back as a generic placeholder icon. Never guess a domain: the wrong one shows a
  different company's logo.
*/
export const partners: Partner[] = [
  { name: "Sequoia Capital", domain: "sequoiacap.com", href: "https://www.sequoiacap.com" },
  { name: "a16z", domain: "a16z.com", href: "https://a16z.com" },
  { name: "Y Combinator", domain: "ycombinator.com", href: "https://www.ycombinator.com" },
  {
    name: "Insight Partners",
    domain: "insightpartners.com",
    href: "https://www.insightpartners.com",
  },
  { name: "Pear", domain: "pear.vc", href: "https://pear.vc" },
  { name: "Antler", domain: "antler.co", href: "https://www.antler.co" },
  {
    name: "South Park Commons",
    domain: "southparkcommons.com",
    href: "https://www.southparkcommons.com",
  },
  // TODO(content): add domains for these three so their logos resolve.
  { name: "Future Capital" },
  { name: "Vision Plus Capital" },
  { name: "Tech-do VC" },
];

/**
 * Restrained credibility strip. No headline of its own: it sits directly under
 * the hero to answer "are these people relevant to me" without competing with
 * the positioning above it.
 *
 * The label states the relationship precisely. It does not claim these
 * organisations endorse, sponsor, or invest in FBC.
 */
export function PartnerWall({ items = partners }: { items?: Partner[] }) {
  if (items.length === 0) return null;

  return (
    <section id="partners" className="border-y border-paper-200/10 bg-ink-900 py-14">
      <Container>
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">
            Funds and programmes we partner and collaborate with
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((partner) => (
              <li key={partner.name}>
                <PartnerMark partner={partner} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/* Logo mark plus wordmark. No chip behind it, no category label underneath. */
function PartnerMark({ partner }: { partner: Partner }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const src =
    partner.logoSrc ??
    (partner.domain ? `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128` : null);
  const showLogo = Boolean(src) && !logoFailed;

  const inner = (
    <span className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">
        {showLogo ? (
          <img
            src={src!}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            /*
              These marks sit straight on the dark surface with no plate behind
              them. `screen` drops the near-black backing that most of these
              favicons ship with, so the mark reads instead of showing as a
              square. Supply `logoSrc` with a transparent SVG to skip the
              blending entirely.
            */
            className="h-8 w-8 object-contain opacity-90 mix-blend-screen transition-opacity group-hover:opacity-100"
            onLoad={(e) => {
              // The service answers with a small generic globe for domains it
              // cannot resolve. Treat anything tiny as a miss.
              if (e.currentTarget.naturalWidth < 32) setLogoFailed(true);
            }}
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper-200/20 font-display text-sm text-paper-200">
            {partner.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="font-display text-base leading-tight text-paper-200 transition-colors group-hover:text-paper-50 sm:text-lg">
        {partner.name}
      </span>
    </span>
  );

  if (!partner.href) return <span className="group">{inner}</span>;

  return (
    <a href={partner.href} target="_blank" rel="noreferrer noopener" className="group">
      {inner}
    </a>
  );
}
