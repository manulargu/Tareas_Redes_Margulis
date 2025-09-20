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

        var campos = '';
        claves.forEach(function(k) {
            var label = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(s){ return s.toUpperCase(); }).replace('Id Renglon','ID Renglón').replace('Codigo Producto','Código Producto').replace('Unidad Medida','Unidad de Medida').replace('Precio Unitario','Precio Unitario').replace('Importe Renglon','Importe Renglón');
            if (k === 'unidadMedida') {
                campos += '<div><label>' + label + ':</label><select name="unidadMedida" id="unidadMedida" required></select></div>';
            } else if (k === 'fecha') {
                campos += '<div><label>' + label + ':</label><input type="date" name="' + k + '" required></div>';
            } else if (k === 'cantidad' || k === 'precioUnitario' || k === 'importeRenglon') {
                campos += '<div><label>' + label + ':</label><input type="number" step="0.01" name="' + k + '" required></div>';
            } else {
                campos += '<div><label>' + label + ':</label><input name="' + k + '" required></div>';
            }
        });
        $('.grilla').html(campos);
        $('#cargar').prop('disabled', false); // Habilita el botón cuando ya están las claves y el form
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
        $('#modalBg').hide();
        $('#modal').hide();
        $('#contenedor').css({'opacity':1,'pointer-events':'auto'});
    });
});
