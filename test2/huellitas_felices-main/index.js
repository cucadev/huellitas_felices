require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Importación de rutas
const clientesRoutes = require('./Backend/routes/ClienteRoutes');
const productRoutes = require('./Backend/routes/productRoutes');
const comprasRoutes = require('./Backend/routes/comprasRoutes');
const ventasRoutes = require('./Backend/routes/ventasRoutes');
const cajaRoutes = require('./Backend/routes/cajaRoutes');
const userRoutes = require('./Backend/routes/userRoutes');
const webRoutes = require('./Backend/routes/webRoutes');
const mascotaRoutes = require('./Backend/routes/mascotaRoutes');

//IMPORTACIONES DE RUTAS SERVICIO, EMPLEADOS Y AGENDA - Brian
const serviciosRoutes = require('./Backend/routes/servicioRoutes');
const empleadosRoutes = require('./Backend/routes/empleadoRoutes');
const agendaRoutes = require('./Backend/routes/agendaRoutes');

// Conexión con Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error:', err));

mongoose.connection.on('connected', () => {
  console.log('🟢 Base de datos usada:', mongoose.connection.name);
});


// Configuración Express
app.use(express.static('Public')); // Acceso a imágenes y archivos estáticos
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views')); // Carpeta de vistas

app.use(express.json()); // Para recibir JSON
app.use(express.urlencoded({ extended: true })); // Para recibir formularios


// Rutas
app.use('/api/users', userRoutes);
app.use('/clientes', clientesRoutes);
app.use('/productos', productRoutes);
app.use('/compras', comprasRoutes);
app.use('/ventas', ventasRoutes);
app.use('/caja', cajaRoutes);
app.use('/', webRoutes);
app.use('/mascotas', mascotaRoutes);

// RUTAS DE SERVICIOS, EMPLEADOS Y AGENDA AGREGAR - Brian
app.use('/servicios', serviciosRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/agenda', agendaRoutes);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
