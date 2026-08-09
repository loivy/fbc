import { Router } from "express";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { auth, db } from "../lib/firebaseAdmin";
import type { UserProfile } from "../lib/types";

const router = Router();

// Sign-up/sign-in themselves happen client-side against Firebase Auth.
// This endpoint provisions the Firestore profile doc the rest of the API relies on,
// on first sign-in. Admins are not self-service; they're promoted manually in Firestore/GCP console.
const registerSchema = z.object({
  name: z.string().min(1),
  role: z.enum(["INVESTOR", "FOUNDER", "MENTOR"]),
});

router.post("/register", async (req, res) => {
  const header = req.headers.authorization;
  const idToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!idToken) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  let decoded;
  try {
    decoded = await auth.verifyIdToken(idToken);
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const userRef = db.collection("users").doc(decoded.uid);
  const existing = await userRef.get();
  if (existing.exists) {
    return res.status(409).json({ error: "Profile already exists" });
  }

  const { name, role } = parsed.data;
  const profile: UserProfile = {
    email: decoded.email ?? "",
    name,
    role,
    ...(role === "FOUNDER" ? { founderTier: "FREE" as const } : {}),
    createdAt: FieldValue.serverTimestamp() as unknown as FirebaseFirestore.Timestamp,
    updatedAt: FieldValue.serverTimestamp() as unknown as FirebaseFirestore.Timestamp,
  };

  await userRef.set(profile);

  return res.status(201).json({ id: decoded.uid, ...profile });
});

export default router;
