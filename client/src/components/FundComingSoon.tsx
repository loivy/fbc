import { Reveal } from "./Reveal";
import { Container, Eyebrow, Section } from "./ui";

/*
  Announcement band for the FBC fund and accelerator.

  No email capture here on purpose: a waitlist form needs somewhere to store
  submissions, and a field that silently drops what people type is worse than no
  field. Wire it up when there is an endpoint behind it.

  No dates, cheque sizes, or cohort numbers either. Those are commitments, and
  they should come from the team rather than be invented here.
*/
export function FundComingSoon() {
  const detail = [
    {
      lead: "Fund",
      body: "Direct investment into companies coming out of the community.",
    },
    {
      lead: "Accelerator",
      body: "A structured programme on top of the advisory hours founders already book.",
    },
  ];

  return (
    <Section id="fund">
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-paper-200/10">
          <div className="grid lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1">
              <Reveal>
                <div className="flex items-center gap-3">
                  {/* Semantic state, not decoration: this marks a live status. */}
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
                  </span>
                  <Eyebrow>Launching soon</Eyebrow>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-5 max-w-[18ch] text-3xl leading-[1.1] md:text-4xl">
                  A fund and an accelerator
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 max-w-[52ch] leading-relaxed text-paper-400">
                  We are building the next step for founders already working with our mentors:
                  capital and a programme, run by the same bench.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <dl className="mt-10 grid gap-8 border-t border-paper-200/10 pt-8 sm:grid-cols-2">
                  {detail.map((item) => (
                    <div key={item.lead}>
                      <dt className="font-display text-lg text-paper-50">{item.lead}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-paper-400">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1000&h=700&q=80"
                alt="A team meeting around a table in an office"
                width={1000}
                height={700}
                loading="lazy"
                className="h-full min-h-64 w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
