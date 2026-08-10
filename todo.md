# FBC — Implementation Todo

Platform for startup founders to get advisory on business development and fundraising.

Roles: Admin, Investor, Founder, Mentor
Founder tiers (monthly subscription, bundles mentor hours):
- Free: public events + pay-per-hour mentor booking, no weekly matches
- Tier 1: 4 mentor hrs/mo, general business strategy, weekly investor matches
- Tier 2: 6 mentor hrs/mo, + apply to one accelerator, weekly investor matches
- Tier 3: 8 mentor hrs/mo, + apply to multiple accelerators & investor outreach, weekly investor matches

Phased build. Each phase should ship as a usable slice, not just backend plumbing.

Stack: React + Vite client, Express API on Cloud Run, Firebase Auth, Firestore. See readme.md "Tech stack" for details.

---

## Phase 0 — Foundation
- [x] Pick stack (React/Vite client, Express API, Firebase Auth, Firestore, Cloud Run) and scaffold repo (`server/`, `client/` npm workspaces)
- [x] Auth: signup/login via Firebase Auth (client-side) + API provisions Firestore profile with role field (Admin/Investor/Founder/Mentor) on first sign-in (`server/src/routes/auth.ts`)
- [x] Base user profile model: `UserProfile` in Firestore `users` collection (email, name, bio, role) — `server/src/lib/types.ts`
- [x] Founder tier field (Free/Tier1/Tier2/Tier3) + basic account settings page (`client/src/pages/DashboardPage.tsx`, name/bio editable; tier displayed)
- [x] Admin flag / admin-only route guard — `requireAdmin` middleware (`server/src/middleware/auth.ts`), used by `server/src/routes/admin.ts` (list users, set founder tier)
- [x] Deployment pipeline scaffolded: source-based Cloud Run deploy, `firebase.json`/`firestore.rules` (Hosting + Firestore), `.github/workflows/ci.yml` (typecheck/build on PR), `.github/workflows/deploy.yml` (deploy to Cloud Run + Firebase Hosting on `main`)
- [x] **Live infrastructure provisioned** in GCP project `fbc-founder-platform`: billing linked, APIs enabled, Firestore (native, nam5), Firebase added, web app registered, email/password auth enabled, Artifact Registry repo, `fbc-deployer` service account
- [x] **Deployed and verified end-to-end**: client at https://fbc-founder-platform.web.app, API at https://fbc-server-225691173730.us-central1.run.app — signup creates a Firebase Auth user, the API provisions the Firestore profile, and profile edits persist
- [x] Repeatable deploy scripts: `scripts/deploy-hosting.ps1`, `scripts/deploy-rules.ps1`, `scripts/create-admin.ps1` (SA impersonation, no interactive `firebase login`)
- [x] API deploys from source via Cloud Run buildpacks (no Dockerfile); `gcp-build` script compiles TypeScript
- [x] Admin account provisioned for loivy0225@gmail.com and verified against the admin-only endpoint
  - [ ] Wire up GitHub Actions CD: set repo vars/secrets listed at the top of `deploy.yml` (`GCP_PROJECT_ID`, `GCP_REGION`, `CLOUD_RUN_SERVICE`, WIF provider + deploy SA, `FIREBASE_SERVICE_ACCOUNT`), and pass the `VITE_FIREBASE_*` values into the client build step — `client/.env` is gitignored, so CI has no Firebase config today
  - [ ] Remove the `smoketest@example.com` test account (Firebase Auth user + its `users/` doc) once no longer needed

## Phase 0.5 — Public landing page 🎨 (before Phase 1)
Marketing front door with the polish of a modern startup/accelerator site. Today the app has no
public face at all: `/` redirects straight to `/dashboard` → `/login`, and every page is unstyled
inline CSS. This phase fixes both.

**Foundation (also unblocks Phase 1 UI)**
- [ ] Pick a styling approach (Tailwind, CSS modules, or vanilla-extract) and wire it into Vite
- [ ] Design tokens: color palette, type scale, spacing, radii, shadows
- [ ] Shared primitives: Button, Input, Card, Container, Section, Badge
- [ ] Restyle the existing Signup / Login / Dashboard pages to match (they're inline-styled placeholders today)

**Routing**
- [ ] Make `/` the public landing page instead of redirecting to `/dashboard`
- [ ] Signed-in visitors hitting `/` go to `/dashboard`; signed-out visitors see the landing page
- [ ] Public marketing header (logo, nav, "Log in" + "Get started" CTAs) and footer

**Content sections**
- [ ] Hero: headline, subhead, primary CTA (Get started) + secondary (Log in)
- [ ] Three pillars matching the actual product: Founder Advisory (mentor hours), Weekly Investor Matching, Events
- [ ] How it works — 3–4 steps from signup to first mentor session
- [ ] Pricing / tier comparison table: Free, Tier 1 (4 hrs), Tier 2 (6 hrs, +1 accelerator), Tier 3 (8 hrs, +multi-accelerator & investor outreach)
- [ ] Mentor spotlight — photos, expertise, credentials (placeholder data until real mentors are onboarded)
- [ ] Social proof — logos, founder testimonials, outcome stats (clearly placeholder until real)
- [ ] FAQ
- [ ] Final CTA band above the footer
- [ ] Footer: about, contact, privacy, terms

**Quality bar**
- [ ] Fully responsive (mobile → desktop); test at 375px, 768px, 1280px
- [ ] SEO: page title, meta description, Open Graph / Twitter card tags, favicon
- [ ] Accessibility: semantic landmarks, alt text, visible focus states, AA contrast
- [ ] Performance: optimized/lazy images, no layout shift, Lighthouse ≥ 90
- [ ] Verify the deployed landing page on both Hosting domains

Deferred (not blocking): custom domain, analytics, blog/content marketing, waitlist capture.

## Phase 1 — Founder Advisory (mentor booking) ⭐ first functional phase
- [ ] Mentor profile: expertise tags, hourly fee, bio, availability calendar
- [ ] Mentor expertise categories aligned to tier use cases: general strategy, accelerator applications, investor outreach
- [ ] Founder-facing mentor directory/search (filter by expertise)
- [ ] Availability management for mentors (set open slots)
- [ ] Subscription tier model: Free (pay-per-hour), Tier 1 (4 hrs/mo), Tier 2 (6 hrs/mo), Tier 3 (8 hrs/mo)
- [ ] Monthly hour quota tracking per founder (allotment, used, remaining; resets on billing cycle)
- [ ] Booking flow: founder selects mentor + slot, confirms request
  - [ ] Free tier or over-quota hours → pay-per-hour charge
  - [ ] Within quota → deduct from monthly allotment, no charge
- [ ] Gate accelerator-application and investor-outreach mentor categories behind Tier 2/Tier 3 respectively
- [ ] Payment integration: pay-per-hour charges + recurring monthly subscription billing
- [ ] Booking states: requested → confirmed → completed/cancelled (cancelled/no-show hour refund policy)
- [ ] Notifications (email) for booking created/confirmed/cancelled/reminder, low-hours-remaining alert
- [ ] Basic video/call link handling (e.g. generate meeting link, or just store a link mentor provides)
- [ ] Founder dashboard: upcoming/past sessions, hours used/remaining this cycle
- [ ] Mentor dashboard: upcoming/past sessions, earnings summary
- [ ] Admin visibility: list all bookings, manage mentors

## Phase 2 — Events
- [ ] Event model (title, description, date/time, capacity, public/private)
- [ ] Admin: create/edit/cancel events
- [ ] Public event listing page (visible to all founder tiers)
- [ ] Signup/RSVP flow + capacity limits/waitlist
- [ ] "My events" view for joined events
- [ ] Event reminders (email)

## Phase 3 — Founder–Investor Matching (Tier 1/2/3)
- [ ] Investor profile: focus areas, check size, stage preference
- [ ] Founder profile fields needed for matching (industry, stage, ask)
- [ ] Matching algorithm v1 (rule-based on tags/stage/industry)
- [ ] Weekly job: generate 5 matches per paid-tier founder (Tier 1, 2, or 3); Free tier excluded
- [ ] Match delivery (in-app list + email digest)
- [ ] Founder ↔ investor intro/contact flow (opt-in reveal or intro request)
- [ ] Investor-side view of incoming founder matches, accept/pass
- [ ] Admin controls: re-run matching, exclude pairs, view match history

## Phase 4 — Billing & Tiers
- [ ] Plan gating throughout app (Free/Tier 1/Tier 2/Tier 3 feature access)
- [ ] Recurring monthly subscription billing per tier, with mentor-hour quota reset on renewal
- [ ] Tier upgrade/downgrade/cancel flow (mid-cycle proration policy for hour quota)
- [ ] Per-session pay-per-hour billing for Free tier / over-quota hours (if not already in Phase 1)
- [ ] Invoices/receipts, payment history page

## Phase 5 — Admin & Trust/Safety
- [ ] Admin panel: manage users, roles, mentors, investors
- [ ] Mentor/investor vetting or approval workflow before going live
- [ ] Reporting/flagging for inappropriate behavior
- [ ] Basic analytics (bookings, event attendance, match acceptance rate)

## Phase 6 — Polish
- [ ] Search/filter improvements across mentors/events/investors
- [ ] Ratings/reviews for mentor sessions
- [ ] Mobile-responsive pass
- [ ] Onboarding flows per role
