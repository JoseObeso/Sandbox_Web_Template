var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    tabla, nro_registros = 0,
    datos_en_fila = '',
    lc_cargo_id = '',
    ln_mostrar_cargo = 0;

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function ver_si_existe_fecha_derivado() {
    if ($('#fechainicioderivado').val() == '') {
        $('#fechainicioderivado').val(dia_mes_anio_real_time());
    };
    if ($('#fechafinderivado').val() == '') {
        $('#fechafinderivado').val(dia_mes_anio_real_time());
    };
}


function toggle(source) {
    checkboxes = document.getElementsByName('dinamico');

    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }

}


function mostrar_derivados() {
    ver_si_existe_fecha_derivado();
    var fecha = $('#fechainicioderivado').val(),
        fecha2 = $('#fechafinderivado').val(),
        mostrar_cargo = ln_mostrar_cargo,
        listar_derivados = {
            "fecha": fecha,
            "fecha2": fecha2,
            "mostrar": mostrar_cargo
        };

    $.ajax({
        data: listar_derivados,
        dataType: 'json',
        url: url + 'expediente/recargar_derivados',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_tablas_derivados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#Nro_resultados").html(".. Procesando... ");
        },
        success: function(datos) {
            $('#mostrar_tablas_derivados').html("");
            if (datos[0].estado_respuesta == 1) {
                $('#mostrar_tablas_derivados').html("");
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length;

                    var lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger lista_derivados">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info lista_derivados">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="alert alert-success lista_derivados">';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="alert alert-default lista_derivados">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental"><span class="lbl"></span></label></td>';
                    } else {
                        datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';

                    }


                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td> -- </td>';
                    } else {
                        datos_en_fila += '<td><span class="glyphicon glyphicon-print"></span></td>';

                    }

                    datos_en_fila += '<td>' + datos[key]['numero'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['cargo_id'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['actor_2_descripcion'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';

                    datos_en_fila += '</tr>';
                })
                $('#mostrar_tablas_derivados').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>').show();
            } else {
                nro_registros = 0;
                $('#mostrar_tablas_derivados').html("");
                $("#Nro_resultados").html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>').show();
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
    leer_cargos_generados();
}


function mostrar_derivados_otd() {
    ver_si_existe_fecha_derivado();
    var fecha = $('#fechainicioderivado').val(),
        fecha2 = $('#fechafinderivado').val(),
        mostrar_cargo = ln_mostrar_cargo,
        listar_derivados = {
            "fecha": fecha,
            "fecha2": fecha2,
            "mostrar": mostrar_cargo
        };

    $.ajax({
        data: listar_derivados,
        dataType: 'json',
        url: url + 'expediente/recargar_derivados_otd',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_tablas_derivados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#Nro_resultados").html(".. Procesando... ");
        },
        success: function(datos) {
            $('#mostrar_tablas_derivados').html("");
            if (datos[0].estado_respuesta == 1) {
                $('#mostrar_tablas_derivados').html("");
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length;
                    var lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger lista_derivados">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info lista_derivados">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="alert alert-success lista_derivados">';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="alert alert-default lista_derivados">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental"><span class="lbl"></span></label></td>';
                    } else {
                        datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';

                    }


                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td> -- </td>';
                    } else {
                        datos_en_fila += '<td><span class="glyphicon glyphicon-print"></span></td>';

                    }

                    datos_en_fila += '<td>' + datos[key]['numero'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['cargo_id'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['actor_2_descripcion'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';

                    datos_en_fila += '</tr>';
                })
                $('#mostrar_tablas_derivados').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>').show();
            } else {
                nro_registros = 0;
                $('#mostrar_tablas_derivados').html("");
                $("#Nro_resultados").html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>').show();
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
    leer_cargos_generados();
}


function mostrar_derivados_interno() {

    ver_si_existe_fecha_derivado();
    var fecha = $('#fechainicioderivado').val(),
        fecha2 = $('#fechafinderivado').val(),
        mostrar_cargo = ln_mostrar_cargo,
        listar_derivados = {
            "fecha": fecha,
            "fecha2": fecha2,
            "mostrar": mostrar_cargo
        };

    $.ajax({
        data: listar_derivados,
        dataType: 'json',
        url: url + 'expediente/recargar_derivados_interno',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_tablas_derivados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            $("#Nro_resultados").html(".. Procesando... ");
        },
        success: function(datos) {
            $('#mostrar_tablas_derivados').html("");
            if (datos[0].estado_respuesta == 1) {
                $('#mostrar_tablas_derivados').html("");
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function(key, value) {
                    var ln_tiene_cargo = datos[key]['cargo_id'].length;
                    var lc_estado = datos[key]['estado_cabecera'];
                    switch (lc_estado) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger lista_derivados">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-info lista_derivados">';
                            break;
                        case '2':
                            datos_en_fila += '<tr class="alert alert-success lista_derivados">';
                            break;
                        case '3':
                            datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                            break;
                        case '4':
                            datos_en_fila += '<tr class="alert alert-default lista_derivados">';
                            break;
                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental"><span class="lbl"></span></label></td>';
                    } else {
                        datos_en_fila += '<tr class="alert alert-warning lista_derivados">';
                        datos_en_fila += '<td><label class="px-single"><input type="checkbox" name = "dinamico" value="' + datos[key]['expediente'] + '-' + datos[key]['numero'] + '" class="px cuental" disabled = "disabled"><span class="lbl"></span></label></td>';

                    }


                    datos_en_fila += '<td width="8%">' + datos[key]['expediente_id'] + '</td>';
                    if (ln_tiene_cargo == 0) {
                        datos_en_fila += '<td> -- </td>';
                    } else {
                        datos_en_fila += '<td><span class="glyphicon glyphicon-print"></span></td>';

                    }

                    datos_en_fila += '<td>' + datos[key]['numero'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['asunto'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['fecha'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['cargo_id'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['actor_2_descripcion'] + '</td>';
                    datos_en_fila += '<td>' + datos[key]['observaciones'] + '</td>';

                    datos_en_fila += '</tr>';
                })
                $('#mostrar_tablas_derivados').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>--  Se encontraron : " + nro_registros + ' - Expedientes - </strong>').show();
            } else {
                nro_registros = 0;
                $('#mostrar_tablas_derivados').html("");
                $("#Nro_resultados").html("</strong>--  Se encontraron : " + nro_registros + ' - Expedientes -  </strong>').show();
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
    leer_cargos_generados();

}

function generar_cargo_seleccion() {
    $.ajax({
        dataType: 'json',
        url: url + 'expediente/generar_cargo',
        type: 'post',
        beforeSend: function() {
            $("#Nro_resultados").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(datos) {
            $("#Nro_resultados").html("");
            var lc_cargo_id = datos[0].cargo_id;
            $("#nro_cargo_mostrar").val(lc_cargo_id);
            $("#btn_imprimir_cargo").attr("disabled", false);
            $('#generar_cargo').modal({ show: true, backdrop: 'static' });
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

function grabar_cargo_expediente(lc_expediente, lc_cargo_id, lc_numero) {
    var lc_fecha = dia_mes_anio_real_time(),
        seleccion_dato = { 'expediente': lc_expediente, 'cargo': lc_cargo_id, 'fecha': lc_fecha, 'numero': lc_numero };
    $.ajax({
        data: seleccion_dato,
        dataType: 'json',
        url: url + 'expediente/grabar_cargo_expediente',
        type: 'post',
        beforeSend: function() {},
        success: function() {},
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


function leer_cargos_generados() {
    ver_si_existe_fecha_derivado();
    var lc_select_entidad = $("#slt_ver_cargos"),
        leer_fecha_fin = $('#fechafinderivado').val(),
        seleccion_cargos = { 'fechafin': leer_fecha_fin };

    $.ajax({
        data: seleccion_cargos,
        dataType: 'json',
        url: url + 'expediente/seleccion_cargos_vigente',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            lc_select_entidad
                .html('')
                .show()
                .append('<option id=0> Seleccione cargo </option>');
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.cargo_id + '"  >' + filas.cargo_id + '</option>');
                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true);
                }
            });

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
    lc_select_entidad.select2({
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

function ver_cargo_seleccion(lc_valor) {
    $("#Nro_resultados").html("");
    var lc_cargo_id = lc_valor;
    $("#nro_reimprimir_cargo").val(lc_cargo_id);
    $("#btn_reimprimir_cargo").attr("disabled", false);
    $('#reimprimir_generar_cargo').modal({ show: true, backdrop: 'static' });

}


function actualizar_expedientes_ocurrencia() {
    $.ajax({
        dataType: 'json',
        url: url + 'expediente/actualizar_ocurrencias_expedientes',
        type: 'post',
        beforeSend: function() {
            $("#Nro_resultados").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#Nro_resultados").html("");
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


$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    $("#nombre_del_mes_en_curso").html("<strong>Todo el mes de : " + nombre_del_mes() + "</strong>");
    $("#nombre_del_anio_en_curso").html("<strong>Todo el Año   : " + numero_del_anio() + "</strong>");
    actualizar_expedientes_ocurrencia();
    ln_mostrar_cargo = 0;
    mostrar_derivados();
    $('#fechainicioderivado')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $('#fechafinderivado')
        .datepicker({ format: 'dd/mm/yyyy', endDate: '1d', autoclose: true })
        .on('changeDate', function(e) {});
    $("#btn_busqueda_total").click(function() {
        ln_mostrar_cargo = 0;
        mostrar_derivados();
    });

    $("#mes_transcurrido").click(function() {
        $('#fechainicioderivado').val(primer_dia_mes_anio_real_time());
        $('#fechafinderivado').val(dia_mes_anio_real_time());
        ln_mostrar_cargo = 0;
        mostrar_derivados();
    });

    $("#anio_transcurrido").click(function() {
        $('#fechainicioderivado').val('01/01/' + numero_del_anio());
        $('#fechafinderivado').val(dia_mes_anio_real_time());
        ln_mostrar_cargo = 0;
        mostrar_derivados();
    });



    $("#btn_generar_cargo").click(function() {
        if ($("input:checkbox:checked").length > 0) {
            generar_cargo_seleccion();
        } else {
            mostrar_mensaje_en_modal("alert-info", '<center> -- No selecciono ningun expediente -- </center>');
        }

    });

    $("#btn_imprimir_cargo").click(function() {
        var lc_cargo_id = $("#nro_cargo_mostrar").val(),
            ln_reg = $("input:checkbox:checked").length,
            ln_tiempo = ln_reg * 400;
        $("#mostrar_cantidad_registros").html("<center><strong>Preparando Cargo para : " + ln_reg + "  Expedientes... </strong></center>");
        $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        $("input:checkbox:checked").each(function() {
            var lc_leer_compuesto = $(this).val(),
                lc_expediente = lc_leer_compuesto.substring(0, 11),
                lc_numero = lc_leer_compuesto.substring(12);
            grabar_cargo_expediente(lc_expediente, lc_cargo_id, lc_numero);
        });
        $("#btn_imprimir_cargo").attr("disabled", true);
        setTimeout(function() {
            ln_mostrar_cargo = 0;
            mostrar_derivados();
        }, ln_tiempo - 100);
        setTimeout(function() {
            $("#mostrar_espera_grabacion").html("");
            $("#mostrar_cantidad_registros").html("");
            window.open(url + 'imprimir/cargo_derivado?cargo=' + lc_cargo_id);
            $('#generar_cargo').modal('toggle');
        }, ln_tiempo);
    });


    $("#slt_ver_cargos")
        .click(function() {
            var lc_valor = $('#slt_ver_cargos :selected').attr('id');
            ver_cargo_seleccion(lc_valor)
        })
        .on('change', function() {
            var lc_valor = $('#slt_ver_cargos :selected').attr('id');
            ver_cargo_seleccion(lc_valor)
        })
        .keyup(function() {
            var lc_valor = $('#slt_ver_cargos :selected').attr('id');
            ver_cargo_seleccion(lc_valor)

        });

    $("#btn_reimprimir_cargo").click(function() {
        var lc_cargo_id = $("#nro_reimprimir_cargo").val();
        $("#btn_reimprimir_cargo").attr("disabled", true);
        window.open(url + 'imprimir/cargo_derivado?cargo=' + lc_cargo_id);
        $('#reimprimir_generar_cargo').modal('toggle');

    });

    $("#btn_mostrar_sin_cargo").click(function() {
        ln_mostrar_cargo = 1;
        mostrar_derivados();
    });


    $("#btn_ver_expedientes").click(function() {
        $("#btn_selec:checkbox:checked").removeAttr("checked");
        mostrar_derivados_otd();

    });


    $("#btn_ver_internos").click(function() {
        $("#btn_selec:checkbox:checked").removeAttr("checked");
        mostrar_derivados_interno();
    });




});