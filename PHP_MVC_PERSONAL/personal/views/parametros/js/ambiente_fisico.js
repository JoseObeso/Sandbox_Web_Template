var url = 'http://' + document.domain + '/rrhh/personal/',
    // url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_tipo_operacion = '0', lid_piso_seleccion, lc_ambiente, 
    dato_listar, cantidad_registros, datos_grabar, datos_modificar, datos_eliminar, ln_id_piso, lc_descripcion_piso, lc_ambiente_piso, ln_id_atencion, lc_descripcion_atencion;

/* Listar Pisos  */
function listar_pisos() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_pisos',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
                                
            $("#slt_pisos")
                .html('')
                .show();

            $("#slt_pisos_seleccion")
                .html('')
                .show();
            $("#slt_pisos_seleccion").append('<option>Seleccione Piso </option>');
            
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_pisos").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  ambiente = "' + filas.ambiente + '"  >' + filas.descripcion + ' - ' + filas.ambiente +'</option>');
                    $("#slt_pisos").attr("disabled", false);
                    $("#slt_pisos_seleccion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  ambiente = "' + filas.ambiente + '"  >' + filas.descripcion + ' - ' + filas.ambiente +'</option>');
                    $("#slt_pisos_seleccion").attr("disabled", false);
                    
                } else {
                    $("#slt_pisos").attr("disabled", true);
                    $("#slt_pisos_seleccion").attr("disabled", true);
                }
            });
        }
    });
}

function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_pisos() {
    "use strict";
    ln_id_piso = $('#slt_pisos option:selected').attr('id');
    lc_descripcion_piso = $('#slt_pisos option:selected').attr('descripcion');
    lc_ambiente_piso = $('#slt_pisos option:selected').attr('ambiente');
    $('#txt_descripcion_pisos')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_descripcion_piso);
    $('#txt_ambiente_pisos')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_ambiente_piso);
    $('#btn_modificar_piso').attr("disabled", false);
    $('#btn_eliminar_piso').attr("disabled", false);
    $('#btn_grabar_piso').attr("disabled", true);

}


/* leer consultorios */

function listar_consultorios()

{
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_consultorios',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_consultorios")
                .html('')
                .show();
           
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_consultorios").append('<option id="' + filas.id + '"  consultorio= "' + filas.consultorio  + '"  >' + filas.consultorio +'</option>');
                    $("#slt_consultorios").attr("disabled", false);
                    
                } else {
                    $("#slt_consultorios").attr("disabled", true);

                }
            });
        }
    });
    
    
     $("#slt_consultorios").select2({
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



/* fin de consultorios */


/* tipo de atenciones */


function listar_tipo_atenciones() {
    "use strict";
    dato_listar = {
        "id": '1'
    };
    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_tipos_atenciones',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_atencion")
                .html('')
                .show();
            $("#slt_atencion_view")
                .html('')
                .show();
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_atencion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion  + '"  >' + filas.descripcion  +'</option>');
                    $("#slt_atencion").attr("disabled", false);
                    $("#slt_atencion_view").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion  + '"  >' + filas.descripcion  +'</option>');
                    $("#slt_atencion_view").attr("disabled", false);
                } else {
                    $("#slt_atencion").attr("disabled", true);
                    $("#slt_atencion_view").attr("disabled", true);
                }
            });
        }
    });
}

function leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_atenciones()
{
    
     "use strict";
    ln_id_atencion = $('#slt_atencion option:selected').attr('id');
    lc_descripcion_atencion = $('#slt_atencion option:selected').attr('descripcion');
  $('#txt_descripcion_atencion')
        .attr("disabled", true)
        .css("background-color", "#FFFFFF")
        .val(lc_descripcion_atencion);
    $('#btn_modificar_atencion').attr("disabled", false);
    $('#btn_eliminar_atencion').attr("disabled", false);
    $('#btn_grabar_atencion').attr("disabled", true);
    
}


/* listar especialidad */


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


 

$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_tipos_especialidad();
    listar_pisos();
    listar_tipo_atenciones();
    listar_consultorios();
    
    $("#btn_agregar_estado_civil").click(function () {
        lc_tipo_operacion = '1';
    });
    $("#slt_pisos")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_pisos();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_pisos();
    });
    
    $("#slt_atencion")
        .click(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_atenciones();
        })
        .keyup(function () {
            leer_seleccion_de_registros_y_mostrarlo_en_los_input_text_atenciones();
    });
    
    $("#slt_pisos_seleccion").change(function(){
        lid_piso_seleccion = $('#slt_pisos_seleccion option:selected').attr('id');
        lc_ambiente = $('#slt_pisos_seleccion option:selected').attr('ambiente');
        $("#txt_piso_seleccion").val(lc_ambiente);
        $("#txt_nro_piso").attr("disabled", false);
        
        
        
        
        
        
        
        
    });
    
    
    
    
        

    
    
   

});
