// ========================================
// DRIVER.JS - TOUR GUIADO DE CLIENTES
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
                element: '#tablaClientes',
                popover: {
                    title: '👥 Bienvenido a Gestión de Clientes',
                    description: 'Aquí puedes visualizar, agregar, editar y eliminar clientes de la veterinaria. También puedes ver las mascotas asociadas a cada cliente.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '.btn-success',
                popover: {
                    title: '➕ Agregar Nuevo Cliente',
                    description: 'Haz clic en este botón para abrir el formulario y registrar un nuevo cliente en el sistema.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '#tablaClientes thead',
                popover: {
                    title: '📋 Columnas de la Tabla',
                    description: 'La tabla muestra información clave de cada cliente: DNI, nombre completo, cantidad de mascotas, dirección, email y teléfono. Puedes ordenar por cualquier columna haciendo clic en los encabezados.',
                    side: 'bottom',
                    align: 'start'
                }
            },
            {
                element: 'div.dt-search',
                popover: {
                    title: '🔍 Buscar Clientes',
                    description: 'Usa este campo para buscar clientes por cualquier dato: nombre, apellido, DNI, email, teléfono, etc. La búsqueda es instantánea y filtra en todas las columnas.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            {
                element: '.dt-buttons',
                popover: {
                    title: '📥 Exportar Datos',
                    description: '<strong>Descarga la tabla en diferentes formatos:</strong><br>• <strong>Excel:</strong> Para análisis y reportes<br>• <strong>PDF:</strong> Para impresión y archivo<br>• <strong>CSV:</strong> Para importar a otros sistemas<br>Los datos exportados respetan los filtros aplicados en la búsqueda.',
                    side: 'bottom',
                    align: 'start',
                    popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaClientes tbody tr:first-child td:nth-child(4)',
                popover: {
                    title: '🐾 Ver Mascotas del Cliente',
                    description: 'Esta columna muestra la cantidad de mascotas registradas para cada cliente. Haz clic en el ícono de ojo para ver el detalle completo de todas sus mascotas.',
                    side: 'right',
                    align: 'center'
                }
            },
            {
                element: '#tablaClientes tbody tr:first-child td:last-child',
                popover: {
                    title: '⚙️ Acciones Disponibles',
                    description: '<strong>Botones de acción en cada fila:</strong><br>• <span style="color: #ffc107;">✏️ Editar:</span> Modifica los datos del cliente<br>• <span style="color: #dc3545;">🗑️ Eliminar:</span> Elimina el cliente del sistema (requiere confirmación)',
                    side: 'left',
                    align: 'center',
                    popoverClass: 'popover-ancho'
                }
            },
            {
                element: '#tablaClientes_info',
                popover: {
                    title: '📊 Información de Registros',
                    description: 'Aquí se muestra cuántos clientes hay en total y cuántos se están visualizando actualmente según los filtros aplicados.',
                    side: 'top',
                    align: 'start'
                }
            },
            {
                element: 'div.dt-paging',
                popover: {
                    title: '📄 Paginación',
                    description: 'Navega entre las diferentes páginas de clientes. Puedes cambiar cuántos registros se muestran por página usando el selector de entradas.',
                    side: 'top',
                    align: 'end'
                }
            },
            {
                element: '#dt-length-0',
                popover: {
                    title: '📏 Registros por Página',
                    description: 'Selecciona cuántos clientes deseas ver en cada página: 10, 25, 50 o 100 registros. Útil para visualizar más o menos información a la vez.',
                    side: 'bottom',
                    align: 'start'
                }
            },
            {
                popover: {
                    title: '💡 Tips Adicionales',
                    description: '<strong>Funcionalidades útiles:</strong><br>• La tabla se actualiza automáticamente al agregar/editar/eliminar<br>• Los campos marcados con (*) son obligatorios en formularios<br>• Al eliminar un cliente, se solicitará confirmación<br>• Puedes exportar los datos incluso después de filtrar<br>• Los datos se guardan en tiempo real',
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
    const btnAyuda = document.getElementById('btnAyudaClientes');
    if (btnAyuda) {
        btnAyuda.addEventListener('click', function() {
            iniciarTourCompleto();
        });
    }
});

// ========================================
// TOUR COMPLETO DE CLIENTES
// ========================================
function iniciarTourCompleto() {
    driverObj.drive();
}
