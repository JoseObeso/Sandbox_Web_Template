var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    lc_id, lc_descripcion, dato_listar, datos_grabar, datos_modificar, datos_eliminar, cantidad_registros, lc_tipo_operacion;

function listar_carreras_profesion() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_carreras_profesion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_carrera")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_carrera").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_carrera").attr("disabled", false);
                } else {
                    $("#slt_carrera").attr("disabled", true);
                }
            });
        }
    });
    
    
    
     $("#slt_carrera").select2({
        allowClear: true,
        placeholder: "Selecionar ",
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
    
    
    
}


function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    lc_id = $('#slt_carrera option:selected').attr('id');
    lc_descripcion = $('#slt_carrera option:selected').attr('descripcion');
    $("#txt_descripcion_carrera").val(lc_descripcion);
    $("#btn_grabar_carrera").attr("disabled", true);
    $('#btn_modificar_carrera').attr("disabled", false);
    $('#btn_eliminar_carrera').attr("disabled", false);
}


function mostrar_datatable_carreras() {
    "use strict";
    $('#tabla_carrera').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}


function inicializar_botones() {
    "use strict";
    $('#btn_agregar_carrera').attr("disabled", false);
    $('#btn_modificar_carrera').attr("disabled", true);
    $('#btn_eliminar_carrera').attr("disabled", true);
    $('#txt_descripcion_carrera')
        .attr("disabled", true)
        .val('');
    $('#btn_grabar_carrera').attr("disabled", true);
}


function nuevo_registro() {
    "use strict";
    $('#txt_descripcion_carrera')
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#btn_grabar_carrera').attr("disabled", false);
    $('#btn_modificar_carrera').attr("disabled", true);
    $('#btn_eliminar_carrera').attr("disabled", true);
    $('#btn_grabar_carrera').attr("disabled", true);

}


function grabar_nuevo_registro_carrera(lc_descripcion) {
    "use strict";
    datos_grabar = {
        'descripcion': lc_descripcion
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_carrera',
        type: 'post',
        beforeSend: function () {
            $("#esperando_carrera")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_carreras_profesion();
            inicializar_botones();
            $('#txt_descripcion_carrera')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_carrera').attr("disabled", true);
            $("#esperando_carrera")
                .html('')
                .hide();
        } 
        
    });
}



function grabar_modificacion_registro_carrera(lc_id, lc_descripcion) {
    "use strict";
    datos_modificar = {
        'id': lc_id,
        'descripcion': lc_descripcion
    };

    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/modificacion_registro_carrera',
        type: 'post',
        beforeSend: function () {
            $("#esperando_carrera")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_carreras_profesion();
            inicializar_botones();
            $('#txt_descripcion_carrera')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_carrera').attr("disabled", true);
            $("#esperando_carrera")
                .html('')
                .hide();
        } 


    });
}


function eliminar_registro_carrera(lc_id) {
    "use strict";
    datos_eliminar = {
        'id': lc_id
    };

    $.ajax({
        data: datos_eliminar,
        dataType: 'json',
        url: url + 'parametros/EliminarRegistroCarrera',
        type: 'post',
        beforeSend: function () {
            $("#esperando_carrera")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_carreras_profesion();
            inicializar_botones();
            $('#txt_descripcion_carrera')
                .attr("disabled", true)
                .val('');
            $('#btn_grabar_carrera').attr("disabled", true);
            $("#esperando_carrera")
                .html('')
                .hide();
        } 
         
    });
}





$(document).ready(function () {
    "use strict";
    mostrar_datatable_carreras();
    listar_carreras_profesion();
    inicializar_botones();
    $("#slt_carrera")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        });

    $("#btn_agregar_carrera").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });

    $('#txt_descripcion_carrera').keypress(function () {
        $('#btn_grabar_carrera').attr("disabled", false);
    });
    
    
    $('#btn_modificar_carrera').click(function () {
        lc_tipo_operacion = '2';
        $('#txt_descripcion_carrera')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#btn_grabar_carrera').attr("disabled", false);
    });


    $('#btn_grabar_carrera').click(function () {
        lc_id = $('#slt_carrera option:selected').attr('id');
        lc_descripcion = $("#txt_descripcion_carrera").val().toUpperCase();
        switch (lc_tipo_operacion) {
            case '1':
                grabar_nuevo_registro_carrera(lc_descripcion);
                break;
            case '2':
                grabar_modificacion_registro_carrera(lc_id, lc_descripcion);
                break;
            default:
                break;
        }

    });

    $('#btn_eliminar_carrera').click(function () {
        eliminar_registro_carrera(lc_id);
    });



});
