import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      "/api": {
        target: "https://kavim-info-1.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\api/, ""),
      },
    },
  },
});
