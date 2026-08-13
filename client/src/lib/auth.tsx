import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { ApiError, api, type UserProfile } from "./api";

/**
 * `signedOut`      no Firebase user.
 * `ready`          Firebase user and their profile loaded.
 * `profileFailed`  Firebase accepted the credentials but we could not load the
 *                  profile. This is its own state on purpose: treating it as
 *                  "signed out" silently bounced people back to /login after a
 *                  successful password entry, with nothing explaining why.
 */
export type AuthStatus = "loading" | "signedOut" | "ready" | "profileFailed";

interface AuthContextValue {
  profile: UserProfile | null;
  status: AuthStatus;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    name: string;
    role: "INVESTOR" | "FOUNDER" | "MENTOR";
  }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function requireFirebaseAuth() {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase is not configured. Copy client/.env.example to client/.env and fill in your Firebase project's web app config.",
    );
  }
  return firebaseAuth;
}

/** Firebase error codes are not fit to show a person. */
function friendlyAuthMessage(err: unknown): string {
  const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password do not match an account.";
    case "auth/invalid-email":
      return "That email address is not valid.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment and try again.";
    case "auth/email-already-in-use":
      return "An account already exists for that email. Try logging in instead.";
    case "auth/weak-password":
      return "Pick a password with at least 8 characters.";
    case "auth/network-request-failed":
      return "Could not reach the authentication service. Check your connection.";
    default:
      return err instanceof Error ? err.message : "Something went wrong. Try again.";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    if (!firebaseAuth?.currentUser) {
      setProfile(null);
      setError(null);
      setStatus("signedOut");
      return;
    }

    try {
      const me = await api.me();
      setProfile(me);
      setError(null);
      setStatus("ready");
    } catch (err) {
      setProfile(null);
      // A 404 means the Firebase account exists but was never given a profile.
      setError(
        err instanceof ApiError && err.status === 404
          ? "Your account has no profile yet. Finish signing up to continue."
          : "We signed you in but could not load your account. The server may still be starting up.",
      );
      setStatus("profileFailed");
      // Rethrow so callers (login/signup) do not navigate on a half-finished sign-in.
      throw err;
    }
  }

  useEffect(() => {
    if (!firebaseAuth) {
      setStatus("signedOut");
      return;
    }
    const unsubscribe = onAuthStateChanged(firebaseAuth, async () => {
      // Swallowed here only: this is the passive session check on page load,
      // where `status` already carries the outcome for the UI to react to.
      await refresh().catch(() => {});
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    setError(null);
    try {
      await signInWithEmailAndPassword(requireFirebaseAuth(), email, password);
    } catch (err) {
      const message = friendlyAuthMessage(err);
      setError(message);
      throw new Error(message);
    }
    await refresh();
  }

  async function signup(data: {
    email: string;
    password: string;
    name: string;
    role: "INVESTOR" | "FOUNDER" | "MENTOR";
  }) {
    setError(null);
    try {
      await createUserWithEmailAndPassword(requireFirebaseAuth(), data.email, data.password);
    } catch (err) {
      const message = friendlyAuthMessage(err);
      setError(message);
      throw new Error(message);
    }

    const created = await api.register({ name: data.name, role: data.role });
    setProfile(created);
    setStatus("ready");
  }

  async function logout() {
    await signOut(requireFirebaseAuth());
    setProfile(null);
    setError(null);
    setStatus("signedOut");
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        status,
        loading: status === "loading",
        error,
        login,
        signup,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
