#!/usr/bin/env bash
# Build an Android artifact (APK or AAB) from the Capacitor project.
#
# Examples:
#   scripts/build-android.sh                # debug APK
#   scripts/build-android.sh --release      # release APK (signed if configured)
#   scripts/build-android.sh --aab          # release App Bundle for Play Store
#   scripts/build-android.sh --skip-web     # reuse the current dist/

set -euo pipefail

VARIANT="debug"
FORMAT="apk"
SKIP_WEB=0

usage() {
  cat <<'EOF'
Usage: scripts/build-android.sh [--release] [--aab] [--skip-web]

Options:
  --release      Build the release variant (default: debug). For a signed
                 release, configure signingConfigs in android/app/build.gradle
                 or supply android/keystore.properties.
  --aab          Produce an Android App Bundle (.aab). Implies --release.
  --skip-web     Skip the web build + cap sync step (reuse existing dist/).
  -h, --help     Show this help.

Output is copied to build/android/.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --release)  VARIANT="release"; shift ;;
    --aab)      VARIANT="release"; FORMAT="aab"; shift ;;
    --skip-web) SKIP_WEB=1; shift ;;
    -h|--help)  usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -z "${ANDROID_HOME:-}" && -z "${ANDROID_SDK_ROOT:-}" ]]; then
  echo "warn: neither ANDROID_HOME nor ANDROID_SDK_ROOT is set; Gradle may fail to locate the SDK." >&2
fi

if [[ "$SKIP_WEB" -eq 0 ]]; then
  echo "==> Building web bundle (MOBILE=1)"
  npm run build:mobile
  echo "==> Syncing Capacitor (android)"
  npx cap sync android
fi

cd android

case "$VARIANT:$FORMAT" in
  debug:apk)
    TASK="assembleDebug"
    SEARCH_DIR="app/build/outputs/apk/debug"
    ;;
  release:apk)
    TASK="assembleRelease"
    SEARCH_DIR="app/build/outputs/apk/release"
    ;;
  release:aab)
    TASK="bundleRelease"
    SEARCH_DIR="app/build/outputs/bundle/release"
    ;;
  *)
    echo "unsupported variant/format: $VARIANT/$FORMAT" >&2
    exit 2
    ;;
esac

echo "==> Gradle: $TASK"
./gradlew "$TASK"

OUT_DIR="$ROOT/build/android"
mkdir -p "$OUT_DIR"

shopt -s nullglob
artifacts=("$SEARCH_DIR"/*."$FORMAT")
shopt -u nullglob
if [[ ${#artifacts[@]} -eq 0 ]]; then
  echo "error: no .$FORMAT artifact found under android/$SEARCH_DIR" >&2
  exit 1
fi

for a in "${artifacts[@]}"; do
  cp -f "$a" "$OUT_DIR/"
done

echo
echo "Build complete. Artifacts:"
for a in "${artifacts[@]}"; do
  echo "  build/android/$(basename "$a")"
done

if [[ "$VARIANT" == "release" ]]; then
  for a in "${artifacts[@]}"; do
    if [[ "$(basename "$a")" == *"-unsigned"* ]]; then
      echo
      echo "note: release artifact is unsigned. Configure signing in" >&2
      echo "      android/app/build.gradle to produce an installable build." >&2
      break
    fi
  done
fi
