var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    datos_buscar_cas, nro_registros, lc_buscar_nombre = '',
    leer_idpersonal, leer_idpais, leer_nombre_pais, leer_tipo_documento, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_idestadocivil, leer_estado_civil, leer_iddepartamento, leer_departamento, leer_iddprovincia, leer_provincia, leer_iddistrito, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado,  cantidad_registros, nro_registros, lc_ver_si_se_selecciono, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, datos_buscar, i, valor_final, datos_buscar_cas_cero;



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


function inicializar_desabilitar_etiquetas_personal_cas() {
    "use strict";
    $('#btn_agregar_cas').attr("disabled", true);
    $('#btn_modificar_cas').attr("disabled", true);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_habilitar_cas').attr("disabled", true);
    $('#btn_grabar_datos_personales').attr("disabled", true);
    listar_todo_el_personal_cas(lc_buscar_nombre);
    // listar_estados_civiles();

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

        /* mostrar datos en identificacion datos personales */
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
        $("#nombre_pais_registrado").text(leer_nombre_pais);
        $("#nombre_documento_registrado").text(leer_nombre_documento);
        $("#txt_nro_documento").val(leer_nro_documento);
        if (leer_sexo === 'M') {
            $("#sexo_registrado").text("MASCULINO");
            $("#slt_sexo_1")
                .attr("disabled", true)
                .prop("checked", true);
        } else {
            $("#sexo_registrado").text("FEMENINO");
            $("#slt_sexo_0")
                .attr("disabled", true)
                .prop("checked", true);
        }
        $("#txt_paterno").val(leer_paterno);
        $("#txt_materno").val(leer_materno);
        $("#apellido_casada").val(leer_apellido_casada);
        $("#txt_nombres").val(leer_nombres);
        $("#txt_nacimiento").val(leer_fecha_nacimiento);
        $("#txt_edad").val(leer_edad);
        $("#estado_civil_registrado").val(leer_estado_civil);
        $("#nombre_departamento").val(leer_departamento);
        $("#nombre_provincia").val(leer_provincia);
        $("#nombre_distrito").val(leer_distrito);
        $("#txt_area_direccion").val(leer_direccion);
        $("#txt_correo_electronico").val(leer_correo_electronico);
        $("#txt_telefono_fijo").val(leer_telefono_fijo);
        $("#txt_telefono_celular").val(leer_celular_personal);
        $("#telefono_emergencia").val(leer_celular_emergencia);
        $("#observacion").val(leer_observacion);
        $('#btn_agregar_cas').attr("disabled", false);
        $('#btn_modificar_cas').attr("disabled", false);
        $('#btn_eliminar_cas').attr("disabled", false);
        $('#btn_habilitar_cas').attr("disabled", false);
        $('#slt_pais').attr("disabled", true);
        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);





    } else {
        $('#btn_agregar_cas').attr("disabled", true);
        $('#btn_modificar_cas').attr("disabled", true);
        $('#btn_eliminar_cas').attr("disabled", true);
        $('#btn_habilitar_cas').attr("disabled", true);
    }
}

/*
function listar_estados_civiles() {
    "use strict";
    dato_listar_civiles = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_civiles,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_estados_civiles',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_estado_civil")
                .html('')
                .append('<option id=0> Seleccione </option>');
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

*/


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



$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_desabilitar_etiquetas_personal_cas();
    $('#btn_agregar_cas').attr("disabled", false);
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

     $("#chk_debaja").on('change', function () {
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);


        }
    });
    



});
