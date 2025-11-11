export function notFound(_req, res, _next) {
  return res.status(404).json({ ok: false, message: 'Recurso no encontrado' });
}

export function errorHandler(err, _req, res, _next) {
  console.error('Error:', err);
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Error interno del servidor';
  res.status(status).json({ ok: false, code, message });
}
