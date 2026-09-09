var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lid_pais = '174',
    lc_operacion_servicios = '1',
    lc_estado_personal = '1',
    ln_mes_servicio = 1,
    leer_idupss = '1',
    ln_valor_tiempo_dias, lc_fecha_inicio_servicio, fecha_inicio_separada, fecha_fin_servicio, anio_fin, mes_fin, dia_fin, ln_dias, ln_mes, ln_valor_tiempo_mes,
    datos_habilitar, nro_registros, leer_id, leer_nro_documento, leer_apellido_casada, lid_pais, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_direccion, lc_sexo, leer_celular, lc_descripcion_documento, ln_id_documento, cantidad_registros, lc_id_departamento, lc_id_departamento, lc_id_provincia, lc_id_distrito, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, dato_actualizar_colegios, ln_id_especialidad, lc_descripcion_especialidad, lc_codigo_colegio, lc_nombre_colegio, leer_nombre_pais, leer_idpais, leer_tipo_documento, leer_tiempo_duracion, leer_nombre_documento, leer_nombre_sexo, lc_valor_tipo_duracion, leer_id_servicio, leer_fecha_ingreso_servicio, leer_fecha_fin_servicio, leer_nro_expediente, leer_nota_informativa, leer_nro_pedido, lc_idunidadorganica, lc_unidad_organica, lc_idorgano, lc_organo, leer_id_departamento, leer_nombre_departamento, leer_id_provincia, leer_nombre_provincia, leer_id_distrito, leer_nombre_distrito, leer_correo_electronico, leer_telefono_fijo, leer_celular_emergencia, leer_observacion, leer_nombre_estado, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, leer_estado, lc_tipo_operacion_datos_personales, lc_nombre_encontrado, leer_ruc, leer_sexo, i, valor_final, ln_monto_servicio, lc_tipo_monto_distribuir, leer_meta_actual_usuaria, leer_meta_actual_certificada, leer_descripcion_fuente_financiamiento, leer_id_fuente_actual_financiamiento, leer_meta_anterior_certificada, leer_fuente_anterior_certificada, leer_pao, leer_ccp, leer_meta_anterior_certificada, leer_fuente_anterior_certificada, leer_pao, leer_ccp, leer_monto_total, leer_mes1, leer_mes2, leer_descripcion_servicio, leer_id_cargo, leer_cargo, leer_grupo_ocupacional, leer_tipo_empleado, leer_descripcion_tipo_empleado, leer_id_subcosto_upss, leer_servicio_unidad, leer_id_organo, leer_organo, leer_idespecialidad, leer_nombre_especialidad, leer_colegio, leer_rne, lc_ver_si_tiene_id, ln_id_carrera, lc_descripcion_carrera, ln_codigo_colegio, lc_descripcion_colegio, lc_tipo_operacion_carrera, ln_idenficador_carrera, lc_nro_colegio, ln_idenficador_habilidad, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad, lc_tipo_operacion_habilidad, lc_buscar_nombre_nuevo, leer_fecha_ultimo_contrato, fecha_seleccion, separar_fechas, fecha_conforme, ver_fecha_contrato, ver_fecha_seleccion, leer_nro_ruc, lc_fecha_ver, datos_ver_contratos, dato_listar_carrera, dato_listar_doc, datos_buscar_per, datos_buscar_baj, datos_buscar_estadistica, dato_listar_depar, dato_listar_provin, dato_listar_distrito, dato_listar_cargo, dato_listar_espe, dato_consultar_si_existe, dato_consultar_registrado, datos_grabar_tercero, datos_grabar_modi_tercero, datos_eliminar_tercero, dato_listar_finan, datos_grabar_servicios, datos_eliminar_servicios, datos_grabar_carrera_tercero, datos_grabar_per_ter, datos_eliminar_car, datos_buscar_habilidades_carrera, datos_grabar_mod_habi, datos_eliminar_habil_tercero, datos_buscar_ruc, datos_buscar_carrera_perso, datos_buscar_fecha_habil, datos_buscar_habilidad_fin, datos_grabar_habilidad_por_carrera, dato_listar_carrera_tecnico, datos_grabar_servic, dato_listar_organica, leer_mes3, datos_actualizar_fecha, datos_fecha, lc_fecha_ultima, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese, datos_registrar_cese, leer_cese_motivo, leer_cese_fecha, leer_cese_monto, leer_cese_observacion, dato_listar_carrera, lc_condicion_profesion, leer_condicion_profesion, leer_descripcion_profesion, lc_agregar_trascosto, ln_idccuo, leer_descripcion_centro_costo, leer_descripcion_centro_sub_costo, leer_descripcion_centro_tras_costo, leer_unidad_organica, dato_listar_upss, leer_idupss, leer_descripcion_upss, leer_idupss_registrado, leer_idupss_capturar, leer_idmotivo_cese, leer_motivo_cese, leer_mostrar_fecha_cese;


// slt_centro_costo

function listar_personal_tercero_total(lc_buscar_nombre_nuevo) {
    "use strict";
    datos_buscar_per = {
        "nombres": lc_buscar_nombre_nuevo
    };

    $.ajax({
        data: datos_buscar_per,
        dataType: 'json',
        url: url + 'personal/buscar_personal_tercero_nuevo',
        type: 'post',
        beforeSend: function() {
            $("#espera_mientras_busca_nombre").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_mientras_busca_nombre").html('');
            $("#slt_seleccionar_personal_terceros").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verificar === '1') {
                        $("#slt_seleccionar_personal_terceros").append('<option value="' + filas.idtercero + '"  id = "' + filas.idtercero + '" idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento + '" nro_documento = "' + filas.nro_documento + '" nombre_documento = "' + filas.nombre_documento + '" ruc = "' + filas.ruc + '" sexo = "' + filas.sexo + '" nombre_sexo = "' + filas.nombre_sexo + '" paterno = "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada + '" nombres = "' + filas.nombres + '" apellidos_nombre = "' + filas.apellidosnombres + '" nacimiento = "' + filas.nacimiento + '" fecha_nacimiento = "' + filas.fecha_nacimiento + '" edad = "' + filas.edad + '" iddepartamento = "' + filas.iddepartamento + '" nombre_departamento = "' + filas.nombre_departamento + '" idprovincia = "' + filas.idprovincia + '" nombre_provincia = "' + filas.nombre_provincia + '" iddistrito = "' + filas.iddistrito + '" nombre_distrito = "' + filas.nombre_distrito + '" direccion = "' + filas.direccion + '" correo_electronico = "' + filas.correo_electronico + '" telefono_fijo = "' + filas.telefono_fijo + '" celular = "' + filas.celular + '" celular_emergencia = "' + filas.celular_emergencia + '" observacion = "' + filas.observacion + '" estado= "' + filas.estado + '" nombre_estado= "' + filas.nombre_estado + '" usuario = "' + filas.usuario + '" fecha_registro = "' + filas.fecha_registro + '" usuario_modifico = "' + filas.usuario_modifico + '" fecha_modifico = "' + filas.fecha_modifico + '" usuario_debaja = "' + filas.usuario_debaja + '" fecha_debaja = "' + filas.fecha_debaja + '"fecha_ultimo_contrato = "' + filas.fecha_vencimiento_ultimo_contrato + '"  >' + filas.apellidosnombres + '</option>');
                        $("#slt_seleccionar_personal_terceros").attr("disabled", false);
                        $("#total_registrados").html(nro_registros);
                        estadisticas_personal_tercero_habil_desactivado();
                    } else {
                        $("#slt_seleccionar_personal_terceros")
                            .attr("disabled", true)
                            .empty();
                        $("#total_registrados").html('0');
                    }
                });
            } else {
                $("#slt_seleccionar_personal_terceros").empty();
            }
        },


    });


    $("#slt_seleccionar_personal_terceros").select2({
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



function listar_tabla_tipos_documentos() {
    "use strict";
    dato_listar_doc = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_doc,
        dataType: 'json',
        url: url + 'parametros/actualizar_tipos_documentos',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_tipo_documento")
                .html('')
                .append('<option id="0"> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.encontrado === '1') {
                    $("#slt_tipo_documento")
                        .append('<option id="' + filas.codigo + '" codigo = "' + filas.codigo + '" descripcion = "' + filas.descripcion + '"  >' + filas.codigo + ' - ' + filas.descripcion + '</option>')
                        .removeClass("form-control").addClass("form-control  alert-warning");
                } else {

                }

            });

        }
    });
    $("#slt_tipo_documento").attr("disabled", true);
}





function slt_contiene_sexo() {
    "use strict";
    $("#slt_sexo")
        .html('')
        .append('<option lc_sexo="0"> Seleccion </option>')
        .append('<option lc_sexo="M"> MASCULINO </option>')
        .append('<option lc_sexo="F"> FEMENINO </option>')
        .val("0");
}




function mostrar_personal_de_baja(lc_estado_personal) {
    "use strict";
    datos_buscar_baj = {
        "estado": lc_estado_personal
    };
    $.ajax({
        data: datos_buscar_baj,
        dataType: 'json',
        url: url + 'personal/personal_tercero_de_baja',
        type: 'post',
        beforeSend: function() {
            $("#espera_mientras_busca_nombre").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function(encontrados) {
            $("#espera_mientras_busca_nombre").html('');
            $("#slt_seleccionar_personal_terceros").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verificar === '1') {
                        $("#slt_seleccionar_personal_terceros").append('<option value="' + filas.idtercero + '"  id = "' + filas.idtercero + '" idpais = "' + filas.idpais +
                            '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento + '" nro_documento = "' + filas.nro_documento + '" nombre_documento = "' + filas.nombre_documento +
                            '" ruc = "' + filas.ruc +
                            '" sexo = "' + filas.sexo +
                            '" nombre_sexo = "' + filas.nombre_sexo +
                            '" paterno = "' + filas.paterno +
                            '" materno = "' + filas.materno +
                            '" apellido_casada = "' + filas.apellido_casada +
                            '" nombres = "' + filas.nombres +
                            '" apellidos_nombre = "' + filas.apellidosnombres +
                            '" nacimiento = "' + filas.nacimiento +
                            '" fecha_nacimiento = "' + filas.fecha_nacimiento +
                            '" edad = "' + filas.edad +
                            '" iddepartamento = "' + filas.iddepartamento +
                            '" nombre_departamento = "' + filas.nombre_departamento +
                            '" idprovincia = "' + filas.idprovincia +
                            '" nombre_provincia = "' + filas.nombre_provincia +
                            '" iddistrito = "' + filas.iddistrito +
                            '" nombre_distrito = "' + filas.nombre_distrito +
                            '" direccion = "' + filas.direccion +
                            '" correo_electronico = "' + filas.correo_electronico +
                            '" telefono_fijo = "' + filas.telefono_fijo +
                            '" celular = "' + filas.celular +
                            '" celular_emergencia = "' + filas.celular_emergencia +
                            '" observacion = "' + filas.observacion +
                            '" estado= "' + filas.estado +
                            '" nombre_estado= "' + filas.nombre_estado +
                            '" usuario = "' + filas.usuario +
                            '" fecha_registro = "' + filas.fecha_registro +
                            '" usuario_modifico = "' + filas.usuario_modifico +
                            '" fecha_modifico = "' + filas.fecha_modifico +
                            '" usuario_debaja = "' + filas.usuario_debaja +
                            '" fecha_debaja = "' + filas.fecha_debaja +
                            '" fecha_ultimo_contrato = "' + filas.fecha_vencimiento_ultimo_contrato +
                            '"  >' + filas.apellidosnombres + '</option>');
                        $("#slt_seleccionar_personal_terceros").attr("disabled", false);
                        $("#total_registrados").html(nro_registros);
                        estadisticas_personal_tercero_habil_desactivado();
                        $("#chk_debaja").attr("disabled", false);
                    } else {
                        $("#chk_debaja").attr("disabled", false);
                        $("#slt_seleccionar_personal_terceros")
                            .attr("disabled", true)
                            .empty();
                        $("#total_registrados").html('0');
                    }

                });
            } else {
                $("#slt_seleccionar_personal_terceros").empty();
            }
        }
    });

}


function estadisticas_personal_tercero_habil_desactivado() {
    "use strict";
    datos_buscar_estadistica = {
        'id': 1
    };
    $.ajax({
        data: datos_buscar_estadistica,
        dataType: 'json',
        url: url + 'personal/ver_habiles_empleados',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_mientras_busca_nombre").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(response) {
            $("#mostrar_estadistica_registro").html('');
            $("#espera_mientras_busca_nombre").html('');
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



function inicializar_botones_identificacion_personal() {
    "use strict";
    $("#btn_agregar_tercero").attr("disabled", false);
    $("#btn_modificar_tercero").attr("disabled", true);
    $("#btn_eliminar_tercero").attr("disabled", true);
    $("#btn_grabar_datos_personales").attr("disabled", true);
    desabilitar_input_text_identificacion_personal();

}

function leer_personal_tercero_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#slt_seleccionar_personal_terceros  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof leer_id === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        leer_idpais = $('#slt_seleccionar_personal_terceros  option:selected').attr('idpais');
        leer_nombre_pais = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_pais');
        leer_tipo_documento = $('#slt_seleccionar_personal_terceros  option:selected').attr('tipo_documento');
        leer_nro_documento = $('#slt_seleccionar_personal_terceros  option:selected').attr('nro_documento');
        leer_nombre_documento = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_documento');
        leer_ruc = $('#slt_seleccionar_personal_terceros option:selected').attr('ruc');
        leer_sexo = $('#slt_seleccionar_personal_terceros  option:selected').attr('sexo');
        leer_nombre_sexo = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_sexo');
        leer_paterno = $('#slt_seleccionar_personal_terceros  option:selected').attr('paterno');
        leer_materno = $('#slt_seleccionar_personal_terceros  option:selected').attr('materno');
        leer_apellido_casada = $('#slt_seleccionar_personal_terceros  option:selected').attr('apellido_casada');
        leer_nombres = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombres');
        leer_apellidos_nombres = $('#slt_seleccionar_personal_terceros  option:selected').attr('apellidos_nombre');
        leer_fecha_nacimiento = $('#slt_seleccionar_personal_terceros  option:selected').attr('fecha_nacimiento');
        leer_edad = $('#slt_seleccionar_personal_terceros  option:selected').attr('edad');
        leer_id_departamento = $('#slt_seleccionar_personal_terceros  option:selected').attr('iddepartamento');
        leer_nombre_departamento = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_departamento');
        leer_id_provincia = $('#slt_seleccionar_personal_terceros  option:selected').attr('idprovincia');
        leer_nombre_provincia = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_provincia');
        leer_id_distrito = $('#slt_seleccionar_personal_terceros option:selected').attr('iddistrito');
        leer_nombre_distrito = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_distrito');
        leer_direccion = $('#slt_seleccionar_personal_terceros  option:selected').attr('direccion');
        leer_correo_electronico = $('#slt_seleccionar_personal_terceros  option:selected').attr('correo_electronico');
        leer_telefono_fijo = $('#slt_seleccionar_personal_terceros  option:selected').attr('telefono_fijo');
        leer_celular = $('#slt_seleccionar_personal_terceros option:selected').attr('celular');
        leer_celular_emergencia = $('#slt_seleccionar_personal_terceros option:selected').attr('celular_emergencia');
        leer_observacion = $('#slt_seleccionar_personal_terceros  option:selected').attr('observacion');
        leer_estado = $('#slt_seleccionar_personal_terceros  option:selected').attr('estado');
        leer_nombre_estado = $('#slt_seleccionar_personal_terceros  option:selected').attr('nombre_estado');
        leer_usuario_registro = $('#slt_seleccionar_personal_terceros  option:selected').attr('usuario');
        leer_fecha_registro = $('#slt_seleccionar_personal_terceros  option:selected').attr('fecha_registro');
        leer_usuario_modifico = $('#slt_seleccionar_personal_terceros  option:selected').attr('usuario_modifico');
        leer_fecha_modifico = $('#slt_seleccionar_personal_terceros  option:selected').attr('fecha_modifico');
        leer_usuario_de_baja = $('#slt_seleccionar_personal_terceros option:selected').attr('usuario_debaja');
        leer_fecha_de_baja = $('#slt_seleccionar_personal_terceros  option:selected').attr('fecha_debaja');
        leer_fecha_ultimo_contrato = $('#slt_seleccionar_personal_terceros  option:selected').attr('fecha_ultimo_contrato');

        $('#personal_tercero_seleccion').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $('#personal_seleccion_servicio').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $('#personal_seleccion_carrera').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $("#msj_confirmacion_eliminar").html('');
        $("#nombre_pais_registrado").html(leer_nombre_pais);
        $("#sexo_registrado").html(leer_nombre_sexo);
        $("#nombre_documento_registrado").text(leer_nombre_documento);
        $("#txt_nro_documento").val(leer_nro_documento);
        $("#txt_paterno").val(leer_paterno);
        $("#txt_materno").val(leer_materno);
        $("#apellido_casada").val(leer_apellido_casada);
        $("#txt_nombres").val(leer_nombres);
        $("#txt_nacimiento").val(leer_fecha_nacimiento);
        $("#txt_edad").val(leer_edad);
        $("#nombre_departamento").val(leer_nombre_departamento);
        $("#nombre_provincia").val(leer_nombre_provincia);
        $("#nombre_distrito").val(leer_nombre_distrito);
        $("#txt_area_direccion").val(leer_direccion);
        $("#txt_correo_electronico").val(leer_correo_electronico);
        $("#txt_telefono_fijo").val(leer_telefono_fijo);
        $("#txt_telefono_celular").val(leer_celular);
        $("#telefono_emergencia").val(leer_celular_emergencia);
        $("#ruc").val(leer_ruc);
        $("#observacion").val(leer_observacion);
        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);

        $("#btn_agregar_tercero").attr("disabled", false);
        $("#btn_modificar_tercero").attr("disabled", false);
        $("#btn_eliminar_tercero").attr("disabled", false);
        $("#btn_habilitar_tercero").attr("disabled", false);


        $("#btn_grabar_datos_personales").attr("disabled", true);
        $("#ver_existe_documento").html('');

        modo_lectura_etiquetas_datos_personales();
        ver_personal_y_mostrar_contratos(leer_id);
        inicializar_botones_etiquetas_carrera_profesional_habilidad();
        ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id);
        inicializar_botones_de_datos_servicios();
        inicializar_botones_habilidad_profesional();
        listar_departamentos();
        listar_carreras_profesion();
        listar_de_cargos();
        listar_colegios_profesionales();
        listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
        listar_tipos_especialidad();
        slt_contiene_sexo();
        listar_tabla_tipos_documentos();
        lc_id_departamento = '0';
        lc_id_provincia = '0';
        listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
        listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);

        $("#slt_pais").append('<option id="0" pais=""></option>');


        if (leer_estado === '1') {
            $("#nombre_estado")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_servicio")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_carrera")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#btn_agregar_servicio").attr("disabled", false);

        } else {
            $("#nombre_estado")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_servicio")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_carrera")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#btn_agregar_servicio").attr("disabled", true);

        }
        $("#btn_agregar_carrera").attr("disabled", false);

    } else {

    }

}


function modo_lectura_etiquetas_datos_personales() {
    "use strict";
    $("#slt_pais").attr("disabled", true);
    $("#slt_tipo_documento").attr("disabled", true);
    $("#msj_tipo_documento").text('');
    $("#txt_nro_documento").attr("disabled", true);
    $("#txt_nro_documento").attr("disabled", true);
    $("#ver_existe_documento").text('');
    $("#slt_sexo").attr("disabled", true);
    $("#txt_paterno").attr("disabled", true);
    $("#txt_materno").attr("disabled", true);
    $("#apellido_casada").attr("disabled", true);
    $("#txt_nombres").attr("disabled", true);
    $("#txt_nacimiento").attr("disabled", true);
    $("#slc_departamento").attr("disabled", true);
    $("#slc_provincia").attr("disabled", true);
    $("#slc_distrito").attr("disabled", true);
    $("#txt_area_direccion").attr("disabled", true);
    $("#txt_correo_electronico").attr("disabled", true);
    $("#txt_telefono_fijo").attr("disabled", true);
    $("#txt_telefono_celular").attr("disabled", true);
    $("#telefono_emergencia").attr("disabled", true);
    $("#ruc").attr("disabled", true);
    $("#observacion").attr("disabled", true);
    $("#btn_grabar_datos_personales").attr("disabled", true);
}



function leer_personal_tercero__de_baja_mostrarlo_en_etiquetas() {

    "use strict";
    leer_id = $('#listar_personal_de_baja  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof leer_id === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        leer_idpais = $('#listar_personal_de_baja  option:selected').attr('idpais');
        leer_nombre_pais = $('#listar_personal_de_baja  option:selected').attr('nombre_pais');
        leer_tipo_documento = $('#listar_personal_de_baja  option:selected').attr('tipo_documento');
        leer_nro_documento = $('#listar_personal_de_baja  option:selected').attr('nro_documento');
        leer_nombre_documento = $('#listar_personal_de_baja  option:selected').attr('nombre_documento');
        leer_ruc = $('#listar_personal_de_baja  option:selected').attr('ruc');
        leer_sexo = $('#listar_personal_de_baja  option:selected').attr('sexo');
        leer_nombre_sexo = $('#listar_personal_de_baja  option:selected').attr('nombre_sexo');
        leer_paterno = $('#listar_personal_de_baja  option:selected').attr('paterno');
        leer_materno = $('#listar_personal_de_baja  option:selected').attr('materno');
        leer_apellido_casada = $('#listar_personal_de_baja  option:selected').attr('apellido_casada');
        leer_nombres = $('#listar_personal_de_baja  option:selected').attr('nombres');
        leer_apellidos_nombres = $('#listar_personal_de_baja  option:selected').attr('apellidos_nombre');
        leer_fecha_nacimiento = $('#listar_personal_de_baja  option:selected').attr('fecha_nacimiento');
        leer_edad = $('#listar_personal_de_baja  option:selected').attr('edad');
        leer_id_departamento = $('#listar_personal_de_baja  option:selected').attr('iddepartamento');
        leer_nombre_departamento = $('#listar_personal_de_baja  option:selected').attr('nombre_departamento');
        leer_id_provincia = $('#listar_personal_de_baja  option:selected').attr('idprovincia');
        leer_nombre_provincia = $('#listar_personal_de_baja  option:selected').attr('nombre_provincia');
        leer_id_distrito = $('#listar_personal_de_baja option:selected').attr('iddistrito');
        leer_nombre_distrito = $('#listar_personal_de_baja  option:selected').attr('nombre_distrito');
        leer_direccion = $('#listar_personal_de_baja  option:selected').attr('direccion');
        leer_correo_electronico = $('#listar_personal_de_baja  option:selected').attr('correo_electronico');
        leer_telefono_fijo = $('#listar_personal_de_baja  option:selected').attr('telefono_fijo');
        leer_celular = $('#listar_personal_de_baja  option:selected').attr('celular');
        leer_celular_emergencia = $('#listar_personal_de_baja  option:selected').attr('celular_emergencia');
        leer_observacion = $('#listar_personal_de_baja  option:selected').attr('observacion');
        leer_estado = $('#listar_personal_de_baja  option:selected').attr('estado');
        leer_nombre_estado = $('#listar_personal_de_baja option:selected').attr('nombre_estado');
        leer_usuario_registro = $('#listar_personal_de_baja  option:selected').attr('usuario');
        leer_fecha_registro = $('#listar_personal_de_baja option:selected').attr('fecha_registro');
        leer_usuario_modifico = $('#listar_personal_de_baja option:selected').attr('usuario_modifico');
        leer_fecha_modifico = $('#listar_personal_de_baja  option:selected').attr('fecha_modifico');
        leer_usuario_de_baja = $('#listar_personal_de_baja  option:selected').attr('usuario_debaja');
        leer_fecha_de_baja = $('#listar_personal_de_baja  option:selected').attr('fecha_debaja');

        $('#personal_tercero_seleccion').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $('#personal_seleccion_servicio').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $('#personal_seleccion_carrera').html('<strong>' + leer_apellidos_nombres + '</strong>');
        $("#msj_confirmacion_eliminar").html('');
        $("#nombre_pais_registrado").html(leer_nombre_pais);
        $("#sexo_registrado").html(leer_nombre_sexo);
        $("#nombre_documento_registrado").text(leer_nombre_documento);
        $("#txt_nro_documento").val(leer_nro_documento);
        $("#txt_paterno").val(leer_paterno);
        $("#txt_materno").val(leer_materno);
        $("#apellido_casada").val(leer_apellido_casada);
        $("#txt_nombres").val(leer_nombres);
        $("#txt_nacimiento").val(leer_fecha_nacimiento);
        $("#txt_edad").val(leer_edad);
        $("#nombre_departamento").val(leer_nombre_departamento);
        $("#nombre_provincia").val(leer_nombre_provincia);
        $("#nombre_distrito").val(leer_nombre_distrito);
        $("#txt_area_direccion").val(leer_direccion);
        $("#txt_area_direccion").val(leer_direccion);
        $("#txt_correo_electronico").val(leer_correo_electronico);
        $("#txt_telefono_fijo").val(leer_telefono_fijo);
        $("#txt_telefono_celular").val(leer_celular);
        $("#telefono_emergencia").val(leer_celular_emergencia);
        $("#ruc").val(leer_ruc);
        $("#observacion").val(leer_observacion);

        if (leer_estado === '1') {
            $("#nombre_estado")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_servicio")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_carrera")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#btn_agregar_servicio").attr("disabled", false);

        } else {
            $("#nombre_estado")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_servicio")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_carrera")
                .text(leer_nombre_estado + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#btn_agregar_servicio").attr("disabled", true);
        }

        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);
        $("#btn_agregar_tercero").attr("disabled", false);
        $("#btn_modificar_tercero").attr("disabled", false);
        $("#btn_eliminar_tercero").attr("disabled", false);
        $("#btn_habilitar_tercero").attr("disabled", false);
        $("#btn_grabar_datos_personales").attr("disabled", true);
        $("#ver_existe_documento").html('');
        ver_personal_y_mostrar_contratos(leer_id);
        inicializar_botones_etiquetas_carrera_profesional_habilidad();
        ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id);
        inicializar_botones_de_datos_servicios();
        inicializar_botones_habilidad_profesional();
        listar_departamentos();
        listar_carreras_profesion();
        listar_de_cargos();
        listar_colegios_profesionales();
        listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
        listar_tipos_especialidad();
        slt_contiene_sexo();
        listar_tabla_tipos_documentos();
        lc_id_departamento = '0';
        lc_id_provincia = '0';
        listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
        listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
        $("#btn_agregar_carrera").attr("disabled", false);
        $("#slt_pais").append('<option id="0" pais=""></option>');

    } else {

    }

}



function leer_servicios_de_terceros_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id_servicio = $('#slt_servicios  option:selected').attr('id');
    leer_fecha_ingreso_servicio = $('#slt_servicios  option:selected').attr('fecha_inicio');
    leer_tiempo_duracion = $('#slt_servicios  option:selected').attr('tiempo_duracion');
    leer_fecha_fin_servicio = $('#slt_servicios  option:selected').attr('fecha_fin');
    leer_nro_expediente = $('#slt_servicios  option:selected').attr('nro_expediente');
    leer_nota_informativa = $('#slt_servicios  option:selected').attr('nota_informativa');
    leer_nro_pedido = $('#slt_servicios  option:selected').attr('nro_pedido');
    leer_meta_actual_usuaria = $('#slt_servicios  option:selected').attr('meta_actual_usuaria');
    leer_meta_actual_certificada = $('#slt_servicios  option:selected').attr('meta_actual_certificada');
    leer_id_fuente_actual_financiamiento = $('#slt_servicios  option:selected').attr('id_fuente_actual_financiamiento');
    leer_descripcion_fuente_financiamiento = $('#slt_servicios  option:selected').attr('descripcion_fuente_financiamiento');
    leer_meta_anterior_certificada = $('#slt_servicios  option:selected').attr('meta_anterior_certificada');
    leer_fuente_anterior_certificada = $('#slt_servicios  option:selected').attr('fuente_anterior_certificada');
    leer_pao = $('#slt_servicios  option:selected').attr('pao');
    leer_ccp = $('#slt_servicios  option:selected').attr('ccp');
    leer_monto_total = $('#slt_servicios  option:selected').attr('monto_total');
    leer_mes1 = $('#slt_servicios  option:selected').attr('mes1');
    leer_mes2 = $('#slt_servicios  option:selected').attr('mes2');
    leer_mes3 = $('#slt_servicios  option:selected').attr('mes3');
    leer_descripcion_servicio = $('#slt_servicios  option:selected').attr('descripcion_servicio');
    leer_id_cargo = $('#slt_servicios  option:selected').attr('idcargo');
    leer_cargo = $('#slt_servicios  option:selected').attr('cargo');
    lc_condicion_profesion = $('#slt_servicios  option:selected').attr('condicion_profesion');
    leer_descripcion_profesion = $('#slt_servicios  option:selected').attr('descripcion_profesion');

    leer_grupo_ocupacional = $('#slt_servicios  option:selected').attr('grupo_ocupacional');
    leer_tipo_empleado = $('#slt_servicios  option:selected').attr('tipo_empleado');
    leer_descripcion_tipo_empleado = $('#slt_servicios  option:selected').attr('descripcion_tipo_empleado');

    leer_id_subcosto_upss = $('#slt_servicios  option:selected').attr('id_subcosto_upss');
    leer_descripcion_centro_costo = $('#slt_servicios  option:selected').attr('descripcion_centro_costo');
    leer_descripcion_centro_sub_costo = $('#slt_servicios  option:selected').attr('descripcion_centro_subcosto');
    leer_descripcion_centro_tras_costo = $('#slt_servicios  option:selected').attr('descripcion_sub_trascosto');
    leer_unidad_organica = $('#slt_servicios  option:selected').attr('unidad_organica');
    leer_organo = $('#slt_servicios  option:selected').attr('organo');
    leer_idupss = $('#slt_servicios  option:selected').attr('idupss');
    leer_idupss_registrado = leer_idupss;
    leer_descripcion_upss = $('#slt_servicios  option:selected').attr('descripcion_upss');


    leer_idespecialidad = $('#slt_servicios  option:selected').attr('idespecialidad');
    leer_nombre_especialidad = $('#slt_servicios  option:selected').attr('nombre_especialidad');
    leer_colegio = $('#slt_servicios  option:selected').attr('colegio');
    leer_rne = $('#slt_servicios  option:selected').attr('rne');
    leer_observacion = $('#slt_servicios  option:selected').attr('observacion');
    leer_idmotivo_cese = $('#slt_servicios  option:selected').attr('cese_idmotivo');
    leer_cese_motivo = $('#slt_servicios  option:selected').attr('cese_motivo');
    leer_cese_fecha = $('#slt_servicios  option:selected').attr('cese_fecha');
    leer_cese_monto = $('#slt_servicios  option:selected').attr('cese_monto');
    leer_cese_observacion = $('#slt_servicios  option:selected').attr('cese_observacion');
    leer_mostrar_fecha_cese = $('#slt_servicios  option:selected').attr('mostrar_fecha_de_cese');





    $("#fecha_inicio_servicio").val(leer_fecha_ingreso_servicio);
    switch (leer_tiempo_duracion) {
        case '1':
            $("#intervalo_meses_0")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 1;
            break;
        case '2':
            $("#intervalo_meses_1")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 1;
            break;
        case '3':
            $("#intervalo_meses_2")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 1;
            break;

        case '4':
            $("#intervalo_meses_3")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 2;
            break;

        case '5':
            $("#intervalo_meses_4")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 9;
            break;

        case '6':
            $("#intervalo_meses_5")
                .attr("disabled", true)
                .prop("checked", true);
            ln_mes_servicio = 3;
            break;

        default:
            break;
    }
    $("#fecha_fin_servicio").val(leer_fecha_fin_servicio);
    $("#fecha_fin_servicio_cese").val(leer_fecha_fin_servicio);


    $("#txt_nro_expediente").val(leer_nro_expediente);
    $("#txt_nota_informativa").val(leer_nota_informativa);
    $("#txt_nro_pedido").val(leer_nro_pedido);
    $("#txt_meta_actual_area_usuaria").val(leer_nro_pedido);
    $("#txt_meta_actual_certificada").val(leer_meta_actual_certificada);
    $("#descripcion_financiamiento").text(leer_descripcion_fuente_financiamiento);
    $("#txt_meta_anterior_certificada").val(leer_meta_anterior_certificada);
    $("#txt_fuente_anterior_financiamiento").val(leer_fuente_anterior_certificada);
    $("#txt_pao").val(leer_pao);
    $("#txt_ccp").val(leer_ccp);
    $("#txt_monto_total").val(leer_monto_total);
    $("#txt_monto_total_cese").val(leer_monto_total);
    $("#txt_monto_mes1").val(leer_mes1);
    $("#txt_monto_mes2").val(leer_mes2);
    $("#txt_monto_mes3").val(leer_mes3);
    $("#txt_descripcion_servicio").val(leer_descripcion_servicio);
    $("#grupo_ocupacional").val('PROFESION : ' + leer_cargo + ' - ' + leer_descripcion_profesion);




    switch (lc_condicion_profesion) {
        case 'E':
            $("#condicion_0")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'G':
            $("#condicion_1")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'C':
            $("#condicion_2")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'I':
            $("#condicion_3")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'B':
            $("#condicion_4")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'T':
            $("#condicion_5")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'M':
            $("#condicion_6")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'D':
            $("#condicion_7")
                .attr("disabled", true)
                .prop("checked", true);
            break;

        case 'O':
            $("#condicion_8")
                .attr("disabled", true)
                .prop("checked", true);
            break;




        default:
            break;
    }

    $("#descripcion_tipo_empleado").text(leer_descripcion_tipo_empleado);



    lc_agregar_trascosto = (leer_descripcion_centro_tras_costo === '') ? '' : ' -- TRAS COSTO : ' + leer_descripcion_centro_tras_costo;

    $("#txt_centro_costo").val(leer_descripcion_centro_costo);
    $("#txt_centro_sub_costo").val(leer_descripcion_centro_sub_costo);
    $("#txt_unidad_organica").val(leer_unidad_organica);
    $("#txt_organica").val(leer_organo);




    /*
      <span class="form-control bg-default">Unidad Organica: </span>
                                <textarea name="txt_unidad_organica" class="form-control" rows="1" disabled="disabled" id="txt_unidad_organica"></textarea> 

                                <span class="form-control bg-default">Organica: </span>
                                <textarea name="txt_organica" class="form-control" rows="1" disabled="disabled" id="txt_organica"></textarea> 
    */







    /*
    
    
    leer_id_subcosto_upss = $('#slt_servicios  option:selected').attr('id_subcosto_upss');
    leer_descripcion_centro_costo = $('#slt_servicios  option:selected').attr('descripcion_centro_costo');
    leer_descripcion_centro_sub_costo = $('#slt_servicios  option:selected').attr('descripcion_centro_subcosto');
    leer_descripcion_centro_tras_costo = $('#slt_servicios  option:selected').attr('descripcion_sub_trascosto');
    leer_unidad_organica = $('#slt_servicios  option:selected').attr('unidad_organica');
    leer_organo = $('#slt_servicios  option:selected').attr('organo');
    
    
    
    */



    $("#txt_upss").val('UPSS : ' + leer_descripcion_upss);








    /*
    lc_agregar_trascosto = (leer_descripcion_centro_tras_costo === '') ? '' : ' -- TRAS COSTO : ' + leer_descripcion_centro_tras_costo;
    
    $("#txt_centro_costo").val('CENTRO DE COSTO : ' + leer_descripcion_centro_costo + ' --  SUB COSTO : ' + leer_descripcion_centro_sub_costo + lc_agregar_trascosto + ' -- UNIDAD ORGANICA : ' + leer_unidad_organica + ' -- ORGANO : ' + leer_organo);
    $("#txt_upss").val('UPSS : ' + leer_descripcion_upss);

    */

    /*
    
      lc_agregar_trascosto = (leer_descripcion_centro_tras_costo === '') ? leer_descripcion_centro_sub_costo :  leer_descripcion_centro_sub_costo  + ' - ' + leer_descripcion_centro_tras_costo;
        
        
        // $("#txt_centro_costo").val('CENTRO DE COSTO : ' + leer_descripcion_centro_costo + ' --  SUB COSTO : ' + leer_descripcion_centro_sub_costo + lc_agregar_trascosto + ' -- UNIDAD ORGANICA : ' + leer_unidad_organica + ' -- ORGANO : ' + leer_organo);
        
        $("#txt_centro_costo").val(leer_descripcion_centro_costo);
        $("#txt_centro_sub_costo").val(lc_agregar_trascosto);

    */




    $("#txt_descripcion_especialidad").val('ESPECIALIDAD : ' + leer_nombre_especialidad + ' -- COLEGIO :  ' + leer_colegio);




    $("#rne").val(leer_rne);
    $("#observacion_servicio").val(leer_observacion);
    $("#btn_modificar_servicio").attr("disabled", false);
    $("#btn_eliminar_servicio").attr("disabled", false);




    $("#fecha_cese_inicial").val(leer_mostrar_fecha_cese);
    $("#fecha_fin_servicio_cese").val(leer_fecha_fin_servicio);
    $("#txt_monto_total_cese").val(leer_cese_monto);
    $("#observacion_servicio_cese").val(leer_cese_observacion);

    $("#motivo_registrado").text(leer_cese_motivo);
    $("#motivo_registrado_con_cese").text(leer_cese_motivo);

    if (leer_idmotivo_cese === '20') {
        $("#motivo_registrado").removeClass("form-control alert-danger").addClass("form-control alert-info");
        $("#motivo_registrado_con_cese").removeClass("form-control alert-danger").addClass("form-control alert-info");

    } else {
        $("#motivo_registrado").removeClass("form-control alert-info").addClass("form-control alert-danger");
        $("#motivo_registrado_con_cese").removeClass("form-control alert-info").addClass("form-control alert-danger");
    }

    $("#btn_registrar_cese").attr("disabled", false);
    $("#btn_grabar_registro_cese").attr("disabled", true);


}

function listar_departamentos() {
    "use strict";
    dato_listar_depar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_depar,
        dataType: 'json',
        url: url + 'personal/listar_todos_los_departamentos',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slc_departamento")
                .html('')
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_departamento").append('<option id="' + filas.codigo_departamento + '"  nombre = "' + filas.nombre_departamento + '"  >' + filas.nombre_departamento + '</option>');
                    $("#slc_departamento").attr("disabled", true);

                } else {
                    $("#slc_departamento").attr("disabled", true);
                }
            });

        }
    });

}

function listar_todas_las_provincias_de_un_departamento(lc_id_departamento) {
    "use strict";
    dato_listar_provin = {
        "id": lc_id_departamento
    };
    $.ajax({
        data: dato_listar_provin,
        dataType: 'json',
        url: url + 'personal/listar_solo_las_provincias',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slc_provincia")
                .html('')
                .show()
                .append('<option id=0 > Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_provincia").append('<option id="' + filas.codigo_provincia + '"  nombre = "' + filas.nombre_provincia + '"  >' + filas.nombre_provincia + '</option>');
                    $("#slc_provincia").attr("disabled", false);
                } else {
                    $("#slc_provincia").attr("disabled", true);
                }
            });
        }
    });



}

function listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia) {
    "use strict";
    dato_listar_distrito = {
        "id_depar": lc_id_departamento,
        "id_provin": lc_id_provincia
    };

    $.ajax({
        data: dato_listar_distrito,
        dataType: 'json',
        url: url + 'personal/listar_solo_los_distritos',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slc_distrito")
                .html('')
                .show()
                .append('<option id=0 > Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_distrito").append('<option id="' + filas.codigo_distrito + '"  nombre = "' + filas.nombre_distrito + '"  >' + filas.nombre_distrito + '</option>');
                    $("#slc_distrito").attr("disabled", false);
                } else {
                    $("#slc_distrito").attr("disabled", true);
                }
            });
        }
    });

}

function listar_carreras_profesion() {
    "use strict";
    dato_listar_carrera = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_carrera,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_carrera")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_carrera").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slt_carrera").html('');
                }
            });
        }
    });

    $("#slt_carrera").select2({
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
    $("#slt_carrera").attr("disabled", true);
}

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
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_cargos")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
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

function listar_colegios_profesionales() {
    "use strict";
    dato_actualizar_colegios = {
        'colegio': ''
    };
    $.ajax({
        data: dato_actualizar_colegios,
        dataType: 'json',
        url: url + 'parametros/ver_lista_colegios_profesionales',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slc_colegios_profesionales")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_colegios_profesionales").append('<option value="' + filas.codigo + '"  codigo = "' + filas.codigo + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  >' + filas.codigo_minsa + '  -  ' + filas.descripcion + '</option>');
                } else {
                    $("#slc_colegios_profesionales").html('');
                }
            });
        }
    });

    $("#slc_colegios_profesionales").select2({
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
    $("#slc_colegios_profesionales").attr("disabled", true);

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
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_centro_costo")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
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



function listar_todos_upss() {
    "use strict";
    dato_listar_upss = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_upss,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_upss',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_upss")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_upss").append('<option id="' + filas.id + '" codigo_upss = "' + filas.codigo_upss + '" descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slt_upss")
                        .attr("disabled", true)
                        .empty();
                }
            });
        }

    });

    $("#slt_upss").select2({
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



function listar_tipos_especialidad() {
    "use strict";
    dato_listar_espe = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_espe,
        dataType: 'json',
        url: url + 'parametros/listar_tipos_especialidad',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slc_tipo_especialidad")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_especialidad").append('<option id="' + filas.id + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  codigo_colegio = "' + filas.codigo_colegio + '"  colegio= "' + filas.colegio + '"  >' + filas.descripcion + '</option>');
                    $("#slc_tipo_especialidad").attr("disabled", true);
                } else {
                    $("#slc_tipo_especialidad").attr("disabled", true);
                }
            });
        }
    });

    $("#slc_tipo_especialidad").select2({
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

function limpiar_todas_las_etiquetas_identificacion_personal() {
    "use strict";
    $("#nombre_estado")
        .text('')
        .removeClass("form-control alert-info alert-warning").addClass("form-control alert-success");
    $("#personal_tercero_seleccion")
        .text('');
    $("#msj_confirmacion_eliminar").html('');
    $("#nombre_pais_registrado").text('');
    $("#nombre_documento_registrado").text('');
    $("#txt_nro_documento").val('');
    $("#slt_sexo").append('option id="0">Seleccione :</option>');
    listar_departamentos();
    lc_id_departamento = '0';
    lc_id_provincia = '0';
    listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
    listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
    $("#sexo_registrado").text('');
    slt_contiene_sexo();
    listar_tabla_tipos_documentos();

    $("#txt_paterno").val('');
    $("#txt_materno").val('');
    $("#apellido_casada").val('');
    $("#txt_nombres").val('');
    $("#txt_nacimiento").val('');
    $("#txt_edad").val('');
    $("#ruc").val('');
    $("#nombre_departamento").val('');
    $("#nombre_provincia").val('');
    $("#nombre_distrito").val('');
    $("#txt_area_direccion").val('');
    $("#txt_area_direccion").val('');
    $("#txt_correo_electronico").val('');
    $("#txt_telefono_fijo").val('');
    $("#txt_telefono_celular").val('');
    $("#telefono_emergencia").val('');
    $("#observacion").val('');
    $("#btn_grabar_datos_personales").attr("disabled", true);
    $("#slt_pais").select2({
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



function valida_nro_documento_si_existe(leer_nro_documento) {
    "use strict";
    dato_consultar_si_existe = {
        "id": leer_nro_documento
    };

    $.ajax({
        data: dato_consultar_si_existe,
        dataType: 'json',
        url: url + 'personal/verificar_si_existe_nro_documento',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    lc_nombre_encontrado = filas.apellidos_nombres;
                    $("#ver_existe_documento").html('<center><font size="-1" color="#EF6000">Nro. REGISTRADO: ' + lc_nombre_encontrado + ' </font></center>');
                    $("#slt_sexo").attr("disabled", true);
                    $("#txt_paterno").attr("disabled", true);
                } else {
                    $("#ver_existe_documento").html('');
                    $("#ver_existe_documento").html('<center><font size="-1" color="#0041F1" >Nro. Conforme, continue registrando... </font></center>');
                    $("#slt_sexo")
                        .attr("disabled", false)
                        .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
                    $("#txt_paterno").attr("disabled", false);
                }
            });
        }
    });
}



function agregar_linea_de_personal_registrado(ln_id_documento) {
    "use strict";
    dato_consultar_registrado = {
        "id": ln_id_documento
    };

    $.ajax({
        data: dato_consultar_registrado,
        dataType: 'json',
        url: url + 'personal/ver_dato_personal_registrado',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    leer_id = filas.idtercero;
                    leer_apellidos_nombres = filas.apellidos_nombres;
                    leer_estado = filas.estado;
                    $('#personal_tercero_seleccion').html('<strong>' + leer_apellidos_nombres + '</strong>');
                    $('#personal_seleccion_servicio').html('<strong>' + leer_apellidos_nombres + '</strong>');
                    $('#personal_seleccion_carrera').html('<strong>' + leer_apellidos_nombres + '</strong>');
                    if (leer_estado === '1') {
                        $("#nombre_estado")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
                        $("#nombre_estado_servicio")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
                        $("#nombre_estado_carrera")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
                    } else {
                        $("#nombre_estado")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
                        $("#nombre_estado_servicio")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
                        $("#nombre_estado_carrera")
                            .text(leer_nombre_estado + ' - ID : ' + leer_id)
                            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
                    }

                } else {}

            });

        }
    });


}



function desabilitar_input_text_identificacion_personal() {
    "use strict";
    $("#slt_pais").attr("disabled", true);
    $("#msj_confirmacion_eliminar").html('');
    $("#slt_tipo_documento")
        .attr("disabled", true);
    $("#slt_sexo")
        .attr("disabled", true)
        .append('option id="0">Seleccione :</option>');
    $("#txt_nro_documento").attr("disabled", true);
    $("#txt_paterno").attr("disabled", true);
    $("#txt_materno").attr("disabled", true);
    $("#apellido_casada").attr("disabled", true);
    $("#txt_nombres").attr("disabled", true);
    $("#txt_nacimiento").attr("disabled", true);
    $("#slc_departamento").attr("disabled", true);
    $("#slc_provincia").attr("disabled", true);
    $("#slc_distrito").attr("disabled", true);
    $("#txt_area_direccion").attr("disabled", true);
    $("#txt_correo_electronico").attr("disabled", true);
    $("#txt_telefono_fijo").attr("disabled", true);
    $("#txt_telefono_celular").attr("disabled", true);
    $("#telefono_emergencia").attr("disabled", true);
    $("#observacion")
        .attr("disabled", true)
        .removeClass("color_borde_azul");
    $("#ruc")
        .attr("disabled", true)
        .removeClass("color_borde_azul");
    $("#btn_modificar_tercero").attr("disabled", true);
    $("#btn_eliminar_tercero").attr("disabled", true);
    $("#btn_habilitar_tercero").attr("disabled", true);
    $("#btn_grabar_datos_personales").attr("disabled", true);
    $("#ver_existe_documento").html('');
    $("#espera_proceso_datos_personales_terceros").empty();
    $("#btn_grabar_datos_personales").focus();



}

function grabar_registro_personal_tercero(lid_pais, ln_id_documento, leer_nro_documento, lc_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, lc_id_departamento, lc_id_provincia, lc_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion)

{
    "use strict";
    datos_grabar_tercero = {
        'idpais': lid_pais,
        'iddocumento': ln_id_documento,
        'nro_documento': leer_nro_documento,
        'lc_sexo': lc_sexo,
        'ruc': leer_ruc,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'apellido_casada': leer_apellido_casada,
        'nombres': leer_nombres,
        'nacimiento': leer_fecha_nacimiento,
        'iddepartamento': lc_id_departamento,
        'idprovincia': lc_id_provincia,
        'iddistrito': lc_id_distrito,
        'direccion': leer_direccion,
        'correo': leer_correo_electronico,
        'fijo': leer_telefono_fijo,
        'celular': leer_celular,
        'celular_emergencia': leer_celular_emergencia,
        'observacion': leer_observacion
    };

    $.ajax({
        data: datos_grabar_tercero,
        dataType: 'json',
        url: url + 'personal/grabar_registro_personal_tercero_total',
        type: 'post',
        beforeSend: function() {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_proceso_datos_personales_terceros").html('');
            desabilitar_input_text_identificacion_personal();
            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);
            agregar_linea_de_personal_registrado(ln_id_documento);


        },

        error: function(jqXHR, textStatus, errorThrown) {
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

function habilitar_todas_etiquetas_para_edicion_personal() {
    "use strict";
    $("#slt_pais").attr("disabled", false);
    $("#slt_tipo_documento").attr("disabled", false);
    $("#txt_nro_documento").attr("disabled", false);
    $("#slt_sexo").attr("disabled", false);
    $("#txt_paterno").attr("disabled", false);
    $("#txt_materno").attr("disabled", false);
    $("#apellido_casada").attr("disabled", false);
    $("#txt_nombres").attr("disabled", false);
    $("#txt_nacimiento").attr("disabled", false);
    $("#slc_departamento").attr("disabled", false);
    $("#slc_provincia").attr("disabled", false);
    $("#slc_distrito").attr("disabled", false);
    $("#txt_area_direccion").attr("disabled", false);
    $("#txt_correo_electronico").attr("disabled", false);
    $("#txt_telefono_fijo").attr("disabled", false);
    $("#txt_telefono_celular").attr("disabled", false);
    $("#telefono_emergencia").attr("disabled", false);
    $("#observacion").attr("disabled", false);
    $("#ruc").attr("disabled", false);
    $("#btn_grabar_datos_personales").attr("disabled", false);

}



function grabar_modificacion_registros_personal(lid_pais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_id_departamento, leer_id_provincia, leer_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion, leer_id) {
    "use strict";

    datos_grabar_modi_tercero = {
        'idpais': lid_pais,
        'iddocumento': leer_tipo_documento,
        'nro_documento': leer_nro_documento,
        'lc_sexo': leer_sexo,
        'ruc': leer_ruc,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'apellido_casada': leer_apellido_casada,
        'nombres': leer_nombres,
        'nacimiento': leer_fecha_nacimiento,
        'iddepartamento': leer_id_departamento,
        'idprovincia': leer_id_provincia,
        'iddistrito': leer_id_distrito,
        'direccion': leer_direccion,
        'correo': leer_correo_electronico,
        'fijo': leer_telefono_fijo,
        'celular': leer_celular,
        'celular_emergencia': leer_celular_emergencia,
        'observacion': leer_observacion,
        'id': leer_id
    };
    $.ajax({
        data: datos_grabar_modi_tercero,
        dataType: 'json',
        url: url + 'personal/grabar_modificacion_personal_tercero_total',
        type: 'post',
        beforeSend: function() {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_proceso_datos_personales_terceros").html('');
            desabilitar_input_text_identificacion_personal();
            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);

        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

            $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }

    });


}

function desactivar_personal_tercero(leer_id) {
    "use strict";
    datos_eliminar_tercero = {
        'id': leer_id
    };

    $.ajax({
        data: datos_eliminar_tercero,
        dataType: 'json',
        url: url + 'personal/dar_de_baja_personal_tercero',
        type: 'post',
        beforeSend: function() {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_proceso_datos_personales_terceros").html('');
            inicializar_botones_identificacion_personal();
            desabilitar_input_text_identificacion_personal();
            $("#msj_confirmacion_eliminar").html('<center><font color="#F40000" size = "2"> *** Personal Eliminado o dado de baja ***</font></center>');
            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);

            $("#nombre_estado")
                .text('PERSONAL TERCERO DE BAJA' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_servicio")
                .text('PERSONAL TERCERO DE BAJA' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
            $("#nombre_estado_carrera")
                .text('PERSONAL TERCERO DE BAJA' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");




        }
    });


}


function habilitar_personal_tercero(leer_id) {
    "use strict";
    datos_habilitar = {
        'id': leer_id
    };

    $.ajax({
        data: datos_habilitar,
        dataType: 'json',
        url: url + 'personal/personal_habilitado_tercero',
        type: 'post',
        beforeSend: function() {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_proceso_datos_personales_terceros").html('');
            inicializar_botones_identificacion_personal();
            desabilitar_input_text_identificacion_personal();
            $("#msj_confirmacion_eliminar").html('<center><font color="#0032F4" size = "2"> *** Personal Fue Habilitado o Activo ***</font></center>');
            $("#nombre_estado")
                .text('PERSONAL TERCERO ACTIVO' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_servicio")
                .text('PERSONAL TERCERO ACTIVO' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
            $("#nombre_estado_carrera")
                .text('PERSONAL TERCERO ACTIVO' + ' - ID : ' + leer_id)
                .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");

            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);

        }
    });

}


/***** INICIO de proceso para datos de servicios */
function inicializar_botones_de_datos_servicios() {
    "use strict";

    if (leer_estado === '1') {
        $("#btn_agregar_servicio").attr("disabled", false);
    } else {
        $("#btn_agregar_servicio").attr("disabled", true);
    }

    $("#btn_modificar_servicio").attr("disabled", true);
    $("#btn_eliminar_servicio").attr("disabled", true);
    $("#btn_registrar_cese").attr("disabled", true);
    $("#fecha_inicio_servicio")
        .attr("disabled", true)
        .val('');

    $("#intervalo_meses_0")
        .attr("disabled", true)
        .prop("checked", false);
    $("#intervalo_meses_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#intervalo_meses_2")
        .attr("disabled", true)
        .prop("checked", false);
    $("#intervalo_meses_3")
        .attr("disabled", true)
        .prop("checked", false);
    $("#intervalo_meses_4")
        .attr("disabled", true)
        .prop("checked", false);

    $("#intervalo_meses_5")
        .attr("disabled", true)
        .prop("checked", false);

    $("#fecha_fin_servicio")
        .attr("disabled", true)
        .val('');
    $("#txt_nro_expediente")
        .attr("disabled", true)
        .val('');
    $("#txt_nota_informativa")
        .attr("disabled", true)
        .val('');
    $("#txt_nro_pedido")
        .attr("disabled", true)
        .val('');
    $("#txt_meta_actual_area_usuaria")
        .attr("disabled", true)
        .val('');
    $("#txt_meta_actual_certificada")
        .attr("disabled", true)
        .val('');
    $("#txt_fuente_actual_financiamiento")
        .attr("disabled", true)
        .val('');
    $("#txt_meta_anterior_certificada")
        .attr("disabled", true)
        .val('');
    $("#descripcion_financiamiento")
        .text('Financiamiento');
    $("#descripcion_tipo_empleado")
        .text('');
    $("#txt_fuente_anterior_financiamiento")
        .attr("disabled", true)
        .val('');
    $("#txt_pao")
        .attr("disabled", true)
        .val('');
    $("#txt_ccp")
        .attr("disabled", true)
        .val('');
    $("#txt_monto_total")
        .attr("disabled", true)
        .val('');
    $("#txt_monto_mes1")
        .attr("disabled", true)
        .val('');
    $("#txt_monto_mes2")
        .attr("disabled", true)
        .val('');

    $("#txt_monto_mes3")
        .attr("disabled", true)
        .val('');


    $("#txt_descripcion_servicio")
        .attr("disabled", true)
        .val('');

    $("#txt_descripcion_upss")
        .attr("disabled", true)
        .val('');

    $("#txt_descripcion_especialidad")
        .attr("disabled", true)
        .val('');

    $("#slt_cargos")
        .attr("disabled", true);

    $("#slt_centro_costo")
        .attr("disabled", true);

    $("#slt_upss")
        .attr("disabled", true);

    $("#txt_centro_costo")
        .val('');

    $("#txt_upss")
        .val('');


    $("#grupo_ocupacional").val('');

    $("#slt_asistencial").attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", true);
    $("#slc_tipo_especialidad").attr("disabled", true);
    $("#rne")
        .attr("disabled", true)
        .val('');
    $("#observacion_servicio")
        .attr("disabled", true)
        .val('');
    $("#btn_grabar_servicio").attr("disabled", true);
    $("#motivo_registrado").text('');
    $("#motivo_registrado_con_cese").text('');
    $("#fecha_cese_inicial").val('');
    $("#fecha_fin_servicio_cese").val('');
    $("#txt_monto_total_cese").val(0);
    $("#observacion_servicio_cese").val('');
    $("#slt_cargos_profesion").attr("disabled", true);
    $("#condicion_0")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_1")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_2")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_3")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_4")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_5")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_6")
        .attr("disabled", true)
        .prop("ckecked", false);


    $("#condicion_7")
        .attr("disabled", true)
        .prop("ckecked", false);

    $("#condicion_8")
        .attr("disabled", true)
        .prop("ckecked", false);


    listar_carreras_profesion_laboral_tercero();
    listar_de_cargos();
    listar_carreras_profesion();
    listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
    listar_todos_upss();
    listar_tipos_especialidad();
    listar_fuentes_financiamiento();
}





function sumar_dias_a_fecha_inicial(ln_dias) {
    "use strict";
    ln_valor_tiempo_dias = ln_dias;
    lc_fecha_inicio_servicio = $('#fecha_inicio_servicio').val();
    fecha_inicio_separada = lc_fecha_inicio_servicio.split("/");
    fecha_fin_servicio = new Date(+fecha_inicio_separada[2], fecha_inicio_separada[1] - 1, +fecha_inicio_separada[0]);
    fecha_fin_servicio.setDate(fecha_fin_servicio.getDate() + ln_valor_tiempo_dias - 1);
    anio_fin = fecha_fin_servicio.getFullYear();
    mes_fin = fecha_fin_servicio.getMonth() + 1;
    dia_fin = fecha_fin_servicio.getDate();
    $('#fecha_fin_servicio')
        .attr("disabled", true)
        .val(PadLeft(dia_fin, 2) + '/' + PadLeft(mes_fin, 2) + '/' + anio_fin);
    $("#txt_nro_expediente")
        .attr("disabled", false)
        .removeClass("form-control ").addClass("form-control alert-warning  text-secondary initialism")
        .focus();
}

function sumar_mes_a_fecha_inicial(ln_mes) {
    "use strict";
    ln_valor_tiempo_mes = ln_mes;
    lc_fecha_inicio_servicio = $('#fecha_inicio_servicio').val();
    fecha_inicio_separada = lc_fecha_inicio_servicio.split("/");
    fecha_fin_servicio = new Date(+fecha_inicio_separada[2], fecha_inicio_separada[1] - 1, +fecha_inicio_separada[0]);
    fecha_fin_servicio.setMonth(fecha_fin_servicio.getMonth() + ln_valor_tiempo_mes);
    fecha_fin_servicio.setDate(fecha_fin_servicio.getDate() - 1);
    anio_fin = fecha_fin_servicio.getFullYear();
    mes_fin = fecha_fin_servicio.getMonth() + 1;
    dia_fin = fecha_fin_servicio.getDate();
    $('#fecha_fin_servicio')
        .attr("disabled", true)
        .val(PadLeft(dia_fin, 2) + '/' + PadLeft(mes_fin, 2) + '/' + anio_fin);
    $("#txt_nro_expediente")
        .attr("disabled", false)
        .removeClass("form-control ").addClass("form-control alert-warning  text-secondary initialism")
        .focus();
}


function PadLeft(value, length) {
    "use strict";
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

function listar_fuentes_financiamiento() {
    "use strict";
    dato_listar_finan = {
        "id": ''
    };
    $.ajax({
        data: dato_listar_finan,
        dataType: 'json',
        url: url + 'parametros/listarfuentes_financiamiento',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#txt_fuente_actual_financiamiento")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#txt_fuente_actual_financiamiento").append('<option id="' + filas.id + '" fuente = "' + filas.fuente_finaciamiento + '"  >' + filas.fuente_finaciamiento + '</option>');
                    $("#txt_fuente_actual_financiamiento").attr("disabled", true);
                } else {
                    $("#txt_fuente_actual_financiamiento").attr("disabled", true);
                }
            });
        }


    });

}


function calculo_monto_final_en_meses(ln_mes_servicio) {
    "use strict";
    ln_monto_servicio = $("#txt_monto_total").val();
    switch (ln_mes_servicio) {
        case 1:
            $("#txt_monto_mes1").val(ln_monto_servicio);
            $("#txt_monto_mes2").val(0);
            $("#txt_monto_mes3").val(0);
            break;
        case 2:
            var ln_monto = (ln_monto_servicio / 2);
            var ln_monto_2 = ln_monto.toFixed(2);
            $("#txt_monto_mes1").val(ln_monto_2);
            $("#txt_monto_mes2").val(ln_monto_2);
            $("#txt_monto_mes3").val(0);
            break;
        case 3:
            var ln_monto3 = (ln_monto_servicio / 3);
            var ln_monto_3 = ln_monto3.toFixed(2);
            $("#txt_monto_mes1").val(ln_monto_3);
            $("#txt_monto_mes2").val(ln_monto_3);
            $("#txt_monto_mes3").val(ln_monto_3);
            break;
        default:
            $("#txt_monto_mes1").val(ln_monto_servicio);
            $("#txt_monto_mes2").val(0);
            $("#txt_monto_mes3").val(0);
            break;
    }
    $("#txt_monto_mes1").attr("disabled", true);
    $("#txt_monto_mes2").attr("disabled", true);
    $("#txt_monto_mes3").attr("disabled", true);
}

function seleccion_fecha_final() {
    "use strict";
    $("#txt_monto_mes1").attr("disabled", false);
    $("#txt_monto_mes2").attr("disabled", false);
    $("#txt_monto_mes3").attr("disabled", false);
    ln_mes_servicio = 9;
    $('#fecha_fin_servicio')
        .attr("disabled", false)
        .datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            placeholder: "Fecha Fin Servicio"
        })
        .focus();

}

function ver_personal_y_mostrar_contratos(leer_id) {
    "use strict";
    datos_ver_contratos = {
        'id_personal_buscar': leer_id
    };
    $.ajax({
        data: datos_ver_contratos,
        dataType: 'json',
        url: url + 'personal/ver_contratos_personal_tercero_final',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function(datos) {
            $("#espera_grabacion_contratos").html('');
            $("#slt_servicios")
                .html('');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicios")
                        .show()
                        .append('<option id="' + filas.idservicio +
                            '"  fecha_inicio = "' + filas.fecha_inicio +
                            '"  tiempo_duracion = "' + filas.tiempo_duracion +
                            '"  fecha_fin = "' + filas.fecha_fin +
                            '"  nro_expediente = "' + filas.nro_expediente +
                            '"  nota_informativa = "' + filas.nota_informativa +
                            '"  nro_pedido = "' + filas.nro_pedido +
                            '"  meta_actual_usuaria = "' + filas.meta_actual_usuaria +
                            '"  meta_actual_certificada = "' + filas.meta_actual_certificada +
                            '"  id_fuente_actual_financiamiento = "' + filas.id_fuente_actual_financiamiento +
                            '"  descripcion_fuente_financiamiento = "' + filas.descripcion_fuente_financiamiento +
                            '"  meta_anterior_certificada = "' + filas.meta_anterior_certificada +
                            '"  fuente_anterior_certificada = "' + filas.fuente_anterior_certificada +
                            '"  pao = "' + filas.pao +
                            '"  ccp = "' + filas.ccp +
                            '"  monto_total = "' + filas.monto_total +
                            '"  mes1 = "' + filas.mes1 +
                            '"  mes2 = "' + filas.mes2 +
                            '"  mes3 = "' + filas.mes3 +
                            '"  descripcion_servicio = "' + filas.descripcion_servicio +
                            '"  idcargo = "' + filas.idcargo +
                            '"  condicion_profesion = "' + filas.condicion_profesion +
                            '"  descripcion_profesion = "' + filas.descripcion_profesion +
                            '"  cargo = "' + filas.cargo +
                            '"  grupo_ocupacional = "' + filas.grupo_ocupacional +
                            '"  tipo_empleado = "' + filas.tipo_empleado +
                            '"  descripcion_tipo_empleado = "' + filas.descripcion_tipo_empleado +
                            '"  id_subcosto_upss = "' + filas.id_subcosto_upss +
                            '"  descripcion_centro_costo = "' + filas.descripcion_centro_de_costo +
                            '"  descripcion_centro_subcosto = "' + filas.descripcion_centro_subcosto +
                            '"  descripcion_sub_trascosto = "' + filas.descripcion_sub_trascosto +
                            '"  unidad_organica = "' + filas.unidad_organica +
                            '"  organo = "' + filas.organo +
                            '"  idupss = "' + filas.idupss +
                            '"  descripcion_upss = "' + filas.descripcion_upss +
                            '"  idespecialidad = "' + filas.idespecialidad +
                            '"  nombre_especialidad = "' + filas.nombre_especialidad +
                            '"  colegio = "' + filas.colegio +
                            '"  rne = "' + filas.rne +
                            '"  observacion = "' + filas.observacion +
                            '"  cese_motivo = "' + filas.cese_motivo +
                            '"  cese_idmotivo = "' + filas.cese_idmotivo +
                            '"  cese_fecha = "' + filas.cese_fecha +
                            '"  cese_monto = "' + filas.cese_monto +
                            '"  cese_observacion = "' + filas.cese_observacion +
                            '"  mostrar_fecha_de_cese = "' + filas.mostrar_fecha_de_cese +
                            '">' + filas.fecha_inicio + '&nbsp;&nbsp;&nbsp;&#124;&nbsp;' + filas.fecha_fin + '&nbsp;&#124;&nbsp;&nbsp;' + '&nbsp;&nbsp;' + filas.nota_informativa + '</option>')
                        .attr("disabled", false);
                } else {
                    $("#slt_servicios").attr("disabled", true);
                }
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

            $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });



}



function leer_datos_registrados_terceros_servicios_y_grabar(leer_id) {
    "use strict";
    leer_fecha_ingreso_servicio = $('#fecha_inicio_servicio').val();
    leer_tiempo_duracion = lc_valor_tipo_duracion;
    leer_fecha_fin_servicio = $('#fecha_fin_servicio').val();
    leer_nro_expediente = $('#txt_nro_expediente').val();
    leer_nota_informativa = $('#txt_nota_informativa').val();
    leer_nro_pedido = $('#txt_nro_pedido').val();
    leer_meta_actual_usuaria = $('#txt_meta_actual_area_usuaria').val();
    leer_meta_actual_certificada = $('#txt_meta_actual_certificada').val();
    leer_id_fuente_actual_financiamiento = $('#txt_fuente_actual_financiamiento  option:selected').attr('id');
    leer_meta_anterior_certificada = $('#txt_meta_anterior_certificada').val();
    leer_fuente_anterior_certificada = $('#txt_fuente_anterior_financiamiento').val();
    leer_pao = $('#txt_pao').val();
    leer_ccp = $('#txt_ccp').val();
    leer_monto_total = $('#txt_monto_total').val();
    leer_mes1 = $("#txt_monto_mes1").val();
    leer_mes2 = $("#txt_monto_mes2").val();
    leer_mes3 = $("#txt_monto_mes3").val();
    leer_descripcion_servicio = $("#txt_descripcion_servicio").val();
    leer_id_cargo = ((typeof ln_id_cargo === 'undefined') ? leer_id_cargo : ln_id_cargo);
    leer_tipo_empleado = $('#slt_asistencial  option:selected').attr('lc_tipo_servicio');
    leer_id_subcosto_upss = ln_idccuo;
    leer_idupss_capturar = $('#slt_upss  option:selected').attr('id');
    leer_idupss = (typeof leer_idupss_capturar === 'undefined') ? '' : leer_idupss_capturar;
    leer_idespecialidad = (typeof ln_id_especialidad === 'undefined') ? '' : ln_id_especialidad;
    leer_rne = $('#rne').val();
    leer_observacion = $('#observacion_servicio').val();
    datos_grabar_servicios = {
        'idpersonal': leer_id,
        'fecha_ingreso': leer_fecha_ingreso_servicio,
        'duracion': leer_tiempo_duracion,
        'fin_servicio': leer_fecha_fin_servicio,
        'expediente': leer_nro_expediente,
        'nota_informativa': leer_nota_informativa,
        'nro_pedido': leer_nro_pedido,
        'meta_actual_usuaria': leer_meta_actual_usuaria,
        'meta_actual_certificada': leer_meta_actual_certificada,
        'id_fuente_actual_financiamiento': leer_id_fuente_actual_financiamiento,
        'meta_anterior': leer_meta_anterior_certificada,
        'fuente_anterior': leer_fuente_anterior_certificada,
        'pao': leer_pao,
        'ccp': leer_ccp,
        'monto_total': leer_monto_total,
        'mes1': leer_mes1,
        'mes2': leer_mes2,
        'mes3': leer_mes3,
        'descripcion_servicio': leer_descripcion_servicio,
        'idcargo': leer_id_cargo,
        'condicion_profesion': lc_condicion_profesion,
        'tipo_empleado': leer_tipo_empleado,
        'id_sub_costo': leer_id_subcosto_upss,
        'idupss': leer_idupss,
        'idespecialidad': leer_idespecialidad,
        'rne': leer_rne,
        'observacion': leer_observacion
    };
    $.ajax({
        data: datos_grabar_servicios,
        dataType: 'json',
        url: url + 'personal/grabar_datos_servicios_terceros',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_contratos").html('');
            $("#btn_grabar_servicio").attr("disabled", true);
            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

            $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}



function eliminar_contrato_de_servicio_de_terceros(leer_id_servicio) {
    "use strict";
    datos_eliminar_servicios = {
        'id': leer_id_servicio
    };
    $.ajax({
        data: datos_eliminar_servicios,
        dataType: 'json',
        url: url + 'personal/eliminar_datos_contratos_Servicio_terceros',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            actualizar_fechas_ultimo_contrato(leer_id_servicio, leer_id);
            $("#espera_grabacion_contratos").html('');
            $("#btn_eliminar_servicio").attr("disabled", true);
        }

    });
}



function actualizar_fechas_ultimo_contrato(leer_id_servicio, leer_id) {
    "use strict";
    datos_actualizar_fecha = {
        "id_servicio": leer_id_servicio,
        "id_personal": leer_id
    };
    $.ajax({
        data: datos_actualizar_fecha,
        dataType: 'json',
        url: url + 'personal/actualizar_fechas_ultimo',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_contratos").html('');
            $("#btn_eliminar_servicio").attr("disabled", true);
        }
    });
}





function habilitar_botones_datos_servicio() {
    "use strict";

    $("#fecha_inicio_servicio")
        .attr("disabled", false);
    $("#intervalo_meses_0")
        .attr("disabled", false);
    $("#intervalo_meses_1")
        .attr("disabled", false);
    $("#intervalo_meses_2")
        .attr("disabled", false);
    $("#intervalo_meses_3")
        .attr("disabled", false);
    $("#intervalo_meses_4")
        .attr("disabled", false);
    $("#intervalo_meses_5")
        .attr("disabled", false);
    $("#fecha_fin_servicio")
        .attr("disabled", false);
    $("#txt_nro_expediente")
        .attr("disabled", false);
    $("#txt_nota_informativa")
        .attr("disabled", false);
    $("#txt_nro_pedido")
        .attr("disabled", false);
    $("#txt_meta_actual_area_usuaria")
        .attr("disabled", false);
    $("#txt_meta_actual_certificada")
        .attr("disabled", false);
    $("#txt_fuente_actual_financiamiento")
        .attr("disabled", false);
    $("#txt_meta_anterior_certificada")
        .attr("disabled", false);
    $("#txt_fuente_anterior_financiamiento")
        .attr("disabled", false);
    $("#txt_pao")
        .attr("disabled", false);

    $("#txt_ccp")
        .attr("disabled", false);

    $("#txt_monto_total")
        .attr("disabled", false);

    $("#txt_monto_mes1")
        .attr("disabled", false);

    $("#txt_monto_mes2")
        .attr("disabled", false);

    $("#txt_descripcion_servicio")
        .attr("disabled", false);


    $("#txt_descripcion_especialidad")
        .attr("disabled", true);

    $("#slt_centro_costo")
        .attr("disabled", false);

    $("#slt_upss")
        .attr("disabled", false);




    $("#slt_cargos")
        .attr("disabled", false);

    $("#condicion_0").attr("disabled", false);
    $("#condicion_1").attr("disabled", false);
    $("#condicion_2").attr("disabled", false);
    $("#condicion_3").attr("disabled", false);
    $("#condicion_4").attr("disabled", false);
    $("#condicion_5").attr("disabled", false);
    $("#condicion_6").attr("disabled", false);
    $("#condicion_7").attr("disabled", false);
    $("#condicion_8").attr("disabled", false);


    $("#slt_asistencial").attr("disabled", false);

    $("#slc_tipo_especialidad").attr("disabled", false);
    $("#rne")
        .attr("disabled", false);

    $("#observacion_servicio")
        .attr("disabled", false);
    $("#btn_grabar_servicio").attr("disabled", false);

}


function leer_datos_modificar_y_grabarlo(leer_id_servicio) {

    "use strict";
    leer_fecha_ingreso_servicio = $('#fecha_inicio_servicio').val();
    leer_tiempo_duracion = (typeof lc_valor_tipo_duracion === 'undefined') ? leer_tiempo_duracion : lc_valor_tipo_duracion;
    leer_fecha_fin_servicio = $('#fecha_fin_servicio').val();
    leer_nro_expediente = $('#txt_nro_expediente').val();
    leer_nota_informativa = $('#txt_nota_informativa').val();
    leer_nro_pedido = $('#txt_nro_pedido').val();
    leer_meta_actual_usuaria = $('#txt_meta_actual_area_usuaria').val();
    leer_meta_actual_certificada = $('#txt_meta_actual_certificada').val();
    leer_id_fuente_actual_financiamiento = ($('#txt_fuente_actual_financiamiento  option:selected').attr('id') === '0') ? leer_id_fuente_actual_financiamiento : $('#txt_fuente_actual_financiamiento  option:selected').attr('id');
    leer_pao = $('#txt_pao').val();
    leer_ccp = $('#txt_ccp').val();
    leer_monto_total = $('#txt_monto_total').val();
    leer_mes1 = $("#txt_monto_mes1").val();
    leer_mes2 = $("#txt_monto_mes2").val();
    leer_mes3 = $("#txt_monto_mes3").val();

    leer_descripcion_servicio = $("#txt_descripcion_servicio").val();
    leer_id_cargo = (typeof ln_id_cargo === 'undefined') ? '' : ln_id_cargo;
    leer_tipo_empleado = $('#slt_asistencial  option:selected').attr('lc_tipo_servicio');
    leer_id_subcosto_upss = (typeof ln_idccuo === 'undefined') ? leer_id_subcosto_upss : ln_idccuo;

    leer_idupss = (typeof leer_idupss === 'undefined') ? leer_idupss_registrado : leer_idupss;

    leer_idespecialidad = (typeof ln_id_especialidad === 'undefined') ? '' : ln_id_especialidad;
    leer_rne = $('#rne').val();
    leer_observacion = $('#observacion_servicio').val();
    datos_grabar_servic = {
        'fecha_ingreso': leer_fecha_ingreso_servicio,
        'duracion': leer_tiempo_duracion,
        'fin_servicio': leer_fecha_fin_servicio,
        'expediente': leer_nro_expediente,
        'nota_informativa': leer_nota_informativa,
        'nro_pedido': leer_nro_pedido,
        'meta_actual_usuaria': leer_meta_actual_usuaria,
        'meta_actual_certificada': leer_meta_actual_certificada,
        'id_fuente_actual_financiamiento': leer_id_fuente_actual_financiamiento,
        'pao': leer_pao,
        'ccp': leer_ccp,
        'monto_total': leer_monto_total,
        'mes1': leer_mes1,
        'mes2': leer_mes2,
        'mes3': leer_mes3,
        'descripcion_servicio': leer_descripcion_servicio,
        'idcargo': leer_id_cargo,
        'condicion_profesion': lc_condicion_profesion,
        'tipo_empleado': leer_tipo_empleado,
        'id_sub_costo': leer_id_subcosto_upss,
        'idupss': leer_idupss,
        'idespecialidad': leer_idespecialidad,
        'rne': leer_rne,
        'observacion': leer_observacion,
        'id': leer_id_servicio
    };
    $.ajax({
        data: datos_grabar_servic,
        dataType: 'json',
        url: url + 'personal/grabar_datos_modificar_terceros',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_contratos").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_contratos").html('');
            $("#btn_grabar_servicio").attr("disabled", true);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

            $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}



/***  inicio de CARRERA PROFESIONAL Y COLEGIO */
function inicializar_botones_etiquetas_carrera_profesional_habilidad() {
    "use strict";
    $("#slt_carrera_profesional").attr("disabled", true);
    $("#slt_carrera").attr("disabled", true);
    $("#slc_colegios_profesionales").attr("disabled", true);
    $("#descripcion_carrera_colegio").html('');
    $("#nro_colegiatura")
        .attr("disabled", true)
        .val('');
    $("#btn_agregar_carrera").attr("disabled", true);
    $("#btn_modificar_carrera").attr("disabled", true);
    $("#btn_eliminar_carrera").attr("disabled", true);
    $("#btn_grabar_carrera").attr("disabled", true);
    $("#slt_habilidad_profesional").attr("disabled", true);
    $("#btn_agregar_habilidad").attr("disabled", true);


    $("#btn_eliminar_habilidad").attr("disabled", true);
    $("#fecha_inicio_habilitacion").attr("disabled", true);
    $("#fecha_fin_habilitacion").attr("disabled", true);
    $("#nro_de_habilitacion").attr("disabled", true);
    $("#btn_grabar_habilidad").attr("disabled", true);
}

function ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id) {
    "use strict";
    dato_listar_carrera_tecnico = {
        "id": leer_id
    };
    $.ajax({
        data: dato_listar_carrera_tecnico,
        dataType: 'json',
        url: url + 'personal/personal_terceros_mostrar_carreras',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_carrera_profesional")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_carrera_profesional").append('<option id="' + filas.idcarrera +
                        '"  idpersonal = "' + filas.idpersonal +
                        '"  idprofesion = "' + filas.idprofesion +
                        '"  carrera = "' + filas.carrera +
                        '"  idcolegio = "' + filas.idcolegio +
                        '"  colegio = "' + filas.colegio +
                        '"  nro_colegio = "' + filas.nro_colegio + '"  >' + filas.carrera + ' -- ' + filas.colegio + '</option>');
                    $("#slt_carrera_profesional").attr("disabled", false);
                } else {
                    $("#slt_carrera_profesional").html('');
                    $("#slt_carrera_profesional").attr("disabled", true);
                }
            });
        }
    });
}




function leer_carrera_profesional_mostrarlo_en_etiquetas_de_pestania_carrera() {
    "use strict";
    ln_idenficador_carrera = $('#slt_carrera_profesional  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof ln_idenficador_carrera === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        ln_id_carrera = $('#slt_carrera_profesional  option:selected').attr('idprofesion');
        lc_descripcion_carrera = $('#slt_carrera_profesional  option:selected').attr('carrera');
        ln_codigo_colegio = $('#slt_carrera_profesional  option:selected').attr('idcolegio');
        lc_descripcion_colegio = $('#slt_carrera_profesional  option:selected').attr('colegio');
        lc_nro_colegio = $('#slt_carrera_profesional  option:selected').attr('nro_colegio');
        $("#descripcion_carrera_colegio").html('&#9679; CARRERA  : ' + lc_descripcion_carrera + '\n&#9679; COLEGIO PROFESIONAL : ' + lc_descripcion_colegio + '\n&#9679; Nro. COLEGIATURA : ' + lc_nro_colegio);
        $("#nro_colegiatura").val(lc_nro_colegio);
        $("#btn_agregar_carrera").attr("disabled", false);
        $("#btn_modificar_carrera").attr("disabled", false);
        $("#btn_eliminar_carrera").attr("disabled", false);
        ver_habilidades_por_carrera(ln_idenficador_carrera);
        $("#btn_agregar_habilidad").attr("disabled", false);
    } else {

        $("#descripcion_carrera_colegio").html('');
        $("#nro_colegiatura").val('');
        $("#btn_agregar_carrera").attr("disabled", false);
        $("#btn_modificar_carrera").attr("disabled", true);
        $("#btn_eliminar_carrera").attr("disabled", true);
        $("#btn_agregar_habilidad").attr("disabled", true);
    }
    $("#slt_carrera").attr("disabled", true);
    $("#slc_colegios_profesionales").attr("disabled", true);
    $("#nro_colegiatura").attr("disabled", true);


}


function grabar_carrera_del_personal_tercero(lc_nro_colegio) {
    "use strict";
    datos_grabar_carrera_tercero = {
        'idpersonal': leer_id,
        'idprofesion': ln_id_carrera,
        'idcolegio': ln_codigo_colegio,
        'nro_colegio': lc_nro_colegio
    };

    $.ajax({
        data: datos_grabar_carrera_tercero,
        dataType: 'json',
        url: url + 'personal/personal_tercero_grabar_carrera',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id);
            inicializar_botones_etiquetas_carrera_profesional_habilidad();
            $("#btn_agregar_carrera").attr("disabled", false);
        }
    });

}


function grabar_modificacion_carrera_personal_tercero(ln_idenficador_carrera, lc_nro_colegio) {
    "use strict";
    datos_grabar_per_ter = {
        'id': ln_idenficador_carrera,
        'idprofesion': ln_id_carrera,
        'idcolegio': ln_codigo_colegio,
        'nro_colegio': lc_nro_colegio
    };

    $.ajax({
        data: datos_grabar_per_ter,
        dataType: 'json',
        url: url + 'personal/personal_tercero_modificacion_carrera',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id);
            inicializar_botones_etiquetas_carrera_profesional_habilidad();
        }
    });

}


function eliminar_carrera_profesional_de_personal_tercero(ln_idenficador_carrera) {

    "use strict";
    datos_eliminar_car = {
        'id': ln_idenficador_carrera,
    };

    $.ajax({
        data: datos_eliminar_car,
        dataType: 'json',
        url: url + 'personal/personal_tercero_eliminar_carrera',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_personal_y_mostrar_carreras_tecnicas_profesionales(leer_id);
            inicializar_botones_etiquetas_carrera_profesional_habilidad();
            $("#slt_habilidad_profesional").html('');
        }
    });
}



/** inicio de proceso de Habilidad */
function ver_habilidades_por_carrera(ln_idenficador_carrera)

{
    "use strict";
    datos_buscar_habilidades_carrera = {
        'id': ln_idenficador_carrera,
    };
    $.ajax({
        data: datos_buscar_habilidades_carrera,
        dataType: 'json',
        url: url + 'personal/personal_tercero_ver_habilidades_de_carrera',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function(datos) {
            $("#espera_grabacion_carrera_habilidad").html('');
            $("#slt_habilidad_profesional")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_habilidad_profesional").append('<option id="' + filas.idhabilidad +
                        '"  idcarrera = "' + filas.idcarrera +
                        '"  inicio = "' + filas.fecha_inicio +
                        '"  fin = "' + filas.fecha_fin +
                        '"  nro_habilidad = "' + filas.nro_habilidad +
                        '"  >' + filas.fecha_inicio + ' | ' + filas.fecha_fin + ' |  ' + filas.nro_habilidad + '</option>');
                    $("#slt_habilidad_profesional").attr("disabled", false);

                } else {
                    $("#slt_habilidad_profesional")
                        .html('')
                        .attr("disabled", true);
                }
            });
        }
    });
}


function inicializar_botones_habilidad_profesional() {
    "use strict";
    $("#slt_habilidad_profesional")
        .html('')
        .attr("disabled", true);
    $("#btn_agregar_habilidad").attr("disabled", true);
    $("#btn_eliminar_habilidad").attr("disabled", true);

    $("#fecha_inicio_habilitacion")
        .attr("disabled", true)
        .val('');
    $("#fecha_fin_habilitacion")
        .attr("disabled", true)
        .val('');
    $("#nro_de_habilitacion")
        .attr("disabled", true)
        .val('');
    $("#btn_grabar_habilidad").attr("disabled", true);

}


function leer_habilidad_profesional_y_mostrarlo() {
    "use strict";
    ln_idenficador_habilidad = $('#slt_habilidad_profesional  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof ln_idenficador_habilidad === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        lc_fecha_inicio = $('#slt_habilidad_profesional  option:selected').attr('inicio');
        lc_fecha_fin = $('#slt_habilidad_profesional  option:selected').attr('fin');
        lc_nro_habilidad = $('#slt_habilidad_profesional  option:selected').attr('nro_habilidad');
        $("#fecha_inicio_habilitacion").val(lc_fecha_inicio);
        $("#fecha_fin_habilitacion").val(lc_fecha_fin);
        $("#nro_de_habilitacion").val(lc_nro_habilidad);
        $("#btn_agregar_habilidad").attr("disabled", false);
        $("#btn_eliminar_habilidad").attr("disabled", false);
        $("#btn_grabar_habilidad").attr("disabled", true);

    } else {
        $("#fecha_inicio_habilitacion").val('');
        $("#fecha_fin_habilitacion").val('');
        $("#nro_de_habilitacion").val('');
        $("#btn_agregar_habilidad").attr("disabled", true);
        $("#btn_eliminar_habilidad").attr("disabled", true);
        $("#btn_grabar_habilidad").attr("disabled", true);
    }

}

function grabar_habilidad_de_carrera_personal_tercero(ln_idenficador_carrera, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad) {
    "use strict";
    datos_grabar_habilidad_por_carrera = {
        'idcarrera': ln_idenficador_carrera,
        'inicio': lc_fecha_inicio,
        'fin': lc_fecha_fin,
        'nro': lc_nro_habilidad
    };
    $.ajax({
        data: datos_grabar_habilidad_por_carrera,
        dataType: 'json',
        url: url + 'personal/personal_tercero_grabar_carrera_habilidad',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            $("#msj_grabacion_habilidad").html('');
            ver_habilidades_por_carrera(ln_idenficador_carrera);
            $("#fecha_inicio_habilitacion").val('');
            $("#fecha_fin_habilitacion").val('');
            $("#nro_de_habilitacion")
                .attr("disabled", true)
                .val('');
            $("#btn_agregar_habilidad").attr("disabled", false);
            $("#btn_eliminar_habilidad").attr("disabled", true);
            $("#btn_grabar_habilidad").attr("disabled", true);


        }
    });

}


function grabar_modificacion_habilidad_por_carrera_profesional(ln_idenficador_habilidad, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad) {
    "use strict";
    datos_grabar_mod_habi = {
        'id': ln_idenficador_habilidad,
        'inicio': lc_fecha_inicio,
        'fin': lc_fecha_fin,
        'nro': lc_nro_habilidad
    };
    $.ajax({
        data: datos_grabar_mod_habi,
        dataType: 'json',
        url: url + 'personal/personal_tercero_modificar_carrera_habilidad',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_habilidades_por_carrera(ln_idenficador_carrera);
            $("#fecha_inicio_habilitacion").val('');
            $("#fecha_fin_habilitacion").val('');
            $("#nro_de_habilitacion")
                .attr("disabled", true)
                .val('');
            $("#btn_agregar_habilidad").attr("disabled", false);

            $("#btn_eliminar_habilidad").attr("disabled", true);
            $("#btn_grabar_habilidad").attr("disabled", true);
        }
    });
}

function eliminar_habilidad_personal_tercero(ln_idenficador_habilidad) {
    "use strict";
    datos_eliminar_habil_tercero = {
        'id': ln_idenficador_habilidad
    };

    $.ajax({
        data: datos_eliminar_habil_tercero,
        dataType: 'json',
        url: url + 'personal/personal_tercero_eliminar_habilidad',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_habilidades_por_carrera(ln_idenficador_carrera);
            $("#fecha_inicio_habilitacion").val('');
            $("#fecha_fin_habilitacion").val('');
            $("#nro_de_habilitacion")
                .attr("disabled", true)
                .val('');
            $("#btn_agregar_habilidad").attr("disabled", false);

            $("#btn_eliminar_habilidad").attr("disabled", true);
            $("#btn_grabar_habilidad").attr("disabled", true);


        }
    });

}



function convertir_fecha_caracter_a_date(leer_fecha) {
    "use strict";
    separar_fechas = leer_fecha.split("/");
    fecha_conforme = new Date(+separar_fechas[2], separar_fechas[1] - 1, +separar_fechas[0]);
    return fecha_conforme;
}


function valida_fechas_de_inicio_servicio() {
    "use strict";
    fecha_seleccion = $('#fecha_inicio_servicio').val();
    ver_fecha_contrato = convertir_fecha_caracter_a_date(lc_fecha_ultima);
    ver_fecha_seleccion = convertir_fecha_caracter_a_date(fecha_seleccion);
    if (ver_fecha_seleccion <= ver_fecha_contrato) {
        $("#msj_fecha_contrato")
            .show()
            .css("background-color", "#F5F7D8")
            .val("Fecha que selecciono: (" + fecha_seleccion + ") debe ser mayor que la fecha del ultimo contrato: (" + leer_fecha_ultimo_contrato + ")");
        $('#fecha_fin_servicio').val('');
        $("#intervalo_meses_0")
            .attr("disabled", true)
            .prop("checked", false);

        $("#intervalo_meses_1")
            .attr("disabled", true)
            .prop("checked", false);

        $("#intervalo_meses_2")
            .attr("disabled", true)
            .prop("checked", false);

        $("#intervalo_meses_3")
            .attr("disabled", true)
            .prop("checked", false);

        $("#intervalo_meses_4")
            .attr("disabled", true)
            .prop("checked", false);

        $("#intervalo_meses_5")
            .attr("disabled", true)
            .prop("checked", false);



    } else {
        $("#msj_fecha_contrato")
            .empty()
            .hide();
        $('#fecha_fin_servicio').val('');
        $("#intervalo_meses_0")
            .attr("disabled", false)
            .prop("checked", false);

        $("#intervalo_meses_1")
            .attr("disabled", false)
            .prop("checked", false);

        $("#intervalo_meses_2")
            .attr("disabled", false)
            .prop("checked", false);

        $("#intervalo_meses_3")
            .attr("disabled", false)
            .prop("checked", false);

        $("#intervalo_meses_4")
            .attr("disabled", false)
            .prop("checked", false);

        $("#intervalo_meses_5")
            .attr("disabled", false)
            .prop("checked", false);

    }
}



function validar_ruc(leer_ruc) {
    "use strict";

    datos_buscar_ruc = {
        "id": leer_ruc
    };

    $.ajax({
        data: datos_buscar_ruc,
        dataType: 'json',
        url: url + 'personal/verificar_si_existe_ruc',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    lc_nombre_encontrado = filas.apellidos_nombres;
                    $("#msj_ruc").html('<center><font size="-1" color="#EF6000">RUC Registrado a: ' + lc_nombre_encontrado + ' </font></center>');
                    $("#slt_sexo").attr("disabled", true);
                    $("#txt_paterno").attr("disabled", true);
                    $("#slt_tipo_documento").attr("disabled", true);
                    $("#txt_nro_documento").attr("disabled", true);


                } else {
                    $("#msj_ruc").html('');
                    $("#msj_ruc").html('<center><font size="-1" color="#0041F1">RUC Conforme, Continue Registrando... </font></center>');
                    $("#slt_sexo")
                        .attr("disabled", false)
                        .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
                    $("#txt_paterno").attr("disabled", false);
                    $("#slt_tipo_documento").attr("disabled", false);
                    $("#txt_nro_documento").attr("disabled", false);
                    leer_nro_ruc = leer_ruc.substring(2, 10);
                    $("#txt_nro_documento")
                        .val(leer_nro_ruc)
                        .attr("disabled", false);
                    $("#nombre_documento_registrado").text('DNI');


                }
            });
        }
    });
}


function verificar_carrera_por_personal(leer_id, ln_id_carrera) {
    "use strict";
    datos_buscar_carrera_perso = {
        "idpersonal": leer_id,
        "idcarrera": ln_id_carrera
    };
    $.ajax({
        data: datos_buscar_carrera_perso,
        dataType: 'json',
        url: url + 'personal/verificar_carrera',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slc_colegios_profesionales").attr("disabled", true);
                    $("#nro_colegiatura").attr("disabled", true);
                    $("#btn_grabar_carrera").attr("disabled", true);
                    $("#descripcion_carrera_colegio").html(' *** CARRERA SELECCIONADA, YA EXISTE *** ');
                } else {
                    $("#slc_colegios_profesionales")
                        .attr("disabled", false)
                        .focus();
                    $("#descripcion_carrera_colegio").html('');
                    $("#msj_habilidad").html('');
                }
            });
        }
    });
}



function verificar_fecha_habilidad(ln_idenficador_carrera, lc_fecha_ver) {
    "use strict";
    datos_buscar_fecha_habil = {
        'idcarrera': ln_idenficador_carrera,
        'fecha_inicio': lc_fecha_ver
    };
    $.ajax({
        data: datos_buscar_fecha_habil,
        dataType: 'json',
        url: url + 'personal/verificar_fecha_habilidad_si_existe',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#msj_habilidad").html(' *** FECHA INICIO HABILIDAD YA EXISTE *** ');
                    $('#nro_de_habilitacion').attr("disabled", true);
                } else {
                    $("#msj_habilidad").html('');
                    $('#fecha_fin_habilitacion')
                        .attr("disabled", false)
                        .focus();
                }
            });
        }
    });

}


function verificar_fecha_habilidad_fin(ln_idenficador_carrera, lc_fecha_ver) {

    "use strict";
    datos_buscar_habilidad_fin = {
        'idcarrera': ln_idenficador_carrera,
        'fecha_inicio': lc_fecha_ver
    };
    $.ajax({
        data: datos_buscar_habilidad_fin,
        dataType: 'json',
        url: url + 'personal/verificar_fecha_habilidad_si_existe',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#msj_habilidad").html(' *** FECHA FIN DE HABILIDAD YA EXISTE *** ');
                    $('#nro_de_habilitacion').attr("disabled", true);
                } else {
                    $("#msj_habilidad").html('');
                    $('#nro_de_habilitacion')
                        .attr("disabled", false)
                        .focus();

                }
            });
        }
    });
}


function obtener_fecha_ultimo_contrato(leer_id) {
    "use strict";
    datos_fecha = {
        'idperso': leer_id
    };
    $.ajax({
        data: datos_fecha,
        dataType: 'json',
        url: url + 'personal/ver_fecha_ultimo_contrato_de_servicio',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            datos.forEach(function(elemento) {
                lc_fecha_ultima = elemento.fecha_ultima;
            });
        }
    });
    return lc_fecha_ultima;
}

function grabar_registro_cese_tercero(leer_id_servicio, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese) {
    "use strict";
    datos_registrar_cese = {
        'id_servicio': leer_id_servicio,
        'id_motivo': lc_id_motivo_cese,
        'fecha_cese': lc_fecha_cese,
        'monto_cese': ln_monto_final_cese,
        'observacion_cese': lc_observacion_cese
    };

    $.ajax({
        data: datos_registrar_cese,
        dataType: 'json',
        url: url + 'personal/registrar_cese_en_tercero',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            ver_personal_y_mostrar_contratos(leer_id);
            $('#fecha_fin_servicio_cese').attr("disabled", true);
            $('#txt_monto_total_cese').attr("disabled", true);
            $('#observacion_servicio_cese').attr("disabled", true);
            $('#btn_grabar_registro_cese').attr("disabled", true);
            if (leer_id_servicio === '20') {
                $("#motivo_registrado").removeClass("form-control alert-danger").addClass("form-control alert-info");
                $("#motivo_registrado_con_cese").removeClass("form-control alert-danger").addClass("form-control alert-info");
            } else {
                $("#motivo_registrado").removeClass("form-control alert-info").addClass("form-control alert-danger");
                $("#motivo_registrado_con_cese").removeClass("form-control alert-info").addClass("form-control alert-danger");
            }

        }
    });

}



function listar_carreras_profesion() {
    "use strict";
    dato_listar_carrera = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_carrera,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_carrera")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_carrera").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_carrera").attr("disabled", false);
                } else {
                    $("#slt_carrera").attr("disabled", true);
                }
            });
        }
    });

    $("#slt_carrera").select2({
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




function listar_carreras_profesion_laboral_tercero() {
    "use strict";
    dato_listar_carrera = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_carrera,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion_unido',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_cargos_profesion")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.verificar === '1') {
                    $("#slt_cargos_profesion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_cargos_profesion").attr("disabled", false);
                } else {
                    $("#slt_cargos_profesion").attr("disabled", true);
                }
            });
        }
    });

    $("#slt_cargos_profesion").select2({
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





$(document).ready(function() {
    "use strict";
    $('.crear-tooltip').tooltip();
    lc_buscar_nombre_nuevo = '';
    listar_personal_tercero_total(lc_buscar_nombre_nuevo);
    inicializar_botones_identificacion_personal();
    listar_departamentos();
    lc_id_departamento = '0';
    lc_id_provincia = '0';
    slt_contiene_sexo();
    listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
    listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
    listar_carreras_profesion();
    listar_de_cargos();
    listar_colegios_profesionales();
    listar_centro_de_costo_sub_costo_unidad_organica_de_organo();
    listar_todos_upss();
    listar_tipos_especialidad();
    slt_contiene_sexo();
    listar_tabla_tipos_documentos();
    listar_carreras_profesion_laboral_tercero();

    $("#msj_fecha_contrato").hide();

    $("#slt_pais").select2({
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


    $("#txt_buscar_nombre_tercero")
        .focus()
        .keyup(function() {
            lc_buscar_nombre_nuevo = $("#txt_buscar_nombre_tercero").val();
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);
        });


    $("#slt_seleccionar_personal_terceros")
        .click(function() {
            leer_personal_tercero_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_personal_tercero_mostrarlo_en_etiquetas();
        })
        .keydown(function() {
            leer_personal_tercero__de_baja_mostrarlo_en_etiquetas();
        });


    $("#listar_personal_de_baja")
        .click(function() {
            leer_personal_tercero__de_baja_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_personal_tercero__de_baja_mostrarlo_en_etiquetas();
        })

    .keydown(function() {
        leer_personal_tercero__de_baja_mostrarlo_en_etiquetas();
    });




    $("#btn_agregar_tercero").click(function() {
        lc_tipo_operacion_datos_personales = '1';
        $("#btn_agregar_tercero").removeClass("color_borde_azul");
        $("#btn_modificar_tercero").attr("disabled", true);
        $("#btn_eliminar_tercero").attr("disabled", true);
        $("#btn_grabar_datos_personales").attr("disabled", true);
        limpiar_todas_las_etiquetas_identificacion_personal();
        desabilitar_input_text_identificacion_personal();
        listar_tabla_tipos_documentos();
        $("#slt_pais")
            .attr("disabled", false)
            .addClass("form-control  alert-warning ")
            .append('<option id="174" pais="PERU">PERU</option>');
        $("#ruc")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning")
            .focus();
        listar_departamentos();
        lc_id_departamento = '15';
        lc_id_provincia = '1';
        slt_contiene_sexo();
        listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
        listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);


    });



    $("#btn_modificar_tercero").click(function() {
        lc_tipo_operacion_datos_personales = '2';
        $("#btn_eliminar_tercero").attr("disabled", true);
        $("#btn_grabar_datos_personales").attr("disabled", true);
        habilitar_todas_etiquetas_para_edicion_personal();

    });



    $("#chk_debaja").on('change', function() {
        if ($(this).is(':checked')) {
            lc_estado_personal = '0';
            mostrar_personal_de_baja(lc_estado_personal);
        } else {
            lc_buscar_nombre_nuevo = '';
            listar_personal_tercero_total(lc_buscar_nombre_nuevo);
        }
    });



    /* PESTAÑA - DATOS PERSONALES (1) Identificacion Personal - INICIO  */
    $("#slt_pais").change(function() {
        lid_pais = $('#slt_pais  option:selected').attr('id');
    });

    $('#ruc')
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function(e) {
            $("#msj_ruc").val('');
            if (e.which === 13) {}

        })
        .keyup(function() {
            if ($('#ruc').val().length === 11) {
                leer_ruc = $("#ruc").val();
                validar_ruc(leer_ruc);
                ln_id_documento = '1';
            } else {
                $("#slt_sexo").attr("disabled", true);
                $("#txt_nro_documento").val('');
                $("#nombre_documento_registrado").text('');

            }
        });


    $("#slt_tipo_documento").change(function() {
        $("#ver_existe_documento").html('');
        $("#txt_paterno").attr("disabled", true);
        ln_id_documento = $('#slt_tipo_documento  option:selected').attr('id');
        leer_tipo_documento = ln_id_documento;
        lc_descripcion_documento = $('#slt_tipo_documento  option:selected').attr('descripcion');
        $("#txt_documento_descripcion").html('<strong><font size="-2" >' + lc_descripcion_documento + ' :' + '</font></strong>');
        if (lc_tipo_operacion_datos_personales === '1') {
            switch (ln_id_documento) {
                case '0':
                    $("#txt_documento_descripcion").html('<strong><font size="-1" > Nro. </font></strong>');
                    $("#msj_tipo_documento").html('<strong><font size="-2" color="#EF6000" > Seleccione Tipo de Documento </font></strong>');
                    $("#txt_nro_documento").attr("disabled", true);
                    break;
                case '1':
                    $("#msj_tipo_documento").html('');
                    $("#txt_nro_documento")
                        .attr("disabled", false)
                        .attr("maxlength", "8")
                        .focus();
                    break;
                case '2':
                    $("#msj_tipo_documento").html('');
                    $("#txt_nro_documento")
                        .attr("disabled", false)
                        .attr("maxlength", "20")
                        .focus();
                    break;

                case '3':
                    $("#msj_tipo_documento").html('');
                    $("#txt_nro_documento")
                        .attr("disabled", false)
                        .attr("maxlength", "30")
                        .focus();
                    break;

                case '4':
                    $("#msj_tipo_documento").html('');
                    $("#txt_nro_documento")
                        .attr("disabled", false)
                        .attr("maxlength", "30")
                        .val('')
                        .focus();
                    break;
                default:
                    $("#txt_documento_descripcion").html('<strong><font size="-1" > Nro. </font></strong>');
                    $("#msj_tipo_documento").html('<strong><font size="-2" color="#EF6000" > Seleccione Tipo de Documento </font></strong>');
                    $("#txt_nro_documento").attr("disabled", true);
                    break;
            }
        } else {

            $("#txt_nro_documento").attr("disabled", false);
        }
    });

    $("#txt_nro_documento")
        .focus(function() {
            if (ln_id_documento === "1") {
                $("#txt_nro_documento").attr("maxlength", "8");
            } else {
                $("#txt_nro_documento").attr("maxlength", "30");
            }
        })
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function() {
            if (lc_tipo_operacion_datos_personales === '1') {
                $("#slt_sexo").attr("disabled", false);
                leer_nro_documento = $("#txt_nro_documento").val();
                if (leer_nro_documento.length >= 0 && leer_nro_documento.length < 8) {
                    $("#ver_existe_documento").html('<CENTER><font size="-1" color="#EF6000" > --- Culmine la digitacion del Nro. de Documento --- </font></CENTER>');
                }
                if (leer_nro_documento.length === 8) {
                    valida_nro_documento_si_existe(leer_nro_documento);
                }
                if (leer_nro_documento.length > 8) {
                    $("#ver_existe_documento").html('<CENTER><font size="-1" color="#EF6000" > --- NRO. DE PASAPORTE O CARNET EXTRANJERIA --- </font></CENTER>');
                    $("#slt_sexo").attr("disabled", false);
                    valida_nro_documento_si_existe(leer_nro_documento);
                }
            } else {
                $("#txt_nro_documento").attr("disabled", false);
            }
        });



    $("#slt_sexo").change(function() {
        $("#txt_paterno")
            .attr("disabled", false)
            .focus();
        lc_sexo = $('#slt_sexo  option:selected').attr('lc_sexo');
        leer_sexo = lc_sexo;
        switch (lc_sexo) {
            case '0':
                break;
            case 'M':
                $("#apellido_casada").attr("disabled", true);
                break;
            case 'F':
                $("#apellido_casada")
                    .attr("disabled", false)
                    .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
                break;
            default:
                break;
        }

    });

    $("#txt_paterno").keypress(function(e) {
        $("#slt_tipo_documento")
            .attr("disabled", false);
        $("#txt_materno")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
        if (e.which === 13) {
            $("#txt_materno").focus();
        }

    });


    $("#txt_paterno").click(function() {
        $("#slt_tipo_documento")
            .attr("disabled", false);
        $("#txt_materno")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
    });





    $("#txt_materno").click(function() {
        $("#txt_nombres")
            .attr("disabled", false)
            .addClass("form-control  alert-warning text-secondary initialism");

    });





    $("#txt_materno").keypress(function(e) {
        $("#txt_nombres")
            .attr("disabled", false)
            .addClass("form-control  alert-warning text-secondary initialism");
        if (e.which === 13) {
            $("#txt_nombres").focus();
        }
    });






    $("#txt_nombres").keypress(function(e) {
        $('#txt_nacimiento').attr("disabled", false);
        $("#txt_area_direccion").attr("disabled", false);
        $("#txt_correo_electronico")
            .attr("disabled", false);
        $("#txt_telefono_fijo")
            .attr("disabled", false);
        $("#txt_telefono_celular")
            .attr("disabled", false);
        $("#telefono_emergencia")
            .attr("disabled", false);
        $("#btn_grabar_datos_personales").attr("disabled", false);

        $("#slc_departamento")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary");

        $("#txt_nacimiento").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nacimiento").focus();
        }

    });


    $("#txt_nombres").click(function() {
        $('#txt_nacimiento').attr("disabled", false);
        $("#txt_area_direccion").attr("disabled", false);
        $("#txt_correo_electronico")
            .attr("disabled", false);
        $("#txt_telefono_fijo")
            .attr("disabled", false);
        $("#txt_telefono_celular")
            .attr("disabled", false);
        $("#telefono_emergencia")
            .attr("disabled", false);
        $("#slc_departamento")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary");
        $("#txt_nacimiento").attr("disabled", false);
        $("#btn_grabar_datos_personales").attr("disabled", false);

    });


    $('#txt_nacimiento').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    }).on('show', function() {});

    $("#txt_nacimiento").change(function() {
        $("#slc_departamento")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary")
            .focus();

    });

    $("#slc_departamento").change(function() {
        $("#txt_nro_documento")
            .attr("disabled", false)
            .focus();
        $("#ver_existe_documento").text('');
        lc_id_departamento = '0';
        lc_id_provincia = '0';
        listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
        lc_id_departamento = $('#slc_departamento option:selected').attr('id');
        leer_id_departamento = lc_id_departamento;
        if (lc_id_departamento === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ningun departamento...</font></strong>');
        } else {
            listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
            $("#slc_provincia")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
                .focus();

        }
    });


    $("#slc_provincia").change(function() {
        lc_id_provincia = $('#slc_provincia option:selected').attr('id');
        leer_id_provincia = lc_id_provincia;
        if (lc_id_provincia === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ninguna provincia...</font></strong>');
        } else {
            listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
            $("#slc_distrito")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
                .focus();
        }
    });

    $("#slc_distrito").change(function() {
        lc_id_distrito = $('#slc_distrito option:selected').attr('id');
        leer_id_distrito = lc_id_distrito;
        $("#txt_area_direccion")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
            .focus();
    });

    $("#txt_area_direccion").keypress(function() {
        $("#txt_correo_electronico")
            .attr("disabled", false);
        $("#txt_telefono_fijo")
            .attr("disabled", false);
        $("#txt_telefono_celular")
            .attr("disabled", false);
        $("#telefono_emergencia")
            .attr("disabled", false);
    });

    $('#txt_telefono_fijo').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('#txt_telefono_fijo').keypress(function(e) {
        if (e.which === 13) {
            $("#txt_telefono_celular").focus();
        }
    });


    $('#txt_telefono_celular')
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function(e) {
            $("#observacion").attr("disabled", false);

            if (e.which === 13) {
                $("#observacion")
                    .attr("disabled", false)
                    .removeClass("form-control").addClass("form-control  alert-warning text-secondary color_borde_azul")
                    .focus();
            }
            $("#btn_grabar_datos_personales").attr("disabled", false);
        });


    $("#btn_grabar_datos_personales").click(function() {
        leer_paterno = $('#txt_paterno').val();
        leer_materno = $('#txt_materno').val();
        leer_apellido_casada = $("#apellido_casada").val();
        leer_nombres = $("#txt_nombres").val();
        leer_fecha_nacimiento = $("#txt_nacimiento").val();
        leer_direccion = $("#txt_area_direccion").val();
        leer_correo_electronico = $("#txt_correo_electronico").val();
        leer_telefono_fijo = $("#txt_telefono_fijo").val();
        leer_celular = $('#txt_telefono_celular').val();
        leer_celular_emergencia = $('#telefono_emergencia').val();
        leer_ruc = $('#ruc').val();
        leer_observacion = $('#observacion').val();
        leer_nro_documento = $("#txt_nro_documento").val();
        $("#msj_ruc").text('');
        if (lc_tipo_operacion_datos_personales === '1') {
            lc_id_departamento = (typeof lc_id_departamento === 'undefined') ? '15' : lc_id_departamento;
            lc_id_provincia = (typeof lc_id_provincia === 'undefined') ? '1' : lc_id_provincia;
            lc_id_distrito = (typeof lc_id_distrito === 'undefined') ? '1' : lc_id_distrito;
            grabar_registro_personal_tercero(lid_pais, ln_id_documento, leer_nro_documento, lc_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, lc_id_departamento, lc_id_provincia, lc_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion);
        } else {
            grabar_modificacion_registros_personal(lid_pais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_id_departamento, leer_id_provincia, leer_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion, leer_id);
        }
        desabilitar_input_text_identificacion_personal();
    });


    $("#btn_eliminar_tercero").click(function() {
        desactivar_personal_tercero(leer_id);
    });
    $("#btn_habilitar_tercero").click(function() {
        habilitar_personal_tercero(leer_id);
    });

    /******************* FIN DE IDENTIFICACION DE DATOS PERSONALES *****************************************/


    /* PESTAÑA DATOS LABORALES - DESPLEGABLES CONTRATOS Y DETALLES  */


    inicializar_botones_de_datos_servicios();
    $("#btn_agregar_servicio").attr("disabled", true);
    $("#slt_servicios")
        .click(function() {
            leer_servicios_de_terceros_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_servicios_de_terceros_mostrarlo_en_etiquetas();
        });

    $("#btn_agregar_servicio").click(function() {
        lc_operacion_servicios = '1';
        inicializar_botones_de_datos_servicios();
        obtener_fecha_ultimo_contrato(leer_id);
        $("#btn_modificar_servicio").attr("disabled", true);
        $("#btn_eliminar_servicio").attr("disabled", true);
        $("#fecha_inicio_servicio")
            .attr("disabled", false)
            .focus();
    });


    $("#btn_modificar_servicio").click(function() {
        lc_operacion_servicios = '2';
        habilitar_botones_datos_servicio();
        $("#btn_eliminar_servicio").attr("disabled", true);
    });



    $('#fecha_inicio_servicio').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    });

    $('#fecha_inicio_servicio').change(function() {
        valida_fechas_de_inicio_servicio();

    });



    $("#intervalo_meses_0").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_0").val();
        sumar_dias_a_fecha_inicial(7);
        ln_mes_servicio = 1;
        lc_tipo_monto_distribuir = '';
        calculo_monto_final_en_meses(ln_mes_servicio);

    });

    $("#intervalo_meses_1").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_1").val();
        sumar_dias_a_fecha_inicial(15);
        ln_mes_servicio = 1;
        lc_tipo_monto_distribuir = '';
        calculo_monto_final_en_meses(ln_mes_servicio);

    });

    $("#intervalo_meses_2").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_2").val();
        sumar_mes_a_fecha_inicial(1);
        ln_mes_servicio = 1;
        lc_tipo_monto_distribuir = '';
        calculo_monto_final_en_meses(ln_mes_servicio);

    });

    $("#intervalo_meses_3").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_3").val();
        sumar_mes_a_fecha_inicial(2);
        ln_mes_servicio = 2;
        calculo_monto_final_en_meses(ln_mes_servicio);
    });

    $("#intervalo_meses_4").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_4").val();
        lc_tipo_monto_distribuir = "";
        seleccion_fecha_final();
    });

    $("#intervalo_meses_5").click(function() {
        lc_valor_tipo_duracion = $("#intervalo_meses_5").val();
        sumar_mes_a_fecha_inicial(3);
        ln_mes_servicio = 3;
        calculo_monto_final_en_meses(ln_mes_servicio);
    });




    $('#fecha_fin_servicio').change(function() {
        $("#txt_nro_expediente")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning")
            .focus();
    });

    $("#txt_nro_expediente")
        .keypress(function(e) {
            $("#txt_nota_informativa")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_nota_informativa").focus();
            }
        });

    $("#txt_nota_informativa")
        .keypress(function(e) {
            $("#txt_nro_pedido")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_nro_pedido").focus();
            }

        });


    $("#txt_nro_pedido")
        .keypress(function(e) {
            $("#txt_meta_actual_area_usuaria")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_meta_actual_area_usuaria").focus();
            }

        });


    $("#txt_meta_actual_area_usuaria")
        .keypress(function(e) {
            $("#txt_meta_actual_certificada")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_meta_actual_certificada").focus();
            }

        });


    $("#txt_meta_actual_certificada")
        .keypress(function(e) {
            $("#txt_fuente_actual_financiamiento")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_fuente_actual_financiamiento").focus();
            }
        });

    $("#txt_fuente_actual_financiamiento").change(function() {
        $("#contenedor_aviso_pao_ccp")
            .show()
            .css("background-color", "#CDFF9A")
            .html("<center><strong>Registre PAO, CPP, Monto total...</strong></center><br>")
            .fadeOut(5000);
        $("#txt_pao")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning")
            .focus();

    });

    $("#txt_pao")
        .keypress(function(e) {
            $("#txt_ccp")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            if (e.which === 13) {
                $("#txt_ccp").focus();
                $("#txt_monto_total")
                    .attr("disabled", false)
                    .removeClass("form-control").addClass("form-control alert-warning");
            }
        })
        .click(function() {
            $("#txt_ccp")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");
            $("#txt_monto_total")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning");

        });

    $("#txt_ccp")
        .keypress(function(e) {
            if (e.which === 13) {
                $("#txt_monto_total").focus();
            }
        });

    $("#txt_monto_total").on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });


    $("#txt_monto_total")
        .keyup(function() {
            $("#txt_descripcion_servicio")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning initialism");
            calculo_monto_final_en_meses(ln_mes_servicio);
        })
        .keypress(function(e) {
            if (e.which === 13) {
                calculo_monto_final_en_meses(ln_mes_servicio);
                $("#txt_descripcion_servicio").focus();
            }
        });


    $("#txt_descripcion_servicio")
        .keypress(function() {
            $("#slt_cargos_profesion")
                .attr("disabled", false);
        })
        .click(function() {
            $("#slt_cargos_profesion")
                .attr("disabled", false);
        });


    $("#slt_cargos_profesion").change(function() {
        ln_id_cargo = $('#slt_cargos_profesion option:selected').attr('id');
        leer_cargo = $('#slt_cargos_profesion option:selected').attr('descripcion');
        lid_grupo = '-';
        lc_grupo = '-';
        $('#grupo_ocupacional').val(leer_cargo);

        $("#condicion_1").attr("disabled", false);
        $("#condicion_2").attr("disabled", false);
        $("#condicion_3").attr("disabled", false);
        $("#condicion_4").attr("disabled", false);
        $("#condicion_5").attr("disabled", false);
        $("#condicion_6").attr("disabled", false);
        $("#condicion_7").attr("disabled", false);
        $("#condicion_8").attr("disabled", false);
        $("#condicion_0")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_0").click(function() {
        lc_condicion_profesion = 'E';
        $('#grupo_ocupacional').val(leer_cargo + ' - ESTUDIANTE');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_1").click(function() {
        lc_condicion_profesion = 'G';
        $('#grupo_ocupacional').val(leer_cargo + ' - EGRESADO');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_2").click(function() {
        lc_condicion_profesion = 'C';
        $('#grupo_ocupacional').val(leer_cargo + ' - COMPLETA');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });

    $("#condicion_3").click(function() {
        lc_condicion_profesion = 'I';
        $('#grupo_ocupacional').val(leer_cargo + ' - INCOMPLETA');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();

    });

    $("#condicion_4").click(function() {
        lc_condicion_profesion = 'B';
        $('#grupo_ocupacional').val(leer_cargo + ' - BACHILLER');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_5").click(function() {
        lc_condicion_profesion = 'T';
        $('#grupo_ocupacional').val(leer_cargo + ' - TITULADO');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_6").click(function() {
        lc_condicion_profesion = 'M';
        $('#grupo_ocupacional').val(leer_cargo + ' - MAESTRIA');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_7").click(function() {
        lc_condicion_profesion = 'D';
        $('#grupo_ocupacional').val(leer_cargo + ' - DOCTORADO');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_8").click(function() {
        lc_condicion_profesion = 'O';
        $('#grupo_ocupacional').val(leer_cargo + ' - OTROS');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });





    $("#slt_asistencial").change(function() {
        $("#slt_centro_costo")
            .attr("disabled", false)
            .focus();
    });




    $("#slt_centro_costo").change(function() {
        ln_idccuo = $('#slt_centro_costo  option:selected').attr('id');
        leer_descripcion_centro_costo = $('#slt_centro_costo  option:selected').attr('descripcion_centro_costo');
        leer_descripcion_centro_sub_costo = $('#slt_centro_costo  option:selected').attr('descripcion_centro_subcosto');
        leer_descripcion_centro_tras_costo = $('#slt_centro_costo  option:selected').attr('descripcion_sub_trascosto');
        leer_unidad_organica = $('#slt_centro_costo  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_centro_costo  option:selected').attr('organo');
        lc_agregar_trascosto = (leer_descripcion_centro_tras_costo === '') ? leer_descripcion_centro_sub_costo : leer_descripcion_centro_sub_costo + ' - ' + leer_descripcion_centro_tras_costo;


        // $("#txt_centro_costo").val('CENTRO DE COSTO : ' + leer_descripcion_centro_costo + ' --  SUB COSTO : ' + leer_descripcion_centro_sub_costo + lc_agregar_trascosto + ' -- UNIDAD ORGANICA : ' + leer_unidad_organica + ' -- ORGANO : ' + leer_organo);

        $("#txt_centro_costo").val(leer_descripcion_centro_costo);
        $("#txt_centro_sub_costo").val(lc_agregar_trascosto);
        $("#txt_unidad_organica").val(leer_unidad_organica);
        $("#txt_organica").val(leer_organo);










        $("#slt_upss").attr("disabled", false);
        $("#slc_tipo_especialidad").attr("disabled", false);
        $("#observacion_servicio")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
        $("#btn_grabar_servicio").attr("disabled", false);
        $("#aviso_ingreso_especialidad")
            .show()
            .css("background-color", "#CDFF9A")
            .html("<center><strong>Registre UPSS, Especialidad, RNE, Observacion...</strong></center><br>")
            .fadeOut(5000);
    });


    $("#slt_upss").change(function() {
        leer_idupss = $('#slt_upss  option:selected').attr('id');
        leer_descripcion_upss = $('#slt_upss  option:selected').attr('descripcion');
        $("#txt_upss").val('UPSS : ' + leer_descripcion_upss);
        $("#slc_tipo_especialidad").attr("disabled", false);
        $("#observacion_servicio")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
        $("#btn_grabar_servicio").attr("disabled", false);

    });


    $("#slc_tipo_especialidad").change(function() {
        ln_id_especialidad = $('#slc_tipo_especialidad  option:selected').attr('id');
        lc_descripcion_especialidad = $('#slc_tipo_especialidad  option:selected').attr('descripcion');
        lc_codigo_colegio = $('#slc_tipo_especialidad  option:selected').attr('codigo_colegio');
        lc_nombre_colegio = $('#slc_tipo_especialidad  option:selected').attr('colegio');
        $('#txt_descripcion_especialidad')
            .val(lc_descripcion_especialidad + ' - ' + lc_nombre_colegio)
            .attr("disabled", true);
        $("#rne")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning")
            .focus();

        $("#btn_grabar_servicio").attr("disabled", true);
    });

    $("#rne")
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function() {
        $("#btn_grabar_servicio").attr("disabled", false);
    });


    $("#observacion_servicio")
        .keypress(function() {
            $("#btn_grabar_servicio").attr("disabled", false);
        })

    .focus(function() {
        $("#btn_grabar_servicio").attr("disabled", false);
    });



    $("#btn_grabar_servicio").click(function() {
        if (lc_operacion_servicios === '1') {
            leer_datos_registrados_terceros_servicios_y_grabar(leer_id);
            leer_fecha_ultimo_contrato = leer_fecha_fin_servicio;
        } else {
            leer_datos_modificar_y_grabarlo(leer_id_servicio);
        }
        inicializar_botones_de_datos_servicios();
        ver_personal_y_mostrar_contratos(leer_id);
    });


    $("#btn_eliminar_servicio").click(function() {
        eliminar_contrato_de_servicio_de_terceros(leer_id_servicio);
        inicializar_botones_de_datos_servicios();
        ver_personal_y_mostrar_contratos(leer_id);
    });


    //Para Registro de CESE
    $("#btn_registrar_cese").click(function() {
        $('#modal_registrar_cese').modal({
            show: true,
            backdrop: 'static'
        });
    });



    $("#seleccion-motivo").change(function() {
        lc_id_motivo_cese = $('#seleccion-motivo  option:selected').attr('id');
        leer_motivo_cese = $('#seleccion-motivo  option:selected').attr('motivo');



        if (lc_id_motivo_cese === '20') {
            $("#motivo_registrado").removeClass("form-control alert-danger").addClass("form-control alert-info");
            $("#motivo_registrado_con_cese").removeClass("form-control alert-danger").addClass("form-control alert-info");
        } else {
            $("#motivo_registrado").removeClass("form-control alert-info").addClass("form-control alert-danger");
            $("#motivo_registrado_con_cese").removeClass("form-control alert-info").addClass("form-control alert-danger");
        }

        $('#motivo_registrado_con_cese')
            .text(leer_motivo_cese);

        $('#motivo_registrado')
            .text(leer_motivo_cese);



        $('#fecha_fin_servicio_cese').attr("disabled", false);
        $('#txt_monto_total_cese').attr("disabled", false);
        $('#observacion_servicio_cese').attr("disabled", false);
        $('#btn_grabar_registro_cese').attr("disabled", false);

    });

    $('#fecha_fin_servicio_cese').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Cese"
    });




    $('#btn_grabar_registro_cese').click(function() {
        // lc_id_motivo_cese
        lc_fecha_cese = $('#fecha_fin_servicio_cese').val();
        ln_monto_final_cese = $('#txt_monto_total_cese').val();
        lc_observacion_cese = $('#observacion_servicio_cese').val();
        grabar_registro_cese_tercero(leer_id_servicio, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese);



    });








    // Fin de Modal


    // fecha_fin_servicio_cese


    /**********  fin de contrato laboral ****************/

    /* inicio de carrera, colegio profesional, Habilidad */
    inicializar_botones_etiquetas_carrera_profesional_habilidad();
    $("#slt_carrera_profesional")
        .click(function() {
            leer_carrera_profesional_mostrarlo_en_etiquetas_de_pestania_carrera();
        })
        .keyup(function() {
            leer_carrera_profesional_mostrarlo_en_etiquetas_de_pestania_carrera();
        });

    $("#btn_agregar_carrera").click(function() {
        lc_tipo_operacion_carrera = '1';
        listar_carreras_profesion();
        listar_colegios_profesionales();
        $("#descripcion_carrera_colegio").html('');
        $("#nro_colegiatura").val('');
        $("#slt_carrera")
            .attr("disabled", false)
            .open()
            .focus();
    });

    $("#btn_modificar_carrera").click(function() {
        lc_tipo_operacion_carrera = '2';
        listar_carreras_profesion();
        listar_colegios_profesionales();
        $("#slc_colegios_profesionales").attr("disabled", false);
        $("#nro_colegiatura").attr("disabled", false);
        $("#slt_carrera")
            .attr("disabled", false)
            .focus();
        $("#btn_grabar_carrera").attr("disabled", false);
    });

    $("#btn_eliminar_carrera").click(function() {
        eliminar_carrera_profesional_de_personal_tercero(ln_idenficador_carrera);
    });

    $("#slt_carrera").change(function() {
        ln_id_carrera = $('#slt_carrera  option:selected').attr('id');
        lc_descripcion_carrera = $('#slt_carrera  option:selected').attr('descripcion');
        verificar_carrera_por_personal(leer_id, ln_id_carrera);

    });

    $("#slc_colegios_profesionales").change(function() {
        ln_codigo_colegio = $('#slc_colegios_profesionales  option:selected').attr('codigo');
        lc_descripcion_colegio = $('#slc_colegios_profesionales  option:selected').attr('descripcion');
        $("#nro_colegiatura")
            .on('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            })
            .attr("disabled", false)
            .focus();
        $("#btn_grabar_carrera").attr("disabled", false);
    });

    $("#btn_grabar_carrera").click(function() {
        $("#descripcion_carrera_colegio").html('');
        lc_nro_colegio = $('#nro_colegiatura').val();
        if (lc_tipo_operacion_carrera === '1') {
            grabar_carrera_del_personal_tercero(lc_nro_colegio);
        } else {
            grabar_modificacion_carrera_personal_tercero(ln_idenficador_carrera, lc_nro_colegio);
        }

    });



    /* inicio CRUD habilitacion */

    inicializar_botones_habilidad_profesional();
    $("#slt_habilidad_profesional")
        .click(function() {
            leer_habilidad_profesional_y_mostrarlo();
        })
        .keyup(function() {
            leer_habilidad_profesional_y_mostrarlo();
        });


    $("#btn_agregar_habilidad").click(function() {
        lc_tipo_operacion_habilidad = '1';
        $('#fecha_inicio_habilitacion')
            .attr("disabled", false)
            .focus();
        $('#fecha_fin_habilitacion')
            .attr("disabled", true)
            .focus();
        $("#nro_de_habilitacion")
            .attr("disabled", true)
            .val('');
        $("#btn_grabar_habilidad").attr("disabled", true);
    });


    $("#btn_eliminar_habilidad").click(function() {
        eliminar_habilidad_personal_tercero(ln_idenficador_habilidad);
        $('#fecha_inicio_habilitacion')
            .attr("disabled", true);
        $('#fecha_fin_habilitacion')
            .attr("disabled", true);
        $("#nro_de_habilitacion")
            .attr("disabled", true);
        $("#btn_eliminar_habilidad").attr("disabled", true);
    });



    $('#fecha_inicio_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio habilitacion"
    }).on('show', function() {

    });


    $('#fecha_fin_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin habilitacion"
    }).on('show', function() {

    });

    $('#fecha_inicio_habilitacion').change(function() {
        lc_fecha_inicio = $('#fecha_inicio_habilitacion').val();
        lc_fecha_ver = lc_fecha_inicio;
        verificar_fecha_habilidad(ln_idenficador_carrera, lc_fecha_ver);
    });

    $('#fecha_fin_habilitacion').change(function() {
        lc_fecha_fin = $('#fecha_fin_habilitacion').val();
        lc_fecha_ver = lc_fecha_fin;
        verificar_fecha_habilidad_fin(ln_idenficador_carrera, lc_fecha_ver);

    });

    $('#nro_de_habilitacion').keyup(function() {
        if ($('#nro_de_habilitacion').val().length < 3) {
            $("#msj_grabacion_habilidad").html('<center><font size="-1" color="#EF6000">Minimo 3 caracteres</font></center>');
            $('#btn_grabar_habilidad').attr("disabled", true);
        } else {
            $("#msj_grabacion_habilidad").html('<center><font size="-1" color="#EF6000">Conforme...</font></center>');
            $('#btn_grabar_habilidad').attr("disabled", false);
        }

    });

    $("#btn_grabar_habilidad").click(function() {
        $("#msj_habilidad").html('');
        lc_nro_habilidad = $('#nro_de_habilitacion').val();
        if (lc_tipo_operacion_habilidad === '1') {} else {
            grabar_habilidad_de_carrera_personal_tercero(ln_idenficador_carrera, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad);
            grabar_modificacion_habilidad_por_carrera_profesional(ln_idenficador_habilidad, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad);
        }
    });





    /* FIN DE COLEGIOS Y CARRERA PROFESIONAL */



});