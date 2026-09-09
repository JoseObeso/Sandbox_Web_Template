var url = 'http://' + document.domain + '/rrhh/personal/', leer_unidad_codigo, leer_unidad_descripcion, datos_buscar, nro_registros, lc_tipo_operacion, leer_nombre_del_servicio, datos_grabar_servicio, $input, leer_nombre_del_servicio_registrado, leer_idservicio, datos_eliminar_servicio, ln_operacion_grabar = 0,
    leer_usuario_autorizado, datos_grabar_nueva_unidad, leer_unidad_organica_registrada;






function leer_unidad_organica_mostrar_servicio_asociado()

{
    "use strict";
    leer_unidad_codigo = $('#mostrar_unidades_organicas option:selected').attr('unidad_codigo');
    leer_unidad_descripcion = $('#mostrar_unidades_organicas option:selected').attr('unidad_descripcion');
    leer_usuario_autorizado = 'Autorizado : ' + $('#mostrar_unidades_organicas option:selected').attr('nombre_autorizado');
    $("#nombre_unidad_seleccion").text(leer_unidad_descripcion);
    $("#usuario_autorizado").text(leer_usuario_autorizado);
    $("#mostrar_servicios_de_unidades").empty();
    $("#btn_grabar").attr("disabled", true);
    $("#btn_agregar_servicios").attr("disabled", false);
    $("#btn_modificar").attr("disabled", true);
    $("#btn_eliminar").attr("disabled", true);
    $("#txt_nombre_servicio").val('');
    $("#txt_nombre_servicio").attr("disabled", true);

    datos_buscar = {
        "codigo_unidad": leer_unidad_codigo
    };
    $.ajax({
        data: datos_buscar,
        dataType: 'json',
        url: url + 'parametros/buscar_servicio_unidad_organica',
        type: 'post',
        beforeSend: function () {

        },
        success: function (servicios) {
            nro_registros = servicios.length;
            if (nro_registros > 0) {
                servicios.forEach(function (filas) {
                    $('#mostrar_servicios_de_unidades').append('<option value="' + filas.codigo + '"  idservicio_registrado = "' + filas.idservicio + '"  nombre_servicio_registrado = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                });
            } else {
                $("#mostrar_servicios_de_unidades").empty();
            }
        }
    });
}


function leer_tipo_servicios() {
    "use strict";
    leer_idservicio = $('#mostrar_servicios_de_unidades option:selected').attr('idservicio_registrado');
    leer_nombre_del_servicio_registrado = $('#mostrar_servicios_de_unidades option:selected').attr('nombre_servicio_registrado');
    $("#btn_agregar_servicios").attr("disabled", false);
    $("#btn_modificar").attr("disabled", false);
    $("#btn_eliminar").attr("disabled", false);
    $("#txt_nombre_servicio").val(leer_nombre_del_servicio_registrado);


}


function grabar_servicios_de_unidad_organica() {
    "use strict";
    leer_unidad_codigo = $('#mostrar_unidades_organicas option:selected').attr('unidad_codigo');
    leer_nombre_del_servicio = $("#txt_nombre_servicio").val();

    datos_grabar_servicio = {
        "codigo_unidad": leer_unidad_codigo,
        "nombre_del_servicio": leer_nombre_del_servicio
    };

    $.ajax({
        data: datos_grabar_servicio,
        dataType: 'json',
        url: url + 'parametros/grabar_servicio_de_unidad_organica',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            habilitar_texto_servicio();
            leer_unidad_organica_mostrar_servicio_asociado();
        }
    });

}

function habilitar_texto_servicio() {
    "use strict";
    $("#txt_nombre_servicio").val('');
    $("#txt_nombre_servicio").attr("disabled", false);
    $("#txt_nombre_servicio").focus();

}

function procesar_modificacion_nombre_servicio() {
    "use strict";
    leer_nombre_del_servicio = $("#txt_nombre_servicio").val();
    datos_grabar_servicio = {
        "idservicio": leer_idservicio,
        "nombre_del_servicio": leer_nombre_del_servicio
    };

    $.ajax({
        data: datos_grabar_servicio,
        dataType: 'json',
        url: url + 'parametros/grabar_servicio_modificacion_unidad_organica',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            leer_unidad_organica_mostrar_servicio_asociado();
        }
    });

}



function proceder_a_eliminar_servicio() {

    "use strict";
    datos_eliminar_servicio = {
        "idservicio": leer_idservicio
    };

    $.ajax({
        data: datos_eliminar_servicio,
        dataType: 'json',
        url: url + 'parametros/eliminar_servicio',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            swal({
                title: "Eliminacion conforme",
                timer: 1000,
                showConfirmButton: false
            });
            leer_unidad_organica_mostrar_servicio_asociado();
        }
    });


}



function grabar_unidad_organica_ingresada(leer_unidad_organica_registrada) {
    "use strict";
    datos_grabar_nueva_unidad = {
        "nueva_descripcion": leer_unidad_organica_registrada
    };

    $.ajax({
        data: datos_grabar_nueva_unidad,
        dataType: 'json',
        url: url + 'parametros/grabar_nueva_unidad',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            ln_operacion_grabar = 0;
            $("#txt_unidad_organica").val('');
            $("#txt_unidad_organica").attr("disabled", false);
            $("#txt_unidad_organica").css("background-color", "#FCFBA0");
            $("#btn_agregar_unidad").val("Agregar Unidad Organica");
            $('#btn_agregar_unidad').attr("disabled", true);
            window.location.reload();

        }
    });

}








$(document).ready(function () {
    "use strict";

    $("input").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
            $input.val($input.val().toUpperCase());
        }, 50);
    });




    $("#mostrar_unidades_organicas")
        .click(function () {
            leer_unidad_organica_mostrar_servicio_asociado();
        })
        .keyup(function () {
            leer_unidad_organica_mostrar_servicio_asociado();
        });

    $("#mostrar_servicios_de_unidades")
        .click(function () {
            leer_tipo_servicios();
        })
        .keyup(function () {
            leer_tipo_servicios();
        });

    $("#btn_agregar_servicios").click(function () {
        lc_tipo_operacion = '1';
        $("#btn_modificar").attr("disabled", true);
        $("#btn_eliminar").attr("disabled", true);
        habilitar_texto_servicio();
    });


    $("#btn_modificar").click(function () {
        lc_tipo_operacion = '2';
        $("#btn_agregar_servicios").attr("disabled", true);
        $("#btn_eliminar").attr("disabled", true);
        $("#txt_nombre_servicio").attr("disabled", false);
        $("#txt_nombre_servicio").focus();

    });



    $("#btn_eliminar").click(function () {
        proceder_a_eliminar_servicio();

    });

    $("#txt_nombre_servicio").keypress(function () {
        $("#btn_grabar").attr("disabled", false);
    });


    $("#btn_grabar").click(function () {

        switch (lc_tipo_operacion) {
            case '1':
                grabar_servicios_de_unidad_organica();

                break;
            case '2':
                procesar_modificacion_nombre_servicio();
                break;

            default:
                break;
        }
    });

    $("#btn_agregar_unidad").click(function () {

        switch (ln_operacion_grabar) {
            case 0:
                $("#txt_unidad_organica").val('');
                $("#txt_unidad_organica").attr("disabled", false);
                $("#txt_unidad_organica").css("background-color", "#FCFBA0");
                $("#txt_unidad_organica").focus();

                break;
            case 1:
                leer_unidad_organica_registrada = $("#txt_unidad_organica").val();
                grabar_unidad_organica_ingresada(leer_unidad_organica_registrada);
                break;
            case 2:

                break;
            default:
                break;

        }


    });

    $("#txt_unidad_organica").keypress(function () {
        $("#btn_agregar_unidad").val("Grabar Nueva Unidad Organica");
        ln_operacion_grabar = 1;
    });






});
