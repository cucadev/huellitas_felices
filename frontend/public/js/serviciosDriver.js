// ========================================
// DRIVER.JS - TOUR GUIADO DE SERVICIOS
// ========================================

let driverObj;

document.addEventListener('DOMContentLoaded', function() {
    // Acceder a driver desde el CDN
    const driver = window.driver.js.driver;
    
    // Inicializar Driver.js
    driverObj = driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: [
            {
                element: '#tablaServicios',
                popover: {
                    title: '🏥 Bienvenido a Gestión de Servicios',
                    description: 'Aquí puedes visualizar, agregar, editar y eliminar todos los servicios veterinarios que ofrece tu clínica. Desde consultas generales hasta tratamientos especializados.',
                    side: 'left',
                    align: 'center'
                }
            },
            {
                element: '.btn-success',
                popover: {
                    title: '➕ Agregar Nuevo Servicio',
                    description: 'Haz clic en este botón para abrir el formulario y registrar un nuevo servicio en el sistema. Necesitarás ingresar nombre, descripción y precio.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '#tablaServicios thead',
                popover: {
                    title: '📋 Columnas de la Tabla',
                    description: 'La tabla muestra información de cada servicio:<br>• <strong>Nombre del Servicio:</strong> Nombre único del servicio<br>• <strong>Descripción:</strong> Detalles del servicio<br>• <strong>Precio:</strong> Costo del servicio<br>• <strong>Acciones:</strong> Editar o eliminar',
                    side: 'bottom',
                    align: 'start',
                    // popoverClass: 'popover-ancho'
                }
            },
            {
                element: 'div.dt-search',
                popover: {
                    title: '🔍 Buscar Servicios',
                    description: 'Usa este campo para buscar servicios por nombre, descripción o cualquier otro dato. La búsqueda es instantánea y filtra en todas las columnas.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '.dt-buttons',
                popover: {
                    title: '📥 Exportar Datos',
                    description: '<strong>Descarga la lista de servicios en diferentes formatos:</strong><br>• <strong>Excel:</strong> Para análisis y presupuestos<br>• <strong>PDF:</strong> Para impresión y archivo<br>• <strong>CSV:</strong> Para importar a otros sistemas<br>Los datos exportados respetan los filtros aplicados.',
                    side: 'bottom',
                    align: 'start',
                    // popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaServicios tbody tr:first-child td:last-child',
                popover: {
                    title: '⚙️ Acciones Disponibles',
                    description: '<strong>Botones de acción en cada fila:</strong><br>• <span style="color: #ffc107;">✏️ Editar:</span> Modifica el nombre, descripción o precio del servicio<br>• <span style="color: #dc3545;">🗑️ Eliminar:</span> Elimina el servicio del sistema (requiere confirmación)',
                    side: 'left',
                    align: 'center',
                    // popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaServicios_info',
                popover: {
                    title: '📊 Información de Registros',
                    description: 'Aquí se muestra cuántos servicios hay en total y cuántos se están visualizando actualmente según los filtros aplicados.',
                    side: 'top',
                    align: 'start'
                }
            },
            {
                element: 'div.dt-paging',
                popover: {
                    title: '📄 Paginación',
                    description: 'Navega entre las diferentes páginas de servicios. Puedes cambiar cuántos registros se muestran por página usando el selector de entradas.',
                    side: 'top',
                    align: 'end'
                }
            },
            {
                element: '#dt-length-0',
                popover: {
                    title: '📏 Registros por Página',
                    description: 'Selecciona cuántos servicios deseas ver en cada página: 10, 25, 50 o 100 registros. Útil para visualizar más o menos información a la vez.',
                    side: 'bottom',
                    align: 'start'
                }
            },
            {
                popover: {
                    title: '💡 Tips Adicionales',
                    description: '<strong>Funcionalidades útiles:</strong><br>• La tabla se actualiza automáticamente al agregar/editar/eliminar servicios<br>• Los campos marcados con (*) son obligatorios en formularios<br>• El precio se puede actualizar en cualquier momento<br>• Al eliminar un servicio, se solicitará confirmación<br>• Puedes exportar los datos incluso después de filtrar<br>• Los datos se guardan en tiempo real',
                    side: 'top',
                    align: 'center',
                    // popoverClass: 'popover-ancho'
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
    const btnAyuda = document.getElementById('btnAyudaServicios');
    if (btnAyuda) {
        btnAyuda.addEventListener('click', function() {
            iniciarTourCompleto();
        });
    }
});

// ========================================
// TOUR COMPLETO DE SERVICIOS
// ========================================
function iniciarTourCompleto() {
    driverObj.drive();
}