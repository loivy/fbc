import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Tailwind v4 ships a first-party Vite plugin; do NOT also register the
  // `tailwindcss` PostCSS plugin, which is the v3-era setup.
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
