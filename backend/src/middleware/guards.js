import jwt from 'jsonwebtoken';
const { JWT_SECRET = 'supersecreto_dev' } = process.env;

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ ok: false, message: 'Token requerido' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Token inválido' });
  }
}
