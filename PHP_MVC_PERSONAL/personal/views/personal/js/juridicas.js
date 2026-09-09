var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_juridico = '',
    lc_ruc, datos_listar, datos_grabar, datos_modificar, datos_eliminar, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, i, datos_buscar, valor_final, lc_ver_si_selecciono_id_juridico, cantidad_registros, lc_id_juridico, lc_razon, lc_representante_legal, lc_estado, datos_estado_juridico, lc_tipo_operacion_identificacion_juridico, lc_estado_juridico, leer_ruc_juridico;


function listar_personal_juridicas(lc_buscar_juridico) {
    "use strict";
    datos_listar = {
        'id': lc_buscar_juridico
    };
    $.ajax({
        data: datos_listar,
        dataType: 'json',
        url: url + 'personal/listar_todo_personal_juridico',
        type: 'post',
        beforeSend: function() {
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            $("#espera_carga_personal_juridicos").html("");
            $("#slt_lista_juridicas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_juridicas").append('<option id="' + filas.idjuridicos +
                        '"  ruc = "' + filas.ruc +
                        '"  razon_social = "' + filas.razon_social +
                        '"  representante_legal = "' + filas.representante_legal +
                        '"  estado = "' + filas.estado +
                        '"  usuarioregistro = "' + filas.usuarioregistro +
                        '"  fecharegistro = "' + filas.fecharegistro +
                        '"  usuariomodifico = "' + filas.usuariomodifico +
                        '"  fecha_modificacion = "' + filas.fecha_modificacion +
                        '"  usuariodebaja = "' + filas.usuariodebaja +
                        '"  fecha_debaja = "' + filas.fecha_debaja +
                        '"  >' + filas.ruc + '&nbsp;│&nbsp;' + filas.razon_social + '</option>');
                    $("#slt_lista_juridicas").attr("disabled", false);
                    estadisticas_personal_juridico_habil_desactivado();

                } else {
                    $("#slt_lista_juridicas").attr("disabled", true);
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


function listar_unidad_organica_de_organo() {
    "use strict";
    datos_listar = {
        'id': ''
    };
    $.ajax({
        data: datos_listar,
        dataType: 'json',
        url: url + 'personal/listar_unidad_organica_total',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_servicio_upss")
                .html('')
                .show()
                .append('<option id= 0" Seleccione : </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicio_upss").append('<option id="' + filas.idunidadorganica + '"  unidad_organica = "' + filas.unidad_organica + '"  idorgano = "' + filas.idorgano + '"  organo = "' + filas.organo + '"  >' + filas.unidad_organica + '</option>');
                    $("#slt_servicio_upss").attr("disabled", true);
                } else {
                    $("#slt_servicio_upss").attr("disabled", true);
                }
            });
        }
    });
    $("#slt_servicio_upss").select2({
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

function inicializar_botones_identificacion_juridicos() {
    "use strict";
    $('.crear-tooltip').tooltip();
    $('#ruc')
        .attr("disabled", true)
        .val('');
    $('#txt_razon_social')
        .attr("disabled", true)
        .val('');
    $('#txt_representante_legal')
        .attr("disabled", true)
        .val('');
    $('#msj_ruc_juridico').text('');
    $('#btn_agregar_juridico').attr("disabled", false);
    $('#btn_modificar_juridico').attr("disabled", true);
    $('#btn_eliminar_juridico').attr("disabled", true);
    $('#btn_habilitar_juridico').attr("disabled", true);
    $('#btn_grabar_juridicos').attr("disabled", true);
    listar_personal_juridicas(lc_buscar_juridico);
    listar_unidad_organica_de_organo();
}

function leer_seleccion_mostrar_en_etiquetas_juridicos() {
    "use strict";
    lc_id_juridico = $('#slt_lista_juridicas option:selected').attr('id');
    lc_ver_si_selecciono_id_juridico = (typeof lc_id_juridico === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_juridico === '1') {
        lc_ruc = $('#slt_lista_juridicas option:selected').attr('ruc');
        lc_razon = $('#slt_lista_juridicas option:selected').attr('razon_social');
        lc_representante_legal = $('#slt_lista_juridicas option:selected').attr('representante_legal');
        lc_estado = $('#slt_lista_juridicas option:selected').attr('estado');
        leer_usuario_registro = $('#slt_lista_juridicas  option:selected').attr('usuarioregistro');
        leer_fecha_registro = $('#slt_lista_juridicas  option:selected').attr('fecharegistro');
        leer_usuario_modifico = $('#slt_lista_juridicas option:selected').attr('usuariomodifico');
        leer_fecha_modifico = $('#slt_lista_juridicas  option:selected').attr('fecha_modificacion');
        leer_usuario_de_baja = $('#slt_lista_juridicas option:selected').attr('usuariodebaja');
        leer_fecha_de_baja = $('#slt_lista_juridicas  option:selected').attr('fecha_debaja');
        $('#ruc')
            .val(lc_ruc)
            .attr("disabled", true);

        $('#txt_razon_social')
            .val(lc_razon)
            .attr("disabled", true);
        $('#txt_representante_legal')
            .val(lc_representante_legal)
            .attr("disabled", true);

        if (lc_estado === '1') {
            $('#personal_juridico_seleccion')
                .text(lc_razon + ' - JURIDICO ACTIVO ' + ' -  ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-warning")
                .addClass("alert-info");
            $('#personal_juridico_seleccion_para_servicios')
                .text(lc_razon + ' - JURIDICO ACTIVO ' + ' -  ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-warning")
                .addClass("alert-info");
        } else {
            $('#personal_juridico_seleccion')
                .text(lc_razon + ' - JURIDICO  DESACTIVADO ' + ' - ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-info")
                .addClass("alert-warning");
            $('#personal_juridico_seleccion_para_servicios')
                .text(lc_razon + ' - JURIDICO  DESACTIVADO ' + ' - ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-info")
                .addClass("alert-warning");
        }
        $("#msj_nota_informativa_servicios_juridicos").text('');
        $("#btn_agregar_juridico_servicio").attr("disabled", false);
        $("#btn_modificar_juridico").attr("disabled", false);
        $("#btn_eliminar_juridico").attr("disabled", false);
        $('#btn_habilitar_juridico').attr("disabled", false);

        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);
        ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
        desabilitar_etiquetas_registro_contrato_juridico();
        inhabilitar_etiquetas_y_limpiar();
        inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total();
        $("#btn_modificar_juridico_servicio").attr("disabled", true);
        $("#btn_eliminar_juridico_servicio").attr("disabled", true);

        $('#msj_ruc_juridico').text('');
        $("#slt_listado_empleados_por_servicios")
            .html('')
            .attr("disabled", true);

    } else {}

}



function limpiar_etiquetas_identificacion_juridicos() {
    "use strict";
    $('#personal_juridico_seleccion').html('');
    $('#msj_ruc_juridico').text('');
    $('#ruc')
        .val('2')
        .attr("disabled", false)
        .focus();
    $('#txt_razon_social')
        .val('')
        .attr("disabled", true);

    $("#txt_representante_legal")
        .val('')
        .attr("disabled", true);
}

function habilitar_las_etiquetas_identificacion_juridicos() {
    "use strict";
    $('#msj_ruc_juridico').text('');
    $('#ruc')
        .attr("disabled", false)
        .focus();
    $('#txt_razon_social')
        .attr("disabled", false);
    $('#txt_representante_legal')
        .attr("disabled", false);

    $("#btn_grabar_juridicos").attr("disabled", false);

}

function validar_ruc_juridicos(leer_ruc_juridico) {
    "use strict";
    datos_listar = {
        "id": leer_ruc_juridico
    };

    $.ajax({
        data: datos_listar,
        dataType: 'json',
        url: url + 'personal/verificar_ruc_juridico',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#msj_ruc_juridico").html('<center><font size="-1" color="#F5000F">*** RUC JURIDICO EXISTE... ***</font></center>');
                    $('#txt_razon_social')
                        .attr("disabled", true)
                        .val(filas.razon_social);
                    $('#txt_representante_legal')
                        .attr("disabled", true)
                        .val(filas.representante_legal);
                    $('#btn_grabar_juridicos').attr("disabled", true);
                    $("#btn_agregar_juridico_servicio").attr("disabled", false);


                } else {
                    $("#msj_ruc_juridico").html('');
                    $('#txt_razon_social')
                        .attr("disabled", false)
                        .focus();

                }
            });
        }
    });

}

function grabar_personas_juridicas(lc_ruc, lc_razon, lc_representante_legal) {
    "use strict";
    datos_grabar = {
        'ruc': lc_ruc,
        'razon': lc_razon,
        'representante_legal': lc_representante_legal
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'personal/grabar_juridicos',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
        }

    });

}

function grabar_modificacion_personas_juridicas(lc_id_juridico, lc_ruc, lc_razon, lc_representante_legal) {
    "use strict";
    datos_modificar = {
        'id': lc_id_juridico,
        'ruc': lc_ruc,
        'razon': lc_razon,
        'representante_legal': lc_representante_legal
    };
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'personal/grabar_modificacion_juridicos',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
        }
    });

}

function dar_de_baja_personas_juridicas(lc_id_juridico) {
    "use strict";
    datos_eliminar = {
        'id': lc_id_juridico
    };
    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'personal/dar_de_baja_juridicos',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
            $('#personal_juridico_seleccion')
                .text(lc_razon + ' - JURIDICO  DESACTIVADO ' + ' - ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-info")
                .addClass("alert-warning");
        }

    });

}

function estadisticas_personal_juridico_habil_desactivado() {
    "use strict";
    datos_buscar = {
        'id': 1
    };
    $.ajax({
        data: datos_buscar,
        dataType: 'json',
        url: url + 'personal/ver_habiles_juridicos',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(response) {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_carga_personal_juridicos").html('');
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td  align = "right">' + response[i].empleados + '</td><td align = "right" >&nbsp;' + response[i].total + '</td></tr>';
                    $("#mostrar_estadistica_registro").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#mostrar_estadistica_registro").empty();

            }
        }
    });
}

function mostrar_personal_de_baja_juridico(lc_estado_juridico) {
    "use strict";
    datos_estado_juridico = {
        'estado': lc_estado_juridico
    };

    $.ajax({
        data: datos_estado_juridico,
        dataType: 'json',
        url: url + 'personal/listado_personal_juridico_de_baja',
        type: 'post',
        beforeSend: function() {
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            $("#espera_carga_personal_juridicos").html("");
            $("#slt_lista_juridicas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_juridicas").append('<option id="' + filas.idjuridicos +
                        '"  ruc = "' + filas.ruc +
                        '"  razon_social = "' + filas.razon_social +
                        '"  representante_legal = "' + filas.representante_legal +
                        '"  estado = "' + filas.estado +
                        '"  usuarioregistro = "' + filas.usuarioregistro +
                        '"  fecharegistro = "' + filas.fecharegistro +
                        '"  usuariomodifico = "' + filas.usuariomodifico +
                        '"  fecha_modificacion = "' + filas.fecha_modificacion +
                        '"  usuariodebaja = "' + filas.usuariodebaja +
                        '"  fecha_debaja = "' + filas.fecha_debaja +
                        '"  >' + filas.ruc + '&nbsp;│&nbsp;' + filas.razon_social + '</option>');
                    $("#slt_lista_juridicas").attr("disabled", false);
                    estadisticas_personal_juridico_habil_desactivado();

                } else {
                    $("#slt_lista_juridicas").attr("disabled", true);
                }
            });
        }
    });


}
/* Fin de JS Identificacion de Personal Juridicos */

/* inicio de empleados por empresa juridicas */


$(document).ready(function() {
    "use strict";

    /* procesar personal juridicos */
    inicializar_botones_identificacion_juridicos();
    $("#slt_lista_juridicas")
        .click(function() {
            leer_seleccion_mostrar_en_etiquetas_juridicos();
        })
        .keyup(function() {
            leer_seleccion_mostrar_en_etiquetas_juridicos();
        });

    $("#txt_buscar_juridicos")
        .focus()
        .keyup(function() {
            lc_buscar_juridico = $("#txt_buscar_juridicos").val();
            listar_personal_juridicas(lc_buscar_juridico);
        });

    $('#btn_agregar_juridico').click(function() {
        lc_tipo_operacion_identificacion_juridico = '1';
        limpiar_etiquetas_identificacion_juridicos();

    });

    $('#btn_modificar_juridico').click(function() {
        lc_tipo_operacion_identificacion_juridico = '2';
        habilitar_las_etiquetas_identificacion_juridicos();
    });


    $("#chk_debaja_juridicos").on('change', function() {
        if ($(this).is(':checked')) {
            lc_estado_juridico = '0';
            mostrar_personal_de_baja_juridico(lc_estado_juridico);
        } else {
            lc_buscar_juridico = '';
            listar_personal_juridicas(lc_buscar_juridico);
        }
    });

    $("#ruc")
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function(e) {
            $("#msj_ruc").val('2');
            if (e.which === 11) {}
        })
        .keyup(function() {
            if ($('#ruc').val().length === 11) {
                leer_ruc_juridico = $("#ruc").val();
                if (leer_ruc_juridico.substring(0, 1) === '2') {
                    validar_ruc_juridicos(leer_ruc_juridico);
                } else {
                    $("#msj_ruc_juridico").html('<center><font size="-1" color="#D08800">Primer Digito debe iniciar con el Nro. 2</font></center>');
                    $("#txt_razon_social").attr("disabled", true);
                    $("#representante_legal").attr("disabled", true);
                    $("#slt_servicio_upss").attr("disabled", true);
                    $("#btn_grabar_juridicos").attr("disabled", true);
                }
            } else {
                $("#msj_ruc_juridico").html('<center><font size="-1" color="#D08800">Complete 11(once) digitos del RUC, iniciando con el digito Nro. 2</font></center>');
            }
        });

    $("#txt_razon_social")
        .focus(function() {
            $("#txt_representante_legal").attr("disabled", false);
            $("#btn_grabar_juridicos").attr("disabled", false);
        });

    $("#txt_representante_legal").keypress(function(e) {
        $("#btn_grabar_juridicos").attr("disabled", false);
        if (e.which === 13) {
            $("#btn_grabar_juridicos").focus();
        }
    });







    $("#btn_grabar_juridicos").click(function() {
        lc_ruc = $("#ruc").val();
        lc_razon = $('#txt_razon_social').val();
        lc_representante_legal = $('#txt_representante_legal').val();

        if (lc_tipo_operacion_identificacion_juridico === '1') {
            grabar_personas_juridicas(lc_ruc, lc_razon, lc_representante_legal);
        } else {
            grabar_modificacion_personas_juridicas(lc_id_juridico, lc_ruc, lc_razon, lc_representante_legal);
        }
    });

    $("#btn_eliminar_juridico").click(function() {
        dar_de_baja_personas_juridicas(lc_id_juridico);
    });

    $('#btn_habilitar_juridico').click(function() {
        habilitar_personal_juridico(lc_id_juridico);
    });


    /* fin de procesar personal juridicos */





    /* inicio de empleados por contratos */


    /* fin de empleados por contratos juridicos */





});