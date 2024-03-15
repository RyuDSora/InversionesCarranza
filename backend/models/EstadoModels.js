import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EstadoModel = db.define('estados', {
    nombre_estado: { type: DataTypes.STRING},
    descripcion: { type: DataTypes.STRING}
});

export default EstadoModel;
