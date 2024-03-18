import {Sequelize} from 'sequelize'
    const db = new Sequelize(
        'db_incarranza',           //Database
        'InCarranza',              //Username
        'admin',                   //Password
        { 
        host: 'localhost',          
        dialect: 'mysql'
    })
export default db




