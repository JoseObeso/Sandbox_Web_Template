var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    ln_id_unidad_organica, lc_descripcion_unidad_organica, ln_id_organo, lc_organo, lc_tipo_operacion_unidad, ln_idorgano, lc_descripcion_organo, dato_listar, cantidad_registros, datos_grabar, datos_modificar, dato_eliminar, ln_id_organica_seleccion, lc_descripcion_seleccion, lc_descripcion_unidad, ln_id_organica_grabar_modificacion, lc_tipo_operacion_organo, dato_consultar, datos, cantidad_registros, i, valor_final, leer_buscar_organo = '', leer_buscar_unidad_organica = '';


/* unidad organica */

// listar_unidad_organica(leer_unidad_organica);

function listar_unidad_organica(leer_buscar_unidad_organica) {
    "use strict";
    dato_listar = {
        'id': leer_buscar_unidad_organica
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_las_unidades_organicas',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#select_unidad_organica")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#select_unidad_organica").append('<option id="' + filas.id + '"  organica = "' + filas.organica + '"  idorgano = "' + filas.idorgano + '"  organo = "' + filas.organo + '"  >' + filas.organica + '</option>');
                    $("#select_unidad_organica").attr("disabled", false);

                } else {
                    $("#select_unidad_organica").attr("disabled", true);

                }
            });
        }
    });








}

function inicializar_botones() {
    "use strict";
    $('#btn_agregar_unidad').attr("disabled", false);
    $('#btn_modificar_unidad').attr("disabled", true);
    $('#btn_eliminar_unidad').attr("disabled", true);
    $('#txt_descripcion_organica')
        .attr("disabled", true)
        .val('');
    $('#mostrar_organo').val('');
    $('#slt_organo_seleccion').attr("disabled", true);
    $('#btn_grabar_unidad_organica').attr("disabled", true);
    $('#btn_agregar_organo').attr("disabled", false);
    $('#btn_modificar_organo').attr("disabled", true);
    $('#btn_eliminar_organo').attr("disabled", true);
    $('#txt_descripcion_organo')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_organo').attr("disabled", true);
}

function leer_unidad_organica_y_mostrarlo_en_etiquetas() {
    "use strict";
    ln_id_unidad_organica = $('#select_unidad_organica  option:selected').attr('id');
    lc_descripcion_unidad_organica = $('#select_unidad_organica  option:selected').attr('organica');
    ln_id_organo = $('#select_unidad_organica  option:selected').attr('idorgano');
    lc_organo = $('#select_unidad_organica  option:selected').attr('organo');
    $('#txt_descripcion_organica').val(lc_descripcion_unidad_organica);
    $('#mostrar_organo').val(lc_organo);
    $('#btn_agregar_unidad').attr("disabled", false);
    $('#btn_modificar_unidad').attr("disabled", false);
    $('#btn_eliminar_unidad').attr("disabled", false);
    $('#btn_grabar_unidad_organica').attr("disabled", true);
    $('#btn_agregar_organo').attr("disabled", false);
    $('#btn_modificar_organo').attr("disabled", true);
    $('#btn_eliminar_organo').attr("disabled", true);
    $('#btn_grabar_organo').attr("disabled", true);
}

function nuevo_registro_unidad() {
    "use strict";
    $('#txt_descripcion_organica')
        .attr("disabled", false)
        .val('')
        .focus();
    $('#mostrar_organo').val('');
    $('#btn_agregar_unidad').attr("disabled", true);
    $('#btn_modificar_unidad').attr("disabled", true);
    $('#btn_eliminar_unidad').attr("disabled", true);
}

function grabar_nuevo_registro_unidad_organica(lc_descripcion_unidad, ln_id_organica_seleccion) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion_unidad,
        'id_organica': ln_id_organica_seleccion
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_unidad_organica',
        type: 'post',
        beforeSend: function () {
            $("#esperando_unidad_organica")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_unidad_organica();
            inicializar_botones();
            listar_organos();
            $("#esperando_unidad_organica")
                .html('')
                .hide();
        }
    });

}

function grabar_modificacion_unidad_organica(ln_id_unidad_organica, lc_descripcion_unidad, ln_id_organica_grabar_modificacion) {
    "use strict";
    datos_modificar = {
        'id': ln_id_unidad_organica,
        'descripcion': lc_descripcion_unidad,
        'id_organo': ln_id_organica_grabar_modificacion
    };
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificacion_unidad_organica_final',
        type: 'post',
        beforeSend: function () {
            $("#esperando_unidad_organica")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_unidad_organica();
            inicializar_botones();
            listar_organos();
            $("#esperando_unidad_organica")
                .html('')
                .hide();
        }
    });

}

function eliminar_registro_unidad(ln_id_unidad_organica) {
    "use strict";
    dato_eliminar = {
        'id': ln_id_unidad_organica
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_unidad',
        type: 'post',
        beforeSend: function () {
            $("#esperando_unidad_organica")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_unidad_organica();
            inicializar_botones();
            $("#esperando_unidad_organica")
                .html('')
                .hide();
        }


    });

}


/* Organo */

function listar_organos(leer_buscar_organo) {
    "use strict";
    dato_listar = {
        'id': leer_buscar_organo
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_organos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#select_organo")
                .html('')
                .show();
            $("#slt_organo_seleccion").html('');
            $("#slt_organo_seleccion").append('<option id=0>Seleccione Organo: </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#select_organo").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#select_organo").attr("disabled", false);
                    $("#slt_organo_seleccion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_organo_seleccion").attr("disabled", true);


                } else {
                    $("#select_organo").attr("disabled", true);
                    $("#slt_organo_seleccion").attr("disabled", true);
                }
            });
        }
    });









}


function leer_organo_y_mostrarlo_en_etiquetas() {
    "use strict";
    ln_idorgano = $('#select_organo  option:selected').attr('id');
    lc_descripcion_organo = $('#select_organo  option:selected').attr('descripcion');
    $("#txt_descripcion_organo")
        .val(lc_descripcion_organo)
        .attr("disabled", true);
    $('#btn_modificar_unidad').attr("disabled", true);
    $('#btn_eliminar_unidad').attr("disabled", true);
    $('#btn_grabar_unidad_organica').attr("disabled", true);
    $('#btn_agregar_organo').attr("disabled", false);
    $('#btn_modificar_organo').attr("disabled", false);
    $('#btn_eliminar_organo').attr("disabled", false);
    $('#btn_grabar_organo').attr("disabled", true);
    leer_organo_mostrar_divisiones(ln_idorgano);
}

function leer_organo_mostrar_divisiones(ln_idorgano)

{
    "use strict";
    dato_consultar = {
        "id": ln_idorgano
    };
    $.ajax({
        data: dato_consultar,
        dataType: 'json',
        url: url + 'parametros/consultar_mostrar_unidades',
        type: 'post',
        beforeSend: function () {

        },
        success: function (datos) {
            $("#esperando_organo")
                .html('');
            $("#mostrar_unidades_organicas").html('');
            $("#tabla_unidades_organicas").show();
            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                for (i = 0; i < datos.length; i++) {
                    valor_final = '<tr><td>&raquo;&nbsp;' + datos[i].descripcion + '</td></tr>';
                    $("#mostrar_unidades_organicas").append(valor_final);
                }
            } else {
                valor_final = '';
                $("#mostrar_unidades_organicas").append(valor_final);
                $("#mostrar_unidades_organicas").empty();
            }








        }
    });



}


function grabar_registro_organo(lc_descripcion_organo) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion_organo
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_organo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_organo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_organos();
            inicializar_botones();
            listar_unidad_organica();
            $("#txt_descripcion_organo").attr("disabled", true);
            $("#esperando_organo")
                .html('')
                .hide();
            $('#btn_grabar_organo').attr("disabled", true);
        }
    });

}


function grabar_modificacion_organo(ln_idorgano, lc_descripcion_organo)

{
    "use strict";
    datos_modificar = {
        'id': ln_idorgano,
        'descripcion': lc_descripcion_organo
    };
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificacion_organo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_organo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_organos();
            listar_unidad_organica();
            inicializar_botones();
            $("#txt_descripcion_organo").attr("disabled", true);
            $("#esperando_organo")
                .html('')
                .hide();
            $('#btn_grabar_organo').attr("disabled", true);
        }

    });

}

function eliminar_registro_organo(ln_idorgano) {
    "use strict";
    dato_eliminar = {
        'id': ln_idorgano
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_organo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_organo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_organos();
            inicializar_botones();
            $("#txt_descripcion_organo").attr("disabled", true);
            $("#esperando_organo")
                .html('')
                .hide();
            $('#btn_grabar_organo').attr("disabled", true);
        }

    });


}



function mostrar_datatable_unidad_organica() {
    "use strict";

    $('#tabla_organo').DataTable({

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
    listar_unidad_organica();
    listar_organos();
    inicializar_botones();
    mostrar_datatable_unidad_organica();
    $("#txt_buscar_unidad_organica").focus();
    listar_unidad_organica(leer_buscar_unidad_organica);
    listar_organos(leer_buscar_organo);


    $("#tabla_unidades_organicas").hide();


    $("#txt_buscar_unidad_organica")
        .focus(function () {
            $("#txt_buscar_unidad_organica").removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
            $("#txt_buscar_organo").removeClass("form-control alert-warning text-secondary initialism").addClass("form-control");
        })
        .keyup(function () {
            leer_buscar_unidad_organica = $("#txt_buscar_unidad_organica").val();
            $("#txt_descripcion_organica").val('');
            $("#mostrar_organo").val('');
            listar_unidad_organica(leer_buscar_unidad_organica);
        });




    $("#txt_buscar_organo")
        .focus(function () {
            $("#txt_buscar_organo").removeClass("form-control").addClass("form-control alert-warning text-secondary initialism");
            $("#txt_buscar_unidad_organica").removeClass("form-control alert-warning text-secondary initialism").addClass("form-control");
        })
        .keyup(function () {
            leer_buscar_organo = $("#txt_buscar_organo").val();
            $("#mostrar_organo").val('');
            listar_organos(leer_buscar_organo);
        });




    $("#select_unidad_organica")
        .click(function () {
            leer_unidad_organica_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_unidad_organica_y_mostrarlo_en_etiquetas();
        });

    $("#btn_agregar_unidad").click(function () {
        lc_tipo_operacion_unidad = '1';
        nuevo_registro_unidad();
    });

    $('#txt_descripcion_organica').keyup(function () {
        if (lc_tipo_operacion_unidad === '1') {
            $('#slt_organo_seleccion').attr("disabled", false);
            $('#btn_grabar_unidad_organica').attr("disabled", true);

        } else {
            $('#btn_grabar_unidad_organica').attr("disabled", false);
        }
    });

    $('#slt_organo_seleccion').change(function () {
        lc_descripcion_seleccion = $('#slt_organo_seleccion  option:selected').attr('descripcion');
        ln_id_organica_seleccion = $('#slt_organo_seleccion  option:selected').attr('id');
        if (lc_tipo_operacion_unidad === '1') {
            if (ln_id_organica_seleccion === '0') {
                $("#esperando_unidad_organica")
                    .html('')
                    .show()

                .html('<em><strong><font color="#C44900"><center>... Debe seleccionar Organo ... </center></font></strong></em>')
                    .fadeOut(5000);
                $('#btn_grabar_unidad_organica').attr("disabled", true);

            } else {
                $('#mostrar_organo').val(lc_descripcion_seleccion);
                $('#btn_grabar_unidad_organica').attr("disabled", false);
            }

        } else {
            $('#mostrar_organo').val('Estaba Registrado : ' + lc_organo + '  ---   Selecciono para Modificar   : ' + lc_descripcion_seleccion);
            ln_id_organica_grabar_modificacion = (ln_id_organica_seleccion === '0') ? ln_id_organo : ln_id_organica_seleccion;
        }


    });


    $("#btn_modificar_unidad").click(function () {
        lc_tipo_operacion_unidad = '2';
        $('#txt_descripcion_organica').attr("disabled", false);
        $('#slt_organo_seleccion').attr("disabled", false);
        $('#btn_grabar_unidad_organica').attr("disabled", false);

    });



    $('#btn_grabar_unidad_organica').click(function () {
        lc_descripcion_unidad = $('#txt_descripcion_organica').val().toUpperCase();
        ln_id_organica_seleccion = $('#slt_organo_seleccion  option:selected').attr('id');
        switch (lc_tipo_operacion_unidad) {
            case '1':
                grabar_nuevo_registro_unidad_organica(lc_descripcion_unidad, ln_id_organica_seleccion);
                break;
            case '2':
                grabar_modificacion_unidad_organica(ln_id_unidad_organica, lc_descripcion_unidad, ln_id_organica_grabar_modificacion);
                break;
            default:
                break;
        }

    });

    $('#btn_eliminar_unidad').click(function () {
        eliminar_registro_unidad(ln_id_unidad_organica);

    });




    $("#select_organo")
        .click(function () {
            leer_organo_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_organo_y_mostrarlo_en_etiquetas();
        });


    $("#btn_agregar_organo").click(function () {
        lc_tipo_operacion_organo = '1';
        $("#txt_descripcion_organo")
            .val('')
            .attr("disabled", false)
            .focus();
        $('#btn_grabar_organo').attr("disabled", true);
    });


    $("#btn_modificar_organo").click(function () {
        lc_tipo_operacion_organo = '2';
        $("#txt_descripcion_organo")
            .attr("disabled", false)
            .focus();
        $('#btn_grabar_organo').attr("disabled", false);
    });



    $('#txt_descripcion_organo').keyup(function () {
        $('#btn_grabar_organo').attr("disabled", false);
    });


    $('#btn_grabar_organo').click(function () {
        lc_descripcion_organo = $("#txt_descripcion_organo").val().toUpperCase();
        switch (lc_tipo_operacion_organo) {
            case '1':
                grabar_registro_organo(lc_descripcion_organo);
                break;
            case '2':
                grabar_modificacion_organo(ln_idorgano, lc_descripcion_organo);
                break;
            default:
                break;
        }

    });



    $('#btn_eliminar_organo').click(function () {
        eliminar_registro_organo(ln_idorgano);


    });









});
