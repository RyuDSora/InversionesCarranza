import {Sequelize} from 'sequelize'
    const db = new Sequelize('db_incarranza', 'InCarranza', 'admin',{ 
        host: 'localhost',                 //usuario  //contraseña de mySQL
        dialect: 'mysql'
    })
export default db

//intalar las siguentes dependencia 
/*npm install sequelize*/


//lo movi todo a app que esta en el BACKEND



