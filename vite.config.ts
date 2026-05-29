import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('react/') || id.includes('react-router')) {
            return 'react-vendor';
          }
          if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('class-variance-authority') || id.includes('tailwind-merge') || id.includes('clsx')) {
            return 'ui-vendor';
          }
          if (id.includes('@sentry') || id.includes('@tanstack') || id.includes('@vercel')) {
            return 'monitoring-vendor';
          }
          return 'vendor';
        },
      },
    },
  },
}));
