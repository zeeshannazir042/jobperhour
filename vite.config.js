import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",            // Base public path
  server: {
    host: true,         // 👈 expose frontend to local network (mobile)
    port: 5173,         // Frontend dev port
    strictPort: true,   // Fail if port 5173 is busy
    open: true,         // Open browser on dev start
    // ✅ Remove proxy entirely for mobile/dev
    // Mobile cannot use Vite proxy; use full API URL instead
  },
  build: {
    outDir: "dist",     // Build output folder
  },
});
