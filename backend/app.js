import  express from "express";
import cors from "cors"
//immportamos la conexion a la DB
import db from "./database/db.js";
//importamos nuestro enrutador 
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import proyectosRealizados from "./routes/ProyectosRealizadoRoutes.js"
import serviciosOfrecidos  from "./routes/ServiciosOfrecidosRoutes.js";


const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuarios', usuarioRoutes)
app.use('/proyectosrealizados', proyectosRealizados)
app.use('/ServiciosOfrecidos', serviciosOfrecidos)

app.use

try {
   await db.authenticate();
   console.log('Conexion exitosa a la DB');
   } catch (error) {
   console.log(`El error de conexion es: ${error}`);
}
//nodemon app, ahora iniciamos aqui la base de datos

app.listen(8000, ()=> {
   console.log('Server UP runnung in http://localhost:8000/')
})
