import { body, param, query, validationResult } from 'express-validator';

export const productoCreateRules = [
  body('nombre').isString().isLength({ min: 2, max: 120 }),
  body('descripcion').optional().isString(),
  body('precio').isInt({ min: 0 }),
  body('subcategoria_id').isInt({ min: 1 }),
  body('imagen').optional().isString().isLength({ max: 255 }),
  body('destacado').optional().isIn([0,1]),
  body('promo').optional().isIn([0,1]),
];

export const productoUpdateRules = [
  param('id').isInt({ min: 1 }),
  body('nombre').optional().isString().isLength({ min: 2, max: 120 }),
  body('descripcion').optional().isString(),
  body('precio').optional().isInt({ min: 0 }),
  body('subcategoria_id').optional().isInt({ min: 1 }),
  body('imagen').optional().isString().isLength({ max: 255 }),
  body('destacado').optional().isIn([0,1]),
  body('promo').optional().isIn([0,1]),
];

export const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(422).json({ ok: false, errors: errors.array().map(e => ({ field: e.path, msg: e.msg })) });
};
