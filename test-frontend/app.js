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
// app.get('/clientes', (req, res) => {
//     res.render('pages/clientes', {
//         title: 'Gestión de Clientes - Huellitas Felices'
//     });
// });

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

// Vista de Caja
app.get('/caja', (req, res) => {
    res.render('pages/dashboard', {
        title: 'Caja - Huellitas Felices',
        saldo: 0,           // ← Valor inicial
        movimientos: []     // ← Array vacío inicial
    });
});

// Vista de Productos aca debajo va lo relacionado a la vista de productos
// Vista de Productos
app.get('/productos', (req, res) => {
    res.render('pages/productos/dashboard', {
        title: 'Productos - Huellitas Felices',
        productos: []  // ← Array vacío inicial
    });
});
// Vista de Productos - Nuevo
app.get('/productos/nuevo', (req, res) => {
    res.render('pages/productos/nuevo', {
        title: 'Nuevo Producto - Huellitas Felices',
        titulo: 'Nuevo Producto'
    });
});

// Vista de Productos - Editar
app.get('/productos/editar/:id', (req, res) => {
    res.render('pages/productos/editar', {
        title: 'Editar Producto - Huellitas Felices',
        titulo: 'Editar Producto',
        producto: {
            _id: req.params.id,
            nombre: '',
            precio: 0,
            stock: 0,
            categoria: '',
            descripcion: ''
        }
    });
});

// Vista de Clientes
app.get('/clientes', (req, res) => {
    res.render('pages/clientes/clientes', {
        title: 'Clientes - Huellitas Felices',
        titulo: 'Clientes - Huellitas Felices',
        clientes: []
    });
});

app.get('/clientes/nuevo', (req, res) => {
    res.render('pages/clientes/nuevo', {
        title: 'Nuevo Cliente - Huellitas Felices',
        titulo: 'Nuevo Cliente'
    });
});

app.get('/clientes/editar/:id', (req, res) => {
    res.render('pages/clientes/editar', {
        title: 'Editar Cliente - Huellitas Felices',
        titulo: 'Editar Cliente',
        cliente: {
            _id: req.params.id,
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            direccion: ''
        }
    });
});

// Vista de Mascotas
app.get('/mascotas', (req, res) => {
    res.render('pages/mascotas/mascotas', {
        title: 'Mascotas - Huellitas Felices',
        titulo: 'Mascotas - Huellitas Felices',
        mascotas: []
    });
});

app.get('/mascotas/nuevo', (req, res) => {
    res.render('pages/mascotas/nuevo', {
        title: 'Nueva Mascota - Huellitas Felices',
        titulo: 'Nueva Mascota',
        clientes: []
    });
});

app.get('/mascotas/editar/:id', (req, res) => {
    res.render('pages/mascotas/editar', {
        title: 'Editar Mascota - Huellitas Felices',
        titulo: 'Editar Mascota',
        mascota: {
            _id: req.params.id,
            nombre: '',
            especie: '',
            raza: '',
            edad: 0,
            cliente: '',
            observaciones: ''
        },
        clientes: []
    });
});

// ========================================
// SERVIDOR
// ========================================
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🐾 Frontend Huellitas Felices: http://localhost:${PORT}`);
});