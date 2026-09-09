var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    id_feriado, leer_dia, leer_mes, leer_descripcion, leer_condicion, tipo_operacion, leer_tipo_feriado, leer_dia_inicial, leer_mes_inicial, leer_descripcion_inicial, leer_condicion_inicial, dia_grabar, mes_grabar, descripcion_grabar, condicion_leida, condicion_grabar, id_feriado_leer, asignar_condicion, condicion_inicial_seleccion, tipo_de_feriado, leer_anio_unico;






function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    id_feriado = $('#registrados option:selected').attr('id_feriado_nuevo');
    leer_dia = $('#registrados option:selected').attr('dia');
    leer_mes = $('#registrados option:selected').attr('mes');
    leer_descripcion = $('#registrados option:selected').attr('descripcion');
    leer_condicion = $('#registrados option:selected').attr('condicion');
    leer_anio_unico = $('#registrados option:selected').attr('anio');
    $('#dia').val(leer_dia);
    $('#mes').val(leer_mes);
    $('#descripcion').val(leer_descripcion);
    switch (leer_condicion) {
        case 'R':
            $("#tipo_feriado_0").prop('checked', 'checked');
            $('#txt_anio_unico').val('');
            break;
        case 'U':
            $("#tipo_feriado_1").prop('checked', 'checked');
            $('#txt_anio_unico').val(leer_anio_unico);
            break;
        default:
            break;
    }
    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", false);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}


function nuevo_registro_feriado() {
    "use strict";
    $('#dia').val('');
    $('#dia').attr("disabled", false);
    $('#dia').focus();
    $('#mes').val('');
    $('#mes').attr("disabled", false);
    $('#descripcion').val('');
    $('#descripcion').attr("disabled", false);
    $('#txt_anio_unico').val('');
    $('#txt_anio_unico').attr("disabled", false);
    $('input:radio[name=tipo_feriado]').attr('checked', false);
    $('input:radio[name=tipo_feriado]').prop('disabled', false);
    $("#operacion1").prop("disabled", false);
    $("#operacion2").prop("disabled", true);
    $('#btn-guardar-nuevo-edicion').attr("disabled", true);
}


function grabar_feriado(leer_dia, leer_mes, leer_descripcion, asignar_condicion, leer_anio_unico) {
    "use strict";
    var datos_grabar_feriado = {
        "dia": leer_dia,
        "mes": leer_mes,
        "descripcion": leer_descripcion,
        "condicion_nuevo": asignar_condicion,
        "anio_unico": leer_anio_unico
    };

    $.ajax({
        data: datos_grabar_feriado,
        dataType: 'json',
        url: url + 'parametros/grabar_feriados',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            recargar_feriados();
            nuevo_registro_feriado();
            swal("Feriado Guardado con exito....");
        }
    });

}


function grabar_edicion_feriado(id_feriado_leer, dia_grabar, mes_grabar, descripcion_grabar, condicion_grabar, leer_anio_unico) {
    "use strict";
    var datos_edicion_feriado = {
        "id_feriado": id_feriado_leer,
        "dia": dia_grabar,
        "mes": mes_grabar,
        "descripcion": descripcion_grabar,
        "condicion_grabar": condicion_grabar,
        "anio_unico": leer_anio_unico
    };
    $.ajax({
        data: datos_edicion_feriado,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_feriado',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn-guardar-nuevo-edicion').attr("disabled", true);
            recargar_feriados();
            nuevo_registro_feriado();

            swal("Grabacion de Edicion de Feriados...conforme..");
        }
    });


}



function mostrar_datatable_feriado() {
    "use strict";

    $('#tabla_feriados').DataTable({
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


$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    mostrar_datatable_feriado();

    $("#agregar_editar_feriados").click(function () {
        $('#modal-agregar-editar-feriados').modal({
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
            nuevo_registro_feriado();
        } else {
            $('#dia').attr("disabled", false);
            $('#dia').focus();
            $('#mes').attr("disabled", false);
            $('#descripcion').attr("disabled", false);
            $('input:radio[name=tipo_feriado]').prop('disabled', false);
            $('#btn-guardar-nuevo-edicion').attr("disabled", false);
            $("#operacion1").prop("disabled", true);
            $("#operacion2").prop("disabled", false);
            $('#txt_anio_unico').attr("disabled", false);


        }
    });


    $("input[name=tipo_feriado").click(function () {
        tipo_de_feriado = $('input:radio[name=tipo_feriado]:checked').val();
        switch (tipo_de_feriado) {
            case '1':
                $('#txt_anio_unico').attr("disabled", true);
                $('#btn-guardar-nuevo-edicion').attr("disabled", false);
                break;
            case '2':
                $('#txt_anio_unico').attr("disabled", false);
                $('#txt_anio_unico').val('');
                $('#txt_anio_unico').focus();

                $('#btn-guardar-nuevo-edicion').attr("disabled", true);
                break;
            default:
                break;
        }
    });


    $('#txt_anio_unico').keypress(function () {
        $('#btn-guardar-nuevo-edicion').attr("disabled", false);
    });


    $("#btn-guardar-nuevo-edicion").click(function () {
        if (tipo_operacion === '1') {
            leer_dia = $('#dia').val();
            leer_mes = $('#mes').val();
            leer_descripcion = $('#descripcion').val();
            leer_tipo_feriado = $('input:radio[name=tipo_feriado]:checked').val();

            if (leer_tipo_feriado === '1') {
                asignar_condicion = 'R';
                leer_anio_unico = '0';
            } else {
                asignar_condicion = 'U';
                leer_anio_unico = $('#txt_anio_unico').val();
            }
            grabar_feriado(leer_dia, leer_mes, leer_descripcion, asignar_condicion, leer_anio_unico);

        } else {
            id_feriado_leer = $('#registrados option:selected').attr('id_feriado_nuevo');
            leer_dia_inicial = $('#registrados option:selected').attr('dia');
            leer_mes_inicial = $('#registrados option:selected').attr('mes');
            leer_descripcion_inicial = $('#registrados option:selected').attr('descripcion');
            leer_condicion_inicial = $('#registrados option:selected').attr('condicion');


            leer_dia = $('#dia').val();
            leer_mes = $('#mes').val();
            leer_descripcion = $('#descripcion').val();
            leer_tipo_feriado = $('input:radio[name=tipo_feriado]:checked').val();
            dia_grabar = (leer_dia_inicial === leer_dia) ? leer_dia_inicial : leer_dia;
            mes_grabar = (leer_mes_inicial === leer_mes) ? leer_mes_inicial : leer_mes;
            descripcion_grabar = (leer_descripcion_inicial === leer_descripcion) ? leer_descripcion_inicial : leer_descripcion;
            if (leer_condicion_inicial === null || leer_condicion_inicial === undefined) {
                condicion_inicial_seleccion = '';
            } else {
                condicion_inicial_seleccion = leer_condicion_inicial;
            }
            if (leer_tipo_feriado === '1') {
                asignar_condicion = 'R';
                leer_anio_unico = '0';
            } else {
                asignar_condicion = 'U';
                leer_anio_unico = $('#txt_anio_unico').val();
            }
            condicion_grabar = (condicion_inicial_seleccion === asignar_condicion) ? condicion_inicial_seleccion : asignar_condicion;
            grabar_edicion_feriado(id_feriado_leer, dia_grabar, mes_grabar, descripcion_grabar, condicion_grabar, leer_anio_unico);
        }

    });


    $("#eliminar_feriados").click(function () {
        if ($('.feriado:checked').length > 0) {
            if ($('.feriado:checked').length === 1) {
                var id_tipo_feriado = $(".feriado:checked").attr("id");
                var datos_eliminar = {
                    "id_tipo_feriado": id_tipo_feriado
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de feriado...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_feriados',
                        type: 'post',
                        beforeSend: function () {},
                        success: function (datos) {

                        }
                    });
                    setTimeout(function () {

                        swal("Eliminacion con exito...!!!");
                    }, 1500);
                    window.location.reload();

                });
            } else {
                swal("...Solo escoja un feriado...");
            }
        } else {
            swal("..Debe seleccionar el feriado respectivo...");
        }

    });

});
