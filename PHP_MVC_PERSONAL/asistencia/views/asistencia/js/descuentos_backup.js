var url = 'http://' + document.domain + '/rrhh/asistencia/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    nombre_dia = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"],
    gd_fecha_total, gd_anio, gn_mes, gn_dia, gn_numero_dia, gn_horas, gn_minutos, gn_segundos, gt_hora_actual, lc_fecha_en_curso_dd_mm_aaaa_real_time, lc_hora_minuto_segundo_real_time, lc_nombres_dia_mes_anio_real_time, leer_mes, leer_anio, leer_tipo_personal, datos_descuentos, resultado, nro_registros, datos_verificar, i, valor_final;

gd_fecha_total = new Date();
gd_anio = gd_fecha_total.getFullYear();
gn_mes = gd_fecha_total.getMonth() + 1;
gn_dia = gd_fecha_total.getDate();
gn_numero_dia = gd_fecha_total.getDay();


gn_horas = gd_fecha_total.getHours();
gn_minutos = gd_fecha_total.getMinutes();
gn_segundos = gd_fecha_total.getSeconds();
gt_hora_actual = gn_horas + ':' + gn_minutos + ':' + gn_segundos;

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

                    swal({
                            title: "El procesamiento del Mes y Año Administrativo, se Realizo, tiene dos alternativas?",
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
                }
                else
                    {
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
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres  + '"  >' + filas.apellidos_nombres + '</option>');
                });
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
            if (nro_registros > 0) {
                
                
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].dni + '</center></td><td>&nbsp;' + response[i].apellidos_nombres + '</td><td><center> ' + response[i].cargo + '</center> </td><td> <center>  ' + response[i].sueldo + ' </center></td></tr>   ';
                    $("#primer_formato_marcacion").append(valor_final);
                }
                
                
                
                
                datos.forEach(function (filas) {
                    
                    
                    
                    $("#slc_mostrar_descuentos").append('<option value="' + filas.dni + '"  dni = "' + filas.dni   + '"  apellidos_nombres = "' + filas.apellidos_nombres  + '"  cargo = "' + filas.cargo + '"  unidad_organica = "' + filas.unidad_organica + '"  tipo_personal = "' + filas.tipo_personal  + '"  grupo_ocupacional = "' + filas.grupo_ocupacional + '"  codigo_horario = "' + filas.codigo_horario +  '"  horas_trabajo  = "' + filas.horas_trabajo  +  '"  sueldo  = "' + filas.sueldo + '"  costo_hora  = "' + filas.costo_hora + '"  minutos_tardanza = "' + filas.minutos_tardanza + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  falta = "' + filas.falta + '"  minutos_antes_salida = "' + filas.minutos_antes_salida + '"  permisos = "' + filas.permisos + '"  licencias = "' + filas.licencias + '"  exoneracion  = "' + filas.exoneracion + '"  descuentos  = "' + filas.descuentos + '"  fecharegistro  = "' + filas.fecharegistro  + '"  >' + filas.apellidos_nombres + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&#124;&nbsp&nbsp&nbsp' + filas.cargo +  '</option>');
                });
                
                
                
                
                
                
                
                
            } else {
                $("#slc_mostrar_descuentos").html('');
            }


        }

    });


}





$(document).ready(function () {
    "use strict";

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
                break;
            case '3':

                break;
            default:
                break;


        }




    });









});
