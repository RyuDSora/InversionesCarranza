import UsuarioModel from "../models/UsuarioModels.js";


// Mostrar todos los registros que posiblemente pueda ver el admin
export const getAllUsuarios = async (req, res) => {
    try {
        const Usuarios = await UsuarioModel.findAll();
        res.json(Usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro, este lo usalermos para que vea su perfil 
export const getUsuario = async (req, res) => {
    try {
        const Usuario = await UsuarioModel.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(Usuario[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro 
export const createUsuario = async (req, res) => {
    try {
        await UsuarioModel.create(req.body);
        res.json({
            "message": "¡Ha sido registrdo correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro, lo usammos para recuperar la contraseña
export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro, lo pyede hacer el admin, pero se usara mas para eliminar servicios 
export const deleteUsuario = async (req, res) => {
    try {
        await UsuarioModel.destroy({
            where: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
