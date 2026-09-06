var modulo = "/appmvc", url = 'http://' + document.domain + modulo + '/acceso/', publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    url_ruta_archivos = 'http://' + document.domain + '/transparencia/personal/autoridades/',
    datos_en_fila, lc_nombre_archivo_cv, lc_nombre_archivo_nepotismo, lc_nombre_archivo_bienes, lc_nombre_archivo_intereses, lc_leer_idautoridad, archivo_subir, archivo_subir_bien, imagen;

function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function listar_autoridades() {
    $.ajax({
        dataType: 'json',
        url: url + 'autoridades/lista_autoridades',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function (datos) {
            $('#mostrar-datos-busqueda').html("");
            if (datos[0].respuesta == 1) {
                nro_registros = datos.length;
                datos_en_fila = '';
                $.each(datos, function (key, value) {
                    datos_en_fila += '<tr class = "alert-info">';
                    datos_en_fila += '<td width="1%">' + datos[key]['autoridad'] + '</td>';
                    datos_en_fila += '<td width="25%">' + datos[key]['cargo'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td width="35%"><a href="' + url_ruta_archivos + datos[key]['curriculum'] + '">' + datos[key]['curriculum'] + '</a></td>';
                    datos_en_fila += '<td width="35%"><a href="' + url_ruta_archivos + datos[key]['nepotismo'] + '">' + datos[key]['nepotismo'] + '</a></td>';
                    datos_en_fila += '<td width="35%"><a href="' + url_ruta_archivos + datos[key]['bienes'] + '">' + datos[key]['bienes'] + '</a></td>';
                    datos_en_fila += '<td width="35%"><a href="' + url_ruta_archivos + datos[key]['intereses'] + '">' + datos[key]['intereses'] + '</a></td>';
                    datos_en_fila += '<td><button type="button" name="editar" id="' + datos[key].autoridad + '" cargo="' + datos[key].cargo + '" nombre="' + datos[key].nombre + '" curriculum="' + datos[key].curriculum
                        + '" nepotismo="' + datos[key].nepotismo + '" bienes="' + datos[key].bienes + '" intereses="' + datos[key].intereses +
                        '" class="btn btn-success  btn_editar crear-tooltip" data-toggle="tooltip" data-original-title="Ver/Editar"><i class="fa fa-pencil"></i></button>';
                    datos_en_fila += '<button type="button" name="eliminar" id="' + datos[key].autoridad + '" cargo="' + datos[key].cargo + '" nombre="' + datos[key].nombre + '" curriculum="' + datos[key].curriculum
                        + '" nepotismo="' + datos[key].nepotismo + '" bienes="' + datos[key].bienes + '" intereses="' + datos[key].intereses +
                        '" class="btn btn-danger  btn_eliminar crear-tooltip" data-toggle="tooltip">X</button>';
                    datos_en_fila += '</tr>';
                });
                $('#mostrar-datos-busqueda').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>Total de Cargos: " + nro_registros + '</strong>');
            } else {
                nro_registros = 0;
                $('#mostrar-datos-busqueda').html("");
                $("#Nro_resultados").html("<strong>Total de Cargos: " + nro_registros + '</strong>');
            }
        }
    });
}

$(document).ready(function () {
    $('.crear-tooltip').tooltip();
    listar_autoridades();
    $("#txt_titulo_autoridad").html("<strong> EDITAR AUTORIDAD </strong>");
    $(document).on('click', '.btn_editar', function () {
        lc_leer_idautoridad = $(this).attr("id"),
            lc_cargo = $(this).attr("cargo"),
            lc_nombre = $(this).attr("nombre"),
            lc_nombre_archivo_cv = $(this).attr("curriculum"),
            lc_nombre_archivo_nepotismo = $(this).attr("nepotismo"),
            lc_nombre_archivo_bienes = $(this).attr("bienes"),
            lc_nombre_archivo_intereses = $(this).attr("intereses");
        $("#id_autoridad").val(lc_leer_idautoridad);
        $("#txt_curriculum").val("");
        $("#txt_nepotismo").val("");
        $("#txt_bienes").val("");
        $("#txt_intereses").val("");
        $("#txt_cargo").val(lc_cargo);
        $("#txt_nombre").val(lc_nombre);
        $("#archivo_cv").html("<strong>" + lc_nombre_archivo_cv + "</strong>");
        $("#nepotismo-pdf").html("<strong>" + lc_nombre_archivo_nepotismo + "</strong>");
        $("#bienes-rentas-pdf").html("<strong>" + lc_nombre_archivo_bienes + "</strong>");
        $("#dj-intereses-pdf").html("<strong>" + lc_nombre_archivo_intereses + "</strong>");
        $("#msj_subida_cv").html("");
        $("#msj_subida_nepotismo").html("");
        $("#msj_subida_bienes").html("");
        $("#msj_subida_intereses").html("");
        $("#btn_grabar_autoridad").attr("disabled", false);
        $('#modificar_autoridad').modal({ show: true, backdrop: 'static' });
    });

    $("#txt_curriculum").change(function () {
        imagen = this.files[0],
            lc_nombre_archivo_cv = imagen["name"];
        if (imagen["type"] != "application/pdf") {
            $("#txt_curriculum").val("");
            $("#msj_subida_cv").html("<center><strong><font color='red'> --- CV debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (imagen["size"] > 2000000) {
            $("#txt_curriculum").val("");
            $("#msj_subida_cv").html("<center><strong><font color='red'> --- Tamaño Maximo del CV es 2 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data = new FormData();
            data.append('txt_curriculum', imagen);
            $.ajax({
                dataType: 'json',
                url: url + 'autoridades/subir_cv',
                type: 'post',
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    $("#msj_subida_cv").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function (datos) {
                    if (datos == "1") {
                        $("#msj_subida_cv").html("<center><strong><font color='green'> --- CV Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_autoridad").attr("disabled", false);
                    }
                    else {
                        $("#msj_subida_cv").html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                    }
                }
            });
        }
    });

    $("#txt_nepotismo").change(function () {
        archivo_subir = this.files[0],
            lc_nombre_archivo_nepotismo = archivo_subir["name"],
            etiqueta_dom_txt = 'txt_nepotismo', etiqueta_dom = $("#txt_nepotismo"), msj_dom = $("#msj_subida_nepotismo");
        if (archivo_subir["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir["size"] > 2000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 2 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir);
            $.ajax({
                dataType: 'json',
                url: url + 'autoridades/subir_nepotismo',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function (datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- Nepotismo Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_autoridad").attr("disabled", false);
                    }
                    else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
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


    $("#txt_bienes").change(function () {
        archivo_subir_bien = this.files[0],
            lc_nombre_archivo_bienes = archivo_subir_bien["name"],
            etiqueta_dom_txt = 'txt_bienes', etiqueta_dom = $("#txt_bienes"), msj_dom = $("#msj_subida_bienes");
        if (archivo_subir_bien["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir_bien["size"] > 2000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 2 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir_bien);
            $.ajax({
                dataType: 'json',
                url: url + 'autoridades/subir_bienes',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function (datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- Bienes y Rentas Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_autoridad").attr("disabled", false);
                    }
                    else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
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

    $("#txt_intereses").change(function () {
        archivo_subir_interes = this.files[0],
            lc_nombre_archivo_intereses = archivo_subir_interes["name"],
            etiqueta_dom_txt = 'txt_intereses', etiqueta_dom = $("#txt_intereses"), msj_dom = $("#msj_subida_intereses");
        if (archivo_subir_interes["type"] != "application/pdf") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
        } else if (archivo_subir_interes["size"] > 2000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 2 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir_interes);
            $.ajax({
                dataType: 'json',
                url: url + 'autoridades/subir_intereses',
                type: 'post',
                data: data_form,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                },
                success: function (datos) {
                    if (datos == "1") {
                        msj_dom.html("<center><strong><font color='green'> --- DJ Intereses Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_autoridad").attr("disabled", false);
                    }
                    else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
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

    $("#btn_grabar_autoridad").click(function () {
        var lc_cargo = $("#txt_cargo").val(), lc_nombre = $("#txt_nombre").val(), lc_leer_idautoridad = $("#id_autoridad").val(),
            datos_autoridad = {
                'id': lc_leer_idautoridad, 'cargo': lc_cargo, 'nombre': lc_nombre, 'cv': lc_nombre_archivo_cv, 'nepotismo': lc_nombre_archivo_nepotismo,
                'bienes': lc_nombre_archivo_bienes, 'intereses': lc_nombre_archivo_intereses
            }
        $.ajax({
            data: datos_autoridad,
            dataType: 'json',
            url: url + 'autoridades/grabar_autoridades',
            type: 'post',
            beforeSend: function () {
                $("#txt_titulo_autoridad").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function (datos) {
                $("#txt_titulo_autoridad").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setTimeout(function () {
                    $("#txt_titulo_autoridad").html("<center>EDITAR AUTORIDAD</center>");
                    $("#btn_grabar_autoridad").attr("disabled", true);
                    listar_autoridades();
                    $('#modificar_autoridad').modal('toggle');
                }, 800);
            },
            error: function (jqXHR, textStatus, errorThrown) {
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

    $(document).on('click', '.btn_eliminar', function () {
        lc_leer_idautoridad = $(this).attr("id"),
            lc_cargo = $(this).attr("cargo"),
            lc_nombre = $(this).attr("nombre"),
            lc_nombre_archivo_cv = $(this).attr("curriculum"),
            lc_nombre_archivo_nepotismo = $(this).attr("nepotismo"),
            lc_nombre_archivo_bienes = $(this).attr("bienes"),
            lc_nombre_archivo_intereses = $(this).attr("intereses");
        $("#id_autoridad_eliminar").val(lc_leer_idautoridad);

        if (lc_nombre_archivo_cv.length > 0) {
            $("#chk_cv").prop("checked", true);
            $("#chk_cv").attr("disabled", false);
            $("#archivo_cvt").html("<strong>" + lc_nombre_archivo_cv + "</strong>");

        } else {
            $("#chk_cv").prop("checked", false);
            $("#chk_cv").attr("disabled", true);
            $("#archivo_cvt").html("<strong> -- (NO EXISTE ADJUNTO) -- </strong>");
        }


        if (lc_nombre_archivo_nepotismo.length > 0) {
            $("#chk_nepotismo").prop("checked", true);
            $("#chk_nepotismo").attr("disabled", false);
            $("#archivo_nepotismo").html("<strong>" + lc_nombre_archivo_nepotismo + "</strong>");

        } else {
            $("#chk_nepotismo").prop("checked", false);
            $("#chk_nepotismo").attr("disabled", true);
            $("#archivo_nepotismo").html("<strong> -- (NO EXISTE ADJUNTO) -- </strong>");
        }


        if (lc_nombre_archivo_bienes.length > 0) {
            $("#chk_bienes").prop("checked", true);
            $("#chk_bienes").attr("disabled", false);
            $("#archivo_bienes").html("<strong>" + lc_nombre_archivo_bienes + "</strong>");

        } else {
            $("#chk_bienes").prop("checked", false);
            $("#chk_bienes").attr("disabled", true);
            $("#archivo_bienes").html("<strong> -- (NO EXISTE ADJUNTO) -- </strong>");
        }

        if (lc_nombre_archivo_intereses.length > 0) {
            $("#chk_intereses").prop("checked", true);
            $("#chk_intereses").attr("disabled", false);
            $("#archivo_intereses").html("<strong>" + lc_nombre_archivo_intereses + "</strong>");

        } else {
            $("#chk_intereses").prop("checked", false);
            $("#chk_intereses").attr("disabled", true);
            $("#archivo_intereses").html("<strong> -- (NO EXISTE ADJUNTO) -- </strong>");
        }
        var ln_total = lc_nombre_archivo_cv.length + lc_nombre_archivo_nepotismo.length + lc_nombre_archivo_bienes.length + lc_nombre_archivo_intereses.length;
        if (ln_total != 0) {
            $("#btn_eliminar_adjunto").attr("disabled", false);
            $('#EliminarAdjunto').modal({ show: true, backdrop: 'static' });
        } else {
            $("#btn_eliminar_adjunto").attr("disabled", true);
            mostrar_mensaje_en_modal("alert-danger", '<center> -- NO EXISTE NINGUN ARCHIVO ADJUNTO -- </center>');
        }
    });



    $("#btn_eliminar_adjunto").click(function () {
        lc_leer_idautoridad = $("#id_autoridad_eliminar").val();
        var ln_cv, ln_nep, ln_bien, ln_interes;
        if ($("#chk_cv").prop("checked") == true) {
            ln_cv = 1;
        } else {
            ln_cv = 0;
        }
        if ($("#chk_nepotismo").prop("checked") == true) {
            ln_nep = 1;
        } else {
            ln_nep = 0;
        }

        if ($("#chk_bienes").prop("checked") == true) {
            ln_bien = 1;
        } else {
            ln_bien = 0;
        }

        if ($("#chk_intereses").prop("checked") == true) {
            ln_interes = 1;
        } else {
            ln_interes = 0;
        }
        var datos_eliminar = { 'id': lc_leer_idautoridad, 'cv': ln_cv, 'np': ln_nep, 'bien': ln_bien, 'inte': ln_interes }

        $.ajax({
            data: datos_eliminar,
            dataType: 'json',
            url: url + 'autoridades/eliminar_adjuntos',
            type: 'post',
            beforeSend: function () {
                $("#txt_titulo_autoridad").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function (datos) {
                $("#txt_titulo_autoridad").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setTimeout(function () {
                    $("#txt_titulo_autoridad").html("<center>EDITAR AUTORIDAD</center>");
                    $("#btn_eliminar_adjunto").attr("disabled", true);
                    listar_autoridades();
                    $('#EliminarAdjunto').modal('toggle');
                }, 800);
            },
            error: function (jqXHR, textStatus, errorThrown) {
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

