import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://www.danbadarom.co.il",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          Accept: "text/html",
          Origin: "https://www.danbadarom.co.il", // Add this header
          Referer: "https://www.danbadarom.co.il", // Add this header
        },
      },
    },
  },
});
