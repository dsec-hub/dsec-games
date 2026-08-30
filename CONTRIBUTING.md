# Contributing to dsec-games

Browser games for the club. Next.js. No database and no credentials — keep it
that way.

## Ground rules

1. **No secrets in the repo.** No `.env`, tokens, or API keys in a commit — ever.
2. **No real member data.** No names, student IDs, or emails in code, fixtures,
   or sample content.
3. **Games run in the browser sandbox.** Everything ships as a web build that
   runs in the tab. Don't add a downloadable executable, installer, or native
   binary served from the site.

## How to contribute

1. Branch from `main`: `git checkout -b feat/<short-name>`.
2. Make the change and run the local gate:
   ```bash
   npm run typecheck && npm run lint && npm run build
   ```
3. Open a PR against `main` and fill in the template.
4. A code owner reviews — see [CODEOWNERS](.github/CODEOWNERS).

Local dev: `npm install` then `npm run dev` (port 3003).
