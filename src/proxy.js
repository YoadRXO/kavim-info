import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();

// Allow CORS
app.use(cors());

// Proxy middleware
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://www.danbadarom.co.il",
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Host", "www.danbadarom.co.il");
      proxyReq.setHeader("Origin", "https://www.danbadarom.co.il");
      proxyReq.setHeader("Referer", "https://www.danbadarom.co.il");
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // Allow CORS
      proxyRes.headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
    },
  })
);

app.listen(5000, () => console.log("Proxy running on port 5000"));
