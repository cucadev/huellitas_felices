
console.log("TEST ARCHIVO DATATABLES.JS CARGADO CORRECTAMENTE");

let tablaActual = null; // Variable global para la instancia actual

// Función para inicializar DataTables en cualquier tabla
function inicializarDataTable(idTabla = 'tabla') {  // ← Recibe el ID como parámetro
  const selector = '#' + idTabla;  // ← Construye el selector dinámicamente
  
  // Si ya existe una tabla inicializada, destruirla primero
  if (tablaActual !== null) {
    tablaActual.destroy();
  }

  // Crear nueva instancia
  tablaActual = new DataTable(selector, {  // ← Usa el selector dinámico
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.3.3/i18n/es-AR.json'
    },
    lengthMenu: [
      [6, 12, 24],
      ['6', '12', '24']
    ],
    order: [],
    layout: {
      topStart: [{
        buttons: [
          {
            extend: 'pdfHtml5',
            text: 'Descargar PDF',
            title: 'Informe_de_gestion',
            messageTop: '',
            exportOptions: {
              columns: ':visible'
            }
          },
          'excel',
          'csv',
          'print'
        ]
      }],
      topEnd: 'search',
      bottomStart: ['info', 'pageLength'],
      bottomEnd: 'paging'
    }
  });

  console.log(`DataTable inicializado en #${idTabla}`);
  return tablaActual;
}

// DESTUYE LA TABLA
function destruirDataTable() {
  if (tablaActual !== null) {
    tablaActual.destroy();
    tablaActual = null;
    console.log("DataTable destruido");
  }
}