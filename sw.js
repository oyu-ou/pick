const urlsToCache = [
  '/picker/',
  '/picker/index.html',
  '/picker/style.css',
  '/picker/app.js',
  '/picker/manifest.json',
  '/picker/web-app-manifest-192x192.png',
  '/picker/web-app-manifest-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url).then(resp => {
            if (!resp.ok) throw new Error(`${url} failed`);
            return cache.put(url, resp);
          }).catch(err => console.warn(err))
        )
      );
    })
  );
});