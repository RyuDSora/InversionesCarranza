import ProjectHasImagenModels from "../models/ProjectHasImagenModels.js";

// Mostrar todas las columnas de img x proyects
export const GetAllProjHasImg = async (req, res) => {
    try {
        const ProjHasImg = await ProjectHasImagenModels.findAll();
        res.json(ProjHasImg);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Guardar una Imagen x proyecto
export const GuardarImgXProj = async (req, res) => {
    try {
        await ProjectHasImagenModels.create(req.body);
        res.json({ message: '¡Guardado correctamente!' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar una imagen de un proyecto
export const DeleteProyecthasImagen = async (req, res) => {
    try {
        const deletedRowCount = await ProjectHasImagenModels.destroy({
            where: { id: req.params.id }
        });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: 'No se encontró nada para eliminar' });
        } else {
            res.json({ message: '¡eliminado correctamente!' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
