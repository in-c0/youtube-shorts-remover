import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../popup.js", import.meta.url), "utf-8");

function harness() {
  const callbacks = new Map();
  const elements = Object.fromEntries(
    ["toggle", "status", "feedback-link", "feedback-hint", "feedback-hint-link"]
      .map(key => [key, { checked: true, hidden: true, href: "", textContent: "",
        addEventListener(type, cb) { callbacks.set(key + ":" + type, (callbacks.get(key + ":" + type) || []).concat(cb)); }
      }])
  );
  const state = { enabled: true, feedbackNudgedVersion: "" };
  const chrome = {
    runtime: { getManifest: () => ({ version: "1.2.3" }) },
    storage: { sync: {
      get(defaults, cb) { cb({ ...defaults, ...state }); },
      set(values) { Object.assign(state, values); }
    } }
  };
  runInNewContext(source, { document: { getElementById: key => elements[key] }, chrome, URL });
  return { elements, state, change() { for (const cb of callbacks.get("toggle:change") || []) cb(); } };
}

test("default feedback is a link, never an overlay on YouTube", () => {
  const h = harness();
  assert.match(h.elements["feedback-link"].href, /^https:\/\/github.com\/in-c0\/youtube-shorts-remover\/issues\/new/);
  assert.equal(h.elements["feedback-hint"].hidden, true);
});

test("turning the extension off asks once per version", () => {
  const h = harness();
  h.elements.toggle.checked = false;
  h.change();
  assert.equal(h.state.enabled, false);
  assert.equal(h.elements["feedback-hint"].hidden, false);
  assert.equal(h.state.feedbackNudgedVersion, "1.2.3");
  h.elements.toggle.checked = true;
  h.change();
  assert.equal(h.elements["feedback-hint"].hidden, true);
  h.elements.toggle.checked = false;
  h.change();
  assert.equal(h.elements["feedback-hint"].hidden, true);
});
