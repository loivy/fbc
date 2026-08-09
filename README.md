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

Repo layout: `server/` (Express API), `client/` (React app), `scripts/` (deploy helpers), npm workspaces at the root.

## Live deployment

GCP project: **`fbc-founder-platform`** (project number `225691173730`, region `us-central1`)

| Piece | URL / resource |
| --- | --- |
| Client (Firebase Hosting) | https://fbc-founder-platform.web.app |
| API (Cloud Run) | https://fbc-server-225691173730.us-central1.run.app |
| Firestore | Native mode, `nam5` multi-region, free tier |
| Auth | Firebase Auth, email/password provider enabled |
| Images | Artifact Registry `us-central1-docker.pkg.dev/fbc-founder-platform/cloud-run-source-deploy` |

### Deploying

There is no Dockerfile — the API deploys **from source**, and Cloud Build compiles it with
Google Cloud buildpacks. The `gcp-build` script in `server/package.json` runs `tsc`, and
`engines.node` pins the runtime (must be a version the builder offers — 20 is no longer available).

```bash
gcloud run deploy fbc-server --source server --region us-central1 --project fbc-founder-platform --allow-unauthenticated
```

Client and Firestore rules deploys authenticate by impersonating
`fbc-deployer@fbc-founder-platform.iam.gserviceaccount.com`, so no interactive `firebase login`
is needed — just `gcloud auth login` with `roles/iam.serviceAccountTokenCreator` on that account.

Client + rules (PowerShell, from the repo root):

```bash
npm run build --workspace client; ./scripts/deploy-hosting.ps1; ./scripts/deploy-rules.ps1
```

Promote someone to admin (creates the Auth user if needed, sets `role=ADMIN`, and prints a
single-use link for them to set their own password — admins are never self-service):

```bash
./scripts/create-admin.ps1 -Email you@example.com -Name "Your Name"
```

### Local setup

Copy `client/.env.example` → `client/.env` and `server/.env.example` → `server/.env`.
The client's Firebase web config values are in the Firebase console under Project settings → your apps
(the web API key is public by design — it's guarded by Firestore rules and authorized domains, not secrecy).
