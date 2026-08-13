import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { firebaseConfigured } from "./lib/firebase";
import { ProtectedRoute } from "./ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

function FirebaseSetupNotice() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24">
      <h1 className="text-2xl font-semibold">Firebase not configured</h1>
      <p className="mt-4 leading-relaxed text-paper-400">
        Copy <code className="rounded bg-ink-800 px-1.5 py-0.5 text-sm text-paper-50">client/.env.example</code>{" "}
        to <code className="rounded bg-ink-800 px-1.5 py-0.5 text-sm text-paper-50">client/.env</code> and fill in
        your Firebase project's web app config (API key, auth domain, project ID, app ID), then
        restart the dev server.
      </p>
    </div>
  );
}

/**
 * The landing page is public and does not depend on Firebase, so it renders
 * immediately rather than waiting on the auth check. Signed-in visitors are
 * redirected to their dashboard once that check resolves; keeping the paint
 * unblocked matters more here because this is the page that carries LCP.
 */
function LandingRoute() {
  const { profile, loading } = useAuth();

  if (!loading && profile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}

/** Auth screens genuinely need Firebase; the marketing page does not. */
function AuthRoute({ children }: { children: React.ReactNode }) {
  if (!firebaseConfigured) {
    return <FirebaseSetupNotice />;
  }
  return <>{children}</>;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
