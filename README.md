# Orthodox Calendar

A static single-page Orthodox liturgical calendar with feast days, saints of
the day, Pascha-derived moveable feasts, and a fasting indicator. Switches
between the **Revised Julian (New)** and **Julian (Old)** calendars.

Built with Vite + React + TypeScript. Hand-rolled CSS in a Byzantine visual
style — porphyry, gold leaf, parchment, meander borders, illuminated drop-caps.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Deploy

`main` pushes are deployed to GitHub Pages automatically by
`.github/workflows/deploy.yml`.

**One-time setup in the repo Settings → Pages:** set **Source** to
**GitHub Actions**. (The workflow uses the modern Pages deployment flow; no
`gh-pages` branch is needed.)

The Vite `base` is set to `/orthodox/` to match the repository path on
`<user>.github.io/orthodox/`. If the repo is renamed or moved to a custom
domain, update `base` in `vite.config.ts`.

## Project layout

```
src/
  components/   UI components
  lib/          Pascha algorithm, Julian↔Gregorian, moveable feasts, fasting
  data/         Curated fixed-date feasts and saints
  styles/       Byzantine theme tokens + decorative styles
```

## Notes on accuracy

- Pascha is computed via Meeus's Julian algorithm.
- Fasting rules follow the typical Byzantine typikon (Saturday/Sunday
  relaxations during Great Lent, fish on Annunciation & Palm Sunday,
  Bright Week fast-free, etc.).
- The v1 saints dataset covers all twelve Great Feasts and ~40 widely
  commemorated saints. Add more by appending to
  `src/data/fixedFeasts.ts`.
- Local customs vary — consult your priest for the rule of your parish.
