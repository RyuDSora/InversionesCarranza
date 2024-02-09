import {Sequelize} from 'sequelize'
<<<<<<< HEAD
    const db = new Sequelize('db_incarranza', 'InCarranza', 'admin',{
        host: 'localhost',                          //contraseña de mySQL
=======
    const db = new Sequelize('db_incarranza', 'InCarranza', 'admin',{ 
        host: 'localhost',                 //usuario  //contraseña de mySQL
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
        dialect: 'mysql'
    })
export default db

//intalar las siguentes dependencia 
/*npm install sequelize*/

try {
    await db.authenticate();
    console.log('Conexion exitosa a la DB');
    } catch (error) {
    console.log(`El error de conexion es: ${error}`);
}

//nodemon db, este comando nos sirve para verificar si la base de datos tiene una conexion exitosa 
<<<<<<< HEAD


=======
//deben estar ubicados en el database
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
