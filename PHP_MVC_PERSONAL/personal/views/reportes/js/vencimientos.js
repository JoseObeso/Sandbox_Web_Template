var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    i, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes, leer_anio, i, lc_verificar, lc_nombre_mes, datos_reporte, mostrar_reporte_qx, cantidad_registros, mostrar_reporte_condicion, mostrar_reporte_venci;

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


function vencimientos_contratos_adendas(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/ObtenerVencimientos',
        type: 'post',
        beforeSend: function () {
            $("#contenido_vencimientos").html('');
            $("#espera_mientras_muestra_vencimientos").html("<img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/>");
            
        },
        success: function (datos) {
            $("#espera_mientras_muestra_vencimientos").html("");
            cantidad_registros = datos.length;
            lc_verificar = datos[0].verificar;
            if (lc_verificar === '1') {
                for (i = 0; i < datos.length; i++) {
                    mostrar_reporte_venci = '<tr><td>' + datos[i].ruc +
                        '</td><td>' + datos[i].dni +
                        '</td><td>' + datos[i].apellidos_nombres +
                        '</td><td>' + datos[i].condicion_laboral +
                        '</td><td>' + datos[i].nro_contrato +
                        '</td><td>' + datos[i].fecha_ingreso +
                        '</td><td>' + datos[i].fecha_termino +
                        '</td><td>' + datos[i].sueldo +
                        '</td><td>' + datos[i].tipo_labor +
                        '</td><td>' + datos[i].fin_adenda +
                        '</td></tr>';
                    $("#contenido_vencimientos").append(mostrar_reporte_venci);
                }

            } else {
                mostrar_reporte_venci = '';
                $("#contenido_vencimientos").append(mostrar_reporte_venci);
                $("#espera_mientras_muestra_vencimientos").empty();
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
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    vencimientos_contratos_adendas(leer_mes, leer_anio);
    
    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        vencimientos_contratos_adendas(leer_mes, leer_anio);
    });

    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        vencimientos_contratos_adendas(leer_mes, leer_anio);
        

    });


});
