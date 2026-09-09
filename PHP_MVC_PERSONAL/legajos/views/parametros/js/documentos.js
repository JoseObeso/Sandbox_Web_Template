var url = 'http://' + document.domain + '/rrhh/legajos/',
    documentos_grabar, leer_nombre_modificado, leer_nombre_modificado, nombre_grabar, constancia_grabar, leer_constancia_modificado, datos_grabar_edicion, dato_eliminar,
    leer_idref, leer_nombre, leer_constancia = 0,
    leer_tipo_operacion = 0;
 
function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idref = $('#select_documentos option:selected').attr('id_ref');
    leer_nombre = $('#select_documentos option:selected').attr('nombre');
    leer_constancia = $('#select_documentos option:selected').attr('constancia');
    $('#txt_documento').val(leer_nombre);
    switch (leer_constancia) {
        case '1':
            $('#chk_constancia').prop('checked', true);
            break;
        case '0':
            $('#chk_constancia').prop('checked', false);
            break;
        default:
            break;
    }
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
    $('#btn_Grabar').attr("disabled", true);
}
 
function nuevo_registro() {
    "use strict";
    leer_tipo_operacion = 1;
    $('#txt_documento')
        .val('')
        .attr("disabled", false)
        .focus();
    $('#chk_constancia')
        .prop('checked', false)
        .attr("disabled", false);
    $('#btn_Grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
}

function grabar_nuevo_documento() {
    "use strict";
    leer_nombre = $('#txt_documento').val();
    if ($('#chk_constancia').prop('checked')) {
        leer_constancia = '1';
    } else {
        leer_constancia = '0';
    }
    documentos_grabar = {
        'nombre': leer_nombre,
        'constancia': leer_constancia
    };

    $.ajax({
        data: documentos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_documento',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de nuevo documento.... conforme..");
            window.location.reload();
        }
    });

}


function modificar_documento() {
    "use strict";
    leer_tipo_operacion = 2;
    $('#txt_documento')
        .attr("disabled", false)
        .focus();
    $('#chk_constancia')
        .attr("disabled", false);
    $('#btn_Grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
}



function grabar_edicion_documento() {
    "use strict";
    leer_nombre_modificado = $('#txt_documento').val();
    if ($('#chk_constancia').prop('checked')) {
        leer_nombre_modificado = '1';
    } else {
        leer_constancia_modificado = '0';
    }
    nombre_grabar = (leer_nombre_modificado === leer_nombre) ? leer_nombre : leer_nombre_modificado;
    constancia_grabar = (leer_constancia_modificado === leer_constancia) ? leer_constancia : leer_constancia_modificado;
    datos_grabar_edicion = {
        'id_ref': leer_idref,
        'nombre': nombre_grabar,
        'constancia': constancia_grabar
    };
    $.ajax({
        data: datos_grabar_edicion,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_documento_ref',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de edicion de documento.... conforme..");
            window.location.reload();
        }
    });

}

function eliminar_documento() {
    "use strict";
    dato_eliminar = {
        'id_ref': leer_idref
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_documento',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            window.location.reload();
        }
    });

}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#select_documentos")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#btn_nuevo").click(function () {
        nuevo_registro();
    });


    $("#btn_modificar").click(function () {
        modificar_documento();
    });

    $("#btn_eliminar").click(function () {
        swal({
            title: "Seguro de eliminar documento",
            text: "",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            setTimeout(function () {
                eliminar_documento();
                swal("Culminacion conforme....!");
            }, 2000);
        });
    });

    $('#txt_documento').keypress(function () {
        $('#btn_Grabar').attr("disabled", false);
    });

    $("#btn_Grabar").click(function () {
        switch (leer_tipo_operacion) {
            case 1:
                grabar_nuevo_documento();
                break;
            case 2:
                grabar_edicion_documento();
                break;
            default:
                break;
        }

    });


});
