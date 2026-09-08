var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    tabla, nro_registros = 0,
    datos_en_fila = '',
    lc_cargo_id = '';

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function ver_si_existe_fecha_derivado() {
    if ($('#fechainicioderivado').val() == '') {
        $('#fechainicioderivado').val(dia_mes_anio_real_time());
    };
    if ($('#fechafinderivado').val() == '') {
        $('#fechafinderivado').val(dia_mes_anio_real_time());
    };
}

function mostrar_desactivados() {
    ver_si_existe_fecha_derivado();
    var fecha = $('#fechainicioderivado').val(),
        fecha2 = $('#fechafinderivado').val(),
        listar_derivados = {
            "fecha": fecha,
            "fecha2": fecha2
        };
    console.log(listar_derivados);

    $.ajax({
        data: listar_derivados,
        dataType: 'json',
        url: url + 'expediente/recargar_desactivados',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_tablas_derivados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#Nro_resultados").html(".. Procesando... ");
        },
        success: function(datos) {
            $('#mostrar_tablas_derivados').html("");
            if (datos[0].estado_respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length;

                    var lc_estado = datos[key]['estado'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger lista_derivados">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info lista_derivados">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="alert alert-success lista_derivados">';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="alert alert-default lista_derivados">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }



                    datos_en_fila += '<td width="10%">' + datos[key]['expediente_id'] + '</td>';

                    datos_en_fila += '<td>' + datos[key]['numero'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['actor_actuald'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                    datos_en_fila += '<td><button type="button" name="recuperar" id="' + datos[key].expediente + '" class="btn btn-warning  btn_recuperar crear-tooltip" data-toggle="tooltip" data-original-title="Recuperar"> <span class="glyphicon glyphicon-resize-full"></button>';
                    datos_en_fila += '</tr>';
                })
                $('#mostrar_tablas_derivados').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>Encontrados : " + nro_registros + '<br>suspendidos...</strong>');
            } else {
                nro_registros = 0;
                $('#mostrar_tablas_derivados').html("");
                $("#Nro_resultados").html("<strong>Encontrados : " + nro_registros + '<br>suspendidos...</strong>');
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

}

function activar_expediente(lc_leer_expediente) {

    var datos_activar_expe = { 'id': lc_leer_expediente }
    $.ajax({
        data: datos_activar_expe,
        dataType: 'json',
        url: url + 'expediente/activar_expediente',
        type: 'post',
        beforeSend: function() {
            $("#Nro_resultados").html("</strong>--  Procesando...  </strong>");
        },

        success: function(datos) {
            console.log(datos);
            if (datos.registros === 0) {
                mostrar_mensaje_en_modal("alert-danger", 'Expediente : ' + lc_expediente + ' <br><center> -- No fue registrado por usted -- </center>');
            } else {
                $("#Nro_resultados").html("</strong>--  Expediente se encuentra en su bandeja, para ser procesado.....  </strong>");
            }
            mostrar_desactivados();
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



}

$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    mostrar_desactivados();
    $("#nombre_del_mes_en_curso").html("<strong>Todo el mes de : " + nombre_del_mes() + "</strong>");
    $('#fechainicioderivado')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $('#fechafinderivado')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $("#btn_busqueda_total").click(function() {
        mostrar_desactivados();
    });


    $("#mes_transcurrido").click(function() {
        $('#fechainicioderivado').val(primer_dia_mes_anio_real_time());
        $('#fechafinderivado').val(dia_mes_anio_real_time());
        mostrar_desactivados();
    });

    $(document).on('click', '.btn_recuperar', function() {
        var lc_leer_expediente = $(this).attr("id");
        activar_expediente(lc_leer_expediente);

    });











});