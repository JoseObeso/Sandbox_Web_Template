var url = 'http://' + document.domain + '/rrhh/turnos/',
    dato_buscar, lc_buscar_nombre, nro_registros, leer_id, leer_dni, leer_tipo_personal, leer_apellidos_nombres, leer_servicio, leer_cargo, leer_fecha_ingreso, leer_fecha_termino, leer_codhorario, leer_id_horario, leer_cod_horario, leer_cod_turno, leer_hora_ingreso, leer_hora_salida, leer_horas, datos_asignar;





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
    leer_codhorario = $('#select_documentos  option:selected').attr('codhorario');
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
    $("#txt_cod_horario").val(leer_codhorario);
    $("#seleccion_horario").attr("disabled", false);
    $('#btn_Grabar').attr("disabled", true);


}


function mostrar_horario_seleccionado() {
    "use strict";
    leer_id_horario = $('#seleccion_horario option:selected').attr('id');
    leer_cod_horario = $('#seleccion_horario option:selected').attr('codigo');
    leer_cod_turno = $('#seleccion_horario option:selected').attr('codigoturno');
    leer_hora_ingreso = $('#seleccion_horario option:selected').attr('horaingreso');
    leer_hora_salida = $('#seleccion_horario option:selected').attr('horasalida');
    leer_horas = $('#seleccion_horario option:selected').attr('horas');
    $("#txt_id").val(leer_id_horario);
    $("#txt_codigo").val(leer_cod_horario);
    $("#txt_turno").val(leer_cod_turno);
    $("#txt_hingreso").val(leer_hora_ingreso);
    $("#txt_hsalida").val(leer_hora_salida);
    $("#txt_horas").val(leer_horas);
    $('#btn_Grabar').attr("disabled", false);

}


function limpiar_datos()
{
    "use strict";
    $("#txt_id").val('');
    $("#txt_codigo").val('');
    $("#txt_turno").val('');
    $("#txt_hingreso").val('');
    $("#txt_hsalida").val('');
    $("#txt_horas").val('');
    $('#btn_Grabar').attr("disabled", true);
    
    
}






function leer_nombre_y_mostrar_resultado(lc_buscar_nombre)
{
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
                encontrados.forEach(function (filas, index) {
                    $("#select_documentos").append('<option value="' + filas.id + '" id = "' + filas.id + '"  dni = "' + filas.dni + '"  tipo_personal = "' + filas.tipo_personal + '" apellidos_nombres = "' + filas.apellidos_nombres + '" servicio = "' + filas.servicio + '" cargo = "' + filas.cargo + '" fecha_ingreso = "' + filas.fecha_ingreso + '" fecha_termino = "' + filas.fecha_termino + '" codhorario = "' + filas.codhorario + '"  >' + filas.apellidos_nombres + '</option>');
                });

            } else {
                $("#select_documentos").empty();
            }
        }
    });
}


function grabar_horario_asignado(leer_cod_horario, leer_id) {
    "use strict";
    datos_asignar = {
        'codhorario': leer_cod_horario,
        'idpersonal': leer_id
    };

    $.ajax({
        data: datos_asignar,
        dataType: 'json',
        url: url + 'asignacion/asignar_horario',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion conforme.....");
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);

        }
    });
 

}

$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#select_documentos")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#seleccion_horario")
        .click(function () {
            mostrar_horario_seleccionado();
        })
        .keyup(function () {
            mostrar_horario_seleccionado();
        });
     
    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            limpiar_datos();
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });

    $("#btn_Grabar").click(function () {
        grabar_horario_asignado(leer_cod_horario, leer_id);

    });



});
