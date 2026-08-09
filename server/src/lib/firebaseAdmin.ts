import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "./env";

// On Cloud Run, ADC (Application Default Credentials) is provided by the
// runtime service account automatically. Locally, run
// `gcloud auth application-default login` or set GOOGLE_APPLICATION_CREDENTIALS.
if (getApps().length === 0) {
  initializeApp({
    credential: applicationDefault(),
    projectId: env.firebaseProjectId,
  });
}

export const auth = getAuth();
export const db = getFirestore();
