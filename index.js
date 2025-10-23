require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');   // 🔹 agregar
const flash = require('connect-flash');       // 🔹 agregar

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
app.use(express.static('Public'));
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Configuración de sesiones y flash
app.use(session({
  secret: 'huellitasfelices',  // cualquier clave secreta
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// 🔹 Middleware para pasar mensajes flash a todas las vistas
app.use((req, res, next) => {
  res.locals.mensajeExito = req.flash('mensajeExito');
  res.locals.mensajeError = req.flash('mensajeError');
  next();
});

// Rutas
app.use('/api/users', userRoutes);
app.use('/clientes', clientesRoutes);
app.use('/productos', productRoutes);
app.use('/compras', comprasRoutes);
app.use('/ventas', ventasRoutes);
app.use('/caja', cajaRoutes);
app.use('/', webRoutes);
app.use('/mascotas', mascotaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
