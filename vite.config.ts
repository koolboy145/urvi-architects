import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { asyncCss } from "./vite-plugin-async-css";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // For GitHub Pages, use the repository name as base path
  // Change '/urvi-architects/' to match your repository name
  // Vite automatically sets import.meta.env.BASE_URL to this value
  base: mode === 'production' ? '/urvi-architects/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // Temporarily disabled to debug GitHub Pages white page issue
    // mode === "production" && asyncCss(), // Only apply async CSS in production
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    // Ensure proper asset handling for GitHub Pages
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Simplified code splitting to avoid circular dependencies
        // Let Vite handle most chunking automatically, only split large vendors
        manualChunks: (id) => {
          // Only split React and React DOM into a separate chunk
          // This avoids circular dependency issues
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Don't split other vendors to avoid circular dependencies
          // Vite will handle the rest automatically
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
}));
