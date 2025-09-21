$(document).ready(function() {
    var claves = [
        'idRenglon', 'fecha', 'codigoProducto', 'descripcion', 'cantidad', 'unidadMedida', 'precioUnitario', 'importeRenglon'
    ];
    function cargarDatos() {
        $.getJSON('/Tareas_Redes_Margulis/especiales/padre.json', function(data) {
            if (!data.ordenesCompra || !data.ordenesCompra.length) return;
            var filas = '';
            data.ordenesCompra.forEach(function(item) {
                filas += '<tr>' +
                    claves.map(function(k){ return '<td>' + (item[k] || '') + '</td>'; }).join('') +
                '</tr>';
            });
            $('#tablaArticulos tbody').html(filas);
        });
    }
    $('#cargar').click(function() {
        cargarDatos();
    });
    $('#vaciar').click(function() {
        $('#tablaArticulos tbody').empty();
    });
});
