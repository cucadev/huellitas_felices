const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Probando el proyecto de gestión PetShop Huellitas Felices</h1>
    <p>Probando servidor Node.js con Express.</p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

mongoose.connect('mongodb+srv://mayraferrazin:cucamongo30@cluster0.ez8baym.mongodb.net/petshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error:', err));

// Esta línea muestra qué base de datos está usando realmente:
mongoose.connection.on('connected', () => {
  console.log('🟢 Base de datos usada:', mongoose.connection.name);
});

app.use(express.json()); // Para poder recibir JSON en el body

// Importar rutas
const userRoutes = require('./Backend/routes/userRoutes');
app.use('/api/users', userRoutes);