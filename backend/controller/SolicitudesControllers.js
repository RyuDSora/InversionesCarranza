import SolicitudModels from "../models/SolicitudModels.js";

export const GetAllSolicitudes = async (req, res) => {
    try {
        const Solicitudes = await SolicitudModels.findAll();
        res.json(Solicitudes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const GetSolicitud = async (req, res) => {
    try {
        const Solicitud = await SolicitudModels.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Solicitud[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const SaveSolicitud = async (req, res) => {
    try {
        const Solicitud = await SolicitudModels.create(req.body);
        res.json({
            "message": "¡Ha sido registrada correctamente!",
            "id":Solicitud.id
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const UpdateSolicitud = async (req, res) => {
    try {
        await SolicitudModels.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const DeleteSolicitud = async (req, res) => {
    try {
        await SolicitudModels.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};