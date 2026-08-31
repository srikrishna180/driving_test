import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    // Pinned so the two repos never fight over a port: the booking app owns
    // 5173, this site owns 5174. strictPort makes a collision fail loudly
    // instead of silently moving — a floating port breaks the MARKETING_URL
    // the booking app links back to.
    port: 5174,
    strictPort: true,
  },
});
