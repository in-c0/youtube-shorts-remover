# YSR browser probe — draft, read-only

This is an experimental **unpacked source** probe for `in-c0/youtube-shorts-remover`, not proof that the public Chrome/Edge/Firefox store artifacts match this source or work on every user's device.

## Independent evidence

1. **Controlled fixture:** Playwright's bundled Chromium actually side-loads the MV3 extension source on a synthetic `www.youtube.com` page. It must hide an identifiable Shorts shelf and Playables shelf while leaving an ordinary video visible. This is a genuine browser/extension runtime test, but the page content is controlled by the test, not YouTube.
2. **Live public YouTube search:** The same unpacked extension navigates to an anonymous public YouTube search page. The probe temporarily removes and restores the extension's `html.ysr-active` CSS gate; only shelves that become visible without the extension and hidden again with it count as causally suppressed. Only if at least one such shelf and a visible ordinary video are simultaneously observed can this probe be `PASS`. Unavailable page, consent gate, or no Shorts shelf yields `UNKNOWN`. An observed eligible Shorts shelf still visible with the extension active yields `FAILED`. Shelves already hidden by YouTube are not evidence of successful extension suppression.
3. **Overall:** `PASS` requires *both* fixture and live positive evidence. `UNKNOWN` exits nonzero (2), not green. `FAILED` exits nonzero (1). The workflow saves only counts, statuses, source SHA and limited errors—no screenshots, video, browsing history, cookies or page text.

## Safety and resource limits

- Triggered only for this draft PR and manual dispatch. **No scheduled production claims** until a genuine public-site PASS, repeatability and cost review.
- Pinned `playwright@1.64.1`; Chromium downloaded per fresh runner. This can consume Actions minutes, so it is **not** hourly.
- Does not submit browser extensions, edit Chrome store metadata, collect end-user feedback, upload page content, or change the existing live extension.
- Single read-only search request plus test fixture. No sign-in, CAPTCHA solving, location spoofing, retries or bypasses when YouTube blocks access.
- Evidence is restricted to 7-day GitHub Actions artifact retention. Unknown and failed outcomes need human inspection, not automatic code fixes or release.
- Explicitly outside scope: exact store artifact hash/version verification, user device compatibility, public ratings, and production extension runtime; never conflate these with source-probe success.

## Local reproduction

```bash
npm install --prefix monitor --ignore-scripts --no-audit --no-fund
./monitor/node_modules/.bin/playwright install chromium
node monitor/probe.mjs
```

Official extension test technique: https://playwright.dev/docs/chrome-extensions
