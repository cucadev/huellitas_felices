import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env
// SERVER - SE INICIA EN LA TERMINAL CON 'npm run dev' Y LA CONEXION SE CORTA CON CONTROL + C
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
//import { Note } from './models/notes.model.js';
import noteRoutes from './routes/note.route.js';
import productRoutes from './routes/product.route.js';
import ventaRoutes from './routes/venta.route.js';
import clienteRoutes from './routes/cliente.route.js';
import mascotaRoutes from './routes/mascota.route.js';
import empleadosRoutes  from "./routes/empleado.route.js";
import serviciosRoutes from "./routes/servicio.route.js";
import agendaRoutes from "./routes/agenda.route.js";

const app = express();

//CORS
app.use(cors()); // habilita que el frontend (puerto 4000) acceda
//MIDDLEWARE
app.use(express.json());// ya reemplaza body-parser

// ESTO SE VISUALIZA EN EL NAVEGADOR CON LOCALHOST:3000
app.get('/', (req, res) => {
  res.send('Hola desde la API')
})

// LAS RUTAS DE NOTAS
app.use('/api/notes', noteRoutes);
// LAS RUTA PARA LOS PRODUCTOS
app.use('/api/products', productRoutes);
// LAS RUTAS PARA LAS VENTAS
app.use('/api/ventas', ventaRoutes);
// LAS RUTAS PARA LOS CLIENTES
app.use('/api/clientes', clienteRoutes);
// LAS RUTAS PARA LAS MASCOTAS
app.use('/api/mascotas', mascotaRoutes);
// LAS RUTAS PARA LOS EMPLEADOS
app.use('/api/empleados', empleadosRoutes);
// LAS RUTAS PRA LOS SERVIICIOS
app.use('/api/servicios', serviciosRoutes);
// LAS RUTAS APARA LA AGENDA
app.use('/api/agenda', agendaRoutes);

// ESTO SE VISUALIZA EN LA TERMINAL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listo y funcionanado en el puerto ${PORT}`));

// CONEXION A LA BASE DE DATOS DE MONGO ATLAS
mongoose.connect((process.env.MONGO_URI))
.then(() => {
    console.log('CONECTADO A LA BASE DE DATOS!');
})
.catch(() => {
    console.log('FALLO EN LA CONEXION A LA BASE DE DATOS');
});
