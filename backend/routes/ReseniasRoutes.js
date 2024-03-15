import express from 'express';
import { SaveResenia, DeleteResenia, GetAllResenias, GetResenia, UpdateResenia } from '../controller/ReseniasControllers.js';

const router = express.Router();

router.get('/', GetAllResenias);
router.get('/:id', GetResenia);
router.post('/', SaveResenia);
router.put('/:id', UpdateResenia);
router.delete('/:id', DeleteResenia);


export default router;