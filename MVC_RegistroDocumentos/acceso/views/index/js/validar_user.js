var url = 'http://' + document.domain + '/tramite/acceso/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra/',
    leer_usuario, leer_clave, datos_usuario_clave, nro_registros, encontrados, filas, lc_user, lc_clave;



function listar_comites_de_usuario() {
    var ls_user = $('#txt_usuario').val();
    listar_comites_por_usuario = {
        "user": ls_user
    };
    $.ajax({
        data: listar_comites_por_usuario,
        dataType: 'json',
        url: url + 'validar/listar_comites_por_usuario',
        type: 'post',
        beforeSend: function() {},
        success: function(encontrados) {
            $("#slt_comites_de_user").html("");
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.respuesta === '1') {
                        $("#slt_comites_de_user").append('<option id="' + filas.id_usuario_actor +
                            '"  id_usuario_actor = "' + filas.id_usuario_actor + '" usuario = "' + filas.usuario +
                            '" actor = "' + filas.actor +
                            '" responsable = "' + filas.responsable +
                            '"  abreviatura = "' + filas.abreviatura +
                            '"  >' + filas.abreviatura + '</option>');
                        $("#slt_comites_de_user").attr("disabled", false);
                        $("#dependencia").html('');

                        $("#ingresar").attr("disabled", false).focus();

                    } else {
                        $("#slt_comites_de_user").html("No tiene dependencia asignada").attr("disabled", true);
                        $("#dependencia").html('');
                        $("#msg-espera").html("<center><strong><font color='red'> -- No tiene asignado ninguna dependencia - Comuniquese con el administrador del sistema </font><strong></center>").show();
                        $("#ingresar").attr("disabled", true);
                    }

                });
            } else {
                $("#slt_comites_de_user").html("");

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

function validar_usuario(lc_user, lc_clave) {
    var data_user = { "user": lc_user, "clave": lc_clave };
    $.ajax({
        data: data_user,
        dataType: 'json',
        url: url + 'validar/verificar_ingreso_usuario',
        type: 'post',
        beforeSend: function() {
            $("#msg-espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='180' height='13'></center>");
        },
        success: function(encontrados) {
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.encontro === '1') {
                        var lc_user = filas.usuario,
                            lc_nombre = filas.nombre,
                            lc_nombres_apellidos = filas.nombre_apellidos,
                            lc_estado = filas.activo,
                            lc_foto = filas.foto,
                            lc_vigencia = filas.vigencia;
                        if (lc_estado == '1' && lc_vigencia == 'VIGENTE') {
                            $("#msg-espera").html("<center><strong><font color='green'>Bienvenido : " + lc_nombre + "<br> - Seleccione su dependencia: </font><strong></center>").show();
                            listar_comites_de_usuario();
                        } else {
                            $("#msg-espera").html("<center><strong><font color='red'>No se permite el acceso:<br> 1. Estado : " + ((lc_estado == 1) ? 'ACTIVO' : 'DESACTIVADO') + "<br>  2. Fecha de acceso : " + lc_vigencia + "</font><strong></center>").show();
                            $("#slt_comites_de_user").html("").attr("disabled", true);
                            $("#ingresar").attr("disabled", true);
                        }
                    } else {
                        $("#msg-espera").html("<center><strong><font color='red'> -- Usuario no existe o clave incorrecta -- </font><strong></center>").show();
                        $("#slt_comites_de_user").html("").attr("disabled", true);
                        $("#ingresar").attr("disabled", true);
                    }
                });
            }
        }



    });



}

$(document).ready(function() {
    $('.crear-tooltip').tooltip();
    $('#txt_usuario').val('').focus();
    $('#txt_clave').val('');
    $('#slt_comites_de_user').css("background-color", "#FCFBA0");
    $('#txt_usuario').keypress(function(e) {
        if (e.which === 13) {
            $('#txt_clave').focus();
        }
    });
    $('#iniciar_sesion').click(function() {
        lc_user = $('#txt_usuario').val();
        lc_clave = $('#txt_clave').val();
        if (lc_user == "" || lc_clave == "") {
            $("#msg-espera").html("<center><strong><font color='red'>Nombre de usuario y/o clave vacia, reingrese usuario.</font><strong></center>").show();
        } else {
            validar_usuario(lc_user, lc_clave);
        }
    });

    $("#ingresar")
        .click(function() {
            var ls_area = $('#slt_comites_de_user  option:selected').attr('actor'),
                lc_abreviatura = $('#slt_comites_de_user  option:selected').attr('abreviatura'),
                lc_responsable = $('#slt_comites_de_user  option:selected').attr('responsable'),
                leer_usuario = $('#txt_usuario').val();

            var datos_usuario_clave = {
                "user": leer_usuario,
                "actor": ls_area,
                "abreviatura": lc_abreviatura,
                "responsable": lc_responsable
            };
            $.ajax({
                data: datos_usuario_clave,
                dataType: 'json',
                url: url + 'validar/verificar_usuario_sesion',
                type: 'post',
                beforeSend: function() {
                    $("#msg-espera").html("<center><img src='" + url_grafico + "/cargando.gif' width='180' height='13'></center>").show();
                },
                success: function(encontrados) {
                    nro_registros = encontrados.length;
                    if (nro_registros > 0) {
                        encontrados.forEach(function(filas) {
                            if (filas.encontro === '1') {
                                $("#msg-espera").html("");
                                setInterval(function() {
                                    window.location.href = url + 'app';
                                }, 1000);
                            } else {
                                $("#msg-espera").html("<center><strong><font color='red'>Usuario fue desactivado en estos momentos</font><strong></center>").show();

                            }
                        });
                    } else {

                    }

                }
            });

        });

});