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



function listar_agenda() {
    $.ajax({
        dataType: 'json',
        url: url + 'agenda/lista_agenda',
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
                    datos_en_fila += '<tr class="alert-info texto-negro">';

                    datos_en_fila += '<td width="1%">' + datos[key]['agenda'] + '</td>';
                    datos_en_fila += '<td width="25%">' + datos[key]['actividad'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['lugar'] + '</td>';
                    datos_en_fila += '<td width="35%">' + datos[key]['fecha'] + '</td>';

                    datos_en_fila += '<td><button type="button" name="editar" id="' + datos[key].agenda + '" actividad="' + datos[key].actividad + '" lugar="' + datos[key].lugar
                        + '" fecha="' + datos[key].fecha + '" class="btn btn-success  btn_editar crear-tooltip" data-toggle="tooltip" data-original-title="Ver/Editar"><i class="fa fa-pencil"></i></button>';
                    datos_en_fila += '<td><button type="button" name="eliminar" id="' + datos[key].agenda + '" class="btn btn-danger  btn_eliminar crear-tooltip" data-toggle="tooltip">X</button>';
                    datos_en_fila += '</tr>';
                });
                $('#mostrar-datos-busqueda').append(datos_en_fila);
                $("#Nro_resultados").html("<strong>Total de Actividades: " + nro_registros + '</strong>');
            } else {
                nro_registros = 0;
                $('#mostrar-datos-busqueda').html("");
                $("#Nro_resultados").html("<strong>Total de Actividades: " + nro_registros + '</strong>');
            }
        }
    });
}

$(document).ready(function () {
    $('.crear-tooltip').tooltip();
    listar_agenda();

    $("#txt_titulo_agenda").html("<strong><center> EDITAR AGENDA  </center> </strong>");

    $('#txt_fecha')
        .datepicker({ format: 'dd/mm/yyyy', autoclose: true })
        .on('changeDate', function (e) { });


    $(document).on('click', '.btn_editar', function () {
        var lc_leer_idagenda = $(this).attr("id"),
            lc_actividad = $(this).attr("actividad"),
            lc_lugar = $(this).attr("lugar"),
            lc_fecha = $(this).attr("fecha");

        $("#id_agenda").val(lc_leer_idagenda);
        $("#tipo_operacion").val(1);
        $("#txt_actividad").val(lc_actividad);
        $("#txt_lugar").val(lc_lugar);
        $("#txt_fecha").val(lc_fecha);
        $("#btn_grabar_agenda").attr("disabled", false);
        $('#modificar_agenda').modal({ show: true, backdrop: 'static' });
    });





    $("#btn_grabar_agenda").click(function () {
        var lc_leer_idagenda = $("#id_agenda").val(),
            lc_tipo_operacion = $("#tipo_operacion").val(),
            lc_actividad = $("#txt_actividad").val(),
            lc_lugar = $("#txt_lugar").val(),
            lc_fecha = $("#txt_fecha").val(),
            datos_agenda = {
                'id': lc_leer_idagenda, 'tipo': lc_tipo_operacion, 'actividad': lc_actividad, 'lugar': lc_lugar, 'fecha': lc_fecha
            };

        $.ajax({
            data: datos_agenda,
            dataType: 'json',
            url: url + 'agenda/grabar_agenda',
            type: 'post',
            beforeSend: function () {
                $("#txt_titulo_agenda").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
            },
            success: function (datos) {
                $("#txt_titulo_agenda").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setTimeout(function () {
                    $("#txt_titulo_agenda").html("<center>EDITAR AGENDA</center>");
                    $("#btn_grabar_agenda").attr("disabled", true);
                    listar_agenda();
                    $('#modificar_agenda').modal('toggle');
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
        var lc_leer_idagenda = $(this).attr("id"),
            data_elim = { 'id': lc_leer_idagenda };
        $.ajax({
            data: data_elim,
            dataType: 'json',
            url: url + 'agenda/eliminar_agenda',
            type: 'post',
            beforeSend: function () {
            },
            success: function () {
                listar_agenda();
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



    $("#btn_nuevo").click(function () {
        $("#id_agenda").val(0);
        $("#tipo_operacion").val(0);
        $("#txt_actividad").val();
        $("#txt_lugar").val();
        $("#txt_fecha").val();
        $("#btn_grabar_agenda").attr("disabled", false);
        $('#modificar_agenda').modal({ show: true, backdrop: 'static' });
    });










});

