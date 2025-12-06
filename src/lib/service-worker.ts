/**
 * Service Worker registration for long-term asset caching
 * Registers a service worker that caches static assets for 1 year
 * This compensates for GitHub Pages' default 10-minute cache TTL
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    // Wait for page load to avoid blocking initial render
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }
  }
}

function registerSW() {
  const basePath = import.meta.env.BASE_URL || '/';
  const swUrl = `${basePath}sw.js`;
  
  navigator.serviceWorker
    .register(swUrl, {
      scope: basePath, // Service worker scope matches base path
    })
    .then((registration) => {
      // Service worker registered successfully
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available - will activate on next page load
              console.log('New service worker available');
            }
          });
        }
      });
    })
    .catch((error) => {
      // Silently fail - service worker is optional for functionality
      // Only log in development
      if (import.meta.env.DEV) {
        console.warn('Service Worker registration failed:', error);
      }
    });
}
