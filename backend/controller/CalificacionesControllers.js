import { Sequelize,where,Op } from "sequelize";
import CalificacionModels from "../models/CalificacionModels.js";

export const GetAllCalifications = async (req, res) => {
    try {
        const Calificaciones = await CalificacionModels.findAll();
        res.json(Calificaciones);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//devuelve el promedio de la calificaciones para un proyecto similar a:  
//  SELECT AVG(calificacion) as promedio_calificacion 
//  FROM calificaciones 
//  WHERE idProyecto = req.params.id 

export const GetPromedioCalification = async (req, res) => {
    try {
        const promedio = await CalificacionModels.findOne({
            attributes: [[Sequelize.fn('AVG', Sequelize.col('calificacion')), 'promedio_calificacion']],
            where: {idProyecto: req.params.id}
        });
        if (promedio === null) {res.json({ promedio_calificacion: 0 });} 
        else{if (promedio.promedio_calificacion === null) {res.json({ promedio_calificacion: 0 }); // Promedio 0 si no hay calificaciones    
            }else{res.json(promedio)};
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const SaveCalification = async (req, res) => {
    try {
        const Calification = await CalificacionModels.create(req.body);
        res.json({
            "message": "¡Ha sido registrada correctamente!",
            "id":Calification.id
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const UpdateCalification = async (req, res) => {
    try {
        await CalificacionModels.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const DeleteCalification = async (req, res) => {
    try {
        await CalificacionModels.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};