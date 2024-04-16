import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AdminNotificarModel = db.define('notificaciones', {
    

    id: { type: DataTypes.INTEGER, primaryKey:true},
    id_usuario: { type: DataTypes.INTEGER},
    mensaje: { type: DataTypes.STRING},
    leido: { type: DataTypes.BOOLEAN}
});

export default AdminNotificarModel;
