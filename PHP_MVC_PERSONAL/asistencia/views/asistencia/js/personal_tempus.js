var url = 'http://' + document.domain + '/rrhh/asistencia/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    fecha_total, anio, mes, dia, fecha_en_curso_dd_mm_aaaa,
    cantidad_registros = 0,
    codigo_personal_seleccion, mes_seleccion, anio_seleccion, tipo_horario_tempus, nombre_personal_seleccion, nombre_seleccion, paterno_personal_seleccion, materno_personal_seleccion, nombre_seleccion, nombres_personal_seleccion, nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    mes_seleccion, anio_seleccion, solo_nombre_personal_seleccion, primer_nombre, hora, hora_total, segundos, minutos, dni_usuario, cargo_personal_seleccion, valor_final, destino_pdf = 0,
    destino_pdf_f2 = 0;


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
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].fecha_mostrar + '</center></td><td>&nbsp;' + response[i].nombre_dia + '</td><td><center> ' + response[i].hora_mostrar + '</center> </td><td> <center>  ' + response[i].terminal + ' </center></td></tr>   ';
                    $("#resultado").append(valor_final);
                    $("#btn_descargar_formato1").attr("disabled", false);
                    $("#btn_imprimir_formato1").attr("disabled", false);
                    $("#btn_descargar_formato2").attr("disabled", false);
                    $("#btn_imprimir_formato2").attr("disabled", false);

                }


            } else {
                valor_final = '';
                $("#resultado").append(valor_final);
                $("#resultado").html('');
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
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final2 = '<tr><td><center>' + datos[i].nro + '</center></td><td><center>' + datos[i].fecha + '</center></td><td><center> ' + datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
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
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final3 = '<tr><td><center>' + datos[i].nro + '</center></td><td><center>' + datos[i].fecha + '</center></td><td><center> ' + datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
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



function ver_condiciones() {
    "use strict";
    mes_seleccion = $("#mes_asistencia").val();
    anio_seleccion = $("#anio_asistencia").val();


    codigo_personal_seleccion = $('#seleccion-personal option:selected').attr('codigo_personal_tempus');
    nombre_personal_seleccion = $('#seleccion-personal option:selected').attr('nombre_personal_tempus');
    paterno_personal_seleccion = $('#seleccion-personal option:selected').attr('paterno_personal_tempus');
    materno_personal_seleccion = $('#seleccion-personal option:selected').attr('materno_personal_tempus');
    nombres_personal_seleccion = $('#seleccion-personal option:selected').attr('nombres_personal_tempus');
    solo_nombre_personal_seleccion = $('#seleccion-personal option:selected').attr('solo_nombres_personal_tempus');
    primer_nombre = solo_nombre_personal_seleccion.split(" ")[0];
    nombre_seleccion = paterno_personal_seleccion + '_' + materno_personal_seleccion + '_' + primer_nombre + '_' + nombre_meses[mes_seleccion - 1] + '_' + anio_seleccion + '_MARCACION_RELOG.PDF';
    var condicion_personal_seleccion = $('#seleccion-personal option:selected').attr('condicion_personal_tempus');
    var ingreso_personal_seleccion = $('#seleccion-personal option:selected').attr('ingreso_personal_tempus');
    cargo_personal_seleccion = $('#seleccion-personal option:selected').attr('cargo_personal_tempus');
    tipo_horario_tempus = $('#seleccion-personal option:selected').attr('tipo_horario_tempus');

    $("#mes_asistencia").attr("disabled", false);
    $("#anio_asistencia").attr("disabled", false);
    $("#nombre_personal").text("PERSONAL : " + nombre_personal_seleccion);
    $("#dni_personal").text("DNI : " + codigo_personal_seleccion);
    $("#condicion_personal").text("CONDICION : " + condicion_personal_seleccion);
    $("#ingreso_personal").text("INGRESO : " + ingreso_personal_seleccion);
    $("#cargo_personal").text("CARGO : " + cargo_personal_seleccion);

    if (condicion_personal_seleccion) {
        $("#aviso_condicion").text("");
        $("#aviso_condicion").css("background-color", "#FFFFFF");
        $("#aviso_condicion").css("color", "#000000");
    } else {
        $("#aviso_condicion").text("TIPO DE PERSONAL NO ESTA DEFINIDO SI ES ASISTENCIAL O ADMINISTRATIVO");
        $("#aviso_condicion").css("background-color", "#FF7A7A");
        $("#aviso_condicion").css("color", "#FFFFFF");
    }


    return codigo_personal_seleccion, mes_seleccion, anio_seleccion;

}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#fecha_dd_mm_aa").text('Fecha : ' + anio_en_curso());
    $("#ver_marcaciones_formato1").hide();
    dni_usuario = $("#dni_usuario").val();
    $("#mes_asistencia").val(mes).attr("selected", "selected");
    $("#anio_asistencia").val(anio);
    $("#seleccion-personal").select2({
        allowClear: true,
        placeholder: "Selecionar personal en TEMPUS",
        formatNoMatches: function (term) {
            var cont = $("<div  />");
            var link = $("<a />", {
                "class": "test1",
                "data-title": term,
                href: "javascript:void(0)",
                text: "de '" + term + "'"
            });
            cont.append(link.clone());
            var html = cont.html();
            return "<strong><font color='#508CDF'>....EN TEMPUS .. NO EXISTEN DATOS....</font> </strong>" + (term.length > 0 ? html : "");
        }
    });

    $("#seleccion-personal").click(function () {
        ver_condiciones();
        procesar_asistencia(codigo_personal_seleccion, mes_seleccion, anio_seleccion);

        switch (tipo_horario_tempus) {
            case 'A':
                procesar_asistencia_segundo_formato_administrativo(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            case 'S':
                procesar_asistencia_asistencial(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            default:
                borrar_resultado_resultado2();
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");

        }

    });


    $("#mes_asistencia").click(function () {
        ver_condiciones();
        procesar_asistencia(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
        switch (tipo_horario_tempus) {
            case 'A':
                procesar_asistencia_segundo_formato_administrativo(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            case 'S':
                procesar_asistencia_asistencial(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            default:
                borrar_resultado_resultado2();
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }

    });


    $("#anio_asistencia").click(function () {
        ver_condiciones();
        procesar_asistencia(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
        switch (tipo_horario_tempus) {
            case 'A':
                procesar_asistencia_segundo_formato_administrativo(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            case 'S':
                procesar_asistencia_asistencial(codigo_personal_seleccion, mes_seleccion, anio_seleccion);
                break;
            default:
                borrar_resultado_resultado2();
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }



    });


    $('#btn_descargar_formato1').click(function () {
        destino_pdf = 1;
        window.open(url + 'imprimir/imprimir_asistencia_reporte?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf);
    });

    $('#btn_imprimir_formato1').click(function () {
        destino_pdf = 2;
        window.open(url + 'imprimir/imprimir_asistencia_reporte?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf);

    });


    $('#btn_descargar_formato2').click(function () {
        destino_pdf_f2 = 1;
        switch (tipo_horario_tempus) {
            case 'A':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_administrativo?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf_f2);
                break;
            case 'S':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_asistencial?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf_f2);
                break;
            default:
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }

    });


    $('#btn_imprimir_formato2').click(function () {
        destino_pdf_f2 = 2;

        switch (tipo_horario_tempus) {
            case 'A':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_administrativo?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf_f2);
                break;
            case 'S':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_asistencial?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + mes_seleccion + '&anio=' + anio_seleccion + '&destino=' + destino_pdf_f2);
                break;
            default:
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }


    });



});
