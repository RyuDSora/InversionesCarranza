import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuarios', {
    rol: { type: DataTypes.INTEGER},
    nombre: { type: DataTypes.STRING},
    apellido: { type: DataTypes.STRING},
    correo: { type: DataTypes.STRING},
    telefono: { type: DataTypes.STRING},
    contasenia: { type: DataTypes.STRING},
    fechaNacimiento: { type: DataTypes.DATEONLY}
});

export default UsuarioModel;
