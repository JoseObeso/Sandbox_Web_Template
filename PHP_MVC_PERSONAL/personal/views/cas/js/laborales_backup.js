var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    datos_buscar_cas;


var datos_buscar, nro_registros, lc_buscar_nombre, lc_tipo_operacion_cas, leer_id, leer_dni, leer_apellido_casada, leer_ruc, leer_plaza, leer_nro_contrato, leer_nro_proceso, leer_tipo_personal, leer_sexo, lid_pais, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_detalle_hijos, leer_edad, leer_estado_civil, leer_direccion, leer_direccion_distrito, leer_direccion_provincia, lc_sexo, leer_direccion_departamento, leer_sueldo, leer_cargo, leer_essalud, leer_carnet, leer_gs, leer_tfijo, leer_celular, leer_correo, leer_numero_hijos, lc_descripcion_documento, ln_id_documento, cantidad_registros, dato_listar, lc_id_departamento, lc_id_departamento, lc_id_provincia, lc_id_distrito, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, dato_actualizar_colegios, leer_id_colegio, leer_nombre_colegio, ln_id_especialidad, lc_descripcion_especialidad, lc_codigo_colegio, lc_nombre_colegio, lc_id_competencia, lc_descripcion_competencia, lc_id_capacitacion, lc_descripcion_capacitacion, leer_nombre_pais, lc_id_entrenamiento, lc_descripcion_entrenamiento, lc_id_universidad, lc_nombre_universidad, leer_tipo_educacion, leer_idpais, leer_tipo_documento, leer_nombre_documento, leer_nombre_sexo, leer_id_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_ruc_contrato, leer_sueldo_contrato, leer_id_condicion_laboral, leer_nombre_condicion_laboral, lid_origen_destaque, lid_nombre_destaque, lc_buscar_establecimiento = '',
    lid_cadena, lc_nombre_cadena,
    lc_idunidadorganica, lc_unidad_organica, lc_idorgano, lc_organo, lc_actividad;


var datos_buscar_cas, nro_registros, lc_buscar_nombre = '',
    lc_tipo_operacion_cas, leer_idpersonal, leer_idpais, leer_nombre_pais, leer_tipo_documento, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_idestadocivil, leer_estado_civil, leer_iddepartamento, leer_departamento, leer_iddprovincia, leer_provincia, leer_iddistrito, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, dato_listar_depar, dato_listar_civiles, dato_listar_provin, dato_listar_distrito, cantidad_registros, nro_registros, lc_ver_si_se_selecciono, buscar_nro, datos_grabar_cas, datos_grabar_cas_modificar, dato_anular, dato_habilitar, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, datos_buscar, i, valor_final, datos_buscar_cas_cero;


function listar_todo_el_personal_cas(lc_buscar_nombre) {
    "use strict";
    datos_buscar_cas = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: datos_buscar_cas,
        dataType: 'json',
        url: url + 'cas/buscar_por_nombre_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_carga_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_mientras_carga_personal").html("");
            $("#select_personal_cas_existente").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#select_personal_cas_existente").append('<option id="' + filas.id +
                            '"  idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento +
                            '"  nombre_documento = "' + filas.nombre_documento + '" nro_documento = "' + filas.nro_documento + '" sexo = "' + filas.sexo +
                            '"  paterno= "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada +
                            '"  nombres= "' + filas.nombres + '" apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento  = "' + filas.fecha_nacimiento +
                            '"  edad= "' + filas.edad + '" idestadocivil = "' + filas.idestadocivil + '" estado_civil  = "' + filas.estado_civil +
                            '" iddepartamento  = "' + filas.iddepartamento + '" departamento  = "' + filas.departamento +
                            '" idprovincia  = "' + filas.idprovincia + '" provincia  = "' + filas.provincia + '" iddistrito  = "' + filas.iddistrito +
                            '" distrito  = "' + filas.distrito + '" direccion  = "' + filas.direccion + '" correo_electronico  = "' + filas.correo_electronico +
                            '" telefono_fijo = "' + filas.telefono_fijo + '" celular_personal  = "' + filas.celular_personal + '" celular_emergencia  = "' + filas.celular_emergencia +
                            '" observacion = "' + filas.observacion + '" estado = "' + filas.estado + '" usuario  = "' + filas.usuario +
                            '" fecharegistro = "' + filas.fecharegistro + '" usuario_modifico = "' + filas.usuario_modifico + '"fecha_modifico  = "' + filas.fecha_modifico +
                            '" usuariodebaja = "' + filas.usuariodebaja + '" fechadebaja = "' + filas.fechadebaja +
                            '"  >' + filas.apellidos_nombres + '</option>');
                        estadisticas_personal_juridico_habil_desactivado();
                        $("#select_personal_cas_existente").attr("disabled", false);

                    } else {
                        $("#select_personal_cas_existente").attr("disabled", true);
                        $("#select_personal_cas_existente").empty();

                    }

                });
            } else {
                $("#select_personal_cas_existente").empty();
            }
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
function estadisticas_personal_juridico_habil_desactivado() {
    "use strict";
    datos_buscar = {
        'id': 1
    };
    $.ajax({
        data: datos_buscar,
        dataType: 'json',
        url: url + 'cas/ver_habiles_totales',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_mientras_carga_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (response) {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_mientras_carga_personal").html('');
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
function mostrar_personal_estado_cero() {
    "use strict";
    datos_buscar_cas_cero = {
        "nombres": ''
    };
    $.ajax({
        data: datos_buscar_cas_cero,
        dataType: 'json',
        url: url + 'cas/mostrar_cas_en_cero',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_carga_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_mientras_carga_personal").html("");
            $("#select_personal_cas_existente").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#select_personal_cas_existente").append('<option id="' + filas.id +
                            '"  idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento +
                            '"  nombre_documento = "' + filas.nombre_documento + '" nro_documento = "' + filas.nro_documento + '" sexo = "' + filas.sexo +
                            '"  paterno= "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada +
                            '"  nombres= "' + filas.nombres + '" apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento  = "' + filas.fecha_nacimiento +
                            '"  edad= "' + filas.edad + '" idestadocivil = "' + filas.idestadocivil + '" estado_civil  = "' + filas.estado_civil +
                            '" iddepartamento  = "' + filas.iddepartamento + '" departamento  = "' + filas.departamento +
                            '" idprovincia  = "' + filas.idprovincia + '" provincia  = "' + filas.provincia + '" iddistrito  = "' + filas.iddistrito +
                            '" distrito  = "' + filas.distrito + '" direccion  = "' + filas.direccion + '" correo_electronico  = "' + filas.correo_electronico +
                            '" telefono_fijo = "' + filas.telefono_fijo + '" celular_personal  = "' + filas.celular_personal + '" celular_emergencia  = "' + filas.celular_emergencia +
                            '" observacion = "' + filas.observacion + '" estado = "' + filas.estado + '" usuario  = "' + filas.usuario +
                            '" fecharegistro = "' + filas.fecharegistro + '" usuario_modifico = "' + filas.usuario_modifico + '"fecha_modifico  = "' + filas.fecha_modifico +
                            '" usuariodebaja = "' + filas.usuariodebaja + '" fechadebaja = "' + filas.fechadebaja +
                            '"  >' + filas.apellidos_nombres + '</option>');
                        estadisticas_personal_juridico_habil_desactivado();
                        $("#select_personal_cas_existente").attr("disabled", false);

                    } else {
                        $("#select_personal_cas_existente").attr("disabled", true);
                        $("#select_personal_cas_existente").empty();

                    }

                });
            } else {
                $("#select_personal_cas_existente").empty();
            }
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

function inicializar_y_limpiar_botones_laboral() {
    "use strict";
    
    $("#btn_agregar_contrato").attr("disabled", true);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_grabar_contrato").attr("disabled", true);
    $("#personal_seleccion_nombre").text('');
    $("#slt_contratos_seleccion")
        .attr("disabled", true)
        .html('');
    $("#slc_contratos_adendas")
        .attr("disabled", true)
        .html('');

    $("#condicion_personal")
        .text('')
        .removeClass("alert-warning")
        .addClass("alert-info");

    $("#slc_condicion_laboral").attr("disabled", true);
    $("#lugar_origen")
           .text("")
           .hide();
    $("#msj_condicion_laboral")
            .text('')
            .hide();
    
    $("#ruc")
         .val('')
         .attr("disabled", true);
    $("#txt_nro_proceso")
         .val('')
         .attr("disabled", true);
    $("#txt_nro_contrato")
         .val('')
         .attr("disabled", true);
    $("#fecha_inicio_contrato")
         .val('')
         .attr("disabled", true);
    $("#fecha_fin_contrato")
         .val('')
         .attr("disabled", true);
    $("#sueldo")
         .val('')
         .attr("disabled", true);
    listar_de_cargos();
    $("#slt_cargos")
         .val('')
         .attr("disabled", true);
    $("#grupo_ocupacional")
         .val('')
         .attr("disabled", true);
    listar_cadena_programatica();
    $("#slt_cadena_programatica")
         .val('')
         .attr("disabled", true);
    $("#nombre_cadena_programatica").val('');
    $("#meta")
         .val('')
         .attr("disabled", true);
    
    $("#plaza")
         .val('')
         .attr("disabled", true);
      $("#tipo_de_labor_0")
           .attr("disabled", true)
           .prop("checked", false);
    $("#tipo_de_labor_1")
           .attr("disabled", true)
           .prop("checked", false);
    listar_unidad_organica_de_organo();
    $("#txt_descripcion_upss")
         .val('')
         .attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", true);
    $("#slc_tipo_especialidad").attr("disabled", true);
    
    
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    inicializar_adendas();
    $("#txt_renaes").hide();
    $("#txt_buscar_establecimiento")
          .text('')
          .hide();
    $("#lgr_origen_destaque").hide();
    $("#lugar_origen").text('');
    
  
    
    
    
    listar_motivos_renuncia();
    
}





function limpiar_etiquetas_agregar_contrato_nuevo() {
    "use strict";
    $("#btn_agregar_contrato").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_grabar_contrato").attr("disabled", true);
    listar_condicion_laboral();
    $("#lugar_origen")
           .text("")
           .hide();
    $("#ruc")
         .val('')
         .attr("disabled", true);
    $("#txt_nro_proceso")
         .val('')
         .attr("disabled", true);
    $("#txt_nro_contrato")
         .val('')
         .attr("disabled", true);
    $("#fecha_inicio_contrato")
         .val('')
         .attr("disabled", true);
    $("#fecha_fin_contrato")
         .val('')
         .attr("disabled", true);
    $("#sueldo")
         .val('')
         .attr("disabled", true);
    listar_de_cargos();
    $("#slt_cargos")
         .val('')
         .attr("disabled", true);
    $("#grupo_ocupacional")
         .val('')
         .attr("disabled", true);
    listar_cadena_programatica();
    $("#slt_cadena_programatica")
         .val('')
         .attr("disabled", true);
    $("#nombre_cadena_programatica").val('');
    $("#meta")
         .val('')
         .attr("disabled", true);
    $("#plaza")
         .val('')
         .attr("disabled", true);
      $("#tipo_de_labor_0")
           .attr("disabled", true)
           .prop("checked", false);
    $("#tipo_de_labor_1")
           .attr("disabled", true)
           .prop("checked", false);
    listar_unidad_organica_de_organo();
    $("#txt_descripcion_upss")
         .val('')
         .attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", true);
    $("#slc_tipo_especialidad").attr("disabled", true);
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    inicializar_adendas();
    $("#txt_renaes").hide();
    $("#txt_buscar_establecimiento")
          .text('')
          .hide();
    $("#lgr_origen_destaque").hide();
    $("#lugar_origen").text('');
   
    $("#slc_condicion_laboral")
             .attr("disabled", false)
             .focus();
}








function leer_personal_cas_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idpersonal = $('#select_personal_cas_existente  option:selected').attr('id');
    lc_ver_si_se_selecciono = (typeof leer_idpersonal === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono === '1') {
        leer_idpersonal = $('#select_personal_cas_existente  option:selected').attr('id');
        leer_idpais = $('#select_personal_cas_existente  option:selected').attr('idpais');
        leer_nombre_pais = $('#select_personal_cas_existente  option:selected').attr('nombre_pais');
        leer_tipo_documento = $('#select_personal_cas_existente  option:selected').attr('tipo_documento');
        leer_nombre_documento = $('#select_personal_cas_existente  option:selected').attr('nombre_documento');
        leer_nro_documento = $('#select_personal_cas_existente  option:selected').attr('nro_documento');
        leer_sexo = $('#select_personal_cas_existente  option:selected').attr('sexo');
        leer_paterno = $('#select_personal_cas_existente  option:selected').attr('paterno');
        leer_materno = $('#select_personal_cas_existente  option:selected').attr('materno');
        leer_apellido_casada = $('#select_personal_cas_existente  option:selected').attr('apellido_casada');
        leer_nombres = $('#select_personal_cas_existente  option:selected').attr('nombres');
        leer_apellidos_nombres = $('#select_personal_cas_existente  option:selected').attr('apellidos_nombres');
        leer_fecha_nacimiento = $('#select_personal_cas_existente  option:selected').attr('fecha_nacimiento');
        leer_edad = $('#select_personal_cas_existente  option:selected').attr('edad');
        leer_idestadocivil = $('#select_personal_cas_existente  option:selected').attr('idestadocivil');
        leer_estado_civil = $('#select_personal_cas_existente  option:selected').attr('estado_civil');
        leer_iddepartamento = $('#select_personal_cas_existente  option:selected').attr('iddepartamento');
        leer_departamento = $('#select_personal_cas_existente  option:selected').attr('departamento');
        leer_iddprovincia = $('#select_personal_cas_existente  option:selected').attr('idprovincia');
        leer_provincia = $('#select_personal_cas_existente  option:selected').attr('provincia');
        leer_iddistrito = $('#select_personal_cas_existente  option:selected').attr('iddistrito');
        leer_distrito = $('#select_personal_cas_existente  option:selected').attr('distrito');
        leer_direccion = $('#select_personal_cas_existente  option:selected').attr('direccion');
        leer_correo_electronico = $('#select_personal_cas_existente  option:selected').attr('correo_electronico');
        leer_telefono_fijo = $('#select_personal_cas_existente  option:selected').attr('telefono_fijo');
        leer_celular_personal = $('#select_personal_cas_existente  option:selected').attr('celular_personal');
        leer_celular_emergencia = $('#select_personal_cas_existente  option:selected').attr('celular_emergencia');
        leer_observacion = $('#select_personal_cas_existente  option:selected').attr('observacion');
        leer_estado = $('#select_personal_cas_existente  option:selected').attr('estado');
        leer_usuario_registro = $('#select_personal_cas_existente  option:selected').attr('usuario');
        leer_fecha_registro = $('#select_personal_cas_existente  option:selected').attr('fecharegistro');
        leer_usuario_modifico = $('#select_personal_cas_existente  option:selected').attr('usuario_modifico');
        leer_fecha_modifico = $('#select_personal_cas_existente  option:selected').attr('fecha_modifico');
        leer_usuario_de_baja = $('#select_personal_cas_existente  option:selected').attr('usuariodebaja');
        leer_fecha_de_baja = $('#select_personal_cas_existente  option:selected').attr('fechadebaja');
        $("#personal_seleccion_nombre").text(leer_apellidos_nombres);
        if (leer_estado === '1') {
            $("#condicion_personal")
                .text('HABILITADO')
                .removeClass("alert-warning")
                .addClass("alert-info");
        } else {
            $("#condicion_personal")
                .text('INOPERATIVO')
                .removeClass("alert-info")
                .addClass("alert-warning");

        }
        $("#btn_agregar_contrato").attr("disabled", false);
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);


        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);

        ver_contratos_personal_seleccion(leer_idpersonal);
        $("#txt_nro_proceso").val('');
        $("#txt_nro_contrato").val('');
        $("#fecha_inicio_contrato").val('');
        $("#fecha_fin_contrato").val('');
        $("#slc_contratos_adendas")
            .attr("disabled", true)
            .empty();

        $("#btn_agregar_adenda").attr("disabled", true);
        $("#btn_modificar_adenda").attr("disabled", true);
        $("#btn_eliminar_adenda").attr("disabled", true);
        ocultar_adendas_contratos();
        


    } else {
        $("#btn_agregar_contrato").attr("disabled", true);
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);

        $("#btn_agregar_adenda").attr("disabled", true);
        $("#btn_modificar_adenda").attr("disabled", true);
        $("#btn_eliminar_adenda").attr("disabled", true);


    }
}



 

function ver_contratos_personal_seleccion(leer_idpersonal) {
    "use strict";
    dato_listar = {
        "id": leer_idpersonal
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'cas/vercontratos_del_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#slt_contratos_seleccion")
                .html('');
            $("#espera_grabacion_contratos").html('');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_contratos_seleccion")
                        .show()
                        .append('<option id="' + filas.id +
                            '"  nro_contrato = "' + filas.nro_contrato +
                            '"  nro_proceso = "' + filas.nro_proceso +
                            '"  ruc = "' + filas.ruc +
                            '"  sueldo = "' + filas.sueldo +
                            '"  feha_inicio_contrato = "' + filas.fecha_ingreso +
                            '" fecha_desvinculacion = "' + filas.fecha_desvinculacion +
                            '"  feha_termino_contrato = "' + filas.fecha_termino + '">' + filas.nro_contrato + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#124;&nbsp;' + filas.fecha_ingreso + '&nbsp;&#124;&nbsp;&nbsp;' + filas.fecha_termino + '&nbsp;&#124;&nbsp;' + filas.fecha_desvinculacion + '</option>')
                        .attr("disabled", false);
                } else {
                    $("#slt_contratos_seleccion").attr("disabled", true);
                }
            });
        }
    });
}

function leer_contratos_y_mostrarlo_datos_laborales() {
    "use strict";
    leer_id_contrato = $('#slt_contratos_seleccion  option:selected').attr('id');
    leer_nro_contrato = $('#slt_contratos_seleccion  option:selected').attr('nro_contrato');
    leer_nro_proceso = $('#slt_contratos_seleccion  option:selected').attr('nro_proceso');
    leer_fecha_ingreso_contrato = $('#slt_contratos_seleccion  option:selected').attr('feha_inicio_contrato');
    leer_fecha_termino_contrato = $('#slt_contratos_seleccion  option:selected').attr('feha_termino_contrato');
    leer_ruc_contrato = $('#slt_contratos_seleccion  option:selected').attr('ruc');
    leer_sueldo_contrato = $('#slt_contratos_seleccion  option:selected').attr('sueldo');
    $("#txt_nro_proceso").val(leer_nro_proceso);
    $("#txt_nro_contrato").val(leer_nro_contrato);
    $("#fecha_inicio_contrato").val(leer_fecha_ingreso_contrato);
    $("#fecha_fin_contrato").val(leer_fecha_termino_contrato);
    $("#ruc").val(leer_ruc_contrato);
    $("#sueldo").val(leer_sueldo_contrato);
    ver_contratos_y_consultar_adendas(leer_id_contrato);

    $("#btn_agregar_adenda").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", false);
    $("#btn_eliminar_contrato").attr("disabled", false);

    $("#btn_modificar_adenda").attr("disabled", true);
    $("#btn_eliminar_adenda").attr("disabled", true);
    $("#contenedor-contratos").show();
    $("#contenedor_adendas").hide();
    $("#msj_condicion_laboral")
            .text('')
            .hide();

}



function listar_condicion_laboral() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_condicion_laboral',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_condicion_laboral")
                .html('')
                .show();
            $("#slc_condicion_laboral").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_condicion_laboral").append('<option id="' + filas.idtiposituacion + '"  descripcion = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                    $("#slc_condicion_laboral").attr("disabled", false);
                } else {
                    $("#slc_condicion_laboral").attr("disabled", true);
                }
            });
        }
    });
}

 







function listar_establecimientos(lc_buscar_establecimiento) {
    "use strict";
    dato_listar = {
        "id": lc_buscar_establecimiento
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_establecimientos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_origen_destaque")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_origen_destaque").append('<option id="' + filas.id + '"  nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                    $("#slc_origen_destaque").attr("disabled", false);
                } else {
                    $("#slc_origen_destaque").attr("disabled", true);
                }
            });
        }
    });

}



function listar_cadena_programatica() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_contenido_cadena_programatica',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_cadena_programatica")
                .html('')
                .show();
            $("#slt_cadena_programatica").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cadena_programatica").append('<option id="' + filas.id + '"  tarea = "' + filas.nombre_tarea + '"  actividad = "' + filas.actividad + '"  >' + filas.nombre_tarea + '</option>');
                    // $("#slt_cadena_programatica").attr("disabled", true);
                } else {
                    // $("#slt_cadena_programatica").attr("disabled", true);
                }
            });
        }
    });
    $("#slt_cadena_programatica").select2({
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



function listar_de_cargos() {
    "use strict";
    dato_listar = {
        "cargo": ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_cargos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_cargos")
                .html('')
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


function listar_unidad_organica_de_organo() {

    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_unidad_organica_total',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_servicio_upss")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
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



function listar_motivos_renuncia() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_motivos_renuncia',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_motivos_renuncia")
                .html('')
                .show();
            $("#slc_motivos_renuncia").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_motivos_renuncia").append('<option id="' + filas.idmotivo + '"  motivo = "' + filas.motivo + '"  >' + filas.motivo + '</option>');
                    $("#slc_motivos_renuncia").attr("disabled", true);

                } else {
                    $("#slc_motivos_renuncia").attr("disabled", true);
                }

            });

        }
    });

}

function desabilitar_controles_contratos() {
    "use strict";
    $("#btn_agregar_contrato").attr("disabled", true);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_grabar_contrato").attr("disabled", true);
    $("#slt_cargos").attr("disabled", true);
    $("#sueldo").attr("disabled", true);
    $("#ruc").attr("disabled", true);
    $("#txt_descripcion_upss").attr("disabled", true);
    $("#slc_tipo_especialidad").attr("disabled", true);
    $("#txt_descripcion_especialidad").attr("disabled", true);
    $("#rne").attr("disabled", true);
}






$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    ocultar_adendas_contratos();
    listar_todo_el_personal_cas(lc_buscar_nombre);
    inicializar_y_limpiar_botones_laboral();
    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {
            inicializar_y_limpiar_botones_laboral();
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            listar_todo_el_personal_cas(lc_buscar_nombre);
            $('#btn_agregar_cas').attr("disabled", false);

        });

    $("#select_personal_cas_existente")
        .click(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        });

    $("#slt_contratos_seleccion")
        .click(function () {
            leer_contratos_y_mostrarlo_datos_laborales();
        })
        .keyup(function () {
            leer_contratos_y_mostrarlo_datos_laborales();
        });


    $("#slc_contratos_adendas")
        .click(function () {
            leer_adendas_mostrar_datos();
        })
        .keyup(function () {
            leer_adendas_mostrar_datos();
        });

    


    $("#chk_debaja").on('change', function () {
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);


        }
    });



    $("#btn_agregar_contrato").click(function () {
        limpiar_etiquetas_agregar_contrato_nuevo();
    });




    $("#btn_agregar_adenda").click(function () {
        $("#txt_nro_adenda").val('');
        $("#fecha_inicio_adenda").val('');
        $("#fecha_fin_adenda").val('');
        $("#contenedor-contratos").hide();
        $("#contenedor_adendas").show();
        $("#btn_grabar_adenda").attr("disabled", true);


    });






    // $("#contenedor_adendas").hide();



    $("#slc_condicion_laboral").change(function () {
        leer_id_condicion_laboral = $('#slc_condicion_laboral  option:selected').attr('id');
        leer_nombre_condicion_laboral = $('#slc_condicion_laboral  option:selected').attr('descripcion');
        switch (leer_id_condicion_laboral) {
            case '0':
                $("#msj_condicion_laboral").html('<center><font color="#E80041">Debe escoger el tipo de condicion laboral</font></center>');
                $("#lugar_origen").text('');
                $("#slc_origen_destaque").attr("disabled", true);
                $("#txt_renaes")
                    .val('')
                    .attr("disabled", true)
                    .hide();
                $("#txt_buscar_establecimiento").hide();
                $("#lgr_origen_destaque").hide();
                $("#slc_origen_destaque")
                    .attr("disabled", true)
                    .hide();
                $("#txt_nro_proceso")
                    .attr("disabled", true);
                $("#txt_nro_contrato")
                    .attr("disabled", true);
                break;
            case '3':
                $("#msj_condicion_laboral").html('<center><font color="#E59600">Seleccione el lugar de origen</font></center>');
                $("#lugar_origen").text('Origen de destaque:');
                $("#lgr_origen_destaque").show();
                  $("#txt_nro_proceso")
                    .attr("disabled", true);
                $("#txt_nro_contrato")
                    .attr("disabled", true);
                
                $("#slc_origen_destaque")
                    .attr("disabled", false)
                    .show();
                $("#txt_renaes")
                    .val('')
                    .attr("disabled", false)
                    .show();
                $("#txt_buscar_establecimiento")
                    .show()
                    .val('')
                    .focus();

                break;

            default:
                $("#lgr_origen_destaque").hide();
                $("#txt_buscar_establecimiento").hide();
                $("#lugar_origen").text('');
                $("#txt_nro_proceso").attr("disabled", false);
                $("#txt_nro_contrato").attr("disabled", false);
                $("#slt_asistencial").attr("disabled", false);
                $("#txt_renaes")
                    .val('')
                    .attr("disabled", true)
                    .hide();
                $("#msj_condicion_laboral").html('<center><font color="#0420A7">Continue registrado</font></center>');
                $("#slc_origen_destaque")
                    .attr("disabled", true)
                    .hide();
                
                
                 $("#txt_nro_proceso")
                    .attr("disabled", true);
                $("#txt_nro_contrato")
                    .attr("disabled", true);
                
                 $("#ruc")
                    .attr("disabled", false)
                    .focus();
                
                
                break;
        }
    });



    $("#txt_buscar_establecimiento").keyup(function () {
        lc_buscar_establecimiento = $("#txt_buscar_establecimiento").val();
        listar_establecimientos(lc_buscar_establecimiento);
        $("#txt_renaes").val('');
    });



    $("#slc_origen_destaque").change(function () {

        lid_origen_destaque = $('#slc_origen_destaque  option:selected').attr('id');
        lid_nombre_destaque = $('#slc_origen_destaque  option:selected').attr('nombre');
        $("#txt_renaes").val(lid_nombre_destaque);


    });

    $("#txt_nro_contrato").keypress(function () {
        $('#fecha_inicio_contrato').attr("disabled", false);

    });

 

    $("#slt_asistencial").change(function () {
        $('#fecha_inicio_contrato').attr("disabled", false);


    });


    $('#fecha_inicio_contrato').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin habilitacion"
    }).on('show', function () {

    });

    $('#fecha_inicio_contrato').change(function () {
        $('#fecha_fin_contrato').attr("disabled", false);
    });


    $('#fecha_fin_contrato').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin habilitacion"
    }).on('show', function () {

    });

    $('#fecha_fin_contrato').change(function () {
        $("#slt_cargos").attr("disabled", false);
        $("#ruc").attr("disabled", false);

    });

    $("#slt_cargos").change(function () {
        $("#sueldo").attr("disabled", false);
    });


    $("#slt_cargos").change(function () {
        ln_id_cargo = $('#slt_cargos option:selected').attr('id');
        lc_cargo = $('#slt_cargos option:selected').attr('cargo');
        lid_grupo = $('#slt_cargos option:selected').attr('id_grupo');
        lc_grupo = $('#slt_cargos option:selected').attr('grupo');
        $('#grupo_ocupacional').val(lc_grupo);
        $("#sueldo").attr("disabled", false);
    });



    $("#sueldo").keypress(function () {
        $("#ruc").attr("disabled", false);
        $("#meta").attr("disabled", false);
    });


    $("#ruc").keypress(function () {
        $("#slt_cadena_programatica").attr("disabled", false);
    });


    $("#slt_cadena_programatica").change(function () {
        lid_cadena = $('#slt_cadena_programatica  option:selected').attr('id');
        lc_nombre_cadena = $('#slt_cadena_programatica  option:selected').attr('tarea');
        lc_actividad = $('#slt_cadena_programatica  option:selected').attr('actividad');
        $("#nombre_cadena_programatica").val(lc_actividad + ' -- ' + lc_nombre_cadena);
        $("#slt_servicio_upss").attr("disabled", false);

    });


    $("#slt_servicio_upss").change(function () {
        lc_idunidadorganica = $('#slt_servicio_upss  option:selected').attr('id');
        lc_unidad_organica = $('#slt_servicio_upss  option:selected').attr('unidad_organica');
        lc_idorgano = $('#slt_servicio_upss  option:selected').attr('idorgano');
        lc_organo = $('#slt_servicio_upss  option:selected').attr('organo');
        $("#txt_descripcion_upss").val(lc_unidad_organica + ' -- ' + lc_organo);
        $("#slc_tipo_especialidad").attr("disabled", false);
        $('#btn_grabar_contrato').attr("disabled", false);






    });

    $("#slc_tipo_especialidad").change(function () {
        ln_id_especialidad = $('#slc_tipo_especialidad  option:selected').attr('id');
        lc_descripcion_especialidad = $('#slc_tipo_especialidad  option:selected').attr('descripcion');
        lc_codigo_colegio = $('#slc_tipo_especialidad  option:selected').attr('codigo_colegio');
        lc_nombre_colegio = $('#slc_tipo_especialidad  option:selected').attr('colegio');
        $('#txt_descripcion_especialidad')
            .val(lc_descripcion_especialidad + ' - ' + lc_nombre_colegio)
            .attr("disabled", true);
        $("#rne").attr("disabled", false);
    });


    $('#btn_grabar_contrato').click(function () {
        desabilitar_controles_contratos();
    });








});
