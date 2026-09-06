var modulo = '/appmvc',
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = '/public/',
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    ln_indicador = 0,
    galerias_nombres = [],
    lc_nombre_archivo_imagen1, lc_nombre_archivo, datos_en_fila, lc_nombre_archivo_cv, archivo_subir, archivo_subir_bien, archivo_resolucion,
    lc_nombre_archivo_resolucion, gd_fecha_total = new Date(),
    gt_hora_actual = gd_fecha_total.getHours() + ':' + gd_fecha_total.getMinutes() + ':' + gd_fecha_total.getSeconds(),
    URLactual = window.location,
    archivo_pdf, lc_get_oficina,
    lc_archivo_formato = '',
    lc_id_of, lid_oficina,
    ln_year,
    leer_idoficina, leer_idplantrabajo = '0',
    lc_numero_resolucion = '',
    leer_idoficinaplan, lc_tipo_operacion, cadenaNumerica, resultado_numero, lc_fecha_resolucion, lc_descripcion, data_resolucion,
    lc_leer_id_mod, lc_idoficina_mod, lc_fecha_mod, lc_nombre_archivo_resolucion_mod_pdf, lc_nombre_archivo_resolucion_mod, lc_descripcion_mod,
    url_ruta_resoluciones = 'http://' + document.domain + '/transparencia/resoluciones',
    url_ruta_resoluciones_adm = 'http://' + document.domain + '/transparencia/resoluciones-adm',
    url_ruta_resoluciones_personal = 'http://' + document.domain + '/transparencia/resoluciones-personal',
    url_archivo_pdf, lc_id_mod, lc_id_of_mod, lc_oficina_mod;

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}


function ver_si_existe_fecha() {
    if ($('#FechaPrensa').val() == '') {
        $('#FechaPrensa').val(dia_mes_anio_real_time());
    }
}


function lista_resolucion() {
    var lc_buscar_nro_resolucion = $("#buscar_nro_resolucion").val(),
        lc_anio = $("#anio").val(),
        lc_mes = $("#mes").val(),
        data_resol = { 'nro': lc_buscar_nro_resolucion, 'anio': lc_anio, 'mes': lc_mes };
    $.ajax({
        data: data_resol,
        dataType: 'json',
        url: url + 'resolucion/mostrar_resolucion',
        type: 'post',
        beforeSend: function() {
            $('#tblResolucion tbody').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila = '';
                    for (var i = 0; i < data.length; i++) {
                        switch (data[i].unidad) {
                            case 'DE':
                                url_archivo_pdf = url_ruta_resoluciones;
                                break;
                            case 'OA':
                                url_archivo_pdf = url_ruta_resoluciones_adm;
                                break;
                            case 'UP':
                                url_archivo_pdf = url_ruta_resoluciones_personal;
                                break;
                            default:
                                break;
                        }

                        datos_en_fila += '<tr>';
                        datos_en_fila += '<td>' + (i + 1) + '</td>';
                        datos_en_fila += '<td>' + (data[i].fecha_dmy) + '</td>';
                        datos_en_fila += '<td>' + (data[i].nombre) + '</td>';
                        datos_en_fila += '<td>' + (data[i].descripcion) + '</td>';
                        datos_en_fila += '<td>' + (data[i].oficina) + '</td>';
                        datos_en_fila += '<td><a href = "' + (url_archivo_pdf + '/' + data[i].anio + '/' + data[i].url) + '" target = _black </a> ' + data[i].url + '</td>';
                        datos_en_fila += '<td><button type="button" name="editar" id="' + data[i].resolucion + '*' + data[i].idoficina + '*' + data[i].oficina + '" class="btn btn-primary  btn_editar  crear-tooltip" data-toggle="tooltip" data-original-title="Editar" data-toggle="tooltip">M</button></td>';
                        datos_en_fila += '<td><button type="button" name="eliminar" id="' + data[i].resolucion + '*' + data[i].nombre + '" class="btn btn-danger  btn_eliminar  crear-tooltip" data-toggle="tooltip" data-original-title="Eliminar" data-toggle="tooltip">X</button></td>';
                        datos_en_fila += '</tr>';
                    }
                    $('#tblResolucion tbody').html(datos_en_fila);
                    $('#Nro_resultados').html("Se ubicaron " + data.length + " -- Resoluciones -- ");
                }
            } else {
                $('#tblResolucion tbody').html("<center><strong>...No existe registros ... </strong></center>");
                $('#Nro_resultados').html(" ... No existen registros ....");
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


function lista_plan_trabajo() {
    var lc_buscar_nro_resolucion = $("#buscar_nro_resolucion").val(),
        lc_anio = $("#anio").val(),
        lc_mes = $("#mes").val(),
        data_resol = { 'nro': lc_buscar_nro_resolucion, 'anio': lc_anio, 'mes': lc_mes };

    $.ajax({
        data: data_resol,
        dataType: 'json',
        url: url + 'resolucion/mostrar_plan_trabajo',
        type: 'post',
        beforeSend: function() {
            $('#Table_PlanTrabajo tbody').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila_pt = '';
                    for (var i = 0; i < data.length; i++) {
                        datos_en_fila_pt += '<tr>';
                        datos_en_fila_pt += '<td width="5%">' + (i + 1) + '</td>';
                        datos_en_fila_pt += '<td width="5%">' + (data[i].fecha_dmy) + '</td>';
                        //      datos_en_fila_pt += '<td>' + (data[i].oficina) + '</td>';
                        datos_en_fila_pt += '<td  width="3%">' + (data[i].oficina_descripcion) + '</td>';
                        datos_en_fila_pt += '<td width="5%">' + (data[i].descripcion) + '</td>';
                        datos_en_fila_pt += '<td width="5%"><a href = "' + (url_archivo_pdf + '/' + data[i].anio + '/' + data[i].url) + '" target = _black </a> ' + data[i].url + '</td>';
                        datos_en_fila_pt += '<td width="5%"><button type="button" name="editar_pl" id="' + data[i].plan_trabajo + '*' + data[i].oficina + '*' + data[i].descripcion + '" class="btn btn-primary  btn_editar_pl  crear-tooltip" data-toggle="tooltip" data-original-title="Editar" data-toggle="tooltip">M</button></td>';
                        datos_en_fila_pt += '<td width="5%"><button type="button" name="btn_eliminar_pl" id="' + data[i].plan_trabajo + '" class="btn btn-danger  btn_eliminar_pl  crear-tooltip" data-toggle="tooltip" data-original-title="Eliminar" data-toggle="tooltip">X</button></td>';
                        datos_en_fila_pt += '</tr>';

                    }
                    $('#Table_PlanTrabajo tbody').html(datos_en_fila_pt);

                }
            } else {
                $('#Table_PlanTrabajo tbody').html("<center><strong>...No existe registros ... </strong></center>");

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


function limpiar_filtros_busqueda() {
    $("#buscar_nro_resolucion").val('');
    $("#anio").val(numero_del_anio());
    lista_resolucion();

}

function inicializar() {
    $("#mostrarPlan").hide();
    $("#slc_oficina").val(0).attr("disabled", false);
    $("#fecha_resolucion").val('').attr("disabled", true);
    $("#descripcion").val('').attr("disabled", true);
    $("#idPlanTrabajo").val(0).attr("disabled", true);
    $("#NombrePlan").val('').attr("disabled", true);
    $("#OficinaPlan").attr("disabled", true);
    $("#subir_archivo_resolucion").attr("disabled", true);
    $("#btn_grabar_resolucion").attr("disabled", true);

}


function ubicaroficina() {
    $.ajax({
        dataType: 'json',
        url: url + 'resolucion/Oficinas',
        type: 'post',
        beforeSend: function() {
            $("#txt_titulo_resolucion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#txt_titulo_resolucion").html("");
            $("#OficinaPlan").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        $("#OficinaPlan").append('<option id="' + filas.oficina + '"  >' + filas.nombre + '</option>');
                        $("#OficinaPlan").attr("disabled", false);
                    } else {
                        $("#OficinaPlan").html("");
                        $("#OficinaPlan").attr("disabled", true);
                    }
                });
            } else {
                $("#OficinaPlan").html("");
                $("#OficinaPlan").attr("disabled", true);
            }
        }
    });
}


function ubicaroficinaMod() {
    $.ajax({
        dataType: 'json',
        url: url + 'resolucion/Oficinas',
        type: 'post',
        beforeSend: function() {
            $("#txt_titulo_resolucion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#txt_titulo_resolucion").html("");
            $("#OficinaPlan_mod").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        $("#OficinaPlan_mod").append('<option id="' + filas.oficina + '"  >' + filas.nombre + '</option>');
                        $("#OficinaPlan_mod").attr("disabled", false);
                    } else {
                        $("#OficinaPlan_mod").html("");
                        $("#OficinaPlan_mod").attr("disabled", true);
                    }
                });
            } else {
                $("#OficinaPlan_mod").html("");
                $("#OficinaPlan_mod").attr("disabled", true);
            }
        }
    });
}


$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    inicializar();
    lista_resolucion();
    lista_plan_trabajo();
    ubicaroficina();

    $("#btn_busqueda_total").click(function() {
        lista_resolucion();
        lista_plan_trabajo();
    });
    $("#btn_limpiar").click(function() {
        limpiar_filtros_busqueda();
    });

    $("#btn_nuevo").click(function() {
        $("#id_resolucion").val(0);
        $("#slc_oficina").val(0).attr("disabled", false);
        $("#fecha_resolucion").val(dia_mes_anio_real_time()).attr("disabled", true);
        $("#txt_titulo_resolucion").html("<strong><center> Registro de Nueva Resolucion  </center> </strong>");
        $("#archivo_resol_pdf").html("");
        $("#descripcion").val('').attr("disabled", true);
        $("#idPlanTrabajo").val(0).attr("disabled", true);
        $("#numeroresolucion").val('').attr("disabled", true);
        $("#NombrePlan").val('').attr("disabled", true);
        $("#OficinaPlan").attr("disabled", true);
        $("#subir_archivo_resolucion").val("").attr("disabled", true);
        $("#btn_grabar_resolucion").attr("disabled", true);
        $("#nombre_archivo").val("");
        $("#msj_subida_resolucion").html("");
        $('#nuevo-modificar-resolucion').modal({ show: true, backdrop: 'static' });
    });

    $("#slc_oficina").change(function() {
        leer_idoficina = $('#slc_oficina option:selected').attr('id');
        switch (leer_idoficina) {
            case '1':
                $("#txt_titulo_resolucion").html("<strong><center> --- Direccion Ejecutiva --- </center> </strong>");
                $("#fecha_resolucion").val(dia_mes_anio_real_time()).attr("disabled", false);
                break;
            case '3':
                $("#txt_titulo_resolucion").html("<strong><center> --- Oficina Administracion --- </center> </strong>");
                $("#fecha_resolucion").val(dia_mes_anio_real_time()).attr("disabled", false);
                break;
            case '11':
                $("#txt_titulo_resolucion").html("<strong><center> --- Unidad de Personal --- </center> </strong>");
                $("#fecha_resolucion").val(dia_mes_anio_real_time()).attr("disabled", false);
                break;

            default:
                $("#txt_titulo_resolucion").html("<strong><center> --- No Selecciono --- </center> </strong>");
                $("#fecha_resolucion").val(dia_mes_anio_real_time()).attr("disabled", true);
                break;
        }
    });
    $('#fecha_resolucion')
        .datepicker({ format: 'dd/mm/yyyy', autoclose: true })
        .on('changeDate', function(e) {})
        .click(function() {
            $("#numeroresolucion").attr("disabled", false).focus();
            $("#idPlanTrabajo").val(0).attr("disabled", false);
        })
        .change(function() {
            $("#numeroresolucion").attr("disabled", false).focus();
            $("#idPlanTrabajo").val(0).attr("disabled", false);
        });

    $("#numeroresolucion").keypress(function() {
        $("#descripcion").attr("disabled", false);
        $("#idPlanTrabajo").attr("disabled", false);

    });



    $("#idPlanTrabajo").change(function() {
        leer_idplantrabajo = $('#idPlanTrabajo option:selected').attr('id');
        if (leer_idplantrabajo == '1') {
            $("#mostrarPlan").fadeIn("slow");
            $("#NombrePlan").val('').attr("disabled", false);
            $("#OficinaPlan").val(0).attr("disabled", false);
            $("#subir_archivo_resolucion").val("").attr("disabled", true);
        } else {
            $("#mostrarPlan").fadeOut("slow");
            $("#NombrePlan").val('').attr("disabled", true);
            $("#OficinaPlan").val(0).attr("disabled", true);
            $("#subir_archivo_resolucion").val("").attr("disabled", false);
        }
    });

    $("#NombrePlan")
        .click(function() {
            $("#OficinaPlan").val(0).attr("disabled", false);
        })
        .keypress(function() {
            $("#OficinaPlan").val(0).attr("disabled", false);

        });

    $("#OficinaPlan").change(function() {
        leer_idoficinaplan = $('#OficinaPlan option:selected').attr('id');
        $("#subir_archivo_resolucion").val("").attr("disabled", false);


    });


    $("#subir_archivo_resolucion").change(function() {
        leer_idoficina = $('#slc_oficina option:selected').attr('id');
        leer_numero = $("#numeroresolucion").val();
        var lc_anio = $('#fecha_resolucion').val().substring(6);
        archivo_subir = this.files[0],
            lc_nombre_archivo_resolucion = archivo_subir["name"],
            etiqueta_dom_txt = 'subir_archivo_resolucion', etiqueta_dom = $("#subir_archivo_resolucion"), msj_dom = $("#msj_subida_resolucion");
        if (archivo_subir["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir["size"] > 50000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 50 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir);
            data_form.append('anio', lc_anio);
            data_form.append('oficina', leer_idoficina);
            data_form.append('numero', leer_numero);
            $.ajax({
                dataType: 'json',
                url: url + 'resolucion/subir_resolucion',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function() {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function(datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- Archivo Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_resolucion").attr("disabled", false);
                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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
    });



    $("#btn_grabar_resolucion").click(function() {
        lc_numero_resolucion = $("#numeroresolucion").val();
        cadenaNumerica = '000';
        var resultado_numero = cadenaNumerica + lc_numero_resolucion;
        resultado_numero = resultado_numero.substring(resultado_numero.length - cadenaNumerica.length);
        ln_year = $('#fecha_resolucion').val().slice(-4);
        switch (leer_idoficina) {
            case '1':
                lc_archivo_formato = '-DE-HJATCH'; // Direccion Ejecutiva
                break;
            case '3':
                lc_archivo_formato = '-OA-HJATCH'; // Oficina de Administración
                break;
            case '11':
                lc_archivo_formato = '-UP-HJATCH'; // Unidad de Personal
                break;
            default:
                break;
        }
        archivo_pdf = resultado_numero + '-' + ln_year + lc_archivo_formato + '.pdf';
        solo_nombre_archivo = resultado_numero + '-' + ln_year + lc_archivo_formato;
        lc_fecha_resolucion = $('#fecha_resolucion').val();
        lc_descripcion = $("#descripcion").val();
        data_resolucion = {
            'tipo': '0',
            'idoficina': leer_idoficina,
            'fecha': lc_fecha_resolucion,
            'descripcion': lc_descripcion,
            'archivo_pdf': archivo_pdf,
            'nombre': solo_nombre_archivo
        };

        switch (leer_idplantrabajo) {
            case '1':
                // resolucion
                $.ajax({
                    data: data_resolucion,
                    dataType: 'json',
                    url: url + 'resolucion/grabar_resolucion',
                    type: 'post',
                    beforeSend: function() {
                        $('#msj_subida_resolucion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                    },
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

                // plan de trabajo
                var leer_idoficinaplan = $('#OficinaPlan option:selected').attr('id'),
                    lc_NombrePlan = $("#NombrePlan").val(),
                    data_plan = { 'idofiplan': leer_idoficinaplan, 'nombreplan': lc_NombrePlan, 'archivo_pdf': archivo_pdf, 'fecha': lc_fecha_resolucion, 'idoficina': leer_idoficina, };
                $.ajax({
                    data: data_plan,
                    dataType: 'json',
                    url: url + 'resolucion/grabar_plan_trabajo',
                    type: 'post',
                    beforeSend: function() {
                        $('#msj_subida_resolucion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                    },
                    success: function() {

                        $("#btn_grabar_resolucion").attr("disabled", true);
                        $('#msj_subida_resolucion').html("");
                        $('#nuevo-modificar-resolucion').modal('toggle');
                        lista_resolucion();
                        lista_plan_trabajo();


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

                break;

            case '2':
                $.ajax({
                    data: data_resolucion,
                    dataType: 'json',
                    url: url + 'resolucion/grabar_resolucion',
                    type: 'post',
                    beforeSend: function() {
                        $('#msj_subida_resolucion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                    },
                    success: function() {
                        $('#nuevo-modificar-resolucion').modal('toggle');
                        $("#btn_grabar_resolucion").attr("disabled", true);
                        $('#msj_subida_resolucion').html("");
                        lista_resolucion();
                        lista_plan_trabajo();

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

                break;

            default:
                alert("Seleccione si tiene Plan de Trabajo");
                break;
        }

    });

    $(document).on('click', '.btn_editar', function() {
        var lc_leer_id = $(this).attr("id"),
            arrayDeCadenas = lc_leer_id.split('*'),
            lc_id_mod = arrayDeCadenas[0],
            lc_id_of_mod = arrayDeCadenas[1],
            lc_oficina_mod = arrayDeCadenas[2],
            data_get = { 'id': lc_id_mod };

        $.ajax({
            data: data_get,
            dataType: 'json',
            url: url + 'resolucion/get_data_resolucion',
            type: 'post',
            beforeSend: function() {
                $('#msj_subida_resolucion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function(data) {
                if (data[0].respuesta == 1) {
                    $("#txt_titulo_resolucion_mod").html("<strong><center> Editar Resolucion  </center> </strong>");
                    $("#id_resolucion_mod").val(lc_id_mod);
                    $("#id_oficina_mod").val(data[0].oficina);
                    $("#slc_oficina_mod").attr("disabled", true);
                    $('#fecha_resolucion_mod').val(data[0].fecha_dmy).attr("disabled", true);
                    $("#numeroresolucion_mod").val(data[0].nombre.substr(0, 3)).attr("disabled", true);
                    $("#descripcion_mod").val(data[0].descripcion).attr("disabled", false);
                    $("#archivo_resol_pdf_mod").html(data[0].url);
                    $("#nombre_archivo_mod").val(data[0].nombre);
                    $("#subir_archivo_resolucion_mod").val("").attr("disabled", true);;
                    $("#msj_subida_resolucion_mod").html("");
                    $("#btn_grabar_resolucion_mod").attr("disabled", false);
                    $("#oficina_mod").html(lc_oficina_mod);
                    lc_leer_id_mod = lc_leer_id;
                    lc_idoficina_mod = data[0].oficina;
                    lc_fecha_mod = data[0].fecha_dmy;
                    lc_nombre_archivo_resolucion_mod_pdf = data[0].url;
                    lc_nombre_archivo_resolucion_mod = data[0].nombre;
                    lc_descripcion_mod = data[0].descripcion;
                    $('#modificar-resolucion').modal({ show: true, backdrop: 'static' });
                } else {
                    mostrar_mensaje_en_modal("alert-danger", '<center> -- NO EXISTE DATOS DE LA RESOLUCION / INTENTE DE NUEVO -- </center>');
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

    // btn_eliminar_pl
    $(document).on('click', '.btn_eliminar', function() {
        var lc_leer_id = $(this).attr("id"),
            arrayDeCadenas = lc_leer_id.split('*'),
            lc_get_id = arrayDeCadenas[0],
            lc_get_archivopdf = arrayDeCadenas[1] + '.pdf';
        $('#id').val(lc_get_id);
        $('#resolucion_pdf').val(lc_get_archivopdf);
        $('#si_eliminar_resolucion').attr("disabled", false);
        $('#confirmar_eliminar_resolucion').modal({ show: true, backdrop: 'static' });
    });



    $("#si_eliminar_resolucion").click(function() {
        var lc_get_id = $('#id').val(),
            lc_get_archivopdf = $('#resolucion_pdf').val(),
            data_elim = { 'id': lc_get_id, 'archivoPDF': lc_get_archivopdf };
        $.ajax({
            data: data_elim,
            dataType: 'json',
            url: url + 'resolucion/eliminar_resolucion',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#si_eliminar_resolucion").attr("disabled", true);
                setTimeout(function() {
                    $("#msj_imagen").html("");
                    inicializar();
                    lista_resolucion();
                    lista_plan_trabajo();
                    ubicaroficina();
                    $('#confirmar_eliminar_resolucion').modal("toggle");
                }, 800);
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


    $(document).on('click', '.btn_eliminar_pl', function() {
        var lc_leer_id = $(this).attr("id");
        $('#id').val(lc_leer_id);
        $('#si_eliminar_plan_trabajo').attr("disabled", false);
        $('#eliminar_plan_trabajo').modal({ show: true, backdrop: 'static' });

    });

    $("#si_eliminar_plan_trabajo").click(function() {
        var lc_get_id = $('#id').val(),
            data_elim_pl = { 'id': lc_get_id };
        $.ajax({
            data: data_elim_pl,
            dataType: 'json',
            url: url + 'resolucion/eliminar_plan_trabajo',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#si_eliminar_plan_trabajo").attr("disabled", true);
                setTimeout(function() {
                    $("#msj_imagen").html("");
                    inicializar();
                    lista_resolucion();
                    lista_plan_trabajo();
                    ubicaroficina();
                    $('#eliminar_plan_trabajo').modal("toggle");
                }, 300);
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


    $(document).on('click', '.btn_editar_pl', function() {
        var lc_leer_id = $(this).attr("id"),
            arrayDeCadenas = lc_leer_id.split('*'),
            lc_id_pl = arrayDeCadenas[0],
            lc_id_of = arrayDeCadenas[1],
            lc_descripcion_pl = arrayDeCadenas[2];
        $("#id_plan_trabajo").val(lc_id_pl);
        $("#id_oficina").val(lc_id_of);
        lid_oficina = lc_id_of;
        $("#NombrePlan_mod").val(lc_descripcion_pl);
        ubicaroficinaMod();
        $("#txt_titulo_pl").html("<strong><center> Modificar Plan de Trabajo  </center> </strong>");
        $('#btn_grabar_pl').attr("disabled", false);
        $('#modificar-plan_trabajo').modal({ show: true, backdrop: 'static' });

    });

    $("#OficinaPlan_mod").change(function() {
        lid_oficina = $('#OficinaPlan_mod option:selected').attr('id');



    });

    $("#btn_grabar_pl").click(function() {
        var lc_get_pl = $('#id_plan_trabajo').val(),
            lc_descrip = $("#NombrePlan_mod").val(),
            data_update_pl = { 'id': lc_get_pl, 'idoficina': lid_oficina, 'descrip': lc_descrip };
        $.ajax({
            data: data_update_pl,
            dataType: 'json',
            url: url + 'resolucion/update_plan_trabajo',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {

                $("#btn_grabar_pl").attr("disabled", true);

                setTimeout(function() {
                    $("#msj_imagen").html("");
                    inicializar();
                    lista_resolucion();
                    lista_plan_trabajo();
                    ubicaroficina();
                    $('#modificar-plan_trabajo').modal("toggle");
                }, 300);
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

    $("#OficinaPlan_mod").change(function() {
        lc_idoficina_mod = $('#OficinaPlan_mod option:selected').attr('id');
    });


    $("#subir_archivo_resolucion_mod").change(function() {
        leer_idoficina = lc_idoficina_mod;
        leer_numero = $("#numeroresolucion_mod").val();
        var lc_anio = $('#fecha_resolucion_mod').val().substring(6);

        lc_numero_resolucion = $("#numeroresolucion_mod").val();
        cadenaNumerica = '000';
        var resultado_numero = cadenaNumerica + lc_numero_resolucion;
        resultado_numero = resultado_numero.substring(resultado_numero.length - cadenaNumerica.length);
        ln_year = $('#fecha_resolucion_mod').val().slice(-4);
        switch (leer_idoficina) {
            case '1':
                lc_archivo_formato = '-DE-HJATCH'; // Direccion Ejecutiva
                break;
            case '3':
                lc_archivo_formato = '-OA-HJATCH'; // Oficina de Administración
                break;
            case '11':
                lc_archivo_formato = '-UP-HJATCH'; // Unidad de Personal
                break;
            default:
                break;
        }
        lc_nombre_archivo_resolucion_mod_pdf = resultado_numero + '-' + ln_year + lc_archivo_formato + '.pdf';
        lc_nombre_archivo_resolucion_mod = resultado_numero + '-' + ln_year + lc_archivo_formato;

        archivo_subir = this.files[0],
            lc_nombre_archivo_resolucion_mod = archivo_subir["name"],
            etiqueta_dom_txt = 'subir_archivo_resolucion_mod', etiqueta_dom = $("#subir_archivo_resolucion_mod"), msj_dom = $("#msj_subida_resolucion_mod");
        if (archivo_subir["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir["size"] > 50000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 20 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir);
            data_form.append('anio', lc_anio);
            data_form.append('oficina', leer_idoficina);
            data_form.append('numero', leer_numero);
            $.ajax({
                dataType: 'json',
                url: url + 'resolucion/subir_resolucion_mod',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function() {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function(datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- Archivo Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_resolucion").attr("disabled", false);
                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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
    });





    $("#btn_grabar_resolucion_mod").click(function() {
        lc_fecha_mod = $("#fecha_resolucion_mod").val();
        lc_leer_id_mod = $("#id_resolucion_mod").val();
        lc_descripcion_mod = $("#descripcion_mod").val();
        data_mod_resol = {
            'id': lc_leer_id_mod,
            'descripcion': lc_descripcion_mod
        }



        $.ajax({
            data: data_mod_resol,
            dataType: 'json',
            url: url + 'resolucion/update_resolucion',
            type: 'post',
            beforeSend: function() {
                $('#msj_subida_resolucion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#btn_grabar_resolucion_mod").attr("disabled", true);
                inicializar();
                lista_resolucion();
                lista_plan_trabajo();
                ubicaroficina();
                $('#modificar-resolucion').modal("toggle");


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