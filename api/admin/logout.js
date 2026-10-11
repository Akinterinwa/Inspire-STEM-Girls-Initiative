import { handleAdminLogout } from '../backend-core.js';

export default async function handler(req, res) {
  return handleAdminLogout(req, res);
}
