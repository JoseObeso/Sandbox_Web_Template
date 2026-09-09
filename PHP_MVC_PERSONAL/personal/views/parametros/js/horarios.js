var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_horario = '',
    lc_buscar_turno = '',
    lc_tipo_operacion = '',
    dato_listar, cantidad_registros, leer_idhorario, leer_codigo_horario, leer_codigo_turno, leer_nombre_turno, leer_ingreso, leer_salida, leer_horas, leer_id_turno, leer_nombre_turno, leer_codigo_ingresado, lc_mensaje, leer_hora_entrada, leer_hora_salida, datos_grabar, leer_observacion, leer_codigo_turno_seleccion, leer_codigo_turno_grabar;



function mostrar_lista_de_horario(lc_buscar_horario) {
    "use strict";
    dato_listar = {
        "id": lc_buscar_horario
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/procesar_lista_de_horario',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#slt_lista_horarios")
                .html('');
            $("#espera_grabacion_horarios").html('');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_horarios")
                        .show()
                        .append('<option id="' + filas.id +
                            '"  codigo_horario = "' + filas.codigo_horario +
                            '"  codigo_turno = "' + filas.codigo_turno +
                            '"  nombre_turno = "' + filas.nombre_turno +
                            '"  ingreso = "' + filas.ingreso +
                            '"  salida = "' + filas.salida +
                            '"  observacion = "' + filas.observacion +
                            '"  horas = "' + filas.horas + '"> ' + filas.ingreso + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│' + '&nbsp;' + filas.salida + '&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;' + filas.horas_mostrar + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│' + filas.nombre_turno + '&nbsp;(&nbsp;' + filas.codigo_horario + '&nbsp;)&nbsp;' + '</option>')
                        .attr("disabled", false);
                } else {
                    $("#slt_lista_horarios").attr("disabled", true);
                }
            });

            $("#total_horarios").text(cantidad_registros + ' Horarios');

        }

    });


}




function listar_todos_los_turnos(lc_buscar_turno) {
    "use strict";
    dato_listar = {
        "id": lc_buscar_turno
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_turno',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#slt_turnos")
                .html('')
                .append('<option id= "0" codigo_turno = "0" >Seleccione : </option>');
            $("#espera_grabacion_horarios").html('');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_turnos")
                        .show()
                        .append('<option id="' + filas.id + '"  codigo_turno = "' + filas.codigo_turno + '"  nombre = "' + filas.nombre + '"> ' + filas.nombre + '</option>')
                        .attr("disabled", true);
                } else {
                    $("#slt_turnos").attr("disabled", true);
                }
            });
        }
    });
}


function inicializar_botones_horarios() {
    "use strict";
    mostrar_lista_de_horario(lc_buscar_horario);
    listar_todos_los_turnos(lc_buscar_turno);
    $('#btn_agregar_horario').attr("disabled", false);
    $('#btn_modificar_horario').attr("disabled", true);
    $('#btn_eliminar_horario').attr("disabled", true);
    $('#btn_grabar_horario').attr("disabled", true);
    $("#slt_turnos")
        .attr("disabled", true);
    $("#txt_codigo_horario")
        .attr("disabled", true)
        .val('');
    $("#txt_hora_entrada")
        .attr("disabled", true)
        .val('00:00');
    $("#txt_hora_salida")
        .attr("disabled", true)
        .val('00:00');
    $("#descripcion_turno")
        .val('');
    $("#txt_total_horas")
        .attr("disabled", true)
        .val('');

    $("#txt_observacion")
        .attr("disabled", true)
        .val('');

    $('#btn_grabar_horario').attr("disabled", true);

}


function leer_horarios_seleccionado_y_mostrarlo_en_controles() {
    "use strict";
    leer_idhorario = $('#slt_lista_horarios option:selected').attr('id');
    leer_codigo_horario = $('#slt_lista_horarios option:selected').attr('codigo_horario');
    leer_codigo_turno = $('#slt_lista_horarios option:selected').attr('codigo_turno');
    leer_nombre_turno = $('#slt_lista_horarios option:selected').attr('nombre_turno');
    leer_ingreso = $('#slt_lista_horarios option:selected').attr('ingreso');
    leer_salida = $('#slt_lista_horarios option:selected').attr('salida');
    leer_horas = $('#slt_lista_horarios option:selected').attr('horas');
    leer_observacion = $('#slt_lista_horarios option:selected').attr('observacion');
    $("#descripcion_turno").val(' Registrado : ' + leer_nombre_turno + ' (' + leer_codigo_horario + ')');
    $("#txt_codigo_horario").val(leer_codigo_horario);
    $("#txt_hora_entrada").val(leer_ingreso);
    $("#txt_hora_salida").val(leer_salida);
    $("#txt_total_horas").val(leer_horas);
    $("#txt_observacion").val(leer_observacion);

    $('#btn_modificar_horario').attr("disabled", false);
    $('#btn_eliminar_horario').attr("disabled", false);
    $('#btn_grabar_horario').attr("disabled", true);

}




function verificar_existencia_codigo_ingresado(leer_codigo_ingresado) {
    "use strict";
    dato_listar = {
        "id": leer_codigo_ingresado
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/ver_si_existe_codigo',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#espera_grabacion_horarios").html("");
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    lc_mensaje = 'Valor Ingresado : ' + leer_codigo_ingresado + ',  ya existe, corriga el codigo o no podra continuar... ';
                    $("#msj_validacion_codigo").val(lc_mensaje);
                    $("#txt_hora_salida").attr("disabled", true);
                } else {
                    lc_mensaje = 'Valor Ingresado : ' + leer_codigo_ingresado + ', no existe, continue con la hora de entrada...  ';
                    $("#msj_validacion_codigo").val(lc_mensaje);
                    $("#txt_hora_salida")
                        .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
                        .attr("disabled", false);
                }
            });
        }
    });



}




function grabar_nuevo_registro_horario(leer_codigo_ingresado, leer_codigo_turno, leer_hora_entrada, leer_hora_salida, leer_horas, leer_observacion) {
    "use strict";
    datos_grabar = {
        'codigo_horario': leer_codigo_ingresado,
        'codigo_turno': leer_codigo_turno,
        'entrada': leer_hora_entrada,
        'salida': leer_hora_salida,
        'horas': leer_horas,
        'observacion': leer_observacion
    };

    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_horario',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");

        },
        success: function () {
            $("#espera_grabacion_horarios").html("");
            inicializar_botones_horarios();

        }
    });


}



function grabar_modificacion_registro_horario(leer_idhorario, leer_codigo_ingresado, leer_codigo_turno_grabar, leer_hora_entrada, leer_hora_salida, leer_horas, leer_observacion) {
    "use strict";
    datos_grabar = {
        'id': leer_idhorario,
        'codigo_horario': leer_codigo_ingresado,
        'codigo_turno': leer_codigo_turno_grabar,
        'entrada': leer_hora_entrada,
        'salida': leer_hora_salida,
        'horas': leer_horas,
        'observacion': leer_observacion
    };

    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_horario',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");

        },
        success: function () {
            $("#espera_grabacion_horarios").html("");
            inicializar_botones_horarios();

        }
    });


}

function anular_horario(leer_idhorario) {

    "use strict";
    datos_grabar = {
        'id': leer_idhorario
    };

    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/dar_de_baja_horario',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");

        },
        success: function () {
            $("#espera_grabacion_horarios").html("");
            inicializar_botones_horarios();

        }
    });


}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_botones_horarios();
    $("#txt_buscar_horarios")
        .focus(function () {
            $("#txt_buscar_horarios").removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
        })
        .keyup(function () {
            inicializar_botones_horarios();
            lc_buscar_horario = $("#txt_buscar_horarios").val();
            mostrar_lista_de_horario(lc_buscar_horario);
        });

    $("#slt_lista_horarios")
        .click(function () {
            leer_horarios_seleccionado_y_mostrarlo_en_controles();
        })
        .keyup(function () {
            leer_horarios_seleccionado_y_mostrarlo_en_controles();
        });

    $("#btn_agregar_horario").click(function () {
        lc_tipo_operacion = '1';
        //listar_todos_los_turnos(lc_buscar_turno);
        $("#slt_turnos")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .focus();
        $("#txt_codigo_horario")
            .attr("disabled", true)
            .val('');
        $("#txt_hora_entrada")
            .attr("disabled", true)
            .val('');
        $("#txt_hora_salida")
            .attr("disabled", true)
            .val('');

        $("#descripcion_turno")
            .val('');

        $("#txt_total_horas")
            .attr("disabled", true)
            .val('');
        $("#txt_observacion")
            .attr("disabled", true)
            .val('');
        $('#btn_grabar_horario').attr("disabled", true);

    });





    $("#slt_turnos").change(function () {
        leer_id_turno = $('#slt_turnos  option:selected').attr('id');
        leer_codigo_turno = $('#slt_turnos  option:selected').attr('codigo_turno');
        leer_nombre_turno = $('#slt_turnos  option:selected').attr('nombre');
        lc_mensaje = "";
        if (lc_tipo_operacion === '1') {
            $("#descripcion_turno").val('Selecciono : ' + leer_nombre_turno + lc_mensaje);
            $("#txt_codigo_horario")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
                .focus()
                .val('');

        } else {
            $("#descripcion_turno").val('Registrado : ' + leer_nombre_turno + lc_mensaje);

        }


    });

    $("#btn_modificar_horario").click(function () {
        lc_tipo_operacion = '2';
        $("#txt_codigo_horario")
            .attr("disabled", false);
        $("#slt_turnos")
            .attr("disabled", false)
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
        $("#txt_codigo_horario")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);
        $("#txt_hora_entrada")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);
        $("#txt_hora_salida")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);
        $("#txt_total_horas")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);

        $("#txt_observacion")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);

        $('#btn_grabar_horario').attr("disabled", false);



    });
    $("#txt_codigo_horario")
        .keypress(function () {
            $("#txt_hora_entrada")
                .attr("disabled", false)
                .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
        });


    $("#txt_hora_entrada")
        .focusin(function () {
            leer_codigo_ingresado = $("#txt_codigo_horario").val().toUpperCase();
            verificar_existencia_codigo_ingresado(leer_codigo_ingresado);
            $("#txt_hora_salida").attr("disabled", false);

        });


    $("#txt_hora_salida")
        .focusin(function () {
            leer_codigo_ingresado = $("#txt_codigo_horario").val().toUpperCase();
            $("#txt_hora_salida")
                .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
                .attr("disabled", false)
                .keyup(function () {
                    $("#txt_total_horas")
                        .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
                        .attr("disabled", false);
                });
        });


    $("#txt_total_horas").keyup(function () {
        $("#txt_observacion")
            .removeClass("form-control").addClass("form-control alert-warning text-secondary initialism")
            .attr("disabled", false);
        $("#btn_grabar_horario").attr("disabled", false);
    });



    $("#btn_eliminar_horario").click(function () {
        anular_horario(leer_idhorario);

    });

    $("#btn_grabar_horario").click(function () {

        if (lc_tipo_operacion === '1') {
            leer_codigo_ingresado = $("#txt_codigo_horario").val().toUpperCase();
            leer_hora_entrada = $("#txt_hora_entrada").val();
            leer_hora_salida = $("#txt_hora_salida").val();
            leer_horas = $("#txt_total_horas").val();
            leer_observacion = $("#txt_observacion").val().toUpperCase();
            grabar_nuevo_registro_horario(leer_codigo_ingresado, leer_codigo_turno, leer_hora_entrada, leer_hora_salida, leer_horas, leer_observacion);

        } else {
            leer_codigo_ingresado = $("#txt_codigo_horario").val().toUpperCase();
            leer_hora_entrada = $("#txt_hora_entrada").val();
            leer_hora_salida = $("#txt_hora_salida").val();
            leer_horas = $("#txt_total_horas").val();
            leer_observacion = $("#txt_observacion").val().toUpperCase();
            leer_codigo_turno = $('#slt_lista_horarios option:selected').attr('codigo_turno');
            leer_codigo_turno_seleccion = $('#slt_turnos  option:selected').attr('codigo_turno');
            leer_codigo_turno_grabar = (leer_codigo_turno_seleccion === '0') ? leer_codigo_turno : leer_codigo_turno_seleccion;
            grabar_modificacion_registro_horario(leer_idhorario, leer_codigo_ingresado, leer_codigo_turno_grabar, leer_hora_entrada, leer_hora_salida, leer_horas, leer_observacion);

        }



    });





});
