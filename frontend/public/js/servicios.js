// SERVICIOS.JS - GESTIÓN COMPLETA DE SERVICIOS

const API_URL = "http://localhost:3000/api/servicios";

// ========================================
// INICIO AUTOMÁTICO DE LA PÁGINA
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  cargarServicios();
  
  document.getElementById("formCrearServicio").addEventListener("submit", crearServicio);
  document.getElementById("formEditarServicio").addEventListener("submit", editarServicio);
  document.getElementById("btnConfirmarEliminar").addEventListener("click", eliminarServicio);
});


// ========================================
// CARGAR TODOS LOS SERVICIOS
// ========================================
async function cargarServicios() {
  const tbody = document.getElementById("tablaServiciosBody");

  // Destruir DataTables ANTES de modificar el DOM
  destruirDataTable();

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const servicios = await res.json();
    tbody.innerHTML = "";

    if (servicios.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted py-4">
            <i class="bi bi-inbox" style="font-size: 2rem;"></i>
            <p class="mt-2">No hay servicios registrados</p>
          </td>
        </tr>
      `;
      // NO inicializar DataTables cuando no hay datos
      return;
    }

    servicios.forEach((servicio) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${servicio.name || 'N/A'}</strong></td>
        <td>${servicio.description || 'N/A'}</td>
        <td><strong>$${servicio.price ? servicio.price.toFixed(2) : '0.00'}</strong></td>
        <td class="text-center">
          <div class="btn-group" role="group">
            <button class="btn btn-warning btn-sm me-1"
              data-bs-toggle="modal"
              data-bs-target="#modalEditarServicio"
              onclick='cargarDatosServicio(${JSON.stringify(servicio).replace(/'/g, "&#39;")})'>
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalEliminarServicio"
              onclick="prepararEliminarServicio('${servicio._id}', '${servicio.name}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Inicializar DataTables DESPUÉS de cargar los datos
    inicializarDataTable('tablaServicios');

  } catch (err) {
    console.error("Error cargando servicios:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger py-4">
          <i class="bi bi-exclamation-triangle" style="font-size: 2rem;"></i>
          <p class="mt-2">Error al cargar servicios. Verifica que el backend esté corriendo.</p>
        </td>
      </tr>
    `;
  }
}


// ========================================
// CREAR NUEVO SERVICIO
// ========================================
async function crearServicio(e) {
  e.preventDefault();
  
  const nuevoServicio = {
    name: document.getElementById("nombreServicioCrear").value,
    description: document.getElementById("descripcionServicioCrear").value,
    price: parseFloat(document.getElementById("precioServicioCrear").value)
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoServicio)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear servicio");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCrearServicio"));
    modal.hide();
    document.getElementById("formCrearServicio").reset();

    await cargarServicios();

    mostrarAlerta("✅ Servicio creado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// ========================================
// CARGAR DATOS EN MODAL DE EDITAR
// ========================================
function cargarDatosServicio(servicio) {
  document.getElementById("idServicioEditar").value = servicio._id;
  document.getElementById("nombreServicioEditar").value = servicio.name;
  document.getElementById("descripcionServicioEditar").value = servicio.description;
  document.getElementById("precioServicioEditar").value = servicio.price;
}


// ========================================
// EDITAR SERVICIO
// ========================================
async function editarServicio(e) {
  e.preventDefault();

  const id = document.getElementById("idServicioEditar").value;

  const servicioActualizado = {
    name: document.getElementById("nombreServicioEditar").value,
    description: document.getElementById("descripcionServicioEditar").value,
    price: parseFloat(document.getElementById("precioServicioEditar").value)
  };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicioActualizado)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar servicio");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarServicio"));
    modal.hide();

    await cargarServicios();

    mostrarAlerta("✅ Servicio actualizado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// ========================================
// PREPARAR ELIMINACIÓN
// ========================================
let idServicioAEliminar = null;

function prepararEliminarServicio(id, nombre) {
  idServicioAEliminar = id;
  document.getElementById("servicioAEliminar").textContent = 
    `El servicio "${nombre}" será eliminado permanentemente.`;
}


// ========================================
// ELIMINAR SERVICIO
// ========================================
async function eliminarServicio() {
  if (!idServicioAEliminar) return;

  try {
    const res = await fetch(`${API_URL}/${idServicioAEliminar}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al eliminar servicio");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEliminarServicio"));
    modal.hide();
    
    await cargarServicios();
    
    mostrarAlerta("✅ Servicio eliminado exitosamente", "success");
    idServicioAEliminar = null;
    
  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// ========================================
// MOSTRAR ALERTAS
// ========================================
function mostrarAlerta(mensaje, tipo) {
  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  alerta.style.zIndex = "9999";
  alerta.style.minWidth = "300px";
  alerta.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alerta);
  
  setTimeout(() => {
    alerta.remove();
  }, 3000);
}