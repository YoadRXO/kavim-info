import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const date = req.query.date; // Get the date parameter from the query string

    if (!date) {
      res.status(400).json({ error: 'Date parameter is required' });
      return;
    }

    console.log('Proxying request for date:', date);

    // Create a new proxy middleware with the dynamic target
    const proxy = createProxyMiddleware({
      target: `https://www.danbadarom.co.il/`, // Base URL without query parameters
      changeOrigin: true,
      secure: true,
      pathRewrite: (path, req: Request) => {
        console.log('req :', req.params);
        req.query = {};
        req.params = {};
        // Only the date path will be forwarded
        const targetPath = `/${date}/`; // Create the target path using the date
        console.log('Rewriting path to:', targetPath);
        return targetPath; // Rewrite the path to only include the date
      },

      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy failed' });
      },
      onProxyRes: (proxyRes, req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
      },
    } as any); // Cast to `any` to bypass the TypeScript type error
    // Forward the request to the dynamically created proxy middleware
    proxy(req, res, next);
  }
}
