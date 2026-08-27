import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { FundComingSoon } from "../components/FundComingSoon";
import { MarketingHeader } from "../components/MarketingHeader";
import { PartnerWall } from "../components/PartnerWall";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

/*
  Design read: landing for early-stage founders considering applying. Dark
  editorial language, serif display against mono labels, one burnt-orange accent.
  Reference direction supplied by the FBC team.
  DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4.

  Pricing and plan tiers are deliberately absent from this page. The tier system
  still exists in the product; it is just not the public pitch, and the entry
  point is the application rather than a self-serve signup.

  No outcome statistics appear here on purpose. Numbers like "capital raised" or
  "companies founded" need real data behind them before they go on a live page.
*/

const services = [
  {
    title: "Tell the story properly",
    body: "Most decks lose the room in the first two minutes. We work on the narrative until the problem, the insight, and the reason it is you land in order.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&h=620&q=80",
    alt: "A founder presenting to a room",
  },
  {
    title: "Get into an accelerator",
    body: "Application review, interview practice, and the judgement of people who have sat on both sides of that table.",
  },
  {
    title: "Raise from investors",
    body: "Building the target list, working out the order to approach them in, and knowing how the partner meeting actually runs.",
  },
];

const faqs = [
  {
    q: "Who gets in?",
    a: "Early-stage founders we think are genuinely worth backing. We keep the room small, so we turn down far more companies than we take.",
  },
  {
    q: "What happens after I submit?",
    a: "We read every submission. If it looks like a fit we set up an interview, and from there you start working with the bench.",
  },
  {
    q: "Why keep it small?",
    a: "An introduction only carries weight if the people making it are known for being selective. A crowded room would cost our members the thing they came for.",
  },
  {
    q: "Do I need to be raising right now?",
    a: "No. Plenty of founders work on the narrative and the target list well before the round opens. That work is easier when it is not urgent.",
  },
  {
    q: "Who are the mentors?",
    a: "Operators and advisors who have raised rounds and built companies. You work with the ones whose experience matches what you are trying to do.",
  },
  {
    q: "Does applying guarantee an introduction?",
    a: "No. We make introductions when we genuinely believe in the company, and say so plainly when we do not. That is what keeps them worth something.",
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
        <Services />
        <TheBench />
        <HowItWorks />
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
                For founders worth backing
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-400">
                A selective community, by application. We work with founders on the story, the
                accelerator applications, and the raise.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/apply" size="lg">
                  Submit your company
                  <ArrowRightIcon size={18} weight="bold" />
                </ButtonLink>
                <a
                  href="#advisory"
                  className="inline-flex items-center justify-center rounded-full border border-paper-200/25 px-6 py-3 text-base font-medium text-paper-50 transition-colors hover:border-paper-200/55"
                >
                  What we do
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

/*
  What we do. Bento with three cells for three services: the first carries a
  photograph and spans two columns, the second is the accent fill, the third is
  a plain surface. Sizes and surfaces vary so it does not read as three
  identical feature cards.
*/
function Services() {
  const [story, accelerators, investors] = services;

  return (
    <Section id="advisory">
      <Container>
        <Reveal>
          <Eyebrow>What members get</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] text-3xl leading-[1.1] md:text-5xl">
            What we work on
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900">
              <img
                src={story.image}
                alt={story.alt}
                width={1000}
                height={620}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-7">
                <h3 className="text-2xl">{story.title}</h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-paper-400">{story.body}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-end rounded-[var(--radius-card)] bg-accent-500 p-7">
              {/* Solid ink on the accent fill: translucent variants measured
                  3.7:1 and 4.4:1 and missed AA. Solid is 5.2:1. */}
              <div>
                <h3 className="text-2xl text-ink-950">{accelerators.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-950">{accelerators.body}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div
              id="investors"
              className="flex h-full flex-col justify-end rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 p-7"
            >
              <div>
                <h3 className="text-2xl">{investors.title}</h3>
                <p className="mt-3 leading-relaxed text-paper-400">{investors.body}</p>
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
      body: "Narrative and positioning, accelerator applications, and investor outreach.",
    },
    {
      lead: "They have done it",
      body: "Every mentor has raised, operated, or sat on the other side of the table.",
    },
  ];

  return (
    <Section className="border-y border-paper-200/10 bg-ink-900">
      <Container>
        <Reveal>
          <h2 className="max-w-[24ch] text-3xl leading-[1.1] md:text-5xl">
            A deliberately small bench
          </h2>
          <Link
            to="/mentors"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-500"
          >
            Meet the mentors
            <ArrowRightIcon size={16} weight="bold" />
          </Link>
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
      title: "Submit your company",
      body: "Send us the company, your profile, and your deck. It takes a few minutes.",
    },
    {
      title: "Interview",
      body: "If it looks like a fit we sit down with you properly. Most conversations end here, and we tell you why.",
    },
    {
      title: "Join the room",
      body: "If it is a fit, you join and start working with the bench on whatever comes next.",
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
              Apply to join
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] leading-relaxed text-paper-400">
              Send the company, your profile, and your deck. We read every submission and reply
              either way.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink to="/apply" size="lg">
                Submit your company
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
              What we do
            </a>
            <Link to="/mentors" className="hover:text-paper-50">
              Mentors
            </Link>
            <a href="#fund" className="hover:text-paper-50">
              Fund
            </a>
            <a href="#faq" className="hover:text-paper-50">
              FAQ
            </a>
            <Link to="/apply" className="hover:text-paper-50">
              Submit your company
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
