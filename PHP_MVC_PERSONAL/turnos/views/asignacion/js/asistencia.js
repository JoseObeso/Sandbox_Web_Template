var url = 'http://' + document.domain + '/rrhh/turnos/',
    url_idioma = 'http://' + document.domain + '/rrhh/public/js',
    dato_buscar, lc_buscar_nombre, nro_registros, leer_id, leer_dni, leer_tipo_personal, leer_apellidos_nombres, leer_servicio, leer_cargo, leer_fecha_ingreso, leer_fecha_termino, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_mes_programacion, leer_anio_programacion, leer_todo_el_personal, datos_todos_administrativos, datos_administrativos_individual, leer_codigo_horario, url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    nombre_meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    datos_eliminar, ver_mes_anio, cantidad_registros, valor_final, i, datos_verificar;


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
    leer_id = $('#select_documentos  option:selected').attr('id');
    leer_dni = $('#select_documentos  option:selected').attr('dni');
    leer_tipo_personal = $('#select_documentos  option:selected').attr('tipo_personal');
    leer_apellidos_nombres = $('#select_documentos  option:selected').attr('apellidos_nombres');
    leer_servicio = $('#select_documentos  option:selected').attr('servicio');
    leer_cargo = $('#select_documentos  option:selected').attr('cargo');
    leer_fecha_ingreso = $('#select_documentos  option:selected').attr('fecha_ingreso');
    leer_fecha_termino = $('#select_documentos  option:selected').attr('fecha_termino');
    leer_codigo_horario = $('#select_documentos  option:selected').attr('codhorario');
    $("#txt_dni").val(leer_dni);
    $("#txt_apellidos_nombres").val(leer_apellidos_nombres);
    switch (leer_tipo_personal) {
        case 'A':
            $("#txt_tipo_personal").val('ADMINISTRATIVO');
            break;
        case 'S':
            $("#txt_tipo_personal").val('ASISTENCIAL');
            break;
        default:
            $("#txt_tipo_personal").val('NO DEFINIDO');
            break;
    }
    $("#txt_servicio").val(leer_servicio);
    $("#txt_cargo").val(leer_cargo);
    $("#txt_fecha_inicio").val(leer_fecha_ingreso);
    $("#txt_fecha_termino").val(leer_fecha_termino);
    $("#txt_fecha_termino").val(leer_fecha_termino);
    $("#txt_cod_horario").val(leer_codigo_horario);
    $("#seleccion_horario").attr("disabled", false);
    $("#mostrar_espera").html('');
    $('#procesar_todo_administrativo_1').prop('checked', false);
    $('#procesar_todo_administrativo_1').prop('disabled', false);
    $('#btn_Grabar').attr("disabled", true);
}


function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'asignacion/buscar_por_nombre',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#select_documentos").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#select_documentos").append('<option value="' + filas.id + '" id = "' + filas.id + '"  dni = "' + filas.dni + '"  tipo_personal = "' + filas.tipo_personal + '" apellidos_nombres = "' + filas.apellidos_nombres + '" servicio = "' + filas.servicio + '" cargo = "' + filas.cargo + '" fecha_ingreso = "' + filas.fecha_ingreso + '" fecha_termino = "' + filas.fecha_termino + '" codhorario = "' + filas.codhorario + '"  >' + filas.apellidos_nombres + '</option>');
                });

            } else {
                $("#select_documentos").empty();
            }
        }
    });
}


function procesar_todo_el_personal_administrativo(leer_mes_programacion, leer_anio_programacion) {
    "use strict";
    datos_todos_administrativos = {
        'mes': leer_mes_programacion,
        'anio': leer_anio_programacion
    };
    $.ajax({
        data: datos_todos_administrativos,
        dataType: 'json',
        url: url + 'asignacion/procesar_todo_administrativo_asistencial',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $('#procesar_todo_administrativo_0').prop('checked', false);
            $('#procesar_todo_administrativo_1').prop('checked', false);
            $('#btn_Grabar').attr("disabled", true);
            $("#mostrar_espera").html('<center><font color="#000000"><em><strong>...Programacion Ejecutado Para : ' + nombre_meses[leer_mes_programacion - 1] + ' / ' + leer_anio_programacion + '...</strong></em></font></center>');
            $('#procesar_todo_administrativo_1').prop('checked', false);
            $('#procesar_todo_administrativo_1').prop('disabled', false);
            mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion);
        }
    });
}


function procesar_personal_administrativo_individual(leer_mes_programacion, leer_anio_programacion, leer_dni) {
    "use strict";
    datos_administrativos_individual = {
        'mes': leer_mes_programacion,
        'anio': leer_anio_programacion,
        'dni': leer_dni
    };
    //   swal("Uno solo Administrativo...  DNI :" + leer_dni);

}


function eliminar_todo_administrativo_mes_programacion(leer_mes_programacion, leer_anio_programacion) {
    "use strict";
    datos_eliminar = {
        'mes': leer_mes_programacion,
        'anio': leer_anio_programacion
    };


    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'asignacion/eliminar_todo_administrativo',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $('#procesar_todo_administrativo_0').prop('checked', false);
            $('#procesar_todo_administrativo_1').prop('checked', false);
            $('#btn_Grabar').attr("disabled", true);
            $('#btn_eliminar_programacion').attr("disabled", true);
            $("#mostrar_espera").html('<center><font color="#000000"><em><strong>...Se elimino programacion para : ' + nombre_meses[leer_mes_programacion - 1] + ' / ' + leer_anio_programacion + '...</strong></em></font></center>');
            $('#procesar_todo_administrativo_1').prop('checked', false);
            $('#procesar_todo_administrativo_1').prop('disabled', false);
            mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion);
        }
    });

}






function mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion) {
    "use strict";
   
    ver_mes_anio = {
        'mes_mostrar': leer_mes_programacion,
        'anio_mostrar': leer_anio_programacion
    };
    $.ajax({
        data: ver_mes_anio,
        dataType: 'json',
        url: url + 'asignacion/ver_programacion_seleccion',
        type: 'post',
        beforeSend: function () {
            $("#resultado_mostrar").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#table_mostrar_programacion").html('');
          //   $("#table_mostrar_programacion").dataTable().fnDestroy();
            // $('#table_mostrar_programacion').DataTable().draw();
            mostrar_programacion_recargado();
            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = '<tr><td bgcolor="#FBF5A4" >' + datos[i].dni + '</td><td bgcolor="#FBF5A4">' + datos[i].tipo_personal + '</td><td bgcolor="#FBF5A4"> ' + datos[i].apellidos_nombres + '</td><td bgcolor="#FBF5A4" >' + datos[i].estado + '</td><td bgcolor="#FBF5A4">' + datos[i].estado + '</td></tr>';
                    $("#table_mostrar_programacion").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#table_mostrar_programacion").append(valor_final);
            }
            $('#table_mostrar_programacion').DataTable().draw();
        }

    });

}







function verificar_si_existe_programacion(leer_mes_programacion, leer_anio_programacion) {
    "use strict";
    datos_verificar = {
        'mes': leer_mes_programacion,
        'anio': leer_anio_programacion
    };
    $.ajax({
        data: datos_verificar,
        dataType: 'json',
        url: url + 'asignacion/verificar_si_existe_programacion',
        type: 'post',
        beforeSend: function () {
            $("#resultado_mostrar").html("<center>... verificando....</center>");
        },
        success: function (datos) {
            $("#resultado_mostrar").html('');
            for (i = 0; i < datos.length; i++) {


                if (datos[i].mes === '0') {
                    procesar_todo_el_personal_administrativo(leer_mes_programacion, leer_anio_programacion);
                } else {
                    $("#mostrar_espera").html('<center><font color="#000000"><em><strong>...Existe programacion para : ' + nombre_meses[leer_mes_programacion - 1] + ' / ' + leer_anio_programacion + '...</strong></em></font></center>');
                    mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion);
                }
            }
        }



    });


}


function mostrar_programacion() {
    "use strict";
    $('#table_mostrar_programacion').DataTable({
        "language": {
            "url": url_idioma + "/es_es.lang"
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
         "scrollY": 400,
         "scrollX": true,
         "scrollCollapse": false,
        "paging":         true
        
    });
}


function mostrar_programacion_recargado() {
    "use strict";
    $('#table_mostrar_programacion').DataTable({
        "language": {
            "url": url_idioma + "/es_es.lang"
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        "retrieve": true,
        "destroy": true,
        "scrollY": 400,
         "scrollX": true,
         "scrollCollapse": false,
        "paging":         true
        
    
        
        

    });
}




$(document).ready(function () {
    "use strict";
    mostrar_programacion();
    $("#mes_programacion").val(mes).attr("selected", "selected");
    $("#anio_programacion").val(anio);
    $("#select_documentos")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });
    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            $('#btn_Grabar').attr("disabled", true);
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });

    $("#mes_programacion").change(function () {
        $("#mostrar_espera").html('');
        leer_mes_programacion = $("#mes_programacion").val();
        leer_anio_programacion = $("#anio_programacion").val();
        mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion);

    });

    $("#anio_programacion").change(function () {
        $("#mostrar_espera").html('');
        leer_mes_programacion = $("#mes_programacion").val();
        leer_anio_programacion = $("#anio_programacion").val();
        mostrar_asistencia_mes_procesado(leer_mes_programacion, leer_anio_programacion);


    });


    $("#procesar_todo_administrativo_0").click(function () {
        $("#personal_seleccionado").text('');
        $('#btn_Grabar').attr("disabled", false);
        $('#btn_eliminar_programacion').attr("disabled", false);
    });

    $("#procesar_todo_administrativo_1").click(function () {
        $("#personal_seleccionado").text("  ::    " + leer_apellidos_nombres);
        $('#btn_Grabar').attr("disabled", false);
        $('#btn_eliminar_programacion').attr("disabled", false);
    });

    $("#btn_Grabar").click(function () {
        leer_mes_programacion = $("#mes_programacion").val();
        leer_anio_programacion = $("#anio_programacion").val();
        leer_todo_el_personal = $('input:radio[name=procesar_todo_administrativo]:checked').val();
        $('#btn_eliminar_programacion').attr("disabled", true);
        $("#mostrar_espera").empty();
        switch (leer_todo_el_personal) {
            case '1':
                verificar_si_existe_programacion(leer_mes_programacion, leer_anio_programacion);
                break;
            case '2':
                procesar_personal_administrativo_individual(leer_mes_programacion, leer_anio_programacion, leer_dni);
                break;
            default:
                break;
        }
    });


    $("#btn_eliminar_programacion").click(function () {
        leer_mes_programacion = $("#mes_programacion").val();
        leer_anio_programacion = $("#anio_programacion").val();
        leer_todo_el_personal = $('input:radio[name=procesar_todo_administrativo]:checked').val();
        switch (leer_todo_el_personal) {
            case '1':
                eliminar_todo_administrativo_mes_programacion(leer_mes_programacion, leer_anio_programacion);
                break;
            case '2':
                procesar_personal_administrativo_individual(leer_mes_programacion, leer_anio_programacion, leer_dni);
                break;

            default:
                break;
        }
    });




});
