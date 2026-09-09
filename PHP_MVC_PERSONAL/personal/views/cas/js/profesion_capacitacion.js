var lc_tipo_table_ca = 'Ca',
    dato_listar_capacitacion, leer_inicio_capacitacion, leer_fin_capacitacion, leer_nro_capacitacion, leer_institucion_capacitacion, leer_observacion_capacitacion, dato_listar_capacitacion, datos_grabar_capacitacion, lc_ver_si_se_selecciono_id_capa, leer_idcapa, leer_descripcion_capa, leer_id_capa, lc_fecha_inicio_capacitacion, lc_fecha_fin_capacitacion, ln_idcapa, lc_descripcion_capacitacion;


function inicializar_etiquetas_capacitacion() {
    "use strict";

    $("#btn_eliminar_capacitacion").attr("disabled", true);
    $("#slt_capacitaciones_registrado").attr("disabled", true);


    $("#txt_descripcion_capacitacion")
        .val('')
        .attr("disabled", true);
    $("#msj_capacitacion").text('');
    $("#fecha_inicio_capacitacion")
        .val('')
        .attr("disabled", true);

    $("#fecha_fin_capacitacion")
        .val('')
        .attr("disabled", true);

    $('#fecha_inicio_capacitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {

    });
    $('#fecha_fin_capacitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {});


    $("#nro_capacitacion")
        .val('')
        .attr("disabled", true);


    $("#nombre_institucion_capacitacion")
        .val('')
        .attr("disabled", true);

    $("#observacion_capacitacion")
        .val('')
        .attr("disabled", true);

    $("#btn_grabar_datos_capacitacion").attr("disabled", true);



}

// 

function listar_todas_las_capacitaciones() {
    "use strict";
    dato_listar_capacitacion = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_capacitacion,
        dataType: 'json',
        url: url + 'parametros/listar_todos_las_capacitacion',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_toda_capacitacion")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_toda_capacitacion").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slc_toda_capacitacion").attr("disabled", true);
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


    $("#slc_toda_capacitacion").select2({
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



function grabar_registro_capacitacion(leer_idpersonal, lc_tipo_table_ca, ln_idcapa, leer_inicio_capacitacion, leer_fin_capacitacion, leer_nro_capacitacion, leer_institucion_capacitacion, leer_observacion_capacitacion) {

    "use strict";
    datos_grabar_capacitacion = {
        'idpersonal': leer_idpersonal,
        'tipo_table': lc_tipo_table_ca,
        'id_capa': ln_idcapa,
        'inicio': leer_inicio_capacitacion,
        'fin': leer_fin_capacitacion,
        'nro': leer_nro_capacitacion,
        'institucion': leer_institucion_capacitacion,
        'observacion': leer_observacion_capacitacion
    };
    $.ajax({
        data: datos_grabar_capacitacion,
        dataType: 'json',
        url: url + 'cas/grabar_capacitacion_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_capacitacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_capacitacion").html("");
            lc_tipo_table_ca = 'Ca';
            ver_tipos_capacitacion_por_cas(leer_idpersonal, lc_tipo_table_ca);
            listar_todas_las_capacitaciones();
            inicializar_etiquetas_capacitacion();
            $("#btn_agregar_capacitacion").attr("disabled", false);
            $("#btn_eliminar_capacitacion").attr("disabled", true);

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




// leer_inicio_capacitacion, leer_fin_capacitacion, leer_nro_capacitacion, leer_institucion_capacitacion, leer_observacion_capacitacion, dato_listar_capacitacion, datos_grabar_capacitacion 
// lc_ver_si_se_selecciono_id_capa, leer_idcapa, leer_descripcion_capa


function leer_capacitacion_mostrarlo_en_etiqueta() {
    "use strict";

    leer_idcapa = $('#slt_capacitaciones_registrado  option:selected').attr('id');
    lc_ver_si_se_selecciono_id_capa = (typeof leer_idcapa === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_id_capa === '1') {
        leer_idcapa = $('#slt_capacitaciones_registrado  option:selected').attr('id');


        leer_id_capa = $('#slt_capacitaciones_registrado  option:selected').attr('nro_id_eecc');
        leer_descripcion_capa = $('#slt_capacitaciones_registrado  option:selected').attr('descripcion');
        leer_nro_capacitacion = $('#slt_capacitaciones_registrado  option:selected').attr('nro_eecc');
        leer_inicio_capacitacion = $('#slt_capacitaciones_registrado  option:selected').attr('inicio');
        leer_fin_capacitacion = $('#slt_capacitaciones_registrado  option:selected').attr('fin');
        leer_institucion_capacitacion = $('#slt_capacitaciones_registrado  option:selected').attr('institucion');
        leer_observacion_capacitacion = $('#slt_capacitaciones_registrado  option:selected').attr('observacion');

        $("#txt_descripcion_capacitacion").val(leer_descripcion_capa);
        $("#fecha_inicio_capacitacion").val(leer_inicio_capacitacion);
        $("#fecha_fin_capacitacion").val(leer_fin_capacitacion);

        $("#nro_capacitacion").val(leer_nro_capacitacion);

        $("#nombre_institucion_capacitacion").val(leer_institucion_capacitacion);
        $("#observacion_capacitacion").val(leer_observacion_capacitacion);

        $("#btn_grabar_datos_capacitacion").attr("disabled", false);
        $("#btn_eliminar_capacitacion").attr("disabled", false);


    } else {
        $("#btn_agregar_competencia").attr("disabled", true);
        $("#btn_eliminar_capacitacion").attr("disabled", true);

    }
    $("#btn_grabar_datos_capacitacion").attr("disabled", true);
}



function eliminar_registro_capacitacion(leer_idcapa) {
    "use strict";
    datos_eliminar_capa = {
        'id_capa': leer_idcapa
    };
    $.ajax({
        data: datos_eliminar_capa,
        dataType: 'json',
        url: url + 'cas/eliminar_capacitacion_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_capacitacion").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
             $("#espera_grabacion_capacitacion").html("");
            lc_tipo_table_ca = 'Ca';
            ver_tipos_capacitacion_por_cas(leer_idpersonal, lc_tipo_table_ca);
            listar_todas_las_capacitaciones();
            inicializar_etiquetas_capacitacion();
            $("#btn_agregar_capacitacion").attr("disabled", false);
            $("#btn_eliminar_capacitacion").attr("disabled", true);

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



// leer_inicio_capacitacion, leer_fin_capacitacion, leer_nro_capacitacion, leer_institucion_capacitacion, leer_observacion_capacitacion




$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    listar_todas_las_capacitaciones();
    inicializar_etiquetas_capacitacion();


    $("#slt_capacitaciones_registrado")
        .click(function () {
            leer_capacitacion_mostrarlo_en_etiqueta();
        })
        .keyup(function () {
            leer_capacitacion_mostrarlo_en_etiqueta();
        });


    $("#btn_agregar_capacitacion").click(function () {
        listar_todas_las_capacitaciones();
        inicializar_etiquetas_capacitacion();
        $("#slc_toda_capacitacion")
            .attr("disabled", false)
            .focus();
    });

    $("#btn_eliminar_capacitacion").click(function () {
        eliminar_registro_capacitacion(leer_idcapa);
    });

    // ln_idcapa, lc_descripcion_capacitacion
    $("#slc_toda_capacitacion").change(function () {
        ln_idcapa = $('#slc_toda_capacitacion option:selected').attr('id');
        lc_descripcion_capacitacion = $('#slc_toda_capacitacion  option:selected').attr('descripcion');
        $('#txt_descripcion_capacitacion').val(lc_descripcion_capacitacion);
        $('#fecha_inicio_capacitacion')
            .attr("disabled", false)
            .focus();
    });

    $('#fecha_inicio_capacitacion').change(function () {
        leer_inicio_capacitacion = $('#fecha_inicio_capacitacion').val();
        $('#fecha_fin_capacitacion')
            .attr("disabled", false)
            .focus();
    });

    $('#fecha_fin_capacitacion').change(function () {
        lc_fecha_inicio_capacitacion = convertir_fecha_caracter_a_date($('#fecha_inicio_capacitacion').val());
        lc_fecha_fin_capacitacion = convertir_fecha_caracter_a_date($('#fecha_fin_capacitacion').val());
        if (lc_fecha_fin_capacitacion > lc_fecha_inicio_capacitacion) {
            $("#msj_capacitacion").html('');
            $("#nro_capacitacion")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_capacitacion").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#nro_capacitacion")
                .attr("disabled", true);
        }

    });


    $("#nro_capacitacion")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
            $('#nombre_institucion_capacitacion').attr("disabled", false);
            if (e.which === 13) {
                $('#nombre_institucion_capacitacion').focus();
            }
        })
        .click(function () {
            $('#nombre_institucion_capacitacion').attr("disabled", false);
        });


    $('#nombre_institucion_capacitacion')
        .keypress(function (e) {
            $('#observacion_capacitacion').attr("disabled", false);
            $("#btn_grabar_datos_capacitacion").attr("disabled", false);
            if (e.which === 13) {
                $('#observacion_capacitacion').focus();
            }
        })
        .click(function () {
            $('#observacion_capacitacion').attr("disabled", false);
            $("#btn_grabar_datos_capacitacion").attr("disabled", false);
        });


    $("#btn_grabar_datos_capacitacion").click(function () {
        // leer_idpersonal
        // ln_idcapa

        leer_inicio_capacitacion = $("#fecha_inicio_capacitacion").val();
        leer_fin_capacitacion = $('#fecha_fin_capacitacion').val();
        leer_nro_capacitacion = $("#nro_capacitacion").val();
        leer_institucion_capacitacion = $("#nombre_institucion_capacitacion").val();
        leer_observacion_capacitacion = $("#observacion_capacitacion").val();
        grabar_registro_capacitacion(leer_idpersonal, lc_tipo_table_ca, ln_idcapa, leer_inicio_capacitacion, leer_fin_capacitacion, leer_nro_capacitacion, leer_institucion_capacitacion, leer_observacion_capacitacion);
    });



});
