var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    lc_descripcion, lc_tipo_operacion = '0',
    lc_nombre_colegio, dato_listar, cantidad_registros, datos_grabar, datos_modificar, dato_eliminar, ln_codigo_minsa, ln_id, lc_codigo_colegio, dato_nuevo, dato_actualizar_colegios, lc_codigo_colegio_seleccion;

function listar_tipos_especialidad() {
    "use strict";
    dato_listar = {
        'id': ''
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_tipos_especialidad',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_tipo_especialidad")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_especialidad").append('<option id="' + filas.id + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  codigo_colegio = "' + filas.codigo_colegio + '"  colegio= "' + filas.colegio + '"  >' + filas.codigo_minsa + '  -  ' + filas.descripcion +  '</option>');
                    $("#slc_tipo_especialidad").attr("disabled", false);

                } else {
                    $("#slc_tipo_especialidad").attr("disabled", true);
                }

            });

        }
    });
    
     $("#slc_tipo_especialidad").select2({
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




function listar_colegios_profesionales() {
    "use strict";
    dato_actualizar_colegios = {
        'colegio': ''
    };
    $.ajax({
        data: dato_actualizar_colegios,
        dataType: 'json',
        url: url + 'parametros/ver_lista_colegios_profesionales',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_colegios")
                .html('')
                .show()
                .append('<option codigo_minsa="0">Seleccione Colegio Profesional : </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_colegios").append('<option value="' + filas.codigo + '"  codigo = "' + filas.codigo + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                    $("#slt_colegios").attr("disabled", false);
                } else {
                    $("#slt_colegios").attr("disabled", true);
                }

            });

        }
    });

}


function inicializar_botones() {
    "use strict";
    $('#btn_agregar').attr("disabled", false);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
    $('#txt_codigo').attr("disabled", true);
    $('#txt_codigo_minsa').attr("disabled", true);
    $('#txt_descripcion').attr("disabled", true);
    $('#btn_grabar').attr("disabled", true);
}



function nuevo_registro() {
    "use strict";
    $('#id').val('');
    dato_nuevo = {
        'id': 1
    };
    $.ajax({
        data: dato_nuevo,
        dataType: 'json',
        url: url + 'parametros/ultimo_numero',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $('#txt_codigo_minsa')
                        .val(filas.numero)
                        .attr("disabled", false);
                } else {
                    $('#txt_codigo_minsa').val('1');
                }
            });
        }
    });
    $("#colegio").text('');
    $("#slt_colegios").attr("disabled", true);
    $("#txt_descripcion_especialidad")
        .attr("disabled", false)
        .css("background-color", "#FCFBA0")
        .val('')
        .focus();
    $('#btn_grabar').attr("disabled", true);
    $('#btn_modificar').attr("disabled", true);
    $('#btn_eliminar').attr("disabled", true);
}



function grabar_nuevo_registro_de_tipo_especialidad(ln_codigo_minsa, lc_descripcion, lc_codigo_colegio) {
    "use strict";

    datos_grabar = {
        'codigo_minsa': ln_codigo_minsa,
        'descripcion': lc_descripcion,
        'codigo_colegio': lc_codigo_colegio
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_registro_en_tipo_especialidad',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_tipos_especialidad();
            inicializar_botones();
            nuevo_registro();
            $("#espera_grabacion")
                .html('')
                .hide();


        }
    });

}



function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text() {
    "use strict";
    ln_id = $('#slc_tipo_especialidad  option:selected').attr('id');
    ln_codigo_minsa = $('#slc_tipo_especialidad  option:selected').attr('codigo_minsa');
    lc_descripcion = $('#slc_tipo_especialidad  option:selected').attr('descripcion');
    lc_codigo_colegio = $('#slc_tipo_especialidad  option:selected').attr('codigo_colegio');
    lc_nombre_colegio = $('#slc_tipo_especialidad  option:selected').attr('colegio');
    $("#id").val(ln_id);
    $("#txt_codigo_minsa")
        .val(ln_codigo_minsa)
        .attr("disabled", true);

    $('#txt_descripcion_especialidad')
        .val(lc_descripcion)
        .css("background-color", "#FFFFFF")
        .attr("disabled", true);

    $("#colegio")
        .fadeIn(0)
        .text(lc_nombre_colegio)
        .show();
    $("#slt_colegios").attr("disabled", true);
    $('#btn_modificar').attr("disabled", false);
    $('#btn_eliminar').attr("disabled", false);


}



function grabar_modificacion_de_registro(ln_id, ln_codigo_minsa, lc_descripcion, lc_codigo_colegio_seleccion) {
    "use strict";
    datos_modificar = {
        'id': ln_id,
        'codigo_minsa': ln_codigo_minsa,
        'descripcion': lc_descripcion,
        'codigo_colegio': lc_codigo_colegio_seleccion
    };

    $.ajax({
        data: datos_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_modificar_registro_de_tipo_especialidad',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .show()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_tipos_especialidad();
            inicializar_botones();
            $("#espera_grabacion")
                .html('')
                .hide();

        } 
        


    });

}


function eliminar_registro(ln_id) {
    "use strict";
    dato_eliminar = {
        'id': ln_id
    };

    $.ajax({
        data: dato_eliminar,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_tipo_especialidad',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion")
                .fadeIn()
                .html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            listar_tipos_especialidad();
            inicializar_botones();
            $("#id").val('');
            $("#txt_codigo_minsa").val('');
            $("#txt_descripcion_especialidad").val('');
            $("#espera_grabacion")
                .html('')
                .html('<em><strong><font color="#191919">Eliminacion conforme....</font></strong></em>')
                .fadeOut(5000);
        }
    });

}




function mostrar_datatable_especialidad() {
    "use strict";

    $('#tabla_especialidades').DataTable({

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
    $('.crear-tooltip').tooltip();
    listar_tipos_especialidad();
    mostrar_datatable_especialidad();
    $("#titulo").text("REGISTRO DE TIPO DE ESPECIALIDAD : ");
    inicializar_botones();
    $("#btn_agregar").click(function () {
        lc_tipo_operacion = '1';
        nuevo_registro();
    });
    $("#txt_descripcion_especialidad").keypress(function () {
        if (lc_tipo_operacion === '1') {
            $('#slt_colegios').attr("disabled", false);
            listar_colegios_profesionales();
            $('#btn_grabar').attr("disabled", true);

        } else {
            $('#btn_grabar').attr("disabled", false);
        }
    });

    $("#slt_colegios").change(function () {
        $('#btn_grabar').attr("disabled", false);
    });



    $('#btn_modificar').click(function () {
        lc_tipo_operacion = '2';
        $('#txt_codigo_minsa')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0")
            .focus();
        $('#txt_descripcion_especialidad')
            .attr("disabled", false)
            .css("background-color", "#FCFBA0");

        listar_colegios_profesionales();
        $('#btn_grabar').attr("disabled", false);

    });


    $("#slc_tipo_especialidad")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text();
        });



    $('#btn_grabar').click(function () {
        ln_codigo_minsa = $("#txt_codigo_minsa").val();
        lc_descripcion = $('#txt_descripcion_especialidad').val().toUpperCase();
        lc_codigo_colegio = $('#slt_colegios option:selected').attr('codigo_minsa');
        switch (lc_tipo_operacion) {
            case '1':
                if (lc_codigo_colegio !== '0') {
                    grabar_nuevo_registro_de_tipo_especialidad(ln_codigo_minsa, lc_descripcion, lc_codigo_colegio);
                } else {
                    $("#colegio")
                        .html('')
                        .html('<em><strong><font color="#820001"><center>s.. Debe seleccionar colegio profesional.....</center></font></strong></em>')
                        .fadeOut(6000);
                    $('#btn_grabar').attr("disabled", true);
                    $("#slt_colegios").css("border-bottom-color", "#820001");
                    return;
                }
                break;
            case '2':
                if (lc_codigo_colegio !== '0') {
                    lc_codigo_colegio_seleccion = $('#slt_colegios option:selected').attr('codigo_minsa');
                } else {
                    lc_codigo_colegio_seleccion = $('#slc_tipo_especialidad  option:selected').attr('codigo_colegio');
                }
                grabar_modificacion_de_registro(ln_id, ln_codigo_minsa, lc_descripcion, lc_codigo_colegio_seleccion);
                break;
            default:
                break;
        }


    });




    $('#btn_eliminar').click(function () {
        eliminar_registro(ln_id);
    });

});
