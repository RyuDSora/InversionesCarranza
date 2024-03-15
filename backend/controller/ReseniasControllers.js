import ReseniaModels from "../models/ReseniaModels.js";

export const GetAllResenias = async (req, res) => {
    try {
        const Resenias = await ReseniaModels.findAll();
        res.json(Resenias);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const GetResenia = async (req, res) => {
    try {
        const Resenia = await ReseniaModels.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Resenia[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const SaveResenia = async (req, res) => {
    try {
        const Resenia = await ReseniaModels.create(req.body);
        res.json({
            "message": "¡Ha sido registrada correctamente!",
            "id":Resenia.id
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const UpdateResenia = async (req, res) => {
    try {
        await ReseniaModels.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const DeleteResenia = async (req, res) => {
    try {
        await ReseniaModels.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};