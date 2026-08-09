import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { firebaseConfigured } from "./lib/firebase";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

function FirebaseSetupNotice() {
  return (
    <div style={{ maxWidth: 480, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1>Firebase not configured</h1>
      <p>
        Copy <code>client/.env.example</code> to <code>client/.env</code> and fill in your Firebase
        project's web app config (API key, auth domain, project ID, app ID), then restart the dev
        server.
      </p>
    </div>
  );
}

export function App() {
  if (!firebaseConfigured) {
    return <FirebaseSetupNotice />;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
