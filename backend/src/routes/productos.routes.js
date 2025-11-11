import { Router } from 'express';
import * as ctrl from '../controller/productos.controller.js';
import { requireAuth } from '../middleware/guards.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);

router.post('/', requireAuth, ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;





