import "dotenv/config";

// Comma-separated list. Firebase Hosting serves the app on BOTH
// <project>.web.app and <project>.firebaseapp.com (the auth action handler —
// password reset, email verification — runs on the latter), so both must be
// allowed or the browser blocks API calls made from the firebaseapp.com origin.
function parseOrigins(raw: string): string[] {
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const env = {
  port: Number(process.env.PORT ?? 8080),
  clientOrigins: parseOrigins(process.env.CLIENT_ORIGIN ?? "http://localhost:5173"),
  // Optional: only needed for local dev when not using `gcloud auth application-default login`
  // or a mounted service account. On Cloud Run this is inferred automatically.
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
};
