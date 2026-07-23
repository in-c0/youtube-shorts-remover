// YouTube Shorts & Playables Remover — content script
//
// Design notes:
// - Elements are *tagged* with a CSS class and hidden via a single stylesheet
//   rule gated on `html.ysr-active`. This makes the on/off toggle instant and
//   fully reversible (no page reload needed) instead of destructively removing
//   nodes from the DOM.
// - Title lookups use `#title` (any tag) rather than `span#title`, because
//   YouTube now renders some titles as <yt-formatted-string id="title"> (e.g.
//   the watch-page "Shorts remixing this video" shelf), which the old
//   span-only selector silently missed.
// - The MutationObserver is debounced with requestAnimationFrame so we don't
//   run every sweep on every one of YouTube's very frequent DOM mutations.

const HIDDEN_CLASS = "ysr-hidden";
let enabled = true;

function tag(el) {
  if (el) el.classList.add(HIDDEN_CLASS);
}

function markShortsAndPlayables() {
  // Shorts entry in the sidebar navigation (Home, Watch pages)
  document.querySelectorAll("a#endpoint[title='Shorts']").forEach(el => {
    tag(el.closest("ytd-guide-entry-renderer"));
  });

  // Shorts shelves identified by an aria-label button (older layout)
  document.querySelectorAll("ytd-rich-shelf-renderer").forEach(shelf => {
    const btn = shelf.querySelector("button[aria-label*='Shorts']");
    if (btn) tag(shelf.closest("div#dismissible") || shelf);
  });

  // Shorts shelves identified by title text (newer layout / missed cases)
  document.querySelectorAll("ytd-rich-shelf-renderer").forEach(shelf => {
    const title = shelf.querySelector("#title");
    if (title && title.textContent.trim() === "Shorts") {
      tag(shelf.closest("div#dismissible") || shelf);
    }
  });

  // Playables section on the homepage
  document.querySelectorAll("ytd-rich-section-renderer").forEach(section => {
    const title = section.querySelector("#title");
    if (title && title.textContent.includes("YouTube Playables")) {
      tag(section);
    }
  });

  // Shorts shelf in the watch-page sidebar.
  // YouTube renders this title as <yt-formatted-string id="title">, so we
  // match by id (#title) rather than by tag, and by substring because the
  // text is now "Shorts remixing this video".
  document.querySelectorAll("ytd-reel-shelf-renderer").forEach(shelf => {
    const title = shelf.querySelector("#title");
    if (title && title.textContent.includes("Shorts")) {
      tag(shelf);
    }
  });

  // Shorts tab in the search-results filter bar
  document.querySelectorAll("button[role='tab']").forEach(tab => {
    const label = tab.querySelector("div");
    if (label && label.textContent.trim() === "Shorts") {
      tag(tab);
    }
  });

  // Shorts shelf in search results
  document.querySelectorAll("grid-shelf-view-model").forEach(shelf => {
    const header = shelf.querySelector("span");
    if (header && header.textContent.trim() === "Shorts") {
      tag(shelf);
    }
  });
}

// Debounced scheduler — coalesces bursts of mutations into a single sweep.
// Uses setTimeout, NOT requestAnimationFrame: rAF is fully paused in hidden /
// background tabs, so a YouTube tab loaded in the background would never get
// swept and Shorts would stay visible. setTimeout still fires when hidden
// (throttled), guaranteeing the sweep runs regardless of tab visibility.
let scheduled = false;
function schedule() {
  if (scheduled || !enabled) return;
  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    if (enabled) markShortsAndPlayables();
  }, 0);
}

// Inject the stylesheet that hides tagged elements while the extension is active.
function injectStyle() {
  if (document.getElementById("ysr-style")) return;
  const style = document.createElement("style");
  style.id = "ysr-style";
  style.textContent = "html.ysr-active ." + HIDDEN_CLASS + "{display:none !important}";
  (document.head || document.documentElement).appendChild(style);
}

function applyEnabled() {
  document.documentElement.classList.toggle("ysr-active", enabled);
  if (enabled) schedule();
}

// Observe dynamic content (debounced).
const observer = new MutationObserver(schedule);
observer.observe(document.documentElement, { childList: true, subtree: true });

// Load the saved on/off state, then react to changes made from the popup.
injectStyle();
chrome.storage.sync.get({ enabled: true }, res => {
  enabled = res.enabled;
  applyEnabled();
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    enabled = changes.enabled.newValue;
    applyEnabled();
  }
});

// Re-sweep when the tab becomes visible, in case mutations arrived while it was
// hidden (background tabs throttle timers, so a sweep may have been deferred).
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) schedule();
});
