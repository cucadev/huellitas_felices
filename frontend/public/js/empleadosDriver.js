// ========================================
// DRIVER.JS - TOUR GUIADO DE EMPLEADOS
// ========================================

let driverObj;

document.addEventListener('DOMContentLoaded', function() {
    // Acceder a driver desde el CDN (según documentación oficial)
    const driver = window.driver.js.driver;

    // Inicializar Driver.js
    driverObj = driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: [
            {
                element: '#tablaEmpleados',
                popover: {
                    title: '👨‍⚕️ Bienvenido a Gestión de Empleados',
                    description: 'Aquí puedes visualizar, agregar, editar y eliminar empleados de la veterinaria. También puedes ver los servicios asignados a cada uno.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '.btn-success',
                popover: {
                    title: '➕ Agregar Nuevo Empleado',
                    description: 'Haz clic en este botón para registrar un nuevo empleado en el sistema. Deberás ingresar sus datos personales, rol y servicios asociados.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '#tablaEmpleados thead',
                popover: {
                    title: '📋 Columnas de la Tabla',
                    description: 'La tabla muestra información clave de cada empleado:<br>• <strong>DNI:</strong> Documento del empleado<br>• <strong>Nombre y Apellido</strong><br>• <strong>Teléfono</strong><br>• <strong>Rol:</strong> Cargo o función dentro de la veterinaria<br>• <strong>Servicios:</strong> Muestra cuántos servicios tiene asignados<br>• <strong>Acciones:</strong> Editar o eliminar',
                    side: 'bottom',
                    align: 'start',
                    popoverClass: 'popover-ancho'
                }
            },
            {
                element: 'div.dt-search',
                popover: {
                    title: '🔍 Buscar Empleados',
                    description: 'Usa este campo para buscar empleados por nombre, apellido, DNI, rol o teléfono. La búsqueda es instantánea y filtra toda la tabla.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '.dt-buttons',
                popover: {
                    title: '📥 Exportar Datos',
                    description: '<strong>Descarga la lista de empleados:</strong><br>• <strong>Excel:</strong> Para reportes o análisis<br>• <strong>PDF:</strong> Para impresión<br>• <strong>CSV:</strong> Para otros sistemas<br>Los archivos exportados respetan los filtros aplicados.',
                    side: 'bottom',
                    align: 'start',
                    popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaEmpleados tbody tr:first-child td:nth-child(6)',
                popover: {
                    title: '🧾 Servicios Asignados',
                    description: 'En esta columna puedes ver cuántos servicios tiene asignado cada empleado. Haz clic en el botón para ver el detalle completo.',
                    side: 'right',
                    align: 'center'
                }
            },
            {
                element: '#tablaEmpleados tbody tr:first-child td:last-child',
                popover: {
                    title: '⚙️ Acciones Disponibles',
                    description: '<strong>Botones de acción:</strong><br>• <span style="color: #ffc107;">✏️ Editar:</span> Modifica los datos del empleado<br>• <span style="color: #dc3545;">🗑️ Eliminar:</span> Borra el registro (requiere confirmación)',
                    side: 'left',
                    align: 'center',
                    popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaEmpleados_info',
                popover: {
                    title: '📊 Información de Registros',
                    description: 'Aquí puedes ver cuántos empleados hay en total y cuántos se muestran actualmente según los filtros aplicados.',
                    side: 'top',
                    align: 'start'
                }
            },
            {
                element: 'div.dt-paging',
                popover: {
                    title: '📄 Paginación',
                    description: 'Navega entre las diferentes páginas de empleados. También puedes cambiar cuántos registros se muestran por página usando el selector.',
                    side: 'top',
                    align: 'end'
                }
            },
            {
                element: '#dt-length-0',
                popover: {
                    title: '📏 Registros por Página',
                    description: 'Selecciona cuántos empleados deseas ver por página: 10, 25, 50 o 100. Ideal para ajustar la vista según tus necesidades.',
                    side: 'bottom',
                    align: 'start'
                }
            },
            {
                popover: {
                    title: '💡 Tips Adicionales',
                    description: '<strong>Funcionalidades útiles:</strong><br>• La tabla se actualiza automáticamente al agregar/editar/eliminar empleados<br>• Los campos con (*) son obligatorios<br>• Los servicios se pueden modificar en cualquier momento<br>• Puedes exportar los datos incluso después de filtrar<br>• Al eliminar un empleado, se pedirá confirmación',
                    side: 'top',
                    align: 'center',
                    popoverClass: 'popover-ancho'
                }
            }
        ],
        nextBtnText: 'Siguiente →',
        prevBtnText: '← Anterior',
        doneBtnText: '✓ Finalizar',
        closeBtnText: '✕',
        progressText: '{{current}} de {{total}}'
    });

    // Evento del botón de ayuda
    const btnAyuda = document.getElementById('btnAyudaEmpleados');
    if (btnAyuda) {
        btnAyuda.addEventListener('click', function() {
            iniciarTourCompleto();
        });
    }
});

// ========================================
// TOUR COMPLETO DE EMPLEADOS
// ========================================
function iniciarTourCompleto() {
    driverObj.drive();
}
