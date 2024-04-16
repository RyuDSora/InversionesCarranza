import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Ruta para crear una nueva notificación
router.post('/crear-notificacion', async (req, res) => {
    const { id_usuario, mensaje, leido } = req.body;

    try {
        const nuevaNotificacion = await db.Notificacion.create({
            id_usuario: id_usuario,
            mensaje: mensaje,
            leido: leido
        });

        res.status(201).json(nuevaNotificacion);
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
});

export default router;
