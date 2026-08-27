import { Router } from "express";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebaseAdmin";
import { requireAdmin, requireAuth } from "../middleware/auth";
import type { Application } from "../lib/types";

const router = Router();

/**
 * Only http(s) URLs are accepted. z.string().url() alone would happily take
 * javascript: and data: URLs, which then get rendered as links in the admin view.
 */
function isHttpUrl(value: string): boolean {
  try {
    return /^https?:$/i.test(new URL(value).protocol);
  } catch {
    return false;
  }
}

const URL_MESSAGE = "Must be a http:// or https:// link";

const requiredUrl = z
  .string()
  .trim()
  .max(500)
  .refine(isHttpUrl, { message: URL_MESSAGE });

/** Optional URL fields arrive as "" from empty inputs, which must stay valid. */
const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || isHttpUrl(value), { message: URL_MESSAGE })
  .optional();

const applicationSchema = z.object({
  companyName: z.string().trim().min(1).max(120),
  website: optionalUrl,
  oneLiner: z.string().trim().min(10).max(300),
  stage: z.enum(["IDEA", "PRE_SEED", "SEED", "SERIES_A_PLUS"]),
  founderName: z.string().trim().min(1).max(120),
  founderEmail: z.string().trim().email().max(200),
  founderProfileUrl: requiredUrl,
  deckUrl: requiredUrl,
  raising: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(2000).optional(),
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Deliberately permissive here so the handler can answer 201 and stop the bot
  // retrying; rejecting it at the schema would return 400 and invite a retry.
  website2: z.string().max(200).optional(),
});

/**
 * Coarse per-instance throttle. Cloud Run runs several instances, so this is a
 * speed bump rather than real protection; App Check or a captcha is the proper
 * fix before this URL gets any traffic.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recentByIp = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);

  if (recentByIp.size > 5000) recentByIp.clear();
  return hits.length > RATE_LIMIT_MAX;
}

// Public: founders submitting a company do not have an account.
router.post("/", async (req, res) => {
  const ip = req.ip ?? "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many submissions. Try again in a minute." });
  }

  const parsed = applicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { website2, ...data } = parsed.data;
  if (website2) {
    // Bot filled the honeypot. Return success so it does not retry.
    return res.status(201).json({ ok: true });
  }

  const application: Omit<Application, "createdAt" | "updatedAt"> & {
    createdAt: FirebaseFirestore.FieldValue;
    updatedAt: FirebaseFirestore.FieldValue;
  } = {
    companyName: data.companyName,
    oneLiner: data.oneLiner,
    stage: data.stage,
    founderName: data.founderName,
    founderEmail: data.founderEmail,
    founderProfileUrl: data.founderProfileUrl,
    deckUrl: data.deckUrl,
    ...(data.website ? { website: data.website } : {}),
    ...(data.raising ? { raising: data.raising } : {}),
    ...(data.notes ? { notes: data.notes } : {}),
    status: "SUBMITTED",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection("applications").add(application);
  return res.status(201).json({ ok: true });
});

// Admin review queue.
router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  const snapshot = await db
    .collection("applications")
    .orderBy("createdAt", "desc")
    .limit(200)
    .get();

  return res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
});

const statusSchema = z.object({
  status: z.enum(["SUBMITTED", "IN_REVIEW", "INTERVIEWING", "REFERRED", "REJECTED"]),
});

router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const ref = db.collection("applications").doc(req.params.id);
  if (!(await ref.get()).exists) {
    return res.status(404).json({ error: "Application not found" });
  }

  await ref.update({ status: parsed.data.status, updatedAt: FieldValue.serverTimestamp() });
  return res.json({ id: ref.id, status: parsed.data.status });
});

export default router;
