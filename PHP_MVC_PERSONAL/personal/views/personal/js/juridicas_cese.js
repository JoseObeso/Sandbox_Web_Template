var url = 'http://' + document.domain + '/rrhh/personal/',
      datos_registrar_cese, lc_id_juridico_servicios, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese;



function grabar_registro_cese_juridico(lc_id_juridico_servicios, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese) {
    "use strict";
    datos_registrar_cese = {
        'id_servicio': lc_id_juridico_servicios,
        'id_motivo': lc_id_motivo_cese,
        'fecha_cese':  lc_fecha_cese,
        'monto_cese': ln_monto_final_cese,
        'observacion_cese':  lc_observacion_cese  
    };

    $.ajax({
        data: datos_registrar_cese,
        dataType: 'json',
        url: url + 'personal/registrar_cese_en_juridico',
        type: 'post',
        beforeSend: function () {
        },
        success: function () {
             ver_contrato_de_servicios_del_personal_juridico(lc_ruc);
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




$(document).ready(function () {
    "use strict";
  //Para Registro de CESE
    $("#btn_registrar_cese").click(function () {
        $('#modal_registrar_cese_juridicos').modal({
            show: true,
            backdrop: 'static'
        });
    });
     $("#seleccion-motivo").change(function () {
        lc_id_motivo_cese = $('#seleccion-motivo  option:selected').attr('id');
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
        grabar_registro_cese_juridico(lc_id_juridico_servicios, lc_id_motivo_cese, lc_fecha_cese, ln_monto_final_cese, lc_observacion_cese);



    });



});
