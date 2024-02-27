import ProyectoRealizadoModel from "../models/ProyectoRealizadoModels.js";

// Mostrar todos los proyectos realizados
export const getAllProyectosRealizados = async (req, res) => {
    try {
        const proyectosRealizados = await ProyectoRealizadoModel.findAll();
        res.json(proyectosRealizados);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un proyecto realizado por su ID
export const getProyectoRealizado = async (req, res) => {
    try {
        const proyectoRealizado = await ProyectoRealizadoModel.findByPk(req.params.id);
        if (proyectoRealizado) {
            res.json(proyectoRealizado);
        } else {
            res.status(404).json({ message: 'Proyecto realizado no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un proyecto realizado
export const createProyectoRealizado = async (req, res) => {
    try {
        const PR = await ProyectoRealizadoModel.create(req.body);
        res.json({ message: '¡Proyecto realizado creado correctamente!',id:PR.id });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un proyecto realizado por su ID
export const updateProyectoRealizado = async (req, res) => {
    try {
        const [updatedRowsCount] = await ProyectoRealizadoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ message: 'No se encontró ningún proyecto realizado para actualizar' });
        } else {
            res.json({ message: '¡Proyecto realizado actualizado correctamente!' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un proyecto realizado por su ID
export const deleteProyectoRealizado = async (req, res) => {
    try {
        const deletedRowCount = await ProyectoRealizadoModel.destroy({
            where: { id: req.params.id }
        });
        if (deletedRowCount === 0) {
            res.status(404).json({ message: 'No se encontró ningún proyecto realizado para eliminar' });
        } else {
            res.json({ message: '¡Proyecto realizado eliminado correctamente!' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
