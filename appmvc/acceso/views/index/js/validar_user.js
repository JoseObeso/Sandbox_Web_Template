var modulo = "/appmvc",
    url = 'http://' + document.domain + modulo + '/acceso/',
    publico = "/public/",
    url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
    leer_usuario, leer_clave, datos_usuario_clave, nro_registros, encontrados, filas, lc_user, lc_clave;




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
            $("#msg-espera").html("");

            console.log(encontrados);
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function(filas) {
                    if (filas.encontro === '1') {
                        var lc_user = filas.nombreusuario,
                            lc_nombre = filas.nombres,
                            lc_foto = filas.foto;
                        $("#msg-espera").html("<center><strong><font color='white'>Bienvenido : " + lc_nombre + "<br> </font><strong></center>").show();
                        setInterval(function() {
                            window.location.href = url + 'app';
                        }, 100);

                    } else {
                        $("#msg-espera").html("<center><strong><font color='#ffd15c'> -- Usuario no existe o clave incorrecta o desactivado -- </font><strong></center>").show();
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
    $('#txt_usuario').keypress(function(e) {
        if (e.which === 13) {
            $('#txt_clave').focus();
        }
    });

    $('#iniciar_sesion').click(function() {
        lc_user = $('#txt_usuario').val();
        lc_clave = $('#txt_clave').val();
        if (lc_user == "" || lc_clave == "") {
            $("#msg-espera").html("<center><strong><font color='#ffd15c'>Nombre de usuario y/o clave vacia...</font><strong></center>").show();
        } else {
            validar_usuario(lc_user, lc_clave);
        }
    });



});