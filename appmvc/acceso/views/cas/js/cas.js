var modulo = "/appmvc",
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    url_ruta_archivos = 'http://' + document.domain + '/unidades/cas/pdf/',
    galerias_nombres = [],
    lc_nombre_archivo, datos_en_fila, archivo_subir, imagen,
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


function listar() {
    $.ajax({
        dataType: 'json',
        url: url + 'cas/listar',
        type: 'post',
        beforeSend: function() {
            $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            $("#msj-titular").html("");
            $('#mostrar-datos-documentos').html("");
            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila = '';
                    for (var i = 0; i < data.length; i++) {
                        datos_en_fila += '<tr>';
                        datos_en_fila += '<td><button type="button" name="eliminar" id="' + data[i].id + '" class="btn btn-danger  btn_eliminar">X</button></td>';
                        datos_en_fila += '<td>' + (i + 1) + '</td>';
                        datos_en_fila += '<td>' + (data[i].anio) + '</td>';
                        datos_en_fila += '<td>' + (data[i].descripcion) + '</td>';
                        datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                        datos_en_fila += '<td>' + (data[i].usuario) + '</td>';
                        datos_en_fila += '<td>' + (data[i].categoria) + '</td>';
                        datos_en_fila += '<td><a href = "' + (url_ruta_archivos + data[i].anio) + '/' + data[i].archivo + '" target = _black </a> ' + data[i].archivo + '</td>';
                        datos_en_fila += '</tr>';
                    }
                }
                $('#mostrar-datos-documentos').append(datos_en_fila);
                $('#msj-titular').html("<center><strong>Se ubicaron " + data.length + " -- Registros  -- </center></strong>");
            } else {
                $('#mostrar-datos-documentos').html("<center><strong>...No existe registros ... </strong></center>");
                $('#msj-titular').html(" ... No existen registros ....");
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

function listar_interno() {
    var etiqueta_table_interno = $("#mostrar-datos-interno"),
        etiqueta_select = $("#mostrar_categoria"),
        etiqueta_msj = $("#msj-titular-galeria");
    $.ajax({
        dataType: 'json',
        url: url + 'cas/listar_interno',
        type: 'post',
        beforeSend: function() {
            etiqueta_msj.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            console.log(data);

            etiqueta_msj.html("");
            //   etiqueta_select.html("");
            etiqueta_table_interno.html("");
            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila = '';
                    for (var i = 0; i < data.length; i++) {
                        datos_en_fila += '<tr>';
                        datos_en_fila += '<td><button type="button" name="eliminar_cate" id_cate="' + data[i].id_cate + '" class="btn btn-danger  btn_eliminar_categoria">X</button></td>';
                        datos_en_fila += '<td>' + (i + 1) + '</td>';
                        datos_en_fila += '<td>' + (data[i].nombre) + '</td>';
                        datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                        datos_en_fila += '<td>' + (data[i].usuario) + '</td>';
                        datos_en_fila += '</tr>';
                    }
                    data.forEach(function(filas) {
                        if (filas.respuesta === 1) {
                            etiqueta_select.append('<option id="' + filas.id_cate + '" nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                        } else {
                            etiqueta_select.html("");
                        }
                    });
                }
                etiqueta_table_interno.append(datos_en_fila);
                etiqueta_msj.html("<center><strong>Se ubicaron " + data.length + " -- Registros  -- </center></strong>");
            } else {
                etiqueta_table_interno.html("<center><strong>...No existe registros ... </strong></center>");
                etiqueta_msj.html(" ... No existen registros ....");
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

function listar_categoria() {
    var etiqueta_table = $('#mostrar-datos-categorias'),
        etiqueta_select = $("#mostrar_categoria"),
        etiqueta_msj = $("#msj-titular-categorias");
    $.ajax({
        dataType: 'json',
        url: url + 'cas/listar_categoria',
        type: 'post',
        beforeSend: function() {
            etiqueta_msj.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(data) {
            etiqueta_msj.html("");
            etiqueta_select.html("");
            etiqueta_table.html("");
            if (data[0].respuesta == 1) {
                if (data.length > 0) {
                    var datos_en_fila = '';
                    for (var i = 0; i < data.length; i++) {
                        datos_en_fila += '<tr>';
                        datos_en_fila += '<td><button type="button" name="eliminar_cate" id_cate="' + data[i].id_cate + '" class="btn btn-danger  btn_eliminar_categoria">X</button></td>';
                        datos_en_fila += '<td>' + (i + 1) + '</td>';
                        datos_en_fila += '<td>' + (data[i].nombre) + '</td>';
                        datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                        datos_en_fila += '<td>' + (data[i].usuario) + '</td>';
                        datos_en_fila += '</tr>';
                    }
                    data.forEach(function(filas) {
                        if (filas.respuesta === 1) {
                            etiqueta_select.append('<option id="' + filas.id_cate + '" nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>');
                        } else {
                            etiqueta_select.html("");
                        }
                    });
                }
                etiqueta_table.append(datos_en_fila);
                etiqueta_msj.html("<center><strong>Se ubicaron " + data.length + " -- Registros  -- </center></strong>");
            } else {
                etiqueta_table.html("<center><strong>...No existe registros ... </strong></center>");
                etiqueta_msj.html(" ... No existen registros ....");
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


$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    listar();
    listar_interno();
    listar_categoria();

    /* subir archivo documento */

    //#region 
    $("#btn_nuevo").click(function() {
        $("#txtDescripcion").val("");
        $("#btn_grabar").attr("disabled", true);
        $("#subir_archivo").val('').attr("disabled", false);
        $('#registrar').modal({ show: true, backdrop: 'static' });
    });



    $("#txtDescripcion")
        .keypress(function() {
            $("#subir_archivo").attr("disabled", false);
        })
        .click(function() {
            $("#subir_archivo").attr("disabled", false);
        });

    $("#subir_archivo").change(function() {
        var lc_anio = $("#anio").val();
        $("#btn_grabar").attr("disabled", false);
        archivo_subir = this.files[0],
            lc_nombre_archivo = archivo_subir["name"],
            etiqueta_dom_txt = 'subir_archivo',
            etiqueta_dom = $("#subir_archivo"),
            msj_dom = $("#msj_subida");


        if (archivo_subir["size"] > 5000000) {
            etiqueta_dom.val("");
            msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo es 5 Megas, Vuelva a subir --- </font><strong></center>").show();
        } else {
            var data_form = new FormData();
            data_form.append(etiqueta_dom_txt, archivo_subir);
            data_form.append('anio', lc_anio);
            $.ajax({
                dataType: 'json',
                url: url + 'cas/subir_pdf',
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
                        msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();
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
    });



    $("#btn_grabar").click(function() {
        var lc_anio = $("#anio").val(),
            lc_idcategoria = $('#mostrar_categoria option:selected').attr('id'),
            lc_descripcion = $("#txtDescripcion").val(),
            datos = {
                'anio': lc_anio,
                'idcategoria': lc_idcategoria,
                'descripcion': lc_descripcion,
                'archivo': lc_nombre_archivo
            };
        $.ajax({
            data: datos,
            dataType: 'json',
            url: url + 'cas/grabar',
            type: 'post',
            beforeSend: function() {
                $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function() {
                $("#msj_imagen").html("");
                $('#registrar').modal("toggle");
                $("#btn_grabar").attr("disabled", true);
                listar();
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


    $(document).on('click', '.btn_eliminar', function() {
        var lc_leer_id = $(this).attr("id");
        $('#id').val(lc_leer_id);
        $('#mostrar_confirmar_eliminar').modal({ show: true, backdrop: 'static' });
    });



    $("#si_eliminar").click(function() {
        var leer_id = $('#id').val(),
            data_eliminar = { 'id': leer_id };
        $.ajax({
            data: data_eliminar,
            dataType: 'json',
            url: url + 'cas/eliminar',
            type: 'post',
            beforeSend: function() {},
            success: function() {
                $('#mostrar_confirmar_eliminar').modal("toggle");
                listar();
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

    //#endregion


    /* seccion de categoria */
    $("#btn_nuevo_categoria").click(function() {
        $("#txtDescripcion_Categoria").val("").focus();
        $("#btn_grabar_Categoria").attr("disabled", true);
        $('#registrar-categorias').modal({ show: true, backdrop: 'static' });
    });

    $("#txtDescripcion_Categoria").keypress(function() {
        $("#btn_grabar_Categoria").attr("disabled", false);

    });

    $("#btn_grabar_Categoria").click(function() {
        var lc_categoria = $("#txtDescripcion_Categoria").val(),
            datos_cat = {
                'nombre': lc_categoria
            };
        $.ajax({
            data: datos_cat,
            dataType: 'json',
            url: url + 'cas/grabar_categoria',
            type: 'post',
            beforeSend: function() {
                $("#btn_grabar_Categoria").attr("disabled", true);
            },
            success: function() {
                $("#btn_grabar_Categoria").attr("disabled", true);
                $('#registrar-categorias').modal("toggle");

                listar_categoria();
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

    $(document).on('click', '.btn_eliminar_categoria', function() {
        var lc_leer_id = $(this).attr("id_cate");
        $('#id_categoria').val(lc_leer_id);
        $('#mostrar_eliminar_categoria').modal({ show: true, backdrop: 'static' });
    });

    $("#si_eliminar_categoria").click(function() {
        var leer_id = $('#id_categoria').val(),
            data_eliminar = { 'id': leer_id };
        $.ajax({
            data: data_eliminar,
            dataType: 'json',
            url: url + 'cas/eliminar_categoria',
            type: 'post',
            beforeSend: function() {},
            success: function() {
                $('#mostrar_eliminar_categoria').modal("toggle");
                listar_categoria();
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

    /* fin de categoria */



    /* inicio de concurso interno */

    $("#btn_nuevo_interno").click(function() {
        $("#txtDescripcion_interno").val("").focus();
        $("#btn_grabar_interno").attr("disabled", true);
        $('#registrar-interno').modal({ show: true, backdrop: 'static' });
    });

    $("#txtDescripcion_interno").keypress(function() {
        $("#btn_grabar_interno").attr("disabled", false);

    });

    $("#btn_grabar_interno").click(function() {
        var lc_categoria = $("#txtDescripcion_interno").val(),
            datos_cat = {
                'nombre': lc_categoria
            };
        $.ajax({
            data: datos_cat,
            dataType: 'json',
            url: url + 'cas/grabar_interno',
            type: 'post',
            beforeSend: function() {
                $("#btn_grabar_interno").attr("disabled", true);
            },
            success: function() {
                $("#btn_grabar_interno").attr("disabled", true);
                $('#registrar-interno').modal("toggle");

                listar_interno();
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

    $(document).on('click', '.btn_eliminar_interno', function() {
        var lc_leer_id = $(this).attr("id_cate");
        $('#id_interno').val(lc_leer_id);
        $('#mostrar_eliminar_interno').modal({ show: true, backdrop: 'static' });
    });

    $("#si_eliminar_interno").click(function() {
        var leer_id = $('#id_interno').val(),
            data_eliminar = { 'id': leer_id };
        $.ajax({
            data: data_eliminar,
            dataType: 'json',
            url: url + 'cas/eliminar_interno',
            type: 'post',
            beforeSend: function() {},
            success: function() {
                $('#mostrar_eliminar_interno').modal("toggle");
                listar_interno();
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

    /* fin de concurso interno */






});