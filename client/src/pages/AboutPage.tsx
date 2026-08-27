import { ArrowRightIcon } from "@phosphor-icons/react";
import { MarketingLayout } from "../components/MarketingLayout";
import { Reveal } from "../components/Reveal";
import { ButtonLink, Container, Eyebrow, Section } from "../components/ui";

/*
  Structure: the observation, the problem, the answer, what we are building.

  No team section yet. Adding one means real names, roles, and photos, and the
  brand should not rest on a single person's resume in any case. The `team` array
  renders a section when it is populated.
*/
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  profileUrl?: string;
}

export const team: TeamMember[] = [];

export function AboutPage() {
  return (
    <MarketingLayout
      title="FBC | About"
      description="Why FBC exists: more access has created more noise, and founders struggle to know which people and opportunities actually matter."
    >
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>About</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-4xl leading-[1.06] md:text-5xl lg:text-[54px]">
                More access has not made things clearer.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-paper-400">
                Founders have never had more inbound. Investors, programmes, communities, recruiters,
                advisors. Almost none of it arrives with a way to tell what is worth the time.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-paper-200/10 bg-ink-900">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-3xl leading-[1.1] md:text-4xl">The problem</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="space-y-5 text-lg leading-relaxed text-paper-400">
                <p className="max-w-[62ch]">
                  A founder can spend a year meeting people and still not meet the three who would
                  have mattered. The cost is not the wasted meetings. It is the ones that never
                  happened.
                </p>
                <p className="max-w-[62ch]">
                  Volume does not fix this. Another community, another event, another list of
                  investors adds to the pile rather than sorting it.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-3xl leading-[1.1] md:text-4xl">What we are building</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="space-y-5 text-lg leading-relaxed text-paper-400">
                <p className="max-w-[62ch]">
                  FBC is a curated network for ambitious founders and builders. We keep it small,
                  and we spend our effort on relevance: who should meet whom, which opportunity is
                  worth a founder's week, which investor is actually active in this space.
                </p>
                <p className="max-w-[62ch]">
                  Capital is part of that network rather than the point of it. So is advisory, for
                  the founders who want hands-on support through a specific moment.
                </p>
                <p className="max-w-[62ch] text-paper-200">
                  The long-term goal is a network where founders, talent, opportunities, and capital
                  find each other because the context is already there.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {team.length > 0 && (
        <Section className="border-t border-paper-200/10">
          <Container>
            <Reveal>
              <h2 className="text-3xl leading-[1.1] md:text-4xl">Who we are</h2>
            </Reveal>
            <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={(i % 3) * 0.08}>
                  <li className="list-none border-t border-paper-200/15 pt-6">
                    {member.photoUrl && (
                      <img
                        src={member.photoUrl}
                        alt=""
                        width={96}
                        height={96}
                        loading="lazy"
                        className="mb-5 h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <h3 className="font-display text-xl text-paper-50">{member.name}</h3>
                    <p className="mt-1 text-sm text-paper-500">{member.role}</p>
                    <p className="mt-3 leading-relaxed text-paper-400">{member.bio}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-paper-200/10 bg-ink-900 px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-[24ch] text-3xl leading-[1.1] md:text-4xl">
                Build with the right network around you.
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
