import ImagenesModel from "../models/ImagenesModels.js";

// Mostrar todos las imagenes
export const GetAllImagenes = async (req, res) => {
    try {
        const Imagenes = await ImagenesModel.findAll();
        res.json(Imagenes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar una imagen
export const GetImagenes = async (req, res) => {
    try {
        const Imagenes = await ImagenesModel.findByPk(req.params.id);
        if (Imagenes) {
            res.json(Imagenes);
        } else {
            res.status(404).json({ message: 'Imagen no encontrada' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Guardar una imagen
export const GuardarImagen = async (req, res) => {
    try {
        const imagenCreada = await ImagenesModel.create(req.body);
        res.json({ message: '¡Imagen Guardada correctamente!', id: imagenCreada.id });
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Actualizar una imagen
export const UpdateImagen = async (req, res) => {
    try {
        const [updatedRowsCount] = await ImagenesModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: 'No se encontró ninguna imagen para actualizar' });
        } else {
            res.json({ message: '¡Imagen actualizada correctamente!' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar una imagen 
export const DeleteImagen = async (req, res) => {
    try {
        const deletedRowCount = await ImagenesModel.destroy({
            where: { id: req.params.id }
        });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: 'No se encontró ninguna imagen para eliminar' });
        } else {
            res.json({ message: '¡Imagen eliminada correctamente!' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
