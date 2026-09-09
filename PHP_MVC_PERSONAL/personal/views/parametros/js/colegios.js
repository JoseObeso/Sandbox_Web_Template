var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
     url_js = 'http://' + document.domain + '/rrhh/public/js',
    ln_codigo, lc_descripcion, lc_tipo_operacion = '0',
    lc_nombre_colegio, dato_actualizar_colegios, cantidad_registros, datos_grabar, datos_modificar, dato_eliminar, ln_codigo_minsa;

function listar_colegios_profesionales() {
    "use strict";
    dato_actualizar_colegios = {
        'colegio': ''
    };
    $.ajax({
        data: dato_actualizar_colegios,
        dataType: 'json',
        url: url + 'parametros/ver_lista_colegios_profesionales',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_colegios_profesionales")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_colegios_profesionales").append('<option value="' + filas.codigo + '"  codigo = "' + filas.codigo + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  >' + filas.codigo_minsa + '  -  ' + filas.descripcion + '</option>');
                    $("#slc_colegios_profesionales").attr("disabled", false);

                } else {
                    $("#slc_colegios_profesionales").attr("disabled", true);
                }

            });

        }
    });

}


function inicializar_botones() {
    "use strict";
    $('#btn_agregar').attr("disabled", false);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
    $('#txt_codigo').attr("disabled", true);
    $('#txt_codigo_minsa').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);
    $('#btn_grabar').attr("disabled", true);
}



function nuevo_registro() {
    "use strict";
    $('#txt_codigo').val('');
    $('#txt_codigo_minsa')
        .attr("disabled", false)
        .val('')
        .focus();

    $('#txt_descripcion')
        .attr("disabled", false)
        .val('');

    $('#btn_grabar').attr("disabled", true);

}

function grabar_nuevo_registro_colegios_profesionales(ln_codigo_minsa, lc_nombre_colegio) {
    "use strict";

    datos_grabar = {
        'codigo_minsa': ln_codigo_minsa,
        'descripcion': lc_nombre_colegio
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_en_colegios',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_colegios_profesionales();
            inicializar_botones();
            $("#espera_grabacion").html('');

        }
    });

}


function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    ln_codigo = $('#slc_colegios_profesionales  option:selected').attr('codigo');
    ln_codigo_minsa = $('#slc_colegios_profesionales  option:selected').attr('codigo_minsa');
    lc_descripcion = $('#slc_colegios_profesionales option:selected').attr('descripcion');
    $("#txt_codigo").val(ln_codigo);
    $("#txt_codigo_minsa").val(ln_codigo_minsa);
    $("#txt_descripcion").val(lc_descripcion);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
    $('#btn_grabar').attr("disabled", true);


}

function grabar_modificacion_de_registro(ln_codigo, ln_codigo_minsa, lc_nombre_colegio) {
    "use strict";
    datos_modificar = {
        'codigo': ln_codigo,
        'codigo_minsa': ln_codigo_minsa,
        'descripcion': lc_nombre_colegio
    };
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificar_registro_de_colegios',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_colegios_profesionales();
            inicializar_botones();
            $("#espera_grabacion").html('');

        }
    });

}


function eliminar_registro(ln_codigo) {
    "use strict";
    dato_eliminar = {
        'codigo': ln_codigo
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_tipo_colegio',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_colegios_profesionales();
            inicializar_botones();
            $("#txt_codigo").val('');
            $("#txt_codigo_minsa").val('');
            $("#txt_descripcion").val('');
            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Eliminacion conforme....</font></strong></em>')
                .fadeOut(5000);
        }
    });

}



function mostrar_datatable_colegios() {
    "use strict";

    $('#tabla_colegios').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_colegios_profesionales();
    mostrar_datatable_colegios();
    inicializar_botones();
    $("#btn_agregar").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });

    $("#txt_descripcion").keypress(function () {
        $('#btn_grabar').attr("disabled", false);
    });

    $('#btn_modificar').click(function () {
        lc_tipo_operacion = '2';
        $('#txt_codigo_minsa')
            .attr("disabled", false)
            .focus();
        $('#txt_descripcion').attr("disabled", false);
        $('#btn_grabar').attr("disabled", true);

    });

    $("#slc_colegios_profesionales")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        });

    $('#btn_grabar').click(function () {
        lc_nombre_colegio = $("#txt_descripcion").val().toUpperCase();
        ln_codigo_minsa = $("#txt_codigo_minsa").val();
        switch (lc_tipo_operacion) {
            case '1':
                grabar_nuevo_registro_colegios_profesionales(ln_codigo_minsa, lc_nombre_colegio);
                break;
            case '2':
                grabar_modificacion_de_registro(ln_codigo, ln_codigo_minsa, lc_nombre_colegio);
                break;
            default:
                break;
        }
    });

    $('#btn_eliminar').click(function () {
        eliminar_registro(ln_codigo);
    });

});
