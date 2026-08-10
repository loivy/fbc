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

Built with the `design-taste-frontend` skill. Design read: landing for early-stage founders
evaluating a paid advisory program, modern B2B SaaS language.
Dials: DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4.

**Foundation (also unblocks Phase 1 UI)**
- [x] Tailwind v4 wired into Vite via `@tailwindcss/vite` (not the v3-era PostCSS plugin)
- [x] Design tokens in `client/src/styles.css`: cool neutrals + single emerald accent, radius scale, self-hosted Outfit + Plus Jakarta Sans (no Google Fonts `<link>`)
- [x] Shared primitives in `client/src/components/ui.tsx`: Button, ButtonLink, Card, Container, Section, Field, input styles
- [ ] Restyle the existing Signup / Login / Dashboard pages to match (still inline-styled placeholders)

**Routing**
- [x] `/` is now the public landing page; unknown routes redirect there
- [x] Signed-in visitors redirect to `/dashboard`; landing paints without waiting on the auth check so it does not block LCP
- [x] Landing renders even when Firebase is unconfigured (marketing no longer depends on auth); only auth routes gate on it
- [x] Marketing header with mobile menu, plus footer

**Content sections**
- [x] Hero: asymmetric split (not centered, per variance 7), 2-line headline, 16-word subtext, real image
- [x] Three pillars as an asymmetric bento (photo cell, accent-filled cell, plain cell) rather than three equal cards
- [x] How it works: three steps, labelled by the action itself
- [x] Plans: Free / Tier 1 / Tier 2 / Tier 3 with hours and features, Tier 2 emphasized
- [x] FAQ (native `<details>`, keyboard accessible)
- [x] Final CTA band + footer
- [ ] **Set plan prices.** The plans section ships without monthly figures because none exist yet. Add them to `plans` in `LandingPage.tsx`.
- [ ] **Replace placeholder photography.** Hero and advisory images are Picsum seeds.
- [ ] Mentor spotlight — needs real mentors before it can go on a live page
- [ ] Social proof (logos, testimonials) — deliberately omitted; inventing either would put fabricated credibility on a live public page

**Quality bar**
- [x] Responsive, verified at 375 / 768 / 1280 with zero horizontal overflow at every width
- [x] SEO: title, meta description, Open Graph tags, theme-color, SVG favicon
- [x] Accessibility: semantic landmarks, alt text, visible focus ring, AA contrast verified (light CTA 5.7:1, dark CTA 9.8:1, body 13:1)
- [x] Motion honors `prefers-reduced-motion`; no `window.addEventListener("scroll")`
- [x] Light and dark both verified; theme locked page-wide, no section inverts
- [x] Deployed and verified live
- [ ] Bundle is 148 kB gzipped because Firebase loads on the landing route. Code-split so `/` does not pull the auth SDK.
- [ ] Run Lighthouse and confirm ≥ 90

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
