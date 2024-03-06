import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define('servicios', {
    nombre_servicio: { type: DataTypes.STRING},
    detalle_servicio: { type: DataTypes.TEXT},
    servicio_padre:{type:DataTypes.INTEGER},
    img_principal: { type: DataTypes.INTEGER}
});

export default UsuarioModel;
