import { Router } from 'express';
import * as ctrl from '../controller/promociones.controller.js';
const router = Router();
router.get('/', ctrl.list);
export default router;

