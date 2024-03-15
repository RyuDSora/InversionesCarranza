import express from 'express';
import { SaveSolicitud, DeleteSolicitud, GetAllSolicitudes, GetSolicitud, UpdateSolicitud } from '../controller/SolicitudesControllers.js';

const router = express.Router();

router.get('/', GetAllSolicitudes);
router.get('/:id', GetSolicitud);
router.post('/', SaveSolicitud);
router.put('/:id', UpdateSolicitud);
router.delete('/:id', DeleteSolicitud);


export default router;