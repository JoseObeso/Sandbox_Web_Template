var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_pisos, lc_tipo_operacion, leer_idpisos, data_modificar, lc_operacion_bloques, leer_bloques, leer_idbloque, data_modificar_bloques, datos_bloques, dato_listar_bloques, data_eliminar_bloque_fisico, lc_operacion_ambientes, leer_ambientes, data_grabar_ambiente_fisico_de_piso, leer_idambientes, dato_listar_ambientes, data_modificar_ambiente_fisico_de_piso, data_eliminar_ambiente_fisico_de_piso;

function listar_pisos_fisico() {
    "use strict";
    var datos_listar_pisos = {
        "piso": ''
    };
    $.ajax({
        data: datos_listar_pisos,
        dataType: 'json',
        url: url + 'ambientes/listar_pisos_registrados',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_pisos").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_pisos").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_pisos").attr("disabled", false);
                    } else {
                        $("#slt_lista_pisos")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_pisos").empty();
            }
        }
    });
}






function inhabilitar_limpiar_etiqueta_piso_fisico() {
    "use strict";
    listar_pisos_fisico();
    $('#txt_pisos')
        .val('')
        .attr("disabled", true);
    $('#btn_modificar_pisos').attr("disabled", true);
    $('#btn_eliminar_pisos').attr("disabled", true);
    $('#btn_grabar_pisos').attr("disabled", true);

}

function grabar_piso_registrado(leer_pisos) {
    "use strict";
    var data_grabar = {
        'piso': leer_pisos
    };
    $.ajax({
        data: data_grabar,
        dataType: 'json',
        url: url + 'ambientes/registrar_pisos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_grabacion").html("");
            inhabilitar_limpiar_etiqueta_piso_fisico();
        }

    });

}


function habilitar_etiqueta_piso_para_edicion() {
    "use strict";
    $('#btn_grabar_pisos').attr("disabled", false);
    $('#txt_pisos')
        .attr("disabled", false)
        .focus();




}


function leer_pisos_mostrarlo_en_etiquetas() {
    "use strict";

    leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
    var lc_ver_si_seleccion_idpiso = (typeof leer_idpisos === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idpiso === '1') {
        leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
        leer_pisos = $('#slt_lista_pisos option:selected').attr('descripcion');
        $('#txt_pisos').val(leer_pisos);
        $('#btn_modificar_pisos').attr("disabled", false);
        $('#btn_eliminar_pisos').attr("disabled", false);
        iniciliazar_etiquetas_bloques_fisicos();
        listar_bloques_de_pisos(leer_idpisos);
        $('#btn_agregar_bloques').attr("disabled", false);
        $("#slt_lista_ambientes")
              .attr("disabled", true)
              .empty();
        inicializar_ambiente_fisico();
        


    } else {
        $('#txt_pisos').attr("disabled", true);
        $('#btn_modificar_pisos').attr("disabled", true);
        $('#btn_eliminar_pisos').attr("disabled", true);
    }
    $('#btn_grabar_pisos').attr("disabled", true);

}


function modificar_piso_registrado(leer_idpisos, leer_pisos) {
    "use strict";
    data_modificar = {
        'idpiso': leer_idpisos,
        'piso': leer_pisos
    };
    $.ajax({
        data: data_modificar,
        dataType: 'json',
        url: url + 'ambientes/modificacion_pisos_registrado',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_grabacion").html("");
            inhabilitar_limpiar_etiqueta_piso_fisico();
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

function eliminar_registro(leer_idpisos) {

    "use strict";
    var data_eliminar_piso = {
        'idpiso': leer_idpisos
    };
    $.ajax({
        data: data_eliminar_piso,
        dataType: 'json',
        url: url + 'ambientes/eliminar_piso_registrado',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_grabacion").html("");
            inhabilitar_limpiar_etiqueta_piso_fisico();
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



function iniciliazar_etiquetas_bloques_fisicos() {
    "use strict";
    $('#btn_agregar_bloques').attr("disabled", true);
    $('#btn_modificar_bloques').attr("disabled", true);
    $('#btn_eliminar_bloques').attr("disabled", true);
    $('#txt_bloques')
        .val('')
        .attr("disabled", true);
    $('#btn_grabar_bloques').attr("disabled", true);

}



function grabar_bloque_fisico(leer_idpisos, leer_bloques) {
    "use strict";
    datos_bloques = {
        'idpiso': leer_idpisos,
        'bloque': leer_bloques
    };

    $.ajax({
        data: datos_bloques,
        dataType: 'json',
        url: url + 'ambientes/grabar_bloques_fisicos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_bloques").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_carga_bloques").html("");
            // inhabilitar_limpiar_etiqueta_piso_fisico();
            iniciliazar_etiquetas_bloques_fisicos();
            listar_bloques_de_pisos(leer_idpisos);
            $('#btn_agregar_bloques')
                .attr("disabled", false)
                .focus();

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


function listar_bloques_de_pisos(leer_idpisos) {
    "use strict";

    dato_listar_bloques = {
        'idpiso': leer_idpisos
    };

    $.ajax({
        data: dato_listar_bloques,
        dataType: 'json',
        url: url + 'ambientes/listar_bloques_totales_de_pisos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_bloques").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_bloques").html("");
            $("#slt_lista_bloques").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_bloques").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_bloques").attr("disabled", false);
                    } else {
                        $("#slt_lista_bloques")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_bloques").empty();
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


function listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque) {
    "use strict";

    dato_listar_ambientes = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };

    $.ajax({
        data: dato_listar_ambientes,
        dataType: 'json',
        url: url + 'ambientes/listar_todos_ambientes_de_bloques_y_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_ambientes").html("");
            $("#slt_lista_ambientes").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambientes").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_ambientes").attr("disabled", false);
                    } else {
                        $("#slt_lista_ambientes")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_ambientes").empty();
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





function listar_bloques_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
    var lc_ver_si_seleccion_idbloque = (typeof leer_idbloque === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idbloque === '1') {
        leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
        leer_bloques = $('#slt_lista_bloques option:selected').attr('descripcion');
        $('#txt_bloques').val(leer_bloques);
        $('#btn_modificar_bloques').attr("disabled", false);
        $('#btn_eliminar_bloques').attr("disabled", false);
        $('#btn_agregar_ambientes').attr("disabled", false);
        listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
        $('#btn_modificar_ambientes').attr("disabled", true);
        $('#btn_eliminar_ambientes').attr("disabled", true);
        $('#txt_ambientes').val('');
        
        



    } else {
        $('#btn_modificar_bloques').attr("disabled", true);
        $('#btn_eliminar_bloques').attr("disabled", true);
        $('#btn_modificar_ambientes').attr("disabled", true);
        $('#btn_eliminar_ambientes').attr("disabled", true);

    }
    $('#btn_grabar_bloques').attr("disabled", true);
}



function modificar_bloque_fisico(leer_bloques, leer_idbloque) {
    "use strict";

    data_modificar_bloques = {
        'bloques': leer_bloques,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: data_modificar_bloques,
        dataType: 'json',
        url: url + 'ambientes/modificacion_bloque_registrado',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_grabacion").html("");
            $("#espera_de_carga_bloques").html("");
            iniciliazar_etiquetas_bloques_fisicos();
            listar_bloques_de_pisos(leer_idpisos);
            $('#btn_agregar_bloques')
                .attr("disabled", false)
                .focus();
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


function eliminar_bloque_fisico(leer_idbloque) {
    "use strict";
    data_eliminar_bloque_fisico = {
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: data_eliminar_bloque_fisico,
        dataType: 'json',
        url: url + 'ambientes/eliminar_bloque_registrado',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_grabacion").html("");
            $("#espera_de_carga_bloques").html("");
            iniciliazar_etiquetas_bloques_fisicos();
            listar_bloques_de_pisos(leer_idpisos);
            $('#btn_agregar_bloques')
                .attr("disabled", false)
                .focus();
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




function grabar_ambientes_fisico(leer_idpisos, leer_idbloque, leer_ambientes) {
    "use strict";
    data_grabar_ambiente_fisico_de_piso = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque,
        'ambientes': leer_ambientes
    };
    $.ajax({
        data: data_grabar_ambiente_fisico_de_piso,
        dataType: 'json',
        url: url + 'ambientes/grabar_ambiente_fisico_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_carga_ambientes").html("");
            listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
            inicializar_ambiente_fisico();

            $('#btn_agregar_ambientes')
                .attr("disabled", false)
                .focus();
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


function inicializar_ambiente_fisico() {
    "use strict";
    $('#btn_agregar_ambientes')
        .attr("disabled", true);

    $('#btn_modificar_ambientes')
        .attr("disabled", true);


    $('#btn_eliminar_ambientes')
        .attr("disabled", true);


    $('#txt_ambientes')
        .attr("disabled", true)
        .val('');

    $('#btn_grabar_ambientes')
        .attr("disabled", true)
        .val();



}


function listar_pisos_bloques_ambientes_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idambientes = $('#slt_lista_ambientes option:selected').attr('id');
    var lc_ver_si_seleccion_idambientes = (typeof leer_idambientes === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idambientes === '1') {
        leer_idambientes = $('#slt_lista_ambientes option:selected').attr('id');
        leer_ambientes = $('#slt_lista_ambientes option:selected').attr('descripcion');
        $('#txt_ambientes')
            .val(leer_ambientes)
            .attr("disabled", true);
        $('#btn_agregar_ambientes').attr("disabled", false);
        $('#btn_modificar_ambientes').attr("disabled", false);
        $('#btn_eliminar_ambientes').attr("disabled", false);
    } else {
        $('#txt_ambientes').attr("disabled", true);
        $('#btn_modificar_ambientes').attr("disabled", true);
        $('#btn_eliminar_ambientes').attr("disabled", true);
    }
    $('#btn_grabar_ambientes').attr("disabled", true);
}



function modificar_ambientes_fisico(leer_idambientes, leer_ambientes) {
    "use strict";
    data_modificar_ambiente_fisico_de_piso = {
        'idambiente': leer_idambientes,
        'ambientes': leer_ambientes
    };
    $.ajax({
        data: data_modificar_ambiente_fisico_de_piso,
        dataType: 'json',
        url: url + 'ambientes/modificar_ambiente_fisico_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_carga_ambientes").html("");
            listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
            inicializar_ambiente_fisico();

            $('#btn_agregar_ambientes')
                .attr("disabled", false)
                .focus();
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




function eliminar_ambiente(leer_idambientes) {
    "use strict";

    data_eliminar_ambiente_fisico_de_piso = {
        'idambiente': leer_idambientes
    };
    $.ajax({
        data: data_eliminar_ambiente_fisico_de_piso,
        dataType: 'json',
        url: url + 'ambientes/eliminar_ambiente_fisico',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_carga_ambientes").html("");
            listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
            inicializar_ambiente_fisico();

            $('#btn_agregar_ambientes')
                .attr("disabled", false)
                .focus();
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

    inhabilitar_limpiar_etiqueta_piso_fisico();
    iniciliazar_etiquetas_bloques_fisicos();
    inicializar_ambiente_fisico();

    $("#slt_lista_pisos")
        .click(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        });





    $('#btn_agregar_pisos').click(function () {
        lc_tipo_operacion = '1';
        $('#txt_pisos')
            .val('')
            .attr("disabled", false)
            .focus();
    });

    $('#btn_modificar_pisos').click(function () {
        lc_tipo_operacion = '2';
        habilitar_etiqueta_piso_para_edicion();
    });

    $('#btn_eliminar_pisos').click(function () {
        eliminar_registro(leer_idpisos);
    });






    $('#txt_pisos').keypress(function (e) {
        $("#btn_grabar_pisos").attr("disabled", false);
        if (e.which === 13) {
            $("#btn_grabar_pisos").focus();
        }

    });

    $("#btn_grabar_pisos").click(function () {
        leer_pisos = $('#txt_pisos').val();
        if (lc_tipo_operacion === '1') {
            grabar_piso_registrado(leer_pisos);
        } else {
            modificar_piso_registrado(leer_idpisos, leer_pisos);

        }
    });



    /* para bloques fisicos */

    $("#slt_lista_bloques")
        .click(function () {
            listar_bloques_mostrarlo_en_etiquetas();

        })
        .keyup(function () {
            listar_bloques_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            listar_bloques_mostrarlo_en_etiquetas();
        });



    $('#btn_agregar_bloques').click(function () {
        lc_operacion_bloques = '1';
        $('#txt_bloques')
            .attr("disabled", false)
            .val('')
            .focus();
    });

    $('#btn_modificar_bloques').click(function () {
        lc_operacion_bloques = '2';
        $('#txt_bloques')
            .attr("disabled", false)
            .focus();
    });

    $('#btn_eliminar_bloques').click(function () {
        eliminar_bloque_fisico(leer_idbloque);
    });





    $('#txt_bloques')
        .keypress(function (e) {
            $("#btn_grabar_bloques").attr("disabled", false);
            if (e.which === 13) {
                $("#btn_grabar_bloques").focus();
            }
        })

    .click(function () {
            $("#btn_grabar_bloques").attr("disabled", false);
        })
        .focusin(function () {
            $("#btn_grabar_bloques").attr("disabled", false);
        });





    $("#btn_grabar_bloques").click(function () {
        leer_bloques = $('#txt_bloques').val();
        if (lc_operacion_bloques === '1') {
            grabar_bloque_fisico(leer_idpisos, leer_bloques);
        } else {
            modificar_bloque_fisico(leer_bloques, leer_idbloque);

        }
    });




    /* fin de bloques fisicos */




    /* Ambietes fisicos */

    $("#slt_lista_ambientes")
        .click(function () {
            listar_pisos_bloques_ambientes_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            listar_pisos_bloques_ambientes_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            listar_pisos_bloques_ambientes_mostrarlo_en_etiquetas();
        });


    $('#btn_agregar_ambientes').click(function () {
        lc_operacion_ambientes = '1';
        $('#txt_ambientes')
            .attr("disabled", false)
            .val('')
            .focus();
    });


    $('#btn_modificar_ambientes').click(function () {
        lc_operacion_ambientes = '2';
        $('#txt_ambientes')
            .attr("disabled", false)
            .focus();
    });

    $('#btn_eliminar_ambientes').click(function () {
        eliminar_ambiente(leer_idambientes);
    });





    $('#txt_ambientes')
        .keypress(function (e) {
            $("#btn_grabar_ambientes").attr("disabled", false);
            if (e.which === 13) {
                $("#btn_grabar_ambientes").focus();
            }
        })
        .click(function (e) {
            $("#btn_grabar_bloques").attr("disabled", false);
            if (e.which === 13) {
                $("#btn_grabar_bloques").focus();
            }
        });






    $("#btn_grabar_ambientes").click(function () {
        leer_ambientes = $('#txt_ambientes').val();
        if (lc_operacion_ambientes === '1') {
            grabar_ambientes_fisico(leer_idpisos, leer_idbloque, leer_ambientes);
        } else {
            modificar_ambientes_fisico(leer_idambientes, leer_ambientes);

        }
    });





    /* fin de ambientes fisicos */









});
