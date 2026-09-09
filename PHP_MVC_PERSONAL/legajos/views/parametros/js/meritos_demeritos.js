var url = 'http://' + document.domain + '/rrhh/legajos/',
    documentos_grabar, leer_nombre_modificado, leer_nombre_modificado, nombre_grabar, constancia_grabar, leer_constancia_modificado, datos_grabar_edicion, dato_eliminar, leer_tipo_merito, leer_tipo_merito_modificado,
    leer_id, leer_nombre, leer_tipo = 0,
    leer_tipo_operacion = 0;

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#select_documentos option:selected').attr('id');
    leer_nombre = $('#select_documentos option:selected').attr('nombre');
    leer_tipo = $('#select_documentos option:selected').attr('tipo');
    $('#txt_documento').val(leer_nombre);
    switch (leer_tipo) {
        case '1':
            $('#Tipos_meritos_0')
                .prop('checked', true)
                .prop('disabled', true);
            break;
        case '2':
            $('#Tipos_meritos_1')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '3':
            $('#Tipos_meritos_2')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '4':
            $('#Tipos_meritos_3')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '5':
            $('#Tipos_meritos_4')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '6':
            $('#Tipos_meritos_5')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '7':
            $('#Tipos_meritos_6')
                .prop('checked', true)
                .prop('disabled', true);
            break;

        case '8':
            $('#Tipos_meritos_7')
                .prop('checked', true)
                .prop('disabled', true);
            break;


        case '9':
            $('#Tipos_meritos_8')
                .prop('checked', true)
                .prop('disabled', true);
            break;


        case '10':
            $('#Tipos_meritos_9')
                .prop('checked', true)
                .prop('disabled', true);
            break;


        case '11':
            $('#Tipos_meritos_10')
                .prop('checked', true)
                .prop('disabled', true);
            break;
        default:
            break;
    }



    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
    $('#btn_Grabar').attr("disabled", true);
}


function habilitar_y_poner_en_blanco_los_tipos_meritos() {
    "use strict";
    $("input[type='radio']")
        .prop('checked', false)
        .prop('disabled', false);


}


function solo_poner_en_blanco_los_tipos_meritos() {
    "use strict";
    $("input[type='radio']")
        .prop('checked', false)
        .prop('disabled', false);
}


function nuevo_registro() {
    "use strict";
    leer_tipo_operacion = 1;
    $('#txt_documento')
        .val('')
        .attr("disabled", false)
        .focus();
    solo_poner_en_blanco_los_tipos_meritos();
    $('#btn_Grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
}

function grabar_nuevo_documento() {
    "use strict";
    leer_nombre = $('#txt_documento').val();
    leer_tipo_merito = $('input:radio[name=Tipos_meritos]:checked').val();

    documentos_grabar = {
        'nombre': leer_nombre,
        'tipo': leer_tipo_merito
    };

    $.ajax({
        data: documentos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_merito',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de nuevo tipo de merito .... conforme..");
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
    $("input[type='radio']").prop('disabled', false);

    $('#btn_Grabar').attr("disabled", false);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
}



function grabar_edicion_documento() {
    "use strict";
    leer_nombre_modificado = $('#txt_documento').val();
    leer_tipo_merito_modificado = $('input:radio[name=Tipos_meritos]:checked').val();
    datos_grabar_edicion = {
        'id' : leer_id, 
        'nombre': leer_nombre_modificado,
        'tipo': leer_tipo_merito_modificado
    };

    $.ajax({
        data: datos_grabar_edicion,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_merito',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de edicion de tipo de merito.... conforme..");
            window.location.reload();
        }
    });

}

function eliminar_documento() {
    "use strict";
    dato_eliminar = {
        'id': leer_id
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_tipo_merito',
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
            title: "Seguro de eliminar Tipo de Merito / Desmerito / Otros",
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

        switch (leer_tipo_operacion) {
            case '1':
                habilitar_y_poner_en_blanco_los_tipos_meritos();
                break;
            case '2':
                $("input[type='radio']").prop('disabled', false);
                $('#btn_Grabar').attr("disabled", false);
                break;
            default:
                break;
 
        }



    });

    $("input[type='radio']").click(function () {
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
