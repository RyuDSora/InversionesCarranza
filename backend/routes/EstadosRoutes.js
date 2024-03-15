import express from 'express';
import { SaveState, DeleteState, GetAllState, GetState, UpdateState } from '../controller/EstadosControllers.js';

const router = express.Router();


router.get('/', GetAllState);
router.get('/:id', GetState);
router.post('/', SaveState);
router.put('/:id', UpdateState);
router.delete('/:id', DeleteState);


export default router;