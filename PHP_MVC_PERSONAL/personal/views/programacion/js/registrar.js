var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_dia = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
    leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idpersonal_seleccion, leer_descripcion_total_profesion, leer_descripcion_tipo_empleado, leer_condicion_trabajo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_id_profesion, leer_mes, leer_anio, leer_dni_personal_seleccion, data_programacion_personal, leer_idfechasprogramacion, lc_ver_si_seleccion_leer_idfechasprogramacion, leer_idfechasprogramacion, leer_fecha_turno, leer_dia, leer_dia_nombre, data_programacion_listar_personal, leer_idturnohorario, leer_idturno, leer_turno, leer_descripcion_horario, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_horario_abreviado, data_elim_pro, leer_horario_mnt, lc_tipo_de_dia, lc_dia_seleccion, leer_idfuncional, leer_descripcion, lc_idactividad, lc_nombre, lc_abreviatura, lc_titulo_actividad, lc_fecha_turno_para_datetime, lc_leer_dia, data_grabar_actividad, data_ver_dni_lunes, i, valor_final, data_ver_dni_martes, data_ver_dni_miercoles, data_ver_dni_jueves, data_ver_dni_viernes, data_ver_dni_sabado, data_ver_dni_domingo, lc_nombre_dia_seleccion, data_asignar_actividad, data_horas, ln_total_horas_recuperado = 0,
    lc_fecha_programacion;


fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;

function listar_upss_registrados() {
    "use strict";
    var datos_listar_upss = {
        "upss": ''
    };
    $.ajax({
        data: datos_listar_upss,
        dataType: 'json',
        url: url + 'programacion/listar_tipos_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_upss_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_upss_seleccion")
                            .append('<option id="' + filas.id + '" upss = "' + filas.upss + '"  >' + filas.upss + '</option>');
                    } else {
                        $("#slt_upss_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_upss_seleccion").empty();
            }
        }

    });
}

// slt_personal_a_seleccionar

function ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion) {
    "use strict";
    var data_listar_upss_seleccion = {
        'idupss_seleccion': leer_id_upss_seleccion
    };
    $.ajax({
        data: data_listar_upss_seleccion,
        dataType: 'json',
        url: url + 'programacion/ver_departamentos_de_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_departamento_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_departamento_seleccion")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" departamento = "' + filas.departamento + '"  >' + filas.departamento + '</option>');
                    } else {
                        $("#slt_departamento_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_departamento_seleccion").empty();
            }
        }
    });
}

function ver_servicios_de_departamento_upss(leer_id_upss_seleccion, leer_id_depar_seleccion) {
    "use strict";
    var data_upss_depar = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion
    };
    $.ajax({
        data: data_upss_depar,
        dataType: 'json',
        url: url + 'programacion/ver_upss_departamento_servicios',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_servicio_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_servicio_seleccion")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '"  >' + filas.servicio + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_servicio_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_servicio_seleccion").empty();
            }
        }
    });
}

function listar_personal() {
    "use strict";
    var datos_listar_personal = {
        "idpersonal": ''
    };
    $.ajax({
        data: datos_listar_personal,
        dataType: 'json',
        url: url + 'programacion/listar_personal_para_programacion',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_personal_a_seleccionar")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_personal_a_seleccionar")
                            .append('<option id="' + filas.dni + '" condicion = "' + filas.condicion + '" apellidos_nombres = "' + filas.apellidos_nombres + '" idprofesion = "' + filas.idprofesion + '" descripcion_tipo_empleado = "' + filas.descripcion_tipo_empleado + '" descripcion_total_profesion = "' + filas.descripcion_total_profesion + '"  >' + filas.apellidos_nombres + '</option>');

                    } else {
                        $("#slt_personal_a_seleccionar")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_personal_a_seleccionar").empty();
            }
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



    $("#slt_personal_a_seleccionar").select2({
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

function inicializar_etiquetas_registrar() {
    "use strict";
    listar_upss_registrados();
    $("#slt_upss_seleccion").attr("disabled", false);
    $("#slt_departamento_seleccion").attr("disabled", true);
    $("#slt_servicio_seleccion").attr("disabled", true);
    $("#slt_personal_a_seleccionar").attr("disabled", true);
    $("#btn_eliminar_excepcion_a_personal").attr("disabled", true);
    $("#descripcion_profesion").text('');
    $("#tipo_de_labor").text('');
    $("#condicion_laboral").text('');
    $("#btn_crear_programacion").attr("disabled", true);
    $("#tipo_de_dia_0").attr("disabled", true);
    $("#tipo_de_dia_1").attr("disabled", true);
    $("#slt_fechas_para_programacion").attr("disabled", true);
    $("#btn_eliminar_programacion").attr("disabled", true);
    listar_todas_las_actividades();
    $("#slt_actividad").attr("disabled", true);
    $("#btn_registrar_horario_actividad").attr("disabled", true);
    $("#btn_eliminar_actividad").attr("disabled", true);
    //  $("#fecha_programacion_para_seleccionar").hide();




}

function generar_programacion_para_personal(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_dni_personal_seleccion, leer_condicion_trabajo, leer_mes, leer_anio) {
    "use strict";
    data_programacion_personal = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'idservicio': leer_id_upss_depar_servicio,
        'dni': leer_dni_personal_seleccion,
        'condicion': leer_condicion_trabajo,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_programacion_personal,
        dataType: 'json',
        url: url + 'programacion/programacion_para_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_crear_programacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_crear_programacion").html("");
            //   listar_programacion_mensual(leer_dni_personal_seleccion, leer_mes, leer_anio);
            $("#btn_crear_programacion").attr("disabled", true);
            $("#btn_eliminar_programacion").attr("disabled", false);

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




function listar_horarios_turnos() {
    "use strict";
    var datos_listar_ht = {
        "horarios": ''
    };
    $.ajax({
        data: datos_listar_ht,
        dataType: 'json',
        url: url + 'programacion/listar_horarios_de_turnos_final',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_tipos_horarios").html("");
            $("#slt_tipos_horarios_turnos")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_tipos_horarios_turnos")
                            .append('<option id="' + filas.id + '" idtipohorario = "' + filas.idtipohorario + '" turno = "' + filas.turno + '" descripcion = "' + filas.descripcion + '" horatoral = "' + filas.horatoral + '" horainicio = "' + filas.horainicio + '" horafin = "' + filas.horafin + '" horario_abreviado = "' + filas.horario_abreviado + '" observacion = "' + filas.observacion + '" horario_mnt = "' + filas.horario_mnt + '"  >' + filas.horainicio + ' -- ' + filas.horafin + ' -- ' + filas.horario_abreviado + '</option>');
                        $("#slt_tipos_horarios_turnos")
                            .attr("disabled", false);

                    } else {
                        $("#slt_tipos_horarios_turnos")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_tipos_horarios_turnos").empty();
            }
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


function seleccion_de_horario_y_mostrar() {
    "use strict";
    leer_idturnohorario = $('#slt_tipos_horarios_turnos option:selected').attr('id');
    leer_idturno = $('#slt_tipos_horarios_turnos option:selected').attr('idtipohorario');
    leer_turno = $('#slt_tipos_horarios_turnos option:selected').attr('turno');
    leer_descripcion_horario = $('#slt_tipos_horarios_turnos option:selected').attr('descripcion');
    ln_horas_total = $('#slt_tipos_horarios_turnos option:selected').attr('horatoral');
    leer_hora_inicial = $('#slt_tipos_horarios_turnos option:selected').attr('horainicio');
    leer_hora_final = $('#slt_tipos_horarios_turnos option:selected').attr('horafin');
    leer_horario_abreviado = $('#slt_tipos_horarios_turnos option:selected').attr('horario_abreviado');
    leer_horario_mnt = $('#slt_tipos_horarios_turnos option:selected').attr('horario_mnt');

    $("#tipo_de_turno").text('► TURNO : ' + leer_descripcion_horario);
    $("#inicio").text('► INICIO    : ' + leer_hora_inicial);
    $("#fin").text('► FIN       : ' + leer_hora_final);
    $("#total_horas").text('► HORAS     : ' + ln_horas_total);


    $("#tipo_de_dia_0").attr("disabled", false);
    $("#tipo_de_dia_1").attr("disabled", false);





}


function listar_ambientes_funcional(leer_id_upss_depar_servicio) {
    "use strict";
    var datos_ambiente_funcio = {
        "idservicio": leer_id_upss_depar_servicio
    };
    $.ajax({
        data: datos_ambiente_funcio,
        dataType: 'json',
        url: url + 'ambientes/listar_ambiente_funcional_total_por_servicio',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_ambiente_funcional")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambiente_funcional").append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" descripcion_piso = "' + filas.descripcion_piso + '" idbloque = "' + filas.idbloque + '" descripcion_bloque = "' + filas.descripcion_idbloque + '" idareafuncional = "' + filas.idareafuncional + '" descripcion_area_funcional = "' + filas.descripcion_area_funcional + '" idambiente = "' + filas.idambiente + '" descripcion_ambiente= "' + filas.descripcion_ambiente + '" descripcion =  "' + filas.descripcion + '" cupos =  "' + filas.nro_cupos + '" descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    } else {
                        $("#slt_lista_ambiente_funcional")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_ambiente_funcional").empty();
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


    $("#slt_lista_ambiente_funcional").select2({
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


function eliminar_programacion_mensual(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";

    data_elim_pro = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_elim_pro,
        dataType: 'json',
        url: url + 'programacion/eliminar_programacion_mensual_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_crear_programacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            // listar_programacion_mensual(leer_dni_personal_seleccion, leer_mes, leer_anio);
            $("#btn_crear_programacion").attr("disabled", false);
            $("#btn_eliminar_programacion").attr("disabled", true);
            $("#tipo_de_dia_0").attr("disabled", true);
            $("#tipo_de_dia_1").attr("disabled", true);
            $("#slt_fechas_para_programacion").attr("disabled", true);
            $("#slt_tipos_horarios_turnos")
                .attr("disabled", true)
                .empty();

            $("#upss").text('');
            $("#departamento").text('');
            $("#servicio").text('');

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




function listar_todas_las_actividades() {
    "use strict";
    var datos_listar_actividades = {
        "actividad": ''
    };
    $.ajax({
        data: datos_listar_actividades,
        dataType: 'json',
        url: url + 'programacion/listar_actividades_con_tipo_actividad',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga").html("");
            $("#slt_actividad")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_actividad").append('<option idactividad="' + filas.idactividad + '" actividad = "' + filas.actividad + '" idtipo_actividad = "' + filas.idtipo_actividad + '" tipo_actividad = "' + filas.tipo_actividad + '"  >' + filas.actividad + '</option>');
                    } else {
                        $("#slt_actividad")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_actividad").empty();
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


    $("#slt_actividad").select2({
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






function graba_actividad_con_horario(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_dni_personal_seleccion, leer_condicion_trabajo, leer_horario_abreviado, leer_horario_mnt, leer_idfuncional, lc_fecha_turno_para_datetime, lc_idactividad, lc_leer_dia, leer_mes, leer_anio, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_dia_nombre) {
    "use strict";
    data_grabar_actividad = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'idservi': leer_id_upss_depar_servicio,
        'dni': leer_dni_personal_seleccion,
        'condicion_trabajo': leer_condicion_trabajo,
        'codigo_horario': leer_horario_abreviado,
        'codigo_turno': leer_horario_mnt,
        'idfuncional': leer_idfuncional,
        'fecha_datetime': lc_fecha_turno_para_datetime,
        'idactividad': lc_idactividad,
        'dia': lc_leer_dia,
        'mes': leer_mes,
        'anio': leer_anio,
        'horas': ln_horas_total,
        'hora_inicio': leer_hora_inicial,
        'hora_fin': leer_hora_final,
        'dia_nombre': leer_dia_nombre

    };

    $.ajax({
        data: data_grabar_actividad,
        dataType: 'json',
        url: url + 'programacion/grabar_actividad_para_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_en_carga").html("");
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
        }
    });

}


function convertir_fecha_caracter_a_date(leer_fecha) {
    "use strict";
    var separar_fechas = leer_fecha.split("/");
    var fecha_conforme = new Date(+separar_fechas[2], separar_fechas[1] - 1, +separar_fechas[0]);
    return fecha_conforme;
}


function leer_y_grabar_actividad_a_personal() {
    "use strict";
    $("#slt_nombre_dia")
        .attr("disabled", true);
    $("#btn_eliminar_actividad").attr("disabled", false);
    lc_fecha_programacion = $('#slt_fechas_para_programacion').val();

    var lc_ver_si_selecciono_lc_fecha_programacion = (typeof lc_fecha_programacion === 'undefined') || (lc_fecha_programacion === '') ? '' : '1';
    if (lc_ver_si_selecciono_lc_fecha_programacion === '1') {
            var lc_fecha_comparar = (convertir_fecha_caracter_a_date(lc_fecha_programacion).getMonth() + 1);
        
            if (lc_fecha_comparar === parseInt(leer_mes)) {
                $("#espera_en_carga").html("");
                lc_fecha_turno_para_datetime = lc_fecha_programacion;
                leer_dia_nombre = nombre_dia[convertir_fecha_caracter_a_date(lc_fecha_turno_para_datetime).getDay()];
                lc_leer_dia = convertir_fecha_caracter_a_date(lc_fecha_turno_para_datetime).getDate();
                lc_idactividad = (typeof lc_idactividad === 'undefined') ? '0' : lc_idactividad;
                graba_actividad_con_horario(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_dni_personal_seleccion, leer_condicion_trabajo, leer_horario_abreviado, leer_horario_mnt, leer_idfuncional, lc_fecha_turno_para_datetime, lc_idactividad, lc_leer_dia, leer_mes, leer_anio, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_dia_nombre);
                mostrar_horario_dia_lunes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_martes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_miercoles(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_jueves(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_viernes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_sabado(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_domingo(leer_dni_personal_seleccion, leer_mes, leer_anio);
                contabilizar_horas(leer_dni_personal_seleccion, leer_mes, leer_anio);
                comprobar_horas_registradas();
        
                }
        else {
            
             $("#espera_en_carga").html("Dia / Mes Seleccionado Equivocado");
                    
            
            
            
        }
            
        
        
        
        
    }






}


function mostrar_horario_dia_lunes(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_lunes = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_lunes,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_lunes',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_lunes").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_lunes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_lunes").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_lunes").append(valor_final);

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


function mostrar_horario_dia_martes(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_martes = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_martes,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_martes',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_martes").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_martes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_martes").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_martes").append(valor_final);

                }

            });

        }

    });




}

function mostrar_horario_dia_miercoles(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_miercoles = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_miercoles,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_miercoles',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_miercoles").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_miercoles").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_miercoles").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_miercoles").append(valor_final);

                }

            });

        }

    });




}

function mostrar_horario_dia_jueves(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_jueves = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_jueves,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_jueves',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_jueves").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_jueves").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_jueves").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_jueves").append(valor_final);

                }

            });

        }

    });




}

function mostrar_horario_dia_viernes(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_viernes = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_viernes,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_viernes',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_viernes").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_viernes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_viernes").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_viernes").append(valor_final);

                }

            });

        }

    });




}

function mostrar_horario_dia_sabado(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_sabado = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_sabado,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_sabado',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_sabado").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_sabado").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_sabado").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_sabado").append(valor_final);

                }

            });

        }

    });




}

function mostrar_horario_dia_domingo(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";
    data_ver_dni_domingo = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };


    $.ajax({
        data: data_ver_dni_domingo,
        dataType: 'json',
        url: url + 'programacion/mostrar_datos_programacion_domingo',
        type: 'post',
        beforeSend: function () {

        },
        success: function (response) {

            $("#contenido_turno_domingo").html("");
            // cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_domingo").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].final + '</center></td></tr>';
                        $("#contenido_turno_domingo").append(valor_final);
                    }
                } else {
                    valor_final = '';
                    $("#contenido_turno_domingo").append(valor_final);

                }

            });

        }

    });

}

function crear_horario_actividades_por_dia(leer_dni_personal_seleccion, leer_horario_abreviado, leer_horario_mnt, leer_idfuncional, lc_idactividad, leer_mes, leer_anio, ln_horas_total, leer_hora_inicial, leer_hora_final, lc_nombre_dia_seleccion) {
    "use strict";
    data_asignar_actividad = {
        'dni': leer_dni_personal_seleccion,
        'codigo_horario': leer_horario_abreviado,
        'codigo_turno': leer_horario_mnt,
        'idfuncional': leer_idfuncional,
        'idactividad': lc_idactividad,
        'mes': leer_mes,
        'anio': leer_anio,
        'horas': ln_horas_total,
        'hora_inicio': leer_hora_inicial,
        'hora_fin': leer_hora_final,
        'dia_nombre': lc_nombre_dia_seleccion
    };

    $.ajax({
        data: data_asignar_actividad,
        dataType: 'json',
        url: url + 'programacion/grabar_actividad_por_dia',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            mostrar_horario_dia_lunes(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_martes(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_miercoles(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_jueves(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_viernes(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_sabado(leer_dni_personal_seleccion, leer_mes, leer_anio);
            mostrar_horario_dia_domingo(leer_dni_personal_seleccion, leer_mes, leer_anio);
            contabilizar_horas(leer_dni_personal_seleccion, leer_mes, leer_anio);
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


function contabilizar_horas(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";

    data_horas = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_horas,
        dataType: 'json',
        url: url + 'programacion/contar_cantidad_horas',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            encontrados.forEach(function (filas) {
                if (filas.verifico === '1') {
                    ln_total_horas_recuperado = filas.total;


                } else {
                    ln_total_horas_recuperado = 0;
                }
            });
            $("#total_hora_contadas").text('Total Horas : ' + ln_total_horas_recuperado);
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


// slt_actividad

function comprobar_horas_registradas() {
    "use strict";


    if (ln_total_horas_recuperado >= 150) {
        $("#slt_lista_ambiente_funcional").attr("disabled", true);
        $("#slt_actividad").attr("disabled", true);
        $("#slt_tipos_horarios_turnos").attr("disabled", true);
        $("#tipo_de_dia_0").attr("disabled", false);
        $("#tipo_de_dia_1").attr("disabled", false);


    } else {
        $("#slt_lista_ambiente_funcional").attr("disabled", false);
        $("#slt_actividad").attr("disabled", false);
        $("#slt_tipos_horarios_turnos").attr("disabled", false);
    }

}

function eliminar_actividad_en_fecha_seleccionada(leer_dni_personal_seleccion, lc_fecha_turno_para_datetime) {
    "use strict";
    var data_eliminar = {
        'dni': leer_dni_personal_seleccion,
        'fecha': lc_fecha_turno_para_datetime
    };
    $.ajax({
        data: data_eliminar,
        dataType: 'json',
        url: url + 'programacion/eliminar_turno_actividad_por_dni',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $("#btn_eliminar_actividad").attr("disabled", true);

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
    inicializar_etiquetas_registrar();
    listar_personal();


    $("#slt_upss_seleccion").change(function () {
        leer_id_upss_seleccion = $('#slt_upss_seleccion option:selected').attr('id');
        ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion);
        $("#slt_departamento_seleccion").attr("disabled", false);
    });

    $("#slt_departamento_seleccion").change(function () {
        leer_id_depar_seleccion = $('#slt_departamento_seleccion option:selected').attr('id');
        ver_servicios_de_departamento_upss(leer_id_upss_seleccion, leer_id_depar_seleccion);

    });


    $("#slt_servicio_seleccion").change(function () {
        leer_id_upss_depar_servicio = $('#slt_servicio_seleccion option:selected').attr('id');
        listar_personal();
        $('#slt_personal_a_seleccionar').attr("disabled", false);
    });


    $("#slt_personal_a_seleccionar").change(function () {
        leer_idpersonal_seleccion = $('#slt_personal_a_seleccionar option:selected').attr('id');
        leer_id_profesion = $('#slt_personal_a_seleccionar option:selected').attr('idprofesion');
        leer_descripcion_total_profesion = $('#slt_personal_a_seleccionar option:selected').attr('descripcion_total_profesion');
        leer_descripcion_tipo_empleado = $('#slt_personal_a_seleccionar option:selected').attr('descripcion_tipo_empleado');
        leer_condicion_trabajo = $('#slt_personal_a_seleccionar option:selected').attr('condicion');
        $("#descripcion_profesion").text(leer_idpersonal_seleccion + ' - ' + leer_descripcion_total_profesion);
        $("#tipo_de_labor").text(leer_descripcion_tipo_empleado);
        $("#condicion_laboral").text(leer_condicion_trabajo);
        $("#slt_mes")
            .attr("disabled", false)
            .val(mes).attr("selected", "selected");
        $("#anio")
            .attr("disabled", false)
            .val(anio);
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        leer_mes = mes;
        leer_anio = anio;
        $("#btn_crear_programacion").attr("disabled", false);

    });


    $("#slt_mes")
        .change(function () {
            leer_mes = $("#slt_mes").val();
            leer_anio = $("#anio").val();
            $("#dni_personal").val(leer_idpersonal_seleccion);
            leer_dni_personal_seleccion = $("#dni_personal").val();
            $("#btn_crear_programacion").attr("disabled", false);
        })
        .click(function () {
            $("#btn_crear_programacion").attr("disabled", false);
        });


    $("#anio").click(function () {
        leer_mes = $("#slt_mes").val();
        leer_anio = $("#anio").val();
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        $("#btn_crear_programacion").attr("disabled", false);

    });


    $("#btn_crear_programacion").click(function () {
        generar_programacion_para_personal(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_dni_personal_seleccion, leer_condicion_trabajo, leer_mes, leer_anio);
        // listar_programacion_mensual(leer_dni_personal_seleccion, leer_mes, leer_anio);
        listar_ambientes_funcional(leer_id_upss_depar_servicio);
        $("#slt_lista_ambiente_funcional").attr("disabled", false);
        mostrar_horario_dia_lunes(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_martes(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_miercoles(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_jueves(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_viernes(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_sabado(leer_dni_personal_seleccion, leer_mes, leer_anio);
        mostrar_horario_dia_domingo(leer_dni_personal_seleccion, leer_mes, leer_anio);
        contabilizar_horas(leer_dni_personal_seleccion, leer_mes, leer_anio);
        listar_todas_las_actividades();
        comprobar_horas_registradas();
        $("#slt_actividad").attr("disabled", false);



    });

    $("#btn_eliminar_programacion").click(function () {
        eliminar_programacion_mensual(leer_dni_personal_seleccion, leer_mes, leer_anio);
        $("#btn_crear_programacion").attr("disabled", false);
    });



    $("#slt_lista_ambiente_funcional").change(function () {
        leer_idfuncional = $('#slt_lista_ambiente_funcional option:selected').attr('id');
        leer_descripcion = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion');
        $("#slt_actividad").attr("disabled", false);
        listar_horarios_turnos();

    });

    $("#slt_actividad").change(function () {
        lc_idactividad = $('#slt_actividad option:selected').attr('idactividad');
        lc_nombre = $('#slt_actividad option:selected').attr('actividad');
        lc_abreviatura = $('#slt_actividad option:selected').attr('idtipo_actividad');
        lc_titulo_actividad = $('#slt_actividad option:selected').attr('tipo_actividad');
        $("#actividad").text(lc_titulo_actividad);
        listar_horarios_turnos();

    });

    $("#slt_tipos_horarios_turnos")
        .click(function () {
            seleccion_de_horario_y_mostrar();
        })
        .keyup(function () {
            seleccion_de_horario_y_mostrar();

        })
        .keydown(function () {
            seleccion_de_horario_y_mostrar();

        });




    $('#slt_fechas_para_programacion').datepicker({
        format: 'dd/mm/yyyy',
        showOn: "button",
        /*startDate: "y",
        endDate: "y", */
        autoclose: false,
        placeholder: "Fecha de Programacion",
        todayHighlight: true,

    }).on('show', function () {});




    $('#slt_fechas_para_programacion').focus(function () {
        $('#slt_fechas_para_programacion').datepicker('show');
    });


    $("#tipo_de_dia_0").click(function () {
        
        $('#slt_fechas_para_programacion')
            .attr("disabled", false)
            .show()
            .focus();
        lc_tipo_de_dia = '1';
        $("#slt_nombre_dia").attr("disabled", true);

    });


    $("#tipo_de_dia_1").click(function () {
        $("#slt_nombre_dia").attr("disabled", false);
        lc_tipo_de_dia = '2';
        $("#slt_fechas_para_programacion")
            .attr("disabled", true)
            .hide();


    });




    $("#slt_fechas_para_programacion")
        .change(function () {
            leer_y_grabar_actividad_a_personal();
        });






    $("#slt_nombre_dia").change(function () {
        $("#slt_fechas_para_programacion").attr("disabled", true);


        // $("#fecha_programacion_para_seleccionar").hide();

        lc_nombre_dia_seleccion = $('#slt_nombre_dia option:selected').attr('value');
        lc_idactividad = (typeof lc_idactividad === 'undefined') ? '0' : lc_idactividad;
        crear_horario_actividades_por_dia(leer_dni_personal_seleccion, leer_horario_abreviado, leer_horario_mnt, leer_idfuncional, lc_idactividad, leer_mes, leer_anio, ln_horas_total, leer_hora_inicial, leer_hora_final, lc_nombre_dia_seleccion);


    });



    $("#btn_registrar_horario_actividad").click(function () {
        if (lc_tipo_de_dia === '1') {
            lc_dia_seleccion = $('#slt_fechas_para_programacion option:selected').attr('dia');
            // filtras por leer_mes, leer_anio, leer_dni_personal_seleccion, lc_dia_seleccion
            // grabar : leer_idfuncional, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_horario_abreviado, leer_horario_mnt, lc_tipo_de_dia
            // grabar_registro_programacion(leer_idfuncional, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_horario_abreviado, leer_horario_mnt, leer_mes, leer_anio, leer_dni_personal_seleccion, lc_dia_seleccion);
        } else {

        }

    });





    $("#btn_eliminar_actividad").click(function () {

        if (lc_tipo_de_dia === '1') {
            lc_fecha_programacion = $("#slt_fechas_para_programacion").val();
            var lc_ver_si_selecciono_lc_fecha_programacion = (typeof lc_fecha_programacion === 'undefined') || (lc_fecha_programacion === '') ? '' : '1';
            if (lc_ver_si_selecciono_lc_fecha_programacion === '1') {
                lc_fecha_turno_para_datetime = lc_fecha_programacion;
                // lc_fecha_turno_para_datetime = $('#slt_fechas_para_programacion option:selected').attr('fecha_turno');
                eliminar_actividad_en_fecha_seleccionada(leer_dni_personal_seleccion, lc_fecha_turno_para_datetime);
                mostrar_horario_dia_lunes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_martes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_miercoles(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_jueves(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_viernes(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_sabado(leer_dni_personal_seleccion, leer_mes, leer_anio);
                mostrar_horario_dia_domingo(leer_dni_personal_seleccion, leer_mes, leer_anio);
                contabilizar_horas(leer_dni_personal_seleccion, leer_mes, leer_anio);
                comprobar_horas_registradas();
            }









        } else {



        }



    });


 
});
