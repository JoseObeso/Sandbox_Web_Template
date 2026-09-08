var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js';


function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}


function mostrar_kardex_expediente() {
    var lc_select_entidad = $("#nro_expediente"),
        lc_espera = $("#espera_busqueda");
    $.ajax({
        dataType: 'json',
        url: url + 'consultas/mostrar_kardex_expediente',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad.val('').val(datos[0].expediente_id).attr("disabled", false);
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

function ubicar_expediente(lc_expediente_buscar) {
    $.ajax({
        data: { "id": lc_expediente_buscar },
        dataType: 'json',
        url: url + 'consultas/recuperar_expediente_kardex',
        type: 'post',
        beforeSend: function() {
            $("#nro_expediente").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            if (encontrados[0].respuesta == 1) {
                $("#txt_nro_expediente").val(encontrados[0].expediente_id);
                $("#txt_fecha").val(encontrados[0].fecha);
                $("#txt_interesado").val(encontrados[0].actor_nombre);
                $("#txt_asunto").val(encontrados[0].asunto);
                $("#txt_documento").val(encontrados[0].tipo_documento);
                $("#txt_actor_actual").val(encontrados[0].actor_actual);
                $("#txt_fecha_culminacion").val(encontrados[0].fecha_culminacion);
                $("#txt_usuario_culminacion").val(encontrados[0].usuario_culminacion);


                if (encontrados[0].estado == 'Culminado') {
                    $("#txt_estado_expediente").val("CULMINADO POR " + encontrados[0].usuario_culminacion);
                    $("#txt_estado_expediente").css("background-color", "#e57f7f");

                } else {
                    $("#txt_estado_expediente").val(encontrados[0].estado.toUpperCase() + ' POR : ' + encontrados[0].actor_actual);
                    $("#txt_estado_expediente").css("background-color", "#9dc98a");

                }






                $("#txt_hora_recepcion").val(encontrados[0].hora);
                $("#txt_dias").val(encontrados[0].dias);
                $("#txt_hora_culminacion").val(encontrados[0].hora_culminacion);
                $("#txt_nro_documento").val(encontrados[0].nro_documento);
                $("#txt_comentario").val(encontrados[0].comentario);
                $("#txt_observacion").val(encontrados[0].observacion);
                mostrar_contenido_kardex(lc_expediente_buscar);
                $("#btn_impresion_de_kardex").attr("disabled", false);

            } else {
                mostrar_mensaje_en_modal("alert-danger", '<center> -- Expediente no encontrado, digitelo correctamente, posiblemente revise los ultimos digitos -- </center>');
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

function mostrar_contenido_kardex(lc_expediente_buscar) {
    var etiqueta_select = $("#slt_expediente"),
        etiqueta_espera = $("#nro_expediente"),
        listar_todos_expediente = {
            "id": lc_expediente_buscar
        };
    $.ajax({
        data: listar_todos_expediente,
        dataType: 'json',
        url: url + 'consultas/Listar_expediente_detalle',
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
                            '<option id="' + filas.expediente +
                            '"  nro = "' + filas.nro +
                            '"  fecha = "' + filas.fecha +
                            '"  hora = "' + filas.hora +
                            '"  remitente_de = "' + filas.remitente_de +
                            '"  actor_de = "' + filas.actor_de +
                            '"  actor_a = "' + filas.actor_a +
                            '"  destinatario_a = "' + filas.destinatario_a +
                            '"  a1 = "' + filas.a1 +
                            '"  a2 = "' + filas.a2 +
                            '"  a3 = "' + filas.a3 +
                            '"  a1_de = "' + filas.descripcion_accion1 +
                            '"  a2_de = "' + filas.descripcion_accion2 +
                            '"  cargo_id = "' + filas.cargo_id +
                            '"  cargo_fecha = "' + filas.cargo_fecha +
                            '"  cargo_hora = "' + filas.cargo_hora +
                            '"  f_recepcion = "' + filas.f_recepcion +
                            '"  h_recepcion = "' + filas.h_recepcion +
                            '"  doc_adj1 = "' + filas.doc_adj1 +
                            '"  doc_adj2 = "' + filas.doc_adj2 +
                            '"  >' + filas.nro + ' [' + filas.fecha + ' - ' + filas.hora + '] ' + filas.remitente_de + ' --> ' + filas.destinatario_a + '</option>').attr("disabled", false);

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




}



function limpiar_casilleros() {
    $("#txt_nro_expediente").val('');
    $("#nro_expediente").html("");
    $("#txt_fecha").val('');
    $("#txt_interesado").val('');
    $("#txt_asunto").val('');
    $("#txt_documento").val('');
    $("#txt_actor_actual").val('');
    $("#txt_fecha_culminacion").val('');
    $("#txt_usuario_culminacion").val('');
    $("#txt_estado_expediente").val('');
    $("#txt_hora_recepcion").val('');
    $("#txt_dias").val('');
    $("#txt_hora_culminacion").val('');
    $("#txt_nro_documento").val('');
    $("#txt_comentario").val('');
    $("#txt_referencia").val('');
    $("#txt_observacion").val('');
    $("#slt_expediente").html('');
    $("#nro").text('');
    $("#txt_actor_de").val('');
    $("#txt_actor_para").val('');
    $("#txt_acciones").val('');
    $('#idcargo').text('');
    $('#idrecepcion').text('');
    $('#idcargo').css("background-color", "#9da39d");
    $('#idrecepcion').css("background-color", "#9da39d");
    $("#txt_adj1").val('');
    $("#txt_adj2").val('');
    $("#btn_impresion_de_kardex").attr("disabled", true);

    $("#id_remite").html("");
    $("#id_destino").html("");

}

function seleccion_mostrar_detalle() {
    var leer_id_expediente = $('#slt_expediente option:selected').attr('id'),
        lc_id_expediente = (typeof leer_id_expediente === 'undefined') ? '' : '1';
    if (lc_id_expediente === '1') {
        var remitente_de = $('#slt_expediente option:selected').attr('remitente_de'),
            nro = $('#slt_expediente option:selected').attr('nro'),
            destinatario_a = $('#slt_expediente option:selected').attr('destinatario_a'),
            actor_de = $('#slt_expediente option:selected').attr('actor_de'),
            actor_destino = $('#slt_expediente option:selected').attr('actor_a'),
            a1 = $('#slt_expediente option:selected').attr('a1'),
            a2 = $('#slt_expediente option:selected').attr('a2'),
            a3 = $('#slt_expediente option:selected').attr('a3'),
            a1_de = $('#slt_expediente option:selected').attr('a1_de'),
            a2_de = $('#slt_expediente option:selected').attr('a2_de'),
            cargo_id = $('#slt_expediente option:selected').attr('cargo_id'),
            cargo_fecha = $('#slt_expediente option:selected').attr('cargo_fecha'),
            cargo_hora = $('#slt_expediente option:selected').attr('cargo_hora'),

            f_recepcion = $('#slt_expediente option:selected').attr('f_recepcion'),
            h_recepcion = $('#slt_expediente option:selected').attr('h_recepcion'),
            doc_adj1 = $('#slt_expediente option:selected').attr('doc_adj1'),
            doc_adj2 = $('#slt_expediente option:selected').attr('doc_adj2');

        $("#nro").text(nro);
        if (cargo_id == '') {
            $('#idcargo').css("background-color", "#ff474d");
            $("#idcargo").text('NO TIENE CARGO');
        } else {
            $('#idcargo').css("background-color", "#229422");
            $("#idcargo").text(cargo_id + '-' + cargo_fecha + '-' + cargo_hora);
        }

        if (f_recepcion == '') {
            $('#idrecepcion').css("background-color", "#ff474d");
            $("#idrecepcion").text('NO TIENE RECEPCION');
        } else {
            $('#idrecepcion').css("background-color", "#229422");
            $("#idrecepcion").text(f_recepcion + ' - ' + h_recepcion);
        }


        $("#txt_adj1").val(doc_adj1);
        $("#txt_adj2").val(doc_adj2);

        $("#txt_actor_de").val(remitente_de);
        $("#id_remite").text('--> ' + actor_de);
        $("#txt_actor_para").val(destinatario_a);
        $("#id_destino").text('--> ' + actor_destino);



        $("#txt_acciones").val('(' + a1 + ') ' + a1_de + '   ----    (' + a2 + ') ' + a2_de);




    } else {

    }


}




$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    mostrar_kardex_expediente();



    $("#txt_referencia").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'expediente/mostrar_referencia_expediente',
                dataType: "json",
                data: { referencia: request.term },
                beforeSend: function() {
                    $("#ver_msjreferencia").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

                },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.resultado,
                                value: item.expediente,
                                expe_id: item.expediente_id
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
                $("#txt_idexpediente").val('').val(ui.item.value);
                $("#nro_expediente").val('').val(ui.item.expe_id);
                ubicar_expediente($("#txt_idexpediente").val());
                $("#txt_observacion").attr("disabled", false).focus();
                $("#btn_grabar_expediente").attr("disabled", false);
                $("#ver_msjreferencia").html('');
                return false;
            }
        }
    });
    $("#txt_referencia").autocomplete("option", "appendTo", ".mostrarreferencia");


    $('#btn_busquar_expediente').click(function() {
        limpiar_casilleros();
        var lc_expediente_buscar = $("#nro_expediente").val().replace(/-/g, "");
        ubicar_expediente(lc_expediente_buscar);
    });

    $('#btn_impresion_de_kardex').click(function() {
        var lc_expediente_buscar = $("#nro_expediente").val().replace(/-/g, "");
        window.open(url + 'imprimir/impresion_de_kardex?exp=' + lc_expediente_buscar);

    });



    $("#slt_expediente")
        .click(function() {
            seleccion_mostrar_detalle();

        })
        .keyup(function() {
            seleccion_mostrar_detalle();

        });




    $('#Resolver-actor-errado').click(function() {
        alert("Resolver");

    });




});