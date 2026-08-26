import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { FundComingSoon } from "../components/FundComingSoon";
import { MarketingHeader } from "../components/MarketingHeader";
import { PartnerWall } from "../components/PartnerWall";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section, cn } from "../components/ui";

/*
  Design read: landing for early-stage founders evaluating a paid advisory
  program. Dark editorial language, serif display against mono labels, one
  burnt-orange accent. Reference direction supplied by the FBC team.
  DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4.

  TODO(content): hero imagery is a Picsum placeholder keyed by seed. Replace
  with real photography before paid traffic.
  TODO(content): plan prices are not published because they have not been set.
  Add the monthly figure to each entry in `plans`.
  No outcome statistics appear here on purpose. Numbers like "capital raised"
  or "companies founded" need real data behind them before they go on a live page.
*/

const plans = [
  {
    name: "Free",
    hours: "Pay per hour",
    summary: "Public events and mentor sessions billed per hour.",
    features: ["Public events", "Book mentors at the hourly rate", "Founder profile"],
    featured: false,
  },
  {
    name: "Tier 1",
    hours: "4 hours a month",
    summary: "General business strategy, plus weekly investor matches.",
    features: ["4 mentor hours a month", "General business strategy", "5 investor matches a week"],
    featured: false,
  },
  {
    name: "Tier 2",
    hours: "6 hours a month",
    summary: "Everything in Tier 1, plus support on one accelerator application.",
    features: [
      "6 mentor hours a month",
      "Apply to one accelerator",
      "5 investor matches a week",
      "General business strategy",
    ],
    featured: true,
  },
  {
    name: "Tier 3",
    hours: "8 hours a month",
    summary: "Multiple accelerator applications and direct investor outreach.",
    features: [
      "8 mentor hours a month",
      "Apply to multiple accelerators",
      "Investor outreach support",
      "5 investor matches a week",
    ],
    featured: false,
  },
];

const faqs = [
  {
    q: "Who are the mentors?",
    a: "Operators and advisors who have raised rounds and built companies. You pick who you book based on their expertise, not a random assignment.",
  },
  {
    q: "What happens to hours I do not use?",
    a: "Your allotment resets when your billing cycle renews. If you need more time than your plan includes, you can book extra hours at the standard rate.",
  },
  {
    q: "How does investor matching work?",
    a: "Every week you receive five investors matched on your industry, stage, and raise. You choose which ones to pursue, and they choose whether to take the intro.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. You can move up or down at any point, and your mentor hours adjust from the next billing cycle.",
  },
  {
    q: "Do I need to be raising right now?",
    a: "No. Plenty of founders use advisory hours for strategy well before a raise. Investor matching is there when you are ready for it.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <MarketingHeader />
      <main>
        <Hero />
        {/* Outcome wall sits under the hero, never inside it. */}
        <PartnerWall />
        <Pillars />
        <TheBench />
        <HowItWorks />
        <Plans />
        <FundComingSoon />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* Asymmetric split hero. Not centered: DESIGN_VARIANCE is 7. */
function Hero() {
  return (
    <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              {/* Scale tuned so the headline holds 2 lines at desktop in this column. */}
              <h1 className="text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                Straight answers on building and raising
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-400">
                Book hours with mentors who have raised real rounds, and meet five matched investors
                every week.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/signup" size="lg">
                  Get started
                  <ArrowRightIcon size={18} weight="bold" />
                </ButtonLink>
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center rounded-full border border-paper-200/25 px-6 py-3 text-base font-medium text-paper-50 transition-colors hover:border-paper-200/55"
                >
                  See plans
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
            {/* Unsplash, hotlinked per their licence. LCP image: eager + high priority. */}
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=900&q=80"
              alt="A founder presenting to investors across a table"
              width={1200}
              height={900}
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/*
  Bento with three cells for three offerings. Cell sizes and surfaces vary
  deliberately: one photographic, one accent-filled, one plain.
*/
function Pillars() {
  return (
    <Section id="advisory">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] md:text-5xl">
            Three ways the platform moves your round forward
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900">
              <img
                src="https://images.unsplash.com/photo-1559136656-3db4bf6c35f8?auto=format&fit=crop&w=1000&h=620&q=80"
                alt="A mentor and founder talking across a desk"
                width={1000}
                height={620}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-7">
                <h3 className="text-2xl">Founder advisory</h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-paper-400">
                  Book time with mentors on general strategy, accelerator applications, or investor
                  outreach. Your plan includes a set number of hours each month.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="investors"
              className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-accent-500 p-7"
            >
              {/* Solid ink on the accent fill: the translucent variants measured
                  3.7:1 and 4.4:1 and missed AA. Solid is 5.2:1. */}
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink-950 uppercase">
                Weekly
              </p>
              <div className="mt-8">
                <h3 className="text-2xl text-ink-950">Investor matching</h3>
                <p className="mt-3 leading-relaxed text-ink-950">
                  Five investors matched to your stage and sector, every week, on any paid plan.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-end rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 p-7">
              <div>
                <h3 className="text-2xl">Events</h3>
                <p className="mt-3 leading-relaxed text-paper-400">
                  Workshops and founder sessions, open to every account including free ones.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* Editorial statement panel. Distinct layout family from every other section. */
function TheBench() {
  const facts = [
    {
      lead: "By expertise",
      body: "You choose the mentor and the slot. No assignment queue, no waiting to be paired.",
    },
    {
      lead: "Three specialisms",
      body: "General strategy, accelerator applications, and investor outreach. Tiers unlock the deeper two.",
    },
    {
      lead: "Hours, not seats",
      body: "Your plan buys mentor time each month. Unused hours reset when the cycle renews.",
    },
  ];

  return (
    <Section className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <Reveal>
          <h2 className="max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            A small bench, chosen for the raise you are actually running
          </h2>
        </Reveal>

        <dl className="mt-14 grid gap-10 border-t border-paper-200/10 pt-10 md:grid-cols-3 md:gap-8">
          {facts.map((fact, i) => (
            <Reveal key={fact.lead} delay={i * 0.08}>
              <dt className="font-display text-xl text-paper-50">{fact.lead}</dt>
              <dd className="mt-2 leading-relaxed text-paper-400">{fact.body}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* Numbered flow. Labels are the action itself, not "Step 1". */
function HowItWorks() {
  const steps = [
    {
      title: "Pick a plan",
      body: "Start free and pay per session, or take a monthly plan that bundles mentor hours.",
    },
    {
      title: "Choose your mentor",
      body: "Browse by expertise and book an open slot. No matching queue, no waiting on an assignment.",
    },
    {
      title: "Meet your investors",
      body: "Paid plans receive five matched investors a week. Pursue the ones that fit your raise.",
    },
  ];

  return (
    <Section>
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

function Plans() {
  return (
    <Section id="plans" className="border-t border-paper-200/10">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] md:text-5xl">
            Plans built around mentor hours
          </h2>
          <p className="mt-5 max-w-[56ch] leading-relaxed text-paper-400">
            Every paid plan includes weekly investor matches. The difference is how many hours you
            get and how far the advisory goes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-card)] border p-6",
                  plan.featured
                    ? "border-accent-500/60 bg-ink-900"
                    : "border-paper-200/10 bg-ink-900",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-accent-500/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-accent-400 uppercase">
                      Most chosen
                    </span>
                  )}
                </div>

                <p className="mt-3 font-display text-2xl text-paper-50">{plan.hours}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper-400">{plan.summary}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <CheckIcon size={16} weight="bold" className="mt-1 shrink-0 text-accent-500" />
                      <span className="text-paper-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  to="/signup"
                  variant={plan.featured ? "primary" : "outline"}
                  className="mt-7 w-full"
                >
                  Get started
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" className="border-t border-paper-200/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl leading-[1.1] md:text-4xl">Questions</h2>
          </Reveal>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <details className="group border-b border-paper-200/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium text-paper-50">
                    {faq.q}
                    <span className="shrink-0 text-paper-500 transition-transform group-open:rotate-45">
                      <PlusGlyph />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] leading-relaxed text-paper-400">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PlusGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function FinalCta() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-16 text-center sm:px-14">
            <h2 className="mx-auto max-w-[20ch] text-3xl leading-[1.1] md:text-5xl">
              Book your first mentor session this week
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] leading-relaxed text-paper-400">
              Create a founder account, browse mentors by expertise, and put time on the calendar.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink to="/signup" size="lg">
                Get started
                <ArrowRightIcon size={18} weight="bold" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-paper-200/10 py-12">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg text-paper-50">FBC</p>
            <p className="mt-1 text-sm text-paper-500">
              Advisory and investor access for early-stage founders.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-400">
            <a href="#advisory" className="hover:text-paper-50">
              Advisory
            </a>
            <a href="#plans" className="hover:text-paper-50">
              Plans
            </a>
            <a href="#faq" className="hover:text-paper-50">
              FAQ
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
