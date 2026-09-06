var modulo = "/appmvc",
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    lc_grabar_editar = 0,
    lc_sexo = "",
    lc_user,
    lc_user, lc_dni, lc_nombre, lc_paterno, lc_materno, lc_oficina, datos_grabar_user, datos_modificar_user;


function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
    var timeslide = 100;
    $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
    $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
    $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
}

function listar_usuarios() {
    $.ajax({
        dataType: 'json',
        url: url + 'usuarios/lista_usuarios',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera").html("");
            $("#slc_usuarios").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slc_usuarios").append('<option id="' + filas.user +
                            '" usuario = "' + filas.usuario + '" nombre = "' + filas.nombre +
                            '" paterno = "' + filas.paterno + '" materno = "' + filas.materno +
                            '" nombres = "' + filas.nombres + '" user = "' + filas.user +
                            '" cargo = "' + filas.cargo + '" modulo = "' + filas.modulo +
                            '" estado = "' + filas.estado +
                            '" sexo = "' + filas.sexo + '" foto = "' + filas.foto + '"  >' + filas.nombres + '</option>');
                    } else {
                        $("#slc_usuarios").html("");
                    }
                });
            } else {
                $("#slc_usuarios").html("");
            }
        }
    });

    $("#btn_eliminar_permiso_app").attr("disabled", true);
}




function listar_usuarios_todos() {
    $.ajax({
        dataType: 'json',
        url: url + 'usuarios/lista_usuarios_todos',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera").html("");
            $("#slc_usuarios").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slc_usuarios").append('<option id="' + filas.user +
                            '" usuario = "' + filas.usuario + '" nombre = "' + filas.nombre +
                            '" paterno = "' + filas.paterno + '" materno = "' + filas.materno +
                            '" nombres = "' + filas.nombres + '" user = "' + filas.user +
                            '" cargo = "' + filas.cargo + '" modulo = "' + filas.modulo +
                            '" estado = "' + filas.estado +
                            '" sexo = "' + filas.sexo + '" foto = "' + filas.foto + '"  >' + filas.nombres + '</option>');
                    } else {
                        $("#slc_usuarios").html("");
                    }
                });
            } else {
                $("#slc_usuarios").html("");
            }
        }
    });

    $("#btn_eliminar_permiso_app").attr("disabled", true);
}




function mostrar_usuarios() {
    var lc_user = $('#slc_usuarios  option:selected').attr('id'),
        lc_dni = $('#slc_usuarios  option:selected').attr('usuario'),
        lc_nombre = $('#slc_usuarios  option:selected').attr('nombre'),
        lc_paterno = $('#slc_usuarios  option:selected').attr('paterno'),
        lc_materno = $('#slc_usuarios  option:selected').attr('materno'),
        lc_oficina = $('#slc_usuarios  option:selected').attr('modulo'),
        lc_sexo = $('#slc_usuarios  option:selected').attr('sexo'),
        lc_estado = $('#slc_usuarios  option:selected').attr('estado'),


        lc_apellidosnombres = $('#slc_usuarios  option:selected').attr('nombres');
    $("#txt_user").val(lc_user);
    $("#txt_dni").val(lc_dni);
    $("#txt_nombre").val(lc_nombre);
    $("#txt_paterno").val(lc_paterno);
    $("#txt_materno").val(lc_materno);
    $("#txt_oficina").val(lc_oficina);
    $("#txt_oficina").val(lc_oficina);
    $("#user_op").text(lc_estado);



    $("#Nombre_Usuario").text(lc_apellidosnombres);


    if (lc_sexo === 'M') {
        $("#sexo_1")
            .attr("disabled", true)
            .prop("checked", true);
    } else {
        $("#sexo_2")
            .attr("disabled", true)
            .prop("checked", true);
    }

    $("#btn_grabar_usuarios").attr("disabled", true);
    listar_permisos_por_usuario(lc_user);
    $("#slt_app").attr("disabled", false);
    $("#nombre_usuario").attr("disabled", false);





}






function listar_permisos_por_usuario(lc_user) {
    var dato_permisos = {
        'user': lc_user
    };
    $.ajax({
        data: dato_permisos,
        dataType: 'json',
        url: url + 'usuarios/listar_permisos',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera").html("");
            $("#slt_permisos").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slt_permisos").append('<option id="' + filas.iduser_app + '"  >' + filas.vapp_nombre + '</option>').attr("disabled", false);

                    } else {
                        $("#slt_permisos").html("").attr("disabled", true);
                    }
                });
            } else {
                $("#slt_permisos").html("").attr("disabled", true);
            }
        }
    });

}




function limpiar_input_inicio() {
    $("#msj_usuario").html("");
    $("#txt_dni").val("").attr("disabled", true);
    $("#msj_dni").html("");
    $("#txt_nombre").val("").attr("disabled", true);
    $("#txt_paterno").val("").attr("disabled", true);
    $("#txt_materno").val("").attr("disabled", true);
    $("#txt_oficina").val("").attr("disabled", true);
    $("#sexo_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#sexo_2")
        .attr("disabled", true)
        .prop("checked", false);
    $("#btn_grabar_usuarios").attr("disabled", true);
    $("#espera_grabacion_usuarios").html("");
    $("#txt_user").val("").attr("disabled", true);
    $("#nombre_usuario").attr("disabled", true);
}


function limpiar_datos_input_para_ingresar() {
    $("#msj_usuario").html("");
    $("#txt_dni").val("").attr("disabled", true);
    $("#msj_dni").html("");
    $("#txt_nombre").val("").attr("disabled", true);
    $("#txt_paterno").val("").attr("disabled", true);
    $("#txt_materno").val("").attr("disabled", true);
    $("#txt_oficina").val("").attr("disabled", true);
    $("#sexo_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#sexo_2")
        .attr("disabled", true)
        .prop("checked", false);
    $("#btn_grabar_usuarios").attr("disabled", true);
    $("#espera_grabacion_usuarios").html("");
    $("#txt_user").val("").attr("disabled", false).focus();
}


function ver_si_existe_user(lc_user) {
    var dato_user = {
        "user": lc_user
    };
    $.ajax({
        data: dato_user,
        dataType: 'json',
        url: url + 'usuarios/buscar_por_user_si_existe',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.encontro === '1') {
                        $("#msj_usuario").css("background-color", "#fdefcc")
                            .html('<strong>Usuario ya existe : <br> ' + filas.nombres + '  </strong>').fadeIn("slow");
                        setTimeout(function() {
                            $("#msj_usuario").fadeOut("slow");
                        }, 4000);
                        $("#txt_user").attr("disabled", false).focus();
                        $("#txt_dni").attr("disabled", true);

                    } else {
                        $("#msj_usuario").css("background-color", "#fdefcc")
                            .html('<strong> --- Nuevo Usuario ---- Continue... </strong>').fadeIn("slow");
                        setTimeout(function() {
                            $("#msj_usuario").fadeOut("slow");
                        }, 1000);
                        $("#txt_dni").attr("disabled", false).focus();
                    }
                });
            } else {

            }
        }
    });

}



function leer_datos_usuario_grabarlo() {

    if ($("#txt_dni").val().length === 8) {
        var lc_user = $("#txt_user").val(),
            lc_dni = $("#txt_dni").val(),
            lc_nombre = $("#txt_nombre").val(),
            lc_paterno = $("#txt_paterno").val(),
            lc_materno = $("#txt_materno").val(),
            lc_oficina = $("#txt_oficina").val(),
            datos_modificar_user = {
                "user": lc_user,
                "dni": lc_dni,
                "nombre": lc_nombre,
                "paterno": lc_paterno,
                "materno": lc_materno,
                "oficina": lc_oficina,
                "sexo": lc_sexo
            };
        $.ajax({
            data: datos_modificar_user,
            dataType: 'json',
            url: url + 'usuarios/grabar_nuevo_usuario',
            type: 'post',
            beforeSend: function() {
                $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");

            },
            success: function() {
                $("#espera_grabacion_usuarios").html("");
                limpiar_input_inicio();
                listar_usuarios();
                $("#slt_permisos").html("").attr("disabled", true);
                $("#btn_agregar_modificar_app").attr("disabled", true);
                $("#btn_eliminar_app").attr("disabled", true);
                $("#btn_eliminar_permiso_app").attr("disabled", true);
                mostrar_todos_app();
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
    } else {

        mostrar_mensaje_en_modal("alert-danger", '<center> -- DNI debe tener 8 numeros -- </center>');

    }

}

function valida_ingreso_de_dni(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 8) {
        return true;
    }
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function leer_datos_usuario_modificar_y_grabarlo() {

    if ($("#txt_dni").val().length === 8) {

        lc_user = $("#txt_user").val(), lc_dni = $("#txt_dni").val(), lc_nombre = $("#txt_nombre").val(), lc_paterno = $("#txt_paterno").val(),
            lc_materno = $("#txt_materno").val(), lc_oficina = $("#txt_oficina").val(),
            datos_grabar_user = {
                "user": lc_user,
                "dni": lc_dni,
                "nombre": lc_nombre,
                "paterno": lc_paterno,
                "materno": lc_materno,
                "oficina": lc_oficina,
                "sexo": lc_sexo
            };


        $.ajax({
            data: datos_grabar_user,
            dataType: 'json',
            url: url + 'usuarios/modificar_usuario',
            type: 'post',
            beforeSend: function() {
                $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
            },
            success: function() {
                $("#espera_grabacion_usuarios").html("");
                limpiar_input_inicio();
                listar_usuarios();
                $("#Nombre_Usuario").html("");

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
    } else {

        mostrar_mensaje_en_modal("alert-danger", '<center> -- DNI debe tener 8 numeros -- </center>');
    }




}

function eliminar_usuario(lc_user) {

    var dato_eliminar = {
        'user': lc_user
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'usuarios/eliminar_usuarios',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            limpiar_input_inicio();
            listar_usuarios();
        }
    });

}


function reset_clave(lc_user) {
    var dato_eliminar = {
        'user': lc_user
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'usuarios/reset_clave',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            limpiar_input_inicio();
            listar_usuarios();
        }
    });
}

function habilitar_usuario(lc_user) {
    var dato_habilitar = {
        'user': lc_user
    };
    $.ajax({
        data: dato_habilitar,
        dataType: 'json',
        url: url + 'usuarios/habilitar_usuario',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            limpiar_input_inicio();
            listar_usuarios();
        }
    });
}

function mostrar_permisos_app() {
    $("#btn_eliminar_permiso_app").attr("disabled", false);

}



function eliminar_permiso_app(lid_app_permisos, lc_user) {
    var dato_eliminar = {
        'id': lid_app_permisos
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'usuarios/EliminarPermisosApp',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            limpiar_input_inicio();
            listar_usuarios();
            listar_permisos_por_usuario(lc_user);


        }
    });



}


function mostrar_todos_app() {
    $.ajax({
        dataType: 'json',
        url: url + 'usuarios/lista_app',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera").html("");
            $("#slt_app").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slt_app").append('<option id="' + filas.idapp +
                            '" idapp = "' + filas.idapp + '" vapp = "' + filas.vapp +
                            '" imagen = "' + filas.imagen + '" vapp_url = "' + filas.vapp_url + '"  >' + filas.vapp + '</option>');
                    } else {
                        $("#slt_app").html("");
                    }
                });
            } else {
                $("#slt_app").html("");
            }
        }
    });

}

function habilitar_botones_app() {
    $("#btn_agregar_modificar_app").attr("disabled", false);
    $("#btn_eliminar_app").attr("disabled", false);
}


function seleccion_app_usuario() {
    var lc_user = $('#slc_usuarios  option:selected').attr('id'),
        lc_id_app = $('#slt_app  option:selected').attr('id'),
        lc_vapp = $('#slt_app  option:selected').attr('vapp'),
        lc_imagen = $('#slt_app  option:selected').attr('imagen'),
        lc_vapp_url = $('#slt_app  option:selected').attr('vapp_url'),
        selec_app = { 'id_user': lc_user, 'id_app': lc_id_app, 'vapp': lc_vapp, 'imagen': lc_imagen, 'vapp_url': lc_vapp_url };
    $.ajax({
        data: selec_app,
        dataType: 'json',
        url: url + 'usuarios/GrabarUsuarioApp',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            listar_permisos_por_usuario(lc_user);
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


function comprueba_dni() {
    var lc_ver_dni = $("#txt_dni").val();
    $.ajax({
        data: { 'dni': lc_ver_dni },
        dataType: 'json',
        url: url + 'usuarios/versiexistedni',
        type: 'post',
        beforeSend: function() {
            $("#msj_dni").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
        },
        success: function(dni) {
            if (dni[0].respuesta == 1) {
                $("#msj_dni").html("DNI EXISTE : " + dni[0].nombres).show();
                $("#txt_nombre").attr("disabled", true);
                $("#txt_paterno").attr("disabled", true);
                $("#txt_materno").attr("disabled", true);
                $("#txt_oficina").attr("disabled", true);
                $("#btn_grabar_usuarios").attr("disabled", true);

                setTimeout(function() {
                    $("#msj_dni").fadeOut("slow");
                }, 6000);

            } else {
                $("#msj_dni").html("DNI CONFORME, PROCEDA... ").show();
                $("#txt_nombre").attr("disabled", false).focus();
                $("#txt_paterno").attr("disabled", true);
                $("#txt_materno").attr("disabled", true);
                $("#txt_oficina").attr("disabled", true);

                $("#btn_grabar_usuarios").attr("disabled", true);
                setTimeout(function() {
                    $("#msj_dni").fadeOut("slow");
                }, 4000);

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
    listar_usuarios();
    limpiar_input_inicio();
    mostrar_todos_app();
    $("#slt_permisos").html("").attr("disabled", true);
    $("#user_op").text("");
    $("#btn_agregar_modificar_app").attr("disabled", true);
    $("#btn_eliminar_app").attr("disabled", true);
    $("#slt_app").html("").attr("disabled", false);
    $("#slc_usuarios")
        .click(function() {
            mostrar_usuarios();
        })
        .keyup(function() {
            mostrar_usuarios();
        });


    $("#nuevo_registro").click(function() {
        lc_grabar_editar = 1; // 1: save
        limpiar_datos_input_para_ingresar();
    });

    $("#txt_user").keyup(function(e) {
        $("#msj_usuario").html('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            var lc_user = $("#txt_user").val();
            ver_si_existe_user(lc_user);
        }
    });




    $("#txt_dni")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                if ($("#txt_dni").val().length == 8) {
                    comprueba_dni();
                } else {
                    $("#msj_dni").html('DNI de 8 Caracteres').show();
                }
            }
            if ($("#txt_dni").val().length == 8) {
                comprueba_dni();

            } else {

                $("#msj_dni").html('DNI de 8 Caracteres').show();


            }
        })
        .click(function(e) {
            $("#txt_nombre").attr("disabled", false);
        });




    $("#txt_nombre")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                $("#txt_paterno").attr("disabled", false).focus();
            }
        })
        .click(function(e) {
            $("#txt_paterno").attr("disabled", false);
        });


    $("#txt_paterno")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                $("#txt_materno").attr("disabled", false).focus();;
            }
        })
        .click(function(e) {
            $("#txt_materno").attr("disabled", false);
        });

    $("#txt_materno")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                $("#txt_oficina").attr("disabled", false).focus();;
            }
        })
        .click(function(e) {
            $("#txt_oficina").attr("disabled", false);
        });


    $("#txt_oficina")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                $("#sexo_1").attr("disabled", false);
                $("#sexo_2").attr("disabled", false);
            }
        })
        .click(function(e) {
            $("#sexo_1").attr("disabled", false);
            $("#sexo_2").attr("disabled", false);
        });

    $("#sexo_1")
        .click(function(e) {
            lc_sexo = "M";
            $("#btn_grabar_usuarios").attr("disabled", false);
        });

    $("#sexo_2")
        .click(function(e) {
            lc_sexo = "F";
            $("#btn_grabar_usuarios").attr("disabled", false);
        });

    $("#btn_grabar_usuarios").click(function() {
        if (lc_grabar_editar === 1) {
            leer_datos_usuario_grabarlo();
        } else {
            leer_datos_usuario_modificar_y_grabarlo();
        }
        $("#btn_grabar_usuarios").attr("disabled", true);
    });

    $("#modificar_registro").click(function() {
        lc_grabar_editar = 2;
        $("#txt_user").attr("disabled", false);
        $("#txt_dni").attr("disabled", false);
        $("#txt_nombre").attr("disabled", false);
        $("#txt_paterno").attr("disabled", false);
        $("#txt_materno").attr("disabled", false);
        $("#txt_oficina").attr("disabled", false);
        $("#sexo_1")
            .attr("disabled", false)
        $("#sexo_2")
            .attr("disabled", false)
        lc_sexo = $('#slc_usuarios  option:selected').attr('sexo');
        $("#btn_grabar_usuarios").attr("disabled", false);
    });

    $("#eliminar_registro").click(function() {
        $("#user_op").text("");
        lc_user = $("#txt_dni").val();
        eliminar_usuario(lc_user);
    });

    $("#reset_clave").click(function() {
        $("#user_op").text("");
        lc_user = $("#txt_dni").val();
        reset_clave(lc_user);
    });

    $("#ver_todos_user").click(function() {
        $("#user_op").text("");
        listar_usuarios_todos();
    });




    $("#btn_eliminar_permiso_app").click(function() {
        var lid_app_permisos = $('#slt_permisos  option:selected').attr('id'),
            lc_user = $("#txt_dni").val();
        eliminar_permiso_app(lid_app_permisos, lc_user);
    });


    $("#slt_permisos")
        .click(function() {
            mostrar_permisos_app();
        })
        .keyup(function() {
            mostrar_permisos_app();
        });


    $("#slt_app")
        .click(function() {
            habilitar_botones_app();
        })
        .keyup(function() {
            habilitar_botones_app();

        })
        .dblclick(function() {
            var leer_id_usuario = $('#slc_usuarios  option:selected').attr('id'),
                lc_ver_si_seleccion_usuario = (typeof leer_id_usuario === 'undefined') ? '' : '1';
            if (lc_ver_si_seleccion_usuario === '1') {
                seleccion_app_usuario();
            } else {
                mostrar_mensaje_en_modal("alert-danger", '<center> -- No selecciono ningun Usuario -- </center>');
            }
        });

    $("#btn_agregar_modificar_app").click(function() {
        var lid_app = $('#slt_app  option:selected').attr('id'),
            lc_vapp = $('#slt_app  option:selected').attr('vapp'),
            lc_imagen = $('#slt_app  option:selected').attr('imagen'),
            lc_vapp_url = $('#slt_app  option:selected').attr('vapp_url');
        $('#id_app').val(lid_app);
        $('#txt_vapp').val(lc_vapp);
        $('#txt_imagen').val(lc_imagen);
        $('#txt_url').val(lc_vapp_url);
        $('#id_grabar_modificar').val("2");
        $('#ingresar_modificar_app').modal('toggle');

    });


    $("#btn_nuevo_app").click(function() {
        $('#id_grabar_modificar').val("1");
        $('#txt_vapp').val("");
        $('#txt_imagen').val(" .jpg");
        $('#txt_url').val("");
        $('#txt_vapp').val("").focus();

    });


    $("#btn_eliminar_app").click(function() {
        var lid_app = $('#slt_app  option:selected').attr('id'),
            eliminar_app = {
                'id': lid_app
            };
        $.ajax({
            data: eliminar_app,
            dataType: 'json',
            url: url + 'usuarios/EliminarApp',
            type: 'post',
            beforeSend: function() {
                $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
            },
            success: function() {
                $("#espera_grabacion_usuarios").html("");
                mostrar_todos_app();


            }
        });


    });




    $("#btn_grabar_app").click(function() {
        var lid_app = $('#id_app').val(),
            lc_vapp = $('#txt_vapp').val(),
            lc_imagen = $('#txt_imagen').val(),
            lc_vapp_url = $('#txt_url').val(),
            lc_gm = $('#id_grabar_modificar').val(),
            grabar_app = {
                'id': lid_app,
                'vapp': lc_vapp,
                'imagen': lc_imagen,
                'vapp_url': lc_vapp_url,
                'vgm': lc_gm
            };
        $.ajax({
            data: grabar_app,
            dataType: 'json',
            url: url + 'usuarios/GrabarApp',
            type: 'post',
            beforeSend: function() {
                $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
            },
            success: function() {
                $("#espera_grabacion_usuarios").html("");
                mostrar_todos_app();
                $('#ingresar_modificar_app').modal("toggle");

            }
        });
    });


    $("#ver_operativos").click(function() {
        $("#user_op").text("");
        listar_usuarios();
    });

    $("#habilitar_user").click(function() {
        lc_user = $("#txt_dni").val();
        $("#user_op").text("");
        habilitar_usuario(lc_user);

    });



    //   $("#nombre_usuario").attr("disabled", false);

    $("#nombre_usuario").click(function() {
        var lc_user = $("#txt_dni").val(),
            lc_user_anterior = $("#txt_user").val();
        $("#id_dni").val(lc_user);
        $("#nuser_anterior").text(lc_user_anterior);
        $("#id_nombre_user").val('');
        $("#btn_grabar_username").attr("disabled", true);
        $("#mostrar_ingrese_user").modal({ show: true, backdrop: 'static' });
    });

    $("#id_nombre_user").keypress(function() {
        $("#btn_grabar_username").attr("disabled", false);
    });



    $("#btn_grabar_username").click(function() {
        var lc_dni = $("#id_dni").val(),
            lc_nuevo_nombre_user = $("#id_nombre_user").val(),
            data_user = { 'dni': lc_dni, 'nuser': lc_nuevo_nombre_user };
        $.ajax({
            data: data_user,
            dataType: 'json',
            url: url + 'usuarios/nuevo_n_user',
            type: 'post',
            beforeSend: function() {
                $(".mensajes").html("<center><img src='" + url_grafico + "/en_espera.gif' width='300' height='250' alt=''/></center>");
            },
            success: function() {
                $(".mensajes").html("");
                limpiar_input_inicio();
                listar_usuarios();
                $("#btn_grabar_username").attr("disabled", true);
                $('#mostrar_ingrese_user').modal("toggle");

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