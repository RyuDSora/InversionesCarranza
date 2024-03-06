import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProyectoRealizadoModel = db.define('proyectos', {
    categoria_servicio: { type: DataTypes.INTEGER,},
    nombreProyecto: { type: DataTypes.STRING},
    descripcion_proyecto: { type: DataTypes.TEXT},
    img_principal: { type: DataTypes.INTEGER}
});

export default ProyectoRealizadoModel;