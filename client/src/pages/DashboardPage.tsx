import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { api } from "../lib/api";
import { Button, Card, Container, Field, inputClass } from "../components/ui";

const tierLabels: Record<string, string> = {
  FREE: "Free",
  TIER1: "Tier 1 - 4 mentor hours a month",
  TIER2: "Tier 2 - 6 mentor hours a month",
  TIER3: "Tier 3 - 8 mentor hours a month",
};

export function DashboardPage() {
  const { profile, refresh, logout } = useAuth();
  const [name, setName] = useState(profile?.name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) return null;

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      await api.updateMe({ name, bio });
      await refresh();
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-ink-950">
      <header className="border-b border-paper-200/10">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="font-display text-lg font-semibold tracking-tight">
              FBC
            </Link>
            <Button variant="ghost" onClick={() => logout()}>
              Log out
            </Button>
          </div>
        </Container>
      </header>

      <Container className="py-12">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome back, {profile.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-paper-400">{profile.email}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card>
            <p className="text-sm text-paper-500">Role</p>
            <p className="mt-1 font-display text-xl font-semibold">
              {profile.role.charAt(0) + profile.role.slice(1).toLowerCase()}
            </p>
          </Card>

          {profile.role === "FOUNDER" && (
            <Card className="lg:col-span-2">
              <p className="text-sm text-paper-500">Plan</p>
              <p className="mt-1 font-display text-xl font-semibold">
                {tierLabels[profile.founderTier ?? "FREE"]}
              </p>
            </Card>
          )}
        </div>

        <div className="mt-10 max-w-xl">
          <h2 className="font-display text-xl font-semibold">Account settings</h2>
          <form onSubmit={handleSave} className="mt-5 flex flex-col gap-5">
            <Field label="Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Bio" hint="Shown to mentors and investors you connect with.">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className={inputClass}
              />
            </Field>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {saved && !error && (
              <p className="text-sm text-accent-400">Changes saved.</p>
            )}

            <div>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
