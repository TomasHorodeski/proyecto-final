import {
  listProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
} from '../services/productos.service.js';

export async function list(req, res, next) {
  try {
    const q = req.query.q?.trim() || '';
    const rows = await listProductos(q || undefined);
    res.json({ ok: true, data: rows });
  } catch (e) { next(e); }
}

export async function detail(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await getProducto(id);
    if (!row) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    res.json({ ok: true, data: row });
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const row = await createProducto(req.body || {});
    res.status(201).json({ ok: true, data: row });
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await updateProducto(id, req.body || {});
    res.json({ ok: true, data: row });
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    await deleteProducto(id);
    res.status(204).send();
  } catch (e) { next(e); }
}



