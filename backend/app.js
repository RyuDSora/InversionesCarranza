import express from "express";
import cors from "cors"
import path from  'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from "./database/db.js";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import proyectosRealizados from "./routes/ProyectosRealizadoRoutes.js";
import serviciosOfrecidos  from "./routes/ServiciosOfrecidosRoutes.js";
import ProyeHasImagenes  from "./routes/ProyeHasImagenRoutes.js";
import Imagenes from './routes/ImagenesRoutes.js'
import Calificaciones from "./routes/CalificacionesRoutes.js";
import Estados from "./routes/EstadosRoutes.js";
import Resenias from "./routes/ReseniasRoutes.js";
import Solicitude from "./routes/SolicitudeRoutes.js";
import routes from './routes/ImagenRoutes.js' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const PORT = 8000;

const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuarios', usuarioRoutes)
app.use('/proyectosrealizados', proyectosRealizados)
app.use('/ServiciosOfrecidos', serviciosOfrecidos)
app.use('/proyehasimage',ProyeHasImagenes)
app.use('/imagenes', Imagenes)
app.use('/calificaciones',Calificaciones)
app.use('/estados',Estados)
app.use('/resenias',Resenias)
app.use('/solicitudes',Solicitude)

app.use(express.static(path.join(__dirname,'../../bdimages')))
app.use(routes)

try {
   await db.authenticate();
   console.log('Conexion exitosa a la DB');
   } catch (error) {
   console.log(`El error de conexion es: ${error}`);
}

app.listen(PORT, ()=> {
   console.log('Server UP runnung in http://localhost:'+PORT)
})