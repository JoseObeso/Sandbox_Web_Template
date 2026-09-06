var modulo = "/appmvc",
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/';



$(document).ready(function() {
    $("#nueva_clave").attr("disabled", false);
    $("#nueva_clave").keypress(function() {
        $("#btn_cambiar_clave").attr("disabled", false)
    });
    $("#nueva_clave").val('');



    $("#btn_cambiar_clave").click(function() {
        var lc_clave = $("#nueva_clave").val();
        $.ajax({
            data: { "clave": lc_clave },
            dataType: 'json',
            url: url + 'validar/cambio_de_clave',
            type: 'post',
            beforeSend: function() {
                $("#mensajes").html(" .. un momento por favor ...");
            },
            success: function(datos) {
                $("#mensajes").html(" .. Cambio de clave - Conforme ...");

                $("#btn_cambiar_clave").attr("disabled", true);
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
    });

});