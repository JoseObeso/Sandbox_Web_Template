var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_upss, lc_tipo_operacion_upss, leer_idupss, lc_tipo_operacion_departamento, leer_id_upss, leer_departamento_de_upss, leer_iddepar, leer_upss, leer_departamento, leer_idupss, leer_id_upss_seleccion, leer_id_depar_seleccion, lc_tipo_operacion_servicios, leer_servicio, leer_idservicio, leer_idupss_servicio, leer_upss_servicio, leer_iddepar_servicio, leer_departamento_servicio, data_depar_upss_mod, data_depar_upss_elim, data_registrar_departamento, data_listar_upss_seleccion, data_listar_servicios;

/*  proceso UPSS */


/* slt_servicios_registrados */


function listar_upss_registrados() {
    "use strict";
    var datos_listar_upss = {
        "upss": ''
    };
    $.ajax({
        data: datos_listar_upss,
        dataType: 'json',
        url: url + 'programacion/listar_tipos_upss',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slt_upss_registrados").html('');
            $("#slt_upss_seleccion")
                .html('')
                .append('<option id=0> Seleccione </option>');
            $("#slt_upss_seleccion_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_upss_registrados")
                            .append('<option id="' + filas.id + '" upss = "' + filas.upss + '"  >' + filas.upss + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_upss_registrados")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_upss_registrados").empty();

            }
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

function inicializar_etiquetas_upss() {
    "use strict";
    $("#btn_modificar_upss").attr("disabled", true);
    $("#btn_eliminar_upss").attr("disabled", true);
    $("#slt_departamento_registrados").empty();
    $("#slt_servicios_registrados").empty();
    $("#btn_agregar_departamento").attr("disabled", true);
    $("#btn_agregar_servicios").attr("disabled", true);

    $("#txt_upss")
        .val('')
        .attr("disabled", true);
    $("#bn_grabar_upss")
        .val('')
        .attr("disabled", true);
}

function grabar_registro_upss(leer_upss) {
    "use strict";
    var data_registrar_upss = {
        'upss': leer_upss
    };
    $.ajax({
        data: data_registrar_upss,
        dataType: 'json',
        url: url + 'programacion/grabar_registro_nuevo_upss',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            listar_upss_registrados();
            inicializar_etiquetas_upss();
        }
    });


}

function leer_upss_y_mostrarlo_etiquetas() {
    "use strict";
    leer_idupss = $('#slt_upss_registrados option:selected').attr('id');

    var lc_ver_si_seleccion_idupss = (typeof leer_idupss === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idupss === '1') {
        leer_idupss = $('#slt_upss_registrados option:selected').attr('id');
        leer_upss = $('#slt_upss_registrados option:selected').attr('upss');
        $("#txt_upss").val(leer_upss);
        $("#btn_modificar_upss").attr("disabled", false);
        $("#btn_eliminar_upss").attr("disabled", false);
        $("#txt_upss").attr("disabled", true);
        listar_departamentos_de_upss(leer_idupss);
        $("#btn_agregar_departamento").attr("disabled", false);
    } else {
        $("#btn_modificar_upss").attr("disabled", true);
        $("#btn_eliminar_upss").attr("disabled", true);
    }
    $("#bn_grabar_upss").attr("disabled", true);
}

function modificar_registro_upss(leer_idupss, leer_upss) {
    "use strict";
    var data_modificar_upss = {
        'idupss': leer_idupss,
        'upss': leer_upss
    };
    $.ajax({
        data: data_modificar_upss,
        dataType: 'json',
        url: url + 'programacion/modificar_registro_nuevo_upss',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            listar_upss_registrados();
            inicializar_etiquetas_upss();
        }
    });

}

function eliminar_upss(leer_idupss) {
    "use strict";
    var data_eliminar_upss = {
        'idupss': leer_idupss

    };
    $.ajax({
        data: data_eliminar_upss,
        dataType: 'json',
        url: url + 'programacion/eliminar_registro_nuevo_upss',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            listar_upss_registrados();
            inicializar_etiquetas_upss();
        }
    });

}



/*  Fin de proceso UPSS */





/* Inicio de departamento */

function inicializar_etiquetas_departamento() {
    "use strict";
    $("#btn_agregar_departamento").attr("disabled", false);
    $("#btn_modificar_departamento").attr("disabled", true);
    $("#btn_eliminar_departamento").attr("disabled", true);
    $("#slt_upss_seleccion").attr("disabled", true);
    $("#nombre_seleccion").text("Seleccion de UPSS:");
    $("#txt_departamento")
        .val('')
        .attr("disabled", true);
    $("#btn_grabar_departamento").attr("disabled", true);
}

function grabar_departamento_nuevo(leer_id_upss, leer_departamento_de_upss) {
    "use strict";
    data_registrar_departamento = {
        'idupss_seleccion': leer_id_upss,
        'departamento': leer_departamento_de_upss
    };
    $.ajax({
        data: data_registrar_departamento,
        dataType: 'json',
        url: url + 'programacion/grabar_registro_nuevo_departamento',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            inicializar_etiquetas_departamento();
            listar_departamentos_de_upss(leer_idupss);
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


function listar_departamentos_de_upss(leer_idupss) {
    "use strict";
    var data_listar_departamento = {
        'idupss': leer_idupss
    };
    $.ajax({
        data: data_listar_departamento,
        dataType: 'json',
        url: url + 'programacion/listar_departamentos_todos',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_departamento_registrados")
                .html('');
            $("#slt_departamento_seleccion_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_departamento_registrados")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" upss = "' + filas.upss + '" departamento = "' + filas.departamento + '"  >' + filas.departamento + '</option>')
                            .attr("disabled", false);


                    } else {
                        $("#slt_departamento_registrados")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_departamento_registrados").empty();

            }

        }
    });
}


// 
function leer_departamentos_y_mostrarlo_etiquetas() {
    "use strict";
    leer_iddepar = $('#slt_departamento_registrados option:selected').attr('id');
    var lc_ver_si_seleccion_iddepar = (typeof leer_iddepar === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_iddepar === '1') {
        leer_iddepar = $('#slt_departamento_registrados option:selected').attr('id');
        leer_idupss = $('#slt_departamento_registrados option:selected').attr('idupss');
        leer_upss = $('#slt_departamento_registrados option:selected').attr('upss');
        leer_departamento = $('#slt_departamento_registrados option:selected').attr('departamento');
        listar_todos_los_servicios_de_departamento_upss(leer_idupss, leer_iddepar);
        $("#btn_agregar_servicios").attr("disabled", false);

        $("#nombre_seleccion").text("UPSS Registrado: " + leer_upss);
        $("#txt_departamento")
            .val(leer_departamento)
            .attr("disabled", true);
        $("#btn_agregar_departamento").attr("disabled", false);
        $("#btn_modificar_departamento").attr("disabled", false);
        $("#btn_eliminar_departamento").attr("disabled", false);

    } else {
        $("#nombre_seleccion").text("Seleccion de UPSS:");
        $("#btn_modificar_departamento").attr("disabled", true);
        $("#btn_eliminar_departamento").attr("disabled", true);
    }
    $("#btn_grabar_departamento").attr("disabled", true);

}

function modificar_departamento_nuevo(leer_id_upss, leer_departamento_de_upss, leer_iddepar) {
    "use strict";
    var data_mod_depar = {
        'idupss_seleccion': leer_id_upss,
        'departamento': leer_departamento_de_upss,
        'iddepar': leer_iddepar
    };
    $.ajax({
        data: data_mod_depar,
        dataType: 'json',
        url: url + 'programacion/modificar_registro_nuevo_departamento',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            inicializar_etiquetas_departamento();
            listar_departamentos_de_upss(leer_idupss);
        }
    });
}

function eliminar_departamento(leer_iddepar) {

    "use strict";
    var data_elim_depar = {
        'iddepar': leer_iddepar
    };
    $.ajax({
        data: data_elim_depar,
        dataType: 'json',
        url: url + 'programacion/eliminar_registro_nuevo_departamento',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            inicializar_etiquetas_departamento();
            listar_departamentos_de_upss(leer_idupss);
        }
    });

}


/* Fin de inicio de departamento  */



function inicializar_etiquetas_de_servicios() {
    "use strict";
    $("#slt_servicios_registrados").attr("disabled", false);
    $("#btn_agregar_servicios").attr("disabled", false);
    $("#btn_modificar_servicios").attr("disabled", true);
    $("#btn_eliminar_servicios").attr("disabled", true);
    $("#slt_upss_seleccion_servicio").attr("disabled", true);
    $("#slt_departamento_seleccion_servicio").attr("disabled", true);
    $("#txt_servicios").attr("disabled", true);
    $("#btn_grabar_servicios").attr("disabled", true);
    $("#nombre_seleccion_servicio").text('Seleccion de UPSS:');
    $("#departamento_servicio").text('Seleccion Departamento:');



}


function grabar_servicio_de_depar_de_upss(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_servicio) {
    "use strict";
    var data_registrar_servicio = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'servicio': leer_servicio
    };
    $.ajax({
        data: data_registrar_servicio,
        dataType: 'json',
        url: url + 'programacion/grabar_registro_nuevo_servicio',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicializar_etiquetas_de_servicios();
            // ver_todos_servicios_de_departamento_de_upss(leer_idupss,leer_iddepar);
            listar_todos_los_servicios_de_departamento_upss(leer_idupss, leer_iddepar);
        }
    });
}

// ver_todos_servicios_de_departamento_de_upss(leer_idupss,leer_iddepar)

// ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion)

// ver_todos_los_servicios_de_upss
/*
function ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion) {
    "use strict";
    var data_listar_upss_seleccion = {
        'idupss_seleccion': leer_id_upss_seleccion
    };
    $.ajax({
        data: data_listar_upss_seleccion,
        dataType: 'json',
        url: url + 'programacion/ver_departamentos_de_upss',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_departamento_seleccion_servicio")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_departamento_seleccion_servicio")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" departamento = "' + filas.departamento + '"  >' + filas.departamento + '</option>');
                    } else {
                        $("#slt_departamento_seleccion_servicio")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_departamento_seleccion_servicio").empty();
            }
        }
    });
}
*/


function listar_todos_los_servicios_de_departamento_upss(leer_idupss, leer_iddepar) {
    "use strict";
    data_listar_servicios = {
        'idupss': leer_idupss,
        'iddepar': leer_iddepar
    };
    $.ajax({
        data: data_listar_servicios,
        dataType: 'json',
        url: url + 'programacion/ver_todos_los_servicios_de_upss',
        type: 'post',
        beforeSend: function () {

        },
        success: function (encontrados) {
            $("#slt_servicios_registrados")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_servicios_registrados")
                            .append('<option id="' + filas.id + '" idupss = "' + filas.idupss + '" upss = "' + filas.upss + '" iddepar = "' + filas.iddepar + '" departamento = "' + filas.departamento + '" servicio = "' + filas.servicio + '"  >' + filas.servicio + '</option>');
                         $("#slt_servicios_registrados")
                            .attr("disabled", false);
                    } else {
                        $("#slt_servicios_registrados")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_servicios_registrados").empty();
            }
        }
    });
}


// leer_idupss_servicio, leer_upss_servicio, leer_iddepar_servicio, leer_departamento_servicio




function leer_servicios_registrados_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idservicio = $('#slt_servicios_registrados option:selected').attr('id');
    var lc_ver_si_seleccion_idservicio = (typeof leer_idservicio === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idservicio === '1') {
        leer_idservicio = $('#slt_servicios_registrados option:selected').attr('id');
        leer_idupss_servicio = $('#slt_servicios_registrados option:selected').attr('idupss');
        leer_id_upss_seleccion = leer_idupss_servicio;
        leer_upss_servicio = $('#slt_servicios_registrados option:selected').attr('upss');
        leer_iddepar_servicio = $('#slt_servicios_registrados option:selected').attr('iddepar');
        leer_departamento_servicio = $('#slt_servicios_registrados option:selected').attr('departamento');
        leer_servicio = $('#slt_servicios_registrados option:selected').attr('servicio');
        $("#nombre_seleccion_servicio").text("UPSS Registrado: " + leer_upss_servicio);
        $("#departamento_servicio").text("Departamento : " + leer_departamento_servicio);
        $("#txt_servicios")
            .val(leer_servicio)
            .attr("disabled", true);
        $("#btn_modificar_servicios").attr("disabled", false);
        $("#btn_eliminar_servicios").attr("disabled", false);
        $("#slt_upss_seleccion_servicio").attr("disabled", true);

        //  listar_upss_registrados();
        //    ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion);

    } else {
        $("#nombre_seleccion").text("Seleccion de UPSS:");

        $("#btn_modificar_servicios").attr("disabled", true);
        $("#btn_eliminar_servicios").attr("disabled", true);

    }
    $("#btn_grabar_servicios").attr("disabled", true);

}


function modificar_servicio_de_depar_de_upss(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_servicio, leer_idservicio) {
    "use strict";
    data_depar_upss_mod = {
        'idupss': leer_id_upss_seleccion,
        'iddepar': leer_id_depar_seleccion,
        'servicio': leer_servicio,
        'idservi': leer_idservicio
    };
    $.ajax({
        data: data_depar_upss_mod,
        dataType: 'json',
        url: url + 'programacion/modificar_registro_nuevo_servicio',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicializar_etiquetas_de_servicios();
            // ver_todos_servicios_de_departamento_de_upss(leer_idupss, leer_iddepar);
            listar_todos_los_servicios_de_departamento_upss(leer_idupss, leer_iddepar);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });

}

function eliminar_servicios_de_upss_depar(leer_idservicio) {
    "use strict";
    data_depar_upss_elim = {
        'idservi': leer_idservicio
    };
    $.ajax({
        data: data_depar_upss_elim,
        dataType: 'json',
        url: url + 'programacion/eliminar_registro_nuevo_servicio',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicializar_etiquetas_de_servicios();
            // ver_todos_servicios_de_departamento_de_upss(leer_idupss, leer_iddepar);
            listar_todos_los_servicios_de_departamento_upss(leer_idupss, leer_iddepar);
            $("#txt_servicios").val('');
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        },

    });




}





$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    /* JS para UPSS */
    inicializar_etiquetas_upss();
    listar_upss_registrados();
    $("#btn_agregar_upss").click(function () {
        lc_tipo_operacion_upss = '1';
        $("#txt_upss")
            .attr("disabled", false)
            .val('')
            .focus();
    });
    $("#slt_upss_registrados")
        .click(function () {
            leer_upss_y_mostrarlo_etiquetas();
        })
        .keyup(function () {
            leer_upss_y_mostrarlo_etiquetas();
        })
        .keydown(function () {
            leer_upss_y_mostrarlo_etiquetas();
        });
    $("#btn_modificar_upss").click(function () {
        lc_tipo_operacion_upss = '2';
        $("#txt_upss")
            .attr("disabled", false)
            .focus();
    });

    $("#txt_upss").keyup(function () {
        $("#bn_grabar_upss").attr("disabled", false);
    });

    $("#bn_grabar_upss").click(function () {
        leer_upss = $("#txt_upss").val();
        if (lc_tipo_operacion_upss === '1') {
            grabar_registro_upss(leer_upss);
        } else {
            modificar_registro_upss(leer_idupss, leer_upss);
        }
    });


    $("#btn_eliminar_upss").click(function () {
        eliminar_upss(leer_idupss);

    });

    /* JS Fin de UPSS */



    /* inicio de departamento */

    //    inicializar_etiquetas_departamento();
    //  listar_departamentos_de_upss();

    $("#slt_departamento_registrados")
        .click(function () {
            leer_departamentos_y_mostrarlo_etiquetas();
        })
        .keyup(function () {
            leer_departamentos_y_mostrarlo_etiquetas();
        })
        .keydown(function () {
            leer_departamentos_y_mostrarlo_etiquetas();
        });


    $("#btn_agregar_departamento").click(function () {
        //  listar_upss_registrados();
        lc_tipo_operacion_departamento = '1';
        //  $("#slt_upss_seleccion").attr("disabled", false);
        $("#txt_departamento")
            .val('')
            .attr("disabled", false)
            .focus();



    });

    $("#btn_modificar_departamento").click(function () {
        lc_tipo_operacion_departamento = '2';
        $("#slt_upss_seleccion").attr("disabled", false);
        $("#txt_departamento").attr("disabled", false);
        $("#btn_grabar_departamento").attr("disabled", false);

    });


    $("#btn_eliminar_departamento").click(function () {
        eliminar_departamento(leer_iddepar);

    });


    $("#txt_departamento")
        .keypress(function () {
            $("#btn_grabar_departamento").attr("disabled", false);
        })

    .click(function () {
        $("#btn_grabar_departamento").attr("disabled", false);
    });


    $("#btn_grabar_departamento").click(function () {
        leer_id_upss = leer_idupss;
        leer_departamento_de_upss = $('#txt_departamento').val();
        leer_iddepar = $('#slt_departamento_registrados option:selected').attr('id');
        if (lc_tipo_operacion_departamento === '1') {
            grabar_departamento_nuevo(leer_id_upss, leer_departamento_de_upss);
        } else {
            // leer_id_upss = (typeof leer_idupss === 'undefined') ? leer_idupss : leer_id_upss;
            modificar_departamento_nuevo(leer_id_upss, leer_departamento_de_upss, leer_iddepar);
        }
    });

    /* fin de departamento */




    /* inicio de servicio */


    //    inicializar_etiquetas_de_servicios();
    //  listar_todos_los_servicios_de_departamento_upss();

    $("#slt_servicios_registrados")
        .click(function () {
            leer_servicios_registrados_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_servicios_registrados_y_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_servicios_registrados_y_mostrarlo_en_etiquetas();
        });



    $("#btn_agregar_servicios").click(function () {
       // listar_upss_registrados();
        lc_tipo_operacion_servicios = '1';
      /*  $("#nombre_seleccion_servicio").text('Seleccion de UPSS:');
        $("#departamento_servicio").text('Seleccion Departamento:');*/
        $("#txt_servicios")
            .val('')
            .attr("disabled", false)
            .focus();
        // $("#slt_upss_seleccion_servicio").attr("disabled", false);
    });

    /*
    $("#slt_upss_seleccion_servicio").change(function () {
        leer_id_upss_seleccion = $('#slt_upss_seleccion_servicio option:selected').attr('id');
        ver_departamentos_de_upss_seleccionado(leer_id_upss_seleccion);
        $("#slt_departamento_seleccion_servicio").attr("disabled", false);
    });

    $("#slt_departamento_seleccion_servicio").change(function () {
        leer_id_depar_seleccion = $('#slt_departamento_seleccion_servicio option:selected').attr('id');
        $("#txt_servicios")
            .attr("disabled", false)
            .focus();
    });
    */

    $("#txt_servicios").keyup(function () {
        $("#btn_grabar_servicios").attr("disabled", false);
    });


    $("#btn_modificar_servicios").click(function () {
        lc_tipo_operacion_servicios = '2';
        // $("#slt_upss_seleccion_servicio").attr("disabled", false);
        // $("#slt_departamento_seleccion_servicio").attr("disabled", false);
        $("#txt_servicios").attr("disabled", false);
        $("#btn_grabar_servicios").attr("disabled", false);

    });

    $("#btn_eliminar_servicios").click(function () {
        eliminar_servicios_de_upss_depar(leer_idservicio);
    });



    $("#btn_grabar_servicios").click(function () {

        leer_servicio = $("#txt_servicios").val();
        leer_id_upss_seleccion = leer_idupss;
        leer_id_depar_seleccion = leer_iddepar;
        if (lc_tipo_operacion_servicios === '1') {
            grabar_servicio_de_depar_de_upss(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_servicio);
        } else {
            modificar_servicio_de_depar_de_upss(leer_id_upss_seleccion, leer_id_depar_seleccion, leer_servicio, leer_idservicio);
        }

    });




    /* fin de servicio */








});
