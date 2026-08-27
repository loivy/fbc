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

/** Where an inbound company application sits in the review pipeline. */
export type ApplicationStatus =
  | "SUBMITTED"
  | "IN_REVIEW"
  | "INTERVIEWING"
  | "REFERRED"
  | "REJECTED";

export type CompanyStage = "IDEA" | "PRE_SEED" | "SEED" | "SERIES_A_PLUS";

/**
 * Firestore document shape for the `applications` collection.
 * Submitted publicly by founders who do not have an account, so nothing here
 * is tied to a Firebase Auth UID.
 */
export interface Application {
  companyName: string;
  website?: string;
  oneLiner: string;
  stage: CompanyStage;
  founderName: string;
  founderEmail: string;
  founderProfileUrl: string;
  deckUrl: string;
  raising?: string;
  notes?: string;
  status: ApplicationStatus;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
