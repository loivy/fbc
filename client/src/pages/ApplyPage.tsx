import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { api, type ApplicationInput, type CompanyStage } from "../lib/api";
import { MarketingHeader } from "../components/MarketingHeader";
import { Button, Container, Field, Section, inputClass } from "../components/ui";

const stages: Array<{ value: CompanyStage; label: string }> = [
  { value: "IDEA", label: "Idea or pre-product" },
  { value: "PRE_SEED", label: "Pre-seed" },
  { value: "SEED", label: "Seed" },
  { value: "SERIES_A_PLUS", label: "Series A or later" },
];

const emptyForm: ApplicationInput = {
  companyName: "",
  website: "",
  oneLiner: "",
  stage: "PRE_SEED",
  founderName: "",
  founderEmail: "",
  founderProfileUrl: "",
  deckUrl: "",
  raising: "",
  notes: "",
  website2: "",
};

export function ApplyPage() {
  const [form, setForm] = useState<ApplicationInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ApplicationInput>(key: K, value: ApplicationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.submitApplication(form);
      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <MarketingHeader />
      <main>
        <Section>
          <Container>
            {submitted ? <Submitted /> : null}

            <div className={submitted ? "hidden" : undefined}>
              <div className="max-w-2xl">
                <h1 className="text-4xl leading-[1.08] md:text-5xl">Submit your company</h1>
                <p className="mt-5 leading-relaxed text-paper-400">
                  Tell us what you are building. We read every submission, interview the companies
                  we think are ready, and refer the strongest to funds we work with.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-12 max-w-2xl" noValidate>
                <fieldset className="border-t border-paper-200/10 pt-8">
                  <legend className="sr-only">Company</legend>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">
                    Company
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Company name">
                      <input
                        value={form.companyName}
                        onChange={(e) => set("companyName", e.target.value)}
                        required
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Website" hint="Optional">
                      <input
                        type="url"
                        placeholder="https://"
                        value={form.website}
                        onChange={(e) => set("website", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="What are you building?" hint="One or two sentences.">
                      <textarea
                        rows={3}
                        value={form.oneLiner}
                        onChange={(e) => set("oneLiner", e.target.value)}
                        required
                        minLength={10}
                        maxLength={300}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field label="Stage">
                      <select
                        value={form.stage}
                        onChange={(e) => set("stage", e.target.value as CompanyStage)}
                        className={inputClass}
                      >
                        {stages.map((stage) => (
                          <option key={stage.value} value={stage.value}>
                            {stage.label}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Raising" hint="Optional. For example: 2M seed.">
                      <input
                        value={form.raising}
                        onChange={(e) => set("raising", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mt-12 border-t border-paper-200/10 pt-8">
                  <legend className="sr-only">Founder</legend>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">
                    Founder
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Your name">
                      <input
                        value={form.founderName}
                        onChange={(e) => set("founderName", e.target.value)}
                        required
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Email">
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.founderEmail}
                        onChange={(e) => set("founderEmail", e.target.value)}
                        required
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="LinkedIn or social profile" hint="A link we can read about you on.">
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        value={form.founderProfileUrl}
                        onChange={(e) => set("founderProfileUrl", e.target.value)}
                        required
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mt-12 border-t border-paper-200/10 pt-8">
                  <legend className="sr-only">Materials</legend>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-paper-500 uppercase">
                    Materials
                  </p>

                  <div className="mt-6">
                    <Field
                      label="Deck or business plan"
                      hint="A link works best: Drive, Notion, DocSend. Make sure it is viewable."
                    >
                      <input
                        type="url"
                        placeholder="https://"
                        value={form.deckUrl}
                        onChange={(e) => set("deckUrl", e.target.value)}
                        required
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Anything else" hint="Optional.">
                      <textarea
                        rows={4}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        maxLength={2000}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </fieldset>

                {/* Honeypot. Hidden from people, tempting to bots. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Do not fill this in
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website2}
                      onChange={(e) => set("website2", e.target.value)}
                    />
                  </label>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-8 rounded-[var(--radius-input)] border border-red-400/25 bg-red-950/40 px-3.5 py-2.5 text-sm text-red-300"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-4 border-t border-paper-200/10 pt-8 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? "Sending..." : "Submit application"}
                    {!submitting && <ArrowRightIcon size={18} weight="bold" />}
                  </Button>
                  <p className="text-sm text-paper-500">
                    We read everything. You will hear from us either way.
                  </p>
                </div>
              </form>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}

function Submitted() {
  return (
    <div className="max-w-xl py-8">
      <CheckCircleIcon size={40} weight="duotone" className="text-accent-500" />
      <h1 className="mt-6 text-4xl leading-[1.08]">Application received</h1>
      <p className="mt-5 leading-relaxed text-paper-400">
        Thanks for sending it over. We read every submission and will get back to you either way. If
        it is a fit, the next step is a short interview.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-400 hover:text-accent-500"
      >
        Back to the homepage
        <ArrowRightIcon size={16} weight="bold" />
      </Link>
    </div>
  );
}
