var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    datos_buscar_cas, nro_registros, lc_buscar_nombre = '',
    lc_registra_dni = '1',
    leer_idpersonal, leer_idpais, leer_nombre_pais, leer_tipo_documento, leer_nombre_documento, leer_nro_documento, leer_sexo, leer_paterno, leer_materno, leer_apellido_casada, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, leer_idestadocivil, leer_estado_civil, leer_iddepartamento, leer_departamento, leer_iddprovincia, leer_provincia, leer_iddistrito, leer_distrito, leer_direccion, leer_correo_electronico, leer_telefono_fijo, leer_celular_personal, leer_celular_emergencia, leer_observacion, leer_estado, cantidad_registros, nro_registros, lc_ver_si_se_selecciono, leer_usuario_registro, leer_fecha_registro, leer_usuario_modifico, leer_fecha_modifico, leer_usuario_de_baja, leer_fecha_de_baja, datos_buscar, i, valor_final, datos_buscar_cas_cero, dato_listar_parentesco;

var leer_id_parentesco, leer_nombre_parentesco, lc_registra_dni, leer_dni_familiar, lc_fecha_nacimiento, leer_paterno_familiar, leer_materno_familiar, leer_nombres_familiar, leer_ocupacion, data_ver_familiar, leer_observacion, leer_longitud_dni_familiar, lc_tipo_grabacion, data_grabar_familiar, nro_registros, leer_idfamiliar, lc_ver_si_se_selecciono_id, data_grabar_familiar_update, data_grabar_familiar_eliminar;





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
                        $("#select_personal_cas_existente").append('<option id="' + filas.id + '"  idpais = "' + filas.idpais + '" nombre_pais = "' + filas.nombre_pais + '" tipo_documento = "' + filas.tipo_documento + '"  nombre_documento = "' + filas.nombre_documento + '" nro_documento = "' + filas.nro_documento + '" sexo = "' + filas.sexo + '"  paterno= "' + filas.paterno + '" materno = "' + filas.materno + '" apellido_casada = "' + filas.apellido_casada + '"  nombres= "' + filas.nombres + '" apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento  = "' + filas.fecha_nacimiento + '"  edad= "' + filas.edad + '" idestadocivil = "' + filas.idestadocivil + '" estado_civil  = "' + filas.estado_civil + '" iddepartamento  = "' + filas.iddepartamento + '" departamento  = "' + filas.departamento + '" idprovincia  = "' + filas.idprovincia + '" provincia  = "' + filas.provincia + '" iddistrito  = "' + filas.iddistrito + '" distrito  = "' + filas.distrito + '" direccion  = "' + filas.direccion + '" correo_electronico  = "' + filas.correo_electronico + '" telefono_fijo = "' + filas.telefono_fijo + '" celular_personal  = "' + filas.celular_personal + '" celular_emergencia  = "' + filas.celular_emergencia + '" observacion = "' + filas.observacion + '" estado = "' + filas.estado + '" usuario  = "' + filas.usuario +
                            '" fecharegistro = "' + filas.fecharegistro + '" usuario_modifico = "' + filas.usuario_modifico + '"fecha_modifico  = "' + filas.fecha_modifico + '" usuariodebaja = "' + filas.usuariodebaja + '" fechadebaja = "' + filas.fechadebaja + '"  >' + filas.apellidos_nombres + '</option>');
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


function inicializar_etiquetas_y_cargar_personal() {
    "use strict";
    $('#btn_agregar_familiar').attr("disabled", true);
    $('#btn_modificar_familiar').attr("disabled", true);
    $('#btn_eliminar_familiar').attr("disabled", true);
    $('#btn_reporte_familiar').attr("disabled", true);
    listar_todo_el_personal_cas(lc_buscar_nombre);
    listar_parentesco();
}



function solo_desabilitar_botones_etiquetas() {
    "use strict";
    $('#btn_agregar_familiar').attr("disabled", true);
    $('#btn_modificar_familiar').attr("disabled", true);
    $('#btn_eliminar_familiar').attr("disabled", true);
    $('#btn_reporte_familiar').attr("disabled", true);

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
        $('#btn_agregar_familiar').attr("disabled", false);
        ver_familiar_de_personal(leer_idpersonal);


        inicializar_etiquetas_familiar();

    } else {
        $('#btn_agregar_familiar').attr("disabled", true);
        $('#btn_modificar_familiar').attr("disabled", true);
        $('#btn_eliminar_familiar').attr("disabled", true);
        $('#btn_reporte_familiar').attr("disabled", true);

    }
}





function listar_parentesco() {
    "use strict";
    dato_listar_parentesco = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_parentesco,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_parentescos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_parentesco")
                .html('')
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_parentesco").append('<option id="' + filas.id + '"  nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                } else {
                    $("#slt_parentesco").attr("disabled", true);
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

/* inicio de procesamiento de familiar */



function ver_familiar_de_personal(leer_idpersonal) {
    "use strict";
    data_ver_familiar = {
        'id_personal': leer_idpersonal
    };
    $.ajax({
        data: data_ver_familiar,
        dataType: 'json',
        url: url + 'cas/ver_familiar_del_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_familiar").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_grabacion_familiar").html("");
            $("#slt_carga_familiar")
                .attr("disabled", false)
                .html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_carga_familiar").append('<option id="' + filas.idfamiliar + '"  idparent = "' + filas.idparent + '" paretesco = "' + filas.paretesco + '" registro_dni = "' + filas.registro_dni + '"  dni = "' + filas.dni + '" nacimiento = "' + filas.nacimiento + '" paterno = "' + filas.paterno + '"  materno= "' + filas.materno + '" nombres = "' + filas.nombres + '" ocupacion = "' + filas.ocupacion + '" observacion = "' + filas.observacion + '"  >' + filas.paretesco + '  --  ' + filas.apellidos_nombres + '</option>');
                    } else {

                        $("#slt_carga_familiar")
                            .attr("disabled", true);

                    }
                });
            } else {
                $("#slt_carga_familiar").empty();
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



function inicializar_etiquetas_familiar() {
    "use strict";
    //    $('#btn_agregar_familiar').attr("disabled", true);
    $('#btn_modificar_familiar').attr("disabled", true);
    $('#btn_eliminar_familiar').attr("disabled", true);
    $('#btn_reporte_familiar').attr("disabled", true);
    listar_parentesco();
    $('#slt_parentesco').attr("disabled", true);
    $('#txt_dni')
        .attr("disabled", true)
        .val('');
    $('#chk_dni')
        .attr("disabled", true)
        .prop("checked", false);
    $('#txt_fecha_nacimiento')
        .attr("disabled", true)
        .val('');
    $("#txt_fecha_nacimiento").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    });
    $('#txt_paterno_familiar')
        .attr("disabled", true)
        .val('');

    $('#txt_materno_familiar')
        .attr("disabled", true)
        .val('');
    $('#txt_nombres_familiar')
        .attr("disabled", true)
        .val('');
    $('#txt_ocupacion')
        .attr("disabled", true)
        .val('');
    $('#txt_observacion_familiar')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_familiar').attr("disabled", true);

}


function desabilitar_etiquetas_pero_sin_limpiar_familiar() {
    "use strict";

    $('#btn_modificar_familiar').attr("disabled", true);
    $('#btn_eliminar_familiar').attr("disabled", true);
    $('#btn_reporte_familiar').attr("disabled", true);
    listar_parentesco();
    $('#slt_parentesco').attr("disabled", true);
    $('#txt_dni')
        .attr("disabled", true);
    $('#chk_dni')
        .attr("disabled", true)
        .prop("checked", false);
    $('#txt_fecha_nacimiento')
        .attr("disabled", true);
    $("#txt_fecha_nacimiento").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    });
    $('#txt_paterno_familiar')
        .attr("disabled", true);

    $('#txt_materno_familiar')
        .attr("disabled", true);
    $('#txt_nombres_familiar')
        .attr("disabled", true);
    $('#txt_ocupacion')
        .attr("disabled", true);
    $('#txt_observacion_familiar')
        .attr("disabled", true);
    $('#btn_grabar_familiar').attr("disabled", true);

}


function grabar_registro_familiar(leer_idpersonal, leer_id_parentesco, lc_registra_dni, leer_dni_familiar, lc_fecha_nacimiento, leer_paterno_familiar, leer_materno_familiar, leer_nombres_familiar, leer_ocupacion, leer_observacion) {

    "use strict";
    data_grabar_familiar = {
        'id_personal': leer_idpersonal,
        'id_parent': leer_id_parentesco,
        'registro_dni': lc_registra_dni,
        'dni': leer_dni_familiar,
        'fecha_nacimiento': lc_fecha_nacimiento,
        'paterno': leer_paterno_familiar,
        'materno': leer_materno_familiar,
        'nombres': leer_nombres_familiar,
        'ocupacion': leer_ocupacion,
        'observacion': leer_observacion
    };

    $.ajax({
        data: data_grabar_familiar,
        dataType: 'json',
        url: url + 'cas/grabar_nuevo_registro_familiar',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_familiar").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_familiar").html("");
            desabilitar_etiquetas_pero_sin_limpiar_familiar();
             ver_familiar_de_personal(leer_idpersonal);

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

 


function leer_familiar_mosrarlo_en_etiquetas() {
    "use strict";


    leer_idfamiliar = $('#slt_carga_familiar  option:selected').attr('id');
    lc_ver_si_se_selecciono_id = (typeof leer_idfamiliar === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_id  === '1') {
        leer_idfamiliar = $('#slt_carga_familiar  option:selected').attr('id');
        leer_id_parentesco = $('#slt_carga_familiar  option:selected').attr('idparent');
        leer_nombre_parentesco = $('#slt_carga_familiar  option:selected').attr('paretesco');
        lc_registra_dni = $('#slt_carga_familiar  option:selected').attr('registro_dni');
        leer_dni_familiar = $('#slt_carga_familiar  option:selected').attr('dni');
        lc_fecha_nacimiento = $('#slt_carga_familiar  option:selected').attr('nacimiento');
        leer_paterno_familiar = $('#slt_carga_familiar  option:selected').attr('paterno');
        leer_materno_familiar = $('#slt_carga_familiar  option:selected').attr('materno'); 
        leer_nombres_familiar = $('#slt_carga_familiar  option:selected').attr('nombres'); 
        leer_ocupacion = $('#slt_carga_familiar  option:selected').attr('ocupacion'); 
        leer_observacion = $('#slt_carga_familiar  option:selected').attr('observacion'); 
        $("#msj_familiar").text(leer_nombre_parentesco);
        $("#txt_dni").val(leer_dni_familiar);
        $("#txt_fecha_nacimiento").val(lc_fecha_nacimiento);
        $("#txt_paterno_familiar").val(leer_paterno_familiar);
        $("#txt_materno_familiar").val(leer_materno_familiar);
        $("#txt_nombres_familiar").val(leer_nombres_familiar);
        $("#txt_ocupacion").val(leer_ocupacion);
        $("#txt_observacion_familiar").val(leer_observacion);
        $('#btn_modificar_familiar').attr("disabled", false);
        $('#btn_eliminar_familiar').attr("disabled", false);
        $('#btn_grabar_familiar').attr("disabled", true);
         
        }
    
    else {
        
        desabilitar_etiquetas_pero_sin_limpiar_familiar();
    }
        

}



function habilitar_etiquetas_para_edicion(){
    "use strict";
    
    listar_parentesco();
    $('#slt_parentesco').attr("disabled", false);
    $('#txt_dni')
        .attr("disabled", false);
    $('#chk_dni')
        .attr("disabled", false)
        .prop("checked", false);
    $('#txt_fecha_nacimiento')
        .attr("disabled", false);
    $("#txt_fecha_nacimiento").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    });
    $('#txt_paterno_familiar')
        .attr("disabled", false);

    $('#txt_materno_familiar')
        .attr("disabled", false);
    $('#txt_nombres_familiar')
        .attr("disabled", false);
    $('#txt_ocupacion')
        .attr("disabled", false);
    $('#txt_observacion_familiar')
        .attr("disabled", false);
    $('#btn_grabar_familiar').attr("disabled", false);
    
  
}


function update_registro_familiar(leer_idfamiliar, leer_idpersonal, leer_id_parentesco, lc_registra_dni, leer_dni_familiar, lc_fecha_nacimiento, leer_paterno_familiar, leer_materno_familiar, leer_nombres_familiar, leer_ocupacion, leer_observacion) {
    
    "use strict";
    data_grabar_familiar_update = {
        'idfamiliar' : leer_idfamiliar,
        'id_parent': leer_id_parentesco,
        'registro_dni': lc_registra_dni,
        'dni': leer_dni_familiar,
        'fecha_nacimiento': lc_fecha_nacimiento,
        'paterno': leer_paterno_familiar,
        'materno': leer_materno_familiar,
        'nombres': leer_nombres_familiar,
        'ocupacion': leer_ocupacion,
        'observacion': leer_observacion
    };

    $.ajax({
        data: data_grabar_familiar_update,
        dataType: 'json',
        url: url + 'cas/update_registro_familiar',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_familiar").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_familiar").html("");
            desabilitar_etiquetas_pero_sin_limpiar_familiar();
             ver_familiar_de_personal(leer_idpersonal);

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

function eliminar_familiar(leer_idfamiliar){
    "use strict";
    
    data_grabar_familiar_eliminar = {
        'idfamiliar' : leer_idfamiliar
       
    };

    $.ajax({
        data: data_grabar_familiar_eliminar,
        dataType: 'json',
        url: url + 'cas/eliminar_registro_familiar',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_familiar").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_familiar").html("");
            // desabilitar_etiquetas_pero_sin_limpiar_familiar();
             ver_familiar_de_personal(leer_idpersonal);
             inicializar_etiquetas_familiar();

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


/* fin de procesamiento familiar */





$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();

    inicializar_etiquetas_y_cargar_personal();
    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {
            solo_desabilitar_botones_etiquetas();
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            listar_todo_el_personal_cas(lc_buscar_nombre);
        });

    $("#select_personal_cas_existente")
        .click(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_personal_cas_y_mostrarlo_en_etiquetas();
        });

    $("#slt_carga_familiar")
        .click(function () {
            leer_familiar_mosrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_familiar_mosrarlo_en_etiquetas();
        });
 
    $("#chk_debaja").on('change', function () {
        solo_desabilitar_botones_etiquetas();
        if ($(this).is(':checked')) {
            mostrar_personal_estado_cero();
        } else {
            lc_buscar_nombre = '';
            listar_todo_el_personal_cas(lc_buscar_nombre);


        }
    });

    $("#btn_agregar_familiar").click(function () {
        inicializar_etiquetas_familiar();
        lc_tipo_grabacion = '1';
        listar_parentesco();
        $("#slt_parentesco")
            .attr("disabled", false)
            .focus();
    });

    $("#btn_modificar_familiar").click(function () {
        lc_tipo_grabacion = '2';
        habilitar_etiquetas_para_edicion();
        listar_parentesco();
        $("#slt_parentesco")
            .attr("disabled", false)
            .focus();
    });

    $("#btn_eliminar_familiar").click(function () {
        eliminar_familiar(leer_idfamiliar);

    });

    
    
    

    $("#slt_parentesco").change(function () {
        leer_id_parentesco = $('#slt_parentesco  option:selected').attr('id');
        leer_nombre_parentesco = $('#slt_parentesco  option:selected').attr('nombre');
        $("#chk_dni")
            .attr("disabled", false)
            .prop("checked", false);
        $("#txt_dni")
            .attr("disabled", false)
            .focus();
    });


    $("#txt_fecha_nacimiento").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Nacimiento"
    });


    $("#chk_dni").on('change', function () {
        if ($(this).is(':checked')) {
            lc_registra_dni = '0';
            $("#txt_fecha_nacimiento")
                .attr("disabled", false)
                .focus();
        } else {
            lc_registra_dni = '1';
            $("#txt_dni")
                .attr("disabled", false)
                .focus();
        }
    });



    $("#txt_dni")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function () {
            leer_longitud_dni_familiar = $("#txt_dni").val().length;
            if (leer_longitud_dni_familiar === 8) {
                $("#txt_fecha_nacimiento")
                    .attr("disabled", false)
                    .focus();
            }
        });


    $("#txt_fecha_nacimiento").change(function () {
        lc_fecha_nacimiento = $("#txt_fecha_nacimiento").val();
        $("#txt_paterno_familiar")
            .attr("disabled", false)
            .focus();
    });

    $("#txt_paterno_familiar")
        .keypress(function (e) {
            $('#txt_materno_familiar').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_materno_familiar').focus();
            }
        })
        .click(function () {
            $('#txt_materno_familiar').attr("disabled", false);
        });



    $("#txt_materno_familiar")
        .keypress(function (e) {
            $('#txt_nombres_familiar').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_nombres_familiar').focus();
            }
        })
        .click(function () {
            $('#txt_nombres_familiar').attr("disabled", false);
        });

    $("#txt_nombres_familiar")
        .keypress(function (e) {
            $('#txt_ocupacion').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_ocupacion').focus();
            }
        })
        .click(function () {
            $('#txt_ocupacion').attr("disabled", false);
        });

    $("#txt_ocupacion")
        .keypress(function (e) {
            $('#btn_grabar_familiar').attr("disabled", false);
            $('#txt_observacion_familiar').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_observacion_familiar').focus();
            }
        })
        .click(function () {
            $('#txt_observacion_familiar').attr("disabled", false);
        });

    $("#txt_observacion_familiar")
        .keypress(function () {
            $('#btn_grabar_familiar').attr("disabled", false);
        })
        .click(function () {
            $('#btn_grabar_familiar').attr("disabled", false);
        });


    $('#btn_grabar_familiar').click(function () {

        // leer_id_parentesco, leer_nombre_parentesco, lc_registra_dni
        leer_dni_familiar = $("#txt_dni").val();
        lc_fecha_nacimiento = $("#txt_fecha_nacimiento").val();
        leer_paterno_familiar = $("#txt_paterno_familiar").val();
        leer_materno_familiar = $("#txt_materno_familiar").val();
        leer_nombres_familiar = $("#txt_nombres_familiar").val();
        leer_ocupacion = $("#txt_ocupacion").val();
        leer_observacion = $("#txt_observacion_familiar").val();
        if (lc_tipo_grabacion === '1') {
            grabar_registro_familiar(leer_idpersonal, leer_id_parentesco, lc_registra_dni, leer_dni_familiar, lc_fecha_nacimiento, leer_paterno_familiar, leer_materno_familiar, leer_nombres_familiar, leer_ocupacion, leer_observacion);
        } else {
            update_registro_familiar(leer_idfamiliar, leer_idpersonal, leer_id_parentesco, lc_registra_dni, leer_dni_familiar, lc_fecha_nacimiento, leer_paterno_familiar, leer_materno_familiar, leer_nombres_familiar, leer_ocupacion, leer_observacion);


        }




    });









});


