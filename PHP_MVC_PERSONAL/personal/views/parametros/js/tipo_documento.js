var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    ln_codigo, lc_descripcion, lc_tipo_operacion = '0',
    leer_descripcion, dato_registrar, datos_actualizar, nro_registros, datos_modificacion, dato_eliminar;


function actualizar_tabla_tipos_documentos() {
    "use strict";
    datos_actualizar = {
        'id': 1
    };
    $.ajax({
        data: datos_actualizar,
        dataType: 'json',
        url: url + 'parametros/actualizar_tipos_documentos',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion").fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#espera_grabacion").html('')
                .html('<em><strong><font color="#191919">Grabacion conforme</font></strong></em>')
                .fadeOut(5000);
            $("#slc_tipo_documentos").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.encontrado === '1') {
                    $("#slc_tipo_documentos").append('<option value="' + filas.codigo + '" codigo = "' + filas.codigo + '" descripcion = "' + filas.descripcion + '"  >' + filas.codigo + ' - ' + filas.descripcion + '</option>');
                } else {
                    $("#slc_tipo_documentos")
                        .attr("disabled", true)
                        .empty();
                }
            });
            
        }
    });
}


function leer_tipos_documentos_y_mostrarlo_en_inputs_text() {
    "use strict";
    ln_codigo = $('#slc_tipo_documentos  option:selected').attr('codigo');
    lc_descripcion = $('#slc_tipo_documentos  option:selected').attr('descripcion');
    $("#txt_codigo").val(ln_codigo);
    $("#txt_descripcion").val(lc_descripcion);
    $('#modificar_tipo_documento').attr("disabled", false);
    $('#grabar_documento').attr("disabled", true);
    $('#eliminar_tipo_documento').attr("disabled", false);
    $('#txt_descripcion').attr("disabled", true);
}



function registrar_descripcion_tipo_documento(leer_descripcion) {
    "use strict";
    dato_registrar = {
        'descripcion': leer_descripcion
    };

    $.ajax({
        data: dato_registrar,
        dataType: 'json',
        url: url + 'parametros/registrar_tipo_documento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            actualizar_tabla_tipos_documentos();
            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Grabacion conforme</font></strong></em>')
                .fadeOut(5000);
             $("#txt_codigo").val('');
            $("#txt_descripcion").val('');
             $('#grabar_documento').attr("disabled", true);
            
        }
    });
}


function nuevo_registro() {
    "use strict";
    $('#txt_codigo').val('');
    $('#txt_descripcion')
        .attr("disabled", false)
        .val('')
        .focus();
    $('#grabar_documento').attr("disabled", true);
}

function registrar_modificacion_tipo_Documento(ln_codigo, leer_descripcion) {
    "use strict";
    datos_modificacion = {
        'codigo': ln_codigo,
        'descripcion': leer_descripcion
    };
    $.ajax({
        data: datos_modificacion,
        dataType: 'json',
        url: url + 'parametros/registrar_modificacion_tipo_documento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            actualizar_tabla_tipos_documentos();
            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Grabacion conforme</font></strong></em>')
                .fadeOut(5000);
        }
    });
}

function eliminar_registro_tipo_documento(ln_codigo) {
    "use strict";
    dato_eliminar = {
        'codigo': ln_codigo
    };
    
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_tipo_documento',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            actualizar_tabla_tipos_documentos();
            $("#txt_codigo").val('');
            $("#txt_descripcion").val('');
            $('#modificar_tipo_documento').attr("disabled", true);
            $('#grabar_documento').attr("disabled", true);
            $('#eliminar_tipo_documento').attr("disabled", true);
            
            
            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Grabacion conforme</font></strong></em>')
                .fadeOut(5000);
        }
    });
    
    


}


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $('#txt_codigo').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);
    $('#grabar_documento').attr("disabled", true);
    $('#modificar_tipo_documento').attr("disabled", true);
    $('#eliminar_tipo_documento').attr("disabled", true);
    $("#slc_tipo_documentos")
        .click(function () {
            leer_tipos_documentos_y_mostrarlo_en_inputs_text();
        })
        .keyup(function () {
            leer_tipos_documentos_y_mostrarlo_en_inputs_text();
        });
    $("#agregar_tipo_documento").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });

    $("#modificar_tipo_documento").click(function () {
        lc_tipo_operacion = '2';
        $('#txt_descripcion')
            .attr("disabled", false)
            .focus();
    });

    $("#eliminar_tipo_documento").click(function () {
        eliminar_registro_tipo_documento(ln_codigo);

    });


    $('#txt_descripcion').keypress(function () {
        $('#grabar_documento').attr("disabled", false);
    });

    $('#grabar_documento').click(function () {
        leer_descripcion = $("#txt_descripcion").val().toUpperCase();
        switch (lc_tipo_operacion) {
            case '1':
                registrar_descripcion_tipo_documento(leer_descripcion);
                break;
            case '2':
                registrar_modificacion_tipo_Documento(ln_codigo, leer_descripcion);
                break;

            default:
                break;

        }
    });
});
