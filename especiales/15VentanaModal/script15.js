$(document).ready(function() {
    // Solo llena el select de unidadMedida
    $.getJSON('../hijo.json', function(data) {
        var $select = $('#unidadMedida');
        $select.empty();
        data.unidades.forEach(function(unidad) {
            $select.append('<option value="' + unidad.codUnidad + '">' + unidad.codUnidad + ' (' + unidad.descripcion + ')</option>');
        });
    });

    $('#abrirModal').click(function() {
        $('#modalBg').show();
        $('#modal').show();
        $('#contenedor').css({'opacity':0.3,'pointer-events':'none'});
    });
    $('#cerrarModal').click(function() {
        $('#modalBg').hide();
        $('#modal').hide();
        $('#contenedor').css({'opacity':1,'pointer-events':'auto'});
    });

    $('#form05').on('submit', function(e) {
        e.preventDefault();
        alert('Formulario enviado (simulado).');
        $('#modalBg').hide();
        $('#modal').hide();
        $('#contenedor').css({'opacity':1,'pointer-events':'auto'});
    });
});
