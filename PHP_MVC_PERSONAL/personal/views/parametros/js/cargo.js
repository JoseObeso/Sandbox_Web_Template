var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    lc_tipo_operacion_cargo = '0',
    lc_tipo_operacion_cargo, dato_listar, cantidad_registros, datos_grabar, dato_eliminar, ln_id_cargo, lc_cargo, lid_grupo, lc_grupo, lc_buscar_nombre_cargo = '',
    lc_buscar_grupo_ocupacional = '',
    /* valor_final, */
    lc_descripcion_cargo, lid_grupo_ocupacional, lid_grupo_seleccion = '',
    ln_id_grupo, lid_grupo_seleccion_final, lc_tipo_operacion_grupo, lc_descripcion_grupo;


// Para Lista de Cargos

function listar_de_cargos(lc_buscar_nombre_cargo) {
    "use strict";
    dato_listar = {
        "cargo": lc_buscar_nombre_cargo
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_cargos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_cargos")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cargos").append('<option id="' + filas.id + '"  cargo = "' + filas.cargo + '"  id_grupo = "' + filas.id_grupo_ocupacional + '"  grupo = "' + filas.grupo + '"  >' + filas.cargo + '</option>');
                    $("#slt_cargos").attr("disabled", false);
                } else {
                    $("#slt_cargos").attr("disabled", true);
                }
            });
        }
    });
}

function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_cargos() {
    "use strict";
    ln_id_cargo = $('#slt_cargos option:selected').attr('id');
    lc_cargo = $('#slt_cargos option:selected').attr('cargo');
    lid_grupo = $('#slt_cargos option:selected').attr('id_grupo');
    lc_grupo = $('#slt_cargos option:selected').attr('grupo');
    $('#txt_descripcion_cargo')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_cargo);
    $('#slt_seleccion_grupo')
        .attr("disabled", true);
    $('#grupo_ocupacional').html('<br><label class = "form-control" > Grupo Ocupacional Registrado : </label> <label class = "form-control" >' + lc_grupo + '</label>');
    $('#btn_modificar_cargo').attr("disabled", false);
    $('#btn_eliminar_cargo').attr("disabled", false);
    $('#btn_grabar_cargo').attr("disabled", true);

}

function inicializar_botones_cargo() {
    "use strict";
    $('#btn_agregar_cargo').attr("disabled", false);
    $('#btn_modificar_cargo').attr("disabled", true);
    $('#btn_eliminar_cargo').attr("disabled", true);
    $('#txt_descripcion_cargo')
        .attr("disabled", true)
        .val('');
    $('#grupo_ocupacional')
        .attr("disabled", true)
        .text('');
    $('#slt_seleccion_grupo')
        .attr("disabled", true);

    $('#btn_grabar_cargo').attr("disabled", true);
}

function nuevo_registro_cargo() {
    "use strict";
    $('#txt_descripcion_cargo')
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#grupo_ocupacional').text('');
    $('#slt_seleccion_grupo')
        .attr("disabled", false);
    $('#btn_grabar_cargo').attr("disabled", false);
    $('#btn_modificar_cargo').attr("disabled", true);
    $('#btn_eliminar_cargo').attr("disabled", true);
}

function grabar_nuevo_registro_cargo(lc_descripcion_cargo, lid_grupo_ocupacional) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion_cargo,
        'id_grupo': lid_grupo_ocupacional
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_cargo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_turno")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_de_cargos(lc_buscar_nombre_cargo);
            inicializar_botones_cargo();
            $('#txt_descripcion_cargo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_cargo').attr("disabled", true);
            $("#esperando_turno")
                .html('')
                .hide();
        }
    });
}

function grabar_modificacion_de_registro_cargo(ln_id_cargo, lc_descripcion_cargo, lid_grupo_seleccion_final) {
    "use strict";
    datos_grabar = {
        'id': ln_id_cargo,
        'descripcion': lc_descripcion_cargo,
        'id_grupo': lid_grupo_seleccion_final
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificacion_registro_cargo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_turno")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_de_cargos(lc_buscar_nombre_cargo);
            inicializar_botones_cargo();
            $('#txt_descripcion_cargo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_cargo').attr("disabled", true);
            $("#esperando_turno")
                .html('')
                .hide();
        }
    });
}

function eliminar_registro_cargo(ln_id_cargo) {
    "use strict";
    dato_eliminar = {
        'id': ln_id_cargo
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_cargo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_turno")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_de_cargos(lc_buscar_nombre_cargo);
            inicializar_botones_cargo();
            $('#txt_descripcion_cargo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_cargo').attr("disabled", true);
            $("#esperando_turno")
                .html('')
                .hide();
        }
    });
}

// Para Grupos Ocupacionales
function listar_grupo_ocupacional(lc_buscar_grupo_ocupacional) {
    "use strict";
    dato_listar = {
        "grupo": lc_buscar_grupo_ocupacional
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_grupo_ocupacional',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_grupo")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_grupo").append('<option id="' + filas.idgrupo + '"  grupo = "' + filas.descripcion_grupo + '"  >' + filas.descripcion_grupo + '</option>');
                    $("#slt_grupo").attr("disabled", false);
                } else {
                    $("#slt_grupo").attr("disabled", true);
                }

            });
        }
    });
    $.ajax({
        data: {
            'grupo': ''
        },
        dataType: 'json',
        url: url + 'parametros/listar_grupo_ocupacional',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_seleccion_grupo")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_seleccion_grupo").append('<option id="' + filas.idgrupo + '"  grupo = "' + filas.descripcion_grupo + '"  >' + filas.descripcion_grupo + '</option>');
                } else {}

            });
        }
    });
}

function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_grupos() {
    "use strict";
    ln_id_grupo = $('#slt_grupo option:selected').attr('id');
    lc_grupo = $('#slt_grupo option:selected').attr('grupo');
    $('#txt_descripcion_grupo')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_grupo);
    $('#btn_modificar_grupo').attr("disabled", false);
    $('#btn_eliminar_grupo').attr("disabled", false);
    $('#btn_grabar_grupo').attr("disabled", true);


}


function nuevo_registro_grupo() {
    "use strict";
    $('#txt_descripcion_grupo')
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#btn_modificar_grupo').attr("disabled", false);
    $('#btn_eliminar_grupo').attr("disabled", false);
    $('#btn_grabar_grupo').attr("disabled", true);
}

function inicializar_botones_grupo() {
    "use strict";
    $('#btn_agregar_grupo').attr("disabled", false);
    $('#btn_modificar_grupo').attr("disabled", true);
    $('#btn_eliminar_grupo').attr("disabled", true);
    $('#txt_descripcion_grupo')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_grupo').attr("disabled", true);

}



function grabar_nuevo_registro_grupo(lc_descripcion_grupo) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion_grupo
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_grupo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_grupo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            inicializar_botones_grupo();
            listar_grupo_ocupacional(lc_buscar_grupo_ocupacional);
            $('#txt_descripcion_grupo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_grupo').attr("disabled", true);
            $("#esperando_grupo")
                .html('')
                .hide();
        }
    });

}


function grabar_modificacion_de_registro_grupo(ln_id_grupo, lc_descripcion_grupo) {
    "use strict";
    datos_grabar = {
        'id': ln_id_grupo,
        'descripcion': lc_descripcion_grupo
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificacion_registro_grupo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_grupo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            inicializar_botones_grupo();
            listar_grupo_ocupacional(lc_buscar_grupo_ocupacional);
            $('#txt_descripcion_grupo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_grupo').attr("disabled", true);
            $("#esperando_grupo")
                .html('')
                .hide();
        }
    });
}


function eliminar_registro_grupo(ln_id_grupo) {
    "use strict";
    datos_grabar = {
        'id': ln_id_grupo
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_grupo',
        type: 'post',
        beforeSend: function () {
            $("#esperando_grupo")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            inicializar_botones_grupo();
            listar_grupo_ocupacional(lc_buscar_grupo_ocupacional);
            $('#txt_descripcion_grupo')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_grupo').attr("disabled", true);
            $("#esperando_grupo")
                .html('')
                .hide();
        }
    });




}


/*
function ver_reporte_cargos_grupos_ocupacionales() {
    "use strict";
    dato_listar = {
        "cargo": lc_buscar_nombre_cargo
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/reporte_cargos_grupos_ocupacionales',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            if (cantidad_registros > 0) {
                var i;
                for (i = 0; i < datos.length; i++) {
                    valor_final = '<tr><td>' + datos[i].codigo + '</td><td>&nbsp;' + datos[i].cargo + '</td><td>' + datos[i].descripcion + '</td></tr>';
                    $("#mostrar_cargos_grupos").append(valor_final);
                }

            } else {
                valor_final = '';
                $("#mostrar_cargos_grupos").append(valor_final);
                $("#mostrar_cargos_grupos").empty();
            }

        }
    });
}
*/



function mostrar_datatable_cargo() {
    "use strict";

    $('#tabla_cargos_grupos').DataTable({

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
    listar_de_cargos(lc_buscar_nombre_cargo);
    //   ver_reporte_cargos_grupos_ocupacionales();
    mostrar_datatable_cargo();

    $("#txt_buscar_cargo")
        .focus()
        .keypress(function () {
            lc_buscar_nombre_cargo = $("#txt_buscar_cargo").val();
            $("#txt_descripcion_cargo").val('');
            $("#grupo_ocupacional").text('');
            listar_de_cargos(lc_buscar_nombre_cargo);
        });
    inicializar_botones_cargo();
    $("#btn_agregar_cargo").click(function () {
        lc_tipo_operacion_cargo = '1';
        nuevo_registro_cargo();
    });
    $('#slt_seleccion_grupo').change(function () {
        lid_grupo_seleccion = $('#slt_seleccion_grupo option:selected').attr('id');
    });
    $("#slt_cargos")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_cargos();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_cargos();
        });
    $('#btn_modificar_cargo').click(function () {
        lc_tipo_operacion_cargo = '2';
        $('#txt_descripcion_cargo')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#slt_seleccion_grupo')
            .attr("disabled", false);
        $('#btn_grabar_cargo').attr("disabled", false);
    });
    $('#btn_grabar_cargo').click(function () {
        lc_descripcion_cargo = $("#txt_descripcion_cargo").val().toUpperCase();
        lid_grupo_ocupacional = $('#slt_seleccion_grupo option:selected').attr('id');



        switch (lc_tipo_operacion_cargo) {
            case '1':
                grabar_nuevo_registro_cargo(lc_descripcion_cargo, lid_grupo_ocupacional);
                break;
            case '2':
                if (lid_grupo_seleccion === '1') {
                    lid_grupo_seleccion_final = lid_grupo;
                } else {
                    lid_grupo_seleccion_final = lid_grupo_ocupacional;
                }
                grabar_modificacion_de_registro_cargo(ln_id_cargo, lc_descripcion_cargo, lid_grupo_seleccion_final);
                break;
            default:
                break;
        }

    });

    $('#btn_eliminar_cargo').click(function () {
        eliminar_registro_cargo(ln_id_cargo);
    });
    // Fin para el tratamiento de CARGOS ********************************************************************


    /* para Grupos Ocupacional */
    listar_grupo_ocupacional(lc_buscar_grupo_ocupacional);
    inicializar_botones_grupo();
    $("#slt_grupo")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_grupos();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_grupos();
        });

    $("#btn_agregar_grupo").click(function () {
        lc_tipo_operacion_grupo = '1';
        nuevo_registro_grupo();
    });


    $("#txt_buscar_grupo")
        .keypress(function () {
            lc_buscar_grupo_ocupacional = $("#txt_buscar_grupo").val();
            $("#txt_descripcion_grupo").val('');
            listar_grupo_ocupacional(lc_buscar_grupo_ocupacional);
        });

    $("#txt_descripcion_grupo").keypress(function () {
        $('#btn_grabar_grupo').attr("disabled", false);
    });


    $('#btn_modificar_grupo').click(function () {
        lc_tipo_operacion_grupo = '2';
        $('#txt_descripcion_grupo')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#btn_grabar_grupo').attr("disabled", false);
    });



    $('#btn_grabar_grupo').click(function () {
        lc_descripcion_grupo = $("#txt_descripcion_grupo").val().toUpperCase();
        switch (lc_tipo_operacion_grupo) {
            case '1':
                grabar_nuevo_registro_grupo(lc_descripcion_grupo);
                break;
            case '2':
                grabar_modificacion_de_registro_grupo(ln_id_grupo, lc_descripcion_grupo);
                break;
            default:
                break;
        }

    });

    $('#btn_eliminar_grupo').click(function () {
        eliminar_registro_grupo(ln_id_grupo);
    });








});
