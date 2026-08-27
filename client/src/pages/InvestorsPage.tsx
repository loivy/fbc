import { ArrowRightIcon } from "@phosphor-icons/react";
import { MarketingLayout } from "../components/MarketingLayout";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

/*
  Deliberately avoids claiming proprietary deal flow, exclusive access, or first
  look. None of that is supported today, and investors are the audience most
  likely to notice an unsupported claim.
*/
const value = [
  {
    title: "Curated discovery",
    body: "Founders selected for relevance, rather than another database of every company that exists.",
  },
  {
    title: "Context beyond the deck",
    body: "The founder, the stage, the timing, and what they are actually solving, before the first call.",
  },
  {
    title: "Relationships, not outbound",
    body: "Meet founders through a network that already knows them, rather than cold introductions.",
  },
];

export function InvestorsPage() {
  return (
    <MarketingLayout
      title="FBC | For Investors"
      description="Discover ambitious founders through a curated network built on trusted relationships and relevant context."
    >
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>For investors</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                High-signal founders. Less noise.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper-400">
                Discover ambitious founders through a curated network built on trusted relationships
                and relevant context.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ButtonLink to="/signup" size="lg" className="mt-9">
                Join the Investor Network
                <ArrowRightIcon size={18} weight="bold" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-paper-200/10 bg-ink-900">
        <Container>
          <dl className="grid gap-12 md:grid-cols-3 md:gap-8">
            {value.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border-t border-paper-200/15 pt-6">
                  <dt className="font-display text-2xl text-paper-50">{item.title}</dt>
                  <dd className="mt-3 leading-relaxed text-paper-400">{item.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="text-3xl leading-[1.1] md:text-4xl">Where the founders come from</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <p className="max-w-[60ch] text-lg leading-relaxed text-paper-400">
                Researchers moving out of the lab, engineers leaving large technology companies,
                repeat founders starting again, and technical first-time founders who have not
                launched publicly yet.
              </p>
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-paper-400">
                Many of them are building before they are visible. That is usually the point at
                which a useful conversation is still possible.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-[24ch] text-3xl leading-[1.1] md:text-4xl">
                See founders while it is still early.
              </h2>
              <div className="mt-9 flex justify-center">
                <ButtonLink to="/signup" size="lg">
                  Join the Investor Network
                  <ArrowRightIcon size={18} weight="bold" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </MarketingLayout>
  );
}
