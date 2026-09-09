var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_pisos, leer_idpisos, leer_bloques, leer_idbloque, dato_listar_bloques, leer_area_funcional, leer_idarea_funcional, lc_operacion_ambiente_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos, leer_idfuncional, leer_idpiso, leer_descripcion_idpiso, leer_idbloque, leer_descripcion_bloque, leer_idareafuncional, leer_descripcion_area_funcional, leer_idambiente, leer_descripcion_ambiente, leer_descripcion, leer_idpiso_registrado, leer_idbloque_registrado, leer_idareafuncional_registrado, leer_idambiente_registrado, leer_ver_idpisos, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, datos_modificar_ambiente_funcional, dato_listar_carrera, cantidad_registros, ln_idcargoprofesion, leer_cargoprofesion, lc_inclusivo, ln_nro_profesional, dato_listar_funcion, leer_idasignacion, dato_eliminar_fun, ln_total_profesionales, i, lc_seleccion_individual_conjunto, datos_ambiente_funcio, lc_idfuncional_capturado, lc_piso_cap, data_cap;


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
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_pisos")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_pisos").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_pisos").attr("disabled", false);
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
    } else {

    }

}


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


function listar_bloques_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
    var lc_ver_si_seleccion_idbloque = (typeof leer_idbloque === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idbloque === '1') {
        leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
        leer_bloques = $('#slt_lista_bloques option:selected').attr('descripcion');
        $('#btn_agregar_area_funcional').attr("disabled", false);
        listar_ambientes_funcional(leer_idpisos, leer_idbloque);
        console.log(leer_idbloque);
    } else {

    }

}




function listar_ambientes_funcional(leer_idpisos, leer_idbloque) {
    "use strict";
    datos_ambiente_funcio = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: datos_ambiente_funcio,
        dataType: 'json',
        url: url + 'ambientes/listar_ambiente_funcional_piso_bloque',
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
                    if (filas.verificar === '1') {
                        $("#slt_lista_ambiente_funcional").append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" idbloque = "' + filas.idbloque + '" descripcion =  "' + filas.descripcion + '"  >' + filas.descripcion + '</option>')
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




function leer_ambiente_funcional_y_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idfuncional = $('#slt_lista_ambiente_funcional option:selected').attr('id');
    var lc_ver_si_seleccion_idfuncional = (typeof leer_idfuncional === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idfuncional === '1') {
        leer_idfuncional = $('#slt_lista_ambiente_funcional option:selected').attr('id');
        leer_idpiso = $('#slt_lista_ambiente_funcional option:selected').attr('idpiso');
        leer_idpiso_registrado = leer_idpiso;
        leer_descripcion_idpiso = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_piso');
        leer_idbloque = $('#slt_lista_ambiente_funcional option:selected').attr('idbloque');
        leer_idbloque_registrado = leer_idbloque;
        leer_descripcion_bloque = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_bloque');
        leer_idareafuncional = $('#slt_lista_ambiente_funcional option:selected').attr('idareafuncional');
        leer_idareafuncional_registrado = leer_idareafuncional;
        leer_descripcion_area_funcional = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_area_funcional');
        leer_idambiente = $('#slt_lista_ambiente_funcional option:selected').attr('idambiente');
        leer_idambiente_registrado = leer_idambiente;
        leer_descripcion_ambiente = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_ambiente');
        leer_descripcion = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion');
        leer_nro_cupos = $('#slt_lista_ambiente_funcional option:selected').attr('cupos');
        $("#descripcion_piso").text(leer_descripcion_idpiso);
        $("#descripcion_bloque").val(leer_descripcion_bloque);
        $("#descripcion_area_funcional").val(leer_descripcion_area_funcional);
        $("#descripcion_ambiente").val(leer_descripcion_ambiente);
        $("#descripcion").val(leer_descripcion);
        $('#txt_ambiente_funcional').val(leer_descripcion);
        $('#txt_cupos').val(leer_nro_cupos);
        $("#nro_cupos").text(leer_nro_cupos);
        $('#btn_agregar_ambiente_funcional').attr("disabled", false);
        $('#btn_modificar_ambiente_funcional').attr("disabled", false);
        $('#btn_eliminar_ambiente_funcional').attr("disabled", false);
        $('#btn_asignar_personal').attr("disabled", false);
        $('#btn_eliminar_personal').attr("disabled", true);
        ver_profesionales_ingresados(leer_idfuncional);



    } else {
        $('#btn_agregar_ambiente_funcional').attr("disabled", true);
        $('#btn_modificar_ambiente_funcional').attr("disabled", true);
        $('#btn_eliminar_ambiente_funcional').attr("disabled", true);
    }

}




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
                .show()
                .append('<option id=0> Seleccione </option>');
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

// slt_lista_ambiente_funcional

function grabar_registro_personal_ambiente_funcional(leer_idfuncional, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo, lc_seleccion_individual_conjunto) {
    "use strict";
    var dato_grabar_registro = {
        'idfuncional': leer_idfuncional,
        'nro_profesional': ln_nro_profesional,
        'idprofesion': ln_idcargoprofesion,
        'inclusivo': lc_inclusivo,
        'individual_conjunto': lc_seleccion_individual_conjunto
    };
    $.ajax({
        data: dato_grabar_registro,
        dataType: 'json',
        url: url + 'ambientes/grabar_asignacion_personal_ambiente_funcional',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_personal").html("");

        },
        success: function () {
            $("#espera_grabacion_personal").html("");
            $('#txt_numero_profesionales').attr("disabled", true);
            $('#slt_cargos_profesion').attr("disabled", true);
            $('#btn_grabar_personal').attr("disabled", true);
            $('#seleccion_inclusivo_0').attr("disabled", true);
            $('#seleccion_inclusivo_1').attr("disabled", true);
            $('#eleccion_individual_conjunto_0').attr("disabled", true);
            $('#eleccion_individual_conjunto_1').attr("disabled", true);


            ver_profesionales_ingresados(leer_idfuncional);

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


function ver_profesionales_ingresados(leer_idfuncional) {
    "use strict";

    dato_listar_funcion = {
        'idfuncional': leer_idfuncional
    };
    $.ajax({
        data: dato_listar_funcion,
        dataType: 'json',
        url: url + 'ambientes/ver_profesionales_asignados',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_lista_personal")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    ln_total_profesionales = 0;
                    $("#slt_lista_personal")
                        .append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  nro_profesional = "' + filas.nro_profesional + '"  profesional_unico = "' + filas.profesional_unico + '"  >' + filas.nro_profesional + ' - ' + filas.descripcion + ' - (' + filas.descripcion_unico + ')</option>')
                        .attr("disabled", false);
                    contar_cantidad_profesionales_seleccion(leer_idfuncional);
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


// 

function contar_cantidad_profesionales_seleccion(leer_idfuncional) {
    "use strict";
    var data_ver_cantidad = {
        'id_fun': leer_idfuncional
    };
    $.ajax({
        data: data_ver_cantidad,
        dataType: 'json',
        url: url + 'ambientes/ver_cantidad_profesionales',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    ln_total_profesionales = filas.personal_total;
                    $("#nro_personas").text('Total Profesionales: ' + ln_total_profesionales);

                } else {
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
    leer_idasignacion = $('#slt_lista_personal option:selected').attr('id');
    var lc_ver_si_seleccion_idprofesion = (typeof leer_idasignacion === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idprofesion === '1') {
        leer_idasignacion = $('#slt_lista_personal option:selected').attr('id');
        $("#btn_eliminar_personal").attr("disabled", false);

    } else {
        $("#btn_eliminar_personal").attr("disabled", true);

    }
}

function eliminar_profesional_registrado(leer_idasignacion) {
    "use strict";
    dato_eliminar_fun = {
        'idasignacion': leer_idasignacion
    };
    $.ajax({
        data: dato_eliminar_fun,
        dataType: 'json',
        url: url + 'ambientes/eliminar_profesional_asignado',
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
            ver_profesionales_ingresados(leer_idfuncional);

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





function inicializar_etiquetas_botones_asignacion_personal() {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_pisos_fisico();
    $("#mostrar_datos_capturados").hide();
    $('#eleccion_individual_conjunto_0')
        .prop("checked", false)
        .attr("disabled", true);
    $('#eleccion_individual_conjunto_1')
        .prop("checked", false)
        .attr("disabled", true);

    $("#seleccion_inclusivo_0")
        .prop("checked", false)
        .attr("disabled", true);

    $("#seleccion_inclusivo_1")
        .prop("checked", false)
        .attr("disabled", true);




    $('#txt_numero_profesionales').attr("disabled", true);
    $("#slt_cargos_profesion").attr("disabled", true);

    $('#btn_asignar_personal').attr("disabled", true);
    $('#btn_grabar_personal').attr("disabled", true);
    $("#btn_eliminar_personal").attr("disabled", true);


}


function obtener_piso_bloque_ambiente_funcional_desde_id(lc_idfuncional_capturado) {
    "use strict";
    data_cap = {
        idfuncional: lc_idfuncional_capturado
    };
    $.ajax({
        data: data_cap,
        dataType: 'json',
        url: url + 'ambientes/ver_piso_bloque_ambiente_funcional_por_id_capturado',
        type: 'post',
        beforeSend: function () {
          
        },
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#descripcion_piso_capturado").text(filas.descripcion_piso);
                    $("#descripcion_bloque_fisico_capturado").text(filas.descripcion_bloque);
                    $("#descripcion_ambiente_funcional_capturado").text(filas.descripcion);
                } else {
                    $("#descripcion_piso_capturado").text('');
                    $("#descripcion_bloque_fisico_capturado").text('');
                    $("#descripcion_ambiente_funcional_capturado").text('');

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


$(document).ready(function () {
    "use strict";
    inicializar_etiquetas_botones_asignacion_personal();
    lc_idfuncional_capturado = $("#id_funcional_capturado").val();
    if (lc_idfuncional_capturado !== "0") {
        $("#mostrar_datos_capturados").show();
        obtener_piso_bloque_ambiente_funcional_desde_id(lc_idfuncional_capturado);
         $('#btn_asignar_personal').attr("disabled", false);
        leer_idfuncional = lc_idfuncional_capturado;
    } else {
        $("#mostrar_datos_capturados").hide();
        $('#btn_asignar_personal').attr("disabled", true);


    }


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
    $("#slt_lista_bloques").change(function () {
        listar_bloques_mostrarlo_en_etiquetas();
    });

    $("#slt_lista_ambiente_funcional")
        .click(function () {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .change(function () {});


    $("#slt_lista_ambientes").change(function () {
        leer_idambientes = $('#slt_lista_ambientes option:selected').attr('id');
        $('#txt_ambiente_funcional')
            .attr("disabled", false)
            .focus();
    });









    $('#btn_asignar_personal').click(function () {
        listar_carreras_profesion_laboral_tercero();
        $('#eleccion_individual_conjunto_0')
            .prop("checked", false)
            .attr("disabled", false);
        $('#eleccion_individual_conjunto_1')
            .prop("checked", false)
            .attr("disabled", false);

    });



    $('#eleccion_individual_conjunto_0').click(function () {
        lc_seleccion_individual_conjunto = 'I';
        $('#txt_numero_profesionales')
            .attr("disabled", false)
            .val(1);
    });


    $('#eleccion_individual_conjunto_1').click(function () {
        lc_seleccion_individual_conjunto = 'C';
        $('#txt_numero_profesionales')
            .attr("disabled", false)
            .val(1);
        $("#slt_cargos_profesion").attr("disabled", false);

    });


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
        // lc_idfuncional_capturado
        grabar_registro_personal_ambiente_funcional(leer_idfuncional, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo, lc_seleccion_individual_conjunto);
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
        // leer_idprofesional_seleccion 
        eliminar_profesional_registrado(leer_idasignacion);

    });






});
