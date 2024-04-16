import express from 'express';
import {SaveNotificacion, DeleteNotificacion,
        GetAllNotificaciones, GetNotificacion, UpdateNotificacion,
        GetNotificacionClient,
        UpdateNotificacionRead}
        from '../controller/AdminNotificarController.js';

const router = express.Router();

router.get('/', GetAllNotificaciones);
router.get('/getAll/:id', GetNotificacionClient);
router.post('/Read/:id', UpdateNotificacionRead);
router.post('/SaveNotification', SaveNotificacion);
router.post('/', UpdateNotificacion);
router.delete('/:id', DeleteNotificacion);

export default router;