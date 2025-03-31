import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'https://www.danbadarom.co.il',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path, req: Request) => {
      const date = req.params.date; // Extract date from the request
      return `/${date}/`; // Forward request to the correct URL
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
  } as any);

  use(req: Request, res: Response, next: (error?: any) => void) {
    this.proxy(req, res, next);
  }
}
