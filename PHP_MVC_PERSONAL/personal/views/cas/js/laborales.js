var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_establecimiento = '',
    lc_buscar_nombre = '',
    leer_id_cadena = '',
    leer_id_renaes = '',
    leer_idespecialidad = '',
    datos_buscar_cas, lc_tipo_operacion_contrato_cas, datos_estadistica, cantidad_registros, valor_final, datos_buscar_cas_cero, valor_final, cantidad_registros, i, nro_registros, lc_buscar_nombre, leer_ruc, leer_nro_contrato, leer_nro_proceso, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_direccion, cantidad_registros, dato_listar, lc_cargo, lid_grupo, lc_grupo, lc_descripcion_especialidad, leer_nombre_pais, leer_nombre_documento, leer_id_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_ruc_contrato, leer_id_condicion_laboral, leer_nombre_condicion_laboral, lid_nombre_destaque, datos_validar, lc_nombre_cadena, lc_actividad, leer_idpersonal, leer_nombre_pais, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_departamento, leer_provincia, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, lc_ver_si_se_selecciono, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, leer_idpersonal, leer_nombre_pais, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_departamento, leer_provincia, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, lc_codigo_colegio, lc_nombre_colegio, lc_mostrar_ruc, lc_verifica_ruc, lc_ruc_encontrado, lc_nombre_encontrado, lc_fecha_inicio_contrato, lc_fecha_fin_contrato, separar_fechas, fecha_conforme, lc_ver_si_se_selecciono_contrato, leer_id_contrato, leer_id_personal, leer_id_condicion_laboral, leer_condicion_laboral, leer_id_renaes, leer_establecimientos, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_fecha_desvinculacion, leer_sueldo, leer_id_cargo, leer_cargo, leer_id_grupo, leer_grupo_ocupacional, leer_id_cadena, leer_cadena, leer_meta, leer_plaza, leer_id_unidad, leer_unidad_organica, leer_organo, leer_idespecialidad, leer_especialidad, leer_colegio, leer_rne, dato_verificar, leer_tipo_personal, dato_grabar_contrato, dato_grabar_contrato_modificar, dato_grabar_contrato_eliminar, leer_motivo_renuncia_cese, leer_fecha_renuncia_cese, leer_idmotivo, lc_agregar_trascosto, leer_idespecialidad_nuevo, leer_id_unidad_organica, leer_idorganica, leer_id_centro_costo, leer_centro_costo, leer_centro_subcosto, leer_trascosto, leer_id_upss, leer_upss, dato_listar_upss, dato_listar_carrera, ln_id_profesion, lc_descripcion_profesion, lc_condicion_profesion, leer_idprofesion, leer_nombre_profesion, leer_condicion_profesion, leer_descripcion_condicion_profesion, leer_id_unidad, leer_unidad_organica, leer_organo, leer_idcentrocosto, leer_descripcion_cc, leer_descripcion_centro_sub_costo, leer_descripcion_centro_sub_trascosto, leer_idupss, leer_descripcion_upss, leer_id_profesion_para_grabar, leer_servicio_cc_para_grabar, leer_id_upss_para_grabar, leer_uo_para_grabar, lc_condicion_profesion_grabar, leer_idprofesion_grabar;


// slt_servicio_cc  
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
                        $("#select_personal_cas_existente").append('<option id="' + filas.id + '"  idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento + '"  nombre_documento = "' + filas.nombre_documento + '" nro_documento = "' + filas.nro_documento + '" sexo = "' + filas.sexo + '"  paterno= "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada + '"  nombres= "' + filas.nombres + '" apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento  = "' + filas.fecha_nacimiento + '"  edad= "' + filas.edad + '" idestadocivil = "' + filas.idestadocivil + '" estado_civil  = "' + filas.estado_civil + '" iddepartamento  = "' + filas.iddepartamento + '" departamento  = "' + filas.departamento + '" idprovincia  = "' + filas.idprovincia + '" provincia  = "' + filas.provincia + '" iddistrito  = "' + filas.iddistrito + '" distrito  = "' + filas.distrito + '" direccion  = "' + filas.direccion + '" correo_electronico  = "' + filas.correo_electronico + '" telefono_fijo = "' + filas.telefono_fijo + '" celular_personal  = "' + filas.celular_personal + '" celular_emergencia  = "' + filas.celular_emergencia + '" observacion = "' + filas.observacion + '" estado = "' + filas.estado + '" usuario  = "' + filas.usuario + '" fecharegistro = "' + filas.fecharegistro + '" usuario_modifico = "' + filas.usuario_modifico + '"fecha_modifico  = "' + filas.fecha_modifico + '" usuariodebaja = "' + filas.usuariodebaja + '" fechadebaja = "' + filas.fechadebaja + '"  >' + filas.apellidos_nombres + '</option>');
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
        }
    });


    $("#select_personal_cas_existente").select2({
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

function estadisticas_personal_juridico_habil_desactivado() {
    "use strict";
    datos_estadistica = {
        'id': 1
    };
    $.ajax({
        data: datos_estadistica,
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
                        $("#select_personal_cas_existente").append('<option id="' + filas.id + '"  idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento + '"  nombre_documento = "' + filas.nombre_documento + '" nro_documento = "' + filas.nro_documento + '" sexo = "' + filas.sexo + '"  paterno= "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada + '"  nombres= "' + filas.nombres + '" apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento  = "' + filas.fecha_nacimiento + '"  edad= "' + filas.edad + '" idestadocivil = "' + filas.idestadocivil + '" estado_civil  = "' + filas.estado_civil + '" iddepartamento  = "' + filas.iddepartamento + '" departamento  = "' + filas.departamento + '" idprovincia  = "' + filas.idprovincia + '" provincia  = "' + filas.provincia + '" iddistrito  = "' + filas.iddistrito + '" distrito  = "' + filas.distrito + '" direccion  = "' + filas.direccion + '" correo_electronico  = "' + filas.correo_electronico + '" telefono_fijo = "' + filas.telefono_fijo + '" celular_personal  = "' + filas.celular_personal + '" celular_emergencia  = "' + filas.celular_emergencia + '" observacion = "' + filas.observacion + '" estado = "' + filas.estado + '" usuario  = "' + filas.usuario + '" fecharegistro = "' + filas.fecharegistro + '" usuario_modifico = "' + filas.usuario_modifico + '"fecha_modifico  = "' + filas.fecha_modifico + '" usuariodebaja = "' + filas.usuariodebaja + '" fechadebaja = "' + filas.fechadebaja + '"  >' + filas.apellidos_nombres + '</option>');
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
        }

    });




}

function inicializar_y_limpiar_botones_laboral() {
    "use strict";

    $("#btn_agregar_contrato").attr("disabled", true);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_mostrar_adenda").attr("disabled", true);
    $("#btn_registrar_cese_cas").attr("disabled", true);
    $("#btn_reporte_contrato_cas").attr("disabled", true);

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
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    $("#txt_renaes").hide();
    $("#txt_buscar_establecimiento")
        .text('')
        .hide();
    $("#lgr_origen_destaque").hide();
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

    $("#fecha_inicio_contrato").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio de Contrato"
    }).on('show', function () {

    });

    $("#fecha_fin_contrato").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio de Contrato"
    }).on('show', function () {

    });

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
    listar_carreras_profesion_total();
    listar_unidad_organica_de_organo();
    $("#txt_unidad_organica").val('');


    $("#txt_descripcion_upss")
        .val('')
        .attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", true);


    listar_centros_de_costos();

    listar_tipos_especialidad();
    $("#slc_tipo_especialidad").attr("disabled", true);


    $("#btn_grabar_contrato").attr("disabled", true);

    $("#slt_profesion").attr("disabled", true);
    $("#descripcion_profesion").val('');

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





    $("#slt_unidad_organica").attr("disabled", true);
    $("#txt_unidad_organica").val('');


    $("#slt_servicio_cc").attr("disabled", true);
    $("#txt_descripcion_cc").val('');









}

function limpiar_etiquetas_agregar_contrato_nuevo() {
    "use strict";
    $("#btn_agregar_contrato").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_mostrar_adenda").attr("disabled", true);
    $("#btn_registrar_cese_cas").attr("disabled", true);
    $("#msj_estado")
        .text("");
    listar_condicion_laboral();
    $("#lugar_origen")
        .text("")
        .hide();
    $("#ruc")
        .val('')
        .attr("disabled", true);

    $("#slc_condicion_laboral")
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
    listar_centros_de_costos();
    $("#txt_descripcion_upss")
        .val('')
        .attr("disabled", true);
    // $("#slt_servicio_upss").attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", false);
    $("#slc_tipo_especialidad").attr("disabled", true);
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    $("#txt_renaes").hide();
    $("#txt_buscar_establecimiento")
        .text('')
        .hide();
    $("#lgr_origen_destaque").hide();
    $("#lugar_origen").text('');

    $("#btn_grabar_contrato").attr("disabled", true);

    $("#condicion_1")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_2")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_3")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_4")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_5")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_6")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_7")
        .prop("checked", false)
        .attr("disabled", true);
    $("#condicion_8")
        .prop("checked", false)
        .attr("disabled", true);
    $("#descripcion_profesion").val('');
    $("#txt_unidad_organica").val('');
    $("#txt_descripcion_cc").val('');
    $("#txt_descripcion_upss").val('');









}

function desabilitar_etiquetas_para_edicion() {
    "use strict";
    $("#btn_agregar_contrato").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_mostrar_adenda").attr("disabled", true);
    listar_condicion_laboral();
    $("#slc_condicion_laboral").attr("disabled", false);
    $("#lugar_origen")
        .text("")
        .hide();
    $("#ruc")
        .attr("disabled", false);
    $("#txt_nro_proceso")
        .attr("disabled", false);
    $("#txt_nro_contrato")
        .attr("disabled", false);
    $("#fecha_inicio_contrato")
        .attr("disabled", false);
    $("#fecha_fin_contrato")
        .attr("disabled", false);
    $("#sueldo")
        .attr("disabled", false);
    listar_de_cargos();
    $("#slt_cargos")
        .attr("disabled", false);
    $("#grupo_ocupacional")
        .attr("disabled", true);
    listar_cadena_programatica();
    $("#slt_cadena_programatica")
        .attr("disabled", false);
    $("#meta")
        .attr("disabled", false);
    $("#plaza")
        .attr("disabled", false);
    $("#tipo_de_labor_0")
        .attr("disabled", false);
    $("#tipo_de_labor_1")
        .attr("disabled", false);
    listar_unidad_organica_de_organo();
    $("#txt_descripcion_upss")
        .attr("disabled", true);
    $("#slt_servicio_upss").attr("disabled", false);
    $("#slc_tipo_especialidad").attr("disabled", false);
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    $("#rne").attr("disabled", false);
    $("#txt_renaes").hide();
    $("#txt_buscar_establecimiento")
        .text('')
        .hide();
    $("#lgr_origen_destaque").hide();
    $("#lugar_origen").text('');
    $("#slt_profesion").attr("disabled", false);
    $("#slt_unidad_organica").attr("disabled", false);
    $("#btn_grabar_contrato").attr("disabled", false);

    $("#slt_servicio_cc").attr("disabled", false);


    $("#slt_profesion").attr("disabled", false);


    $("#condicion_0")
        .attr("disabled", false);


    $("#condicion_1")
        .attr("disabled", false);


    $("#condicion_2")
        .attr("disabled", false);


    $("#condicion_3")
        .attr("disabled", false);


    $("#condicion_4")
        .attr("disabled", false);


    $("#condicion_5")
        .attr("disabled", false);


    $("#condicion_6")
        .attr("disabled", false);



    $("#condicion_7")
        .attr("disabled", false);


    $("#condicion_8")
        .attr("disabled", false);






    $("#slt_unidad_organica")
        .attr("disabled", false);



    $("#slt_servicio_cc")
        .attr("disabled", false);









}

function leer_personal_cas_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idpersonal = $('#select_personal_cas_existente  option:selected').attr('id');
    lc_ver_si_se_selecciono = (typeof leer_idpersonal === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono === '1') {
        leer_idpersonal = $('#select_personal_cas_existente  option:selected').attr('id');
        leer_nombre_pais = $('#select_personal_cas_existente  option:selected').attr('nombre_pais');
        leer_nombre_documento = $('#select_personal_cas_existente  option:selected').attr('nombre_documento');
        leer_nro_documento = $('#select_personal_cas_existente  option:selected').attr('nro_documento');
        leer_sexo = $('#select_personal_cas_existente  option:selected').attr('sexo');
        leer_apellidos_nombres = $('#select_personal_cas_existente  option:selected').attr('apellidos_nombres');
        leer_fecha_nacimiento = $('#select_personal_cas_existente  option:selected').attr('fecha_nacimiento');
        leer_edad = $('#select_personal_cas_existente  option:selected').attr('edad');
        leer_estado_civil = $('#select_personal_cas_existente  option:selected').attr('estado_civil');
        leer_departamento = $('#select_personal_cas_existente  option:selected').attr('departamento');
        leer_provincia = $('#select_personal_cas_existente  option:selected').attr('provincia');
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
        $("#personal_seleccion_nombre").text('ID : ' + leer_idpersonal + ' - ' + leer_apellidos_nombres);
        $("#msj_estado")
            .text('')
            .removeClass("form-control alert-danger").addClass("form-control alert-info");

        if (leer_estado === '1') {
            $("#condicion_personal")
                .text('HABILITADO')
                .removeClass("alert-warning")
                .addClass("alert-info");
            $("#btn_agregar_contrato").attr("disabled", false);
            $("#btn_modificar_contrato").attr("disabled", true);
            $("#btn_eliminar_contrato").attr("disabled", true);
            $("#btn_mostrar_adenda").attr("disabled", true);
            $("#btn_registrar_cese_cas").attr("disabled", true);



        } else {
            $("#condicion_personal")
                .text('INOPERATIVO')
                .removeClass("alert-info")
                .addClass("alert-warning");

            $("#btn_agregar_contrato").attr("disabled", true);
            $("#btn_modificar_contrato").attr("disabled", true);
            $("#btn_eliminar_contrato").attr("disabled", true);
            $("#btn_mostrar_adenda").attr("disabled", true);
            $("#btn_registrar_cese_cas").attr("disabled", true);





        }







        $("#btn_grabar_contrato").attr("disabled", true);

        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);
        ver_contratos_personal_seleccion(leer_idpersonal);
        limpiar_desabilitar_datos_laborales();

    } else {
        $("#personal_seleccion_nombre").text('');
        $("#btn_agregar_contrato").attr("disabled", true);
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);
        $("#btn_mostrar_adenda").attr("disabled", true);
        $("#btn_grabar_contrato").attr("disabled", true);
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
            $("#espera_mientras_carga_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (datos) {
            $("#slt_contratos_seleccion")
                .html('');
            $("#espera_mientras_carga_personal").html('');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    lc_mostrar_ruc = filas.ruc;
                    $("#ruc").val(lc_mostrar_ruc);
                    $("#slt_contratos_seleccion")
                        .show()
                        .append('<option id="' + filas.idcontrato + '"  idpersonal = "' + filas.idpersonal + '"  idcondicionlaboral = "' + filas.idcondicionlaboral + '"  condicionlaboral = "' + filas.condicionlaboral + '"  idrenaes  = "' + filas.idrenaes + '"  establecimientos = "' + filas.establecimientos + '"  ruc = "' + filas.ruc + '"  nro_proceso  = "' + filas.nro_proceso + '"  nro_contrato = "' + filas.nro_contrato + '"  fecha_ingreso = "' + filas.fecha_ingreso + '"  fecha_termino = "' + filas.fecha_termino + '"  fecha_desvinculacion  = "' + filas.fecha_desvinculacion + '"  sueldo = "' + filas.sueldo + '"  idcargo = "' + filas.idcargo + '"  cargo = "' + filas.cargo + '"  idgrupo = "' + filas.idgrupo + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  idcadena = "' + filas.idcadena + '"  cadena = "' + filas.cadena + '"  meta = "' + filas.meta + '"  plaza = "' + filas.plaza + '"  tipo_personal = "' + filas.tipo_personal + '"  idprofesion = "' + filas.idprofesion + '"  nombre_profesion = "' + filas.nombre_profesion + '"  condicion_profesion = "' + filas.condicion_profesion + '"  descripcion_condicion_profesion = "' + filas.descripcion_condicion_profesion + '"  idunidad = "' + filas.idunidad + '"  unidad_organica = "' + filas.unidad_organica + '"  organo = "' + filas.organo + '"  idcentrocosto = "' + filas.idcentrocosto + '" descripcion_cc = "' + filas.descripcion_cc + '" descripcion_centro_sub_costo = "' + filas.descripcion_centro_sub_costo + '" descripcion_centro_sub_trascosto = "' + filas.descripcion_centro_sub_trascosto + '" idupss = "' + filas.idupss + '" descripcion_upss = "' + filas.descripcion_upss + '"  idespecialidad = "' + filas.idespecialidad + '"  especialidad = "' + filas.especialidad + '"  colegio = "' + filas.colegio + '"  rne = "' + filas.rne + '"  adenda = "' + filas.adenda + '"  motivo_renuncia = "' + filas.motivo_renuncia + '"  idmotivo = "' + filas.idmotivo + '"  fecha_renuncia = "' + filas.fecha_renuncia + '">' + filas.fecha_ingreso + '&nbsp;&nbsp;&#124;' + '&nbsp;&nbsp;' + filas.fecha_termino + ' &nbsp;&nbsp;&#124; ' + filas.nro_contrato + ' &nbsp;&nbsp;&#124; ' + filas.adenda + '&nbsp;&#124; ' + filas.motivo_renuncia + '</option>')
                        .attr("disabled", false);
                } else {
                    lc_mostrar_ruc = '';
                    $("#ruc").val(lc_mostrar_ruc);
                    $("#slt_contratos_seleccion").attr("disabled", true);
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


// 





function leer_contratos_y_mostrarlo_datos_laborales() {
    "use strict";
    leer_id_contrato = $('#slt_contratos_seleccion  option:selected').attr('id');
    lc_ver_si_se_selecciono_contrato = (typeof leer_id_contrato === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_contrato === '1') {
        leer_id_contrato = $('#slt_contratos_seleccion  option:selected').attr('id');
        leer_id_personal = $('#slt_contratos_seleccion  option:selected').attr('idpersonal');
        leer_id_condicion_laboral = $('#slt_contratos_seleccion  option:selected').attr('idcondicionlaboral');
        leer_condicion_laboral = $('#slt_contratos_seleccion  option:selected').attr('condicionlaboral');
        leer_id_renaes = $('#slt_contratos_seleccion  option:selected').attr('idrenaes');
        leer_establecimientos = $('#slt_contratos_seleccion  option:selected').attr('establecimientos');
        leer_ruc_contrato = $('#slt_contratos_seleccion  option:selected').attr('ruc');
        leer_nro_proceso = $('#slt_contratos_seleccion  option:selected').attr('nro_proceso');
        leer_nro_contrato = $('#slt_contratos_seleccion  option:selected').attr('nro_contrato');
        leer_fecha_ingreso_contrato = $('#slt_contratos_seleccion  option:selected').attr('fecha_ingreso');
        leer_fecha_termino_contrato = $('#slt_contratos_seleccion  option:selected').attr('fecha_termino');
        leer_fecha_desvinculacion = $('#slt_contratos_seleccion  option:selected').attr('fecha_desvinculacion');
        leer_sueldo = $('#slt_contratos_seleccion  option:selected').attr('sueldo');
        leer_id_cargo = $('#slt_contratos_seleccion  option:selected').attr('idcargo');
        leer_cargo = $('#slt_contratos_seleccion  option:selected').attr('cargo');
        leer_id_grupo = $('#slt_contratos_seleccion  option:selected').attr('idgrupo');
        leer_grupo_ocupacional = $('#slt_contratos_seleccion  option:selected').attr('grupo_ocupacional');
        leer_id_cadena = $('#slt_contratos_seleccion  option:selected').attr('idcadena');
        leer_cadena = $('#slt_contratos_seleccion  option:selected').attr('cadena');
        leer_meta = $('#slt_contratos_seleccion  option:selected').attr('meta');
        leer_plaza = $('#slt_contratos_seleccion  option:selected').attr('plaza');
        leer_tipo_personal = $('#slt_contratos_seleccion  option:selected').attr('tipo_personal');

        leer_idprofesion = $('#slt_contratos_seleccion  option:selected').attr('idprofesion');
        leer_nombre_profesion = $('#slt_contratos_seleccion  option:selected').attr('nombre_profesion');
        leer_condicion_profesion = $('#slt_contratos_seleccion  option:selected').attr('condicion_profesion');
        leer_descripcion_condicion_profesion = $('#slt_contratos_seleccion  option:selected').attr('descripcion_condicion_profesion');
        leer_id_unidad = $('#slt_contratos_seleccion  option:selected').attr('idunidad');
        leer_unidad_organica = $('#slt_contratos_seleccion  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_contratos_seleccion  option:selected').attr('organo');

        leer_idcentrocosto = $('#slt_contratos_seleccion  option:selected').attr('idcentrocosto');
        leer_descripcion_cc = $('#slt_contratos_seleccion  option:selected').attr('descripcion_cc');
        leer_descripcion_centro_sub_costo = $('#slt_contratos_seleccion  option:selected').attr('descripcion_centro_sub_costo');
        leer_descripcion_centro_sub_trascosto = $('#slt_contratos_seleccion  option:selected').attr('descripcion_centro_sub_trascosto');
        leer_idupss = $('#slt_contratos_seleccion  option:selected').attr('idupss');
        leer_descripcion_upss = $('#slt_contratos_seleccion  option:selected').attr('descripcion_upss');


        leer_idespecialidad = $('#slt_contratos_seleccion  option:selected').attr('idespecialidad');
        leer_especialidad = $('#slt_contratos_seleccion  option:selected').attr('especialidad');
        leer_colegio = $('#slt_contratos_seleccion  option:selected').attr('colegio');
        leer_rne = $('#slt_contratos_seleccion  option:selected').attr('rne');
        leer_idmotivo = $('#slt_contratos_seleccion  option:selected').attr('idmotivo');
        leer_motivo_renuncia_cese = $('#slt_contratos_seleccion  option:selected').attr('motivo_renuncia');
        leer_fecha_renuncia_cese = $('#slt_contratos_seleccion  option:selected').attr('fecha_renuncia');
        $("#msj_estado").text(leer_condicion_laboral + ' - ' + leer_establecimientos + ' - ' + leer_motivo_renuncia_cese);
        if (leer_idmotivo === '20') {
            $("#msj_estado").removeClass("form-control alert-danger").addClass("form-control alert-info");
        } else {
            $("#msj_estado").removeClass("form-control alert-info").addClass("form-control alert-danger");
        }

        listar_condicion_laboral();
        $("#ruc").val(leer_ruc_contrato);
        $("#txt_nro_proceso").val(leer_nro_proceso);
        $("#txt_nro_contrato").val(leer_nro_contrato);
        $("#fecha_inicio_contrato").val(leer_fecha_ingreso_contrato);
        $("#fecha_fin_contrato").val(leer_fecha_termino_contrato);
        $('#fecha_fin_servicio_cese').val(leer_fecha_termino_contrato);
        $("#sueldo").val(leer_sueldo);
        $("#txt_monto_total_cese").val(leer_sueldo);
        listar_de_cargos();
        $("#grupo_ocupacional").val(leer_cargo + '--' + leer_grupo_ocupacional);
        listar_carreras_profesion_total();
        $("#descripcion_profesion").val(leer_nombre_profesion + ' - ' + leer_descripcion_condicion_profesion);
        switch (leer_condicion_profesion) {
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




        listar_cadena_programatica();
        $("#nombre_cadena_programatica").val(leer_cadena);
        $("#meta").val(leer_meta);
        $("#plaza").val(leer_plaza);
        if (leer_tipo_personal === 'S') {
            $("#tipo_de_labor_0")
                .attr("disabled", true)
                .prop("checked", true);

        } else {
            $("#tipo_de_labor_1")
                .attr("disabled", true)
                .prop("checked", true);

        }
        listar_unidad_organica_de_organo();
        $("#txt_unidad_organica").val(leer_unidad_organica);
        $("#txt_organo").val(leer_organo);

        listar_centros_de_costos();

        /*
        
        <textarea name="txt_descripcion_cc" class="form-control" rows="3" disabled="disabled" id="txt_descripcion_cc"></textarea>
        <textarea name="txt_descripcion_sc" class="form-control" rows="3" disabled="disabled" id="txt_descripcion_sc"></textarea>

        */


        lc_agregar_trascosto = (leer_descripcion_centro_sub_trascosto === '') ? '' : ' -- TRAS COSTO : ' + leer_descripcion_centro_sub_trascosto;

        $("#txt_descripcion_cc").val(leer_descripcion_cc);
        $("#txt_descripcion_sc").val(leer_descripcion_centro_sub_costo + lc_agregar_trascosto);


        /*
        $("#txt_descripcion_cc").val('CENTRO DE COSTO : ' + leer_descripcion_cc + ' -- ' + ' SUB COSTO : ' + leer_descripcion_centro_sub_costo + lc_agregar_trascosto);
        
        
        */





        $("#txt_descripcion_upss").val(leer_descripcion_upss);

        listar_tipos_especialidad();
        $("#txt_descripcion_especialidad").val(leer_especialidad + ' -- ' + leer_colegio);
        $("#rne").val(leer_rne);
        $("#adenda_del_contrato").text(leer_nro_contrato);
        $("#btn_modificar_contrato").attr("disabled", false);
        $("#btn_eliminar_contrato").attr("disabled", false);
        $("#btn_mostrar_adenda").attr("disabled", false);
        $("#btn_grabar_contrato").attr("disabled", true);
        $("#btn_reporte_contrato_cas").attr("disabled", false);

        ver_contratos_y_consultar_adendas(leer_id_contrato);
        $("#btn_registrar_cese_cas").attr("disabled", false);


    } else {
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);
        $("#btn_mostrar_adenda").attr("disabled", true);
        $("#btn_reporte_contrato_cas").attr("disabled", true);
    }
}




function ver_contratos_y_consultar_adendas(leer_id_contrato) {
    "use strict";
    dato_listar = {
        'id': leer_id_contrato
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'cas/listar_adendas_de_un_contrato',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_contratos_adendas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_contratos_adendas").append('<option id="' + filas.id + '"  idcontrato = "' + filas.idcontrato + '"  nro_adenda = "' + filas.nro_adenda + '"  nro_contrato = "' + filas.nro_contrato + '"  estado_adenda = "' + filas.estado_adenda + '"  fecha_inicio = "' + filas.fecha_inicio + '"  fecha_fin = "' + filas.fecha_fin + '"descripcion_estado_adenda ="' + filas.descripcion_estado_adenda + '"  idunidad = "' + filas.idunidad + '"  unidad_organica = "' + filas.unidad_organica + '"  organo = "' + filas.organo + '"  >' + filas.fecha_inicio + '&nbsp;&nbsp;&#124;&nbsp;&nbsp;' + filas.fecha_fin + '&nbsp;&nbsp;&#124;&nbsp;&nbsp;' + filas.descripcion_estado_adenda + '&nbsp;&nbsp;&#124;&nbsp;' + filas.nro_adenda + '</option>');
                    $("#slc_contratos_adendas").attr("disabled", false);

                } else {

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



function limpiar_desabilitar_datos_laborales() {
    "use strict";
    $("#msj_estado").text('');
    listar_condicion_laboral();
    $("#ruc").attr("disabled", true);
    $("#txt_nro_proceso")
        .attr("disabled", true)
        .val('');
    $("#txt_nro_contrato")
        .attr("disabled", true)
        .val('');

    $("#fecha_inicio_contrato")
        .attr("disabled", true)
        .val('');

    $("#fecha_fin_contrato")
        .attr("disabled", true)
        .val('');

    $("#sueldo")
        .attr("disabled", true)
        .val(0);
    listar_de_cargos();
    $("#grupo_ocupacional")
        .attr("disabled", true)
        .val('');


    $("#descripcion_profesion").val('');




    listar_cadena_programatica();
    $("#nombre_cadena_programatica").val('');
    $("#meta")
        .attr("disabled", true)
        .val('');
    $("#plaza")
        .attr("disabled", true)
        .val('');
    $("#tipo_de_labor_0")
        .attr("disabled", true)
        .prop("checked", false);
    $("#tipo_de_labor_1")
        .attr("disabled", true)
        .prop("checked", false);
    listar_unidad_organica_de_organo();
    listar_todos_upss();
    $("#txt_descripcion_upss").val('');
    listar_tipos_especialidad();
    $("#txt_descripcion_especialidad").val('');
    $("#rne")
        .attr("disabled", true)
        .val('');
    $("#btn_grabar_contrato").attr("disabled", true);

    $("#txt_unidad_organica").val('');

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



    $("#txt_unidad_organica").val('');
    $("#txt_descripcion_cc").val('');
    $("#txt_descripcion_upss").val('');





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
                .show()
                .append('<option id=0> Seleccione </option>');
            $("#slt_cadena_programatica").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cadena_programatica").append('<option id="' + filas.id + '"  tarea = "' + filas.nombre_tarea + '"  actividad = "' + filas.actividad + '"  >' + filas.nombre_tarea + '</option>');
                } else {}
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
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cargos").append('<option id="' + filas.id + '"  cargo = "' + filas.cargo + '"  id_grupo = "' + filas.id_grupo_ocupacional + '"  grupo = "' + filas.grupo + '"  >' + filas.cargo + '</option>');
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
            $("#slt_unidad_organica")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_unidad_organica").append('<option id="' + filas.idunidadorganica + '"  unidad_organica = "' + filas.unidad_organica + '"  idorgano = "' + filas.idorgano + '"  organo = "' + filas.organo + '"  >' + filas.unidad_organica + '</option>');
                } else {
                    $("#slt_unidad_organica").attr("disabled", true);
                }
            });
        }
    });
    $("#slt_unidad_organica").select2({
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



function listar_centros_de_costos() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_centro_de_costo_unidad_organica',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_servicio_cc")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicio_cc").append('<option id="' + filas.idccuo + '"  codigo_centro_costo= "' + filas.codigo_centro_costo + '"  descripcion_centro_costo = "' + filas.descripcion_centro_costo + '"  sub_codigo_centro_costo= "' + filas.sub_codigo_centro_costo + '"  descripcion_centro_subcosto = "' + filas.descripcion_centro_subcosto + '"  descripcion_sub_trascosto = "' + filas.descripcion_sub_trascosto + '"  descripcion_total = "' + filas.descripcion_total + '"  unidad_organica = "' + filas.unidad_organica + '"  organo = "' + filas.organo + '"  >' + filas.descripcion_total + '</option>');
                } else {
                    $("#slt_servicio_cc").attr("disabled", true);
                }

            });

        }
    });
    $("#slt_servicio_cc").select2({
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
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_upss")
                .html('')
                .append('<option id=0> Seleccione :</option>')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicio_upss").append('<option id="' + filas.id + '" codigo_upss = "' + filas.codigo_upss + '" descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slt_servicio_upss")
                        .attr("disabled", true)
                        .empty();
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






function listar_tipos_especialidad() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_tipos_especialidad',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_tipo_especialidad")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_especialidad").append('<option id="' + filas.id + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  codigo_colegio = "' + filas.codigo_colegio + '"  colegio= "' + filas.colegio + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slc_tipo_especialidad").attr("disabled", true);
                }

            });

        }
    });

    $("#slc_tipo_especialidad").select2({
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





function validar_ruc_cas(leer_ruc) {
    "use strict";
    datos_validar = {
        "id": leer_ruc
    };
    $.ajax({
        data: datos_validar,
        dataType: 'json',
        url: url + 'cas/verificar_ruc_cas',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    lc_ruc_encontrado = filas.ruc;
                    lc_nombre_encontrado = filas.apellidos_nombres;
                    $("#msj_estado").html('<center><font size="-1" color="#F5000F">Ya existe : ' + lc_ruc_encontrado + ' - ' + lc_nombre_encontrado + ' </font></center>');
                    $("#ruc")
                        .attr("disabled", false)
                        .focus();
                } else {
                    $("#msj_estado").html('<center><font size="-1" color="#0152F7">RUC conforme... </font></center>');
                    $('#txt_nro_proceso')
                        .attr("disabled", false)
                        .focus();
                }
            });
        }
    });
}



function convertir_fecha_caracter_a_date(leer_fecha) {
    "use strict";
    separar_fechas = leer_fecha.split("/");
    fecha_conforme = new Date(+separar_fechas[2], separar_fechas[1] - 1, +separar_fechas[0]);
    return fecha_conforme;
}



function ver_fecha_inicio_contrato_que_no_se_repita(leer_ruc_contrato, lc_fecha_inicio_contrato) {
    "use strict";
    dato_verificar = {
        'ruc': leer_ruc_contrato,
        'fecha': lc_fecha_inicio_contrato
    };
    $.ajax({
        data: dato_verificar,
        dataType: 'json',
        url: url + 'cas/verificar_fecha',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#msj_estado").html('<center><font size="-1" color="#F5000F">Fecha seleccionada debe ser mayor que fecha fin del contrato </font></center>');
                    $("#fecha_inicio_contrato")
                        .attr("disabled", false)
                        .focus();
                } else {
                    $("#msj_estado").html('<center><font size="-1" color="#0152F7"> ....  </font></center>');
                    $('#fecha_fin_contrato')
                        .attr("disabled", false)
                        .focus();
                }
            });
        }
    });
}



function grabar_registro_nuevo_contrato(leer_id_personal, leer_id_condicion_laboral, leer_id_renaes, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_sueldo, leer_id_cargo, leer_id_cadena, leer_meta, leer_plaza, leer_tipo_personal, leer_idprofesion, lc_condicion_profesion, leer_id_unidad_organica, leer_id_centro_costo, leer_id_upss, leer_idespecialidad, leer_rne) {
    "use strict";
    dato_grabar_contrato = {
        'idpersonal': leer_id_personal,
        'idcondicion_laboral': leer_id_condicion_laboral,
        'renaes': leer_id_renaes,
        'ruc': leer_ruc_contrato,
        'nro_proceso': leer_nro_proceso,
        'nro_contrato': leer_nro_contrato,
        'fecha_ingreso': leer_fecha_ingreso_contrato,
        'fecha_termino': leer_fecha_termino_contrato,
        'sueldo': leer_sueldo,
        'idcargo': leer_id_cargo,
        'idcadena': leer_id_cadena,
        'meta': leer_meta,
        'plaza': leer_plaza,
        'tipo': leer_tipo_personal,
        'idprofesion': leer_idprofesion,
        'condicion_profesion': lc_condicion_profesion,
        'idunidad': leer_id_unidad_organica,
        'idcentrocosto': leer_id_centro_costo,
        'idupss': leer_id_upss,
        'idespecialidad': leer_idespecialidad,
        'rne': leer_rne
    };

    $.ajax({
        data: dato_grabar_contrato,
        dataType: 'json',
        url: url + 'cas/grabar_registro_contrato_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_contratos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_contratos").html("");
            // listar_todo_el_personal_cas(lc_buscar_nombre)
            ver_contratos_personal_seleccion(leer_idpersonal);
            limpiar_etiquetas_agregar_contrato_nuevo();


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

//  grabar_edicion_nuevo_contrato(leer_id_contrato, leer_id_personal, leer_id_condicion_laboral, leer_id_renaes, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_sueldo, leer_id_cargo, leer_idprofesion, lc_condicion_profesion, leer_id_cadena, leer_meta, leer_plaza, leer_tipo_personal, leer_id_unidad, leer_idespecialidad, leer_rne);
// $idcentrocosto = $_POST[ "idcentrocosto" ];

function grabar_edicion_nuevo_contrato(leer_id_contrato, leer_id_condicion_laboral, leer_id_renaes, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_sueldo, leer_id_cargo, leer_idprofesion, lc_condicion_profesion_grabar, leer_id_centro_costo, leer_id_cadena, leer_meta, leer_plaza, leer_tipo_personal, leer_id_unidad, leer_id_upss, leer_idespecialidad, leer_rne) {

    "use strict";
    dato_grabar_contrato_modificar = {
        'idcontrato': leer_id_contrato,
        'idcondicion_laboral': leer_id_condicion_laboral,
        'renaes': leer_id_renaes,
        'ruc': leer_ruc_contrato,
        'nro_proceso': leer_nro_proceso,
        'nro_contrato': leer_nro_contrato,
        'fecha_ingreso': leer_fecha_ingreso_contrato,
        'fecha_termino': leer_fecha_termino_contrato,
        'sueldo': leer_sueldo,
        'idcargo': leer_id_cargo,
        'idprofesion': leer_idprofesion,
        'condicion_profesion': lc_condicion_profesion_grabar,
        'idcentrocosto': leer_id_centro_costo,
        'idcadena': leer_id_cadena,
        'meta': leer_meta,
        'plaza': leer_plaza,
        'tipo': leer_tipo_personal,
        'idunidad': leer_id_unidad,
        'idupss': leer_id_upss,
        'idespecialidad': leer_idespecialidad,
        'rne': leer_rne
    };
    $.ajax({
        data: dato_grabar_contrato_modificar,
        dataType: 'json',
        url: url + 'cas/modificar_registro_contrato_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_contratos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_contratos").html("");
            ver_contratos_personal_seleccion(leer_idpersonal);
            limpiar_etiquetas_agregar_contrato_nuevo();

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

function eliminar_registro_cas(leer_id_contrato) {
    "use strict";
    dato_grabar_contrato_eliminar = {
        'idcontrato': leer_id_contrato
    };
    $.ajax({
        data: dato_grabar_contrato_eliminar,
        dataType: 'json',
        url: url + 'cas/eliminar_registro_contrato_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_contratos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_contratos").html("");
            ver_contratos_personal_seleccion(leer_idpersonal);
            limpiar_etiquetas_agregar_contrato_nuevo();

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





function listar_carreras_profesion_total() {
    "use strict";
    dato_listar_carrera = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_carrera,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion_unido',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_profesion")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_profesion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slt_profesion").attr("disabled", true);
                }
            });
        }
    });

    $("#slt_profesion").select2({
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
    $('.crear-tooltip').tooltip();
    listar_todo_el_personal_cas(lc_buscar_nombre);
    inicializar_y_limpiar_botones_laboral();

    /*
    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            inicializar_y_limpiar_botones_laboral();
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            listar_todo_el_personal_cas(lc_buscar_nombre);
            $('#btn_agregar_cas').attr("disabled", false);

        });
    */

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
    $("#chk_debaja").on('change', function () {
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);
        }
    });


    $("#btn_agregar_contrato").click(function () {
        lc_tipo_operacion_contrato_cas = '1';
        limpiar_etiquetas_agregar_contrato_nuevo();
        $("#slc_condicion_laboral")
            .attr("disabled", false)
            .focus();
        $("#ruc").val(lc_mostrar_ruc);
    });


    $("#btn_modificar_contrato").click(function () {
        lc_tipo_operacion_contrato_cas = '2';
        desabilitar_etiquetas_para_edicion();
    });


    $("#slc_condicion_laboral").change(function () {
        leer_id_condicion_laboral = $('#slc_condicion_laboral  option:selected').attr('id');
        leer_nombre_condicion_laboral = $('#slc_condicion_laboral  option:selected').attr('descripcion');
        lc_verifica_ruc = $("#ruc").val().length;

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
                $("#ruc")
                    .attr("disabled", true);
                break;
            case '3':
                $("#msj_condicion_laboral").html('<center><font color="#E59600">Seleccione el lugar de origen</font></center>');
                $("#lugar_origen").text('Origen de destaque:');
                $("#lgr_origen_destaque").show();
                $("#ruc")
                    .attr("disabled", true);
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
                leer_id_renaes = '';
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
                if (lc_verifica_ruc === 0) {
                    $("#ruc")
                        .attr("disabled", false)
                        .focus();
                } else {
                    $("#ruc")
                        .attr("disabled", false);
                    $("#txt_nro_contrato")
                        .attr("disabled", false);
                    $("#txt_nro_proceso")
                        .attr("disabled", false)
                        .focus();
                }
                break;
        }
    });


    $("#txt_buscar_establecimiento").keyup(function () {
        lc_buscar_establecimiento = $("#txt_buscar_establecimiento").val();
        listar_establecimientos(lc_buscar_establecimiento);
        $("#txt_renaes").val('');
    });

    $("#slc_origen_destaque").change(function () {
        leer_id_renaes = $('#slc_origen_destaque  option:selected').attr('id');
        lid_nombre_destaque = $('#slc_origen_destaque  option:selected').attr('nombre');
        $("#txt_renaes").val(lid_nombre_destaque);
        $("#ruc")
            .attr("disabled", false);
        $("#txt_nro_proceso").attr("disabled", false);
        $("#txt_nro_contrato")
            .attr("disabled", false)
            .focus();


    });

    $("#ruc")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function (e) {
            $("#msj_estado").text('');
            if (e.which === 11) {}
        })
        .keyup(function () {
            if ($('#ruc').val().length === 11) {
                leer_ruc = $("#ruc").val();
                if (leer_ruc.substring(0, 1) === '1') {
                    validar_ruc_cas(leer_ruc);
                } else {
                    $("#msj_estado").html('<center><font size="-1" color="#D08800">Primer Digito debe iniciar con el Nro. 1</font></center>');
                    $("#txt_nro_proceso").attr("disabled", true);
                    $("#txt_nro_contrato").attr("disabled", true);
                }
            } else {
                $("#msj_estado").html('<center><font size="-1" color="#D08800">Complete 11(once) digitos del RUC, iniciando con el digito Nro. 1</font></center>');
            }
        });

    $("#txt_nro_proceso").keypress(function (e) {
        $('#txt_nro_contrato').attr("disabled", false);
        if (e.which === 13) {
            $('#txt_nro_contrato').focus();
        }
    });


    $("#txt_nro_contrato").keypress(function (e) {
        $('#fecha_inicio_contrato').attr("disabled", false);
        if (e.which === 13) {
            $('#fecha_inicio_contrato').focus();
        }
    });


    $('#fecha_inicio_contrato').change(function () {
        leer_ruc_contrato = $("#ruc").val();
        lc_fecha_inicio_contrato = $("#fecha_inicio_contrato").val();
        ver_fecha_inicio_contrato_que_no_se_repita(leer_ruc_contrato, lc_fecha_inicio_contrato);

    });

    $('#fecha_fin_contrato').change(function () {
        lc_fecha_inicio_contrato = convertir_fecha_caracter_a_date($("#fecha_inicio_contrato").val());
        lc_fecha_fin_contrato = convertir_fecha_caracter_a_date($("#fecha_fin_contrato").val());
        if (lc_fecha_fin_contrato > lc_fecha_inicio_contrato) {
            $("#msj_estado").html('');
            $("#sueldo")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_estado").html('<center><strong><font size="-1" color="#D08800">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#sueldo")
                .attr("disabled", true);
        }
    });

    $("#sueldo")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
        $("#slt_cargos")
            .attr("disabled", false);
        if (e.which === 13) {
            $("#slt_cargos")
                .attr("disabled", false)
                .focus();
        }
    });


    $("#slt_cargos").change(function () {
        leer_id_cargo = $('#slt_cargos option:selected').attr('id');
        lc_cargo = $('#slt_cargos option:selected').attr('cargo');
        lid_grupo = $('#slt_cargos option:selected').attr('id_grupo');
        lc_grupo = $('#slt_cargos option:selected').attr('grupo');
        $('#grupo_ocupacional').val(lc_cargo + ' -- ' + lc_grupo);
        $("#slt_profesion").attr("disabled", false);
    });


    $("#slt_profesion").change(function () {
        ln_id_profesion = $('#slt_profesion  option:selected').attr('id');
        lc_descripcion_profesion = $('#slt_profesion  option:selected').attr('descripcion');
        $("#descripcion_profesion").val(lc_descripcion_profesion);
        $("#slt_cadena_programatica").attr("disabled", false);
        $("#meta").attr("disabled", false);
        $("#plaza").attr("disabled", false);
        $("#tipo_de_labor_0").attr("disabled", false);
        $("#tipo_de_labor_1").attr("disabled", false);
        $("#condicion_1")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_2")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_3")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_4")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_5")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_6")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_7")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_8")
            .prop("checked", false)
            .attr("disabled", false);
        $("#condicion_0")
            .attr("disabled", false)
            .focus();


    });



    $("#condicion_0").click(function () {
        lc_condicion_profesion = 'E';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - ESTUDIANTE');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_1").click(function () {
        lc_condicion_profesion = 'G';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - EGRESADO');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_2").click(function () {
        lc_condicion_profesion = 'C';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - COMPLETA');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();
    });

    $("#condicion_3").click(function () {
        lc_condicion_profesion = 'I';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - INCOMPLETA');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();

    });

    $("#condicion_4").click(function () {
        lc_condicion_profesion = 'B';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - BACHILLER');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();

    });


    $("#condicion_5").click(function () {
        lc_condicion_profesion = 'T';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - TITULADO');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_6").click(function () {
        lc_condicion_profesion = 'M';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - MAESTRIA');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_7").click(function () {
        lc_condicion_profesion = 'D';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - DOCTORADO');
        $("#slt_cadena_programatica")
            .attr("disabled", false)
            .focus();
    });


    $("#condicion_8").click(function () {
        lc_condicion_profesion = 'O';
        $("#descripcion_profesion").val(lc_descripcion_profesion + ' - OTROS');
        $("#slt_asistencial")
            .attr("disabled", false)
            .focus();
    });



    $("#slt_cadena_programatica").change(function () {
        leer_id_cadena = $('#slt_cadena_programatica  option:selected').attr('id');
        lc_nombre_cadena = $('#slt_cadena_programatica  option:selected').attr('tarea');
        lc_actividad = $('#slt_cadena_programatica  option:selected').attr('actividad');
        $("#nombre_cadena_programatica").val(lc_actividad + ' -- ' + lc_nombre_cadena);
        $("#meta")
            .attr("disabled", false)
            .focus();
    });

    $("#meta").keypress(function (e) {
        $('#plaza').attr("disabled", false);
        if (e.which === 13) {
            $('#plaza').focus();
        }
    });

    $("#plaza").keypress(function (e) {
        $("#tipo_de_labor_0").attr("disabled", false);
        $("#tipo_de_labor_1").attr("disabled", false);
        if (e.which === 13) {
            $("#tipo_de_labor_1").focus();
        }
    });




    $("#tipo_de_labor_0").click(function () {
        leer_tipo_personal = 'S';
        $("#slt_unidad_organica").attr("disabled", false);
    });

    $("#tipo_de_labor_1").click(function () {
        leer_tipo_personal = 'A';
        $("#slt_unidad_organica").attr("disabled", false);
    });



    $("#slt_unidad_organica").change(function () {
        leer_id_unidad_organica = $('#slt_unidad_organica  option:selected').attr('id');
        leer_unidad_organica = $('#slt_unidad_organica  option:selected').attr('unidad_organica');
        leer_idorganica = $('#slt_unidad_organica  option:selected').attr('idorgano');
        leer_organo = $('#slt_unidad_organica  option:selected').attr('organo');
        $("#txt_unidad_organica").val(leer_unidad_organica);
        $("#txt_organo").val(leer_organo);


        $("#slt_servicio_cc").attr("disabled", false);
        $("#slt_servicio_upss").attr("disabled", false);
        $('#btn_grabar_contrato').attr("disabled", false);


        /*
        
        
        
        
        */





    });





    $("#slt_servicio_cc").change(function () {
        leer_id_centro_costo = $('#slt_servicio_cc  option:selected').attr('id');
        leer_centro_costo = $('#slt_servicio_cc  option:selected').attr('descripcion_centro_costo');
        leer_centro_subcosto = $('#slt_servicio_cc  option:selected').attr('descripcion_centro_subcosto');
        leer_trascosto = $('#slt_servicio_cc  option:selected').attr('descripcion_sub_trascosto');


        /*
               <span class="form-control bg-default">Centro de Costo : </span>
                <textarea name="txt_descripcion_cc" class="form-control" rows="3" disabled="disabled" id="txt_descripcion_cc"></textarea>
                <span class="form-control bg-default">Sub Costo : </span>
                <textarea name="txt_descripcion_sc" class="form-control" rows="3" disabled="disabled" id="txt_descripcion_sc"></textarea>
        
        */


        lc_agregar_trascosto = (leer_trascosto === '') ? '' : ' -- Tras Costo : ' + leer_trascosto;
        $("#txt_descripcion_cc").val(leer_centro_costo);
        $("#txt_descripcion_sc").val(leer_centro_subcosto);

        $("#slc_tipo_especialidad").attr("disabled", false);
        $('#btn_grabar_contrato').attr("disabled", false);

    });


    $("#slt_servicio_upss").change(function () {
        leer_id_upss = $('#slt_servicio_upss  option:selected').attr('id');
        leer_upss = $('#slt_servicio_upss  option:selected').attr('descripcion');
        $("#txt_descripcion_upss").val('UPSS: ' + leer_upss);
        $("#slc_tipo_especialidad").attr("disabled", false);
        $('#btn_grabar_contrato').attr("disabled", false);
    });




    $("#slc_tipo_especialidad").change(function () {
        leer_idespecialidad = $('#slc_tipo_especialidad  option:selected').attr('id');
        leer_idespecialidad_nuevo = $('#slc_tipo_especialidad  option:selected').attr('id');
        lc_descripcion_especialidad = $('#slc_tipo_especialidad  option:selected').attr('descripcion');
        lc_codigo_colegio = $('#slc_tipo_especialidad  option:selected').attr('codigo_colegio');
        lc_nombre_colegio = $('#slc_tipo_especialidad  option:selected').attr('colegio');
        $('#txt_descripcion_especialidad')
            .val(lc_descripcion_especialidad + ' - ' + lc_nombre_colegio)
            .attr("disabled", true);
        $("#rne").attr("disabled", false);
    });

    $('#btn_grabar_contrato').click(function () {
        // leer_id_contrato, leer_id_personal,  leer_id_condicion_laboral, leer_id_renaes
        leer_idpersonal = $('#select_personal_cas_existente  option:selected').attr('id');
        leer_id_personal = leer_idpersonal;
        leer_ruc_contrato = $("#ruc").val();
        leer_nro_proceso = $("#txt_nro_proceso").val();
        leer_nro_contrato = $("#txt_nro_contrato").val();
        leer_fecha_ingreso_contrato = $("#fecha_inicio_contrato").val();
        leer_fecha_termino_contrato = $("#fecha_fin_contrato").val();
        leer_sueldo = $("#sueldo").val();
        //leer_id_cargo,  leer_id_cadena 
        leer_meta = $("#meta").val();
        leer_plaza = $("#plaza").val();
        // leer_tipo_personal, leer_id_unidad
        leer_rne = $("#rne").val();

        // leer_id_profesion_para_grabar, leer_servicio_cc_para_grabar, leer_id_upss_para_grabar, leer_uo_para_grabar



        leer_id_profesion_para_grabar = $('#slt_profesion  option:selected').attr('id');
        leer_servicio_cc_para_grabar = $('#slt_servicio_cc  option:selected').attr('id');
        leer_id_upss_para_grabar = $('#slt_servicio_upss  option:selected').attr('id');
        leer_uo_para_grabar = $('#slt_unidad_organica  option:selected').attr('id');
        // leer_condicion_profesion = lc_condicion_profesion;


        // leer_id_unidad_organica,       leer_id_centro_costo, leer_idespecialidad

        if (lc_tipo_operacion_contrato_cas === '1') {
            // leer_idespecialidad = (leer_idespecialidad_nuevo === 'undefined') ? '' : leer_idespecialidad_nuevo;

            // ln_id_profesion, lc_condicion_profesion
            //  ln_id_profesion = $('#slt_profesion  option:selected').attr('id');


            leer_idprofesion = (leer_id_profesion_para_grabar === 'undefined') ? '1' : ln_id_profesion;
            lc_condicion_profesion = (lc_condicion_profesion === 'undefined') ? 'O' : lc_condicion_profesion;





            leer_id_unidad_organica = (leer_uo_para_grabar === 'undefined') ? '' : leer_id_unidad_organica;


            leer_id_centro_costo = (leer_servicio_cc_para_grabar === 'undefined') ? '' : leer_servicio_cc_para_grabar;


            leer_id_upss = (leer_id_upss_para_grabar === 'undefined') ? '' : leer_id_upss_para_grabar;


            var leer_idespecialidad_para_grabar = $('#slc_tipo_especialidad  option:selected').attr('id');
            leer_idespecialidad = (leer_idespecialidad_para_grabar === 'undefined') ? '' : leer_idespecialidad_para_grabar;


            grabar_registro_nuevo_contrato(leer_id_personal, leer_id_condicion_laboral, leer_id_renaes, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_sueldo, leer_id_cargo, leer_id_cadena, leer_meta, leer_plaza, leer_tipo_personal, leer_idprofesion, lc_condicion_profesion, leer_id_unidad_organica, leer_id_centro_costo, leer_id_upss, leer_idespecialidad, leer_rne);
        } else {

            leer_idprofesion = (leer_idprofesion === '') ? '1' : leer_idprofesion;
            leer_idprofesion_grabar = (typeof leer_id_profesion_para_grabar === 'undefined') ? leer_idprofesion : ln_id_profesion;

            leer_condicion_profesion = (leer_condicion_profesion === '') ? 'O' : leer_condicion_profesion;
            lc_condicion_profesion_grabar = (typeof lc_condicion_profesion === 'undefined') ? leer_condicion_profesion : lc_condicion_profesion;





            leer_id_centro_costo = (typeof leer_id_centro_costo === 'undefined') ? leer_idcentrocosto : leer_id_centro_costo;


            //    leer_id_centro_costo = $('#slt_servicio_cc  option:selected').attr('id');
            // leer_servicio_cc_para_grabar

            leer_idupss = (leer_idupss === '') ? '1' : leer_idupss;
            leer_id_upss = (typeof leer_id_upss_para_grabar === 'undefined') ? leer_idupss : leer_id_upss_para_grabar;


            leer_id_unidad = (typeof leer_id_unidad_organica === 'undefined') ? leer_id_unidad : leer_id_unidad_organica;



            grabar_edicion_nuevo_contrato(leer_id_contrato, leer_id_condicion_laboral, leer_id_renaes, leer_ruc_contrato, leer_nro_proceso, leer_nro_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_sueldo, leer_id_cargo, leer_idprofesion_grabar, lc_condicion_profesion_grabar, leer_id_centro_costo, leer_id_cadena, leer_meta, leer_plaza, leer_tipo_personal, leer_id_unidad, leer_id_upss, leer_idespecialidad, leer_rne);



        }
    });



    $("#btn_eliminar_contrato").click(function () {
       // eliminar_registro_cas(leer_id_contrato);
	   alert("Eliminar");
	   

    });




});



/*
 leer_idprofesion = $('#slt_contratos_seleccion  option:selected').attr('idprofesion');
        leer_nombre_profesion = $('#slt_contratos_seleccion  option:selected').attr('nombre_profesion');
        leer_condicion_profesion = $('#slt_contratos_seleccion  option:selected').attr('condicion_profesion');
        leer_descripcion_condicion_profesion = $('#slt_contratos_seleccion  option:selected').attr('descripcion_condicion_profesion');
        leer_id_unidad = $('#slt_contratos_seleccion  option:selected').attr('idunidad');
        leer_unidad_organica = $('#slt_contratos_seleccion  option:selected').attr('unidad_organica');
        leer_organo = $('#slt_contratos_seleccion  option:selected').attr('organo');
        
        leer_idcentrocosto = $('#slt_contratos_seleccion  option:selected').attr('idcentrocosto');
        leer_descripcion_cc = $('#slt_contratos_seleccion  option:selected').attr('descripcion_cc');
        leer_descripcion_centro_sub_costo = $('#slt_contratos_seleccion  option:selected').attr('descripcion_centro_sub_costo');
        leer_descripcion_centro_sub_trascosto = $('#slt_contratos_seleccion  option:selected').attr('descripcion_centro_sub_trascosto');
        leer_idupss = $('#slt_contratos_seleccion  option:selected').attr('idupss');
        leer_descripcion_upss = $('#slt_contratos_seleccion  option:selected').attr('descripcion_upss');
        

*/
