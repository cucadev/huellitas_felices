require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const path = require('path');


const clientesRoutes = require('./Backend/routes/ClienteRoutes');
const productRoutes = require('./Backend/routes/productRoutes');
const comprasRoutes = require('./Backend/routes/comprasRoutes');
const ventasRoutes = require('./Backend/routes/ventasRoutes');
const cajaRoutes = require('./Backend/routes/cajaRoutes');
const webRoutes = require('./Backend/routes/webRoutes');
const userRoutes = require('./Backend/routes/userRoutes');


const PORT = process.env.PORT || 3000;

//app.get('/', (req, res) => {
//  res.render('index');  // Renderiza el archivo views/index.pug
//});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error:', err));

// Esta línea muestra qué base de datos está usando:
mongoose.connection.on('connected', () => {
  console.log('🟢 Base de datos usada:', mongoose.connection.name);
});

app.use(express.static('Public')); // Para que las imagenes sean accesibles desde la web

app.set('view engine', 'pug'); 

app.set('views', path.join(__dirname, 'views')); // carpeta donde estarán los archivos .pug

app.use(express.json()); // Para poder recibir JSON en el body - Desde Thunder Client 
app.use(express.urlencoded({ extended: true })); // Cuando uso Host

// Importacion de rutas

app.use('/api/users', userRoutes);

app.use('/clientes', clientesRoutes);

app.use('/api/products', productRoutes);

app.use('/api/compras', comprasRoutes);

app.use('/api/ventas', ventasRoutes);

app.use('/api/caja', cajaRoutes);

app.use('/', webRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});