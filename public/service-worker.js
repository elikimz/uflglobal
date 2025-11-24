


// Dynamic cache name with versioning (avoids conflicts)
const CACHE_NAME = "omnitrust-cache-v2";
const CORE_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/index.html",
  "/src/main.tsx", // Critical JS entry point
];

// **Install**: Cache core assets + skip waiting
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force immediate activation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch((err) => console.error("Cache failed:", err))
  );
});

// **Activate**: Clean old caches + claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim(); // Take control immediately
});

// **Fetch**: Stale-while-revalidate (fast + fresh)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // Skip non-GET requests

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached response immediately
      const fetchPromise = fetch(event.request)
        .then((response) => {
          // Cache new response if static asset
          if (
            event.request.url.includes("/assets/") ||
            CORE_ASSETS.includes(new URL(event.request.url).pathname)
          ) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => cached); // Fallback to cache on network failure

      return cached || fetchPromise; // Serve cached or fetch
    })
  );
});

// **Message**: Force update on user action
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
