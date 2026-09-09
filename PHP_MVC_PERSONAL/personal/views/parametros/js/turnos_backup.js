var url = 'http://' + document.domain + '/rrhh/personal/',  url_js = 'http://' + document.domain + '/rrhh/public/js', codigo_seleccion_turno, nombre_seleccion_turno, tipo_operacion_seleccion, codigo_seleccion_turno_modificado, nombre_seleccion_turno_modificado, id_turno;



function mostrar_datatable_turnos() {
    "use strict";

    $('#tabla_turno').DataTable({
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



 
function registrar_nuevo_turno(codigo_seleccion_turno, nombre_seleccion_turno) {
    "use strict";
    var parametros = {
        "codigo": codigo_seleccion_turno,
        "turno": nombre_seleccion_turno
    };


    $.ajax({
        data: parametros,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_turno',
        type: 'post',
        beforeSend: function () {

        },
        success: function (datos) {
            $('#btn-guardar-nuevo-edicion-turno').attr("disabled", true);
            swal({
                title: "Se registro con exito el nuevo turno... ",
                text: "...Continue registrando...",
                timer: 2000,
                showConfirmButton: false
            });
            tipo_operacion_seleccion = 0;
            
        }
    });


}


function registrar_modificacion_turno(id_turno, codigo_seleccion_turno, nombre_seleccion_turno, codigo_seleccion_turno_modificado, nombre_seleccion_turno_modificado) {
    "use strict";
    swal(id_turno);
    var parametros = {
        "id_turno": id_turno,
        "codigo_inicial": codigo_seleccion_turno,
        "turno_inicial": nombre_seleccion_turno,
        "codigo_modificado": codigo_seleccion_turno_modificado,
        "turno_modificado": nombre_seleccion_turno_modificado
    };

    $.ajax({
        data: parametros,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_turno',
        type: 'post',
        beforeSend: function () {

        },
        success: function (datos) {
            $('#btn-guardar-nuevo-edicion-turno').attr("disabled", true);
            swal({
                title: "Actualizacion con exito..... ",
                text: "...Continue modificando...",
                timer: 2000,
                showConfirmButton: false
            });
            tipo_operacion_seleccion = 0;
            
        }
    });


}


function ver_turnos_detalle() {
    "use strict";

    codigo_seleccion_turno = $('#turnos_registrados option:selected').attr('codigo_turno');
    nombre_seleccion_turno = $('#turnos_registrados option:selected').attr('nombre');
    id_turno = $('#turnos_registrados option:selected').attr('id_turno');
    $("#codigo_turno").val(codigo_seleccion_turno);
    $("#id_descripcion").val(nombre_seleccion_turno);
    $("#operacion_turno2").prop("disabled", false);
    $('#btn-guardar-nuevo-edicion-turno').attr("disabled", true);

}





$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_turnos();

    $("#agregar_tipo_turno").click(function () {

        $('#modal-agregar-turno').modal({
            show: true,
            backdrop: 'static'
        });

    });


    $("#turnos_registrados").click(function () {
        ver_turnos_detalle();

    });


    $("#turnos_registrados").keyup(function () {
        ver_turnos_detalle();

    });





    $("input[name=operacion_turno]").click(function () {
        tipo_operacion_seleccion = $('input:radio[name=operacion_turno]:checked').val();
        if (tipo_operacion_seleccion === '1') {
            $("#codigo_turno").prop('readonly', false);
            $("#codigo_turno").val('');
            $('#codigo_turno').attr("disabled", false);
            $("#codigo_turno").focus();
            $('#id_descripcion').prop('readonly', false);
            $("#id_descripcion").val('');
            $("#operacion_turno2").prop("disabled", true);
            $("#id_descripcion").focus(function () {
                $('#btn-guardar-nuevo-edicion-turno').attr("disabled", false);
            });

        } else {
            $("#codigo_turno").prop('readonly', false);
            $("#codigo_turno").focus();
            $('#id_descripcion').prop('readonly', false);

            $("#codigo_turno").keypress(function () {
                $('#btn-guardar-nuevo-edicion-turno').attr("disabled", false);
            });

            $("#id_descripcion").focus(function () {
                $('#btn-guardar-nuevo-edicion-turno').attr("disabled", false);
            });
        }
    });


    $(document).delegate("#btn-guardar-nuevo-edicion-turno", "click", function () {
        if (tipo_operacion_seleccion === '1') {
            codigo_seleccion_turno = $("#codigo_turno").val();
            nombre_seleccion_turno = $("#id_descripcion").val();
            registrar_nuevo_turno(codigo_seleccion_turno, nombre_seleccion_turno);
        } else {
            codigo_seleccion_turno_modificado = $("#codigo_turno").val();
            nombre_seleccion_turno_modificado = $("#id_descripcion").val();
            registrar_modificacion_turno(id_turno, codigo_seleccion_turno, nombre_seleccion_turno, codigo_seleccion_turno_modificado, nombre_seleccion_turno_modificado);
        }
    });



    $("#eliminar_turno").click(function () {
        if ($('.usuarios:checked').length > 0) {
            if ($('.usuarios:checked').length === 1) {
                var id_tipo = $(".usuarios:checked").attr("id");
                var datos_eliminar = {
                    "id_tipo": id_tipo
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de Turnos...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_turno',
                        type: 'post',
                        beforeSend: function () {},
                        success: function (datos) {
                            setTimeout(function () {
                                swal("Eliminacion con exito...!!!");
                            }, 1500);
                            recargar_turnos();
                            window.location.reload();

                        }
                    });


                });
            } else {
                swal("...Solo escoja un turno..");
            }
        } else {
            swal("..Debe seleccionar el turno respectivo...");
        }

    });








});
