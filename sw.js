const urlsToCache = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png'
];

self.addEventListener('install', () => {
  console.log("service worker installed");
});