import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { MarketingLayout } from "../components/MarketingLayout";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

/*
  This page is allowed to be commercial in a way the homepage is not. It is still
  a layer on top of the network, not the identity of the company.

  No prices: none have been set. Add them here when they exist.
*/
const services = [
  {
    title: "Fundraising strategy",
    body: "How much, from whom, on what timeline, and what has to be true before you start.",
  },
  {
    title: "Company narrative",
    body: "The story that holds a room: the problem, the insight, and why it is you building it.",
  },
  {
    title: "Investor targeting",
    body: "A real target list, ordered, with the reasoning behind each name.",
  },
  {
    title: "Accelerator applications",
    body: "Which programme fits, what the application is really asking, and how the interview runs.",
  },
  {
    title: "Positioning",
    body: "How the company is understood by investors, candidates, and customers.",
  },
  {
    title: "Introductions",
    body: "Warm introductions through the network when the company is ready for them.",
  },
];

export function AdvisoryPage() {
  return (
    <MarketingLayout
      title="FBC | Advisory"
      description="Strategic support for founders at inflection points: fundraising strategy, narrative, investor targeting, accelerator applications, and positioning."
    >
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>FBC Advisory</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                Strategic support for founders at inflection points.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper-400">
                Selected founders work directly with FBC through the moments that decide the next
                two years of the company.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ButtonLink to="/apply" size="lg" className="mt-9">
                Work With FBC
                <ArrowRightIcon size={18} weight="bold" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-paper-200/10 bg-ink-900">
        <Container>
          <Reveal>
            <h2 className="text-3xl leading-[1.1] md:text-4xl">What we work on</h2>
          </Reveal>
          <dl className="mt-14 grid gap-10 border-t border-paper-200/10 pt-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <dt className="font-display text-xl text-paper-50">{service.title}</dt>
                <dd className="mt-2 leading-relaxed text-paper-400">{service.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="text-3xl leading-[1.1] md:text-4xl">Who you work with</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <p className="max-w-[60ch] text-lg leading-relaxed text-paper-400">
                Operators and investors who have run the process themselves. The bench is small on
                purpose, and you work with the person whose experience matches the problem in front
                of you.
              </p>
              <Link
                to="/mentors"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-500"
              >
                Meet the bench
                <ArrowRightIcon size={16} weight="bold" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-[24ch] text-3xl leading-[1.1] md:text-4xl">
                Tell us where you are stuck.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] leading-relaxed text-paper-400">
                Send us the company and what you are working through. We will tell you whether we
                are the right people for it.
              </p>
              <div className="mt-9 flex justify-center">
                <ButtonLink to="/apply" size="lg">
                  Work With FBC
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
