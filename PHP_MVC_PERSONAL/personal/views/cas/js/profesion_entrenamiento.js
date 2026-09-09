var lc_tipo_table_en = 'En',
    dato_listar_entrenamientos, leer_identre, lc_ver_si_se_selecciono_id_entre, leer_identre, leer_id_entre, leer_descripcion_entre, leer_nro_entrenamiento, leer_inicio_entrenamiento, leer_fin_entrenamiento, leer_institucion_entrenamiento, leer_observacion_entrenamiento, datos_eliminar_entre, datos_grabar_entre, ln_id_entre, lc_fecha_inicio_entrenamiento, lc_fecha_fin_entrenamiento;



function inicializar_etiquetas_entrenamiento() {
    "use strict";
    $("#slt_entrenamiento_registrado").attr("disabled", true);
    $("#btn_eliminar_entrenamiento").attr("disabled", true);
    $("#slc_todo_entrenamiento").attr("disabled", true);

    $("#txt_descripcion_entrenamiento")
        .val('')
        .attr("disabled", true);
    $("#msj_entrenamiento").text('');
    $("#fecha_inicio_entrenamiento")
        .val('')
        .attr("disabled", true);
    $("#fecha_fin_entrenamiento")
        .val('')
        .attr("disabled", true);
    $('#fecha_inicio_entrenamiento').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {});
    $('#fecha_fin_entrenamiento').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio"
    }).on('show', function () {});

    $("#nro_entrenamiento")
        .val('')
        .attr("disabled", true);
    $("#nombre_institucion_entrenamiento")
        .val('')
        .attr("disabled", true);
    $("#observacion_entrenamiento")
        .val('')
        .attr("disabled", true);
    $("#btn_grabar_datos_entrenamiento").attr("disabled", true);
    $("#espera_grabacion_entrenamiento").text('');



}



function listar_todos_los_entrenamientos() {
    "use strict";
    dato_listar_entrenamientos = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_entrenamientos,
        dataType: 'json',
        url: url + 'parametros/listar_todos_los_entrenamiento',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slc_todo_entrenamiento")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slc_todo_entrenamiento").append('<option id="' + filas.id + '"  descripcion = "' + filas.descripcion + '"  >' + filas.descripcion + '</option>');
                } else {
                    $("#slc_todo_entrenamiento").attr("disabled", true);
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


    $("#slc_todo_entrenamiento").select2({
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



function grabar_registro_entrenamiento(leer_idpersonal, lc_tipo_table_en, leer_identre, leer_inicio_entrenamiento, leer_fin_entrenamiento, leer_nro_entrenamiento, leer_institucion_entrenamiento, leer_observacion_entrenamiento) {

    "use strict";
    datos_grabar_entre = {
        'idpersonal': leer_idpersonal,
        'tipo_table': lc_tipo_table_en,
        'id_entre': leer_identre,
        'inicio': leer_inicio_entrenamiento,
        'fin': leer_fin_entrenamiento,
        'nro': leer_nro_entrenamiento,
        'institucion': leer_institucion_entrenamiento,
        'observacion': leer_observacion_entrenamiento
    };
    $.ajax({
        data: datos_grabar_entre,
        dataType: 'json',
        url: url + 'cas/grabar_entrenamiento_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_entrenamiento").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_entrenamiento").html("");
            lc_tipo_table_en = 'En';
            ver_tipos_entrenamientos_por_cas(leer_idpersonal, lc_tipo_table_en);
            inicializar_etiquetas_entrenamiento();
            listar_todos_los_entrenamientos();
            $("#btn_grabar_datos_entrenamiento").attr("disabled", true);
            $("#btn_eliminar_entrenamiento").attr("disabled", true);

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



//  leer_identre, lc_ver_si_se_selecciono_id_entre, leer_identre, leer_descripcion_entre, leer_nro_entrenamiento, leer_inicio_entrenamiento, leer_fin_entrenamiento,  leer_institucion_entrenamiento, leer_observacion_entrenamiento 




function leer_entrenamiento_mostrarlo_en_etiqueta() {
    "use strict";
    leer_identre = $('#slt_entrenamiento_registrado  option:selected').attr('id');
    lc_ver_si_se_selecciono_id_entre = (typeof leer_identre === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_id_entre === '1') {
        leer_identre = $('#slt_entrenamiento_registrado  option:selected').attr('id');
        leer_id_entre = $('#slt_entrenamiento_registrado  option:selected').attr('nro_id_eecc');
        leer_descripcion_entre = $('#slt_entrenamiento_registrado  option:selected').attr('descripcion');
        leer_nro_entrenamiento = $('#slt_entrenamiento_registrado  option:selected').attr('nro_eecc');
        leer_inicio_entrenamiento = $('#slt_entrenamiento_registrado  option:selected').attr('inicio');
        leer_fin_entrenamiento = $('#slt_entrenamiento_registrado  option:selected').attr('fin');
        leer_institucion_entrenamiento = $('#slt_entrenamiento_registrado  option:selected').attr('institucion');
        leer_observacion_entrenamiento = $('#slt_entrenamiento_registrado  option:selected').attr('observacion');



        $("#txt_descripcion_entrenamiento").val(leer_descripcion_entre);
        $("#fecha_inicio_entrenamiento").val(leer_inicio_entrenamiento);
        $("#fecha_fin_entrenamiento").val(leer_fin_entrenamiento);

        $("#nro_entrenamiento").val(leer_nro_entrenamiento);

        $("#nombre_institucion_entrenamiento").val(leer_institucion_entrenamiento);
        $("#observacion_entrenamiento").val(leer_observacion_entrenamiento);

        $("#btn_grabar_datos_entrenamiento").attr("disabled", false);
        $("#btn_eliminar_entrenamiento").attr("disabled", false);




    } else {
        $("#btn_grabar_datos_entrenamiento").attr("disabled", true);
        $("#btn_eliminar_entrenamiento").attr("disabled", true);

    }
    $("#btn_grabar_datos_entrenamiento").attr("disabled", true);
}



function eliminar_registro_entrenamiento(leer_identre) {
    "use strict";
    datos_eliminar_entre = {
        'id_entre': leer_identre
    };
    $.ajax({
        data: datos_eliminar_entre,
        dataType: 'json',
        url: url + 'cas/eliminar_entrenamiento_cas',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_entrenamiento").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_entrenamiento").html("");
            inicializar_etiquetas_entrenamiento();
            listar_todos_los_entrenamientos();
            lc_tipo_table_en = 'En';
            ver_tipos_entrenamientos_por_cas(leer_idpersonal, lc_tipo_table_en);
            $("#btn_grabar_datos_entrenamiento").attr("disabled", false);
            $("#btn_eliminar_entrenamiento").attr("disabled", true);

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
    inicializar_etiquetas_entrenamiento();
    listar_todos_los_entrenamientos();




    $("#slt_entrenamiento_registrado")
        .click(function () {
            leer_entrenamiento_mostrarlo_en_etiqueta();
        })
        .keyup(function () {
            leer_entrenamiento_mostrarlo_en_etiqueta();
        });


    $("#btn_agregar_entrenamiento").click(function () {
        inicializar_etiquetas_entrenamiento();
        listar_todos_los_entrenamientos();

        $("#slc_todo_entrenamiento")
            .attr("disabled", false)
            .focus();
    });



    $("#btn_eliminar_entrenamiento").click(function () {
        eliminar_registro_entrenamiento(leer_identre);
    });

    // ln_idcapa, lc_descripcion_capacitacion
    $("#slc_todo_entrenamiento").change(function () {
        ln_id_entre = $('#slc_todo_entrenamiento   option:selected').attr('id');
        leer_descripcion_entre = $('#slc_todo_entrenamiento  option:selected').attr('descripcion');
        $('#txt_descripcion_capacitacion').val(leer_descripcion_entre);
        $('#fecha_inicio_entrenamiento')
            .attr("disabled", false)
            .focus();
    });



    $('#fecha_inicio_entrenamiento').change(function () {
        leer_inicio_entrenamiento = $('#fecha_inicio_entrenamiento').val();
        $('#fecha_fin_entrenamiento')
            .attr("disabled", false)
            .focus();
    });

    $('#fecha_fin_entrenamiento').change(function () {
        lc_fecha_inicio_entrenamiento = convertir_fecha_caracter_a_date($('#fecha_inicio_entrenamiento').val());
        lc_fecha_fin_entrenamiento = convertir_fecha_caracter_a_date($('#fecha_fin_entrenamiento').val());
        if (lc_fecha_fin_entrenamiento >= lc_fecha_inicio_entrenamiento) {
            $("#msj_entrenamiento").html('');
            $("#nro_entrenamiento")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_entrenamiento").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#nro_entrenamiento")
                .attr("disabled", true);
        }

    });


    $("#nro_entrenamiento")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })

    .keypress(function (e) {
            $('#nombre_institucion_entrenamiento').attr("disabled", false);
            if (e.which === 13) {
                $('#nombre_institucion_entrenamiento').focus();
            }
        })
        .click(function () {
            $('#nombre_institucion_entrenamiento').attr("disabled", false);
        });


    $('#nombre_institucion_entrenamiento')
        .keypress(function (e) {
            $('#observacion_entrenamiento').attr("disabled", false);
            $("#btn_grabar_datos_entrenamiento").attr("disabled", false);
            if (e.which === 13) {
                $('#observacion_entrenamiento').focus();
            }
        })
        .click(function () {
            $('#observacion_entrenamiento').attr("disabled", false);
            $("#btn_grabar_datos_entrenamiento").attr("disabled", false);
        });


    $("#btn_grabar_datos_entrenamiento").click(function () {
        // leer_idpersonal
        // leer_identre

        leer_inicio_entrenamiento = $("#fecha_inicio_entrenamiento").val();
        leer_fin_entrenamiento = $("#fecha_fin_entrenamiento").val();
        leer_nro_entrenamiento = $("#nro_entrenamiento").val();
        leer_institucion_entrenamiento = $("#nombre_institucion_entrenamiento").val();
        leer_observacion_entrenamiento = $("#observacion_entrenamiento").val();
    grabar_registro_entrenamiento(leer_idpersonal, lc_tipo_table_en, ln_id_entre, leer_inicio_entrenamiento, leer_fin_entrenamiento, leer_nro_entrenamiento, leer_institucion_entrenamiento, leer_observacion_entrenamiento);
        
    });






});
