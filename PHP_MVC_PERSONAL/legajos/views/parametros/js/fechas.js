var url = 'http://' + document.domain + '/rrhh/legajos/',
    documentos_grabar, leer_nombre_modificado, leer_nombre_modificado, nombre_grabar,  datos_grabar_edicion, dato_eliminar,
    leer_idref, leer_nombre,
    leer_tipo_operacion = 0;
 
function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idref = $('#select_documentos option:selected').attr('id');
    leer_nombre = $('#select_documentos option:selected').attr('nombre');
    $('#txt_documento').val(leer_nombre);
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
    $('#btn_Grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
}

function grabar_nuevo_documento() {
    "use strict";
    leer_nombre = $('#txt_documento').val();
    
    documentos_grabar = {
        'nombre': leer_nombre
       
    };

    $.ajax({
        data: documentos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nueva_fechas',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de nueva fecha.... conforme..");
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
    $('#btn_Grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);
}



function grabar_edicion_documento() {
    "use strict";
    leer_nombre_modificado = $('#txt_documento').val();
    nombre_grabar = (leer_nombre_modificado === leer_nombre) ? leer_nombre : leer_nombre_modificado;
    datos_grabar_edicion = {
        'id': leer_idref,
        'nombre': nombre_grabar
    };
    $.ajax({
        data: datos_grabar_edicion,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_fechas',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_Grabar').attr("disabled", true);
            swal("Grabacion de edicion de fechas.... conforme..");
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
        url: url + 'parametros/eliminar_fechas',
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
            title: "Seguro de eliminar Tipo de Fecha",
            text: "",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            setTimeout(function () {
                eliminar_documento();
                swal("Eliminacion conforme....!");
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
