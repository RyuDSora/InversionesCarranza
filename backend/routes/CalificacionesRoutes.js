import express from 'express';
import { SaveCalification, DeleteCalification, GetAllCalifications, GetPromedioCalification, UpdateCalification } from '../controller/CalificacionesControllers.js';

const router = express.Router();

router.get('/', GetAllCalifications);
router.get('/:id', GetPromedioCalification);
router.post('/', SaveCalification);
router.put('/:id', UpdateCalification);
router.delete('/:id', DeleteCalification);


export default router;