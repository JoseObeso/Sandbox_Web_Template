var url = 'http://' + document.domain + '/rrhh/personal/', url_js = 'http://' + document.domain + '/rrhh/public/js',
     id_motivo, motivo, tipo_operacion, leer_motivo, leer_motivo_inicial, leer_motivo_modificacion, motivo_grabar, datos_grabar, datos_grabar_edicion;
 

function mostrar_datatable_motivos() {
    "use strict";

    $('#tabla_motivo').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}





function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    id_motivo = $('#registrados option:selected').attr('idmotivo');
    motivo = $('#registrados option:selected').attr('motivo');
    $('#motivo').val(motivo);
    $('#motivo').attr("disabled", true);
    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", false);
    $("#operacion1").attr('checked', false);
    $("#operacion2").attr('checked', false);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}


function nuevo_registro() {
    "use strict";
    $('#motivo').val('');
    $('#motivo').attr("disabled", false);
    $('#motivo').focus();

    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", true);
    $("#operacion2").attr('checked', false);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}


function grabar_nuevo_motivo(leer_motivo)

{
    "use strict";
    datos_grabar = {
        "motivo": leer_motivo
    };

    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_motivo',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            swal("Grabacion de nueva motivos.... conforme..");
            nuevo_registro();
        }

    });


}


function grabar_edicion_motivo(id_motivo, motivo_grabar) {

 "use strict";
    datos_grabar_edicion = {
        "id_motivo" : id_motivo,
        "motivo" : motivo_grabar
    };

    $.ajax({
        data: datos_grabar_edicion,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_motivo',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            swal("Grabacion de nueva motivos.... conforme..");
            nuevo_registro();
        }

    });

}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_motivos();

    

    $("#agregar_editar_motivo").click(function () {
        $('#modal-agregar_editar_motivo').modal({
            show: true,
            backdrop: 'static'
        });
    });


    $("#registrados")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });


    $("input[name=operacion]").click(function () {
        tipo_operacion = $('input:radio[name=operacion]:checked').val();
        if (tipo_operacion === '1') {
            nuevo_registro();
        } else {
            $('#motivo').attr("disabled", false);
            $("#operacion1").prop("disabled", true);
            $("#operacion2").prop("disabled", false);
            $('#btn-guardar-nuevo-edicion').attr("disabled", false);

        }
    });



    $("#motivo").keypress(function () {
        $('#btn-guardar-nuevo-edicion').attr("disabled", false);
    });



    $("#btn-guardar-nuevo-edicion").click(function () {
        if (tipo_operacion === '1') {
            leer_motivo = $('#motivo').val();
            grabar_nuevo_motivo(leer_motivo);
        } else {
            id_motivo = $('#registrados option:selected').attr('idmotivo');
            leer_motivo_inicial = $('#registrados option:selected').attr('motivo');
            leer_motivo_modificacion = $('#motivo').val();
            motivo_grabar = (leer_motivo_inicial === leer_motivo_modificacion) ? leer_motivo_inicial : leer_motivo_modificacion;
            grabar_edicion_motivo(id_motivo, motivo_grabar);


        }
    });


    $("#eliminar_motivo").click(function () {
        if ($('.usuarios:checked').length > 0) {
            if ($('.usuarios:checked').length === 1) {
                var id_tipo = $(".usuarios:checked").attr("id");
                var datos_eliminar = {
                    "id_tipo": id_tipo
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de Motivo de Cese...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_motivo_cese',
                        type: 'post',
                        beforeSend: function () {},
                        success: function (datos) {
                            swal("Eliminacion con exito....")
                            window.location.reload();
                        }
                    });
                });
            } else {
                swal("...Solo escoja un motivo..");
            }
        } else {
            swal("..Debe seleccionar el motivo respectivo...");
        }

    });






});
