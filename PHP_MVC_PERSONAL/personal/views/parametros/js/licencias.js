var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    id_tipo_licencia, descripcion_licencia, procede_descuento, tipo_operacion, descripcion_licencia_inicial, procede_descuento_inicial, descripcion_licencia_final, procede_descuento_final;

 





function mostrar_datatable_licencias() {
    "use strict";

    $('#tabla_licencias').DataTable({
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

function ver_licencias_mostrarlo_en_etiquetas() {
    "use strict";
    id_tipo_licencia = $('#licencia_registrados option:selected').attr('id_tipo_licencia');
    descripcion_licencia = $('#licencia_registrados option:selected').attr('nombre_licencia');
    procede_descuento = $('#licencia_registrados option:selected').attr('procede_descuento');
    $("#nombre_licencia").val(descripcion_licencia);
    $("#procede_descuento").val(procede_descuento);
    $("#operacion2").prop("disabled", false);

}

function grabar_nueva_licencia(descripcion_licencia, procede_descuento) {
    "use strict";
    var datos_grabar_licencia = {
        "descripcion_licencia": descripcion_licencia,
        "procede_descuento": procede_descuento
    };

    $.ajax({
        data: datos_grabar_licencia,
        dataType: 'json',
        url: url + 'parametros/grabar_licencia',
        type: 'post',
        beforeSend: function () {

        },
        success: function (datos) {
            tipo_operacion = '0';
            $('#btn-guardar-nuevo-edicion-licencia').attr("disabled", true);
            swal({
                title: "...Grabacion .. conforme... ",
                text: "...Continue ......",
                timer: 2000,
                showConfirmButton: false
            });


            $("#nombre_licencia").val('');
            $("#procede_descuento").val('');


            recargar_licencias();
        }
    });

}

function grabar_edicion_licencia(id_tipo_licencia, descripcion_licencia_final, procede_descuento_final) {
    "use strict";
    var datos_edcion_licencia = {
        "id_tipo_licencia": id_tipo_licencia,
        "descripcion_licencia": descripcion_licencia_final,
        "procede_descuento": procede_descuento_final
    };
    $.ajax({
        data: datos_edcion_licencia,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_licencia',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            $('#btn-guardar-nuevo-edicion-licencia').attr("disabled", true);
            swal("Edicion guardada con exito....");
        }

    });


}


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_licencias();


    $("#agregar_editar_licencias").click(function () {
        $('#modal-agregar-licencias').modal({
            show: true,
            backdrop: 'static'
        });
    });


    $("#licencia_registrados").click(function () {
        ver_licencias_mostrarlo_en_etiquetas();
    });
    $("#licencia_registrados").keyup(function () {
        ver_licencias_mostrarlo_en_etiquetas();
    });



    $("input[name=operacion]").click(function () {
        tipo_operacion = $('input:radio[name=operacion]:checked').val();
        if (tipo_operacion === '1') {
            $("#nombre_licencia").val('');
            $('#nombre_licencia').attr("disabled", false);
            $('#nombre_licencia').focus();
            $("#procede_descuento").val('');
            $("#procede_descuento").attr("disabled", false);

            $("#operacion2").prop("disabled", true);
            $('#btn-guardar-nuevo-edicion-licencia').attr("disabled", true);

        } {

            $('#nombre_licencia').attr("disabled", false);

            $("#procede_descuento").attr("disabled", false);

            $('#btn-guardar-nuevo-edicion-licencia').attr("disabled", false);


        }
    });



    $("#procede_descuento").keypress(function () {
        $('#btn-guardar-nuevo-edicion-licencia').attr("disabled", false);
    });



    $(document).delegate("#btn-guardar-nuevo-edicion-licencia", "click", function () {
        if (tipo_operacion === '1') {
            descripcion_licencia = $("#nombre_licencia").val();
            procede_descuento = $("#procede_descuento").val();
            grabar_nueva_licencia(descripcion_licencia, procede_descuento);


        } else {
            descripcion_licencia_inicial = $('#licencia_registrados option:selected').attr('nombre_licencia');
            procede_descuento_inicial = $('#licencia_registrados option:selected').attr('procede_descuento');
            descripcion_licencia = $("#nombre_licencia").val();
            procede_descuento = $("#procede_descuento").val();
            descripcion_licencia_final = (descripcion_licencia_inicial === descripcion_licencia) ? descripcion_licencia_inicial : descripcion_licencia;
            procede_descuento_final = (procede_descuento_inicial === procede_descuento) ? procede_descuento_inicial : procede_descuento;
            grabar_edicion_licencia(id_tipo_licencia, descripcion_licencia_final, procede_descuento_final);

        }
    });


    $("#anular_licencia").click(function () {
        if ($('.usuarios:checked').length > 0) {
            if ($('.usuarios:checked').length === 1) {
                var id_tipo_licencia = $(".usuarios:checked").attr("id");
                var datos_eliminar = {
                    "id_tipo_licencia": id_tipo_licencia
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de licencias...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_licencias',
                        type: 'post',
                        beforeSend: function () {},
                        success: function (datos) {

                        }
                    });
                    setTimeout(function () {
                        swal("Eliminacion con exito...!!!");
                    }, 1000);
                    recargar_licencias();
                });
            } else {
                swal("...Solo escoja una licencia...");
            }
        } else {
            swal("..Debe seleccionar la licencia respectiva...");
        }

    });




});
