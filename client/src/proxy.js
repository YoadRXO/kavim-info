import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();

// Allow CORS (for requests to the proxy)
app.use(
  cors({
    origin: "*", // Adjust if needed
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Proxy middleware with dynamic date support
app.use(
  "/api/:date",
  createProxyMiddleware({
    target: "https://www.danbadarom.co.il",
    changeOrigin: true,
    secure: true,
    pathRewrite: (path, req) => {
      const date = req.params.date; // Extract date from request
      return `/${date}/`; // Forward request to the correct URL
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).json({ error: "Proxy failed" });
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    },
  })
);

app.listen(5000, () => console.log("Proxy running on port 5000"));
