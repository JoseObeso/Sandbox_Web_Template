var url = 'http://' + document.domain + '/tramite/gestor/',
    leer_problema, dato_grabar, url_grafico = 'http://' + document.domain + '/tramite/public/gra';

$(document).ready(function() {
    $("#problema")
        .keyup(function() {
            $('#btn_grabar_problema').attr("disabled", false);
        })
        .focus();

    $("#btn_grabar_problema").click(function() {
        leer_problema = $("#problema").val();
        dato_grabar = {
            "problema": leer_problema
        };

        $.ajax({
            data: dato_grabar,
            dataType: 'json',
            url: url + 'ayuda/grabar_problema',
            type: 'post',
            beforeSend: function() {
                $("#proceso_grabar").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#proceso_grabar").html('');
                $("#btn_grabar_problema").attr("disabled", true);
                $("#problema").val('');

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