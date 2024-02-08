import {Sequelize} from 'sequelize'
    const db = new Sequelize('db_incarranza', 'root', '1234',{
        host: 'localhost',                          //contraseña de mySQL
        dialect: 'mysql'
    })

export default db

//intalar las siguentes dependencia 
/*npm install sequelize
   */

try {
    await db.authenticate();
    console.log('Conexion exitosa a la DB');
    } catch (error) {
    console.log(`El error de conexion es: ${error}`);
}

//nodemon db, este comando nos sirve para verificar si la base de datos tiene una conexion exitosa 
//deben estar ubicados en el database