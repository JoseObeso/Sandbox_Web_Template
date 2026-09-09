var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_tipo_horario, leer_tipo_horario, leer_idthorario, leer_tipo_thorario, leer_idturno, leer_nombre_turno, leer_primera_letra_nombre_turno, leer_hora_inicial, lc_final, leer_total_minutos_calculado, ln_nuevo_tiempo, leer_nombre_tipo_horario_turno, leer_primera_letra_horario_turno, lc_horario_final, lc_horario_abreviado_final, lc_ver_nuevo_turno, ln_horas_total, leer_hora_final, leer_horario_abreviado, lc_tipo_operacion_turno, leer_idturnohorario, leer_turno, leer_descripcion_horario, leer_observacion, lc_separar_mt, lc_primera_letra, lc_segunda_letra, lc_horario_compuesto, data_grabar_th;

/* para turnos */

function listar_turnos_registrados() {
    "use strict";
    var datos_listar_turnos = {
        "turnos": ''
    };
    $.ajax({
        data: datos_listar_turnos,
        dataType: 'json',
        url: url + 'programacion/listar_tipos_turnos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_tipos_horarios").html("");
            $("#slt_tipos_horarios").html('');
            $("#slt_tipo_turno_para_horarios")
                .html('')
                .append('<option id=0> Seleccione </option>');

            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_tipos_horarios")
                            .append('<option id="' + filas.id + '" turnos = "' + filas.turnos + '"  >' + filas.turnos + '</option>')
                            .attr("disabled", false);
                        $("#slt_tipo_turno_para_horarios")
                            .append('<option id="' + filas.id + '" turnos = "' + filas.turnos + '"  >' + filas.turnos + '</option>');

                    } else {
                        $("#slt_tipos_horarios")
                            .attr("disabled", true)
                            .empty();
                        $("#slt_tipo_turno_para_horarios")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_tipo_turno_para_horarios").empty();
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }

    });
}


function inicializar_etiquetas_turnos() {
    "use strict";
    $("#slt_tipos_horarios").attr("disabled", true);
    $("#espera_de_tipos_horarios").text('');
    $("#btn_agregar_tipos_horarios").attr("disabled", false);
    $("#btn_modificar_tipos_horarios").attr("disabled", true);
    $("#btn_eliminar_tipos_horarios").attr("disabled", true);
    $("#txt_tipo_horario")
        .val('')
        .attr("disabled", true);
    $("#btn_grabar_tipo_horario")
        .attr("disabled", true);

}


function grabar_tipo_horario(leer_tipo_horario) {
    "use strict";
    var data_grabar_th = {
        'tipo_horario': leer_tipo_horario
    };
    $.ajax({
        data: data_grabar_th,
        dataType: 'json',
        url: url + 'programacion/grabar_tipos_turnos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_tipos_horarios").html("");
            inicializar_etiquetas_turnos();
            listar_turnos_registrados();
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


function leer_lista_tipos_horarios_mostrarlo_en_etiquetas() {

    "use strict";
    leer_idthorario = $('#slt_tipos_horarios option:selected').attr('id');
    var lc_ver_si_seleccion_idthorario = (typeof leer_idthorario === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idthorario === '1') {
        leer_idthorario = $('#slt_tipos_horarios option:selected').attr('id');
        leer_tipo_thorario = $('#slt_tipos_horarios option:selected').attr('turnos');
        $('#txt_tipo_horario').val(leer_tipo_thorario);
        $("#btn_modificar_tipos_horarios").attr("disabled", false);
        $("#btn_eliminar_tipos_horarios").attr("disabled", false);


    } else {

        $("#btn_modificar_tipos_horarios").attr("disabled", true);
        $("#btn_eliminar_tipos_horarios").attr("disabled", true);
        $("#txt_tipo_horario")
            .val('')
            .attr("disabled", true);
    }
    $("#btn_grabar_tipo_horario")
        .attr("disabled", true);
}

function modificar_tipo_horario(leer_idthorario, leer_tipo_horario) {
    "use strict";
    var data_mod_th = {
        'idhorario': leer_idthorario,
        'tipo_horario': leer_tipo_horario
    };
    $.ajax({
        data: data_mod_th,
        dataType: 'json',
        url: url + 'programacion/modificar_tipos_turnos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_tipos_horarios").html("");
            inicializar_etiquetas_turnos();
            listar_turnos_registrados();
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

function eliminar_tipos_horarios(leer_idthorario) {
    "use strict";
    var data_elim_th = {
        'idhorario': leer_idthorario
    };
    $.ajax({
        data: data_elim_th,
        dataType: 'json',
        url: url + 'programacion/eliminar_tipos_turnos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_tipos_horarios").html("");
            inicializar_etiquetas_turnos();
            listar_turnos_registrados();
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


/* fin de turnos */



/* inicio de horarios */


function inicializar_horarios_turnos() {
    "use strict";

    $("#slt_tipos_horarios_turnos").attr("disabled", true);

    $("#espera_de_tipos_horarios_turnos").text('');

    $("#btn_agregar_horarios_turnos").attr("disabled", false);

    $("#btn_modificar_horarios_turnos").attr("disabled", true);
    $("#btn_eliminar_horarios_turnos").attr("disabled", true);

    $("#slt_tipo_turno_para_horarios").attr("disabled", true);
    $("#txt_tipo_horario_turno")
        .val('')
        .attr("disabled", true);
    $("#txt_hora_total")
        .val('')
        .attr("disabled", true);
    $("#txt_hora_inicial")
        .val('')
        .attr("disabled", true);
    $("#txt_hora_fin")
        .val('')
        .attr("disabled", true);
    $("#txt_hora_abreviado")
        .val('')
        .attr("disabled", true);
    $("#txt_observacion")
        .val('')
        .attr("disabled", true);
    $("#btn_grabar_tipo_horario_turno").attr("disabled", true);
    listar_turnos_registrados();



}




/* fin de horarios */


function ConvertirMinutosAHora(tiempo_en_minutos) {
    "use strict";
    let h = Math.floor(tiempo_en_minutos / 60);
    let m = tiempo_en_minutos % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}



function CalcularHoraFinal() {
    "use strict";
    leer_hora_inicial = $("#txt_hora_inicial").val();
    ln_horas_total = $("#txt_hora_total").val();
    var leer_hora_inicial_array = leer_hora_inicial.split(':');
    leer_total_minutos_calculado = parseInt(leer_hora_inicial_array[0]) * 60 + parseInt(leer_hora_inicial_array[1]) + ln_horas_total * 60;
    if (leer_total_minutos_calculado > 1440) {
        ln_nuevo_tiempo = leer_total_minutos_calculado - 1440;
        lc_final = ConvertirMinutosAHora(ln_nuevo_tiempo);
    } else {
        lc_final = ConvertirMinutosAHora(leer_total_minutos_calculado);
    }
    $("#txt_hora_fin").val(lc_final);
    $("#btn_grabar_tipo_horario_turno").attr("disabled", false);
}

/** aqui me quede */
function verificar_numero_correlativo_en_bd(lc_horario_final) {
    "use strict";
    var data_ver = {
        'hf': lc_horario_final
    };
    $.ajax({
        data: data_ver,
        dataType: 'json',
        url: url + 'programacion/ver_correlativo_turno_en_bd',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        lc_ver_nuevo_turno = filas.horario_abreviado;
                    } else {
                        lc_ver_nuevo_turno = 'S/D';
                    }
                });
            } else {

            }
        }

    });
    return lc_ver_nuevo_turno;
}


function grabar_registro_horario(leer_idturno, leer_nombre_tipo_horario_turno, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_horario_abreviado, leer_observacion, lc_horario_compuesto) {
    "use strict";
    data_grabar_th = {
        'idturno': leer_idturno,
        'nombre_th': leer_nombre_tipo_horario_turno,
        'hora_total': ln_horas_total,
        'inicial': leer_hora_inicial,
        'final': leer_hora_final,
        'horario_abreviado': leer_horario_abreviado,
        'observacion': leer_observacion,
        'turno_final': lc_horario_compuesto
    };
    $.ajax({
        data: data_grabar_th,
        dataType: 'json',
        url: url + 'programacion/grabar_registro_tipo_horario_final',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_tipos_horarios").html("");
            inicializar_horarios_turnos();
            listar_horarios_turnos();

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



function listar_horarios_turnos() {
    "use strict";
    var datos_listar_ht = {
        "horarios": ''
    };
    $.ajax({
        data: datos_listar_ht,
        dataType: 'json',
        url: url + 'programacion/listar_horarios_de_turnos_final',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_tipos_horarios").html("");
            $("#slt_tipos_horarios_turnos")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_tipos_horarios_turnos")
                            .append('<option id="' + filas.id + '" idtipohorario = "' + filas.idtipohorario + '" turno = "' + filas.turno + '" descripcion = "' + filas.descripcion + '" horatoral = "' + filas.horatoral + '" horainicio = "' + filas.horainicio + '" horafin = "' + filas.horafin + '" horario_abreviado = "' + filas.horario_abreviado + '" observacion = "' + filas.observacion + '"  >' + filas.descripcion + ' --  ' + filas.horainicio + ' -- ' + filas.horafin + ' -- ' + filas.horario_abreviado + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_tipos_horarios_turnos")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_tipos_horarios_turnos").empty();
            }
        },


        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }

    });
}




function leer_tipos_horarios_turnos_mostrarlo_en_etiquetas() {

    "use strict";
    leer_idturnohorario = $('#slt_tipos_horarios_turnos option:selected').attr('id');
    var lc_ver_si_seleccion_idturnohorario = (typeof leer_idturnohorario === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idturnohorario === '1') {
        leer_idturnohorario = $('#slt_tipos_horarios_turnos option:selected').attr('id');
        leer_idturno = $('#slt_tipos_horarios_turnos option:selected').attr('idtipohorario');
        leer_turno = $('#slt_tipos_horarios_turnos option:selected').attr('turno');
        leer_descripcion_horario = $('#slt_tipos_horarios_turnos option:selected').attr('descripcion');
        ln_horas_total = $('#slt_tipos_horarios_turnos option:selected').attr('horatoral');
        leer_hora_inicial = $('#slt_tipos_horarios_turnos option:selected').attr('horainicio');
        leer_hora_final = $('#slt_tipos_horarios_turnos option:selected').attr('horafin');
        leer_horario_abreviado = $('#slt_tipos_horarios_turnos option:selected').attr('horario_abreviado');
        leer_observacion = $('#slt_tipos_horarios_turnos option:selected').attr('observacion');
        $("#txt_tipo_horario_turno").val(leer_descripcion_horario);
        $("#txt_hora_total").val(ln_horas_total);
        $("#txt_hora_inicial").val(leer_hora_inicial);
        $("#txt_hora_fin").val(leer_hora_final);
        $("#txt_hora_abreviado").val(leer_horario_abreviado);
        $("#txt_observacion").val(leer_observacion);
        $("#btn_agregar_horarios_turnos").attr("disabled", false);
        $("#btn_modificar_horarios_turnos").attr("disabled", false);
        $("#btn_eliminar_horarios_turnos").attr("disabled", false);

    } else {
        $("#btn_modificar_horarios_turnos").attr("disabled", true);
        $("#btn_eliminar_horarios_turnos").attr("disabled", true);
    }
    $("#btn_grabar_tipo_horario_turno").attr("disabled", true);
}



function eliminar_horarios_turnos(leer_idturnohorario) {

    "use strict";
    var data_eliminar_th = {
        'idturnohorario': leer_idturnohorario
    };
    $.ajax({
        data: data_eliminar_th,
        dataType: 'json',
        url: url + 'programacion/eliminar_registro_tipo_horario_final',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_tipos_horarios").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_tipos_horarios").html("");
            inicializar_horarios_turnos();
            listar_horarios_turnos();

        }

    });

}


function ver_identificador_de_turno() {
    "use strict";
    leer_nombre_tipo_horario_turno = $("#txt_tipo_horario_turno").val();
    if (leer_nombre_tipo_horario_turno.indexOf('/') !== -1) {
        lc_separar_mt = leer_nombre_tipo_horario_turno.split('/');
        lc_primera_letra = lc_separar_mt[0];
        lc_segunda_letra = lc_separar_mt[1];
        lc_horario_compuesto = leer_primera_letra_nombre_turno + lc_primera_letra.substr(0, 1) + lc_segunda_letra.substr(0, 1);
    } else {
        lc_primera_letra = leer_nombre_tipo_horario_turno.substr(0, 1);
        lc_segunda_letra = '';
        lc_horario_compuesto = leer_primera_letra_nombre_turno + lc_primera_letra.toUpperCase();
    }
    lc_horario_abreviado_final = verificar_numero_correlativo_en_bd(lc_horario_compuesto);
    $("#txt_hora_abreviado").val(lc_horario_abreviado_final);
}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    /*  inicio de turnos */

    inicializar_etiquetas_turnos();
    listar_turnos_registrados();
    $("#btn_agregar_tipos_horarios").click(function () {
        lc_tipo_horario = '1';
        $("#txt_tipo_horario")
            .val('')
            .attr("disabled", false)
            .focus();
        $("#btn_grabar_tipo_horario").attr("disabled", false);
    });
    $("#btn_modificar_tipos_horarios").click(function () {
        lc_tipo_horario = '2';
        $("#txt_tipo_horario")
            .attr("disabled", false)
            .focus();
        $("#btn_grabar_tipo_horario").attr("disabled", false);
    });
    $("#btn_eliminar_tipos_horarios").click(function () {
        eliminar_tipos_horarios(leer_idthorario);
    });

    $("#btn_grabar_tipo_horario").click(function () {
        leer_tipo_horario = $("#txt_tipo_horario").val();
        if (lc_tipo_horario === '1') {
            grabar_tipo_horario(leer_tipo_horario);
        } else {
            modificar_tipo_horario(leer_idthorario, leer_tipo_horario);
        }

    });

    $("#slt_tipos_horarios")
        .click(function () {
            leer_lista_tipos_horarios_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_lista_tipos_horarios_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_lista_tipos_horarios_mostrarlo_en_etiquetas();
        });


    /* fin de turnos */


    /* inicio de horarios turnos */
    listar_horarios_turnos();

    inicializar_horarios_turnos();

    $("#btn_agregar_horarios_turnos").click(function () {
        lc_tipo_operacion_turno = '1';
        $("#txt_tipo_horario_turno").val('');
        $("#txt_hora_total").val('');
        $("#txt_hora_inicial").val('--:--');
        $("#txt_hora_fin").val('--:--');
        $("#txt_hora_abreviado").val('');
        $("#txt_observacion").val('');
        $("#slt_tipo_turno_para_horarios")
            .attr("disabled", false)
            .focus();
    });


    $("#slt_tipo_turno_para_horarios").change(function () {
        leer_idturno = $('#slt_tipo_turno_para_horarios option:selected').attr('id');
        leer_nombre_turno = $('#slt_tipo_turno_para_horarios option:selected').attr('turnos');
        leer_primera_letra_nombre_turno = leer_nombre_turno.substr(0, 1);
        $("#txt_tipo_horario_turno")
            .attr("disabled", false)
            .focus();
    });


    $("#txt_tipo_horario_turno")
        .keypress(function (e) {
            $("#txt_hora_total").attr("disabled", false);
            ver_identificador_de_turno();
            if (e.which === 13) {
                $("#txt_hora_total").attr("disabled", false);
                ver_identificador_de_turno();
                $("#txt_hora_total").focus();
            }
        })
        .keyup(function () {
            $("#txt_hora_total").attr("disabled", false);
            ver_identificador_de_turno();

        });



    $("#txt_hora_total")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
            $("#txt_hora_inicial")
                .attr("disabled", false);

            if (e.which === 13) {
                $("#txt_hora_inicial")
                    .focus();
            }

        })
        .click(function () {
            $("#txt_hora_inicial")
                .attr("disabled", false);
            CalcularHoraFinal();

        })
        .keyup(function () {
            CalcularHoraFinal();

        });

    $("#txt_hora_inicial").keyup(function () {
        $("#txt_observacion").attr("disabled", false);
        CalcularHoraFinal();
    });



    $("#btn_grabar_tipo_horario_turno").click(function () {
        leer_idturno = $('#slt_tipo_turno_para_horarios option:selected').attr('id');
        leer_nombre_tipo_horario_turno = $("#txt_tipo_horario_turno").val();
        ln_horas_total = $("#txt_hora_total").val();
        leer_hora_inicial = $("#txt_hora_inicial").val();
        leer_hora_final = $("#txt_hora_fin").val();
        leer_horario_abreviado = $("#txt_hora_abreviado").val();
        leer_observacion = $("#txt_observacion").val();

        if (lc_tipo_operacion_turno === '1') {
            grabar_registro_horario(leer_idturno, leer_nombre_tipo_horario_turno, ln_horas_total, leer_hora_inicial, leer_hora_final, leer_horario_abreviado, leer_observacion, lc_horario_compuesto);
        }


    });


    $("#slt_tipos_horarios_turnos")
        .click(function () {
            leer_tipos_horarios_turnos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_tipos_horarios_turnos_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_tipos_horarios_turnos_mostrarlo_en_etiquetas();
        });



    $("#btn_eliminar_horarios_turnos").click(function () {
        eliminar_horarios_turnos(leer_idturnohorario);
    });






});
