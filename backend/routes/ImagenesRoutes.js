import express from 'express';
import { GetAllImagenes,GetImagenes,GuardarImagen,UpdateImagen,DeleteImagen } from '../controller/ImagenesControllers.js';

const router = express.Router();

//Routas del Usuario//
router.get('/', GetAllImagenes);
router.get('/:id', GetImagenes);
router.post('/', GuardarImagen);
router.put('/:id', UpdateImagen);
router.delete('/:id', DeleteImagen);


export default router;