import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('servicios', {
    nombre: { type: DataTypes.STRING},
    descripcion: { type: DataTypes.TEXT},
    imagen: { type: DataTypes.STRING}
});

export default UsuarioModel;
