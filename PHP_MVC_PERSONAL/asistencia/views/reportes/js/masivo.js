var url = 'http://' + document.domain + '/rrhh/asistencia/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    cantidad_registros, leer_tipo_personal, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes, leer_anio, datos_reporte, valor_final;

/*
dato_buscar, lc_buscar_nombre, nro_registros, leer_dni, leer_tipo_personal, leer_apellidos_nombres, leer_cargo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes_programacion, leer_anio_programacion, leer_codigo_horario, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    get_datos_asistencia, leer_nombre_dia, i, ln_total_horas, leer_nombre_del_mes, leer_nro_dia, leer_entrada, leer_salida, leer_horas, leer_id_horario, leer_cod_horario, leer_cod_turno, leer_hora_ingreso, leer_hora_salida, leer_horas, leer_id_asistencia, datos_grabar_turno, leer_condicion, leer_mes, leer_anio, datos_horario, cantidad_registros, valor_final, datos_horario_entrada_salida, datos_horario_entrada_salida_asistencial, destino_pdf, mes_seleccion, anio_seleccion, codigo_personal_seleccion, nombre_personal_seleccion, paterno_personal_seleccion, materno_personal_seleccion, nombres_personal_seleccion, solo_nombre_personal_seleccion, primer_nombre, nombre_seleccion, cargo_personal_seleccion, ingreso_personal_seleccion, tipo_horario_tempus, destino_pdf_f2, leer_estado, leer_msj_estado, leer_cargo_para_grabar, leer_tipo_personal, leer_tipo_estado, datos_grabar_tempus, condicion_personal_seleccion, leer_ingreso, dato_ultima_marcacion, leer_ultima_marcacion;
*/


fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;



function obtener_reporte_marcaciones_personal_administrativos(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };
    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/procesar_reporte_masivo_admin',
        type: 'post',
        beforeSend: function () {
            $("#resultado_marcacion").dataTable().fnDestroy();
            $("#procesar_espera")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#listado_marcaciones").html('');
            $("#listado_marcaciones").hide();
            $("#resultado_marcacion_asistencial").hide();
            
        },
        success: function (response) {
            $("#procesar_espera").html('');
            $("#cabecera_administrativo").show();
            $("#cabecera_asistencial").hide();
            $("#listado_marcaciones").html('');
            $("#listado_marcaciones").show();
            $("#btn_descargar_excel").hide();
            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].dni + '</center></td><td>&nbsp;' + response[i].apellidos_nombres + '</td><td><center> ' + response[i].cargo + '</td><td><center>' + response[i].fecha + '</center></td><td>' + response[i].nombre_dia + '</td><td><center>  ' + response[i].hingreso + ' </center></td><td><center>  ' + response[i].hsalida + ' </center></td></tr>';
                    $("#listado_marcaciones").append(valor_final);
                }
                mostrar_datatable_marcaciones();
            } else {
                valor_final = '';
                $("#listado_marcaciones").append(valor_final);
                $("#listado_marcaciones").empty();
               
            }
        }
    });

}



function mostrar_datatable_marcaciones() {
    "use strict";
    $('#resultado_marcacion').DataTable({
        destroy: true,
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}





function obtener_reporte_masivo_marcaciones_asistencial(leer_mes, leer_anio) {
    "use strict";
    datos_reporte = {
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: datos_reporte,
        dataType: 'json',
        url: url + 'reportes/procesar_reporte_masivo_asistencial_marcaciones',
        type: 'post',
        beforeSend: function () {
            $("#procesar_espera")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#listado_marcaciones_asistencial").html('');
            $("#listado_marcaciones_asistencial").hide();
            $("#resultado_marcacion").hide();
            $("#resultado_marcacion").html('');
        },
        success: function (response) {
            $("#procesar_espera").html('');
            $("#cabecera_administrativo").hide();
            $("#cabecera_asistencial").show();
            $("#listado_marcaciones_asistencial").html('');
            $("#listado_marcaciones_asistencial").show();
            $("#btn_descargar_excel").show();
            $("#btn_descargar_excel").attr("disabled", false);
            $("#resultado_marcacion_asistencial").show();
            

            cantidad_registros = response.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < response.length; i++) {
                    valor_final = '<tr><td><center>' + response[i].dni + '</center></td><td>&nbsp;' + response[i].apellidos_nombres + '</td><td><center> ' + response[i].cargo + '</center></td><td>' + response[i].nombre_dia + '</td><td><center>  ' + response[i].fecha + ' </center></td><td><center>  ' + response[i].hora + ' </center></td></tr>';
                    $("#listado_marcaciones_asistencial").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#listado_marcaciones_asistencial").append(valor_final);
                $("#listado_marcaciones_asistencial").empty();
            }
        }
    });
}







$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    leer_mes = mes;
    leer_anio = anio;
    $("#btn_procesar").attr("disabled", true);
    $("#cabecera_administrativo").hide();
    $("#cabecera_asistencial").hide();
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);

    $("#btn_descargar_excel").hide();


    $("#mes").change(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#btn_procesar").attr("disabled", true);
        $("#btn_descargar_excel").attr("disabled", true);
        
        
        
    });
    $("#anio").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        $("#btn_procesar").attr("disabled", true);
        $("#btn_descargar_excel").attr("disabled", true);
    });
    
    $("input[type='radio']").click(function () {
        leer_tipo_personal = $('input:radio[name=tipo_personal]:checked').val();
        $("#btn_procesar").attr("disabled", false);
        $('#resultado_marcacion').parents('div.dataTables_wrapper').first().hide();
    
    });
    $("#btn_procesar").click(function () {
        leer_mes = $("#mes").val();
        leer_anio = $("#anio").val();
        if (leer_tipo_personal === '1') {
            obtener_reporte_masivo_marcaciones_asistencial(leer_mes, leer_anio);
        } else {
            obtener_reporte_marcaciones_personal_administrativos(leer_mes, leer_anio);
        }
    });


    $("#btn_descargar_excel").click(function () {

        $('#resultado_marcacion_asistencial').table2excel({
        
            exclude: ".noExl",
            name: "marcaciones",
            filename: "MARCACIONES_ASISTENCIAL_" + leer_mes + "_" + leer_anio + ".xls"
            
        });

    });









});
