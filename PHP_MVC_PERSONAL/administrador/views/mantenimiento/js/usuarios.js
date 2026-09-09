var url = 'http://' + document.domain + '/rrhh/administrador/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_dni, leer_usu_paterno, leer_usu_materno, leer_usu_nombre, leer_sexo, leer_cargo, leer_unidad, leer_estado, leer_email, lc_buscar_nombre, nro_registros, dato_buscar, lc_dni, dato_dni, code, lc_dni_longitud, leer_paterno, leer_materno, leer_nombres, leer_correo, leer_sexo, ln_verificar_t, ln_verificar1, ln_verificar2, ln_verificar3, dato_grabar, leer_fecha_expiracion, lc_tipo_operacion, leer_nombre_sexo, leer_sexo_m, leer_unidad_m, leer_estado_m, leer_cargo_m, leer_sexo_modificado, leer_cargo_grabar_modificado, leer_descripcion, leer_nombre_estado, leer_estado_modificado, leer_unidad_modificado, dato_dni_modulos, lid_am, dato_buscar_menu, lid_menu, dato_buscar_sub_menu, leer_id_modulo_seleccion, lid_modulo, dato_buscar_grabar, lc_nombre, leer_nombre_modulo, dato_grabar_modulo_usuario, dato_desactivar, lestado_menu, lc_tipo_activacion, leer_id_menu, dato_activacion, dato_eliminar, dato_sub_menu, lc_tipo_activacion_sub_menu, leer_id_submenu, leer_estado_submenu, dato_reset;

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_dni = $('#slc_usuarios  option:selected').attr('dni');
    leer_usu_paterno = $('#slc_usuarios  option:selected').attr('usu_paterno');
    leer_usu_materno = $('#slc_usuarios  option:selected').attr('usu_materno');
    leer_usu_nombre = $('#slc_usuarios  option:selected').attr('usu_nombre');
    leer_sexo = $('#slc_usuarios  option:selected').attr('sexo');
    switch (leer_sexo) {
        case 'M':
            leer_nombre_sexo = 'MASCULINO';
            $('#slt_sexo  option:selected').val(1);
            break;
        case 'F':
            leer_nombre_sexo = 'FEMENINO';
            $('#slt_sexo  option:selected').val(2);
            break;
        default:
            leer_nombre_sexo = 'NO DEFINIDO';
            $('#slt_sexo  option:selected').val(0);
            break;
    }
    $('#slt_sexo  option:selected').html(leer_nombre_sexo);
    leer_cargo = $('#slc_usuarios  option:selected').attr('cargo');
    $('#slt_cargo  option:selected').html(leer_cargo);
    leer_unidad = $('#slc_usuarios  option:selected').attr('unidad');
    leer_estado = $('#slc_usuarios  option:selected').attr('estado');
    switch (leer_estado) {
        case '1':
            leer_nombre_estado = 'ACTIVO';
            $('#slt_estado option:selected').val(1);
            break;
        case 'F':
            leer_nombre_estado = 'DADO DE BAJA';
            $('#slt_estado option:selected').val(1);
            break;
        default:
            leer_nombre_estado = 'NO DEFINIDO';
            $('#slt_estado option:selected').val(1);
            break;
    }
    $('#slt_estado  option:selected').html(leer_nombre_estado);
    leer_email = $('#slc_usuarios  option:selected').attr('email');
    leer_descripcion = $('#slc_usuarios  option:selected').attr('descripcion');

    $("#unidad_registrada").text(leer_descripcion);
    $("#codigo_unidad").text(' - ' + leer_unidad);
    $("#txt_dni").val(leer_dni);
    $("#txt_paterno").val(leer_usu_paterno);
    $("#txt_materno").val(leer_usu_materno);
    $("#txt_nombres").val(leer_usu_nombre);
    $("#txt_cargo").val(leer_cargo);
    $("#txt_correo").val(leer_email);

    $('#modificar_registro').attr("disabled", false);
    $('#eliminar_registro').attr("disabled", false);
    $('#reset_clave').attr("disabled", false);
    ver_permisos_modulos(leer_dni);
    $("#slt_menus_permitidos")
          .html('')
          .attr("disabled", true);

        
    $("#slt_sub_menus_permitidos")
          .html('')
          .attr("disabled", true);


    $("#btn_agregar_nuevo_modulo").attr("disabled", false);
    $("#btn_desactivar_modulo").attr("disabled", true);

    $('input:radio[name=menu_activar]')
        .attr('checked', false)
        .attr("disabled", true);

}



function ver_permisos_modulos(leer_dni) {
    "use strict";
    dato_dni_modulos = {
        'dni': leer_dni
    };

    $.ajax({
        data: dato_dni_modulos,
        dataType: 'json',
        url: url + 'mantenimiento/seleccion_modulos_por_dni',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#slt_modulos_permisos").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.encontro === '1') {
                    $("#slt_modulos_permisos").append('<option value="' + filas.id + '" id = "' + filas.id + '" nombre = "' + filas.nombre + '" estado = "' + filas.estado + '"  >' + filas.nombre + '</option>');
                    $("#slt_modulos_permisos").attr("disabled", false);
                    $("#slt_menus_permitidos").attr("disabled", false);

                } else {
                    $("#slt_modulos_permisos").attr("disabled", true);
                    $("#btn_desactivar_modulo").attr("disabled", true);
                    $("#slt_modulos_permisos").empty();

                }
            });
        }
    });
}



function leer_modulos_mostrar_menu() {
    "use strict";
    $("#slt_sub_menus_permitidos").attr("disabled", true);
    $("#slt_sub_menus_permitidos").empty();
    $("#btn_desactivar_modulo").attr("disabled", false);

    lid_am = $('#slt_modulos_permisos  option:selected').attr('id');
    dato_buscar_menu = {
        'id_am': lid_am
    };

    $.ajax({
        data: dato_buscar_menu,
        dataType: 'json',
        url: url + 'mantenimiento/seleccion_menu_por_id',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#slt_menus_permitidos").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.encontro === '1') {
                    $("#slt_menus_permitidos").append('<option value="' + filas.id + '" id = "' + filas.id + '" nombre = "' + filas.nombre + '" estado = "' + filas.estado + '"  >' + filas.nombre + '</option>');
                    $("#slt_menus_permitidos").attr("disabled", false);
                } else {
                    $("#slt_menus_permitidos").attr("disabled", true);
                    $("#slt_menus_permitidos").empty();
                }
            });
        }
    });
    $("#menu_activar_0").attr("disabled", false);
    $("#menu_activar_1").attr("disabled", false);
    $('input:radio[name=menu_activar]').attr('checked', false);
    $('input:radio[name=menu_activar]').attr("disabled", true);

}


function limpiar_para_registrar_nuevo_usuario() {
    "use strict";
    $("#txt_dni").val('');
    $("#txt_dni").attr("disabled", false);
    $("#txt_dni").focus();
    $("#txt_paterno").val('');
    $("#txt_materno").val('');
    $("#txt_nombres").val('');
    $("#txt_correo").val('  @heves.gob.pe');
    $("#txt_cargo").val('');
    $("#unidad_organica").select2("val", "");
    $("#estado").val('');
    $('#modificar_registro').attr("disabled", true);
    $('#eliminar_registro').attr("disabled", true);
    $("#mostrar_espera").text('');
    $("#unidad_registrada").text('');

}


function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'mantenimiento/buscar_por_nombre_usuario',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#slc_usuarios").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    $("#slc_usuarios").append('<option value="' + filas.dni + '"  dni = "' + filas.dni +
                        '" usu_paterno = "' + filas.usu_paterno +
                        '" usu_materno = "' + filas.usu_materno +
                        '" usu_nombre = "' + filas.usu_nombre +
                        '" sexo = "' + filas.sexo +
                        '" cargo = "' + filas.cargo +
                        '" email = "' + filas.email +
                        '" unidad = "' + filas.unidad_organica +
                        '" estado = "' + filas.estado +
                        '" descripcion = "' + filas.descripcion +
                        '"  >' + filas.nombres + '</option>');

                });
            } else {
                $("#slc_usuarios").empty();

            }
        }
    });
}


function ver_si_existe_dni(lc_dni) {
    "use strict";
    dato_dni = {
        "dni": lc_dni
    };
    $.ajax({
        data: dato_dni,
        dataType: 'json',
        url: url + 'mantenimiento/buscar_por_dni_si_existe',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#mostrar_espera").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.encontro === '1') {
                        $("#dni_incorrecto").html('<em><strong><font size="-2">DNI fue registrado....</font></strong></em><br>');
                        $("#txt_paterno").attr("disabled", true);
                    } else {
                        $("#dni_incorrecto").html('<em><strong><font size="-2">DNI no existe, proceder a ingresar...</font></strong></em>');
                        $("#txt_paterno").attr("disabled", false);
                        $("#txt_paterno").focus();
                        $("#txt_materno").attr("disabled", false);
                        $("#txt_nombres").attr("disabled", false);
                        $("#txt_correo").attr("disabled", false);
                        $("#slt_sexo").attr("disabled", false);
                        $("#fecha_expiracion").attr("disabled", false);
                        $("#slt_cargo").attr("disabled", false);
                        $("#slt_unidad").attr("disabled", false);
                        $("#slt_estado").attr("disabled", false);
                    }
                });
            } else {

            }
        }
    });

}


function grabar_nuevo_usuario(leer_dni, leer_paterno, leer_materno, leer_nombres, leer_correo, leer_sexo, leer_cargo, leer_unidad, leer_fecha_expiracion, leer_estado) {
    "use strict";

    dato_grabar = {
        'dni': leer_dni,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'nombres': leer_nombres,
        'correo': leer_correo,
        'sexo': leer_sexo,
        'cargo': leer_cargo,
        'unidad': leer_unidad,
        'fecha_expiracion': leer_fecha_expiracion,
        'estado': leer_estado
    };
    $.ajax({
        data: dato_grabar,
        dataType: 'json',
        url: url + 'mantenimiento/grabar_datos_usuario',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $("#mostrar_espera").html("");
          //   swal(".... USUARIO GRABADO CONFORME ....  ");
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            limpiar_para_registrar_nuevo_usuario();
            $("#grabar_registro").attr("disabled", true);


        }
    });

}




function grabar_usuario_segun_condicion() {
    "use strict";
    leer_dni = $("#txt_dni").val();
    leer_paterno = $("#txt_paterno").val();
    leer_materno = $("#txt_materno").val();
    leer_nombres = $("#txt_nombres").val();
    leer_correo = $("#txt_correo").val();
    leer_sexo = $('#slt_sexo  option:selected').attr('sexo');

    leer_fecha_expiracion = $("#fecha_expiracion").val();
    if (leer_sexo === '0') {
        $("#mostrar_espera").html(' <em><strong><font size="2" color="#FB4346">Falto Ingresar Sexo....</font></strong></em>');
    } else {
        $("#mostrar_espera").html('');
        ln_verificar1 = 1;
    }

    leer_cargo = $('#slt_cargo  option:selected').attr('cargo');

    if (leer_cargo === '0') {
        $("#mostrar_espera").html(' <em><strong><font size="2" color="#FB4346">Falto Ingresar Cargo de Trabajo....</font></strong></em>');
    } else {
        $("#mostrar_espera").html('');
        ln_verificar2 = 2;
    }
    leer_unidad = $('#slt_unidad option:selected').attr('codigo');
    leer_estado = $('#slt_estado option:selected').attr('estado');
    if (leer_estado === '0') {
        $("#mostrar_espera").html(' <em><strong><font size="2" color="#FB4346">Seleccione operatividad del usuario....</font></strong></em>');
    } else {
        $("#mostrar_espera").html('');
        ln_verificar3 = 3;
    }
    ln_verificar_t = ln_verificar1 + ln_verificar2 + ln_verificar3;
    if (ln_verificar_t === 6) {
        grabar_nuevo_usuario(leer_dni, leer_paterno, leer_materno, leer_nombres, leer_correo, leer_sexo, leer_cargo, leer_unidad, leer_fecha_expiracion, leer_estado);
    } else {
        //        swal("Datos incompletos...revise");
        ln_verificar_t = 0;
    }
    
    $("#dni_incorrecto").html('');



}




function grabar_modificacion_usuario() {
    "use strict";
    leer_dni = $("#txt_dni").val();
    leer_paterno = $("#txt_paterno").val();
    leer_materno = $("#txt_materno").val();
    leer_nombres = $("#txt_nombres").val();
    leer_correo = $("#txt_correo").val();
    leer_fecha_expiracion = $("#fecha_expiracion").val();
    leer_sexo_m = $('#slt_sexo  option:selected').val();
    leer_sexo_modificado = (leer_sexo === leer_sexo_m) ? leer_sexo : leer_sexo_m;
    leer_cargo_m = $("#slt_cargo  option:selected").val();
    leer_cargo_grabar_modificado = (leer_cargo === leer_cargo_m) ? leer_cargo : leer_cargo_m;
    // alert(leer_cargo + ' -- ' + leer_cargo_m + ' -- ' + leer_cargo_grabar_modificado);


    if (typeof leer_estado_m === "undefined") {
        leer_estado_m = leer_estado;
    }
    leer_estado_modificado = (leer_estado === leer_estado_m) ? leer_estado : leer_estado_m;

    if (typeof leer_unidad_m === "undefined") {
        leer_unidad_m = leer_unidad;
    }
    leer_unidad_modificado = (leer_unidad === leer_unidad_m) ? leer_unidad : leer_unidad_m;


    dato_grabar = {
        'dni': leer_dni,
        'paterno': leer_paterno,
        'materno': leer_materno,
        'nombres': leer_nombres,
        'correo': leer_correo,
        'sexo': leer_sexo_modificado,
        'cargo': leer_cargo_grabar_modificado,
        'unidad': leer_unidad_modificado,
        'fecha_expiracion': leer_fecha_expiracion,
        'estado': leer_estado_modificado
    };


    $.ajax({
        data: dato_grabar,
        dataType: 'json',
        url: url + 'mantenimiento/grabar_modificacion_usuario',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $("#mostrar_espera").html("");
            // swal(".... MODIFICACION GRABADA CONFORME ....  ");
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            limpiar_para_registrar_nuevo_usuario();
            $("#grabar_registro").attr("disabled", true);


        }
    });




}

function permisos_en_blanco_desabilitados() {
    "use strict";
    $("#slt_modulos_permisos").attr("disabled", true);
    $("#slt_modulos_permisos").empty();
    $("#slt_menus_permitidos").attr("disabled", true);
    $("#slt_menus_permitidos").empty();
    $("#mostrar_espera").html("");
    $("#slt_sub_menus_permitidos").attr("disabled", true);
    $("#slt_sub_menus_permitidos").empty();

}





function leer_menu_y_mostrar_sub_menu() {
    "use strict";
    lid_menu = $('#slt_menus_permitidos  option:selected').attr('id');
    lestado_menu = $('#slt_menus_permitidos  option:selected').attr('estado');
    dato_buscar_sub_menu = {
        'id_menu': lid_menu
    };
    $.ajax({
        data: dato_buscar_sub_menu,
        dataType: 'json',
        url: url + 'mantenimiento/seleccion_sub_menu_por_id',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (encontrados) {
            $("#slt_sub_menus_permitidos").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                if (filas.encontro === '1') {
                    $("#slt_sub_menus_permitidos").append('<option value="' + filas.id + '" id = "' + filas.id + '" nombre = "' + filas.nombre + '" estado = "' + filas.estado + '"  >' + filas.nombre + '</option>');
                    $("#slt_sub_menus_permitidos").attr("disabled", false);
                } else {
                    $("#slt_sub_menus_permitidos").attr("disabled", true);
                    $("#slt_sub_menus_permitidos").empty();
                }
            });
        }
    });


    $("#menu_activar_0").attr("disabled", false);
    $("#menu_activar_1").attr("disabled", false);
    $("#menu_activar_2").attr("disabled", false);
    $("#menu_activar_3").attr("disabled", false);

    $("#menu_activar_2").prop('checked', 'checked');
    $("#menu_activar_3").prop('checked', 'checked');





    switch (lestado_menu) {
        case '1':
            $("#menu_activar_0").prop('checked', 'checked');
            break;
        case '0':
            $("#menu_activar_1").prop('checked', 'checked');
            break;
        default:
            break;


    }

}




function grabar_modulo_para_usuario(leer_nombre_modulo, leer_id_modulo_seleccion, leer_dni) {
    "use strict";
    dato_grabar_modulo_usuario = {
        'nombre': leer_nombre_modulo,
        'id': leer_id_modulo_seleccion,
        'dni': leer_dni
    };
    $.ajax({
        data: dato_grabar_modulo_usuario,
        dataType: 'json',
        url: url + 'mantenimiento/grabar_modulo_a_usuario',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_grabacion").fadeIn();
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function () {
            $("#mostrar_espera_grabacion").html('');
            $("#mostrar_espera_grabacion").html('<em><strong><font color="#191919">Se Agrego modulo, conforme</font></strong></em>');
            $("#mostrar_espera_grabacion").fadeOut(5000);
        }
    });
}




function leer_mostrar_submenu_y_su_activacion() {
    "use strict";
    leer_id_submenu = $('#slt_sub_menus_permitidos option:selected').attr('id');
    leer_estado_submenu = $('#slt_sub_menus_permitidos  option:selected').attr('estado');
    switch (leer_estado_submenu) {
        case '1':
            $("#activar_sub_menu_0").prop('checked', 'checked');
            break;
        case '0':
            $("#activar_sub_menu_1").prop('checked', 'checked');
            break;
        default:
            break;
    }

    $("#activar_sub_menu_0").attr("disabled", false);
    $("#activar_sub_menu_1").attr("disabled", false);
    $("#activar_sub_menu_2").attr("disabled", false);
    $("#activar_sub_menu_3").attr("disabled", false);

}

 

function activar_desactivar_submenu(leer_id_submenu, lc_tipo_activacion_sub_menu)

{
    "use strict";
    dato_sub_menu = {
        'id': leer_id_submenu,
        'estado': lc_tipo_activacion_sub_menu
    };
    $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'mantenimiento/activar_desactivar_submenu',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            if (lc_tipo_activacion_sub_menu === '1') {
                $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Activo sub menu...</font></strong></em>');

            } else {
                $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Desactivo submenu...</font></strong></em>');
            }
            leer_menu_y_mostrar_sub_menu();
            $("#mostrar_espera_grabacion_sub_menu").fadeOut(5000);

        }
    });

}




function activar_todos_los_submenus(lid_menu) {
    "use strict";
    dato_sub_menu = {
        'id': lid_menu
    };
    
     $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'mantenimiento/activar_todos_los_submenus',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Activaron todos los sub menu...</font></strong></em>');
            leer_menu_y_mostrar_sub_menu();
            $("#mostrar_espera_grabacion_sub_menu").fadeOut(5000);

        }
    });
 }



function desactivar_todos_los_submenus(lid_menu) {
    "use strict";
    dato_sub_menu = {
        'id': lid_menu
    };

   

    $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'mantenimiento/desactivar_todos_los_submenus',
        type: 'post',
        beforeSend: function () {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Desactivaron todos los sub menus...</font></strong></em>');
            leer_menu_y_mostrar_sub_menu();
            $("#mostrar_espera_grabacion_sub_menu").fadeOut(5000);

        }
    });



}






$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $('#grabar_registro').attr("disabled", true);
    $('#modificar_registro').attr("disabled", true);
    $('#eliminar_registro').attr("disabled", true);
    $('#reset_clave').attr("disabled", true);

    $("#txt_buscar_nombre")
        .focus()
        .keyup(function () {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            permisos_en_blanco_desabilitados();
        });
    $("#slc_usuarios")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });

    $("#slt_modulos_permisos")
        .click(function () {
            leer_modulos_mostrar_menu();
        })
        .keyup(function () {
            leer_modulos_mostrar_menu();
        });

    $("#slt_menus_permitidos")
        .click(function () {
            leer_menu_y_mostrar_sub_menu();
        })
        .keyup(function () {
            leer_menu_y_mostrar_sub_menu();
        });

    $("#slt_sub_menus_permitidos")
        .click(function () {
            leer_mostrar_submenu_y_su_activacion();
        })
        .keyup(function () {
            leer_mostrar_submenu_y_su_activacion();
        });


    $("#nuevo_registro").click(function () {
        lc_tipo_operacion = '1';
        limpiar_para_registrar_nuevo_usuario();

    });



    $("#txt_dni").keyup(function (e) {
        $("#dni_incorrecto").text('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            lc_dni = $("#txt_dni").val();
            lc_dni_longitud = lc_dni.length;
            if (lc_dni_longitud === 8) {
                ver_si_existe_dni(lc_dni);
            } else {
                $("#dni_incorrecto").html('<em><strong><font size="-2">Deben ser 8 digitos.....</font></strong></em>');

            }

        }

    });




    $("#txt_paterno").keypress(function (e) {
        $("#mostrar_espera").text('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_paterno").val($("#txt_paterno").val().toUpperCase());
            $("#txt_materno").focus();
        }

    });

    $("#txt_materno").keypress(function (e) {
        $("#mostrar_espera").text('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_materno").val($("#txt_materno").val().toUpperCase());
            $("#txt_nombres").focus();
        }

    });


    $("#txt_nombres").keypress(function (e) {
        $("#mostrar_espera").text('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_nombres").val($("#txt_nombres").val().toUpperCase());
            $("#txt_correo").focus();
        }

    });



    $("#txt_correo").keypress(function (e) {
        $("#mostrar_espera").text('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#slt_sexo").focus();
        }

    });

    
    
    /*
    
    id="sexo_0" value="M">
                      MASCULINO</label></td>
                  </tr>
                  <tr>
                    <td><label>
                      <input name="sexo" type="radio" disabled="disabled" id="sexo_1" value="F">
                      FEMENINO</label></td>
    
    */
    

    $("#slt_estado").change(function () {
        if (lc_tipo_operacion === '1') {
            $("#mostrar_espera").text('');
            $("#grabar_registro").attr("disabled", false);

        } else {
            leer_estado_m = $('#slt_estado option:selected').attr('estado');
        }
    });



    $("#slt_unidad").change(function () {
        if (lc_tipo_operacion === '1') {} else {
            leer_unidad_m = $('#slt_unidad option:selected').attr('codigo');
        }
    });



    $('#fecha_expiracion').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "+0d",
        autoclose: true
    }).on('show', function () {
        var modal = $('#n-fecha-expiracion').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $('#fecha-expiracion').css("background-color", "#FCFBA0");
    });

    $("#slt_unidad").select2({
        allowClear: true,
        placeholder: "Selecionar una opcion",
        formatNoMatches: function (term) {
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
    $("#slt_unidad").select2({
        allowClear: true,
        placeholder: "Selecionar"
    });
    
    
    
    
    
    $("#modificar_registro").click(function () {
        lc_tipo_operacion = '2';
        $("#txt_dni").attr("disabled", false);
        $("#txt_paterno").attr("disabled", false);
        $("#txt_materno").attr("disabled", false);
        $("#txt_nombres").attr("disabled", false);
        $("#txt_correo").attr("disabled", false);
        $("#slt_sexo").attr("disabled", false);
        $("#fecha_expiracion").attr("disabled", false);
        $("#slt_cargo").attr("disabled", false);
        $("#slt_unidad").attr("disabled", false);
        $("#slt_estado").attr("disabled", false);
        $("#grabar_registro").attr("disabled", false);

    });

    // slt_sub_menus_permitidos


    $("#grabar_registro").click(function () {

        if (lc_tipo_operacion === '1') {
            grabar_usuario_segun_condicion();
        } else {
            grabar_modificacion_usuario();

        }
    });


    $("#btn_agregar_nuevo_modulo").click(function () {
        $("#slt_modulos_disponibles").attr("disabled", false);
        $("#slt_modulos_disponibles").css("background-color", "#FCFBA0");

    });



    $("#slt_modulos_disponibles").change(function () {
        $("#slt_menus_permitidos").attr("disabled", true);
        $("#slt_menus_permitidos").empty();
        $("#slt_sub_menus_permitidos").attr("disabled", true);
        $("#slt_sub_menus_permitidos").empty();
        $('input:radio[name=menu_activar]')
            .attr('checked', false)
            .attr("disabled", true);
        leer_id_modulo_seleccion = $('#slt_modulos_disponibles  option:selected').attr('id');
        leer_nombre_modulo = $('#slt_modulos_disponibles  option:selected').attr('nombre');
        lid_modulo = leer_dni + leer_id_modulo_seleccion;
        dato_buscar_grabar = {
            'id': lid_modulo
        };
        $.ajax({
            data: dato_buscar_grabar,
            dataType: 'json',
            url: url + 'mantenimiento/ubicar_acceso_modulo_si_existe',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function (encontrados) {
                $("#mostrar_espera_grabacion").html('');
                nro_registros = encontrados.length;
                encontrados.forEach(function (filas) {
                    if (filas.encontro === '1') {
                        lc_nombre = filas.nombre;
                        $("#mostrar_espera_grabacion").fadeIn();
                        $("#mostrar_espera_grabacion").html('<em><strong><font color="#191919">Modulo :  --- ' + lc_nombre + ' ---  YA EXISTE ---  para este usuario</font></strong></em>');
                        $("#mostrar_espera_grabacion").fadeOut(15000);
                    } else {
                        grabar_modulo_para_usuario(leer_nombre_modulo, leer_id_modulo_seleccion, leer_dni);
                        ver_permisos_modulos(leer_dni);
                    }
                });
                $("#btn_desactivar_modulo").attr("disabled", true);
            }
        });
    });



    $("#btn_desactivar_modulo").click(function () {
        leer_id_modulo_seleccion = $('#slt_modulos_permisos  option:selected').attr('id');
        dato_desactivar = {
            'id': leer_id_modulo_seleccion
        };
        $.ajax({
            data: dato_desactivar,
            dataType: 'json',
            url: url + 'mantenimiento/desactivar_modulo',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function () {
                $("#mostrar_espera_grabacion").html("");
                ver_permisos_modulos(leer_dni);
                $("#btn_desactivar_modulo").attr("disabled", true);
                ver_permisos_modulos(leer_dni);
                $("#btn_desactivar_modulo").attr("disabled", true);
                $("#slt_menus_permitidos").attr("disabled", true);
                $("#slt_menus_permitidos").empty();
                $("#slt_sub_menus_permitidos").attr("disabled", true);
                $("#slt_sub_menus_permitidos").empty();


            }
        });


    });

    // slt_menus_permitidos


    $("input[name=menu_activar").click(function () {
        lc_tipo_activacion = $('input:radio[name=menu_activar]:checked').val();
        leer_id_menu = $('#slt_menus_permitidos  option:selected').attr('id');
        dato_activacion = {
            'id': leer_id_menu,
            'estado': lc_tipo_activacion
        };
        $.ajax({
            data: dato_activacion,
            dataType: 'json',
            url: url + 'mantenimiento/activar_menu',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_espera_grabacion_menu").fadeIn();
                $("#mostrar_espera_grabacion_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function () {
                if (lc_tipo_activacion === '1') {
                    $("#mostrar_espera_grabacion_menu").html('<em><strong><font color="#191919">.. se activo menu...</font></strong></em>');

                } else {
                    $("#mostrar_espera_grabacion_menu").html('<em><strong><font color="#191919">.. Se Desactivo menu...</font></strong></em>');
                }
                leer_modulos_mostrar_menu();
                $("#mostrar_espera_grabacion_menu").fadeOut(5000);

            }
        });
    });


    $("input[name=activar_sub_menu").click(function () {
        lc_tipo_activacion_sub_menu = $('input:radio[name=activar_sub_menu]:checked').val();

        switch (lc_tipo_activacion_sub_menu) {
            case '0':
                activar_desactivar_submenu(leer_id_submenu, lc_tipo_activacion_sub_menu);
                break;
            case '1':
                activar_desactivar_submenu(leer_id_submenu, lc_tipo_activacion_sub_menu);
                break;
            case '2':
                activar_todos_los_submenus(lid_menu);
                break;

            case '3':
                desactivar_todos_los_submenus(lid_menu);
                break;

            default:
                break;


        }

    });



    $("#eliminar_registro").click(function () {
        dato_eliminar = {
            'dni': leer_dni
        };

        $.ajax({
            data: dato_eliminar,
            dataType: 'json',
            url: url + 'mantenimiento/eliminar_usuarios_con_permisos',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function () {
                ver_permisos_modulos(leer_dni);
                leer_modulos_mostrar_menu();
                limpiar_para_registrar_nuevo_usuario();
                lc_buscar_nombre = '';
                leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
                permisos_en_blanco_desabilitados();
                leer_menu_y_mostrar_sub_menu();
                $("#grabar_registro").attr("disabled", false);
                $("#eliminar_registro").attr("disabled", false);
                $("#mostrar_espera_grabacion").html('');
                

            }
        });

    });



    $("#reset_clave").click(function () {
        dato_reset = {
            'dni': leer_dni
        };

        $.ajax({
            data: dato_reset,
            dataType: 'json',
            url: url + 'mantenimiento/reset_clave_usuario',
            type: 'post',
            beforeSend: function () {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function () {
                $("#mostrar_espera_grabacion").html('');
                ver_permisos_modulos(leer_dni);
                leer_modulos_mostrar_menu();
                limpiar_para_registrar_nuevo_usuario();
                lc_buscar_nombre = '';
                leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
                permisos_en_blanco_desabilitados();
                leer_menu_y_mostrar_sub_menu();
                $("#grabar_registro").attr("disabled", false);
                $("#eliminar_registro").attr("disabled", false);
                $("#reset_clave").attr("disabled", false);
              
                
                

            },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
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
