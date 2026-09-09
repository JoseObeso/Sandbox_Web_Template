var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    id_condicion, leer_nombre, tipo_operacion, leer_descripcion, leer_nombre_inicial, leer_nombre, asignar_nombre_inicial, nombre_asignado, datos_grabar_condicion;




function mostrar_datatable_condicion() {
    "use strict";

    $('#tabla_condicion').DataTable({
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
    id_condicion = $('#registrados option:selected').attr('idtiposituacion');
    leer_nombre = $('#registrados option:selected').attr('nombre');
    $('#descripcion').val(leer_nombre);
    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", false);
    $("#operacion1").attr('checked', false);
    $("#operacion2").attr('checked', false);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}


function nuevo_registro() {
    "use strict";
    $('#descripcion').val('');
    $('#descripcion').attr("disabled", false);
    $('#descripcion').focus();
    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", true);
    $("#operacion2").attr('checked', false);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}

function grabar_condicion(leer_descripcion) {
    "use strict";
    datos_grabar_condicion = {
        "leer_descripcion": leer_descripcion
    };
    $.ajax({
        data: datos_grabar_condicion,
        dataType: 'json',
        url: url + 'parametros/grabar_condicion',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            swal("Grabacion de nueva condicion....conforme..");
            nuevo_registro();
        }
    });
}


function grabar_edicion_condicion(id_condicion, nombre_asignado) {
    "use strict";
    var datos_edicion_condicion = {
        "id_condicion": id_condicion,
        "nombre_asignado": nombre_asignado
    };
    $.ajax({
        data: datos_edicion_condicion,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_condicion',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            swal("Grabacion de edicion...conforme..");
        }
    });

}



$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_condicion();

    $("#agregar_editar_condicion").click(function () {
        $('#modal-agregar_editar_condicion').modal({
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
            $('#descripcion').attr("disabled", false);
            $("#operacion1").prop("disabled", true);
            $("#operacion2").prop("disabled", false);
        }
    });

    $("#descripcion").keypress(function () {
        $('#btn-guardar-nuevo-edicion').attr("disabled", false);
    });


    $("#btn-guardar-nuevo-edicion").click(function () {
        if (tipo_operacion === '1') {
            leer_descripcion = $('#descripcion').val();
            grabar_condicion(leer_descripcion);

        } else {
            id_condicion = $('#registrados option:selected').attr('id_tipo_situacion');
            leer_nombre_inicial = $('#registrados option:selected').attr('nombre');
            leer_nombre = $('#descripcion').val();
            if (leer_nombre_inicial === null || leer_nombre_inicial === undefined) {
                asignar_nombre_inicial = '';
            } else {
                asignar_nombre_inicial = leer_nombre_inicial;
            }
            if (asignar_nombre_inicial === leer_nombre) {
                nombre_asignado = asignar_nombre_inicial;
            } else {
                nombre_asignado = leer_nombre;
            }
            grabar_edicion_condicion(id_condicion, nombre_asignado);

        }
    });

    $("#eliminar_condicion").click(function () {
        if ($('.usuarios:checked').length > 0) {
            if ($('.usuarios:checked').length === 1) {
                var id_tipo = $(".usuarios:checked").attr("id");
                var datos_eliminar = {
                    "id_tipo": id_tipo
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de condicion laboral...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_condicion',
                        type: 'post',
                        beforeSend: function () {},
                        success: function () {
                            setTimeout(function () {
                                swal("Eliminacion con exito...!!!");
                            }, 3000);
                            window.location.reload();

                        }
                    });
                });
            } else {
                swal("...Solo escoja una condicion...");
            }
        } else {
            swal("..Debe seleccionar la condicion respectiva...");
        }

    });


});
