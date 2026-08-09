import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";
import { api } from "../lib/api";

export function DashboardPage() {
  const { profile, refresh, logout } = useAuth();
  const [name, setName] = useState(profile?.name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) return null;

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await api.updateMe({ name, bio });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>
      <p>
        Signed in as <strong>{profile.email}</strong> ({profile.role}
        {profile.role === "FOUNDER" ? ` — ${profile.founderTier ?? "FREE"}` : ""})
      </p>

      <h2>Account settings</h2>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
        </label>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>

      <button style={{ marginTop: 24 }} onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
}
