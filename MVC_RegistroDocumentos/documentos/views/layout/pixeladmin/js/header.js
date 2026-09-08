url_acceso = 'http://' + document.domain + '/tramite/acceso/';

function desabilitar_input() {
    $("#clave_antigua").attr("disabled", false);
    $("#nueva_clave").val('').attr("disabled", true);
    $("#confirmar_clave_nueva").val('').attr("disabled", true);
    $("#btn_cambiar_clave").val('').attr("disabled", true);
    $("#mensajes").text('');
}

function proceder_a_cambiar_clave(lc_nueva_clave) {
    var datos_clave = { "nueva": lc_nueva_clave };
    $.ajax({
        data: datos_clave,
        dataType: 'json',
        url: url_acceso + 'validar/cambio_de_clave',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            desabilitar_input();
            $("#mensajes").css("background-color", "#9ac447").text("Cambio de clave exitoso....").show();

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });
}

$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    desabilitar_input();
    $(document).delegate(".btn-abrir-modal-cambiar-clave", "click", function() {
        $('#modal-cambiar-clave').modal({ show: true, backdrop: 'static' });
        $("#clave_antigua").focus();
    });
    $("#clave_antigua").keypress(function(e) {
        var etiqueta_jquery = $("#nueva_clave");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $("#nueva_clave").keypress(function(e) {
        var etiqueta_jquery = $("#confirmar_clave_nueva");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $("#confirmar_clave_nueva").keypress(function(e) {
        var etiqueta_jquery = $("#btn_cambiar_clave");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $("#btn_cambiar_clave").click(function() {
        var lc_clave_anterior = $("#clave_antigua").val(),
            lc_nueva_clave = $("#nueva_clave").val(),
            lc_confirma = $("#confirmar_clave_nueva").val();
        if (lc_confirma == lc_nueva_clave) {
            proceder_a_cambiar_clave(lc_nueva_clave);

        } else {
            $("#mensajes").css("background-color", "#f06ea2").text("Claves no coinciden...").show();
        }

    });


});