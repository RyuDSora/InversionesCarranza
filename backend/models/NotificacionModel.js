// Modelo de la base de datos para la tabla Notificaciones
module.exports = (sequelize, DataTypes) => {
    const Notificacion = sequelize.define('Notificacion', {
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mensaje: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leido: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Notificacion;
};