var url = 'http://' + document.domain + '/rrhh/personal/',
    datos_registrar_cese, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese, lc_motivo;



function grabar_registro_cese_cas(leer_id_contrato, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese) {
    "use strict";
    datos_registrar_cese = {
        'id_contrato': leer_id_contrato,
        'id_motivo': lc_id_motivo_cese,
        'fecha_cese': lc_fecha_cese,
        'monto_cese': ln_monto_final_cese,
        'observacion_cese': lc_observacion_cese
    };

    $.ajax({
        data: datos_registrar_cese,
        dataType: 'json',
        url: url + 'cas/registrar_cese_en_cas',
        type: 'post',
        beforeSend: function () {},
        success: function () {
             ver_contratos_personal_seleccion(leer_idpersonal);
            $('#fecha_fin_servicio_cese').attr("disabled", true);
            $('#txt_monto_total_cese').attr("disabled", true);
            $('#observacion_servicio_cese').attr("disabled", true);
            $('#btn_grabar_registro_cese').attr("disabled", true);

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

}


function inicializar_etiquetas_cese_cas() {
    "use strict";
    $('#fecha_fin_servicio_cese').attr("disabled", true);
    $('#txt_monto_total_cese').attr("disabled", true);
    $('#observacion_servicio_cese').attr("disabled", true);
    $('#btn_grabar_registro_cese').attr("disabled", true);

}



$(document).ready(function () {
    "use strict";
    //Para Registro de CESE
    inicializar_etiquetas_cese_cas();
    $("#btn_registrar_cese_cas").click(function () {
        $('#modal_registrar_cese_cas').modal({
            show: true,
            backdrop: 'static'
        });
    });
    $("#seleccion-motivo").change(function () {
        lc_id_motivo_cese = $('#seleccion-motivo  option:selected').attr('id');
        lc_motivo = $('#seleccion-motivo  option:selected').attr('motivo');
        $('#fecha_fin_servicio_cese').attr("disabled", false);
        $('#txt_monto_total_cese').attr("disabled", false);
        $('#observacion_servicio_cese').attr("disabled", false);
        $('#btn_grabar_registro_cese').attr("disabled", false);

    });

    $('#fecha_fin_servicio_cese').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Cese"
    });




    $('#btn_grabar_registro_cese').click(function () {
        // lc_id_motivo_cese
        lc_fecha_cese = $('#fecha_fin_servicio_cese').val();
        ln_monto_final_cese = $('#txt_monto_total_cese').val();
        lc_observacion_cese = $('#observacion_servicio_cese').val();
        $("#msj_estado").text(leer_condicion_laboral + ' - ' + leer_establecimientos + ' - ' + lc_motivo);
         if (lc_id_motivo_cese === '20'){
             $("#msj_estado").removeClass("form-control alert-danger").addClass("form-control alert-info");
        }
        else {
            $("#msj_estado").removeClass("form-control alert-info").addClass("form-control alert-danger");
        }
        grabar_registro_cese_cas(leer_id_contrato, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese);



    });



});
