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



function listar_directorio() {
    $.ajax({
        dataType: 'json',
        url: url + 'directorio/lista_directorio',
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
                    var lc_activo = datos[key]['activo'];
                    switch (lc_activo) {
                        case '0':
                            datos_en_fila += '<tr class="alert alert-danger">';
                            break;
                        case '1':
                            datos_en_fila += '<tr class="alert alert-success">';
                            break;

                        default:
                            datos_en_fila += '<tr>';
                            break;
                    }

                    datos_en_fila += '<td width="1%">' + datos[key]['directorio'] + '</td>';
                    datos_en_fila += '<td width="25%">' + datos[key]['cargo'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['nombre'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['email'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['anexo'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['celular'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['rpm'] + '</td>';
                    datos_en_fila += '<td><button type="button" name="editar" id="' + datos[key].directorio + '" cargo="' + datos[key].cargo + '" nombre="' + datos[key].nombre + '" email="' + datos[key].email
                        + '" anexo="' + datos[key].anexo + '" celular="' + datos[key].celular + '" rpm="' + datos[key].rpm +
                        '" class="btn btn-success  btn_editar crear-tooltip" data-toggle="tooltip" data-original-title="Ver/Editar"><i class="fa fa-pencil"></i></button>';


                    datos_en_fila += '<td><button type="button" name="activar" id="' + datos[key].directorio +
                        '" class="btn btn-success  btn_activar crear-tooltip" data-toggle="tooltip">A</button>';


                    datos_en_fila += '<td><button type="button" name="desactivar" id="' + datos[key].directorio +
                        '" class="btn btn-danger  btn_desactivar crear-tooltip" data-toggle="tooltip">D</button>';


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
    listar_directorio();
    $("#txt_titulo_directorio").html("<strong><center> EDITAR DIRECTORIO - CARGO EN BLANCO NO APARECERA </center> </strong>");

    $(document).on('click', '.btn_editar', function () {
        lc_leer_iddirectorio = $(this).attr("id"),
            lc_cargo = $(this).attr("cargo"),
            lc_nombre = $(this).attr("nombre"),
            lc_email = $(this).attr("email"),
            lc_anexo = $(this).attr("anexo"),
            lc_celular = $(this).attr("celular"),
            lc_rpm = $(this).attr("rpm");
        $("#id_directorio").val(lc_leer_iddirectorio);
        $("#txt_cargo").val(lc_cargo);
        $("#txt_nombre").val(lc_nombre);
        $("#txt_email").val(lc_email);
        $("#txt_anexo").val(lc_anexo);
        $("#txt_celular").val(lc_celular);
        $("#txt_rpm").val(lc_rpm);
        $("#btn_grabar_directorio").attr("disabled", false);
        $('#modificar_directorio').modal({ show: true, backdrop: 'static' });
    });




    $("#btn_grabar_directorio").click(function () {
        var lc_leer_iddirectorio = $("#id_directorio").val(),
            lc_cargo = $("#txt_cargo").val(),
            lc_nombre = $("#txt_nombre").val(),
            lc_email = $("#txt_email").val(),
            lc_anexo = $("#txt_anexo").val(),
            lc_celular = $("#txt_celular").val(),
            lc_rpm = $("#txt_rpm").val(),
            datos_directorio = {
                'id': lc_leer_iddirectorio, 'cargo': lc_cargo, 'nombre': lc_nombre, 'email': lc_email,
                'anexo': lc_anexo, 'celular': lc_celular, 'rpm': lc_rpm
            };
        $.ajax({
            data: datos_directorio,
            dataType: 'json',
            url: url + 'directorio/grabar_directorio',
            type: 'post',
            beforeSend: function () {
                $("#txt_titulo_directorio").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function (datos) {
                $("#txt_titulo_directorio").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setTimeout(function () {
                    $("#txt_titulo_directorio").html("<center>EDITAR DIRECTORIO</center>");
                    $("#btn_grabar_directorio").attr("disabled", true);
                    listar_directorio();
                    $('#modificar_directorio').modal('toggle');
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


    $(document).on('click', '.btn_desactivar', function () {
        var lc_leer_iddirectorio = $(this).attr("id"),
            data_dir = { 'id': lc_leer_iddirectorio };
        $.ajax({
            data: data_dir,
            dataType: 'json',
            url: url + 'directorio/desactivar_directorio',
            type: 'post',
            beforeSend: function () {
            },
            success: function (datos) {
                listar_directorio();
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


    $(document).on('click', '.btn_activar', function () {
        var lc_leer_iddirectorio = $(this).attr("id"),
            data_dir = { 'id': lc_leer_iddirectorio };
        $.ajax({
            data: data_dir,
            dataType: 'json',
            url: url + 'directorio/activar_directorio',
            type: 'post',
            beforeSend: function () {
            },
            success: function (datos) {
                listar_directorio();
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

