import { firebaseAuth } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export type Role = "ADMIN" | "INVESTOR" | "FOUNDER" | "MENTOR";
export type FounderTier = "FREE" | "TIER1" | "TIER2" | "TIER3" | null;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  bio?: string | null;
  role: Role;
  founderTier: FounderTier;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await firebaseAuth?.currentUser?.getIdToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ? JSON.stringify(body.error) : `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  register: (data: { name: string; role: "INVESTOR" | "FOUNDER" | "MENTOR" }) =>
    request<UserProfile>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),

  me: () => request<UserProfile>("/api/users/me"),

  updateMe: (data: { name?: string; bio?: string }) =>
    request<UserProfile>("/api/users/me", { method: "PATCH", body: JSON.stringify(data) }),
};
