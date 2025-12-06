import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-toast'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
}));
