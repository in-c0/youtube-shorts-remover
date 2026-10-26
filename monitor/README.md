# YSR browser probe — draft, read-only

This is an experimental **unpacked source** probe for `in-c0/youtube-shorts-remover`, not proof that the public Chrome/Edge/Firefox store artifacts match this source or work on every user's device.

## Independent evidence

1. **Controlled fixture:** Playwright's bundled Chromium actually side-loads the MV3 extension source on a synthetic `www.youtube.com` page. It must hide an identifiable Shorts shelf and Playables shelf while leaving an ordinary video visible. This is a genuine browser/extension runtime test, but the page content is controlled by the test, not YouTube.
2. **Live public YouTube Shorts search:** The unpacked extension opens an anonymous public YouTube search for Shorts. The probe removes and restores the extension's `html.ysr-active` CSS gate; only shelves that become visible without the extension and hidden again with it count as causally suppressed. At least one positive causal case is required. Unavailable page, consent gate or no observable Shorts shelf yields `UNKNOWN`; a visible eligible Shorts shelf is `FAILED`. YouTube-native hidden shelves do not count as extension success.
3. **Separate live ordinary-video control:** The same unpacked extension opens an anonymous public YouTube search for JavaScript tutorials. Every observed ordinary video that is visible without the extension must remain visible when the extension gate is enabled. This avoids treating a Shorts-only search result with no ordinary videos as a broken control. No observable ordinary video yields `UNKNOWN`; suppression of an eligible ordinary video yields `FAILED`.
4. **Overall:** `PASS` requires *all three* independent surfaces: controlled fixture, causal real Shorts removal, and real ordinary-video preservation. `UNKNOWN` exits nonzero (2), not green. `FAILED` exits nonzero (1). The workflow saves only counts, statuses, source SHA and limited errors—no screenshots, video, browsing history, cookies or page text.

## Safety and resource limits

- Triggered only for this draft PR and manual dispatch. **No scheduled production claims** until a genuine public-site PASS, repeatability and cost review.
- Pinned `playwright@1.64.1`; Chromium downloaded per fresh runner. This can consume Actions minutes, so it is **not** hourly.
- Does not submit browser extensions, edit Chrome store metadata, collect end-user feedback, upload page content, or change the existing live extension.
- Two anonymous read-only YouTube search requests plus the controlled test fixture. No sign-in, CAPTCHA solving, location spoofing, retries or bypasses when YouTube blocks access.
- Evidence is restricted to 7-day GitHub Actions artifact retention. Unknown and failed outcomes need human inspection, not automatic code fixes or release.
- Explicitly outside scope: exact store artifact hash/version verification, user device compatibility, public ratings, and production extension runtime; never conflate these with source-probe success.

## Local reproduction

```bash
npm install --prefix monitor --ignore-scripts --no-audit --no-fund
./monitor/node_modules/.bin/playwright install chromium
node monitor/probe.mjs
```

Official extension test technique: https://playwright.dev/docs/chrome-extensions
