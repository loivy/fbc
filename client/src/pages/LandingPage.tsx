import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CheckIcon,
  HandshakeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { MarketingHeader } from "../components/MarketingHeader";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Section, cn } from "../components/ui";

/*
  Design read: landing for early-stage founders evaluating a paid advisory
  program. Modern B2B SaaS language, credibility over spectacle.
  DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4.

  TODO(content): hero and advisory imagery are Picsum placeholders keyed by seed.
  Replace with real photography before any paid traffic hits this page.
  TODO(content): plan prices are not published here because they have not been
  set. Add the monthly figure to each entry in `plans` when pricing is decided.
  Deliberately omitted until real: customer logo wall and testimonials. Inventing
  either would put fabricated social proof on a live public page.
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
    <div className="min-h-[100dvh] bg-paper-50 text-ink-900 dark:bg-ink-950 dark:text-paper-100">
      <MarketingHeader />
      <main>
        <Hero />
        <Pillars />
        <HowItWorks />
        <Plans />
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
            <Reveal>
              {/* Scale is tuned so the headline holds 2 lines at desktop in this column width. */}
              <h1 className="text-4xl leading-[1.06] font-semibold md:text-5xl lg:text-[52px]">
                Straight answers on building and raising
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-700 dark:text-ink-400">
                Book hours with mentors who have raised real rounds, and meet five matched investors
                every week.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/signup" size="lg">
                  Get started
                  <ArrowRightIcon size={18} weight="bold" />
                </ButtonLink>
                <a href="#plans" className="sm:w-auto">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-base font-medium transition-colors hover:border-ink-900/35 dark:border-paper-100/20 dark:hover:border-paper-100/40">
                    See plans
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <img
              src="https://picsum.photos/seed/fbc-founder-workspace/1200/900"
              alt="Founders working together at a shared table"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/*
  Bento with three cells for three offerings. Cell sizes and backgrounds vary
  deliberately: one photographic, one accent-filled, one plain surface.
*/
function Pillars() {
  return (
    <Section id="advisory">
      <Container>
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-semibold md:text-4xl">
            Three ways the platform moves your round forward
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-900/10 bg-white dark:border-paper-100/10 dark:bg-ink-900">
              <img
                src="https://picsum.photos/seed/fbc-mentor-conversation/1000/620"
                alt="A mentor and founder in conversation"
                width={1000}
                height={620}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-7">
                <UsersThreeIcon size={24} weight="duotone" className="text-accent-600 dark:text-accent-300" />
                <h3 className="mt-4 text-xl font-semibold">Founder advisory</h3>
                <p className="mt-2 max-w-[46ch] leading-relaxed text-ink-700 dark:text-ink-400">
                  Book time with mentors on general strategy, accelerator applications, or investor
                  outreach. Your plan includes a set number of hours each month.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="investors"
              className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-accent-600 p-7 text-white dark:bg-accent-700"
            >
              <HandshakeIcon size={24} weight="duotone" />
              <div className="mt-8">
                <h3 className="text-xl font-semibold">Investor matching</h3>
                <p className="mt-2 leading-relaxed text-white/85">
                  Five investors matched to your stage and sector, every week, on any paid plan.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-ink-900/10 bg-white p-7 dark:border-paper-100/10 dark:bg-ink-900">
              <CalendarCheckIcon size={24} weight="duotone" className="text-accent-600 dark:text-accent-300" />
              <div className="mt-8">
                <h3 className="text-xl font-semibold">Events</h3>
                <p className="mt-2 leading-relaxed text-ink-700 dark:text-ink-400">
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

/* Vertical numbered flow. Labels are the action itself, not "Step 1". */
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
    <Section className="border-y border-ink-900/8 bg-paper-100 dark:border-paper-100/10 dark:bg-ink-900">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl font-semibold md:text-4xl">How it works</h2>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="grid gap-8 sm:grid-cols-3">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="list-none">
                    <span className="font-display text-2xl font-semibold text-accent-600 dark:text-accent-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-700 dark:text-ink-400">{step.body}</p>
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
    <Section id="plans">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-semibold md:text-4xl">
            Plans built around mentor hours
          </h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-ink-700 dark:text-ink-400">
            Every paid plan includes weekly investor matches. The difference is how many hours you
            get and how far the advisory goes.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-card)] border p-6",
                  plan.featured
                    ? "border-accent-500 bg-white shadow-[0_1px_24px_rgba(18,143,102,0.12)] dark:bg-ink-900"
                    : "border-ink-900/10 bg-white dark:border-paper-100/10 dark:bg-ink-900",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700 dark:bg-accent-700/25 dark:text-accent-300">
                      Most chosen
                    </span>
                  )}
                </div>

                <p className="mt-3 font-display text-2xl font-semibold">{plan.hours}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-400">
                  {plan.summary}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <CheckIcon
                        size={17}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300"
                      />
                      <span className="text-ink-700 dark:text-ink-400">{feature}</span>
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
    <Section id="faq" className="border-t border-ink-900/8 dark:border-paper-100/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl font-semibold md:text-4xl">Questions</h2>
          </Reveal>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <details className="group border-b border-ink-900/10 py-5 dark:border-paper-100/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium">
                    {faq.q}
                    <span className="shrink-0 text-ink-500 transition-transform group-open:rotate-45 dark:text-ink-400">
                      <PlusGlyph />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] leading-relaxed text-ink-700 dark:text-ink-400">
                    {faq.a}
                  </p>
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
    <Section className="pt-0">
      <Container>
        <Reveal>
          <div className="rounded-[var(--radius-card)] bg-ink-900 px-7 py-14 text-center sm:px-14 dark:bg-ink-800">
            <h2 className="mx-auto max-w-[20ch] text-3xl font-semibold text-paper-50 md:text-4xl">
              Book your first mentor session this week
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] leading-relaxed text-paper-200/70">
              Create a founder account, browse mentors by expertise, and put time on the calendar.
            </p>
            <div className="mt-8 flex justify-center">
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
    <footer className="border-t border-ink-900/8 py-12 dark:border-paper-100/10">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold">FBC</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              Advisory and investor access for early-stage founders.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700 dark:text-ink-400">
            <a href="#advisory" className="hover:text-ink-900 dark:hover:text-paper-100">
              Advisory
            </a>
            <a href="#plans" className="hover:text-ink-900 dark:hover:text-paper-100">
              Plans
            </a>
            <a href="#faq" className="hover:text-ink-900 dark:hover:text-paper-100">
              FAQ
            </a>
            <Link to="/login" className="hover:text-ink-900 dark:hover:text-paper-100">
              Log in
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
