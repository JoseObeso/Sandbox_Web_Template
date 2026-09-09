function habilitar_personal_juridico(lc_id_juridico) {
    "use strict";
    datos_eliminar = {
        'id': lc_id_juridico
    };
    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'personal/habilitar_juridicos',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_juridicos").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_grabacion_juridicos").html("");
            inicializar_botones_identificacion_juridicos();
            $('#personal_juridico_seleccion')
                .text(lc_razon + ' - JURIDICO ACTIVO ' + ' -  ID: ' + lc_id_juridico + ' -- ' + lc_estado)
                .removeClass("alert-warning")
                .addClass("alert-info");
        }
    });
}