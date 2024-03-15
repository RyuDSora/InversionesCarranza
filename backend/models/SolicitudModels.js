import db from "../database/db.js";
import { DataTypes } from "sequelize";

const SolicitudModel = db.define('solicitudes', {
    id_cliente: { type: DataTypes.INTEGER},
    categoria_servicio: { type: DataTypes.INTEGER},
    id_estado: { type: DataTypes.INTEGER},
    descripcion_solicitud: { type: DataTypes.STRING}
});

export default SolicitudModel;
