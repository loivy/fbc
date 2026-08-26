import { Reveal } from "./Reveal";
import { Container, Eyebrow, Section } from "./ui";

export interface Partner {
  name: string;
  href?: string;
}

/*
  Two separate claims, kept separate on purpose because they are not the same
  thing: funds FBC holds a partnership with, and accelerators that people in the
  community are currently part of. Collapsing them would overstate both.

  Real names only, supplied by the FBC team. Add to these arrays to extend either
  list; each group hides itself when empty.

  Wordmarks rather than logo files: these are third-party brands whose logo
  assets we hold no licence to redistribute, and most of these marks are
  wordmarks anyway.
*/
export const partnerFunds: Partner[] = [
  { name: "Sequoia", href: "https://www.sequoiacap.com" },
];

export const communityAccelerators: Partner[] = [
  { name: "Y Combinator", href: "https://www.ycombinator.com" },
  { name: "Pear VC", href: "https://pear.vc" },
  { name: "a16z", href: "https://a16z.com" },
  { name: "South Park Commons", href: "https://www.southparkcommons.com" },
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
            The rooms our founders are already in
          </h2>
        </Reveal>

        {funds.length > 0 && (
          <PartnerGroup
            label="Partner funds"
            note="Funds we work with directly."
            items={funds}
            delay={0.08}
          />
        )}

        {accelerators.length > 0 && (
          <PartnerGroup
            label="Community members are building at"
            note="Programmes people in the FBC community are part of."
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
    <span className="font-display text-xl tracking-tight text-paper-200 transition-colors hover:text-paper-50 sm:text-2xl">
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
