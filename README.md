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

Requires the Android SDK and a recent JDK. `ANDROID_HOME` (or
`ANDROID_SDK_ROOT`) must point at the SDK. Android Studio is convenient
for development but not required by the build scripts.

```bash
npm run cap:open:android       # open in Android Studio
npm run cap:run:android        # build + run on a connected device/emulator

npm run build:android          # debug APK         → build/android/app-debug.apk
npm run build:android:release  # release APK       → build/android/app-release.apk
npm run build:android:bundle   # release AAB       → build/android/app-release.aab
```

Release outputs are signed only if you've configured `signingConfigs` in
`android/app/build.gradle` (or supplied `android/keystore.properties`).
Without a signing config, Gradle produces `app-release-unsigned.apk`.

### iOS

Requires macOS with Xcode and the iOS SDK. Capacitor 6+ uses Swift
Package Manager, so no `pod install` step is needed.

```bash
npm run cap:open:ios           # open in Xcode
npm run cap:run:ios            # build + run on a simulator/device

npm run build:ios              # archive + IPA     → build/ios/*.ipa
npm run build:ios:archive      # archive only      → build/ios/App.xcarchive
npm run build:ios:simulator    # .app for Simulator (unsigned)
```

`build:ios` defaults to the `development` export method. For other
methods pass through directly, e.g.:

```bash
bash scripts/build-ios.sh --export-method app-store
```

To override export settings, drop an `ExportOptions.plist` at
`ios/ExportOptions.plist` and the script will use it as-is. For App
Store distribution, configure signing under the **App** target →
**Signing & Capabilities** before running the script.

### Clean

```bash
npm run clean:android       # gradle clean + remove android/app/build, build/android
npm run clean:ios           # xcodebuild clean + remove ios/App/build, build/ios
npm run clean:mobile        # both, plus dist/ and build/
npm run clean:mobile:deep   # also wipe gradle cache, DerivedData, synced web assets
```

Use the deep clean when a build is misbehaving and you suspect stale
cached output (e.g. after upgrading Capacitor or switching SDK versions).

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
- The principal saints of each day live in `src/data/fixedFeasts.ts`
  (bilingual, hand-curated). The lesser commemorations of the extended
  synaxarion are auto-generated into `src/data/extendedSynaxarion.ts`
  by `npm run build:synaxarion` (sources: OCA Julian calendar and the
  PasiSfinti Romanian dataset). The two are merged at lookup time with
  duplicate detection.
- The full Romanian **Lives of the Saints** (Viețile Sfinților) prose
  for each day lives in `public/lives/{MM}.json`, generated by
  `npm run build:lives` from <https://www.calendar-ortodox.ro/> (the
  text counterpart to <https://www.sinaxar.ro/>'s audio archive). The
  day-detail view loads the relevant month JSON lazily on first expand,
  so this content does not affect first-paint bundle size. Romanian
  only — the English UI displays the Romanian text with a small notice.
- Local customs vary — consult your priest for the rule of your parish.

## Attribution

Lives of the Saints content is rendered from <https://www.calendar-ortodox.ro/>
with per-day source links in the UI. The underlying hagiographic texts are
classical Synaxarion material; the modern Romanian typesetting belongs to
the upstream site. If you redistribute or repackage this app, please verify
the upstream site's terms or seek permission directly. The extended
synaxarion (saint names) draws from the OCA Julian dataset (open-source)
and the PasiSfinti Romanian dataset (open-source).
