var url = 'http://' + document.domain + '/rrhh/turnos/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    leer_idempleado, leer_dni, leer_apellidos_nombres, leer_condicion_trabajo, leer_condicion_empleado, leer_mes, leer_anio, dato_buscar, lc_buscar_nombre, nro_registros, leer_dni, datos_crear_horario, leer_apellidos_nombres, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes, leer_anio, get_datos_asistencia, i, ln_total_horas, leer_nombre_del_mes, leer_id_horario, leer_cod_horario, leer_cod_turno, leer_hora_ingreso, leer_hora_salida, leer_horas, leer_id_departamento, datos_servicio, leer_id_servicio, leer_id_actividades, leer_turno, datos_grabar_actividad, ln_dia, datos_actividades, cantidad_registros, i, valor_final;

fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idempleado = $('#ver_personal  option:selected').attr('idempleado');
    leer_dni = $('#ver_personal  option:selected').attr('dni');
    leer_apellidos_nombres = $('#ver_personal  option:selected').attr('apellidos_nombres');
    leer_condicion_trabajo = $('#ver_personal  option:selected').attr('tipo_condicion_trabajo');
    leer_condicion_empleado = $('#ver_personal  option:selected').attr('tipo_condicion_empleado');
    $("#cargo").text('DNI : ' + leer_dni + ' - Cargo : ' + leer_condicion_empleado);
    $("#tipo").text('ID ' + leer_idempleado + ' -  Condicion : ' + leer_condicion_trabajo);
    $("#apellidos").text(leer_apellidos_nombres);
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    leer_nombre_del_mes = nombre_meses[leer_mes - 1];
    leer_programacion_asistencia(leer_dni, leer_mes, leer_anio);
    mostrar_actividades_registradas(leer_dni, leer_mes, leer_anio);
}


function leer_programacion_asistencia(leer_dni, leer_mes, leer_anio) {
    "use strict";
    get_datos_asistencia = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: get_datos_asistencia,
        dataType: 'json',
        url: url + 'actividades/ver_asistencia_sisgalen',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#id_programacion").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 1) {
                ln_total_horas = 0;
                encontrados.forEach(function (filas) {
                    $("#id_programacion").append('<option value="' + filas.id + '" id = "' + filas.id + '" nombre_dia = "' + filas.dia_nombre + '" nro_dia = "' + filas.dia + '" entrada = "' + filas.entrada + '" salida = "' + filas.salida + '" horas = "' + filas.horas + '"  >' + filas.dia + ' - ' + filas.dia_nombre + ' - ' + filas.horario + ' - ' + filas.turno + ' - ' + filas.entrada + ' - ' + filas.salida + '</option>');
                });
                for (i = 0; i < encontrados.length; i++) {
                    ln_total_horas += parseInt(encontrados[i].horas);
                }
                $("#total_horas").text('Total Horas: ' + ln_total_horas);
                $("#id_programacion").attr("disabled", false);
            } else {
                $("#id_programacion").append('');
                $("#total_horas").text('');
                $("#id_programacion").attr("disabled", true);
                $('#btn_crear_horario').attr("disabled", false);
            }
        }
    });
    $('#btn_Grabar').attr("disabled", true);
}



function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'actividades/buscar_por_nombre_sisgalen',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#ver_personal").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#ver_personal").append('<option value="' + filas.idempleado + '" idempleado = "' + filas.idempleado + '" dni= "' + filas.dni + '" apellidos_nombres="' + filas.apellidos_nombres + '" fecha_nacimiento="' + filas.FechaNacimiento + '" sexo="' + filas.sexo + '" Tipo_condicion_trabajo="' + filas.Tipo_condicion_trabajo + '" Tipo_Condicion_empleado="' + filas.Tipo_Condicion_empleado + '" activo="' + filas.activo + '" > ' + filas.dni + ' - ' + filas.apellidos_nombres + '</option>');
                });
                $("#seleccion_horario").attr("disabled", false);
                $("#id_programacion").attr("disabled", false);
                $("#grabacion").text("");
            } else {
                $("#ver_personal").empty();
                $("#id_programacion").attr("disabled", true);
                $("#seleccion_horario").attr("disabled", true);
            }
        }
    });
}


function mostrar_horario_seleccionado() {
    "use strict";
    leer_id_horario = $('#seleccion_horario option:selected').attr('id');
    leer_cod_horario = $('#seleccion_horario option:selected').attr('codigo');
    leer_cod_turno = $('#seleccion_horario option:selected').attr('codigoturno');
    leer_hora_ingreso = $('#seleccion_horario option:selected').attr('horaingreso');
    leer_hora_salida = $('#seleccion_horario option:selected').attr('horasalida');
    leer_horas = $('#seleccion_horario option:selected').attr('horas');
    $('#btn_Grabar').attr("disabled", false);
    $("#grabacion").text("");
}


function crear_horario_personal_asistencial(leer_mes, leer_anio, leer_idempleado, leer_dni) {
    "use strict";
    datos_crear_horario = {
        'mes': leer_mes,
        'anio': leer_anio,
        'id': leer_idempleado,
        'dni': leer_dni
    };

    $.ajax({
        data: datos_crear_horario,
        dataType: 'json',
        url: url + 'actividades/crear_horario_asistencial_desde_sigalen',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            leer_programacion_asistencia(leer_dni, leer_mes, leer_anio);
            $("#mostrar_espera").html('<center><font color="#000000"><em><strong>...Creacion Conforme......</strong></em></font></center>');
            $('#btn_crear_horario').attr("disabled", true);

        }
    });


}

function leer_programacion_y_mostrar_actividades() {
    "use strict";
    ln_dia = $('#id_programacion option:selected').attr('nro_dia');
    $('#seleccion_departamento').attr("disabled", false);

}


function mostrar_servicios_desde_id_departamento(leer_id_departamento) {
    "use strict";
    datos_servicio = {
        'id': leer_id_departamento
    };
    $.ajax({
        data: datos_servicio,
        dataType: 'json',
        url: url + 'actividades/listar_servicios',
        type: 'post',
        beforeSend: function () {},
        success: function (servicios) {
            $("#seleccion_servicio").html('');
            servicios.forEach(function (filas) {
                $("#seleccion_servicio").attr("disabled", false);
                $("#seleccion_servicio").append('<option value="' + filas.id + '" id = "' + filas.id + '" nombre= "' + filas.nombre + '" > ' + filas.nombre + '</option>');
            });
        }
    });
}


function mostrar_actividades_registradas(leer_dni, leer_mes, leer_anio) {
    "use strict";
    datos_actividades = {
        'dni': leer_dni,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: datos_actividades,
        dataType: 'json',
        url: url + 'actividades/leer_actividades',
        type: 'post',
        beforeSend: function () {
            $("#espera_mostrar").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#espera_mostrar").html('');
            $("#mostrar_actividades").html('');
            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = '<tr><td>' + datos[i].departamento + '</td><td>' + datos[i].servicio + '</td><td>&nbsp;' + datos[i].nombre + '</td><td>' + datos[i].dia + '/' + datos[i].mes + '/' + datos[i].anio + '</td><td>' + datos[i].turno + '</td></tr>';
                    $("#mostrar_actividades").append(valor_final);
                }

                

            } else {
                valor_final = '';
               $("#mostrar_actividades").append(valor_final);
            }





        }
    });




}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    $("#grabacion").text("");

    $("#ver_personal")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#id_programacion")
        .click(function () {
            leer_programacion_y_mostrar_actividades();
        })
        .keyup(function () {
            leer_programacion_y_mostrar_actividades();
        });


    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            $('#btn_Grabar').attr("disabled", true);
            $("#seleccion_horario").attr("disabled", true);
            $("#id_programacion").empty();
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });



    $("#mes").click(function () {
        $("#mostrar_espera").html('');
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        leer_datos_mostrarlo_en_etiquetas();

    });

    $("#anio").click(function () {
        $("#mostrar_espera").html('');
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        leer_datos_mostrarlo_en_etiquetas();

    });



    $("#seleccion_horario")
        .click(function () {
            mostrar_horario_seleccionado();
        })
        .keyup(function () {
            mostrar_horario_seleccionado();
        });


    $('#btn_crear_horario').attr("disabled", false);


    $("#btn_crear_horario").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        crear_horario_personal_asistencial(leer_mes, leer_anio, leer_idempleado, leer_dni);
    });


    $("#seleccion_departamento").change(function () {
        leer_id_departamento = $('#seleccion_departamento option:selected').attr('id');
        $("#seleccion_servicio").val('');
        mostrar_servicios_desde_id_departamento(leer_id_departamento);
    });

    $("#seleccion_servicio").change(function () {
        leer_id_servicio = $('#seleccion_servicio option:selected').attr('id');
        $("#seleccion_actividades").attr("disabled", false);
    });


    $("#seleccion_actividades").change(function () {
        leer_id_actividades = $('#seleccion_actividades option:selected').attr('id');
        $("#seleccion_turno").attr("disabled", false);
    });

    $("#seleccion_turno").change(function () {
        leer_turno = $('#seleccion_turno option:selected').attr('codigo');
        $("#numero_horas").attr("disabled", false);
    });

    $("#numero_horas").bind('keyup mouseup', function () {
        $("#btn_Grabar").attr("disabled", false);
    });

    $("#btn_Grabar").click(function () {
        leer_horas = $("#numero_horas").val();
        datos_grabar_actividad = {
            'idempleado': leer_idempleado,
            'dni': leer_dni,
            'iddepartamento': leer_id_departamento,
            'idservicio': leer_id_servicio,
            'idactividad': leer_id_actividades,
            'dia': ln_dia,
            'mes': leer_mes,
            'anio': leer_anio,
            'turno': leer_turno,
            'horas': leer_horas
        };
        $.ajax({
            data: datos_grabar_actividad,
            dataType: 'json',
            url: url + 'actividades/grabar_actividad',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_grabacion_actividad").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function () {
                $("#mostrar_grabacion_actividad").html('');
                $("#btn_Grabar").attr("disabled", true);
                mostrar_actividades_registradas(leer_dni, leer_mes, leer_anio);


            }
        });
    });

});
