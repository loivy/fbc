# fbc

The goal is to create a platform for startup founders to get advise about business development and fund raising.

Main functionalities:
- Founder advisory: Book time to talk to mentors (fees apply per hour)
- Connect founders and investors: There's a matching process. On a weekly basis founders get matched to 5 investors.
- Create, signup, and join events (only admins can create events)

Roles:
- Admin
- Investor
- Founder
- Mentor

Founder tiers (monthly subscription, includes mentor hours):
- Free: Access to public events, can book mentor sessions pay-per-hour, no weekly investor matches
- Tier 1: 4 mentor hours/month, general business strategy, weekly investor matches
- Tier 2: 6 mentor hours/month, general business strategy + apply to one accelerator, weekly investor matches
- Tier 3: 8 mentor hours/month, general business strategy + apply to multiple accelerators + investor outreach, weekly investor matches

## Tech stack

- **Client**: React + Vite + TypeScript, authenticates directly against Firebase Auth (email/password)
- **API**: Node.js + Express + TypeScript, deployed as a container to **Cloud Run**
- **Data**: **Firestore** (accessed only by the API via firebase-admin; direct client access is denied by security rules)
- **Auth**: **Firebase Auth** — client signs up/logs in directly with Firebase; the API verifies ID tokens on each request and provisions a matching Firestore profile doc on first sign-in
- **Hosting**: Firebase Hosting (client) + Cloud Run (API)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml` typechecks/builds on every PR; `deploy.yml` builds/pushes the API image and deploys to Cloud Run + Firebase Hosting on `main`, once GCP/Firebase project secrets are configured)

Repo layout: `server/` (Express API), `client/` (React app), npm workspaces at the root.
