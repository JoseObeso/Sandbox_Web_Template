var url = 'http://' + document.domain + '/rrhh/personal/',
    lc_buscar_nombre, dato_buscar, nro_registros, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id_empleado, leer_dni_empleado, leer_apellidos_nombres, leer_fecha_nacimiento, leer_sexo, leer_tipo_condicion_trabajo, leer_edad, msj_activo, ver_datos_especialidad, datos_ce, leer_tipo_condicion_empleado, leer_activo, leer_telefono, leer_usuario, dato_buscar_id, i, cantidad_registros, valor_final, lid_medico, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes, leer_anio, datos_para_marcaciones, i, datos_actividades, leer_mes_actividad, leer_anio_actividad, datos_citas, mostrar_datos_atenciones, lc_verificar, datos_em, mostrar_datos_emergencia, datos_ho, mostrar_datos_hospitalizacion, datos_apoyo, mostrar_datos_tratamiento, lc_tipo_condicion, leer_dni_rrhh, leer_nro_contrato, leer_nro_proceso, leer_ruc_rrhh, leer_nacimiento, leer_direccion, leer_fecha_ingreso, leer_estado_civil, leer_correo_electronico, leer_telefono, leer_hijos, leer_edad, leer_especialidad, leer_servicio, leer_grupo_ocupacional, leer_cargo, leer_profesion, leer_unidad, leer_sueldo, leer_universidad, leer_colegiatura, leer_segunda_especialidad, leer_universidad_especialidad, leer_maestria_doctorado, mostrar_datos_qx, datos_recetas, mostrar_datos_recetas;


fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;


// ver_id

function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };

    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'personal/buscar_por_nombre_en_sigalen',
        type: 'post',
        beforeSend: function () {
            $("#ver_espera_procesos").show();
            $("#ver_espera_procesos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#ver_espera_procesos").html('');
            $("#ver_espera_procesos").hide();
            $("#ver_personal").html('');
            $("#ver_personal").show();
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#ver_personal").append('<option value="' + filas.idempleado + '"  idempleado = "' + filas.idempleado + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '" fecha_nacimiento = "' + filas.FechaNacimiento + '" sexo = "' + filas.sexo + '" Tipo_condicion_trabajo = "' + filas.Tipo_condicion_trabajo + '" Tipo_Condicion_empleado = "' + filas.Tipo_Condicion_empleado + '" activo = "' + filas.activo + '" telefono = "' + filas.telefono + '"tipo_condicion = "' + filas.tipo_condicion + '" edad = "' + filas.edad + '" usuario = "' + filas.usuario + '"  >' + filas.apellidos_nombres + '</option>');
                });
                $("#total_registrado").text(nro_registros + ' - Empleados Registrados.');
            } else {

                $("#total_registrado").text(' 0  - Empleados Registrados.');


            }
        }
    });
    buscar_nombre_dni_en_rrhh(lc_buscar_nombre);

}

function buscar_nombre_dni_en_rrhh(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'personal/buscar_por_nombre_en_rrhh',
        type: 'post',
        beforeSend: function () {
            $("#ver_espera_procesos").show();
            $("#ver_espera_procesos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#personal_rrhh").attr("disabled", false);
            $("#ver_espera_procesos").html('');
            $("#ver_espera_procesos").hide();
            $("#personal_rrhh").html('');
            $("#personal_rrhh").show();
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#personal_rrhh").attr("disabled", false);
                        $("#personal_rrhh").append('<option dni="' + filas.dni +
                            '"nro_contrato = "' + filas.nro_contrato +
                            '"nro_proceso = "' + filas.nro_proceso +
                            '"ruc = "' + filas.ruc +
                            '"apellidos_nombres = "' + filas.apellidosnombres +
                            '"fechaingreso = "' + filas.fechaingreso +
                            '"direccion = "' + filas.direccion +
                            '"nacimiento = "' + filas.nacimiento +
                            '"edad = "' + filas.edad +
                            '"ingreso = "' + filas.fechaingreso +
                            '"civil = "' + filas.estado_civil +
                            '"hijos = "' + filas.hijos +
                            '"correo_electronico = "' + filas.correo_electronico +
                            '"telefono = "' + filas.telefono +
                            '"sueldo = "' + filas.sueldo +
                            '"servicio = "' + filas.servicio +
                            '"grupo_ocupacional = "' + filas.grupo_ocupacional +
                            '"cargo = "' + filas.cargo +
                            '"profesion = "' + filas.profesion +
                            '"unidad = "' + filas.unidad +
                            '"especialidad = "' + filas.especialidad +
                            '"condicion = "' + filas.estado +
                            '"universidad = "' + filas.universidad +
                            '"colegiatura = "' + filas.colegiatura +
                            '"segunda_especialidad = "' + filas.segunda_especialidad +
                            '"universidad_especialidad = "' + filas.universidad_especialidad +
                            '"maestria_doctorado = "' + filas.maestria_doctorado +

                            '"  >' + filas.apellidosnombres + '</option>');
                    } else {
                        $("#personal_rrhh").attr("disabled", true);
                    }
                });
            } else {
                $("#personal_rrhh").attr("disabled", true);
            }
        }








    });
}

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id_empleado = $('#ver_personal  option:selected').attr('idempleado');
    leer_dni_empleado = $('#ver_personal  option:selected').attr('dni');
    leer_apellidos_nombres = $('#ver_personal  option:selected').attr('apellidos_nombres');
    leer_fecha_nacimiento = $('#ver_personal  option:selected').attr('fecha_nacimiento');
    leer_sexo = $('#ver_personal  option:selected').attr('sexo');
    leer_tipo_condicion_trabajo = $('#ver_personal  option:selected').attr('Tipo_condicion_trabajo');
    leer_tipo_condicion_empleado = $('#ver_personal  option:selected').attr('Tipo_condicion_empleado');
    leer_activo = $('#ver_personal  option:selected').attr('activo');
    leer_telefono = $('#ver_personal  option:selected').attr('telefono');
    leer_usuario = $('#ver_personal  option:selected').attr('usuario');
    leer_edad = $('#ver_personal  option:selected').attr('edad');
    lc_tipo_condicion = $('#ver_personal  option:selected').attr('tipo_condicion');
    $("#mes").attr("disabled", false);
    $("#anio").attr("disabled", false);
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    leer_mes_actividad = $("#mes_actividad").val();
    leer_anio_actividad = $("#anio_actividad").val();
    switch (leer_activo) {
        case '1':
            msj_activo = "OPERATIVO";
            break;
        case '2':
            msj_activo = "DE BAJA";
            break;
        default:
            msj_activo = "NO DEFINIDO";
            break;
    }
    $("#ver_id").text(leer_id_empleado);
    $("#ver_apellidos_nombres").text(leer_apellidos_nombres);
    $("#ver_dni").text(leer_dni_empleado);
    $("#ver_nacimiento").text(leer_fecha_nacimiento);
    $("#ver_sexo").text(leer_sexo);
    $("#ver_fono").text(leer_telefono);
    $("#ver_usuario").text(leer_usuario);
    $("#ver_edad").text(leer_edad);
    $("#ver_operativo").text(msj_activo);
    $("#ver_condicion").text(leer_tipo_condicion_trabajo);
    $("#ver_cargo").text(leer_tipo_condicion_empleado);
    buscar_nombre_dni_en_rrhh(leer_dni_empleado);
    switch (leer_activo) {
        case '1':
            $("#ver_tipo_condicion_laboral").html('Condicion SIGALEN : <em><strong><font color="#1040F8" size="-2">' + lc_tipo_condicion + '</font></strong></em>');
            break;
        case '0':
            $("#ver_tipo_condicion_laboral").html("Condicion SIGALEN : <em><strong><font color='#FF0000' size='-2'>" + lc_tipo_condicion + "</font></strong></em>");
            break;
        default:
            break;
    }
    dato_buscar_id = {
        "id": leer_id_empleado
    };
    $.ajax({
        data: dato_buscar_id,
        dataType: 'json',
        url: url + 'personal/ver_registro',
        type: 'post',
        beforeSend: function () {
            $("#espera_registro").show();
            $("#espera_registro").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (response) {
            $("#mostrar_registro")
                .html('')
                .show();
            $("#espera_registro").hide();
            $("#espera_registro").html('');
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td>&nbsp;' + response[i].apellidos_nombres + '</td><td>&nbsp;' + response[i].fecha_operacion + '</td><td><center> ' + response[i].hora_operacion + '</center> </td></tr>';
                    $("#mostrar_registro").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#mostrar_registro").append(valor_final);
                $("#mostrar_registro").empty();
            }
        }
    });

    $.ajax({
        data: dato_buscar_id,
        dataType: 'json',
        url: url + 'personal/buscar_colegiatura',
        type: 'post',
        beforeSend: function () {},
        success: function (response) {
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                $("#espera_de_detalle").html('');
                response.forEach(function (elemento) {
                    $("#ver_colegiatura").html('' + elemento.colegiatura + ' ');
                    $("#ver_rne").html(' &#124;&#124; RNE :' + elemento.rne + '');
                    $("#ver_id_medico").html(' &#124;&#124; ID Med. :' + elemento.idmedico + '');
                    lid_medico = elemento.idmedico;
                });

            } else {

            }
            ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad);
        }
    });



    ver_datos_especialidad = {
        "id_medico": lid_medico
    };
    $.ajax({
        data: ver_datos_especialidad,
        dataType: 'json',
        url: url + 'personal/ver_especialidad',
        type: 'post',
        beforeSend: function () {},
        success: function (response) {
            $("#mostrar_especialidad")
                .html('')
                .show();
            $("#espera_especialidad").hide();
            $("#espera_especialidad").html('');
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td>&nbsp;' + response[i].departamento + '</td><td>&nbsp;' + response[i].especialidad + '</td></tr>';
                    $("#mostrar_especialidad").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#mostrar_especialidad").append(valor_final);
                $("#mostrar_especialidad").empty();
            }
        }
    });

    procesar_asistencia(leer_dni_empleado, leer_mes, leer_anio);
    mostrar_actividades_registradas(leer_dni_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
    ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);


}

function procesar_asistencia(leer_dni_empleado, leer_mes, leer_anio) {
    "use strict";
    datos_para_marcaciones = {
        'dni': leer_dni_empleado,
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_para_marcaciones,
        dataType: 'json',
        url: url + 'personal/ver_marcaciones_de_asistencia',
        type: 'post',
        beforeSend: function () {
            $("#primer_formato_marcacion").hide();
            $("#espera_mientras_muestra_marcaciones")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#primer_formato_marcacion")
                .html('')
                .show();
            $("#espera_mientras_muestra_marcaciones").hide();
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td>' + response[i].fecha_mostrar + '</td><td>&nbsp;' + response[i].nombre_dia + '</td><td>' + response[i].hora_mostrar + '</td></tr>';
                    $("#primer_formato_marcacion").append(valor_final);
                }
                // $("#btn_imprimir").attr("disabled", false);
            } else {
                valor_final = '';
                $("#primer_formato_marcacion").append(valor_final);
                $("#primer_formato_marcacion").empty();
                // $("#btn_imprimir").attr("disabled", true);
            }
        }
    });
}

function mostrar_actividades_registradas(leer_dni_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_actividades = {
        'dni': leer_dni_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_actividades,
        dataType: 'json',
        url: url + 'personal/leer_actividades',
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
                    valor_final = '<tr><td>' + datos[i].servicio + '</td><td>' + datos[i].actividad + '</td><td>' + datos[i].dia + '/' + datos[i].mes + '/' + datos[i].anio + '</td><td>' + datos[i].turno + '</td><td>' + datos[i].horas + '</td></tr>';
                    $("#mostrar_actividades").append(valor_final);
                    $("#departamento").text('Departamento : ' + datos[i].departamento);
                }

            } else {
                valor_final = '';
                $("#mostrar_actividades").append(valor_final);
                $("#departamento").text('');
            }

        }
    });
}

function ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_citas = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_citas,
        dataType: 'json',
        url: url + 'personal/leer_citas',
        type: 'post',
        beforeSend: function () {
            $("#espera_mostrar_citas").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#espera_mostrar_citas").html('');
            $("#mostrar_citas").html('');
            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = '<tr><td>' + datos[i].fecha + '</td><td>' + datos[i].inicio + '</td><td>' + datos[i].fin + '</td><td>' + datos[i].cita + '</td><td>' + datos[i].paciente + '</center></td><td>' + datos[i].departamento + '</td><td>' + datos[i].servicio + '</td></tr>';
                    $("#mostrar_citas").append(valor_final);

                }

            } else {
                valor_final = '';
                $("#mostrar_citas").append(valor_final);
            }

        }
    });
}

function ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_ce = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_ce,
        dataType: 'json',
        url: url + 'personal/ver_atencion_citas',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_atenciones").html('');
            $("#mostrar_espera_atenciones").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#mostrar_espera_atenciones").html('');
            $("#mostrar_atenciones").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_atenciones = '<tr><td>' + datos[i].fechahoraprogramada + '</td><td><center>' + datos[i].apellidosnombres + '</center></td><td><center>' + datos[i].destino + '</center></td><td>' + datos[i].fechainicioatencion + '</center></td><td>' + datos[i].horainicioatencion + '</center></td><td>' + datos[i].fechafinalatencion + '</td><td><center>' + datos[i].horafinalatencion + '</td><td><center>' + datos[i].condicion + '</td><td><center>' + datos[i].diferencia + '</center></td></tr>';
                    $("#mostrar_atenciones").append(mostrar_datos_atenciones);
                }
            } else {
                mostrar_datos_atenciones = '';
                $("#mostrar_atenciones").append(mostrar_datos_atenciones);
            }
        }
    });
}

function ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_em = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_em,
        dataType: 'json',
        url: url + 'personal/ver_atencion_emergencia',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_emergencia").html('');
            $("#mostrar_espera_emergencia").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#mostrar_emergencia").html('');
            $("#mostrar_espera_emergencia").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_emergencia = '<tr><td>' + datos[i].fechahoraingreso + '</td><td>' + datos[i].apellidosnombres + '</td><td>' + datos[i].destino + '</td><td>' + datos[i].fechaegreso + '</td><td>' + datos[i].horaegreso + '</td><td>' + datos[i].condicion + '</td></tr>';
                    $("#mostrar_emergencia").append(mostrar_datos_emergencia);
                }
            } else {
                mostrar_datos_emergencia = '';
                $("#mostrar_emergencia").append(mostrar_datos_emergencia);
            }
        }
    });
}

function ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_ho = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_ho,
        dataType: 'json',
        url: url + 'personal/ver_atencion_hospitalizacion',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_hospitalizacion").html('');
            $("#mostrar_espera_hospitalizacion").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#mostrar_hospitalizacion").html('');
            $("#mostrar_espera_hospitalizacion").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_hospitalizacion = '<tr><td>' + datos[i].fechahoraingreso + '</td><td>' + datos[i].apellidosnombres + '</td><td>' + datos[i].destino + '</td><td>' + datos[i].fechaegreso + '</td><td>' + datos[i].horaegreso + '</td><td>' + datos[i].condicion + '</td></tr>';
                    $("#mostrar_hospitalizacion").append(mostrar_datos_hospitalizacion);
                }
            } else {
                mostrar_datos_hospitalizacion = '';
                $("#mostrar_hospitalizacion").append(mostrar_datos_hospitalizacion);
            }
        }
    });




}

function ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {

    "use strict";
    datos_apoyo = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_apoyo,
        dataType: 'json',
        url: url + 'personal/ver_atencion_apoyo_tratamiento',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_tratamiento").html('');
            $("#mostrar_espera_tratamiento").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#mostrar_tratamiento").html('');
            $("#mostrar_espera_tratamiento").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_tratamiento = '<tr><td>' + datos[i].fechahoraingreso + '</td><td>' + datos[i].apellidosnombres + '</td><td>' + datos[i].destino + '</td><td>' + datos[i].fechaegreso + '</td><td>' + datos[i].horaegreso + '</td><td>' + datos[i].condicion + '</td></tr>';
                    $("#mostrar_tratamiento").append(mostrar_datos_tratamiento);
                }
            } else {
                mostrar_datos_tratamiento = '';
                $("#mostrar_tratamiento").append(mostrar_datos_tratamiento);
            }
        }
    });



}

function ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_apoyo = {
        'id': leer_id_empleado,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_apoyo,
        dataType: 'json',
        url: url + 'personal/ver_atencion_centroQx',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_qx").html('');
            $("#mostrar_espera_qx").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#mostrar_qx").html('');
            $("#mostrar_espera_qx").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_qx = '<tr><td>' + datos[i].fechahoraregistro + '</td><td>' + datos[i].paciente + '</td><td>' + datos[i].cirugia + '</td><td>' + datos[i].fecha_ingreso_sala + '</td><td>' + datos[i].fecha_salida_sala + '</td><td>' + datos[i].condicion + '</td></tr>';
                    $("#mostrar_qx").append(mostrar_datos_qx);
                }
            } else {
                mostrar_datos_qx = '';
                $("#mostrar_qx").append(mostrar_datos_qx);
            }
        }


    });


}


function ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad) {
    "use strict";
    datos_recetas = {
        'id': lid_medico,
        'mes': leer_mes_actividad,
        'anio': leer_anio_actividad
    };
    $.ajax({
        data: datos_recetas,
        dataType: 'json',
        url: url + 'personal/ver_datos_recetas',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_receta").html('');
            $("#mostrar_espera_receta")
                .html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>")
                .show();
        },
        success: function (datos) {
            $("#mostrar_espera_receta")
                .html('')
                .empty();
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_datos_recetas = '<tr><td>' + datos[i].registro + '</td><td>' + datos[i].paciente + '</td><td>' + datos[i].servicio + '</td><td>' + datos[i].estado + '</td></tr>';
                    $("#mostrar_receta").append(mostrar_datos_recetas);
                }
            } else {
                mostrar_datos_recetas = '';
                $("#mostrar_receta").append(mostrar_datos_recetas);
            }
        }
    });



}




function leer_datos_rr_hh_mostrarlo_en_etiquetas() {
    "use strict";
    leer_dni_rrhh = $('#personal_rrhh  option:selected').attr('dni');
    leer_nro_contrato = $('#personal_rrhh  option:selected').attr('nro_contrato');
    leer_nro_proceso = $('#personal_rrhh  option:selected').attr('nro_proceso');
    leer_ruc_rrhh = $('#personal_rrhh  option:selected').attr('ruc');
    leer_nacimiento = $('#personal_rrhh  option:selected').attr('nacimiento');
    leer_direccion = $('#personal_rrhh  option:selected').attr('direccion');
    leer_fecha_ingreso = $('#personal_rrhh  option:selected').attr('ingreso');
    leer_estado_civil = $('#personal_rrhh  option:selected').attr('civil');
    leer_hijos = $('#personal_rrhh  option:selected').attr('hijos');
    leer_correo_electronico = $('#personal_rrhh  option:selected').attr('correo_electronico');
    leer_telefono = $('#personal_rrhh  option:selected').attr('telefono');
    leer_edad = $('#personal_rrhh  option:selected').attr('edad');

    leer_especialidad = $('#personal_rrhh  option:selected').attr('especialidad');
    leer_servicio = $('#personal_rrhh  option:selected').attr('servicio');
    leer_grupo_ocupacional = $('#personal_rrhh  option:selected').attr('grupo_ocupacional');
    leer_cargo = $('#personal_rrhh  option:selected').attr('cargo');

    leer_profesion = $('#personal_rrhh  option:selected').attr('profesion');
    leer_unidad = $('#personal_rrhh  option:selected').attr('unidad');
    leer_sueldo = $('#personal_rrhh  option:selected').attr('sueldo');

    leer_universidad = $('#personal_rrhh  option:selected').attr('universidad');
    leer_colegiatura = $('#personal_rrhh  option:selected').attr('colegiatura');
    leer_segunda_especialidad = $('#personal_rrhh  option:selected').attr('segunda_especialidad');
    leer_universidad_especialidad = $('#personal_rrhh  option:selected').attr('universidad_especialidad');
    leer_maestria_doctorado = $('#personal_rrhh  option:selected').attr('maestria_doctorado ');


    /* Primera Pestaña */
    $("#dni").html('<label class = "form-control"> DNI : ' + leer_dni_rrhh + '</label>');
    $("#ruc").html('<label class = "form-control"> RUC : ' + leer_ruc_rrhh + '</label>');
    $("#nacimiento").html('<label class = "form-control"> Nacimiento : ' + leer_nacimiento + '</label>');
    $("#edad").html('<label class = "form-control"> Edad : ' + leer_edad + '</label>');
    $("#estado_civil").html('<label class = "form-control"> Estado Civil : ' + leer_estado_civil + '</label>');
    $("#hijos").html('<label class = "form-control"> Hijos : ' + leer_hijos + '</label>');
    $("#telefono").html('<label class = "form-control"> Telefonos : ' + leer_telefono + '</label>');
    $("#correo").html('<label class = "form-control"> Correo : ' + leer_correo_electronico + '</label>');
    $("#direccion").html('<label >Direccion : <br>' + leer_direccion + '</label>');



    /* Segunda pestaña    */

    $("#nro_contrato").html('<label class = "form-control"> Nro. Contrato : ' + leer_nro_contrato + '</label>');
    $("#nro_proceso").html('<label class = "form-control"> Nro. Proceso : ' + leer_nro_proceso + '</label>');
    $("#fecha_ingreso").html('<label class = "form-control" >Ingreso : ' + leer_fecha_ingreso + '</label>');
    $("#especialidad").html('<label class = "form-control" >Especialidad : ' + leer_especialidad + '</label>');
    $("#servicio").html('<label class = "form-control"> Serv.:' + leer_servicio + '</label>');
    $("#grupo_ocupacional").html('<label class = "form-control" >Grupo : ' + leer_grupo_ocupacional + '</label>');
    $("#cargo").html('<label class = "form-control" >Cargo : ' + leer_cargo + '</label>');
    $("#profesion").html('<label class = "form-control" >Profesion : ' + leer_profesion + '</label>');
    $("#unidad").html('<label class = "form-control" >Unidad : ' + leer_unidad + '</label>');
    $("#sueldo").html('<label class = "form-control" >Sueldo : ' + leer_sueldo + '</label>');


    /* Tercera Pestaña */


    $("#universidad").html('<label class = "form-control"> Universidad : ' + leer_universidad + '</label>');
    $("#colegiatura").html('<label class = "form-control"> Colegiatura : ' + leer_colegiatura + '</label>');
    $("#segunda_especialidad").html('<label class = "form-control"> 2da. Esp. : ' + leer_segunda_especialidad + '</label>');
    $("#universidad_especialidad").html('<label class = "form-control"> Univer. Esp. : ' + leer_universidad_especialidad + '</label>');
    $("#maestria_doctorado").html('<label class = "form-control">Maestria. : ' + leer_maestria_doctorado + '</label>');






}


$(document).ready(function () {
    "use strict";
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    $("#mes_actividad").val(mes).attr("selected", "selected");
    $("#anio_actividad").val(anio);

    $("#txt_nombre_empleado")
        .focus()
        .keypress(function () {
            lc_buscar_nombre = $("#txt_nombre_empleado").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });
    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#marcaciones_entrada_salida").empty();
        procesar_asistencia(leer_dni_empleado, leer_mes, leer_anio);
        ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad);

    });

    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#marcaciones_entrada_salida").empty();
        procesar_asistencia(leer_dni_empleado, leer_mes, leer_anio);
        ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad);

    });


    $("#mes_actividad").click(function () {
        $("#mostrar_espera").html('');
        leer_mes_actividad = $("#mes_actividad").val();
        leer_anio_actividad = $("#anio_actividad").val();
        mostrar_actividades_registradas(leer_dni_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad);

    });

    $("#anio_actividad").click(function () {
        $("#mostrar_espera").html('');
        leer_mes_actividad = $("#mes_actividad").val();
        leer_anio_actividad = $("#anio_actividad").val();
        mostrar_actividades_registradas(leer_dni_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_citas_programadas(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_consultorios_externos(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_emergencia(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_hospitalizacion(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_apoyo_al_tratamiento(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_atencion_centro_Qx(leer_id_empleado, leer_mes_actividad, leer_anio_actividad);
        ver_datos_recetas_emitidas(lid_medico, leer_mes_actividad, leer_anio_actividad);

    });

    $("#ver_personal")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#personal_rrhh")
        .click(function () {
            leer_datos_rr_hh_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_rr_hh_mostrarlo_en_etiquetas();
        });




});
