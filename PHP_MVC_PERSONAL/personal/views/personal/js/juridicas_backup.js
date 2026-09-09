var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_juridico = '',
    lc_ruc, datos_listar, datos_grabar, datos_modificar, datos_eliminar, lc_idunidadorganica, lc_unidad_organica, lc_idorgano, lc_organo, lc_id_juridico, lc_ruc, lc_razon, lc_cargo, lc_id_unidad_organica, lc_id_organo, cantidad_registros, lc_estado, leer_ruc_juridico, lc_tipo_operacion_identificacion_juridico, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, i, datos_buscar, valor_final, fecha_seleccion, ver_fecha_contrato, ver_fecha_seleccion, lc_tipo_operacion_juridicos_servicios, lc_fecha_inicio_servicio, lc_fecha_fin_servicio, lc_nota_informativa, ln_monto_total, datos_grabar_servicios, datos_ver_contratos, lc_id_juridico_servicios, lc_ruc_en_servicios, lc_fecha_inicio, lc_fecha_fin, datos_modificar_servicios, datos_eliminar_servicios, lc_dni_empleado, lc_tipo_operacion_empleado_juridico, lc_nombre_empleado, datos_grabar_empleado_juridico, datos_ruc_consultar_empleado, lc_ver_si_selecciono_id_juridico, lc_ver_si_selecciono_id_servicio_juridico, lc_id_juridico_empleados_servicios, lc_ver_si_selecciono_id_servicio_juridico_empleados, lc_ruc_servicios_empleados, lc_ruc_servicios_empleados_condicion, lc_dni_servicios_empleado, lc_apellidos_nombre_servicios_empleado, datos_actualizar_empleado_juridico, dar_de_baja, lc_condicion_empleado, datos_eliminar_empleados_servicios, lc_estado_juridico, datos_estado_juridico;


/* Inicio de JS Identificacion de Personal Juridicos */

/*  slt_listado_servicios */
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
        beforeSend: function () {
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (datos) {
            $("#espera_carga_personal_juridicos").html("");
            $("#slt_lista_juridicas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_juridicas").append('<option id="' + filas.idjuridicos +
                        '"  ruc = "' + filas.ruc +
                        '"  razon_social = "' + filas.razon_social +
                        '"  cargo = "' + filas.cargo +
                        '"  idunidadorganica = "' + filas.idunidadorganica +
                        '"  unidad_organica = "' + filas.unidad_organica +
                        '"  idorgano = "' + filas.idorgano +
                        '"  organo = "' + filas.organo +
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

        error: function (jqXHR, textStatus, errorThrown) {
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
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_servicio_upss")
                .html('')
                .show()
                .append('<option id= 0" Seleccione : </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
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
        formatNoMatches: function (term) {
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
    listar_personal_juridicas(lc_buscar_juridico);
    listar_unidad_organica_de_organo();
    $('#btn_agregar_juridico').attr("disabled", false);
    $('#btn_modificar_juridico').attr("disabled", true);
    $('#btn_eliminar_juridico').attr("disabled", true);
    $('#btn_habilitar_juridico').attr("disabled", true);
    $('#btn_grabar_juridicos').attr("disabled", true);
    $('#ruc').attr("disabled", true);
    $('#txt_razon_social').attr("disabled", true);
    $('#msj_ruc_juridico').text('');
    $('#txt_cargo').attr("disabled", true);
    $('#slt_servicio_upss').attr("disabled", true);
    $('#txt_descripcion_upss').attr("disabled", true);
    $('#espera_grabacion_juridicos').attr("disabled", true);

}

function leer_seleccion_mostrar_en_etiquetas_juridicos() {
    "use strict";
    lc_id_juridico = $('#slt_lista_juridicas option:selected').attr('id');
    lc_ver_si_selecciono_id_juridico = (typeof lc_id_juridico === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_juridico === '1') {
        lc_ruc = $('#slt_lista_juridicas option:selected').attr('ruc');
        lc_razon = $('#slt_lista_juridicas option:selected').attr('razon_social');
        lc_cargo = $('#slt_lista_juridicas option:selected').attr('cargo');
        lc_id_unidad_organica = $('#slt_lista_juridicas option:selected').attr('idunidadorganica');
        lc_unidad_organica = $('#slt_lista_juridicas option:selected').attr('unidad_organica');
        lc_id_organo = $('#slt_lista_juridicas option:selected').attr('idorgano');
        lc_organo = $('#slt_lista_juridicas option:selected').attr('organo');
        lc_estado = $('#slt_lista_juridicas option:selected').attr('estado');
        leer_usuario_registro = $('#slt_lista_juridicas  option:selected').attr('usuarioregistro');
        leer_fecha_registro = $('#slt_lista_juridicas  option:selected').attr('fecharegistro');
        leer_usuario_modifico = $('#slt_lista_juridicas option:selected').attr('usuariomodifico');
        leer_fecha_modifico = $('#slt_lista_juridicas  option:selected').attr('fecha_modificacion');
        leer_usuario_de_baja = $('#slt_lista_juridicas option:selected').attr('usuariodebaja');
        leer_fecha_de_baja = $('#slt_lista_juridicas  option:selected').attr('fecha_debaja');
        limpiar_contenido_empleados_por_servicios();
        $('#ruc')
            .val(lc_ruc)
            .attr("disabled", true);

        $('#txt_razon_social')
            .val(lc_razon)
            .attr("disabled", true);
        $('#txt_cargo')
            .val(lc_cargo)
            .attr("disabled", true);
        $("#slt_servicio_upss").attr("disabled", true);

        $('#txt_descripcion_upss').val(lc_unidad_organica + ' -- ' + lc_organo);
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
        ver_contrato_de_servicios_del_personal_juridico(lc_id_juridico, lc_ruc);
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
    $('#txt_razon_social')
        .val('')
        .attr("disabled", true);
    $('#txt_cargo')
        .val('')
        .attr("disabled", true);
    $('#txt_descripcion_upss').val('');
    $('#btn_agregar_juridico').attr("disabled", false);
    listar_unidad_organica_de_organo();
    $('#ruc')
        .val('2')
        .attr("disabled", false)
        .focus();
}

function habilitar_las_etiquetas_identificacion_juridicos() {
    "use strict";
    $('#msj_ruc_juridico').text('');
    $('#ruc')
        .attr("disabled", false)
        .focus();
    $('#txt_razon_social')
        .attr("disabled", false);
    $('#txt_cargo')
        .attr("disabled", false);
    $('#slt_servicio_upss')
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
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#msj_ruc_juridico").html('<center><font size="-1" color="#0DA9F5">*** RUC JURIDICO EXISTE, PUEDE CAMBIAR CARGO O CENTRO DE COSTO ***</font></center>');
                    $('#txt_razon_social')
                        .attr("disabled", false)
                        .val(filas.razon_social);
                    $('#txt_cargo')
                        .attr("disabled", false)
                        .val(filas.cargo);
                    $("#txt_descripcion_upss").val(filas.unidad_organica + ' -- ' + filas.organo);



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

function grabar_personas_juridicas(lc_ruc, lc_razon, lc_cargo, lc_idunidadorganica, lc_idorgano) {
    "use strict";
    datos_grabar = {
        'ruc': lc_ruc,
        'razon': lc_razon,
        'cargo': lc_cargo,
        'idunidad': lc_idunidadorganica,
        'idorgano': lc_idorgano
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'personal/grabar_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
        }

    });

}

function grabar_modificacion_personas_juridicas(lc_id_juridico, lc_ruc, lc_razon, lc_cargo, lc_idunidadorganica, lc_idorgano) {
    "use strict";
    datos_modificar = {
        'id': lc_id_juridico,
        'ruc': lc_ruc,
        'razon': lc_razon,
        'cargo': lc_cargo,
        'idunidad': lc_idunidadorganica,
        'idorgano': lc_idorgano
    };
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'personal/grabar_modificacion_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
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
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
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
        beforeSend: function () {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (response) {
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

function habilitar_personal_juridico(lc_id_juridico) {
    "use strict";
    datos_eliminar = {
        'id': lc_id_juridico
    };
    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'personal/habilitar_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
            $('#personal_juridico_seleccion')
                .text(lc_razon + ' - JURIDICO ACTIVO ' + ' -  ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-warning")
                .addClass("alert-info");


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
        beforeSend: function () {
            $("#espera_carga_personal_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (datos) {
            $("#espera_carga_personal_juridicos").html("");
            $("#slt_lista_juridicas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_juridicas").append('<option id="' + filas.idjuridicos +
                        '"  ruc = "' + filas.ruc +
                        '"  razon_social = "' + filas.razon_social +
                        '"  cargo = "' + filas.cargo +
                        '"  idunidadorganica = "' + filas.idunidadorganica +
                        '"  unidad_organica = "' + filas.unidad_organica +
                        '"  idorgano = "' + filas.idorgano +
                        '"  organo = "' + filas.organo +
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




/*** inicio de Contrato de servicios personal juridicos */

function inicializar_botones_personas_juridicas() {
    "use strict";
    $("#btn_agregar_juridico_servicio").attr("disabled", true);
    $("#btn_modificar_juridico_servicio").attr("disabled", true);
    $("#btn_eliminar_juridico_servicio").attr("disabled", true);
    $("#btn_grabar_servicios_juridicos").attr("disabled", true);

}

function inicializar_etiquetas_registro_Servicios_juridicos_mostrar_fecha_inicio() {
    "use strict";
    $("#fecha_inicio")
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Fin Servicio"
        })
        .focus();
}


function desabilitar_etiquetas_registro_contrato_juridico() {
    "use strict";
    $("#fecha_inicio").attr("disabled", true);
    $("#fecha_fin").attr("disabled", true);
    $("#txt_nota_informativa").attr("disabled", true);
    $("#txt_nro_pedido").attr("disabled", true);
    $("#txt_nro_expediente").attr("disabled", true);
    $("#txt_meta").attr("disabled", true);
    $("#txt_monto_total").attr("disabled", true);

}


function grabar_contrato_de_servicio_juridico(lc_id_juridico, lc_ruc, lc_fecha_inicio_servicio, lc_fecha_fin_servicio, lc_nota_informativa, ln_monto_total) {
    "use strict";
    datos_grabar_servicios = {
        'idjuridico': lc_id_juridico,
        'ruc': lc_ruc,
        'fecha_inicio': lc_fecha_inicio_servicio,
        'fecha_fin': lc_fecha_fin_servicio,
        'nota_informativa': lc_nota_informativa,
        'monto_total': ln_monto_total
    };
    $.ajax({
        data: datos_grabar_servicios,
        dataType: 'json',
        url: url + 'personal/grabar_contratos_de_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_servicios_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_servicios_juridicos").html("");
            $("#btn_grabar_servicios_juridicos").attr("disabled", true);
            ver_contrato_de_servicios_del_personal_juridico(lc_id_juridico, lc_ruc);
        }
    });
}


function ver_contrato_de_servicios_del_personal_juridico(lc_id_juridico, lc_ruc) {
    "use strict";
    datos_ver_contratos = {
        'idjuridico' : lc_id_juridico,
        'ruc': lc_ruc
    };

    $.ajax({
        data: datos_ver_contratos,
        dataType: 'json',
        url: url + 'personal/ver_contratos_personal_juridico',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (datos) {
            $("#espera_grabacion_juridicos").html("");
            $("#slt_listado_servicios")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_listado_servicios")
                        .append('<option id="' + filas.idjuridico +
                        '"  idjuridico_empresa= "' + filas.idjuridico_empresa +  
                        '"  ruc = "' + filas.ruc +
                        '"  fecha_inicio = "' + filas.fecha_inicio +
                        '"  fecha_fin = "' + filas.fecha_fin +
                        '"  nota_informativa = "' + filas.nota_informativa +
                                
                                
                                
                                
                                
                        '"  monto_total = "' + filas.monto_total +
                        '"  >' + filas.fecha_inicio + '&nbsp;│&nbsp;' + filas.fecha_fin + '&nbsp;│&nbsp;' + filas.nota_informativa + '</option>');
                    $("#slt_listado_servicios").attr("disabled", false);
                } else {
                    $("#slt_listado_servicios").attr("disabled", true);
                }
            });
        }

    });

}



/*


'verificar' => '1',
                    'idjuridico' => $imprimir->IDJURIDICOSSERVICIOS,
                    'idjuridico_empresa' => $imprimir->IDJURIDICOS,
                    'ruc' => trim( $imprimir->RUC ),
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'nota_informativa' => utf8_encode( trim( $imprimir->NOTA_INFORMATIVA ) ),
                    'nro_expediente' => utf8_encode( trim( $imprimir->NRO_EXPEDIENTE ) ),
                    'meta_actual' => trim( $imprimir->META_ACTUAL ),
                    'meta_anterior' => trim( $imprimir->META_ANTERIOR),
                    'meta_siga' => trim( $imprimir->META_SIGA),
                    'pao' => trim( $imprimir->PAO),
                    'ccp' => trim( $imprimir->CCP),
                    'cantidad_medicos' => $imprimir->CANTIDAD_MEDICOS,
                    'cantidad_horas' => $imprimir->CANTIDAD_HORAS,
                    'mes1' => $imprimir->MES1,
                    'mes2' => $imprimir->MES2,
                    'monto_total' => $imprimir->MONTO_TOTAL,
                    'observacion' => utf8_encode(trim($imprimir->MONTO_TOTAL)));
                    



*/




function leer_contratos_de_servicios_y_mostrarlo() {
    "use strict";
    lc_id_juridico_servicios = $('#slt_listado_servicios option:selected').attr('id');
    lc_ver_si_selecciono_id_servicio_juridico = (typeof lc_id_juridico_servicios === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_servicio_juridico === '1') {

        lc_ruc_en_servicios = $('#slt_listado_servicios option:selected').attr('ruc');
        lc_fecha_inicio = $('#slt_listado_servicios option:selected').attr('fecha_inicio');
        lc_fecha_fin = $('#slt_listado_servicios option:selected').attr('fecha_fin');
        lc_nota_informativa = $('#slt_listado_servicios option:selected').attr('nota_informativa');
        ln_monto_total = $('#slt_listado_servicios option:selected').attr('monto_total');
        $("#fecha_inicio").val(lc_fecha_inicio);
        $("#fecha_fin").val(lc_fecha_fin);
        $("#txt_nota_informativa").val(lc_nota_informativa);
        //$("#txt_nro_pedido").attr("disabled", true);
        //("#txt_nro_expediente").attr("disabled", true);
        //$("#txt_meta").attr("disabled", true);
        $("#txt_monto_total").val(ln_monto_total);
        $("#btn_modificar_juridico_servicio").attr("disabled", false);
        $("#btn_eliminar_juridico_servicio").attr("disabled", false);
        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        limpiar_contenido_empleados_por_servicios();
        ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);

        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        $("#btn_modificar_empleado_juridico").attr("disabled", true);
        $("#btn_eliminar_empleado_juridico").attr("disabled", true);
        $("#btn_habilitar_empleado_juridico").attr("disabled", true);
        $("#btn_grabar_empleados").attr("disabled", true);

    } else {

    }





}


function habilitar_etiquetas_para_edicion_servicios_juridicos() {
    "use strict";
    $("#fecha_inicio").attr("disabled", false);
    $("#fecha_fin").attr("disabled", false);
    $("#txt_nota_informativa").attr("disabled", false);
    $("#txt_nro_pedido").attr("disabled", false);
    $("#txt_nro_expediente").attr("disabled", false);
    $("#txt_meta").attr("disabled", false);
    $("#txt_monto_total").attr("disabled", false);
    $("#btn_grabar_servicios_juridicos").attr("disabled", false);



}


function inhabilitar_etiquetas_y_limpiar() {
    "use strict";
    $("#fecha_inicio").val('');
    $("#fecha_fin").val('');
    $("#txt_nota_informativa").val('');
    $("#txt_nro_pedido").val('');
    $("#txt_nro_expediente").val('');
    $("#txt_meta").val('');
    $("#txt_monto_total").val(0);

}






function grabar_modificacion_servicios_por_personas_juridicas(lc_id_juridico_servicios, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, ln_monto_total) {
    "use strict";
    datos_modificar_servicios = {
        'idjuridico_servicios': lc_id_juridico_servicios,
        'fecha_inicio': lc_fecha_inicio_servicio,
        'fecha_fin': lc_fecha_fin_servicio,
        'nota_informativa': lc_nota_informativa,
        'monto_total': ln_monto_total
    };

    $.ajax({
        data: datos_modificar_servicios,
        dataType: 'json',
        url: url + 'personal/grabar_contratos_de_juridicos_modificacion',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_servicios_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_servicios_juridicos").html("");
            $("#btn_grabar_servicios_juridicos").attr("disabled", true);
            ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
        }

    });
}



function eliminar_contrato_de_servicios(lc_id_juridico_servicios) {
    "use strict";
    datos_eliminar_servicios = {
        'idjuridico_servicios': lc_id_juridico_servicios
    };

    $.ajax({
        data: datos_eliminar_servicios,
        dataType: 'json',
        url: url + 'personal/grabar_contratos_de_juridicos_eliminar',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_servicios_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_servicios_juridicos").html("");
            $("#btn_eliminar_juridico_servicio").attr("disabled", true);
            $("#btn_modificar_juridico_servicio").attr("disabled", true);
            ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
            inhabilitar_etiquetas_y_limpiar();
            eliminar_empleados_por_servicios(lc_id_juridico_servicios);
            $("#slt_listado_empleados_por_servicios")
                .html('')
                .attr("disabled", true);
        }

    });
}

function eliminar_empleados_por_servicios(lc_id_juridico_servicios) {

    "use strict";
    datos_eliminar_empleados_servicios = {
        'idjuridico_servicios': lc_id_juridico_servicios
    };

    $.ajax({
        data: datos_eliminar_empleados_servicios,
        dataType: 'json',
        url: url + 'personal/eliminar_empleados_por_servicios_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_servicios_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_servicios_juridicos").html("");
        }


    });


}





/*** Fin de contrato de servicios de personal juridico */






/* inicio de empleados por empresa juridicas */
function inicializar_botones_empleados_por_servicios() {
    "use strict";
    $("#btn_agregar_empleado_juridico").attr("disabled", true);
    $("#btn_modificar_empleado_juridico").attr("disabled", true);
    $("#btn_eliminar_empleado_juridico").attr("disabled", true);
    $("#btn_habilitar_empleado_juridico").attr("disabled", true);
    $("#btn_grabar_empleados").attr("disabled", true);
    $("#txt_dni_medico").attr("disabled", true);
    $("#txt_apellidos_nombres").attr("disabled", true);
    $("#msj_dni_empleado").html('');
}


function inicializar_botones_empleados_por_servicios_excepto_agregar() {
    "use strict";
    $("#btn_agregar_empleado_juridico").attr("disabled", false);
    $("#btn_modificar_empleado_juridico").attr("disabled", true);
    $("#btn_eliminar_empleado_juridico").attr("disabled", true);
    $("#btn_habilitar_empleado_juridico").attr("disabled", true);
    $("#btn_grabar_empleados").attr("disabled", true);
    $("#txt_dni_medico").attr("disabled", true);
    $("#txt_apellidos_nombres").attr("disabled", true);
    $("#msj_dni_empleado").html('');
}



function limpiar_contenido_empleados_por_servicios() {
    "use strict";
    $("#txt_dni_medico")
        .attr("disabled", true)
        .val('');
    $("#txt_apellidos_nombres")
        .attr("disabled", true)
        .val('');
}

function grabar_empleado_de_servicio_juridico(lc_id_juridico_servicios, lc_ruc_en_servicios, lc_dni_empleado, lc_nombre_empleado) {
    "use strict";
    datos_grabar_empleado_juridico = {
        'id_juridico_servicios': lc_id_juridico_servicios,
        'ruc_servicios': lc_ruc_en_servicios,
        'dni': lc_dni_empleado,
        'apellidos_nombres': lc_nombre_empleado
    };

    $.ajax({
        data: datos_grabar_empleado_juridico,
        dataType: 'json',
        url: url + 'personal/grabar_empleado_de_empresa_juridica',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleado").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            inicializar_botones_empleados_por_servicios_excepto_agregar();
        }


    });

}



function ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios) {
    "use strict";
    datos_ruc_consultar_empleado = {
        'idservicios': lc_id_juridico_servicios
    };
    $.ajax({
        data: datos_ruc_consultar_empleado,
        dataType: 'json',
        url: url + 'personal/ver_empleados_por_ruc_contrato',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (datos) {
            $("#espera_grabacion_juridicos").html("");
            $("#slt_listado_empleados_por_servicios")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_listado_empleados_por_servicios")
                        .append('<option id="' + filas.idjuridicoempleado +
                            '"  ruc = "' + filas.ruc +
                            '"  descripcion_condicion ="' + filas.descripcion_condicion +
                            '"  condicion = "' + filas.condicion +
                            '"  dni ="' + filas.dni +
                            '"  apellidos_nombres ="' + filas.apellidos_nombres +
                            '"  >' + filas.descripcion_condicion + '&nbsp;│&nbsp;' + filas.apellidos_nombres + '</option>')
                        .attr("disabled", false);
                } else {
                    $("#slt_listado_empleados_por_servicios")
                        .attr("disabled", true);
                }
            });
        }
    });

}




function leer_empleados_por_servicios_juridico() {
    "use strict";
    lc_id_juridico_empleados_servicios = $('#slt_listado_empleados_por_servicios  option:selected').attr('id');
    lc_ver_si_selecciono_id_servicio_juridico_empleados = (typeof lc_id_juridico_empleados_servicios === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_servicio_juridico_empleados === '1') {
        lc_ruc_servicios_empleados = $('#slt_listado_empleados_por_servicios  option:selected').attr('ruc');
        lc_ruc_servicios_empleados_condicion = $('#slt_listado_empleados_por_servicios  option:selected').attr('descripcion_condicion');
        lc_condicion_empleado = $('#slt_listado_empleados_por_servicios  option:selected').attr('condicion');
        lc_dni_servicios_empleado = $('#slt_listado_empleados_por_servicios  option:selected').attr('dni');
        lc_apellidos_nombre_servicios_empleado = $('#slt_listado_empleados_por_servicios  option:selected').attr('apellidos_nombres');

        if (lc_condicion_empleado === '1') {
            $("#msj_dni_empleado").removeClass("alert-warning").addClass("alert-success");
        } else {
            $("#msj_dni_empleado").removeClass("alert-success").addClass("alert-warning");
        }
        $("#msj_dni_empleado").text(' Empleado : ' + lc_ruc_servicios_empleados_condicion);
        $("#txt_dni_medico").val(lc_dni_servicios_empleado);
        $("#txt_apellidos_nombres").val(lc_apellidos_nombre_servicios_empleado);
        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        $("#btn_modificar_empleado_juridico").attr("disabled", false);
        $("#btn_eliminar_empleado_juridico").attr("disabled", false);
        $("#btn_habilitar_empleado_juridico").attr("disabled", false);
        $("#btn_grabar_empleados").attr("disabled", true);
    } else {}

}

function grabar_empleado_de_servicio_juridico_modificacion(lc_id_juridico_empleados_servicios, lc_dni_empleado, lc_nombre_empleado) {
    "use strict";
    datos_actualizar_empleado_juridico = {
        'id_juridico_servicios': lc_id_juridico_empleados_servicios,
        'dni': lc_dni_empleado,
        'apellidos_nombres': lc_nombre_empleado
    };
    $.ajax({
        data: datos_actualizar_empleado_juridico,
        dataType: 'json',
        url: url + 'personal/grabar_modificacion_empleado_de_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleados").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_empleados").html('');
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            inicializar_botones_empleados_por_servicios_excepto_agregar();
        }
    });
}


function eliminar_dar_de_baja_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios) {
    "use strict";
    dar_de_baja = {
        'id_juridico_servicios': lc_id_juridico_empleados_servicios
    };
    $.ajax({
        data: dar_de_baja,
        dataType: 'json',
        url: url + 'personal/dar_de_baja_empleado_de_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleados").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_empleados").html('');
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            inicializar_botones_empleados_por_servicios_excepto_agregar();

            $("#msj_dni_empleado")
                .text('Empleado : --- DE BAJA --')
                .removeClass("alert-success").addClass("alert-warning");
        }
    });

}

function habilitar_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios) {
    "use strict";
    dar_de_baja = {
        'id_juridico_servicios': lc_id_juridico_empleados_servicios
    };
    $.ajax({
        data: dar_de_baja,
        dataType: 'json',
        url: url + 'personal/habilitar_empleado_de_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleados").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_empleados").html('');
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            inicializar_botones_empleados_por_servicios_excepto_agregar();
            $("#msj_dni_empleado")
                .text('Empleado : HABILITADO')
                .removeClass("alert-warning").addClass("alert-success");
        }
    });

}




$(document).ready(function () {
    "use strict";

    /* procesar personal juridicos */
    inicializar_botones_identificacion_juridicos();


    $("#slt_lista_juridicas")
        .click(function () {
            leer_seleccion_mostrar_en_etiquetas_juridicos();
        })
        .keyup(function () {
            leer_seleccion_mostrar_en_etiquetas_juridicos();
        });

    $("#txt_buscar_juridicos")
        .focus()
        .keyup(function () {
            lc_buscar_juridico = $("#txt_buscar_juridicos").val();
            listar_personal_juridicas(lc_buscar_juridico);
        });




    $('#btn_agregar_juridico').click(function () {
        lc_tipo_operacion_identificacion_juridico = '1';
        limpiar_etiquetas_identificacion_juridicos();
    });

    $('#btn_modificar_juridico').click(function () {
        lc_tipo_operacion_identificacion_juridico = '2';
        habilitar_las_etiquetas_identificacion_juridicos();
        lc_idunidadorganica = lc_id_unidad_organica;
        lc_idorgano = lc_id_organo;
    });


    $("#chk_debaja_juridicos").on('change', function () {
        if ($(this).is(':checked')) {
            lc_estado_juridico = '0';
            mostrar_personal_de_baja_juridico(lc_estado_juridico);
        } else {
            lc_buscar_juridico = '';
            listar_personal_juridicas(lc_buscar_juridico);
        }
    });

    $("#ruc")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function (e) {
            $("#msj_ruc").val('2');
            if (e.which === 11) {}
        })
        .keyup(function () {
            if ($('#ruc').val().length === 11) {
                leer_ruc_juridico = $("#ruc").val();
                if (leer_ruc_juridico.substring(0, 1) === '2') {
                    validar_ruc_juridicos(leer_ruc_juridico);
                } else {
                    $("#msj_ruc_juridico").html('<center><font size="-1" color="#D08800">Primer Digito debe iniciar con el Nro. 2</font></center>');
                    $("#txt_razon_social").attr("disabled", true);
                    $("#txt_cargo").attr("disabled", true);
                    $("#slt_servicio_upss").attr("disabled", true);
                    $("#btn_grabar_juridicos").attr("disabled", true);
                }
            } else {
                $("#msj_ruc_juridico").html('<center><font size="-1" color="#D08800">Complete 11(once) digitos del RUC, iniciando con el digito Nro. 2</font></center>');
            }
        });

    $("#txt_razon_social")
        .focus(function () {
            $("#txt_cargo").attr("disabled", false);
        })
        .attr("disabled", false);


    $("#txt_cargo")
        .focus(function () {
            $("#slt_servicio_upss")
                .attr("disabled", false);
        });

    $("#slt_servicio_upss").change(function () {
        lc_idunidadorganica = $('#slt_servicio_upss  option:selected').attr('id');
        lc_unidad_organica = $('#slt_servicio_upss  option:selected').attr('unidad_organica');
        lc_idorgano = $('#slt_servicio_upss  option:selected').attr('idorgano');
        lc_organo = $('#slt_servicio_upss  option:selected').attr('organo');
        $("#txt_descripcion_upss").val(lc_unidad_organica + ' -- ' + lc_organo);
        $("#btn_grabar_juridicos").attr("disabled", false);


    });

    $("#btn_grabar_juridicos").click(function () {
        lc_ruc = $("#ruc").val();
        lc_razon = $('#txt_razon_social').val();
        lc_cargo = $('#txt_cargo').val();
        if (lc_tipo_operacion_identificacion_juridico === '1') {
            grabar_personas_juridicas(lc_ruc, lc_razon, lc_cargo, lc_idunidadorganica, lc_idorgano);
        } else {
            grabar_modificacion_personas_juridicas(lc_id_juridico, lc_ruc, lc_razon, lc_cargo, lc_idunidadorganica, lc_idorgano);
        }
    });

    $("#btn_eliminar_juridico").click(function () {
        dar_de_baja_personas_juridicas(lc_id_juridico);
    });

    $('#btn_habilitar_juridico').click(function () {
        habilitar_personal_juridico(lc_id_juridico);
    });


    /* fin de procesar personal juridicos */



    /* inicio de contratos servicios */
    inicializar_botones_personas_juridicas();

    $("#slt_listado_servicios")
        .click(function () {
            leer_contratos_de_servicios_y_mostrarlo();
        })
        .keyup(function () {
            leer_contratos_de_servicios_y_mostrarlo();
        });


    $('#btn_agregar_juridico_servicio').click(function () {
        lc_tipo_operacion_juridicos_servicios = '1';
        inicializar_etiquetas_registro_Servicios_juridicos_mostrar_fecha_inicio();
    });

    $('#btn_modificar_juridico_servicio').click(function () {
        lc_tipo_operacion_juridicos_servicios = '2';
        habilitar_etiquetas_para_edicion_servicios_juridicos();

    });

    $('#btn_eliminar_juridico_servicio').click(function () {
        eliminar_contrato_de_servicios(lc_id_juridico_servicios);
    });


    $("#fecha_inicio").change(function () {
         
    });

    $("#txt_nota_informativa").keypress(function (e) {
        $("#txt_nro_expediente").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nro_expediente").focus();
        }
    });


    $("#txt_nro_expediente").keypress(function (e) {
        $("#txt_nro_pedido").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nro_pedido").focus();
        }

    });

    $("#txt_nro_pedido").keypress(function (e) {
        $("#txt_meta").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_meta").focus();
        }
    });

    $("#txt_meta").keypress(function (e) {
        $("#txt_monto_total").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_monto_total").focus();
        }
    });

    $("#txt_monto_total").keypress(function (e) {
        $("#btn_grabar_servicios_juridicos").attr("disabled", false);
        if (e.which === 13) {
            $("#btn_grabar_servicios_juridicos").focus();
        }
    });


    $("#btn_grabar_servicios_juridicos").click(function () {
        lc_fecha_inicio_servicio = $("#fecha_inicio").val();
        lc_fecha_fin_servicio = $("#fecha_fin").val();
        lc_nota_informativa = $("#txt_nota_informativa").val();
        ln_monto_total = $("#txt_monto_total").val();
        if (lc_tipo_operacion_juridicos_servicios === '1') {
            grabar_contrato_de_servicio_juridico(lc_id_juridico, lc_ruc, lc_fecha_inicio_servicio, lc_fecha_fin_servicio, lc_nota_informativa, ln_monto_total);
        } else {
            grabar_modificacion_servicios_por_personas_juridicas(lc_id_juridico_servicios, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, ln_monto_total);
        }
        desabilitar_etiquetas_registro_contrato_juridico();
    });




    /* fin de contratos servicios */


    /* inicio de empleados por contratos */

    inicializar_botones_empleados_por_servicios();
    $("#slt_listado_empleados_por_servicios")
        .click(function () {
            leer_empleados_por_servicios_juridico();
        })
        .keyup(function () {
            leer_empleados_por_servicios_juridico();
        });



    $("#btn_agregar_empleado_juridico").click(function () {
        lc_tipo_operacion_empleado_juridico = '1';
        $("#txt_apellidos_nombres").attr("disabled", true);
        $("#btn_grabar_empleados").attr("disabled", true);
        limpiar_contenido_empleados_por_servicios();
        $("#txt_dni_medico")
            .val('')
            .attr("disabled", false)
            .focus();
    });


    $("#btn_modificar_empleado_juridico").click(function () {
        lc_tipo_operacion_empleado_juridico = '2';
        $("#txt_dni_medico").attr("disabled", false);
        $("#txt_apellidos_nombres").attr("disabled", false);
        $("#btn_grabar_empleados").attr("disabled", false);
        $("#txt_dni_medico")
            .focus();
    });



    $("#txt_dni_medico")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function () {
            lc_dni_empleado = $("#txt_dni_medico").val().length;
            if (lc_dni_empleado === 8) {
                $("#msj_dni_empleado").html('<CENTER><font size="-1" color="#2F58F8" > --- DNI Conforme --- </font></CENTER>');
                $("#txt_apellidos_nombres")
                    .attr("disabled", false)
                    .focus();
            } else {
                $("#msj_dni_empleado").html('<CENTER><font size="-1" color="#EF6000" > --- Complete Caracteres DNI - 8 Digitos --- </font></CENTER>');
            }

        })
        .keypress(function (e) {
            if (e.which === 13) {
                $("#txt_apellidos_nombres")
                    .attr("disabled", false)
                    .focus();
            }
        });

    $("#txt_apellidos_nombres")
        .keypress(function (e) {
            $("#btn_grabar_empleados").attr("disabled", false);
            if (e.which === 13) {
                $("#btn_grabar_empleados")
                    .attr("disabled", false)
                    .focus();
            }
        });

    $("#btn_grabar_empleados").click(function () {
        lc_dni_empleado = $("#txt_dni_medico").val();
        lc_nombre_empleado = $("#txt_apellidos_nombres").val();
        if (lc_tipo_operacion_empleado_juridico === '1') {
            grabar_empleado_de_servicio_juridico(lc_id_juridico_servicios, lc_ruc_en_servicios, lc_dni_empleado, lc_nombre_empleado);
        } else {
            grabar_empleado_de_servicio_juridico_modificacion(lc_id_juridico_empleados_servicios, lc_dni_empleado, lc_nombre_empleado);
        }
    });


    $("#btn_eliminar_empleado_juridico").click(function () {
        eliminar_dar_de_baja_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios);
    });

    $("#btn_habilitar_empleado_juridico").click(function () {
        habilitar_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios);
    });

    /* fin de empleados por contratos juridicos */





});
