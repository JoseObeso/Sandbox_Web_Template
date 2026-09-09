var url = 'http://' + document.domain + '/rrhh/legajos/',
    documentos_grabar, leer_id, leer_edad;
    

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#select_documentos option:selected').attr('id');
    leer_edad = $('#select_documentos option:selected').attr('edad');
    $('#txt_documento').val(leer_edad);
    $('#txt_documento').attr("disabled", false);
    $('#txt_documento').focus();
    
    $('#btn_Grabar').attr("disabled", true);
}


function grabar_nuevo_documento() {
    "use strict";
    leer_edad = $('#txt_documento').val();
    documentos_grabar = {
        'id' : leer_id,
        'edad': leer_edad
    };
    $.ajax({
        data: documentos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_edad_cese',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de edad de cese.... conforme..");
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


    $('#txt_documento').keypress(function () {
        $('#btn_Grabar').attr("disabled", false);
    });

    $("#btn_Grabar").click(function () {
        grabar_nuevo_documento();

    });


});
