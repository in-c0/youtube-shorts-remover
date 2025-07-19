# YouTube Shorts Remover (+ Playables Remover) Chrome Extension

A lightweight Chrome Extension that removes **Shorts** from Youtube.  
Free. Easy-to-use. Toggle switch for quick enabling/disabling of all Shorts from Youtube recommendations. 

---

## 🔥 Features

✅ Removes the **Shorts** buttons in the YouTube homepage, sidebar and search results
✅ Hides **Shorts shelves** from the homepage
✅ Automatically works on dynamically loaded content

**v1.1 Update (19/07/2025):**
✅ Also removes:
- Shorts tab and sections from **search results**   
- YouTube **Playables** shelf from the homepage

---

## 📦 Installation

**Chrome Web Store**:  
[👉 Install from Chrome Web Store](https://chrome.google.com/webstore/detail/youtube-shorts-playables/dilmoegnonbiadmhbmaehnhogjlkikdp)

---

## 🧩 Manual Installation (for development)

1. Clone this repo or download the source.
2. Go to `chrome://extensions` in Chrome.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the extension folder.


---

## 📁 Files

- `manifest.json` — Chrome extension manifest (v3)
- `content.js` — Main script for DOM filtering
- `icon.png` — Extension icon (optional)

---

## 🛠️ How It Works

This extension uses a simple content script to:

- Detect Shorts and Playables sections using CSS selectors and text
- Remove them from the homepage, search results, and video sidebars
- Monitor for dynamic content using a `MutationObserver`

No background scripts/permissions/tracking. 100% local.

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
