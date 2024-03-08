import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('imagenes', {
    nombre: { type: DataTypes.STRING},
    descricion:{type: DataTypes.STRING},
    tipo:{type:DataTypes.STRING},
    archivo:{type: DataTypes.BLOB}
});

export default UsuarioModel;
