import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProjectHasImagenModel = db.define('proyectos_has_imagenes', {
    idproyecto: { type: DataTypes.INTEGER,},
    idimagen: { type: DataTypes.INTEGER}
});

export default ProjectHasImagenModel;