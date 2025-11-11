import { listCategories } from '../services/categories.service.js';

export async function list(req, res, next) {
  try {
    const data = await listCategories();
    res.json(data);
  } catch (e) { next(e); }
}
