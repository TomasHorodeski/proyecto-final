import { pool } from '../config/db.js';

export async function listCategories() {
  const [cats] = await pool.query('SELECT id, nombre FROM categorias ORDER BY id');
  const [subs] = await pool.query('SELECT id, categoria_id, nombre FROM subcategorias ORDER BY id');

  const byCat = subs.reduce((acc, s) => {
    (acc[s.categoria_id] ||= []).push({ id: s.id, nombre: s.nombre });
    return acc;
  }, {});

  return cats.map(c => ({ id: c.id, nombre: c.nombre, sub: byCat[c.id] || [] }));
}
