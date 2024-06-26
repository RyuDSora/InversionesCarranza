import express from "express";
import cors from "cors";
import db from "./database/db.js";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import proyectosRealizados from "./routes/ProyectosRealizadoRoutes.js";
import serviciosOfrecidos from "./routes/ServiciosOfrecidosRoutes.js";
import ProyeHasImagenes from "./routes/ProyeHasImagenRoutes.js";
import Imagenes from './routes/ImagenesRoutes.js';
import Calificaciones from "./routes/CalificacionesRoutes.js";
import Estados from "./routes/EstadosRoutes.js";
import Resenias from "./routes/ReseniasRoutes.js";
import Solicitude from "./routes/SolicitudeRoutes.js";
import routes from './routes/ImagenRoutes.js';
import notification from './routes/AdminNotificarRoutes.js'
import { sendEmail } from './controller/emailController.js';

// Importa el enrutador para las notificaciones
import notificacionRoutes from "./routes/NotificacionRoutes.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Monta el enrutador para las notificaciones
app.use('/notificaciones', notificacionRoutes);

// Resto de las rutas
app.use('/usuarios', usuarioRoutes);
app.use('/proyectosrealizados', proyectosRealizados);
app.use('/ServiciosOfrecidos', serviciosOfrecidos);
app.use('/proyehasimage', ProyeHasImagenes);
app.use('/imagenes', Imagenes);
app.use('/calificaciones', Calificaciones);
app.use('/estados', Estados);
app.use('/resenias', Resenias);
app.use('/solicitudes', Solicitude);
app.use('/AdminNotificar', notification);


app.use(routes);

try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}

app.get('/', (req, res) => {
    res.status(200).json('Bienvenido, tu aplicación se ha ejecutado correctamente');
});

// Nueva ruta para manejar la solicitud de envío de correo electrónico
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body; // Extraemos los datos del cuerpo de la solicitud

    try {
        const emailSent = await sendEmail(to, subject, text); // Enviamos el correo electrónico
        if (emailSent) {
            res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
        } else {
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});