# Cross-repository contract

`dsec-games` is the games surface at `games.dsec.club`.

- This app must not calculate points or leaderboard positions. Its route handlers
  call `dsec-api` with server-only `DSEC_API_URL` and `DSEC_API_KEY`.
- It reads the Auth.js session issued by `dsec-app`. Keep `AUTH_SECRET` and
  `AUTH_COOKIE_DOMAIN=.dsec.club` identical in both Vercel projects.
- Set `NEXT_PUBLIC_PORTAL_URL=https://app.dsec.club` and
  `NEXT_PUBLIC_GAMES_URL=https://games.dsec.club` for production redirects.

Deploy after `dsec-api` and coordinate session configuration with `dsec-app`.
