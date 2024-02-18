import express from 'express';
import { createProyectoRealizado, deleteProyectoRealizado, getAllProyectosRealizados, getProyectoRealizado, updateProyectoRealizado } from '../controller/ProyectoRealizadoController.js';

const router = express.Router();

//rutas de los Proyectos Reealizados//
router.get('/', getAllProyectosRealizados); 
router.get('/:id', getProyectoRealizado); 
router.post('/', createProyectoRealizado); 
router.put('/:id', updateProyectoRealizado); 
router.delete('/:id', deleteProyectoRealizado); 

export default router;