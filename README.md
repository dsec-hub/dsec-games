# dsec-games — DSEC Games

The games surface for **games.dsec.club**, currently hosting **Flappy Duck** and
**Codle**.

This is a standalone repository. It was split out of the `dsec` monorepo and no
longer depends on that checkout.

> **Status: never deployed.** `games.dsec.club` does not currently resolve and
> this app has not run in production. Treat the deployment steps below as
> unproven and read [`SECURITY.md`](./SECURITY.md) before the first deploy.

## What it is

A deliberately thin Next.js client. It holds **zero scoring authority** — every
score, round and leaderboard position is decided by `dsec-api`. Browser code
never talks to `dsec-api` directly; it calls this app's own `/api/games/*` route
handlers, which attach the server-only API key and proxy the request.

| Route | Purpose |
|---|---|
| `/` | Game switchboard |
| `/flappy-duck` | Flappy Duck |
| `/codle` | Codle |
| `/leaderboard` | Cross-game leaderboard |
| `/api/games/[slug]/state`, `/round`, `/attempt` | Server-side proxy to `dsec-api` |
| `/api/games/leaderboard`, `/api/games/me` | Server-side proxy to `dsec-api` |

## What it depends on

| Dependency | Why | Required? |
|---|---|---|
| **dsec-api** | Owns all game state and scoring. This app calls `/games/*` on it. | Yes — the games do not function without it |
| **dsec-app** (the portal) | Issues the session cookie this app reads. Players sign in there, not here. | Yes, for saving scores. Anonymous players can view |

There is no database connection and no Supabase credential in this repo.

## Run it locally

```bash
npm install
cp .env.example .env.local    # then fill in DSEC_API_URL and DSEC_API_KEY
npm run dev                   # http://localhost:3003
```

To play as a signed-in account without running the portal, set
`GAMES_DEV_ACCOUNT_ID` and `GAMES_DEV_EMAIL` in `.env.local`. That bypass is
non-production only — leave both unset in Vercel.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3003 |
| `npm run build` | Production build. Needs no environment |
| `npm run start` | Serve a production build on port 3003 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

CI runs typecheck, lint and build on every push to `main` and every PR
(`.github/workflows/ci.yml`).

## Environment

Copy `.env.example` → `.env.local`; it documents every variable with a comment.

| Var | Needed | Purpose |
|---|---|---|
| `DSEC_API_URL` | ✅ | `dsec-api` base URL. Server-only |
| `DSEC_API_KEY` | ✅ | Scoped games-site service key (`read,write`). Server-only — must never reach the browser |
| `AUTH_SECRET` | ✅ | Must be **identical** to `dsec-app`'s, so this app can decode the shared session |
| `AUTH_TRUST_HOST` | ✅ on Vercel | Trust the forwarded host header |
| `AUTH_COOKIE_DOMAIN` | ✅ in prod | `.dsec.club`, and the same value in `dsec-app`. Leave blank locally |
| `NEXT_PUBLIC_PORTAL_URL` | ✅ in prod | Where to send players to sign in (`https://app.dsec.club`) |
| `NEXT_PUBLIC_GAMES_URL` | ✅ in prod | This app's own origin, sent to the portal as the post-login callback |
| `NEXT_PUBLIC_WEBSITE_URL` | optional | Footer / outbound links |
| `GAMES_DEV_ACCOUNT_ID`, `GAMES_DEV_EMAIL` | dev only | Play as a fixed account with no portal session |

> **`NEXT_PUBLIC_*` values are inlined at build time.** Set them in the Vercel
> project *before* the first build; setting them afterwards changes nothing until
> the next build.

## Before the first deploy

1. Create the Vercel project pointed at this repository. The `-p 3003` flags in
   the `dev`/`start` scripts are local-only and are ignored by Vercel.
2. Set every variable marked ✅ above, matching `AUTH_SECRET` and
   `AUTH_COOKIE_DOMAIN` to the values already in the `dsec-app` project.
3. Point `games.dsec.club` at the project and add the DNS record.
4. Confirm a signed-in player on `app.dsec.club` is recognised here — that is the
   one behaviour no build check can prove.

## Local ports

| Service | Repository | URL |
|---|---|---|
| Public site | `dsec-website` | http://localhost:3000 |
| Member portal | `dsec-app` | http://localhost:3001 |
| Committee hub | `dsec-hub` | http://localhost:3002 |
| Games | `dsec-games` | http://localhost:3003 |
| API | `dsec-api` | http://localhost:8000 |

See [`CROSS_REPOSITORY.md`](./CROSS_REPOSITORY.md) for the contract with the
sibling services.

## License

Copyright © 2026 DSEC. Licensed under **AGPL-3.0-only** — see [`LICENSE`](./LICENSE).
