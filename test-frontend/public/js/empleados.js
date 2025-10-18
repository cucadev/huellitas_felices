// EMPLEADOS.JS - GESTIÓN COMPLETA CON SERVICIOS

const API_URL_EMPLEADOS = "http://localhost:3000/api/empleados";
const API_URL_SERVICIOS = "http://localhost:3000/api/servicios";

// ========================================
// INICIO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  cargarEmpleados();
  cargarServiciosEnModales();
});

// Delegación de eventos para modales dinámicos
document.addEventListener('submit', (e) => {
  if (e.target.id === 'formCrearEmpleado') {
    e.preventDefault();
    crearEmpleado();
  }
  if (e.target.id === 'formEditarEmpleado') {
    e.preventDefault();
    editarEmpleado();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.closest('#btnConfirmarEliminarEmpleado')) {
    eliminarEmpleado();
  }
});

// Formateo DNI
document.addEventListener('input', (e) => {
  if (e.target.id === 'dniEmpleadoCrear' || e.target.id === 'dniEmpleadoEditar') {
    formatearDNI(e);
  }
});


// ========================================
// CARGAR EMPLEADOS
// ========================================
async function cargarEmpleados() {
  const tbody = document.getElementById("tablaEmpleadosBody");
  destruirDataTable();

  try {
    const res = await fetch(API_URL_EMPLEADOS);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const empleados = await res.json();
    tbody.innerHTML = "";

    if (empleados.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-muted py-4">
            <i class="bi bi-inbox" style="font-size: 2rem;"></i>
            <p class="mt-2">No hay empleados registrados</p>
          </td>
        </tr>
      `;
      return;
    }

    empleados.forEach((emp) => {
      const rolBadge = obtenerBadgeRol(emp.role);
      const cantServicios = emp.servicios ? emp.servicios.length : 0;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${emp.dni || 'N/A'}</strong></td>
        <td>${emp.name || 'N/A'}</td>
        <td>${emp.lastname || 'N/A'}</td>
        <td>${emp.phone || 'N/A'}</td>
        <td><span class="badge ${rolBadge.class}">${rolBadge.text}</span></td>
        <td>
          <button class="btn btn-outline-info btn-sm" 
            onclick="verServiciosEmpleado('${emp._id}', '${emp.name} ${emp.lastname}')"
            data-bs-toggle="modal" data-bs-target="#modalVerServicios">
            <i class="bi bi-eye-fill me-1"></i> ${cantServicios} servicios
          </button>
        </td>
        <td class="text-center">
          <div class="btn-group" role="group">
            <button class="btn btn-warning btn-sm me-1"
              onclick='cargarDatosEmpleado(${JSON.stringify(emp).replace(/'/g, "&#39;")})'
              data-bs-toggle="modal" data-bs-target="#modalEditarEmpleado">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm"
              onclick="prepararEliminarEmpleado('${emp._id}', '${emp.name} ${emp.lastname}')"
              data-bs-toggle="modal" data-bs-target="#modalEliminarEmpleado">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    inicializarDataTable('tablaEmpleados');

  } catch (err) {
    console.error("Error cargando empleados:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-danger py-4">
          <i class="bi bi-exclamation-triangle" style="font-size: 2rem;"></i>
          <p class="mt-2">Error al cargar empleados</p>
        </td>
      </tr>
    `;
  }
}


// ========================================
// CARGAR SERVICIOS EN MODALES
// ========================================
async function cargarServiciosEnModales() {
  try {
    const res = await fetch(API_URL_SERVICIOS);
    if (!res.ok) throw new Error("Error al cargar servicios");
    
    const servicios = await res.json();
    
    // Generar checkboxes en los contenedores específicos
    generarCheckboxesServicios(servicios, 'contenedorServiciosCrear', 'crear');
    generarCheckboxesServicios(servicios, 'contenedorServiciosEditar', 'editar');
    
  } catch (err) {
    console.error("Error cargando servicios:", err);
  }
}

function generarCheckboxesServicios(servicios, containerId, tipo) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let html = '<div class="row">';
  servicios.forEach((servicio, index) => {
    if (index % 3 === 0 && index !== 0) html += '</div><div class="row mt-2">';
    html += `
      <div class="col-md-4">
        <div class="form-check">
          <input class="form-check-input servicio-checkbox-${tipo.toLowerCase()}" 
            type="checkbox" 
            value="${servicio._id}" 
            id="servicio${tipo}${servicio._id}">
          <label class="form-check-label" for="servicio${tipo}${servicio._id}">
            ${servicio.name}
          </label>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}


// ========================================
// CREAR EMPLEADO
// ========================================
async function crearEmpleado() {
  const rolFrontend = document.getElementById("rolEmpleadoCrear").value;
  const rolBackend = mapearRolFrontendABackend(rolFrontend);
  
  // Obtener IDs de servicios seleccionados
  const serviciosSeleccionados = [];
  document.querySelectorAll('.servicio-checkbox-crear:checked').forEach(checkbox => {
    serviciosSeleccionados.push(checkbox.value);
  });

  const nuevoEmpleado = {
    dni: document.getElementById("dniEmpleadoCrear").value,
    name: document.getElementById("nombreEmpleadoCrear").value,
    lastname: document.getElementById("apellidoEmpleadoCrear").value,
    phone: document.getElementById("telefonoEmpleadoCrear").value,
    role: rolBackend,
    servicios: serviciosSeleccionados
  };

  try {
    const res = await fetch(API_URL_EMPLEADOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEmpleado)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear empleado");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCrearEmpleado"));
    modal.hide();
    document.getElementById("formCrearEmpleado").reset();
    
    // Desmarcar checkboxes
    document.querySelectorAll('.servicio-checkbox-crear').forEach(cb => cb.checked = false);

    await cargarEmpleados();
    mostrarAlerta("✅ Empleado creado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    if (err.message.includes('E11000') || err.message.includes('duplicate')) {
      mostrarAlerta("❌ Ya existe un empleado con ese DNI", "warning");
    } else {
      mostrarAlerta("❌ Error al crear empleado", "danger");
    }
  }
}


// ========================================
// CARGAR DATOS PARA EDITAR
// ========================================
function cargarDatosEmpleado(empleado) {
  document.getElementById("idEmpleadoEditar").value = empleado._id;
  document.getElementById("dniEmpleadoEditar").value = empleado.dni;
  document.getElementById("nombreEmpleadoEditar").value = empleado.name;
  document.getElementById("apellidoEmpleadoEditar").value = empleado.lastname;
  document.getElementById("telefonoEmpleadoEditar").value = empleado.phone;
  
  const rolFrontend = mapearRolBackendAFrontend(empleado.role);
  document.getElementById("rolEmpleadoEditar").value = rolFrontend;
  
  // Marcar checkboxes de servicios
  document.querySelectorAll('.servicio-checkbox-editar').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  if (empleado.servicios && empleado.servicios.length > 0) {
    empleado.servicios.forEach(servicio => {
      const servicioId = typeof servicio === 'object' ? servicio._id : servicio;
      const checkbox = document.querySelector(`.servicio-checkbox-editar[value="${servicioId}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }
}


// ========================================
// EDITAR EMPLEADO
// ========================================
async function editarEmpleado() {
  const id = document.getElementById("idEmpleadoEditar").value;
  const rolFrontend = document.getElementById("rolEmpleadoEditar").value;
  const rolBackend = mapearRolFrontendABackend(rolFrontend);
  
  const serviciosSeleccionados = [];
  document.querySelectorAll('.servicio-checkbox-editar:checked').forEach(checkbox => {
    serviciosSeleccionados.push(checkbox.value);
  });

  const empleadoActualizado = {
    dni: document.getElementById("dniEmpleadoEditar").value,
    name: document.getElementById("nombreEmpleadoEditar").value,
    lastname: document.getElementById("apellidoEmpleadoEditar").value,
    phone: document.getElementById("telefonoEmpleadoEditar").value,
    role: rolBackend,
    servicios: serviciosSeleccionados
  };

  try {
    const res = await fetch(`${API_URL_EMPLEADOS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleadoActualizado)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar empleado");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarEmpleado"));
    modal.hide();

    await cargarEmpleados();
    mostrarAlerta("✅ Empleado actualizado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    if (err.message.includes('E11000') || err.message.includes('duplicate')) {
      mostrarAlerta("❌ Ya existe un empleado con ese DNI", "warning");
    } else {
      mostrarAlerta("❌ Error al actualizar empleado", "danger");
    }
  }
}


// ========================================
// ELIMINAR EMPLEADO
// ========================================
let idEmpleadoAEliminar = null;

function prepararEliminarEmpleado(id, nombre) {
  idEmpleadoAEliminar = id;
  document.getElementById("empleadoAEliminar").textContent = 
    `"${nombre}" será eliminado permanentemente.`;
}

async function eliminarEmpleado() {
  if (!idEmpleadoAEliminar) return;

  try {
    const res = await fetch(`${API_URL_EMPLEADOS}/${idEmpleadoAEliminar}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al eliminar empleado");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEliminarEmpleado"));
    modal.hide();
    
    await cargarEmpleados();
    mostrarAlerta("✅ Empleado eliminado exitosamente", "success");
    idEmpleadoAEliminar = null;
    
  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta("❌ Error al eliminar empleado", "danger");
  }
}


// ========================================
// VER SERVICIOS
// ========================================
async function verServiciosEmpleado(empleadoId, nombreCompleto) {
  document.getElementById("nombreEmpleadoServicios").textContent = nombreCompleto;
  const contenedor = document.getElementById("listaServiciosEmpleado");

  try {
    const res = await fetch(`${API_URL_EMPLEADOS}/${empleadoId}`);
    if (!res.ok) throw new Error("Error al cargar servicios");
    
    const empleado = await res.json();
    contenedor.innerHTML = "";

    if (!empleado.servicios || empleado.servicios.length === 0) {
      contenedor.innerHTML = `
        <div class="alert alert-info text-center">
          <i class="bi bi-info-circle-fill me-2"></i>
          <strong>No brinda servicios</strong><br>
          <small>Este empleado no tiene servicios asignados</small>
        </div>
      `;
      return;
    }

    let html = '<div class="row">';
    empleado.servicios.forEach(servicio => {
      html += `
        <div class="col-md-6 mb-2">
          <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            <span>${servicio.name}</span>
          </div>
        </div>
      `;
    });
    html += '</div>';
    contenedor.innerHTML = html;

  } catch (err) {
    console.error("Error:", err);
    contenedor.innerHTML = `
      <div class="alert alert-danger text-center">
        <i class="bi bi-exclamation-triangle me-2"></i>
        Error al cargar servicios
      </div>
    `;
  }
}


// ========================================
// UTILIDADES
// ========================================
function obtenerBadgeRol(role) {
  const roles = {
    'jefe': { class: 'bg-danger', text: 'Jefe' },
    'veterinario': { class: 'bg-primary', text: 'Veterinario' },
    'atencion': { class: 'bg-success', text: 'Atención' },
    'peluquero': { class: 'bg-info', text: 'Peluquero' }
  };
  return roles[role] || { class: 'bg-secondary', text: role || 'Sin rol' };
}

function mapearRolFrontendABackend(rolFrontend) {
  const mapeo = {
    'Veterinaria': 'veterinario',
    'Auxiliar Veterinario': 'atencion',
    'Recepcionista': 'atencion',
    'Peluquero Canino': 'peluquero',
    'Administrador': 'jefe'
  };
  return mapeo[rolFrontend] || 'atencion';
}

function mapearRolBackendAFrontend(rolBackend) {
  const mapeo = {
    'veterinario': 'Veterinaria',
    'atencion': 'Auxiliar Veterinario',
    'peluquero': 'Peluquero Canino',
    'jefe': 'Administrador'
  };
  return mapeo[rolBackend] || 'Auxiliar Veterinario';
}

function formatearDNI(e) {
  let valor = e.target.value.replace(/\D/g, '');
  if (valor.length > 8) valor = valor.substring(0, 8);
  
  if (valor.length > 6) {
    valor = valor.substring(0, 2) + '.' + valor.substring(2, 5) + '.' + valor.substring(5);
  } else if (valor.length > 2) {
    valor = valor.substring(0, 2) + '.' + valor.substring(2);
  }
  
  e.target.value = valor;
}

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
  
  setTimeout(() => alerta.remove(), 3000);
}