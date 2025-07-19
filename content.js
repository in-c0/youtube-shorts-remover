function removeShortsAndPlayables() {
  // Remove Shorts from Sidebar Navigation (Home, Watch pages)
  document.querySelectorAll("a#endpoint[title='Shorts']").forEach(el => {
    const parent = el.closest("ytd-guide-entry-renderer");
    if (parent) parent.remove();
  });

  // Remove Shorts shelves based on aria-label buttons (old logic)
  document.querySelectorAll("ytd-rich-shelf-renderer").forEach(shelf => {
    const btn = shelf.querySelector("button[aria-label*='Shorts']");
    if (btn) {
      const dismissible = shelf.closest("div#dismissible");
      if (dismissible) dismissible.remove();
    }
  });

  // Remove Shorts shelves based on title text (fixes missed cases)
  document.querySelectorAll("ytd-rich-shelf-renderer").forEach(shelf => {
    const title = shelf.querySelector("span#title");
    if (title && title.textContent.trim() === "Shorts") {
      const dismissible = shelf.closest("div#dismissible");
      if (dismissible) {
        dismissible.remove();
      } else {
        shelf.remove();
      }
    }
  });

  // Remove Playables section
  document.querySelectorAll("ytd-rich-section-renderer").forEach(section => {
    const title = section.querySelector("span#title");
    if (title && title.textContent.includes("YouTube Playables")) {
      section.remove();
    }
  });

  // Remove Shorts from watch page sidebar
  document.querySelectorAll("ytd-reel-shelf-renderer").forEach(shelf => {
    const title = shelf.querySelector("span#title");
    if (title && title.textContent.includes("Shorts")) {
      shelf.remove();
    }
  });

  // Remove Shorts tab in search results
  document.querySelectorAll("button[role='tab']").forEach(tab => {
    const label = tab.querySelector("div");
    if (label && label.textContent.trim() === "Shorts") {
      tab.remove();
    }
  });

  // Remove Shorts shelf in search results
  document.querySelectorAll("grid-shelf-view-model").forEach(shelf => {
    const header = shelf.querySelector("span");
    if (header && header.textContent.trim() === "Shorts") {
      shelf.remove();
    }
  });
}

// Observe dynamic content
const observer = new MutationObserver(() => removeShortsAndPlayables());
observer.observe(document.body, { childList: true, subtree: true });

// Initial execution
removeShortsAndPlayables();
