import express from 'express';
import { SaveCalification, DeleteCalification, GetAllCalifications, GetCalification, UpdateCalification } from '../controller/CalificacionesControllers.js';

const router = express.Router();

//Routas del Usuario//
router.get('/', GetAllCalifications);
router.get('/:id', GetCalification);
router.post('/', SaveCalification);
router.put('/:id', UpdateCalification);
router.delete('/:id', DeleteCalification);


export default router;