import { listPromos } from '../services/productos.service.js';
export async function list(_req, res, next) {
  try {
    const rows = await listPromos();
    res.json({ ok: true, data: rows });
  } catch (e) { next(e); }
}

