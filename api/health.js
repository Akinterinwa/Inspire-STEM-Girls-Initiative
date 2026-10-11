import { handleHealth } from './backend-core.js';

export default async function handler(req, res) {
  return handleHealth(req, res);
}
