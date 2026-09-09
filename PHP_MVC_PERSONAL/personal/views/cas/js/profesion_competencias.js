var dato_listar_competencias, cantidad_registros, lc_fecha_inicio_especializacion, lc_fecha_inicio_comparar_espe, lc_fecha_fin_comparar_espe, ln_id_competencias, leer_idcompetencias, lc_codigo_colegio, lc_nombre_colegio, dato_listar_competencias_desple, ln_idcompetencias, lc_descripcion_competencias, lc_tipo_table, lc_nro_de_la_competencias, lc_fecha_fin_especializacion, lc_institucion, lc_observacion, datos_grabar_competencias, leer_ideecc, lc_ver_si_se_selecciono_ideecc, leer_ideecc, leer_nro_ideecc, leer_descripcion, leer_nro_eecc, leer_inicio_espe, leer_fin_espe, leer_institucion, leer_observacion, lc_tipo_table_cm = 'Cm', datos_eliminar_competencias, dato_ver_especialidad_cm;


function inicializar_etiquetas_competencias() {
    "use strict";
    $("#btn_eliminar_competencias").attr("disabled", true);
    $("#slc_tipo_competencias_desple").attr("disabled", true);
    $("#txt_descripcion_competencias")
        .val('')
        .attr("disabled", true);
    $("#msj_competencias").text('');
    $("#fecha_inicio_competencia")
        .val('')
        .attr("disabled", true);
    $("#fecha_fin_competencia")
        .val('')
        .attr("disabled", true);
    $('#fecha_inicio_competencia').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {

    });
    $('#fecha_fin_competencia').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {
    });

     $("#nro_competencia")
        .val('')
        .attr("disabled", true); 
    

    $("#nombre_institucion_competencia")
        .val('')
        .attr("disabled", true);
    
    $("#observacion_competencia")
        .val('')
        .attr("disabled", true);
    
    $("#btn_grabar_datos_competencia").attr("disabled", true);



}
 

function listar_tipos_competencias_desplegable() {
    "use strict";
    dato_listar_competencias_desple = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_competencias_desple,
        dataType: 'json',
        url: url + 'parametros/listar_todos_las_competencias',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_tipo_competencias_desple")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_competencias_desple").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');

                } else {
                    $("#slc_tipo_competencias_desple").attr("disabled", true);
                }

            });

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


    $("#slc_tipo_competencias_desple").select2({
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



function grabar_registro_competencias(leer_idpersonal, lc_tipo_table_cm, ln_idcompetencias,  leer_inicio_espe_c, leer_fin_espe_c, leer_nro_ideecc_c, leer_institucion_c, leer_observacion_c) {
    "use strict";
    datos_grabar_competencias = {
        'idpersonal': leer_idpersonal,
        'tipo_table': lc_tipo_table_cm,
        'id_compe': ln_idcompetencias,
        'inicio': leer_inicio_espe_c,
        'fin': leer_fin_espe_c,
        'nro': leer_nro_ideecc_c,
        'institucion': leer_institucion_c,
        'observacion': leer_observacion_c
    };
    $.ajax({
        data: datos_grabar_competencias,
        dataType: 'json',
        url: url + 'cas/grabar_competencias_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_competencia").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_competencia").html("");
            lc_tipo_table_cm = 'Cm';
            ver_tipos_especialidad_por_cas_cm(leer_idpersonal, lc_tipo_table_cm);
            listar_tipos_competencias_desplegable();
            $("#btn_grabar_datos_competencia").attr("disabled", true);
            $("#btn_eliminar_competencias").attr("disabled", true);

            
            inicializar_etiquetas_competencias();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });


}




                             


function leer_competencia_de_cas_y_mostrarlo() {
    "use strict";
    leer_ideecc_c = $('#slt_competencias_registrado  option:selected').attr('id');
    lc_ver_si_se_selecciono_ideecc_c = (typeof leer_ideecc_c === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_ideecc_c === '1') {
        leer_ideecc_c = $('#slt_competencias_registrado  option:selected').attr('id');
        leer_nro_ideecc_c = $('#slt_competencias_registrado  option:selected').attr('nro_id_eecc');
        leer_descripcion_c = $('#slt_competencias_registrado  option:selected').attr('descripcion');
        leer_nro_eecc_c = $('#slt_competencias_registrado  option:selected').attr('nro_eecc');
        leer_inicio_espe_c = $('#slt_competencias_registrado  option:selected').attr('inicio');
        leer_fin_espe_c = $('#slt_competencias_registrado  option:selected').attr('fin');
        leer_institucion_c = $('#slt_competencias_registrado  option:selected').attr('institucion');
        leer_observacion_c = $('#slt_competencias_registrado  option:selected').attr('observacion');
        
        $("#txt_descripcion_competencias").val(leer_descripcion_c);
        $("#fecha_inicio_competencia").val(leer_inicio_espe_c);
        $("#fecha_fin_competencia").val(leer_fin_espe_c);
        $("#nro_competencia").val(leer_nro_eecc_c);
        $("#nombre_institucion_competencia").val(leer_institucion_c);
        $("#observacion_competencia").val(leer_observacion_c);
        $("#btn_agregar_competencia").attr("disabled", false);
        $("#btn_eliminar_competencias").attr("disabled", false);
        
        
    } else {
        $("#btn_agregar_competencia").attr("disabled", true);
        $("#btn_eliminar_competencias").attr("disabled", true);

    }
    $("#btn_grabar_datos_competencia").attr("disabled", true);
}



function eliminar_registro_competencias(leer_ideecc_c){
    "use strict";
    datos_eliminar_competencias = {
        'id_eecc_c': leer_ideecc_c 
    };
    $.ajax({
        data: datos_eliminar_competencias,
        dataType: 'json',
        url: url + 'cas/eliminar_competencias_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_competencia").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_competencia").html("");
            lc_tipo_table_cm = 'Cm';
            ver_tipos_especialidad_por_cas_cm(leer_idpersonal, lc_tipo_table_cm);
            $("#btn_grabar_datos_competencia").attr("disabled", true);
            $("#btn_eliminar_competencias").attr("disabled", true);
            inicializar_etiquetas_competencias();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar!');

            $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

    
    
    
    
}




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_tipos_competencias_desplegable();
    inicializar_etiquetas_competencias();
    // $("#btn_agregar_competencias").attr("disabled", true);

    $("#slt_competencias_registrado")
        .click(function () {
            leer_competencia_de_cas_y_mostrarlo();

        })
        .keyup(function () {
            leer_competencia_de_cas_y_mostrarlo();
        });


    $("#btn_agregar_competencias").click(function () {
        inicializar_etiquetas_competencias();
        listar_tipos_competencias_desplegable();
        $("#slc_tipo_competencias_desple")
            .attr("disabled", false)
            .focus();
    });

    
      $("#btn_eliminar_competencias").click(function () {
        eliminar_registro_competencias(leer_ideecc_c);
    });
    
    
    $("#slc_tipo_competencias_desple").change(function () {
        ln_idcompetencias = $('#slc_tipo_competencias_desple  option:selected').attr('id');
        lc_descripcion_competencias = $('#slc_tipo_competencias_desple  option:selected').attr('descripcion');
        $('#txt_descripcion_competencias').val(lc_descripcion_competencias);
        $('#fecha_inicio_competencia')
            .attr("disabled", false)
            .focus();
    });

    $('#fecha_inicio_competencia').change(function () {
        lc_fecha_inicio_competencia = $('#fecha_inicio_competencia').val();
        $('#fecha_fin_competencia')
            .attr("disabled", false)
            .focus();

    });

    // 
    $('#fecha_fin_competencia').change(function () {
        lc_fecha_inicio_comparar_compe = convertir_fecha_caracter_a_date($('#fecha_inicio_competencia').val());
        lc_fecha_fin_comparar_compe = convertir_fecha_caracter_a_date($('#fecha_fin_competencia').val());
        if (lc_fecha_fin_comparar_compe > lc_fecha_inicio_comparar_compe) {
            $("#msj_competencias").html('');
            $("#nro_competencia")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_competencias").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#nro_competencia")
                .attr("disabled", true);
        }

    });


    $("#nro_competencia")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
            $('#nombre_institucion_competencia').attr("disabled", false);
            if (e.which === 13) {
                $('#nombre_institucion_competencia').focus();
            }
        })
        .click(function () {
            $('#nombre_institucion_competencia').attr("disabled", false);
        });


    $('#nombre_institucion_competencia')
        .keypress(function (e) {
            $('#observacion_competencia').attr("disabled", false);
            $("#btn_grabar_datos_competencia").attr("disabled", false);
            if (e.which === 13) {
                $('#observacion_competencia').focus();
            }
        })
        .click(function () {
            $('#observacion_competencia').attr("disabled", false);
            $("#btn_grabar_datos_competencia").attr("disabled", false);
        });


    $("#btn_grabar_datos_competencia").click(function () {
        // leer_idpersonal
         // ln_idcompetencias
        leer_inicio_espe_c = $('#fecha_inicio_competencia').val();
        leer_fin_espe_c = $('#fecha_fin_competencia').val();
        leer_nro_ideecc_c = $("#nro_competencia").val();
        leer_institucion_c = $("#nombre_institucion_competencia").val();
        leer_observacion_c = $("#observacion_competencia").val();
        grabar_registro_competencias(leer_idpersonal, lc_tipo_table_cm, ln_idcompetencias,  leer_inicio_espe_c, leer_fin_espe_c, leer_nro_ideecc_c, leer_institucion_c, leer_observacion_c);
    });



});
