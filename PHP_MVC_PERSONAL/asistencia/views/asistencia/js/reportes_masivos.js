var url = 'http://' + document.domain + '/rrhh/asistencia/';
var url_grafico = 'http://' + document.domain + '/rrhh/public/gra';
var fecha_total, anio, mes, dia, fecha_en_curso_dd_mm_aaaa, cantidad_registros = 0,
    codigo_personal_seleccion, mes_seleccion, anio_seleccion, tipo_horario_tempus, paterno_personal_seleccion, materno_personal_seleccion, nombre_seleccion, nombres_personal_seleccion, nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    ln_mes, ln_anio, hora, minutos, segundos, hora_total, valor_final, valor_final2;






fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;







function anio_en_curso() {
    "use strict";
    fecha_en_curso_dd_mm_aaaa = (('' + dia).length < 2 ? '0' : '') + dia + '/' + (('' + mes).length < 2 ? '0' : '') + mes + '/' + anio;
    return fecha_en_curso_dd_mm_aaaa;

}



function procesar_asistencia(codigo_personal_seleccion, mes_seleccion, anio_seleccion) {
    "use strict";
    cantidad_registros = 0;
    var parametros = {
        "dni": codigo_personal_seleccion,
        "mes": mes_seleccion,
        "anio": anio_seleccion
    };
    $.ajax({
        data: parametros,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia',
        type: 'post',
        beforeSend: function () {
            $("#ver_resultados_marcaciones").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (response) {
            $("#resultado").html('');
            cantidad_registros = response.length;
            if (cantidad_registros > 1) {
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].fecha_mostrar + '</center></td><td><center> ' + response[i].hora_mostrar + '</center> </td><td> <center>  ' + response[i].terminal + ' </center></td></tr>   ';
                    $("#resultado").append(valor_final);
                    $("#btn_descargar_formato1").attr("disabled", false);
                    $("#btn_imprimir_formato1").attr("disabled", false);
                    $("#btn_descargar_formato2").attr("disabled", false);
                    $("#btn_imprimir_formato2").attr("disabled", false);

                }


            } else {
                valor_final = '';
                $("#resultado").append(valor_final);
                $("#btn_descargar_formato1").attr("disabled", true);
                $("#btn_imprimir_formato1").attr("disabled", true);
                $("#btn_descargar_formato2").attr("disabled", true);
                $("#btn_imprimir_formato2").attr("disabled", true);


            }


        }

    });
}







function procesar_asistencia_segundo_formato_administrativo(codigo_personal_seleccion, mes_seleccion, anio_seleccion) {
    "use strict";
    var parametros = {
        "dni": codigo_personal_seleccion,
        "mes": mes_seleccion,
        "anio": anio_seleccion
    };
    $.ajax({
        data: parametros,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia_administrativo',
        type: 'post',
        beforeSend: function () {
            $("#resultado2").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#resultado2").html('');
            cantidad_registros = datos.length;
            if (cantidad_registros > 1) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final2 = '<tr><td><center>' + datos[i].fecha + '</center></td><td><center> ' + datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
                    $("#resultado2").append(valor_final2);

                    $("#btn_descargar_formato1").attr("disabled", false);
                    $("#btn_imprimir_formato1").attr("disabled", false);
                    $("#btn_descargar_formato2").attr("disabled", false);
                    $("#btn_imprimir_formato2").attr("disabled", false);

                }
            } else {
                valor_final2 = '';
                $("#resultado2").append(valor_final2);
                $("#btn_descargar_formato1").attr("disabled", true);
                $("#btn_imprimir_formato1").attr("disabled", true);
                $("#btn_descargar_formato2").attr("disabled", true);
                $("#btn_imprimir_formato2").attr("disabled", true);


            }


        }
    });
}


function procesar_asistencia_asistencial(codigo_personal_seleccion, mes_seleccion, anio_seleccion) {
    "use strict";
    var parametros = {
        "dni": codigo_personal_seleccion,
        "mes": mes_seleccion,
        "anio": anio_seleccion
    };
    $.ajax({
        data: parametros,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia_asistencial',
        type: 'post',
        beforeSend: function () {
            $("#resultado2").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#resultado2").html('');
            cantidad_registros = datos.length;
            if (cantidad_registros > 1) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final3 = '<tr><td><center>' + datos[i].fecha + '</center></td><td><center> ' + datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
                    $("#resultado2").append(valor_final3);
                    $("#btn_descargar_formato1").attr("disabled", false);
                    $("#btn_imprimir_formato1").attr("disabled", false);
                    $("#btn_descargar_formato2").attr("disabled", false);
                    $("#btn_imprimir_formato2").attr("disabled", false);

                }
            } else {
                valor_final3 = '';
                $("#resultado2").append(valor_final3);
                $("#btn_descargar_formato1").attr("disabled", true);
                $("#btn_imprimir_formato1").attr("disabled", true);
                $("#btn_descargar_formato2").attr("disabled", true);
                $("#btn_imprimir_formato2").attr("disabled", true);


            }


        }
    });



}


function borrar_resultado_resultado2() {
    "use strict";
    $("#resultado").html('');
    $("#resultado2").html('');

}






$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#resultado2").html("<center><img src='" + url_grafico + "/reportes_as.jpg' width='250' height='50' alt=''/></center>");

    $("#mes_asistencia").val(mes).attr("selected", "selected");
    $("#anio_asistencia").val(anio);









    $("#btn_procesar_reporte_masivo").click(function () {
        ln_mes = $("#mes_asistencia").val();
        ln_anio = $("#anio_asistencia").val();

        var parametros = {
            "mes": ln_mes,
            "anio": ln_anio
        };

        $.ajax({
            data: parametros,
            dataType: 'json',
            url: url + 'asistencia/procesar_reporte_masivo',
            type: 'post',
            beforeSend: function () {
                $("#resultado2").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function (datos) {
                $("#resultado2").html(datos);
                
                /*
                 
                cantidad_registros = datos.length;
                if (cantidad_registros > 1) {
                    var i;
                    for (i = 0; i < datos.length; i++) {
                        var valor_final3 = '<tr><td><center>' + datos[i].dni + '</center></td><td><center> '   +   datos[i].nombres + '</center></td><td><center> ' +  datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
                        $("#resultado2").append(valor_final3);
                        

                    }
                } else {
                    valor_final3 = '';
                    $("#resultado2").append(valor_final3);
                   


                }
                */


            }

        });





    });









});
