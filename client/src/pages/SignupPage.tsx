import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { AuthLayout, FormError } from "../components/AuthLayout";
import { Button, Field, inputClass } from "../components/ui";

const roles = [
  { value: "FOUNDER", label: "Founder" },
  { value: "INVESTOR", label: "Investor" },
  { value: "MENTOR", label: "Mentor" },
] as const;

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("FOUNDER");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup({ name, email, password, role });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Founders, investors, and mentors all start here."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent-400">
            Log in
          </Link>
        </>
      }
      aside={
        <div className="max-w-md">
          <p className="font-display text-2xl leading-snug font-medium text-paper-50">
            Mentor hours, weekly investor matches, and the events in between.
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-sm text-paper-200/70">
            <li>Book mentors by expertise, not by queue</li>
            <li>Five matched investors a week on any paid plan</li>
            <li>Start free and pay per session</li>
          </ul>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <Field label="Name">
          <input
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <Field label="Password" hint="At least 8 characters.">
          <input
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <Field label="I am a">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className={inputClass}
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        {error && <FormError message={error} />}

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
