export type Role = "ADMIN" | "INVESTOR" | "FOUNDER" | "MENTOR";

// Monthly subscription tier for founders. Bundles mentor hours; see readme.md.
export type FounderTier = "FREE" | "TIER1" | "TIER2" | "TIER3";

// Firestore document shape for the `users` collection, keyed by Firebase Auth UID.
export interface UserProfile {
  email: string;
  name: string;
  bio?: string;
  role: Role;
  // Only set (and meaningful) when role === "FOUNDER"
  founderTier?: FounderTier;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
