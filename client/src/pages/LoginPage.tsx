import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { AuthLayout, FormError } from "../components/AuthLayout";
import { Button, Field, inputClass } from "../components/ui";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      // login() now throws on a failed profile load too, so we stay on this page
      // and say what happened instead of bouncing back here with no explanation.
      setError(err instanceof Error ? err.message : "Could not log you in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Log in"
      subtitle="Pick up where you left off."
      footer={
        <>
          Need an account?{" "}
          <Link to="/signup" className="font-medium text-accent-600 dark:text-accent-300">
            Create one
          </Link>
        </>
      }
      aside={
        <blockquote className="max-w-md">
          <p className="font-display text-2xl leading-snug font-medium text-paper-50">
            The bench is small on purpose. Every mentor has raised, operated, and been through it
            before.
          </p>
          <footer className="mt-6 text-sm text-paper-200/60">How FBC picks its mentors</footer>
        </blockquote>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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

        <Field label="Password">
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        {error && <FormError message={error} />}

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
