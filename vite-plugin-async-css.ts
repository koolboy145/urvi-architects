/**
 * Vite plugin to make CSS load asynchronously to prevent render blocking
 * Uses the media="print" trick: load CSS with media="print", then switch to "all" once loaded
 * Also adds preload hint for faster CSS loading
 */
import type { Plugin } from 'vite';

export function asyncCss(): Plugin {
  return {
    name: 'async-css',
    transformIndexHtml: {
      enforce: 'post', // Run after Vite's default HTML transformation
      transform(html, ctx) {
        // Find CSS link tags injected by Vite (they have href starting with /assets/ or ./assets/)
        return html.replace(
          /<link([^>]*rel=["']stylesheet["'][^>]*href=["']([^"']*assets\/[^"']*\.css)["'][^>]*)>/g,
          (match, attributes, href) => {
            // Skip if already has async loading attributes
            if (match.includes('media=') || match.includes('onload=')) {
              return match;
            }
            
            // Extract crossorigin if present
            const crossorigin = attributes.includes('crossorigin') 
              ? attributes.match(/crossorigin=["']?([^"'\s>]+)["']?/)?.[0] || 'crossorigin'
              : '';
            
            // Add preload hint for faster CSS loading (non-blocking)
            const preloadLink = `<link rel="preload" href="${href}" as="style" ${crossorigin}>`;
            
            // Make CSS load asynchronously using media="print" trick
            // This prevents render blocking while still loading the CSS
            const asyncMatch = match.replace(
              /(<link[^>]*)(>)/,
              '$1 media="print" onload="this.media=\'all\'"$2'
            );
            
            // Add noscript fallback for browsers without JavaScript
            return `${preloadLink}${asyncMatch}<noscript>${match}</noscript>`;
          }
        );
      },
    },
  };
}

