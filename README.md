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

Legacy/IPA-based artifacts (kept for reference, not the default path):
- `archive/hint_dictionary_legacy/hint_dictionary_ipa.json`
- `archive/hint_dictionary_legacy/hint_dictionary_missing.txt`
- `archive/hint_dictionary_legacy/hint_dictionary_missing_sample.txt`
- `archive/hint_dictionary_legacy/hint_dictionary_queue.txt`
- `archive/hint_dictionary_legacy/hint_dictionary_diagnostics.json`
- `archive/hint_dictionary_legacy/generateHintDictionary.js`
- `archive/hint_dictionary_legacy/diagnoseHintDictionary.js`
- `archive/hint_dictionary_legacy/validateRuleKeys.js`
