// CLIENTES.JS - GESTIÓN COMPLETA DE CLIENTES

const API_URL = "http://localhost:3000/api/clientes";

// ========================================
// INICIO AUTOMÁTICO DE LA PÁGINA
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
  
  document.getElementById("formCliente").addEventListener("submit", crearCliente);
  document.getElementById("formEditarCliente").addEventListener("submit", editarCliente);
  document.getElementById("btnConfirmarEliminar").addEventListener("click", eliminarCliente);
});


// MOSTRAMOS TODOS LOS CLIENTES
async function cargarClientes() {
  const tbody = document.getElementById("tablaClientesBody");

  // Destruir DataTables ANTES de modificar el DOM
  destruirDataTable();

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const clientes = await res.json();
    tbody.innerHTML = "";

    if (clientes.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-muted py-4">
            <i class="bi bi-inbox" style="font-size: 2rem;"></i>
            <p class="mt-2">No hay clientes registrados</p>
          </td>
        </tr>
      `;
      // NO inicializar DataTables cuando no hay datos - simplemente terminar
      return;
    }

    clientes.forEach((c, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c.dni || 'N/A'}</strong></td>
        <td>${c.name || 'N/A'}</td>
        <td>${c.lastname || 'N/A'}</td>
        <td class="text-center">
          <button class="btn btn-outline-info btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#modalInfoMascotas"
            onclick="cargarMascotasCliente('${c._id}', '${c.name} ${c.lastname}')">
            <i class="bi bi-eye-fill me-1"></i> Ver
          </button>
        </td>
        <td>${c.address || 'N/A'}</td>
        <td>${c.email || 'N/A'}</td>
        <td>${c.phone || 'N/A'}</td>
        <td class="text-center">
          <div class="btn-group" role="group">
            <button class="btn btn-warning btn-sm me-1"
              data-bs-toggle="modal"
              data-bs-target="#modalEditarCliente"
              onclick='cargarDatosCliente(${JSON.stringify(c).replace(/'/g, "&#39;")})'>
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalEliminarCliente"
              onclick="prepararEliminar('${c._id}', '${c.name} ${c.lastname}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Inicializar DataTables DESPUÉS de cargar los datos
    inicializarDataTable('tablaClientes'); // Usar el ID específico de esta tabla

  } catch (err) {
    console.error("Error cargando clientes:", err);
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-danger py-4">
          <i class="bi bi-exclamation-triangle" style="font-size: 2rem;"></i>
          <p class="mt-2">Error al cargar clientes. Verifica que el backend esté corriendo.</p>
        </td>
      </tr>
    `;
  }
}

// CREAR NUEVO CLIENTE
async function crearCliente(e) {
  e.preventDefault();
  
  const nuevoCliente = {
    name: document.getElementById("nombreCliente").value,
    lastname: document.getElementById("apellidoCliente").value,
    dni: document.getElementById("dniCliente").value,
    email: document.getElementById("emailCliente").value,
    phone: document.getElementById("telefonoCliente").value,
    city: document.getElementById("ciudadCliente").value,
    address: document.getElementById("direccionCliente").value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCliente)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear cliente");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCliente"));
    modal.hide();
    document.getElementById("formCliente").reset();

    await cargarClientes(); // Esto ya reinicializará DataTables

    mostrarAlerta("✅ Cliente creado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// CARGAR DATOS EN EL MODAL DE EDITAR
function cargarDatosCliente(cliente) {
  document.getElementById("idClienteEditar").value = cliente._id;
  document.getElementById("nombreClienteEditar").value = cliente.name;
  document.getElementById("apellidoClienteEditar").value = cliente.lastname;
  document.getElementById("dniClienteEditar").value = cliente.dni;
  document.getElementById("emailClienteEditar").value = cliente.email;
  document.getElementById("telefonoClienteEditar").value = cliente.phone;
  document.getElementById("ciudadClienteEditar").value = cliente.city || '';
  document.getElementById("direccionClienteEditar").value = cliente.address;
}


// EDITAR CLIENTE
async function editarCliente(e) {
  e.preventDefault();

  const id = document.getElementById("idClienteEditar").value;

  const clienteActualizado = {
    name: document.getElementById("nombreClienteEditar").value,
    lastname: document.getElementById("apellidoClienteEditar").value,
    dni: document.getElementById("dniClienteEditar").value,
    email: document.getElementById("emailClienteEditar").value,
    phone: document.getElementById("telefonoClienteEditar").value,
    city: document.getElementById("ciudadClienteEditar").value,
    address: document.getElementById("direccionClienteEditar").value
  };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteActualizado)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar cliente");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarCliente"));
    modal.hide();

    await cargarClientes(); // Esto ya reinicializará DataTables

    mostrarAlerta("✅ Cliente actualizado exitosamente", "success");

  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// PREPARAR ELIMINACIÓN
let idClienteAEliminar = null;

function prepararEliminar(id, nombre) {
  idClienteAEliminar = id;
  document.getElementById("nombreClienteEliminar").textContent = 
    `El cliente "${nombre}" será eliminado permanentemente.`;
}


// ELIMINAR CLIENTE
async function eliminarCliente() {
  if (!idClienteAEliminar) return;

  try {
    const res = await fetch(`${API_URL}/${idClienteAEliminar}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al eliminar cliente");
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEliminarCliente"));
    modal.hide();
    
    await cargarClientes(); // Esto ya reinicializará DataTables
    
    mostrarAlerta("✅ Cliente eliminado exitosamente", "success");
    idClienteAEliminar = null;
    
  } catch (err) {
    console.error("Error:", err);
    mostrarAlerta(`❌ ${err.message}`, "danger");
  }
}


// MOSTRAR ALERTAS
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