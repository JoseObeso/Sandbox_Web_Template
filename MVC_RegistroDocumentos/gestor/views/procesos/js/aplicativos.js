var url = 'http://' + document.domain + '/tramite/gestor/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    modulo_seleccionado = '',
    modulo_nombre_seleccionado = '',
    menu_seleccionado = '',
    menu_nombre_seleccionado = '',
    submenu_seleccionado = '',
    submenu_nombre_seleccionado = '',
    boton_seleccionado = '',
    lc_tipo_operacion_app = '0',
    iregistros = 0,
    id_app, app_nombre, v_etiqueta, datos_grabar_app, leer_id_modulo_actualizar, leer_nombre_modulo_actualizar, dato_actualizar,
    v_leer_nombre_app, v_leer_url_app, v_leer_imagen_app, v_leer_descripcion_app, v_leer_archivo_app,
    v_id_app, v_menu, v_idhtml, v_icono, v_orden, datos_grabar_menu, id_menu, datos_grabar_submenu;


function leer_numero_modulo() {
    leer_id_modulo_actualizar = $('#modulo  option:selected').attr('id');
    leer_nombre_modulo_actualizar = $('#modulo  option:selected').attr('nombre');
    dato_actualizar = {
        'id': leer_id_modulo_actualizar,
        'nombre': leer_nombre_modulo_actualizar
    };
    $.ajax({
        data: dato_actualizar,
        dataType: 'json',
        url: url + 'mantenimiento/actualizar_modulo',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_modulo").fadeIn();
            $("#mostrar_espera_modulo").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_modulo").html("<hr><strong><center>....MODULO : " + leer_nombre_modulo_actualizar + " -- ACTUALIZADO....<center></strong><hr>");
            $("#mostrar_espera_modulo").fadeOut(5000);
        }
    });
}


function listar_modulos() {
    var datos_listar_app = {
        "app": ''
    };
    $.ajax({
        data: datos_listar_app,
        dataType: 'json',
        url: url + 'procesos/ListarApp',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            $("#slt_app_registrados").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        $("#slt_app_registrados")
                            .append('<option id="' + filas.id_app + '" nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_app_registrados")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_app_registrados").empty();
            }
        }
    });
}

function leer_id_nombre_app() {
    var leer_id_app = $('#slt_app_registrados option:selected').attr('id'),
        lc_ver_si_seleccion_id = (typeof leer_id_app === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id === '1') {
        leer_id_app = $('#slt_app_registrados option:selected').attr('id');
        $("#nuevo_modulo").attr("disabled", false);
        $("#btn_nuevo_menu").attr("disabled", false);
        listar_menu(leer_id_app);
    } else {
        $("#btn_nuevo_menu").attr("disabled", true);
    }
    inicializar_formulario_submenu();
}


function listar_menu(leer_id_app) {
    var datos_listar_menu = {
        "id_app": leer_id_app
    };
    $.ajax({
        data: datos_listar_menu,
        dataType: 'json',
        url: url + 'procesos/ListarMenudeApp',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            $("#slt_menu_registrados").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        $("#slt_menu_registrados")
                            .append('<option id="' + filas.id_menu +
                                '" id_app = "' + filas.id_app +
                                '" nombre_app = "' + filas.nombre_app +
                                '" nombre_menu = "' + filas.nombre_menu +
                                '"  >' + filas.orden + ' - ' + filas.nombre_menu + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_menu_registrados")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_menu_registrados").empty();
            }
        }
    });
}

function inicializar_formulario_app() {
    $("#aviso_en_app").html('');
    $("#txt_nombre_app").attr("disabled", true).val('');
    $("#txt_url_app").attr("disabled", true).val('http://192.168.4.4/tramite/');
    $("#txt_url_imagen").attr("disabled", true).val(' .jpg');
    $("#txt_descripcion_app").attr("disabled", true).val('');
    $("#txt_archivo_manual_app").attr("disabled", true).val(' .pdf');
    $("#btn_grabar_app").attr("disabled", true);
    $("#slt_menu_registrados").attr("disabled", true).empty();
    $("#slt_submenu_registrados").attr("disabled", true).empty();
    $("#btn_nuevo_menu").attr("disabled", true);
    $("#nuevo_submenu").attr("disabled", true);
    inicializar_formulario_menu();
    inicializar_formulario_submenu();
}

function inicializar_formulario_menu() {
    $("#slt_submenu_registrados").attr("disabled", true).empty();
    $("#aviso_en_menu").html('');
    $("#txt_nombre_menu").attr("disabled", true).val('');
    $("#txt_url_menu").attr("disabled", true).val(' ');
    $("#txt_icono_menu").attr("disabled", true).val(' ');
    $("#txt_orden_menu").attr("disabled", true).val('');
    $("#btn_grabar_menu").attr("disabled", true);
}


function inicializar_formulario_submenu() {
    $("#slt_submenu_registrados").attr("disabled", true).empty();
    $("#titulo_submenu").html('NUEVO SUBMENU');
    $("#aviso_en_submenu").html('');
    $("#txt_nombre_submenu").attr("disabled", true).val('');
    $("#txt_url_submenu").attr("disabled", true).val('');
    $("#txt_icono_submenu").attr("disabled", true).val('');
    $("#txt_orden_submenu").attr("disabled", true).val('');
    $("#nuevo_submenu").attr("disabled", true);
    $("#btn_grabar_submenu").attr("disabled", true);

}

function leer_variables_y_grabar() {
    v_leer_nombre_app = $("#txt_nombre_app").val();
    v_leer_url_app = $("#txt_url_app").val();
    v_leer_imagen_app = $("#txt_url_imagen").val();
    v_leer_descripcion_app = $("#txt_descripcion_app").val();
    v_leer_archivo_app = $("#txt_archivo_manual_app").val();
    datos_grabar_app = {
        "nombre_app": v_leer_nombre_app,
        "url_app": v_leer_url_app,
        "imagen_app": v_leer_imagen_app,
        "descripcion_app": v_leer_descripcion_app,
        "archivo_app": v_leer_archivo_app
    };
    $.ajax({
        data: datos_grabar_app,
        dataType: 'json',
        url: url + 'procesos/grabar_app',
        type: 'post',
        beforeSend: function() {
            $("#aviso_en_app").html("<img src='" + url_grafico + "/cargando.gif' width='180' height='13'>");
        },
        success: function(response) {
            iregistros = response.registros;
            inicializar_formulario_app();
            listar_modulos();
            inicializar_formulario_submenu();
            $("#aviso_en_app").html(" GRABACION DE : " + iregistros + " REGISTRO").fadeOut(2500);

        }
    });
}


function leer_variables_y_grabarmenu(id_app) {
    var v_id_app = id_app,
        v_menu = $("#txt_nombre_menu").val(),
        v_idhtml = $("#txt_url_menu").val(),
        v_icono = $("#txt_icono_menu").val(),
        v_orden = $("#txt_orden_menu").val(),
        datos_grabar_menu = {
            "id_app": v_id_app,
            "v_menu": v_menu,
            "v_idhtml": v_idhtml,
            "v_icono": v_icono,
            "v_orden": v_orden
        };
    $.ajax({
        data: datos_grabar_menu,
        dataType: 'json',
        url: url + 'procesos/grabar_menu',
        type: 'post',
        beforeSend: function() {
            $("#aviso_en_menu").html("<img src='" + url_grafico + "/cargando.gif' width='180' height='13'>");
        },
        success: function(response) {
            iregistros = response.registros;
            inicializar_formulario_menu();
            listar_menu(id_app);
            $("#aviso_en_menu").html(" GRABACION DE : " + iregistros + " REGISTRO").fadeOut(2500);

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


function leer_id_nombre_menu() {
    var leer_id_menu = $('#slt_menu_registrados option:selected').attr('id'),
        lc_ver_si_seleccion_id_menu = (typeof leer_id_menu === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id_menu === '1') {
        var leer_id_menu_reg = $('#slt_menu_registrados option:selected').attr('id'),
            leer_id_app_reg = $('#slt_menu_registrados option:selected').attr('id_app');
        mostrar_submenus_del_menu(leer_id_menu_reg, leer_id_app_reg);
        $("#nuevo_modulo").attr("disabled", false);
        $("#btn_nuevo_menu").attr("disabled", false);
        $("#nuevo_submenu").attr("disabled", false);
    } else {
        $("#btn_nuevo_menu").attr("disabled", true);
    }
}


function mostrar_submenus_del_menu(leer_id_menu_reg, leer_id_app_reg) {
    var datos_mostrar_submenu = {
        "id_menu": leer_id_menu_reg,
        "id_app": leer_id_app_reg

    };
    $.ajax({
        data: datos_mostrar_submenu,
        dataType: 'json',
        url: url + 'procesos/mostrar_submenu',
        type: 'post',
        beforeSend: function() {

        },
        success: function(encontrados) {
            var v_etiqueta_select_sm = $("#slt_submenu_registrados");
            v_etiqueta_select_sm.html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        v_etiqueta_select_sm
                            .append('<option id="' + filas.id_submenu +
                                '" id_menu = "' + filas.id_menu +
                                '" id_app = "' + filas.id_app +
                                '" nombre = "' + filas.nombre +
                                '"  >' + filas.orden + ' - ' + filas.nombre + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#titulo_submenu").html(" SUB MENU ");
                        v_etiqueta_select_sm
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                v_etiqueta_select_sm.empty();
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

function leer_variables_y_grabarsubmenu(leer_id_app, leer_id_menu) {
    var v_nombre_submenu = $("#txt_nombre_submenu").val(),
        v_txt_url_submenu = $("#txt_url_submenu").val(),
        v_txt_icono_submenu = $("#txt_icono_submenu").val(),
        v_txt_orden_submenu = $("#txt_orden_submenu").val(),
        datos_grabar_submenu = {
            "id_app": leer_id_app,
            "id_menu": leer_id_menu,
            "nombre_submenu": v_nombre_submenu,
            "url_submenu": v_txt_url_submenu,
            "icono_submenu": v_txt_icono_submenu,
            "orden_submenu": v_txt_orden_submenu
        };
    $.ajax({
        data: datos_grabar_submenu,
        dataType: 'json',
        url: url + 'procesos/grabar_submenu',
        type: 'post',
        beforeSend: function() {
            $("#aviso_en_submenu").html("<img src='" + url_grafico + "/cargando.gif' width='180' height='13'>");
        },
        success: function(response) {
            iregistros = response.registros;
            $("#aviso_en_submenu").html(" GRABACION DE : " + iregistros + " REGISTRO").fadeOut(1000);

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

    mostrar_submenus_del_menu(leer_id_menu, leer_id_app);
}




$(document).ready(function() {

    listar_modulos();
    $('.crear-tooltip').tooltip();
    $("#btn_nuevo_menu").attr("disabled", true);
    $("#nuevo_submenu").attr("disabled", true);

    $("#nuevo_modulo").click(function() {
        lc_tipo_operacion_app = '1';
        $("#aviso_en_app")
            .css("background-color", "#7fc3a1")
            .html("-- DIGITE LO SOLICITADO Y PULSE ENTER -- ");
        var v_etiqueta = $('#txt_nombre_app')
        v_etiqueta
            .attr("disabled", false)
            .css("background-color", "#ffe34c").fadeIn(500)
            .css("background-color", "#2e79ff").fadeOut(500)
            .val('');
        setTimeout(function() {
            v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
        }, 500);
        v_etiqueta.focus();
    });

    $("#txt_nombre_app").keypress(function(e) {
        v_etiqueta = $('#txt_url_app')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('http://192.168.4.4/tramite/');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_url_app").keypress(function(e) {
        v_etiqueta = $('#txt_url_imagen')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('   .jpg');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_url_imagen").keypress(function(e) {
        v_etiqueta = $('#txt_descripcion_app')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val(' ');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_descripcion_app").keypress(function(e) {
        v_etiqueta = $('#txt_archivo_manual_app')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('  .pdf');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_archivo_manual_app").keypress(function(e) {
        v_etiqueta = $('#btn_grabar_app')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .focus();

        }
    });
    $('#btn_grabar_app').click(function() {
        lc_tipo_operacion_app = '1'
        leer_variables_y_grabar();
    });


    $('#btn_nuevo_menu').click(function() {
        lc_tipo_operacion_menu = '1';
        var leer_app_nombre = $('#slt_app_registrados option:selected').attr('nombre');
        $('#Titulo_menu').html("MENU DEL APP : " + leer_app_nombre);
        $("#aviso_en_menu")
            .css("background-color", "#7fc3a1")
            .html("-- DIGITE LO SOLICITADO Y PULSE ENTER -- ");
        v_etiqueta = $('#txt_nombre_menu')
        v_etiqueta
            .attr("disabled", false)
            .css("background-color", "#ffe34c").fadeIn(500)
            .css("background-color", "#2e79ff").fadeOut(500)
            .val('');
        setTimeout(function() {
            v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
        }, 500);
        v_etiqueta.focus();
    });

    $("#txt_nombre_menu").keypress(function(e) {
        v_etiqueta = $('#txt_url_menu')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_url_menu").keypress(function(e) {
        v_etiqueta = $('#txt_icono_menu')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });

    $("#txt_icono_menu").keypress(function(e) {
        v_etiqueta = $('#txt_orden_menu');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500);
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });


    $("#txt_orden_menu").keypress(function(e) {
        $('#btn_grabar_menu').attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .focus();
        }
    });

    $('#btn_grabar_menu').click(function() {
        lc_tipo_operacion_menu = '1';
        var leer_id_app = $('#slt_app_registrados option:selected').attr('id');
        $('#btn_grabar_menu').attr("disabled", true);
        leer_variables_y_grabarmenu(leer_id_app);
    });


    /* Fin  agregar nuevo modulo */



    $("#txt_materno").keypress(function(e) {
        $("#txt_nombres").attr("disabled", false);
        if (e.which === 13) {
            if ($("#txt_materno").val().length === 0) {
                $("#btn_grabar_datos_personales").attr("disabled", true);
                $("#aviso_materno").html('<center><font size="-1" color="#EF6000">Apellido Paterno vacio....</font></center>');

            } else {
                $("#aviso_materno").html('');
                $("#txt_nombres").focus();
                if (lc_tipo_operacion_cas === '1') {
                    $("#btn_grabar_datos_personales").attr("disabled", true);
                } else {
                    $("#btn_grabar_datos_personales").attr("disabled", false);
                }
            }
        }
    });



    $("#nuevo_submenu").click(function() {
        lc_tipo_operacion_submenu = '1';
        $("#aviso_en_submenu")
            .css("background-color", "#7fc3a1")
            .html("-- DIGITE LO SOLICITADO Y PULSE ENTER -- ");
        var v_etiqueta = $('#txt_nombre_submenu')
        v_etiqueta
            .attr("disabled", false)
            .css("background-color", "#ffe34c").fadeIn(500)
            .css("background-color", "#2e79ff").fadeOut(500)
            .val('');
        setTimeout(function() {
            v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
        }, 500);
        v_etiqueta.focus();
    });

    $("#txt_nombre_submenu").keypress(function(e) {
        v_etiqueta = $('#txt_url_submenu')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });
    $("#txt_url_submenu").keypress(function(e) {
        v_etiqueta = $('#txt_icono_submenu')
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });

    $("#txt_icono_submenu").keypress(function(e) {
        v_etiqueta = $('#txt_orden_submenu');
        v_etiqueta.attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .css("background-color", "#ffe34c").fadeIn(500)
                .css("background-color", "#2e79ff").fadeOut(500)
                .val('');
            setTimeout(function() {
                v_etiqueta.css("background-color", "#ffe34c").fadeIn("fast");
            }, 500);
            v_etiqueta.focus();
        }
    });


    $("#txt_orden_submenu").keypress(function(e) {
        $('#btn_grabar_submenu').attr("disabled", false);
        if (e.which === 13) {
            v_etiqueta
                .attr("disabled", false)
                .focus();
        }
    });

    $('#btn_grabar_submenu').click(function() {
        var leer_id_app = $('#slt_app_registrados option:selected').attr('id'),
            leer_id_menu = $('#slt_menu_registrados option:selected').attr('id');
        leer_variables_y_grabarsubmenu(leer_id_app, leer_id_menu);
        $("#titulo_submenu").html('NUEVO SUBMENU');
        $("#aviso_en_submenu").html('');
        $("#txt_nombre_submenu").attr("disabled", true).val('');
        $("#txt_url_submenu").attr("disabled", true).val('');
        $("#txt_icono_submenu").attr("disabled", true).val('');
        $("#txt_orden_submenu").attr("disabled", true).val('');
        $("#nuevo_submenu").attr("disabled", false);
        $("#btn_grabar_submenu").attr("disabled", true);


    });





    $("#slt_app_registrados")
        .click(function() {
            leer_id_nombre_app();
        })
        .keyup(function() {
            leer_id_nombre_app();
        });


    $("#slt_menu_registrados")
        .click(function() {
            leer_id_nombre_menu();
        })
        .keyup(function() {
            leer_id_nombre_menu();
        });


    $("#slt_submenu_registrados")
        .click(function() {
            leer_id_nombre_submenu();
        })
        .keyup(function() {
            leer_id_nombre_submenu();
        });




    $("#modulo")
        .click(function() {
            leer_numero_modulo();
        })
        .keyup(function() {
            leer_numero_modulo();
        });






});