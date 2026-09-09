var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lid_upss, lid_ver_si_se_selecciono, leer_codigo_upss, leer_descripcion_upss, lc_tipo_operacion = '0',
    datos_listar_upss, nro_registros, datos_modificacion, dato_eliminar, data_ultimo, dato_registrar;

function listar_todos_los_upss() {
    "use strict";
    datos_listar_upss = {
        'id': 1
    };
    $.ajax({
        data: datos_listar_upss,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_upss',
        type: 'post',
        beforeSend: function () {
            $("#espera_mientras_carga_upss").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_mientras_carga_upss").html("");
            $("#slc_upss").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_upss").append('<option id="' + filas.id + '" codigo_upss = "' + filas.codigo_upss + '" descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slc_upss")
                        .attr("disabled", true)
                        .empty();
                }
            });

        }
    });
}




function leer_tipos_documentos_y_mostrarlo_en_inputs_text() {
    "use strict";
    lid_upss = $('#slc_upss  option:selected').attr('id');
    lid_ver_si_se_selecciono = (typeof lid_upss === 'undefined') ? '' : '1';
    if (lid_ver_si_se_selecciono === '1') {
        lid_upss = $('#slc_upss  option:selected').attr('id');
        leer_codigo_upss = $('#slc_upss  option:selected').attr('codigo_upss');
        leer_descripcion_upss = $('#slc_upss  option:selected').attr('descripcion');
        $('#txt_codigo_upss').val(leer_codigo_upss);
        $('#txt_descripcion_upss')
            .val(leer_descripcion_upss)
            .attr("disabled", true);
        $('#modificar_upss').attr("disabled", false);
        $('#eliminar_upss').attr("disabled", false);
        $('#btn_grabar_upss').attr("disabled", true);
    } else {
        $('#agregar_upss').attr("disabled", true);
        $('#modificar_upss').attr("disabled", true);
        $('#eliminar_upss').attr("disabled", true);
        $('#btn_grabar_upss').attr("disabled", true);
    }
}




function inicializar_botones_etiquetas() {
    "use strict";
    listar_todos_los_upss();
    $('#agregar_upss').attr("disabled", false);
    $('#modificar_upss').attr("disabled", true);
    $('#eliminar_upss').attr("disabled", true);
    $('#txt_codigo_upss')
        .attr("disabled", true)
        .val('');
    $('#txt_descripcion_upss')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_upss')
        .attr("disabled", true);
}



function agregar_registro_upss() {
    "use strict";
    buscar_ultimo_codigo_upss_y_agregarlo();
    $('#txt_descripcion_upss')
        .attr("disabled", false)
        .val('')
        .focus();
    $('#grabar_documento').attr("disabled", true);
}


function buscar_ultimo_codigo_upss_y_agregarlo() {
    "use strict";
    data_ultimo = {
        'id': ''
    };
    $.ajax({
        data: data_ultimo,
        dataType: 'json',
        url: url + 'parametros/ultimo_codigo_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $('#txt_codigo_upss')
                        .attr("disabled", true)
                        .val(filas.ultimo);
                } else {
                    $('#txt_codigo_upss')
                        .attr("disabled", true)
                        .empty();
                }
            });

        }

    });

}

function grabar_registro_upss(leer_codigo_upss, leer_descripcion_upss) {
    "use strict";
    dato_registrar = {
        'codigo': leer_codigo_upss,
        'descripcion': leer_descripcion_upss
    };

    $.ajax({
        data: dato_registrar,
        dataType: 'json',
        url: url + 'parametros/registrar_nuevo_upss',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
             $("#espera_grabacion").html("");
             inicializar_botones_etiquetas();
        }
    });
}







function modificar_registro_upss(lid_upss, leer_codigo_upss, leer_descripcion_upss) {
    "use strict";
    datos_modificacion = {
        'id' : lid_upss,
        'codigo': leer_codigo_upss,
        'descripcion': leer_descripcion_upss
    };
    $.ajax({
        data: datos_modificacion,
        dataType: 'json',
        url: url + 'parametros/registrar_modificacion_upss',
        type: 'post',
        beforeSend: function () {
             $("#espera_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
           $("#espera_grabacion").html("");
             inicializar_botones_etiquetas();
        }
    });
}


function eliminar_registro_upss(lid_upss) {
    "use strict";
    dato_eliminar = {
        'id': lid_upss
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_upss_total',
        type: 'post',
        beforeSend: function () {
             $("#espera_grabacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion").html("");
             inicializar_botones_etiquetas();
        }
    });




}


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_botones_etiquetas();

    $("#slc_upss")
        .click(function () {
            leer_tipos_documentos_y_mostrarlo_en_inputs_text();
        })
        .keyup(function () {
            leer_tipos_documentos_y_mostrarlo_en_inputs_text();
        });

    $("#agregar_upss").click(function () {
        lc_tipo_operacion = '1';
        agregar_registro_upss();
    });

    $("#modificar_upss").click(function () {
        lc_tipo_operacion = '2';
        $('#txt_descripcion_upss')
            .attr("disabled", false)
            .focus();
    });

    $('#eliminar_upss').click(function () {
        eliminar_registro_upss(lid_upss);
    });


    $('#txt_descripcion_upss').keypress(function () {
        $('#btn_grabar_upss').attr("disabled", false);
    });

    $('#btn_grabar_upss').click(function () {
        leer_codigo_upss = $("#txt_codigo_upss").val();
        leer_descripcion_upss = $("#txt_descripcion_upss").val().toUpperCase();
        switch (lc_tipo_operacion) {
            case '1':
                grabar_registro_upss(leer_codigo_upss, leer_descripcion_upss);
                break;
            case '2':
                modificar_registro_upss(lid_upss, leer_codigo_upss, leer_descripcion_upss);
                break;

            default:
                break;

        }
    });
});
