var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    leer_id_td = "",
    lc_id_td = "",
    leer_descripcion = "";

function ver_tipo_documento() {
    var etiqueta_tipo_documento = $("#slt_tipo_documento");
    $.ajax({
        dataType: 'json',
        url: url + 'consultas/tipo_documento',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            etiqueta_tipo_documento
                .html('')
                .show()
                .append('<option id=0>Busqueda por Tipo documento</option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    etiqueta_tipo_documento.append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    etiqueta_tipo_documento.attr("disabled", true);
                }
            });
        }
    });
}

function leer_tipo_documento() {
    leer_id_td = $('#slt_tipo_documento  option:selected').attr('id');
    leer_descripcion = $('#slt_unidad_organica  option:selected').attr('descripcion');
}

function buscar_expe(lc_fecha_inicio, lc_fecha_fin, lc_nro_expediente, lc_remitente, lc_asunto, lc_nro_doc, lc_id_td) {
    var lc_espera = $("#espera_busqueda"),
        datos_consulta = {
            "inicio": lc_fecha_inicio,
            "fin": lc_fecha_fin,
            "nro_expediente": lc_nro_expediente,
            "remitente": lc_remitente,
            "asunto": lc_asunto,
            "nro_doc": lc_nro_doc,
            "tipo_doc": lc_id_td
        };
    $.ajax({
        data: datos_consulta,
        dataType: 'json',
        url: url + 'consultas/consultar_expediente',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            lc_espera.html("");
            $('#tabla-contenido').html("");
            var datos_en_fila = '';
            $.each(datos, function(key, value) {
                datos_en_fila += '<tr>';
                datos_en_fila += '<td width="1%"><button type="button" name="imprimir" id="' + datos[key].expediente + '-' + datos[key].ocurrencia + '-' + datos[key].actor_de + '" class="btn btn-warning  btn_imprimir_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Imprimir expediente" data-toggle="tooltip">I</button>';
                datos_en_fila += '<td>' + datos[key]['expediente'] + '</td>';
                datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-info  btn_ver_ocurrencias" >' + datos[key]['ocurrencia'] + '</button>' + '</td>';
                datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                datos_en_fila += '<td width="2%">' + datos[key]['nombre'] + '</td>';
                datos_en_fila += '<td width="2%">' + datos[key]['asunto'] + '</td>';
                datos_en_fila += '<td>' + datos[key]['documento'] + '</td>';
                datos_en_fila += '<td>' + datos[key]['nro_documento'] + '</td>';
                datos_en_fila += '<td>' + datos[key]['condicion_estado'] + '</td>';
                datos_en_fila += '</tr>';
            });
            $('#tabla-contenido').append(datos_en_fila);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}

function cabecera_ocurrencia() {
    datos_cabecera_ocurrencia = '';
    datos_cabecera_ocurrencia = '<th>Ocurrencia</th><th>Fecha</th><th>Remitente</th><th>Destino</th><th>Cargo</th><th>Usuario</th>';
    $("#titulos_de_celda_ocurrencia").html(datos_cabecera_ocurrencia);
}



function ver_numero_ocurrencias(lc_expediente) {
    $('#VerOcurrencias').modal({ show: true, backdrop: 'static' });
    var lc_select_tabla_ocurrencia = $("#mostrar_tablas_ocurrencia"),
        lc_espera_ocurrencia = $("#mostrar_idexpediente_ocurrencias"),
        ver_expe = {
            "expe": lc_expediente
        };
    $.ajax({
        data: ver_expe,
        dataType: 'json',
        url: url + 'expediente/ver_ocurrencias',
        type: 'post',
        beforeSend: function() {
            lc_select_tabla_ocurrencia.html("");
            lc_espera_ocurrencia.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            lc_select_tabla_ocurrencia.html("");
            if (datos[0].respuesta == 1) {
                nro_registros_oc = datos.length;
                datos_en_fila_concurrencia = '';
                $.each(datos, function(key, value) {
                    cabecera_ocurrencia();
                    datos_en_fila_concurrencia += '<tr">';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['numero'] + '</td>';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['actor_1_descripcion'] + '</td>';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['actor_2_descripcion'] + '</td>';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['fecha_cargo'] + '</td>';
                    datos_en_fila_concurrencia += '<td>' + datos[key]['cargo_usuario'] + '</td>';
                    datos_en_fila_concurrencia += '</tr>';
                });
                lc_select_tabla_ocurrencia.append(datos_en_fila_concurrencia);
                lc_espera_ocurrencia.html("<center><strong>--  Expediente  : " + lc_expediente + ' </strong></center>');
            } else {
                nro_registros_oc = 0;
                lc_select_tabla_ocurrencia.html("");
                lc_espera_ocurrencia.html("<center><strong>--  Expediente  : " + lc_expediente + ' </strong></center>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

};




$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    ver_tipo_documento();

    $('#fechainicio')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $('#fechafin')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $("#slt_tipo_documento")
        .click(function() {
            leer_tipo_documento();
        })
        .keyup(function() {
            leer_tipo_documento();
        });

    $("#btn_buscar").click(function() {
        var lc_fecha_inicio = (($('#fechainicio').val() == null) ? "" : $('#fechainicio').val()),
            lc_fecha_fin = (($('#fechafin').val() == null) ? "" : $('#fechafin').val()),
            lc_nro_expediente = (($('#nro_expediente').val() == null) ? "" : $('#nro_expediente').val()),
            lc_remitente = (($('#remitente').val() == null) ? "" : $('#remitente').val()),
            lc_asunto = (($('#asunto').val() == null) ? "" : $('#asunto').val()),
            lc_nro_doc = (($('#nro_documento').val() == null) ? "" : $('#nro_documento').val()),
            leer_id_td = $('#slt_tipo_documento  option:selected').attr('id') == null ? "" : $('#slt_tipo_documento  option:selected').attr('id'),
            lc_query = "";
        switch (leer_id_td) {
            case '0':
                lc_id_td = "";
                break;
            case '00':
                lc_id_td = "";
                break;
            default:
                lc_id_td = leer_id_td;
                break;
        }
        buscar_expe(lc_fecha_inicio, lc_fecha_fin, lc_nro_expediente, lc_remitente, lc_asunto, lc_nro_doc, lc_id_td);
    });

    $("#btn_limpiar").click(function() {
        $('#fechainicio').val("");
        $('#fechafin').val("");
        $('#nro_expediente').val("");
        $('#remitente').val("");
        $('#asunto').val("");
        $('#nro_documento').val("");
        $('#tabla-contenido').html("");
        ver_tipo_documento();

    });

    $(document).on('click', '.btn_ver_ocurrencias', function() {
        var lc_expediente = $(this).attr("id");
        ver_numero_ocurrencias(lc_expediente);
    });


    $(document).on('click', '.btn_imprimir_expediente', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 11),
            lc_numero = lc_leer_compuesto.substring(12);
        window.open(url + 'imprimir/impresion_hoja_de_tramite?min=' + lc_expediente + '&max=' + lc_expediente);
    });




});