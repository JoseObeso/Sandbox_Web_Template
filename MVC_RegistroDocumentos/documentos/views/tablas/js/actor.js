var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    lc_buscar_actor = '',
    lc_tipo_operacion = '',
    leer_tipo_tramite = '';



function listar_actor_tipo_01(lc_buscar_actor) {
    var etiqueta_select = $("#slt_actor_01"),
        etiqueta_espera = $("#msj_espera"),
        listar_todos_actor = {
            "actor": lc_buscar_actor
        };
    $.ajax({
        data: listar_todos_actor,
        dataType: 'json',
        url: url + 'tablas/listar_todos_los_actores_tipo_01',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            etiqueta_select.html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                etiqueta_espera.html("");
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        etiqueta_select.append(
                            '<option id="' + filas.actor +
                            '"  actor = "' + filas.actor +
                            '" descripcion = "' + filas.descripcion +
                            '" abreviatura = "' + filas.abreviatura +
                            '" responsable = "' + filas.responsable +
                            '" area_de_actor = "' + filas.area_de_actor +
                            '" tramite = "' + filas.tramite +
                            '" tipo_actor = "' + filas.tipo_actor +
                            '" codigo = "' + filas.codigo +
                            '" direccion = "' + filas.direccion +
                            '" telefono = "' + filas.telefono +
                            '" ruc = "' + filas.ruc +
                            '" actor_descripcion = "' + filas.actor_descripcion +
                            '"  >' + filas.actor_descripcion + '</option>').attr("disabled", false);
                    } else {
                        etiqueta_select.attr("disabled", false);
                    }
                });

            } else {
                etiqueta_select.html("");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });



}


function leer_actor_mostrarlo_etiqueta() {
    var leer_idactor = $('#slt_actor_01  option:selected').attr('id'),
        lc_ver_si_selecciono = (typeof leer_idactor === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono === '1') {
        var leer_idactor = $('#slt_actor_01  option:selected').attr('id'),
            leer_descripcion = $('#slt_actor_01  option:selected').attr('descripcion'),
            leer_abreviatura = $('#slt_actor_01  option:selected').attr('abreviatura'),
            leer_responsable = $('#slt_actor_01  option:selected').attr('responsable'),
            leer_codigo = $('#slt_actor_01  option:selected').attr('codigo'),
            leer_id_area_actor = $('#slt_actor_01  option:selected').attr('area_de_actor'),
            leer_actor_descripcion = $('#slt_actor_01  option:selected').attr('actor_descripcion'),
            leer_tramite = $('#slt_actor_01  option:selected').attr('tramite');
        $('#txt_actor').val(leer_idactor).attr("disabled", true);
        $('#txt_descripcion').val(leer_descripcion).attr("disabled", true);
        $('#txt_abreviatura').val(leer_abreviatura).attr("disabled", true);
        $('#txt_responsable').val(leer_responsable).attr("disabled", true);
        $('#txt_codigo').val(leer_codigo).attr("disabled", true);
        $('#txt_seleccione_area_actor').val(leer_actor_descripcion).attr("disabled", true);
        $('#txt_id_area').val(leer_id_area_actor).attr("disabled", true);
        if (leer_tramite === 'S') {
            $("#slt_tramite_0").attr("disabled", true).prop("checked", true);
        } else {
            $("#slt_tramite_1").attr("disabled", true).prop("checked", true);
        }

        $('#btn_modificar_actor').attr("disabled", false);
        $('#btn_eliminar_actor').attr("disabled", false);
        $('#btn_grabar_actor').attr("disabled", true);

    } else {
        $('#btn_modificar_actor').attr("disabled", true);
        $('#btn_eliminar_actor').attr("disabled", true);
        $('#btn_grabar_actor').attr("disabled", true);
    };
}

function desabilitar_despues_de_grabar() {
    $('#txt_actor').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);
    $('#txt_abreviatura').attr("disabled", true);
    $('#txt_responsable').attr("disabled", true);
    $('#txt_codigo').attr("disabled", true);
    $('#txt_seleccione_area_actor').attr("disabled", true);
    $("#slt_tramite_0").attr("disabled", true);
    $("#slt_tramite_1").attr("disabled", true);
    $('#txt_seleccione_area_actor').attr("disabled", true);
    $('#btn_modificar_actor').attr("disabled", true);
    $('#btn_eliminar_cas').attr("disabled", true);
    $('#btn_eliminar_actor').attr("disabled", true);
    $('#btn_grabar_actor').attr("disabled", true);
}

function nuevo_registro_para_grabar() {
    $('#txt_actor').val('').attr("disabled", true);
    $('#txt_abreviatura').val('').attr("disabled", true);
    $('#txt_responsable').val('').attr("disabled", true);
    $('#txt_codigo').val('').attr("disabled", true);
    $('#txt_seleccione_area_actor').val('').attr("disabled", true);
    $('#txt_id_area').val('');
    $("#slt_tramite_0").prop("checked", false).attr("disabled", true);
    $("#slt_tramite_1").prop("checked", false).attr("disabled", true);
    $('#btn_modificar_actor').attr("disabled", true);
    $('#btn_eliminar_actor').attr("disabled", true);
    $('#btn_grabar_actor').attr("disabled", true);
    $('#txt_descripcion').val('').attr("disabled", true);
    $('#txt_actor').val('').attr("disabled", false).focus();


}


function grabar_datos_actor() {
    var etiqueta_espera = $("#espera_grabacion"),
        leer_idactor = $('#txt_actor').val(),
        leer_descripcion = $('#txt_descripcion').val(),
        leer_abreviatura = $('#txt_abreviatura').val(),
        leer_responsable = $('#txt_responsable').val(),
        leer_codigo = $('#txt_codigo').val(),
        leer_id_area_actor = $('#txt_id_area').val(),
        leer_tramite = leer_tipo_tramite,
        ver_datos_grabar = {
            "idactor": leer_idactor,
            "descripcion": leer_descripcion,
            "abreviatura": leer_abreviatura,
            "responsable": leer_responsable,
            "codigo": leer_codigo,
            "idareaactor": leer_id_area_actor,
            "tramite": leer_tramite
        };
    $.ajax({
        data: ver_datos_grabar,
        dataType: 'json',
        url: url + 'tablas/grabar_actor_tramite_tipo_01',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            etiqueta_espera.html('');
            lc_buscar_actor = '';
            listar_actor_tipo_01(lc_buscar_actor);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });


}



function desabilita_para_modificar() {
    $('#txt_actor').attr("disabled", true);
    $('#txt_abreviatura').attr("disabled", false);
    $('#txt_responsable').attr("disabled", false);
    $('#txt_codigo').attr("disabled", false);
    $('#txt_seleccione_area_actor').attr("disabled", false);
    $("#slt_tramite_0").attr("disabled", false);
    $("#slt_tramite_1").attr("disabled", false);
    $('#btn_modificar_actor').attr("disabled", true);
    $('#btn_eliminar_actor').attr("disabled", true);
    $('#btn_grabar_actor').attr("disabled", false);
    $('#txt_descripcion').attr("disabled", false).focus();
}


function grabar_datos_modificado() {
    var etiqueta_espera = $("#espera_grabacion"),
        leer_idactor = $('#txt_actor').val(),
        leer_descripcion = $('#txt_descripcion').val(),
        leer_abreviatura = $('#txt_abreviatura').val(),
        leer_responsable = $('#txt_responsable').val(),
        leer_codigo = $('#txt_codigo').val(),
        leer_id_area_actor = $('#txt_id_area').val(),
        leer_tramite = leer_tipo_tramite,
        ver_datos_grabar = {
            "idactor": leer_idactor,
            "descripcion": leer_descripcion,
            "abreviatura": leer_abreviatura,
            "responsable": leer_responsable,
            "codigo": leer_codigo,
            "idareaactor": leer_id_area_actor,
            "tramite": leer_tramite
        };
    $.ajax({
        data: ver_datos_grabar,
        dataType: 'json',
        url: url + 'tablas/update_actor_tramite_tipo_01',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            etiqueta_espera.html('');
            lc_buscar_actor = '';
            listar_actor_tipo_01(lc_buscar_actor);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

}

function eliminar_registro_actor() {
    var etiqueta_espera = $("#espera_grabacion_eliminar"),
        leer_idactor = $('#txt_actor').val(),
        ver_datos_eliminar = {
            "idactor": leer_idactor
        };
    $.ajax({
        data: ver_datos_eliminar,
        dataType: 'json',
        url: url + 'tablas/delete_actor_tramite_tipo_01',
        type: 'post',
        beforeSend: function() {
            etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(revisar) {
            console.log(revisar);
            if (revisar.registros === -1) {
                etiqueta_espera.html("-- Eliminado -- ").show();
                setInterval(function() {
                    etiqueta_espera.html("-- Eliminado -- ").show().fadeOut("15000");
                }, 10000);

            } else {
                etiqueta_espera.html("-- Actor esta asignado a usuarios, no se elimina -- ").show();
                setInterval(function() {
                    etiqueta_espera.html("<strong>-- Actor esta asignado a usuarios, no se elimina -- </strong>").show().fadeOut("15000");
                }, 10000);
            }
            lc_buscar_actor = '';
            listar_actor_tipo_01(lc_buscar_actor);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });


}

function desabilitar_casilleros() {
    $('#btn_modificar_actor').attr("disabled", true);
    $('#btn_eliminar_actor').attr("disabled", true);
    $('#btn_grabar_actor').attr("disabled", true);
    $('#btn_revisar_codigo').attr("disabled", true);
    $('#msj_revisar_codigo').html("");
    $('#slt_codigos').html("");
    $('#txt_responsable').attr("disabled", true);
    $('#txt_codigo').attr("disabled", true);
    $('#txt_abreviatura').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);
    $('#txt_actor').attr("disabled", true);
    $('#txt_seleccione_area_actor').attr("disabled", true);

}

$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    listar_actor_tipo_01(lc_buscar_actor);
    desabilitar_casilleros();





    $("#txt_buscar_actor")
        .focus()
        .keyup(function() {
            lc_buscar_actor = $("#txt_buscar_actor").val();
            listar_actor_tipo_01(lc_buscar_actor);
        });


    $("#slt_actor_01")
        .click(function() {
            leer_actor_mostrarlo_etiqueta();
        })
        .keyup(function() {
            leer_actor_mostrarlo_etiqueta();
        });

    $("#btn_agregar_actor").click(function() {
        lc_tipo_operacion = '1';
        nuevo_registro_para_grabar();

    });

    $("#btn_modificar_actor").click(function() {
        lc_tipo_operacion = '2';
        desabilita_para_modificar();

    });

    $("#txt_actor").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'tablas/listar_actores_jerarquia_tipo_01',
                dataType: "json",
                data: { actor: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.actor_descripcion,
                                value: item.actor,

                            }
                        } else {
                            $("#txt_id_actor_registrado").val('');
                            return {
                                label: item.mensaje,
                                value: $("#txt_actor").val(),
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_txt_actor").html('-- No existe, proceda...--').fadeIn("fast").fadeOut("slow");
                $("#txt_id_actor_registrado").val('');
                $('#txt_descripcion').val('').attr("disabled", false).focus();

                return false;
            } else {
                $("#txt_actor").val(ui.item.label);
                $("#txt_id_actor_registrado").val(ui.item.value);
                $("#ver_txt_actor").attr("disabled", false).focus();
                return false;
            }
        }
    });
    $("#txt_actor").autocomplete("option", "appendTo", ".mostrarareaactorid");

    $("#txt_actor").keypress(function(e) {
        v_etiqueta = $('#txt_descripcion');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).val('').focus();
        }
    });


    $("#txt_descripcion").keypress(function(e) {
        v_etiqueta = $('#txt_abreviatura');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).val($("#txt_descripcion").val()).focus();
        }
    });

    $("#txt_abreviatura").keypress(function(e) {
        v_etiqueta = $('#txt_responsable');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).val('').focus();
        }
    });



    $("#txt_responsable").keypress(function(e) {
        v_etiqueta = $('#txt_codigo');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).val('').focus();
        }
    });


    $("#txt_codigo").keypress(function(e) {
        v_etiqueta = $('#txt_seleccione_area_actor');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta.attr("disabled", false).val('').focus();
        }
    });

    $("#txt_seleccione_area_actor").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'tablas/listar_actores_jerarquia_tipo_01',
                dataType: "json",
                data: { actor: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.actor_descripcion,
                                value: item.actor,

                            }
                        } else {
                            $("#txt_seleccione_area_actor").val('');
                            $("#txt_id_area").val('');
                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }
                        }
                    }));
                }
            });
        },
        minLength: 2,
        focus: function() { return false; },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_msj_actor").html('-- NO EXISTE--').fadeIn("fast").fadeOut("slow");
                $("#txt_seleccione_area_actor").val('');
                $("#txt_id_area").val('');
                return false;
            } else {
                $("#txt_seleccione_area_actor").val(ui.item.label);
                $("#txt_id_area").val(ui.item.value);
                $("#slt_tramite_0").attr("disabled", false).focus();
                $("#slt_tramite_1").attr("disabled", false);
                return false;
            }
        }
    });
    $("#txt_seleccione_area_actor").autocomplete("option", "appendTo", ".mostrarareaactor");


    $("#slt_tramite_0").click(function() {
        leer_tipo_tramite = 'S';
        $("#btn_grabar_actor").attr("disabled", false).focus();
    });

    $("#slt_tramite_1").click(function() {
        leer_tipo_tramite = 'N';
        $("#btn_grabar_actor").attr("disabled", false).focus();
    });




    $("#btn_grabar_actor").click(function() {
        if (lc_tipo_operacion === '1') {
            grabar_datos_actor();
        } else {
            grabar_datos_modificado();
        };
        desabilitar_despues_de_grabar();
    });


    $("#btn_eliminar_actor").click(function() {
        eliminar_registro_actor();

    });




    $("#txt_codigo").keypress(function() {

        $("#btn_revisar_codigo").attr("disabled", false);
        $("#msj_revisar_codigo").html("");
        $("#slt_codigos").html("");
    });


    $("#btn_revisar_codigo").click(function() {
        var etiqueta_select = $("#slt_codigos"),
            etiqueta_espera = $("#msj_revisar_codigo"),
            lc_codigoactor = $("#txt_codigo").val(),
            ver_datos_codigo = {
                "codigo": lc_codigoactor
            };
        $.ajax({
            data: ver_datos_codigo,
            dataType: 'json',
            url: url + 'tablas/revisar_codigo',
            type: 'post',
            beforeSend: function() {
                etiqueta_espera.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function(encontrados) {
                console.log(encontrados);

                etiqueta_select.html("");
                var nro_registros = encontrados.length;
                if (nro_registros > 0) {

                    encontrados.forEach(function(filas) {
                        etiqueta_espera.html("-- Ya existen : " + nro_registros + " Codigos");
                        if (filas.respuesta === 1) {
                            etiqueta_select.append(
                                '<option id="' + filas.codigo + '"  >' + filas.actor_descripcion + '</option>').attr("disabled", false);
                        } else {
                            etiqueta_select.attr("disabled", false);
                            etiqueta_espera.html(" -- Disponible -- ");
                        }
                    });

                } else {
                    etiqueta_select.html("");
                }


            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error, Revisar consola ');
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown);
            }
        });





    });


});