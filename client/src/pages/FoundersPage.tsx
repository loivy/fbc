import { ArrowRightIcon } from "@phosphor-icons/react";
import { MarketingLayout } from "../components/MarketingLayout";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

const outcomes = [
  {
    title: "Meet a cofounder",
    body: "People exploring the same problem space, at the same moment, with complementary skills.",
  },
  {
    title: "Meet technical founders",
    body: "Builders who understand the thing you are building without needing it explained.",
  },
  {
    title: "Find early talent",
    body: "The first engineers and operators, through people who can vouch for them.",
  },
  {
    title: "Discover accelerators",
    body: "Which programmes fit what you are building, and what their applications actually ask.",
  },
  {
    title: "Meet relevant investors",
    body: "Investors who are active in your space and stage, rather than a list of every fund.",
  },
  {
    title: "Get founder referrals",
    body: "Introductions that arrive with context, from people whose judgement carries weight.",
  },
];

const forYou = [
  "You are building and have not launched publicly yet",
  "You are leaving research or a large technology company to start something",
  "You are looking for a cofounder",
  "You have early traction and are preparing to raise",
  "You are applying to top accelerators",
];

export function FoundersPage() {
  return (
    <MarketingLayout
      title="FBC | For Founders"
      description="Meet founders, talent, investors, advisors, and opportunities selected for relevance to what you are building now."
    >
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>For founders</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                Build with better people around you.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper-400">
                Meet founders, talent, investors, advisors, and opportunities selected for relevance
                to what you are building now.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ButtonLink to="/apply" size="lg" className="mt-9">
                Join the Founder Network
                <ArrowRightIcon size={18} weight="bold" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-paper-200/10 bg-ink-900">
        <Container>
          <Reveal>
            <h2 className="max-w-[20ch] text-3xl leading-[1.1] md:text-4xl">
              What the network is for
            </h2>
          </Reveal>
          <dl className="mt-14 grid gap-10 border-t border-paper-200/10 pt-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
            {outcomes.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <dt className="font-display text-xl text-paper-50">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-paper-400">{item.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-3xl leading-[1.1] md:text-4xl">Who it is for</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <ul className="space-y-4">
                {forYou.map((item) => (
                  <li
                    key={item}
                    className="border-t border-paper-200/15 pt-4 text-lg leading-relaxed text-paper-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[58ch] leading-relaxed text-paper-400">
                Membership is by application. We keep the network small so that being in it means
                something.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-[22ch] text-3xl leading-[1.1] md:text-4xl">
                Tell us what you are building.
              </h2>
              <div className="mt-9 flex justify-center">
                <ButtonLink to="/apply" size="lg">
                  Join the Founder Network
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
