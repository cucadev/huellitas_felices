// ========================================
// INICIALIZACIÓN DE FULLCALENDAR
// ========================================

let calendar;

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        // ====================================
        // CONFIGURACIÓN BÁSICA
        // ====================================
        // initialView: 'timeGridWeek',
        locale: 'es',
        height: 'auto',

        // ====================================
        // BARRA DE HERRAMIENTAS
        // ====================================
        headerToolbar: {
            left: 'prev,next nuevaCita',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        // ====================================
        // TEXTOS DE BOTONES
        // ====================================
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },

        // ====================================
        // BOTÓN PERSONALIZADO
        // ====================================
        customButtons: {
            nuevaCita: {
                text: '+ Agendar Turno Nuevo',
                click: function () {
                    abrirModalNuevaCita();
                }
            }
        },

        // ====================================
        // CONFIGURACIÓN DE HORARIOS
        // ====================================
        slotMinTime: '08:00:00',
        slotMaxTime: '21:00:00',
        slotDuration: '00:30:00',
        allDaySlot: false,

        // ====================================
        // INTERACTIVIDAD
        // ====================================
        selectable: true,
        editable: true,
        eventDurationEditable: false,
        eventResizableFromStart: false,

        // ====================================
        // FUENTE DE EVENTOS (API)
        // ====================================
        events: function (info, successCallback, failureCallback) {
            cargarEventos(info, successCallback, failureCallback);
        },

        // ====================================
        // EVENTOS DE USUARIO
        // ====================================

        // Click en una fecha/hora vacía
        // dateClick: function (info) {
        //     abrirModalNuevaCita(info.dateStr);
        // },

        // Click en una fecha/hora vacía
        dateClick: function (info) {
            const fechaClick = new Date(info.dateStr);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            // Si es día pasado, no hacer nada
            if (fechaClick < hoy) {
                return;
            }

            // Si es hoy o futuro, abrir modal
            abrirModalNuevaCita(info.dateStr);
        },

        // Click en un evento existente
        eventClick: function (info) {
            abrirModalEditarCita(info.event);
        },

        // Arrastrar y soltar evento
        eventDrop: function (info) {
            const fechaEvento = new Date(info.event.start);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            // Bloquear drag & drop a días pasados
            if (fechaEvento < hoy) {
                alert('No puedes mover eventos a días anteriores');
                info.revert(); // Revertir el cambio
                return;
            }

            actualizarFechaHoraEvento(info.event);
        },

        // ====================================
        // ESTILO DE EVENTOS
        // ====================================
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },

        // ====================================
        // ESTILO DE EVENTOS
        // ====================================
        // Función para asignar clases CSS dinámicamente
        eventClassNames: function (arg) {
            const evento = arg.event;
            const ahora = new Date();
            const fechaEvento = new Date(evento.start);

            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            // Si el evento es de un día pasado
            if (fechaEvento < hoy) {
                return ['evento-pasado'];
            }

            // Si el evento es hoy
            if (fechaEvento.toDateString() === ahora.toDateString()) {
                const diferenciaMinutos = (ahora - fechaEvento) / (1000 * 60); // Diferencia en minutos

                // Si el evento ya pasó
                if (diferenciaMinutos > 0) {
                    // Rojo: Si pasaron más de 3 minutos
                    if (diferenciaMinutos > 3) {
                        return ['evento-pasado'];
                    }
                    // Amarillo: Si pasaron entre 0 y 3 minutos
                    else {
                        return ['evento-proximo'];
                    }
                }
                // Verde: Si el evento está en su horario (no ha pasado)
                else {
                    return ['evento-en-horario'];
                }
            }

            return []; // Sin clase adicional (color por defecto)
        },
    });

    calendar.render();

    // Función para actualizar los estilos de los eventos cada minuto
    function actualizarEstilosEventos() {
        calendar.refetchEvents(); // Recarga los eventos para forzar la reevaluación de eventClassNames
    }

    // Actualizar estilos cada 60 segundos (1 minuto)
    setInterval(actualizarEstilosEventos, 60000);

});

// ====================================
// FUNCIÓN PARA REFRESCAR EL CALENDARIO
// ====================================
function refrescarCalendario() {
    if (calendar) {
        calendar.refetchEvents();
    }
}