var url = 'http://' + document.domain + '/tramite/gestor/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    lc_buscar_nombre = '',
    ls_save_update_user = '0',
    ls_es_jefatura = '',
    leer_dni,
    leer_usu_paterno, leer_usu_materno, leer_usu_nombre, leer_sexo, leer_cargo, leer_unidad, leer_estado, leer_email, nro_registros,
    dato_buscar, lc_dni, dato_dni, code, lc_dni_longitud, leer_paterno, leer_materno, leer_nombres, leer_correo, leer_sexo, ln_verificar_t,
    ln_verificar1, ln_verificar2, ln_verificar3, dato_grabar, leer_fecha_expiracion, lc_tipo_operacion, leer_nombre_sexo, leer_sexo_m,
    leer_unidad_m, leer_estado_m, leer_cargo_m, leer_sexo_modificado, leer_cargo_grabar_modificado, leer_descripcion, leer_nombre_estado,
    leer_estado_modificado, leer_unidad_modificado, dato_dni_modulos, lid_am, dato_buscar_menu, lid_menu, dato_buscar_sub_menu, leer_id_modulo_seleccion,
    lid_modulo, dato_buscar_grabar, lc_nombre, leer_nombre_modulo, dato_grabar_modulo_usuario, dato_desactivar, lestado_menu, lc_tipo_activacion, leer_id_menu,
    dato_activacion, dato_eliminar, dato_sub_menu, lc_tipo_activacion_sub_menu, leer_id_submenu, leer_estado_submenu, dato_reset,
    ls_user, ls_nombre, ls_apellidos, ls_fono, ls_direccion, ls_expiracion, ls_cargo, ls_actor, ls_descripcion_actor, ls_nombre_del_comite = '',
    ls_abreviatura,
    ls_responsable_actor, ls_jefatura, ls_nombres_apellidos, ls_activo, ls_tipo_condicion_activo, lid_idusuario;



function listar_actor(ls_nombre_del_comite) {
    var listar_todos_actor = {
        "actor": ls_nombre_del_comite
    };
    $.ajax({
        data: listar_todos_actor,
        dataType: 'json',
        url: url + 'procesos/listar_actor_para_comite',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_registrados").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera_registrados").html("");
            $("#slt_comites_registrados").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                $("#slt_comites_registrados").html("");
                encontrados.forEach(function(filas) {

                    if (filas.respuesta === '1') {
                        $("#slt_comites_registrados").append('<option id="' + filas.actor +
                            '"  actor = "' + filas.actor + '" descripcion = "' + filas.descripcion +
                            '" abreviatura = "' + filas.abreviatura +
                            '"  tipo_actor = "' + filas.tipo_actor +
                            '" codigo = "' + filas.codigo +
                            '" responsable = "' + filas.responsable +
                            '" actor_descripcion = "' + filas.actor_descripcion +
                            '" area_de_actor = "' + filas.area_de_actor +
                            '"  >' + filas.actor + ' - ' + filas.abreviatura + '</option>');

                        $("#slt_comites_registrados").attr("disabled", false);

                    } else {
                        $("#slt_comites_registrados").attr("disabled", false);
                        // $('#ver_actor').html("");
                        // $('#ver_descripcion').html("");
                    }

                });
            } else {
                $("#slt_comites_registrados").html("");
                // $('#ver_actor').html("");
                // $('#ver_descripcion').html("");

            }
        }

    });






}


function listar_areas_comite_del_usuario(ls_user) {
    var listar_comites_por_usuarior = {
        "user": ls_user
    };
    $.ajax({
        data: listar_comites_por_usuarior,
        dataType: 'json',
        url: url + 'procesos/listar_comites_por_usuario',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_registrados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>").show();
        },
        success: function(encontrados) {
            $("#slt_comites_por_usuario").html("");
            $("#mostrar_espera_registrados").html("");
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slt_comites_por_usuario").append('<option id="' + filas.id_usuario_actor +
                            '"  id_usuario_actor = "' + filas.id_usuario_actor + '" usuario = "' + filas.usuario +
                            '" actor = "' + filas.actor +
                            '"  abreviatura = "' + filas.abreviatura +
                            '"  >' + filas.actor + ' - ' + filas.abreviatura + '</option>');
                        $("#slt_comites_por_usuario").attr("disabled", false);

                    } else {
                        $("#slt_comites_por_usuario").html("").attr("disabled", true);

                    }

                });
            } else {
                $("#slt_comites_por_usuario").html("");


            }
        }

    });




}





function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'procesos/buscar_por_nombre_usuario',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#slc_usuarios").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.resultado == 1) {
                        $("#slc_usuarios").append('<option value="' + filas.usuario +
                            '"  idusuario = "' + filas.idusuario +
                            '"  usuario = "' + filas.usuario +
                            '" nombre = "' + filas.nombre +
                            '" apellidos = "' + filas.apellidos +
                            '" telefono = "' + filas.telefono +
                            '" direccion = "' + filas.direccion +
                            '" fecha_expiraction = "' + filas.fecha_expiraction +
                            '" cargo = "' + filas.cargo +
                            '" activo = "' + filas.activo +
                            '" condicion_activo = "' + filas.condicion_activo +
                            '" idactor = "' + filas.idactor +
                            '" descripcion_actor = "' + filas.descripcion_actor +
                            '" responsable_actor = "' + filas.responsable_actor +
                            '" nombres_apellidos = "' + filas.nombre_apellidos +
                            '" jefatura = "' + filas.jefatura +
                            '"  >' + filas.nombre_apellidos + '</option>');
                    } else {
                        $("#slc_usuarios").empty();
                    }

                });
            } else {
                $("#slc_usuarios").html('').empty();

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



function leer_datos_mostrarlo_en_etiquetas() {
    limpiar_registro_usuarios();
    lid_idusuario = $('#slc_usuarios  option:selected').attr('idusuario');
    ls_user = $('#slc_usuarios  option:selected').attr('usuario');
    ls_nombre = $('#slc_usuarios  option:selected').attr('nombre');
    ls_apellidos = $('#slc_usuarios  option:selected').attr('apellidos');
    ls_fono = $('#slc_usuarios  option:selected').attr('telefono');
    ls_direccion = $('#slc_usuarios  option:selected').attr('direccion');
    ls_expiracion = $('#slc_usuarios  option:selected').attr('fecha_expiraction');
    ls_cargo = $('#slc_usuarios  option:selected').attr('cargo');
    ls_actor = $('#slc_usuarios  option:selected').attr('idactor');
    ls_descripcion_actor = $('#slc_usuarios  option:selected').attr('descripcion_actor');
    ls_responsable_actor = $('#slc_usuarios  option:selected').attr('responsable_actor');
    ls_jefatura = $('#slc_usuarios  option:selected').attr('jefatura');
    ls_nombres_apellidos = $('#slc_usuarios  option:selected').attr('nombres_apellidos');
    ls_activo = $('#slc_usuarios  option:selected').attr('activo');
    ls_tipo_condicion_activo = $('#slc_usuarios  option:selected').attr('condicion_activo');
    ls_nombre_del_comite = $("#txt_buscar_comite").val();


    $("#txt_usuario").val(ls_user);
    $("#txt_nombres").val(ls_nombre);
    $("#txt_apellidos").val(ls_apellidos);
    $("#txt_telefono").val(ls_fono);
    $("#txt_direccion").val(ls_direccion);
    $("#txt_fechaexpiracion").val(ls_expiracion);
    $("#txt_cargo").val(ls_cargo);
    $("#txt_seleccion_actor").val(ls_actor + ' - ' + ls_descripcion_actor);

    $("#ver_actor").html('<strong> Actor : </strong>' + ls_actor).show();
    $("#ver_descripcion").html('<strong> Descripcion : </strong> <br>' + ls_descripcion_actor).fadeIn("fast");
    $("#ver_responsable").html('<br><strong> Responsable : </strong>' + ls_responsable_actor + '<br>').fadeIn("slow");
    if (ls_activo === "1") {
        $("#tipo_condicion_activo").html('<strong>' + ls_tipo_condicion_activo + '</strong>').fadeIn("slow");
        $('#tipo_condicion_activo').css("background-color", "#78fa87");
    } else {
        $("#tipo_condicion_activo").html('<strong>' + ls_tipo_condicion_activo + '</strong>').fadeIn("slow");
        $('#tipo_condicion_activo').css("background-color", "#c0579c");
    }

    $("#txt_idactor").val(ls_actor);

    switch (ls_jefatura) {
        case 'S':
            $("#jefatura_s")
                .prop("checked", true)
                .attr("disabled", true);
            $("#jefatura_n")
                .prop("checked", false)
                .attr("disabled", true);
            break;
        case 'N':
            $("#jefatura_s")
                .prop("checked", false)
                .attr("disabled", true);
            $("#jefatura_n")
                .prop("checked", true)
                .attr("disabled", true);
            break;
        default:
            break;

    }
    $("#txt_ver_usuario").html('<strong>' + ls_user + ' --  ' + ls_nombres_apellidos + '</strong>').fadeIn("slow");
    $("#txt_ver_usuario_asignacion").html('<strong>' + ls_user + ' --  ' + ls_nombres_apellidos + '</strong>').fadeIn("slow");
    $('#grabar_registro').attr("disabled", false);
    $('#modificar_registro').attr("disabled", false);
    $('#eliminar_registro').attr("disabled", false);
    $('#reset_clave').attr("disabled", false);
    $('#habilitar_usuario').attr("disabled", false);
    $('#btn_agregar_nuevo_modulo').attr("disabled", false);
    $('#txt_buscar_comite').attr("disabled", false);



    ver_permisos_modulos(ls_user);

    listar_areas_comite_del_usuario(ls_user);

    $("#slt_modulos_disponibles").empty().attr("disabled", true);



}



/*  funciones usuarios */

function limpiar_para_registrar_nuevo_usuario() {
    $("#txt_nombres").val('').attr("disabled", true);
    $("#txt_apellidos").val('').attr("disabled", true);
    $("#txt_telefono").val('').attr("disabled", true);
    $("#txt_direccion").val('').attr("disabled", true);
    $("#txt_fechaexpiracion").val('').attr("disabled", true);
    $("#txt_cargo").val('').attr("disabled", true);
    $("#txt_seleccion_actor").val('').attr("disabled", true);
    $("#ver_actor").html('').hide();
    $("#ver_descripcion").html('').hide();
    $("#ver_responsable").html('').hide();
    $("#txt_idactor").val('');
    $("#jefatura_s").attr("disabled", true);
    $("#jefatura_n").attr("disabled", true);
    $("#btn_grabar_usuarios").attr("disabled", true);
    $("#txt_usuario").val('').attr("disabled", false).focus();
}

function ver_datos_ingresado_desactivados() {
    $("#txt_nombres").attr("disabled", true);
    $("#txt_apellidos").attr("disabled", true);
    $("#txt_telefono").attr("disabled", true);
    $("#txt_direccion").attr("disabled", true);
    $("#txt_fechaexpiracion").attr("disabled", true);
    $("#txt_cargo").attr("disabled", true);
    $("#txt_seleccion_actor").attr("disabled", true);
    $("#jefatura_s").attr("disabled", true);
    $("#jefatura_n").attr("disabled", true);
    $("#btn_grabar_usuarios").attr("disabled", true);
    $("#txt_usuario").attr("disabled", true);


}


function ver_si_existe_user(lc_user) {
    var dato_user = {
        "user": lc_user
    };
    $.ajax({
        data: dato_user,
        dataType: 'json',
        url: url + 'procesos/buscar_por_user_si_existe',
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
                        $("#txt_nombres").attr("disabled", true);
                    } else {
                        $("#msj_usuario").css("background-color", "#fdefcc")
                            .html('<strong> --- Nuevo Usuario ---- Continue... </strong>').fadeIn("slow");
                        setTimeout(function() {
                            $("#msj_usuario").fadeOut("slow");
                        }, 1000);

                        $("#txt_nombres").attr("disabled", false);
                        $("#txt_nombres").focus();
                    }
                });
            } else {

            }
        }
    });

}


function leer_datos_usuario_grabarlo() {
    ls_user = $("#txt_usuario").val(), ls_nombre = $("#txt_nombres").val(), ls_apellidos = $("#txt_apellidos").val(), ls_fono = $("#txt_telefono").val(),
        ls_direccion = $("#txt_direccion").val(), ls_expiracion = $('#txt_fechaexpiracion').val(), ls_cargo = $("#txt_cargo").val(),
        ls_actor = $("#txt_idactor").val(),
        datos_modificar_user = {
            "user": ls_user,
            "nombre": ls_nombre,
            "apellidos": ls_apellidos,
            "fono": ls_fono,
            "direccion": ls_direccion,
            "expiracion": ls_expiracion,
            "cargo": ls_cargo,
            "actor": ls_actor,
            "jefatura": ls_es_jefatura
        };
    $.ajax({
        data: datos_modificar_user,
        dataType: 'json',
        url: url + 'procesos/grabar_nuevo_usuario',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            ver_datos_ingresado_desactivados();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
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



function limpiar_registro_usuarios() {

    $("#txt_usuario").val('').attr("disabled", true);
    $("#txt_nombres").val('').attr("disabled", true);
    $("#txt_apellidos").val('').attr("disabled", true);
    $("#txt_telefono").val('').attr("disabled", true);
    $("#txt_direccion").val('').attr("disabled", true);
    $("#txt_fechaexpiracion").val('').attr("disabled", true);
    $("#txt_cargo").val('').attr("disabled", true);

    $("#txt_seleccion_actor").val('').attr("disabled", true);
    $("#ver_actor").html('').hide();
    $("#ver_descripcion").html('').hide();
    $("#ver_responsable").html('').hide();
    $("#txt_idactor").val('');


    $("#jefatura_s").attr("disabled", true);
    $("#jefatura_n").attr("disabled", true);
    $("#ver_actor").html('').hide();
    $("#ver_descripcion").html('').hide();
    $("#btn_grabar_usuarios").attr("disabled", true);

}


function desactivar_usuario(ls_user) {
    var dato_eliminar = {
        'user': ls_user
    };
    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'procesos/desactivar_usuarios_con_permisos',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            $("#grabar_registro").attr("disabled", false);
            $("#eliminar_registro").attr("disabled", false);
            $("#mostrar_espera_grabacion").html('');
            $("#reset_clave").attr("disabled", false);
            $("#habilitar_usuario").attr("disabled", false);
            $("#tipo_condicion_activo").html('');
        }
    });
}

// txt_buscar_comite

function resetear_usuario(ls_user) {
    var dato_reset = {
        'user': ls_user
    };
    $.ajax({
        data: dato_reset,
        dataType: 'json',
        url: url + 'procesos/reset_clave_usuario',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_grabacion").html('');
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            $("#grabar_registro").attr("disabled", false);
            $("#eliminar_registro").attr("disabled", false);
            $("#reset_clave").attr("disabled", false);
            $("#habilitar_usuario").attr("disabled", false);
        }

    });

}


function habilitar_usuario(ls_user) {

    var dato_habil = {
        'user': ls_user
    };
    $.ajax({
        data: dato_habil,
        dataType: 'json',
        url: url + 'procesos/habilitar_usuario',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_grabacion").html('');
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            $("#grabar_registro").attr("disabled", false);
            $("#eliminar_registro").attr("disabled", false);
            $("#reset_clave").attr("disabled", false);
            $("#habilitar_usuario").attr("disabled", false);
            $("#tipo_condicion_activo").html('');
        }
    });
}

// a modificar usuario

function leer_datos_usuario_modificar_y_grabarlo() {
    lid_idusuario = $('#slc_usuarios  option:selected').attr('idusuario'),
        ls_user = $("#txt_usuario").val(), ls_nombre = $("#txt_nombres").val(), ls_apellidos = $("#txt_apellidos").val(), ls_fono = $("#txt_telefono").val(),
        ls_direccion = $("#txt_direccion").val(), ls_expiracion = $('#txt_fechaexpiracion').val(), ls_cargo = $("#txt_cargo").val(),
        ls_actor = $("#txt_idactor").val(),
        datos_grabar_user = {
            "iduser": lid_idusuario,
            "user": ls_user,
            "nombre": ls_nombre,
            "apellidos": ls_apellidos,
            "fono": ls_fono,
            "direccion": ls_direccion,
            "expiracion": ls_expiracion,
            "cargo": ls_cargo,
            "actor": ls_actor,
            "jefatura": ls_es_jefatura
        };
    $.ajax({
        data: datos_grabar_user,
        dataType: 'json',
        url: url + 'procesos/modificar_usuario',
        type: 'post',
        beforeSend: function() {
            $("#espera_grabacion_usuarios").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#espera_grabacion_usuarios").html("");
            ver_datos_ingresado_desactivados();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
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



/* ************************ fin de seccion usuarios **************************/




/* seccion modulos */


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
            $("#slt_modulos_disponibles").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === 1) {
                        $("#slt_modulos_disponibles")
                            .append('<option id="' + filas.id_app + '" nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_modulos_disponibles")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_modulos_disponibles").empty();
            }
        }
    });
}


function ver_permisos_modulos(ls_user) {
    var dato_user_por_modulo = {
        'user': ls_user
    };

    $.ajax({
        data: dato_user_por_modulo,
        dataType: 'json',
        url: url + 'procesos/seleccion_modulos_por_user',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#slt_modulos_permisos").html('');
            $("#mostrar_espera_grabacion").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function(filas) {
                if (filas.resultado === 1) {
                    $("#slt_modulos_permisos").append('<option value="' + filas.idapppermiso +
                        '" idapppermiso = "' + filas.idapppermiso +
                        '" id_app = "' + filas.id_app +
                        '" nombre = "' + filas.nombre +
                        '" estado = "' + filas.estado + '"  >' + filas.nombre + '</option>');
                    $("#slt_modulos_permisos").attr("disabled", false);
                    // $("#slt_menus_permitidos").attr("disabled", false);

                } else {
                    $("#slt_modulos_permisos").attr("disabled", true);
                    $("#btn_desactivar_modulo").attr("disabled", true);
                    $("#slt_modulos_permisos").empty();
                    $("#mostrar_espera_grabacion").html("");

                }
            });
        }
    });

}


function leer_modulos_mostrar_menu() {
    $("#slt_sub_menus_permitidos").attr("disabled", true);
    $("#slt_sub_menus_permitidos").empty();
    $("#btn_desactivar_modulo").attr("disabled", false);

    var ls_user = $('#slc_usuarios  option:selected').attr('usuario'),
        lid_app = $('#slt_modulos_permisos  option:selected').attr('id_app'),
        dato_buscar_menu = {
            'user': ls_user,
            'id_app': lid_app
        };
    $.ajax({
        data: dato_buscar_menu,
        dataType: 'json',
        url: url + 'procesos/seleccion_menu_por_id',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#slt_menus_permitidos").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function(filas) {
                if (filas.encontro === '1') {
                    $("#slt_menus_permitidos").append('<option value="' + filas.id + '" id = "' + filas.id + '"idmenu ="' + filas.idmenu + '" nombre = "' + filas.nombre + '" estado = "' + filas.estado + '"  >' + filas.nombre + '</option>');
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
    var ls_user = $('#slc_usuarios  option:selected').attr('usuario'),
        lid_app = $('#slt_modulos_permisos  option:selected').attr('id_app'),
        lid_menu = $('#slt_menus_permitidos  option:selected').attr('idmenu'),
        lestado_menu = $('#slt_menus_permitidos  option:selected').attr('estado'),
        dato_buscar_sub_menu = {
            'user': ls_user,
            'id_app': lid_app,
            'idmenu': lid_menu
        };
    console.log(dato_buscar_sub_menu);
    $.ajax({
        data: dato_buscar_sub_menu,
        dataType: 'json',
        url: url + 'procesos/seleccion_sub_menu_por_id',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function(encontrados) {
            //  console.log(encontrados);
            $("#slt_sub_menus_permitidos").html('');
            $("#mostrar_espera").html('');
            nro_registros = encontrados.length;
            encontrados.forEach(function(filas) {
                if (filas.encontro === 1) {

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
        beforeSend: function() {
            $("#mostrar_espera_grabacion").fadeIn();
            $("#mostrar_espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_grabacion").html('');
            $("#mostrar_espera_grabacion").html('<em><strong><font color="#191919">Se Agrego modulo, conforme</font></strong></em>');
            $("#mostrar_espera_grabacion").fadeOut(5000);
        }
    });
}




function leer_mostrar_submenu_y_su_activacion() {
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



function activar_desactivar_submenu(leer_id_submenu, lc_tipo_activacion_sub_menu) {

    var dato_sub_menu = {
        'id': leer_id_submenu,
        'estado': lc_tipo_activacion_sub_menu
    };
    console.log(dato_sub_menu);

    $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'procesos/activar_desactivar_submenu',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
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
    var ls_user = $('#slc_usuarios  option:selected').attr('usuario'),
        dato_sub_menu = {
            "id": lid_menu,
            "user": ls_user
        };

    $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'procesos/activar_todos_los_submenus',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Activaron todos los sub menu...</font></strong></em>');
            leer_menu_y_mostrar_sub_menu();
            $("#mostrar_espera_grabacion_sub_menu").fadeOut(5000);

        }
    });
}



function desactivar_todos_los_submenus(lid_menu) {

    var ls_user = $('#slc_usuarios  option:selected').attr('usuario'),
        dato_sub_menu = {
            "id": lid_menu,
            "user": ls_user
        };
    $.ajax({
        data: dato_sub_menu,
        dataType: 'json',
        url: url + 'procesos/desactivar_todos_los_submenus',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_grabacion_sub_menu").fadeIn();
            $("#mostrar_espera_grabacion_sub_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function() {
            $("#mostrar_espera_grabacion_sub_menu").html('<em><strong><font color="#191919">.. Se Desactivaron todos los sub menus...</font></strong></em>');
            leer_menu_y_mostrar_sub_menu();
            $("#mostrar_espera_grabacion_sub_menu").fadeOut(5000);

        }
    });



}

/* fin de seccion modulos */


function seleccionar_actor_y_usuario() {
    var ls_user = $('#slc_usuarios  option:selected').attr('usuario'),
        ls_actor = $('#slt_comites_registrados  option:selected').attr('actor'),
        ls_descripcion_actor = $('#slt_comites_registrados  option:selected').attr('descripcion'),
        ls_abreviatura = $('#slt_comites_registrados  option:selected').attr('abreviatura'),
        ls_responsable = $('#slt_comites_registrados  option:selected').attr('responsable'),
        seleccionar_user_actor = {
            "user": ls_user,
            "actor": ls_actor,
            "abreviatura": ls_abreviatura,
            "responsable": ls_responsable,
            "descripcion": ls_descripcion_actor
        };
    console.log(seleccionar_user_actor);
    $.ajax({
        data: seleccionar_user_actor,
        dataType: 'json',
        url: url + 'procesos/seleccion_actor_user_grabarlo',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_registrados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera_registrados").html("");
            listar_areas_comite_del_usuario(ls_user);

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



function seleccion_usuario_eliminar_de_comite(ls_user, ls_actor) {
    var seleccionar_user_actor_eliminar = {
        "user": ls_user,
        "actor": ls_actor
    };

    $.ajax({
        data: seleccionar_user_actor_eliminar,
        dataType: 'json',
        url: url + 'procesos/eliminar_user_actor',
        type: 'post',
        beforeSend: function() {
            $("#mostrar_espera_registrados").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function(encontrados) {
            $("#mostrar_espera_registrados").html("");
            $('#btn_desactivar_area').attr("disabled", true);
            listar_areas_comite_del_usuario(ls_user);

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
    leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
    listar_actor(ls_nombre_del_comite);
    $('#grabar_registro').attr("disabled", true);
    $('#modificar_registro').attr("disabled", true);
    $('#eliminar_registro').attr("disabled", true);
    $('#reset_clave').attr("disabled", true);
    $('#habilitar_usuario').attr("disabled", true);

    $("#txt_buscar_nombre")
        .focus()
        .keyup(function() {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
            permisos_en_blanco_desabilitados();
        });


    $("#txt_buscar_comite")
        .focus()
        .keyup(function() {
            var ls_nombre_del_comite = $("#txt_buscar_comite").val();
            listar_actor(ls_nombre_del_comite);

        });





    $("#slc_usuarios")
        .click(function() {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function() {
            leer_datos_mostrarlo_en_etiquetas();
        });





    /* CRUD DE USUARIOS : leer y grabar */

    $("#nuevo_registro").click(function() {
        ls_save_update_user = '1'; // 1: save
        limpiar_para_registrar_nuevo_usuario();

    });

    $("#txt_usuario").keyup(function(e) {
        $("#msj_usuario").html('');
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            var lc_user = $("#txt_usuario").val();
            ver_si_existe_user(lc_user);
        }
    });



    $("#txt_nombres").keypress(function(e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_apellidos").attr("disabled", false).focus();
        }

    });

    $("#txt_apellidos").keypress(function(e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_telefono").attr("disabled", false).focus();
        }
    });

    $("#txt_telefono")
        .keypress(function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 13) {
                $("#txt_direccion").attr("disabled", false).focus();
            }
        });
    $("#txt_telefono")
        .on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });


    $("#txt_direccion").keypress(function(e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_fechaexpiracion").attr("disabled", false).focus();
        }

    });

    $('#txt_fechaexpiracion').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "2y",
        endDate: "+18y",
        autoclose: true,
        placeholder: "Fecha Expiracion",
    }).on('show', function() {});


    $("#txt_fechaexpiracion").change(function() {
        $("#txt_cargo")
            .attr("disabled", false)
            .focus();
    });

    $("#txt_cargo").keypress(function(e) {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $("#txt_seleccion_actor").attr("disabled", false).focus();
        }
    });


    $("#txt_seleccion_actor")
        .keyup(function() {
            if ($("#txt_seleccion_actor").length === 0) {
                $("#txt_seleccion_actor").val('');
                $("#ver_actor").html('').hide();
                $("#ver_descripcion").html('').hide();
                $("#ver_responsable").html('').hide();
                $("#txt_idactor").val('');
            }
        });




    $("#txt_seleccion_actor").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: url + 'procesos/listar_actor_tramite',
                dataType: "json",
                data: { actor: request.term },
                success: function(data) {
                    response($.map(data, function(item) {
                        if (item.respuesta == 1) {
                            return {
                                label: item.actor_descripcion,
                                label1: item.actor,
                                value: item.actor_descripcion,
                                actor: item.actor,
                                descripcion: item.descripcion,
                                responsable: item.responsable
                            }
                        } else {
                            $("#ver_actor").html('').hide();
                            $("#ver_descripcion").html('').hide();
                            $("#ver_responsable").html('').hide();
                            $("#txt_idactor").val('');

                            return {
                                label: item.mensaje,
                                value: '--No Ubicado--'
                            }

                        }

                    }));
                }
            });
        },
        minLength: 2,
        focus: function() {
            return false;
        },
        select: function(event, ui) {
            if (ui.item.value == '--No Ubicado--') {
                $("#ver_actor").html('-- NO REGISTRADO--').fadeIn("fast").fadeOut("slow");
                $("#ver_descripcion").html('').hide();
                $("#ver_responsable").html('').hide();
                $("#txt_idactor").val('');

                return false;
            } else {
                $("#txt_seleccion_actor").val(ui.item.label);
                $("#ver_actor").html('<strong> Actor : </strong>' + ui.item.actor).show();
                $("#ver_descripcion").html('<strong> Descripcion : </strong> <br>' + ui.item.descripcion).fadeIn("fast");
                $("#ver_responsable").html('<br><strong> Responsable : </strong>' + ui.item.responsable + '<br>').fadeIn("slow");
                $("#txt_idactor").val(ui.item.actor);
                $("#jefatura_s")
                    .prop("checked", false)
                    .attr("disabled", false);
                $("#jefatura_n")
                    .prop("checked", false)
                    .attr("disabled", false);
                return false;
            }
        }
    });
    $("#txt_seleccion_actor").autocomplete("option", "appendTo", ".posicionaritem");


    $("#jefatura_s").click(function() {
        ls_es_jefatura = 'S';
        $("#btn_grabar_usuarios").attr("disabled", false).focus();
    });


    $("#jefatura_n").click(function() {
        ls_es_jefatura = 'N';
        $("#btn_grabar_usuarios").attr("disabled", false).focus();
    });

    $("#modificar_registro").click(function() {
        ls_save_update_user = '2';
        $("#txt_usuario").attr("disabled", false);
        $("#txt_nombres").attr("disabled", false);
        $("#txt_apellidos").attr("disabled", false);
        $("#txt_telefono").attr("disabled", false);
        $("#txt_direccion").attr("disabled", false);
        $("#txt_fechaexpiracion").attr("disabled", false).focus();
        $("#txt_cargo").attr("disabled", false);
        $("#txt_seleccion_actor").attr("disabled", false);
        $("#ver_actor").show();
        $("#ver_descripcion").show();
        $("#ver_responsable").show();
        $("#jefatura_s").attr("disabled", false);
        $("#jefatura_n").attr("disabled", false);
        $("#btn_grabar_usuarios").attr("disabled", false);

    });


    $("#btn_grabar_usuarios").click(function() {
        if (ls_save_update_user === '1') {
            leer_datos_usuario_grabarlo();
        } else {
            leer_datos_usuario_modificar_y_grabarlo();
        }
        $("#btn_grabar_usuarios").attr("disabled", true);


    });


    $("#eliminar_registro").click(function() {
        ls_user = $("#txt_usuario").val();
        desactivar_usuario(ls_user);


    });



    $("#reset_clave").click(function() {
        ls_user = $("#txt_usuario").val();
        resetear_usuario(ls_user);

    });


    $("#habilitar_usuario").click(function() {
        ls_user = $("#txt_usuario").val();
        habilitar_usuario(ls_user);

    });

    /* fin de grabar usuarios */


    /*  seccion de aplicativos para permisos */

    $("#btn_agregar_nuevo_modulo").click(function() {
        $("#slt_modulos_disponibles").attr("disabled", false);
        $("#slt_modulos_disponibles").css("background-color", "#FCFBA0");
        listar_modulos();

    });


    $("#slt_modulos_disponibles").change(function() {
        ls_user = $("#txt_usuario").val();
        $("#slt_menus_permitidos").attr("disabled", true);
        $("#slt_menus_permitidos").empty();
        $("#slt_sub_menus_permitidos").attr("disabled", true);
        $("#slt_sub_menus_permitidos").empty();
        $('input:radio[name=menu_activar]')
            .attr('checked', false)
            .attr("disabled", true);

        leer_id_modulo_seleccion = $('#slt_modulos_disponibles  option:selected').attr('id');
        leer_nombre_modulo = $('#slt_modulos_disponibles  option:selected').attr('nombre');
        lid_modulo = ls_user + leer_id_modulo_seleccion;

        var dato_buscar_grabar_app = {
            'idapp': leer_id_modulo_seleccion,
            'idappuser': lid_modulo,
            'nombre': leer_nombre_modulo,
            'user': ls_user
        };
        console.log(dato_buscar_grabar_app);
        $.ajax({
            data: dato_buscar_grabar_app,
            dataType: 'json',
            url: url + 'procesos/registrar_app_user',
            type: 'post',
            beforeSend: function() {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function(encontrados) {
                $("#mostrar_espera_grabacion").html('');
                ver_permisos_modulos(ls_user);


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
            }

        });
    });





    $("#slt_modulos_permisos")
        .click(function() {
            leer_modulos_mostrar_menu();
        })
        .keyup(function() {
            leer_modulos_mostrar_menu();
        });


    $("#slt_menus_permitidos")
        .click(function() {
            leer_menu_y_mostrar_sub_menu();
        })
        .keyup(function() {
            leer_menu_y_mostrar_sub_menu();
        });

    $("#slt_sub_menus_permitidos")
        .click(function() {
            leer_mostrar_submenu_y_su_activacion();
        })
        .keyup(function() {
            leer_mostrar_submenu_y_su_activacion();
        });

    /* inicio activar / desactivar */


    $("#btn_desactivar_modulo").click(function() {
        var leer_id_modulo_seleccion = $('#slt_modulos_permisos  option:selected').attr('id_app');
        dato_desactivar = {
            'id': leer_id_modulo_seleccion,
            'user': ls_user
        };
        $.ajax({
            data: dato_desactivar,
            dataType: 'json',
            url: url + 'procesos/desactivar_modulo',
            type: 'post',
            beforeSend: function() {
                $("#mostrar_espera_grabacion").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function() {
                $("#mostrar_espera_grabacion").html("");
                ver_permisos_modulos(ls_user);
                $("#btn_desactivar_modulo").attr("disabled", true);
                $("#slt_menus_permitidos").attr("disabled", true);
                $("#slt_menus_permitidos").empty();
                $("#slt_sub_menus_permitidos").attr("disabled", true);
                $("#slt_sub_menus_permitidos").empty();


            }
        });


    });



    $("input[name=menu_activar").click(function() {
        var lc_tipo_activacion = $('input:radio[name=menu_activar]:checked').val(),
            leer_id_menu = $('#slt_menus_permitidos  option:selected').attr('id'),
            dato_activacion = {
                'id': leer_id_menu,
                'estado': lc_tipo_activacion
            };
        console.log(dato_activacion);
        $.ajax({
            data: dato_activacion,
            dataType: 'json',
            url: url + 'procesos/activar_menu',
            type: 'post',
            beforeSend: function() {
                $("#mostrar_espera_grabacion_menu").fadeIn();
                $("#mostrar_espera_grabacion_menu").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
            },
            success: function() {
                if (lc_tipo_activacion === '1') {
                    $("#mostrar_espera_grabacion_menu").html('<center><em><strong><font color="#191919">.. se activo menu...</font></strong></em></center>');

                } else {
                    $("#mostrar_espera_grabacion_menu").html('<center><em><strong><font color="#191919">.. Se Desactivo menu...</font></strong></em></center>');
                }
                leer_modulos_mostrar_menu();
                $("#mostrar_espera_grabacion_menu").fadeOut(5000);

            }
        });
    });


    $("input[name=activar_sub_menu").click(function() {
        var lc_tipo_activacion_sub_menu = $('input:radio[name=activar_sub_menu]:checked').val(),
            lid_menu = $('#slt_menus_permitidos  option:selected').attr('idmenu');

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




    $("#slt_comites_por_usuario")
        .click(function() {
            $('#btn_desactivar_area').attr("disabled", false);
        })
        .keyup(function() {
            $('#btn_desactivar_area').attr("disabled", false);
        });


    $("#slt_comites_registrados")
        .click(function() {

        })
        .dblclick(function() {
            var leer_usuario = $('#slc_usuarios  option:selected').attr('usuario'),
                lc_ver_si_seleccion_usuario = (typeof leer_usuario === 'undefined') ? '' : '1';
            if (lc_ver_si_seleccion_usuario === '1') {
                var ls_user = $('#slc_usuarios  option:selected').attr('usuario');
                $("#mostrar_espera_registrados").html("").show();
                seleccionar_actor_y_usuario();
            } else {
                $("#mostrar_espera_registrados").html("<br><center><strong>-- NO SELECCIONO USUARIO --- </strong></center>").show();

                setInterval(function() {
                    $("#mostrar_espera_registrados").html("<br><center><strong>-- NO SELECCIONO USUARIO --- </strong></center>").fadeOut("slow");
                }, 5000);




            }
        })
        .keyup(function() {

        });


    $('#btn_desactivar_area').click(function() {
        var leer_usuario = $('#slt_comites_por_usuario  option:selected').attr('usuario'),
            lc_ver_si_seleccion_usuario = (typeof leer_usuario === 'undefined') ? '' : '1';
        if (lc_ver_si_seleccion_usuario === '1') {
            var ls_user = $('#slt_comites_por_usuario  option:selected').attr('usuario'),
                ls_actor = $('#slt_comites_por_usuario  option:selected').attr('actor');
            seleccion_usuario_eliminar_de_comite(ls_user, ls_actor);
        } else {}





    });










});