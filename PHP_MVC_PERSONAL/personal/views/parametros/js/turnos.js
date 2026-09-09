var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    // url_js = 'http://' + document.domain + '/rrhh/public/js',
     leer_idturno, leer_idturno, lc_ver_si_seleccion_id_turno, leer_codigo_turno, leer_nombre_turno, lc_operacion_turno, datos_para_turno, datos_para_turno_mod, datos_para_turno_elim;


function listar_turnos() {
    "use strict";
    var datos_listar_turnos = {
        "turnos": ''
    };
    $.ajax({
        data: datos_listar_turnos,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_turnos',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga").html("");
            $("#slt_turnos")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_turnos")
                            .append('<option id ="' + filas.id + '" codigo_turno = "' + filas.codigo_turno + '" nombre = "' + filas.nombre + '"  >' + filas.nombre + '</option>')
                            .attr("disabled", false);
                    } else {
                        $("#slt_turnos")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_turnos").empty();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
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








function leer_turnos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idturno = $("#slt_turnos   option:selected").attr('id');
    lc_ver_si_seleccion_id_turno = (typeof leer_idturno === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id_turno === '1') {
        leer_idturno = $("#slt_turnos   option:selected").attr('id');
        leer_codigo_turno = $("#slt_turnos option:selected").attr('codigo_turno');
        leer_nombre_turno = $("#slt_turnos option:selected").attr('nombre');
        $('#codigo_turno').val(leer_codigo_turno);
        $('#nombre_turno').val(leer_nombre_turno);
        $('#btn_agregar_turno').attr("disabled", false);
        $('#btn_modificar_turno').attr("disabled", false);
        $('#btn_eliminar_turno').attr("disabled", false);
        $('#btn_grabar_turno').attr("disabled", true);

    } else {
        $('#btn_agregar_turno').attr("disabled", true);
        $('#btn_modificar_turno').attr("disabled", true);
        $('#btn_eliminar_turno').attr("disabled", true);
        $('#btn_grabar_turno').attr("disabled", true);

    }

}


function grabar_registro_turno(leer_codigo_turno, leer_nombre_turno) {
    "use strict";
    datos_para_turno = {
        "codigo_turno": leer_codigo_turno,
        "nombre_turno": leer_nombre_turno
    };

    $.ajax({
        data: datos_para_turno,
        dataType: 'json',
        url: url + 'parametros/grabar_registro_turno_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_grabacion_turno').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_grabacion_turno').html("");
            inicializar_etiquetas_turnos();
        },

        error: function (jqXHR, textStatus, errorThrown) {
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


function inicializar_etiquetas_turnos(){
    "use strict";
    listar_turnos();
    $('#codigo_turno')
        .val('')
        .attr("disabled", true);
    $('#nombre_turno')
        .val('')
        .attr("disabled", true);
    
    $('#btn_agregar_turno').attr("disabled", false);
    $('#btn_modificar_turno').attr("disabled", true);
    $('#btn_eliminar_turno').attr("disabled", true);
    $('#btn_grabar_turno').attr("disabled", true);
    $('#btn_grabar_turno').attr("disabled", true);
    
}


function modificar_registro_turno(leer_idturno, leer_codigo_turno, leer_nombre_turno){
       "use strict";
     datos_para_turno_mod = {
         'idturno' : leer_idturno,
         'codigo_turno' : leer_codigo_turno,
         'nombre_turno': leer_nombre_turno
    };
    $.ajax({
        data: datos_para_turno_mod,
        dataType: 'json',
        url: url + 'parametros/modificar_registro_turno_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_grabacion_turno').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_grabacion_turno').html("");
            inicializar_etiquetas_turnos();
        },

        error: function (jqXHR, textStatus, errorThrown) {
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


function eliminar_turno(leer_idturno){
    
       "use strict";
     datos_para_turno_elim = {
         'idturno' : leer_idturno,
    };
    $.ajax({
        data: datos_para_turno_elim,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_turno_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_grabacion_turno').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_grabacion_turno').html("");
            inicializar_etiquetas_turnos();
        },

        error: function (jqXHR, textStatus, errorThrown) {
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




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_turnos();
    inicializar_etiquetas_turnos();
    $("#slt_turnos")
        .click(function () {
            leer_turnos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_turnos_mostrarlo_en_etiquetas();
        })
        .change(function () {
            leer_turnos_mostrarlo_en_etiquetas();
        });

    $('#btn_agregar_turno').click(function () {
        lc_operacion_turno = '1';
        $('#nombre_turno').attr("disabled", true);
        $('#codigo_turno')
            .val('')
            .attr("disabled", false)
            .focus();
    });
    
    $('#codigo_turno').keypress(function (e) {
        $('#nombre_turno').attr("disabled", false);
        if (e.which === 13) {
            $('#nombre_turno').focus();
        }

    });
    
    $('#nombre_turno').keypress(function (e) {
        $('#btn_grabar_turno').attr("disabled", false);
        if (e.which === 13) {
            $('#btn_grabar_turno').focus();
        }

    });

    

    $('#btn_modificar_turno').click(function () {
        lc_operacion_turno = '2';
        $('#codigo_turno')
            .attr("disabled", false);
        $('#nombre_turno')
            .attr("disabled", false);
        $('#btn_grabar_turno').attr("disabled", false);
        
    });
    

    $('#btn_eliminar_turno').click(function () {
        eliminar_turno(leer_idturno);
    });


    $('#btn_grabar_turno').click(function () {
        leer_codigo_turno = $('#codigo_turno').val();
        leer_nombre_turno = $('#nombre_turno').val();
        if (lc_operacion_turno === '1') {
            grabar_registro_turno(leer_codigo_turno, leer_nombre_turno);
        } else {


        }


    });

    
    
    $('#btn_grabar_turno').click(function(){
        leer_codigo_turno = $('#codigo_turno').val();
        leer_nombre_turno = $('#nombre_turno').val();
        if (lc_operacion_turno === '1') {
            grabar_registro_turno(leer_codigo_turno, leer_nombre_turno);
        } else {
            modificar_registro_turno(leer_idturno, leer_codigo_turno, leer_nombre_turno);

        }
    });
    
    
            
    








});
