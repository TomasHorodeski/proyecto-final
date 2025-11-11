import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

export async function login(req, res) {
  try {
    let { email, password } = req.body;
    email = String(email || '').trim().toLowerCase();

    const [rows] = await pool.query(
      'SELECT id, nombre, email, password_hash FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ ok: false, message: 'Email o contraseña inválidos' });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(String(password || ''), user.password_hash);
    if (!ok) {
      return res.status(401).json({ ok: false, message: 'Email o contraseña inválidos' });
    }

    const token = jwt.sign(
      { uid: user.id, email: user.email, name: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ ok: true, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: 'Error interno' });
  }
}



