import { Router } from "express";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebaseAdmin";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const { id, profile } = req.user!;
  return res.json({
    id,
    email: profile.email,
    name: profile.name,
    bio: profile.bio ?? null,
    role: profile.role,
    founderTier: profile.founderTier ?? null,
  });
});

const updateMeSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().max(1000).optional(),
});

router.patch("/me", requireAuth, async (req, res) => {
  const parsed = updateMeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const userRef = db.collection("users").doc(req.user!.id);
  await userRef.update({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() });

  const updated = await userRef.get();
  const profile = updated.data()!;
  return res.json({
    id: updated.id,
    email: profile.email,
    name: profile.name,
    bio: profile.bio ?? null,
    role: profile.role,
    founderTier: profile.founderTier ?? null,
  });
});

export default router;
