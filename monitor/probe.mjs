// Read-only: this tests an unpacked SOURCE extension, not the store artifact.
// No screenshots, browsing history, credentials, or user page contents are collected.
import { chromium } from "playwright";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const extensionRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureURL = "https://www.youtube.com/__cvf_ysr_fixture__";
const liveURL = "https://www.youtube.com/results?search_query=shorts";
const fixtureHTML = [
  "<!doctype html><html><head><meta charset='utf-8'><title>Controlled YSR fixture</title>",
  "<style>grid-shelf-view-model,ytd-horizontal-card-list-renderer,ytd-video-renderer{display:block}</style>",
  "</head><body>",
  "<grid-shelf-view-model id='shorts'><a href='/shorts/fixture'>Shorts clip</a></grid-shelf-view-model>",
  "<ytd-horizontal-card-list-renderer id='playables'><a href='/playables'>A game</a></ytd-horizontal-card-list-renderer>",
  "<ytd-video-renderer id='normal'><a href='/watch?v=fixture'>Ordinary video</a></ytd-video-renderer>",
  "</body></html>"
].join("");

function statusWhen(found, hidden, normal, active) {
  if (!active) return { state: "FAILED", reason: "CONTENT_SCRIPT_NOT_ACTIVE" };
  if (found === 0) return { state: "UNKNOWN", reason: "NO_POSITIVE_SHORTS_SHELF_SIGNAL" };
  if (normal === 0) return { state: "UNKNOWN", reason: "NO_NORMAL_VIDEO_NEGATIVE_CONTROL" };
  if (hidden !== found) return { state: "FAILED", reason: "SHORTS_SHELF_VISIBLE" };
  return { state: "PASS", reason: "OBSERVED_SHORTS_SHELVES_HIDDEN_WITH_NEGATIVE_CONTROL" };
}

async function runFixture(context) {
  await context.route(fixtureURL, route => route.fulfill({
    status: 200,
    contentType: "text/html",
    body: fixtureHTML
  }));
  const page = await context.newPage();
  try {
    await page.goto(fixtureURL, { waitUntil: "load", timeout: 15000 });
    await page.waitForFunction(() => document.documentElement.classList.contains("ysr-active"), null, { timeout: 10000 });
    await page.waitForFunction(() =>
      document.querySelector("#shorts")?.classList.contains("ysr-hidden") &&
      document.querySelector("#playables")?.classList.contains("ysr-hidden"),
      null, { timeout: 10000 });
    const result = await page.evaluate(() => {
      const hide = id => getComputedStyle(document.getElementById(id)).display === "none";
      return {
        active: document.documentElement.classList.contains("ysr-active"),
        shortsHidden: hide("shorts"),
        playablesHidden: hide("playables"),
        ordinaryVideoVisible: !hide("normal")
      };
    });
    return { surface: "CONTROLLED_BROWSER_FIXTURE", state:
      result.active && result.shortsHidden && result.playablesHidden && result.ordinaryVideoVisible ? "PASS" : "FAILED",
      reason: "CHROMIUM_UNPACKED_EXTENSION_FIXTURE", controls: result };
  } catch (error) {
    return { surface: "CONTROLLED_BROWSER_FIXTURE", state: "FAILED",
      reason: "FIXTURE_TEST_ERROR", detail: String(error.message).slice(0, 180) };
  } finally { await page.close(); }
}

async function runLive(context) {
  const page = await context.newPage();
  try {
    const response = await page.goto(liveURL, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (!response || response.status() >= 400) {
      return { surface: "LIVE_YOUTUBE_SEARCH", state: "UNKNOWN",
        reason: "YOUTUBE_HTTP_UNAVAILABLE", http_status: response?.status() ?? null };
    }
    // The public anonymous page varies by region, consent and YouTube experiments.
    await page.waitForTimeout(8000);
    const data = await page.evaluate(() => {
      const active = document.documentElement.classList.contains("ysr-active");
      const shelves = Array.from(document.querySelectorAll(
        "grid-shelf-view-model, ytd-reel-shelf-renderer, ytd-rich-shelf-renderer"
      )).filter(el => el.querySelector("a[href^='/shorts/'],a[href^='https://www.youtube.com/shorts/']"));
      const hidden = shelves.filter(el => getComputedStyle(el).display === "none").length;
      const normals = Array.from(document.querySelectorAll(
        "ytd-video-renderer, ytd-rich-grid-media"
      )).filter(el => el.querySelector("a[href^='/watch'],a[href^='https://www.youtube.com/watch']") &&
                     getComputedStyle(el).display !== "none").length;
      return { active, renderedYouTube: !!document.querySelector("ytd-app"),
        shortsShelves: shelves.length, hiddenShortsShelves: hidden, visibleNormalVideos: normals };
    });
    if (!data.renderedYouTube) {
      return { surface: "LIVE_YOUTUBE_SEARCH", state: "UNKNOWN",
        reason: "YOUTUBE_PAGE_OR_CONSENT_NOT_RENDERED", counts: data };
    }
    const verdict = statusWhen(data.shortsShelves, data.hiddenShortsShelves,
      data.visibleNormalVideos, data.active);
    return { surface: "LIVE_YOUTUBE_SEARCH", ...verdict, counts: data };
  } catch (error) {
    return { surface: "LIVE_YOUTUBE_SEARCH", state: "UNKNOWN",
      reason: "LIVE_BROWSER_OR_NETWORK_INCONCLUSIVE", detail: String(error.message).slice(0, 180) };
  } finally { await page.close(); }
}

async function main() {
  const profile = await mkdtemp(join(tmpdir(), "cvf-ysr-probe-"));
  const startedAt = new Date().toISOString();
  let context, results = [];
  try {
    context = await chromium.launchPersistentContext(profile, {
      channel: "chromium",
      headless: true,
      args: ["--disable-extensions-except=" + extensionRoot, "--load-extension=" + extensionRoot],
      viewport: { width: 1440, height: 900 },
      locale: "en-US"
    });
    results.push(await runFixture(context));
    results.push(await runLive(context));
  } catch (error) {
    results.push({ surface: "BROWSER_BOOT", state: "UNKNOWN",
      reason: "CHROMIUM_COULD_NOT_LAUNCH", detail: String(error.message).slice(0, 180) });
  } finally {
    if (context) await context.close();
    await rm(profile, { recursive: true, force: true });
  }
  const fixture = results.find(r => r.surface === "CONTROLLED_BROWSER_FIXTURE");
  const live = results.find(r => r.surface === "LIVE_YOUTUBE_SEARCH");
  const overall = results.some(r => r.state === "FAILED") ? "FAILED"
    : fixture?.state === "PASS" && live?.state === "PASS" ? "PASS" : "UNKNOWN";
  const evidence = { schema_version: 1, product: "ysr", source: "UNPACKED_SOURCE_NOT_STORE",
    generated_at: new Date().toISOString(), started_at: startedAt,
    source_sha: process.env.CVF_SOURCE_SHA || process.env.GITHUB_SHA || "LOCAL", overall, results };
  const outdir = join(dirname(fileURLToPath(import.meta.url)), "evidence");
  await mkdir(outdir, { recursive: true });
  await writeFile(join(outdir, "latest-probe.json"), JSON.stringify(evidence, null, 2) + "\n");
  console.log(JSON.stringify(evidence, null, 2));
  // An inconclusive run is NOT a green health verdict.
  if (overall !== "PASS") process.exitCode = overall === "FAILED" ? 1 : 2;
}
await main();
