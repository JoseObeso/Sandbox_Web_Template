var modulo = "/appmvc",
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    url_ruta_archivos = 'http://' + document.domain + '/transparencia/personal/autoridades/',
    url_grafico_imagen = 'http://' + document.domain + '/images/prensa/',
    url_grafico_imagen_galeria = 'http://' + document.domain + '/images/prensa/galeria/2013/',
    ln_indicador = 0,
    galerias_nombres2 = [],
    galerias_nombres = [],
    lc_nombre_archivo_imagen1, lc_nombre_archivo_imagen2, lc_nombre_archivo, datos_en_fila, lc_nombre_archivo_cv, archivo_subir, archivo_subir_bien, imagen,
    gd_fecha_total = new Date(),
    gt_hora_actual = gd_fecha_total.getHours() + ':' + gd_fecha_total.getMinutes() + ':' + gd_fecha_total.getSeconds();




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

function lista_prensa() {
    var lc_buscar_nota_prensa = $("#buscar_nota_prensa").val(),
        lc_anio = $("#anio").val(),
        lc_mes = $("#mes").val(),
        data_prensa = { 'nota': lc_buscar_nota_prensa, 'anio': lc_anio, 'mes': lc_mes };
    $.ajax({
        data: data_prensa,
        dataType: 'json',
        url: url + 'prensa/lista_prensa',
        type: 'post',
        beforeSend: function() {
            $("#msj-prensa").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            $("#msj-prensa").html("");
            $('#mostrar-datos-busqueda').html("");
            console.log(data);


            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila = '';
                    for (var i = 0; i < data.length; i++) {
                        datos_en_fila += '<tr>';
                        datos_en_fila += '<td>' + (i + 1) + '</td>';
                        datos_en_fila += '<td>' + (data[i].fecha) + '</td>';
                        datos_en_fila += '<td>' + (data[i].titulo) + '</td>';
                        datos_en_fila += '<td>' + (data[i].subtitulo) + '</td>';
                        datos_en_fila += '<td>' + (data[i].detalle) + '</td>';
                        datos_en_fila += '<td>' + (data[i].tiene_imagen === '1' ? '<button type="button"  id="' + data[i].prensa + '*' + data[i].imagen + '" class="btn btn-info  btn_ver_imagen" >Ver Img</button>' : 'No') + '</td>';
                        datos_en_fila += '<td>' + (data[i].tiene_galeria === '1' ? '<button type="button"  id="' + data[i].prensa + '*' + data[i].galeria + '" class="btn btn-info  btn_ver_galeria" >Ver Gal</button>' : 'No') + '</td>';
                        datos_en_fila += '<td><button type="button" name="editar" id="' + data[i].prensa + '" class="btn btn-success  btn_editar"><i class="fa fa-pencil"></i></button>';
                        datos_en_fila += '<button type="button" name="eliminar" id="' + data[i].prensa + '" class="btn btn-danger  btn_eliminar">X</button>';
                        datos_en_fila += '</tr>';
                    }
                    $('#mostrar-datos-busqueda').append(datos_en_fila);
                    $('#msj-prensa').html("<center><strong>Se ubicaron " + data.length + " -- Notas de Prensa -- </center></strong>");
                }
            } else {
                $('#mostrar-datos-busqueda').html("<center><strong>...No existe registros ... </strong></center>");
                $('#msj-prensa').html(" ... No existen registros ....");
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
    $("#buscar_nota_prensa").val('');
    $("#anio").val(numero_del_anio());
    lista_prensa()

}

//#region 


function limpiar_casillero() {
    ver_si_existe_fecha();
    $("#FechaPrensa").attr("disabled", true);
    $("#TituloPrensa").val('').attr("disabled", true);
    $("#SubTitulo").val('').attr("disabled", true);
    $("#imagen1").val('').attr("disabled", true);
    $("#msj_imagen").html("");
    $("#DetallePrensa").val('').attr("disabled", true);
    $("#ContenidoPrensa").val('').attr("disabled", true);
    $("#imagen-multiple").val('').attr("disabled", true);
    $("#msj_galeria_imagenes").html("");
    $("#IdCambiarGaleria").attr("disabled", true).hide();
    $("#modificar").attr("disabled", true);
    $("#eliminar").attr("disabled", true);
    $("#btn_grabar").attr("disabled", true);
}




function desabilitar_casillero() {
    $("#FechaPrensa").attr("disabled", true);
    $("#TituloPrensa").attr("disabled", true);
    $("#SubTitulo").attr("disabled", true);
    $("#imagen1").attr("disabled", true);
    $("#msj_imagen").html("");
    $("#DetallePrensa").attr("disabled", true);
    $("#ContenidoPrensa").attr("disabled", true);
    $("#imagen-multiple").attr("disabled", true);
    $("#mostrar_galeria").html("");
    $("#EliminarImagen").attr("disabled", true);
    $("#EliminarGaleria").attr("disabled", true);
    $("#modificar").attr("disabled", true);
    $("#eliminar").attr("disabled", true);

    $("#msj_galeria_imagenes").html("");
    $("#btn_grabar").attr("disabled", true);
}


function leer_titulares_mostrar() {
    var leer_idprensa = $('#select_prensa  option:selected').attr('id');
    var lc_ver_si_se_selecciono = (typeof leer_idprensa === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono === '1') {
        var leer_idprensa = $('#select_prensa  option:selected').attr('id'),
            leer_fecha = $('#select_prensa  option:selected').attr('fecha'),
            leer_titulo = $('#select_prensa  option:selected').attr('titulo'),
            leer_subtitulo = $('#select_prensa  option:selected').attr('subtitulo'),
            leer_imagen = $('#select_prensa  option:selected').attr('imagen'),
            leer_imagen_alternative = $('#select_prensa  option:selected').attr('imagen_alternative'),
            leer_detalle = $('#select_prensa  option:selected').attr('detalle'),
            leer_galeria = $('#select_prensa  option:selected').attr('galeria');

        $("#FechaPrensa").val(leer_fecha);
        $("#TituloPrensa").val(leer_titulo);
        $("#SubTitulo").val(leer_subtitulo);
        $("#DetallePrensa").val(leer_detalle);
        $("#idprensa").html(" GALERIA DE IMAGENES - ID : " + leer_idprensa);



        $("#mostrar_imagen").show().html("<center><img src='" + url_grafico_imagen + '/' + leer_imagen + "'width=300 height=280></center>");
        $("#mostrar_imagen_galeria").show().html("");
        mostrar_contenido_prensa(leer_idprensa);
        dividirCadena(leer_galeria, ";");
        $('#modificar').attr("disabled", false);
        $('#eliminar').attr("disabled", false);

        if (leer_galeria == "") {
            $("#EliminarGaleria").attr("disabled", true);

        } else {
            $("#EliminarGaleria").attr("disabled", false);

        }




    } else {

        $('#modificar').attr("disabled", true);
        $('#eliminar').attr("disabled", true);
        $("#EliminarGaleria").attr("disabled", true);

    }
}




function mostrar_contenido_prensa(leer_idprensa) {
    $.ajax({
        data: { 'id': leer_idprensa },
        dataType: 'json',
        url: url + 'prensa/mostrar_contenido',
        type: 'post',
        beforeSend: function() {
            $("#msj_modificacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#msj_modificacion").html("");
            $("#ContenidoPrensam").val(encontrados[0].contenido);
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



function mostrar_contenido_nota_prensa(lc_leer_id_mod) {
    $.ajax({
        data: { 'id': lc_leer_id_mod },
        dataType: 'json',
        url: url + 'prensa/mostrar_texto_prensa',
        type: 'post',
        beforeSend: function() {
            $("#msj_modificacion").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#msj_modificacion").html("");
            $("#FechaPrensam").val(encontrados[0].fecha);
            $("#TituloPrensam").val(encontrados[0].titulo);
            $("#SubTitulom").val(encontrados[0].subtitulo);
            $("#DetallePrensam").val(encontrados[0].detalle);

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
    lista_prensa();
    limpiar_casillero();
    $("#btn_busqueda_total").click(function() {
        lista_prensa();
    });
    $("#btn_limpiar").click(function() {
        limpiar_filtros_busqueda();

    });



    $(document).on('click', '.btn_ver_imagen', function() {
        var lc_leer_id = $(this).attr("id"),
            arrayDeCadenas = lc_leer_id.split('*'),
            lc_get_idprensa = arrayDeCadenas[0],
            lc_get_imagen1 = arrayDeCadenas[1];
        $('#id_prensa_imagen').val(lc_get_idprensa);
        $("#imagen2").val('').attr("disabled", false);
        $("#img-imagen1").attr("src", url_grafico_imagen + '/' + lc_get_imagen1);
        $("#btn_grabar_imagen2").attr("disabled", true);
        $('#crud_imagen1').modal({ show: true, backdrop: 'static' });
    });



    $("#btn_grabar_imagen2").click(function() {
        var lc_get_idprensa = $('#id_prensa_imagen').val(),
            data_imagen2 = { 'id': lc_get_idprensa, 'imagen2': lc_nombre_archivo_imagen2 };
        $.ajax({
            data: data_imagen2,
            dataType: 'json',
            url: url + 'prensa/grabar_imagen2',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen2").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#msj_imagen2").html("");
                $("#btn_grabar_imagen2").attr("disabled", true);
                $('#crud_imagen1').modal("toggle");
                lista_prensa();

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



    $(document).on('click', '.btn_ver_galeria', function() {
        var datos_en_fila = '',
            lc_leer_id = $(this).attr("id"),
            arrayDeCadenas = lc_leer_id.split('*'),
            lc_get_idprensa = arrayDeCadenas[0],
            lc_get_galeria = arrayDeCadenas[1],
            arrayDeGaleria = lc_get_galeria.split(';');
        $("#tbl-mostrar-galeria").html("");
        datos_en_fila = '';
        for (var i = 0; i < arrayDeGaleria.length; i++) {
            datos_en_fila += "<tr>";
            datos_en_fila += "<td>" + (i + 1) + "</td>";
            datos_en_fila += "<td><img src =" + "'" + url_grafico_imagen_galeria + arrayDeGaleria[i] + "'" + "width=100% height=100%></td>";
            datos_en_fila += "</tr>";
        }
        $('#tbl-mostrar-galeria').append(datos_en_fila);
        $('#id_prensa_galeria').val(lc_get_idprensa);
        $("#btn_grabar_galeria2").attr("disabled", true);
        $('#crud_galeria').modal({ show: true, backdrop: 'static' });
    });


    $(document).on('click', '.btn_editar', function() {
        var lc_leer_id_mod = $(this).attr("id");
        $('#msj_modificacion').html("<strong>MODIFICAR NOTA DE PRENSA</strong>");
        $('#id_nota_prensa').val(lc_leer_id_mod);
        $("#FechaPrensam").attr("disabled", false);
        $("#TituloPrensam").attr("disabled", false);
        $("#SubTitulom").attr("disabled", false);
        $("#DetallePrensam").attr("disabled", false);
        $("#ContenidoPrensam").attr("disabled", false);
        $("#btn_grabar_modificacion").attr("disabled", false);
        $('#modificar_nota_prensa').modal({ show: true, backdrop: 'static' });
        mostrar_contenido_nota_prensa(lc_leer_id_mod);
        mostrar_contenido_prensa(lc_leer_id_mod);


    });


    $(document).on('click', '.btn_eliminar', function() {
        var lc_leer_id = $(this).attr("id");
        $('#id_prensa').val(lc_leer_id);
        $('#mostrar_confirmar_eliminar').modal({ show: true, backdrop: 'static' });
    });


    $("#btn_grabar_modificacion").click(function() {
        var leer_idprensa = $('#id_nota_prensa').val(),
            lc_fecha = $("#FechaPrensam").val(),
            lc_tituloprensa = $("#TituloPrensam").val(),
            lc_subtitulo = $("#SubTitulom").val(),
            lc_detalleprensa = $("#DetallePrensam").val(),
            lc_contenido = $("#ContenidoPrensam").val(),
            datos_modificar = {
                'idprensa': leer_idprensa,
                'fecha': lc_fecha,
                'titulo': lc_tituloprensa,
                'subtitulo': lc_subtitulo,
                'detalle': lc_detalleprensa,
                'contenido': lc_contenido
            };
        $.ajax({
            data: datos_modificar,
            dataType: 'json',
            url: url + 'prensa/prensa_grabar_modificacion',
            type: 'post',
            beforeSend: function() {
                $('#msj_modificacion').html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $('#msj_modificacion').html("");
                $('#modificar_nota_prensa').modal("toggle");
                $("#btn_grabar_modificacion").attr("disabled", true);
                lista_prensa();

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



    $('#FechaPrensa')
        .datepicker({
            format: 'dd/mm/yyyy',
            showSecond: true,
            timeFormat: 'HH:mm:ss',
            autoclose: true
        })
        .on('changeDate', function(e) {});


    $("#imagen1").change(function() {
        subir_imagen1 = this.files[0],
            lc_nombre_archivo_imagen1 = subir_imagen1["name"],
            etiqueta_dom_txt = 'imagen1', etiqueta_dom = $("#imagen1"), msj_dom = $("#msj_imagen");
        if (subir_imagen1["type"] != "image/jpeg" && subir_imagen1["type"] != "image/png" && subir_imagen1["type"] != "image/jpg") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato JPG, Vuelva a subir  --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, subir_imagen1);
            $.ajax({
                dataType: 'json',
                url: url + 'prensa/subir_imagen1',
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
                        msj_dom.html("<center><strong><font color='green'> --- Imagen Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar").attr("disabled", false);
                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                        $("#btn_grabar").attr("disabled", true);
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

    $("#imagen2").change(function() {
        subir_imagen2 = this.files[0],
            lc_nombre_archivo_imagen2 = subir_imagen2["name"],
            etiqueta_dom_txt = 'imagen2', etiqueta_dom = $("#imagen2"), msj_dom = $("#msj_imagen2");
        if (subir_imagen2["type"] != "image/jpeg" && subir_imagen2["type"] != "image/png" && subir_imagen2["type"] != "image/jpg") {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato JPG, Vuelva a subir  --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, subir_imagen2);
            $.ajax({
                dataType: 'json',
                url: url + 'prensa/subir_imagen2',
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
                        msj_dom.html("<center><strong><font color='green'> --- Imagen Conforme  subido --- </font><strong></center>").show();
                        $("#btn_grabar_imagen2").attr("disabled", false);
                    } else {
                        msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                        $("#btn_grabar_imagen2").attr("disabled", true);
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



    $("#imagen-multiple").change(function() {
        var fileLength = this.files.length;
        var elem = document.getElementById("imagen-multiple");
        for (var i = 0; i < elem.files.length; ++i) {
            galerias_nombres.push(elem.files[i].name);
        }
        var match = ["image/jpeg", "image/png", "image/jpg"];
        var i;
        for (i = 0; i < fileLength; i++) {
            var file = this.files[i];
            var imagefile = file.type;
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]) || (imagefile == match[3]))) {
                $("#msj_galeria_imagenes").html("<center> - Formato Incorrecto - solo JPG / PNG</center>");
                $("#fileInput").val('');
                return false;
            } else {
                var archivo_subir = this.files[i],
                    lc_nombre_archivo = archivo_subir["name"],
                    etiqueta_dom_txt = 'imagen-multiple',
                    etiqueta_dom = $("#imagen-multiple"),
                    msj_dom = $("#msj_galeria_imagenes");
                var data_form = new FormData();
                data_form.append(etiqueta_dom_txt, archivo_subir);
                $.ajax({
                    dataType: 'json',
                    url: url + 'prensa/multiples_imagenes',
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
                            msj_dom.html("<center><strong><font color='green'> --- Se subieron  " + i + " Imagenes--- </font><strong></center>").show();
                            $("#btn_grabar").attr("disabled", false);

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

        }


    });


    $("#imagen-multiple2").change(function() {
        var fileLength2 = this.files.length;
        var elem2 = document.getElementById("imagen-multiple2");
        for (var i = 0; i < elem2.files.length; ++i) {
            galerias_nombres2.push(elem2.files[i].name);
        }
        var match2 = ["image/jpeg", "image/png", "image/jpg"];
        var i;
        for (i = 0; i < fileLength2; i++) {
            var file2 = this.files[i];
            var imagefile2 = file2.type;
            if (!((imagefile2 == match2[0]) || (imagefile2 == match2[1]) || (imagefile2 == match2[2]) || (imagefile2 == match2[3]))) {
                $("#msj_galeria_imagenes2").html("<center> - Formato Incorrecto - solo JPG / PNG</center>");
                //$("#fileInput").val('');
                return false;
            } else {
                var archivo_subir2 = this.files[i],
                    lc_nombre_archivo_galeria = archivo_subir2["name"],
                    etiqueta_dom_txt = 'imagen-multiple2',
                    etiqueta_dom = $("#imagen-multiple2"),
                    msj_dom = $("#msj_galeria_imagenes2");
                var data_form = new FormData();
                data_form.append(etiqueta_dom_txt, archivo_subir2);
                $.ajax({
                    dataType: 'json',
                    url: url + 'prensa/multiples_imagenes2',
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
                            msj_dom.html("<center><strong><font color='green'> --- Se subieron  " + i + " Imagenes--- </font><strong></center>").show();
                            $("#btn_grabar_galeria2").attr("disabled", false);
                        } else {
                            msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                            $("#btn_grabar_galeria2").attr("disabled", true);

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

        }


    });


    $("#btn_grabar_galeria2").click(function() {
        var lc_get_idprensa_gal = $('#id_prensa_galeria').val(),
            data_galeria2 = { 'id': lc_get_idprensa_gal, 'galerias2': galerias_nombres2.toString() };
        $.ajax({
            data: data_galeria2,
            dataType: 'json',
            url: url + 'prensa/grabar_galeria2',
            type: 'post',
            beforeSend: function() {
                $("#msj_galeria_imagenes2").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#msj_galeria_imagenes2").html("");
                $("#btn_grabar_galeria2").attr("disabled", true);
                $('#crud_galeria').modal("toggle");
                lista_prensa();
                galerias_nombres2 = [];
                galerias_nombres = [];

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



    $("#btn_nuevo").click(function() {
        $("#FechaPrensa").val(dia_mes_anio_real_time()).attr("disabled", false);
        $("#TituloPrensa").val('').attr("disabled", false);
        $("#SubTitulo").val('').attr("disabled", false);
        $("#DetallePrensa").val('').attr("disabled", false);
        $("#imagen1").val('').attr("disabled", false);
        $("#ContenidoPrensa").val('').attr("disabled", false);
        $("#imagen-multiple").val('').attr("disabled", false);
        $("#btn_grabar").attr("disabled", true);
        $('#registrar_nota_prensa').modal({ show: true, backdrop: 'static' });

    });





    $("#btn_grabar").click(function() {
        var lc_fecha = $("#FechaPrensa").val() + ' ' + gt_hora_actual,
            lc_tituloprensa = $("#TituloPrensa").val(),
            lc_subtitulo = $("#SubTitulo").val(),
            lc_detalleprensa = $("#DetallePrensa").val(),
            lc_contenido = $("#ContenidoPrensa").val(),
            datos_grabar = {
                'fecha': lc_fecha,
                'titulo': lc_tituloprensa,
                'subtitulo': lc_subtitulo,
                'detalle': lc_detalleprensa,
                'contenido': lc_contenido,
                'imagen1': lc_nombre_archivo_imagen1,
                'galerias': galerias_nombres.toString()
            };
        $.ajax({
            data: datos_grabar,
            dataType: 'json',
            url: url + 'prensa/prensa_grabar',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#msj_imagen").html("");
                $('#registrar_nota_prensa').modal("toggle");
                $("#btn_grabar").attr("disabled", true);
                galerias_nombres2 = [];
                galerias_nombres = [];
                lista_prensa();

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


    $("#si_eliminar").click(function() {
        var leer_idprensa = $('#id_prensa').val();
        data_eliminar = { 'id': leer_idprensa };
        $.ajax({
            data: data_eliminar,
            dataType: 'json',
            url: url + 'prensa/eliminar_prensa',
            type: 'post',
            beforeSend: function() {

            },
            success: function() {
                $('#mostrar_confirmar_eliminar').modal("toggle");
                lista_prensa();



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


    $("#cancelar").click(function() {
        $('#mostrar_confirmar_eliminar').modal("toggle");
        lista_prensa();

    });





});