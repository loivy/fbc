import { useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./lib/auth";
import { Button, Container } from "./components/ui";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status, error, refresh } = useAuth();
  const [retrying, setRetrying] = useState(false);

  if (status === "loading") {
    return (
      <Container className="py-24">
        <p className="text-ink-500 dark:text-ink-400">Loading your account...</p>
      </Container>
    );
  }

  if (status === "signedOut") {
    return <Navigate to="/login" replace />;
  }

  // Credentials were accepted but the profile did not load. Redirecting to
  // /login here would look like the password was wrong, so explain and retry.
  if (status === "profileFailed") {
    return (
      <Container className="py-24">
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold">We could not load your account</h1>
          <p className="mt-3 leading-relaxed text-ink-700 dark:text-ink-400">
            {error ?? "Something went wrong loading your profile."}
          </p>
          <Button
            className="mt-6"
            disabled={retrying}
            onClick={async () => {
              setRetrying(true);
              await refresh().catch(() => {});
              setRetrying(false);
            }}
          >
            {retrying ? "Retrying..." : "Try again"}
          </Button>
        </div>
      </Container>
    );
  }

  return <>{children}</>;
}
