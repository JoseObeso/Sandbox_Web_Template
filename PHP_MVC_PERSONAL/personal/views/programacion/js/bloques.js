var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_pisos, leer_idpisos, dato_listar_bloques, leer_idbloques, leer_idfuncional, leer_descripcion, leer_nro_cupos, leer_nombre_bloque_programacion, leer_idbloqueprogramacion, leer_nombre_bloque, ln_idcargoprofesion,  leer_cargoprofesion, lc_inclusivo,  ln_nro_profesional, leer_idasignacion, dato_listar_carrera, cantidad_registros, dato_eliminar_fun, dato_listar_funcion, leer_idasignacionbloque;


function listar_pisos_fisico() {
    "use strict";
    var datos_listar_pisos = {
        "piso": ''
    };
    $.ajax({
        data: datos_listar_pisos,
        dataType: 'json',
        url: url + 'ambientes/listar_pisos_registrados',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga").html("");
            $("#slt_lista_pisos")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_pisos").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                    } else {
                        $("#slt_lista_pisos")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_pisos").empty();
            }
        }
    });
}

function leer_pisos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
    var lc_ver_si_seleccion_idpiso = (typeof leer_idpisos === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idpiso === '1') {
        leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
        leer_pisos = $('#slt_lista_pisos option:selected').attr('descripcion');
        listar_bloques_de_pisos(leer_idpisos);
        $("#slt_lista_bloques").attr("disabled", false);
    } else {}

}

// slt_lista_bloques_funcionales

function listar_bloques_de_pisos(leer_idpisos) {
    "use strict";
    dato_listar_bloques = {
        'idpiso': leer_idpisos
    };
    $.ajax({
        data: dato_listar_bloques,
        dataType: 'json',
        url: url + 'ambientes/listar_bloques_totales_de_pisos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_bloques").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_bloques").html("");
            $("#slt_lista_bloques")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_bloques").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                    } else {
                        $("#slt_lista_bloques")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_bloques").empty();
            }
        }
    });

    $("#slt_lista_bloques").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function (term) {
            var cont = $("<div />");
            var link = $("<a />", {
                "class": "test1",
                "data-title": term,
                text: "de '" + term + "'"
            });
            cont.append(link.clone());
            var html = cont.html();
            return "<span>No hay resultados - </span> " + (term.length > 0 ? html : "");
        }
    });

}

function inicializar_botones_etiquetas() {
    "use strict";
    ver_bloques_programados();
    $("#btn_agregar_bloque").attr("disabled", false);
    $("#slt_lista_pisos").attr("disabled", true);
    $("#slt_lista_bloques").attr("disabled", true);
    $("#slt_lista_ambiente_funcional").attr("disabled", true);
    $("#slt_lista_ambiente_funcional")
        .attr("disabled", true)
        .val('');
    $("#btn_grabar_bloque_programacion").attr("disabled", true);
    $("#btn_modificar_bloque").attr("disabled", true);
    $("#btn_eliminar_bloque").attr("disabled", true);
    $('#btn_asignar_personal').attr("disabled", true);

}


function visualizar_ambiente_funcional(leer_idpisos, leer_idbloques) {
    "use strict";
    var data_ambiente_funcional = {
        'idpisos': leer_idpisos,
        'idbloque': leer_idbloques
    };
    $.ajax({
        data: data_ambiente_funcional,
        dataType: 'json',
        url: url + 'ambientes/ver_todo_ambiente_funcional',

        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_ambiente_funcional")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambiente_funcional").append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" idbloque = "' + filas.idbloque + '" idareafuncional = "' + filas.idareafuncional + '" idambiente = "' + filas.idambiente + '" descripcion =  "' + filas.descripcion + '" cupos =  "' + filas.nro_cupos + '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_ambiente_funcional")
                            .attr("disabled", false);
                    } else {
                        $("#slt_lista_ambiente_funcional")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_ambiente_funcional").empty();
            }
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



function trasladar_seleccion_ambiente(leer_nombre_bloque_programacion, leer_idpisos, leer_idbloques, leer_idfuncional) {
    "use strict";
    var data_traslado = {
        'nombre_bloque_programacion': leer_nombre_bloque_programacion,
        'idpisos': leer_idpisos,
        'idbloques': leer_idbloques,
        'idfuncional': leer_idfuncional
    };

    $.ajax({
        data: data_traslado,
        dataType: 'json',
        url: url + 'ambientes/traslado_seleccion',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        var lc_er_si_grabo = filas.condicion;
                        if (lc_er_si_grabo === '1') {
                            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
                            visualizar_registros_de_ambiente_funcional(leer_nombre_bloque_programacion);

                        } else {
                            $("#proceso_de_carga").html("<center><strong>Seleccion ya existe....</strong></center>");
                        }


                    } else {}
                });
            } else {

            }
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
    $("#proceso_de_carga").html("");


}


function visualizar_registros_de_ambiente_funcional(leer_nombre_bloque_programacion) {
    "use strict";
    var data_ver = {
        'bloque_programacion': leer_nombre_bloque_programacion
    };
    $.ajax({
        data: data_ver,
        dataType: 'json',
        url: url + 'ambientes/ver_lo_trasladado',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#proceso_de_carga").html("");
            $("#slt_lista_ambiente_funcional_seleccion").html('');

            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambiente_funcional_seleccion")
                            .append('<option id="' + filas.id + '" cupos =  "' + filas.nro_cupos + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);


                        $("#btn_cerrar_bloque").attr("disabled", false);


                    } else {
                        $("#slt_lista_ambiente_funcional_seleccion")
                            .attr("disabled", true)
                            .empty();
                        $("#btn_cerrar_bloque").attr("disabled", true);
                    }
                });
            } else {

            }
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


function leer_ambiente_funcional_seleccionado() {
    "use strict";
    leer_idbloqueprogramacion = $('#slt_lista_ambiente_funcional_seleccion  option:selected').attr('id');
    var lc_ver_si_seleccion_ambiente = (typeof leer_idbloqueprogramacion === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_ambiente === '1') {
        leer_idbloqueprogramacion = $('#slt_lista_ambiente_funcional_seleccion  option:selected').attr('id');
        $("#btn_eliminar_item_bloque").attr("disabled", false);
    } else {
        $("#btn_eliminar_item_bloque").attr("disabled", true);

    }

}

function eliminar_item_bloque_programacion(leer_idbloqueprogramacion) {
    "use strict";
    var dato_eliminar = {
        'idbloqueprogramacion': leer_idbloqueprogramacion
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'ambientes/eliminar_bloque_programacion',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            visualizar_registros_de_ambiente_funcional(leer_nombre_bloque_programacion);
            $("#btn_eliminar_item_bloque").attr("disabled", true);


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

function ver_bloques_programados() {
    "use strict";
    var dato_bloque = {
        'nombre': ''
    };
    $.ajax({
        data: dato_bloque,
        dataType: 'json',
        url: url + 'ambientes/ver_total_bloque',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#proceso_de_carga").html("");
            $("#slt_lista_bloques_funcionales").html("");
            $("#btn_cerrar_bloque").attr("disabled", true);
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_bloques_funcionales")
                            .append('<option nombre="' + filas.bloque + '"  >' + filas.bloque + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_lista_bloques_funcionales")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {

            }


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


function leer_lista_bloques_funcionales() {
    "use strict";
    leer_nombre_bloque = $('#slt_lista_bloques_funcionales  option:selected').attr('nombre');
    var lc_ver_si_seleccion_nombre = (typeof leer_nombre_bloque === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_nombre === '1') {
        leer_nombre_bloque = $('#slt_lista_bloques_funcionales  option:selected').attr('nombre');
        $("#btn_modificar_bloque").attr("disabled", false);
        $("#btn_eliminar_bloque").attr("disabled", false);
        visualizar_detalle_de_nombre_de_bloque(leer_nombre_bloque);
         $("#txt_bloque_funcional").val(leer_nombre_bloque);
         $('#btn_asignar_personal').attr("disabled", false);

    } else {
        $("#btn_modificar_bloque").attr("disabled", true);
        $("#btn_eliminar_bloque").attr("disabled", true);

    }




}


function eliminar_bloque_programacion_registrado(leer_nombre_bloque) {

    "use strict";
    var data_eliminar_bloque = {
        'nombre': leer_nombre_bloque
    };
    $.ajax({
        data: data_eliminar_bloque,
        dataType: 'json',
        url: url + 'ambientes/eliminar_bloque_programacion_total',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#proceso_de_carga").html("");
            ver_bloques_programados();


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



function visualizar_detalle_de_nombre_de_bloque(leer_nombre_bloque){
    "use strict";
    var data_nombre_bloque = {
        'nombre': leer_nombre_bloque
    };
    
$.ajax({
        data: data_nombre_bloque,
        dataType: 'json',
        url: url + 'ambientes/ver_nombre_de_bloque_para_detalle',
        type: 'post',
        beforeSend: function () {
            $("#proceso_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#proceso_de_carga").html("");
            $("#slt_lista_bloques_funcionales_detalle").html("");
            $("#btn_cerrar_bloque").attr("disabled", true);
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_bloques_funcionales_detalle")
                            .append('<option id="' + filas.id + '" idpiso =  "' + filas.idpiso + '" descripcion_piso =  "' + filas.descripcion_piso + '" idbloque =  "' + filas.idbloque + '" descripcion_bloque =  "' + filas.descripcion_bloque + '" idambiente =  "' + filas.idambiente +  '" descripcion =  "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
                            .attr("disabled", false);

                    } else {
                        $("#slt_lista_bloques_funcionales_detalle")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {

            }


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




// dato_listar_carrera, cantidad_registros

function listar_carreras_profesion_laboral_tercero() {
    "use strict";
    dato_listar_carrera = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar_carrera,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion_unido',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_cargos_profesion")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_cargos_profesion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_cargos_profesion").attr("disabled", false);
                } else {
                    $("#slt_cargos_profesion").attr("disabled", true);
                }
            });
        }
    });

    $("#slt_cargos_profesion").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function (term) {
            var cont = $("<div />");
            var link = $("<a />", {
                "class": "test1",
                "data-title": term,
                text: "de '" + term + "'"
            });
            cont.append(link.clone());
            var html = cont.html();
            return "<span>No hay resultados - </span> " + (term.length > 0 ? html : "");
        }
    });



}




function grabar_registro_personal_ambiente_bloque(leer_nombre_bloque, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo) {
    "use strict";
    var dato_grabar_registro_bloque = {
        'nombre_bloque': leer_nombre_bloque,
        'nro_profesional': ln_nro_profesional,
        'idprofesion': ln_idcargoprofesion,
        'inclusivo': lc_inclusivo
    };
    $.ajax({
        data: dato_grabar_registro_bloque,
        dataType: 'json',
        url: url + 'ambientes/grabar_asignacion_personal_ambiente_bloque',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_personal").html("");
            $('#txt_numero_profesionales').attr("disabled", true);
            $('#slt_cargos_profesion').attr("disabled", true);
            $('#btn_grabar_personal').attr("disabled", true);
            $('#seleccion_inclusivo_0').attr("disabled", true);
            $('#seleccion_inclusivo_1').attr("disabled", true);
            ver_profesionales_ingresados(leer_nombre_bloque);

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


function ver_profesionales_ingresados(leer_nombre_bloque) {
    "use strict";

    var dato_listar_bloque = {
        'nombre_bloque': leer_nombre_bloque
    };
    $.ajax({
        data: dato_listar_bloque,
        dataType: 'json',
        url: url + 'ambientes/ver_profesionales_asignados_bloque',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_lista_personal")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_personal")
                        .append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
                        .attr("disabled", false);
                    $("#nro_personas").text(' Profesionales : ' + cantidad_registros);
                } else {
                    $("#slt_lista_personal").attr("disabled", true);
                    $("#nro_personas").text('  Profesionales : 0');
                }
            });
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


function leer_profesionales_y_captuar_id() {
    "use strict";
    leer_idasignacionbloque = $('#slt_lista_personal option:selected').attr('id');
    var lc_ver_si_seleccion_idprofesion_bloque = (typeof leer_idasignacionbloque === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idprofesion_bloque === '1') {
        leer_idasignacionbloque = $('#slt_lista_personal option:selected').attr('id');
        $("#btn_eliminar_personal").attr("disabled", false);

    } else {
        $("#btn_eliminar_personal").attr("disabled", true);

    }

}


function eliminar_profesional_registrado(leer_idasignacionbloque) {

    "use strict";
   dato_eliminar_fun = {
        'idasignacionbloque': leer_idasignacionbloque
    };
    $.ajax({
        data: dato_eliminar_fun,
        dataType: 'json',
        url: url + 'ambientes/eliminar_profesional_asignado_bloque',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function () {
            $("#espera_grabacion_personal").html("");
            $('#txt_numero_profesionales').attr("disabled", true);
            $('#slt_cargos_profesion').attr("disabled", true);
            $('#btn_grabar_personal').attr("disabled", true);
            $('#seleccion_inclusivo_0').attr("disabled", true);
            $('#seleccion_inclusivo_1').attr("disabled", true);
            ver_profesionales_ingresados(leer_nombre_bloque);

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
    listar_pisos_fisico();
    inicializar_botones_etiquetas();
    $("#btn_agregar_bloque").click(function () {
        $("#slt_lista_ambiente_funcional").html("");
        $("#slt_lista_ambiente_funcional_seleccion").html("");
        $("#txt_nro_cupos").val("");
        $("#txt_bloque_funcional")
            .attr("disabled", false)
            .val('')
            .focus();


    });

    $("#txt_bloque_funcional").keypress(function (e) {
        $("#btn_crear_bloque").attr("disabled", false);
        if (e.which === 13) {
            $("#btn_crear_bloque").focus();
        }
    });


    $("#btn_crear_bloque").click(function () {
        $("#slt_lista_pisos").attr("disabled", false);
        $("#txt_bloque_funcional").attr("disabled", true);
        $("#btn_crear_bloque").attr("disabled", true);
        $("#slt_lista_pisos").focus();
    });

    $("#btn_modificar_bloque").click(function () {
        
        $("#txt_bloque_funcional").attr("disabled", false);
        
        
        
    });

    
    
    
    $("#slt_lista_pisos")
        .click(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        });


    $("#slt_lista_ambiente_funcional_seleccion")
        .click(function () {
            leer_ambiente_funcional_seleccionado();
        })
        .keyup(function () {
            leer_ambiente_funcional_seleccionado();
        })
        .keydown(function () {
            leer_ambiente_funcional_seleccionado();
        });


    $("#slt_lista_bloques").change(function () {
        leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
        leer_idbloques = $("#slt_lista_bloques option:selected").attr('id');
        visualizar_ambiente_funcional(leer_idpisos, leer_idbloques);

    });


    $("#slt_lista_ambiente_funcional").change(function () {
        leer_idfuncional = $('#slt_lista_ambiente_funcional option:selected').attr('id');
        leer_descripcion = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion');
        leer_nro_cupos = $('#slt_lista_ambiente_funcional option:selected').attr('cupos');
        $("#txt_nro_cupos").val(leer_nro_cupos);
        leer_nombre_bloque_programacion = $("#txt_bloque_funcional").val();
        trasladar_seleccion_ambiente(leer_nombre_bloque_programacion, leer_idpisos, leer_idbloques, leer_idfuncional);
        $("#proceso_de_carga").html("");
    });


    $("#btn_eliminar_item_bloque").click(function () {
        eliminar_item_bloque_programacion(leer_idbloqueprogramacion);
    });


    $("#btn_cerrar_bloque").click(function () {
        $("#slt_lista_pisos").attr("disabled", true);
        $("#slt_lista_bloques").attr("disabled", true);
        $("#slt_lista_ambiente_funcional").attr("disabled", true);
        $("#slt_lista_ambiente_funcional_seleccion").attr("disabled", true);
        ver_bloques_programados();


    });




    $("#slt_lista_bloques_funcionales")
        .click(function () {
            leer_lista_bloques_funcionales();
        })
        .keyup(function () {
            leer_lista_bloques_funcionales();
        })
        .keydown(function () {
            leer_lista_bloques_funcionales();
        });

    $("#btn_modificar_bloque").click(function () {
        //    eliminar_bloque_programacion_registrado(leer_nombre_bloque);

    });


 

    $("#btn_eliminar_bloque").click(function () {
        eliminar_bloque_programacion_registrado(leer_nombre_bloque);

    });

    
      $('#btn_asignar_personal').click(function () {
        $('#txt_numero_profesionales')
            .attr("disabled", false)
            .val(1);
        listar_carreras_profesion_laboral_tercero();

    });

// ln_idcargoprofesion,  leer_cargoprofesion, lc_inclusivo, lc_inclusivo, ln_nro_profesional, leer_idasignacion

    $("#slt_cargos_profesion").change(function () {
        ln_idcargoprofesion = $('#slt_cargos_profesion option:selected').attr('id');
        leer_cargoprofesion = $('#slt_cargos_profesion option:selected').attr('descripcion');
        $('#txt_mostrar_cargo_profesion').val(leer_cargoprofesion);
        $("#seleccion_inclusivo_0").attr("disabled", false);
        $("#seleccion_inclusivo_1")
            .attr("disabled", false)
            .focus();
    });


    $("#seleccion_inclusivo_0").click(function () {
        lc_inclusivo = 'I';
        $("#btn_grabar_personal")
            .attr("disabled", false)
            .focus();
    });


    $("#seleccion_inclusivo_1").click(function () {
        lc_inclusivo = 'N';
        $("#btn_grabar_personal")
            .attr("disabled", false)
            .focus();
    });


    $("#btn_grabar_personal").click(function () {
        ln_nro_profesional = $('#txt_numero_profesionales').val();
        // ln_idcargoprofesion, lc_inclusivo
        // grabar_registro_personal_ambiente_funcional(leer_idfuncional, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo);
        grabar_registro_personal_ambiente_bloque(leer_nombre_bloque, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo);
    });


    $("#slt_lista_personal")
        .click(function () {
            leer_profesionales_y_captuar_id();
        })
        .keyup(function () {
            leer_profesionales_y_captuar_id();
        })
        .keydown(function () {
            leer_profesionales_y_captuar_id();
        })
        .change(function () {

        });



    $("#btn_eliminar_personal").click(function () {
      eliminar_profesional_registrado(leer_idasignacionbloque);



    });



    
    
    
    
    







});
