var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    url_pdf = 'http://' + document.domain + '/tramite/public/pdf',
    tabla, lc_buscar_entidad = '',
    lc_todos_usuario = '0',
    lc_tipo_operacion_entidad = '0',
    lc_buscar_treporte = '',
    nro_registros = 0,
    datos_en_fila = '',
    lc_tipo_operacion_tdoc = '0',
    lc_nombre_archivo, archivo_subir, archivo_subir_add, lc_nombre_archivo_add;

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function mostrar_hora() {
    var fecha = new Date(Date.now()),
        lc_hora_minuto_segundo_real_time = (('' + fecha.getHours()).length < 2 ? '0' : '') + fecha.getHours() + ':' + (('' + fecha.getMinutes()).length < 2 ? '0' : '') + fecha.getMinutes();
    return lc_hora_minuto_segundo_real_time;
}

function ver_si_existe_fecha() {
    if ($("#fechainicio").val() == '') {
        $("#fechainicio").val(dia_mes_anio_real_time());
    };
    if ($("#fechafin").val() == '') {
        $("#fechafin").val(dia_mes_anio_real_time());
    };


}

function mostrar_expedientes() {
    ver_si_existe_fecha();
    $("#TodosUsuarios").on('change', function() {
        if ($(this).is(':checked')) {
            lc_todos_usuario = '1'
        } else {
            lc_todos_usuario = '0'
        }
    });

    var buscar = ($("#buscar").val() == '') ? '' : $("#txt_buscar_actor").val(),
        lc_tipo_documento = ($("#mostrardocumento").val() == '') ? '' : $("#txt_id_tipo_doc").val(),
        fecha = $("#fechainicio").val(),
        fecha2 = $("#fechafin").val(),
        asunto = $("#txt_buscar_asunto").val(),
        listar = {
            "buscar": buscar,
            "fecha": fecha,
            "fecha2": fecha2,
            "asunto": asunto,
            "usuarios": lc_todos_usuario,
            "tdocumento": lc_tipo_documento
        };


    $.ajax({
        data: listar,
        dataType: 'json',
        url: url + 'expediente/recargar_expedientes',
        type: 'post',
        beforeSend: function() {
            $("#mostrar-datos-busqueda").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#Nro_resultados").html(".. Procesando... ");
        },
        success: function(datos) {
            $('#mostrar-datos-busqueda').html("");
            if (datos[0].estado_respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var lc_estado = datos[key]['estado'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="danger text-danger">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="info text-info">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="alert alert-success">';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="warning">';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="primary">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['hora'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['actor_nombre'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['nro_docu'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['tipo'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['prioridad'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['accion1'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';
                    datos_en_fila += '<td><a href = "' + url_pdf + '/' + datos[key]['adjunto'] + '" target = _black </a> ' + datos[key]['adjunto'] + '</td>';
                    datos_en_fila += '<td><button type="button" name="editar" id="' + datos[key].expediente + ' - ' + datos[key].estado + '" class="btn btn-success  btn_editar crear-tooltip" data-toggle="tooltip" data-original-title="Ver/Editar Expediente">E</button>';
                    datos_en_fila += '<button type="button" name="eliminar" id="' + datos[key].expediente + ' - ' + datos[key].estado + '" class="btn btn-danger  btn_eliminar crear-tooltip" data-toggle="tooltip" data-original-title="Eliminar expediente">X</button>';
                    datos_en_fila += '<button type="button" name="retornar" id="' + datos[key].expediente + ' - ' + datos[key].estado + '" class="btn btn-info btn_retornar crear-tooltip" data-toggle="tooltip" data-original-title="Retornar expediente">R</button>';
                    datos_en_fila += '<button type="button" name="hoja_ruta" id="' + datos[key].expediente + ' - ' + datos[key].estado + '" class="btn btn-primary btn_hoja_ruta crear-tooltip" data-toggle="tooltip" data-original-title="Hoja de Ruta">H</button>';
                    datos_en_fila += '<button type="button" name="adjunto" id="' + datos[key].expediente + '" class="btn btn-success btn_adjunto crear-tooltip" data-toggle="tooltip" data-original-title="Adjunto">A</button></td>';
                    datos_en_fila += '</tr>';
                });
                $('#mostrar-datos-busqueda').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>Registros: " + nro_registros + '</strong>');
            } else {
                nro_registros = 0;
                $('#mostrar-datos-busqueda').html("");
                $("#Nro_resultados").html("<strong>Registros: " + nro_registros + '</strong>');
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





function mostrar_director() {
    var nombre_actor = {
        "atencion": "01"
    }
    $.ajax({
        data: nombre_actor,
        dataType: 'json',
        url: url + 'expediente/mostrar_director',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            var descrip = (datos[0].descripcion),
                descripcion_area_actor = (datos[0].descripcion_tipo_actor)
            tipo_actor = (datos[0].tipo_actor);
            $("#txt_atencion").val(descrip);
            $("#txt_descripcion_actor").val(descripcion_area_actor);
            $("#txt_id_actor").val(tipo_actor);
        }
    });
}

function mostrar_tipo_reporte() {
    var treporte = {
        "treporte": "00"
    }
    $.ajax({
        data: treporte,
        dataType: 'json',
        url: url + 'expediente/mostrar_treporte',
        type: 'post',
        beforeSend: function() {},
        success: function(reportes) {
            var mostrar_t_reporte = (reportes[0].resultado),
                id_treporte = (reportes[0].tipo_reporte);
            $("#txt_tipo_reporte").val(mostrar_t_reporte);
            $("#txt_idtreporte").val(id_treporte);

        }
    });
}

function mostrar_tipo_documento() {
    var tdocu_defecto = {
        "tdoc_defecto": "07"
    }
    $.ajax({
        data: tdocu_defecto,
        dataType: 'json',
        url: url + 'expediente/mostrar_tipo_documento_defecto',
        type: 'post',
        beforeSend: function() {},
        success: function(doc) {
            var mostrar_doc = (doc[0].resultado),
                id_tdoc = (doc[0].tipo_documento);
            // $("#txt_tdocumento").val(mostrar_doc);
            // $("#txt_tipo_doc").val(id_tdoc);

            $("#txt_tdocumento").val('');
            $("#txt_tipo_doc").val('');


            $("#txt_tdocumentoe").val(mostrar_doc);
            $("#txt_tipo_doce").val(id_tdoc);

        }
    });
}


function grabar_registro_expediente() {
    // lc_nombre_archivo
    var lc_fecha_expediente = $('#txt_fecha_expediente').val(),
        lc_hora_expediente = $('#txt_hora_expediente').val(),
        lc_idactor = $("#txt_idactor").val(),
        lc_txtremitente = $("#txt_nombre_remitente").val(),
        lc_asunto = $("#txt_asunto").val(),
        lc_idprioridad = $("#txt_idprioridad").val(),
        ln_plazo = $("#txt_plazo").val(),
        lc_idtipodoc = $("#txt_tipo_doc").val(),
        lc_nro_documento = $("#txt_nrodocumento").val(),
        ln_folios = $("#txt_nfolios").val(),
        lc_actor_atencion = $("#txt_actor_atencion").val(),
        lc_txt_accion1 = $("#txt_accion1").val(),
        lc_txt_accion2 = $("#txt_accion2").val(),
        lc_referencia = $("#txt_referencia").val(),
        lc_idtreporte = $("#txt_idtreporte").val(),
        lc_observacion = $("#txt_observacion").val(),
        datos_expediente = {
            "fecha_expediente": lc_fecha_expediente,
            "hora_expediente": lc_hora_expediente,
            "idactor": lc_idactor,
            "remitente": lc_txtremitente,
            "asunto": lc_asunto,
            "idprioridad": lc_idprioridad,
            "plazo": ln_plazo,
            "tipo_doc": lc_idtipodoc,
            "nro_doc": lc_nro_documento,
            "folios": ln_folios,
            "actor_atencion": lc_actor_atencion,
            "accion1": lc_txt_accion1,
            "accion2": lc_txt_accion2,
            "referencia": lc_referencia,
            "tipo_reporte": lc_idtreporte,
            "observacion": lc_observacion,
            "adjunto": lc_nombre_archivo
        }
    $.ajax({
        data: datos_expediente,
        dataType: 'json',
        url: url + 'expediente/registrar_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function(exp) {
            $('#txt_fecha_expediente').val(dia_mes_anio_real_time());
            $('#txt_hora_expediente').val('').val(mostrar_hora());
            lc_nombre_archivo = "";
            $("#subir_archivo").val('').attr("disabled", true);
            $("#msj_subida").html("");
            mostrar_expedientes();
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

/* para entidad */
function listar_entidad(lc_buscar_entidad) {
    var lc_select_entidad = $("#slt_lista_entidades"),
        lc_espera = $("#espera_entidad"),
        datos_listar = {
            'id': lc_buscar_entidad
        };
    $.ajax({
        data: datos_listar,
        dataType: 'json',
        url: url + 'expediente/mostrar_entidades',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {

            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.actor +
                        '"  actor = "' + filas.actor +
                        '"  descripcion = "' + filas.descripcion +
                        '"  abreviatura = "' + filas.abreviatura +
                        '"  responsable = "' + filas.responsable +
                        '"  tipo_actor = "' + filas.tipo_actor +
                        '"  mostrar_actor = "' + filas.mostrar_actor +
                        '"  codigo = "' + filas.codigo +
                        '"  actor_descripcion = "' + filas.actor_descripcion +
                        '"  area_de_actor = "' + filas.area_de_actor +
                        '"  descripcion_tipo_actor = "' + filas.descripcion_tipo_actor +
                        '"  direccion = "' + filas.direccion +
                        '"  telefono = "' + filas.telefono +
                        '"  ruc = "' + filas.ruc +
                        '"  >' + filas.actor_descripcion + '</option>');

                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true);
                }
            });
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

function leer_entidades_mostrarlo() {
    $("#msj_eliminado").html('').hide();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id');
    var lc_ver_si_selecciono_id_entidad = (typeof lc_id_entidad === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_entidad === '1') {
        var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
            lc_tipo_entidad = $('#slt_lista_entidades option:selected').attr('descripcion_tipo_actor'),
            lc_descripcion = $('#slt_lista_entidades option:selected').attr('descripcion'),
            lc_direccion = $('#slt_lista_entidades option:selected').attr('direccion'),
            lc_telefono = $('#slt_lista_entidades option:selected').attr('telefono'),
            lc_ruc = $('#slt_lista_entidades option:selected').attr('ruc');
        $('#id_identidad')
            .val(lc_id_entidad);
        $('#id_tipo_actor').val(lc_tipo_entidad);
        $('#txt_descripcion').val(lc_descripcion).attr("disabled", true);
        // $('#txt_abreviatura').val(lc_abreviatura).attr("disabled", true);
        $('#txt_direccion').val(lc_direccion).attr("disabled", true);
        $('#txt_telefono').val(lc_telefono).attr("disabled", true);
        $('#txt_ruc').val(lc_ruc).attr("disabled", true);
        $('#btn_editar_entidad').attr("disabled", false);
        $('#btn_eliminar_entidad').attr("disabled", false);
    } else {
        $('#btn_editar_entidad').attr("disabled", true);
        $('#btn_grabar_entidad').attr("disabled", true);
        $('#btn_eliminar_entidad').attr("disabled", true);
    }
}

function desabilitar_etiquetas_entidad() {
    $('#txt_descripcion').attr("disabled", true);
    // $('#txt_abreviatura').attr("disabled", true);
    $('#txt_direccion').attr("disabled", true);
    $('#txt_telefono').attr("disabled", true);
    $('#txt_ruc').attr("disabled", true);
    $('#btn_editar_entidad').attr("disabled", true);
    $('#btn_grabar_entidad').attr("disabled", true);
    $("#msj_eliminado").html('').hide();


}

function desabilitar_y_limpiar_etiquetas_entidad() {
    $('#id_identidad').val('');
    $('#txt_direccion').val('').attr("disabled", false);
    $("#msj_eliminado").html('').hide();
    $('#txt_telefono').val('').attr("disabled", false);
    $('#txt_ruc').val('').attr("disabled", false);
    $('#btn_editar_entidad').attr("disabled", true);
    $('#btn_grabar_entidad').attr("disabled", true);
    $('#txt_descripcion').val('').attr("disabled", false).focus();
}

function grabar_nueva_entidad() {
    var lc_descripcion = $('#txt_descripcion').val(),
        lc_abreviatura = lc_descripcion,
        lc_direccion = $('#txt_direccion').val(),
        lc_telefono = $('#txt_telefono').val(),
        lc_ruc = $('#txt_ruc').val(),
        datos_grabar_entidad = {
            'descripcion': lc_descripcion,
            'abreviatura': lc_abreviatura,
            'direccion': lc_direccion,
            'telefono': lc_telefono,
            'ruc': lc_ruc
        }
    $.ajax({
        data: datos_grabar_entidad,
        dataType: 'json',
        url: url + 'expediente/grabar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            desabilitar_etiquetas_entidad();
            listar_entidad(lc_buscar_entidad);
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


function grabar_editar_entidad() {
    desabilitar_etiquetas_entidad();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        lc_descripcion = $('#txt_descripcion').val(),
        lc_abreviatura = lc_descripcion,
        lc_direccion = $('#txt_direccion').val(),
        lc_telefono = $('#txt_telefono').val(),
        lc_ruc = $('#txt_ruc').val(),
        datos_editar_entidad = {
            'id': lc_id_entidad,
            'descripcion': lc_descripcion,
            'abreviatura': lc_abreviatura,
            'direccion': lc_direccion,
            'telefono': lc_telefono,
            'ruc': lc_ruc
        }
    $.ajax({
        data: datos_editar_entidad,
        dataType: 'json',
        url: url + 'expediente/actualizar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_entidad(lc_buscar_entidad);
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

function eliminar_entidad() {
    desabilitar_etiquetas_entidad();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        datos_eliminar_entidad = {
            'id': lc_id_entidad
        }
    $.ajax({
        data: datos_eliminar_entidad,
        dataType: 'json',
        url: url + 'expediente/eliminar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            var lc_confirma = datos[0].confirma;
            if (lc_confirma == '1') {
                $("#msj_eliminado").html("- NO SE PUEDE ELIMINAR - REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                proceder_a_eliminar();
                $("#msj_eliminado").html("- ELIMINADO - ").show();

            }
            listar_entidad(lc_buscar_entidad);
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


function proceder_a_eliminar() {
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        datos_eliminar_entidad_confirmar = {
            'id': lc_id_entidad
        }
    $.ajax({
        data: datos_eliminar_entidad_confirmar,
        dataType: 'json',
        url: url + 'expediente/eliminar_entidad_confirmar',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_entidad(lc_buscar_entidad);
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

/* fin de entidad */


/* Tipo de documento */

function eliminar_tdoc() {
    $("#msj_eliminado_tdocumento").html('').hide();
    var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        datos_eliminar_toc = { 'id': lc_id_tdoc };
    $.ajax({
        data: datos_eliminar_toc,
        dataType: 'json',
        url: url + 'expediente/eliminar_datos_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            console.log(datos);

            var lc_confirma = datos[0].confirma;
            if (lc_confirma == '1') {
                $("#msj_eliminado_tdocumento").html("- REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                proceder_a_eliminar_tod();
                $("#msj_eliminado_tdocumento").html("- ELIMINADO - ").show();

            }
            listar_tipo_documento(lc_buscar_treporte);
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

function proceder_a_eliminar_tod() {
    var lc_id_tdoc = lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        datos_eliminar_toc_confirmar = { 'id': lc_id_tdoc }
    $.ajax({
        data: datos_eliminar_toc_confirmar,
        dataType: 'json',
        url: url + 'expediente/eliminar_tdoc_confirmar',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
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


/* seccion edicion de expediente */
function recuperar_expediente_para_editar(lc_expediente) {
    var dato_rec = { 'id': lc_expediente };
    $.ajax({
        data: dato_rec,
        dataType: 'json',
        url: url + 'expediente/dato_recuperacion_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function(doc) {
            $('#txt_fecha_expediente_update').val(doc[0].fecha).attr("disabled", true);
            $('#txt_hora_expediente_update').val(doc[0].hora).attr("disabled", true);
            $("#txt_tdocumentoe").val('[' + doc[0].tipo_documento + '] ' + doc[0].descrip_documento).attr("disabled", true);
            $("#txt_tipo_doce").val(doc[0].tipo_documento);
            $("#txt_nrodocumentoe").val(doc[0].nro_doc).attr("disabled", true);
            $("#txt_nfoliose").val(doc[0].folios).attr("disabled", true);
            $("#txt_remitente_update").val('[' + doc[0].actor + '] ' + doc[0].nombre).attr("disabled", true);
            $("#txt_idactor_update").val(doc[0].actor);
            $("#txt_nombre_remitente_update").val(doc[0].nombre);
            $("#txt_idtipo_actor_update").val(doc[0].tipo_actor);
            $("#txt_asunto_update").val(doc[0].asunto).attr("disabled", true);
            $("#txt_idprioridad_update").val(doc[0].idprioridad);
            $("#txt_plazo_update").val(doc[0].dias);
            $("#txt_prioridad_update").val('[' + doc[0].idprioridad + ' ] ' + doc[0].prioridad + ' - ' + doc[0].dias).attr("disabled", true);
            $("#txt_tipo_accion1_update").val(doc[0].accion1);
            $("#txt_accion1_update").val('[' + doc[0].accion1 + ' ] ' + doc[0].accion1_nombre).attr("disabled", true);
            $("#txt_tipo_accion2_update").val(doc[0].accion2);
            $("#txt_accion2_update").val('[' + doc[0].accion2 + ' ] ' + doc[0].accion2_nombre).attr("disabled", true);
            $("#txt_referencia_update").val(doc[0].referencia).attr("disabled", true);
            $("#txt_observacion_update").val(doc[0].observacion).attr("disabled", true);
            $("#btn_grabar_edicion_expediente").attr("disabled", true);
        }
    });
}


/* tipo reportes */
function listar_tipo_documento(lc_buscar_treporte) {
    var lc_select_entidad = $("#slt_lista_tdoc"),
        lc_espera = $("#espera_tdoc"),
        datos_listar_treporte = {
            'id': lc_buscar_treporte
        };
    $.ajax({
        data: datos_listar_treporte,
        dataType: 'json',
        url: url + 'expediente/mostrar_tdocu',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_documento +
                        '"  actor = "' + filas.tipo_documento +
                        '"  descripcion = "' + filas.descrip_documento +
                        '"  resultado = "' + filas.resultado +
                        '"  >' + filas.resultado + '</option>');

                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
                }
            });
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

function leer_tipo_tdoc_y_mostrarlo() {
    $("#msj_eliminado_tdocumento").html('').hide();
    var lc_id_tdoc = $('#slt_lista_tdoc').attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id_tdoc === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
            lc_descripcion_tdoc = $('#slt_lista_tdoc option:selected').attr('descripcion');
        $('#id_tipodocumento').val(lc_id_tdoc);
        $('#txt_descripcion_tdocumento').val(lc_descripcion_tdoc).attr("disabled", true);
        $('#btn_editar_tdoc').attr("disabled", false);
        $('#btn_eliminar_tdoc').attr("disabled", false);
        $('#btn_grabar_tdocumento').attr("disabled", true);
    } else {
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
    }
}

function grabar_nueva_tdoc() {
    var lc_descripcion = $('#txt_descripcion_tdocumento').val(),
        datos_grabar_tdoc = {
            'descripcion': lc_descripcion
        }
    $.ajax({
        data: datos_grabar_tdoc,
        dataType: 'json',
        url: url + 'expediente/grabar_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
            $('#btn_editar_tdoc').attr("disabled", true);
            $('#btn_grabar_tdocumento').attr("disabled", true);
            $('#id_tipodocumento').val('');
            $("#txt_descripcion_tdocumento").val('').attr("disabled", true);
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

function grabar_editar_tdoc() {
    var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        lc_descripcion = $('#txt_descripcion_tdocumento').val(),
        datos_editar_tdoc = {
            'id': lc_id_tdoc,
            'descripcion': lc_descripcion
        }
    $.ajax({
        data: datos_editar_tdoc,
        dataType: 'json',
        url: url + 'expediente/editar_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
            $('#btn_editar_tdoc').attr("disabled", true);
            $('#btn_grabar_tdocumento').attr("disabled", true);
            $('#id_tipodocumento').val('');
            $("#txt_descripcion_tdocumento").val('').attr("disabled", true);
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

/* fin de tipo de reportes */

/* grabar edicion expediente */
function grabar_edicion_expediente() {
    var lc_nro_expediente = $('#idexpediente').val(),
        lc_fecha_expediente = $('#txt_fecha_expediente_update').val(),
        lc_hora_expediente = $('#txt_hora_expediente_update').val(),
        lc_idtipodoc = $("#txt_tipo_doce").val(),
        lc_nro_documento = $("#txt_nrodocumentoe").val(),
        ln_folios = $("#txt_nfoliose").val(),
        lc_idactor = $("#txt_idactor_update").val(),
        lc_txtremitente = $("#txt_nombre_remitente_update").val(),
        lc_asunto = $("#txt_asunto_update").val(),
        lc_idprioridad = $("#txt_idprioridad_update").val(),
        ln_plazo = $("#txt_plazo_update").val(),
        lc_txt_accion1 = $("#txt_tipo_accion1_update").val(),
        lc_txt_accion2 = $("#txt_tipo_accion2_update").val(),
        lc_referencia = $("#txt_referencia_update").val(),
        lc_observacion = $("#txt_observacion_update").val(),
        datos_update_expediente = {
            "id": lc_nro_expediente,
            "fecha_expediente": lc_fecha_expediente,
            "hora_expediente": lc_hora_expediente,
            "idactor": lc_idactor,
            "remitente": lc_txtremitente,
            "asunto": lc_asunto,
            "idprioridad": lc_idprioridad,
            "plazo": ln_plazo,
            "tipo_doc": lc_idtipodoc,
            "nro_doc": lc_nro_documento,
            "folios": ln_folios,
            "accion1": lc_txt_accion1,
            "accion2": lc_txt_accion2,
            "referencia": lc_referencia,
            "observacion": lc_observacion
        }

    console.log(datos_update_expediente);
    $.ajax({
        data: datos_update_expediente,
        dataType: 'json',
        url: url + 'expediente/editar_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            $('#txt_fecha_expediente_update').attr("disabled", true);
            $('#txt_hora_expediente_update').attr("disabled", true);
            $("#txt_tdocumentoe").attr("disabled", true);
            $("#txt_nrodocumentoe").attr("disabled", true);
            $("#txt_nfoliose").attr("disabled", true);
            $("#txt_remitente_update").attr("disabled", true);
            $("#txt_asunto_update").attr("disabled", true);
            $("#txt_prioridad_update").attr("disabled", true);
            $("#txt_accion1_update").attr("disabled", true);
            $("#txt_accion2_update").attr("disabled", true);
            $("#txt_referencia_update").attr("disabled", true);
            $("#txt_observacion_update").attr("disabled", true);
            $("#btn_grabar_edicion_expediente").attr("disabled", true);


            mostrar_expedientes();
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

/* fin de grabar edicion  expediente */


/* imprimir expediente */
function ver_expediente_ini_final() {
    var fecha = $("#fechainicio").val(),
        fecha2 = $("#fechafin").val();
    enviar_fecha = { "fecha1": fecha, "fecha2": fecha2 };

    console.log(enviar_fecha);

    $.ajax({
        data: enviar_fecha,
        dataType: 'json',
        url: url + 'expediente/ver_min_max',
        type: 'post',
        beforeSend: function() {},
        success: function(inimax) {
            $('#nro_expedienteinicial').val(inimax[0].inicial);
            $('#nro_expedientefinal').val(inimax[0].final);

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


/** fin de imprimir expediente  */


//#endregion  - final funciones

// Pejecutar procesar documentos 

function ver_expediente_ini_final_procesar() {
    var fecha = $("#fechainicio").val(),
        fecha2 = $("#fechafin").val();
    enviar_fecha = { "fecha1": fecha, "fecha2": fecha2 };
    $.ajax({
        data: enviar_fecha,
        dataType: 'json',
        url: url + 'expediente/ver_min_max_procesar',
        type: 'post',
        beforeSend: function() {},
        success: function(inimax) {
            var ln_ini = inimax[0].inicial.length,
                ln_fin = inimax[0].final.length,
                ln_total = ln_ini + ln_fin;
            if (ln_total > 0) {
                $('#nro_inicioprocesar').val(inimax[0].inicial);
                $('#nro_finprocesar').val(inimax[0].final);
                $('#md_procesar_expediente').modal({ show: true, backdrop: 'static' });
            } else {
                mostrar_mensaje_en_modal("alert-info", '<center> -- No existe ningun expediente para procesar a Direccion -- </center>');
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


function eliminar_expediente_registrado(lc_expediente_eliminar) {
    var datos_eliminar_expe = { 'id': lc_expediente_eliminar }
    $.ajax({
        data: datos_eliminar_expe,
        dataType: 'json',
        url: url + 'expediente/eliminar_expediente_estado_cero',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            console.log(datos);
            if (datos.registros === 0) {
                mostrar_mensaje_en_modal("alert-danger", 'Expediente : ' + lc_expediente + ' <br><center> -- No fue registrado por usted -- </center>');
            } else {
                $('#EliminarExpediente').modal('toggle');
            }
            mostrar_expedientes();
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


function recuperar_expediente_estado(lc_expediente) {
    var expe_recuperado = { 'id': lc_expediente }
    $.ajax({
        data: expe_recuperado,
        dataType: 'json',
        url: url + 'expediente/recuperar_a_estado_1',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            mostrar_expedientes();
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






function procesar_expedientes_para_estado_2(lc_procesar_inicio, lc_procesar_final) {
    $.ajax({
        data: { 'inicio': lc_procesar_inicio, 'fin': lc_procesar_final },
        dataType: 'json',
        url: url + 'expediente/procesar_estado_2',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            $('#md_procesar_expediente').modal('toggle');
            mostrar_expedientes();

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
            mostrar_expedientes();
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


function eliminar_adjunto_en_expediente(lc_expediente) {
    $.ajax({
        data: { 'expe': lc_expediente },
        dataType: 'json',
        url: url + 'expediente/eliminar_adjunto',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            mostrar_expedientes();
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
    mostrar_expedientes();
    mostrar_hora();
    listar_entidad(lc_buscar_entidad);
    listar_tipo_documento(lc_buscar_treporte);
    $("#nombre_del_mes_en_curso").html("<strong>Todo : " + nombre_del_mes() + "</strong>");


    $("#mes_transcurrido").click(function() {
        $('#fechainicio').val(primer_dia_mes_anio_real_time());
        $('#fechafin').val(dia_mes_anio_real_time());
        mostrar_expedientes();
    });




    $("#buscar_expediente_reciente").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_expediente_ubicado',
                dataType: "json",
                data: { ubicar: request.term },
                beforeSend: function() {
                    $("#espera_ubicacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
                },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.expediente,
                                estado: item.estado,
                                fecha: item.fecha,
                                hora: item.hora,
                                asunto: item.asunto,
                                actor_nombre: item.actor_nombre,
                                nro_documento: item.nro_documento,
                                tipo: item.tipo,
                                prioridad: item.prioridad,
                                accion1_nombre: item.accion1_nombre,
                                observaciones: item.observaciones,
                                adjunto: item.adjunto,
                            }
                        } else {
                            $("#buscar_expediente_reciente").val('');
                            $("#espera_ubicacion").html("");
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
                $("#espera_ubicacion").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#buscar_expediente_reciente").val('');
                return false;
            } else {
                $("#buscar_expediente_reciente").val(ui.item.label);
                $("#espera_ubicacion").html("");
                /* Agregar tabla con resultado */
                $('#mostrar-datos-busqueda').html("");

                datos_en_fila = '';
                datos_en_fila += '<tr class="info text-info">';
                datos_en_fila += '<td width="8%">' + ui.item.value + '</td>';
                datos_en_fila += '<td width="8%">' + ui.item.fecha + '</td>';
                datos_en_fila += '<td>' + ui.item.hora + ' </td>';
                datos_en_fila += '<td>' + ui.item.actor_nombre + '</td>';
                datos_en_fila += '<td>' + ui.item.asunto + '</td>';
                datos_en_fila += '<td>' + ui.item.nro_documento + '</td>';
                datos_en_fila += '<td>' + ui.item.tipo + '</td>';
                datos_en_fila += '<td>' + ui.item.prioridad + '</td>';
                datos_en_fila += '<td>' + ui.item.accion1_nombre + '</td>';
                datos_en_fila += '<td>' + ui.item.observaciones + '</td>';
                datos_en_fila += '<td>' + ui.item.adjunto + '</td>';
                datos_en_fila += '<td><button type="button" name="editar" id="' + ui.item.value + ' - ' + ui.item.estado + '" class="btn btn-success  btn_editar crear-tooltip" data-toggle="tooltip" data-original-title="Ver/Editar Expediente">E</button>';
                datos_en_fila += '<button type="button" name="eliminar" id="' + ui.item.value + ' - ' + ui.item.estado + '" class="btn btn-danger  btn_eliminar crear-tooltip" data-toggle="tooltip" data-original-title="Eliminar expediente">X</button>';
                datos_en_fila += '<button type="button" name="retornar" id="' + ui.item.value + ' - ' + ui.item.estado + '" class="btn btn-info btn_retornar crear-tooltip" data-toggle="tooltip" data-original-title="Retornar expediente">R</button>';
                datos_en_fila += '<button type="button" name="hoja_ruta" id="' + ui.item.value + ' - ' + ui.item.estado + '" class="btn btn-primary btn_hoja_ruta crear-tooltip" data-toggle="tooltip" data-original-title="Hoja de Ruta">H</button>';
                datos_en_fila += '<button type="button" name="adjunto" id="' + ui.item.value + '" class="btn btn-success btn_adjunto crear-tooltip" data-toggle="tooltip" data-original-title="Adjunto">A</button></td>';
                datos_en_fila += '</tr>';

                $('#mostrar-datos-busqueda').append(datos_en_fila);




                /* fin de tabla */


                return false;
            }
        }
    });
    $("#buscar_expediente_reciente").autocomplete("option", "appendTo", ".mostrarexpedienteubicado");



    /* fin de ubicar expediente */




    $("#buscar").autocomplete({
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
                                tipo_actor: item.tipo_actor
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
                return false;
            } else {
                $("#buscar").val(ui.item.label);
                $("#txt_buscar_actor").val(ui.item.actor);
                mostrar_expedientes();
                return false;
            }
        }
    });
    $("#buscar").autocomplete("option", "appendTo", ".mostraractor");

    $('#fechainicio')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});

    $('#fechafin')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});



    $('#btn_limpiar').click(function() {
        $("#buscar").val('');
        $("#fechainicio").val(dia_mes_anio_real_time());
        $("#fechafin").val(dia_mes_anio_real_time());
        $("#txt_buscar_actor").val('');
        $("#txt_buscar_asunto").val('');
        $("#mostrardocumento").val('');
        $("#txt_id_tipo_doc").val('');
        lc_todos_usuario = '0';
        $("#TodosUsuarios").attr('checked', false);
        mostrar_expedientes();

    });

    $("#btn_busqueda_total").click(function() {
        mostrar_expedientes();
    });


    $("#btn_agregar_documento").click(function() {
        $("#txt_fecha_expediente").val(dia_mes_anio_real_time());
        $('#txt_hora_expediente').val('').val(mostrar_hora());
        $("#txt_nfolios").val('');
        $("#titulo_expediente").text("Registrar Expediente");
        $("#txt_nombre_remitente").val('').attr("disabled", true);
        $("#txt_asunto").val('').attr("disabled", true);
        $("#txt_idprioridad").val('');
        $("#txt_idprioridad").val('');
        $("#txt_plazo").val('');
        $("#txt_tipo_doc").val('').attr("disabled", true);
        $("#txt_nrodocumento").val('').attr("disabled", true);
        $("#txt_nfolios").val('').attr("disabled", true);
        $("#txt_accion1").val('').attr("disabled", true);
        $("#txt_accion2").val('').attr("disabled", true);
        $("#txt_referencia").val('').attr("disabled", true);
        $("#txt_idtreporte").val('');
        $("#txt_observacion").val('').attr("disabled", true);
        $("#subir_archivo").val('').attr("disabled", true);
        $('#subir_archivo_add').val("");
        $("#msj_subida").html("");
        mostrar_director();
        mostrar_tipo_reporte();
        mostrar_tipo_documento();
        $("#txt_tipo_reporte").val('').attr("disabled", true);
        $("#nombre_remitente").val('').attr("disabled", true);
        $("#txt_asunto").val('').attr("disabled", true);
        $("#txt_nrodocumento").attr("disabled", false).val('').focus();
        $("#msj_eliminado").html("").hide();
        $("#msj_eliminado_tdocumento").html('').hide();
        $('#md-registroexpediente').modal({ show: true, backdrop: 'static' });

    });


    $("#txt_tdocumento").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_tipo_documento',
                dataType: "json",
                data: { tdoc: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                label1: item.nombre,
                                value: item.tipo_documento
                            }
                        } else {
                            $("#txt_tipo_doc").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Identificado--'
                            }
                        }
                    }));
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
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Identificado--') {
                $("#txt_tipo_doc").val('');
                return false;
            } else {
                $("#txt_tdocumento").val(ui.item.label);
                $("#txt_tipo_doc").val(ui.item.value);
                $("#mostrar_msj_si_falta").html("");
                $("#txt_nrodocumento").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_tdocumento").autocomplete("option", "appendTo", ".mostrardocumento");


    /* para edicion */
    $("#txt_tdocumentoe").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_tipo_documento',
                dataType: "json",
                data: { tdoc: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                label1: item.nombre,
                                value: item.tipo_documento
                            }
                        } else {
                            $("#txt_tipo_doce").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Identificado--'
                            }
                        }
                    }));
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
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Identificado--') {
                $("#txt_tipo_doce").val('');
                return false;
            } else {
                $("#txt_tdocumentoe").val(ui.item.label);
                $("#txt_tipo_doce").val(ui.item.value);

                $("#txt_nrodocumentoe").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_tdocumentoe").autocomplete("option", "appendTo", ".mostrardocumentoe");

    $("#txt_tdocumentoe").keypress(function(e) {
        $("#txt_nrodocumentoe").attr("disabled", false);
        $("#txt_nfoliose").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nrodocumentoe").focus();

        }
    });

    $('#txt_fecha_expediente_update')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});



    /* fin de edicion */

    /* para busqueda */

    $("#mostrardocumento").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_tipo_documento',
                dataType: "json",
                data: { tdoc: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                label1: item.nombre,
                                value: item.tipo_documento
                            }
                        } else {
                            $("#txt_id_tipo_doc").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Identificado--'
                            }
                        }
                    }));
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
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Identificado--') {
                $("#txt_id_tipo_doc").val('');
                return false;
            } else {
                $("#mostrardocumento").val(ui.item.label);
                $("#txt_id_tipo_doc").val(ui.item.value);
                return false;
            }
        }
    });
    $("#mostrardocumento").autocomplete("option", "appendTo", ".buscardocumento");


    /* fin de busqueda tipo documento */

    $('#txt_fecha_expediente')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});


    $("#txt_nrodocumento").keypress(function(e) {

        if ($("#txt_tipo_doc").val() == '') {
            $("#mostrar_msj_si_falta").html("- Falta documento -");
            $("#txt_tdocumento").val('').focus();
        } else {
            var etiqueta_jquery = $("#txt_nfolios");
            $("#mostrar_msj_si_falta").html("");
            etiqueta_jquery.attr("disabled", false);
            if (e.which === 13) {
                etiqueta_jquery.focus();

            }
        }
    });

    $("#txt_nrodocumentoe").keypress(function(e) {
        var etiqueta_jquery = $("#txt_nfoliose");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });



    $("#txt_nrodocumentoe").change(function() {
        var etiqueta_jquery = $("#txt_nfoliose");
        etiqueta_jquery.attr("disabled", false).css("background-color", "#f7f5c1").focus();

    });

    $("#txt_nfoliose").keypress(function(e) {
        var etiqueta_jquery = $("#txt_remitente");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#txt_nfolios").change(function() {
        var etiqueta_jquery = $("#txt_remitente");
        $("#btn_agregar_remitente").attr("disabled", false);
        etiqueta_jquery.attr("disabled", false).css("background-color", "#f7f5c1").focus();

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
                                tipo_actor: item.tipo_actor
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
                $("#txt_remitente").val(ui.item.label);
                $("#txt_idactor").val(ui.item.actor);
                $("#txt_idtipo_actor").val(ui.item.tipo_actor);
                $("#txt_tipo_actor").val(ui.item.mostrar_actor);
                $("#txt_nombre_remitente").val(ui.item.descripcion);
                $("#txt_asunto").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_remitente").autocomplete("option", "appendTo", ".mostrarremitente");


    /* remitente para edicion */

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
                                tipo_actor: item.tipo_actor
                            }
                        } else {
                            $("#ver_responsable").html('').hide();
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
                $("#txt_nombre_remitente_update").val('');
                return false;
            } else {
                $("#txt_remitente_update").val(ui.item.label);
                $("#txt_idactor_update").val(ui.item.actor);
                $("#txt_idtipo_actor_update").val(ui.item.tipo_actor);
                $("#txt_tipo_actor_update").val(ui.item.mostrar_actor);
                $("#txt_nombre_remitente_update").val(ui.item.descripcion);
                $("#txt_asunto_update").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_remitente_update").autocomplete("option", "appendTo", ".mostrarremitente_update");



    /* fin de remitente para edicion */





    $("#txt_remitente").keypress(function(e) {
        var etiqueta_jquery = $("#txt_asunto");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $("#txt_asunto").keypress(function(e) {
        var etiqueta_jquery = $("#txt_prioridad");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    /* asunto para edicion */
    $("#txt_asunto_update").keypress(function(e) {
        var etiqueta_jquery = $("#txt_prioridad");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });



    /* finde asunto para edicion */

    /* prioridad edicion */
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
                return false;
            }
        }
    });
    $("#txt_prioridad_update").autocomplete("option", "appendTo", ".mostrarremitente_update");


    /* fin de prioridad de edicion */


    $("#txt_prioridad").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/ver_prioridad',
                dataType: "json",
                data: { prio: request.term },
                success: function(data) {
                    console.log(data);
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
    $("#txt_prioridad").autocomplete("option", "appendTo", ".mostrarprioridad");

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
                $("#txt_observacion").attr("disabled", false);
                $("#btn_grabar_expediente").attr("disabled", false);
                $("#subir_archivo").val('').attr("disabled", false);
                $("#msj_subida").html("");
                $("#txt_referencia").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion2").autocomplete("option", "appendTo", ".mostraraccion2");

    // accion1, accion2 
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
                return false;
            }
        }
    });
    $("#txt_accion2_update").autocomplete("option", "appendTo", ".mostraraccion2_update");


    $('#btn_hablitar_edicion').click(function() {
        $('#txt_fecha_expediente_update').attr("disabled", false);
        $('#txt_hora_expediente_update').attr("disabled", false);
        $("#txt_tdocumentoe").attr("disabled", false);
        $("#txt_nrodocumentoe").attr("disabled", false);
        $("#txt_nfoliose").attr("disabled", false);
        $("#txt_remitente_update").attr("disabled", false);
        $("#txt_asunto_update").attr("disabled", false);
        $("#txt_prioridad_update").attr("disabled", false);
        $("#txt_accion1_update").attr("disabled", false);
        $("#txt_accion2_update").attr("disabled", false);
        $("#txt_referencia_update").attr("disabled", false);
        $("#txt_observacion_update").attr("disabled", false);
        $("#btn_grabar_edicion_expediente").attr("disabled", false);
    });


    $("#btn_grabar_edicion_expediente").click(function() {
        $("#btn_grabar_edicion_expediente").attr("disabled", true);
        grabar_edicion_expediente();
    });



    /* fin de edicion */




    $("#txt_referencia").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_referencia',
                dataType: "json",
                data: { referencia: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.expediente,

                            }
                        } else {
                            $("#txt_referencia").val('');
                            $("#txt_idexpediente").val('');
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
                $("#ver_msjreferencia").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_referencia").val('');
                $("#txt_idexpediente").val('');
                return false;
            } else {
                $("#txt_referencia").val(ui.item.label);
                $("#txt_idexpediente").val(ui.item.value);
                $("#txt_observacion").attr("disabled", false).focus();
                $("#btn_grabar_expediente").attr("disabled", false);
                return false;
            }
        }
    });
    $("#txt_referencia").autocomplete("option", "appendTo", ".mostrarreferencia");

    $("#btn_grabar_expediente").click(function() {
        grabar_registro_expediente();
        $("#txt_nrodocumento").val('').attr("disabled", true);
        $("#txt_nfolios").val('').attr("disabled", true);
        $("#txt_remitente").val('').attr("disabled", true);
        $("#txt_asunto").val('').attr("disabled", true);
        $("#txt_prioridad").val('').attr("disabled", true);
        $("#txt_accion1").val('').attr("disabled", true);
        $("#txt_accion2").val('').attr("disabled", true);
        $("#txt_referencia").val('').attr("disabled", true);
        $("#txt_observacion").val('').attr("disabled", true);
        $("#btn_grabar_expediente").attr("disabled", true);
        $("#txt_tdocumento").val('');
        $("#txt_tipo_doc").val('');
        $('#subir_archivo_add').val("");
        $("#txt_tdocumento").focus();
    });



    /* fin del modal agregar expediente */


    /* inicio entidad */
    $("#txt_buscar_entidad")
        .focus()
        .keyup(function() {
            lc_buscar_entidad = $("#txt_buscar_entidad").val();
            listar_entidad(lc_buscar_entidad);
        });


    $("#slt_lista_entidades")
        .click(function() {
            leer_entidades_mostrarlo();
        })
        .keyup(function() {
            leer_entidades_mostrarlo();
        });


    $("#btn_nuevo_entidad").click(function() {
        lc_tipo_operacion_entidad = '1';
        desabilitar_y_limpiar_etiquetas_entidad();
    });

    $("#btn_editar_entidad").click(function() {
        lc_tipo_operacion_entidad = '2';
        $('#txt_descripcion').attr("disabled", false);
        $('#txt_telefono').attr("disabled", false);
        $('#txt_ruc').attr("disabled", false);
        $('#txt_direccion').attr("disabled", false);
        $('#btn_grabar_entidad').attr("disabled", false);
        $('#txt_descripcion').attr("disabled", false).focus();
    });

    $('#btn_eliminar_entidad').click(function() {
        eliminar_entidad();
        $('#txt_descripcion').val('').attr("disabled", true);
        $('#txt_telefono').val('').attr("disabled", true);
        $('#txt_ruc').val('').attr("disabled", true);
        $('#txt_direccion').val('').attr("disabled", true);
        $('#btn_grabar_entidad').attr("disabled", true);
        $('#btn_eliminar_entidad').attr("disabled", true);

    });





    $("#txt_descripcion").keypress(function(e) {
        var etiqueta_jquery = $("#txt_direccion");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });



    $("#txt_direccion").keypress(function(e) {
        var etiqueta_jquery = $('#txt_telefono');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $('#txt_telefono').keypress(function(e) {
        var etiqueta_jquery = $('#txt_ruc');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $('#txt_ruc').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_entidad');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });




    $("#btn_grabar_entidad").click(function() {
        switch (lc_tipo_operacion_entidad) {
            case '1':
                grabar_nueva_entidad();
                break;
            case '2':
                grabar_editar_entidad();
                break;
            default:
                break;
        }

    });


    /* fin de entidad */


    /* tipo de reporte */
    $("#txt_buscar_tdoc")
        .focus()
        .keyup(function() {
            lc_buscar_treporte = $("#txt_buscar_tdoc").val();
            listar_tipo_documento(lc_buscar_treporte);
        });



    $("#slt_lista_tdoc")
        .click(function() {
            leer_tipo_tdoc_y_mostrarlo();
        })
        .keyup(function() {
            leer_tipo_tdoc_y_mostrarlo();
        });

    $("#btn_nuevo_tdoc").click(function() {
        lc_tipo_operacion_tdoc = '1';
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $('#id_tipodocumento').val('');
        $("#txt_descripcion_tdocumento").val('').attr("disabled", false).focus();
    });


    $("#btn_editar_tdoc").click(function() {
        lc_tipo_operacion_tdoc = '2';
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", false);
        $("#txt_descripcion_tdocumento").attr("disabled", false).focus();
    });


    $('#txt_descripcion_tdocumento').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tdocumento');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });



    $("#btn_grabar_tdocumento").click(function() {
        switch (lc_tipo_operacion_tdoc) {
            case '1':
                grabar_nueva_tdoc();
                break;
            case '2':
                grabar_editar_tdoc();
                break;
            default:
                break;
        }

    });


    $('#btn_eliminar_tdoc').click(function() {
        eliminar_tdoc();
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $("#txt_descripcion_tdocumento").attr("disabled", true);
    });


    /* fin de tipo de reporte */

    $(document).on('click', '.btn_editar', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 12),
            lc_estado = lc_leer_compuesto.substring(14);
        if (lc_estado == '1' || lc_estado == '2' || lc_estado == '3' || lc_estado == '4') {
            mostrar_tipo_documento();
            $("#nro_expediente").text(" Expediente Nro : " + lc_expediente);
            $("#idexpediente").val(lc_expediente);
            recuperar_expediente_para_editar(lc_expediente);
            $('#EditarExpediente').modal({ show: true, backdrop: 'static' });
        } else {
            mostrar_mensaje_en_modal("alert-danger", 'No se puede editar expediente : ' + lc_expediente + ' <br><center> -- Fue desactivado o Anulado -- </center>');
        }
    });


    $(document).on('click', '.btn_eliminar', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 12),
            lc_estado = lc_leer_compuesto.substring(14);
        if (lc_estado == '1' || lc_estado == '2' || lc_estado == '3' || lc_estado == '4') {
            $("#idexpediente").val(lc_expediente);
            $('#EliminarExpediente').modal({ show: true, backdrop: 'static' });
        } else {
            mostrar_mensaje_en_modal("alert-danger", 'Expediente : ' + lc_expediente + ' <br><center> -- Fue desactivado o Anulado -- </center>');
        }
    });



    $(document).on('click', '.btn_retornar', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 12),
            lc_estado = lc_leer_compuesto.substring(14);
        switch (lc_estado) {
            case '0':
                mostrar_mensaje_en_modal("alert-danger", 'Expediente : ' + lc_expediente + ' <br><center> -- Fue desactivado o Anulado -- </center>');
                break;

            case '1':
                mostrar_mensaje_en_modal("alert-info", 'Expediente : ' + lc_expediente + ' <br><center> -- Fue recuperado -- </center>');
                break;

            case '2':
                recuperar_expediente_estado(lc_expediente);
                break;

            case '3':
                mostrar_mensaje_en_modal("alert-warning", 'Expediente : ' + lc_expediente + ' <br><center> -- Esta derivado en otras unidades-- </center>');
                break;

            case '4':
                mostrar_mensaje_en_modal("alert-default", 'Expediente : ' + lc_expediente + ' <br><center> -- Esta Archivado-- </center>');
                break;
            default:
                break;
        }
    });

    $(document).on('click', '.btn_hoja_ruta', function() {
        var lc_leer_compuesto = $(this).attr("id"),
            lc_expediente = lc_leer_compuesto.substring(0, 12);
        window.open(url + 'imprimir/impresion_hoja_de_envio?min=' + lc_expediente + '&max=' + lc_expediente);
    });






    /* seccion imprimir expediente */
    $('#btn_imprimir_expediente').click(function() {
        ver_si_existe_fecha();
        ver_expediente_ini_final();
        $('#md_imprimir_expediente').modal({ show: true, backdrop: 'static' });
    });

    $('#btn_impresion_de_expediente').click(function() {
        var lc_expediente_inicio = $('#nro_expedienteinicial').val(),
            lc_expediente_final = $('#nro_expedientefinal').val();
        window.open(url + 'imprimir/impresion_hoja_de_envio?min=' + lc_expediente_inicio + '&max=' + lc_expediente_final);
    });

    /* fin de seccion imprimir expediente */

    //#endregion - fin de code

    $('#btn_procesar').click(function() {
        ver_expediente_ini_final_procesar();
    });

    /* solo funcion para recuperacion o retorno */

    $('#btn_procesarexpediente').click(function() {
        ver_si_existe_fecha();
        lc_procesar_inicio = $('#nro_inicioprocesar').val(),
            lc_procesar_final = $('#nro_finprocesar').val();
        procesar_expedientes_para_estado_2(lc_procesar_inicio, lc_procesar_final);
    });


    /* seccion eliminar expediente */
    $('#btn_eliminar_expediente').click(function() {
        var lc_expediente_eliminar = $("#idexpediente").val();
        eliminar_expediente_registrado(lc_expediente_eliminar);
    });
    /* fin de eliminar expediente */


    /* kardex expediente */




    /* seccion descargar expedientes */
    $('#btn_descargar_expedientes_excel').click(function() {
        ver_si_existe_fecha();
        var fechaInicio = $('#fechainicio').val(),
            fechaFin = $('#fechafin').val();
        // window.open(url + 'imprimir/EnvioArchivoExcelRecibidosx?Ini=' + fechaInicio + '&Fin=' + fechaFin + '&todosuser=' + lc_todos_usuario);
        window.open(url + 'imprimir/DescargarExcelOTD?Ini=' + fechaInicio + '&Fin=' + fechaFin + '&todosuser=' + lc_todos_usuario);

    });
    /* fin de descargar expedientes */

    /* adjuntar archivo */
    $("#subir_archivo").change(function() {
        archivo_subir = this.files[0],
            lc_nombre_archivo = archivo_subir["name"],
            etiqueta_dom_txt = 'subir_archivo',
            etiqueta_dom = $("#subir_archivo"),
            msj_dom = $("#msj_subida");
        if (archivo_subir["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir["size"] > 500000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 50 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir);
            $.ajax({
                dataType: 'json',
                url: url + 'expediente/subir_pdf',
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

                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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
    /* fin de adjuntar archivo */
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
        eliminar_adjunto_en_expediente(lc_expediente);
        $('#btn_eliminar_adjunto').attr("disabled", true);
    });




});