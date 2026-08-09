import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { api, type UserProfile } from "./api";

interface AuthContextValue {
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; role: "INVESTOR" | "FOUNDER" | "MENTOR" }) => Promise<void>;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    if (!firebaseAuth?.currentUser) {
      setProfile(null);
      return;
    }
    try {
      const me = await api.me();
      setProfile(me);
    } catch {
      setProfile(null);
    }
  }

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(firebaseAuth, async () => {
      await refresh();
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(requireFirebaseAuth(), email, password);
    await refresh();
  }

  async function signup(data: { email: string; password: string; name: string; role: "INVESTOR" | "FOUNDER" | "MENTOR" }) {
    await createUserWithEmailAndPassword(requireFirebaseAuth(), data.email, data.password);
    const created = await api.register({ name: data.name, role: data.role });
    setProfile(created);
  }

  async function logout() {
    await signOut(requireFirebaseAuth());
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ profile, loading, login, signup, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
