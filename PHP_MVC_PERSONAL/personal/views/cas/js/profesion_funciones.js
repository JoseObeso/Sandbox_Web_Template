// Funciones usadas en el master principal profesion.js

// leer_institucion
// inicializar_botones_habilidad_profesional

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
    
    

    $("#btn_agregar_habilidad").attr("disabled", true);
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
        $("#btn_agregar_educacion").attr("disabled", false);
        $("#btn_modificar_educacion").attr("disabled", true);
        $("#btn_eliminar_educacion").attr("disabled", true);

        $("#dni_usuario").text(leer_usuario_registro);
        $("#fecha_registro").text(leer_fecha_registro);
        $("#dni_usuario_modificacion").text(leer_usuario_modifico);
        $("#fecha_modificacion").text(leer_fecha_modifico);
        $("#dni_usuario_de_baja").text(leer_usuario_de_baja);
        $("#fecha_de_baja").text(leer_fecha_de_baja);
        $("#personal_seleccion_especialidades").text(leer_apellidos_nombres);
        $("#slc_tipo_especialidad_desple").attr("disabled", true);
        $("#btn_agregar_competencias").attr("disabled", false);
        ver_tipos_educacion_registradas(leer_idpersonal);
        inicializar_etiquetas_especialidad();
        lc_tipo_table = 'Es';
        ver_tipos_especialidad_por_cas(leer_idpersonal, lc_tipo_table);


        $("#slt_competencias_registrado").attr("disabled", true);
        lc_tipo_table_cm = 'Cm';
        ver_tipos_especialidad_por_cas_cm(leer_idpersonal, lc_tipo_table_cm);
        $("#btn_agregar_especialidades").attr("disabled", false);


        $("#personal_seleccion_capacitacion").text(leer_apellidos_nombres);
        lc_tipo_table_ca = 'Ca';
        ver_tipos_capacitacion_por_cas(leer_idpersonal, lc_tipo_table_ca);
        $("#btn_agregar_capacitacion").attr("disabled", false);
        
        
         lc_tipo_table_en = 'En';
        ver_tipos_entrenamientos_por_cas(leer_idpersonal, lc_tipo_table_en);
       
        $("#personal_seleccion_entrenamiento").text(leer_apellidos_nombres);
        $("#btn_agregar_entrenamiento").attr("disabled", false);
        
        
        
        








    } else {
        $("#personal_seleccion_nombre").text('');
        $("#btn_agregar_contrato").attr("disabled", true);
        $("#btn_modificar_contrato").attr("disabled", true);
        $("#btn_eliminar_contrato").attr("disabled", true);
        $("#btn_mostrar_adenda").attr("disabled", true);
        $("#btn_grabar_contrato").attr("disabled", true);
        $("#btn_agregar_especialidades").attr("disabled", true);

    }


}


function listar_tipos_de_educacion() {
    "use strict";
    dato_listar_educacion = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_educacion,
        dataType: 'json',
        url: url + 'parametros/listar_tipo_educacion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_tipo_educacion")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_tipo_educacion").append('<option id="' + filas.idtipo + '"  nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                } else {
                    $("#slt_tipo_educacion").attr("disabled", true);
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




function listar_universidades() {
    "use strict";
    dato_listar_universidad = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_universidad,
        dataType: 'json',
        url: url + 'personal/listar_todas_las_universidades',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista_universidad")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
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


function condicion_tipo_educacion() {
    "use strict";
    if (leer_idtipoe === '4' || leer_idtipoe === '11' || leer_idtipoe === '12') {
        $("#contiene_universidad").show();
        $("#txt_descripcion_universidad").show();
        $("#txt_educacion_no_universitaria")
            .attr("disabled", false)
            .hide();
        $("#slc_lista_universidad").show();
        $('#slc_lista_universidad').select2('open');
        $("#btn_agregar_habilidad").attr("disabled", false);
        $("#btn_eliminar_habilidad").attr("disabled", true);
    } else {
        $("#contiene_universidad").hide();
        $("#slc_lista_universidad").hide();
        $('#slc_lista_universidad').select2('close');
        $("#txt_descripcion_universidad").hide();
        $("#btn_agregar_habilidad").attr("disabled", true);
        $("#btn_eliminar_habilidad").attr("disabled", true);
        $("#txt_educacion_no_universitaria")
            .attr("disabled", false)
            .show()
            .focus();
    }

}



function listar_de_cargos() {
    "use strict";
    dato_listar_cargos = {
        "cargo": ''
    };
    $.ajax({
        data: dato_listar_cargos,
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




function leer_educacion_y_mostrarlo_etiquetas() {
    "use strict";
    leer_ideducacion = $('#slt_educacion_seleccion  option:selected').attr('id');
    lc_ver_si_se_selecciono_educacion = (typeof leer_ideducacion === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_educacion === '1') {
        leer_ideducacion = $('#slt_educacion_seleccion  option:selected').attr('id');
        leer_idtipoe = $('#slt_educacion_seleccion  option:selected').attr('tipo_educacion');
        leer_descripcion_educacion = $('#slt_educacion_seleccion  option:selected').attr('descripcion_educacion');
        leer_fecha_desde = $('#slt_educacion_seleccion  option:selected').attr('fecha_inicial');
        leer_fecha_hasta = $('#slt_educacion_seleccion  option:selected').attr('fecha_final');
        leer_condicion_estudios = $('#slt_educacion_seleccion  option:selected').attr('condicion');
        lc_id_universidad = $('#slt_educacion_seleccion  option:selected').attr('iduniversidad');
        leer_institucion = $('#slt_educacion_seleccion  option:selected').attr('institucion');
        lc_id_cargo = $('#slt_educacion_seleccion  option:selected').attr('idprofesion');
        leer_profesion = $('#slt_educacion_seleccion  option:selected').attr('profesion');
        leer_grupo_ocupacional = $('#slt_educacion_seleccion  option:selected').attr('grupo_ocupacional');
        leer_status = $('#slt_educacion_seleccion  option:selected').attr('estatus');
        leer_observacion = $('#slt_educacion_seleccion  option:selected').attr('observacion');
        ln_codigo_colegio = $('#slt_educacion_seleccion  option:selected').attr('idcolegio');
        leer_nombre_colegio = $('#slt_educacion_seleccion  option:selected').attr('nombre_colegio');
        leer_nro_colegiatura = $('#slt_educacion_seleccion  option:selected').attr('nro_colegio');
        leer_institucion_mantener = leer_institucion;

        $("#tipo_estudio").text(leer_descripcion_educacion + ' - ' + leer_institucion);
        if (leer_idtipoe === '4' || leer_idtipoe === '11' || leer_idtipoe === '12') {
            $("#btn_agregar_habilidad").attr("disabled", false);
            $("#btn_eliminar_habilidad").attr("disabled", true);

        } else {
            $("#btn_agregar_habilidad").attr("disabled", true);
            $("#btn_eliminar_habilidad").attr("disabled", true);
        }


        switch (leer_condicion_estudios) {
            case 'E':
                $("#Condicion_0")
                    .attr('disabled', true)
                    .prop('checked', true);
                break;

            case 'G':
                $("#Condicion_1")
                    .attr('disabled', true)
                    .prop('checked', true);
                break;

            case 'C':
                $("#Condicion_2")
                    .attr('disabled', true)
                    .prop('checked', true);
                break;

            case 'I':
                $("#Condicion_3")
                    .attr('disabled', true)
                    .prop('checked', true);
                break;
            default:
                break;
        }

        $("#fecha_desde").val(leer_fecha_desde);
        $("#fecha_hasta").val(leer_fecha_hasta);
        $("#txt_educacion_no_universitaria").val(leer_institucion);
        $("#txt_descripcion_universidad").val(leer_institucion);
        $("#grupo_ocupacional").val(leer_profesion + ' - ' + leer_grupo_ocupacional + ' - ' + leer_nombre_colegio);
        $("#nombre_carrera").text(leer_profesion);
        $("#txt_status_estudio").val(leer_status);
        $("#observacion").val(leer_observacion);
        $("#nro_colegiatura").val(leer_nro_colegiatura);

        $("#btn_agregar_educacion")
            .attr("disabled", false);
        $("#btn_modificar_educacion")
            .attr("disabled", false);
        $("#btn_eliminar_educacion")
            .attr("disabled", false);
        $("#btn_grabar_educacion")
            .attr("disabled", true);
        leer_carrera_mostrar_habilidades(leer_ideducacion);
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


    } else {

        $("#btn_agregar_educacion")
            .attr("disabled", true);
        $("#btn_modificar_educacion")
            .attr("disabled", true);
        $("#btn_eliminar_educacion")
            .attr("disabled", true);
        $("#btn_grabar_educacion")
            .attr("disabled", true);

    }


}



function grabar_registro_educacion(leer_idpersonal, leer_idtipoe, leer_fecha_desde, leer_fecha_hasta, leer_condicion_estudios, lc_id_universidad, leer_institucion, lc_id_cargo, leer_status, ln_codigo_colegio, leer_nro_colegiatura, leer_observacion) {
    "use strict";
    datos_grabar_educacion = {
        'idpersonal': leer_idpersonal,
        'tipoe': leer_idtipoe,
        'fecha_desde': leer_fecha_desde,
        'fecha_hasta': leer_fecha_hasta,
        'condicion': leer_condicion_estudios,
        'iduniversidad': lc_id_universidad,
        'institucion': leer_institucion,
        'idcargo': lc_id_cargo,
        'status': leer_status,
        'idcolegio': ln_codigo_colegio,
        'nro_colegiatura': leer_nro_colegiatura,
        'observacion': leer_observacion
    };
    $.ajax({
        data: datos_grabar_educacion,
        dataType: 'json',
        url: url + 'cas/grabar_registro_educacion',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_educacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_educacion").html("");
            ver_tipos_educacion_registradas(leer_idpersonal);
            limpiar_y_desabilitar_etiquetas_educacion();
            $("#btn_modificar_educacion")
                .attr("disabled", true);
            $("#btn_eliminar_educacion")
                .attr("disabled", true);

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


function ver_tipos_educacion_registradas(leer_idpersonal) {
    "use strict";
    dato_listar_educacion = {
        "idpersonal": leer_idpersonal
    };
    $.ajax({
        data: dato_listar_educacion,
        dataType: 'json',
        url: url + 'cas/ver_todos_educacion_por_personal',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_educacion_seleccion")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_educacion_seleccion").append('<option id="' + filas.ideducacion + '"  tipo_educacion = "' + filas.tipo_educacion + '"  descripcion_educacion = "' + filas.descripcion_educacion + '"  fecha_inicial = "' + filas.fecha_inicial + '"  fecha_final = "' + filas.fecha_final + '"  condicion = "' + filas.condicion + '"  descripcion_condicion = "' + filas.descripcion_condicion + '"  iduniversidad = "' + filas.iduniversidad + '"  institucion = "' + filas.institucion + '"  idprofesion = "' + filas.idprofesion + '"  profesion= "' + filas.profesion + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  estatus = "' + filas.estatus + '"  observacion = "' + filas.observacion + '"  idcolegio= "' + filas.idcolegio + '"  nombre_colegio = "' + filas.nombre_colegio + '"  nro_colegio = "' + filas.nro_colegio + '"  >' + filas.fecha_inicial + ' &nbsp;&nbsp;&#124; ' + filas.fecha_final + ' &nbsp;&nbsp;&#124; ' + filas.descripcion_condicion + ' &nbsp;&nbsp;&#124; ' + filas.institucion + '</option>');
                    $("#slt_educacion_seleccion").attr("disabled", false);
                } else {
                    $("#slt_educacion_seleccion").attr("disabled", true);
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

function modificar_registro_educacion(leer_idpersonal, leer_idtipoe, leer_fecha_desde, leer_fecha_hasta, leer_condicion_estudios, lc_id_universidad, lc_ver_institucion, lc_id_cargo, leer_status, ln_codigo_colegio, leer_nro_colegiatura, leer_observacion, leer_ideducacion) {

    "use strict";
    datos_grabar_educacion_mod = {
        'ideducacion': leer_ideducacion,
        'idpersonal': leer_idpersonal,
        'tipoe': leer_idtipoe,
        'fecha_desde': leer_fecha_desde,
        'fecha_hasta': leer_fecha_hasta,
        'condicion': leer_condicion_estudios,
        'iduniversidad': lc_id_universidad,
        'institucion': lc_ver_institucion,
        'idcargo': lc_id_cargo,
        'status': leer_status,
        'idcolegio': ln_codigo_colegio,
        'nro_colegio': leer_nro_colegiatura,
        'observacion': leer_observacion
    };
    $.ajax({
        data: datos_grabar_educacion_mod,
        dataType: 'json',
        url: url + 'cas/modificar_registro_educacion',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_educacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_educacion").html("");
            ver_tipos_educacion_registradas(leer_idpersonal);
            limpiar_y_desabilitar_etiquetas_educacion();
            $("#btn_modificar_educacion")
                .attr("disabled", true);
            $("#btn_eliminar_educacion")
                .attr("disabled", true);
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

function eliminar_registro_educacion(leer_ideducacion) {
    "use strict";
    datos_eliminar = {
        'ideducacion': leer_ideducacion
    };
    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'cas/eliminar_registro_educacion',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_educacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_educacion").html("");
            ver_tipos_educacion_registradas(leer_idpersonal);
            limpiar_y_desabilitar_etiquetas_educacion();
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


function leer_carrera_mostrar_habilidades(leer_ideducacion) {
    "use strict";
    dato_ver_habilidad = {
        "ideducacion": leer_ideducacion
    };
    $.ajax({
        data: dato_ver_habilidad,
        dataType: 'json',
        url: url + 'cas/ver_carrera_todo_habilidades',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_habilidad_profesional")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_habilidad_profesional").append('<option id="' + filas.idhabilidad + '"  fecha_inicio = "' + filas.fecha_inicio + '"  fecha_fin = "' + filas.fecha_fin + '"  nro_habilidad = "' + filas.nro_habilidad + '"  >' + filas.fecha_inicio + ' &nbsp;&nbsp;&#124; ' + filas.fecha_fin + ' &nbsp;&nbsp;&#124; ' + filas.nro_habilidad + '</option>');
                    $("#slt_habilidad_profesional").attr("disabled", false);
                } else {
                    $("#slt_habilidad_profesional").attr("disabled", true);
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


function ver_tipos_especialidad_por_cas(leer_idpersonal, lc_tipo_table) {

    "use strict";
    dato_ver_especialidad = {
        "idpersonal": leer_idpersonal,
        "tipo_table": lc_tipo_table
    };
    $.ajax({
        data: dato_ver_especialidad,
        dataType: 'json',
        url: url + 'cas/ver_especialidad_personal_cas',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_especialidades_registrado")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_especialidades_registrado").append('<option id="' + filas.ideecc + '" nro_id_eecc = "' + filas.nro_id_eecc + '"  descripcion = "' + filas.descripcion + '"  nro_eecc = "' + filas.nro_eecc + '"  descripcion = "' + filas.descripcion + '"  inicio = "' + filas.inicio + '"  fin = "' + filas.fin + '"  institucion = "' + filas.institucion + '"  observacion = "' + filas.observacion + '"  >' + filas.inicio + ' &nbsp;&nbsp;&#124; ' + filas.fin + ' &nbsp;&nbsp;&#124; ' + filas.descripcion + '</option>');
                    $("#slt_especialidades_registrado").attr("disabled", false);
                } else {
                    $("#slt_especialidades_registrado").attr("disabled", true);
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



function ver_tipos_especialidad_por_cas_cm(leer_idpersonal, lc_tipo_table_cm) {

    "use strict";
    dato_ver_especialidad_cm = {
        "idpersonal": leer_idpersonal,
        "tipo_table": lc_tipo_table_cm
    };
    $.ajax({
        data: dato_ver_especialidad_cm,
        dataType: 'json',
        url: url + 'cas/ver_especialidad_personal_cas_cm',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_competencias_registrado")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_competencias_registrado").append('<option id="' + filas.ideecc + '" nro_id_eecc = "' + filas.nro_id_eecc + '"  descripcion = "' + filas.descripcion + '"  nro_eecc = "' + filas.nro_eecc + '"  descripcion = "' + filas.descripcion + '"  inicio = "' + filas.inicio + '"  fin = "' + filas.fin + '"  institucion = "' + filas.institucion + '"  observacion = "' + filas.observacion + '"  >' + filas.inicio + ' &nbsp;&nbsp;&#124; ' + filas.fin + ' &nbsp;&nbsp;&#124; ' + filas.descripcion + '</option>');
                    $("#slt_competencias_registrado").attr("disabled", false);
                } else {
                    $("#slt_competencias_registrado").attr("disabled", true);
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





function ver_tipos_capacitacion_por_cas(leer_idpersonal, lc_tipo_table_ca) {


    "use strict";
    dato_ver_persona_ca = {
        "idpersonal": leer_idpersonal,
        "tipo_table": lc_tipo_table_ca
    };
    $.ajax({
        data: dato_ver_persona_ca,
        dataType: 'json',
        url: url + 'cas/ver_persona_por_cas_capacitacion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_capacitaciones_registrado")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_capacitaciones_registrado").append('<option id="' + filas.ideecc + '" nro_id_eecc = "' + filas.nro_id_eecc + '"  descripcion = "' + filas.descripcion + '"  nro_eecc = "' + filas.nro_eecc + '"  descripcion = "' + filas.descripcion + '"  inicio = "' + filas.inicio + '"  fin = "' + filas.fin + '"  institucion = "' + filas.institucion + '"  observacion = "' + filas.observacion + '"  >' + filas.inicio + ' &nbsp;&nbsp;&#124; ' + filas.fin + ' &nbsp;&nbsp;&#124; ' + filas.descripcion + '</option>');
                    $("#slt_capacitaciones_registrado").attr("disabled", false);
                } else {
                    $("#slt_capacitaciones_registrado").attr("disabled", true);
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






function ver_tipos_entrenamientos_por_cas(leer_idpersonal, lc_tipo_table_en) {
    "use strict";
    dato_ver_persona_entre = {
        "idpersonal": leer_idpersonal,
        "tipo_table": lc_tipo_table_en
    };
    $.ajax({
        data: dato_ver_persona_entre,
        dataType: 'json',
        url: url + 'cas/ver_persona_por_cas_entrenamiento',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_entrenamiento_registrado")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_entrenamiento_registrado").append('<option id="' + filas.ideecc + '" nro_id_eecc = "' + filas.nro_id_eecc + '"  descripcion = "' + filas.descripcion + '"  nro_eecc = "' + filas.nro_eecc + '"  descripcion = "' + filas.descripcion + '"  inicio = "' + filas.inicio + '"  fin = "' + filas.fin + '"  institucion = "' + filas.institucion + '"  observacion = "' + filas.observacion + '"  >' + filas.inicio + ' &nbsp;&nbsp;&#124; ' + filas.fin + ' &nbsp;&nbsp;&#124; ' + filas.descripcion + '</option>');
                    $("#slt_entrenamiento_registrado").attr("disabled", false);
                } else {
                    $("#slt_entrenamiento_registrado").attr("disabled", true);
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



