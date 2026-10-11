import { handleInstagramFeed } from './backend-core.js';

export default async function handler(req, res) {
  return handleInstagramFeed(req, res);
}
