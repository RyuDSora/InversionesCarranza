import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProyectoRealizadoModel = db.define('proyectosrealizados', {
    servicios: { type: DataTypes.INTEGER, validate: {isIn: [[1, 2, 3]]}},
    titulo: { type: DataTypes.STRING},
    descripcion: { type: DataTypes.TEXT},
    imagen: { type: DataTypes.STRING}
});

export default ProyectoRealizadoModel;