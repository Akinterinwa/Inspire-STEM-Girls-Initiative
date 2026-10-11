import { handleAdminLogin } from '../backend-core.js';

export default async function handler(req, res) {
  return handleAdminLogin(req, res);
}
