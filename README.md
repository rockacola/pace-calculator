# Pace Calculator

A mobile-first web app for runners to calculate and convert running pace, speed, and finish times — no backend, works fully offline.

## What it is

Pace Calculator is a **utility tool** for runners and coaches to quickly work out pace per km/mile, target finish times, and speed conversions. It runs entirely in the browser.

It is **not** a GPS tracker, training log, or fitness platform.

## Tech stack

| Layer     | Choice                              |
| --------- | ----------------------------------- |
| Framework | Vue 3 (Composition API)             |
| Build     | Vite                                |
| Language  | TypeScript                          |
| Styles    | Tailwind CSS v4                     |
| State     | Pinia + pinia-plugin-persistedstate |
| Routing   | Vue Router (hash history)           |
| Tests     | Vitest                              |
| Deploy    | GitHub Pages                        |

## Getting started

```bash
npm install
npm run dev          # dev server at http://localhost:3000
npm run test         # run all tests
npm run build        # production build → dist/
npm run preview      # preview production build locally
```

## Project structure

```text
src/
├── assets/         # CSS entry point + design tokens
├── components/     # Reusable UI components
├── composables/    # Reactive stateful logic
├── constants/      # Static data (distances, zones)
├── utils/          # Pure calculation utilities (deterministic, fully tested)
├── views/          # Page-level Vue components
├── router/         # Vue Router config
└── test/           # Vitest unit tests
```

## Deployment

The app is built as a static site and deployed to GitHub Pages. Hash-based routing avoids 404s without server config.

```bash
npm run build
# dist/ is deployed automatically via GitHub Actions on push to main
```

## See also

- [`docs/overview.md`](docs/overview.md) — architecture and design decisions
- [`docs/tasks.md`](docs/tasks.md) — phased implementation task list
