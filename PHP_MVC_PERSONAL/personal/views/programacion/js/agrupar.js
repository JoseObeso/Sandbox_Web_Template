var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id_depar_seleccion, leer_id_upss_seleccion, leer_id_depar_seleccion, data_area_funcional, leer_idaf, leer_idpiso, leer_descripcion_piso, leer_idbloque, leer_descripcion_bloque, leer_id_upss_depar_servicio, data_traslado_area_funcional, data_area_funcional, leer_idaf, dato_eliminar_af;

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
            $("#slt_upss_seleccion_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_upss_seleccion_servicio")
                            .append('<option id="' + filas.id + '" upss = "' + filas.upss + '"  >' + filas.upss + '</option>');
                    } else {
                        $("#slt_upss_seleccion_servicio")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_upss_seleccion_servicio").empty();
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
            $("#slt_departamento_seleccion_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_departamento_seleccion_servicio")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" departamento = "' + filas.departamento + '"  >' + filas.departamento + '</option>');
                    } else {
                        $("#slt_departamento_seleccion_servicio")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_departamento_seleccion_servicio").empty();
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
            $("#slt_upss_departamento_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_upss_departamento_servicio")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '"  >' + filas.servicio + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_upss_departamento_servicio")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_upss_departamento_servicio").empty();
            }
        }
    });
}

function ver_todas_las_areas_funcionales() {
    "use strict";
    data_area_funcional = {
        'idaf': ''
    };
    $.ajax({
        data: data_area_funcional,
        dataType: 'json',
        url: url + 'programacion/ver_areas_funcionales_total',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_lista_areas_funcionales_registrado")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_areas_funcionales_registrado")
                            .append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" descripcion_piso = "' + filas.descripcion_piso + '" idbloque = "' + filas.idbloque +
                                '" bloque = "' + filas.bloque + '" descripcion_bloque = "' + filas.descripcion_bloque + '" descripcion_area_funcional = "' + filas.descripcion_area_funcional + '"  >' + filas.descripcion_area_funcional + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_lista_areas_funcionales_registrado")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_areas_funcionales_registrado").empty();
            }
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

function inicializar_etiquetas_agrupacion_area_funcional() {
    "use strict";
    listar_upss_registrados();
    $("#slt_departamento_seleccion_servicio").attr("disabled", true);
    $("#slt_upss_departamento_servicio").attr("disabled", true);
    $("#total_registrados").text("");
}

function leer_lista_areas_funcionales_y_mostrarlo() {
    "use strict";
    leer_idaf = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('id');
    var lc_ver_si_seleccion_idaf = (typeof leer_idaf === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idaf === '1') {
        leer_idaf = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('id');
        leer_idpiso = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('idpiso');
        leer_descripcion_piso = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('descripcion_piso');
        leer_idbloque = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('idbloque');
        leer_descripcion_bloque = $('#slt_lista_areas_funcionales_registrado  option:selected').attr('descripcion_bloque');
        $("#descripcion_piso").text(leer_descripcion_piso);
        $("#descripcion_bloque").text(leer_descripcion_bloque);
        trasladar_seleccion_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idaf);
        visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio);

    } else {

    }
    $("#btn_eliminar_area_funcional_seleccion").attr("disabled", true);

}

function trasladar_seleccion_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_idaf) {
    "use strict";
    data_traslado_area_funcional = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion,
        'iddepar_upss_servicio': leer_id_upss_depar_servicio,
        'idaf': leer_idaf
    };
    $.ajax({
        data: data_traslado_area_funcional,
        dataType: 'json',
        url: url + 'programacion/traslado_seleccion_area_funcional_final',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#mostrar_espera_de_grabacion").html("");
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        var lc_er_si_grabo = filas.condicion;
                        if (lc_er_si_grabo === '1') {
                            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
                            visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio);

                        } else {
                            $("#mostrar_espera_de_grabacion").html("<center><strong>Seleccion ya existe....</strong></center>");
                        }


                    } else {}
                });
            } else {

            }
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
    // $("#mostrar_espera_de_grabacion").html("");

}

function visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio) {
    "use strict";
    data_area_funcional = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion,
        'iddepar_upss_servicio': leer_id_upss_depar_servicio
    };
    $.ajax({
        data: data_area_funcional,
        dataType: 'json',
        url: url + 'programacion/ver_lo_trasladado_af',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#mostrar_espera_de_grabacion").html("");
            $("#slt_lista_areas_funcionales_seleccion").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_areas_funcionales_seleccion")
                            .append('<option id="' + filas.id + '" descripcion =  "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);
                        $("#total_registrados").text("Total : " + nro_registros + ' - Areas Funcionales Registradas');
                    } else {
                        $("#slt_lista_ambiente_funcional_seleccion")
                            .attr("disabled", true)
                            .empty();
                        $("#total_registrados").text("");

                    }
                });
            } else {

            }
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

function leer_areas_funcionales_seleccion() {
    "use strict";
    leer_idaf = $('#slt_lista_areas_funcionales_seleccion  option:selected').attr('id');
    var lc_ver_si_seleccion_af = (typeof leer_idaf === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_af === '1') {
        leer_idaf = $('#slt_lista_areas_funcionales_seleccion  option:selected').attr('id');
        $("#btn_eliminar_area_funcional_seleccion").attr("disabled", false);
    } else {
        $("#btn_eliminar_area_funcional_seleccion").attr("disabled", true);
    }
}


function eliminar_item_seleccionado_af(leer_idaf) {
    "use strict";
    dato_eliminar_af = {
        'idaf': leer_idaf
    };
    $.ajax({
        data: dato_eliminar_af,
        dataType: 'json',
        url: url + 'programacion/eliminar_seleccion_af',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio);
            $("#btn_eliminar_area_funcional_seleccion").attr("disabled", true);
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









$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_etiquetas_agrupacion_area_funcional();

    $("#slt_upss_seleccion_servicio").change(function () {
        leer_id_upss_seleccion = $('#slt_upss_seleccion_servicio option:selected').attr('id');
        $("#slt_lista_areas_funcionales_registrado").empty();
        ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion);
        $("#slt_departamento_seleccion_servicio").attr("disabled", false);
    });

    $("#slt_departamento_seleccion_servicio").change(function () {
        leer_id_depar_seleccion = $('#slt_departamento_seleccion_servicio option:selected').attr('id');
        ver_servicios_de_departamento_upss(leer_id_upss_seleccion, leer_id_depar_seleccion);
    });

    $("#slt_upss_departamento_servicio").change(function () {
        leer_id_upss_depar_servicio = $('#slt_upss_departamento_servicio  option:selected').attr('id');
        ver_todas_las_areas_funcionales();
        visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio);
    });



    $("#slt_lista_areas_funcionales_registrado")
        .click(function () {
            leer_lista_areas_funcionales_y_mostrarlo();
        })
        .keyup(function () {
            leer_lista_areas_funcionales_y_mostrarlo();
        })
        .keydown(function () {
            leer_lista_areas_funcionales_y_mostrarlo();
        });




    $("#slt_lista_areas_funcionales_seleccion")
        .click(function () {
            leer_areas_funcionales_seleccion();
        })
        .keyup(function () {
            leer_areas_funcionales_seleccion();
        })
        .keydown(function () {
            leer_areas_funcionales_seleccion();
        });

    $("#btn_eliminar_area_funcional_seleccion").click(function () {
        eliminar_item_seleccionado_af(leer_idaf);
    });



});
