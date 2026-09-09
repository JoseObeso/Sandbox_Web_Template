var url = 'http://' + document.domain + '/rrhh/legajos/',
  //  url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id, leer_plaza, leer_nro_contrato, leer_nro_proceso, leer_tipo_personal, leer_sexo, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, lc_buscar_nombre, dato_buscar, nro_registros, leer_estado_civil, leer_direccion, leer_direccion_distrito,leer_direccion_provincia, leer_direccion_departamento, leer_sueldo, leer_cargo, leer_dni, leer_ruc, leer_essalud, leer_carnet, leer_gs, leer_tfijo, leer_celular, leer_correo, leer_numero_hijos;

function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#slc_personal  option:selected').attr('id');
    leer_dni = $('#slc_personal  option:selected').attr('dni');
    leer_ruc = $('#slc_personal  option:selected').attr('ruc');
    leer_plaza = $('#slc_personal  option:selected').attr('plaza');
    leer_nro_contrato = $('#slc_personal  option:selected').attr('nro_contrato');
    leer_nro_proceso = $('#slc_personal  option:selected').attr('nro_proceso');
    leer_tipo_personal = $('#slc_personal  option:selected').attr('tipo_personal');
    leer_sexo = $('#slc_personal  option:selected').attr('sexo');
    leer_paterno = $('#slc_personal  option:selected').attr('paterno');
    leer_materno = $('#slc_personal  option:selected').attr('materno');
    leer_nombres = $('#slc_personal  option:selected').attr('nombre');
    leer_apellidos_nombres = $('#slc_personal  option:selected').attr('apellidos_nombre');
    leer_fecha_nacimiento = $('#slc_personal  option:selected').attr('fecha_nacimiento');
    leer_edad = $('#slc_personal  option:selected').attr('edad');
    leer_estado_civil = $('#slc_personal  option:selected').attr('estado_civil');
    leer_direccion = $('#slc_personal  option:selected').attr('direccion');
    leer_direccion_distrito = $('#slc_personal  option:selected').attr('direccion_distrito');
    leer_direccion_provincia = $('#slc_personal  option:selected').attr('direccion_provincia');
    leer_direccion_departamento = $('#slc_personal  option:selected').attr('direccion_departamento');
    leer_sueldo = $('#slc_personal  option:selected').attr('sueldo');
    leer_cargo = $('#slc_personal  option:selected').attr('cargo');
    leer_essalud = $('#slc_personal  option:selected').attr('essalud');
    leer_carnet = $('#slc_personal  option:selected').attr('carnet_extranjeria');
    leer_gs = $('#slc_personal  option:selected').attr('gs');
    leer_tfijo = $('#slc_personal  option:selected').attr('telefono_fijo');
    leer_celular = $('#slc_personal  option:selected').attr('telefono_celular');
    leer_correo = $('#slc_personal  option:selected').attr('correo_electronico');
    leer_numero_hijos = $('#slc_personal  option:selected').attr('hijos');
    
 
    
 
    
    $("#id").text(leer_id); 
    $("#paterno").val(leer_paterno); 
    $("#materno").val(leer_materno); 
    $("#nombres").val(leer_nombres); 
    $("#sexo").val(leer_sexo);
    $("#fecha_nacimiento").val(leer_fecha_nacimiento );
    $("#txt_direccion_actual").val( leer_direccion);
    
    
    $("#direccion_distrito").text(leer_direccion_distrito );
    $("#direccion_provincia").text(leer_direccion_provincia );
    $("#direccion_departamento").text(leer_direccion_departamento );
    

    
    $("#dni").val( leer_dni);
    $("#ruc").val( leer_ruc);
    $("#ce").val( leer_carnet);
    $("#essalud").val( leer_essalud);
    $("#gs").val( leer_gs);
    $("#telefono_fijo").val(leer_tfijo);
    $("#telefono_celular").val(leer_celular);
    $("#txt_correo_electronico").val(leer_correo);
    $("#edad").text('Edad : ' + leer_edad + ' años');
    
    $("#btn_modificar_personal").attr("disabled", false);
    $("#btn_eliminar_personal").attr("disabled", false);
    $("#btn_grabar_personal").attr("disabled", true);
      
      
  //  $("#estado_civil").text('Estado Civil: ' + leer_estado_civil );
    
   
    $("#estado_civil").val(leer_estado_civil);
    $("#numero_hijos").val(leer_numero_hijos);
    
    


    
    $("#sueldo").text('Sueldo : ' + leer_sueldo );
    $("#cargo").text('Cargo : ' + leer_cargo );
    
    
    

}




function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };

    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'secciones/buscar_por_nombre_legajos',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slc_personal").html('');
            nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    
                    if (filas.encontro === '1') {
                        $("#slc_personal").append('<option value="' + filas.id + '"  id = "' + filas.id +
                        '"  plaza = "' + filas.plaza +
                        '" nro_contrato = "' + filas.nro_contrato +
                        '" nro_proceso = "' + filas.nro_proceso +
                        '" tipo_personal = "' + filas.tipo_personal +
                        '" sexo = "' + filas.sexo +
                        '" paterno = "' + filas.paterno +
                        '" materno = "' + filas.materno +
                        '" nombre = "' + filas.nombre +
                        '" apellidos_nombre = "' + filas.apellidos_nombres +
                        '" fecha_nacimiento = "' + filas.fecha_nacimiento +
                        '" estado_civil = "' + filas.estado_civil +
                        '" edad = "' + filas.edad +
                        '" direccion = "' + filas.direccion +
                        '" direccion_distrito = "' + filas.direccion_distrito +
                        '" direccion_provincia = "' + filas.direccion_provincia +
                        '" direccion_departamento = "' + filas.direccion_departamento +
                        '" sueldo = "' + filas.sueldo +
                        '" cargo = "' + filas.cargo +
                        '" dni = "' + filas.dni +
                        '" ruc = "' + filas.ruc +
                        '" essalud = "' + filas.essalud +
                        '" gs = "' + filas.gs +
                        '" carnet_extranjeria = "' + filas.carnet_extranjeria +     
                        '" telefono_fijo = "' + filas.telefono_fijo + 
                        '" telefono_celular = "' + filas.telefono_celular +  
                        '" correo_electronico = "' + filas.correo +  
                        '" hijos = "' + filas.hijos +  
                        '"  >' + filas.apellidos_nombres + '</option>');
                        $("#slc_personal").attr("disabled", false);
                        
                        
                    } else {
                        $("#slc_personal").attr("disabled", true);
                        $("#slc_personal").empty();
                        
                        
                    }
                    
     

                });
            } else {
                $("#slc_personal").empty();

            }
        }
    });
}


/*
function poner_inputs_text_blanco_desabilitar_botones() {
    "use strict";
  }
  */




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    
    $("#btn_grabar_personal").attr("disabled", true);
    $("#btn_modificar_personal").attr("disabled", true);
    $("#btn_eliminar_personal").attr("disabled", true);
    
    
    

    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });





    $("#slc_personal")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });







});
