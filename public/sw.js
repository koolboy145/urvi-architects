/**
 * Service Worker for long-term caching of static assets
 * Caches versioned assets (JS, CSS) with 1-year expiration
 * This compensates for GitHub Pages' 10-minute default cache TTL
 */

const CACHE_NAME = 'urvi-architects-v1';
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
const CACHE_VERSION = 'v1'; // Increment to force cache refresh

// Install event - cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(() => {
      // Ignore errors - assets will be cached on first request
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache with long expiration
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only cache assets from our domain
  if (url.origin !== location.origin) {
    return; // Don't cache external resources
  }

  // Only cache static assets (JS, CSS, images, fonts)
  const isStaticAsset = 
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot)$/i);

  if (!isStaticAsset) {
    return; // Don't cache HTML or API requests
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Check if cache is still valid (1 year)
        const cacheDate = cachedResponse.headers.get('sw-cache-date');
        if (cacheDate) {
          const cacheTime = parseInt(cacheDate, 10);
          const now = Date.now();
          if (now - cacheTime < CACHE_DURATION) {
            // Cache is still valid
            return cachedResponse;
          }
        } else {
          // No cache date, assume valid (for backwards compatibility)
          return cachedResponse;
        }
      }

      // Fetch from network and cache
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Add cache date header
        const headers = new Headers(responseToCache.headers);
        headers.set('sw-cache-date', Date.now().toString());

        // Create new response with cache date
        const cachedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers,
        });

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, cachedResponse);
        });

        return response;
      }).catch(() => {
        // If fetch fails and we have a cached version, return it even if expired
        if (cachedResponse) {
          return cachedResponse;
        }
      });
    })
  );
});

