// Popup toggle — reads/writes the shared on/off state in chrome.storage.sync.
// The content script listens for changes and shows/hides Shorts instantly.

const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled
    ? "Shorts are hidden."
    : "Shorts are visible.";
}

chrome.storage.sync.get({ enabled: true }, res => {
  render(res.enabled);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  render(enabled);
});

// Opt-in feedback stays in the extension popup, never in the YouTube page.
// After the reviewed cloud intake is online, configure its HTTPS /feedback URL.
// Until then GitHub Issues is a functional, account-required fallback.
const FEEDBACK_FORM_URL = "";
const feedbackLink = document.getElementById("feedback-link");
const feedbackHint = document.getElementById("feedback-hint");
const feedbackHintLink = document.getElementById("feedback-hint-link");
const extensionVersion = chrome.runtime.getManifest().version;

function feedbackUrl() {
  if (FEEDBACK_FORM_URL.startsWith("https://")) {
    const url = new URL(FEEDBACK_FORM_URL);
    url.searchParams.set("product", "ysr");
    url.searchParams.set("version", extensionVersion);
    return url.href;
  }
  const url = new URL("https://github.com/in-c0/youtube-shorts-remover/issues/new");
  url.searchParams.set("title", "Shorts Remover feedback (" + extensionVersion + ")");
  url.searchParams.set("body", "Extension version: " + extensionVersion + "\n\nWhat happened?\n");
  return url.href;
}

const reportUrl = feedbackUrl();
feedbackLink.href = reportUrl;
feedbackHintLink.href = reportUrl;

// Turning it off can indicate a problem, but don't ask repeatedly.
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    feedbackHint.hidden = true;
    return;
  }
  chrome.storage.sync.get({ feedbackNudgedVersion: "" }, result => {
    if (result.feedbackNudgedVersion !== extensionVersion) {
      feedbackHint.hidden = false;
      chrome.storage.sync.set({ feedbackNudgedVersion: extensionVersion });
    }
  });
});
