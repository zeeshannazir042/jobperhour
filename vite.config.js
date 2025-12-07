import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/jobperhour/",            // Base public path
  server: {
    port: 5173,            // Frontend dev port
    strictPort: true,      // Fail if port 5173 is busy
    open: true,            // Open browser on dev start
    proxy: {
      "/api": {
        target: "http://localhost:3000", // NestJS backend
        changeOrigin: true,
        secure: false,
        // rewrite not needed if frontend and backend use same /api prefix
      },
    },
  },
  build: {
    outDir: "dist",        // Build output folder
  },
});
