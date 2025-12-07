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
        // Code splitting for better caching
        manualChunks: (id) => {
          // React and core dependencies
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Radix UI components (only the ones we use)
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          // EmailJS
          if (id.includes('node_modules/@emailjs')) {
            return 'emailjs';
          }
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
}));
