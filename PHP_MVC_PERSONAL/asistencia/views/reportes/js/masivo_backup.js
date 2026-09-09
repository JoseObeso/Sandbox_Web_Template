var url = 'http://' + document.domain + '/rrhh/asistencia/',
    dato_buscar, lc_buscar_nombre, nro_registros, leer_dni, leer_tipo_personal, leer_apellidos_nombres, leer_cargo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes_programacion, leer_anio_programacion, leer_codigo_horario, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    get_datos_asistencia, leer_nombre_dia, i, ln_total_horas, leer_nombre_del_mes, leer_nro_dia, leer_entrada, leer_salida, leer_horas, leer_id_horario, leer_cod_horario, leer_cod_turno, leer_hora_ingreso, leer_hora_salida, leer_horas, leer_id_asistencia, datos_grabar_turno, leer_condicion, leer_mes, leer_anio, datos_horario, cantidad_registros, valor_final, datos_horario_entrada_salida, datos_horario_entrada_salida_asistencial, destino_pdf, mes_seleccion, anio_seleccion, codigo_personal_seleccion, nombre_personal_seleccion, paterno_personal_seleccion, materno_personal_seleccion, nombres_personal_seleccion, solo_nombre_personal_seleccion, primer_nombre, nombre_seleccion, cargo_personal_seleccion, ingreso_personal_seleccion, tipo_horario_tempus, destino_pdf_f2, leer_estado, leer_msj_estado, leer_cargo_para_grabar, leer_tipo_personal, leer_tipo_estado, datos_grabar_tempus, condicion_personal_seleccion, leer_ingreso, dato_ultima_marcacion, leer_ultima_marcacion;

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
    leer_dni = $('#ver_personal_tempus  option:selected').attr('dni');
    leer_tipo_personal = $('#ver_personal_tempus  option:selected').attr('tipo_personal');
    leer_apellidos_nombres = $('#ver_personal_tempus option:selected').attr('apellidos_nombres');
    leer_condicion = $('#ver_personal_tempus  option:selected').attr('condicion');
    leer_cargo = $('#ver_personal_tempus option:selected').attr('cargo');
    leer_estado = $('#ver_personal_tempus option:selected').attr('estado');
    leer_ingreso = $('#ver_personal_tempus option:selected').attr('fecha_ingreso');
    leer_msj_estado = (leer_estado === '1') ? 'OPERATIVO' : 'DESACTIVADO O RENUNCIA';
    $("#txt_mostrar_nombre").text('DNI :' + leer_dni + ' - ' + leer_apellidos_nombres);
    $("#txt_condicion").text(leer_condicion + ' -- ' + leer_cargo);
    $("#txt_estado").text('INGRESO : ' + leer_ingreso + ' -- ESTADO : ' + leer_msj_estado);
    $("#id_cargo").val(leer_cargo);

    $("#mes").attr("disabled", false);
    $("#anio").attr("disabled", false);
    $("#btn_grabar").attr("disabled", false);

    leer_mes = $("#mes").val();
    leer_anio = $("#anio").val();
    ver_condiciones();
    ver_ultima_marcacion(leer_dni);
    procesar_asistencia(leer_dni, leer_mes, leer_anio);
    switch (leer_tipo_personal) {
        case 'A':
            procesar_asistencia_entrada_salida_administrativo(leer_dni, leer_mes, leer_anio);
            $('#tipo_personal_0')
                .prop('checked', true)
                .prop('disabled', false);
            break;
        case 'S':
            $('#tipo_personal_1')
                .prop('checked', true)
                .prop('disabled', false);
            procesar_asistencia_entrada_salida_asistencial(leer_dni, leer_mes, leer_anio);
            break;
        default:
            $("#marcaciones_entrada_salida").empty();
            swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Proceda a Actualizarlo...", "warning");
            $('#tipo_personal_2')
                .prop('checked', true)
                .prop('disabled', false);
    }


    switch (leer_estado) {
        case '1':
            $('#condicion_personal_0')
                .prop('checked', true)
                .prop('disabled', false);
            break;
        case '2':
            $('#condicion_personal_1')
                .prop('checked', true)
                .prop('disabled', false);

            break;
        case '3':

            break;
        default:
            break;

    }


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
                $("#btn_imprimir").attr("disabled", false);
            } else {
                valor_final = '';
                $("#primer_formato_marcacion").append(valor_final);
                $("#primer_formato_marcacion").empty();
                $("#btn_imprimir").attr("disabled", true);

            }

        }


    });




}


function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };

    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'asistencia/buscar_por_nombre_tempus',
        type: 'post',
        beforeSend: function () {
            $("#primera_marcacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#ver_personal_tempus").html('');
            $("#primera_marcacion").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#ver_personal_tempus").append('<option value="' + filas.dni + '"  dni = "' + filas.dni + '"  apellidos_nombres = "' + filas.apellidos_nombres_totales + '" condicion = "' + filas.condicion + '" tipo_personal = "' + filas.tipo_horario + '" cargo = "' + filas.cargo_planilla + '" nombre_personal_tempus = "' + filas.nombres + '" paterno_personal_tempus = "' + filas.paterno + '" materno_personal_tempus = "' + filas.materno + '" nombres_personal_tempus = "' + filas.nombres + '" solo_nombres_personal_tempus = "' + filas.nombres + '"  cargo_personal_tempus = "' + filas.cargo_planilla + '"  tipo_horario_tempus = "' + filas.tipo_horario + '"  estado = "' + filas.estadotb + '"fecha_ingreso ="' + filas.ingreso +  '"  >' + filas.apellidos_nombres_totales + '</option>');
                });
                $("#total_trabajadores").text('Total Personal Tempus: ' + nro_registros);
            } else {
                $("#ver_personal_tempus").empty();

            }
        }
    });
}





function procesar_asistencia_entrada_salida_administrativo(leer_dni, leer_mes, leer_anio) {
    "use strict";
    datos_horario_entrada_salida = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };
    $.ajax({
        data: datos_horario_entrada_salida,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia_entrada_salida',
        type: 'post',
        beforeSend: function () {
            $("#marcaciones_entrada_salida").html('');
            $("#espera_entrada_salida").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#marcaciones_entrada_salida").html('');
            $("#espera_entrada_salida").html('');
            $("#cabecera_administrativo").show();
            $("#cabecera_asistencial").hide();

            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final2 = '<tr><td><center>' + datos[i].nro + '</center></td><td><center>' + datos[i].fecha + '</center></td><td>&nbsp;' + datos[i].nombre_dia + '</td><td><center> ' + datos[i].ingreso + '</center> </td><td> <center>  ' + datos[i].salida + ' </center></td></tr>   ';
                    $("#marcaciones_entrada_salida").append(valor_final2);
                }

                $("#btn_imprimir_entrada_salida").attr("disabled", false);

            } else {
                valor_final2 = '';
                $("#marcaciones_entrada_salida").empty();
            }
        }
    });

}


function procesar_asistencia_entrada_salida_asistencial(leer_dni, leer_mes, leer_anio) {
    "use strict";
    datos_horario_entrada_salida_asistencial = {
        "dni": leer_dni,
        "mes": leer_mes,
        "anio": leer_anio
    };

    $.ajax({
        data: datos_horario_entrada_salida_asistencial,
        dataType: 'json',
        url: url + 'asistencia/ver_marcaciones_de_asistencia_asistencial_v02',
        type: 'post',
        beforeSend: function () {
            $("#marcaciones_entrada_salida").html('');
            $("#espera_entrada_salida").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#marcaciones_entrada_salida").html('');
            $("#espera_entrada_salida").html('');


            $("#cabecera_administrativo").hide();
            $("#cabecera_asistencial").show();



            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    var valor_final3 = '<tr><td><center>' + datos[i].nro + '</center></td><td><center>&nbsp;' + datos[i].entrada + '&nbsp;</center></td><td>&nbsp;&nbsp;' + datos[i].entrada_dia_entrada + '</td><td><center>&nbsp;' + datos[i].hentrada + '&nbsp;</center></td><td><center>&nbsp;' + datos[i].salida + '&nbsp;</center></td><td><center>&nbsp;' + datos[i].hsalida + '</center></td><td><center>&nbsp;' + datos[i].horas + '</center></td></tr>';
                    $("#marcaciones_entrada_salida").append(valor_final3);
                }
                $("#btn_imprimir_entrada_salida").attr("disabled", false);
            } else {
                valor_final3 = '';
                $("#marcaciones_entrada_salida").empty();
            }
        }
    });

}




function ver_condiciones() {
    "use strict";
    mes_seleccion = $("#mes").val();
    anio_seleccion = $("#anio").val();


    codigo_personal_seleccion = $('#ver_personal_tempus option:selected').attr('dni');
    nombre_personal_seleccion = $('#ver_personal_tempus option:selected').attr('apellidos_nombres');
    paterno_personal_seleccion = $('#ver_personal_tempus option:selected').attr('paterno_personal_tempus');
    materno_personal_seleccion = $('#ver_personal_tempus option:selected').attr('materno_personal_tempus');
    nombres_personal_seleccion = $('#ver_personal_tempus option:selected').attr('nombres_personal_tempus');
    solo_nombre_personal_seleccion = $('#ver_personal_tempus option:selected').attr('solo_nombres_personal_tempus');
    primer_nombre = solo_nombre_personal_seleccion.split(" ")[0];
    nombre_seleccion = paterno_personal_seleccion + '_' + materno_personal_seleccion + '_' + primer_nombre + '_' + nombre_meses[mes_seleccion - 1] + '_' + anio_seleccion + '_MARCACION_RELOG.PDF';
    condicion_personal_seleccion = $('#ver_personal_tempus option:selected').attr('condicion_personal_tempus');
    ingreso_personal_seleccion = $('#ver_personal_tempus option:selected').attr('ingreso_personal_tempus');
    cargo_personal_seleccion = $('#ver_personal_tempus option:selected').attr('cargo_personal_tempus');
    tipo_horario_tempus = $('#ver_personal_tempus option:selected').attr('tipo_horario_tempus');

    $("#mes").attr("disabled", false);
    $("#anio").attr("disabled", false);

    return codigo_personal_seleccion, mes_seleccion, anio_seleccion;

}


function grabar_en_base_tempus(leer_dni, leer_cargo_para_grabar, leer_tipo_personal, leer_tipo_estado) {
    "use strict";
    datos_grabar_tempus = {
        "dni": leer_dni,
        "cargo": leer_cargo_para_grabar,
        "tipo": leer_tipo_personal,
        "estado": leer_tipo_estado
    };

    $.ajax({
        data: datos_grabar_tempus,
        dataType: 'json',
        url: url + 'asistencia/grabar_data_tempus',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            $('#btn_grabar').attr("disabled", true);

        }

    });


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
            leer_ultima_marcacion = '';
             data.forEach(function (elemento) {
                  $("#ultima_marcacion").html(' ULTIMA MARCACION  : --  FECHA : ' + elemento.fecha + ' -- HORA : ' + elemento.hora);
               
            });
        }
    });

}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    $("#cabecera_administrativo").hide();
    $("#cabecera_asistencial").hide();
 
    $("#txt_nombre_tempus")
        .focus()
        .keypress(function () {
            lc_buscar_nombre = $("#txt_nombre_tempus").val();
            $("#txt_mostrar_nombre").val('');
            $("#primer_formato_marcacion").empty();
            $("#marcaciones_entrada_salida").empty();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });


    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#marcaciones_entrada_salida").empty();
        procesar_asistencia(leer_dni, leer_mes, leer_anio);
        switch (leer_tipo_personal) {
            case 'A':
                procesar_asistencia_entrada_salida_administrativo(leer_dni, leer_mes, leer_anio);
                break;
            case 'S':
                procesar_asistencia_entrada_salida_asistencial(leer_dni, leer_mes, leer_anio);
                break;
            default:
                $("#marcaciones_entrada_salida").empty();
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }

    });



    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#marcaciones_entrada_salida").empty();
        procesar_asistencia(leer_dni, leer_mes, leer_anio);
        switch (leer_tipo_personal) {
            case 'A':
                procesar_asistencia_entrada_salida_administrativo(leer_dni, leer_mes, leer_anio);
                break;
            case 'S':
                procesar_asistencia_entrada_salida_asistencial(leer_dni, leer_mes, leer_anio);
                break;
            default:
                $("#marcaciones_entrada_salida").empty();
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }


    });



    $('#btn_imprimir').click(function () {
        ver_condiciones();
        destino_pdf = 1;
        window.open(url + 'imprimir/imprimir_asistencia_reporte?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + leer_mes + '&anio=' + leer_anio + '&destino=' + destino_pdf);
    });






    $('#btn_imprimir_entrada_salida').click(function () {
        ver_condiciones();
        destino_pdf_f2 = 1;
        switch (tipo_horario_tempus) {
            case 'A':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_administrativo_v02?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + leer_mes + '&anio=' + leer_anio + '&destino=' + destino_pdf_f2);
                break;
            case 'S':
                window.open(url + 'imprimir/imprimir_asistencia_reporte_entrada_salida_asistencial_v02?codigo=' + codigo_personal_seleccion + '&nombre=' + nombre_personal_seleccion + '&cargo=' + cargo_personal_seleccion + '&mes=' + leer_mes + '&anio=' + leer_anio + '&destino=' + destino_pdf_f2);
                break;
            default:
                swal("No esta definido si el personal seleccionado es ADMINISTRATIVO o ASISTENCIAL....", "Reporte a Oficina de Personal", "warning");
        }

    });



    $('#btn_grabar').click(function () {
        leer_cargo_para_grabar = $("#id_cargo").val();
        leer_tipo_personal = $('input:radio[name=tipo_personal]:checked').val();
        leer_tipo_estado = $('input:radio[name=condicion_personal]:checked').val();
        grabar_en_base_tempus(leer_dni, leer_cargo_para_grabar, leer_tipo_personal, leer_tipo_estado);

    });







    $("#ver_personal_tempus")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });


});
