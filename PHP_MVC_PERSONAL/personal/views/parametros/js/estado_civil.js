var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_tipo_operacion = '0',
    ln_id_estado_civil, lc_descripcion, dato_listar, cantidad_registros, datos_grabar, datos_modificar, dato_eliminar;


function listar_estados_civiles() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_estados_civiles',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_estado_civil")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_estado_civil").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_estado_civil").attr("disabled", false);
                } else {
                    $("#slt_estado_civil").attr("disabled", true);
                }
            });
        }
    });
}


function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    ln_id_estado_civil = $('#slt_estado_civil option:selected').attr('id');
    lc_descripcion = $('#slt_estado_civil option:selected').attr('descripcion');

    $('#txt_descripcion_estado_civil')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_descripcion);
    $('#btn_modificar_estado_civil').attr("disabled", false);
    $('#btn_eliminar_estado_civil').attr("disabled", false);
    $('#btn_grabar_estado_civil').attr("disabled", true);

}



function inicializar_botones() {
    "use strict";
    $('#btn_agregar_estado_civil').attr("disabled", false);
    $('#btn_modificar_estado_civil').attr("disabled", true);
    $('#btn_eliminar_estado_civil').attr("disabled", true);
    $('#txt_descripcion_estado_civil')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_estado_civil').attr("disabled", true);
}


function nuevo_registro() {
    "use strict";
    $('#txt_descripcion_estado_civil')
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#btn_grabar_estado_civil').attr("disabled", false);
    $('#btn_modificar_estado_civil').attr("disabled", true);
    $('#btn_eliminar_estado_civil').attr("disabled", true);
    $('#btn_grabar_estado_civil').attr("disabled", true);
 
}

function  grabar_nuevo_registro_estado_civil(lc_descripcion) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_estado_civil',
        type: 'post',
        beforeSend: function () {
            $("#esperando_estado_civil")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
           listar_estados_civiles();
            inicializar_botones();
            $('#txt_descripcion_estado_civil')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_estado_civil').attr("disabled", true);
            $("#esperando_estado_civil")
                .html('')
                .hide();
        }
    });
}



function grabar_modificacion_registro_estado_civil(ln_id_estado_civil,lc_descripcion) {
    "use strict";
    datos_modificar = {
        'id': ln_id_estado_civil,
        'descripcion': lc_descripcion       
    };
    
    
    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/modificacion_estado_civil',
        type: 'post',
        beforeSend: function () {
            $("#esperando_estado_civil")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
           listar_estados_civiles();
            inicializar_botones();
            $('#txt_descripcion_estado_civil')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_estado_civil').attr("disabled", true);
            $("#esperando_estado_civil")
                .html('')
                .hide();
        }
        
        
    });
}

function  eliminar_registro_estado_civil(ln_id_estado_civil) {
    "use strict";
    dato_eliminar = {
        'id': ln_id_estado_civil
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_estado_civil',
        type: 'post',
        beforeSend: function () {
            $("#esperando_estado_civil")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
           listar_estados_civiles();
            inicializar_botones();
            $('#txt_descripcion_estado_civil')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_estado_civil').attr("disabled", true);
            $("#esperando_estado_civil")
                .html('')
                .hide();
        }

    });
}

$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_estados_civiles();
    inicializar_botones();
    $("#btn_agregar_estado_civil").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });
    $("#slt_estado_civil")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
    });

    $('#txt_descripcion_estado_civil').keypress(function(){
         $('#btn_grabar_estado_civil').attr("disabled", false);
     });
    
      
    

    $('#btn_modificar_estado_civil').click(function () {
        lc_tipo_operacion = '2';
        $('#txt_descripcion_estado_civil')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#btn_grabar_estado_civil').attr("disabled", false);
    });
    
    
    $('#btn_grabar_estado_civil').click(function () {
        ln_id_estado_civil = $('#slt_estado_civil option:selected').attr('id');
        lc_descripcion = $("#txt_descripcion_estado_civil").val().toUpperCase();
        
        switch (lc_tipo_operacion) {
            case '1':
                grabar_nuevo_registro_estado_civil(lc_descripcion);
                break;
            case '2':
                grabar_modificacion_registro_estado_civil(ln_id_estado_civil,lc_descripcion);
                break;
            default:
                break;
        }

    });

    $('#btn_eliminar_estado_civil').click(function () {
        eliminar_registro_estado_civil(ln_id_estado_civil);
    });

});
