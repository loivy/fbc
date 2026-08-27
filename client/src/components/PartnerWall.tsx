import { useState } from "react";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, Section } from "./ui";

export interface Partner {
  name: string;
  /** Root domain. Drives the logo lookup, so only set it when it is certainly right. */
  domain?: string;
  href?: string;
}

/*
  Two separate claims, kept separate on purpose: funds and programmes FBC
  partners with, and accelerators that people in the community are part of.

  Ordered by recognition, most recognised first.

  Logos are fetched by domain rather than bundled, because we hold no licence to
  redistribute these brands' logo files. A partner without a confident domain
  falls back to a monogram, which is also what happens if a fetch fails or comes
  back as a generic placeholder icon. Never guess a domain: the wrong one shows
  a different company's logo.
*/
export const partnerFunds: Partner[] = [
  { name: "Sequoia Capital", domain: "sequoiacap.com", href: "https://www.sequoiacap.com" },
  { name: "a16z", domain: "a16z.com", href: "https://a16z.com" },
  { name: "Insight Partners", domain: "insightpartners.com", href: "https://www.insightpartners.com" },
  { name: "Pear", domain: "pear.vc", href: "https://pear.vc" },
  { name: "Antler", domain: "antler.co", href: "https://www.antler.co" },
  // TODO(content): add domains for these three so their logos resolve.
  { name: "Future Capital" },
  { name: "Vision Plus Capital" },
  { name: "Tech-do VC" },
];

export const communityAccelerators: Partner[] = [
  { name: "Y Combinator", domain: "ycombinator.com", href: "https://www.ycombinator.com" },
  {
    name: "South Park Commons",
    domain: "southparkcommons.com",
    href: "https://www.southparkcommons.com",
  },
];

export function PartnerWall({
  funds = partnerFunds,
  accelerators = communityAccelerators,
}: {
  funds?: Partner[];
  accelerators?: Partner[];
}) {
  if (funds.length === 0 && accelerators.length === 0) return null;

  return (
    <Section id="partners" className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <Reveal>
          <Eyebrow>Network</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] text-3xl leading-[1.1] md:text-5xl">
            The rooms we can get you into
          </h2>
        </Reveal>

        {funds.length > 0 && (
          <PartnerGroup
            label="Partner funds and programmes"
            note="Where we make introductions."
            items={funds}
            delay={0.08}
          />
        )}

        {accelerators.length > 0 && (
          <PartnerGroup
            label="Members have gone on to"
            note="Programmes people from the community joined."
            items={accelerators}
            delay={0.16}
          />
        )}
      </Container>
    </Section>
  );
}

function PartnerGroup({
  label,
  note,
  items,
  delay,
}: {
  label: string;
  note: string;
  items: Partner[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="mt-14 border-t border-paper-200/10 pt-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">{label}</p>
          <p className="text-sm text-paper-500">{note}</p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((partner) => (
            <li key={partner.name}>
              <PartnerMark partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* Logo chip plus wordmark. No category label underneath. */
function PartnerMark({ partner }: { partner: Partner }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(partner.domain) && !logoFailed;

  const inner = (
    <span className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-paper-50">
        {showLogo ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="h-7 w-7 object-contain"
            onLoad={(e) => {
              // The service answers with a small generic globe for domains it
              // cannot resolve. Treat anything tiny as a miss.
              if (e.currentTarget.naturalWidth < 32) setLogoFailed(true);
            }}
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="font-display text-lg text-ink-950">{partner.name.charAt(0)}</span>
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
