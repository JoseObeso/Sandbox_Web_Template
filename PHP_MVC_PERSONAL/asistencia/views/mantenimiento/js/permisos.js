var url = 'http://' + document.domain + '/rrhh/administrador/';
var dni_buscado = '',
    modulo_seleccionado = '',
    menu_seleccionado = '',
    submenu_seleccionado = '';
var menu_nombre_seleccionado = '',
    modulo_nombre_seleccionado = '';

function mostrar_mensaje_en_modal(id_modal, tipo_alerta, mensaje_alerta, ocultar) {
    var timeslide = 1000;
    
    $("" + id_modal).animate({
        scrollTop: 0
    }, 500);
    $("" + id_modal).find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
    $("" + id_modal).find(".mensajes").find(".mensajes-descripcion").hide(0).html('<button type="button" class="close cerraralerta" data-dismiss="alert">×</button><strong>' + mensaje_alerta + '</strong>')
    $("" + id_modal).find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
    if (ocultar == true) {
        setTimeout(function () {
            $("" + id_modal).find(".mensajes").find('.mensajes-descripcion').slideUp('2000');
        }, 3000);
    }
}

function mostrar_mensaje_correcto(mensaje) {
    $("#mensaje-correcto").find(".modal-body").text(mensaje);
    $('#mensaje-correcto').modal({
        show: true,
        backdrop: 'static'
    });
}

function mostrar_mensaje_error(mensaje) {
    $("#mensaje-error").find(".modal-body").text(mensaje);
    $('#mensaje-error').modal({
        show: true,
        backdrop: 'static'
    });
}

function listar_modulos() {
    var posting = $.post(url + "mantenimiento/getListadoAccesoModulos", {
        dni: dni_buscado
    });
    posting.done(function (data) {
        var html_modulos = '';
        if (isJSON(data) == true) {
            var imprimir = $.parseJSON(data);
            if (imprimir[0]["estado_respuesta"] == 1) {
                $.each(imprimir, function (indice, valor) {
                    html_modulos += '<div class="ticket puntero">';
                    if (imprimir[indice]["estado"] == 1) {
                        html_modulos += '<span class="label label-success ticket-label">Activo</span>';
                    } else {
                        html_modulos += '<span class="label label-danger ticket-label">Desactivado</span>';
                    }
                    html_modulos += '<input type="hidden" value="' + imprimir[indice]["id_am"] + '">'
                    html_modulos += '<a title="" class="ticket-title">' + imprimir[indice]["nombre"] + '</a>';
                    html_modulos += '</div>';
                });
                $("#listado_plantilla_modulos").html(html_modulos);
                $("#listado_plantilla_menu").html('<div class="alert">Debe de seleccionar un "Modulo".</div>');
            } else {
                html_modulos = '<div class="alert">' + imprimir[0]["mensaje"] + '</div>';
                $("#listado_plantilla_modulos").html(html_modulos);
                $("#listado_plantilla_menu").html('<div class="alert">Debe de seleccionar un "Modulo".</div>');
            }
        } else {
            mostrar_mensaje_error("Error del Sistema: <br/>" + data);
        }
    });
    posting.fail(function () {
        mostrar_mensaje_error("No hay conexion con el servidor.");
    })
}

function listar_menus() {
    var posting = $.post(url + "mantenimiento/getListadoAccesoMenus", {
        id_pl_m: modulo_seleccionado,
        dni: dni_buscado
    });
    posting.done(function (data) {
        if (isJSON(data) == true) {
            var imprimir = $.parseJSON(data);
            var html_menus = '';
            if (imprimir[0]["estado_respuesta"] == 1) {
                $.each(imprimir, function (indice, valor) {
                    html_menus += '<div class="ticket puntero">';
                    if (imprimir[indice]["estado"] == 1) {
                        html_menus += '<span class="label label-success ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="1">Activo</span>';
                    } else {
                        html_menus += '<span class="label label-danger ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="0">Desactivado</span>';
                    }
                    html_menus += '<input type="hidden" value="' + imprimir[indice]["id_menu"] + '">'
                    html_menus += '<a title="" class="ticket-title">' + imprimir[indice]["icono"] + ' ' + imprimir[indice]["nombre"] + '</a>';
                    html_menus += '</div>';
                });
                $("#listado_plantilla_menu").html(html_menus);
            } else {
                $("#listado_plantilla_menu").html("<div class='alert'>El Modulo seleccionado, no tiene menus.</div>");
            }
            $("#listado_plantilla_submenu").html('<div class="alert">Debe de seleccionar un "Menu".</div>');
            $("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
        } else {
            mostrar_mensaje_error("Error del Sistema: <br/>" + data);
        }
    });
    posting.fail(function () {
        mostrar_mensaje_error("No hay conexion con el servidor.");
    })
}

function listar_submenus() {
    var posting = $.post(url + "mantenimiento/getListadoAccesoSubMenus", {
        id_pl_menu: menu_seleccionado,
        dni: dni_buscado
    });
    posting.done(function (data) {
        if (isJSON(data) == true) {
            var imprimir = $.parseJSON(data);
            var html_submenus = '';
            if (imprimir[0]["estado_respuesta"] == 1) {
                $.each(imprimir, function (indice, valor) {
                    html_submenus += '<div class="ticket puntero">';
                    if (imprimir[indice]["estado"] == 1) {
                        html_submenus += '<span class="label label-success ticket-label btn-permiso-submenu" id="' + imprimir[indice]["id_submenu"] + '" data-value="1">Activo</span>';
                    } else {
                        html_submenus += '<span class="label label-danger ticket-label btn-permiso-submenu" id="' + imprimir[indice]["id_submenu"] + '" data-value="0">Desactivado</span>';
                    }
                    html_submenus += '<input type="hidden" value="' + imprimir[indice]["id_submenu"] + '">'
                    html_submenus += '<a title="" class="ticket-title">' + imprimir[indice]["nombre"] + '</a>';
                    html_submenus += '</div>';
                });
                $("#listado_plantilla_submenu").html(html_submenus);
                $("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
            } else {
                $("#listado_plantilla_submenu").html('<div class="alert">El Menu "' + menu_nombre_seleccionado + '" del Modulo "' + modulo_nombre_seleccionado + '", no tiene Sub Menus.</div>');
            }
        } else {
            mostrar_mensaje_error("Error del Sistema: <br/>" + data);
        }
    });
    posting.fail(function () {
        mostrar_mensaje_error("No hay conexion con el servidor.");
    })
}

function listar_botones() {
    var posting = $.post(url + "mantenimiento/getListadoAccesoBotones", {
        id_pl_submenu: submenu_seleccionado,
        dni: dni_buscado
    });
    posting.done(function (data) {
        if (isJSON(data) == true) {
            var imprimir = $.parseJSON(data);
            var html_botones = '';
            if (imprimir[0]["estado_respuesta"] == 1) {
                $.each(imprimir, function (indice, valor) {
                    html_botones += '<div class="ticket puntero">';
                    if (imprimir[indice]["estado"] == 1) {
                        html_botones += '<span class="label label-success ticket-label btn-permiso-botones" id="' + imprimir[indice]["id_boton"] + '" data-value="1">Activo</span>';
                    } else {
                        html_botones += '<span class="label label-danger ticket-label btn-permiso-botones" id="' + imprimir[indice]["id_boton"] + '" data-value="0">Desactivado</span>';
                    }
                    html_botones += '<button class="btn btn-labeled btn-primary"><span class="btn-label">' + imprimir[indice]["icono"] + '</span>' + imprimir[indice]["nombre"] + '</button>';
                    html_botones += '</div>';
                });
                $("#listado_plantilla_botones").html(html_botones);
            } else {
                $("#listado_plantilla_botones").html("<div class='alert'>El SubMenu seleccionado, no tiene botones.</div>");
            }
        } else {
            mostrar_mensaje_error("Error del Sistema: <br/>" + data);
        }
    });
    posting.fail(function () {
        mostrar_mensaje_error("No hay conexion con el servidor.");
    })
}
$(document).ready(function () {
    $('.crear-tooltip').tooltip();
    $(document).delegate("#frm-buscar", "submit", function () {
        var dni = $("#dni2").val();
        dni_buscado = dni;
        var posting = $.post(url + "mantenimiento/getnombrepordni", {
            dni: dni
        });
        posting.done(function (data) {
            $("#ver_nombre_dni").html(data);
            $('.srcollpanel .panel-body > div').slimScroll({
                height: 80,
                alwaysVisible: true,
                color: '#71C167',
                allowPageScroll: true
            });
        });

        var posting = $.post(url + "mantenimiento/ver_permisos", {
            dni: dni
        });
        posting.done(function (data) {
            $("#listar_permisos_usuario").html(data);
            $('.srcollpanel .panel-body > div').slimScroll({
                height: 220,
                alwaysVisible: true,
                color: '#E9D189',
                allowPageScroll: true
            });
        });
        posting.fail(function () {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
        return false;
    })

    $(document).delegate("#eliminar_modulo", "click", function () {
        if (modulo_seleccionado != '') {
            bootbox.confirm({
                message: "Esta seguro que desea eliminarlo?",
                buttons: {
                    confirm: {
                        label: "Si"
                    },
                    cancel: {
                        label: "Cancelar"
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        var posting = $.post(url + "mantenimiento/eliminar_modulo", {
                            id_am: modulo_seleccionado,
                            dni: dni_buscado
                        });
                        posting.done(function (data) {
                            if (isJSON(data) == true) {
                                var imprimir = $.parseJSON(data);
                                if (imprimir["estado_respuesta"] == 1) {
                                    mostrar_mensaje_correcto(imprimir["mensaje"]);
                                    listar_modulos()
                                } else if (imprimir["estado_respuesta"] == 0) {
                                    mostrar_mensaje_error(imprimir["mensaje"]);
                                }
                            } else {
                                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
                            }
                        });
                        posting.fail(function () {
                            mostrar_mensaje_error("No hay conexion con el servidor.");
                        })
                    }
                },
                className: "bootbox-sm"
            });
        } else {
            mostrar_mensaje_error("Primero debe seleccionar un Modulo para poder eliminar.")
        }
    })
    $(document).delegate("#listado_plantilla_modulos .ticket", "click", function () {
        $("#listado_plantilla_modulos .ticket").removeClass('ticket_seleccionado');
        var id_pl_m = $(this).find('input').val();
        
        modulo_nombre_seleccionado = $(this).find('.ticket-title').text();
        $(this).addClass('ticket_seleccionado');
        modulo_seleccionado = id_pl_m;
        var posting = $.post(url + "mantenimiento/getListadoAccesoMenus", {
            id_pl_m: id_pl_m,
            dni: dni_buscado
        });
        
        posting.done(function (data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                var html_menus = '';
                if (imprimir[0]["estado_respuesta"] == 1) {
                    $.each(imprimir, function (indice, valor) {
                        html_menus += '<div class="ticket puntero">';
                        if (imprimir[indice]["estado"] == 1) {
                            html_menus += '<span class="label label-success ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="1">Activo</span>';
                        } else {
                            html_menus += '<span class="label label-danger ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="0">Desactivado</span>';
                        }
                        html_menus += '<input type="hidden" value="' + imprimir[indice]["id_menu"] + '">';
                        html_menus += '<a title="" class="ticket-title">' + imprimir[indice]["icono"] + ' ' + imprimir[indice]["nombre"] + '</a>';
                        html_menus += '</div>';
                    });
                    $("#listado_plantilla_menu").html(html_menus);
                } else {
                    $("#listado_plantilla_menu").html("<div class='alert'>El Modulo seleccionado, no tiene menus.</div>");
                }
                $("#listado_plantilla_submenu").html('<div class="alert">Debe de seleccionar un "Menu".</div>');
                $("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
            } else {
                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
            }
        });
        posting.fail(function () {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
    })

    // aqui poner el buscar por DNI
    $(document).delegate("#ver_nombre .ticket", "click", function () {
        $("#lver_nombre .ticket").removeClass('ticket_seleccionado');
        var bdni = $(this).find('input').val();
        var posting = $.post(url + "mantenimiento/getnombrepordni", {
            dni: dni_buscado
        });
        posting.done(function (data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                var html_menus = '';
                if (imprimir[0]["estado_respuesta"] == 1) {
                    $.each(imprimir, function (indice, valor) {
                        html_menus += '<div class="ticket puntero">';
                        if (imprimir[indice]["estado"] == 1) {
                            html_menus += '<span class="label label-success ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="1">Activo</span>';
                        } else {
                            html_menus += '<span class="label label-danger ticket-label btn-permiso-menu" id="' + imprimir[indice]["id_menu"] + '" data-value="0">Desactivado</span>';
                        }
                        html_menus += '<input type="hidden" value="' + imprimir[indice]["id_menu"] + '">';
                        html_menus += '<a title="" class="ticket-title">' + imprimir[indice]["icono"] + ' ' + imprimir[indice]["nombre"] + '</a>';
                        html_menus += '</div>';
                    });
                    $("#listado_plantilla_menu").html(html_menus);
                } else {
                    $("#listado_plantilla_menu").html("<div class='alert'>El Modulo seleccionado, no tiene menus.</div>");
                }
                $("#listado_plantilla_submenu").html('<div class="alert">Debe de seleccionar un "Menu".</div>');
                $("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
            } else {
                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
            }
        });
        posting.fail(function () {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
    })



    // fin de buscar por DNI





    $(document).delegate(".btn-permiso-menu", "click", function () {
        var id_menu = '',
            dni = '',
            estado = '';
        id_menu = $(this).attr("id");
        dni = dni_buscado;
        estado = $(this).attr("data-value");
        $.post(url + "mantenimiento/cambiar_estado_menu", {
            id_menu: id_menu,
            dni: dni,
            estado: estado
        }, function (data) {
            if (data) {
                listar_menus();
            }
        });
    });
    $(document).delegate("#nuevo_modulo", "click", function () {
        $('#modal_nuevo_modulo').modal({
            show: true,
            backdrop: 'static'
        });
    })
    $(document).delegate("#btn_nuevo_modulo", "click", function () {
        var codigo_modulo = $("#modulo").val();
        var modulo = $('#modulo :selected').text();
        var posting = $.post(url + "mantenimiento/guardar_modulo_usuario", {
            modulo: modulo,
            codigo_modulo: codigo_modulo,
            dni: dni_buscado
        });
        posting.done(function (data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                if (imprimir["estado_respuesta"] == 1) {
                    mostrar_mensaje_en_modal("#modal_nuevo_modulo", "alert-success", imprimir["mensaje"], true);
                    listar_modulos()
                } else if (imprimir["estado_respuesta"] == 0) {
                    mostrar_mensaje_en_modal("#modal_nuevo_modulo", "alert-danger", imprimir["mensaje"], true);
                }
            } else {
                mostrar_mensaje_en_modal("#modal_nuevo_modulo", "alert-danger", "Grabación Conforme <br/>", true);
                listar_modulos()
            }
        });
        posting.fail(function () {
            mostrar_mensaje_en_modal("#modal_nuevo_modulo", "alert-danger", "No hay conexion con el servidor.", false);
        })
    })
    $(document).delegate("#listado_plantilla_menu .ticket", "click", function () {
        $("#listado_plantilla_menu .ticket").removeClass('ticket_seleccionado');
        var id_pl_menu = $(this).find('input').val();
        menu_nombre_seleccionado = $(this).find('.ticket-title').text();
        menu_seleccionado = id_pl_menu;
        $(this).addClass('ticket_seleccionado');
        var posting = $.post(url + "mantenimiento/getListadoAccesoSubMenus", {
            id_pl_menu: id_pl_menu,
            dni: dni_buscado
        });
        posting.done(function (data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                var html_submenus = '';
                if (imprimir[0]["estado_respuesta"] == 1) {
                    $.each(imprimir, function (indice, valor) {
                        html_submenus += '<div class="ticket puntero">';
                        if (imprimir[indice]["estado"] == 1) {
                            html_submenus += '<span class="label label-success ticket-label btn-permiso-submenu" id="' + imprimir[indice]["id_submenu"] + '" data-value="1">Activo</span>';
                        } else {
                            html_submenus += '<span class="label label-danger ticket-label btn-permiso-submenu" id="' + imprimir[indice]["id_submenu"] + '" data-value="0">Desactivado</span>';
                        }
                        html_submenus += '<input type="hidden" value="' + imprimir[indice]["id_submenu"] + '">'
                        html_submenus += '<a title="" class="ticket-title">' + imprimir[indice]["nombre"] + '</a>';
                        html_submenus += '</div>';
                    });
                    $("#listado_plantilla_submenu").html(html_submenus);
                    $("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
                } else {
                    $("#listado_plantilla_submenu").html('<div class="alert">El Menu "' + menu_nombre_seleccionado + '" del Modulo "' + modulo_nombre_seleccionado + '", no tiene Sub Menus.</div>');
                }
            } else {
                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
            }
        });
        posting.fail(function () {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
    })
    $(document).delegate(".btn-permiso-submenu", "click", function () {
        var id_submenu = '',
            dni = '',
            estado = '';
        id_submenu = $(this).attr("id");
        estado = $(this).attr("data-value");
        $.post(url + "mantenimiento/cambiar_estado_submenu", {
            id_submenu: id_submenu,
            dni: dni_buscado,
            estado: estado
        }, function (data) {
            if (data) {
                listar_submenus()
            }
        });
    });
    $(document).delegate("#listado_plantilla_submenu .ticket", "click", function () {
        $("#listado_plantilla_submenu .ticket").removeClass('ticket_seleccionado');
        var id_pl_submenu = $(this).find('input').val();
        submenu_seleccionado = id_pl_submenu;
        submenu_nombre_seleccionado = $(this).find('.ticket-title').text();
        $(this).addClass('ticket_seleccionado');
        var posting = $.post(url + "mantenimiento/getListadoAccesoBotones", {
            id_pl_submenu: id_pl_submenu,
            dni: dni_buscado
        });
        posting.done(function (data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                var html_botones = '';
                if (imprimir[0]["estado_respuesta"] == 1) {
                    $.each(imprimir, function (indice, valor) {
                        html_botones += '<div class="ticket puntero">';
                        if (imprimir[indice]["estado"] == 1) {
                            html_botones += '<span class="label label-success ticket-label btn-permiso-botones" id="' + imprimir[indice]["id_boton"] + '" data-value="1">Activo</span>';
                        } else {
                            html_botones += '<span class="label label-danger ticket-label btn-permiso-botones" id="' + imprimir[indice]["id_boton"] + '" data-value="0">Desactivado</span>';
                        }
                        html_botones += '<button class="btn btn-labeled btn-primary"><span class="btn-label">' + imprimir[indice]["icono"] + '</span>' + imprimir[indice]["nombre"] + '</button>';
                        html_botones += '</div>';
                    });
                    $("#listado_plantilla_botones").html(html_botones);
                } else {
                    $("#listado_plantilla_botones").html("<div class='alert'>El SubMenu seleccionado, no tiene botones.</div>");
                }
            } else {
                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
            }
        });
        posting.fail(function () {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
    })
    $(document).delegate(".btn-permiso-botones", "click", function () {
        var id_boton = '',
            dni = '',
            id_submenu = '',
            estado = '',
            nombre_submenu = '';
        dni = dni_buscado;
        id_boton = $(this).attr("id");
        id_submenu = $("#usuario-submenu").val();
        estado = $(this).attr("data-value");
        nombre_submenu = $("#usuario-submenu-nombre").val();
        $.post(url + "mantenimiento/cambiar_estado_boton", {
            id_boton: id_boton,
            dni: dni,
            id_submenu: id_submenu,
            estado: estado,
            nombre_submenu: nombre_submenu
        }, function (data) {
            if (data) {
                listar_botones();
            } else {

            }
        })
    });
})
