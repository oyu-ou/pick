const CACHE = "picker-cache-v1";
const offlineFallbackPage = "offline.html";

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll([
        "./index.html",
        "./style.css",
        "./app.js",
        "./web-app-manifest-192x192.png",
        "./web-app-manifest-512x512.png",
        offlineFallbackPage
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch (err) {
      const cache = await caches.open(CACHE);
      return await cache.match(event.request) || await cache.match(offlineFallbackPage);
    }
  })());
});