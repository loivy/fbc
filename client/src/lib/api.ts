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

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await firebaseAuth?.currentUser?.getIdToken();

  // The API runs on Cloud Run with no minimum instances, so the first request
  // after an idle period pays a cold start. Retry transient failures instead of
  // surfacing them as a login failure, but keep a ceiling so genuine outages
  // still fail fast rather than hanging the UI forever.
  const attempts = 3;
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      // 4xx are real answers (bad token, missing profile). Do not retry them.
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message = body?.error
          ? typeof body.error === "string"
            ? body.error
            : JSON.stringify(body.error)
          : `Request failed: ${res.status}`;
        const error = new ApiError(message, res.status);
        if (res.status < 500) throw error;
        lastError = error;
      } else {
        return (await res.json()) as T;
      }
    } catch (err) {
      if (err instanceof ApiError && err.status < 500) throw err;
      lastError = err;
    } finally {
      clearTimeout(timeout);
    }

    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Could not reach the server. Check your connection and try again.");
}

export const api = {
  register: (data: { name: string; role: "INVESTOR" | "FOUNDER" | "MENTOR" }) =>
    request<UserProfile>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),

  me: () => request<UserProfile>("/api/users/me"),

  updateMe: (data: { name?: string; bio?: string }) =>
    request<UserProfile>("/api/users/me", { method: "PATCH", body: JSON.stringify(data) }),
};
