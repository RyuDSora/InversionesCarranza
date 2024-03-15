import CalificacionModels from "../models/CalificacionModels.js";

export const GetAllCalifications = async (req, res) => {
    try {
        const Calificaciones = await CalificacionModels.findAll();
        res.json(Calificaciones);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const GetCalification = async (req, res) => {
    try {
        const Calification = await CalificacionModels.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Calification[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

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