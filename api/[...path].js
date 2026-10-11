import {
  handleAdminLogin,
  handleAdminLogout,
  handleHealth,
  handleInstagramFeed,
} from './backend-core.js';

export default async function handler(req, res) {
  const url = (req.url || '').split('?')[0];

  if (url.includes('/admin/login')) {
    return handleAdminLogin(req, res);
  }
  if (url.includes('/admin/logout')) {
    return handleAdminLogout(req, res);
  }
  if (url.includes('/health')) {
    return handleHealth(req, res);
  }
  if (url.includes('/instagram-feed')) {
    return handleInstagramFeed(req, res);
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ error: `Route not found: ${url}` }));
}
