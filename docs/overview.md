# Architecture Overview

## Stores

No Pinia stores are used — all state is local to the `usePaceCalculator` composable.

## Composables

| Composable          | Location                               | Description                                      |
| ------------------- | -------------------------------------- | ------------------------------------------------ |
| `usePaceCalculator` | `src/composables/usePaceCalculator.ts` | All reactive calculator state and derived values |

## Routing

| Path | Component  | Description               |
| ---- | ---------- | ------------------------- |
| `/`  | `HomeView` | Main pace calculator page |

## Design tokens

CSS custom properties are defined in `src/assets/main.css` via Tailwind v4 `@theme` (generates utility classes) plus `:root` shorthand aliases (used in SVG fills and inline style bindings).

## Calculation method

- **Race equivalents:** Riegel formula `T₂ = T₁ × (D₂/D₁)^1.06`
- **Training zones:** 7-tier model derived from threshold pace (binary-searched as the predicted 1-hour race distance)
- **Environmental adjustments:** heat penalty (+2 sec/km per °C above 12°C) and altitude penalty (above 500 m reference)
