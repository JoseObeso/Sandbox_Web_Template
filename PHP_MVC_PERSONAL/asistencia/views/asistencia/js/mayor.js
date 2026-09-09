var url = 'http://' + document.domain + '/rrhh/asistencia/',
    datos_mes_anio, datos_marcaciones_relog, valor_final, leer_fecha_marcacion, leer_marcacion, datos_grabar_seleccion, datos_mostrar_personal_seleccion, leer_id_personal,
    leer_dni, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    dato_id,
    leer_fecha, get_datos, get_marcaciones_por_mes, leer_fecha_dia, leer_mes, leer_anio, cantidad_registros, leer_dia, datos_detalle_dia, leer_nombre_personal, leer_tipo_asistencial, leer_cargo;

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
    leer_dni = $('#slc_mayor_marcaciones  option:selected').attr('dni');
    leer_fecha = $('#slc_mayor_marcaciones  option:selected').attr('fecha');
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();

    get_datos = {
        "dni": leer_dni
    };
    $.ajax({
        data: get_datos,
        dataType: 'json',
        url: url + 'asistencia/ver_datos_por_dni',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_detalle").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (data) {
            $("#espera_de_detalle").html('');
            data.forEach(function (elemento) {
                $("#nombre_personal").html('<center>' + elemento.apellidos_nombres + '</center>');
                $("#condicion").html('<center>' + elemento.condicion + '</center>');
                $("#cargo").html('<center>' + elemento.cargo + '</center>');
            });
            $("#marcacion_relog").hide();


        }
    });


    get_marcaciones_por_mes = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: get_marcaciones_por_mes,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_por_mes',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slc_detalle").html('');
            cantidad_registros = encontrados.length;
            if (cantidad_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#slc_detalle").append('<option value="' + filas.fecha + '"  fecha = "' + filas.fecha + '"  marcaciones = "' + filas.marcaciones + '"  >' + filas.fecha + ' -- ' + filas.marcaciones + '</option>');
                });
                $("#marcacion_relog").show();
            } else {
                $("#slc_detalle").empty();

            }

        }
    });
    $("#primer_formato_marcacion").empty();
    $("#slc_detalle_dia").empty();
    $("#btn_seleccion").attr("disabled", true);




}



function ver_frecuencia_marcaciones(leer_mes, leer_anio) {
    "use strict";
    datos_mes_anio = {
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_mes_anio,
        dataType: 'json',
        url: url + 'asistencia/frecuencia_marcaciones',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_frecuencia").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#espera_de_frecuencia").html('');
            $("#slc_mayor_marcaciones").html('');
            cantidad_registros = encontrados.length;
            if (cantidad_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#slc_mayor_marcaciones").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  fecha = "' + filas.fecha + '" marcacion = "' + filas.marcaciones + '"  >' + filas.dni + ' -- ' + filas.fecha + ' -- ' + filas.marcaciones + '</option>');
                });
            } else {
                $("#slc_mayor_marcaciones").empty();

            }


        }
    });

}


function leer_detalle_fecha_seleccionada() {
    "use strict";

    leer_fecha_dia = $('#slc_detalle  option:selected').attr('fecha');
    leer_dia = parseInt(leer_fecha_dia.substr(0, 2));
    datos_detalle_dia = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio,
        "dia": leer_dia
    };

    $.ajax({
        data: datos_detalle_dia,
        dataType: 'json',
        url: url + 'asistencia/ver_detalle_dia',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slc_detalle_dia").html('');
            cantidad_registros = encontrados.length;
            if (cantidad_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#slc_detalle_dia").append('<option value="' + filas.fecha + '"  >' + filas.fecha + ' &nbsp;&#124;&nbsp; ' + filas.dia + ' &nbsp;&#124;&nbsp; ' + filas.horatxt + ' &nbsp;&#124;&nbsp; ' + filas.terminal + '</option>');
                });
            } else {
                $("#slc_detalle_dia").empty();

            }

        }
    });

    datos_marcaciones_relog = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };


    $.ajax({
        data: datos_marcaciones_relog,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia',
        type: 'post',
        beforeSend: function () {
            $("#espera_marcaciones_relog").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#primer_formato_marcacion").html('');
            $("#espera_marcaciones_relog").html('');
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].fecha_mostrar + '</center></td><td>&nbsp;' + response[i].nombre_dia + '</td><td><center> ' + response[i].hora_mostrar + '</center> </td><td> <center>  ' + response[i].terminal + ' </center></td></tr>   ';
                    $("#primer_formato_marcacion").append(valor_final);
                }

            } else {
                valor_final = '';
                $("#primer_formato_marcacion").empty();
            }

        }


    });
    $("#btn_seleccion").attr("disabled", false);
    $("#btn_seleccion").val(" Seleccion de Personal ");

}

function grabar_seleccionar_personal() {
    "use strict";
    leer_fecha_marcacion = $('#slc_detalle  option:selected').attr('fecha');
    leer_marcacion = $('#slc_detalle  option:selected').attr('marcaciones');
    leer_nombre_personal = $("#nombre_personal").text();
    leer_tipo_asistencial = $("#condicion").text();
    leer_cargo = $("#cargo").text();
    datos_grabar_seleccion = {
        "anio": leer_anio,
        "mes": leer_mes,
        "dni": leer_dni,
        "nombres": leer_nombre_personal,
        "tipo_asistencia": leer_tipo_asistencial,
        "cargo": leer_cargo,
        "fecha_marcacion": leer_fecha_marcacion,
        "marcacion": leer_marcacion
    };

    $.ajax({
        data: datos_grabar_seleccion,
        dataType: 'json',
        url: url + 'asistencia/grabar_seleccion_personal',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $("#ver_seleccion").html('');
            mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio);
        }
    });

    $("#btn_seleccion").attr("disabled", true);
    $("#btn_seleccion").val(" -- ");

}



function mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio) {
    "use strict";
    datos_mostrar_personal_seleccion = {
        "anio": leer_anio,
        "mes": leer_mes
    };
    $.ajax({
        data: datos_mostrar_personal_seleccion,
        dataType: 'json',
        url: url + 'asistencia/mostrar_personal_seleccion',
        type: 'post',
        beforeSend: function () {
            $("#espera_personal_seleccion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#ver_seleccion").html('');
            $("#espera_personal_seleccion").html('');
            cantidad_registros = encontrados.length;
            if (cantidad_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#ver_seleccion").append('<option value="' + '"id_seleccion = "' + filas.idseleccion + '"  >' + filas.apellidos_nombres + ' &nbsp;&#124;&nbsp; ' + filas.fecha_marcacion + ' &nbsp;&#124;&nbsp; ' + filas.marcacion + '</option>');
                });
            } else {
                $("#ver_seleccion").empty();

            }

        }
    });


}


function seleccion_id_personal() {
    "use strict";
    leer_id_personal = $('#ver_seleccion option:selected').attr('id_seleccion');
    $("#btn_eliminar_seleccion").attr("disabled", false);

}


function eliminar_seleccionar_personal(leer_id_personal) {
    "use strict";
    dato_id = {
        "id": leer_id_personal
    };

    $.ajax({
        data: dato_id,
        dataType: 'json',
        url: url + 'asistencia/eliminar_personal_seleccion',
        type: 'post',
        beforeSend: function () {
            $("#espera_personal_seleccion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#ver_seleccion").html('');
            $("#espera_personal_seleccion").html('');
            mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio);
            $("#btn_eliminar_seleccion").attr("disabled", true);
        }
    });


}

function imprimir_seleccionar_personal() {
    "use strict";
    window.open(url + 'imprimir/imprimir_reporte_personal_seleccionado?anio=' + leer_anio + '&mes=' + leer_mes);

}






$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    $("#marcacion_relog").hide();
    $("#btn_seleccion")
        .attr("disabled", true)
        .val(" -- ");
    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio);




    $("#mes").change(function () {
        $("#slc_detalle").empty();
        $("#nombre_personal").empty();
        $("#condicion").empty();
        $("#cargo").empty();
        $("#primer_formato_marcacion").empty();
        $("#slc_detalle_dia").empty();
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        ver_frecuencia_marcaciones(leer_mes, leer_anio);
        mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio);
    });


    $("#anio").click(function () {
        $("#slc_detalle").empty();
        $("#nombre_personal").empty();
        $("#condicion").empty();
        $("#cargo").empty();
        $("#primer_formato_marcacion").empty();
        $("#slc_detalle_dia").empty();
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        ver_frecuencia_marcaciones(leer_mes, leer_anio);
        mostrar_personal_seleccion_por_mes_anio(leer_mes, leer_anio);
    });


    $("#slc_mayor_marcaciones")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });




    $("#slc_detalle")
        .click(function () {
            leer_detalle_fecha_seleccionada();
        })
        .keyup(function () {
            leer_detalle_fecha_seleccionada();
        });



    $("#ver_seleccion")
        .click(function () {
            seleccion_id_personal();


        });

    $("#btn_seleccion")
        .click(function () {
            grabar_seleccionar_personal();
        });


    $("#btn_eliminar_seleccion")
        .click(function () {
            eliminar_seleccionar_personal(leer_id_personal);
        });


    $("#btn_imprimir_seleccion")
        .click(function () {
            imprimir_seleccionar_personal();
        });




});
