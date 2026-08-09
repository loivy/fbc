import type { NextFunction, Request, Response } from "express";
import { auth, db } from "../lib/firebaseAdmin";
import type { Role, UserProfile } from "../lib/types";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: Role; profile: UserProfile };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const idToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!idToken) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);
    const snapshot = await db.collection("users").doc(decoded.uid).get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "No profile for this account yet. Call /api/auth/register first." });
    }

    const profile = snapshot.data() as UserProfile;
    req.user = { id: decoded.uid, role: profile.role, profile };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

export const requireAdmin = requireRole("ADMIN");
