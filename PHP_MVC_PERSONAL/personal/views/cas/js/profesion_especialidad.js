var dato_listar_especialidad, cantidad_registros, lc_fecha_inicio_especializacion, lc_fecha_inicio_comparar_espe, lc_fecha_fin_comparar_espe, ln_id_especialidad, leer_idespecialidad, lc_codigo_colegio, lc_nombre_colegio, dato_listar_especialidad_desple, ln_idespecialidad, lc_descripcion_especialidad, lc_tipo_table, lc_nro_de_la_especialidad, lc_fecha_fin_especializacion, lc_institucion, lc_observacion, datos_grabar_especialidad, leer_ideecc, lc_ver_si_se_selecciono_ideecc, leer_ideecc, leer_nro_ideecc, leer_descripcion, leer_nro_eecc, leer_inicio_espe, leer_fin_espe, leer_institucion, leer_observacion, lc_tipo_table = 'Es', datos_eliminar_especialidad;



function inicializar_etiquetas_especialidad() {
    "use strict";

    $("#btn_eliminar_especialidades").attr("disabled", true);
    $("#msj_especialidad").text('');
    $("#slc_tipo_especialidad_desple").attr("disabled", true);
    $("#txt_descripcion_especialidad")
        .val('')
        .attr("disabled", true);
    $("#fecha_inicio_especializacion")
        .val('')
        .attr("disabled", true);
    $("#fecha_fin_especializacion")
        .val('')
        .attr("disabled", true);

    $('#fecha_inicio_especializacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {

    });


    $('#fecha_fin_especializacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {

    });


    $("#nombre_institucion")
        .val('')
        .attr("disabled", true);
    
     $("#nro_especialidad")
        .val('')
        .attr("disabled", true);
    
    $("#observacion_especialidad")
        .val('')
        .attr("disabled", true);
    $("#btn_grabar_datos_especialidad").attr("disabled", true);



}

function listar_tipos_especialidad_desplegable() {
    "use strict";
    dato_listar_especialidad_desple = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_especialidad_desple,
        dataType: 'json',
        url: url + 'parametros/listar_tipos_especialidad',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_tipo_especialidad_desple")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_tipo_especialidad_desple").append('<option id="' + filas.id + '"  codigo_minsa = "' + filas.codigo_minsa + '"  descripcion = "' + filas.descripcion + '"  codigo_colegio = "' + filas.codigo_colegio + '"  colegio= "' + filas.colegio + '"  >' + filas.codigo_minsa + '  -  ' + filas.descripcion + '</option>');

                } else {
                    $("#slc_tipo_especialidad_desple").attr("disabled", true);
                }

            });

        }
    });


    $("#slc_tipo_especialidad_desple").select2({
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

// datos_grabar_especialidad 

function grabar_registro_especialidad(leer_idpersonal, lc_tipo_table, ln_idespecialidad, lc_fecha_inicio_especializacion, lc_fecha_fin_especializacion, lc_nro_de_la_especialidad, lc_institucion, lc_observacion) {
    "use strict";
    datos_grabar_especialidad = {
        'idpersonal': leer_idpersonal,
        'tipo_table': lc_tipo_table,
        'id_espe': ln_idespecialidad,
        'inicio': lc_fecha_inicio_especializacion,
        'fin': lc_fecha_fin_especializacion,
        'nro': lc_nro_de_la_especialidad,
        'institucion': lc_institucion,
        'observacion': lc_observacion
    };
    $.ajax({
        data: datos_grabar_especialidad,
        dataType: 'json',
        url: url + 'cas/grabar_especialidad_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_carrera_habilidad").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            ver_tipos_especialidad_por_cas(leer_idpersonal, lc_tipo_table);
            listar_tipos_especialidad_desplegable();
            $("#btn_grabar_datos_especialidad").attr("disabled", true);
            inicializar_etiquetas_especialidad();
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





                             


function leer_especialidades_de_cas_y_mostrarlo() {
    "use strict";
    leer_ideecc = $('#slt_especialidades_registrado  option:selected').attr('id');
    lc_ver_si_se_selecciono_ideecc = (typeof leer_ideecc === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_ideecc === '1') {
        leer_ideecc = $('#slt_especialidades_registrado  option:selected').attr('id');
        leer_nro_ideecc = $('#slt_especialidades_registrado  option:selected').attr('nro_id_eecc');
        leer_descripcion = $('#slt_especialidades_registrado  option:selected').attr('descripcion');
        leer_nro_eecc = $('#slt_especialidades_registrado  option:selected').attr('nro_eecc');
        leer_inicio_espe = $('#slt_especialidades_registrado  option:selected').attr('inicio');
        leer_fin_espe = $('#slt_especialidades_registrado  option:selected').attr('fin');
        leer_institucion = $('#slt_especialidades_registrado  option:selected').attr('institucion');
        leer_observacion = $('#slt_especialidades_registrado  option:selected').attr('observacion');
        
        $("#txt_descripcion_especialidad").val(leer_descripcion);
        $("#fecha_inicio_especializacion").val(leer_inicio_espe);
        $("#fecha_fin_especializacion").val(leer_fin_espe);
        $("#nro_especialidad").val(leer_nro_eecc);
        $("#nombre_institucion").val(leer_institucion);
        $("#observacion_especialidad").val(leer_observacion);
        $("#btn_agregar_especialidades").attr("disabled", false);
        $("#btn_eliminar_especialidades").attr("disabled", false);
    } else {
        $("#btn_agregar_especialidades").attr("disabled", true);
        $("#btn_eliminar_especialidades").attr("disabled", true);

    }
    $("#btn_grabar_datos_especialidad").attr("disabled", true);
}



function eliminar_registro_especialidad(leer_ideecc){
    "use strict";
    datos_eliminar_especialidad = {
        'id_eecc': leer_ideecc
    };
    $.ajax({
        data: datos_eliminar_especialidad,
        dataType: 'json',
        url: url + 'cas/eliminar_especialidad_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_carrera_habilidad").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            ver_tipos_especialidad_por_cas(leer_idpersonal, lc_tipo_table);
            listar_tipos_especialidad_desplegable();
            $("#btn_grabar_datos_especialidad").attr("disabled", true);
            $("#btn_eliminar_especialidades").attr("disabled", true);
            inicializar_etiquetas_especialidad();
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
    listar_tipos_especialidad_desplegable();
    inicializar_etiquetas_especialidad();
    $("#btn_grabar_datos_especialidad").attr("disabled", true);


    $("#slt_especialidades_registrado")
        .click(function () {
            leer_especialidades_de_cas_y_mostrarlo();

        })
        .keyup(function () {
            leer_especialidades_de_cas_y_mostrarlo();
        });






    $("#btn_agregar_especialidades").click(function () {
        inicializar_etiquetas_especialidad();
        listar_tipos_especialidad_desplegable();
        $("#slc_tipo_especialidad_desple")
            .attr("disabled", false)
            .focus();
    });

    
      $("#btn_eliminar_especialidades").click(function () {
        eliminar_registro_especialidad(leer_ideecc);
    });
    
    

    $("#slc_tipo_especialidad_desple").change(function () {
        ln_idespecialidad = $('#slc_tipo_especialidad_desple  option:selected').attr('id');
        lc_descripcion_especialidad = $('#slc_tipo_especialidad_desple  option:selected').attr('descripcion');
        $('#txt_descripcion_especialidad').val(lc_descripcion_especialidad);
        $('#fecha_inicio_especializacion')
            .attr("disabled", false)
            .focus();
    });

    $('#fecha_inicio_especializacion').change(function () {
        lc_fecha_inicio_especializacion = $('#fecha_inicio_especializacion').val();
        $('#fecha_fin_especializacion')
            .attr("disabled", false)
            .focus();

    });

    $('#fecha_fin_especializacion').change(function () {
        lc_fecha_inicio_comparar_espe = convertir_fecha_caracter_a_date($('#fecha_inicio_especializacion').val());
        lc_fecha_fin_comparar_espe = convertir_fecha_caracter_a_date($('#fecha_fin_especializacion').val());
        if (lc_fecha_fin_comparar_espe > lc_fecha_inicio_comparar_espe) {
            $("#msj_especialidad").html('');
            $("#nro_especialidad")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_especialidad").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#nro_especialidad")
                .attr("disabled", true);
        }

    });


    $("#nro_especialidad")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
            $('#nombre_institucion').attr("disabled", false);
            if (e.which === 13) {
                $('#nombre_institucion').focus();
            }
        })
        .click(function () {
            $('#nombre_institucion').attr("disabled", false);
        });


    $('#nombre_institucion')
        .keypress(function (e) {
            $('#observacion_especialidad').attr("disabled", false);
            $("#btn_grabar_datos_especialidad").attr("disabled", false);
            if (e.which === 13) {
                $('#observacion_especialidad').focus();
            }
        })
        .click(function () {
            $('#observacion_especialidad').attr("disabled", false);
            $("#btn_grabar_datos_especialidad").attr("disabled", false);
        });


    $("#btn_grabar_datos_especialidad").click(function () {
        // leer_idpersonal
         // ln_idespecialidad
        lc_fecha_inicio_especializacion = $('#fecha_inicio_especializacion').val();
        lc_fecha_fin_especializacion = $('#fecha_fin_especializacion').val();
        lc_nro_de_la_especialidad = $("#nro_especialidad").val();
        lc_institucion = $("#nombre_institucion").val();
        lc_observacion = $("#observacion").val();
        grabar_registro_especialidad(leer_idpersonal, lc_tipo_table, ln_idespecialidad, lc_fecha_inicio_especializacion, lc_fecha_fin_especializacion, lc_nro_de_la_especialidad, lc_institucion, lc_observacion);



    });









});
