import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  handleAdminLogin,
  handleAdminLogout,
  handleHealth,
  handleInstagramFeed,
  initFirebase,
} from './api/backend-core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// API routes
app.post(['/api/admin/login', '/admin/login'], (req: Request, res: Response) => handleAdminLogin(req, res));
app.post(['/api/admin/logout', '/admin/logout'], (req: Request, res: Response) => handleAdminLogout(req, res));
app.get(['/health', '/api/health'], (req: Request, res: Response) => handleHealth(req, res));
app.get(['/api/instagram-feed', '/instagram-feed'], (req: Request, res: Response) => handleInstagramFeed(req, res));
app.post(['/api/instagram-feed', '/instagram-feed'], (req: Request, res: Response) => handleInstagramFeed(req, res));

// Setup dev Vite server middlewares or static dist serving
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, 'dist');

if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const isDirectRun = !process.env.VERCEL;

if (isDirectRun) {
  initFirebase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

export default app;
