import Producto from '../models/Producto.js';

// Crear nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    // Validación mínima 
    if (!nombre || precio == null || stock == null || !categoria) {
      return res.status(400).json({ mensaje: 'Campos obligatorios faltantes' });
    }

    const nuevoProducto = new Producto({
      nombre,
      precio,
      stock,
      categoria,
      descripcion
    });

    await nuevoProducto.save();

    res.status(201).json({ mensaje: 'Producto creado correctamente', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Listar todos los productos
export const obtenerProductos = async (_req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Obtener un producto por su ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const datos = { ...req.body };

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente', producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
};

// VISTAS PUG

export const vistaProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('pages/productos/dashboard', { titulo: 'Listado de Productos', productos });
  } catch (error) {
    res.status(500).send('Error al cargar la vista: ' + error.message);
  }
};

// Formulario para crear un producto
export const formularioCrearProducto = (req, res) => {
  res.render('pages/productos/nuevo', { titulo: 'Nuevo Producto' });
};

// Formulario para editar un producto
export const formularioEditarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.render('pages/productos/editar', { titulo: 'Editar Producto', producto });
  } catch (error) {
    res.status(500).send('Error al cargar el producto: ' + error.message);
  }
};

// Crear producto desde formulario web (redirige)
export const crearProductoWeb = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    if (!nombre || precio == null || stock == null || !categoria) {
      return res.status(400).send('Campos obligatorios faltantes');
    }

    const nuevoProducto = new Producto({
      nombre,
      precio,
      stock,
      categoria,
      descripcion
    });

    await nuevoProducto.save();
    res.redirect('http://localhost:4000/productos/dashboard');
  } catch (error) {
    res.status(500).send('Error al crear producto: ' + error.message);
  }
};

// Actualizar producto desde formulario web (redirige)
export const actualizarProductoWeb = async (req, res) => {
  try {
    const datos = { ...req.body };

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      datos,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      return res.status(404).send('Producto no encontrado');
    }

    res.redirect('http://localhost:4000/productos/dashboard');
  } catch (error) {
    res.status(500).send('Error al actualizar producto: ' + error.message);
  }
};

// Eliminar producto desde web (redirige)
export const eliminarProductoWeb = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).send('Producto no encontrado');
    }

    res.redirect('http://localhost:4000/productos/dashboard');
  } catch (error) {
    res.status(500).send('Error al eliminar producto: ' + error.message);
  }
};