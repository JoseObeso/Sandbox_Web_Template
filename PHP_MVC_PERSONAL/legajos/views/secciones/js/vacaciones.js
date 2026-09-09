var url = 'http://' + document.domain + '/rrhh/legajos/',
  //  url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id, leer_plaza, leer_nro_contrato, leer_nro_proceso, leer_tipo_personal, leer_sexo, leer_paterno, leer_materno, leer_nombres, leer_apellidos_nombres, leer_fecha_nacimiento, leer_edad, lc_buscar_nombre, dato_buscar, nro_registros, leer_estado_civil, leer_direccion, leer_direccion_distrito,leer_direccion_provincia, leer_direccion_departamento, leer_sueldo, leer_cargo  ;



function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id = $('#slc_personal  option:selected').attr('id');
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
    
  
    
    
    $("#apellidos_nombres").text('Personal : ' + leer_apellidos_nombres);
    $("#nacimiento").text('Nacimiento : ' + leer_fecha_nacimiento);
    $("#edad").text('Edad : ' + leer_edad + ' años');
    $("#estado_civil").text('Estado Civil: ' + leer_estado_civil );
    $("#direccion").text('Direccion : ' + leer_direccion );
    $("#direccion_distrito").text('Distrito : ' + leer_direccion_distrito );
    $("#direccion_provincia").text('Provincia : ' + leer_direccion_provincia );
    $("#direccion_departamento").text('Departamento : ' + leer_direccion_departamento );
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
                        '"  >' + filas.apellidos_nombres + '</option>');



                });
            } else {
                $("#slc_personal").empty();

            }
        }
    });
}




$(document).ready(function () {
    "use strict";

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
