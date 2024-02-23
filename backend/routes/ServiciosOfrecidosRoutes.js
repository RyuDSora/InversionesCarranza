import express from 'express';
import {
  getServiciosOfrecidos,
  createServiciosOfrecidos,
  updateServiciosOfrecidos,
  deleteServiciosOfrecidos,
}from '../controller/ServiciosOfrecidosController.js';
const router = express.Router();

// Rutas de los Servicios Ofrecidos
router.get('/', getServiciosOfrecidos);
router.post('/', createServiciosOfrecidos);
router.put('/:id', updateServiciosOfrecidos);
router.delete('/:id', deleteServiciosOfrecidos);

export default router;
 