import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CalificacionModel = db.define('calificaciones', {
    idProyecto: { type: DataTypes.INTEGER},
    idUsuario: { type: DataTypes.INTEGER},
    calificacion: { type: DataTypes.DECIMAL}
});

export default CalificacionModel;
