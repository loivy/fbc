import { Reveal } from "./Reveal";
import { Container, Eyebrow, Section } from "./ui";

export interface Partner {
  name: string;
  href?: string;
}

/*
  Real names only, supplied by the FBC team. Wordmarks rather than logo files:
  these are third-party brands whose logo assets we do not hold a licence to
  redistribute, and most VC marks are wordmarks anyway.
  Each group hides itself when empty.
*/
export const accelerators: Partner[] = [
  { name: "Y Combinator", href: "https://www.ycombinator.com" },
  { name: "a16z", href: "https://a16z.com" },
  { name: "South Park Commons", href: "https://www.southparkcommons.com" },
  { name: "Pear VC", href: "https://pear.vc" },
];

export const funds: Partner[] = [{ name: "Sequoia", href: "https://www.sequoiacap.com" }];

export function PartnerWall({
  acceleratorItems = accelerators,
  fundItems = funds,
}: {
  acceleratorItems?: Partner[];
  fundItems?: Partner[];
}) {
  if (acceleratorItems.length === 0 && fundItems.length === 0) return null;

  return (
    <Section id="partners" className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <Reveal>
          <Eyebrow>Founder outcomes</Eyebrow>
          <h2 className="mt-4 max-w-[22ch] text-3xl leading-[1.1] md:text-5xl">
            Where founders from the platform have landed
          </h2>
        </Reveal>

        {acceleratorItems.length > 0 && (
          <PartnerGroup label="Accepted into" items={acceleratorItems} delay={0.08} />
        )}
        {fundItems.length > 0 && <PartnerGroup label="Raised from" items={fundItems} delay={0.16} />}
      </Container>
    </Section>
  );
}

function PartnerGroup({
  label,
  items,
  delay,
}: {
  label: string;
  items: Partner[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="mt-14 border-t border-paper-200/10 pt-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">{label}</p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-14">
          {items.map((partner) => (
            <li key={partner.name}>
              <Wordmark partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* Wordmark only. No category label underneath. */
function Wordmark({ partner }: { partner: Partner }) {
  const mark = (
    <span className="font-display text-xl font-medium tracking-tight text-paper-200 transition-colors hover:text-paper-50 sm:text-2xl">
      {partner.name}
    </span>
  );

  if (!partner.href) return mark;

  return (
    <a href={partner.href} target="_blank" rel="noreferrer noopener">
      {mark}
    </a>
  );
}
