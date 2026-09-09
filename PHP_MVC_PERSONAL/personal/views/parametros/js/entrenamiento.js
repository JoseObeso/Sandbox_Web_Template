var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_codigo, lc_descripcion, lc_tipo_operacion = '0',
    lc_tipo_operacion, dato_listar, cantidad_registros, datos_grabar, datos_modificar, dato_eliminar, ln_id;


function listar_registros() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_entrenamiento',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_lista")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_lista").append('<option id="' + filas.id + '"  codigo = "' + filas.codigo + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slc_lista").attr("disabled", false);

                } else {
                    $("#slc_lista").attr("disabled", true);
                }

            });

        }
    });

}




function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    ln_id = $('#slc_lista option:selected').attr('id');
    lc_codigo = $('#slc_lista option:selected').attr('codigo');
    lc_descripcion = $('#slc_lista option:selected').attr('descripcion');

    $('#id')
        .attr("disabled", true)
        .val(ln_id);

    $('#txt_codigo')
        .attr("disabled", true)
        .val(lc_codigo);
    $('#txt_descripcion')
        .attr("disabled", true)
        .val(lc_descripcion);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);


}




function inicializar_botones() {
    "use strict";
    $('#btn_agregar').attr("disabled", false);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
    $('#id').attr("disabled", true);

    $('#txt_codigo').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);

    $('#btn_grabar').attr("disabled", true);
}



function nuevo_registro() {
    "use strict";
    $('#txt_codigo')
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#txt_descripcion').val('');
    $('#btn_grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
}


function grabar_nuevo_registro(lc_codigo, lc_descripcion) {
    "use strict";
    datos_grabar = {
        'codigo': lc_codigo,
        'descripcion': lc_descripcion
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_en_entrenamiento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_registros();
            $('#txt_codigo')
                .attr("disabled", true)
                .val('');
            $('#txt_descripcion')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar').attr("disabled", true);
            $("#espera_grabacion")
                .html('')
                .hide();
        }
    });

}





function  grabar_modificacion_de_registro(ln_id, lc_codigo, lc_descripcion) {
    "use strict";
    datos_modificar = {
        'id': ln_id,
        'codigo': lc_codigo,
        'descripcion': lc_descripcion
    };

    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificar_entrenamiento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_registros();
            inicializar_botones();

            $('#txt_codigo')
                .attr("disabled", true)
                .css("background-color", "#FCFBA0")
                .val('');
            $('#txt_descripcion')
                .attr("disabled", true)
                .css("background-color", "#FCFBA0")
                .val('');
            $('#btn_grabar').attr("disabled", true);
            $("#espera_grabacion")
                .html('')
                .hide();

        }



    });

}


function eliminar_registro(ln_id) {
    "use strict";
    dato_eliminar = {
        'id': ln_id
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_entrenamiento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
           listar_registros();
            inicializar_botones();

            $('#txt_codigo')
                .attr("disabled", true)
                .css("background-color", "#FCFBA0")
                .val('');
            $('#txt_descripcion')
                .attr("disabled", true)
                .css("background-color", "#FCFBA0")
                .val('');
            $('#btn_grabar').attr("disabled", true);

            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Eliminacion conforme....</font></strong></em>')
                .fadeOut(5000);
        }
    });

}


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_registros();
    $("#titulo").text("REGISTRO DE CAPACITACION: ");
    inicializar_botones();
    $("#btn_agregar").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });

    $('#txt_codigo').keypress(function () {
        $('#txt_descripcion')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0");
        if (lc_tipo_operacion === '1') {
            $('#txt_descripcion').val('');
            $('#btn_grabar').attr("disabled", true);

        } else {
            $('#btn_grabar').attr("disabled", false);
        }
    });


    $('#txt_descripcion').keypress(function () {
        $('#btn_grabar').attr("disabled", false);

    });


    $('#btn_modificar').click(function () {
        lc_tipo_operacion = '2';
        $('#txt_codigo')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#txt_descripcion')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0");
        $('#btn_grabar').attr("disabled", false);

    });


    $("#slc_lista")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        });


    $('#btn_grabar').click(function () {
        lc_codigo = $('#txt_codigo').val();
        lc_descripcion = $('#txt_descripcion').val().toUpperCase();
        switch (lc_tipo_operacion) {
            case '1':
                grabar_nuevo_registro(lc_codigo, lc_descripcion);
                break;
            case '2':
                grabar_modificacion_de_registro(ln_id, lc_codigo, lc_descripcion);
                break;
            default:
                break;
        }

    });




    $('#btn_eliminar').click(function () {
        eliminar_registro(ln_id);
    });

});
