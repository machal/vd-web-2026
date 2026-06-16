/*
 * Legacy AMP service worker retired (2026).
 * Clears old CACHE_FIRST caches and serves everything from the network.
 */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
