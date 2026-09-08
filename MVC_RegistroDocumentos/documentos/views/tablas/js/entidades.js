var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    tabla, lc_buscar_entidad = '',
    lc_todos_usuario = '0',
    lc_tipo_operacion_entidad = '0',
    lc_buscar_treporte = '',
    nro_registros = 0,
    datos_en_fila = '',
    lc_tipo_operacion_tdoc = '0',
    lc_buscar_taccion = '',
    lc_tipo_operacion_taccion = '',
    lc_tipo_operacion_tprioridad = '',
    lc_tipo_operacion_treporte = '',
    lc_tipo_operacion_tactor = '';




/* para entidad */
function listar_entidad(lc_buscar_entidad) {
    var lc_select_entidad = $("#slt_lista_entidades"),
        lc_espera = $("#espera_entidad"),
        datos_listar = {
            'id': lc_buscar_entidad
        };
    $.ajax({
        data: datos_listar,
        dataType: 'json',
        url: url + 'expediente/mostrar_entidades',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.actor +
                        '"  actor = "' + filas.actor +
                        '"  descripcion = "' + filas.descripcion +
                        '"  abreviatura = "' + filas.abreviatura +
                        '"  responsable = "' + filas.responsable +
                        '"  tipo_actor = "' + filas.tipo_actor +
                        '"  mostrar_actor = "' + filas.mostrar_actor +
                        '"  codigo = "' + filas.codigo +
                        '"  actor_descripcion = "' + filas.actor_descripcion +
                        '"  area_de_actor = "' + filas.area_de_actor +
                        '"  descripcion_tipo_actor = "' + filas.descripcion_tipo_actor +
                        '"  direccion = "' + filas.direccion +
                        '"  telefono = "' + filas.telefono +
                        '"  ruc = "' + filas.ruc +
                        '"  >' + filas.actor_descripcion + '</option>');
                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true);
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

function leer_entidades_mostrarlo() {
    $("#msj_eliminado").html('').hide();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id');
    var lc_ver_si_selecciono_id_entidad = (typeof lc_id_entidad === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id_entidad === '1') {
        var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
            lc_tipo_entidad = $('#slt_lista_entidades option:selected').attr('descripcion_tipo_actor'),
            lc_descripcion = $('#slt_lista_entidades option:selected').attr('descripcion'),
            lc_direccion = $('#slt_lista_entidades option:selected').attr('direccion'),
            lc_telefono = $('#slt_lista_entidades option:selected').attr('telefono'),
            lc_ruc = $('#slt_lista_entidades option:selected').attr('ruc');
        $('#id_identidad')
            .val(lc_id_entidad);
        $('#id_tipo_actor').val(lc_tipo_entidad);
        $('#txt_descripcion').val(lc_descripcion).attr("disabled", true);
        // $('#txt_abreviatura').val(lc_abreviatura).attr("disabled", true);
        $('#txt_direccion').val(lc_direccion).attr("disabled", true);
        $('#txt_telefono').val(lc_telefono).attr("disabled", true);
        $('#txt_ruc').val(lc_ruc).attr("disabled", true);
        $('#btn_editar_entidad').attr("disabled", false);
        $('#btn_eliminar_entidad').attr("disabled", false);
    } else {
        $('#btn_editar_entidad').attr("disabled", true);
        $('#btn_grabar_entidad').attr("disabled", true);
        $('#btn_eliminar_entidad').attr("disabled", true);
    }
}

function desabilitar_etiquetas_entidad() {
    $('#txt_descripcion').attr("disabled", true);
    // $('#txt_abreviatura').attr("disabled", true);
    $('#txt_direccion').attr("disabled", true);
    $('#txt_telefono').attr("disabled", true);
    $('#txt_ruc').attr("disabled", true);
    $('#btn_editar_entidad').attr("disabled", true);
    $('#btn_grabar_entidad').attr("disabled", true);
    $("#msj_eliminado").html('').hide();


}

function desabilitar_y_limpiar_etiquetas_entidad() {
    $('#id_identidad').val('');
    $('#txt_direccion').val('').attr("disabled", false);
    $("#msj_eliminado").html('').hide();
    $('#txt_telefono').val('').attr("disabled", false);
    $('#txt_ruc').val('').attr("disabled", false);
    $('#btn_editar_entidad').attr("disabled", true);
    $('#btn_grabar_entidad').attr("disabled", true);
    $('#txt_descripcion').val('').attr("disabled", false).focus();
}



function grabar_nueva_entidad() {
    var lc_descripcion = $('#txt_descripcion').val(),
        lc_abreviatura = lc_descripcion,
        lc_direccion = $('#txt_direccion').val(),
        lc_telefono = $('#txt_telefono').val(),
        lc_ruc = $('#txt_ruc').val(),
        datos_grabar_entidad = {
            'descripcion': lc_descripcion,
            'abreviatura': lc_abreviatura,
            'direccion': lc_direccion,
            'telefono': lc_telefono,
            'ruc': lc_ruc
        }
    $.ajax({
        data: datos_grabar_entidad,
        dataType: 'json',
        url: url + 'expediente/grabar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            desabilitar_etiquetas_entidad();
            listar_entidad(lc_buscar_entidad);
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


function grabar_editar_entidad() {
    desabilitar_etiquetas_entidad();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        lc_descripcion = $('#txt_descripcion').val(),
        lc_abreviatura = lc_descripcion,
        lc_direccion = $('#txt_direccion').val(),
        lc_telefono = $('#txt_telefono').val(),
        lc_ruc = $('#txt_ruc').val(),
        datos_editar_entidad = {
            'id': lc_id_entidad,
            'descripcion': lc_descripcion,
            'abreviatura': lc_abreviatura,
            'direccion': lc_direccion,
            'telefono': lc_telefono,
            'ruc': lc_ruc
        }
    $.ajax({
        data: datos_editar_entidad,
        dataType: 'json',
        url: url + 'expediente/actualizar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_entidad(lc_buscar_entidad);
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

function eliminar_entidad() {
    desabilitar_etiquetas_entidad();
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        datos_eliminar_entidad = {
            'id': lc_id_entidad
        }
    $.ajax({
        data: datos_eliminar_entidad,
        dataType: 'json',
        url: url + 'expediente/eliminar_datos_entidad',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            var lc_confirma = datos[0].confirma;
            if (lc_confirma == '1') {
                $("#msj_eliminado").html("- NO SE PUEDE ELIMINAR - REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                proceder_a_eliminar();
                $("#msj_eliminado").html("- Eliminado - ").show();

            }
            listar_entidad(lc_buscar_entidad);
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


function proceder_a_eliminar() {
    var lc_id_entidad = $('#slt_lista_entidades option:selected').attr('id'),
        datos_eliminar_entidad_confirmar = {
            'id': lc_id_entidad
        }
    $.ajax({
        data: datos_eliminar_entidad_confirmar,
        dataType: 'json',
        url: url + 'expediente/eliminar_entidad_confirmar',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_entidad(lc_buscar_entidad);
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

/* fin de entidad */


/* Inicio de tipo de documento */

function eliminar_tdoc() {
    $("#msj_eliminado_tdocumento").html('').hide();
    var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        datos_eliminar_toc = { 'id': lc_id_tdoc };
    $.ajax({
        data: datos_eliminar_toc,
        dataType: 'json',
        url: url + 'expediente/eliminar_datos_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            var lc_confirma = datos[0].confirma;
            if (lc_confirma == '1') {
                $("#msj_eliminado_tdocumento").html("- REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                proceder_a_eliminar_tod();
                $("#msj_eliminado_tdocumento").html("- ELIMINADO - ").show();

            }
            listar_tipo_documento(lc_buscar_treporte);
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

function proceder_a_eliminar_tod() {
    var lc_id_tdoc = lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        datos_eliminar_toc_confirmar = { 'id': lc_id_tdoc }
    $.ajax({
        data: datos_eliminar_toc_confirmar,
        dataType: 'json',
        url: url + 'expediente/eliminar_tdoc_confirmar',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
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


function listar_tipo_documento(lc_buscar_treporte) {
    var lc_select_entidad = $("#slt_lista_tdoc"),
        lc_espera = $("#espera_tdoc"),
        datos_listar_treporte = {
            'id': lc_buscar_treporte
        };
    $.ajax({
        data: datos_listar_treporte,
        dataType: 'json',
        url: url + 'expediente/mostrar_tdocu',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_documento +
                        '"  actor = "' + filas.tipo_documento +
                        '"  descripcion = "' + filas.descrip_documento +
                        '"  resultado = "' + filas.resultado +
                        '"  >' + filas.resultado + '</option>');

                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
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

function leer_tipo_tdoc_y_mostrarlo() {
    $("#msj_eliminado_tdocumento").html('').hide();
    var lc_id_tdoc = $('#slt_lista_tdoc').attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id_tdoc === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
            lc_descripcion_tdoc = $('#slt_lista_tdoc option:selected').attr('descripcion');
        $('#id_tipodocumento').val(lc_id_tdoc);
        $('#txt_descripcion_tdocumento').val(lc_descripcion_tdoc).attr("disabled", true);
        $('#btn_editar_tdoc').attr("disabled", false);
        $('#btn_eliminar_tdoc').attr("disabled", false);
        $('#btn_grabar_tdocumento').attr("disabled", true);
    } else {
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
    }
}

function grabar_nueva_tdoc() {
    var lc_descripcion = $('#txt_descripcion_tdocumento').val(),
        datos_grabar_tdoc = {
            'descripcion': lc_descripcion
        }
    $.ajax({
        data: datos_grabar_tdoc,
        dataType: 'json',
        url: url + 'expediente/grabar_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
            $('#btn_editar_tdoc').attr("disabled", true);
            $('#btn_grabar_tdocumento').attr("disabled", true);
            $('#id_tipodocumento').val('');
            $("#txt_descripcion_tdocumento").val('').attr("disabled", true);
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

function grabar_editar_tdoc() {
    var lc_id_tdoc = $('#slt_lista_tdoc option:selected').attr('id'),
        lc_descripcion = $('#txt_descripcion_tdocumento').val(),
        datos_editar_tdoc = {
            'id': lc_id_tdoc,
            'descripcion': lc_descripcion
        }
    $.ajax({
        data: datos_editar_tdoc,
        dataType: 'json',
        url: url + 'expediente/editar_tdoc',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            listar_tipo_documento(lc_buscar_treporte);
            $('#btn_editar_tdoc').attr("disabled", true);
            $('#btn_grabar_tdocumento').attr("disabled", true);
            $('#id_tipodocumento').val('');
            $("#txt_descripcion_tdocumento").val('').attr("disabled", true);
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




/* Fin de tipo de documento */



/* inicio de tipo de accion */

function listar_tipo_accion(lc_buscar_taccion) {
    var lc_select_entidad = $("#slt_lista_accion"),
        lc_espera = $("#espera_taccion"),
        datos_listar_taccion = {
            'id': lc_buscar_taccion
        };
    $.ajax({
        data: datos_listar_taccion,
        dataType: 'json',
        url: url + 'tablas/mostrar_taccion',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_accion +
                        '"  accion = "' + filas.tipo_accion +
                        '"  descripcion = "' + filas.descripcion +
                        '"  resultado = "' + filas.resultado +
                        '"  >' + filas.resultado + '</option>');
                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
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


    $("#slt_lista_accion").select2({
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

function leer_tipo_accion_y_mostrarlo() {
    $("#msj_eliminado_taccion").html('').hide();
    var lc_id_tact = $('#slt_lista_accion').attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id_tact === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id_tact = $('#slt_lista_accion option:selected').attr('id'),
            lc_descripcion_tacc = $('#slt_lista_accion option:selected').attr('descripcion');
        $('#id_tipoaccion').val(lc_id_tact);
        $('#txt_descripcion_tacc').val(lc_descripcion_tacc).attr("disabled", true);
        $('#btn_editar_taccion').attr("disabled", false);
        $('#btn_eliminar_taccion').attr("disabled", false);
        $('#btn_grabar_tacc').attr("disabled", true);
    } else {
        $('#btn_editar_taccion').attr("disabled", true);
        $('#btn_grabar_tacc').attr("disabled", true);
        $('#btn_eliminar_taccion').attr("disabled", true);
    }
}

function actualizar_desabilitar_etiqueta_accion() {
    listar_tipo_accion(lc_buscar_taccion);
    $('#btn_editar_taccion').attr("disabled", true);
    $('#btn_grabar_tacc').attr("disabled", true);
    $('#id_tipoaccion').val('');
    $("#txt_descripcion_tacc").val('').attr("disabled", true);
    $('#btn_eliminar_taccion').attr("disabled", true);
    $("#msj_eliminado_taccion").fadeOut("slow");


}

function grabar_nueva_editar_taccion(lc_tipo_operacion_taccion) {
    var lc_descripcion = $('#txt_descripcion_tacc').val(),
        lid_codigo, datos_grabar_tacc;
    if (lc_tipo_operacion_taccion == '1') {
        lid_codigo = 0;
    } else {
        lid_codigo = $('#id_tipoaccion').val();
    }
    datos_grabar_tacc = {
        'descripcion': lc_descripcion,
        'tipo_operacion': lc_tipo_operacion_taccion,
        'id': lid_codigo
    }
    $.ajax({
        data: datos_grabar_tacc,
        dataType: 'json',
        url: url + 'tablas/grabar_taccion',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            actualizar_desabilitar_etiqueta_accion();
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

function eliminar_taccion() {
    $("#msj_eliminado_taccion").html('');
    var lc_id_tacc = $('#slt_lista_accion option:selected').attr('id'),
        datos_eliminar_tid = { 'id': lc_id_tacc };
    $.ajax({
        data: datos_eliminar_tid,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_tacc',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            if (datos.registros == 0) {
                setInterval(function() {
                    $("#msj_eliminado_taccion").html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
                }, 2000);
            } else {
                setInterval(function() {
                    $("#msj_eliminado_taccion").html("-  ELIMINADO - ").show();
                }, 2000);
            }
            actualizar_desabilitar_etiqueta_accion();
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

/* fin de tipo de accion */


/* Inicio de Funciones para tipos de prioridad */

function listar_tipo_prioridad() {
    var lc_select_entidad = $("#slt_lista_prioridad"),
        lc_espera = $("#espera_prioridad");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_tprioridad',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_prioridad +
                        '"  tipo_prioridad = "' + filas.tipo_prioridad +
                        '"  dias = "' + filas.dias +
                        '"  descripcion = "' + filas.descripcion +
                        '"  resultado = "' + filas.resultado +
                        '"  >' + filas.resultado + '</option>');
                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
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

function leer_tipo_prioridad_y_mostrarlo() {
    $("#espera_prioridad").html('');
    var lc_id_tact = $('#slt_lista_prioridad').attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id_tact === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id_tprio = $('#slt_lista_prioridad option:selected').attr('id'),
            lc_descripcion_tprio = $('#slt_lista_prioridad option:selected').attr('descripcion'),
            lc_dias_tprio = $('#slt_lista_prioridad option:selected').attr('dias');

        $('#id_tipoprioridad').val(lc_id_tprio);
        $('#txt_descripcion_prioridad').val(lc_descripcion_tprio).attr("disabled", true);
        $('#txt_dias').val(lc_dias_tprio).attr("disabled", true);

        $('#btn_editar_tprioridad').attr("disabled", false);
        $('#btn_eliminar_tprioridad').attr("disabled", false);
        $('#btn_grabar_tprioridad').attr("disabled", true);
    } else {
        $('#btn_editar_tprioridad').attr("disabled", true);
        $('#btn_grabar_tprioridad').attr("disabled", true);
        $('#btn_eliminar_tprioridad').attr("disabled", true);
    }

}

function desabilitar_etiquetas_prioridad() {
    $("#msj_eliminado_tprioridad").html('').hide();
    $('#btn_editar_tprioridad').attr("disabled", true);
    $('#btn_grabar_tprioridad').attr("disabled", true);
    $('#id_tipoprioridad').val('');
    if (lc_tipo_operacion_tprioridad === '1') {
        $("#txt_descripcion_prioridad").val('').attr("disabled", false).focus();
    } else {
        $("#txt_descripcion_prioridad").val('').attr("disabled", true);
    }

    $("#txt_dias").val('').attr("disabled", true);
    $('#btn_grabar_tprioridad').attr("disabled", true);
    $('#btn_editar_tprioridad').attr("disabled", true);
    $('#btn_eliminar_tprioridad').attr("disabled", true);
}

function grabar_nueva_editar_tprioridad(lc_tipo_operacion_tprioridad) {
    var lc_descripcion_tprio = $('#txt_descripcion_prioridad').val(),
        lc_dias = $('#txt_dias').val(),
        lid_tprioridad, datos_grabar_tprioridad;

    if (lc_tipo_operacion_tprioridad == '1') {
        lid_tprioridad = 0;
    } else {
        lid_tprioridad = $('#id_tipoprioridad').val();
    }

    datos_grabar_tprioridad = {
        'descripcion': lc_descripcion_tprio,
        'dias': lc_dias,
        'tipo_operacion': lc_tipo_operacion_tprioridad,
        'id': lid_tprioridad
    };

    $.ajax({
        data: datos_grabar_tprioridad,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_tprio',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_tprioridad = '';
            desabilitar_etiquetas_prioridad();
            listar_tipo_prioridad();

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

function eliminar_tprioridad() {
    var lc_etiqueta_msj = $("#msj_eliminado_tprioridad"),
        lc_id_tpri = $('#id_tipoprioridad').val(),
        lc_espera = $("#espera_prioridad"),
        datos_eliminar_tpri = { 'id': lc_id_tpri };
    lc_etiqueta_msj.html('').hide();
    console.log(datos_eliminar_tpri);
    $.ajax({
        data: datos_eliminar_tpri,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_tprioridad',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                setInterval(function() {
                    lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
                }, 2000);
            } else {
                setInterval(function() {
                    lc_etiqueta_msj.html("-  ELIMINADO - ").show();
                }, 2000);
            }
            desabilitar_etiquetas_prioridad();
            listar_tipo_prioridad();

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

/* fin de funciones para tipo de prioridad */



/* inicio de funciones tipo de reporte */

function listar_tipo_treporte() {
    var lc_select_entidad = $("#slt_lista_reporte"),
        lc_espera = $("#espera_treporte");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_treporte',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_reporte +
                        '"  tipo_reporte = "' + filas.tipo_reporte +
                        '"  nombre = "' + filas.nombre +
                        '"  resultado = "' + filas.resultado +
                        '"  >' + filas.resultado + '</option>');


                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
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

    $("#slt_lista_reporte").select2({
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


function leer_tipo_reporte_mostrarlo() {
    $("#espera_prioridad").html('');
    $("#msj_eliminado_treporte").html('').hide();
    var lc_id_trepor = $('#slt_lista_reporte option:selected').attr('id'),
        lc_ver_si_selecciono_id = (typeof lc_id_trepor === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id_trepor = $('#slt_lista_reporte option:selected').attr('id'),
            lc_descripcion_trepo = $('#slt_lista_reporte option:selected').attr('nombre');
        $('#id_treporte').val(lc_id_trepor);
        $('#txt_descripcion_trepo').val(lc_descripcion_trepo).attr("disabled", true);
        $('#btn_editar_treporte').attr("disabled", false);
        $('#btn_eliminar_treporte').attr("disabled", false);
        $('#btn_grabar_trepo').attr("disabled", true);
    } else {
        $('#btn_editar_treporte').attr("disabled", true);
        $('#btn_grabar_trepo').attr("disabled", true);
        $('#btn_eliminar_treporte').attr("disabled", true);
    }

}


function desabilitar_y_limpiar_etiquetas_treporte() {
    $('#id_treporte').val('');
    $('#txt_descripcion_trepo').val('').attr("disabled", false);
    $("#msj_eliminado_treporte").html('').hide();
    $('#btn_editar_treporte').attr("disabled", true);
    $('#btn_grabar_trepo').attr("disabled", true);
    switch (lc_tipo_operacion_treporte) {
        case '1':
            $('#txt_descripcion_trepo').val('').attr("disabled", false).focus();
            break;
        case '2':
            $('#txt_descripcion_trepo').attr("disabled", false).focus();
            break;
        default:
            $('#txt_descripcion_trepo').attr("disabled", true).focus();
            break;
    }

}

function grabar_nueva_editar_treporte(lc_tipo_operacion_treporte) {
    var lc_descripcion_trepo = $('#txt_descripcion_trepo').val(),
        lid_id_treporte, datos_grabar_treporte;

    if (lc_tipo_operacion_treporte == '1') {
        lid_id_treporte = 0;
    } else {
        lid_id_treporte = $('#id_treporte').val();
    }

    datos_grabar_treporte = {
        'descripcion': lc_descripcion_trepo,
        'tipo_operacion': lc_tipo_operacion_treporte,
        'id': lid_id_treporte
    };


    $.ajax({
        data: datos_grabar_treporte,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_treporte',
        type: 'post',
        beforeSend: function() {},
        success: function(datos) {
            lc_tipo_operacion_treporte = '';
            desabilitar_y_limpiar_etiquetas_treporte();
            listar_tipo_treporte();

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



function eliminar_trepor() {
    var lc_etiqueta_msj = $("#msj_eliminado_treporte"),
        lc_id_trepor = $('#id_treporte').val(),
        lc_espera = $("#espera_treporte"),
        datos_eliminar_trepor = { 'id': lc_id_trepor };
    lc_etiqueta_msj.html('').hide();

    $.ajax({
        data: datos_eliminar_trepor,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_trepor',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                setInterval(function() {
                    lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
                }, 2000);
            } else {
                setInterval(function() {
                    lc_etiqueta_msj.html("-  ELIMINADO - ").show();
                }, 2000);
            }
            lc_tipo_operacion_treporte = '';
            desabilitar_y_limpiar_etiquetas_treporte();
            listar_tipo_treporte();

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



/* Fin de funciones tipo de reporte */


/* Inicio de funciones tipo de actor */



function listar_tipo_tactor() {
    var lc_select_entidad = $("#slt_lista_tactor"),
        lc_espera = $("#espera_tactor");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_tactor',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            lc_select_entidad
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function(filas) {
                if (filas.respuesta === 1) {
                    lc_select_entidad.append('<option id="' + filas.tipo_actor +
                        '"  tipo_actor = "' + filas.tipo_actor +
                        '"  descripcion = "' + filas.descripcion +
                        '"  tipo = "' + filas.tipo +
                        '"  >' + filas.descripcion + '</option>');
                    lc_select_entidad.attr("disabled", false);
                } else {
                    lc_select_entidad.attr("disabled", true).html('');
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


function leer_tipo_actor_mostrarlo() {
    $("#espera_tactor").html('');
    $("#msj_eliminado_tactor").html("").hide();
    var lc_id = $('#slt_lista_tactor option:selected').attr('id'),
        lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id = $('#slt_lista_tactor option:selected').attr('id'),
            lc_descripcion = $('#slt_lista_tactor option:selected').attr('descripcion'),
            lc_tipo_actor = $('#slt_lista_tactor option:selected').attr('tipo');
        $('#id_tactor').val(lc_id);
        $('#txt_descripcion_tactor').val(lc_descripcion).attr("disabled", true);
        $('#txt_tactor').val(lc_tipo_actor).attr("disabled", true);
        $('#btn_editar_tactor').attr("disabled", false);
        $('#btn_eliminar_tactor').attr("disabled", false);
        $('#btn_grabar_tactor').attr("disabled", true);
    } else {
        $('#btn_editar_tactor').attr("disabled", true);
        $('#btn_grabar_tactor').attr("disabled", true);
        $('#btn_eliminar_tactor').attr("disabled", true);
    }

}


function desabilitar_y_limpiar_etiquetas_tactor(lc_tipo_operacion_tactor) {
    $('#id_tactor').val('');
    $("#msj_eliminado_tactor").html('').hide();
    $('#btn_editar_tactor').attr("disabled", true);
    $('#btn_grabar_tactor').attr("disabled", true);
    switch (lc_tipo_operacion_tactor) {
        case '1':
            $('#txt_descripcion_tactor').val('').attr("disabled", false).focus();
            $('#txt_tactor').val('').attr("disabled", true);
            break;
        case '2':
            $('#txt_descripcion_tactor').attr("disabled", false).focus();
            $('#txt_tactor').attr("disabled", false);
            break;
        default:
            $('#txt_descripcion_tactor').attr("disabled", true);
            $('#txt_tactor').attr("disabled", true);
            break;
    }
}


function grabar_nueva_editar_tactor(lc_tipo_operacion_tactor) {
    var lc_descripcion_tactor = $('#txt_descripcion_tactor').val(),
        lc_tipo_actor = $('#txt_tactor').val(),
        lid_id, datos_grabar_tactor;
    if (lc_tipo_operacion_tactor == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_tactor').val();
    }
    datos_grabar_tactor = {
        'descripcion': lc_descripcion_tactor,
        'tipo_operacion': lc_tipo_operacion_tactor,
        'id': lid_id,
        'tipo': lc_tipo_actor
    };
    console.log(datos_grabar_tactor);
    $.ajax({
        data: datos_grabar_tactor,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_tactor',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_tactor = '';
            desabilitar_y_limpiar_etiquetas_tactor(lc_tipo_operacion_tactor);
            listar_tipo_tactor();
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


function eliminar_tactor() {
    var lc_etiqueta_msj = $("#msj_eliminado_tactor"),
        lc_id_tactor = $('#id_tactor').val(),
        lc_espera = $("#espera_tactor"),
        datos_eliminar_tactor = { 'id': lc_id_tactor };
    lc_etiqueta_msj.html('').hide();

    $.ajax({
        data: datos_eliminar_tactor,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_tactor',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                setInterval(function() {
                    lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
                }, 2000);
            } else {
                setInterval(function() {
                    lc_etiqueta_msj.html("-  ELIMINADO - ").show();
                }, 2000);
            }
            lc_etiqueta_msj.hide();
            lc_tipo_operacion_tactor = '';
            desabilitar_y_limpiar_etiquetas_tactor(lc_tipo_operacion_tactor);
            listar_tipo_tactor();

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

/* Fin  de funciones tipo de actor */












$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    listar_entidad(lc_buscar_entidad);
    listar_tipo_documento(lc_buscar_treporte);

    /* Inicio de entidad */
    $("#txt_buscar_entidad")
        .focus()
        .keyup(function() {
            lc_buscar_entidad = $("#txt_buscar_entidad").val();
            listar_entidad(lc_buscar_entidad);
        });
    $("#slt_lista_entidades")
        .click(function() {
            leer_entidades_mostrarlo();
        })
        .keyup(function() {
            leer_entidades_mostrarlo();
        });
    $("#btn_nuevo_entidad").click(function() {
        lc_tipo_operacion_entidad = '1';
        desabilitar_y_limpiar_etiquetas_entidad();
    });

    $("#btn_editar_entidad").click(function() {
        lc_tipo_operacion_entidad = '2';
        $('#txt_descripcion').attr("disabled", false);
        $('#txt_telefono').attr("disabled", false);
        $('#txt_ruc').attr("disabled", false);
        $('#txt_direccion').attr("disabled", false);
        $('#btn_grabar_entidad').attr("disabled", false);
        $('#txt_descripcion').attr("disabled", false).focus();
    });

    $('#btn_eliminar_entidad').click(function() {
        eliminar_entidad();
        $('#txt_descripcion').val('').attr("disabled", true);
        $('#txt_telefono').val('').attr("disabled", true);
        $('#txt_ruc').val('').attr("disabled", true);
        $('#txt_direccion').val('').attr("disabled", true);
        $('#btn_grabar_entidad').attr("disabled", true);
        $('#btn_eliminar_entidad').attr("disabled", true);

    });

    $("#txt_descripcion").keypress(function(e) {
        var etiqueta_jquery = $("#txt_direccion");
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#txt_direccion").keypress(function(e) {
        var etiqueta_jquery = $('#txt_telefono');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $('#txt_telefono').keypress(function(e) {
        var etiqueta_jquery = $('#txt_ruc');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $('#txt_ruc').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_entidad');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#btn_grabar_entidad").click(function() {
        switch (lc_tipo_operacion_entidad) {
            case '1':
                grabar_nueva_entidad();
                break;
            case '2':
                grabar_editar_entidad();
                break;
            default:
                break;
        }

    });

    /* Fin de entidad */


    /* inicio de tipo de documento */

    $("#txt_buscar_tdoc")
        .focus()
        .keyup(function() {
            lc_buscar_treporte = $("#txt_buscar_tdoc").val();
            listar_tipo_documento(lc_buscar_treporte);
        });



    $("#slt_lista_tdoc")
        .click(function() {
            leer_tipo_tdoc_y_mostrarlo();
        })
        .keyup(function() {
            leer_tipo_tdoc_y_mostrarlo();
        });

    $("#btn_nuevo_tdoc").click(function() {
        lc_tipo_operacion_tdoc = '1';
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $('#id_tipodocumento').val('');
        $("#txt_descripcion_tdocumento").val('').attr("disabled", false).focus();
    });


    $("#btn_editar_tdoc").click(function() {
        lc_tipo_operacion_tdoc = '2';
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", false);
        $("#txt_descripcion_tdocumento").attr("disabled", false).focus();
    });


    $('#txt_descripcion_tdocumento').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tdocumento');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });



    $("#btn_grabar_tdocumento").click(function() {
        switch (lc_tipo_operacion_tdoc) {
            case '1':
                grabar_nueva_tdoc();
                break;
            case '2':
                grabar_editar_tdoc();
                break;
            default:
                break;
        }

    });


    $('#btn_eliminar_tdoc').click(function() {
        eliminar_tdoc();
        $('#btn_editar_tdoc').attr("disabled", true);
        $('#btn_eliminar_tdoc').attr("disabled", true);
        $('#btn_grabar_tdocumento').attr("disabled", true);
        $("#txt_descripcion_tdocumento").attr("disabled", true);
    });


    /* Fin de tipo de documento */




    /* inicio de tipo de accion */
    listar_tipo_accion(lc_buscar_taccion);
    $("#slt_lista_accion")
        .click(function() {
            leer_tipo_accion_y_mostrarlo();
        })
        .keyup(function() {
            leer_tipo_accion_y_mostrarlo();
        });



    $("#btn_nuevo_taccion").click(function() {
        lc_tipo_operacion_taccion = '1';
        $('#btn_editar_taccion').attr("disabled", true);
        $('#btn_grabar_tacc').attr("disabled", true);
        $('#id_tipoaccion').val('');
        $("#txt_descripcion_tacc").val('').attr("disabled", false).focus();
    });


    $("#btn_editar_taccion").click(function() {
        lc_tipo_operacion_taccion = '2';
        $('#btn_editar_taccion').attr("disabled", true);
        $('#btn_eliminar_taccion').attr("disabled", true);
        $('#btn_grabar_tacc').attr("disabled", false);
        $("#txt_descripcion_tacc").attr("disabled", false).focus();
    });


    $('#txt_descripcion_tacc').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tacc');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $("#btn_grabar_tacc").click(function() {
        grabar_nueva_editar_taccion(lc_tipo_operacion_taccion);
    });


    $('#btn_eliminar_taccion').click(function() {
        eliminar_taccion();
        $('#btn_editar_taccion').attr("disabled", true);
        $('#btn_eliminar_taccion').attr("disabled", true);
        $('#btn_grabar_tacc').attr("disabled", true);
        $("#txt_descripcion_tacc").attr("disabled", true);
    });

    $("#btn_cancelar_tacc").click(function() {
        actualizar_desabilitar_etiqueta_accion();
    });

    /* fin de tipo de accion */



    /* Inicio de codigos para tipos de prioridad */


    listar_tipo_prioridad();
    $("#slt_lista_prioridad")
        .click(function() {
            leer_tipo_prioridad_y_mostrarlo();

        })
        .keyup(function() {
            leer_tipo_prioridad_y_mostrarlo();
        });



    $("#btn_nuevo_tprioridad").click(function() {
        lc_tipo_operacion_tprioridad = '1';
        desabilitar_etiquetas_prioridad();
    });

    $("#btn_editar_tprioridad").click(function() {
        lc_tipo_operacion_tprioridad = '2';
        $('#btn_editar_tprioridad').attr("disabled", true);
        $('#btn_eliminar_tprioridad').attr("disabled", true);
        $("#txt_descripcion_prioridad").attr("disabled", false);
        $("#txt_dias").attr("disabled", false);
        $('#btn_grabar_tprioridad').attr("disabled", false);

    });

    $('#txt_descripcion_prioridad').keypress(function(e) {
        var etiqueta_jquery = $('#txt_dias');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $('#txt_dias').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tprioridad');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#btn_grabar_tprioridad").click(function() {
        grabar_nueva_editar_tprioridad(lc_tipo_operacion_tprioridad);
    });




    $('#btn_eliminar_tprioridad').click(function() {
        eliminar_tprioridad();
        $('#btn_editar_tprioridad').attr("disabled", true);
        $('#btn_eliminar_tprioridad').attr("disabled", true);
        $('#btn_grabar_tprioridad').attr("disabled", true);
        $("#txt_descripcion_prioridad").attr("disabled", true);
        $("#txt_dias").attr("disabled", true);

    });

    $("#btn_cancelar_tprioridad").click(function() {
        desabilitar_etiquetas_prioridad();
    });
    /* fin de codigos para tipo de prioridad */

    /* inicio de codigos de tipo de reporte */

    listar_tipo_treporte();
    $("#slt_lista_reporte")
        .click(function() {
            leer_tipo_reporte_mostrarlo();
        })
        .keyup(function() {
            leer_tipo_reporte_mostrarlo();
        });

    $("#btn_nuevo_treporte").click(function() {
        lc_tipo_operacion_treporte = '1';
        desabilitar_y_limpiar_etiquetas_treporte();

    });

    $("#btn_editar_treporte").click(function() {
        lc_tipo_operacion_treporte = '2';
        $("#msj_eliminado_treporte").html('').hide();
        $('#btn_grabar_trepo').attr("disabled", false);
        $('#txt_descripcion_trepo').attr("disabled", false).focus();

    });

    $('#txt_descripcion_trepo').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_trepo');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#btn_grabar_trepo").click(function() {
        grabar_nueva_editar_treporte(lc_tipo_operacion_treporte);
    });

    $('#btn_eliminar_treporte').click(function() {
        eliminar_trepor();
        $('#btn_editar_treporte').attr("disabled", true);
        $('#btn_eliminar_treporte').attr("disabled", true);
        $('#btn_grabar_trepo').attr("disabled", true);
        $("#txt_descripcion_trepo").attr("disabled", true);

    });


    /* fin  de codigos de tipo de reporte */



    /* Inicio de codigos tipo de actor */

    listar_tipo_tactor();
    $("#slt_lista_tactor")
        .click(function() {
            leer_tipo_actor_mostrarlo();
        })
        .keyup(function() {
            leer_tipo_actor_mostrarlo();
        });

    $("#btn_nuevo_tactor").click(function() {
        lc_tipo_operacion_tactor = '1';
        desabilitar_y_limpiar_etiquetas_tactor(lc_tipo_operacion_tactor);

    });

    $("#btn_editar_tactor").click(function() {
        lc_tipo_operacion_tactor = '2';
        $("#msj_eliminado_tactor").html('').hide();
        $('#btn_grabar_tactor').attr("disabled", false);
        $('#id_tactor').attr("disabled", false);
        $('#txt_descripcion_tactor').attr("disabled", false).focus();

    });

    $('#txt_descripcion_tactor').keypress(function(e) {
        var etiqueta_jquery = $('#txt_tactor');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $('#txt_tactor').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tactor');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#btn_grabar_tactor").click(function() {
        grabar_nueva_editar_tactor(lc_tipo_operacion_tactor);

    });

    $('#btn_eliminar_tactor').click(function() {
        eliminar_tactor();
        $('#btn_editar_tactor').attr("disabled", true);
        $('#btn_eliminar_tactor').attr("disabled", true);
        $('#btn_grabar_tactor').attr("disabled", false);
        $("#txt_descripcion_tactor").attr("disabled", true);

    });



    /* Fin  de codigos tipo de actor */













});