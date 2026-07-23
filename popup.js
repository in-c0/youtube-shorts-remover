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
