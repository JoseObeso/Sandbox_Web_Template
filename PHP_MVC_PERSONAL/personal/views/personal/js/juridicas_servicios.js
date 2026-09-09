var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_unidad_organica, lc_idorgano, lc_organo, lc_id_juridico, lc_ruc, lc_cargo, lc_id_unidad_organica, lc_id_organo, cantidad_registros, lc_tipo_operacion_juridicos_servicios, lc_fecha_inicio_servicio, lc_fecha_fin_servicio, lc_nota_informativa, ln_monto_total, datos_grabar_servicios, datos_ver_contratos, lc_id_juridico_servicios, lc_ruc_en_servicios, lc_fecha_inicio, lc_fecha_fin, datos_modificar_servicios, datos_eliminar_servicios, datos_grabar_servicios, datos_ver_contratos, cantidad_registros, lc_id_juridico_servicios, lc_ver_si_selecciono_id_servicio_juridico, lc_ruc_en_servicios, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, ln_monto_total, separar_fechas, fecha_conforme, lc_cargo, lc_id_organo, cantidad_registros, datos_eliminar_servicios, lc_idunidadorganica, lc_observacion, datos_eliminar_empleados_servicios, lc_nro_expediente, lc_meta_actual, lc_meta_anterior, lc_meta_siga, lc_pao, lc_ccp, lc_cantidad_medico, lc_cantidad_horas, ln_mes1, ln_mes2, datos, datos_validar, e, ln_monto, lc_distribucion_meses, lc_tipo_distribucion, lc_idunidad, lc_id_unidad, leer_cese_motivo, leer_cese_fecha, leer_cese_monto, leer_cese_observacion, lc_tipo_distribucion_registrado, lc_id_unidad_registrado, lc_descripcion_centro_costo;



/*** inicio de Contrato de servicios personal juridicos */


function ver_contrato_de_servicios_del_personal_juridico(lc_ruc) {
    "use strict";
    datos_ver_contratos = {
        'ruc': lc_ruc
    };
    $.ajax({
        data: datos_ver_contratos,
        dataType: 'json',
        url: url + 'personal/ver_contratos_personal_juridico',
        type: 'post',
        beforeSend: function () {},
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
                            '"  cargo = "' + filas.cargo +
                                
                            '"  idunidad = "' + filas.idunidad +
                            '"  unidad_organica = "' + filas.unidad_organica +
                            '"  organo = "' + filas.organo +
                            '"  descripcion_centro_costo = "' + filas.descripcion_centro_costo +
                                
                                
                            '"  nro_expediente = "' + filas.nro_expediente +
                            '"  meta_actual = "' + filas.meta_actual +
                            '"  meta_anterior = "' + filas.meta_anterior +
                            '"  meta_siga = "' + filas.meta_siga +
                            '"  pao = "' + filas.pao +
                            '"  ccp = "' + filas.ccp +
                            '"  cantidad_medicos = "' + filas.cantidad_medicos +
                            '"  cantidad_horas = "' + filas.cantidad_horas +
                            '"  mes1 = "' + filas.mes1 +
                            '"  mes2 = "' + filas.mes2 +
                            '"  tipo_distribucion = "' + filas.tipo_distribucion +
                            '"  monto_total = "' + filas.monto_total +
                            '"  observacion = "' + filas.observacion +
                            '"  cese_motivo = "' + filas.cese_motivo +
                            '"  cese_idmotivo = "' + filas.cese_idmotivo +                                
                            '"  cese_fecha = "' + filas.cese_fecha +                                                                
                            '"  cese_monto = "' + filas.cese_monto +                                                                                                
                            '"  cese_observacion = "' + filas.cese_observacion +     
                            '"  >' + filas.fecha_inicio + '&nbsp;│&nbsp;' + filas.fecha_fin + '&nbsp;│&nbsp;' + filas.nota_informativa + '</option>');
                    $("#slt_listado_servicios").attr("disabled", false);
                } else {
                    $("#slt_listado_servicios").attr("disabled", true);
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

/*

  leer_unidad_organica = $('#slt_listado_empleados_por_servicios  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_listado_empleados_por_servicios  option:selected').attr('organo');
        leer_descripcion_centro_costo = $('#slt_listado_empleados_por_servicios  option:selected').attr('descripcion_centro_costo');
        
        

*/



function convertir_fecha_caracter_a_date(leer_fecha) {
    "use strict";
    separar_fechas = leer_fecha.split("/");
    fecha_conforme = new Date(+separar_fechas[2], separar_fechas[1] - 1, +separar_fechas[0]);
    return fecha_conforme;
}

function inicializar_botones_personas_juridicas() {
    "use strict";
    $("#btn_agregar_juridico_servicio").attr("disabled", true);
    $("#btn_modificar_juridico_servicio").attr("disabled", true);
    $("#btn_eliminar_juridico_servicio").attr("disabled", true);
    $("#btn_grabar_servicios_juridicos").attr("disabled", true);
    $("#btn_registrar_cese").attr("disabled", true);

}

function inicializar_etiquetas_registro_Servicios_juridicos_mostrar_fecha_inicio() {
    "use strict";
    $("#fecha_inicio")
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Inicio Servicio"
        })
        .focus();

    $("#fecha_fin")
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Fin Servicio"
        });
}

function desabilitar_etiquetas_registro_contrato_juridico() {
    "use strict";
    $("#fecha_inicio").attr("disabled", true);
    $("#fecha_fin").attr("disabled", true);
    $("#txt_nota_informativa").attr("disabled", true);
    $("#txt_cargo").attr("disabled", true);
    $("#txt_descripcion_upss").attr("disabled", true);
    $("#txt_nro_expediente").attr("disabled", true);
    $("#txt_meta_actual").attr("disabled", true);
    $("#txt_meta_anterior").attr("disabled", true);
    $("#txt_meta_siga").attr("disabled", true);
    $("#txt_pao").attr("disabled", true);
    $("#txt_ccp").attr("disabled", true);
    $("#txt_nro_medico").attr("disabled", true);
    $("#txt_total_horas").attr("disabled", true);
    $("#txt_mes1").attr("disabled", true);
    $("#txt_mes2").attr("disabled", true);
    $("#txt_monto_total").attr("disabled", true);
    $("#txt_observacion").attr("disabled", true);
    $("#btn_modificar_juridico_servicio").attr("disabled", false);
    $("#btn_eliminar_juridico_servicio").attr("disabled", false);
    $("#btn_agregar_empleado_juridico").attr("disabled", false);
    $('#chk_distribuir_en_meses')
        .prop('checked', false)
        .prop('disabled', true);



}





function grabar_contrato_de_servicio_juridico(lc_id_juridico, lc_ruc, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, lc_cargo, lc_nro_expediente, lc_id_unidad,  lc_meta_actual, lc_meta_anterior, lc_meta_siga, lc_pao, lc_ccp, lc_cantidad_medico, lc_cantidad_horas, ln_mes1, ln_mes2, ln_monto_total, lc_distribucion_meses, lc_observacion) {
    "use strict";
    datos_grabar_servicios = {
        'idjuridico': lc_id_juridico,
        'ruc': lc_ruc,
        'fecha_inicio': lc_fecha_inicio,
        'fecha_fin': lc_fecha_fin,
        'nota_informativa': lc_nota_informativa,
        'cargo': lc_cargo,
        'nro_expediente': lc_nro_expediente,
        'idunidad': lc_id_unidad,
        'meta_actual': lc_meta_actual,
        'meta_anterior': lc_meta_anterior,
        'meta_siga': lc_meta_siga,
        'pao': lc_pao,
        'ccp': lc_ccp,
        'cantidad_medicos': lc_cantidad_medico,
        'cantidad_horas': lc_cantidad_horas,
        'mes1': ln_mes1,
        'mes2': ln_mes2,
        'monto_total': ln_monto_total,
        'distribucion': lc_distribucion_meses,
        'observacion': lc_observacion
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
            $("#nro_empleados_servicios_juridicos").val(lc_cantidad_medico);
            $("#descripcion_nro_empleados_por_servicios_juridicos").text('Por Contrato, existen: ' + lc_cantidad_medico + ' Empleados.');
            ver_contrato_de_servicios_del_personal_juridico(lc_ruc);

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });
}



function leer_contratos_de_servicios_y_mostrarlo() {
    "use strict";
    lc_id_juridico_servicios = $('#slt_listado_servicios option:selected').attr('id');
    lc_ver_si_selecciono_id_servicio_juridico = (typeof lc_id_juridico_servicios === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_servicio_juridico === '1') {
        lc_ruc_en_servicios = $('#slt_listado_servicios option:selected').attr('ruc');
        lc_fecha_inicio = $('#slt_listado_servicios option:selected').attr('fecha_inicio');
        lc_fecha_fin = $('#slt_listado_servicios option:selected').attr('fecha_fin');
        lc_nota_informativa = $('#slt_listado_servicios option:selected').attr('nota_informativa');
        lc_cargo = $('#slt_listado_servicios option:selected').attr('cargo');
        lc_nro_expediente = $('#slt_listado_servicios option:selected').attr('nro_expediente');
        
        lc_id_unidad = $('#slt_listado_servicios option:selected').attr('idunidad');
        lc_id_unidad_registrado = lc_id_unidad;
        lc_unidad_organica = $('#slt_listado_servicios option:selected').attr('unidad_organica');
        lc_organo = $('#slt_listado_servicios option:selected').attr('organo');
        lc_descripcion_centro_costo = $('#slt_listado_servicios option:selected').attr('descripcion_centro_costo');
        
        lc_meta_actual = $('#slt_listado_servicios option:selected').attr('meta_actual');
        lc_meta_anterior = $('#slt_listado_servicios option:selected').attr('meta_anterior');
        lc_meta_siga = $('#slt_listado_servicios option:selected').attr('meta_siga');
        lc_pao = $('#slt_listado_servicios option:selected').attr('pao');
        lc_ccp = $('#slt_listado_servicios option:selected').attr('ccp');
        lc_cantidad_medico = $('#slt_listado_servicios option:selected').attr('cantidad_medicos');
        lc_cantidad_horas = $('#slt_listado_servicios option:selected').attr('cantidad_horas');
        ln_mes1 = $('#slt_listado_servicios option:selected').attr('mes1');
        ln_mes2 = $('#slt_listado_servicios option:selected').attr('mes2');
        lc_tipo_distribucion = $('#slt_listado_servicios option:selected').attr('tipo_distribucion');
        lc_tipo_distribucion_registrado =  lc_tipo_distribucion;
        lc_observacion = $('#slt_listado_servicios option:selected').attr('observacion');
        ln_monto_total = $('#slt_listado_servicios option:selected').attr('monto_total');


        leer_cese_motivo = $('#slt_listado_servicios  option:selected').attr('cese_motivo');
        leer_cese_fecha = $('#slt_listado_servicios  option:selected').attr('cese_fecha');
        leer_cese_monto = $('#slt_listado_servicios  option:selected').attr('cese_monto');
        leer_cese_observacion = $('#slt_listado_servicios  option:selected').attr('cese_observacion');


        $("#id_contrato_servicios_juridicos").val(lc_id_juridico_servicios);
        $("#ruc_juridico_servicios_juridicos").val(lc_ruc_en_servicios);
        $("#nro_empleados_servicios_juridicos").val(lc_cantidad_medico);
        $("#descripcion_nro_empleados_por_servicios_juridicos").text('Por Contrato, existen: ' + lc_cantidad_medico + ' Empleados.');

        if (lc_tipo_distribucion === '2') {
            $('#chk_distribuir_en_meses')
                .prop('checked', true)
                .prop('disabled', true);
        } else {
            $('#chk_distribuir_en_meses')
                .prop('checked', false)
                .prop('disabled', true);
        }

        $("#fecha_inicio").val(lc_fecha_inicio);
        $("#fecha_fin").val(lc_fecha_fin);
        $("#txt_nota_informativa").val(lc_nota_informativa);
        $("#txt_cargo").val(lc_cargo);
        $("#txt_descripcion_upss").val(lc_organo);
        $("#txt_nro_expediente").val(lc_nro_expediente);
        $("#txt_meta_actual").val(lc_meta_actual);
        $("#txt_meta_anterior").val(lc_meta_anterior);
        $("#txt_meta_siga").val(lc_meta_siga);
        $("#txt_pao").val(lc_pao);
        $("#txt_ccp").val(lc_ccp);
        $("#txt_nro_medico").val(lc_cantidad_medico);
        $("#txt_total_horas").val(lc_cantidad_horas);
        $("#txt_mes1").val(ln_mes1);
        $("#txt_mes2").val(ln_mes2);
        $("#txt_monto_total").val(ln_monto_total);
        $("#txt_observacion").val(lc_observacion);
        $("#btn_modificar_juridico_servicio").attr("disabled", false);
        $("#btn_eliminar_juridico_servicio").attr("disabled", false);
        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        $("#btn_modificar_empleado_juridico").attr("disabled", true);
        $("#btn_eliminar_empleado_juridico").attr("disabled", true);
        $("#btn_habilitar_empleado_juridico").attr("disabled", true);
        $("#btn_grabar_empleados").attr("disabled", true);
        
        
        $("#txt_centro_costo").val(lc_descripcion_centro_costo);
        $("#txt_centro_sub_costo").val('');
        $("#txt_unidad_organica").val(lc_unidad_organica);
        $("#txt_organica").val(lc_organo);

        
         listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
        $("#slt_centro_costo").attr("disabled", true);


        $("#fecha_cese_inicial").val(leer_cese_fecha);
        $("#fecha_fin_servicio_cese").val(leer_cese_fecha);
        $("#txt_monto_total_cese").val(leer_cese_monto);
        $("#observacion_servicio_cese").val(leer_cese_observacion);
        $("#motivo_registrado").text(leer_cese_motivo);
     //   $("#motivo_registrado_con_cese").text(leer_cese_motivo);
        $("#btn_registrar_cese").attr("disabled", false);
        $("#btn_grabar_registro_cese").attr("disabled", true);


    } else {

    }


}


function habilitar_etiquetas_para_edicion_servicios_juridicos() {
    "use strict";
    $("#fecha_inicio").attr("disabled", false);
    $("#fecha_fin").attr("disabled", false);
    $("#txt_nota_informativa").attr("disabled", false);
    $("#txt_cargo").attr("disabled", false);
    listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
    $("#slt_centro_costo").attr("disabled", false);
    
    $("#txt_descripcion_upss").attr("disabled", false);
    $("#txt_nro_expediente").attr("disabled", false);
    $("#txt_meta_actual").attr("disabled", false);
    $("#txt_meta_anterior").attr("disabled", false);
    $("#txt_meta_siga").attr("disabled", false);
    $("#txt_pao").attr("disabled", false);
    $("#txt_ccp").attr("disabled", false);
    $("#txt_nro_medico").attr("disabled", false);
    $("#txt_total_horas").attr("disabled", false);
    $("#txt_mes1").attr("disabled", false);
    $("#txt_mes2").attr("disabled", false);
    $("#txt_monto_total").attr("disabled", false);
    $("#txt_observacion").attr("disabled", false);
    $("#btn_modificar_juridico_servicio").attr("disabled", false);
    $("#btn_grabar_servicios_juridicos").attr("disabled", false);
    $("#btn_registrar_cese").attr("disabled", false);
    $('#chk_distribuir_en_meses')
        .prop('checked', false)
        .prop('disabled', false);
    
    $("#fecha_inicio")
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Inicio Servicio"
        });


    $("#fecha_fin")
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Fin Servicio"
        });

}


function inhabilitar_etiquetas_y_limpiar() {
    "use strict";
    $("#fecha_inicio").val('');
    $("#fecha_fin").val('');
    $("#txt_nota_informativa").val('');
    $("#txt_cargo").val('');
    $("#txt_descripcion_upss").val('');
    $("#txt_nro_expediente").val('');
    $("#txt_meta_actual").val('');
    $("#txt_meta_anterior").val('');
    $("#txt_meta_siga").val('');
    $("#txt_pao").val('');
    $("#txt_ccp").val('');
    $("#txt_nro_medico").val(1);
    $("#txt_total_horas").val(0);
    $("#txt_mes1").val(0);
    $("#txt_mes2").val(0);
    $("#txt_monto_total").val(0);
    $("#txt_observacion").val('');
    $("#descripcion_nro_empleados_por_servicios_juridicos").text('');
    $("#id_contrato_servicios_juridicos").val('');
    $("#ruc_juridico_servicios_juridicos").val('');

    $('#chk_distribuir_en_meses')
        .prop('checked', false)
        .prop('disabled', true);
    listar_unidad_organica_de_organo();
}






function grabar_modificacion_servicios_por_personas_juridicas(lc_id_juridico_servicios, lc_id_juridico, lc_ruc, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, lc_cargo, lc_nro_expediente, lc_id_unidad, lc_meta_actual, lc_meta_anterior, lc_meta_siga, lc_pao, lc_ccp, lc_cantidad_medico, lc_cantidad_horas, ln_mes1, ln_mes2, ln_monto_total, lc_distribucion_meses, lc_observacion) {
    "use strict";
    datos_modificar_servicios = {
        'idjuridico_servicios': lc_id_juridico_servicios,
        'idjuridico': lc_id_juridico,
        'ruc': lc_ruc,
        'fecha_inicio': lc_fecha_inicio,
        'fecha_fin': lc_fecha_fin,
        'nota_informativa': lc_nota_informativa,
        'cargo': lc_cargo,
        'nro_expediente': lc_nro_expediente,
        'idunidad': lc_id_unidad,
        'meta_actual': lc_meta_actual,
        'meta_anterior': lc_meta_anterior,
        'meta_siga': lc_meta_siga,
        'pao': lc_pao,
        'ccp': lc_ccp,
        'cantidad_medicos': lc_cantidad_medico,
        'cantidad_horas': lc_cantidad_horas,
        'mes1': ln_mes1,
        'mes2': ln_mes2,
        'monto_total': ln_monto_total,
        'distribucion': lc_distribucion_meses,
        'observacion': lc_observacion
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
            $("#btn_eliminar_juridico_servicio").attr("disabled", true);
            $("#btn_modificar_juridico_servicio").attr("disabled", true);
            $("#btn_registrar_cese").attr("disabled", true);
            ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
            $("#nro_empleados_servicios_juridicos").val(lc_cantidad_medico);
            $("#descripcion_nro_empleados_por_servicios_juridicos").text('Por Contrato, existen: ' + lc_cantidad_medico + ' Empleados.');
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
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
            $("#btn_registrar_cese").attr("disabled", true);
            ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
            inhabilitar_etiquetas_y_limpiar();
            eliminar_empleados_de_contratos_por_servicios(lc_id_juridico_servicios);
            $("#descripcion_nro_empleados_por_servicios_juridicos").text('');
            $("#id_contrato_servicios_juridicos").text('');
            $("#ruc_juridico_servicios_juridicos").text('');
            $("#nro_empleados_servicios_juridicos").text('');

            $("#slt_listado_empleados_por_servicios")
                .html('')
                .attr("disabled", true);
        }

    });
}

function eliminar_empleados_de_contratos_por_servicios(lc_id_juridico_servicios) {
    "use strict";
    datos_eliminar_empleados_servicios = {
        'idjuridico_servicios': lc_id_juridico_servicios
    };

    $.ajax({
        data: datos_eliminar_empleados_servicios,
        dataType: 'json',
        url: url + 'personal/eliminar_todos_los_empleados_por_servicios_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_servicios_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_servicios_juridicos").html("");
            inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total();
        }


    });


}


function validar_si_existe_nota_informativa(lc_nota_informativa) {
    "use strict";
    datos_validar = {
        'nota': lc_nota_informativa
    };
    $.ajax({
        data: datos_validar,
        dataType: 'json',
        url: url + 'personal/validar_nota_informativa_ingresada',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#msj_nota_informativa_servicios_juridicos").html('<center><strong><font size="-1" color="#E90700">Nota Informativa Existe....</font></strong></center>');
                    $('#txt_cargo').attr("disabled", true);
                } else {
                    $("#msj_nota_informativa_servicios_juridicos").html('<center><strong><font size="-1" color="#0046E9">Continue....</font></strong></center>');
                    $('#txt_cargo')
                        .attr("disabled", false);
                         
                }
            });
        }

    });
}


/*** Fin de contrato de servicios de personal juridico */



$(document).ready(function () {
    "use strict";

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
        desabilitar_etiquetas_registro_contrato_juridico();
        inhabilitar_etiquetas_y_limpiar();
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
        $("#fecha_fin")
            .attr("disabled", false)
            .focus();
    });


    $("#fecha_fin").change(function () {
        lc_fecha_inicio = convertir_fecha_caracter_a_date($("#fecha_inicio").val());
        lc_fecha_fin = convertir_fecha_caracter_a_date($("#fecha_fin").val());
        if (lc_fecha_fin > lc_fecha_inicio) {
            $("#msj_nota_informativa_servicios_juridicos").html('');
            $("#txt_nota_informativa")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_nota_informativa_servicios_juridicos").html('<center><strong><font size="-1" color="#D08800">Fecha Fin Menor que fecha Inicio, corregir....</font></strong></center>');
            $("#txt_nota_informativa")
                .attr("disabled", true);
        }
    });




    $("#txt_nota_informativa")
        .keyup(function () {
            $("#txt_cargo")
                .attr("disabled", false);
            lc_nota_informativa = $("#txt_nota_informativa").val();
            validar_si_existe_nota_informativa(lc_nota_informativa);
        })
        .keypress(function (e) {
            if (e.which === 13) {
                lc_nota_informativa = $("#txt_nota_informativa").val();
                validar_si_existe_nota_informativa(lc_nota_informativa);
                $("#txt_cargo")
                    .attr("disabled", false)
                    .focus();
            }

        });

    $("#txt_cargo")
        .focus(function () {
            $("#slt_centro_costo")
                .attr("disabled", false);
        });


    // slt_centro_costo
    /*
    $("#slt_servicio_upss").change(function () {
        lc_id_unidad = $('#slt_servicio_upss  option:selected').attr('id');
        lc_unidad_organica = $('#slt_servicio_upss  option:selected').attr('unidad_organica');
        lc_idorgano = $('#slt_servicio_upss  option:selected').attr('idorgano');
        lc_organo = $('#slt_servicio_upss  option:selected').attr('organo');
        $("#txt_descripcion_upss").val(lc_unidad_organica + ' -- ' + lc_organo);
        $("#txt_nro_expediente")
            .attr("disabled", false)
            .focus();
        $("#txt_pao").attr("disabled", false);
        $("#txt_meta_actual").attr("disabled", false);
        $("#txt_ccp").attr("disabled", false);
        $("#txt_meta_anterior").attr("disabled", false);
        $("#txt_meta_siga").attr("disabled", false);
        $("#txt_pao").attr("disabled", false);
        $("#txt_ccp").attr("disabled", false);
        $("#txt_nro_medico").attr("disabled", false);
    });

*/
    
    
      $("#slt_centro_costo").change(function () {
        ln_idccuo = $('#slt_centro_costo  option:selected').attr('id');
        lc_id_unidad = ln_idccuo;
        lc_id_unidad_registrado = lc_id_unidad;
        leer_descripcion_centro_costo = $('#slt_centro_costo  option:selected').attr('descripcion_centro_costo');
        leer_descripcion_centro_sub_costo = $('#slt_centro_costo  option:selected').attr('descripcion_centro_subcosto');
        leer_descripcion_centro_tras_costo = $('#slt_centro_costo  option:selected').attr('descripcion_sub_trascosto');
        leer_unidad_organica = $('#slt_centro_costo  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_centro_costo  option:selected').attr('organo');
        lc_agregar_trascosto = (leer_descripcion_centro_tras_costo === '') ? leer_descripcion_centro_sub_costo :  leer_descripcion_centro_sub_costo  + ' - ' + leer_descripcion_centro_tras_costo;
        
        
        // $("#txt_centro_costo").val('CENTRO DE COSTO : ' + leer_descripcion_centro_costo + ' --  SUB COSTO : ' + leer_descripcion_centro_sub_costo + lc_agregar_trascosto + ' -- UNIDAD ORGANICA : ' + leer_unidad_organica + ' -- ORGANO : ' + leer_organo);
        
        $("#txt_centro_costo").val(leer_descripcion_centro_costo);
        $("#txt_centro_sub_costo").val(lc_agregar_trascosto);
        $("#txt_unidad_organica").val(leer_unidad_organica);
        $("#txt_organica").val(leer_organo);
          
        $("#txt_nro_expediente")
            .attr("disabled", false)
            .focus();
        $("#txt_pao").attr("disabled", false);
        $("#txt_meta_actual").attr("disabled", false);
        $("#txt_ccp").attr("disabled", false);
        $("#txt_meta_anterior").attr("disabled", false);
        $("#txt_meta_siga").attr("disabled", false);
        $("#txt_pao").attr("disabled", false);
        $("#txt_ccp").attr("disabled", false);
        $("#txt_nro_medico").attr("disabled", false);
          
        // $("#btn_grabar_empleados").attr("disabled", false);
    });

    
    
    
    
    
    
    
    $("#txt_nro_expediente")
        .keyup(function (e) {
            $("#txt_pao").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_pao").focus();
            }
        });

    $("#txt_pao")
        .keyup(function (e) {
            $("#txt_meta_actual").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_meta_actual").focus();
            }

        });


    $("#txt_meta_actual")
        .keyup(function (e) {
            $("#txt_ccp").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_ccp").focus();
            }

        });



    $("#txt_ccp")
        .keyup(function (e) {
            $("#txt_meta_anterior").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_meta_anterior").focus();
            }

        });

    $("#txt_meta_anterior")
        .keyup(function (e) {
            $("#txt_nro_medico").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_nro_medico").focus();
            }

        });

    $("#txt_nro_medico")
        .keyup(function (e) {
            $("#txt_meta_siga").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_meta_siga").focus();
            }

        });

    $("#txt_meta_siga")
        .keyup(function (e) {
            $("#txt_total_horas").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_total_horas").focus();
            }
        });

    $("#txt_total_horas")
        .keyup(function (e) {
            $("#txt_monto_total").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_monto_total").focus();
            }
        });



    $("#txt_monto_total")
        .keyup(function (e) {
            $('#chk_distribuir_en_meses')
                .prop('checked', true)
                .prop('disabled', false);
            ln_monto = $("#txt_monto_total").val();
            ln_mes1 = ln_monto / 2;
            ln_mes2 = ln_monto / 2;
            $("#txt_mes1").val(ln_mes1);
            $("#txt_mes2").val(ln_mes2);
            lc_distribucion_meses = '2';
            $("#txt_observacion").attr("disabled", false);
            $("#btn_grabar_servicios_juridicos").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_observacion").focus();
                $("#btn_grabar_servicios_juridicos").attr("disabled", false);
            }
        });



    $("#chk_distribuir_en_meses").on('change', function () {
        if ($(this).is(':checked')) {
            lc_distribucion_meses = '2';
            ln_monto = $("#txt_monto_total").val();
            ln_mes1 = ln_monto / 2;
            ln_mes2 = ln_monto / 2;
            $("#txt_mes1").val(ln_mes1);
            $("#txt_mes2").val(ln_mes2);

        } else {
            lc_distribucion_meses = '1';
            ln_monto = $("#txt_monto_total").val();
            ln_mes1 = ln_monto;
            ln_mes2 = 0;
            $("#txt_mes1").val(ln_mes1);
            $("#txt_mes2").val(ln_mes2);

        }
    });









    $("#btn_grabar_servicios_juridicos").click(function () {
        lc_fecha_inicio = $("#fecha_inicio").val();
        lc_fecha_fin = $("#fecha_fin").val();
        lc_nota_informativa = $("#txt_nota_informativa").val();
        lc_cargo = $("#txt_cargo").val();
        lc_nro_expediente = $("#txt_nro_expediente").val();
        // lc_idunidad, lc_unidad_organica, lc_idorgano, lc_organo, lc_distribucion_meses
        
        lc_meta_actual = $("#txt_meta_actual").val();
        lc_meta_anterior = $("#txt_meta_anterior").val();
        lc_meta_siga = $("#txt_meta_siga").val();
        lc_pao = $("#txt_pao").val();
        lc_ccp = $("#txt_ccp").val();
        lc_cantidad_medico = $("#txt_nro_medico").val();
        lc_cantidad_horas = $("#txt_total_horas").val();
        ln_mes1 = $("#txt_mes1").val();
        ln_mes2 = $("#txt_mes2").val();
        ln_monto_total = $("#txt_monto_total").val();
        lc_observacion = $("#txt_observacion").val();

        if (lc_tipo_operacion_juridicos_servicios === '1') {
            grabar_contrato_de_servicio_juridico(lc_id_juridico, lc_ruc, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, lc_cargo, lc_nro_expediente, lc_id_unidad, lc_meta_actual, lc_meta_anterior, lc_meta_siga, lc_pao, lc_ccp, lc_cantidad_medico, lc_cantidad_horas, ln_mes1, ln_mes2, ln_monto_total, lc_distribucion_meses, lc_observacion);
        } else {

            lc_distribucion_meses  = (typeof lc_distribucion_meses  === 'undefined') ? '1' : lc_distribucion_meses;
            lc_id_unidad  = (typeof lc_id_unidad  === 'undefined') ? lc_id_unidad_registrado : lc_id_unidad;
            grabar_modificacion_servicios_por_personas_juridicas(lc_id_juridico_servicios, lc_id_juridico, lc_ruc, lc_fecha_inicio, lc_fecha_fin, lc_nota_informativa, lc_cargo, lc_nro_expediente, lc_id_unidad, lc_meta_actual, lc_meta_anterior, lc_meta_siga, lc_pao, lc_ccp, lc_cantidad_medico, lc_cantidad_horas, ln_mes1, ln_mes2, ln_monto_total, lc_distribucion_meses, lc_observacion);
        }
        desabilitar_etiquetas_registro_contrato_juridico();
    });

});






/* fin de contratos servicios */
