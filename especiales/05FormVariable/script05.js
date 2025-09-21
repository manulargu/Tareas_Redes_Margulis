$(document).ready(function() {

    // Solo llena el select de unidadMedida
    $.getJSON('../hijo.json', function(data) {
        var $select = $('#unidadMedida');
        $select.empty();
        data.unidades.forEach(function(unidad) {
            $select.append('<option value="' + unidad.codUnidad + '">' + unidad.codUnidad + ' (' + unidad.descripcion + ')</option>');
        });
    });

    $('#form05').on('submit', function(e) {
        e.preventDefault();
        alert('Formulario enviado (simulado).');
    });
});
