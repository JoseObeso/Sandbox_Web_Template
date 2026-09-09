var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    i, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes, leer_anio, i, lc_verificar, lc_nombre_mes, datos_reporte, mostrar_reporte_qx, cantidad_registros, mostrar_reporte_condicion;

fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;


function ver_mes_anio(leer_mes, leer_anio) {
    "use strict";


    switch (leer_mes) {
        case '1':
            lc_nombre_mes = 'Enero';
            break;
        case '2':
            lc_nombre_mes = 'Febrero';
            break;
        case '3':
            lc_nombre_mes = 'Marzo';
            break;
        case '4':
            lc_nombre_mes = 'Abril';
            break;
        case '5':
            lc_nombre_mes = 'Mayo';
            break;
        case '6':
            lc_nombre_mes = 'Junio';
            break;
        case '7':
            lc_nombre_mes = 'Julio';
            break;
        case '8':
            lc_nombre_mes = 'Agosto';
            break;
        case '9':
            lc_nombre_mes = 'Septiembre';
            break;
        case '10':
            lc_nombre_mes = 'Octubre';
            break;
        case '11':
            lc_nombre_mes = 'Noviembre';
            break;
        case '12':
            lc_nombre_mes = 'Diciembre';
            break;
        default:
            break;
    }
    $("#nombre_mes").html('<strong><font color="#000000">' + lc_nombre_mes + ' / ' + leer_anio + ' </font></strong>');
}


function mostrar_reporte_centro_qx(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/ObtenerReporteQX',
        type: 'post',
        beforeSend: function () {
            $("#reporte_qx").html('');
            $("#total_registros").html('');
            $("#reporte_qx_cabecera_operativos").html('');
             $("#total_cirugia_minutos").html('');
            $("#espera_reporte").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
        },
        success: function (datos) {
            $("#reporte_qx").html('');
            $("#espera_reporte").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_reporte_qx = '<tr><td>' + datos[i].registro +
                        '</td><td>' + datos[i].paciente +
                        '</td><td>' + datos[i].medico +
                        '</td><td>' + datos[i].colegiatura +
                        '</td><td>' + datos[i].rne +
                        '</td><td>' + datos[i].fecha_llegada +
                        '</td><td>' + datos[i].fecha_ingreso_sala +
                        '</td><td>' + datos[i].fecha_salida_sala +
                        '</td><td>' + datos[i].diferencia_sala +
                        '</td><td>' + datos[i].fecha_inicio_anestecia +
                        '</td><td>' + datos[i].fecha_fin_anestesia +
                        '</td><td>' + datos[i].diferencia_anestecia +
                        '</td><td>' + datos[i].fecha_inicio_cirugia +
                        '</td><td>' + datos[i].fecha_fin_cirugia +
                        '</td><td>' + datos[i].diferencia_cirugia +
                        '</td><td>' + datos[i].cirugia +
                        '</td><td>' + datos[i].estado +
                        '</td></tr>';
                    $("#reporte_qx").append(mostrar_reporte_qx);
                }
                mostrar_datos_anulados_operativos(leer_mes, leer_anio);
            } else {
                mostrar_reporte_qx = '';
                $("#reporte_qx").append(mostrar_reporte_qx);
                $("#espera_reporte").empty();
            }
            if (cantidad_registros > 1) {
                $("#total_registros").show();
                $("#total_registros").html("TOTAL : " + cantidad_registros + '<br>');
            } else {
                $("#total_registros").html("");
                $("#total_registros").empty();
            }
 
        }

 
    });

}


function mostrar_datos_anulados_operativos(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/ObtenerReporteQX_Anulados',
        type: 'post',
        beforeSend: function () {
            $("#total_registros").html('');
            $("#reporte_qx_cabecera_operativos").html('');
        },
        success: function (datos) {
            $("#reporte_qx_cabecera_operativos").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_reporte_condicion = '<tr><td>' + datos[i].condicion +
                        '</td><td>' + datos[i].total +
                        '</td></tr>';
                    $("#reporte_qx_cabecera_operativos").append(mostrar_reporte_condicion);
                }
            } else {
                mostrar_reporte_qx = '';
                $("#reporte_qx_cabecera_operativos").append(mostrar_reporte_qx);
            }
        }
    });
}



function mostrar_resultado_diferencia_qx(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/ObtenerReporteQX_total',
        type: 'post',
        beforeSend: function () {
           
        },
        success: function (datos) {
            $("#total_cirugia_minutos").html('');
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_reporte_condicion = datos[i].total; 
                    $("#total_cirugia_minutos").html('<hr> Sumatoria de las diferencia en minutos de Cirugia, considerando solos estado NO anulado y las fechas correctamente ingresadas (fecha igual o superior al seleccionado)<hr><br>' + 'Total : ' + mostrar_reporte_condicion);
                }
            } else {
                mostrar_reporte_qx = '';
                $("#total_cirugia_minutos").html('');
            }
        }
    });


} 

$(document).ready(function () {
    "use strict";
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    ver_mes_anio(leer_mes, leer_anio);
    mostrar_reporte_centro_qx(leer_mes, leer_anio);
    mostrar_resultado_diferencia_qx(leer_mes, leer_anio);
    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        ver_mes_anio(leer_mes, leer_anio);
        mostrar_reporte_centro_qx(leer_mes, leer_anio);
        mostrar_datos_anulados_operativos(leer_mes, leer_anio);
        mostrar_resultado_diferencia_qx(leer_mes, leer_anio);
    });

    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        ver_mes_anio(leer_mes, leer_anio);
        mostrar_reporte_centro_qx(leer_mes, leer_anio);
        mostrar_datos_anulados_operativos(leer_mes, leer_anio);
        mostrar_resultado_diferencia_qx(leer_mes, leer_anio);

    });


});
