const _version = "v1";
const cacheName = "v1";
const cacheList = ["/kubus.webmanifest"];

function log(msg) {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  log("INSTALL");
  caches.open(cacheName).then((cache) => {
    log("Caching app shell");
    return cache.addAll(cacheList);
  });
});

self.addEventListener("activate", (event) => {
  log("ACTIVATE");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            log("Remove old cache " + key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  log("FETCH " + event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
