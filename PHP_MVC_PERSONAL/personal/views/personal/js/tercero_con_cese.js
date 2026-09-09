var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    datos_buscar, nro_registros, lc_buscar_nombre, lc_tipo_operacion_cas, leer_id, leer_dni, leer_apellido_casada, leer_ruc, leer_nro_contrato, leer_nro_proceso, leer_tipo_personal, leer_sexo, lid_pais, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_detalle_hijos, leer_edad, leer_estado_civil, leer_direccion, leer_direccion_distrito, leer_direccion_provincia, lc_sexo, leer_direccion_departamento, leer_sueldo, leer_cargo, leer_essalud, leer_carnet, leer_gs, leer_tfijo, leer_celular, leer_correo, leer_numero_hijos, lc_descripcion_documento, ln_id_documento, cantidad_registros, dato_listar, lc_id_departamento, lc_id_departamento, lc_id_provincia, lc_id_distrito, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, dato_actualizar_colegios, leer_id_colegio, leer_nombre_colegio, ln_id_especialidad, lc_descripcion_especialidad, lc_codigo_colegio, lc_nombre_colegio, lc_id_competencia, lc_descripcion_competencia, lc_id_capacitacion, lc_descripcion_capacitacion, leer_nombre_pais, lc_id_entrenamiento, lc_descripcion_entrenamiento, lc_id_universidad, lc_nombre_universidad, leer_tipo_educacion, leer_idpais, leer_tipo_documento, leer_nombre_documento, leer_nombre_sexo, leer_id_contrato, leer_fecha_ingreso_contrato, leer_fecha_termino_contrato, leer_ruc_contrato, leer_sueldo_contrato, leer_id_condicion_laboral, leer_nombre_condicion_laboral, lid_origen_destaque, lid_nombre_destaque, lc_buscar_establecimiento = '', lid_cadena,  lc_nombre_cadena,
    lc_idunidadorganica, lc_unidad_organica, lc_idorgano, lc_organo,  lc_actividad;




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
        beforeSend: function () {},
        success: function (encontrados) {
            $("#select_personal_existente").html('');
            nro_registros = encontrados.length;
//            alert(nro_registros);
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#select_personal_existente").append('<option value="' + filas.idtercero + '"  id = "' + filas.idtercero  +
                            '" idpais = "' + filas.idpais +
                            '" tipo_condicion = "' + filas.tipo_condicion +
                            '" tipo_documento = "' + filas.tipo_documento +
                            '" nro_documento = "' + filas.nro_documento +
                            '" ruc = "' + filas.ruc +
                            '" sexo = "' + filas.sexo +
                            '" paterno = "' + filas.paterno +
                            '" materno = "' + filas.materno +
                            '" nombres = "' + filas.nombres +
                            '" apellidos_nombre = "' + filas.apellidosnombres +
                            '"  >' + filas.apellidosnombres + '</option>');
                        $("#select_personal_existente").attr("disabled", false);

                    } else {
                        $("#select_personal_existente").attr("disabled", true);
                        $("#select_personal_existente").empty();

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
    $('#btn_agregar_cas').attr("disabled", false);
    desabilitar_input_text_identificacion_personal();
    lc_buscar_nombre = '';
    leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre);




}

function leer_personal_cas_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#select_personal_existente  option:selected').attr('id');
    leer_idpais = $('#select_personal_existente  option:selected').attr('idpais');
    leer_nombre_pais = $('#select_personal_existente  option:selected').attr('nombre_pais');
    $("#nombre_pais_registrado").html(leer_nombre_pais);
    leer_tipo_documento = $('#select_personal_existente  option:selected').attr('tipo_documento');
    leer_nombre_documento = $('#select_personal_existente  option:selected').attr('nombre_documento');
    $("#nombre_documento_registrado").html(leer_nombre_documento);
    leer_nombre_sexo = $('#select_personal_existente  option:selected').attr('nombre_sexo');
    $("#sexo_registrado").html(leer_nombre_sexo);

    leer_dni = $('#select_personal_existente  option:selected').attr('dni');
    leer_ruc = $('#select_personal_existente  option:selected').attr('ruc');
    leer_nro_contrato = $('#select_personal_existente  option:selected').attr('nro_contrato');
    leer_nro_proceso = $('#select_personal_existente  option:selected').attr('nro_proceso');
    leer_tipo_personal = $('#select_personal_existente  option:selected').attr('tipo_personal');
    leer_sexo = $('#select_personal_existente  option:selected').attr('sexo');
    leer_paterno = $('#select_personal_existente  option:selected').attr('paterno');
    leer_materno = $('#select_personal_existente  option:selected').attr('materno');
    leer_apellido_casada = $('#select_personal_existente  option:selected').attr('apellido_casada');
    leer_nombres = $('#select_personal_existente  option:selected').attr('nombres');
    leer_apellidos_nombres = $('#select_personal_existente  option:selected').attr('apellidos_nombre');
    leer_fecha_nacimiento = $('#select_personal_existente  option:selected').attr('fecha_nacimiento');
    leer_edad = $('#select_personal_existente  option:selected').attr('edad');
    leer_estado_civil = $('#select_personal_existente  option:selected').attr('estado_civil');
    leer_direccion = $('#select_personal_existente option:selected').attr('direccion');
    leer_direccion_distrito = $('#select_personal_existente  option:selected').attr('direccion_distrito');
    leer_direccion_provincia = $('#select_personal_existente  option:selected').attr('direccion_provincia');
    leer_direccion_departamento = $('#select_personal_existente  option:selected').attr('direccion_departamento');
    leer_sueldo = $('#select_personal_existente  option:selected').attr('sueldo');
    leer_cargo = $('#select_personal_existente  option:selected').attr('cargo');
    leer_essalud = $('#select_personal_existente  option:selected').attr('essalud');
    leer_carnet = $('#select_personal_existente option:selected').attr('carnet_extranjeria');
    leer_gs = $('#select_personal_existente  option:selected').attr('gs');
    leer_tfijo = $('#select_personal_existente  option:selected').attr('telefono_fijo');
    leer_celular = $('#select_personal_existente  option:selected').attr('telefono_celular');
    leer_correo = $('#select_personal_existente  option:selected').attr('correo_electronico');
    leer_numero_hijos = $('#select_personal_existente  option:selected').attr('hijos');
    leer_detalle_hijos = $('#select_personal_existente  option:selected').attr('detalle_hijos');

    /* mostrar datos en identificacion datos personales */

    $("#txt_nro_documento").val(leer_dni);
    $("#txt_paterno").val(leer_paterno);
    $("#txt_materno").val(leer_materno);
    $("#apellido_casada").val(leer_apellido_casada);
    $("#txt_nombres").val(leer_nombres);


    $("#txt_nacimiento").val(leer_fecha_nacimiento);
    $("#txt_nro_hijos").val(leer_numero_hijos);
    $("#txt_detalle_hijos").val(leer_detalle_hijos);



    /*
    $("#slt_sexo").attr("disabled", true);
    $("#slt_estado_civil").attr("disabled", true);
    $("#slc_departamento").attr("disabled", true);
    */

    // leer_nro_contrato




    $("#btn_modificar_cas").attr("disabled", false);
    $("#btn_eliminar_cas").attr("disabled", false);

    /* para contratos */
    $("#btn_agregar_contrato").attr("disabled", false);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_grabar_contrato").attr("disabled", true);

    $("#btn_grabar_adenda").attr("disabled", true);





    $('#personal_seleccion_nombre').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_nombre_educacion').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_contrato').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_carrera').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_competencia').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_capacitacion').html('<strong>' + leer_apellidos_nombres + '</strong>');
    $('#personal_seleccion_entrenamiento').html('<strong>' + leer_apellidos_nombres + '</strong>');

    $('#personal_seleccion_renuncia').html('<strong>' + leer_apellidos_nombres + '</strong>');


    $('#btn_agregar_contrato').attr("disabled", false);
    $('#btn_agregar_carrera').attr("disabled", false);


    ver_contratos_personal_seleccion(leer_id);
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








}


function ocultar_adendas_contratos() {
    "use strict";
    $("#contenedor_adendas").hide();
    $("#contenedor-contratos").show();

}


function ver_contratos_personal_seleccion(leer_id) {
    "use strict";
    dato_listar = {
        "id": leer_id
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/vercontratos_del_personal',
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





}



function ver_contratos_y_consultar_adendas(leer_id_contrato) {
    "use strict";
    dato_listar = {
        'id': leer_id_contrato
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_adendas_de_un_contrato',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_contratos_adendas")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_contratos_adendas").append('<option id="' + filas.id + '"  idcontrato = "' + filas.idcontrato + '"  nro_adenda = "' + filas.nro_adenda + '"  nro_contrato = "' + filas.nro_contrato + '"  nro_adenda_contrato = "' + filas.nro_adenda_contrato + '"  fecha_inicio = "' + filas.fecha_inicio + '"  fecha_fin = "' + filas.fecha_fin +
                    '"  fecha_desvinculacion = "' + filas.fecha_desvinculacion + '"  >' + filas.nro_adenda_contrato + '&nbsp;&nbsp;&#124;&nbsp;&nbsp;' + filas.fecha_inicio + '&nbsp;&nbsp;&#124;&nbsp;' + filas.fecha_fin + '&nbsp;&nbsp;&#124;&nbsp;&nbsp;' + filas.fecha_desvinculacion + '&nbsp;&nbsp;&#124;&nbsp;'  + filas.estado  + '</option>');
                    $("#slc_contratos_adendas").attr("disabled", false);

                } else {

                }
            });
        }
    });
    $("#contenedor_listado_adenda").show();

}



function leer_adendas_mostrar_datos() {
    "use strict";
    $("#btn_agregar_adenda").attr("disabled", false);
    $("#btn_modificar_adenda").attr("disabled", false);
    $("#btn_eliminar_adenda").attr("disabled", false);
    $("#contenedor-contratos").hide();
    $("#contenedor_adendas").show();

}






function listar_estados_civiles() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_estados_civiles',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_estado_civil")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_estado_civil").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_estado_civil").attr("disabled", true);
                } else {
                    $("#slt_estado_civil").attr("disabled", true);
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
                    $("#slt_cadena_programatica").append('<option id="' + filas.id + '"  tarea = "' + filas.nombre_tarea +  '"  actividad = "' + filas.actividad  + '"  >' + filas.nombre_tarea + '</option>');
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
                    $("#slc_condicion_laboral").attr("disabled", true);
                } else {
                    $("#slc_condicion_laboral").attr("disabled", true);
                }
            });
        }
    });
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
            $("#slc_lista")
                .html('')
                .show();
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
                .show();
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
                .show();
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





function listar_competencias() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_las_competencias',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista_competencia")
                .html('')
                .show();
            $("#slc_lista_competencia").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_lista_competencia").append('<option id="' + filas.id + '"  codigo = "' + filas.codigo + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slc_lista_competencia").attr("disabled", false);

                } else {
                    $("#slc_lista_competencia").attr("disabled", true);
                }

            });

        }
    });

}



function listar_capacitacion() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_las_capacitacion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista_capacitacion")
                .html('')
                .show();
            $("#slc_lista_capacitacion").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_lista_capacitacion").append('<option id="' + filas.id + '"  codigo = "' + filas.codigo + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slc_lista_capacitacion").attr("disabled", false);

                } else {
                    $("#slc_lista_capacitacion").attr("disabled", true);
                }

            });

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







function listar_entrenamiento() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_entrenamiento',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista_entrenamiento")
                .html('')
                .show();
            $("#slc_lista_entrenamiento").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_lista_entrenamiento").append('<option id="' + filas.id + '"  codigo = "' + filas.codigo + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slc_lista_entrenamiento").attr("disabled", false);

                } else {
                    $("#slc_lista_entrenamiento").attr("disabled", true);
                }

            });

        }
    });

}





function listar_universidades() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'personal/listar_todas_las_universidades',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista_universidad")
                .html('')
                .show();
            $("#slc_lista_universidad").append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_lista_universidad").append('<option id="' + filas.id + '"  nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                    $("#slc_lista_universidad").attr("disabled", false);

                } else {
                    $("#slc_lista_universidad").attr("disabled", true);
                }

            });

        }
    });

    $("#slc_lista_universidad").select2({
        allowClear: true,
        theme: "classic",
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




function ocultar_text_educacion() {
    "use strict";
    $("#fecha_inicio_educacion").attr("disabled", true);
    $("#fecha_fin_educacion").attr("disabled", true);
    $("#chk_no_culmino_estudio").attr("disabled", true);
    $("#txt_condicion").attr("disabled", true);
    $("#txt_titulo").attr("disabled", true);
    $("#txt_instituto").attr("disabled", true);
    $("#btn_grabar_datos_educacion").attr("disabled", true);
    switch (leer_tipo_educacion) {
        case '1':
            $("#espera_grabacion_educacion").html('<strong><font color="#0013EF" size = "2"><center>Grabacion Conforme Universidad, Proceda a Ingresar datos Adicionales - Pestaña ADICIONAL<center></font></strong>');

            break;
        case '2':
            $("#espera_grabacion_educacion").html('<strong><font color="#0013EF" size = "2"><center>Grabacion Conforme Educacion, Proceda a Ingresar datos Adicionales - Pestaña ADICIONAL<center></font></strong>');

            break;
        case '3':
            $("#espera_grabacion_educacion").html('<strong><font color="#0013EF" size = "2"><center>Grabacion Centro de Enseñaza Proceda a Ingresar datos Adicionales - Pestaña ADICIONAL<center></font></strong>');

            break;

        case '4':
            $("#espera_grabacion_educacion").html('<strong><font color="#0013EF" size = "2"><center>Grabacion Educacion basica Proceda a Ingresar datos Adicionales - Pestaña ADICIONAL<center></font></strong>');
            break;
        default:
            break;
    }

}


function desabilitar_input_text_identificacion_personal() {
    "use strict";
    $("#slt_pais").attr("disabled", true);
    $("#slt_tipo_documento").attr("disabled", true);
    $("#txt_nro_documento").attr("disabled", true);
    $("#slt_sexo").attr("disabled", true);
    $("#txt_paterno").attr("disabled", true);
    $("#txt_materno").attr("disabled", true);
    $("#apellido_casada").attr("disabled", true);
    $("#txt_nombres").attr("disabled", true);
    $("#txt_nacimiento").attr("disabled", true);
    $("#slt_estado_civil").attr("disabled", true);
    $("#txt_nro_hijos").attr("disabled", true);
    $("#txt_detalle_hijos").attr("disabled", true);
    $("#slc_departamento").attr("disabled", true);
    $("#slc_provincia").attr("disabled", true);
    $("#slc_distrito").attr("disabled", true);
    $("#txt_area_direccion").attr("disabled", true);
    $("#txt_correo_electronico").attr("disabled", true);
    $("#txt_telefono_fijo").attr("disabled", true);
    $("#txt_telefono_celular").attr("disabled", true);
    $("#telefono_emergencia").attr("disabled", true);
    $("#grupo_sanguineo").attr("disabled", true);
    $("#observacion").attr("disabled", true);
    $("#btn_grabar_datos_personales").attr("disabled", true);
    $("#btn_modificar_cas").attr("disabled", true);
    $("#btn_eliminar_cas").attr("disabled", true);
    lc_buscar_nombre = '';
    leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre) ;
    $("#espera_grabacion_cas").empty();
    $("#btn_agregar_cas").focus();
}


function inicializar_botones_contratos() {
    "use strict";
    $("#btn_agregar_contrato").attr("disabled", true);
    $("#btn_modificar_contrato").attr("disabled", true);
    $("#btn_eliminar_contrato").attr("disabled", true);
    $("#btn_grabar_contrato").attr("disabled", true);


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

function inicializar_adendas() {
    "use strict";
    $("#contenedor_adendas").hide();
    $("#btn_agregar_adenda").attr("disabled", true);
    $("#btn_modificar_adenda").attr("disabled", true);
    $("#btn_eliminar_adenda").attr("disabled", true);

    /*
    $("#contenedor-contratos").hide();
    $("#contenedor_adendas").show();
*/






}





$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_botones_identificacion_personal();
    inicializar_botones_contratos();
    listar_condicion_laboral();
    listar_estados_civiles();
    listar_departamentos();
    listar_carreras_profesion();
    listar_de_cargos();
    listar_colegios_profesionales();
    listar_unidad_organica_de_organo();
    listar_tipos_especialidad();
    listar_competencias();
    listar_capacitacion();
    listar_entrenamiento();
    listar_universidades();
    listar_motivos_renuncia();
    lc_buscar_establecimiento = '';
    listar_establecimientos(lc_buscar_establecimiento);
    inicializar_adendas();
    listar_cadena_programatica();

    $("#txt_renaes").hide();

    $("#txt_buscar_establecimiento").hide();

    $("#lgr_origen_destaque").hide();

    $("#lugar_origen").text('');
    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_tercero_y_mostrar_resultado(lc_buscar_nombre); 
        });

    $("#select_personal_existente")
        .click(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        });




    $("#txt_nro_proceso").attr("disabled", true);

    $("#btn_grabar_datos_personales").attr("disabled", true);
    $('#btn_grabar_contrato').attr("disabled", true);
    $("#btn_grabar_datos_educacion").attr("disabled", true);
    $("#btn_grabar_datos_notificacion").attr("disabled", true);
    $("#contiene_universidad").hide();



    $("#txt_instituto").hide();


    $('#btn_agregar_cas').click(function () {
        lc_tipo_operacion_cas = '1';
        $("#slt_pais").attr("disabled", false);
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
        $("#slt_tipo_documento").attr("disabled", false);
    });



    /* PESTAÑA - DATOS PERSONALES (1) Identificacion Personal - INICIO  */
    $("#slt_pais").change(function () {
        lid_pais = $('#slt_pais  option:selected').attr('id');
    });
    $("#slt_tipo_documento").change(function () {
        ln_id_documento = $('#slt_tipo_documento  option:selected').attr('id');
        if (lc_tipo_operacion_cas === '1') {
            if (ln_id_documento !== '0') {
                lc_descripcion_documento = $('#slt_tipo_documento  option:selected').attr('documento');
                $("#txt_documento_descripcion").html('<strong><font size="-2" >' + lc_descripcion_documento + '</font></strong>');
                $("#txt_nro_documento").attr("disabled", false);
                $("#txt_nro_documento").focus();
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

    $("#txt_documento_descripcion").html('<strong><font size="-1" > NRO. </font></strong>');
    $('#txt_nro_documento').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        $("#txt_paterno").attr("disabled", false);
        $("#slt_sexo").attr("disabled", false);
    });

    $("#slt_sexo").change(function () {
        lc_sexo = $('#slt_sexo  option:selected').attr('lc_sexo');
        switch (lc_sexo) {
            case '0':
                break;

            case '1':
                $("#apellido_casada").attr("disabled", true);
                break;
            case '2':
                $("#apellido_casada").attr("disabled", false);
                break;
            default:
                break;

        }

    });

    $("#txt_paterno").keypress(function () {
        $("#txt_materno").attr("disabled", false);
    });

    $("#txt_materno").keypress(function () {
        $("#txt_nombres").attr("disabled", false);
    });

    $("#txt_nombres").keypress(function () {
        $("#txt_nacimiento").attr("disabled", false);
    });

    $('#txt_nacimiento').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    }).on('show', function () {

    });


    $("#txt_nacimiento").change(function () {
        $("#slt_estado_civil").attr("disabled", false);
        $("#txt_nro_hijos").attr("disabled", false);
        $("#txt_detalle_hijos").attr("disabled", false);
        $("#slc_departamento").attr("disabled", false);
    });


    $("#slc_departamento").change(function () {
        lc_id_departamento = $('#slc_departamento option:selected').attr('id');
        if (lc_id_departamento === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ningun departamento...</font></strong>');
        } else {
            listar_todas_las_provincias_de_un_departamento(lc_id_departamento);
            $("#slc_provincia").attr("disabled", false);
        }
    });


    $("#slc_provincia").change(function () {
        lc_id_provincia = $('#slc_provincia option:selected').attr('id');
        if (lc_id_provincia === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ninguna provincia...</font></strong>');
        } else {
            listar_todas_los_distritos_de_una_provincia(lc_id_departamento, lc_id_provincia);
            $("#slc_distrito").attr("disabled", false);
        }
    });


    $("#slc_distrito").change(function () {
        lc_id_distrito = $('#slc_distrito option:selected').attr('id');
        $("#txt_area_direccion")
            .attr("disabled", false)
            .val('');
    });

    $("#txt_area_direccion").keypress(function () {
        $("#txt_correo_electronico").attr("disabled", false);
        $("#txt_telefono_fijo").attr("disabled", false);
        $("#txt_telefono_celular").attr("disabled", false);

    });



    $('#txt_telefono_fijo').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        $("#txt_telefono_celular").attr("disabled", false);
        $("#telefono_emergencia").attr("disabled", false);
    });


    $('#txt_telefono_celular').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        $("#telefono_emergencia").attr("disabled", false);
        $("#btn_grabar_datos_personales").attr("disabled", false);
    });


    $("#txt_telefono_celular").keypress(function () {

        $("#btn_grabar_datos_personales").attr("disabled", false);

    });


    $('#telefono_emergencia').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        $("#grupo_sanguineo").attr("disabled", false);
        $("#observacion").attr("disabled", false);

    });

    $("#btn_grabar_datos_personales").click(function () {

        $("#espera_grabacion_cas")
            .show()
            .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        desabilitar_input_text_identificacion_personal();
    });


    /******************* FIN DE IDENTIFICACION DE DATOS PERSONALES *****************************************/


    /* INICIO DE DESPLEGABLE DATOS DE EDUCACION */

    $("input[name=tipo_educacion_total]").click(function () {
        leer_tipo_educacion = $('input:radio[name=tipo_educacion_total]:checked').val();
        switch (leer_tipo_educacion) {
            case '1':
                $("#contiene_universidad").show();
                $("#titulo_educacion").html('<font size="-1" color="#000000">UNIVERSIDAD : </font>');
                $("#slc_lista_universidad").show();
                $("#txt_descripcion_universidad").show();
                $("#txt_instituto").hide();
                $('#slc_lista_universidad').select2('open');
                break;
            case '2':
                $("#contiene_universidad").hide();
                $("#titulo_educacion").html('<font size="-1" color="#000000">INSTITUTO : </font>');
                $("#slc_lista_universidad").hide();
                $('#slc_lista_universidad').select2('close');
                $("#txt_descripcion_universidad").hide();
                ocultar_text_educacion();
                $("#txt_condicion").val('');
                $("#txt_titulo").val('');
                $("#espera_grabacion_educacion").html('');
                $("#txt_instituto")
                    .show()
                    .val('')
                    .attr("disabled", false)
                    .focus();
                break;
            case '3':
                $("#contiene_universidad").hide();
                $("#titulo_educacion").html('<font size="-1" color="#000000">CENTRO DE ENSEÑANZA : </font>');
                $("#slc_lista_universidad").hide();
                $('#slc_lista_universidad').select2('close');
                $("#txt_descripcion_universidad").hide();
                ocultar_text_educacion();
                $("#txt_condicion").val('');
                $("#txt_titulo").val('');
                $("#espera_grabacion_educacion").html('');
                $("#txt_instituto")
                    .show()
                    .val('')
                    .attr("disabled", false)
                    .focus();
                break;
            case '4':
                $("#contiene_universidad").hide();
                $("#titulo_educacion").html('<font size="-1" color="#000000">COLEGIO : </font>');
                $("#slc_lista_universidad").hide();
                $('#slc_lista_universidad').select2('close');
                $("#txt_descripcion_universidad").hide();
                ocultar_text_educacion();
                $("#txt_condicion").val('');
                $("#txt_titulo").val('');
                $("#espera_grabacion_educacion").html('');
                $("#txt_instituto")
                    .show()
                    .val('')
                    .attr("disabled", false)
                    .focus();
                break;
            case '5':

                $("#contiene_universidad").hide();
                $("#titulo_educacion").html('<font size="-1" color="#000000">SERUM : </font>');
                $("#slc_lista_universidad").hide();
                $('#slc_lista_universidad').select2('close');
                $("#txt_descripcion_universidad").hide();
                ocultar_text_educacion();
                $("#txt_condicion").val('');
                $("#txt_titulo").val('');
                $("#espera_grabacion_educacion").html('');
                $("#txt_instituto")
                    .show()
                    .val('')
                    .attr("disabled", false)
                    .focus();
                break;

            default:
                break;

        }

    });


    $('#slc_lista_universidad').change(function () {
        lc_id_universidad = $('#slc_lista_universidad option:selected').attr('id');
        lc_nombre_universidad = $('#slc_lista_universidad option:selected').attr('nombre');
        $('#txt_descripcion_universidad')
            .val(lc_nombre_universidad)
            .attr("disabled", true);
        $("#fecha_inicio_universidad").attr("disabled", false);
        $("#fecha_fin_universidad").attr("disabled", false);
        $("#chk_no_culmino_estudio").attr("disabled", false);
    });

    $("#fecha_inicio_educacion").change(function () {
        $("#fecha_fin_educacion").attr("disabled", false);
    });

    $('#fecha_inicio_educacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio "
    }).on('show', function () {

    });

    $('#fecha_fin_educacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin "
    }).on('show', function () {});


    $("#fecha_fin_educacion").change(function () {
        $("#chk_no_culmino_estudio").attr("disabled", false);
        $("#txt_condicion").attr("disabled", false);
        $("#txt_titulo").attr("disabled", false);
    });

    $("#slc_lista_universidad").change(function () {
        $("#fecha_inicio_educacion").attr("disabled", false);
    });

    $("#txt_instituto").keypress(function () {
        $("#fecha_inicio_educacion").attr("disabled", false);
    });


    $("#txt_titulo").keypress(function () {
        $("#btn_grabar_datos_educacion").attr("disabled", false);
    });

    $("#btn_grabar_datos_educacion").click(function () {
        $("#telefono_emergencia").attr("disabled", false);
        switch (leer_tipo_educacion) {
            case '1':
                ocultar_text_educacion();
                break;
            case '2':
                ocultar_text_educacion();
                break;
            case '3':
                ocultar_text_educacion();
                break;

            case '4':
                ocultar_text_educacion();
                break;
            default:
                break;

        }
    });




    /* FIN DE DESPLEGABLE DE DATOS EDUCACION */




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


    $("#slc_contratos_adendas")
        .click(function () {
            leer_adendas_mostrar_datos();
        })
        .keyup(function () {
            leer_adendas_mostrar_datos();
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
                break;
            case '3':
                $("#msj_condicion_laboral").html('<center><font color="#E59600">Seleccione el lugar de origen</font></center>');
                $("#lugar_origen").text('Origen de destaque:');
                $("#lgr_origen_destaque").show();
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
        $("#nombre_cadena_programatica").val(lc_actividad  + ' -- ' + lc_nombre_cadena);
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







    // lc_id_competencia, lc_descripcion_competencia 

    $("#slc_lista_competencia").change(function () {
        lc_id_competencia = $('#slc_lista_competencia option:selected').attr('codigo');
        lc_descripcion_competencia = $('#slc_lista_competencia option:selected').attr('descripcion');
        $('#txt_descripcion_competencia')
            .val(lc_descripcion_competencia)
            .attr("disabled", true);
        $('#slc_lista_capacitacion').attr("disabled", false);

    });




    $("#slc_lista_capacitacion").change(function () {
        lc_id_capacitacion = $('#slc_lista_capacitacion option:selected').attr('codigo');
        lc_descripcion_capacitacion = $('#slc_lista_capacitacion option:selected').attr('descripcion');

        $('#txt_descripcion_capacitacion')
            .val(lc_descripcion_capacitacion)
            .attr("disabled", true);


    });



    $("#slc_lista_entrenamiento").change(function () {
        lc_id_entrenamiento = $('#slc_lista_entrenamiento option:selected').attr('codigo');
        lc_descripcion_entrenamiento = $('#slc_lista_entrenamiento option:selected').attr('descripcion');

        $('#txt_descripcion_entrenamiento')
            .val(lc_descripcion_entrenamiento)
            .attr("disabled", true);


    });


    $('#fecha_fin_contrato').change(function () {
        $("#btn_grabar_datos_laborales").attr("disabled", false);


    });






    $('#fecha_inicio_renuncia').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio "
    }).on('show', function () {

    });

    $('#fecha_ultimo_dia_trabajo').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio "
    }).on('show', function () {

    });









    $("#btn_agregar_renuncia").click(function () {

        $("#slc_motivos_renuncia").attr("disabled", false);
        $("#fecha_inicio_renuncia").attr("disabled", true);
        $("#fecha_ultimo_dia_trabajo").attr("disabled", true);
        $("#btn_grabar_renuncia").attr("disabled", true);



    });

    $("#slc_motivos_renuncia").change(function () {
        $("#fecha_inicio_renuncia").attr("disabled", false);
        $("#fecha_ultimo_dia_trabajo").attr("disabled", false);
    });


    $("#fecha_inicio_renuncia").change(function () {
        $("#txt_observacion_renuncia").attr("disabled", false);
    });

    $("#txt_observacion_renuncia").keypress(function () {
        $("#btn_grabar_renuncia").attr("disabled", false);
    });









});
