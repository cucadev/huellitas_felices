// ========================================
// CONFIGURACIÓN API
// ========================================
const API_URL = 'http://localhost:3000/api';
const AGENDA_URL = `${API_URL}/agenda`;
const CLIENTES_URL = `${API_URL}/clientes`;

// ========================================
// VARIABLES GLOBALES
// ========================================
let modalCita;
let editandoCita = false;
let citaActualId = null;

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    modalCita = new bootstrap.Modal(document.getElementById('modalCita'));
    
    // Event listeners
    document.getElementById('formCita').addEventListener('submit', guardarCita);
    document.getElementById('btnBuscarCliente').addEventListener('click', buscarCliente);
    document.getElementById('btnEliminarCita').addEventListener('click', eliminarCita);
    
    // Limpiar formulario al cerrar modal
    document.getElementById('modalCita').addEventListener('hidden.bs.modal', limpiarFormulario);
});

// ========================================
// CARGAR EVENTOS DESDE LA API
// ========================================
async function cargarEventos(info, successCallback, failureCallback) {
    try {
        const start = info.start.toISOString().split('T')[0];
        const end = info.end.toISOString().split('T')[0];
        
        const response = await fetch(`${AGENDA_URL}?start=${start}&end=${end}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar eventos');
        }
        
        const eventos = await response.json();
        successCallback(eventos);
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        failureCallback(error);
        mostrarAlerta('Error al cargar las citas', 'danger');
    }
}

// ========================================
// ABRIR MODAL PARA NUEVA CITA
// ========================================
function abrirModalNuevaCita(fecha = null) {
    editandoCita = false;
    citaActualId = null;
    limpiarFormulario();
    
    document.getElementById('modalTitle').textContent = 'Agendar Nueva Cita';
    document.getElementById('btnGuardarCita').innerHTML = '<i class="fas fa-save me-1"></i> Guardar Cita';
    document.getElementById('btnEliminarCita').style.display = 'none';
    
    // Si se hizo click en una fecha, pre-llenar el campo
    if (fecha) {
        const fechaSolo = fecha.split('T')[0];
        const hora = fecha.split('T')[1] ? fecha.split('T')[1].substring(0, 5) : '';
        
        document.getElementById('fecha').value = fechaSolo;
        if (hora) {
            document.getElementById('hora').value = hora;
        }
    } else {
        // Fecha de hoy por defecto
        document.getElementById('fecha').value = new Date().toISOString().split('T')[0];
    }
    
    modalCita.show();
}

// ========================================
// ABRIR MODAL PARA EDITAR CITA
// ========================================
function abrirModalEditarCita(evento) {
    editandoCita = true;
    citaActualId = evento.id;
    limpiarFormulario();
    
    document.getElementById('modalTitle').textContent = 'Editar Cita';
    document.getElementById('btnGuardarCita').innerHTML = '<i class="fas fa-save me-1"></i> Actualizar Cita';
    document.getElementById('btnEliminarCita').style.display = 'inline-block';
    
    const props = evento.extendedProps;
    
    // Llenar el formulario con los datos del evento
    document.getElementById('citaId').value = evento.id;
    document.getElementById('titulo').value = evento.title;
    document.getElementById('fecha').value = props.date;
    document.getElementById('hora').value = props.time;
    document.getElementById('veterinario').value = props.professional;
    
    // Datos del cliente
    document.getElementById('dni').value = props.dni_client;
    document.getElementById('nombre').value = props.name_client;
    document.getElementById('apellido').value = props.lastname_client;
    document.getElementById('telefono').value = props.phone_client;
    document.getElementById('email').value = props.email_client;
    document.getElementById('direccion').value = props.address_client || '';
    
    // Datos de la mascota
    document.getElementById('nombreMascota').value = props.pet_name;
    document.getElementById('tipoMascota').value = props.pet_type;
    document.getElementById('observaciones').value = props.observations;
    
    modalCita.show();
}

// ========================================
// BUSCAR CLIENTE POR DNI
// ========================================
async function buscarCliente() {
    const dni = document.getElementById('dni').value.trim();
    
    if (!dni) {
        mostrarAlerta('Por favor, ingrese un DNI', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${CLIENTES_URL}/busqueda/${dni}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                mostrarAlerta('Cliente no encontrado con ese DNI', 'warning');
                limpiarCamposCliente();
                return;
            }
            throw new Error('Error al buscar cliente');
        }
        
        const cliente = await response.json();
        
        // Llenar los campos con los datos del cliente
        document.getElementById('nombre').value = cliente.name || '';
        document.getElementById('apellido').value = cliente.lastname || '';
        document.getElementById('telefono').value = cliente.phone || '';
        document.getElementById('email').value = cliente.email || '';
        document.getElementById('direccion').value = cliente.address || '';
        
        mostrarAlerta('Cliente encontrado correctamente', 'success');
    } catch (error) {
        console.error('Error al buscar cliente:', error);
        mostrarAlerta('Error al buscar el cliente', 'danger');
    }
}

// ========================================
// GUARDAR CITA (CREAR O ACTUALIZAR)
// ========================================
async function guardarCita(e) {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const datos = {
        title: document.getElementById('titulo').value.trim(),
        date: document.getElementById('fecha').value,
        time: document.getElementById('hora').value,
        professional: document.getElementById('veterinario').value,
        dni_client: document.getElementById('dni').value.trim(),
        pet_name: document.getElementById('nombreMascota').value.trim(),
        pet_type: document.getElementById('tipoMascota').value,
        observations: document.getElementById('observaciones').value.trim()
    };
    
    try {
        let response;
        
        if (editandoCita && citaActualId) {
            // ACTUALIZAR cita existente
            response = await fetch(`${AGENDA_URL}/${citaActualId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        } else {
            // CREAR nueva cita
            response = await fetch(AGENDA_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al guardar la cita');
        }
        
        const resultado = await response.json();
        
        // Cerrar modal y refrescar calendario
        modalCita.hide();
        refrescarCalendario();
        
        const mensaje = editandoCita ? 'Cita actualizada correctamente' : 'Cita creada correctamente';
        mostrarAlerta(mensaje, 'success');
        
    } catch (error) {
        console.error('Error al guardar cita:', error);
        mostrarAlerta(error.message || 'Error al guardar la cita', 'danger');
    }
}

// ========================================
// ELIMINAR CITA
// ========================================
async function eliminarCita() {
    if (!citaActualId) return;
    
    if (!confirm('¿Está seguro de que desea eliminar esta cita?')) {
        return;
    }
    
    try {
        const response = await fetch(`${AGENDA_URL}/${citaActualId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la cita');
        }
        
        modalCita.hide();
        refrescarCalendario();
        mostrarAlerta('Cita eliminada correctamente', 'success');
        
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        mostrarAlerta('Error al eliminar la cita', 'danger');
    }
}

// ========================================
// ACTUALIZAR FECHA/HORA AL ARRASTRAR EVENTO
// ========================================
async function actualizarFechaHoraEvento(evento) {
    try {
        const nuevaFecha = evento.start.toISOString().split('T')[0];
        const nuevaHora = evento.start.toTimeString().substring(0, 5);
        
        const response = await fetch(`${AGENDA_URL}/${evento.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: nuevaFecha,
                time: nuevaHora
            })
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la cita');
        }

        // Actualizar las propiedades extendidas del evento en FullCalendar
        evento.setExtendedProp('date', nuevaFecha);
        evento.setExtendedProp('time', nuevaHora);

        // Recargar los eventos del calendario para reflejar los cambios
        calendar.refetchEvents();

        mostrarAlerta('Cita reagendada correctamente', 'success');
        
    } catch (error) {
        console.error('Error al actualizar fecha/hora:', error);
        mostrarAlerta('Error al reagendar la cita', 'danger');
        // Revertir el cambio en el calendario
        evento.revert();
    }
}

// ========================================
// UTILIDADES
// ========================================

function limpiarFormulario() {
    document.getElementById('formCita').reset();
    document.getElementById('citaId').value = '';
    limpiarCamposCliente();
}

function limpiarCamposCliente() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('direccion').value = '';
}

function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear el elemento de alerta
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    alertaDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertaDiv.setAttribute('role', 'alert');
    
    alertaDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertaDiv);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        alertaDiv.remove();
    }, 4000);
}