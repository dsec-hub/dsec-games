# Security policy — dsec-games

## Reporting a vulnerability

Email **admin@dsec.club** with "SECURITY" in the subject. Please do not open a
public issue for anything exploitable.

Useful things to include: the URL or endpoint, what you did, what happened, and
whether you needed an account. We will acknowledge and keep you posted on a fix.
This is a student club, not a company with an on-call rota, so treat response
times as best-effort.

## Scope of this document

This file covers **dsec-games only** — the games surface intended for
`games.dsec.club`. The public site (`dsec-website`), the member portal
(`dsec-app`), the committee dashboard (`dsec-hub`) and the API (`dsec-api`) each
have their own repository and their own security notes.

> **This app has never been deployed.** `games.dsec.club` does not currently
> resolve. Everything below describes intended behaviour that has not been
> exercised in production.

## Security model

The app is a thin client. It holds **no scoring authority**: every score, round
and leaderboard position is decided by `dsec-api`. The two properties that matter
are therefore (a) the API key never reaching the browser, and (b) the shared
session being read correctly.

| Control | Where | Notes |
|---|---|---|
| Server-only API key | `src/lib/api.ts` | Browser code calls this app's own `/api/games/*` route handlers, which attach `DSEC_API_KEY` server-side and proxy to `dsec-api`. The key must never be exposed as `NEXT_PUBLIC_*`. |
| Shared portal session | `src/auth.ts` | Reads the Auth.js session issued by `dsec-app`. This app registers no providers and cannot mint a session of its own. |
| Cross-subdomain cookie | `AUTH_COOKIE_DOMAIN` | Must be `.dsec.club` in production **and identical in `dsec-app`**, with a matching `AUTH_SECRET`. A mismatch means players appear signed out here. |

### Dev-only account bypass

`GAMES_DEV_ACCOUNT_ID` / `GAMES_DEV_EMAIL` let you play as a fixed account when
no portal session exists, so the games are testable standalone. This must remain
fenced behind a non-production check. Verify that fence before the first deploy,
and leave both variables unset in the Vercel project.

### Known gaps in this repo

- There is **no application-level rate limiting** in this repo, and no Upstash
  dependency. An earlier version of this document claimed otherwise; that text
  described `dsec-hub`.
- `next-auth` is pinned to a pre-release (`5.0.0-beta.31`) with a caret range.
- Because the app has never run in production, none of the above has been
  validated against a real deploy.

## Before the first deploy

- Set `NEXT_PUBLIC_PORTAL_URL`, `NEXT_PUBLIC_GAMES_URL` and
  `NEXT_PUBLIC_WEBSITE_URL` in Vercel **before** the build runs — `NEXT_PUBLIC_*`
  values are inlined at build time, so setting them afterwards has no effect
  until the next build.
- Set `AUTH_SECRET` and `AUTH_COOKIE_DOMAIN=.dsec.club` to the same values as
  `dsec-app`.
- Mint a scoped `DSEC_API_KEY` for this service and point `DSEC_API_URL` at the
  API's new host.

> **Migration note.** `api.dsec.club` is moving off Vercel to an OVH VPS. Set
> `DSEC_API_URL` to whatever the API's address is at the time of this app's first
> deploy, and do not assume a Vercel Firewall rule protects it.
