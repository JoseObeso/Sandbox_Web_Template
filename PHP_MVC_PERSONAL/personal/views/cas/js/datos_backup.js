var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    datos_buscar_cas, nro_registros, lc_buscar_nombre = '',
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

function inicializar_desabilitar_etiquetas_personal_cas() {
    "use strict";
    $('#btn_agregar_cas').attr("disabled", true);
    $('#btn_modificar_cas').attr("disabled", true);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_habilitar_cas').attr("disabled", true);
    $('#btn_grabar_datos_personales').attr("disabled", true);
    listar_todo_el_personal_cas(lc_buscar_nombre);
    listar_estados_civiles();
    listar_departamentos();
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

function limpiar_desabilitar_etiquetas() {
    "use strict";
    $('#slt_pais').attr("disabled", true);
    $("#personal_seleccion_nombre").text('');
    $("#condicion_personal").text('');
    $("#msj_documento").text('');
    $('#slt_tipo_documento').attr("disabled", true);
    $("#nombre_pais_registrado").text('');
    $("#nombre_documento_registrado").text('');
    $("#txt_nro_documento")
        .val('')
        .attr("disabled", true);
    $("#sexo_registrado")
        .text("")
        .attr("disabled", true);
    $("#txt_paterno")
        .val('')
        .attr("disabled", true);
    $("#txt_materno")
        .val('')
        .attr("disabled", true);
    $("#apellido_casada")
        .val('')
        .attr("disabled", true);
    $("#txt_nombres")
        .val('')
        .attr("disabled", true);
    $("#txt_nacimiento")
        .val('')
        .attr("disabled", true);
    $("#txt_edad").val('');
    $("#estado_civil_registrado")
        .val('')
        .attr("disabled", true);

    $("#nombre_departamento")
        .val('')
        .attr("disabled", true);
    $("#nombre_provincia")
        .val('')
        .attr("disabled", true);
    $("#nombre_distrito")
        .val('')
        .attr("disabled", true);
    $("#txt_area_direccion")
        .val('')
        .attr("disabled", true);
    $("#txt_correo_electronico")
        .val('')
        .attr("disabled", true);
    $("#txt_telefono_fijo")
        .val('')
        .attr("disabled", true);
    $("#txt_telefono_celular")
        .val('')
        .attr("disabled", true);
    $("#telefono_emergencia")
        .val('')
        .attr("disabled", true);
    $("#observacion")
        .val('')
        .attr("disabled", true);

    $('#btn_agregar_cas').attr("disabled", true);
    $('#btn_modificar_cas').attr("disabled", true);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_habilitar_cas').attr("disabled", true);
    $('#btn_grabar_datos_personales').attr("disabled", true);

    $("#slt_sexo")
        .append('<option id=0> Seleccione </option>')
        .attr("disabled", false);







}

function desabilitar_etiquetas_pero_sin_limpiar() {
    "use strict";
    $('#slt_pais').attr("disabled", true);
    $("#personal_seleccion_nombre").text('');
    $("#condicion_personal").text('');
    $("#msj_documento").text('');
    $('#slt_tipo_documento').attr("disabled", true);
    $("#txt_nro_documento")
        .attr("disabled", true);
    $("#sexo_registrado")
        .attr("disabled", true);
    $("#txt_paterno")
        .attr("disabled", true);
    $("#txt_materno")
        .attr("disabled", true);
    $("#apellido_casada")
        .attr("disabled", true);
    $("#txt_nombres")
        .attr("disabled", true);
    $("#txt_nacimiento")
        .attr("disabled", true);
    $("#txt_edad").val('');
    $("#estado_civil_registrado")
        .attr("disabled", true);
    $("#nombre_departamento")
        .attr("disabled", true);
    $("#nombre_provincia")
        .attr("disabled", true);
    $("#nombre_distrito")
        .attr("disabled", true);
    $("#txt_area_direccion")
        .attr("disabled", true);
    $("#txt_correo_electronico")
        .attr("disabled", true);
    $("#txt_telefono_fijo")
        .attr("disabled", true);
    $("#txt_telefono_celular")
        .attr("disabled", true);
    $("#telefono_emergencia")
        .attr("disabled", true);
    $("#observacion")
        .attr("disabled", true);
    $('#btn_modificar_cas').attr("disabled", true);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_habilitar_cas').attr("disabled", true);
    $('#btn_grabar_datos_personales').attr("disabled", true);
    $('#btn_agregar_cas')
        .attr("disabled", false)
        .focus();

    $("#slt_estado_civil").attr("disabled", true);
    $("#slc_departamento").attr("disabled", true);
    $("#slc_provincia").attr("disabled", true);
    $("#slc_distrito").attr("disabled", true);
    
      $("#slt_sexo_0")
        .attr("disabled", true)
        .prop("checked", false);

    $("#slt_sexo_1")
        .attr("disabled", true)
        .prop("checked", false);
    


}

function habilitar_etiquetas_para_edicion() {
    "use strict";
    $('#slt_pais').attr("disabled", false);
    $("#personal_seleccion_nombre").text('');
    $("#condicion_personal").text('');
    $("#msj_documento").text('');
    $('#slt_tipo_documento').attr("disabled", false);
    $("#txt_nro_documento")
        .attr("disabled", false);
    $("#sexo_registrado")
        .attr("disabled", false);
    $("#txt_paterno")
        .attr("disabled", false);
    $("#txt_materno")
        .attr("disabled", false);
    $("#apellido_casada")
        .attr("disabled", false);
    $("#txt_nombres")
        .attr("disabled", false);
    $("#txt_nacimiento")
        .attr("disabled", false);
    $("#txt_edad").val('');
    $("#estado_civil_registrado")
        .attr("disabled", false);
    $("#nombre_departamento")
        .attr("disabled", false);
    $("#nombre_provincia")
        .attr("disabled", false);
    $("#nombre_distrito")
        .attr("disabled", false);
    $("#txt_area_direccion")
        .attr("disabled", false);
    $("#txt_correo_electronico")
        .attr("disabled", false);
    $("#txt_telefono_fijo")
        .attr("disabled", false);
    $("#txt_telefono_celular")
        .attr("disabled", false);
    $("#telefono_emergencia")
        .attr("disabled", false);
    $("#observacion")
        .attr("disabled", false);
    $('#btn_modificar_cas').attr("disabled", false);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_habilitar_cas').attr("disabled", true);
    $('#btn_grabar_datos_personales').attr("disabled", false);

    $("#slt_estado_civil").attr("disabled", false);
    $("#slc_departamento").attr("disabled", false);
    $("#slc_provincia").attr("disabled", false);
    $("#slc_distrito").attr("disabled", false);
    $("#slt_sexo_0")
        .attr("disabled", false)
        .prop("checked", false);

    $("#slt_sexo_1")
        .attr("disabled", false)
        .prop("checked", false);




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
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_departamento")
                .html('')
                .append('<option id=0> Seleccione </option>');
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
    dato_listar_provin = {
        "id": lc_id_departamento
    };
    $.ajax({
        data: dato_listar_provin,
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

}

function valida_nro_documento_si_existe(leer_nro_documento) {
    "use strict";
    buscar_nro = {
        'nro_doc': leer_nro_documento
    };
    $.ajax({
        data: buscar_nro,
        dataType: 'json',
        url: url + 'cas/verificar_si_existe_nro_documento_cas',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verifico === '1') {
                    leer_apellidos_nombres = filas.apellidos_nombres;
                    $("#msj_documento").html('<center><font size="-1" color="#EF6000">DNI Registrado a: ' + leer_apellidos_nombres + ' </font></center>');
                    $("#slt_sexo").attr("disabled", true);
                    $("#slt_sexo_0")
                        .attr("disabled", true)
                        .prop("checked", false);
                    $("#slt_sexo_1")
                        .attr("disabled", true)
                        .prop("checked", false);

                    $("#txt_paterno").attr("disabled", true);
                    $("#slt_tipo_documento").attr("disabled", false);
                    $("#txt_nro_documento").attr("disabled", false);

                } else {
                    $("#msj_documento").html('<center><font size="-1" color="#0041F1">DNI Conforme, Continue Registrando... </font></center>');
                    $("#slt_sexo_0")
                        .attr("disabled", false)
                        .prop("checked", false);
                    $("#slt_sexo_1")
                        .attr("disabled", false)
                        .prop("checked", false)
                        .focus();
                    $("#txt_paterno").attr("disabled", false);
                    $("#slt_tipo_documento").attr("disabled", false);
                    $("#txt_nro_documento").attr("disabled", false);

                }
            });
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


 
function grabar_nuevo_registro_cas(leer_idpais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_idestadocivil, leer_iddepartamento, leer_iddprovincia, leer_iddistrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion) {
    "use strict";
    datos_grabar_cas = {
        'idpais': leer_idpais,
        'iddocu': leer_tipo_documento,
        'nro_doc': leer_nro_documento,
        'sexo': leer_sexo,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'apellido_casada': leer_apellido_casada,
        'nombres': leer_nombres,
        'nacimiento': leer_fecha_nacimiento,
        'idestado_civil': leer_idestadocivil,
        'iddepar': leer_iddepartamento,
        'idprovin': leer_iddprovincia,
        'iddistri': leer_iddistrito,
        'direccion': leer_direccion,
        'correo': leer_correo_electronico,
        'fijo': leer_telefono_fijo,
        'celular': leer_celular_personal,
        'emergencia': leer_celular_emergencia,
        'observacion': leer_observacion
    };

    $.ajax({
        data: datos_grabar_cas,
        dataType: 'json',
        url: url + 'cas/grabar_registro_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_cas").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_cas").html("");
            desabilitar_etiquetas_pero_sin_limpiar();

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

function grabar_nuevo_registro_cas_modificar(leer_idpersonal, leer_idpais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_idestadocivil, leer_iddepartamento, leer_iddprovincia, leer_iddistrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion) {

    "use strict";
    datos_grabar_cas_modificar = {
        'id': leer_idpersonal,
        'idpais': leer_idpais,
        'iddocu': leer_tipo_documento,
        'nro_doc': leer_nro_documento,
        'sexo': leer_sexo,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'apellido_casada': leer_apellido_casada,
        'nombres': leer_nombres,
        'nacimiento': leer_fecha_nacimiento,
        'idestado_civil': leer_idestadocivil,
        'iddepar': leer_iddepartamento,
        'idprovin': leer_iddprovincia,
        'iddistri': leer_iddistrito,
        'direccion': leer_direccion,
        'correo': leer_correo_electronico,
        'fijo': leer_telefono_fijo,
        'celular': leer_celular_personal,
        'emergencia': leer_celular_emergencia,
        'observacion': leer_observacion
    };

    $.ajax({
        data: datos_grabar_cas_modificar,
        dataType: 'json',
        url: url + 'cas/grabar_registro_cas_modificado',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_cas").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_cas").html("");
            desabilitar_etiquetas_pero_sin_limpiar();
            listar_todo_el_personal_cas(lc_buscar_nombre);

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


function  desabilitar_personal_cas(leer_idpersonal){
    "use strict";
    
    dato_anular = {
        'id' : leer_idpersonal
    };
    
    $.ajax({
        data: dato_anular ,
        dataType: 'json',
        url: url + 'cas/dar_de_baja_cas',
        type: 'post',
        beforeSend: function () {
             $("#espera_grabacion_cas").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_cas").html("");
            desabilitar_etiquetas_pero_sin_limpiar();
            listar_todo_el_personal_cas(lc_buscar_nombre);
            $('#condicion_personal')
                .text(' ... DESACTIVADO  .. ')
                .removeClass("alert-info")
                .addClass("alert-warning");

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
    

function habilitar_personal_cas(leer_idpersonal){
    "use strict";
    
    dato_habilitar = {
        'id' : leer_idpersonal
    };
    
    $.ajax({
        data: dato_habilitar,
        dataType: 'json',
        url: url + 'cas/habilitar_cas',
        type: 'post',
        beforeSend: function () {
             $("#espera_grabacion_cas").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_cas").html("");
            desabilitar_etiquetas_pero_sin_limpiar();
            listar_todo_el_personal_cas(lc_buscar_nombre);
            $('#condicion_personal')
                .text(' ... HABILITADO  .. ')
                .removeClass("alert-warning")
                .addClass("alert-info");

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

 
function mostrar_personal_estado_cero(){
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
            limpiar_desabilitar_etiquetas();
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

    $('#btn_agregar_cas').click(function () {
        lc_tipo_operacion_cas = '1';
        limpiar_desabilitar_etiquetas();
        $("#slt_pais").attr("disabled", false);
        $("#slt_tipo_documento").attr("disabled", false);
    });

    $('#btn_modificar_cas').click(function () {
        lc_tipo_operacion_cas = '2';
        habilitar_etiquetas_para_edicion();
        $("#txt_nro_documento").focus();
    });

   $('#btn_eliminar_cas').click(function () {
        desabilitar_personal_cas(leer_idpersonal);
    });
    
   $('#btn_habilitar_cas').click(function () {
        habilitar_personal_cas(leer_idpersonal);
    });
    

    


    $("#slt_pais").change(function () {
        leer_idpais = $('#slt_pais  option:selected').attr('id');
    });
    $("#slt_tipo_documento").change(function () {
        leer_tipo_documento = $('#slt_tipo_documento  option:selected').attr('id');
        if (lc_tipo_operacion_cas === '1') {
            if (leer_tipo_documento !== '0') {
                leer_nombre_documento = $('#slt_tipo_documento  option:selected').attr('documento');
                $("#txt_documento_descripcion").html('<strong><font size="-2" >' + leer_nombre_documento + '</font></strong>');
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

    $('#txt_nro_documento')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function () {
            if (leer_tipo_documento === '1') {
                $('#txt_nro_documento').attr("MaxLength", 8);
                if ($('#txt_nro_documento').val().length === 8) {
                    leer_nro_documento = $("#txt_nro_documento").val();
                    valida_nro_documento_si_existe(leer_nro_documento);
                } else {
                    $("#msj_documento").html('<center><font size="-1" color="#EF6000">Minimo DNI, 8 Caracteres...</font></center>');
                }
            } else {
                $('#txt_nro_documento').attr("MaxLength", 30);
                if ($('#txt_nro_documento').val().length >= 8) {
                    leer_nro_documento = $("#txt_nro_documento").val();
                    valida_nro_documento_si_existe(leer_nro_documento);
                } else {
                    $("#msj_documento").html('<center><font size="-1" color="#EF6000">Nro Extranjeria Mayor que 8 Caracteres...</font></center>');
                }

            }



        });



    $("#slt_sexo_0").click(function () {
        leer_sexo = 'F';
         $("#apellido_casada").attr("disabled", false);
         $("#txt_paterno").focus();
    });

    $("#slt_sexo_1").click(function () {
        leer_sexo = 'M';
        $("#apellido_casada").attr("disabled", true);
        $("#txt_paterno").focus();
    });

    $("#txt_paterno").keypress(function (e) {
        $("#txt_materno").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_materno").focus();
        }
    });


    $("#txt_materno").keypress(function (e) {
        $("#txt_nombres").attr("disabled", false);
        if (e.which === 13) {
            $("#txt_nombres").focus();
        }
    });

    $("#apellido_casada").keypress(function (e) {
        $("#txt_nombres").attr("disabled", false);
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
        $("#slt_estado_civil")
            .attr("disabled", false)
            .focus();

    });



    $("#slt_estado_civil").change(function () {
        leer_idestadocivil = $("#slt_estado_civil  option:selected").attr('id');
        leer_estado_civil = $("#slt_estado_civil  option:selected").attr('descripcion');
        $("#estado_civil_registrado").val(leer_estado_civil);
        $("#slc_departamento")
            .attr("disabled", false)
            .focus();
    });



    $("#slc_departamento").change(function () {
        leer_iddepartamento = $('#slc_departamento option:selected').attr('id');
        leer_departamento = $('#slc_departamento option:selected').attr('nombre');
        if (leer_iddepartamento === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ningun departamento...</font></strong>');
        } else {
            listar_todas_las_provincias_de_un_departamento(leer_iddepartamento);
            leer_iddprovincia = '0';
            listar_todas_los_distritos_de_una_provincia(leer_iddepartamento, leer_iddprovincia);

            //  $("#nombre_departamento").val(leer_departamento);
            $("#slc_provincia")
                .attr("disabled", false)
                .focus();

        }
    });


    $("#slc_provincia").change(function () {
        leer_iddprovincia = $('#slc_provincia option:selected').attr('id');
        leer_provincia = $('#slc_provincia option:selected').attr('nombre');

        if (leer_iddprovincia === '0') {
            $("#mensaje_direccion")
                .fadeOut(0)
                .fadeIn(500)
                .html('<strong><font color="#F46A00" size = "1">No Selecciono ninguna provincia...</font></strong>');
        } else {
            listar_todas_los_distritos_de_una_provincia(leer_iddepartamento, leer_iddprovincia);
            //  $("#nombre_provincia").val(leer_provincia);
            $("#slc_distrito")
                .attr("disabled", false)
                .focus();

        }
    });


    $("#slc_distrito").change(function () {
        leer_iddistrito = $('#slc_distrito option:selected').attr('id');
        leer_distrito = $('#slc_distrito option:selected').attr('nombre');
        //  $("#nombre_distrito").val(leer_distrito);
        $("#txt_area_direccion")
            .attr("disabled", false)
            .focus();
    });



    $("#txt_area_direccion").keypress(function () {
        $("#txt_correo_electronico").attr("disabled", false);
        $("#txt_telefono_fijo").attr("disabled", false);
        $("#txt_telefono_celular").attr("disabled", false);
        $("#telefono_emergencia").attr("disabled", false);
        $("#observacion").attr("disabled", false);
    });



    $("#txt_correo_electronico")
        .keyup(function (e) {
            if (e.which === 13) {
                $("#txt_telefono_fijo").focus();
            }
        });



    $('#txt_telefono_fijo')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            $("#txt_telefono_celular").attr("disabled", false);
            $("#telefono_emergencia").attr("disabled", false);
        })
        .keyup(function (e) {
            if (e.which === 13) {
                $("#txt_telefono_celular").focus();
            }
        });


    $('#txt_telefono_celular')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            $("#telefono_emergencia").attr("disabled", false);
            $("#btn_grabar_datos_personales").attr("disabled", false);
        })
        .keyup(function (e) {
            if (e.which === 13) {
                $("#telefono_emergencia").focus();
            }
        });


    $('#telefono_emergencia')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            $("#observacion").attr("disabled", false);
        })
        .keyup(function (e) {
            if (e.which === 13) {
                $("#observacion").focus();
            }
        });

    
    
    $("#chk_debaja").on('change', function () {
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);
            
            
        }
    });

    
    




    $("#btn_grabar_datos_personales").click(function () {
        leer_nro_documento = $("#txt_nro_documento").val();
        leer_paterno = $("#txt_paterno").val();
        leer_materno = $("#txt_materno").val();
        leer_apellido_casada = $("#apellido_casada").val();
        leer_nombres = $("#txt_nombres").val();
        leer_fecha_nacimiento = $("#txt_nacimiento").val();
        leer_direccion = $("#txt_area_direccion").val();
        leer_correo_electronico = $("#txt_correo_electronico").val();
        leer_telefono_fijo = $("#txt_telefono_fijo").val();
        leer_celular_personal = $("#txt_telefono_celular").val();
        leer_celular_emergencia = $("#telefono_emergencia").val();
        leer_observacion = $("#observacion").val();


        if (lc_tipo_operacion_cas === '1') {
            leer_idpais = $('#slt_pais  option:selected').attr('id');
            leer_tipo_documento = $('#slt_tipo_documento  option:selected').attr('id');
            // leer_sexo = $('#slt_sexo  option:selected').attr('lc_sexo');
            leer_idestadocivil = $("#slt_estado_civil  option:selected").attr('id');
            leer_iddepartamento = $('#slc_departamento option:selected').attr('id');
            leer_iddprovincia = $('#slc_provincia option:selected').attr('id');
            leer_iddistrito = $('#slc_distrito option:selected').attr('id');
            grabar_nuevo_registro_cas(leer_idpais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_idestadocivil, leer_iddepartamento, leer_iddprovincia, leer_iddistrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion);
        } else {
            grabar_nuevo_registro_cas_modificar(leer_idpersonal, leer_idpais, leer_tipo_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_fecha_nacimiento, leer_idestadocivil, leer_iddepartamento, leer_iddprovincia, leer_iddistrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion);


        }







    });



});
