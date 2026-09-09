var url = 'http://' + document.domain + '/rrhh/asistencia/',
    url_data_table = 'http://' + document.domain + '/rrhh/public/js',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    nombre_dia = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"],
    leer_costo_hora, leer_grupo_ocupacional, leer_tipo_personal, msj_tipo_personal, get_datos_asistencia, leer_ingreso, leer_exoneracion, ln_resultado_descuento,
    ln_total_trabajadores, lf_total_descuento = 0,
    datos_grabar_descuento, leer_mes_update, leer_anio_update, leer_tipo_personal_update, leer_mes_reporte, leer_anio_reporte, leer_tipo_personal_reporte, asignacion_tipo_personal,  cantidad_registros,datos_horario,
    leer_dni_personal, leer_apellidos_nombres, leer_cargo, leer_unidad_organica, leer_sueldo, lf_total_sueldos, formatNumber, num, leer_id_descuento, leer_minutos_descontar, leer_faltas, leer_minutos_extra,
    gd_fecha_total, gd_anio, gn_mes, gn_dia, gn_numero_dia, gn_horas, gn_minutos, gn_segundos, gt_hora_actual, lc_fecha_en_curso_dd_mm_aaaa_real_time, lc_hora_minuto_segundo_real_time, leer_minutos_antes_salida, lc_nombres_dia_mes_anio_real_time, leer_mes, leer_anio, leer_tipo_personal, datos_descuentos, resultado, nro_registros, datos_verificar, i, valor_final, lc_mostrar_mes_anio, leer_descuento, leer_nueva_tardanza, leer_nueva_falta, leer_nuevo_minutos_antes_salida, leer_nuevo_exoneracion, leer_horas_trabajo;

gd_fecha_total = new Date();
gd_anio = gd_fecha_total.getFullYear();
gn_mes = gd_fecha_total.getMonth() + 1;
gn_dia = gd_fecha_total.getDate();
gn_numero_dia = gd_fecha_total.getDay();


gn_horas = gd_fecha_total.getHours();
gn_minutos = gd_fecha_total.getMinutes();
gn_segundos = gd_fecha_total.getSeconds();
gt_hora_actual = gn_horas + ':' + gn_minutos + ':' + gn_segundos;


formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
};




function dia_mes_anio_real_time() {
    "use strict";
    lc_fecha_en_curso_dd_mm_aaaa_real_time = (('' + gn_dia).length < 2 ? '0' : '') + gn_dia + '/' + (('' + gn_mes).length < 2 ? '0' : '') + gn_mes + '/' + gd_anio;
    return lc_fecha_en_curso_dd_mm_aaaa_real_time;
}

function hora_minuto_segundo_en_curso() {
    "use strict";
    lc_hora_minuto_segundo_real_time = (('' + gn_horas).length < 2 ? '0' : '') + gn_horas + ':' + (('' + gn_minutos).length < 2 ? '0' : '') + gn_minutos + ':' + (('' + gn_segundos).length < 2 ? '0' : '') + gn_segundos;
    return lc_hora_minuto_segundo_real_time;
}


function nombre_dia_mes_anio() {
    "use strict";
    lc_nombres_dia_mes_anio_real_time = nombre_dia[gn_numero_dia - 1] + ', ' + (('' + gn_dia).length < 2 ? '0' : '') + gn_dia + ' DE ' + nombre_mes[gn_mes - 1] + ' DEL AÑO ' + gd_anio;
    return lc_nombres_dia_mes_anio_real_time;


}

function parseFloat2Decimals(value, decimalPlaces) {
    "use strict";
    return parseFloat(parseFloat(value).toFixed(decimalPlaces));
}




function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";

    leer_id_descuento = $('#slc_mostrar_descuentos option:selected').attr('id_descuentos');
    leer_dni_personal = $('#slc_mostrar_descuentos option:selected').attr('dni');
    leer_apellidos_nombres = $('#slc_mostrar_descuentos option:selected').attr('apellidos_nombres');
    leer_cargo = $('#slc_mostrar_descuentos option:selected').attr('cargo');
    leer_unidad_organica = $('#slc_mostrar_descuentos option:selected').attr('unidad_organica');
    leer_ingreso = $('#slc_mostrar_descuentos option:selected').attr('ingreso');
    leer_grupo_ocupacional = $('#slc_mostrar_descuentos option:selected').attr('grupo_ocupacional');
    leer_sueldo = $('#slc_mostrar_descuentos option:selected').attr('sueldo');
    leer_descuento = $('#slc_mostrar_descuentos option:selected').attr('descuentos');
    leer_costo_hora = $('#slc_mostrar_descuentos option:selected').attr('costo_hora');
    leer_horas_trabajo = $('#slc_mostrar_descuentos option:selected').attr('horas_trabajo');
    leer_minutos_descontar = $('#slc_mostrar_descuentos option:selected').attr('minutos_tardanza');
    leer_faltas = $('#slc_mostrar_descuentos option:selected').attr('falta');
    leer_tipo_personal = $('#slc_mostrar_descuentos option:selected').attr('tipo_personal');
    leer_minutos_antes_salida = $('#slc_mostrar_descuentos option:selected').attr('minutos_antes_salida');
    leer_exoneracion = $('#slc_mostrar_descuentos option:selected').attr('exoneracion');
    leer_minutos_extra = $('#slc_mostrar_descuentos option:selected').attr('extra');

    switch (leer_tipo_personal) {
        case 'A':
            msj_tipo_personal = "Administrativo - Costo Hora : (SUELDO/30)8";

            break;
        case 'S':
            msj_tipo_personal = "Asistencial - Costo Hora : (SUELDO/30)6";
            break;
        default:
            break;
    }

    $("#dni").text(leer_dni_personal);
    $("#apellidos_nombres").text(leer_apellidos_nombres);
    $("#cargo").text(leer_cargo);
    $("#unidad_organica").text(leer_unidad_organica);
    $("#grupo_ocupacional").text(leer_grupo_ocupacional);
    $("#ingreso").text(leer_ingreso);
    $("#a_modificar").text('');

    $("#sueldo").text(leer_sueldo);
    $("#descuento").text(leer_descuento);
    $("#formula_descuento").text('(minutos_tardanza / 60)*costo_hora + horas_trabajo*costo_hora*faltas + (minutos_antes_salida / 60)*costo_hora  - (exoneracion_minutos/60)*costo_hora');
    $("#costo_hora").text(leer_costo_hora);
    $("#tipo_personal").text(msj_tipo_personal);
    $("#minutos_descontar").text(leer_minutos_descontar);
    $("#faltas").text(leer_faltas);
    $("#antes_salida").text(leer_minutos_antes_salida);
    $("#exoneracion").text(leer_exoneracion);
    $("#minutos").text(formatNumber.new(parseFloat2Decimals(leer_minutos_extra, 0)) + '  Min.');



    $("#valor_pre").text('');

    $("#txt_minutos_tardanza")
        .css("background-color", "#FFFFFF")
        .attr("disabled", true)
        .val('');


    $("#txt_falta")
        .css("background-color", "#FFFFFF")
        .attr("disabled", true)
        .val('');

    $("#txt_minutos_antes_salida")
        .css("background-color", "#FFFFFF")
        .attr("disabled", true)
        .val('');


    $("#txt_exoneracion")
        .css("background-color", "#FFFFFF")
        .attr("disabled", true)
        .val('');



    get_datos_asistencia = {
        "dni": leer_dni_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };

    $.ajax({
        data: get_datos_asistencia,
        dataType: 'json',
        url: url + 'asistencia/ver_datos_asistencia_personal_administrativos',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_horario_descuento").html('');
            $("#mostrar_horario_descuento").hide();
            $("#mostrar_horario").hide();
            $("#descripcion").hide();
            $("#esperar_mientras_procesa_horario").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (response) {
            $("#mostrar_horario_descuento").html('');
            $("#mostrar_horario").show();
            $("#mostrar_horario_descuento").show();
            $("#esperar_mientras_procesa_horario").html('');
            $("#descripcion").show();

            nro_registros = response.length;
            if (nro_registros > 1) {
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td>&nbsp;' + response[i].fecha_mostrar + '&nbsp;</td><td>&nbsp;' + response[i].turno + '&nbsp;</td><td>&nbsp;' + response[i].dia_nombre + '</td><td>&nbsp;' + response[i].entrada_horario + '&nbsp;</td><td>&nbsp;' + response[i].entrada_marcacion + '&nbsp;</td><td>&nbsp;' + response[i].salida_horario + '&nbsp;</td>' + '&nbsp;</td><td>&nbsp;' + response[i].salida_marcacion + '&nbsp;</td><td>&nbsp;' + response[i].minutos_tarde + '&nbsp;</td><td>' + response[i].minutos_descontar_tardanza + '&nbsp;</td><td>' + response[i].minutos_extra + '&nbsp;</td><td>' + response[i].inasistencia + '&nbsp;</td><td>' + response[i].feriado + '&nbsp;</td></tr>';
                    $("#mostrar_horario_descuento").append(valor_final);
                }

            } else {
                valor_final = '';
                $("#mostrar_horario_descuento").append(valor_final);
            }
        }
    });

    $("#btn_modifica").attr("disabled", false);
    $("#bt_grabar").attr("disabled", true);
    $("#btn_pre_descuento").attr("disabled", true);
    $("#btn_imprimir_descuento").attr("disabled", false);
    $("#btn_imprimir_plh").attr("disabled", false);
    
    procesar_asistencia(leer_dni_personal, leer_mes, leer_anio);

}



function procesar_asistencia(leer_dni, leer_mes, leer_anio) {
    "use strict";
    datos_horario = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };


    $.ajax({
        data: datos_horario,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia',
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
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].fecha_mostrar + '</center></td><td>&nbsp;' + response[i].nombre_dia + '</td><td><center> ' + response[i].hora_mostrar + '</center> </td><td> <center>  ' + response[i].terminal + ' </center></td></tr>   ';
                    $("#primer_formato_marcacion").append(valor_final);
                }
    
            } else {
                valor_final = '';
                $("#primer_formato_marcacion").append(valor_final);
                $("#primer_formato_marcacion").empty();
                
            }

        }


    });

}

    
    




function verificar_procesamiento_admin(leer_tipo_personal, leer_mes, leer_anio)

{
    "use strict";
    datos_verificar = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_verificar,
        dataType: 'json',
        url: url + 'asistencia/verificar_procesamiento_administrativos',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            if (nro_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = datos[i].registros;
                }
                if (valor_final > 0) {
                    lc_mostrar_mes_anio = nombre_mes[leer_mes - 1] + '/' + leer_anio;
                    swal({
                            title: "El procesamiento de : " + lc_mostrar_mes_anio + " - Administrativos, se realizo, tiene dos alternativas?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#528DF5",
                            confirmButtonText: "Eliminar Proceso seleccionado y volver a procesar...",
                            cancelButtonText: "Visualizar Mes seleccionado...",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },

                        function (isConfirm) {
                            if (isConfirm) {
                                swal({
                                    title: "Iniciando procesamiento.......",
                                    timer: 200,
                                    showConfirmButton: false
                                });
                                procesar_descuento_personal_administrativos(leer_tipo_personal, leer_mes, leer_anio);
                            } else {
                                swal({
                                    title: "Visualizando...",
                                    timer: 500,
                                    showConfirmButton: false
                                });
                                proceder_a_visualizar_descuentos_administrativos(leer_mes, leer_anio, leer_tipo_personal);
                            }
                        });
                } else {
                    procesar_descuento_personal_administrativos(leer_tipo_personal, leer_mes, leer_anio);

                }
            } else {
                $("#slc_mostrar_descuentos").html('');

            }
        }

    });

}









function procesar_descuento_personal_administrativos(leer_tipo_personal, leer_mes, leer_anio) {
    "use strict";

    datos_descuentos = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_descuentos,
        dataType: 'json',
        url: url + 'asistencia/procesar_descuentos_administrativos',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            if (nro_registros > 0) {
                datos.forEach(function (filas) {
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '"  cargo = "' + filas.cargo + '"  unidad_organica = "' + filas.unidad_organica + '"  tipo_personal = "' + filas.tipo_personal + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  codigo_horario = "' + filas.codigo_horario + '"  horas_trabajo  = "' + filas.horas_trabajo + '"  sueldo  = "' + filas.sueldo + '"  costo_hora  = "' + filas.costo_hora + '"  minutos_tardanza = "' + filas.minutos_tardanza + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  permisos = "' + filas.permisos + '"  licencias = "' + filas.licencias + '"  extra  = "' + filas.extra + '"  exoneracion  = "' + filas.exoneracion + '"  descuentos  = "' + filas.descuentos + '"  fecharegistro  = "' + filas.fecharegistro + '"  ingreso  = "' + filas.ingreso + '"  >' + filas.dni + '&nbsp&#124;&nbsp&nbsp' + filas.apellidos_nombres + '</option>');
                    lf_total_descuento += parseFloat(filas.descuentos);
                    lf_total_sueldos += parseFloat(filas.sueldo);
                });

                $("#total_trabajadores").text('Total Trabajadores: ' + nro_registros);
                $("#total_descuentos").text('Total Descuentos: ' + formatNumber.new(parseFloat2Decimals(lf_total_descuento, 2)));
                $("#total_sueldos").text('Total Sueldos: ' + formatNumber.new(parseFloat2Decimals(lf_total_sueldos, 2)));



            } else {
                $("#slc_mostrar_descuentos").html('');
            }


        }

    });



}




function proceder_a_visualizar_descuentos_administrativos(leer_mes, leer_anio, leer_tipo_personal) {
    "use strict";
    datos_descuentos = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_descuentos,
        dataType: 'json',
        url: url + 'asistencia/visualizar_descuentos_administrativos',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            lf_total_descuento = 0;
            lf_total_sueldos = 0;
            if (nro_registros > 0) {
                datos.forEach(function (filas) {
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '"  cargo = "' + filas.cargo + '"  unidad_organica = "' + filas.unidad_organica + '"  tipo_personal = "' + filas.tipo_personal + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  codigo_horario = "' + filas.codigo_horario + '"  horas_trabajo  = "' + filas.horas_trabajo + '"  sueldo  = "' + filas.sueldo + '"  costo_hora  = "' + filas.costo_hora + '"  minutos_tardanza = "' + filas.minutos_tardanza + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  permisos = "' + filas.permisos + '"  licencias = "' + filas.licencias + '"  extra  = "' + filas.extra + '"  exoneracion  = "' + filas.exoneracion + '"  descuentos  = "' + filas.descuentos + '"  fecharegistro  = "' + filas.fecharegistro + '"  ingreso  = "' + filas.ingreso + '"  >' + filas.dni + '&nbsp&#124;&nbsp&nbsp' + filas.apellidos_nombres + '</option>');
                    lf_total_descuento += parseFloat(filas.descuentos);
                    lf_total_sueldos += parseFloat(filas.sueldo);
                });

                $("#total_trabajadores").text('Total Trabajadores: ' + nro_registros);
                $("#total_descuentos").text('Total Descuentos: ' + formatNumber.new(parseFloat2Decimals(lf_total_descuento, 2)));
                $("#total_sueldos").text('Total Sueldos: ' + formatNumber.new(parseFloat2Decimals(lf_total_sueldos, 2)));

            } else {
                $("#slc_mostrar_descuentos").html('');
            }


        }

    });


}


function verificar_procesamiento_asistencial(leer_tipo_personal, leer_mes, leer_anio) {
    "use strict";
    datos_verificar = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_verificar,
        dataType: 'json',
        url: url + 'asistencia/verificar_proce_asistencial',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            if (nro_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = datos[i].registros;
                }
                if (valor_final > 0) {
                    lc_mostrar_mes_anio = nombre_mes[leer_mes - 1] + '/' + leer_anio;
                    swal({
                            title: "El procesamiento de : " + lc_mostrar_mes_anio + " - asistencial, se realizo, tiene dos alternativas?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#528DF5",
                            confirmButtonText: "Eliminar Proceso seleccionado y volver a procesar...",
                            cancelButtonText: "Visualizar Mes seleccionado...",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },

                        function (isConfirm) {
                            if (isConfirm) {
                                swal({
                                    title: "Iniciando procesamiento.......",
                                    timer: 200,
                                    showConfirmButton: false
                                });
                                // procesar_descuento_personal_asistencial(leer_tipo_personal, leer_mes, leer_anio);
                            } else {
                                swal({
                                    title: "Visualizando...",
                                    timer: 500,
                                    showConfirmButton: false
                                });
                                proceder_a_visualizar_descuentos_asistencial(leer_mes, leer_anio, leer_tipo_personal);
                            }
                        });
                } else {
                    //   procesar_descuento_personal_asistencial(leer_tipo_personal, leer_mes, leer_anio);

                }
            } else {
                $("#slc_mostrar_descuentos").html('');

            }
        }

    });




}


function proceder_a_visualizar_descuentos_asistencial(leer_mes, leer_anio, leer_tipo_personal) {
    "use strict";
    datos_descuentos = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_descuentos,
        dataType: 'json',
        url: url + 'asistencia/visualizar_descuentos_asistencial',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            lf_total_descuento = 0;
            lf_total_sueldos = 0;
            if (nro_registros > 0) {
                datos.forEach(function (filas) {
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '"  cargo = "' + filas.cargo + '"  unidad_organica = "' + filas.unidad_organica + '"  tipo_personal = "' + filas.tipo_personal + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  codigo_horario = "' + filas.codigo_horario + '"  horas_trabajo  = "' + filas.horas_trabajo + '"  sueldo  = "' + filas.sueldo + '"  costo_hora  = "' + filas.costo_hora + '"  minutos_tardanza = "' + filas.minutos_tardanza + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  permisos = "' + filas.permisos + '"  licencias = "' + filas.licencias + '"  extra  = "' + filas.extra + '"  exoneracion  = "' + filas.exoneracion + '"  descuentos  = "' + filas.descuentos + '"  fecharegistro  = "' + filas.fecharegistro + '"  ingreso  = "' + filas.ingreso + '"  >' + filas.dni + '&nbsp&#124;&nbsp&nbsp' + filas.apellidos_nombres + '</option>');
                    lf_total_descuento += parseFloat(filas.descuentos);
                    lf_total_sueldos += parseFloat(filas.sueldo);
                });

                $("#total_trabajadores").text('Total Trabajadores: ' + nro_registros);
                $("#total_descuentos").text('Total Descuentos: ' + formatNumber.new(parseFloat2Decimals(lf_total_descuento, 2)));
                $("#total_sueldos").text('Total Sueldos: ' + formatNumber.new(parseFloat2Decimals(lf_total_sueldos, 2)));

            } else {
                $("#slc_mostrar_descuentos").html('');
            }


        }

    });




}

function procesar_descuento_personal_asistencial(leer_tipo_personal, leer_mes, leer_anio) {
    "use strict";

    datos_descuentos = {
        "tipo": leer_tipo_personal,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_descuentos,
        dataType: 'json',
        url: url + 'asistencia/procesar_descuentos_asistencial',
        type: 'post',
        beforeSend: function () {
            $("#slc_mostrar_descuentos")
                .hide()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#slc_mostrar_descuentos")
                .show()
                .html('');
            $("#esperar_mientras_procesa_descuentos").html('');
            nro_registros = datos.length;
            if (nro_registros > 0) {
                datos.forEach(function (filas) {
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '"  cargo = "' + filas.cargo + '"  unidad_organica = "' + filas.unidad_organica + '"  tipo_personal = "' + filas.tipo_personal + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  codigo_horario = "' + filas.codigo_horario + '"  horas_trabajo  = "' + filas.horas_trabajo + '"  sueldo  = "' + filas.sueldo + '"  costo_hora  = "' + filas.costo_hora + '"  minutos_tardanza = "' + filas.minutos_tardanza + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  permisos = "' + filas.permisos + '"  licencias = "' + filas.licencias + '"  extra  = "' + filas.extra + '"  exoneracion  = "' + filas.exoneracion + '"  descuentos  = "' + filas.descuentos + '"  fecharegistro  = "' + filas.fecharegistro + '"  ingreso  = "' + filas.ingreso + '"  >' + filas.dni + '&nbsp&#124;&nbsp&nbsp' + filas.apellidos_nombres + '</option>');
                    lf_total_descuento += parseFloat(filas.descuentos);
                    lf_total_sueldos += parseFloat(filas.sueldo);
                });

                $("#total_trabajadores").text('Total Trabajadores: ' + nro_registros);
                $("#total_descuentos").text('Total Descuentos: ' + formatNumber.new(parseFloat2Decimals(lf_total_descuento, 2)));
                $("#total_sueldos").text('Total Sueldos: ' + formatNumber.new(parseFloat2Decimals(lf_total_sueldos, 2)));



            } else {
                $("#slc_mostrar_descuentos").html('');
            }


        }

    });



}






$(document).ready(function () {
    "use strict";


    $("#descripcion").hide();

    $("#mes").val(gn_mes).attr("selected", "selected");
    $("#anio").val(gd_anio);
    $("#opt_tipo_personal_0")
        .prop('checked', false)
        .prop('disabled', false);

    $("#opt_tipo_personal_1")
        .prop('checked', false)
        .prop('disabled', false);
    $("#opt_tipo_personal_2")
        .prop('checked', true)
        .prop('disabled', false);
    $("#fecha_completa").text("Fecha Actual : " + nombre_dia_mes_anio());


    $('#btn_procesar').click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        leer_tipo_personal = $('input:radio[name=opt_tipo_personal]:checked').val();
        switch (leer_tipo_personal) {
            case '1':
                verificar_procesamiento_admin(leer_tipo_personal, leer_mes, leer_anio);
                break;
            case '2':
                verificar_procesamiento_asistencial(leer_tipo_personal, leer_mes, leer_anio);
                break;
            case '3':

                break;
            default:
                break;

        }

    });





    $("#slc_mostrar_descuentos")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });



    $("#btn_modifica").click(function () {


        $("#txt_minutos_tardanza")
            .css("background-color", "#FCFBA0")
            .attr("disabled", false)
            .val(leer_minutos_descontar);


        $("#txt_falta")
            .css("background-color", "#FCFBA0")
            .attr("disabled", false)
            .val(leer_faltas);

        $("#txt_minutos_antes_salida")
            .css("background-color", "#FCFBA0")
            .attr("disabled", false)
            .val(leer_minutos_antes_salida);


        $("#txt_exoneracion")
            .css("background-color", "#FCFBA0")
            .attr("disabled", false)
            .val(leer_exoneracion);



        $("#bt_grabar")
            .attr("disabled", false);
        $("#a_modificar").html('...Proceda a modificar...');

        $("#btn_pre_descuento")
            .attr("disabled", false);

        $("#valor_pre").val('');




    });

    $("#btn_pre_descuento").click(function () {
        leer_nueva_tardanza = $("#txt_minutos_tardanza").val();
        leer_nueva_falta = $("#txt_falta").val();
        leer_nuevo_minutos_antes_salida = $("#txt_minutos_antes_salida").val();
        leer_nuevo_exoneracion = $("#txt_exoneracion").val();
        ln_resultado_descuento = (leer_nueva_tardanza / 60) * leer_costo_hora + leer_horas_trabajo * leer_costo_hora * leer_nueva_falta + leer_costo_hora * (leer_nuevo_minutos_antes_salida / 60) - leer_costo_hora * (leer_nuevo_exoneracion / 60);
        $("#valor_pre").html('<center><font color="#000000"><strong>Pre Desc.: ' + formatNumber.new(parseFloat2Decimals(ln_resultado_descuento, 2)) + '</strong></font></center>');
    });





    $("#bt_grabar").click(function () {

        leer_nueva_tardanza = $("#txt_minutos_tardanza").val();
        leer_nueva_falta = $("#txt_falta").val();
        leer_nuevo_minutos_antes_salida = $("#txt_minutos_antes_salida").val();
        leer_nuevo_exoneracion = $("#txt_exoneracion").val();
        ln_resultado_descuento = (leer_nueva_tardanza / 60) * leer_costo_hora + leer_horas_trabajo * leer_costo_hora * leer_nueva_falta + leer_costo_hora * (leer_nuevo_minutos_antes_salida / 60) - leer_costo_hora * (leer_nuevo_exoneracion / 60);

        datos_grabar_descuento = {
            'dni': leer_dni_personal,
            'tarde': leer_nueva_tardanza,
            'falta': leer_nueva_falta,
            'antes_salida': leer_minutos_antes_salida,
            'exoneracion': leer_nuevo_exoneracion,
            'descuento': ln_resultado_descuento
        };


        $.ajax({
            data: datos_grabar_descuento,
            dataType: 'json',
            url: url + 'asistencia/grabar_nuevo_descuento',
            type: 'post',
            beforeSend: function () {
                $("#espera_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");

            },
            success: function () {

                $("#espera_grabacion")
                    .html('')
                    .hide();
                $("#espera_grabacion")
                    .text('<strong> grabacion conforme...  </strong>')
                    .fadeOut(3000);
                leer_mes_update = $("#mes").val();
                leer_anio_update = $("#anio").val();
                leer_tipo_personal_update = $('input:radio[name=opt_tipo_personal]:checked').val();
                proceder_a_visualizar_descuentos_administrativos(leer_mes_update, leer_anio_update, leer_tipo_personal_update);
                $("#descuento").text(formatNumber.new(parseFloat2Decimals(ln_resultado_descuento, 2)));
                $("#minutos_descontar").text(formatNumber.new(parseFloat2Decimals(leer_nueva_tardanza, 2)));
                $("#faltas").text(formatNumber.new(parseFloat2Decimals(leer_nueva_falta, 2)));
                $("#antes_salida").text(formatNumber.new(parseFloat2Decimals(leer_nuevo_minutos_antes_salida, 2)));
                $("#exoneracion").text(formatNumber.new(parseFloat2Decimals(leer_nuevo_exoneracion, 2)));




            }
        });

    });


    $("#btn_imprimir_descuento").click(function () {
        leer_mes_reporte = $("#mes").val();
        leer_anio_reporte = $("#anio").val();
        leer_tipo_personal_reporte = $('input:radio[name=opt_tipo_personal]:checked').val();

        switch (leer_tipo_personal_reporte) {
            case '1':
                asignacion_tipo_personal = "A";
                break;
            case '2':
                asignacion_tipo_personal = "S";
                break;
            default:
                break;
        }
        window.open(url + 'imprimir/imprimir_reporte_descuentos?mes=' + leer_mes_reporte + '&anio=' + leer_anio_reporte + '&tipo=' + asignacion_tipo_personal);
    });


});
