import EstadoModels from "../models/EstadoModels.js";

export const GetAllState = async (req, res) => {
    try {
        const Estados = await EstadoModels.findAll();
        res.json(Estados);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const GetState = async (req, res) => {
    try {
        const Estado = await EstadoModels.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Estado[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const SaveState = async (req, res) => {
    try {
        const Estado = await EstadoModels.create(req.body);
        res.json({
            "message": "¡Ha sido registrada correctamente!",
            "id":Estado.id
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const UpdateState = async (req, res) => {
    try {
        await EstadoModels.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const DeleteState = async (req, res) => {
    try {
        await EstadoModels.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};