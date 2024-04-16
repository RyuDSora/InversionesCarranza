import AdminNotificarModel from "../models/AdminNotificarModels.js";
import AdminNotificarModels from "../models/AdminNotificarModels.js";

// Mostrar todas las notificaciones
export const GetAllNotificaciones = async (req, res) => {
    try {
        const notificaciones = await AdminNotificarModels.findAll();
        res.json(notificaciones);
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const GetNotificacionClient = async (req, res) => {


    try {
        const Notificacion = await AdminNotificarModels.findAll({
            where: {
                id_usuario: req.params.id
            }

            
        });
       
        res.json(Notificacion);
        
    } catch (error) {
        res.json({ message: error.message });
    }
};
// Mostrar una notificación por su ID
export const GetNotificacion = async (req, res) => {


    try {
        const Notificacion = await AdminNotificarModels.findAll({
            where: {
                id: req.params.id
            }

            
        });
      
        res.json(Notificacion[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear una nueva notificación
export const SaveNotificacion = async (req, res) => {
   
    try {
        const Notificacion = await AdminNotificarModels.create(req.body);
        res.json({
            message: "Notificación creada exitosamente",
            "id":Notificacion.id
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const UpdateNotificacionRead = async (req, res) => {
    console.log(req.params.id)
    try {
        const resultado = await AdminNotificarModel.update(
            { leido: 1 },
            { where: { id: req.params.id } }
        );
        console.log(resultado[0])
        if (resultado[0] === 1) {
            // Si se actualizó correctamente
            res.json({ 
                message: "Notificación actualizada correctamente" 
            });
        } else {
            // Si no se encontró el registro para actualizar
            res.status(404).json({ 
                error: "No se encontró la notificación para actualizar" 
            });
        }
    } catch (error) {
        // Si ocurrió un error durante la actualización
        console.error("Error al actualizar la notificación:", error);
        res.status(500).json({ 
            error: "Hubo un error al actualizar la notificación" 
        });
    }
};
// Actualizar una notificación por su ID
export const UpdateNotificacion = async (req, res) => {
    try {
        await NotificacionModels.update(req.body, {
            where: { id: req.params.id} 
            });
            res.json({ 
                "message": "Notificación actualizada correctamente" 
            });
    }   catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar una notificación por su ID
export const DeleteNotificacion = async (req, res) => {
    try {
        await NotificacionModel.destroy({ 
            where: { id: req.params.id } 
        });
        res.json({ 
            "message": "Notificación eliminada correctamente" 
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
