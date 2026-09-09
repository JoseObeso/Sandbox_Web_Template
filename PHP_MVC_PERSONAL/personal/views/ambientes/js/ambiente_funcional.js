var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_pisos, leer_idpisos, leer_bloques, leer_idbloque, dato_listar_bloques, leer_area_funcional, leer_idarea_funcional, lc_operacion_ambiente_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos, leer_idfuncional, leer_idpiso, leer_descripcion_idpiso, leer_idbloque, leer_descripcion_bloque, leer_idareafuncional, leer_descripcion_area_funcional, leer_idambiente, leer_descripcion_ambiente, leer_descripcion, leer_idpiso_registrado, leer_idbloque_registrado, leer_idareafuncional_registrado, leer_idambiente_registrado, leer_ver_idpisos, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, datos_modificar_ambiente_funcional, cantidad_registros, ln_idcargoprofesion, lc_inclusivo, ln_nro_profesional, dato_listar_funcion, leer_idasignacion, dato_eliminar_fun, ln_total_profesionales, lc_seleccion_individual_conjunto, leer_nro_cupos_adicional, data_listar_servicios, leer_idservicio, leer_upss, leer_departamento, leer_idservicio, leer_servicio, leer_nro_cupos_adicional, leer_idservicio_registrado;

// btn_asignar_personal

function listar_ambientes_funcional() {
    "use strict";
    var datos_ambiente_funcio = {
        "piso": ''
    };
    $.ajax({
        data: datos_ambiente_funcio,
        dataType: 'json',
        url: url + 'ambientes/listar_ambiente_funcional_total',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_ambiente_funcional")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambiente_funcional").append('<option id="' + filas.id + '" idpiso = "' + filas.idpiso + '" descripcion_piso = "' + filas.descripcion_piso + '" idbloque = "' + filas.idbloque + '" descripcion_bloque = "' + filas.descripcion_idbloque + '" idareafuncional = "' + filas.idareafuncional + '" descripcion_area_funcional = "' + filas.descripcion_area_funcional + '" idambiente = "' + filas.idambiente + '" descripcion_ambiente= "' + filas.descripcion_ambiente + '" idservicio = "' + filas.idservicio + '" servicio = "' + filas.servicio + '" descripcion =  "' + filas.descripcion + '" cupos =  "' + filas.nro_cupos + '" nro_cupos_adicional =  "' + filas.nro_cupos_adicional + '" descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
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

        error: function(jqXHR, textStatus, errorThrown) {
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


    $("#slt_lista_ambiente_funcional").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function(term) {
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
        beforeSend: function() {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_pisos")
                .html('')
                .append('<option id=0>-- Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
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
        beforeSend: function() {
            $("#espera_de_carga_bloques").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_de_carga_bloques").html("");
            $("#slt_lista_bloques")
                .html('')
                .append('<option id=0> --Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
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
        formatNoMatches: function(term) {
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
        leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque);
        listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
        $('#btn_agregar_area_funcional').attr("disabled", false);
    } else {

    }

}

function leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque) {
    "use strict";
    var data_bloque_funcional = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: data_bloque_funcional,
        dataType: 'json',
        url: url + 'ambientes/listar_areas_funcionales',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga_funcionales").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_de_carga_funcionales").html("");
            $("#slt_lista_funcionales")
                .html('')
                .append('<option id=0>-- Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_funcionales").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_funcionales").attr("disabled", false);
                    } else {
                        $("#slt_lista_funcionales")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_funcionales").empty();
            }
        }
    });


    $("#slt_lista_funcionales").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function(term) {
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

function leer_area_funcional_y_mostrarlo() {
    "use strict";
    leer_idarea_funcional = $('#slt_lista_funcionales option:selected').attr('id');
    var lc_ver_si_seleccion_idarea = (typeof leer_idarea_funcional === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idarea === '1') {
        leer_idarea_funcional = $('#slt_lista_funcionales option:selected').attr('id');
        leer_area_funcional = $('#slt_lista_funcionales option:selected').attr('descripcion');

    } else {}

}


function listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque) {
    "use strict";
    var dato_listar_ambientes = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: dato_listar_ambientes,
        dataType: 'json',
        url: url + 'ambientes/listar_todos_ambientes_de_bloques_y_piso',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(encontrados) {
            $("#espera_de_carga_ambientes").html("");
            $("#slt_lista_ambientes")
                .html('')
                .append('<option id=0>-- Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambientes").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_ambientes").attr("disabled", false);
                    } else {
                        $("#slt_lista_ambientes")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_ambientes").empty();
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
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

    $("#slt_lista_ambientes").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function(term) {
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

function inicializar_etiquetas_mantenedor_ambiente_funcional() {
    "use strict";
    $('#btn_agregar_ambiente_funcional').attr("disabled", false);
    $('#btn_modificar_ambiente_funcional').attr("disabled", true);
    $('#btn_eliminar_ambiente_funcional').attr("disabled", true);
    $('#slt_lista_pisos').attr("disabled", true);
    $('#slt_lista_funcionales').attr("disabled", true);
    $('#slt_lista_bloques').attr("disabled", true);
    $('#slt_lista_ambientes').attr("disabled", true);
    $('#btn_grabar_ambiente_funcional').attr("disabled", true);
    $('#txt_ambiente_funcional')
        .val('')
        .attr("disabled", true);

    $('#txt_cupos')
        .val('')
        .attr("disabled", true);

    $('#txt_cupos_adicionales')
        .val('')
        .attr("disabled", true);
    $('#upss').text('');
    $('#departamento').text('');
    listar_ambientes_funcional();
    listar_todos_los_servicios();
    $('#slt_servicios_registrados').attr("disabled", true);

}





function grabacion_ambiente_funcional(leer_idpisos, leer_idbloque, leer_idarea_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos, leer_nro_cupos_adicional, leer_idservicio) {
    "use strict";
    var dato_ambiente_funcional = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque,
        'idareafuncional': leer_idarea_funcional,
        'idambiente': leer_idambientes,
        'ambiente_funcional': leer_ambiente_funcional,
        'nro_cupos': leer_nro_cupos,
        'cupos_adicional': leer_nro_cupos_adicional,
        'idservicio': leer_idservicio
    };

    $.ajax({
        data: dato_ambiente_funcional,
        dataType: 'json',
        url: url + 'ambientes/grabar_ambiente_funcional_area_bloque_piso',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("");
            inicializar_etiquetas_mantenedor_ambiente_funcional();
            $("#slt_lista_bloques").attr("disabled", true);
            limpiar_etiquetas_de_visualizacion();


        },

        error: function(jqXHR, textStatus, errorThrown) {
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
        leer_idservicio = $('#slt_lista_ambiente_funcional option:selected').attr('idservicio');
        leer_idservicio_registrado = leer_idservicio;
        leer_servicio = $('#slt_lista_ambiente_funcional option:selected').attr('servicio');
        leer_descripcion_ambiente = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion_ambiente');
        leer_descripcion = $('#slt_lista_ambiente_funcional option:selected').attr('descripcion');
        leer_nro_cupos = $('#slt_lista_ambiente_funcional option:selected').attr('cupos');
        leer_nro_cupos_adicional = $('#slt_lista_ambiente_funcional option:selected').attr('nro_cupos_adicional');

        $("#descripcion_piso").text(leer_descripcion_idpiso);
        $("#descripcion_bloque").val(leer_descripcion_bloque);
        $("#descripcion_area_funcional").val(leer_descripcion_area_funcional);
        $("#descripcion_ambiente").val(leer_descripcion_ambiente);
        $("#descripcion_servicio").val(leer_servicio);
        $("#descripcion").val(leer_descripcion);

        $('#txt_ambiente_funcional').val(leer_descripcion);
        $('#txt_cupos').val(leer_nro_cupos);
        $('#nro_cupos').val(leer_nro_cupos);

        $("#nro_cupos_adicionales").val(leer_nro_cupos_adicional);
        $("#txt_cupos_adicionales").val(leer_nro_cupos_adicional);

        $('#btn_agregar_ambiente_funcional').attr("disabled", false);
        $('#btn_modificar_ambiente_funcional').attr("disabled", false);
        $('#btn_eliminar_ambiente_funcional').attr("disabled", false);

        $('#btn_eliminar_personal').attr("disabled", true);
        // ver_profesionales_ingresados(leer_idfuncional);



    } else {
        $('#btn_agregar_ambiente_funcional').attr("disabled", true);
        $('#btn_modificar_ambiente_funcional').attr("disabled", true);
        $('#btn_eliminar_ambiente_funcional').attr("disabled", true);
    }

}


/*
modificacion_ambiente_funcional(leer_idfuncional, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, leer_ambiente_funcional, leer_nro_cupos, leer_idservicio)

 modificacion_ambiente_funcional(leer_idfuncional, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, leer_ambiente_funcional, leer_nro_cupos, leer_nro_cupos_adicional, leer_idservicio
*/


function modificacion_ambiente_funcional(leer_idfuncional, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, leer_ambiente_funcional, leer_nro_cupos, leer_nro_cupos_adicional, leer_idservicio) {
    "use strict";
    datos_modificar_ambiente_funcional = {
        'idfuncional': leer_idfuncional,
        'idpisos': leer_ver_idpisos,
        'idbloque': leer_ver_idbloque,
        'idareafuncional': leer_ver_idareafuncional,
        'idambiente': leer_ver_idambiente,
        'ambiente_funcional': leer_ambiente_funcional,
        'cupos': leer_nro_cupos,
        'cupos_adicional': leer_nro_cupos_adicional,
        'idservicio': leer_idservicio

    };

    $.ajax({
        data: datos_modificar_ambiente_funcional,
        dataType: 'json',
        url: url + 'ambientes/modificacion_ambiente_funcional_area_bloque_piso',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("");
            inicializar_etiquetas_mantenedor_ambiente_funcional();
            $("#slt_lista_bloques").attr("disabled", true);
            limpiar_etiquetas_de_visualizacion();

        },
        error: function(jqXHR, textStatus, errorThrown) {
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


function limpiar_etiquetas_de_visualizacion() {
    "use strict";
    $('#descripcion_piso').val('');
    $('#descripcion_bloque').val('');
    $('#descripcion_area_funcional').val('');
    $('#descripcion_ambiente').val('');
    // $('#descripcion_area_funcional').val('');
    $('#descripcion').val('');
    $('#nro_cupos').text('');
    $('#txt_cupos_adicionales').text('');
    $('#slt_servicios_registrados')
        .attr("disabled", true);
    $('#upss').text('');
    $('#departamento').text('');

    $('#btn_eliminar_ambiente_funcional').attr("disabled", true);



}


function eliminar_id_ambiente_funcional(leer_idfuncional) {
    "use strict";
    var data_eliminar = {
        'idfuncional': leer_idfuncional
    };
    $.ajax({
        data: data_eliminar,
        dataType: 'json',
        url: url + 'ambientes/eliminar_ambiente_funcional_area_bloque_piso',
        type: 'post',
        beforeSend: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function() {
            $("#espera_de_carga_mantenimiento_funcional").html("");
            inicializar_etiquetas_mantenedor_ambiente_funcional();
            $("#slt_lista_bloques").attr("disabled", true);
            limpiar_etiquetas_de_visualizacion();

        },
        error: function(jqXHR, textStatus, errorThrown) {
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
        beforeSend: function() {
            $("#espera_grabacion_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function() {
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

        error: function(jqXHR, textStatus, errorThrown) {
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
        beforeSend: function() {},
        success: function(datos) {
            $("#slt_lista_personal")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
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

        error: function(jqXHR, textStatus, errorThrown) {
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

success: function(datos) {


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
                beforeSend: function() {},
                cantidad_registros = datos.length;
                datos.forEach(function(filas) {
                    if (filas.verificar === '1') {
                        ln_total_profesionales = filas.personal_total;
                        $("#nro_personas").text('Total Profesionales: ' + ln_total_profesionales);

                    } else {
                        $("#nro_personas").text('  Profesionales : 0');
                    }
                });
            },

            error: function(jqXHR, textStatus, errorThrown) {
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
        beforeSend: function() {
            $("#espera_grabacion_personal").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");

        },
        success: function() {
            $("#espera_grabacion_personal").html("");
            $('#txt_numero_profesionales').attr("disabled", true);
            $('#slt_cargos_profesion').attr("disabled", true);
            $('#btn_grabar_personal').attr("disabled", true);
            $('#seleccion_inclusivo_0').attr("disabled", true);
            $('#seleccion_inclusivo_1').attr("disabled", true);
            ver_profesionales_ingresados(leer_idfuncional);

        },

        error: function(jqXHR, textStatus, errorThrown) {
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




function listar_todos_los_servicios() {
    "use strict";
    data_listar_servicios = {
        'id': '',
    };
    $.ajax({
        data: data_listar_servicios,
        dataType: 'json',
        url: url + 'ambientes/ver_todos_los_servicios',
        type: 'post',
        beforeSend: function() {

        },
        success: function(encontrados) {
            $("#slt_servicios_registrados")
                .html('')
                .append('<option id=0>-- Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.verificar === '1') {
                        $("#slt_servicios_registrados")
                            .append('<option id="' + filas.idservicio + '" upss = "' + filas.upss + '" departamento = "' + filas.departamento + '"  >' + filas.servicio + '( ' + filas.upss + ' )' + '</option>');
                        //  $("#slt_servicios_registrados")
                        //  .attr("disabled", false);
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


    $("#slt_servicios_registrados").select2({
        allowClear: true,
        placeholder: "Selecionar ",
        formatNoMatches: function(term) {
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



function leer_servicios_registros() {
    "use strict";
    leer_idservicio = $('#slt_servicios_registrados option:selected').attr('id');
    leer_upss = $('#slt_servicios_registrados option:selected').attr('upss');
    leer_departamento = $('#slt_servicios_registrados option:selected').attr('departamento');
    $('#upss').text('UPSS : ' + leer_upss);
    $('#departamento').text('DEPARTAMENTO : ' + leer_departamento);
    $('#txt_ambiente_funcional').attr("disabled", false);

}






$(document).ready(function() {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_pisos_fisico();


    inicializar_etiquetas_mantenedor_ambiente_funcional();
    $('#btn_asignar_personal').attr("disabled", false);
    $('#btn_grabar_personal').attr("disabled", true);


    $("#slt_lista_pisos")
        .click(function() {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keydown(function() {
            leer_pisos_mostrarlo_en_etiquetas();
        });


    $("#slt_lista_bloques").change(function() {
        listar_bloques_mostrarlo_en_etiquetas();
    });


    $("#slt_lista_funcionales")
        .click(function() {
            leer_area_funcional_y_mostrarlo();
        })
        .keyup(function() {
            leer_area_funcional_y_mostrarlo();
        })
        .keydown(function() {
            leer_area_funcional_y_mostrarlo();
        })
        .change(function() {
            leer_idarea_funcional = $('#slt_lista_funcionales option:selected').attr('id');
            leer_area_funcional = $('#slt_lista_funcionales option:selected').attr('descripcion');
            $('#slt_lista_ambientes').attr("disabled", false);

        });


    $("#slt_lista_ambiente_funcional")
        .click(function() {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .keydown(function() {
            leer_ambiente_funcional_y_mostrarlo_en_etiquetas();
        })
        .change(function() {
            $('#btn_ir_asignacion_personal').attr("disabled", false);
        });


    $("#slt_lista_ambientes").change(function() {
        leer_idambientes = $('#slt_lista_ambientes option:selected').attr('id');
        $('#slt_servicios_registrados')
            .attr("disabled", false)
            .focus();
    });


    $('#btn_agregar_ambiente_funcional').click(function() {
        lc_operacion_ambiente_funcional = '1';
        $('#txt_ambiente_funcional').val('');
        $('#txt_cupos').val('');
        $('#nro_cupos').val('');
        $("#nro_cupos_adicionales").val('');
        $("#txt_cupos_adicionales").val('');
        listar_pisos_fisico();
        leer_idpisos = 1;
        listar_bloques_de_pisos(leer_idpisos);

        listar_ambientes_funcional();
        listar_todos_los_servicios();

        $('#slt_servicios_registrados')
            .attr("disabled", true);
        $('#slt_lista_pisos')
            .attr("disabled", false)
            .focus();
    });

    // slt_lista_ambientes

    $('#btn_modificar_ambiente_funcional').click(function() {
        lc_operacion_ambiente_funcional = '2';
        $('#slt_lista_pisos')
            .attr("disabled", false)
            .focus();
        $('#slt_lista_bloques').attr("disabled", false);
        $('#slt_lista_funcionales').attr("disabled", false);
        $('#slt_lista_ambiente_funcional').attr("disabled", false);
        $('#slt_lista_ambientes').attr("disabled", false);
        $('#txt_ambiente_funcional').attr("disabled", false);
        $('#txt_cupos').attr("disabled", false);
        $('#btn_grabar_ambiente_funcional').attr("disabled", false);

    });


    $('#btn_eliminar_ambiente_funcional').click(function() {
        eliminar_id_ambiente_funcional(leer_idfuncional);
    });




    $('#slt_servicios_registrados').change(function() {});




    $('#slt_servicios_registrados')
        .change(function() {
            leer_servicios_registros();
        })
        .keyup(function() {
            leer_servicios_registros();
        })
        .keydown(function() {
            leer_servicios_registros();
        });


    $('#txt_ambiente_funcional')
        .click(function() {
            $('#txt_cupos').attr("disabled", false);
        })
        .keypress(function(e) {
            $('#txt_cupos').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_cupos').focus();
            }
        });


    $('#txt_cupos')
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .click(function() {
            $('#txt_cupos_adicionales').attr("disabled", false);
        })
        .keypress(function(e) {
            $('#txt_cupos_adicionales').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_cupos_adicionales').focus();
            }
        });


    $('#txt_cupos_adicionales')
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .click(function() {
            $('#btn_grabar_ambiente_funcional').attr("disabled", false);
        })
        .keypress(function(e) {
            $('#btn_grabar_ambiente_funcional').attr("disabled", false);
            if (e.which === 13) {
                $('#btn_grabar_ambiente_funcional').focus();
            }
        });


    // txt_cupos_adicionales



    $('#btn_grabar_ambiente_funcional').click(function() {
        leer_ambiente_funcional = $('#txt_ambiente_funcional').val();
        leer_nro_cupos = $('#txt_cupos').val();
        leer_nro_cupos_adicional = $('#txt_cupos_adicionales').val();
        if (lc_operacion_ambiente_funcional === '1') {
            grabacion_ambiente_funcional(leer_idpisos, leer_idbloque, leer_idarea_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos, leer_nro_cupos_adicional, leer_idservicio);
        } else {
            leer_ver_idpisos = (typeof leer_idpiso === 'undefined') ? leer_idpiso_registrado : leer_idpiso;
            leer_ver_idbloque = (typeof leer_idbloque === 'undefined') ? leer_idbloque_registrado : leer_idbloque;
            leer_ver_idareafuncional = (typeof leer_idarea_funcional === 'undefined') ? leer_idareafuncional_registrado : leer_idareafuncional;
            leer_ver_idambiente = (typeof leer_idambiente === 'undefined') ? leer_idambiente_registrado : leer_idambiente;
            leer_idservicio = (typeof leer_idservicio === 'undefined') ? leer_idservicio_registrado : leer_idservicio;
            modificacion_ambiente_funcional(leer_idfuncional, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, leer_ambiente_funcional, leer_nro_cupos, leer_nro_cupos_adicional, leer_idservicio);
        }

    });







    $('#btn_ir_asignacion_personal').click(function() {

        //ver_condiciones();
        // destino_pdf = 1;

        window.open(url + 'ambientes/asignacion?idfuncional=' + leer_idfuncional, '_self');



    });


    // btn_ir_asignacion_personal



    $("#btn_grabar_personal").click(function() {
        ln_nro_profesional = $('#txt_numero_profesionales').val();
        // ln_idcargoprofesion, lc_inclusivo
        grabar_registro_personal_ambiente_funcional(leer_idfuncional, ln_nro_profesional, ln_idcargoprofesion, lc_inclusivo, lc_seleccion_individual_conjunto);
    });


    $("#slt_lista_personal")
        .click(function() {
            leer_profesionales_y_captuar_id();
        })
        .keyup(function() {
            leer_profesionales_y_captuar_id();
        })
        .keydown(function() {
            leer_profesionales_y_captuar_id();
        })
        .change(function() {

        });


    $("#btn_eliminar_personal").click(function() {
        // leer_idprofesional_seleccion 
        eliminar_profesional_registrado(leer_idasignacion);

    });







});