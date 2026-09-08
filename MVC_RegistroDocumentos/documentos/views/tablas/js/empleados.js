var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    lc_tipo_operacion_empleado = '',
    lc_buscar_comite = '',
    lc_buscar_empleado = '',
    lc_tipo_operacion_comite = '',
    lc_tipo_operacion_trami = '',
    lc_tipo_operacion_expe = '',
    lc_tipo_operacion_alerta = '';



/* inicio de funciones empleados */
function listar_empleados(lc_buscar_empleado) {
    var lc_select_entidad = $("#slt_lista_empleado"),
        lc_espera = $("#espera_empleados"),
        data_empleado = { 'id': lc_buscar_empleado };
    $.ajax({
        data: data_empleado,
        dataType: 'json',
        url: url + 'tablas/mostrar_empleados',
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
                        '"  tipo = "' + filas.tipo +
                        '"  ruc = "' + filas.ruc +
                        '"  >' + filas.actor + ' - ' + filas.descripcion + '</option>');
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

function leer_empleado_mostrarlo() {
    $("#espera_empleados").html('');
    $("#msj_eliminado_empleado").html('').hide();
    var lc_id = $('#slt_lista_empleado option:selected').attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_id = $('#slt_lista_empleado option:selected').attr('id'),
            lc_actor = $('#slt_lista_empleado option:selected').attr('actor'),
            lc_descripcion = $('#slt_lista_empleado option:selected').attr('descripcion'),
            lc_abreviatura = $('#slt_lista_empleado option:selected').attr('abreviatura'),
            lc_tipo = $('#slt_lista_empleado option:selected').attr('tipo'),
            lc_ruc = $('#slt_lista_empleado option:selected').attr('ruc');
        $('#id_empleado').val(lc_actor);
        $('#id_tactor').val(lc_tipo);
        $('#txt_empleado').val(lc_descripcion);
        $('#txt_abreviatura').val(lc_abreviatura);
        $('#txt_ruc').val(lc_ruc);
        $('#btn_editar_empleado').attr("disabled", false);
        $('#btn_eliminar_empleado').attr("disabled", false);
        $('#btn_grabar_empleado').attr("disabled", true);
    } else {
        $('#btn_editar_empleado').attr("disabled", true);
        $('#btn_eliminar_empleado').attr("disabled", true);
        $('#btn_grabar_empleado').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado) {
    $("#espera_empleados").html('');
    $("#msj_eliminado_empleado").html('').hide();
    switch (lc_tipo_operacion_empleado) {
        case '1':
            $('#txt_empleado').val('').attr("disabled", false).focus();
            $('#id_empleado').val('').attr("disabled", false);
            $('#txt_empleado').val('');
            $('#txt_abreviatura').val('');
            $('#txt_ruc').val('');
            break;
        case '2':
            $('#txt_empleado').attr("disabled", false).focus();
            $('#id_empleado').attr("disabled", false);
            $('#txt_empleado').attr("disabled", false);
            $('#txt_abreviatura').attr("disabled", false);
            $('#txt_ruc').attr("disabled", false);
            $('#btn_grabar_empleado').attr("disabled", false);
            break;
        default:
            $('#id_empleado').val('').attr("disabled", true);
            $('#id_tactor').val('').attr("disabled", true);
            $('#txt_empleado').val('').attr("disabled", true);
            $('#txt_abreviatura').val('').attr("disabled", true);
            $('#txt_ruc').val('').attr("disabled", true);
            break;
    }

}

function grabar_nueva_editar_empleado(lc_tipo_operacion_empleado) {
    var lc_descripcion = $('#txt_empleado').val(),
        lc_abreviatura = $('#txt_abreviatura').val(),
        lc_ruc = $('#txt_ruc').val(),
        lid_id, datos_grabar_temple;
    if (lc_tipo_operacion_empleado == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_empleado').val();
    }
    datos_grabar_temple = {
        'descripcion': lc_descripcion,
        'abreviatura': lc_abreviatura,
        'ruc': lc_ruc,
        'tipo_operacion': lc_tipo_operacion_empleado,
        'id': lid_id
    };
    $.ajax({
        data: datos_grabar_temple,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_empleado',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_buscar_empleado = '', lc_tipo_operacion_empleado = '';
            listar_empleados(lc_buscar_empleado);
            desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado);
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

function eliminar_templeado() {
    var lc_etiqueta_msj = $("#msj_eliminado_empleado"),
        lc_id = $('#id_empleado').val(),
        lc_espera = $("#espera_empleados"),
        datos_eliminar_empleado = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();
    $.ajax({
        data: datos_eliminar_empleado,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_empleado',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_buscar_empleado = '', lc_tipo_operacion_empleado = '';
            listar_empleados(lc_buscar_empleado);
            desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado);
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

/* Fin de funciones empleados */



/* inicio FUNCIONES de seccion COMITES */

function listar_comites(lc_buscar_comite) {
    var lc_select_entidad = $("#slt_lista_comite"),
        lc_espera = $("#espera_comite"),
        data_comite = { 'id': lc_buscar_comite };
    $.ajax({
        data: data_comite,
        dataType: 'json',
        url: url + 'tablas/mostrar_comite',
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
                        '"  tipo = "' + filas.tipo +
                        '"  ruc = "' + filas.ruc +
                        '"  >' + filas.actor + ' - ' + filas.descripcion + '</option>');
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

function leer_comite_mostrarlo() {
    $("#espera_comite").html('');
    $("#msj_eliminado_comite").html('').hide();
    var lc_etiqueta_select = $('#slt_lista_comite option:selected'),
        lc_id = lc_etiqueta_select.attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        lc_actor = lc_etiqueta_select.attr('actor'),
            lc_descripcion = lc_etiqueta_select.attr('descripcion');
        $('#id_comite').val(lc_actor);
        $('#txt_descripcion_comite').val(lc_descripcion);
        $('#btn_editar_comite').attr("disabled", false);
        $('#btn_eliminar_comite').attr("disabled", false);
        $('#btn_grabar_comite').attr("disabled", true);
    } else {
        $('#btn_editar_comite').attr("disabled", true);
        $('#btn_eliminar_comite').attr("disabled", true);
        $('#btn_grabar_comite').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite) {
    $("#espera_comite").html('');
    $("#msj_eliminado_comite").html('').hide();
    switch (lc_tipo_operacion_comite) {
        case '1':
            $('#id_comite').val('').attr("disabled", true);
            $('#btn_grabar_comite').attr("disabled", false);
            $('#txt_descripcion_comite').val('').attr("disabled", false).focus();
            break;

        case '2':
            $('#id_comite').attr("disabled", true);
            $('#btn_grabar_comite').attr("disabled", true);
            $('#txt_descripcion_comite').attr("disabled", false).focus();
            break;
        default:
            $('#id_comite').attr("disabled", true);
            $('#btn_grabar_comite').attr("disabled", true);
            $('#txt_descripcion_comite').val('').attr("disabled", true);
            break;
    }

}

function grabar_nueva_editar_comite(lc_tipo_operacion_comite) {
    var lc_descripcion = $('#txt_descripcion_comite').val(),
        lid_id, datos_grabar_comite;
    if (lc_tipo_operacion_comite == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_comite').val();
    }
    datos_grabar_comite = {
        'descripcion': lc_descripcion,
        'tipo_operacion': lc_tipo_operacion_comite,
        'id': lid_id
    };
    $.ajax({
        data: datos_grabar_comite,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_comite',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_buscar_comite = '', lc_tipo_operacion_comite = '';
            listar_comites(lc_buscar_comite);
            desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite);
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


function eliminar_comite() {
    var lc_etiqueta_msj = $("#msj_eliminado_comite"),
        lc_id = $('#id_comite').val(),
        lc_espera = $("#espera_comite"),
        datos_eliminar_comite = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();
    $.ajax({
        data: datos_eliminar_comite,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_comite',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_buscar_comite = '', lc_tipo_operacion_comite = '';
            listar_comites(lc_buscar_comite);
            desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite);
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

/* Fin de funciones seccion COMITE */


/* Inicio FUNCIONES de seccion forma documentos */


function listar_fdocu() {
    var lc_select_entidad = $("#slt_lista_fdocu"),
        lc_espera = $("#espera_fdocu");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_fdocu',
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
                    lc_select_entidad.append('<option id="' + filas.forma_documento +
                        '"  forma_documento = "' + filas.forma_documento +
                        '"  nombre = "' + filas.nombre +
                        '"  >' + filas.forma_documento + ' - ' + filas.nombre + '</option>');
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

function leer_fdocu_mostrarlo() {
    $("#espera_fdocu").html('');
    $("#msj_eliminado_fd").html('').hide();
    var lc_etiqueta_select = $('#slt_lista_fdocu option:selected'),
        lc_id = lc_etiqueta_select.attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        lc_actor = lc_etiqueta_select.attr('forma_documento'),
            lc_descripcion = lc_etiqueta_select.attr('nombre');
        $('#id_fd').val(lc_actor);
        $('#txt_descripcion_fdocu').val(lc_descripcion);

        $('#btn_editar_fdocu').attr("disabled", false);
        $('#btn_eliminar_fdocu').attr("disabled", false);
        $('#btn_grabar_fdocu').attr("disabled", true);
    } else {
        $('#btn_editar_fdocu').attr("disabled", true);
        $('#btn_eliminar_fdocu').attr("disabled", true);
        $('#btn_grabar_fdocu').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_fdocu(lc_tipo_operacion_fdocu) {
    $("#espera_fdocu").html('');
    $("#msj_eliminado_fd").html('').hide();
    switch (lc_tipo_operacion_fdocu) {
        case '1':
            $('#id_fd').val('').attr("disabled", false).focus();
            $('#btn_grabar_fdocu').attr("disabled", false);
            $('#txt_descripcion_fdocu').val('').attr("disabled", false);
            break;

        case '2':
            $('#id_fd').attr("disabled", true);
            $('#btn_grabar_fdocu').attr("disabled", true);
            $('#txt_descripcion_fdocu').attr("disabled", false).focus();
            break;
        default:
            $('#id_fd').attr("disabled", true);
            $('#btn_grabar_fdocu').attr("disabled", true);
            $('#txt_descripcion_fdocu').val('').attr("disabled", true);
            break;
    }

}

function grabar_nueva_editar_fdocu(lc_tipo_operacion_fdocu) {
    var lc_descripcion = $('#txt_descripcion_fdocu').val(),
        lid_id, datos_grabar_fdocu;
    if (lc_tipo_operacion_fdocu == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_fd').val();
    }
    datos_grabar_fdocu = {
        'descripcion': lc_descripcion,
        'tipo_operacion': lc_tipo_operacion_fdocu,
        'id': lid_id
    };
    console.log(datos_grabar_fdocu);

    $.ajax({
        data: datos_grabar_fdocu,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_fdocu',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_fdocu = '';
            listar_fdocu();
            desabilitar_y_limpiar_etiquetas_fdocu(lc_tipo_operacion_fdocu);
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

function eliminar_fdocu() {
    var lc_etiqueta_msj = $("#msj_eliminado_fd"),
        lc_id = $('#id_fd').val(),
        lc_espera = $("#espera_fdocu"),
        datos_eliminar_fdocu = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();
    $.ajax({
        data: datos_eliminar_fdocu,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_fdocu',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_tipo_operacion_fdocu = '';
            listar_fdocu();
            desabilitar_y_limpiar_etiquetas_fdocu(lc_tipo_operacion_fdocu);
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
/* Fin FUNCIONES de seccion forma documentos */



/* inicio de funciones tramitador */
function listar_tramitador() {
    var lc_select_entidad = $("#slt_lista_tramitador"),
        lc_espera = $("#espera_tramitador");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_tramitador',
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
                    lc_select_entidad.append('<option id="' + filas.tramitador +
                        '"  tramitador = "' + filas.tramitador +
                        '"  descripcion = "' + filas.descripcion +
                        '"  >' + filas.tramitador + ' - ' + filas.descripcion + '</option>');
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

function leer_tramitador_mostrarlo() {
    $("#espera_tramitador").html('');
    $("#msj_eliminado_tramitador").html('').hide();
    var lc_etiqueta_select = $('#slt_lista_tramitador option:selected'),
        lc_id = lc_etiqueta_select.attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        lc_actor = lc_etiqueta_select.attr('tramitador'),
            lc_descripcion = lc_etiqueta_select.attr('descripcion');
        $('#id_tramitador').val(lc_actor);
        $('#txt_descripcion_tramitador').val(lc_descripcion);

        $('#btn_editar_tramitador').attr("disabled", false);
        $('#btn_eliminar_tramitador').attr("disabled", false);
        $('#btn_grabar_tramitador').attr("disabled", true);
    } else {
        $('#btn_editar_tramitador').attr("disabled", true);
        $('#btn_eliminar_tramitador').attr("disabled", true);
        $('#btn_grabar_tramitador').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_tramitador(lc_tipo_operacion_trami) {
    $("#espera_tramitador").html('');
    $("#msj_eliminado_tramitador").html('').hide();
    switch (lc_tipo_operacion_trami) {
        case '1':
            $('#id_tramitador').attr("disabled", false);
            $('#btn_grabar_tramitador').attr("disabled", false);
            $('#txt_descripcion_tramitador').val('').attr("disabled", false);
            break;

        case '2':
            $('#id_tramitador').attr("disabled", true);
            $('#btn_grabar_tramitador').attr("disabled", true);
            $('#txt_descripcion_tramitador').attr("disabled", false).focus();
            break;
        default:
            $('#id_tramitador').attr("disabled", true);
            $('#btn_grabar_tramitador').attr("disabled", true);
            $('#txt_descripcion_tramitador').val('').attr("disabled", true);
            break;
    }
}

function grabar_nueva_editar_tramitador(lc_tipo_operacion_trami) {
    var lc_descripcion = $('#txt_descripcion_tramitador').val(),
        lid_id, datos_grabar_tra;
    if (lc_tipo_operacion_trami == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_tramitador').val();
    }
    datos_grabar_tra = {
        'descripcion': lc_descripcion,
        'tipo_operacion': lc_tipo_operacion_trami,
        'id': lid_id
    };
    $.ajax({
        data: datos_grabar_tra,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_tramitador',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_trami = '';
            listar_tramitador();
            desabilitar_y_limpiar_etiquetas_tramitador(lc_tipo_operacion_trami);
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

function eliminar_tramitador() {
    var lc_etiqueta_msj = $("#msj_eliminado_tramitador"),
        lc_id = $('#id_tramitador').val(),
        lc_espera = $("#espera_tramitador"),
        datos_eliminar_fdocu = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();
    console.log(datos_eliminar_fdocu);

    $.ajax({
        data: datos_eliminar_fdocu,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_tramitador',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_tipo_operacion_trami = '';
            listar_tramitador();
            desabilitar_y_limpiar_etiquetas_tramitador(lc_tipo_operacion_trami);
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

/* fin de funciones tramitador */


/* inicio de funciones plaz de expediente */

function listar_expediente() {
    var lc_select_entidad = $("#slt_lista_expediente"),
        lc_espera = $("#espera_expediente");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_plazo_expe',
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
                    lc_select_entidad.append('<option id="' + filas.plazo +
                        '"  plazo = "' + filas.plazo +
                        '"  nombre = "' + filas.nombre +
                        '"  color = "' + filas.color +
                        '"  >' + filas.plazo + ' - ' + filas.nombre + '</option>');
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

function leer_expediente_mostrarlo() {
    $("#espera_expediente").html('');
    $("#msj_eliminado_expediente").html('').hide();
    var lc_etiqueta_select = $('#slt_lista_expediente option:selected'),
        lc_id = lc_etiqueta_select.attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        lc_actor = lc_etiqueta_select.attr('plazo'),
            lc_descripcion = lc_etiqueta_select.attr('nombre'),
            lc_color = lc_etiqueta_select.attr('color');
        $('#id_expediente').val(lc_actor);
        $('#txt_descripcion_expe').val(lc_descripcion);
        $('#txt_color').val(lc_color).attr("disabled", true);
        $('#btn_editar_expediente').attr("disabled", false);
        $('#btn_eliminar_expediente').attr("disabled", false);
        $('#btn_grabar_expe').attr("disabled", true);
    } else {
        $('#btn_editar_expediente').attr("disabled", true);
        $('#btn_eliminar_expediente').attr("disabled", true);
        $('#btn_grabar_expe').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_expediente(lc_tipo_operacion_expe) {
    $("#espera_expediente").html('');
    $("#msj_eliminado_expediente").html('').hide();
    switch (lc_tipo_operacion_expe) {
        case '1':
            $('#id_expediente').val('').attr("disabled", false);
            $('#btn_grabar_expe').attr("disabled", false);
            $('#txt_descripcion_expe').val('').attr("disabled", false).focus();
            $('#txt_color').val('').attr("disabled", false);
            break;

        case '2':
            $('#id_expediente').attr("disaled", true);
            $('#btn_grabar_expe').attr("disabled", false);
            $('#txt_color').attr("disabled", false);
            $('#txt_descripcion_expe').attr("disabled", false).focus();
            break;
        default:
            $('#id_expediente').attr("disaled", true);
            $('#btn_grabar_expe').attr("disabled", true);
            $('#txt_descripcion_expe').attr("disabled", true);
            $('#txt_color').attr("disabled", true);
            break;
    }
}

function grabar_nueva_editar_expediente(lc_tipo_operacion_expe) {
    var lc_descripcion = $('#txt_descripcion_expe').val(),
        lc_color = $('#txt_color').val(),
        lid_id, datos_grabar_pe;
    if (lc_tipo_operacion_expe == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_expediente').val();
    }
    datos_grabar_pe = {
        'descripcion': lc_descripcion,
        'color': lc_color,
        'tipo_operacion': lc_tipo_operacion_expe,
        'id': lid_id
    };
    console.log(datos_grabar_pe);
    $.ajax({
        data: datos_grabar_pe,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_plazo_expe',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_expe = '';
            listar_expediente();
            desabilitar_y_limpiar_etiquetas_expediente(lc_tipo_operacion_expe);
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

function eliminar_expediente() {
    var lc_etiqueta_msj = $("#msj_eliminado_expediente"),
        lc_id = $('#id_expediente').val(),
        lc_espera = $("#espera_expediente"),
        datos_eliminar_fdocu = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();

    $.ajax({
        data: datos_eliminar_fdocu,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_pexpe',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_tipo_operacion_expe = '';
            listar_expediente();
            desabilitar_y_limpiar_etiquetas_expediente(lc_tipo_operacion_expe);
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

/* fin de funciones plazo de expediente */


/* inicio de funciones alerta */


function listar_alerta() {
    var lc_select_entidad = $("#slt_lista_alerta"),
        lc_espera = $("#espera_alerta");
    $.ajax({
        dataType: 'json',
        url: url + 'tablas/mostrar_alerta',
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
                    lc_select_entidad.append('<option id="' + filas.alerta +
                        '"  alerta = "' + filas.alerta +
                        '"  nombre = "' + filas.nombre +
                        '"  color = "' + filas.color +
                        '"  mayora = "' + filas.mayora +
                        '"  menora = "' + filas.menora +
                        '"  >' + filas.nombre + ' - ' + filas.color + ' - ' + filas.mayora + ' - ' + filas.menora + '</option>');
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

function leer_alerta_mostrarlo() {
    $("#espera_alerta").html('');
    $("#msj_eliminado_alerta").html('').hide();

    var lc_etiqueta_select = $('#slt_lista_alerta option:selected'),
        lc_id = lc_etiqueta_select.attr('id');
    var lc_ver_si_selecciono_id = (typeof lc_id === 'undefined') ? '' : '1';
    if (lc_ver_si_selecciono_id === '1') {
        var lc_actor = lc_etiqueta_select.attr('alerta'),
            lc_descripcion = lc_etiqueta_select.attr('nombre'),
            lc_color = lc_etiqueta_select.attr('color'),
            lc_mayora = lc_etiqueta_select.attr('mayora'),
            lc_menora = lc_etiqueta_select.attr('menora');

        $('#id_alerta').val(lc_actor).attr("disabled", true);
        $('#txt_descripcion_alerta').val(lc_descripcion).attr("disabled", true);
        $('#txt_color_alerta').val(lc_color).attr("disabled", true);
        $('#txt_mayora').val(lc_mayora).attr("disabled", true);
        $('#txt_menora').val(lc_menora).attr("disabled", true);

        $('#btn_editar_alerta').attr("disabled", false);
        $('#btn_eliminar_alerta').attr("disabled", false);
        $('#btn_grabar_alerta').attr("disabled", true);
    } else {
        $('#btn_editar_alerta').attr("disabled", true);
        $('#btn_eliminar_alerta').attr("disabled", true);
        $('#btn_grabar_alerta').attr("disabled", true);
    }
}

function desabilitar_y_limpiar_etiquetas_alerta(lc_tipo_operacion_alerta) {
    $("#espera_expediente").html('');
    $("#msj_eliminado_expediente").html('').hide();
    switch (lc_tipo_operacion_alerta) {
        case '1':
            $('#id_alerta').val('');
            $('#txt_descripcion_alerta').val('').attr("disabled", false).focus();
            $('#txt_color_alerta').val('').attr("disabled", true);
            $('#txt_mayora').val('').attr("disabled", true);
            $('#txt_menora').val('').attr("disabled", true);
            break;

        case '2':
            $('#txt_descripcion_alerta').attr("disabled", false).focus();
            $('#txt_color_alerta').attr("disabled", false);
            $('#txt_mayora').attr("disabled", false);
            $('#txt_menora').attr("disabled", false);
            $('#btn_grabar_alerta').attr("disabled", false);
            break;
        default:
            $('#txt_descripcion_alerta').attr("disabled", true);
            $('#txt_color_alerta').attr("disabled", true);
            $('#txt_mayora').attr("disabled", true);
            $('#txt_menora').attr("disabled", true);
            $('#btn_grabar_alerta').attr("disabled", true);
            $('#btn_editar_alerta').attr("disabled", true);
            break;
    }
    $('#btn_eliminar_alerta').attr("disabled", true);
}


function grabar_nueva_editar_alerta(lc_tipo_operacion_alerta) {
    var lc_descripcion = $('#txt_descripcion_alerta').val(),
        lc_color = $('#txt_color_alerta').val(),
        lc_mayora = $('#txt_mayora').val(),
        lc_menora = $('#txt_menora').val(),
        lid_id, datos_grabar_al;
    if (lc_tipo_operacion_alerta == '1') {
        lid_id = 0;
    } else {
        lid_id = $('#id_alerta').val();
    }
    datos_grabar_al = {
        'descripcion': lc_descripcion,
        'color': lc_color,
        'tipo_operacion': lc_tipo_operacion_alerta,
        'id': lid_id,
        'mayora': lc_mayora,
        'menora': lc_menora
    };
    $.ajax({
        data: datos_grabar_al,
        dataType: 'json',
        url: url + 'tablas/grabar_editar_alerta',
        type: 'post',
        beforeSend: function() {},
        success: function() {
            lc_tipo_operacion_alerta = '';
            listar_alerta();
            desabilitar_y_limpiar_etiquetas_alerta(lc_tipo_operacion_alerta);
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

function eliminar_alerta() {
    var lc_etiqueta_msj = $("#msj_eliminado_alerta"),
        lc_id = $('#id_alerta').val(),
        lc_espera = $("#espera_alerta"),
        datos_eliminar_fdocu = { 'id': lc_id };
    lc_etiqueta_msj.html('').hide();

    $.ajax({
        data: datos_eliminar_fdocu,
        dataType: 'json',
        url: url + 'tablas/eliminar_datos_alerta',
        type: 'post',
        beforeSend: function() {
            lc_espera.html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function(datos) {
            lc_espera.html("");
            if (datos.registros === 0) {
                lc_etiqueta_msj.html("- NO SE PUEDE ELIMINAR PORQUE ESTA REGISTRADO EN EXPEDIENTE - ").show();
            } else {
                lc_etiqueta_msj.html("-  ELIMINADO - ").show();
            }
            lc_tipo_operacion_alerta = '';
            listar_alerta();
            desabilitar_y_limpiar_etiquetas_alerta(lc_tipo_operacion_alerta);
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




/* fin de funciones alerta */





$(document).ready(function() {
    $('.crear-tooltip').tooltip();

    // inicio de codigos empleados

    //#region seccion de codigo a ocultar
    listar_empleados(lc_buscar_empleado);
    desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado);
    $("#txt_buscar_empleado")
        .focus()
        .keyup(function() {
            lc_buscar_empleado = $("#txt_buscar_empleado").val();
            listar_empleados(lc_buscar_empleado);
        });
    $("#slt_lista_empleado")
        .click(function() {
            leer_empleado_mostrarlo();
        })
        .keyup(function() {
            leer_empleado_mostrarlo();
        });
    $("#btn_nuevo_empleado").click(function() {
        lc_tipo_operacion_empleado = '1';
        desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado);
    });

    $("#btn_editar_empleado").click(function() {
        lc_tipo_operacion_empleado = '2';
        desabilitar_y_limpiar_etiquetas_empleado(lc_tipo_operacion_empleado)
    });


    $('#txt_empleado').keypress(function(e) {
        var etiqueta_jquery = $('#txt_abreviatura');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            $('#txt_abreviatura').val($('#txt_empleado').val());
            etiqueta_jquery.focus();

        }
    });

    $('#txt_abreviatura').keypress(function(e) {
        var etiqueta_jquery = $('#txt_ruc');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });


    $('#txt_ruc').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_empleado');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();

        }
    });

    $("#btn_grabar_empleado").click(function() {
        grabar_nueva_editar_empleado(lc_tipo_operacion_empleado);
    });

    $('#btn_eliminar_empleado').click(function() {
        eliminar_templeado();
    });
    // fin de codigos empleados



    /* inicio CODIGOS de seccion COMITES */

    listar_comites(lc_buscar_comite);
    lc_tipo_operacion_comite = '';
    desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite);
    $("#txt_buscar_tcomite")
        .focus()
        .keyup(function() {
            lc_buscar_comite = $("#txt_buscar_tcomite").val();
            listar_comites(lc_buscar_comite);
        });
    $("#slt_lista_comite")
        .click(function() {
            leer_comite_mostrarlo();
        })
        .keyup(function() {
            leer_comite_mostrarlo();
        });
    $("#btn_nuevo_comite").click(function() {
        lc_tipo_operacion_comite = '1';
        desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite);
    });
    $("#btn_editar_comite").click(function() {
        lc_tipo_operacion_comite = '2';
        desabilitar_y_limpiar_etiquetas_comite(lc_tipo_operacion_comite);
    });
    $('#txt_descripcion_comite').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_comite');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $("#btn_grabar_comite").click(function() {
        grabar_nueva_editar_comite(lc_tipo_operacion_comite);
    });

    $('#btn_eliminar_comite').click(function() {
        eliminar_comite();
    });



    /* Fin de CODIGOS seccion COMITE */


    /* Inicio de Fdocu */
    listar_fdocu();
    $("#slt_lista_fdocu")
        .click(function() {
            leer_fdocu_mostrarlo();
        })
        .keyup(function() {
            leer_fdocu_mostrarlo();
        });

    $("#btn_nuevo_fdocu").click(function() {
        lc_tipo_operacion_fdocu = '1';
        desabilitar_y_limpiar_etiquetas_fdocu(lc_tipo_operacion_fdocu);
    });

    $("#btn_editar_fdocu").click(function() {
        lc_tipo_operacion_fdocu = '2';
        desabilitar_y_limpiar_etiquetas_fdocu(lc_tipo_operacion_fdocu);
    });

    $('#id_fd').keypress(function(e) {
        var etiqueta_jquery = $('#txt_descripcion_fdocu');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });


    $('#txt_descripcion_fdocu').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_fdocu');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $("#btn_grabar_fdocu").click(function() {
        grabar_nueva_editar_fdocu(lc_tipo_operacion_fdocu);
    });

    $('#btn_eliminar_fdocu').click(function() {
        eliminar_fdocu();
    });

    /* fin de Fdocu */





    /* inicio de codigo tramitador */

    listar_tramitador();
    $("#slt_lista_tramitador")
        .click(function() {
            leer_tramitador_mostrarlo();
        })
        .keyup(function() {
            leer_tramitador_mostrarlo();
        });


    $("#btn_nuevo_tramitador").click(function() {
        lc_tipo_operacion_trami = '1';
        desabilitar_y_limpiar_etiquetas_tramitador(lc_tipo_operacion_trami)
    });

    $("#btn_editar_tramitador").click(function() {
        lc_tipo_operacion_trami = '2';
        desabilitar_y_limpiar_etiquetas_tramitador(lc_tipo_operacion_trami)
    });

    $('#txt_descripcion_tramitador').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_tramitador');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $("#btn_grabar_tramitador").click(function() {
        grabar_nueva_editar_tramitador(lc_tipo_operacion_trami);
    });

    $('#btn_eliminar_tramitador').click(function() {
        eliminar_tramitador();
    });


    /* fin de codigo tramitador */




    /* inicio de plazo de expediente */
    listar_expediente();
    $("#slt_lista_expediente")
        .click(function() {
            leer_expediente_mostrarlo();
        })
        .keyup(function() {
            leer_expediente_mostrarlo();
        });
    $("#btn_nuevo_expediente").click(function() {
        lc_tipo_operacion_expe = '1';
        desabilitar_y_limpiar_etiquetas_expediente(lc_tipo_operacion_expe)
    });
    $("#btn_editar_expediente").click(function() {
        lc_tipo_operacion_expe = '2';
        desabilitar_y_limpiar_etiquetas_expediente(lc_tipo_operacion_expe)
    });
    $('#txt_descripcion_expe').keypress(function(e) {
        var etiqueta_jquery = $('#txt_color');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });
    $('#txt_color').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_expediente');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });
    $("#btn_grabar_expe").click(function() {
        grabar_nueva_editar_expediente(lc_tipo_operacion_expe);
    });
    $('#btn_eliminar_expediente').click(function() {
        eliminar_expediente();
    });

    //#endregion fin seccion de codigo a ocultar


    /* fin de plazo de expediente */






    /* inicio de codigo alerta */

    listar_alerta();
    $("#slt_lista_alerta")
        .click(function() {
            leer_alerta_mostrarlo();
        })
        .keyup(function() {
            leer_alerta_mostrarlo();
        });
    $("#btn_nuevo_alerta").click(function() {
        lc_tipo_operacion_alerta = '1';
        desabilitar_y_limpiar_etiquetas_alerta(lc_tipo_operacion_alerta);
    });
    $("#btn_editar_alerta").click(function() {
        lc_tipo_operacion_alerta = '2';
        desabilitar_y_limpiar_etiquetas_alerta(lc_tipo_operacion_alerta);
    });

    $('#txt_descripcion_alerta').keypress(function(e) {
        var etiqueta_jquery = $('#txt_color_alerta');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });
    $('#txt_color_alerta').keypress(function(e) {
        var etiqueta_jquery = $('#txt_mayora');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });


    $('#txt_mayora').keypress(function(e) {
        var etiqueta_jquery = $('#txt_menora');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });

    $('#txt_menora').keypress(function(e) {
        var etiqueta_jquery = $('#btn_grabar_alerta');
        etiqueta_jquery.attr("disabled", false);
        if (e.which === 13) {
            etiqueta_jquery.focus();
        }
    });



    $("#btn_grabar_alerta").click(function() {
        grabar_nueva_editar_alerta(lc_tipo_operacion_alerta);
    });
    $('#btn_eliminar_alerta').click(function() {
        eliminar_alerta();
    });



    /* fin de codigo alerta */





});