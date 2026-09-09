var url = 'http://' + document.domain + '/rrhh/personal/',
      // url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
        url_js = 'http://' + document.domain + '/rrhh/public/js',
    lc_id_centro_costo, dato_listar, cantidad_registros, lc_id_centro_sub_costo;




function listar_centro_costo() {

    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_centro_de_costo',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_centro_costo")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_centro_costo").append('<option id="' + filas.codigo + '"  descripcion= "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_centro_costo").attr("disabled", false);

                } else {
                    $("#slt_centro_costo").attr("disabled", true);
                }

            });

        }
    });

}






function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    lc_id_centro_costo = $('#slt_centro_costo option:selected').attr('id');
    mostrar_centro_sub_costo(lc_id_centro_costo);
    $("#slt_centro_sub_tras_costo").html('');
    $("#slt_centro_sub_tras_costo").attr("disabled", true);



}


function mostrar_centro_sub_costo(lc_id_centro_costo) {

    "use strict";
    dato_listar = {
        'id': lc_id_centro_costo
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_subcentro_de_centrocosto',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_centro_sub_costo")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_centro_sub_costo").append('<option id="' + filas.codigo + '"  descripcion= "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_centro_sub_costo").attr("disabled", false);

                } else {
                    $("#slt_centro_sub_costo").attr("disabled", true);
                }

            });

        }
    });


}


function leer_seleccion_de_registros_centro_sub_costo_y_mostrarlo_en_los_input_text() {
    "use strict";
    lc_id_centro_sub_costo = $('#slt_centro_sub_costo option:selected').attr('id');
    mostrar_centro_sub_costo_sub(lc_id_centro_sub_costo);

}


function mostrar_centro_sub_costo_sub(lc_id_centro_sub_costo) {

    "use strict";
    dato_listar = {
        'id': lc_id_centro_sub_costo
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_subcentro_de_centrocosto_sub',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_centro_sub_tras_costo")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_centro_sub_tras_costo").append('<option id="' + filas.codigo + '"  descripcion= "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_centro_sub_tras_costo").attr("disabled", false);

                } else {
                    $("#slt_centro_sub_tras_costo").attr("disabled", true);
                }

            });

        }
    });


}


function mostrar_todos_los_centros_costos_consolidados() {

    "use strict";
    dato_listar = {
        'id': '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/todos_centros_costos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_centro_costo_reporte")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_centro_costo_reporte").append('<option id="' + filas.codigo + '"  descripcion= "' + filas.descripcion + '"  >' + filas.codigo + ' - ' + filas.descripcion + '</option>');
                    $("#slt_centro_costo_reporte").append('<option> ------------------------------------------------ </option>');
                    
                    $("#slt_centro_costo_reporte").attr("disabled", false);

                } else {
                    $("#slt_centro_costo_reporte").attr("disabled", true);
                }

            });

        } 

    });
 
}




function mostrar_datatable_upss() {
    "use strict";

    $('#tabla_upss').DataTable({

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








$(document).ready(function () {
    "use strict";
    listar_centro_costo();
    mostrar_todos_los_centros_costos_consolidados();
     mostrar_datatable_upss();
    $("#slt_centro_costo")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        });
    $("#slt_centro_sub_costo")
        .click(function () {
            leer_seleccion_de_registros_centro_sub_costo_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_centro_sub_costo_y_mostrarlo_en_los_input_text();
        });







});
