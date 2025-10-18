import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env
// SERVER - SE INICIA EN LA TERMINAL CON 'npm run dev' Y LA CONEXION SE CORTA CON CONTROL + C
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

import path from 'path';  //
import { fileURLToPath } from 'url';  //

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BRIAN
//import clienteRoutes from './routes/cliente.route.js';
import empleadosRoutes  from "./routes/empleado.route.js";
import serviciosRoutes from "./routes/servicio.route.js";
import agendaRoutes from "./routes/agenda.route.js";

// MAYRA
import Caja from './routes/cajaRoutes.js';
import Productos from './routes/productRoutes.js';
import Cliente from './routes/ClienteRoutes.js';
import Mascotas from './routes/mascotaRoutes.js';


const app = express();

// CONFIGURA PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../test-frontend/views'));
app.use(express.static(path.join(__dirname, '../test-frontend/public')));

//CORS
app.use(cors()); // habilita que el frontend (puerto 4000) acceda
//MIDDLEWARE
app.use(express.json());// ya reemplaza body-parser
app.use(express.urlencoded({ extended: true }));  // ← Importante para formularios

// ESTO SE VISUALIZA EN EL NAVEGADOR CON LOCALHOST:3000
app.get('/', (req, res) => {
  res.send('Hola desde la API')
})

// RUTAS BRIAN
// LAS RUTAS PARA LOS CLIENTES
//app.use('/api/clientes', clienteRoutes);
// LAS RUTAS PARA LOS EMPLEADOS
app.use('/api/empleados', empleadosRoutes);
// LAS RUTAS PRA LOS SERVIICIOS
app.use('/api/servicios', serviciosRoutes);
// LAS RUTAS APARA LA AGENDA
app.use('/api/agenda', agendaRoutes);

// RUTAS MAYRA
app.use('/caja', Caja);
app.use('/productos', Productos);
app.use('/clientes', Cliente);
app.use('/mascotas', Mascotas);

// ESTO SE VISUALIZA EN LA TERMINAL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listo y funcionanado en el puerto ${PORT}`));

// CONEXION A LA BASE DE DATOS DE MONGO ATLAS
mongoose.connect((process.env.MONGO_URI))
.then(() => {
    console.log('CONECTADO A LA BASE DE DATOS!');

    // Eliminar índice dni_1
    // mongoose.connection.db.collection('clientes').dropIndex('dni_1')
    //   .then(() => console.log('✅ Índice dni_1 eliminado'))
    //   .catch(err => console.log('⚠️ Índice no encontrado o ya eliminado:', err.message));

})
.catch(() => {
    console.log('FALLO EN LA CONEXION A LA BASE DE DATOS');
});
