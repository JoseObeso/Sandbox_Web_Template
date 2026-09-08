var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    url_pdf = 'http://' + document.domain + '/tramite/public/pdf',
    tabla, nro_registros = 0,
    datos_en_fila = '',
    datos_cabecera = '',
    datos_cabecera_ocurrencia = '',
    datos_en_fila_concurrencia = '',
    lc_cargo_id = '',
    leer_expediente = '',
    lc_trc = 'T',
    lc_codigo_tramite_sesion = '',
    lc_tipo_operacion = '',
    lc_valor_todo_mes = '0',
    nro_registros_oc = '',
    nro_expedientes = 0;

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function ver_si_existe_fecha_tramite() {
    if ($('#fechainiciotramite').val() == '') {
        $('#fechainiciotramite').val(dia_mes_anio_real_time());
    };
    if ($('#fechafintramite').val() == '') {
        $('#fechafintramite').val(dia_mes_anio_real_time());
    };
}

function ver_si_existe_fecha_reporte() {
    if ($('#fechainicioReporte').val() == '') {
        $('#fechainicioReporte').val(dia_mes_anio_real_time());
    };
    if ($('#fechafinReporte').val() == '') {
        $('#fechafinReporte').val(dia_mes_anio_real_time());
    };
}

function ver_fecha_derivacion() {
    if ($('#fecha_expediente_derivacion').val() == '') {
        $("#fecha_expediente_derivacion").val(dia_mes_anio_real_time());
    };
    if ($('#hora_expediente_derivacion').val() == '') {
        $("#hora_expediente_derivacion").val(mostrar_hora());
    };
}

function ver_fecha_derivacion_edicion() {
    if ($('#fecha_expediente_derivacion_update').val() == '') {
        $("#fecha_expediente_derivacion_update").val(dia_mes_anio_real_time());
    };
    if ($('#hora_expediente_derivacion_update').val() == '') {
        $("#hora_expediente_derivacion_update").val(mostrar_hora());
    };
}

function mostrar_hora() {
    var fecha = new Date(Date.now()),
        lc_hora_minuto_segundo_real_time = (('' + fecha.getHours()).length < 2 ? '0' : '') + fecha.getHours() + ':' + (('' + fecha.getMinutes()).length < 2 ? '0' : '') + fecha.getMinutes();
    return lc_hora_minuto_segundo_real_time;
}

function cabecera_tramite() {
    datos_cabecera = '';
    datos_cabecera = '<th>Sel</th><th>Expediente</th><th>Fecha</th><th>Hora</th><th>Ocurr.</th><th>Remite</th><th>Asunto</th><th>CargoFecha</th><th>CargoUsuario</th><th>Observaciones</th><th>Adjunto</th>';
    $("#titulos_de_celda").html(datos_cabecera);
}

function cabecera_recepcion() {
    datos_cabecera = '';
    datos_cabecera = '<th>Sel</th><th>Expediente</th><th>Fecha Doc.</th><th>Recepcion</th><th>Hora</th><th>Ocurr.</th><th>Remite</th><th>Asunto</th><th>Comentario</th><th>Observaciones</th><th>Adjunto</th>';
    $("#titulos_de_celda").html(datos_cabecera);
}

function cabecera_deriva() {
    datos_cabecera = '';
    datos_cabecera = '<th>Sel</th><th>Expediente</th><th>Fecha</th><th>Hora</th><th>Ocurr.</th><th>Remite</th><th>Asunto</th><th>Actor Actual</th><th>Observaciones</th><th>Adjunto</th><th>Acciones</th>';
    $("#titulos_de_celda").html(datos_cabecera);
}

function cabecera_culminado() {
    datos_cabecera = '';
    datos_cabecera = '<th>Sel</th><th>Expediente</th><th>Fec.Culm.</th><th>Hora</th><th>Ocurr.</th><th>Remite</th><th>Asunto</th><th>Comentario</th><th>Acciones</th><th>Observaciones</th><th>Adjunto</th>';
    $("#titulos_de_celda").html(datos_cabecera);
}


function cabecera_ocurrencia() {
    datos_cabecera_ocurrencia = '';
    datos_cabecera_ocurrencia = '<th>Ocurrencia</th><th>Fecha</th><th>Remitente</th><th>Destino</th><th>Cargo</th><th>Usuario</th>';
    $("#titulos_de_celda_ocurrencia").html(datos_cabecera_ocurrencia);
}



function actualizar_expedientes_ocurrencia() {
    $.ajax({
        dataType: 'json',
        url: url + 'expediente/actualizar_ocurrencias_expedientes',
        type: 'post',
        beforeSend: function() {
            $("#Nro_resultados").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#Nro_resultados").html("");
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

function toggle(source) {
    checkboxes = document.getElementsByName('dinamico');

    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }

}



function mostrar_tramite_recepcion_culminados(lc_trc) {
    ver_si_existe_fecha_tramite();
    var lc_select_tabla = $("#mostrar_tablas_tramite"),
        lc_espera = $("#Nro_resultados"),
        fecha = $('#fechainiciotramite').val(),
        fecha2 = $('#fechafintramite').val(),
        lc_tipo_tramite = lc_trc
    listar_tramite = {
        "fecha": fecha,
        "fecha2": fecha2,
        "tipo_tramite": lc_tipo_tramite,
    };
    $.ajax({
        data: listar_tramite,
        dataType: 'json',
        url: url + 'expediente/recargar_tramite',
        type: 'post',
        beforeSend: function() {
            lc_select_tabla.html("");
            lc_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            lc_select_tabla.html("");
            if (datos[0].estado_respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length,
                        lc_compuesto_expediente = datos[key]['expediente'] + '-' + datos[key]['numero'] + '-' + datos[key]['actor_a'],
                        lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="success">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + lc_compuesto_expediente + '" class="px cuental"><span class="lbl"></span></label></td>';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="danger text-danger">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="default">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    switch (lc_tipo_tramite) {
                        case 'T':
                            cabecera_tramite();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_usuario'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td width="5%"><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'R':
                            cabecera_recepcion();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_recepcion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'D':
                            cabecera_deriva();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['actor_abreviaturaa'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            datos_en_fila += '<td td width="10%"><button type="button" name="imprimir" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-danger  btn_imprimir_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Imprimir expediente" data-toggle="tooltip">I</button>';
                            datos_en_fila += '<button type="button" name="recuperar" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_recuperar  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar expediente" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<button type="button" name="editar" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-primary  btn_editar_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Editar expediente" data-toggle="tooltip">E</button>';
                            datos_en_fila += '<button type="button" name="adjunto" id="' + datos[key].expediente + '" class="btn btn-success btn_adjunto crear-tooltip" data-toggle="tooltip" data-original-title="Adjunto">A</button></td>';
                            break;

                        case 'C':
                            cabecera_culminado();
                            datos_en_fila += '<td>' + datos[key]['fecha_culminacion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button" name="anular_culminacion" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_anular_culminacion  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar anulacion" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;
                        default:
                            break;
                    }
                    datos_en_fila += '</tr>';
                });
                lc_select_tabla.append(datos_en_fila);
                lc_espera.html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>');


            } else {
                nro_registros = 0;
                lc_select_tabla.html("");
                lc_espera.html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>');
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
    $("#btn_selec:checkbox:checked").removeAttr("checked");

}


function mostrar_tramite_recepcion_culminados_otd(lc_trc) {
    ver_si_existe_fecha_tramite();
    var lc_select_tabla = $("#mostrar_tablas_tramite"),
        lc_espera = $("#Nro_resultados"),
        fecha = $('#fechainiciotramite').val(),
        fecha2 = $('#fechafintramite').val(),
        lc_tipo_tramite = lc_trc
    listar_tramite = {
        "fecha": fecha,
        "fecha2": fecha2,
        "tipo_tramite": lc_tipo_tramite,
    };
    $.ajax({
        data: listar_tramite,
        dataType: 'json',
        url: url + 'expediente/recargar_tramite_otd',
        type: 'post',
        beforeSend: function() {
            lc_select_tabla.html("");
            lc_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            lc_select_tabla.html("");
            if (datos[0].estado_respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length,
                        lc_compuesto_expediente = datos[key]['expediente'] + '-' + datos[key]['numero'] + '-' + datos[key]['actor_a'],
                        lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="success">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + lc_compuesto_expediente + '" class="px cuental"><span class="lbl"></span></label></td>';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="danger text-danger">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="default">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    switch (lc_tipo_tramite) {
                        case 'T':
                            cabecera_tramite();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_usuario'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td width="5%"><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'R':
                            cabecera_recepcion();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_recepcion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'D':
                            cabecera_deriva();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['actor_abreviaturaa'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            datos_en_fila += '<td td width="10%"><button type="button" name="imprimir" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-danger  btn_imprimir_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Imprimir expediente" data-toggle="tooltip">I</button>';
                            datos_en_fila += '<button type="button" name="recuperar" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_recuperar  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar expediente" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<button type="button" name="editar" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-primary  btn_editar_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Editar expediente" data-toggle="tooltip">E</button>';
                            datos_en_fila += '<button type="button" name="adjunto" id="' + datos[key].expediente + '" class="btn btn-success btn_adjunto crear-tooltip" data-toggle="tooltip" data-original-title="Adjunto">A</button></td>';
                            break;

                        case 'C':
                            cabecera_culminado();
                            datos_en_fila += '<td>' + datos[key]['fecha_culminacion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button" name="anular_culminacion" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_anular_culminacion  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar anulacion" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;
                        default:
                            break;
                    }
                    datos_en_fila += '</tr>';
                });
                lc_select_tabla.append(datos_en_fila);
                lc_espera.html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>');


            } else {
                nro_registros = 0;
                lc_select_tabla.html("");
                lc_espera.html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>');
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



function mostrar_tramite_recepcion_culminados_interno(lc_trc) {

    ver_si_existe_fecha_tramite();
    var lc_select_tabla = $("#mostrar_tablas_tramite"),
        lc_espera = $("#Nro_resultados"),
        fecha = $('#fechainiciotramite').val(),
        fecha2 = $('#fechafintramite').val(),
        lc_tipo_tramite = lc_trc
    listar_tramite = {
        "fecha": fecha,
        "fecha2": fecha2,
        "tipo_tramite": lc_tipo_tramite,
    };
    $.ajax({
        data: listar_tramite,
        dataType: 'json',
        url: url + 'expediente/recargar_tramite_interno',
        type: 'post',
        beforeSend: function() {
            lc_select_tabla.html("");
            lc_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            lc_select_tabla.html("");
            if (datos[0].estado_respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length,
                        lc_compuesto_expediente = datos[key]['expediente'] + '-' + datos[key]['numero'] + '-' + datos[key]['actor_a'],
                        lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="success">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + lc_compuesto_expediente + '" class="px cuental"><span class="lbl"></span></label></td>';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="danger text-danger">';
                            datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="default">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    switch (lc_tipo_tramite) {
                        case 'T':
                            cabecera_tramite();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['cargo_usuario'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td width="5%"><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'R':
                            cabecera_recepcion();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['recepcion_hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_recepcion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;

                        case 'D':
                            cabecera_deriva();
                            datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['actor_abreviaturaa'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            datos_en_fila += '<td td width="10%"><button type="button" name="imprimir" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-danger  btn_imprimir_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Imprimir expediente" data-toggle="tooltip">I</button>';
                            datos_en_fila += '<button type="button" name="recuperar" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_recuperar  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar expediente" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<button type="button" name="editar" id="' + datos[key].expediente + '-' + datos[key].numero + '-' + datos[key].actor_de + '" class="btn btn-primary  btn_editar_expediente  crear-tooltip" data-toggle="tooltip" data-original-title="Editar expediente" data-toggle="tooltip">E</button>';
                            datos_en_fila += '<button type="button" name="adjunto" id="' + datos[key].expediente + '" class="btn btn-success btn_adjunto crear-tooltip" data-toggle="tooltip" data-original-title="Adjunto">A</button></td>';
                            break;

                        case 'C':
                            cabecera_culminado();
                            datos_en_fila += '<td>' + datos[key]['fecha_culminacion'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['hora_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button"  id="' + datos[key].expediente + '" class="btn btn-default  btn_ver_ocurrencias" >' + datos[key]['numero'] + '</button>' + '</td>';
                            datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                            datos_en_fila += '<td>' + datos[key]['comentario_culminacion'] + '</td>';
                            datos_en_fila += '<td><button type="button" name="anular_culminacion" id="' + datos[key].expediente + '-' + datos[key].numero + '" class="btn btn-info  btn_anular_culminacion  crear-tooltip" data-placement="bottom" data-toggle="tooltip" data-original-title="Recuperar anulacion" data-toggle="tooltip">R</button>';
                            datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                            datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                            break;
                        default:
                            break;
                    }
                    datos_en_fila += '</tr>';
                });
                lc_select_tabla.append(datos_en_fila);
                lc_espera.html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>');


            } else {
                nro_registros = 0;
                lc_select_tabla.html("");
                lc_espera.html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>');
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

function grabar_expediente_en_recepcion(lc_expediente, lc_numero) {
    ver_si_existe_fecha_tramite();
    var fecha = $('#fechafintramite').val(),
        lc_comentario = $('#comentario').val(),
        expediente_grabar = { "fecha": fecha, "id": lc_expediente, "nro": lc_numero, "comentario": lc_comentario };
    $.ajax({
        data: expediente_grabar,
        dataType: 'json',
        url: url + 'expediente/grabar_recepcion',
        type: 'post',
        beforeSend: function() {},
        success: function() {},
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


function proceder_a_derivar_documento(lc_leer_expediente, lc_ocurrencia, lc_actor_a, lc_tipo_operacion, nro_seleccion) {
    ver_fecha_derivacion();
    if (nro_seleccion == 1) {
        $("#Titulo_expediente").text("Derivar expediente Nro. : " + lc_leer_expediente);
        $("#nro_expedientes").val(nro_seleccion);
        $("#id_actor_origen").val(lc_actor_a);
        $("#id_expediente").val(lc_leer_expediente);
        $("#expediente_ocurrencia").val(lc_ocurrencia);
        ver_nro_documento(lc_leer_expediente);
    } else {
        $("#Titulo_expediente").text("-- Derivar : " + nro_seleccion + " Expedientes --");
        $("#nro_expedientes").val(nro_seleccion);
        $("#id_actor_origen").val(lc_actor_a);
        $("#id_expediente").val('');
        $("#expediente_ocurrencia").val('');
        $("#txt_nrodocumento").val('').attr("disabled", true);
    }
    $("#fecha_expediente_derivacion").val(dia_mes_anio_real_time());
    $("#hora_expediente_derivacion").val(mostrar_hora());
    $("#txt_prioridad").val('').attr("disabled", true);
    $("#txt_accion1").val('').attr("disabled", true);
    $("#txt_accion2").val('').attr("disabled", true);
    $("#txt_observacion").val('').attr("disabled", true);
    $("#txt_doc_adj1").val('').attr("disabled", true);
    $("#txt_doc_adj2").val('').attr("disabled", true);
    $("#btn_cc").attr("disabled", true);
    $("#id_tipo_operacion").val(lc_tipo_operacion);
    $("#btn_grabar_derivar").attr("disabled", true);
    $("#seleccion_actor").html("").attr("disabled", true);
    $("#Eliminar_seleccion").attr("disabled", true);
    $("#msj_actor_existe").html("");
    $("#slt_con_copia_actores").html("").attr("disabled", true);
    $("#txt_remitente").val('').attr("disabled", false).focus();
    $('#md_derivar').modal({ show: true, backdrop: 'static' });
}

function ver_nro_documento(lc_leer_expediente) {
    $.ajax({
        data: { 'id': lc_leer_expediente },
        dataType: 'json',
        url: url + 'expediente/ver_nro_documento',
        type: 'post',
        beforeSend: function() {
            $("#espera_nro_documento").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            $("#espera_nro_documento").html("");
            $("#txt_nrodocumento").val('').val(datos[0].nro_documento);
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

function listar_actor_tipo_0103() {
    var etiqueta_select = $("#slt_actor_01"),
        etiqueta_espera = $("#msj_espera"),
        no_actor = $("#id_actor_origen").val(),
        listar_todos_actor = {
            "no_actor": no_actor
        };
    $.ajax({
        data: listar_todos_actor,
        dataType: 'json',
        url: url + 'tablas/listar_todos_los_actores_tipo_0103',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            etiqueta_select.html("").attr("disabled", false);
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                etiqueta_espera.html("");
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        etiqueta_select.append(
                            '<option id="' + filas.actor +
                            '"  actor = "' + filas.actor +
                            '" descripcion = "' + filas.descripcion +
                            '" abreviatura = "' + filas.abreviatura +
                            '" responsable = "' + filas.responsable +
                            '" area_de_actor = "' + filas.area_de_actor +
                            '" tramite = "' + filas.tramite +
                            '" tipo_actor = "' + filas.tipo_actor +
                            '" codigo = "' + filas.codigo +
                            '" direccion = "' + filas.direccion +
                            '" telefono = "' + filas.telefono +
                            '" ruc = "' + filas.ruc +
                            '" actor_descripcion = "' + filas.actor_descripcion +
                            '"  >' + filas.actor_descripcion + '</option>').attr("disabled", false);
                    } else {
                        etiqueta_select.attr("disabled", false);
                    }
                });

            } else {
                etiqueta_select.html("");
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


    etiqueta_select.select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function(term) {
            var cont = $("<div />");
            var link = $("<a />", {
                "class": "test1",
                "data-title": term,
                text: "de '" + term + "'"
            });
            cont.append(link.clone());
            var html = cont.html();
            return "<span>No hay resultados - </span> " + (term.length > 0 ? html : "");
        }
    });

}


function leer_actor_mostrarlo_etiqueta() {
    $("#msj_actor_existe").html("");
    var ln_expedientes = $("#nro_expedientes").val();
    var leer_idactor = $('#slt_actor_01  option:selected').attr('id'),
        leer_expediente = $('#id_expediente').val(),
        lc_ver_si_selecciono = (typeof leer_idactor === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono === '1') {
        var leer_idactor = $('#slt_actor_01  option:selected').attr('id');
        if (ln_expedientes === '1') {
            grabar_actor_cc(leer_idactor, leer_expediente, ln_expedientes);
        } else {
            $("input:checkbox:checked").each(function() {
                var lc_leer_compuesto = $(this).val(),
                    leer_expediente = lc_leer_compuesto.substring(0, 11),
                    lc_ocurrencia = lc_leer_compuesto.substring(12, 14),
                    lc_actor_a = lc_leer_compuesto.substring(15);
                grabar_actor_cc(leer_idactor, leer_expediente, ln_expedientes);
            });
        }
    } else {};
    $('#Eliminar_seleccion').attr("disabled", true);
}

function grabar_actor_cc(leer_idactor, leer_expediente, ln_expedientes) {
    var etiqueta_espera = $("#espera_grabacion")

    $.ajax({
        data: { "actor": leer_idactor, 'id': leer_expediente, 'nro_expe': ln_expedientes },
        dataType: 'json',
        url: url + 'expediente/grabar_actor_cc',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            etiqueta_espera.html("");

            if (ln_expedientes === 1) {
                if (datos.registros === -1) {
                    actualizar_actores_en_cc(leer_expediente, ln_expedientes);
                    $("#msj_actor_existe").html("");
                } else {
                    $("#msj_actor_existe").html("Actor ya existe...").show();
                }
            } else {
                actualizar_actores_en_cc(leer_expediente, ln_expedientes);
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


function actualizar_actores_en_cc(leer_expediente, ln_expedientes) {
    var etiqueta_select = $("#slt_con_copia_actores"),
        etiqueta_espera = $("#espera_grabacion"),
        listar_todos_actor = {
            'id': leer_expediente,
            'nro_expe': ln_expedientes
        };
    $.ajax({
        data: listar_todos_actor,
        dataType: 'json',
        url: url + 'expediente/mostrar_actor_cc',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            etiqueta_select.html("").attr("disabled", false);
            nro_registros = encontrados.length;

            if (nro_registros > 0) {
                etiqueta_espera.html("");
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        etiqueta_select.append(
                            '<option id="' + filas.actor +
                            '"  actor = "' + filas.actor +
                            '"  expediente = "' + filas.expediente +
                            '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.actor + ' - ' + filas.descripcion + '</option>').attr("disabled", false);
                    } else {
                        etiqueta_select.attr("disabled", false);
                    }
                });
                $("#msj_actor_existe").html(nro_registros + " Copias");

            } else {
                etiqueta_select.html("");
                $("#msj_actor_existe").html("");
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

function leer_copia_actores_y_mostrarlo() {
    var leer_idactor = $('#slt_con_copia_actores  option:selected').attr('id'),
        lc_ver_si_selecciono = (typeof leer_idactor === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono === '1') {
        var leer_idactor = $('#slt_con_copia_actores  option:selected').attr('id'),
            leer_descripcion = $('#slt_con_copia_actores  option:selected').attr('descripcion'),
            leer_expediente = $('#slt_con_copia_actores  option:selected').attr('expediente');
        $('#seleccion_actor').html("<strong> Expediente : </strong>" + leer_expediente + '  <br>' + leer_descripcion);
        $('#Eliminar_seleccion').attr("disabled", false);
    } else {
        $('#Eliminar_seleccion').attr("disabled", true);
    };
}


function eliminar_actor_de_cc(leer_idactor, lc_expediente) {

    $.ajax({
        data: { 'actor': leer_idactor, 'expediente': lc_expediente },
        dataType: 'json',
        url: url + 'expediente/eliminar_actor_cc',
        type: 'post',
        beforeSend: function() {
            $('#espera_grabacion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $('#espera_grabacion').html("");
            $('#seleccion_actor').html("");
            $("#Eliminar_seleccion").attr("disabled", true);

            actualizar_actores_en_cc(leer_expediente)

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

function proceder_a_grabar_documento_derivado() {
    ver_fecha_derivacion();
    var lc_leer_expediente = $("#id_expediente").val(),
        lc_tipo_operacion = $("#id_tipo_operacion").val(),
        lc_fecha_expediente = $("#fecha_expediente_derivacion").val(),
        lc_hora_derivacion = $("#hora_expediente_derivacion").val(),
        lc_actor_destino = $("#txt_idactor").val(),
        lc_tipo_accion1 = $("#txt_tipo_accion1").val(),
        lc_tipo_accion2 = $("#txt_tipo_accion2").val(),
        lc_prioridad = $("#txt_idprioridad").val(),
        lc_nro_documento = $("#txt_nrodocumento").val(),
        lc_doc_adj1 = $("#txt_doc_adj1").val(),
        lc_doc_adj2 = $("#txt_doc_adj2").val(),
        lc_observacion = $("#txt_observacion").val(),
        datos_para_grabar_derivacion = {
            "expediente": lc_leer_expediente,
            "tipo_operacion": lc_tipo_operacion,
            "fecha": lc_fecha_expediente,
            "hora": lc_hora_derivacion,
            "actor_destino": lc_actor_destino,
            "accion1": lc_tipo_accion1,
            "accion2": lc_tipo_accion2,
            "prioridad": lc_prioridad,
            "nro_doc": lc_nro_documento,
            "doc_adj1": lc_doc_adj1,
            "doc_adj2": lc_doc_adj2,
            "observacion": lc_observacion
        }
    $.ajax({
        data: datos_para_grabar_derivacion,
        dataType: 'json',
        url: url + 'expediente/derivar_nuevo_expediente',
        type: 'post',
        beforeSend: function() {
            $('#espera_grabacion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {

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


function proceder_a_grabar_documento_derivado_en_bloque(lc_leer_expediente, lc_ocurrencia, lc_actor_a) {
    ver_fecha_derivacion();
    var lc_leer_expediente = lc_leer_expediente,
        lc_fecha_expediente = $("#fecha_expediente_derivacion").val(),
        lc_hora_derivacion = $("#hora_expediente_derivacion").val(),
        lc_actor_destino = $("#txt_idactor").val(),
        lc_tipo_accion1 = $("#txt_tipo_accion1").val(),
        lc_tipo_accion2 = $("#txt_tipo_accion2").val(),
        lc_prioridad = $("#txt_idprioridad").val(),
        lc_observacion = $("#txt_observacion").val(),
        lc_doc_adj1 = $("#txt_doc_adj1").val(),
        lc_doc_adj2 = $("#txt_doc_adj2").val(),
        datos_para_grabar_derivacion = {
            "expediente": lc_leer_expediente,
            "tipo_operacion": '1',
            "fecha": lc_fecha_expediente,
            "hora": lc_hora_derivacion,
            "actor_destino": lc_actor_destino,
            "accion1": lc_tipo_accion1,
            "accion2": lc_tipo_accion2,
            "prioridad": lc_prioridad,
            "observacion": lc_observacion,
            "doc_adj1": lc_doc_adj1,
            "doc_adj2": lc_doc_adj2
        }
    $.ajax({
        data: datos_para_grabar_derivacion,
        dataType: 'json',
        url: url + 'expediente/derivar_nuevo_expediente_bloque',
        type: 'post',
        beforeSend: function() {
            $('#espera_grabacion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {

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




function recuperar_expediente_estado(lc_expediente, lc_numero) {
    var expe_recuperado = { 'id': lc_expediente, 'nro': lc_numero }
    $.ajax({
        data: expe_recuperado,
        dataType: 'json',
        url: url + 'expediente/recuperar_derivado_emitido',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $("#tramite")
                .prop("checked", false);
            $("#recepcion")
                .prop("checked", false);
            $("#derivar")
                .prop("checked", true);
            $("#culminado")
                .prop("checked", false);
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

function proceder_editar_expediente_derivado(lc_expediente, lc_numero, lc_actor_de) {
    var lc_indicadorunidad = lc_expediente.substring(4, 2);
    $('#md_derivar_update').modal({ show: true, backdrop: 'static' });
    $("#txt_asunto_update").val('');
    $("#msg_expediente_update").text("");
    $("#id_actor_origen_update").val(lc_actor_de);
    $("#id_expediente_update").val(lc_expediente);
    $("#id_tipo_operacion_update").val(2);
    $("#id_nro_expediente").val(lc_numero);
    var lc_id_codigo_tramite = $("#id_codigo_tramite").val();
    $("#fecha_expediente_derivacion_update")
        .val('')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $("#hora_expediente_derivacion_update").val('');
    $("#espera_carga_edicion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
    $.ajax({
        data: { "id": lc_expediente, "nro": lc_numero },
        dataType: 'json',
        url: url + 'expediente/recuperar_expediente_editar',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            $("#espera_carga_edicion").html("");
            $("#fecha_expediente_derivacion_update").val(encontrados[0].fecha);
            $("#hora_expediente_derivacion_update").val(encontrados[0].hora);
            $("#Titulo_expediente_update").text(" Editar Expediente : " + encontrados[0].expediente_id);
            $("#txt_remitente_update").val(encontrados[0].actor_a + '-' + encontrados[0].actor_abreviatura).attr("disabled", false);
            $("#txt_idactor_update").val(encontrados[0].actor_a);
            $("#txt_nombre_remitente_update").val(encontrados[0].actor_abreviatura);
            $("#txt_prioridad_update").val(encontrados[0].prioridad + '[ ' + encontrados[0].prioridad_nombre + ' ]').attr("disabled", false);
            $("#txt_idprioridad_update").val(encontrados[0].prioridad);
            $("#txt_accion1_update").val(encontrados[0].id_accion1 + '[ ' + encontrados[0].descripcion_accion1 + ' ]').attr("disabled", false);
            $("#txt_tipo_accion1_update").val(encontrados[0].id_accion1);
            $("#txt_accion2_update").val(encontrados[0].id_accion2 + '[ ' + encontrados[0].descripcion_accion2 + ' ]').attr("disabled", false);
            $("#txt_tipo_accion2_update").val(encontrados[0].id_accion2);
            $("#txt_nrodocumento_update").val(encontrados[0].nro_documento_detalle).attr("disabled", true);
            $("#txt_observacion_update").val(encontrados[0].observaciones).attr("disabled", false);
            switch (lc_id_codigo_tramite) {
                case lc_id_codigo_tramite == 'TD':
                    $("#txt_asunto_update").val(encontrados[0].asunto).attr("disabled", true);
                    $("#msg_expediente_update").text(" -- Expediente de OTD no puede editar el asunto --- ");

                case lc_id_codigo_tramite = lc_indicadorunidad:
                    $("#txt_asunto_update").val(encontrados[0].asunto).attr("disabled", false);
                    $("#txt_nrodocumento_update").val(encontrados[0].nro_documento_detalle).attr("disabled", false);
                    $("#msg_expediente_update").text(" - Expediente con Asunto editable, porque su codigo de expediente es : " + lc_codigo_tramite_sesion);
                    break;
                default:
                    $("#txt_asunto_update").val(encontrados[0].asunto).attr("disabled", true);
                    $("#msg_expediente_update").html("<strong>Asunto y Nro Documento No Editable, porque su codigo de Expediente es : " + lc_codigo_tramite_sesion + ", y el Expediente seleccionado es : " + lc_id_codigo_tramite + "</strong>");
                    break;
            }
            $("#btn_grabar_derivar_update").attr("disabled", false);
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



function grabar_edicion_expediente_derivado() {
    ver_fecha_derivacion_edicion();
    var lc_fecha_expediente = $('#fecha_expediente_derivacion_update').val(),
        lc_expediente_editar = $('#id_expediente_update').val(),
        lc_nro_expediente = $("#id_nro_expediente").val(),
        lc_hora_expediente = $('#hora_expediente_derivacion_update').val(),
        lc_idactor_destino = $("#txt_idactor_update").val(),
        lc_idprioridad = $("#txt_idprioridad_update").val(),
        lc_id_accion1 = $("#txt_tipo_accion1_update").val(),
        lc_id_accion2 = $("#txt_tipo_accion2_update").val(),
        lc_idprioridad = $("#txt_idprioridad_update").val(),
        lc_nro_documento = $("#txt_nrodocumento_update").val(),
        lc_asunto = $("#txt_asunto_update").val(),
        lc_observacion = $("#txt_observacion_update").val(),
        datos_expediente_editar = {
            "expediente": lc_expediente_editar,
            "nro": lc_nro_expediente,
            "fecha_expediente": lc_fecha_expediente,
            "hora_expediente": lc_hora_expediente,
            "idactor": lc_idactor_destino,
            "idprioridad": lc_idprioridad,
            "nro_doc": lc_nro_documento,
            "accion1": lc_id_accion1,
            "accion2": lc_id_accion2,
            "asunto": lc_asunto,
            "observacion": lc_observacion
        };
    $.ajax({
        data: datos_expediente_editar,
        dataType: 'json',
        url: url + 'expediente/grabar_edicion_expediente_derivado',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            $('#md_derivar_update').modal("toggle");
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);

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


function proceder_a_culminar_expediente(lc_expediente, lc_comentario_culminado) {
    var expe_culminado = { 'id': lc_expediente, 'comentario': lc_comentario_culminado }
    $.ajax({
        data: expe_culminado,
        dataType: 'json',
        url: url + 'expediente/culminar_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_trc = 'C';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $("#tramite")
                .prop("checked", false);
            $("#recepcion")
                .prop("checked", false);
            $("#derivar")
                .prop("checked", false);
            $("#culminado")
                .prop("checked", true);
            $("#btn_derivar_documento").hide();
            $("#btn_culminar_documento").hide();
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


function proceso_de_recuperar_expediente_culminado(lc_expediente) {
    var expe_recuperar_culminado = { 'id': lc_expediente }
    $.ajax({
        data: expe_recuperar_culminado,
        dataType: 'json',
        url: url + 'expediente/recuperar_culminar_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_trc = 'C';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $("#tramite")
                .prop("checked", false);
            $("#recepcion")
                .prop("checked", false);
            $("#derivar")
                .prop("checked", false);
            $("#culminado")
                .prop("checked", true);
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


function buscar_agregar_remitente(lc_actor_nombre) {

    $.ajax({
        url: url + 'expediente/listar_remitente',
        dataType: "json",
        data: { actor: lc_actor_nombre },
        success: function(data) {
            $("#txt_remitente").val(data[0].actor_descripcion);
        }
    });
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



function eliminar_adjunto_en_expediente_area(lc_expediente) {
    $.ajax({
        data: { 'expe': lc_expediente },
        dataType: 'json',
        url: url + 'expediente/eliminar_adjunto',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);
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


function actualizar_adjunto_en_expediente(lc_expediente, lc_nombre_archivo_add) {
    $.ajax({
        data: { 'expe': lc_expediente, 'adjunto': lc_nombre_archivo_add },
        dataType: 'json',
        url: url + 'expediente/actualizar_adjunto',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $('#ModificarAdjunto').modal('toggle');
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

function seleccionexpedientes(fechaInicio, fechaFin) {
    $.ajax({
        data: { 'ini': fechaInicio, 'fin': fechaFin },
        dataType: 'json',
        url: url + 'expediente/seleccionexpediente',
        type: 'post',
        beforeSend: function() {
            $("#esperaproceso").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#esperaproceso").html("<center><strong> -- Un Momento... preparando impresion....</strong></center>");

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
    $("#nombre_del_mes_en_curso").html("<strong>Todo el mes de : " + nombre_del_mes() + "</strong>");
    $("#nombre_del_anio_en_curso").html("<strong>Todo el Año   : " + numero_del_anio() + "</strong>");
    mostrar_tramite_recepcion_culminados(lc_trc);
    $("#btn_recibir").fadeIn("slow");
    $("#btn_derivar_documento").hide();
    $("#btn_culminar_documento").hide();
    $("#msj_derivado").fadeOut("slow");
    lc_codigo_tramite_sesion = $("#codigo_tramite").val();
    $("#btn_impresion_masiva_ht").attr("disabled", true).fadeOut("slow");

    $('#fechainiciotramite')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});

    $('#fechafintramite')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});


    $("#mes_transcurrido").click(function() {
        $('#fechainiciotramite').val(primer_dia_mes_anio_real_time());
        $('#fechafintramite').val(dia_mes_anio_real_time());
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $("#anio_transcurrido").click(function() {
        $('#fechainiciotramite').val('01/01/' + numero_del_anio());
        $('#fechafintramite').val(dia_mes_anio_real_time());
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $('#fecha_expediente_derivacion')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $("#btn_busqueda_total").click(function() {
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $("#tramite")
        .prop("checked", true);

    $("#recepcion")
        .prop("checked", false);

    $("#culminado")
        .prop("checked", false);

    $("#derivar")
        .prop("checked", false);

    $("#btn_limpiar").click(function() {
        $('#fechainiciotramite').val(dia_mes_anio_real_time());
        $('#fechafintramite').val(dia_mes_anio_real_time());
        actualizar_expedientes_ocurrencia();
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $("#btn_ver_expedientes").click(function() {
        $("#btn_selec:checkbox:checked").removeAttr("checked");
        mostrar_tramite_recepcion_culminados_otd(lc_trc);
    });


    $("#btn_ver_internos").click(function() {
        $("#btn_selec:checkbox:checked").removeAttr("checked");
        mostrar_tramite_recepcion_culminados_interno(lc_trc);
    });




    $("#tramite").click(function() {
        lc_trc = 'T';
        $("#btn_recibir").fadeIn("slow");
        $("#btn_derivar_documento").fadeOut("slow");
        $("#msj_derivado").fadeOut("slow");
        $("#btn_culminar_documento").fadeOut("slow");
        $("#btn_impresion_masiva_ht").attr("disabled", true).fadeOut("slow");
        cabecera_tramite();
        mostrar_tramite_recepcion_culminados(lc_trc);

    });


    $("#recepcion").click(function() {
        lc_trc = 'R';
        $("#btn_recibir").fadeOut("slow");
        $("#btn_derivar_documento").fadeIn("slow");
        $("#btn_culminar_documento").fadeIn("slow");
        $("#btn_reporte_recibido").fadeIn("slow");
        $("#msj_derivado").fadeOut("slow");
        $("#btn_impresion_masiva_ht").attr("disabled", true).fadeOut("slow");
        actualizar_expedientes_ocurrencia();
        cabecera_recepcion();
        mostrar_tramite_recepcion_culminados(lc_trc);
    });


    $("#derivar").click(function() {
        lc_trc = 'D';
        $("#btn_recibir").fadeOut("slow");
        $("#btn_derivar_documento").fadeOut("slow");
        $("#btn_culminar_documento").fadeOut("slow");
        $("#btn_impresion_masiva_ht").attr("disabled", false).fadeIn("slow");
        $("#msj_derivado").fadeIn("slow");
        cabecera_deriva();
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $("#culminado").click(function() {
        lc_trc = 'C';
        $("#btn_recibir").fadeOut("slow");
        $("#btn_derivar_documento").fadeOut("slow");
        $("#msj_derivado").fadeOut("slow");
        $("#btn_impresion_masiva_ht").attr("disabled", true).fadeOut("slow");
        cabecera_culminado();
        mostrar_tramite_recepcion_culminados(lc_trc);
    });

    $('#seleccionar-todos').click(function() {
        $('#mostrar_tablas_tramite > input[type=checkbox]').prop('checked', $(this).is(':checked'));
    });



    $("#btn_recibir").click(function() {
        if ($("input:checkbox:checked").length > 0) {
            $("#btn_confirmar_recepcion").attr("disabled", false);
            $("#comentario").val('');
            $('#confirma_recepcion').modal({ show: true, backdrop: 'static' });

        } else {
            mostrar_mensaje_en_modal("alert-info", '<center> -- No selecciono ningun expediente, para recibir -- </center>');
        }

    });


    $("#btn_confirmar_recepcion").click(function() {
        $("input:checkbox:checked").each(function() {
            var lc_leer_compuesto = $(this).val(),
                lc_expediente = lc_leer_compuesto.substring(0, 11),
                lc_numero = lc_leer_compuesto.substring(12);
            grabar_expediente_en_recepcion(lc_expediente, lc_numero);
        });
        $("#btn_confirmar_recepcion").attr("disabled", true);
        mostrar_tramite_recepcion_culminados(lc_trc);
        $('#confirma_recepcion').modal('toggle');
    });



    $("#btn_derivar_documento").click(function() {
        $("#ver_actor").html('');
        var nro_seleccion = 0;
        nro_seleccion = $("input:checkbox:checked").length;
        if ($("input:checkbox:checked").length > 0) {
            if (nro_seleccion == 1) {
                var lc_leer_compuesto = $('input:checkbox:checked').val(),
                    lc_leer_expediente = lc_leer_compuesto.substring(0, 11),
                    lc_ocurrencia = lc_leer_compuesto.substring(12, 14),
                    lc_actor_a = lc_leer_compuesto.substring(15),
                    lc_tipo_operacion = '1';
                proceder_a_derivar_documento(lc_leer_expediente, lc_ocurrencia, lc_actor_a, lc_tipo_operacion, nro_seleccion);
            } else {
                proceder_a_derivar_documento(lc_leer_expediente, lc_ocurrencia, lc_actor_a, lc_tipo_operacion, nro_seleccion);
            }

        } else {
            mostrar_mensaje_en_modal("alert-info", '<center> -- No selecciono ningun expediente, para derivar -- </center>');
        }

    });


    $("#txt_remitente").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/listar_remitente',
                dataType: "json",
                data: { actor: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.actor_descripcion,
                                label1: item.actor,
                                value: item.actor_descripcion,
                                actor: item.actor,
                                descripcion: item.descripcion,
                                responsable: item.responsable,
                                mostrar_actor: item.mostrar_actor,
                                tipo_actor: item.tipo_actor,
                                tipo_actor_descripcion: item.tipo_actor_descripcion,

                            }
                        } else {
                            $("#ver_responsable").html('').hide();
                            $("#txt_idactor").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_actor").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idactor").val('');
                $("#txt_nombre_remitente").val('');
                return false;
            } else {
                $("#txt_idactor").val(ui.item.actor);
                var lc_actor_registra = $("#id_actor_origen").val(),
                    lc_id_actor_seleccion = $("#txt_idactor").val();
                if (lc_actor_registra === lc_id_actor_seleccion) {
                    $("#ver_actor").html('<center><strong><font color="red"> -- El Actor a Derivar no puede ser igual al Actor de Sesion, Verifique -- </font></strong></center>');
                    return true;

                } else {
                    $("#ver_actor").html('');
                    $("#txt_remitente").val(ui.item.label);
                    $("#txt_idactor").val(ui.item.actor);
                    $("#txt_idtipo_actor").val(ui.item.tipo_actor);
                    $("#txt_actor_atencion").val(ui.item.actor_descripcion);
                    $("#txt_atencion").val(ui.item.tipo_actor_descripcion);
                    $("#txt_nombre_remitente").val(ui.item.descripcion);
                    $("#txt_prioridad").attr("disabled", false).focus();
                    return false;

                }
            }
        }
    });
    $("#txt_remitente").autocomplete("option", "appendTo", ".mostrarremitente");

    $("#txt_remitente").keyup(function(e) {
        if ($("#txt_remitente").val() === '') {
            $("#txt_idactor").val('');
            $("#txt_nombre_remitente").val('');
            $("#txt_idtipo_actor").val('');
            $("#btn_grabar_derivar").attr("disabled", true);
        }
    });



    $("#txt_remitente").keypress(function(e) {
        var lc_actor_registra = $("#id_actor_origen").val(),
            lc_actor_nombre = $("#txt_remitente").val(),
            ubicar_actor = { "ubicar_actor": lc_actor_nombre };
        if (e.which === 13) {
            if (lc_actor_registra === lc_actor_nombre) {
                $("#ver_actor").html('<center><strong><font color="red"> -- El Actor a Derivar no puede ser igual al Actor de Sesion, Verifique -- </font></strong></center>');
                return true;
            } else {
                $("#ver_actor").html('');
                $.ajax({
                    data: ubicar_actor,
                    dataType: 'json',
                    url: url + 'expediente/listar_remitente_buscando_Actor',
                    type: 'post',
                    success: function(data) {
                        $("#txt_remitente").val(data[0].actor_descripcion);
                        $("#txt_idactor").val(data[0].actor);
                        $("#txt_idtipo_actor").val(data[0].tipo_actor);
                        $("#txt_nombre_remitente").val(data[0].descripcion);
                        $("#txt_actor_atencion").val(data[0].actor_descripcion);
                        $("#txt_atencion").val(data[0].tipo_actor_descripcion);
                        $("#txt_prioridad").attr("disabled", false).focus();
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
        }
    });

    $("#txt_prioridad").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/ver_prioridad',
                dataType: "json",
                data: { prio: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                label1: item.actor,
                                value: item.tipo_prioridad,
                                actor: item.actor,
                                dias: item.dias,
                                responsable: item.responsable,
                            }
                        } else {
                            $("#ver_responsable").html('').hide();
                            $("#txt_idprioridad").val('');
                            $("#txt_plazo").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msj").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idprioridad").val('');
                $("#txt_plazo").val('');
                return false;
            } else {
                $("#txt_prioridad").val(ui.item.label);
                $("#txt_idprioridad").val(ui.item.value);
                $("#txt_plazo").val(ui.item.dias);
                $("#txt_accion1").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_prioridad").autocomplete("option", "appendTo", ".mostrarremitente");

    $("#txt_prioridad").keypress(function(e) {
        var lc_codigo_prioridad = $("#txt_prioridad").val(),
            ubicar_prioridad = { "ubicar_prioridad": lc_codigo_prioridad };
        if (e.which === 13) {
            $.ajax({
                data: ubicar_prioridad,
                dataType: 'json',
                url: url + 'expediente/ver_prioridad_ubicar',
                type: 'post',
                success: function(prio) {
                    console.log(prio);
                    if (prio[0].respuesta == 1) {
                        $("#txt_prioridad").val(prio[0].resultado);
                        $("#txt_idprioridad").val(prio[0].tipo_prioridad);
                        $("#txt_plazo").val(prio[0].dias);
                        $("#txt_accion1").attr("disabled", false).focus();

                    } else {
                        $("#txt_prioridad").focus();
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
    });


    $("#txt_accion1").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_accion',
                dataType: "json",
                data: { accion: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.tipo_accion,

                            }
                        } else {
                            $("#txt_accion1").val('');
                            $("#txt_tipo_accion1").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msjaccion").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion1").val('');
                $("#txt_tipo_accion1").val('');
                return false;
            } else {
                $("#txt_accion1").val(ui.item.label);
                $("#txt_tipo_accion1").val(ui.item.value);
                $("#txt_accion2").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion1").autocomplete("option", "appendTo", ".mostraraccion1");



    $("#txt_accion1").keypress(function(e) {
        var lc_codigo_accion1 = $("#txt_accion1").val(),
            ubicar_accion1 = { "ubi_accion1": lc_codigo_accion1 };
        if (e.which === 13) {
            $.ajax({
                data: ubicar_accion1,
                dataType: 'json',
                url: url + 'expediente/mostrar_accion1',
                type: 'post',
                success: function(ac1) {
                    console.log(ac1);
                    if (ac1[0].respuesta == 1) {
                        $("#txt_accion1").val(ac1[0].resultado);
                        $("#txt_tipo_accion1").val(ac1[0].tipo_accion);
                        $("#txt_accion2").attr("disabled", false).focus();

                    } else {
                        $("#txt_accion1").focus();
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
    });

    $("#txt_accion2").keypress(function(e) {
        var lc_codigo_accion2 = $("#txt_accion2").val(),
            ubicar_accion2 = { "ubi_accion1": lc_codigo_accion2 };
        if (e.which === 13) {
            $.ajax({
                data: ubicar_accion2,
                dataType: 'json',
                url: url + 'expediente/mostrar_accion1',
                type: 'post',
                success: function(ac2) {
                    if (ac2[0].respuesta == 1) {
                        $("#txt_accion2").val(ac2[0].resultado);
                        $("#txt_tipo_accion2").val(ac2[0].tipo_accion);
                        $("#btn_grabar_expediente").attr("disabled", false);
                        $("#txt_nrodocumento").attr("disabled", true);
                        $("#btn_grabar_derivar").attr("disabled", false);
                        $("#btn_cc").attr("disabled", false);
                        $("#txt_doc_adj2").attr("disabled", false);
                        $("#txt_observacion").attr("disabled", false)
                        $("#txt_doc_adj1").attr("disabled", false).focus();

                    } else {
                        $("#txt_accion2").focus();
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
    });



    $("#txt_accion2").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_accion',
                dataType: "json",
                data: { accion: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.tipo_accion,

                            }
                        } else {
                            $("#txt_accion2").val('');
                            $("#txt_tipo_accion2").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msjaccion2").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion2").val('');
                $("#txt_tipo_accion2").val('');
                return false;
            } else {
                $("#txt_accion2").val(ui.item.label);
                $("#txt_tipo_accion2").val(ui.item.value);
                $("#btn_grabar_expediente").attr("disabled", false);
                $("#txt_nrodocumento").attr("disabled", true);
                $("#btn_grabar_derivar").attr("disabled", false);
                $("#btn_cc").attr("disabled", false);
                $("#txt_doc_adj2").attr("disabled", false);
                $("#txt_observacion").attr("disabled", false)
                $("#txt_doc_adj1").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion2").autocomplete("option", "appendTo", ".mostraraccion2");



    $("#txt_nrodocumento").keypress(function(e) {
        var v_etiqueta = $("#txt_observacion");
        v_etiqueta.attr("disabled", false);
        $("#btn_grabar_derivar").attr("disabled", false);
        $("#btn_cc").attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).focus();
        }
    });


    $("#txt_doc_adj1").keypress(function(e) {
        var v_etiqueta = $("#txt_doc_adj2");
        v_etiqueta.attr("disabled", false);
        $("#btn_grabar_derivar").attr("disabled", false);
        $("#btn_cc").attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).focus();
        }
    });

    $("#txt_doc_adj2").keypress(function(e) {
        var v_etiqueta = $("#txt_observacion");
        v_etiqueta.attr("disabled", false);
        $("#btn_grabar_derivar").attr("disabled", false);
        $("#btn_cc").attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).focus();
        }
    });



    $("#btn_cc").click(function() {
        var lc_buscar_actor = '';
        listar_actor_tipo_0103();


    });

    $("#slt_actor_01")
        .click(function() {
            leer_actor_mostrarlo_etiqueta();
        })
        .keyup(function() {
            leer_actor_mostrarlo_etiqueta();
        });


    $("#slt_con_copia_actores")
        .click(function() {
            leer_copia_actores_y_mostrarlo();
        })
        .keyup(function() {
            leer_copia_actores_y_mostrarlo();
        });

    $("#Eliminar_seleccion").click(function() {
        var leer_idactor = $('#slt_con_copia_actores  option:selected').attr('id'),
            lc_expediente = $('#slt_con_copia_actores  option:selected').attr('expediente');
        eliminar_actor_de_cc(leer_idactor, lc_expediente);
    });



    $("#btn_grabar_derivar").click(function() {
        $("#btn_grabar_derivar").attr("disabled", true);
        var ln_expedientes = $("#nro_expedientes").val(),
            ln_time = ln_expedientes * 400;
        $("#espera_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        if (ln_expedientes == 1) {
            proceder_a_grabar_documento_derivado();
        } else {
            $("input:checkbox:checked").each(function() {
                var lc_leer_compuesto = $(this).val(),
                    lc_leer_expediente = lc_leer_compuesto.substring(0, 11),
                    lc_ocurrencia = lc_leer_compuesto.substring(12, 14),
                    lc_actor_a = lc_leer_compuesto.substring(15);
                proceder_a_grabar_documento_derivado_en_bloque(lc_leer_expediente, lc_ocurrencia, lc_actor_a);
            });
        }
        setTimeout(function() {
            $("#espera_grabacion").html("");
            $('#seleccion_actor').html("");
            lc_trc = 'R';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $("#tramite")
                .prop("checked", false);
            $("#recepcion")
                .prop("checked", true);
            $("#culminado")
                .prop("checked", false);
            $("#derivar")
                .prop("checked", false);
            $('#md_derivar').modal('toggle');
        }, ln_time);
    });



    $(document).on('click', '.btn_recuperar', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 11),
            lc_numero = lc_leer_compuesto.substring(12);
        $("#expediente_retornar").text(" Retornar expediente : " + lc_expediente);
        $("#expediente_recuperar").val(lc_expediente);
        $("#nro_en_expediente").val(lc_numero);
        $('#confirmar_recuperar_derivado').modal({ show: true, backdrop: 'static' });
    });

    $(document).on('click', '.btn_imprimir_expediente', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 11),
            lc_numero = lc_leer_compuesto.substring(12);
        window.open(url + 'imprimir/impresion_hoja_de_tramite?min=' + lc_expediente + '&max=' + lc_expediente);
    });

    $(document).on('click', '.btn_editar_expediente', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 11),
            lc_numero = lc_leer_compuesto.substring(12, 14),
            lc_actor_de = lc_leer_compuesto.substring(15);
        proceder_editar_expediente_derivado(lc_expediente, lc_numero, lc_actor_de);

    });

    $("#txt_remitente_update").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/listar_remitente',
                dataType: "json",
                data: { actor: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.actor_descripcion,
                                label1: item.actor,
                                value: item.actor_descripcion,
                                actor: item.actor,
                                descripcion: item.descripcion,
                                responsable: item.responsable,
                                mostrar_actor: item.mostrar_actor,
                                tipo_actor: item.tipo_actor,
                                tipo_actor_descripcion: item.tipo_actor_descripcion,

                            }
                        } else {
                            $("#ver_responsable_update").html('').hide();
                            $("#txt_idactor_update").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_actor_update").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idactor_update").val('');
                $("#id_actor_origen_update").val('');
                $("#txt_nombre_remitente_update").val('');
                return false;
            } else {
                $("#txt_idactor_update").val(ui.item.actor);
                var lc_actor_registra = $("#id_actor_origen_update").val(),
                    lc_id_actor_seleccion = $("#txt_idactor_update").val();
                if (lc_actor_registra == lc_id_actor_seleccion) {
                    $("#ver_actor_update").html('<center><strong><font color="red"> -- El Actor a Derivar no puede ser igual al Actor de Sesion, Verifique -- </font></strong></center>');
                    $("#btn_grabar_derivar_update").attr("disabled", true);
                    return true;
                } else {
                    $("#ver_actor_update").html('');
                    $("#txt_remitente_update").val(ui.item.label);
                    $("#txt_idactor_update").val(ui.item.actor);
                    $("#txt_idtipo_actor_update").val(ui.item.tipo_actor);
                    $("#txt_actor_atencion_update").val(ui.item.actor_descripcion);
                    $("#txt_atencion_update").val(ui.item.tipo_actor_descripcion);
                    $("#txt_nombre_remitente_update").val(ui.item.descripcion);
                    $("#btn_grabar_derivar_update").attr("disabled", false);
                    $("#txt_prioridad_update").attr("disabled", false).focus();
                    return false;
                }
            }
        }
    });
    $("#txt_remitente_update").autocomplete("option", "appendTo", ".mostrarremitente_update");

    $("#txt_prioridad_update").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/ver_prioridad',
                dataType: "json",
                data: { prio: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                label1: item.actor,
                                value: item.tipo_prioridad,
                                actor: item.actor,
                                dias: item.dias,
                                responsable: item.responsable,
                            }
                        } else {
                            $("#ver_responsable_update").html('').hide();
                            $("#txt_idprioridad_update").val('');
                            $("#txt_plazo_update").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msj_update").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idprioridad_update").val('');
                $("#txt_plazo_update").val('');
                return false;
            } else {
                $("#txt_prioridad_update").val(ui.item.label);
                $("#txt_idprioridad_update").val(ui.item.value);
                $("#txt_plazo_update").val(ui.item.dias);
                $("#txt_accion1_update").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_prioridad_update").autocomplete("option", "appendTo", ".mostrarprioridad_update");


    $("#txt_accion1_update").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_accion',
                dataType: "json",
                data: { accion: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.tipo_accion,

                            }
                        } else {
                            $("#txt_accion1_update").val('');
                            $("#txt_tipo_accion1_update").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msjaccion_update").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion1_update").val('');
                $("#txt_tipo_accion1_update").val('');
                return false;
            } else {
                $("#txt_accion1_update").val(ui.item.label);
                $("#txt_tipo_accion1_update").val(ui.item.value);
                $("#txt_accion2_update").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion1_update").autocomplete("option", "appendTo", ".mostraraccion1_update");



    $("#txt_accion2_update").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_accion',
                dataType: "json",
                data: { accion: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.tipo_accion,

                            }
                        } else {
                            $("#txt_accion2_update").val('');
                            $("#txt_tipo_accion2_update").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msjaccion2_update").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion2_update").val('');
                $("#txt_tipo_accion2_update").val('');
                return false;
            } else {
                $("#txt_accion2_update").val(ui.item.label);
                $("#txt_tipo_accion2_update").val(ui.item.value);
                $("#btn_grabar_expediente_update").attr("disabled", false);
                $("#txt_observacion_update").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion2_update").autocomplete("option", "appendTo", ".mostraraccion2_update");

    $("#btn_grabar_derivar_update").click(function() {
        grabar_edicion_expediente_derivado();
    });

    $("#btn_confirmar_retorno").click(function() {
        var lc_expediente = $("#expediente_recuperar").val(),
            lc_numero = $("#nro_en_expediente").val();
        recuperar_expediente_estado(lc_expediente, lc_numero);
        $('#confirmar_recuperar_derivado').modal("toggle");
    });

    $("#btn_culminar_documento").click(function() {
        var valor_seleccion = $("input:checkbox:checked").length;
        switch (valor_seleccion) {
            case 0:
                mostrar_mensaje_en_modal("alert-info", '<center> -- No selecciono ningun expediente, para culminar -- </center>');
                break;
            case 1:
                var lc_leer_compuesto = $('input:checkbox:checked').val(),
                    lc_leer_expediente = lc_leer_compuesto.substring(0, 11);
                $("#expediente_culminar").text(" Culminar expediente : " + lc_leer_expediente);
                $("#nro_expediente_culminar").val(lc_leer_expediente);
                $("#nro_en_expediente_culminar").val(0);
                $("#txt_motivo_culminacion").val('').focus();
                $('#confirmar_culminado').modal({ show: true, backdrop: 'static' });
                break;
            default:
                mostrar_mensaje_en_modal("alert-default", '<center> -- Solo debe seleccionar un solo expediente para culminar -- </center>');
                break;
        }
    });

    $("#btn_confirmar_culminado").click(function() {
        var lc_expediente = $("#nro_expediente_culminar").val(),
            lc_comentario_culminado = $("#txt_motivo_culminacion").val();
        proceder_a_culminar_expediente(lc_expediente, lc_comentario_culminado);
        $('#confirmar_culminado').modal("toggle");
    });

    $(document).on('click', '.btn_anular_culminacion', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 11);
        proceso_de_recuperar_expediente_culminado(lc_expediente);

    });

    $('#fechainicioReporte')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});


    $('#fechafinReporte')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});



    $("#btn_reporte_recibido").click(function() {
        $('#Reporte_Expediente_Remitidos').modal({ show: true, backdrop: 'static' });


    });

    $("#btn_enviar_excel").click(function() {
        ver_si_existe_fecha_reporte();
        var fechaInicio = $('#fechainicioReporte').val(),
            fechaFin = $('#fechafinReporte').val();
        window.open(url + 'imprimir/EnvioArchivoExcelRecibidos?Ini=' + fechaInicio + '&Fin=' + fechaFin);
    });

    $("#btn_enviar_pdf").click(function() {
        ver_si_existe_fecha_reporte();
        var fechaInicio = $('#fechainicioReporte').val(),
            fechaFin = $('#fechafinReporte').val();
        window.open(url + 'imprimir/EnvioArchivoPDFRecibidos?Ini=' + fechaInicio + '&Fin=' + fechaFin);
    });

    $(document).on('click', '.btn_ver_ocurrencias', function() {
        var lc_expediente = $(this).attr("id");
        ver_numero_ocurrencias(lc_expediente);
    });

    $(document).on('click', '.btn_adjunto', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 12);
        $("#idexpediente_ad").val(lc_expediente);
        $('#nombre_archivo_add').val('');
        $('#subir_archivo_add').attr("disabled", true);
        $('#subir_archivo_add').val("");
        $('#msj_subida_add').html('');
        $('#mostrar_idexpediente_ad').html("<center> Expediente : " + lc_expediente + "</center>");
        $('#btn_eliminar_adjunto').attr("disabled", false);
        $('#btn_actualizar_adjunto').attr("disabled", true);
        $('#ModificarAdjunto').modal({ show: true, backdrop: 'static' });

    });


    $('#btn_agregar_cambiar_adjunto').click(function() {
        $('#subir_archivo_add').attr("disabled", false);

    });


    $("#subir_archivo_add").change(function() {
        archivo_subir_add = this.files[0],
            lc_nombre_archivo_add = archivo_subir_add["name"],
            etiqueta_dom_txt = 'subir_archivo_add',
            etiqueta_dom = $("#subir_archivo_add"),
            msj_dom = $("#msj_subida_add");
        if (archivo_subir_add["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir_add["size"] > 500000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 50 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir_add);
            $.ajax({
                dataType: 'json',
                url: url + 'expediente/subir_pdf_add',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function() {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function(datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();
                        $('#btn_actualizar_adjunto').attr("disabled", false);
                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                        $('#btn_actualizar_adjunto').attr("disabled", true);
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
    });

    $('#btn_actualizar_adjunto').click(function() {
        var lc_expediente = $('#idexpediente_ad').val();
        actualizar_adjunto_en_expediente(lc_expediente, lc_nombre_archivo_add);
        $("#subir_archivo_add").attr("disabled", true);
        $('#btn_actualizar_adjunto').attr("disabled", true);
    });


    $('#btn_eliminar_adjunto').click(function() {
        var lc_expediente = $('#idexpediente_ad').val();
        eliminar_adjunto_en_expediente_area(lc_expediente);
        $('#btn_eliminar_adjunto').attr("disabled", true);
    });

    $("#btn_enviar_excel_detalle").click(function() {
        ver_si_existe_fecha_reporte();
        var fechaInicio = $('#fechainicioReporte').val(),
            fechaFin = $('#fechafinReporte').val();
        seleccionexpedientes(fechaInicio, fechaFin);
        setTimeout(function() {
            $("#esperaproceso").html("");
            window.open(url + 'imprimir/EnvioArchivoExcelRecibidosDetallado?Ini=' + fechaInicio + '&Fin=' + fechaFin);
        }, 2000);

    });

});