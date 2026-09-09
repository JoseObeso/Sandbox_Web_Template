var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idpersonal_seleccion, leer_descripcion_total_profesion, leer_descripcion_tipo_empleado, leer_condicion_trabajo, fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, leer_id_profesion, leer_idexcepcion, leer_tipo_excepcion, leer_cuantitativa, leer_idexcepcion, leer_tipo_excepcion, leer_cuantitativa, leer_mes, leer_anio, leer_dni_personal_seleccion, leer_idexcepcion_personal, lc_ver_si_seleccion_idexcepcion_personal;

fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;

function listar_upss_registrados() {
    "use strict";
    var datos_listar_upss = {
        "upss": ''
    };
    $.ajax({
        data: datos_listar_upss,
        dataType: 'json',
        url: url + 'programacion/listar_tipos_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_upss_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_upss_seleccion")
                            .append('<option id="' + filas.id + '" upss = "' + filas.upss + '"  >' + filas.upss + '</option>');
                    } else {
                        $("#slt_upss_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_upss_seleccion").empty();
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

function ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion) {
    "use strict";
    var data_listar_upss_seleccion = {
        'idupss_seleccion': leer_id_upss_seleccion
    };
    $.ajax({
        data: data_listar_upss_seleccion,
        dataType: 'json',
        url: url + 'programacion/ver_departamentos_de_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_departamento_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_departamento_seleccion")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" departamento = "' + filas.departamento + '"  >' + filas.departamento + '</option>');
                    } else {
                        $("#slt_departamento_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_departamento_seleccion").empty();
            }
        }
    });
}

function ver_servicios_de_departamento_upss(leer_id_upss_seleccion, leer_id_depar_seleccion) {
    "use strict";
    var data_upss_depar = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion
    };
    $.ajax({
        data: data_upss_depar,
        dataType: 'json',
        url: url + 'programacion/ver_upss_departamento_servicios',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_servicio_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_servicio_seleccion")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '"  >' + filas.servicio + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_servicio_seleccion")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_servicio_seleccion").empty();
            }
        }
    });
}



function listar_excepciones_registradas() {
    "use strict";
    var datos_listar_excepciones = {
        "idexcep": ''
    };
    $.ajax({
        data: datos_listar_excepciones,
        dataType: 'json',
        url: url + 'programacion/listar_excepciones',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_excepciones_registradas")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_excepciones_registradas")
                            .append('<option id="' + filas.id + '" tipo_excepcion = "' + filas.tipo_excepcion + '" cuantitativa = "' + filas.cuantitativa + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_excepciones_registradas")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_excepciones_registradas").empty();
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



function listar_personal() {
    "use strict";
    var datos_listar_personal = {
        "idpersonal": ''
    };
    $.ajax({
        data: datos_listar_personal,
        dataType: 'json',
        url: url + 'programacion/listar_personal_para_excepcion',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_personal_a_seleccionar")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_personal_a_seleccionar")
                            .append('<option id="' + filas.dni + '" condicion = "' + filas.condicion + '" apellidos_nombres = "' + filas.apellidos_nombres + '" idprofesion = "' + filas.idprofesion + '" descripcion_tipo_empleado = "' + filas.descripcion_tipo_empleado + '" descripcion_total_profesion = "' + filas.descripcion_total_profesion + '"  >' + filas.apellidos_nombres + '</option>');

                    } else {
                        $("#slt_personal_a_seleccionar")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_personal_a_seleccionar").empty();
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



    $("#slt_personal_a_seleccionar").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function (term) {
            var cont = $("<div />");
            var link = $("<a />", {
                "class": "test1",
                "data-title": term,
                text: "de '" + term + "'"
            });
            cont.append(link.clone());
            var html = cont.html();
            return "<span>No hay resultados - </span> " + (term.length > 0 ? html : "");
        }
    });



}




function inicializar_etiquetas_agrupacion_area_funcional() {
    "use strict";
    listar_upss_registrados();
    $("#slt_upss_seleccion").attr("disabled", false);
    $("#slt_departamento_seleccion").attr("disabled", true);
    $("#slt_servicio_seleccion").attr("disabled", true);
    $("#slt_personal_a_seleccionar").attr("disabled", true);
    $("#btn_eliminar_excepcion_a_personal").attr("disabled", true);
    $("#descripcion_profesion").text('');
    $("#tipo_de_labor").text('');
    $("#condicion_laboral").text('');

}


/*
<option id="4" tipo_excepcion="H" cuantitativa="24">TURNO ASISTENCIAL / 24 / HORAS</option>

*/









function leer_excepciones_registradas_pulsando_click_trasladar_a_seleccion() {
    "use strict";
    leer_idexcepcion = $('#slt_excepciones_registradas  option:selected').attr('id');
    var lc_ver_si_seleccion_idexcepcion = (typeof leer_idexcepcion === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idexcepcion === '1') {
        leer_idexcepcion = $('#slt_excepciones_registradas  option:selected').attr('id');
        leer_tipo_excepcion = $('#slt_excepciones_registradas  option:selected').attr('tipo_excepcion');
        leer_cuantitativa = $('#slt_excepciones_registradas  option:selected').attr('cuantitativa');
        leer_idexcepcion = $('#slt_excepciones_registradas  option:selected').attr('id');
        leer_tipo_excepcion = $('#slt_excepciones_registradas  option:selected').attr('tipo_excepcion');
        leer_cuantitativa = $('#slt_excepciones_registradas  option:selected').attr('cuantitativa');
        leer_mes = $('#slt_mes  option:selected').attr('value');
        leer_anio = $("#anio").val();
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        asignar_personal_la_excepcion(leer_dni_personal_seleccion, leer_id_profesion, leer_idexcepcion, leer_tipo_excepcion, leer_cuantitativa, leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_mes, leer_anio);

    } else {

    }
    $("#btn_eliminar_excepcion_a_personal").attr("disabled", true);


}

function asignar_personal_la_excepcion(leer_dni_personal_seleccion, leer_id_profesion, leer_idexcepcion, leer_tipo_excepcion, leer_cuantitativa, leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_mes, leer_anio) {
    "use strict";
    var data_asignacion_personal = {
        'idpersonal': leer_dni_personal_seleccion,
        'idprofesion': leer_id_profesion,
        'idexcepcion': leer_idexcepcion,
        'tipo_exepcion': leer_tipo_excepcion,
        'cuantitativo': leer_cuantitativa,
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'idservicio': leer_id_upss_depar_servicio,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_asignacion_personal,
        dataType: 'json',
        url: url + 'programacion/asigna_excepcion_a_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_traslado").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_traslado").html("");
            leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio);
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




function leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio) {
    "use strict";

    var data_personal_excepcion_ver = {
        'dni': leer_dni_personal_seleccion,
        'mes': leer_mes,
        'anio': leer_anio
    };

    $.ajax({
        data: data_personal_excepcion_ver,
        dataType: 'json',
        url: url + 'programacion/ver_excepciones_del_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_traslado").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_traslado").html("");
            $("#slt_excepciones_personal")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_excepciones_personal")
                            .append('<option id="' + filas.id + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_excepciones_personal")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_excepciones_personal").empty();
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


function leer_excepcion_seleccion() {
    "use strict";
    leer_idexcepcion_personal = $('#slt_excepciones_personal  option:selected').attr('id');
    lc_ver_si_seleccion_idexcepcion_personal = (typeof leer_idexcepcion_personal === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idexcepcion_personal === '1') {
        leer_idexcepcion_personal = $('#slt_excepciones_personal  option:selected').attr('id');
        $("#btn_eliminar_excepcion_a_personal").attr("disabled", false);
        
        
    } else {

    }
    $("#btn_eliminar_excepcion_a_personal").attr("disabled", false);
    // $("#btn_eliminar_excepcion_a_personal").attr("disabled", true);

}





function eliminar_excepcion_personal_registrado(leer_idexcepcion_personal) {
    "use strict";
    var data_eliminar_excepcion = {
        'id': leer_idexcepcion_personal
    };

    $.ajax({
        data: data_eliminar_excepcion,
        dataType: 'json',
        url: url + 'programacion/eliminar_excepcion_de_personal',
        type: 'post',
        beforeSend: function () {
            $("#espera_traslado").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_traslado").html("");
            leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio);
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


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_etiquetas_agrupacion_area_funcional();
    listar_personal();

    $("#slt_upss_seleccion").change(function () {
        leer_id_upss_seleccion = $('#slt_upss_seleccion option:selected').attr('id');
        ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion);
        $("#slt_departamento_seleccion").attr("disabled", false);
    });

    $("#slt_departamento_seleccion").change(function () {
        leer_id_depar_seleccion = $('#slt_departamento_seleccion option:selected').attr('id');
        ver_servicios_de_departamento_upss(leer_id_upss_seleccion, leer_id_depar_seleccion);

    });


    $("#slt_servicio_seleccion").change(function () {
        leer_id_upss_depar_servicio = $('#slt_servicio_seleccion option:selected').attr('id');
        listar_personal();
        $('#slt_personal_a_seleccionar').attr("disabled", false);
    });


    $("#slt_personal_a_seleccionar").change(function () {
        leer_idpersonal_seleccion = $('#slt_personal_a_seleccionar option:selected').attr('id');
        leer_id_profesion = $('#slt_personal_a_seleccionar option:selected').attr('idprofesion');
        leer_descripcion_total_profesion = $('#slt_personal_a_seleccionar option:selected').attr('descripcion_total_profesion');
        leer_descripcion_tipo_empleado = $('#slt_personal_a_seleccionar option:selected').attr('descripcion_tipo_empleado');
        leer_condicion_trabajo = $('#slt_personal_a_seleccionar option:selected').attr('condicion');
        $("#descripcion_profesion").text(leer_idpersonal_seleccion + ' - ' + leer_descripcion_total_profesion);
        $("#tipo_de_labor").text(leer_descripcion_tipo_empleado);
        $("#condicion_laboral").text(leer_condicion_trabajo);
        $("#slt_mes")
            .attr("disabled", false)
            .val(mes).attr("selected", "selected");
        $("#anio")
            .attr("disabled", false)
            .val(anio);
        listar_excepciones_registradas();
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        leer_mes = mes;
        leer_anio = anio;
        leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio);
    });




    $("#slt_mes").change(function () {
        leer_mes = $("#slt_mes").val();
        leer_anio = $("#anio").val();
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio);
    });

    $("#anio").click(function () {
        leer_mes = $("#slt_mes").val();
        leer_anio = $("#anio").val();
        $("#dni_personal").val(leer_idpersonal_seleccion);
        leer_dni_personal_seleccion = $("#dni_personal").val();
        leer_personal_con_excepcion(leer_dni_personal_seleccion, leer_mes, leer_anio);
    });









    $("#slt_excepciones_registradas")
        .click(function () {
            leer_excepciones_registradas_pulsando_click_trasladar_a_seleccion();

        })
        .keyup(function () {
            leer_excepciones_registradas_pulsando_click_trasladar_a_seleccion();
        })
        .keydown(function () {
            leer_excepciones_registradas_pulsando_click_trasladar_a_seleccion();
        });

    $("#slt_excepciones_personal")
        .click(function () {
            leer_excepcion_seleccion();
        })
        .keyup(function () {
            leer_excepcion_seleccion();
        })
        .keydown(function () {
            leer_excepcion_seleccion();
        });


    $("#btn_eliminar_excepcion_a_personal").click(function () {
        eliminar_excepcion_personal_registrado(leer_idexcepcion_personal);
    });


});
