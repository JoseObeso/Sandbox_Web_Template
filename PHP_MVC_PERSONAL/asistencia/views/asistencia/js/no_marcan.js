var url = 'http://' + document.domain + '/rrhh/asistencia/',
    nro_registros, leer_dni, leer_apellidos_nombres, leer_cargo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    leer_nombre_del_mes, leer_mes, leer_anio, datos_horario, cantidad_registros, valor_final, leer_estado, leer_msj_estado, dato_ultima_marcacion, lc_fecha_seleccion, lc_separacion, lc_dia, lc_mes, lc_anio, datos_mayor_n, leer_fecha, lc_fecha_ultima, lc_array_fecha_ultima, leer_dia, leer_mes, leer_anio;


fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;
leer_nombre_del_mes = nombre_meses[mes - 1];




function ver_fecha_seleccion() {
    "use strict";
    $("#mostrar_fecha_seleccion")
        .datepicker({
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            useCurrent: true
        });
    $("#mostrar_fecha_seleccion")
        .datepicker("setDate", new Date())
        .change(function () {
            $("#primer_formato_marcacion").hide();
            $("#apellidos_nombres").hide();
            $("#no_marcacion").hide();
            $("#dni").hide();
            $("#cargo").hide();
            $("#fecha").hide();
            $("#estado").hide();
            $("#ultima_marcacion").hide();
            $("#ultima_mes").text('MARCACIONES EN RELOG :');
            $("#btn_descargar_excel").attr("disabled", true);
            lc_fecha_seleccion = $("#mostrar_fecha_seleccion").val();
            lc_separacion = lc_fecha_seleccion.split("/");
            lc_dia = parseInt(lc_separacion[0]);
            lc_mes = parseInt(lc_separacion[1]);
            lc_anio = parseInt(lc_separacion[2]);
            datos_mayor_n = {
                "mes": lc_mes,
                "anio": lc_anio,
                "dia": lc_dia
            };
            $.ajax({
                data: datos_mayor_n,
                dataType: 'json',
                url: url + 'asistencia/ver_no_marcaron',
                type: 'post',
                beforeSend: function () {
                    $("#esperar_proceso")
                        .show()
                        .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
                    $("#slc_mostrar")
                        .hide();
                },
                success: function (datos) {
                    $("#btn_descargar_excel").attr("disabled", false);
                    $("#esperar_proceso")
                        .html('')
                        .hide();
                    $("#slc_mostrar")
                        .show()
                        .html('');
                    nro_registros = datos.length;
                    if (nro_registros > 0) {
                        datos.forEach(function (filas) {
                            $("#slc_mostrar").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres + '"  cargo = "' + filas.cargo + '"  fecha = "' + filas.fecha + '"  estado = "' + filas.estado + '"  >' + filas.apellidos_nombres + '</option>');
                        });
                        $("#btn_descargar_excel").attr("disabled", false);
                    } else {
                        $("#slc_mostrar").html('');
                    }
                }
            });
        });
}





function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_dni = $('#slc_mostrar option:selected').attr('dni');
    ver_ultima_marcacion(leer_dni);
    leer_apellidos_nombres = $('#slc_mostrar option:selected').attr('apellidos_nombres');
    leer_cargo = $('#slc_mostrar option:selected').attr('cargo');
    leer_fecha = $('#slc_mostrar option:selected').attr('fecha');
    leer_estado = $('#slc_mostrar option:selected').attr('estado');

    $("#apellidos_nombres").text(leer_apellidos_nombres);
    $("#dni").text('DNI : ' + leer_dni);
    $("#cargo").text('CARGO : ' + leer_cargo);
    $("#fecha").text('INGRESO : ' + leer_fecha);
    leer_msj_estado = (leer_estado === '1') ? 'OPERATIVO' : 'DESACTIVADO O RENUNCIA';
    $("#estado").text('CONDICION : ' + leer_msj_estado);

}



function ver_ultima_marcacion(leer_dni) {
    "use strict";
    dato_ultima_marcacion = {
        "dni": leer_dni
    };
    $.ajax({
        data: dato_ultima_marcacion,
        dataType: 'json',
        url: url + 'asistencia/ver_ultima_marcacion_tempus',
        type: 'post',
        beforeSend: function () {},
        success: function (data) {
            data.forEach(function (elemento) {
                lc_fecha_ultima = elemento.fecha;
                $("#ultima_marcacion").html(' ULTIMA MARCACION  : --  FECHA : ' + elemento.fecha + ' -- HORA : ' + elemento.hora);
                lc_array_fecha_ultima = lc_fecha_ultima.split("/");
                leer_dia = parseInt(lc_array_fecha_ultima[0]);
                leer_mes = parseInt(lc_array_fecha_ultima[1]);
                leer_anio = parseInt(lc_array_fecha_ultima[2]);
                procesar_asistencia(leer_dni, leer_mes, leer_anio);
                $("#ultimo_mes").text('MARCACIONES EN RELOG DEL ULTIMO MES :' + nombre_meses[leer_mes - 1] + ' / ' + leer_anio);
                $("#no_marcacion").text('No registra marcaciones desde el 1 - al ' + lc_dia + ' del Mes de ' + nombre_meses[lc_mes - 1] + ' / ' + leer_anio);
                $("#primer_formato_marcacion").show();
                $("#apellidos_nombres").show();
                $("#no_marcacion").show();
                $("#dni").show();
                $("#cargo").show();
                $("#fecha").show();
                $("#estado").show();
                $("#ultima_marcacion").show();
                $("#btn_descargar_excel").attr("disabled", false);

            });
        }
    });
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
            $("#primer_formato_marcacion").html('');
            $("#espera_mientras_muestra_marcaciones")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (response) {
            $("#primer_formato_marcacion").show();
            $("#espera_mientras_muestra_marcaciones").hide();
            valor_final = '';
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


 


$(document).ready(function () {
    "use strict";
    ver_fecha_seleccion();
    $("#slc_mostrar")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#btn_descargar_excel").click(function () {
       window.open(url + 'imprimir/imprimir_listado_no_marcan');
    });






});
