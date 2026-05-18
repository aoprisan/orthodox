# Google Play Console — Submission Checklist

Step-by-step punch list to get **Orthodox Calendar** from "signed AAB
ready" to "live on the Play Store". Tackle top-to-bottom; everything
inside Play Console is sectioned so you can leave and come back.

Prereqs handed off from this repo:

- Signed AAB from the colleague (target file: `build/android/orthodox-calendar-v<n>-release.aab`)
- `store-assets/android/icon-512.png`
- `store-assets/android/feature-graphic-1024x500.png`
- `store-assets/android/screenshots/phone/*.png` (2–8 phone screenshots, 9:16)
- `store-assets/android/listing.md` (paste-ready copy)
- `public/privacy.html` deployed at https://aoprisan.github.io/orthodox/privacy.html

---

## 1 · Create the developer account (one-time)

If not already done:

1. Go to https://play.google.com/console/signup.
2. Pay the **$25 one-time registration fee** (developer account).
3. Verify identity (D-U-N-S for an organisation, government ID for an individual).
4. Wait for approval — usually a few days.

> Identity verification is the slowest gate. Start this first if the
> account doesn't exist yet — everything else can be staged in parallel.

---

## 2 · Create the app entry

In Play Console → **All apps** → **Create app**:

- **App name**: `Orthodox Calendar`
- **Default language**: English (United States) – `en-US`
- **App or game**: App
- **Free or paid**: Free
- Accept the two declarations (Developer Program Policies, US export laws).

---

## 3 · Set up Play App Signing (one-time, with the colleague)

When the colleague generates the upload key:

1. Play Console → **Test and release** → **Setup** → **App integrity**.
2. Under **App signing**, choose **Use Play App Signing** (Google holds
   the app-signing key; the colleague holds the upload key).
3. Either:
   - Upload the **first signed AAB** to Internal testing — Google
     extracts the upload key from the AAB automatically; **or**
   - Manually upload the upload-key certificate the colleague exports
     with `keytool -export-cert`.

> Losing the upload key is recoverable via Play Console support; losing
> the app-signing key is not — which is exactly why Play App Signing is
> the recommended choice. The colleague keeps the upload .jks; Google
> keeps the app-signing key.

---

## 4 · Internal testing track (do this first)

Fastest path to verify the AAB installs and runs correctly on a real device.

1. **Test and release → Testing → Internal testing → Create new release**.
2. **Upload the AAB** the colleague produced.
3. **Release name**: auto-fills from versionName (e.g. `0.1.2`).
4. **Release notes** (English – US):
   ```
   First Play Store release. Orthodox liturgical calendar with
   the Pascha cycle, fixed feasts, saint commemorations, Lives
   of the Saints prose (Romanian), and Byzantine typikon fasting
   indicators. Toggle between Revised Julian (New) and Julian
   (Old) calendars. Bilingual: English / Romanian. Fully offline,
   no tracking.
   ```
5. **Testers** → **Create email list** → add your own Gmail + 1–2
   trusted testers. Save the **opt-in link** Play Console gives you and
   open it on the device(s) you'll test on.
6. Click **Review release** → **Start rollout to Internal testing**.
7. Wait ~5–15 minutes for the build to propagate, then install via the
   opt-in link.

**Smoke test on device:**

- [ ] App opens to today's date, today card visible.
- [ ] Tap a day → day detail panel opens with saints + fasting rule.
- [ ] Tap a Pascha-cycle day (e.g. Pascha 2026 = April 12) → moveable
      feast info shows.
- [ ] Toggle **Old Calendar** → dates shift, Julian Pascha shows correctly.
- [ ] Toggle **EN / RO** → saint names switch language.
- [ ] On a day with Lives prose (RO), tap the saint → prose loads.
- [ ] Rotate device → layout reflows without crashing.
- [ ] Background and resume → state persists.
- [ ] Airplane mode → calendar still works (offline core), only the
      lazy-loaded Lives prose fails gracefully.

---

## 5 · Store listing (Main store listing)

**Grow → Store presence → Main store listing**.

Paste from `store-assets/android/listing.md`:

- **App name**: `Orthodox Calendar`
- **Short description**: paste from `listing.md`
- **Full description**: paste from `listing.md` (replace the small-caps
  Unicode section headers with regular bold text if Play Console
  doesn't render them — it does support most Unicode, but verify in
  preview)

**Graphic assets:**

- [ ] **App icon**: upload `store-assets/android/icon-512.png` (512×512, no alpha)
- [ ] **Feature graphic**: upload `store-assets/android/feature-graphic-1024x500.png` (1024×500, no alpha)
- [ ] **Phone screenshots**: upload everything in `store-assets/android/screenshots/phone/`
      (need at least 2, max 8)
- [ ] (Optional) **7-inch tablet screenshots**: skip for v1
- [ ] (Optional) **10-inch tablet screenshots**: skip for v1
- [ ] (Optional) **Promo video**: skip for v1

**Categorization:**

- [ ] **App category**: Books & Reference
- [ ] **Tags**: orthodox, christianity, calendar, liturgical, saints, fasting

**Contact details:**

- [ ] **Email**: `aoprisan@gmail.com`
- [ ] **Website**: `https://aoprisan.github.io/orthodox/`

---

## 6 · App content (the policy questionnaire)

**Policy → App content**. Each section flips from a red dot to green
when answered. None of these are optional for production release.

- [ ] **Privacy policy** → `https://aoprisan.github.io/orthodox/privacy.html`
- [ ] **App access** → All functionality is available without restrictions
- [ ] **Ads** → No, my app does not contain ads
- [ ] **Content rating** → fill in the IARC questionnaire:
    - Violence: none
    - Sexual content: none
    - Profanity: none
    - Controlled substances: none
    - Gambling: none
    - User-generated content: none
    - → expected rating: **Everyone / PEGI 3**
- [ ] **Target audience** → Age 13+ only (do **not** check any
      under-13 boxes — that triggers the Designed for Families program)
- [ ] **News app** → No
- [ ] **COVID-19 contact tracing and status apps** → No
- [ ] **Data safety**:
    - Does your app collect or share user data? → **No**
    - Is all user data encrypted in transit? → not applicable
    - Do users have a way to request data deletion? → not applicable
    - → expected card on listing: "No data collected"
- [ ] **Government apps** → No
- [ ] **Financial features** → None
- [ ] **Health** → None
- [ ] **Actions on Google** → not configured
- [ ] **Advertising ID** → declare *not used* (the app doesn't reference it)

---

## 7 · Pricing and distribution

**Monetize → Pricing**:

- [ ] **Free**

**Reach → Production countries / regions** (you set this when you
promote to the production track, not before):

- [ ] **Available in all countries** — recommended; Orthodox diaspora is
      global, EN/RO covers the largest two slices.

---

## 8 · Promote Internal → Closed → Open → Production

Don't jump straight to Production. Tiered rollout:

1. **Internal testing** (already started in §4) — smoke tested by you.
2. **Closed testing** — invite ~10–50 testers (parish, family,
   colleagues). Required by Google for first-time personal-account
   developers: **12 testers must opt in for at least 14 days** before
   Production is unlocked.
   - *Skip if the developer account is an organisation rather than an
     individual* — closed testing isn't gated for org accounts.
3. **Open testing** (optional) — public beta with an opt-in URL. Useful
   for catching device-specific issues before Production.
4. **Production** — submit for review.

**For each promote step:**

- [ ] **Test and release → Testing → [track] → Promote release**.
- [ ] Pick a release name (auto-fills) and release notes (reuse the v1
      notes above for the first round).
- [ ] **Review release** → **Start rollout**.

**Production review** takes anywhere from a few hours to a few days for
a first submission. Google flags first-release reviews more strictly —
expect at least one round of clarification on the data-safety section
or the policy questionnaire.

---

## 9 · After approval

- [ ] Note the **package name URL**:
      `https://play.google.com/store/apps/details?id=org.orthodox.calendar`
- [ ] Add the Play Store badge to the GitHub Pages site (`public/`) so
      visitors can install from the web build.
- [ ] Consider adding **Orthodox Calendar** to https://github.com/topics
      under `orthodox`, `liturgical-calendar`, etc.
- [ ] For each subsequent release, bump `versionCode` (the
      `scripts/build-android.sh --aab` script does this automatically)
      and upload a fresh signed AAB to Internal → promote.

---

## 10 · Pitfalls to dodge

- **"Sensitive permissions" prompt** during review: shouldn't trigger —
  the app requests no runtime permissions. If it does, audit
  `android/app/src/main/AndroidManifest.xml` for stray `<uses-permission>`
  entries.
- **Account deletion requirement**: only applies if the app has user
  accounts. We don't — leave the section as "not applicable".
- **Data safety mismatch**: if you ever add analytics or telemetry, the
  Data safety form must be updated *before* the new AAB rolls to
  Production, or Google rejects.
- **Target SDK requirements**: as of late 2026, Play requires targetSdk
  ≥ 35 for new apps. We're on `compileSdk = 36 / targetSdk = 36` —
  comfortably ahead. Check `android/variables.gradle` if Google bumps
  the floor again.
- **Privacy policy 404**: Google's crawler checks the URL during
  review. Verify with `curl -I https://aoprisan.github.io/orthodox/privacy.html`
  *immediately* before submitting.
