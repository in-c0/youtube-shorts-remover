# YouTube Shorts Remover (+ Playables Remover) Chrome Extension

A lightweight Chrome Extension that removes **Shorts** from Youtube.  
Free. Easy-to-use. Toggle switch for quick disabling. 

---

## 📦 Installation

[Add to Chrome](https://chrome.google.com/webstore/detail/youtube-shorts-playables/dilmoegnonbiadmhbmaehnhogjlkikdp) 

---

## 🧩 Manual Installation (for development)

1. Clone this repo or download as .ZIP
2. Go to `chrome://extensions` in Chrome.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the extension folder.

---

## 🔥 Features

### v1.0

- Removes the **Shorts** in the YouTube homepage and sidebar
- Easy toggle on/off
- Automatically works on dynamically loaded content  

### **v1.1 Update (19/07/2025):**
The extension now also removes:
- Shorts tab and sections from **search results**   
- YouTube **Playables** shelf from the homepage

### **v1.2 Update (23/07/2025):**
- **Real toggle switch** — click the toolbar icon for an on/off switch. Turning it off restores Shorts instantly, no page reload needed (state syncs across your devices).
- **Fixed** the watch-page Shorts shelf ("Shorts remixing this video") not being removed — YouTube changed that element from `<span id="title">` to `<yt-formatted-string id="title">`, so title lookups now match by id regardless of tag.
- **Performance** — the `MutationObserver` is now debounced with `requestAnimationFrame`, so it no longer runs a full sweep on every DOM change.
- Hiding is now CSS-based (reversible) instead of destructively removing DOM nodes.

### **v1.2.1 Update (23/07/2025):**
- **Fixed** Shorts not being hidden in tabs loaded in the background — the sweep used `requestAnimationFrame`, which browsers pause in hidden tabs. It now uses `setTimeout` (which still fires when hidden) and re-sweeps when the tab becomes visible.

---

## 📁 Files

- `manifest.json` — Chrome extension manifest (v3)
- `content.js` — Main script for DOM filtering
- `popup.html` / `popup.js` — Toolbar toggle switch
- `icon.png` — Extension icon (optional)

---

## 🛠️ How It Works

This extension uses a simple content script to:

- Detect Shorts and Playables sections using CSS selectors and text
- Hide them (reversibly, via a CSS class) from the homepage, search results, and video sidebars
- Monitor for dynamic content using a debounced `MutationObserver`
- Store the on/off state with `chrome.storage.sync`

No background scripts or tracking. The only permission requested is `storage`, used solely to remember the toggle state. 100% local.

---

## 🛡️ Privacy

This extension does **not** collect or transmit any data.  
It runs entirely in the browser and only affects the DOM of YouTube pages.

---

## 📜 License

MIT License — Free to use, modify, or distribute.

---

## 🙏 Support

Built with AI. The prompt that generated the logic is included in this repository as `prompt.txt`.

If you like the project, leave a review or star it on GitHub (if public)!  
Feedback and contributions welcome.
