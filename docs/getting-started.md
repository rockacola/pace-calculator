# Getting Started

## Prerequisites

- Node.js 20+
- npm 10+

## Install and run

```bash
npm install
npm run dev          # dev server at http://localhost:3000
```

## Project structure

```text
src/
├── assets/
│   └── main.css          # Tailwind v4 entry + design tokens + component classes
├── components/
│   ├── PaceCurve.vue     # SVG Riegel prediction curve
│   ├── PaceRibbon.vue    # Animated pace bar
│   └── TimeInput.vue     # HH:MM:SS input widget
├── composables/
│   └── usePaceCalculator.ts  # All reactive state and computed values
├── constants/
│   ├── distances.ts      # DISTANCES array
│   └── zones.ts          # ZONES array (7-tier training model)
├── utils/
│   └── paceUtils.ts      # Pure functions: predict, fmtPace, fmtTime
├── views/
│   └── HomeView.vue      # Main calculator page
├── router/
│   └── index.ts          # Hash-history router
├── test/
│   └── setup.ts          # Vitest setup
└── main.ts
```

## Scripts

| Command                 | Description                |
| ----------------------- | -------------------------- |
| `npm run dev`           | Start dev server           |
| `npm run build`         | Production build → `dist/` |
| `npm run preview`       | Preview production build   |
| `npm run lint`          | ESLint check               |
| `npm run lint:fix`      | ESLint auto-fix            |
| `npm run format`        | Prettier format            |
| `npm run typecheck`     | TypeScript check           |
| `npm run test`          | Run Vitest unit tests      |
| `npm run test:coverage` | Run tests with coverage    |
