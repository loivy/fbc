import { Reveal } from "./Reveal";
import { Container, Section } from "./ui";

export interface Partner {
  /** Display name of the accelerator or fund. */
  name: string;
  /**
   * Simple Icons slug, when the brand has one (https://simpleicons.org).
   * Leave undefined to fall back to a monogram tile.
   */
  slug?: string;
  /** Optional link to the partner's site. */
  href?: string;
}

/*
  Real partners only. This list is empty until confirmed names are supplied,
  and the section hides itself while it is empty, so the live site never shows
  accelerator or fund logos the platform cannot actually claim.
*/
export const partners: Partner[] = [];

export function PartnerWall({ items = partners }: { items?: Partner[] }) {
  if (items.length === 0) return null;

  return (
    <Section
      id="partners"
      className="border-y border-ink-900/8 bg-paper-100 dark:border-paper-100/10 dark:bg-ink-900"
    >
      <Container>
        <Reveal>
          <h2 className="max-w-[24ch] text-3xl font-semibold md:text-4xl">
            Where our founders have landed
          </h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-ink-700 dark:text-ink-400">
            Accelerators and funds that have taken on founders from the platform.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((partner) => (
              <li key={partner.name} className="flex items-center justify-center">
                <PartnerMark partner={partner} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

/* Logo only. No category or industry label underneath. */
function PartnerMark({ partner }: { partner: Partner }) {
  const mark = partner.slug ? (
    <img
      // Single-color rendering keeps the wall coherent and readable in both themes.
      src={`https://cdn.simpleicons.org/${partner.slug}/6b7671`}
      alt={partner.name}
      width={112}
      height={32}
      loading="lazy"
      className="h-8 w-auto opacity-80 transition-opacity hover:opacity-100 dark:opacity-70 dark:invert-0"
    />
  ) : (
    <Monogram name={partner.name} />
  );

  if (!partner.href) return mark;

  return (
    <a href={partner.href} target="_blank" rel="noreferrer noopener" aria-label={partner.name}>
      {mark}
    </a>
  );
}

/** Fallback for brands Simple Icons does not carry. */
function Monogram({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 font-display text-sm font-semibold text-ink-700 dark:border-paper-100/20 dark:text-ink-400"
      >
        {initials}
      </span>
      <span className="font-display text-sm font-medium text-ink-700 dark:text-ink-400">{name}</span>
    </span>
  );
}
