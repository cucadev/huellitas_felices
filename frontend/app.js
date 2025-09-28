// ========================================
// SERVIDOR FRONTEND - HUELLITAS FELICES
// Puerto 4000 - PUG + Bootstrap 5
// ========================================

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ========================================
// CONFIGURACIÓN PUG
// ========================================
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ========================================
// ARCHIVOS ESTÁTICOS
// ========================================
app.use(express.static(path.join(__dirname, 'public')));

// ========================================
// RUTAS
// ========================================

// Ruta principal - Redirige a clientes
app.get('/', (req, res) => {
    res.redirect('/clientes');
});

// Vista de clientes (SIN datos de API todavía)
app.get('/clientes', (req, res) => {
    res.render('pages/clientes', {
        title: 'Gestión de Clientes - Huellitas Felices'
    });
});

// Vista de servicios
app.get('/servicios', (req, res) => {
    res.render('pages/servicios', {
        title: 'Gestión de Servicios - Huellitas Felices'
    });
});

// Vista de Empleados
app.get('/empleados', (req, res) => {
    res.render('pages/empleados', {
        title: 'Gestión de Empleados - Huellitas Felices'
    });
});

// Vista de agenda
app.get('/agenda', (req, res) => {
    res.render('pages/agenda', {
        title: 'Agenda Veterinaria - Huellitas Felices'
    });
});

// ========================================
// SERVIDOR
// ========================================
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🐾 Frontend Huellitas Felices: http://localhost:${PORT}`);
});