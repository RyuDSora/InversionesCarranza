import express from 'express';
import { GetImage, DeleteImage } from '../controller/ImagenesControllers.js';

const router = express.Router();

router.get('/:id', GetImage);
router.delete('/:id', DeleteImage);


export default router;



