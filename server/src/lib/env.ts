import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 8080),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  // Optional: only needed for local dev when not using `gcloud auth application-default login`
  // or a mounted service account. On Cloud Run this is inferred automatically.
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
};
