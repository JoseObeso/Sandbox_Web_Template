var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_dia = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
    leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idpersonal_seleccion, leer_descripcion_total_profesion, leer_descripcion_tipo_empleado, leer_condicion_trabajo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_id_profesion, leer_mes, leer_anio, leer_dni_personal_seleccion, leer_idfuncional, leer_descripcion_bloque, leer_descripcion_area_funcional, leer_descripcion_ambiente, leer_descripcion, data_insumos_para_crear_horarios, data_insumos_para_crear_horarios, nro_registros, data_insumos_para_ver_programacion, lc_fecha, lc_nombre_dia, lc_nombre_dia, leer_idturnohorario, leer_idturno, leer_turno, leer_descripcion_horario, ln_horas_total, leer_hora_inicial, lc_nombre_dia_seleccion, leer_hora_final, leer_horario_abreviado, data_programacion_grabar, data_lunes, cantidad_registros, valor_final, i, data_jueves, data_viernes, data_martes, data_miercoles, data_af, leer_idprogramacion, data_elim_id, lc_ver_si_seleccion_idpro, lc_fecha_programacion;

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
                        $("#slt_servicio_seleccion_add")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '"  >' + filas.servicio + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_servicio_seleccion")
                            .attr("disabled", true)
                            .empty();
                        $("#slt_servicio_seleccion_add")
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


function inicializar_etiquetas_sop() {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_upss_registrados();
    $("#slt_departamento_seleccion").attr("disabled", true);
    $("#slt_servicio_seleccion").attr("disabled", true);
    $("#slt_servicio_seleccion").attr("disabled", true);
    $("#slt_ambiene_funcional").attr("disabled", true);
    $("#btn_crear_programacion_mensual").attr("disabled", true);
    $("#slt_lista_ambiente_funcional").attr("disabled", true);
    $("#btn_eliminar_programacion").attr("disabled", true);
    listar_ambientes_funcional();
    $("#mes")
        .attr("disabled", true)
        .val(mes).attr("selected", "selected");
    $("#anio")
        .attr("disabled", true)
        .val(anio);

}

function listar_ambientes_funcional() {
    "use strict";
    var datos_ambiente_funcio = {
        "piso": ''
    };
    $.ajax({
        data: datos_ambiente_funcio,
        dataType: 'json',
        url: url + 'ambientes/listar_ambiente_funcional_total_cqx',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_ambiente_funcional")
                .html('');
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
                .html('')
                .append('<option id=0> -- Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_tipos_horarios_turnos")
                            .append('<option id="' + filas.id + '" idtipohorario = "' + filas.idtipohorario + '" turno = "' + filas.turno + '" descripcion = "' + filas.descripcion + '" horatoral = "' + filas.horatoral + '" horainicio = "' + filas.horainicio + '" horafin = "' + filas.horafin + '" horario_abreviado = "' + filas.horario_abreviado + '" observacion = "' + filas.observacion + '"  >' + filas.descripcion + ' --  ' + filas.horainicio + ' -- ' + filas.horafin + ' -- ' + filas.horario_abreviado + '</option>');

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

function generar_programacion_fija_para_sala_de_operaciones(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_insumos_para_crear_horarios = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'idservicio': leer_id_upss_depar_servicio,
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: data_insumos_para_crear_horarios,
        dataType: 'json',
        url: url + 'programacion/crear_programacion_para_sala_operaciones',
        type: 'post',
        beforeSend: function () {
            $("#espera_generacion_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $("#espera_generacion_grabacion").html("");
            leer_programacion_sala_operaciones(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idfuncional, leer_mes, leer_anio);
            seleccion_dias_de_la_semana_en_sop();
            $('#btn_crear_programacion_mensual').attr("disabled", true);

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

function leer_programacion_sala_operaciones(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_insumos_para_ver_programacion = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'idservicio': leer_id_upss_depar_servicio,
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: data_insumos_para_ver_programacion,
        dataType: 'json',
        url: url + 'programacion/ver_programacion_para_sala_operaciones',
        type: 'post',
        beforeSend: function () {
            $("#espera_generacion_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#espera_generacion_grabacion").html("");

            $("#slt_programacion_mensual")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {

                        /*
                        $("#slt_programacion_mensual").append('<option id="' + filas.id + '" fecha = "' + filas.fecha + '" nombre_dia = "' + filas.nombre_dia + '"  >' + filas.fecha + ' - ' + filas.nombre_dia + '</option>')
                            .attr("disabled", false);
*/


                    } else {
                        $("#slt_programacion_mensual")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_programacion_mensual").empty();
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


function convertir_fecha_caracter_a_date(leer_fecha) {
    "use strict";
    var separar_fechas = leer_fecha.split("/");
    var fecha_conforme = new Date(+separar_fechas[2], separar_fechas[1] - 1, +separar_fechas[0]);
    return fecha_conforme;
}



function seleccion_de_horario_y_grabar_mostrando_en_select_y_table() {
    "use strict";
    // leer_idfuncional
    lc_fecha_programacion = $("#slt_programacion_mensual").val();
    lc_fecha = lc_fecha_programacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    var lc_ver_si_selecciono_fecha = (typeof lc_fecha === 'undefined') || (lc_fecha === '') ? '' : '1';
    if (lc_ver_si_selecciono_fecha === '1') {
        lc_fecha_programacion = $("#slt_programacion_mensual").val();
        lc_fecha = lc_fecha_programacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
        lc_nombre_dia = nombre_dia[convertir_fecha_caracter_a_date(lc_fecha).getDay()];
        leer_idturnohorario = $('#slt_tipos_horarios_turnos option:selected').attr('id');
        leer_idturno = $('#slt_tipos_horarios_turnos option:selected').attr('idtipohorario');
        leer_turno = $('#slt_tipos_horarios_turnos option:selected').attr('turno');
        leer_descripcion_horario = $('#slt_tipos_horarios_turnos option:selected').attr('descripcion');
        ln_horas_total = $('#slt_tipos_horarios_turnos option:selected').attr('horatoral');
        leer_hora_inicial = $('#slt_tipos_horarios_turnos option:selected').attr('horainicio');
        leer_hora_final = $('#slt_tipos_horarios_turnos option:selected').attr('horafin');
        leer_horario_abreviado = $('#slt_tipos_horarios_turnos option:selected').attr('horario_abreviado');

        data_programacion_grabar = {
            'idfuncional': leer_idfuncional,
            'fecha': lc_fecha,
            'nombre_dia': lc_nombre_dia,
            'idupss': leer_id_upss_seleccion,
            'iddepar': leer_id_depar_seleccion,
            'idservicio': leer_id_upss_depar_servicio,
            'mes': leer_mes,
            'anio': leer_anio,
            'turno': leer_descripcion_horario,
            'hora_inicio': leer_hora_inicial,
            'hora_fin': leer_hora_final
        };

        $.ajax({
            data: data_programacion_grabar,
            dataType: 'json',
            url: url + 'programacion/asignar_programacion_a_id_funcional_sop',
            type: 'post',
            beforeSend: function () {
                $("#espera_generacion_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function () {
                $("#espera_generacion_grabacion").html("");
                seleccion_dias_de_la_semana_en_sop();
                $('#btn_crear_programacion_mensual').attr("disabled", true);
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


}

function seleccion_dias_de_la_semana_en_sop() {
    "use strict";
    seleccion_turno_lunes(leer_idfuncional, leer_mes, leer_anio);
    seleccion_turno_martes(leer_idfuncional, leer_mes, leer_anio);
    seleccion_turno_miercoles(leer_idfuncional, leer_mes, leer_anio);
    seleccion_turno_jueves(leer_idfuncional, leer_mes, leer_anio);
    seleccion_turno_viernes(leer_idfuncional, leer_mes, leer_anio);
    ver_ambiente_funcional_despues_de_grabar(leer_idfuncional, leer_mes, leer_anio);

}

function seleccion_turno_lunes(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_lunes = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_lunes,
        dataType: 'json',
        url: url + 'programacion/mostrar_turno_dia_lunes',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_muestra_lunes").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#contenido_turno_lunes").html("");
        },
        success: function (response) {
            $("#espera_mientras_muestra_lunes").html("");
            $("#contenido_turno_lunes").html("");
            cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_lunes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].dia + '</center></td><td>&nbsp;' + response[i].turno + '</td><td><center> ' + response[i].servicio + '</center></td></tr>';
                        $("#contenido_turno_lunes").append(valor_final);
                    }

                } else {
                    valor_final = '';
                    $("#contenido_turno_lunes").append(valor_final);

                }

            });

        }

    });

}

function seleccion_turno_martes(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_martes = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_martes,
        dataType: 'json',
        url: url + 'programacion/mostrar_turno_dia_martes',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_muestra_martes").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#espera_mientras_muestra_martes").html("");
            $("#contenido_turno_martes").html("");
            cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_martes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].dia + '</center></td><td>&nbsp;' + response[i].turno + '</td><td><center> ' + response[i].servicio + '</center></td></tr>';
                        $("#contenido_turno_martes").append(valor_final);
                    }

                } else {
                    valor_final = '';
                    $("#contenido_turno_martes").append(valor_final);

                }

            });


        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + ' EN CASO QUE TODO LO DEMAS ESTE BIEN, REVISE SI ENTRE LOS DATOS EXISTE LA Ñ Y USE DECODE/ENCODE' + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}

function seleccion_turno_miercoles(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_miercoles = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_miercoles,
        dataType: 'json',
        url: url + 'programacion/mostrar_turno_dia_miercoles',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_muestra_miercoles").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#espera_mientras_muestra_miercoles").html("");
            $("#contenido_turno_miercoles").html("");
            cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_miercoles").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].dia + '</center></td><td>&nbsp;' + response[i].turno + '</td><td><center> ' + response[i].servicio + '</center></td></tr>';
                        $("#contenido_turno_miercoles").append(valor_final);
                    }

                } else {
                    valor_final = '';
                    $("#contenido_turno_miercoles").append(valor_final);

                }

            });
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + ' EN CASO QUE TODO LO DEMAS ESTE BIEN, REVISE SI ENTRE LOS DATOS EXISTE LA Ñ Y USE DECODE/ENCODE' + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}

function seleccion_turno_jueves(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_jueves = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_jueves,
        dataType: 'json',
        url: url + 'programacion/mostrar_turno_dia_jueves',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_muestra_jueves").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#espera_mientras_muestra_jueves").html("");
            $("#contenido_turno_jueves").html("");
            cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_jueves").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].dia + '</center></td><td>&nbsp;' + response[i].turno + '</td><td><center> ' + response[i].servicio + '</center></td></tr>';
                        $("#contenido_turno_jueves").append(valor_final);
                    }

                } else {
                    valor_final = '';
                    $("#contenido_turno_jueves").append(valor_final);

                }

            });
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + ' EN CASO QUE TODO LO DEMAS ESTE BIEN, REVISE SI ENTRE LOS DATOS EXISTE LA Ñ Y USE DECODE/ENCODE' + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });
}

function seleccion_turno_viernes(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_viernes = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_viernes,
        dataType: 'json',
        url: url + 'programacion/mostrar_turno_dia_viernes',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_muestra_viernes").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#espera_mientras_muestra_viernes").html("");
            $("#contenido_turno_viernes").html("");
            cantidad_registros = response.length;
            response.forEach(function (filas) {
                $("#contenido_turno_viernes").html("");
                if (filas.verifico === '1') {
                    for (i = 0; i < response.length; i++) {
                        valor_final = '<tr><td><center>' + response[i].dia + '</center></td><td>&nbsp;' + response[i].turno + '</td><td><center> ' + response[i].servicio + '</center></td></tr>';
                        $("#contenido_turno_viernes").append(valor_final);
                    }

                } else {
                    valor_final = '';
                    $("#contenido_turno_viernes").append(valor_final);

                }

            });

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + ' EN CASO QUE TODO LO DEMAS ESTE BIEN, REVISE SI ENTRE LOS DATOS EXISTE LA Ñ Y USE DECODE/ENCODE' + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}


function ver_ambiente_funcional_despues_de_grabar(leer_idfuncional, leer_mes, leer_anio) {
    "use strict";
    data_af = {
        'idfuncional': leer_idfuncional,
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: data_af,
        dataType: 'json',
        url: url + 'programacion/ver_ambiente_funcional_registrado',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_programacion_registrada")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_programacion_registrada").append('<option id="' + filas.id + '"  >' + filas.total + '</option>')
                            .attr("disabled", false);


                    } else {
                        $("#slt_programacion_registrada")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_programacion_registrada").empty();
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

function leer_seleccion_programacion_registrada() {
    "use strict";
    leer_idprogramacion = $('#slt_programacion_registrada option:selected').attr('id');
    lc_ver_si_seleccion_idpro = (typeof leer_idprogramacion === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idpro === '1') {
        leer_idprogramacion = $('#slt_programacion_registrada option:selected').attr('id');
        $("#btn_eliminar_programacion").attr("disabled", false);

    } else {}
    // $("#btn_eliminar_programacion").attr("disabled", true);

}


function eliminar_idfuncional_de_programacion(leer_idprogramacion) {
    "use strict";

    data_elim_id = {
        'id': leer_idprogramacion
    };

    $.ajax({
        data: data_elim_id,
        dataType: 'json',
        url: url + 'programacion/eliminar_idfuncional',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            seleccion_dias_de_la_semana_en_sop();
            $("#btn_eliminar_programacion").attr("disabled", true);

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


function leer_programacion_mensual() {
    "use strict";
    lc_fecha = $('#slt_programacion_mensual option:selected').attr('fecha');
    lc_nombre_dia = $('#slt_programacion_mensual option:selected').attr('nombre_dia');

    //  $("#slt_tipos_horarios_turnos").attr("disabled", false);

    /*



    */





}


function seleccion_de_horario_y_grabar_mostrando_en_select_y_table_por_dia() {
    "use strict";
    lc_nombre_dia_seleccion = $('#slt_nombre_dia option:selected').attr('value');
    var lc_ver_si_selecciono_lc_nombre_dia_seleccion = (typeof lc_nombre_dia_seleccion === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_lc_nombre_dia_seleccion === '1') {
        lc_nombre_dia = lc_nombre_dia_seleccion;
        leer_idturnohorario = $('#slt_tipos_horarios_turnos option:selected').attr('id');
        leer_idturno = $('#slt_tipos_horarios_turnos option:selected').attr('idtipohorario');
        leer_turno = $('#slt_tipos_horarios_turnos option:selected').attr('turno');
        leer_descripcion_horario = $('#slt_tipos_horarios_turnos option:selected').attr('descripcion');
        ln_horas_total = $('#slt_tipos_horarios_turnos option:selected').attr('horatoral');
        leer_hora_inicial = $('#slt_tipos_horarios_turnos option:selected').attr('horainicio');
        leer_hora_final = $('#slt_tipos_horarios_turnos option:selected').attr('horafin');
        leer_horario_abreviado = $('#slt_tipos_horarios_turnos option:selected').attr('horario_abreviado');

        data_programacion_grabar = {
            'idfuncional': leer_idfuncional,
            'nombre_dia': lc_nombre_dia,
            'idupss': leer_id_upss_seleccion,
            'iddepar': leer_id_depar_seleccion,
            'idservicio': leer_id_upss_depar_servicio,
            'mes': leer_mes,
            'anio': leer_anio,
            'turno': leer_descripcion_horario,
            'hora_inicio': leer_hora_inicial,
            'hora_fin': leer_hora_final
        };

        $.ajax({
            data: data_programacion_grabar,
            dataType: 'json',
            url: url + 'programacion/asignar_programacion_a_id_funcional_sop_por_dia',
            type: 'post',
            beforeSend: function () {
                $("#espera_generacion_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function () {
                $("#espera_generacion_grabacion").html("");
                seleccion_dias_de_la_semana_en_sop();
                $('#btn_crear_programacion_mensual').attr("disabled", true);
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


 

}







$(document).ready(function () {
    "use strict";
    inicializar_etiquetas_sop();

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
        $("#slt_lista_ambiente_funcional").attr("disabled", false);
    });


    $("#slt_lista_ambiente_funcional").change(function () {
        leer_idfuncional = $('#slt_lista_ambiente_funcional option:selected').attr('id');
        leer_descripcion_bloque = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_bloque');
        leer_descripcion_area_funcional = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_area_funcional');
        leer_descripcion_ambiente = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_ambiente');
        leer_descripcion = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion');
        $("#descripcion_ambiente").text(leer_descripcion_ambiente);
        $("#area_funcional").text(leer_descripcion_area_funcional);
        $("#bloque").text('Bloq. : ' + leer_descripcion_bloque);
        $("#mes")
            .attr("disabled", false)
            .val(mes).attr("selected", "selected");
        $("#anio")
            .attr("disabled", false)
            .val(anio);
        $("#btn_crear_programacion_mensual").attr("disabled", false);
    });

    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
    });

    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
    });


    $("#btn_crear_programacion_mensual").click(function () {
        listar_horarios_turnos();
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        generar_programacion_fija_para_sala_de_operaciones(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idfuncional, leer_mes, leer_anio);
        // $("#slt_tipos_horarios_turnos").attr("disabled", true);
        $("#slt_tipos_horarios_turnos").attr("disabled", false);
        // slt_tipos_horarios_turnos

    });


    $("#slt_tipos_horarios_turnos")
        .change(function () {
            $("#slt_programacion_mensual").attr("disabled", false);
            $("#slt_nombre_dia").attr("disabled", false);

            // seleccion_de_horario_y_grabar_mostrando_en_select_y_table();

        })
        .keyup(function () {

        })
        .keydown(function () {

        });




    $("#slt_programacion_mensual")
        .change(function () {
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table();
            leer_programacion_mensual();

        })
        .keyup(function () {
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table();
            leer_programacion_mensual();

        })
        .keydown(function () {

            seleccion_de_horario_y_grabar_mostrando_en_select_y_table();
            leer_programacion_mensual();



        });


    /*
    leer_anio = $("#anio").val();
    
    */
    /*
        $('#slt_programacion_mensual').datepicker({
            format: 'dd/mm/yyyy',
            startDate: "-1y",
            endDate: "+2y",
            autoclose: true,
            placeholder: "Programacion Mensual",
        }).on('show', function () {});

    */

    $("#slt_programacion_mensual")
        .change(function () {
            lc_fecha_programacion = $("#slt_programacion_mensual").val();
            lc_fecha = lc_fecha_programacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table();
        })
        .keyup(function () {
            lc_fecha_programacion = $("#slt_programacion_mensual").val();
            lc_fecha = lc_fecha_programacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table();

        })


    .click(function () {
        lc_fecha_programacion = $("#slt_programacion_mensual").val();
        lc_fecha = lc_fecha_programacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
        seleccion_de_horario_y_grabar_mostrando_en_select_y_table();

    });




    $("#slt_nombre_dia")
        .change(function () {
            lc_nombre_dia_seleccion = $('#slt_nombre_dia option:selected').attr('value');
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table_por_dia();
        })
    .click(function () {
            lc_nombre_dia_seleccion = $('#slt_nombre_dia option:selected').attr('value');
            seleccion_de_horario_y_grabar_mostrando_en_select_y_table_por_dia();
        });





    $("#slt_programacion_registrada")
        .change(function () {
            leer_seleccion_programacion_registrada();
        })
        .keyup(function () {
            leer_seleccion_programacion_registrada();

        })
        .keydown(function () {
            leer_seleccion_programacion_registrada();

        });



    $("#btn_eliminar_programacion").click(function () {
        eliminar_idfuncional_de_programacion(leer_idprogramacion);

    });


});
