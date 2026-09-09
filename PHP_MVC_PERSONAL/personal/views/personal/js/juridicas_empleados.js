var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_tipo_operacion_empleado_juridico, lc_nombre_empleado, datos_grabar_empleado_juridico, datos_ruc_consultar_empleado, lc_ver_si_selecciono_id_servicio_juridico, lc_id_juridico_empleados_servicios, lc_ver_si_selecciono_id_servicio_juridico_empleados, lc_ruc_servicios_empleados, lc_ruc_servicios_empleados_condicion, lc_dni_servicios_empleado, lc_apellidos_nombre_servicios_empleado, datos_actualizar_empleado_juridico, dar_de_baja, lc_condicion_empleado, datos_eliminar_empleados_servicios, lc_estado_juridico, datos_estado_juridico, lc_representante_legal, separar_fechas, fecha_conforme, lc_id_juridico_servicios, dato_listar_cargo, cantidad_registros, lc_dni_empleado, lc_medico_paterno, lc_medico_materno, lc_medico_nombres, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, lc_tipo_de_labor, lc_observacion_empleado_juridico, lc_ruc_en_servicios, lc_estado, lc_leer_nro_empleado, ln_leer_nro_empleados_registrado, dato_listar_organica, ln_idccuo, leer_descripcion_centro_costo, leer_descripcion_centro_sub_costo, leer_descripcion_centro_tras_costo, leer_unidad_organica, leer_organo, lc_agregar_trascosto;




function listar_de_cargos() {
    "use strict";
    dato_listar_cargo = {
        "cargo": ''
    };
    $.ajax({
        data: dato_listar_cargo,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_cargos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_cargos")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cargos").append('<option id="' + filas.id + '"  cargo = "' + filas.cargo + '"  id_grupo = "' + filas.id_grupo_ocupacional + '"  grupo = "' + filas.grupo + '"  >' + filas.cargo + '</option>');
                    $("#slt_cargos").attr("disabled", true);
                } else {
                    $("#slt_cargos").attr("disabled", true);
                }
            });
        }
    });

    $("#slt_cargos").select2({
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

function inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total() {
    "use strict";
    $("#txt_dni_medico")
        .attr("disabled", true)
        .val('');
    $("#msj_dni_empleado")
        .removeClass("alert-warning").addClass("alert-default")
        .attr("disabled", true)
        .html('');
    $("#txt_medico_paterno")
        .attr("disabled", true)
        .val('');
    $("#txt_medico_materno")
        .attr("disabled", true)
        .val('');
    $("#txt_medico_nombres")
        .attr("disabled", true)
        .val('');
    $("#tipo_de_labor_0")
        .attr("disabled", true)
        .prop("checked", false);

    $("#tipo_de_labor_1")
        .attr("disabled", true)
        .prop("checked", false);
    listar_de_cargos();
    $("#grupo_ocupacional")
        .val('');
    
    $("#txt_centro_costo").val('');
    $("#txt_centro_sub_costo").val('');
    $("#txt_unidad_organica").val('');
    $("#txt_organica").val('');
    
    
    
    $("#txt_observacion_empleados_juridicos")
        .attr("disabled", true)
        .val('');
    $("#slt_listado_empleados_por_servicios").attr("disabled", true);
    $("#btn_agregar_empleado_juridico").attr("disabled", true);
    $("#btn_modificar_empleado_juridico").attr("disabled", true);
    $("#btn_eliminar_empleado_juridico").attr("disabled", true);
    $("#btn_grabar_empleados").attr("disabled", true);
    listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
    $("#slt_centro_costo")
        .attr("disabled", true);


}

function solo_inhabilitar_etiquetas_empleado_juridico_pero_no_limpiar() {
    "use strict";
    $("#txt_dni_medico")
        .attr("disabled", true);
    $("#msj_dni_empleado")
        .removeClass("alert-warning").addClass("alert-default")
        .attr("disabled", true);
    $("#txt_medico_paterno")
        .attr("disabled", true);
    $("#txt_medico_materno")
        .attr("disabled", true);
    $("#txt_medico_nombres")
        .attr("disabled", true);
    $("#tipo_de_labor_0")
        .attr("disabled", true);
    $("#tipo_de_labor_1")
        .attr("disabled", true);
    listar_de_cargos();
    $("#txt_observacion_empleados_juridicos").attr("disabled", true);
    $("#btn_agregar_empleado_juridico").attr("disabled", true);
    $("#btn_modificar_empleado_juridico").attr("disabled", true);
    $("#btn_eliminar_empleado_juridico").attr("disabled", true);
    $("#btn_grabar_empleados").attr("disabled", true);
}

function grabar_empleado_de_servicio_juridico(lc_id_juridico_servicios, lc_ruc_en_servicios, lc_dni_empleado, lc_medico_paterno, lc_medico_materno, lc_medico_nombres, ln_id_cargo, lc_tipo_de_labor, lc_observacion_empleado_juridico, ln_idccuo) {
    "use strict";
    datos_grabar_empleado_juridico = {
        'id_juridico_servicios': lc_id_juridico_servicios,
        'ruc_servicios': lc_ruc_en_servicios,
        'dni': lc_dni_empleado,
        'paterno': lc_medico_paterno,
        'materno': lc_medico_materno,
        'nombres': lc_medico_nombres,
        'idcargo': ln_id_cargo,
        'tipo_labor': lc_tipo_de_labor,
        'observacion': lc_observacion_empleado_juridico,
        'idunidad_organica' : ln_idccuo
    };
    $.ajax({
        data: datos_grabar_empleado_juridico,
        dataType: 'json',
        url: url + 'personal/grabar_datos_empleado_de_empresa_juridica',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleado").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            solo_inhabilitar_etiquetas_empleado_juridico_pero_no_limpiar();
            $("#btn_agregar_empleado_juridico").attr("disabled", false);
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

function ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios) {
    "use strict";
    datos_ruc_consultar_empleado = {
        'idservicios': lc_id_juridico_servicios
    };
    $.ajax({
        data: datos_ruc_consultar_empleado,
        dataType: 'json',
        url: url + 'personal/ver_empleados_por_servicios_juridicos',
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
                            '"  dni = "' + filas.dni +
                            '"  paterno = "' + filas.paterno +
                            '"  materno = "' + filas.materno +
                            '"  nombres = "' + filas.nombres +
                            '"  apellidos_nombres = "' + filas.apellidos_nombres +
                            '"  idcargo = "' + filas.idcargo +
                            '"  cargo = "' + filas.cargo +
                            '"  grupo_ocupacion = "' + filas.grupo_ocupacion +
                            '"  tipo_empleado = "' + filas.tipo_empleado +
                            '"  idunidad_organica = "' + filas.idunidad_organica +                                
                            '"  unidad_organica = "' + filas.unidad_organica +  
                            '"  organo = "' + filas.organo + 
                            '"  descripcion_centro_costo = "' + filas.descripcion_centro_costo +                                                                  
                            '"  observacion = "' + filas.observacion +
                            '"  estado = "' + filas.estado +
                            '"  >' + filas.dni + '&nbsp;│&nbsp;' + filas.apellidos_nombres + '&nbsp;--&nbsp;' + filas.cargo + '</option>')
                        .attr("disabled", false);
                    ln_leer_nro_empleados_registrado = cantidad_registros;
                } else {
                    ln_leer_nro_empleados_registrado = 0;
                    $("#slt_listado_empleados_por_servicios")
                        .attr("disabled", true);
                }
            });
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




function leer_empleados_por_servicios_juridico() {
    "use strict";
    lc_id_juridico_empleados_servicios = $('#slt_listado_empleados_por_servicios  option:selected').attr('id');
    lc_ver_si_selecciono_id_servicio_juridico_empleados = (typeof lc_id_juridico_empleados_servicios === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_servicio_juridico_empleados === '1') {
        lc_dni_empleado = $('#slt_listado_empleados_por_servicios  option:selected').attr('dni');
        lc_medico_paterno = $('#slt_listado_empleados_por_servicios  option:selected').attr('paterno');
        lc_medico_materno = $('#slt_listado_empleados_por_servicios  option:selected').attr('materno');
        lc_medico_nombres = $('#slt_listado_empleados_por_servicios  option:selected').attr('nombres');
        lc_apellidos_nombre_servicios_empleado = $('#slt_listado_empleados_por_servicios  option:selected').attr('apellidos_nombres');
        ln_id_cargo = $('#slt_listado_empleados_por_servicios  option:selected').attr('idcargo');
        lc_cargo = $('#slt_listado_empleados_por_servicios  option:selected').attr('cargo');
        lc_grupo = $('#slt_listado_empleados_por_servicios  option:selected').attr('grupo_ocupacion');
        lc_tipo_de_labor = $('#slt_listado_empleados_por_servicios  option:selected').attr('tipo_empleado');
        lc_observacion_empleado_juridico = $('#slt_listado_empleados_por_servicios  option:selected').attr('observacion');
        lc_estado = $('#slt_listado_empleados_por_servicios  option:selected').attr('estado');
        ln_idccuo  = $('#slt_listado_empleados_por_servicios  option:selected').attr('idunidad_organica');
        leer_unidad_organica = $('#slt_listado_empleados_por_servicios  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_listado_empleados_por_servicios  option:selected').attr('organo');
        leer_descripcion_centro_costo = $('#slt_listado_empleados_por_servicios  option:selected').attr('descripcion_centro_costo');

        $("#txt_dni_medico").val(lc_dni_empleado);
        $("#txt_medico_paterno").val(lc_medico_paterno);
        $("#txt_medico_materno").val(lc_medico_materno);
        $("#txt_medico_nombres").val(lc_medico_nombres);
        $("#grupo_ocupacional").val(lc_cargo + ' -- ' + lc_grupo);
        if (lc_tipo_de_labor === 'S') {
            $("#tipo_de_labor_0")
                .attr("disabled", true)
                .prop("checked", true);
        } else {
            $("#tipo_de_labor_1")
                .attr("disabled", true)
                .prop("checked", true);
        }

        listar_de_cargos();
        
        $("#txt_centro_costo").val(leer_descripcion_centro_costo);
        $("#txt_centro_sub_costo").val('');
        $("#txt_unidad_organica").val(leer_unidad_organica);
        $("#txt_organica").val(leer_organo);
        
        
        
        $("#txt_observacion_empleados_juridicos").val(lc_observacion_empleado_juridico);
        $("#btn_agregar_empleado_juridico").attr("disabled", false);
        $("#btn_modificar_empleado_juridico").attr("disabled", false);
        $("#btn_eliminar_empleado_juridico").attr("disabled", false);
        $("#btn_grabar_empleados").attr("disabled", true);
    } else {}

}

function desabilitar_etiquetas_empleados_juridicos_para_edicion() {
    "use strict";
    $("#txt_dni_medico")
        .attr("disabled", false);
    $("#msj_dni_empleado")
        .removeClass("alert-warning").addClass("alert-default")
        .attr("disabled", true)
        .html('');
    $("#txt_medico_paterno")
        .attr("disabled", false);
    $("#txt_medico_materno")
        .attr("disabled", false);
    $("#txt_medico_nombres")
        .attr("disabled", false);
    $("#tipo_de_labor_0")
        .attr("disabled", false);
    $("#tipo_de_labor_1")
        .attr("disabled", false);
    listar_de_cargos();
    $("#txt_observacion_empleados_juridicos")
        .attr("disabled", false);
    $("#btn_grabar_empleados").attr("disabled", false);
    listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
    $("#slt_centro_costo").attr("disabled", false);
    
    
    
    
}


function grabar_empleado_de_servicio_juridico_modificacion(lc_id_juridico_empleados_servicios, lc_dni_empleado, lc_medico_paterno, lc_medico_materno, lc_medico_nombres, ln_id_cargo, lc_tipo_de_labor, lc_observacion_empleado_juridico, ln_idccuo) {
    "use strict";
    datos_actualizar_empleado_juridico = {
        'id_juridico_servicios': lc_id_juridico_empleados_servicios,
        'dni': lc_dni_empleado,
        'paterno': lc_medico_paterno,
        'materno': lc_medico_materno,
        'nombres': lc_medico_nombres,
        'idcargo': ln_id_cargo,
        'tipo_labor': lc_tipo_de_labor,
        'observacion': lc_observacion_empleado_juridico,
        'idunidad_organica' : ln_idccuo
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
            solo_inhabilitar_etiquetas_empleado_juridico_pero_no_limpiar();
            $("#btn_agregar_empleado_juridico").attr("disabled", false);
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


function eliminar_dar_de_baja_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios) {
    "use strict";
    dar_de_baja = {
        'id_juridico_servicios': lc_id_juridico_empleados_servicios
    };
    $.ajax({
        data: dar_de_baja,
        dataType: 'json',
        url: url + 'personal/eliminar_empleados_por_servicios_juridicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_empleados").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_empleados").html('');
            ver_empleados_por_contrato_de_servicios(lc_id_juridico_servicios);
            inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total();
            $("#btn_agregar_empleado_juridico").attr("disabled", false);
        }
    });

}


function validar_dni_empleado_juridico() {
    "use strict";
    lc_dni_empleado = $("#txt_dni_medico").val().length;
    if (lc_dni_empleado === 8) {
        $("#msj_dni_empleado")
            .removeClass("form-control alert-warning").addClass("form-control alert-success")
            .html('-- DNI Conforme --- ');
        $("#txt_medico_paterno")
            .attr("disabled", false)
            .focus();
    } else {
        $("#msj_dni_empleado")
            .removeClass("form-control alert-success").addClass("form-control alert-warning")
            .html('--- Complete Caracteres DNI - 8 Digitos ---');
    }

}



function listar_centro_de_costo_sub_costo_unidad_organica_de_organo() {
    "use strict";
    dato_listar_organica = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_organica,
        dataType: 'json',
        url: url + 'personal/listar_centro_de_costo_unidad_organica',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_centro_costo")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_centro_costo").append('<option id="' + filas.idccuo + '"  codigo_centro_costo= "' + filas.codigo_centro_costo + '"  descripcion_centro_costo = "' + filas.descripcion_centro_costo + '"  sub_codigo_centro_costo= "' + filas.sub_codigo_centro_costo + '"  descripcion_centro_subcosto = "' + filas.descripcion_centro_subcosto + '"  descripcion_sub_trascosto = "' + filas.descripcion_sub_trascosto + '"  descripcion_total = "' + filas.descripcion_total + '"  unidad_organica = "' + filas.unidad_organica + '"  organo = "' + filas.organo + '"  >' + filas.descripcion_total + '</option>');
                } else {
                    $("#slt_centro_costo").attr("disabled", true);
                }

            });

        }
    });
    $("#slt_centro_costo").select2({
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








$(document).ready(function () {
    "use strict";
    inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total();
    $("#slt_listado_empleados_por_servicios")
        .click(function () {
            leer_empleados_por_servicios_juridico();
        })
        .keyup(function () {
            leer_empleados_por_servicios_juridico();
        });


    $("#btn_agregar_empleado_juridico").click(function () {
        lc_leer_nro_empleado = $("#nro_empleados_servicios_juridicos").val();
        if (ln_leer_nro_empleados_registrado + 1 <= lc_leer_nro_empleado) {
            lc_tipo_operacion_empleado_juridico = '1';
            inicializar_inhabilitar_limpiar_etiquetas_empleados_por_servicios_total();
            $("#txt_dni_medico")
                .val('')
                .attr("disabled", false)
                .focus();
        } else {
             $("#txt_dni_medico")
                .val('')
                .attr("disabled", true);
            $("#msj_dni_empleado")
                .removeClass("form-control alert-success").addClass("form-control alert-warning")
                .html('--- Cantidad de Empleados completa ---');
        }

    });



    $("#btn_modificar_empleado_juridico").click(function () {
        lc_tipo_operacion_empleado_juridico = '2';
        desabilitar_etiquetas_empleados_juridicos_para_edicion();
        $("#txt_dni_medico")
            .focus();
    });



    $("#txt_dni_medico")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function () {
            validar_dni_empleado_juridico();
        })
        .keypress(function (e) {
            if (e.which === 13) {
                validar_dni_empleado_juridico();
            }
        });

    $("#txt_medico_paterno")
        .keypress(function (e) {
            $("#txt_medico_materno").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_medico_materno")
                    .focus();
            }
        });


    $("#txt_medico_materno")
        .keypress(function (e) {
            $("#txt_medico_nombres").attr("disabled", false);
            if (e.which === 13) {
                $("#txt_medico_nombres")
                    .focus();
            }
        });

    $("#txt_medico_nombres")
        .keypress(function (e) {
            $("#slt_cargos").attr("disabled", false);
            if (e.which === 13) {
                $("#slt_cargos")
                    .focus();
            }
        });

    $("#slt_cargos").change(function () {
        ln_id_cargo = $('#slt_cargos option:selected').attr('id');
        lc_cargo = $('#slt_cargos option:selected').attr('cargo');
        lid_grupo = $('#slt_cargos option:selected').attr('id_grupo');
        lc_grupo = $('#slt_cargos option:selected').attr('grupo');
        $('#grupo_ocupacional').val(lc_cargo + ' -- ' + lc_grupo);
        $("#tipo_de_labor_0")
            .attr("disabled", false)
            .prop("checked", true);
        $("#tipo_de_labor_1")
            .attr("disabled", false)
            .prop("checked", false);
        
       
        
        $("#txt_observacion_empleados_juridicos")
            .attr("disabled", false)
            .focus();
        lc_tipo_de_labor = 'S';
        
                 
        $("#btn_grabar_empleados")
            .attr("disabled", false)
            .focus();
       

    });

    $("#tipo_de_labor_0").click(function () {
        lc_tipo_de_labor = 'S';
        $("#slt_centro_costo")
            .attr("disabled", false)
            .focus();
        
        
    });

    $("#tipo_de_labor_1").click(function () {
        lc_tipo_de_labor = 'A';
        $("#slt_centro_costo")
            .attr("disabled", false)
            .focus();
        
    });

 
    



    $("#btn_grabar_empleados").click(function () {
        lc_dni_empleado = $("#txt_dni_medico").val();
        lc_medico_paterno = $("#txt_medico_paterno").val();
        lc_medico_materno = $("#txt_medico_materno").val();
        lc_medico_nombres = $("#txt_medico_nombres").val();
        ln_idccuo = lc_id_unidad;
        lc_observacion_empleado_juridico = $("#txt_observacion_empleados_juridicos").val();
        if (lc_tipo_operacion_empleado_juridico === '1') {
            grabar_empleado_de_servicio_juridico(lc_id_juridico_servicios, lc_ruc_en_servicios, lc_dni_empleado, lc_medico_paterno, lc_medico_materno, lc_medico_nombres, ln_id_cargo, lc_tipo_de_labor, lc_observacion_empleado_juridico, ln_idccuo);

        } else {
            grabar_empleado_de_servicio_juridico_modificacion(lc_id_juridico_empleados_servicios, lc_dni_empleado, lc_medico_paterno, lc_medico_materno, lc_medico_nombres, ln_id_cargo, lc_tipo_de_labor, lc_observacion_empleado_juridico, ln_idccuo);
        }
    });


    $("#btn_eliminar_empleado_juridico").click(function () {
        eliminar_dar_de_baja_empleado_por_servicio_juridico(lc_id_juridico_empleados_servicios);
    });



});
