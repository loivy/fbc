import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/firebaseAdmin";
import { requireAdmin, requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/users", async (_req, res) => {
  const snapshot = await db.collection("users").orderBy("createdAt", "desc").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email,
      name: data.name,
      role: data.role,
      founderTier: data.founderTier ?? null,
      createdAt: data.createdAt,
    };
  });
  return res.json(users);
});

const setTierSchema = z.object({
  founderTier: z.enum(["FREE", "TIER1", "TIER2", "TIER3"]),
});

router.patch("/users/:id/tier", async (req, res) => {
  const parsed = setTierSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const userRef = db.collection("users").doc(req.params.id);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    return res.status(404).json({ error: "User not found" });
  }
  const data = snapshot.data()!;
  if (data.role !== "FOUNDER") {
    return res.status(400).json({ error: "Founder tier only applies to founders" });
  }

  await userRef.update({ founderTier: parsed.data.founderTier });
  return res.json({ id: userRef.id, founderTier: parsed.data.founderTier });
});

export default router;
