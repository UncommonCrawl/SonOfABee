# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Hint Dictionary Workflow

Current default: **grapheme-first** mapping from word spellings to rule keys. This ensures reconstructed spellings always match the word.

Recommended scripts:
- `npm run fix-hint-graphemes` (default fixer)
- `npm run validate-hint-spelling`

## IPA Cache Workflow

Raw IPA is cached in:
- `src/data/raw_ipa_cache.js`

Normalized IPA is cached in:
- `src/data/normalized_ipa_cache.js`

Raw IPA is stored first, then normalized into a separate cache.
Rule-key conversion then reads from the normalized cache.

Workflow:
1. Pull raw IPA for words from both `src/data/dictionary.js` and `src/data/levels.js`:
   - `npm run pull-raw-ipa-cache`
2. Normalize raw IPA into the dedicated normalized cache:
   - `npm run normalize-raw-ipa-cache`
3. Convert normalized IPA to rule keys and seed `src/data/dictionary.js`:
   - `npm run seed-dictionary-from-normalized-ipa`
   - `npm run seed-dictionary-from-normalized-ipa -- --write`

Legacy IPA artifacts are kept under `archive/` for reference and are not part of the default workflow.

## API Key Safety

- Keep keys in local `.env` only (ignored by Git in this repo).
- Use `.env.example` as the template and never place real keys in tracked files.
- Do not use secret keys in React client code. Any key in browser-delivered JavaScript is exposed.
- Call paid APIs like WordsAPI from a backend/server function that reads `process.env.WORDS_API_KEY`.

## WordsAPI Proxy (Local)

1. Create local env file:
   - `cp .env.example .env`
   - Set `WORDS_API_KEY` in `.env` (local only; never commit).
2. Start backend proxy in one terminal:
   - `npm run dev:words-api`
3. Start frontend in another terminal:
   - `npm run dev`
4. Frontend calls `/api/words?word=example` and Vite proxies to `http://localhost:8787`.

Quick check:
- Visit `http://localhost:8787/health` to confirm the proxy is running.
