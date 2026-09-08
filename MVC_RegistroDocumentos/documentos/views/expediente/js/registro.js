var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    tabla, nro_registros = 0,
    datos_en_fila = '',
    datos_cabecera = '',
    lc_cargo_id = '',
    leer_expediente = '',
    lc_trc = 'T',
    lc_tipo_operacion = '',
    lc_valor_todo_mes = '0',
    nro_expedientes = 0,
    lc_nombre_archivo = "",
    archivo_subir = "";

// btn_impresion_masiva_ht

//#region 
function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function ver_si_existe_fecha_areas() {
    if ($('#txt_fecha_documento').val() == '') {
        $('#txt_fecha_documento').val(dia_mes_anio_real_time());
    };
    if ($('#txt_fecha_documento').val() == '') {
        $('#txt_fecha_documento').val(dia_mes_anio_real_time());
    };
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
            $("#txt_tdocumento").val('');
            $("#txt_tipo_doc").val('');


        }
    });
}

function mostrar_hora() {
    var fecha = new Date(Date.now()),
        lc_hora_minuto_segundo_real_time = (('' + fecha.getHours()).length < 2 ? '0' : '') + fecha.getHours() + ':' + (('' + fecha.getMinutes()).length < 2 ? '0' : '') + fecha.getMinutes();
    return lc_hora_minuto_segundo_real_time;
}


function mostrar_director_areas() {

    $.ajax({
        dataType: 'json',
        url: url + 'expediente/mostrar_director_areas',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            var descrip = (datos[0].descripcion),
                descripcion_area_actor = (datos[0].descripcion_tipo_actor)
            tipo_actor = (datos[0].tipo_actor);
            $("#txt_descripcion_actor").val(descripcion_area_actor);
            $("#txt_id_actor").val(tipo_actor);
        }
    });
}


function seleccion_de_actor_grabarlo_y_mostrarlo_table_cc() {
    var lid_actor = $("#txt_idactor_destino_cc").val(),
        lc_descrip = $('#txt_remitente_cc').val();
    $.ajax({
        data: { 'actor': lid_actor, 'descripcion': lc_descrip },
        dataType: 'json',
        url: url + 'expediente/grabar_actor_cc_temporal',
        type: 'post',
        beforeSend: function() {
            $("#areas_seleccionado").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $('#txt_remitente_cc').val('');
            $('#txt_idactor_destino_cc').val('');
            seleccion_actores_cc();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) PestaÃ±a : Consola para revisar !');
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

function seleccion_actores_cc() {
    $("#nro_cc").html("0");
    var etiqueta_select = $("#slc_concopia"),
        nro_registros_sele = 0;
    $.ajax({
        dataType: 'json',
        url: url + 'expediente/listar_actores_cc_temp',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            etiqueta_select.html("");
            nro_registros_sele = encontrados.length;
            if (nro_registros_sele > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        etiqueta_select.append('<option id="' + filas.idexpedientecc +
                            '"  >' + filas.descripcion_cc + '</option>');
                        etiqueta_select.attr("disabled", false);
                        $("#nro_cc").html(nro_registros_sele);

                    } else {
                        etiqueta_select.html("0").attr("disabled", true);
                    }

                });
            } else {
                etiqueta_select.html("").attr("disabled", true);
                $("#nro_cc").html("0");
            }
        }
    });

}

function eliminar_actor_de_cc_temp(lid_cc_copia) {
    $.ajax({
        data: { id: lid_cc_copia },
        url: url + 'expediente/eliminar_cc_temp',
        dataType: "json",
        type: 'post',
        success: function() {
            seleccion_actores_cc();
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

//#endregion



function grabar_expediente_interareas() {
    ver_si_existe_fecha_areas();
    var lc_fecha_expediente_destino = $('#txt_fecha_documento').val(),
        lc_hora_expediente_destino = $('#txt_hora_documento').val(),
        lc_idactor_destino = $("#txt_id_actor").val(),
        lc_txtremitente_destino = $("#txt_destino").val(),
        lc_idactor_remitente_destino = $("#txt_actor_atencion_destino").val(),
        lid_txt_idtreporte = $("#txt_idtreporte").val(),
        lc_idtipodoc_destino = $("#txt_tipo_doc_area").val(),
        lc_nro_documento_destino = $("#txt_nrodocumento_area").val(),
        ln_folios_destino = $("#txt_nfolios_area").val(),
        lc_actor_atencion_destino = $("#txt_idactor_destino").val(),
        lc_nombre_destino = $("#txt_nombre_remitente_destino").val(),
        lc_asunto_destino = $("#txt_asunto_destino").val(),
        lc_idprioridad_destino = $("#txt_idprioridad_destino").val(),
        ln_plazo_destino = $("#txt_plazo_destino").val(),
        lc_txt_accion1_destino = $("#txt_tipo_accion1_destino").val(),
        lc_txt_accion2_destino = $("#txt_tipo_accion2_destino").val(),
        lc_referencia_destino = $("#txt_referencia_destino").val(),
        lc_observacion_destino = $("#txt_observacion_destino").val(),
        datos_expediente_areas = {
            "fecha": lc_fecha_expediente_destino,
            "hora": lc_hora_expediente_destino,
            "idactor": lc_idactor_destino,
            "remitente": lc_txtremitente_destino,
            "idactor_remitente": lc_idactor_remitente_destino,
            "idreporte": lid_txt_idtreporte,
            "idtipodoc": lc_idtipodoc_destino,
            "nro_doc": lc_nro_documento_destino,
            "folios": ln_folios_destino,
            "idactor_atencion": lc_actor_atencion_destino,
            "nombre_destino": lc_nombre_destino,
            "asunto": lc_asunto_destino,
            "idprioridad": lc_idprioridad_destino,
            "plazo": ln_plazo_destino,
            "idaccion1": lc_txt_accion1_destino,
            "idaccion2": lc_txt_accion2_destino,
            "referencia": lc_referencia_destino,
            "observacion": lc_observacion_destino,
            "adjunto": lc_nombre_archivo
        };
    $.ajax({
        data: datos_expediente_areas,
        dataType: 'json',
        url: url + 'expediente/registrar_expediente_areas',
        type: 'post',
        beforeSend: function() {
            $('#msj_esperar_grabar').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(exp) {
            desabilitar_casilleros_expedientes_areas();
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


function desabilitar_casilleros_expedientes_areas() {
    $('#txt_fecha_documento').attr("disabled", true);
    $('#txt_hora_documento').attr("disabled", true);
    $("#titulo_expediente").text("Registrar Expediente");
    $("#txt_nombre_remitente").attr("disabled", true);
    $("#txt_tipo_reporte").attr("disabled", true);
    $("#nombre_remitente").attr("disabled", true);
    $("#txt_nrodocumento_area").attr("disabled", true);
    $("#txt_nfolios_area").attr("disabled", true);
    $("#txt_tdocumento_area").attr("disabled", false);
    $("#txt_remitente_destino").attr("disabled", true);
    $("#txt_nombre_remitente_destino").attr("disabled", true);
    $("#txt_asunto_destino").attr("disabled", true);
    $("#txt_prioridad_destino").attr("disabled", true);
    $("#txt_accion1_destino").attr("disabled", true);
    $("#txt_accion2_destino").attr("disabled", true);
    $("#txt_referencia_destino").attr("disabled", true);
    $("#btn_ccopia").attr("disabled", true);
    $("#slc_total_areas").attr("disabled", true);
    $("#slc_concopia").attr("disabled", true);
    $("#txt_observacion_destino").attr("disabled", true);
    $("#nombre_archivo_area").val('');
    $("#subir_archivo_area").val('').attr("disabled", true);
    $("#msj_subida_area").html("");
    $("#msj_eliminado_destino").hide();
    $("#msj_eliminado_tdocumento").hide();
    $("#btn_ccopia").attr("disabled", true);
}


function grabar_expedientes_impresion_temporal(lc_expediente, IDUser) {
    var save_expe = { "expe": lc_expediente, "iduser": IDUser };
    $.ajax({
        data: save_expe,
        dataType: 'json',
        url: url + 'expediente/expedientes_impresion',
        type: 'post',
        beforeSend: function() {
            $('#msj_esperar_grabar').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(exp) {}
    });





}

$(document).ready(function() {


    //#region 
    $('.crear-tooltip').tooltip();
    $('#txt_fecha_documento')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    ver_si_existe_fecha_tramite();
    $("#btn_crear_documento").click(function() {
        $('#txt_fecha_documento').val(dia_mes_anio_real_time());
        $('#txt_hora_documento').val('').val(mostrar_hora());
        $("#titulo_expediente").text("Registrar Expediente");
        $("#txt_nombre_remitente").val('').attr("disabled", true);
        $("#txt_tipo_reporte").val('').attr("disabled", true);
        $("#nombre_remitente").val('').attr("disabled", true);
        $("#txt_asunto").val('').attr("disabled", true);
        $("#txt_nrodocumento_area").attr("disabled", true).val('');
        $("#txt_nfolios_area").attr("disabled", true).val('');
        $("#txt_tdocumento_area").attr("disabled", false).val('');
        $("#txt_remitente_destino").attr("disabled", true).val('');
        $("#txt_idactor_destino").val('');
        $("#txt_nombre_remitente_destino").attr("disabled", true).val('');
        $("#txt_idtipo_actor_destino").val('');
        $("#txt_asunto_destino").attr("disabled", true).val('');
        $("#txt_prioridad_destino").attr("disabled", true).val('');
        $("#txt_plazo_destino").val('');
        $("#txt_accion1_destino").val('').attr("disabled", true);
        $("#ver_msj_destino").html("").hide();
        $("#txt_tipo_accion1_destino").val('');
        $("#txt_accion2_destino").val('').attr("disabled", true);
        $("#ver_msjaccion2_destino").html("").hide();
        $("#txt_tipo_accion2_destino").val('');
        $("#txt_referencia_destino").val('').attr("disabled", true);
        $("#ver_msjreferencia_destino").html("").hide();
        $("#txt_idexpediente_destino").val('');
        $("#btn_ccopia_cc").attr("disabled", true);
        $("#txt_remitente_cc").val("").attr("disabled", true);
        $("#txt_idactor_destino_cc").val('');
        $("#slc_concopia").html("").attr("disabled", true);
        $("#areas_seleccionado").html("");
        $("#nro_cc").html("");
        $("#btn_eliminar_cc").attr("disabled", true);
        $("#txt_observacion_destino").val('').attr("disabled", true);
        $("#nombre_archivo_area").val('');
        $("#subir_archivo_area").val('').attr("disabled", true);
        $("#msj_subida_area").html("");
        $("#msj_eliminado_destino").html("").hide();
        $("#msj_eliminado_tdocumento").html('').hide();
        mostrar_director_areas();
        mostrar_tipo_reporte();
        mostrar_tipo_documento();
        $("#btn_grabar_expediente_destino").attr("disabled", true);
        $("#btn_ccopia").attr("disabled", true);
        $('#md-registroexpediente_areas').modal({ show: true, backdrop: 'static' });
    });

    $("#txt_tdocumento_area").autocomplete({
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
                            $("#txt_tipo_doc_area").val('');
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
                $("#txt_tipo_doc_area").val('');
                return false;
            } else {
                $("#txt_tdocumento_area").val(ui.item.label);
                $("#txt_tipo_doc_area").val(ui.item.value);
                $("#mostrar_msj_si_falta").html("");
                $("#txt_nrodocumento_area").attr("disabled", false).focus();

                return false;
            }
        }
    });
    $("#txt_tdocumento_area").autocomplete("option", "appendTo", ".mostrardocumentoarea");

    $("#txt_tdocumento_area").keypress(function(e) {
        $("#txt_nrodocumento_area").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nrodocumento_area").attr("disabled", false).focus();
        }

    });

    $("#txt_nrodocumento_area").keypress(function(e) {
        $("#txt_nfolios_area").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nfolios_area").attr("disabled", false).focus();
        }

    });


    $("#txt_nfolios_area").change(function() {
        var etiqueta_jquery = $("#txt_remitente_destino");
        etiqueta_jquery.attr("disabled", false).css("background-color", "#f7f5c1").focus();

    });

    $("#txt_nfolios_area").keypress(function() {
        var etiqueta_jquery = $("#txt_remitente_destino");
        etiqueta_jquery.attr("disabled", false).css("background-color", "#f7f5c1");

    });

    $("#txt_remitente_destino").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/listar_remitente_areas',
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
                            $("#ver_responsable_destino").html('').hide();
                            $("#txt_idactor_destino").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Error, Revisar consola - listar_remitente_areas ');
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
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_actor_destino").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idactor_destino").val('');
                $("#txt_nombre_remitente_destino").val('');
                return false;
            } else {
                $("#txt_remitente_destino").val(ui.item.label);
                $("#txt_idactor_destino").val(ui.item.actor);
                $("#txt_idtipo_actor_destino").val(ui.item.tipo_actor);
                $("#txt_tipo_actor_destino").val(ui.item.mostrar_actor);
                $("#txt_nombre_remitente_destino").val(ui.item.descripcion);
                $("#txt_asunto_destino").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_remitente_destino").autocomplete("option", "appendTo", ".mostrarremitentedestino");

    $("#txt_remitente_destino").keypress(function(e) {
        var etiqueta_jquery = $("#txt_asunto_destino");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $("#txt_asunto_destino").keypress(function(e) {
        var etiqueta_jquery = $("#txt_prioridad_destino");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#txt_prioridad_destino").autocomplete({
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
                            $("#ver_responsable_destino").html('').hide();
                            $("#txt_idprioridad_destino").val('');
                            $("#txt_plazo_destino").val('');
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
                $("#ver_msj_destino").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#txt_idprioridad_destino").val('');
                $("#txt_plazo_destino").val('');
                return false;
            } else {
                $("#txt_prioridad_destino").val(ui.item.label);
                $("#txt_idprioridad_destino").val(ui.item.value);
                $("#txt_plazo_destino").val(ui.item.dias);
                $("#txt_accion1_destino").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_prioridad_destino").autocomplete("option", "appendTo", ".mostrarprioridad_destino");



    $("#txt_accion1_destino").autocomplete({
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
                            $("#txt_accion1_destino").val('');
                            $("#txt_tipo_accion1_destino").val('');
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
                $("#ver_msjaccion_destino").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion1_destino").val('');
                $("#txt_tipo_accion1_destino").val('');
                return false;
            } else {
                $("#txt_accion1_destino").val(ui.item.label);
                $("#txt_tipo_accion1_destino").val(ui.item.value);
                $("#txt_accion2_destino").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion1_destino").autocomplete("option", "appendTo", ".mostraraccion1_destino");



    $("#txt_accion2_destino").autocomplete({
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
                            $("#txt_accion2_destino").val('');
                            $("#txt_tipo_accion2_destino").val('');
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
                $("#ver_msjaccion2_destino").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_accion2_destino").val('');
                $("#txt_tipo_accion2_destino").val('');
                return false;
            } else {
                $("#txt_accion2_destino").val(ui.item.label);
                $("#txt_tipo_accion2_destino").val(ui.item.value);
                $("#txt_observacion_destino").attr("disabled", false);
                $("#btn_grabar_expediente_destino").attr("disabled", false);
                $("#nombre_archivo_area").val('');
                $("#subir_archivo_area").attr("disabled", false);
                $("#msj_subida_area").html("");
                $("#btn_ccopia_cc").attr("disabled", false);
                $("#txt_referencia_destino").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_accion2_destino").autocomplete("option", "appendTo", ".mostraraccion2_destino");



    $("#btn_ccopia_cc").click(function() {
        $("#txt_remitente_cc").val('').attr("disabled", false).focus();
        $("#slc_concopia").html("").attr("disabled", true);
    });


    $("#txt_referencia_destino").autocomplete({
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
                            $("#txt_referencia_destino").val('');
                            $("#txt_idexpediente_destino").val('');
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
                $("#ver_msjreferencia_destino").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_referencia_destino").val('');
                $("#txt_idexpediente_destino").val('');
                return false;
            } else {
                $("#txt_referencia_destino").val(ui.item.label);
                $("#txt_idexpediente_destino").val(ui.item.value);
                $("#txt_observacion_destino").attr("disabled", false).focus();
                $("#btn_grabar_expediente_destino").attr("disabled", false);
                $("#txt_remitente_cc").attr("disabled", false);
                return false;
            }
        }
    });
    $("#txt_referencia_destino").autocomplete("option", "appendTo", ".mostrarreferencia_destino");

    $("#txt_remitente_cc").autocomplete({
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
                                actor: item.actor,
                            }
                        } else {
                            $("#ver_actor_destino_cc").html('').hide();
                            $("#txt_idactor_destino_cc").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 3,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_actor_destino_cc").html('-- NO REGISTRADO--').fadeIn("slow").fadeOut("slow");
                $("#txt_idactor_destino_cc").val('');
                $("#txt_remitente_cc").val('');
                return false;
            } else {
                $("#txt_idactor_destino_cc").val(ui.item.actor);
                var lc_actor_registra = $("#txt_actor_atencion_destino").val(),
                    lc_id_actor_seleccion = $("#txt_idactor_destino").val();
                if (lc_actor_registra === lc_id_actor_seleccion) {
                    $("#ver_actor_destino_cc").html('<center><strong><font color="red"> -- El Actor con CC no puede ser igual al Actor de Sesion, Verifique -- </font></strong></center>');
                    return true;

                } else {
                    $("#ver_actor_destino_cc").html('');
                    $("#txt_remitente_cc").val(ui.item.label);
                    $("#txt_idactor_destino_cc").val(ui.item.actor);
                    seleccion_de_actor_grabarlo_y_mostrarlo_table_cc();
                    return false;

                }
            }
        }
    });
    $("#txt_remitente_cc").autocomplete("option", "appendTo", ".mostrarremitentedestino_cc");

    $("#txt_remitente_cc").keyup(function(e) {
        if ($("#txt_remitente_cc").val() === '') {
            $("#txt_idactor_destino_cc").val('');
            $("#txt_nombre_actor_cc").val('');
            $("#btn_grabar_derivar").attr("disabled", true);
        }
    });

    $("#txt_remitente_cc").keypress(function(e) {
        var lc_actor_registra = $("#txt_actor_atencion_destino").val(),
            lc_id_actor_remite = $("#txt_remitente_cc").val(),
            ubicar_actor = { "ubicar_actor": lc_id_actor_remite };
        if (e.which === 13) {
            if (lc_actor_registra === lc_id_actor_remite) {
                $("#ver_actor_destino_cc").html('<center><strong><font color="red"> -- El Actor con CC no puede ser igual al Actor de Sesion, Verifique -- </font></strong></center>');
                return true;
            } else {
                $("#ver_actor_destino_cc").html('');
                $.ajax({
                    data: ubicar_actor,
                    dataType: 'json',
                    url: url + 'expediente/listar_remitente_buscando_Actor',
                    type: 'post',
                    success: function(data) {
                        $("#txt_remitente_cc").val(data[0].actor_descripcion);
                        $("#txt_idactor_destino_cc").val(data[0].actor);
                        seleccion_de_actor_grabarlo_y_mostrarlo_table_cc();
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

    $("#slc_concopia")
        .click(function() {
            $("#btn_eliminar_cc").attr("disabled", false)
        })
        .keyup(function() {
            $("#btn_eliminar_cc").attr("disabled", false)
        });

    $("#btn_eliminar_cc").click(function() {
        var lid_cc_copia = $('#slc_concopia  option:selected').attr('id');
        eliminar_actor_de_cc_temp(lid_cc_copia);
        $("#btn_eliminar_cc").attr("disabled", true);
    });


    //#endregion

    $("#btn_grabar_expediente_destino").click(function() {
        $("#btn_grabar_expediente_destino").attr("disabled", true);
        var etiqueta_espera = $('#msj_esperar_grabar');
        etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        grabar_expediente_interareas();
        setTimeout(function() {
            etiqueta_espera.html("");
            $('#md-registroexpediente_areas').modal('toggle');
        }, 2000);
        lc_trc = 'D';
        mostrar_tramite_recepcion_culminados(lc_trc);
        $("#btn_recibir").fadeOut("slow");
        $("#tramite")
            .prop("checked", false);
        $("#recepcion")
            .prop("checked", false);
        $("#derivar")
            .prop("checked", true);
        $("#btn_impresion_masiva_ht").attr("disabled", false).fadeIn("slow");
        $("#culminado")
            .prop("checked", false);
    });

    $("#btn_impresion_masiva_ht").click(function() {
        if ($("input:checkbox:checked").length > 0) {
            var nro_expedientes_imprimir = $("input:checkbox:checked").length;
            $("#nro_expedientes_a_imprimir").val(nro_expedientes_imprimir);
            $("#mostrar_nro_impresion").text("CONFIRME LA IMPRESION DE : " + nro_expedientes_imprimir + ' HOJAS DE TRAMITE');
            $("#btn_confirmar_impresion_multiple").attr("disabled", false);
            $("#btn_confirmar_impresion_multiple_descargar").attr("disabled", false);
            $('#confirmar_impresion_multiple').modal({ show: true, backdrop: 'static' });
        } else {
            mostrar_mensaje_en_modal("alert-info", '<center>No selecciono ningun expediente, para Imprimir sus Hoja de Tramite</center>');
        }
    });

    $("#btn_confirmar_impresion_multiple_descargar").click(function() {
        var ln_tiempo_impresion = $("#nro_expedientes_a_imprimir").val() * 400;
        $("#mostrar_mensaje_impresion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        $("input:checkbox:checked").each(function() {
            var lc_leer_compuesto = $(this).val(),
                lc_expediente = lc_leer_compuesto.substring(0, 11),
                lc_numero = lc_leer_compuesto.substring(12);
            window.open(url + 'imprimir/impresion_hoja_de_tramite_adjunto?min=' + lc_expediente + '&max=' + lc_expediente);
        });
        setTimeout(function() {
            $("#mostrar_mensaje_impresion").html("");
            $("#nro_expedientes_a_imprimir").val(0)
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $('#confirmar_impresion_multiple').modal('toggle');
        }, ln_tiempo_impresion);
        $("#btn_confirmar_impresion_multiple_descargar").attr("disabled", true);
    });

    $("#btn_confirmar_impresion_multiple").click(function() {
        var ln_tiempo_impresion = $("#nro_expedientes_a_imprimir").val() * 400,
            IDUser = "I" + parseInt(Math.random() * 100000000).toString();
        $("#mostrar_mensaje_impresion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        $("input:checkbox:checked").each(function() {
            var lc_leer_compuesto = $(this).val(),
                lc_expediente = lc_leer_compuesto.substring(0, 11),
                lc_numero = lc_leer_compuesto.substring(12);
            if (lc_expediente !== 'on') {
                grabar_expedientes_impresion_temporal(lc_expediente, IDUser);
            }
        });
        setTimeout(function() {
            $("#mostrar_mensaje_impresion").html("");
            $("#nro_expedientes_a_imprimir").val(0)
            $("#btn_selec:checkbox:checked").removeAttr("checked");
            lc_trc = 'D';
            mostrar_tramite_recepcion_culminados(lc_trc);
            $('#confirmar_impresion_multiple').modal('toggle');
            window.open(url + 'imprimir/impresion_hoja_de_tramite_total?id=' + IDUser, '_blank');
        }, ln_tiempo_impresion);
        $("#btn_confirmar_impresion_multiple").attr("disabled", true);

    });

    $("#subir_archivo_area").change(function() {
        archivo_subir = this.files[0],
            lc_nombre_archivo = archivo_subir["name"],
            etiqueta_dom_txt = 'subir_archivo_area',
            etiqueta_dom = $("#subir_archivo_area"),
            msj_dom = $("#msj_subida_area");
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
                url: url + 'expediente/subir_pdf_area',
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


});