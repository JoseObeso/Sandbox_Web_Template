var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_nombre = '',
    datos_buscar_cas, datos_estadistica, cantidad_registros, valor_final, datos_buscar_cas_cero, valor_final, cantidad_registros, i, nro_registros, lc_buscar_nombre, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_direccion, cantidad_registros, leer_nombre_pais, leer_nombre_documento, leer_idpersonal, leer_nombre_pais, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_departamento, leer_provincia, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, lc_ver_si_se_selecciono, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, leer_idpersonal, leer_nombre_pais, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_estado_civil, leer_departamento, leer_provincia, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, leer_idtipoe, leer_nombre_tipoeducacion, lc_tipo_operacion_educacion, lc_fecha_desde, lc_fecha_hasta, leer_condicion_estudios, lc_id_universidad, lc_nombre_universidad, lc_id_cargo, lc_cargo, lid_grupo, lc_grupo, leer_fecha_desde, leer_fecha_hasta, leer_institucion, leer_status, leer_observacion, leer_iduniversidad, dato_listar_educacion, cantidad_registros, separar_fechas, fecha_conforme, dato_listar_universidad, dato_listar_cargos, datos_grabar_educacion, lc_ver_si_se_selecciono_educacion, leer_grupo_ocupacional, leer_ideducacion, leer_descripcion_educacion, leer_profesion, datos_grabar_educacion_mod, datos_eliminar, lc_ver_institucion, dato_actualizar_colegios, dato_listar_carrera, ln_idenficador_carrera, lc_ver_si_tiene_id, ln_id_carrera, lc_descripcion_carrera, ln_codigo_colegio, lc_descripcion_colegio, lc_nro_colegio, ln_codigo_colegio, lc_descripcion_colegio, leer_nro_colegiatura, leer_idcolegio, leer_nombre_colegio, leer_nro_colegio, ln_idenficador_habilidad, lc_ver_si_tiene_id, lc_fecha_inicio_habilidad, lc_fecha_fin_habilidad, lc_nro_habilidad, lc_tipo_operacion_habilidad, dato_listar_carrera, leer_institucion_mantener, lc_fecha_inicio, datos_buscar_habilidad_fin, lc_fecha_fin, lc_fecha_inicio_comparar, lc_fecha_fin_comparar, datos_de_grabacion_habilidad, dato_ver_habilidad, ln_idenficador_habilidad, lc_ver_si_tiene_id, datos_eliminar_habil_cas, dato_ver_especialidad, lc_tipo_table, datos_eliminar_especialidad, lc_tipo_table_cm, dato_ver_especialidad_cm, lc_fecha_inicio_comparar_compe, lc_fecha_fin_comparar_compe, ln_idcompetencias, lc_descripcion_competencias, lc_fecha_inicio_competencia, lc_fecha_inicio_comparar_compe, lc_fecha_fin_comparar_compe, leer_ideecc_c, lc_ver_si_se_selecciono_ideecc_c, leer_ideecc_c, leer_nro_ideecc_c, leer_descripcion_c, leer_nro_eecc_c, leer_inicio_espe_c, leer_fin_espe_c, leer_institucion_c, leer_observacion_c, dato_ver_persona_ca,  lc_tipo_table_ca, dato_ver_persona_ca, datos_eliminar_capa, datos_eliminar_capa, dato_ver_persona_entre;

// select_personal_cas_existente

function limpiar_y_desabilitar_etiquetas_educacion() {
    "use strict";
    listar_tipos_de_educacion();
    $("#slt_tipo_educacion").attr("disabled", true);
    $("#tipo_estudio").text('');
    $("#Condicion_0")
        .attr("disabled", true)
        .prop("checked", false);
    $("#Condicion_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#Condicion_2")
        .attr("disabled", true)
        .prop("checked", false);
    $("#Condicion_3")
        .attr("disabled", true)
        .prop("checked", false);
    $("#fecha_desde")
        .val('')
        .attr("disabled", true);
    $("#fecha_desde").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio"
    });

    $("#fecha_hasta")
        .val('')
        .attr("disabled", true);
    $("#fecha_hasta").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Fin"
    });
    $("#descripcion_centro_estudios")
        .text('');

    $("#grupo_ocupacional").val('');


    $("#txt_educacion_no_universitaria")
        .val('')
        .attr("disabled", true);

    $("#contiene_universidad").hide();
    $("#slc_lista_universidad").hide();
    $('#slc_lista_universidad').select2('close');
    $("#txt_descripcion_universidad").hide();
    listar_universidades();
    listar_de_cargos();
    $("#txt_status_estudio")
        .val('')
        .attr("disabled", true);
    $("#observacion")
        .val('')
        .attr("disabled", true);

    $("#slc_colegios_profesionales")
        .attr("disabled", true);

    $("#nro_colegiatura")
        .val('')
        .attr("disabled", true);


    // slc_colegios_profesionales, nro_colegiatura



    $("#btn_grabar_educacion")
        .attr("disabled", true);
    listar_carreras_profesion();
    listar_colegios_profesionales();


}






function desabilitar_para_edicion_educacion() {
    "use strict";
    listar_tipos_de_educacion();
    $("#slt_tipo_educacion").attr("disabled", false);
    $("#Condicion_0")
        .attr("disabled", false)

    $("#Condicion_1")
        .attr("disabled", false)

    $("#Condicion_2")
        .attr("disabled", false)

    $("#Condicion_3")
        .attr("disabled", false)

    $("#fecha_desde")
        .attr("disabled", false);
    $("#fecha_desde").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio"
    });

    $("#fecha_hasta")
        .attr("disabled", false);
    $("#fecha_hasta").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Fin"
    });


    if (leer_idtipoe === '4' || leer_idtipoe === '11' || leer_idtipoe === '12') {
        $("#contiene_universidad").show();
        $("#txt_descripcion_universidad").show();
        $("#txt_educacion_no_universitaria")
            .attr("disabled", false)
            .hide();
        $("#slc_lista_universidad").show();
        // $('#slc_lista_universidad').select2('open');

        $("#slc_colegios_profesionales")
            .attr("disabled", false);

        $("#nro_colegiatura").attr("disabled", false);





    } else {
        $("#contiene_universidad").hide();
        $("#slc_lista_universidad").hide();
        $('#slc_lista_universidad').select2('close');
        $("#txt_descripcion_universidad").hide();
        $("#slc_colegios_profesionales")
            .attr("disabled", true);

        $("#nro_colegiatura").attr("disabled", true);


        $("#txt_educacion_no_universitaria")
            .attr("disabled", false)
            .show()
            .focus();
    }




    listar_universidades();
    listar_de_cargos();
    $("#txt_status_estudio")
        .attr("disabled", false);
    $("#observacion")
        .attr("disabled", false);
    $("#btn_grabar_educacion")
        .attr("disabled", false);





}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_todo_el_personal_cas(lc_buscar_nombre);
    limpiar_y_desabilitar_etiquetas_educacion();

    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {

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
    $("#slt_educacion_seleccion")
        .click(function () {
            leer_educacion_y_mostrarlo_etiquetas();
        })
        .keyup(function () {
            leer_educacion_y_mostrarlo_etiquetas();
        });
    $("#chk_debaja").on('change', function () {
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);
        }
    });



    $("#btn_agregar_educacion").click(function () {
        lc_tipo_operacion_educacion = '1';
        limpiar_y_desabilitar_etiquetas_educacion();
        $("#slt_tipo_educacion")
            .attr("disabled", false)
            .focus();
    });

    $("#btn_modificar_educacion").click(function () {
        lc_tipo_operacion_educacion = '2';
        desabilitar_para_edicion_educacion();
        $("#slt_tipo_educacion")
            .attr("disabled", false)
            .focus();
    });

    $("#btn_eliminar_educacion").click(function () {
        eliminar_registro_educacion(leer_ideducacion);


    });


    $("#slt_tipo_educacion").change(function () {
        leer_idtipoe = $('#slt_tipo_educacion  option:selected').attr('id');
        leer_nombre_tipoeducacion = $('#slt_tipo_educacion  option:selected').attr('nombre');
        $("#descripcion_centro_estudios").text('Institución : ' + leer_nombre_tipoeducacion);

        if (leer_idtipoe === '4' || leer_idtipoe === '11' || leer_idtipoe === '12') {
            $("#contiene_universidad").show();
            $("#txt_descripcion_universidad").show();
            $("#txt_educacion_no_universitaria")
                .attr("disabled", false)
                .hide();
            $("#slc_lista_universidad").show();
            // $('#slc_lista_universidad').select2('open');

            $("#slc_colegios_profesionales")
                .attr("disabled", false);

            $("#nro_colegiatura").attr("disabled", false);

        } else {
            $("#contiene_universidad").hide();
            $("#slc_lista_universidad").hide();
            $('#slc_lista_universidad').select2('close');
            $("#txt_descripcion_universidad").hide();
            $("#slc_colegios_profesionales")
                .attr("disabled", true);
            $("#nro_colegiatura").attr("disabled", true);
            $("#txt_educacion_no_universitaria")
                .attr("disabled", false)
                .show()
                .focus();
        }




        $("#fecha_desde")
            .attr("disabled", false)
            .focus();

    });



    $("#fecha_desde").change(function () {
        $("#fecha_hasta")
            .attr("disabled", false)
            .focus();

    });


    $("#fecha_hasta").change(function () {
        lc_fecha_desde = convertir_fecha_caracter_a_date($("#fecha_desde").val());
        lc_fecha_hasta = convertir_fecha_caracter_a_date($("#fecha_hasta").val());
        if (lc_fecha_hasta > lc_fecha_desde) {
            $("#tipo_estudio").html('');
            $("#Condicion_0")
                .attr("disabled", false);
            $("#Condicion_1")
                .attr("disabled", false);
            $("#Condicion_2")
                .attr("disabled", false);
            $("#Condicion_3")
                .attr("disabled", false)
                .focus();
        } else {
            $("#tipo_estudio").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#Condicion_0")
                .attr("disabled", true);
            $("#Condicion_1")
                .attr("disabled", true);
            $("#Condicion_2")
                .attr("disabled", true);
            $("#Condicion_3")
                .attr("disabled", true);
        }
    });



    $("#Condicion_0").click(function () {
        leer_condicion_estudios = 'E';
        condicion_tipo_educacion();
    });

    $("#Condicion_1").click(function () {
        leer_condicion_estudios = 'G';
        condicion_tipo_educacion();
    });

    $("#Condicion_2").click(function () {
        leer_condicion_estudios = 'C';
        condicion_tipo_educacion();
    });

    $("#Condicion_3").click(function () {
        leer_condicion_estudios = 'I';
        condicion_tipo_educacion();
    });


    $('#slc_lista_universidad').change(function () {
        lc_id_universidad = $('#slc_lista_universidad option:selected').attr('id');
        lc_nombre_universidad = $('#slc_lista_universidad option:selected').attr('nombre');
        $('#txt_descripcion_universidad').val(lc_nombre_universidad);
        $("#slt_cargos").attr("disabled", false);

    });

    $("#txt_educacion_no_universitaria")
        .keypress(function (e) {
            $('#slt_cargos').attr("disabled", false);
            if (e.which === 13) {
                $('#slt_cargos').focus();
            }

        });

    $("#slt_cargos").change(function () {
        lc_id_cargo = $('#slt_cargos option:selected').attr('id');
        lc_cargo = $('#slt_cargos option:selected').attr('cargo');
        lid_grupo = $('#slt_cargos option:selected').attr('id_grupo');
        lc_grupo = $('#slt_cargos option:selected').attr('grupo');
        $('#grupo_ocupacional').val(lc_grupo);
        $("#btn_grabar_educacion")
            .attr("disabled", false);
        $("#txt_status_estudio")
            .attr("disabled", false)
            .focus();
    });





    $("#txt_status_estudio")
        .keypress(function (e) {
           $('#observacion').attr("disabled", false);
            if (e.which === 13) {
            $('#observacion').attr("disabled", false);
            }

        });






    $("#slc_colegios_profesionales").change(function () {
        ln_codigo_colegio = $('#slc_colegios_profesionales  option:selected').attr('codigo');
        lc_descripcion_colegio = $('#slc_colegios_profesionales  option:selected').attr('descripcion');
        $('#observacion').attr("disabled", false);
        $("#nro_colegiatura")
            .on('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            })
            .attr("disabled", false)
            .focus();

    });



    // leer_fecha_desde, leer_fecha_hasta, leer_institucion, leer_status, leer_observacion 

    $('#btn_grabar_educacion').click(function () {
        // leer_idtipoe
        leer_fecha_desde = $("#fecha_desde").val();
        leer_fecha_hasta = $("#fecha_hasta").val();
        // leer_condicion_estudios
        if (leer_idtipoe === '4' || leer_idtipoe === '11' || leer_idtipoe === '12') {
            lc_id_universidad = $('#slc_lista_universidad option:selected').attr('id');
            leer_institucion = $('#slc_lista_universidad option:selected').attr('nombre');
            // ln_codigo_colegio,leer_nro_colegiatura
            leer_nro_colegiatura = $("#nro_colegiatura").val();

        } else {
            lc_id_universidad = '';
            leer_institucion = $("#txt_educacion_no_universitaria").val();
            ln_codigo_colegio = '';
            leer_nro_colegiatura = '';

        }
        //  lc_id_cargo
        leer_status = $("#txt_status_estudio").val();
        leer_observacion = $("#observacion").val();


        if (lc_tipo_operacion_educacion === '1') {
            grabar_registro_educacion(leer_idpersonal, leer_idtipoe, leer_fecha_desde, leer_fecha_hasta, leer_condicion_estudios, lc_id_universidad, leer_institucion, lc_id_cargo, leer_status, ln_codigo_colegio, leer_nro_colegiatura, leer_observacion);

        } else {

            lc_ver_institucion = (typeof leer_institucion === 'undefined') ? leer_institucion_mantener : leer_institucion;
            modificar_registro_educacion(leer_idpersonal, leer_idtipoe, leer_fecha_desde, leer_fecha_hasta, leer_condicion_estudios, lc_id_universidad, lc_ver_institucion, lc_id_cargo, leer_status, ln_codigo_colegio, leer_nro_colegiatura, leer_observacion, leer_ideducacion);

        }

    });







});
