var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lid_pais = '174',
    datos_buscar, datos_grabar, datos_eliminar, datos_habilitar, nro_registros, dato_consultar, lc_buscar_nombre, leer_id, leer_nro_documento, leer_apellido_casada, leer_nro_contrato, leer_nro_proceso, lid_pais, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_direccion, lc_sexo, leer_celular, lc_descripcion_documento, ln_id_documento, cantidad_registros, dato_listar, lc_id_departamento, lc_id_departamento, lc_id_provincia, lc_id_distrito, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, dato_actualizar_colegios, leer_id_colegio, leer_nombre_colegio, ln_id_especialidad, lc_descripcion_especialidad, lc_codigo_colegio, lc_nombre_colegio, leer_nombre_pais, leer_idpais, leer_tipo_documento, leer_nombre_documento, leer_nombre_sexo, leer_id_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_ruc_contrato, leer_sueldo_contrato, lc_idunidadorganica, lc_unidad_organica, lc_idorgano, lc_organo, leer_id_departamento, leer_nombre_departamento, leer_id_provincia, leer_nombre_provincia, leer_id_distrito, leer_nombre_distrito, leer_correo_electronico, leer_telefono_fijo, leer_celular_emergencia, leer_observacion, leer_nombre_estado, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, leer_estado, lc_tipo_operacion_datos_personales, lc_nombre_encontrado, leer_ruc, leer_sexo;


function leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    datos_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: datos_buscar,
        dataType: 'json',
        url: url + 'personal/buscar_por_nombre_tercero',
        type: 'post',
        beforeSend: function () {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#espera_proceso_datos_personales_terceros").html('');
            $("#select_personal_existente").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#select_personal_existente").append('<option value="' + filas.idtercero + '"  id = "' + filas.idtercero +
                            '" idpais = "' + filas.idpais +
                            '" nombre_pais = "' + filas.nombre_pais +
                            '" tipo_documento = "' + filas.tipo_documento +
                            '" nro_documento = "' + filas.nro_documento +
                            '" nombre_documento = "' + filas.nombre_documento +
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

                            '"  >' + filas.apellidosnombres + '</option>');
                        $("#select_personal_existente").attr("disabled", false);
                        $("#total_registrados").html(nro_registros);


                    } else {
                        $("#select_personal_existente").attr("disabled", true);
                        $("#select_personal_existente").empty();
                        $("#total_registrados").html('0');

                    }

                });
            } else {
                $("#select_personal_existente").empty();
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
    lc_buscar_nombre = '';
    leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre);
}

function leer_personal_tercero_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#select_personal_existente  option:selected').attr('id');
    leer_idpais = $('#select_personal_existente  option:selected').attr('idpais');
    leer_nombre_pais = $('#select_personal_existente  option:selected').attr('nombre_pais');
    leer_tipo_documento = $('#select_personal_existente  option:selected').attr('tipo_documento');
    leer_nro_documento = $('#select_personal_existente  option:selected').attr('nro_documento');
    leer_nombre_documento = $('#select_personal_existente  option:selected').attr('nombre_documento');
    leer_ruc = $('#select_personal_existente  option:selected').attr('ruc');
    leer_sexo = $('#select_personal_existente  option:selected').attr('sexo');
    leer_nombre_sexo = $('#select_personal_existente  option:selected').attr('nombre_sexo');
    leer_paterno = $('#select_personal_existente  option:selected').attr('paterno');
    leer_materno = $('#select_personal_existente  option:selected').attr('materno');
    leer_apellido_casada = $('#select_personal_existente  option:selected').attr('apellido_casada');
    leer_nombres = $('#select_personal_existente  option:selected').attr('nombres');
    leer_apellidos_nombres = $('#select_personal_existente  option:selected').attr('apellidos_nombre');
    leer_fecha_nacimiento = $('#select_personal_existente  option:selected').attr('fecha_nacimiento');
    leer_edad = $('#select_personal_existente  option:selected').attr('edad');
    leer_id_departamento = $('#select_personal_existente  option:selected').attr('iddepartamento');
    leer_nombre_departamento = $('#select_personal_existente  option:selected').attr('nombre_departamento');
    leer_id_provincia = $('#select_personal_existente  option:selected').attr('idprovincia');
    leer_nombre_provincia = $('#select_personal_existente  option:selected').attr('nombre_provincia');
    leer_id_distrito = $('#select_personal_existente  option:selected').attr('iddistrito');
    leer_nombre_distrito = $('#select_personal_existente  option:selected').attr('nombre_distrito');
    leer_direccion = $('#select_personal_existente  option:selected').attr('direccion');
    leer_correo_electronico = $('#select_personal_existente  option:selected').attr('correo_electronico');
    leer_telefono_fijo = $('#select_personal_existente  option:selected').attr('telefono_fijo');
    leer_celular = $('#select_personal_existente  option:selected').attr('celular');
    leer_celular_emergencia = $('#select_personal_existente  option:selected').attr('celular_emergencia');
    leer_observacion = $('#select_personal_existente  option:selected').attr('observacion');
    leer_estado = $('#select_personal_existente  option:selected').attr('estado');
    leer_nombre_estado = $('#select_personal_existente  option:selected').attr('nombre_estado');
    leer_usuario_registro = $('#select_personal_existente  option:selected').attr('usuario');
    leer_fecha_registro = $('#select_personal_existente  option:selected').attr('fecha_registro');
    leer_usuario_modifico = $('#select_personal_existente  option:selected').attr('usuario_modifico');
    leer_fecha_modifico = $('#select_personal_existente  option:selected').attr('fecha_modifico');
    leer_usuario_de_baja = $('#select_personal_existente  option:selected').attr('usuario_debaja');
    leer_fecha_de_baja = $('#select_personal_existente  option:selected').attr('fecha_debaja');

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
            .text(leer_nombre_estado)
            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
        $("#nombre_estado_servicio")
            .text(leer_nombre_estado)
            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");
        $("#nombre_estado_carrera")
            .text(leer_nombre_estado)
            .removeClass("form-control alert-warning ").addClass("form-control alert-info text-secondary initialism");

    } else {
        $("#nombre_estado")
            .text(leer_nombre_estado)
            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
        $("#nombre_estado_servicio")
            .text(leer_nombre_estado)
            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");
        $("#nombre_estado_carrera")
            .text(leer_nombre_estado)
            .removeClass("form-control alert-info ").addClass("form-control alert-warning text-secondary initialism");

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
    $("#btn_agregar_adenda").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", false);
    $("#btn_eliminar_contrato").attr("disabled", false);
    $("#btn_modificar_adenda").attr("disabled", true);
    $("#btn_eliminar_adenda").attr("disabled", true);
    $("#contenedor-contratos").show();
    $("#contenedor_adendas").hide();

}


function listar_departamentos() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_todos_los_departamentos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_departamento").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_departamento").append('<option id="' + filas.codigo_departamento + '"  nombre = "' + filas.nombre_departamento + '"  >' + filas.nombre_departamento + '</option>');
                    $("#slc_departamento").attr("disabled", true);

                } else {
                    $("#slc_departamento").attr("disabled", true);
                }

            });

        }
    });

    /*
      $("#slc_departamento").select2({
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
    
    
    */

}

function listar_todas_las_provincias_de_un_departamento(lc_id_departamento) {
    "use strict";
    dato_listar = {
        "id": lc_id_departamento
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_solo_las_provincias',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_provincia")
                .html('')
                .show()
                .append('<option id=0 > Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_provincia").append('<option id="' + filas.codigo_provincia + '"  nombre = "' + filas.nombre_provincia + '"  >' + filas.nombre_provincia + '</option>');
                    $("#slc_provincia").attr("disabled", false);
                } else {
                    $("#slc_provincia").attr("disabled", true);
                }
            });
        }
    });
    /*
    
      $("#slc_provincia").select2({
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

    */


}

function listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia) {
    "use strict";
    dato_listar = {
        "id_depar": lc_id_departamento,
        "id_provin": lc_id_provincia
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_solo_los_distritos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_distrito")
                .html('')
                .show()
                .append('<option id=0 > Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_distrito").append('<option id="' + filas.codigo_distrito + '"  nombre = "' + filas.nombre_distrito + '"  >' + filas.nombre_distrito + '</option>');
                    $("#slc_distrito").attr("disabled", false);
                } else {
                    $("#slc_distrito").attr("disabled", true);
                }
            });
        }
    });

    /*
    $("#slc_distrito").select2({
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

*/



}

function listar_carreras_profesion() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_carrera")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_carrera").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_carrera").attr("disabled", true);
                } else {
                    $("#slt_carrera").attr("disabled", true);
                }
            });
        }
    });



    $("#slt_carrera").select2({
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
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_colegios_profesionales")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_colegios_profesionales").append('<option value="' + filas.codigo + '"  codigo = "' + filas.codigo + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  >' + filas.codigo_minsa + '  -  ' + filas.descripcion + '</option>');
                    $("#slc_colegios_profesionales").attr("disabled", true);

                } else {
                    $("#slc_colegios_profesionales").attr("disabled", true);
                }

            });

        }
    });

    $("#slc_colegios_profesionales").select2({
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
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicio_upss").append('<option id="' + filas.idunidadorganica + '"  unidad_organica = "' + filas.unidad_organica + '"  idorgano = "' + filas.idorgano + '"  organo = "' + filas.organo + '"  >' + filas.unidad_organica + '</option>');
                    $("#slt_servicio_upss").attr("disabled", false);

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
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_especialidad").append('<option id="' + filas.id + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  codigo_colegio = "' + filas.codigo_colegio + '"  colegio= "' + filas.colegio + '"  >' + filas.descripcion + '</option>');
                    $("#slc_tipo_especialidad").attr("disabled", false);
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
    $("#slt_tipo_documento").append('option id="0">Seleccione :</option>');
    $("#slt_sexo").append('option id="0">Seleccione :</option>');
    listar_departamentos();
    lc_id_departamento = '0';
    lc_id_provincia = '0';
    listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
    listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
    $("#sexo_registrado").text('');

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

function valida_ingreso_dni()

{
    "use strict";

    if (lc_tipo_operacion_datos_personales === '1') {
        leer_nro_documento = $("#txt_nro_documento").val();
        if (leer_nro_documento.length === 0) {
            $("#ver_existe_documento").html('<CENTER><strong><font size="-1" color="#EF6000" > --- NRO. DOCUMENTO VACIO --- </font></strong></CENTER>');
        } else {
            valida_nro_documento_si_existe(leer_nro_documento);
        }
    } else {
        $("#slt_sexo").attr("disabled", false);
        $("#txt_paterno").attr("disabled", false);

    }




}

function valida_nro_documento_si_existe(leer_nro_documento) {
    "use strict";
    dato_consultar = {
        "id": leer_nro_documento
    };

    $.ajax({
        data: dato_consultar,
        dataType: 'json',
        url: url + 'personal/verificar_si_existe_nro_documento',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    lc_nombre_encontrado = filas.apellidos_nombres;
                    $("#ver_existe_documento").html('<center><font size="-1" color="#EF6000">Nro, YA EXISTE: ' + lc_nombre_encontrado + ' </font></center>');
                    $("#slt_sexo").attr("disabled", true);
                    $("#txt_paterno").attr("disabled", true);
                } else {
                    $("#ver_existe_documento").html('');
                    $("#ver_existe_documento").html('<center><font size="-1" color="#0041F1" > Continue registrando... </font></center>');
                    $("#slt_sexo")
                        .attr("disabled", false)
                        .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
                    $("#txt_paterno").attr("disabled", true);

                }

            });

        }
    });

}



function desabilitar_input_text_identificacion_personal() {
    "use strict";
    $("#slt_pais").attr("disabled", true);
    $("#msj_confirmacion_eliminar").html('');
    $("#slt_tipo_documento")
        .attr("disabled", true)
        .append('option id="0">Seleccione :</option>');
    $("#slt_sexo")
        .attr("disabled", true)
        .append('option id="0">Seleccione :</option>');
    $("#txt_nro_documento").attr("disabled", true);
    listar_departamentos();
    lc_id_departamento = '0';
    lc_id_provincia = '0';
    listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
    listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
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
    $("#observacion").attr("disabled", true);
    $("#ruc").attr("disabled", true);
    $("#btn_modificar_tercero").attr("disabled", true);
    $("#btn_eliminar_tercero").attr("disabled", true);
    $("#btn_habilitar_tercero").attr("disabled", true);
    $("#btn_grabar_datos_personales").attr("disabled", true);
    $("#ver_existe_documento").html('');
    lc_buscar_nombre = '';
    leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre);
    $("#espera_proceso_datos_personales_terceros").empty();
    $("#btn_grabar_datos_personales").focus();
}

function grabar_registro_personal_tercero(lid_pais, ln_id_documento, leer_nro_documento, lc_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, lc_id_departamento, lc_id_provincia, lc_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion)

{
    "use strict";
    datos_grabar = {
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
        data: datos_grabar,
        dataType: 'json',
        url: url + 'personal/grabar_registro_personal_tercero_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#espera_proceso_datos_personales_terceros").html('');
            desabilitar_input_text_identificacion_personal();
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
    $("#slc_departamento").attr("disabled", false);
    $("#slc_provincia").attr("disabled", false);
    $("#slc_distrito").attr("disabled", false);
    $("#slc_distrito").attr("disabled", false);
    $("#btn_grabar_datos_personales").attr("disabled", false);


}


function grabar_modificacion_registros_personal(lid_pais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_id_departamento, leer_id_provincia, leer_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion, leer_id) {
    "use strict";

    datos_grabar = {
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
        data: datos_grabar,
        dataType: 'json',
        url: url + 'personal/grabar_modificacion_personal_tercero_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#espera_proceso_datos_personales_terceros").html('');
            desabilitar_input_text_identificacion_personal();
        },

        error: function (jqXHR, textStatus, errorThrown) {
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
    datos_eliminar = {
        'id' : leer_id
    };
    
    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'personal/dar_de_baja_personal_tercero',
        type: 'post',
        beforeSend: function () {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            inicializar_botones_identificacion_personal();
            limpiar_todas_las_etiquetas_identificacion_personal();
            desabilitar_input_text_identificacion_personal();
            $("#msj_confirmacion_eliminar").html('<center><font color="#F40000" size = "2"> *** Personal Eliminado o dado de baja ***</font></center>');
        }
    });
    
    
}


function habilitar_personal_tercero(leer_id)
{
    "use strict";
    datos_habilitar = {
        'id' : leer_id
    };
    
    $.ajax({
        data: datos_habilitar,
        dataType: 'json',
        url: url + 'personal/personal_habilitado_tercero',
        type: 'post',
        beforeSend: function () {
            $("#espera_proceso_datos_personales_terceros").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            inicializar_botones_identificacion_personal();
            limpiar_todas_las_etiquetas_identificacion_personal();
            desabilitar_input_text_identificacion_personal();
            $("#msj_confirmacion_eliminar").html('<center><font color="#0032F4" size = "2"> *** Personal Fue Habilitado o Activo ***</font></center>');
        }
    });

    
    
}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_botones_identificacion_personal();
    listar_departamentos();
    listar_carreras_profesion();
    listar_de_cargos();
    listar_colegios_profesionales();
    listar_unidad_organica_de_organo();
    listar_tipos_especialidad();

    $("#slt_pais").select2({
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






    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre);
        });

    $("#select_personal_existente")
        .click(function () {
            leer_personal_tercero_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_personal_tercero_mostrarlo_en_etiquetas();
        });

    $("#btn_agregar_tercero").click(function () {
        lc_tipo_operacion_datos_personales = '1';
        $("#btn_modificar_tercero").attr("disabled", true);
        $("#btn_eliminar_tercero").attr("disabled", true);
        $("#btn_grabar_datos_personales").attr("disabled", true);
        limpiar_todas_las_etiquetas_identificacion_personal();
        $("#slt_pais").attr("disabled", false);
        $("#slt_tipo_documento")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
    });


    $("#btn_modificar_tercero").click(function () {
        lc_tipo_operacion_datos_personales = '2';
        $("#btn_eliminar_tercero").attr("disabled", true);
        $("#btn_grabar_datos_personales").attr("disabled", true);
        habilitar_todas_etiquetas_para_edicion_personal();

    });

 

    /* PESTAÑA - DATOS PERSONALES (1) Identificacion Personal - INICIO  */
    $("#slt_pais").change(function () {
        lid_pais = $('#slt_pais  option:selected').attr('id');
    });

    $("#slt_tipo_documento").change(function () {
        $("#txt_nro_documento").removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
        $("#ver_existe_documento").html('');
        $("#slt_sexo").attr("disabled", true);
        $("#txt_paterno").attr("disabled", true);
        ln_id_documento = $('#slt_tipo_documento  option:selected').attr('id');
        leer_tipo_documento = ln_id_documento;
        if (lc_tipo_operacion_datos_personales === '1') {
            if (ln_id_documento !== '0') {
                lc_descripcion_documento = $('#slt_tipo_documento  option:selected').attr('documento');
                $("#txt_documento_descripcion").html('<strong><font size="-2" >' + lc_descripcion_documento + '</font></strong>');
                $("#txt_nro_documento")
                    .attr("disabled", false)
                    .focus();
                $("#msj_tipo_documento").html('');
            } else {
                $("#txt_documento_descripcion").html('<strong><font size="-1" > Nro. </font></strong>');
                $("#msj_tipo_documento").html('<strong><font size="-2" color="#EF6000" > Seleccione Tipo de Documento </font></strong>');
                $("#txt_nro_documento").attr("disabled", true);
            }
        } else {

            $("#txt_nro_documento").attr("disabled", false);
        }
    });

    $("#txt_nro_documento")
        .focus(function () {
            if (ln_id_documento === "1") {
                $("#txt_nro_documento").attr("maxlength", "8");
            } else {
                $("#txt_nro_documento").attr("maxlength", "30");
            }
        })
        .focusout(function () {
            valida_ingreso_dni();
        })
        .mousedown(function () {
            valida_ingreso_dni();
        })
        .keypress(function (e) {
            if (e.which === 13) {
                valida_ingreso_dni();
            }
        })
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });


    $("#slt_sexo").change(function () {
        $("#txt_paterno")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
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


    $("#txt_paterno").keypress(function (e) {
        $("#txt_materno")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
        if (e.which === 13) {
            $("#txt_materno").focus();
        }

    });

    $("#txt_materno").keypress(function (e) {
        $("#txt_nombres")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
        if (e.which === 13) {
            $("#txt_nombres").focus();
        }

    });


    $("#txt_nombres").keypress(function (e) {
        $("#txt_nacimiento").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nacimiento").focus();
        }


    });

    $('#txt_nacimiento').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    }).on('show', function () {

    });



    $("#txt_nacimiento").change(function () {
        $("#slc_departamento")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
            .focus();

    });



    $("#slc_departamento").change(function () {
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


    $("#slc_provincia").change(function () {
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


    $("#slc_distrito").change(function () {
        lc_id_distrito = $('#slc_distrito option:selected').attr('id');
        leer_id_distrito = lc_id_distrito;
        $("#txt_area_direccion")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism")
            .focus();

    });

    $("#txt_area_direccion").keypress(function () {
        $("#txt_correo_electronico")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary")
            .val('     @    ');
        $("#txt_telefono_fijo")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");
        $("#txt_telefono_celular")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control  alert-warning text-secondary initialism");


    });



    $('#txt_telefono_fijo').on('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        $("#txt_telefono_celular").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nombres").focus();
        }


    });


    $('#txt_telefono_celular')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function (e) {
            $("#ruc").attr("disabled", false);

            if (e.which === 13) {
                $("#ruc")
                    .attr("disabled", false)
                    .removeClass("form-control").addClass("form-control  alert-warning text-secondary")
                    .focus();
            }
        });

    $('#ruc')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function (e) {
            if (e.which === 13) {
                $("#observacion")
                    .attr("disabled", false)
                    .removeClass("form-control").addClass("form-control  alert-warning text-secondary")
                    .focus();
            }
            $("#btn_grabar_datos_personales").attr("disabled", false);
        });


    $("#btn_grabar_datos_personales").click(function () {
        desabilitar_input_text_identificacion_personal();
        /* lid_pais, ln_id_documento, leer_nro_documento, lc_sexo, lc_id_departamento, lc_id_provincia, lc_id_distrito  */
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
        if (lc_tipo_operacion_datos_personales === '1') {
            grabar_registro_personal_tercero(lid_pais, ln_id_documento, leer_nro_documento, lc_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, lc_id_departamento, lc_id_provincia, lc_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion);

        } else {
            grabar_modificacion_registros_personal(lid_pais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_ruc, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_id_departamento, leer_id_provincia, leer_id_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular, leer_celular_emergencia, leer_observacion, leer_id);


        }

    });



    $("#btn_eliminar_tercero").click(function () {
        desactivar_personal_tercero(leer_id);

    });


    $("#btn_habilitar_tercero").click(function () {
        habilitar_personal_tercero(leer_id);
    });







    /******************* FIN DE IDENTIFICACION DE DATOS PERSONALES *****************************************/






    /* PESTAÑA DATOS LABORALES - DESPLEGABLES CONTRATOS Y DETALLES  */


    $("#btn_agregar_contrato").click(function () {
        $("#slc_condicion_laboral").attr("disabled", false);
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);
        $("#btn_agregar_adenda").attr("disabled", true);
        $("#btn_modificar_adenda").attr("disabled", true);
        $("#btn_eliminar_adenda").attr("disabled", true);
        $("#contenedor_listado_adenda").hide();
        $("#contenedor-contratos").show();
        $("#contenedor_adendas").hide();

        $("#nombre_cadena_programatica").val('');



    });


    $("#slt_contratos_seleccion")
        .click(function () {
            leer_contratos_y_mostrarlo_datos_laborales();

        })
        .keyup(function () {
            leer_contratos_y_mostrarlo_datos_laborales();

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



    });









    /**********  fin de contrato laboral ****************/




    /* inicio de carrera y colegio profesional */



    $("#btn_agregar_carrera").click(function () {

        $("#slt_carrera").attr("disabled", false);


    });


    $("#slt_carrera").change(function () {
        $("#slc_colegios_profesionales").attr("disabled", false);
    });



    $('#fecha_inicio_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio habilitacion"
    }).on('show', function () {

    });


    $('#fecha_fin_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin habilitacion"
    }).on('show', function () {

    });









    $("#slt_asistencial").change(function () {
        $("#slt_carrera").attr("disabled", false);
    });




    //

    $("#slc_colegios_profesionales").change(function () {
        leer_id_colegio = $('#slc_colegios_profesionales  option:selected').attr('codigo_minsa');
        leer_nombre_colegio = $('#slc_colegios_profesionales  option:selected').attr('descripcion');
        $("#nro_colegiatura").attr("disabled", false);
        $("#fecha_inicio_habilitacion").attr("disabled", false);
        $("#fecha_fin_habilitacion").attr("disabled", false);

        /*
    
            switch (true) {
                case leer_id_colegio >= 12 && leer_id_colegio <= 18:
                    $('#btn_grabar').attr("disabled", true);
                    break;
                case leer_id_colegio >= 99:
                    $('#btn_grabar').attr("disabled", true);
                    break;
                default:
                    $('#btn_grabar').attr("disabled", true);
                    break;
            }
            */
    });





    $("#slc_colegios_profesionales").change(function () {
        $("#nro_colegiatura").attr("disabled", false);
        $("#fecha_inicio_habilitacion").attr("disabled", false);
    });



    $("#fecha_inicio_habilitacion").change(function () {
        $("#fecha_fin_habilitacion").attr("disabled", false);

    });

    $("#fecha_fin_habilitacion").change(function () {
        $("#nro_de_habilitacion").attr("disabled", false);
        $("#slt_carrera").attr("disabled", false);

    });


    $("#slt_carrera").change(function () {
        $("#slt_cargos").attr("disabled", false);
    });





});
