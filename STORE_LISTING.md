# Chrome Web Store listing — v1.2

Copy-paste this into the Developer Dashboard for the v1.2 review submission.
Upload artifact: `youtube-shorts-remover-v1.2.zip`

---

## Name
YouTube Shorts & Playables Remover

## Short description (max 132 chars)
Removes Shorts and Playables from YouTube's homepage, search results, and sidebar. Free, lightweight, with a one-click on/off toggle.

## Category
Productivity

## Full description
A minimalist, free extension that hides YouTube Shorts and Playables across the site — no account, no tracking, no bloat.

Features
• Removes Shorts from the homepage recommendations
• Removes the Playables shelf from the homepage
• Hides the Shorts tab and Shorts shelves in search results
• Removes the "Shorts remixing this video" shelf on watch pages
• One-click toggle switch — turn it off to bring Shorts back instantly, no page reload
• Your on/off preference syncs across your signed-in Chrome browsers
• Works automatically on dynamically loaded content

Privacy
This extension does not collect, transmit, or sell any personal data. It runs entirely in your browser and only modifies the YouTube page you're viewing. The single "storage" permission is used solely to remember your toggle setting.

Open source: https://github.com/in-c0/youtube-shorts-remover

## Permission justification (for the review form)
- **storage** — Persists the user's on/off toggle preference (a single boolean) via chrome.storage.sync so the choice is remembered and synced across the user's devices. No other data is stored.

## Single purpose (for the review form)
The extension has one purpose: to hide YouTube Shorts and Playables content from the YouTube interface, with a toggle to enable/disable that behavior.

## What changed in this version (release notes)
v1.2.1 (follow-up patch — submit after v1.2 is approved)
- Fixed Shorts not being hidden in tabs opened in the background (timer was paused while the tab was hidden).

v1.2
- Added a real on/off toggle switch in the toolbar popup (state syncs across devices).
- Fixed the watch-page "Shorts remixing this video" shelf not being removed after a YouTube DOM change.
- Debounced the content observer for better performance.
- Hiding is now reversible (CSS-based) instead of removing DOM nodes.

## Data-use disclosures (Privacy practices tab)
- Does this item collect or use personal/sensitive user data? **No.**
- Certify: does not sell data to third parties; does not use/transfer data for purposes unrelated to the item's single purpose; does not use/transfer data to determine creditworthiness or for lending. **All three: certified true.**
