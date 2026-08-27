import { ArrowRightIcon } from "@phosphor-icons/react";
import { MarketingHeader } from "../components/MarketingHeader";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

export interface Mentor {
  name: string;
  title: string;
  /** One or two sentences. What they have actually done. */
  bio: string;
  specialisms: Array<"Story" | "Accelerators" | "Investors">;
  photoUrl?: string;
  profileUrl?: string;
}

/*
  Real mentors only. This stays empty until the FBC team supplies names, roles,
  and photos: inventing plausible-looking mentors on a live page would be
  fabricating credentials for people who do not exist.

  Populate this array and the roster renders itself. Until then the page explains
  how the bench is built and what each specialism covers, which is all true today.
*/
export const mentors: Mentor[] = [];

const specialisms = [
  {
    name: "Story",
    body: "Narrative, positioning, and the deck. Getting the problem, the insight, and why it is you into an order that holds a room.",
  },
  {
    name: "Accelerators",
    body: "Which programme actually fits, what the application is really asking, and how the interview runs.",
  },
  {
    name: "Investors",
    body: "Target lists, the order to approach them in, what happens in the partner meeting, and the introduction itself.",
  },
];

const selection = [
  {
    lead: "They have done the thing",
    body: "Raised, operated, or sat on the investor side. Not commentary from the sidelines.",
  },
  {
    lead: "Small on purpose",
    body: "We would rather have a short bench people come back to than a directory nobody trusts.",
  },
  {
    lead: "Matched, not assigned",
    body: "You work with the mentor whose experience fits what you are trying to do next.",
  },
];

export function MentorsPage() {
  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <MarketingHeader />
      <main>
        <Section>
          <Container>
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow>The bench</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-5 text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                  The people you will actually be sitting with
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper-400">
                  Operators and investors who have run the process themselves, kept deliberately few
                  so the quality of the room stays high.
                </p>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-paper-200/10 bg-ink-900 pt-0 sm:pt-0">
          <Container>
            <div className="grid gap-12 pt-20 sm:pt-28 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <h2 className="text-3xl leading-[1.1] md:text-4xl">What they cover</h2>
              </Reveal>
              <div className="lg:col-span-8">
                <dl className="grid gap-8 sm:grid-cols-3">
                  {specialisms.map((item, i) => (
                    <Reveal key={item.name} delay={i * 0.08}>
                      <div className="border-t border-paper-200/15 pt-5">
                        <dt className="font-display text-xl text-paper-50">{item.name}</dt>
                        <dd className="mt-2 leading-relaxed text-paper-400">{item.body}</dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </Section>

        {mentors.length > 0 && <Roster />}

        <Section>
          <Container>
            <Reveal>
              <h2 className="max-w-[22ch] text-3xl leading-[1.1] md:text-5xl">
                How the bench is put together
              </h2>
            </Reveal>
            <dl className="mt-14 grid gap-10 border-t border-paper-200/10 pt-10 md:grid-cols-3 md:gap-8">
              {selection.map((item, i) => (
                <Reveal key={item.lead} delay={i * 0.08}>
                  <dt className="font-display text-xl text-paper-50">{item.lead}</dt>
                  <dd className="mt-2 leading-relaxed text-paper-400">{item.body}</dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container>
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-14 text-center sm:px-14">
                <h2 className="mx-auto max-w-[22ch] text-3xl leading-[1.1] md:text-4xl">
                  Membership is by application
                </h2>
                <p className="mx-auto mt-5 max-w-[50ch] leading-relaxed text-paper-400">
                  Tell us what you are building. If it is a fit, we will put you in front of the
                  right people on the bench.
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
      </main>
    </div>
  );
}

function Roster() {
  return (
    <Section id="roster">
      <Container>
        <Reveal>
          <h2 className="text-3xl leading-[1.1] md:text-5xl">Mentors</h2>
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor, i) => (
            <Reveal key={mentor.name} delay={i * 0.06}>
              <li className="flex h-full list-none flex-col rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 p-6">
                {mentor.photoUrl && (
                  <img
                    src={mentor.photoUrl}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <h3 className="mt-5 text-xl">{mentor.name}</h3>
                <p className="mt-1 text-sm text-paper-500">{mentor.title}</p>
                <p className="mt-4 flex-1 leading-relaxed text-paper-400">{mentor.bio}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {mentor.specialisms.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-accent-500/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-accent-400 uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
