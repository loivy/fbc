import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { FundComingSoon } from "../components/FundComingSoon";
import { MarketingLayout } from "../components/MarketingLayout";
import { PartnerWall } from "../components/PartnerWall";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

/*
  Positioning: FBC is a curated founder network first. Capital and advisory are
  layers on top of that network, not the identity of the company, so they appear
  downstream of the founder narrative in both order and visual weight.

  Deliberately absent, because nothing in the product or data supports them yet:
  member counts, funding totals, acceptance rates, testimonials, a founder
  backgrounds strip naming labs or universities, and any product screenshot of
  matching or investor listings. Sections are added when the thing behind them
  exists.

  Eyebrow budget is 3 for 10 sections; the credibility strip deliberately uses a
  plain label rather than an eyebrow so the count stays inside it.
*/

const pillars = [
  {
    title: "Find your people",
    body: "Meet founders, potential cofounders, operators, researchers, and domain experts selected for relevance rather than volume.",
  },
  {
    title: "Access the right opportunities",
    body: "Accelerators, programmes, events, talent, and founder opportunities curated around where you are building now.",
  },
  {
    title: "Raise with signal",
    body: "When you are ready to raise, relevant investor access, trusted introductions, and support around your company and stage.",
  },
];

const inside = [
  {
    group: "People",
    items: [
      "Founder to founder introductions",
      "Cofounder discovery",
      "Early talent and hiring",
      "Domain expert introductions",
    ],
  },
  {
    group: "Opportunities",
    items: [
      "Accelerator opportunities",
      "Private gatherings and dinners",
      "Founder referrals",
      "Programmes worth your time",
    ],
  },
  {
    group: "Capital",
    items: [
      "Relevant investor discovery",
      "Trusted introductions",
      "Fundraising strategy",
      "Support through the round",
    ],
  },
];

const steps = [
  {
    title: "Join",
    body: "Tell us what you are building, exploring, raising, or looking for.",
  },
  {
    title: "Get relevant access",
    body: "We surface the founders, opportunities, and investors that match where you are now.",
  },
  {
    title: "Build with the right network",
    body: "Turn those relationships into cofounders, hires, partnerships, and capital.",
  },
];

const investorValue = [
  {
    title: "Curated discovery",
    body: "Relevant founders, without sorting through another database of every company that exists.",
  },
  {
    title: "Context beyond the deck",
    body: "The founder, the stage, the timing, and why it matters, before the first conversation.",
  },
  {
    title: "Trusted introductions",
    body: "Meet founders through relationships rather than cold outbound alone.",
  },
];

export function LandingPage() {
  return (
    <MarketingLayout
      title="FBC | Curated Network for Exceptional Founders"
      description="FBC is a curated network for ambitious founders and builders, connecting the right people, capital, opportunities, and strategic support."
    >
      <Hero />
      <PartnerWall />
      <Insight />
      <Pillars />
      <Inside />
      <HowItWorks />
      <FundComingSoon />
      <ForInvestors />
      <Advisory />
      <FinalCta />
    </MarketingLayout>
  );
}

/*
  Above the fold: nav, positioning, one primary CTA, one secondary, and the
  credibility strip immediately below. No feature grid, no stats, no pricing.
*/
function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-4xl leading-[1.05] md:text-5xl lg:text-[56px]">
                Where exceptional founders find their edge.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-paper-400">
                A curated network connecting ambitious founders with the right people, capital, and
                opportunities to build what comes next.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/apply" size="lg">
                  Join the Founder Network
                  <ArrowRightIcon size={18} weight="bold" />
                </ButtonLink>
                <Link
                  to="/founders"
                  className="inline-flex items-center justify-center rounded-full border border-paper-200/25 px-6 py-3 text-base font-medium text-paper-50 transition-colors hover:border-paper-200/55"
                >
                  Explore the Network
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
            {/* Unsplash, hotlinked per their licence. LCP image: eager + high priority. */}
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=900&q=80"
              alt="Founders in conversation around a table"
              width={1200}
              height={900}
              // React 18 does not know the camelCase prop and warns; the lowercase
              // attribute is passed straight through to the DOM.
              {...{ fetchpriority: "high" }}
              className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* Editorial statement, not a card grid. The idea has to land before the features. */
function Insight() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Why FBC</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.1] md:text-4xl">
              Talent is abundant. Signal is scarce.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="space-y-5 text-lg leading-relaxed text-paper-400">
              <p className="max-w-[62ch]">
                The most ambitious founders do not need more cold outreach, another networking
                event, or one more founder group.
              </p>
              <p className="max-w-[62ch]">
                They need the right cofounder, the right investor, the right introduction, and the
                right opportunity at the right time. Knowing which is which is the hard part.
              </p>
              <p className="max-w-[62ch] text-paper-200">
                FBC curates the network around them.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* Typography carries these. No icons: there is no honest visual metaphor here. */
function Pillars() {
  return (
    <Section className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <dl className="grid gap-12 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="border-t border-paper-200/15 pt-6">
                <dt className="font-display text-2xl text-paper-50">{pillar.title}</dt>
                <dd className="mt-3 leading-relaxed text-paper-400">{pillar.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* Who is inside and what actually happens, grouped to reinforce the hierarchy. */
function Inside() {
  return (
    <Section id="inside">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] md:text-5xl">
            Built around people actually building.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-paper-400">
            Founders mid-build, researchers leaving the lab, engineers leaving big technology
            companies, people looking for a cofounder, and people about to raise. FBC brings them
            together at the moments when the right relationship changes what happens next.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {inside.map((column, i) => (
            <Reveal key={column.group} delay={i * 0.08}>
              <div className="border-t border-paper-200/15 pt-6">
                <h3 className="font-mono text-[11px] tracking-[0.18em] text-accent-500 uppercase">
                  {column.group}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="leading-relaxed text-paper-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section className="border-t border-paper-200/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl leading-[1.1] md:text-4xl">How it works</h2>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="grid gap-8 sm:grid-cols-3">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="list-none border-t border-paper-200/15 pt-5">
                    <span className="font-mono text-sm text-accent-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-xl">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-paper-400">{step.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Investors come after the founder narrative, and get less weight than it. */
function ForInvestors() {
  return (
    <Section id="investors" className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>For investors</Eyebrow>
            <h2 className="mt-4 max-w-[16ch] text-3xl leading-[1.1] md:text-4xl">
              Meet high-signal founders earlier.
            </h2>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-paper-400">
              Discover founders emerging from research, frontier technology, and the startup
              ecosystem, through a network built on trusted relationships.
            </p>
            <ButtonLink to="/investors" variant="outline" className="mt-8">
              Join the Investor Network
            </ButtonLink>
          </Reveal>

          <div className="lg:col-span-7">
            <dl className="grid gap-8 sm:grid-cols-3">
              {investorValue.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="border-t border-paper-200/15 pt-5">
                    <dt className="font-display text-lg text-paper-50">{item.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-paper-400">{item.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Advisory is a premium layer on the network, not the identity of the company. */
function Advisory() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 border-t border-paper-200/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>FBC Advisory</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] text-3xl leading-[1.1] md:text-4xl">
                Hands-on support when the stakes are higher.
              </h2>
              <p className="mt-5 max-w-[58ch] leading-relaxed text-paper-400">
                Selected founders work directly with FBC on fundraising strategy, company narrative,
                investor targeting, accelerator applications, and positioning.
              </p>
            </div>
            <ButtonLink to="/advisory" variant="outline" className="shrink-0">
              Explore FBC Advisory
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="pt-0">
      <Container>
        <Reveal>
          <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-16 text-center sm:px-14">
            <h2 className="mx-auto max-w-[22ch] text-3xl leading-[1.1] md:text-4xl">
              Build with the right network around you.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] leading-relaxed text-paper-400">
              Join a curated network of ambitious founders and builders, and access the people,
              opportunities, and capital relevant to what comes next.
            </p>
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
  );
}
