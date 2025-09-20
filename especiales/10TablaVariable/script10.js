$(document).ready(function() {
    var claves = [];
    $('#cargar').prop('disabled', true); // Deshabilita el botón hasta que se cargue el JSON
        $.getJSON('../padre.json', function(data) {
        if (!data.ordenesCompra || !data.ordenesCompra.length) return;
        claves = Object.keys(data.ordenesCompra[0]).filter(function(k){ return k !== 'pdfComprobante'; });
        var ths = claves.map(function(k){
            return '<th>' + k.replace(/([A-Z])/g, ' $1').replace(/^./, function(s){ return s.toUpperCase(); }).replace('Id Renglon','ID Renglón').replace('Codigo Producto','Código Producto').replace('Unidad Medida','Unidad Medida').replace('Precio Unitario','Precio Unitario').replace('Importe Renglon','Importe Renglón') + '</th>';
        }).join('');
        $('#tablaArticulos thead').html('<tr>' + ths + '</tr>');
        $('#cargar').prop('disabled', false); // Habilita el botón cuando ya están las claves
    });

    function cargarDatos() {
        $.getJSON('../padre.json', function(data) {
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
