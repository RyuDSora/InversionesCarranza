import express from 'express';
import { GetAllProjHasImg,GuardarImgXProj,DeleteProyecthasImagen} from '../controller/ProjectHasImagenControllers.js';

const router = express.Router();


router.get('/', GetAllProjHasImg);
router.post('/', GuardarImgXProj);
//router.put('/:id', UpdateImagen);
router.delete('/:id', DeleteProyecthasImagen);


export default router;