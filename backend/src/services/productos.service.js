import { pool } from '../config/db.js';

const COLUMNS = 'id, subcategoria_id, nombre, descripcion, precio, imagen, destacado, promo';

export async function listProductos(q) {
  if (q) {
    const like = `%${q}%`;
    const [rows] = await pool.query(
      `SELECT ${COLUMNS} FROM productos
       WHERE nombre LIKE ? OR descripcion LIKE ?
       ORDER BY id DESC`,
      [like, like]
    );
    return rows;
  }
  const [rows] = await pool.query(`SELECT ${COLUMNS} FROM productos ORDER BY id DESC`);
  return rows;
}

export async function listPromos() {
  const [rows] = await pool.query(
    `SELECT ${COLUMNS} FROM productos WHERE promo = 1 ORDER BY id DESC`
  );
  return rows;
}

export async function getProducto(id) {
  const [rows] = await pool.query(
    `SELECT ${COLUMNS} FROM productos WHERE id = ? LIMIT 1`, [id]
  );
  return rows[0] || null;
}

export async function createProducto(data) {
  const payload = {
    subcategoria_id: Number(data.subcategoria_id),
    nombre: String(data.nombre ?? ''),
    descripcion: data.descripcion ?? '',
    precio: Number(data.precio ?? 0),
    imagen: data.imagen ?? '',
    destacado: data.destacado ?? 0,
    promo: data.promo ?? 0,
  };
  const [res] = await pool.query('INSERT INTO productos SET ?', [payload]);
  return await getProducto(res.insertId);
}

export async function updateProducto(id, data) {
  const allowed = ['subcategoria_id', 'nombre', 'descripcion', 'precio', 'imagen', 'destacado', 'promo'];
  const payload = {};
  for (const k of allowed) if (data[k] !== undefined) payload[k] = data[k];
  if (!Object.keys(payload).length) return await getProducto(id);
  await pool.query('UPDATE productos SET ? WHERE id = ?', [payload, id]);
  return await getProducto(id);
}

export async function deleteProducto(id) {
  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
}
