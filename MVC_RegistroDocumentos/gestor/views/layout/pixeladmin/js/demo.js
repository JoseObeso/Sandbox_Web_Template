$(document).ready(function() {
    $("#mostrarfecha").html('<font color="#ffffff">' + nombre_dia_mes_anio() + '</font>');




    $(document).delegate(".btn-abrir-modal-plantilla", "click", function() {
        $('#modal-cambiar-plantilla').modal({ show: true, backdrop: 'static' });
    })
    $(document).delegate(".btn-abrir-modal-cambiar-clave", "click", function() {
        $('#modal-cambiar-clave').modal({ show: true, backdrop: 'static' });
    });
    $("#frm_cambiar_clave").validate({
        focusInvalid: false,
        rules: {
            'clave_antigua': {
                required: true
            },
            'nueva_clave': {
                required: true
            },
            'confirmar_clave_nueva': {
                required: true,
                equalTo: "#nueva_clave"
            }
        },
        messages: {
            'clave_antigua': {
                required: 'Este campo es requerido'
            },
            'nueva_clave': {
                required: 'Este campo es requerido'
            },
            'confirmar_clave_nueva': {
                required: 'Este campo es requerido',
                equalTo: 'Tiene que ser la misma clave'
            }
        }
    });
    $(document).delegate("#btn_cambiar_mi_clave", "click", function() {
        $("#frm_cambiar_clave").submit();
    })
    $(document).delegate("#frm_cambiar_clave", "submit", function() {
        var datos = $(this).serialize();
        var posting = $.post(ok + "area_trabajo/cambiar_clave", datos);
        posting.done(function(data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                if (imprimir["estado_respuesta"] == 1) {
                    mostrar_mensaje_en_modal("#modal-cambiar-clave", "alert-success", imprimir["mensaje"], true);
                    $("#clave_antigua").val('');
                    $("#nueva_clave").val('');
                    $("#confirmar_clave_nueva").val('');
                } else {
                    mostrar_mensaje_en_modal("#modal-cambiar-clave", "alert-danger", imprimir["mensaje"], false);
                }
            } else {
                mostrar_mensaje_en_modal("#modal-cambiar-clave", "alert-danger", "Error del Sistema: <br/>" + data, false);
            }
        });
        posting.fail(function() {
            mostrar_mensaje_en_modal("#modal-cambiar-clave", "alert-danger", "No hay conexion con el servidor.", false);
        })
        return false;
    })
    $(document).delegate(".plantilla", "click", function() {
        $('.plantilla').removeClass('selected-plantilla');
        $(this).addClass('selected-plantilla');
        id_plantilla = $(this).attr('id');
    })
    $(document).delegate("#btn-cambiar-plantilla", "click", function() {
        var nueva_plantilla = "theme-" + id_plantilla;
        var posting = $.post(ok + "area_trabajo/cambiar_plantilla", { nueva_plantilla: nueva_plantilla });
        posting.done(function(data) {
            if (isJSON(data) == true) {
                var imprimir = $.parseJSON(data);
                if (imprimir["estado_respuesta"] == 1) {
                    $("body").removeClass();
                    $("body").addClass(nueva_plantilla + " main-menu-animated page-pricing fondo-medico main-navbar-fixed main-menu-fixed dont-animate-mm-content-sm animate-mm-md animate-mm-lg");
                    $('#modal-cambiar-plantilla').modal('hide');
                } else {
                    mostrar_mensaje_error("Error al tratar de cambiar la plantilla.");
                }
            } else {
                mostrar_mensaje_error("Error del Sistema: <br/>" + data);
            }
        });
        posting.fail(function() {
            mostrar_mensaje_error("No hay conexion con el servidor.");
        })
    })
});