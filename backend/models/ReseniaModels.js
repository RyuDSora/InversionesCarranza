import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ReseniaModel = db.define('resenias', {
    idProyecto: { type: DataTypes.INTEGER},
    idUsuario: { type: DataTypes.INTEGER},
    resenia_proyecto: { type: DataTypes.STRING}
});

export default ReseniaModel;
