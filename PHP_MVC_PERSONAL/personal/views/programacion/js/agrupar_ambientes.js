var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_upss, leer_idupss,  leer_upss, leer_departamento, leer_idupss, leer_id_upss_seleccion, leer_id_depar_seleccion, lc_tipo_operacion_servicios, leer_servicio, leer_idservicio, leer_idupss_servicio, leer_upss_servicio, leer_iddepar_servicio, leer_departamento_servicio, data_depar_upss_mod, data_depar_upss_elim, leer_id_af, data_area_funcional, leer_id_upss_depar_servicio, data_ambiente_funcional, leer_idamf, leer_descripcion_piso, leer_descripcion_bloque, data_traslado_ambiente_funcional, data_ambiente_funcional_var, dato_eliminar_amf;


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
            $("#slt_lista_areas_funcionales_agrupadas")
                .html('')
                .append('<option id=0> Seleccione </option>');

            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_areas_funcionales_agrupadas")
                            .append('<option id="' + filas.id + '" descripcion =  "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);
                        $("#total_registrados").text("Total : " + nro_registros + ' - Areas Funcionales Registradas');
                    } else {
                        $("#slt_lista_areas_funcionales_agrupadas")
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

function inicializar_etiquetas_agrupacion_area_funcional() {
    "use strict";
    listar_upss_registrados();
    $("#slt_upss_seleccion").attr("disabled", false);
    $("#slt_departamento_seleccion").attr("disabled", true);
    $("#slt_servicio_seleccion").attr("disabled", true);
    $("#slt_lista_areas_funcionales_agrupadas").attr("disabled", true);

}


function visualizar_ambientes_funcionales() {
    "use strict";
    data_ambiente_funcional = {
        'idam': ''
    };
    $.ajax({
        data: data_ambiente_funcional,
        dataType: 'json',
        url: url + 'programacion/ver_ambientes_funcional',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#mostrar_espera_de_grabacion").html("");
            $("#slt_lista_ambientes_funcionales_registrado").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambientes_funcionales_registrado")
                            .append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" descripcion_piso = "' + filas.descripcion_piso + '" idbloque = "' + filas.idbloque +
                                '" descripcion_bloque = "' + filas.descripcion_bloque + '" descripcion_ambiente_funcional = "' + filas.descripcion_ambiente_funcional + '"  >' + filas.descripcion_ambiente_funcional + '</option>')
                            .attr("disabled", false);


                        $("#total_registrados").text("Total : " + nro_registros + ' - Areas Funcionales Registradas');
                    } else {
                        $("#slt_lista_ambientes_funcionales_registrado")
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

// leer_descripcion_piso, leer_descripcion_bloque 

function leer_ambientes_funcionales_y_mostrarlo_en_etiqueta() {
    "use strict";
    leer_idamf = $('#slt_lista_ambientes_funcionales_registrado  option:selected').attr('id');
    var lc_ver_si_seleccion_idamf = (typeof leer_idamf === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idamf === '1') {
        leer_idamf = $('#slt_lista_ambientes_funcionales_registrado  option:selected').attr('id');
        leer_descripcion_piso = $('#slt_lista_ambientes_funcionales_registrado  option:selected').attr('descripcion_piso');
        leer_descripcion_bloque = $('#slt_lista_ambientes_funcionales_registrado  option:selected').attr('descripcion_bloque');
        $("#descripcion_piso").text(leer_descripcion_piso);
        $("#descripcion_bloque").text(leer_descripcion_bloque);
        trasladar_seleccion_ambiente_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af, leer_idamf);

    } else {

    }
    $("#btn_eliminar_ambiente_funcional_seleccion").attr("disabled", true);

}


function trasladar_seleccion_ambiente_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af, leer_idamf) {
    "use strict";
    data_traslado_ambiente_funcional = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion,
        'iddepar_upss_servicio': leer_id_upss_depar_servicio,
        'idaf': leer_id_af,
        'idamf': leer_idamf
    };
    $.ajax({
        data: data_traslado_ambiente_funcional,
        dataType: 'json',
        url: url + 'programacion/traslado_seleccion_ambiente_funcional_final',
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
                            visualizar_registros_de_ambientes_funcionales_registrados(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af);

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



function visualizar_registros_de_ambientes_funcionales_registrados(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af) {

    "use strict";
    data_ambiente_funcional_var = {
        'idupss_seleccion': leer_id_upss_seleccion,
        'iddepar_seleccion': leer_id_depar_seleccion,
        'iddepar_upss_servicio': leer_id_upss_depar_servicio,
        'idaf': leer_id_af
    };
    $.ajax({
        data: data_ambiente_funcional_var,
        dataType: 'json',
        url: url + 'programacion/visualizar_ambiente_funcional_trasladado',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#mostrar_espera_de_grabacion").html("");
            $("#slt_lista_ambientes_funcionales_seleccion").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambientes_funcionales_seleccion")
                            .append('<option id="' + filas.id + '" descripcion =  "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);
                        $("#total_ambientes_registrados").text("Total : " + nro_registros + ' - Ambientes Funcionales Registradas');
                    } else {
                        $("#slt_lista_ambientes_funcionales_seleccion")
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



function leer_ambientes_funcionales_registrado_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idamf = $('#slt_lista_ambientes_funcionales_seleccion  option:selected').attr('id');
    var lc_ver_si_seleccion_amf = (typeof leer_idamf === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_amf === '1') {
         leer_idamf = $('#slt_lista_ambientes_funcionales_seleccion  option:selected').attr('id');
        $("#btn_eliminar_ambiente_funcional_seleccion").attr("disabled", false);
    } else {
        $("#btn_eliminar_ambiente_funcional_seleccion").attr("disabled", true);
    }
}


function eliminar_item_seleccionado_amf(leer_idamf) {
    "use strict";
    dato_eliminar_amf = {
        'idamf': leer_idamf
    };
    $.ajax({
        data: dato_eliminar_amf,
        dataType: 'json',
        url: url + 'programacion/eliminar_seleccion_ambiente_funcional',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#mostrar_espera_de_grabacion").html("");
            visualizar_registros_de_ambientes_funcionales_registrados(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af);
             $("#btn_eliminar_ambiente_funcional_seleccion").attr("disabled", true);
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
        visualizar_registros_de_area_funcional(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio);
    });


    $("#slt_lista_areas_funcionales_agrupadas").change(function () {
        leer_id_af = $('#slt_lista_areas_funcionales_agrupadas option:selected').attr('id');
        visualizar_ambientes_funcionales();
        visualizar_registros_de_ambientes_funcionales_registrados(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_id_upss_depar_servicio, leer_id_af);
    });



    $("#slt_lista_ambientes_funcionales_registrado")
        .click(function () {
            leer_ambientes_funcionales_y_mostrarlo_en_etiqueta();
        })
        .keyup(function () {
            leer_ambientes_funcionales_y_mostrarlo_en_etiqueta();
        })
        .keydown(function () {
            leer_ambientes_funcionales_y_mostrarlo_en_etiqueta();
        });
    
    $("#slt_lista_ambientes_funcionales_seleccion")
       .click(function () {
            leer_ambientes_funcionales_registrado_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_ambientes_funcionales_registrado_y_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_ambientes_funcionales_registrado_y_mostrarlo_en_etiquetas();
        });
    
    
    
     $("#btn_eliminar_ambiente_funcional_seleccion").click(function () {
        eliminar_item_seleccionado_amf(leer_idamf);
    });

    
    









});
