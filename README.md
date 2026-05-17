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

## Mobile apps (iOS / Android)

The project is also packaged as a native iOS and Android app via
[Capacitor](https://capacitorjs.com/). The same React app is bundled into
a native shell — no code rewrite.

### Build the mobile web bundle

```bash
npm run build:mobile     # builds dist/ with relative asset paths
npx cap sync             # copies dist/ into android/ and ios/ projects
```

`build:mobile` sets `MOBILE=1` so Vite emits relative (`./`) asset paths,
which Capacitor needs since it loads files from the device filesystem
rather than a server.

### Android

Requires Android Studio (with the Android SDK + a recent JDK).

```bash
npm run cap:open:android   # opens the project in Android Studio
# or
npm run cap:run:android    # builds and runs on a connected device/emulator
```

In Android Studio: pick a device/emulator and press Run. To produce a
release APK/AAB, use **Build → Generate Signed Bundle / APK**.

### iOS

Requires macOS with Xcode and CocoaPods. On first checkout from a
machine that has just cloned the repo:

```bash
cd ios/App && pod install && cd ../..
```

Then:

```bash
npm run cap:open:ios       # opens the project in Xcode
# or
npm run cap:run:ios        # builds and runs on a simulator/device
```

In Xcode: select a simulator or device and press Run. For App Store
distribution, configure signing under the **App** target → **Signing &
Capabilities**, then **Product → Archive**.

### App identity

App ID and display name live in `capacitor.config.ts`
(`org.orthodox.calendar` / "Orthodox Calendar"). Update there and re-run
`npx cap sync` to propagate to both native projects.

## Project layout

```
src/
  components/   UI components
  lib/          Pascha algorithm, Julian↔Gregorian, moveable feasts, fasting
  data/         Curated fixed-date feasts and saints
  styles/       Byzantine theme tokens + decorative styles
android/        Capacitor-generated Android Studio project
ios/            Capacitor-generated Xcode project
capacitor.config.ts   App ID, name, native shell settings
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
