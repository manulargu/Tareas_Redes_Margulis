$(document).ready(function() {

    $.getJSON('../padre.json', function(dataPadre) {
        if (!dataPadre.ordenesCompra || !dataPadre.ordenesCompra.length) return;
        var claves = Object.keys(dataPadre.ordenesCompra[0]).filter(function(k){ return k !== 'pdfComprobante'; });
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

        $.getJSON('../hijo.json', function(data) {
            var $select = $('#unidadMedida');
            $select.empty();
            data.unidades.forEach(function(unidad) {
                $select.append('<option value="' + unidad.codUnidad + '">' + unidad.codUnidad + ' (' + unidad.descripcion + ')</option>');
            });
        });
    });

    $('#form05').on('submit', function(e) {
        e.preventDefault();
        alert('Formulario enviado (simulado).');
    });
});
