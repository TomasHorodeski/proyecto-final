import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productosRoutes from './productos.routes.js';
import promocionesRoutes from './promociones.routes.js';
import categoriasRoutes from './categorias.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/productos', productosRoutes);
router.use('/promociones', promocionesRoutes);
router.use('/categorias', categoriasRoutes);

router.get('/', (_req, res) => res.json({ ok: true, message: 'API OK' }));

export default router;




