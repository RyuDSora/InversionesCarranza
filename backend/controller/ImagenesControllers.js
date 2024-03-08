import ImagenModel from "../models/ImagenesModels.js";

export const GetImage = async (req, res) => {
    try {
        const Image = await ImagenModel.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Image[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const DeleteImage = async (req, res) => {
    try {
        await ImagenModel.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Image eliminada correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
