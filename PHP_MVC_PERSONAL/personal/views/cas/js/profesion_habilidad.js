// ln_idenficador_habilidad, lc_ver_si_tiene_id, lc_fecha_inicio_habilidad, lc_fecha_fin_habilidad, lc_nro_habilidad 


function inicializar_botones_habilidad_profesional() {
    "use strict";
    $("#slt_habilidad_profesional")
        .attr("disabled", true);


    $("#btn_eliminar_habilidad").attr("disabled", true);

    $("#fecha_inicio_habilitacion")
        .attr("disabled", true)
        .val('');
    $("#fecha_fin_habilitacion")
        .attr("disabled", true)
        .val('');
    $("#nro_de_habilitacion")
        .attr("disabled", true)
        .val('');

    $("#btn_grabar_habilidad").attr("disabled", true);


}






function leer_habilidad_profesional_y_mostrarlo() {
    "use strict";
    ln_idenficador_habilidad = $('#slt_habilidad_profesional  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof ln_idenficador_habilidad === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        lc_fecha_inicio_habilidad = $('#slt_habilidad_profesional  option:selected').attr('inicio');
        lc_fecha_fin_habilidad = $('#slt_habilidad_profesional  option:selected').attr('fin');
        lc_nro_habilidad = $('#slt_habilidad_profesional  option:selected').attr('nro_habilidad');
        $("#fecha_inicio_habilitacion").val(lc_fecha_inicio_habilidad, );
        $("#fecha_fin_habilitacion").val(lc_fecha_fin_habilidad);
        $("#nro_de_habilitacion").val(lc_nro_habilidad);
        $("#btn_agregar_habilidad").attr("disabled", false);
        $("#btn_eliminar_habilidad").attr("disabled", false);
        $("#btn_grabar_habilidad").attr("disabled", true);

    } else {
        $("#fecha_inicio_habilitacion").val('');
        $("#fecha_fin_habilitacion").val('');
        $("#nro_de_habilitacion").val('');
        $("#btn_agregar_habilidad").attr("disabled", true);
        $("#btn_eliminar_habilidad").attr("disabled", true);
        $("#btn_grabar_habilidad").attr("disabled", true);
    }

}

function grabar_habilidad_de_carrera_personal_tercero(ln_idenficador_carrera, lc_fecha_inicio_habilidad, lc_fecha_fin_habilidad, lc_nro_habilidad) {
    "use strict";
    datos_grabar_habilidad_por_carrera = {
        'idcarrera': ln_idenficador_carrera,
        'inicio': lc_fecha_inicio_habilidad,
        'fin': lc_fecha_fin_habilidad,
        'nro': lc_nro_habilidad
    };
    $.ajax({
        data: datos_grabar_habilidad_por_carrera,
        dataType: 'json',
        url: url + 'personal/personal_tercero_grabar_carrera_habilidad',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_carrera_habilidad").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_grabacion_carrera_habilidad").html('');
            $("#msj_grabacion_habilidad").html('');
            ver_habilidades_por_carrera(ln_idenficador_carrera);
            $("#fecha_inicio_habilitacion").val('');
            $("#fecha_fin_habilitacion").val('');
            $("#nro_de_habilitacion")
                .attr("disabled", true)
                .val('');
            $("#btn_agregar_habilidad").attr("disabled", false);
            $("#btn_eliminar_habilidad").attr("disabled", true);
            $("#btn_grabar_habilidad").attr("disabled", true);


        }
    });

}



function eliminar_habilidad_personal_tercero(ln_idenficador_habilidad) {
    "use strict";
    datos_eliminar_habil_tercero = {
        'id': ln_idenficador_habilidad
    };

    $.ajax({
        data: datos_eliminar_habil_tercero,
        dataType: 'json',
        url: url + 'personal/personal_tercero_eliminar_habilidad',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_carrera_habilidad").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function () {
            $("#espera_grabacion_carrera_habilidad").html('');
            ver_habilidades_por_carrera(ln_idenficador_carrera);
            $("#fecha_inicio_habilitacion").val('');
            $("#fecha_fin_habilitacion").val('');
            $("#nro_de_habilitacion")
                .attr("disabled", true)
                .val('');
            $("#btn_agregar_habilidad").attr("disabled", false);

            $("#btn_eliminar_habilidad").attr("disabled", true);
            $("#btn_grabar_habilidad").attr("disabled", true);


        }
    });

}



function verificar_fecha_habilidad_si_existe(leer_ideducacion, lc_fecha_inicio) {
    "use strict";
    datos_buscar_habilidad_fin = {
        'ideducacion': leer_ideducacion,
        'fecha_inicio': lc_fecha_inicio
    };
    $.ajax({
        data: datos_buscar_habilidad_fin,
        dataType: 'json',
        url: url + 'cas/verificar_fecha_habilidad_si_esta_registrado',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#msj_habilidad").html('<center><font size="-1" color="#F8063A"> Fecha de habilidad ya existe </font></center>')
                    $('#fecha_fin_habilitacion').attr("disabled", true);
                } else {
                    $("#msj_habilidad").html('');
                    $('#fecha_fin_habilitacion')
                        .attr("disabled", false)
                        .focus();

                }
            });
        }
    });
}


function grabar_habilidad_de_carrera_personal_cas(leer_ideducacion, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad) {
 "use strict";
  datos_de_grabacion_habilidad = {
        'ideducacion': leer_ideducacion,
        'fecha_inicio': lc_fecha_inicio,
        'fecha_fin': lc_fecha_fin,
        'nro_habilidad': lc_nro_habilidad,
    };
    $.ajax({
        data: datos_de_grabacion_habilidad,
        dataType: 'json',
        url: url + 'cas/grabar_registro_de_habilidad',
        type: 'post',
        beforeSend: function () {
             $("#msj_grabacion_habilidad")
                 .html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>")
                 .show();
        },
        success: function () {
            leer_carrera_mostrar_habilidades(leer_ideducacion);
             $("#msj_grabacion_habilidad")
                 .html('<center><font size="-1" color="#091CEF"> Grabacion conforme </font></center>')
                 .hide(2500);
            inicializar_botones_habilidad_profesional();
        }
    });


}

function leer_habilidad_profesional_y_mostrarlo() {
    "use strict";
    ln_idenficador_habilidad = $('#slt_habilidad_profesional  option:selected').attr('id');
    lc_ver_si_tiene_id = (typeof ln_idenficador_habilidad === 'undefined') ? '' : '1';
    if (lc_ver_si_tiene_id === '1') {
        ln_idenficador_habilidad = $('#slt_habilidad_profesional  option:selected').attr('id');
        lc_fecha_inicio = $('#slt_habilidad_profesional  option:selected').attr('fecha_inicio');
        lc_fecha_fin = $('#slt_habilidad_profesional  option:selected').attr('fecha_fin');
        lc_nro_habilidad = $('#slt_habilidad_profesional  option:selected').attr('nro_habilidad');
        $("#fecha_inicio_habilitacion").val(lc_fecha_inicio);
        $("#fecha_fin_habilitacion").val(lc_fecha_fin);
        $("#nro_de_habilitacion").val(lc_nro_habilidad);
        $("#btn_agregar_habilidad").attr("disabled", false);
        $("#btn_eliminar_habilidad").attr("disabled", false);
        $("#btn_grabar_habilidad").attr("disabled", true);

    } else {
        $("#fecha_inicio_habilitacion").val('');
        $("#fecha_fin_habilitacion").val('');
        $("#nro_de_habilitacion").val('');
        $("#btn_agregar_habilidad").attr("disabled", true);
        $("#btn_eliminar_habilidad").attr("disabled", true);
        $("#btn_grabar_habilidad").attr("disabled", true);
    }

}




function eliminar_habilidad_personal_cas(ln_idenficador_habilidad) {
    "use strict";
    datos_eliminar_habil_cas = {
        'id': ln_idenficador_habilidad
    };

    $.ajax({
        data: datos_eliminar_habil_cas,
        dataType: 'json',
        url: url + 'cas/personal_cas_eliminar_habilidad',
        type: 'post',
        beforeSend: function () {
           $("#msj_grabacion_habilidad")
                 .html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>")
                 .show();
        },
        success: function () {
            leer_carrera_mostrar_habilidades(leer_ideducacion);
             $("#msj_grabacion_habilidad")
                 .html('<center><font size="-1" color="#091CEF"> Eliminacion conforme...</font></center>')
                 .hide(3500);
            inicializar_botones_habilidad_profesional();
            


        }
    });

}







$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();

    /* inicio CRUD habilitacion */

    inicializar_botones_habilidad_profesional();
    $("#slt_habilidad_profesional")
        .click(function () {
            leer_habilidad_profesional_y_mostrarlo();
        })
        .keyup(function () {
            leer_habilidad_profesional_y_mostrarlo();
        });


    $("#btn_agregar_habilidad").click(function () {
        lc_tipo_operacion_habilidad = '1';
        $('#fecha_inicio_habilitacion')
            .attr("disabled", false)
            .focus();
        $('#fecha_fin_habilitacion').val('');
        $("#nro_de_habilitacion")
            .attr("disabled", true)
            .val('');
        $("#btn_grabar_habilidad").attr("disabled", true);
    });


    $("#btn_eliminar_habilidad").click(function () {
        eliminar_habilidad_personal_cas(ln_idenficador_habilidad);
        
    });




    $('#fecha_inicio_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Inicio habilitacion"
    }).on('show', function () {

    });


    $('#fecha_fin_habilitacion').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        placeholder: "Fecha Fin habilitacion"
    }).on('show', function () {

    });

    // lc_fecha_inicio 
    $('#fecha_inicio_habilitacion').change(function () {
        lc_fecha_inicio = $('#fecha_inicio_habilitacion').val();
        verificar_fecha_habilidad_si_existe(leer_ideducacion, lc_fecha_inicio);
    });



    $('#fecha_fin_habilitacion').change(function () {
        lc_fecha_fin = $('#fecha_fin_habilitacion').val();
        lc_fecha_inicio_comparar = convertir_fecha_caracter_a_date(lc_fecha_inicio);
        lc_fecha_fin_comparar = convertir_fecha_caracter_a_date(lc_fecha_fin);

        if (lc_fecha_fin_comparar > lc_fecha_inicio_comparar) {
            $("#msj_habilidad").html('');
            $("#nro_de_habilitacion")
                .attr("disabled", false)
                .focus();
        } else {
            $("#msj_habilidad").html('<center><strong><font size="-1" color="#F40007">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#nro_de_habilitacion")
                .attr("disabled", true);
        }


    });

    $('#nro_de_habilitacion').keyup(function () {
        if ($('#nro_de_habilitacion').val().length < 3) {
            $("#msj_grabacion_habilidad").html('<center><font size="-1" color="#EF6000">Minimo 3 caracteres</font></center>');
            $('#btn_grabar_habilidad').attr("disabled", true);
        } else {
            $("#msj_grabacion_habilidad").html('<center><font size="-1" color="#EF6000">Conforme...</font></center>');
            $('#btn_grabar_habilidad').attr("disabled", false);
        }

    });

    $("#btn_grabar_habilidad").click(function () {
        $("#msj_habilidad").html('');
        lc_nro_habilidad = $('#nro_de_habilitacion').val();
        if (lc_tipo_operacion_habilidad === '1') {
            grabar_habilidad_de_carrera_personal_cas(leer_ideducacion, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad);
        } else {
            //  grabar_modificacion_habilidad_por_carrera_profesional(ln_idenficador_habilidad, lc_fecha_inicio, lc_fecha_fin, lc_nro_habilidad);
        }
    });





    /* inicio de especialidad */
    
    
  
    
    /* fin de especialidad */
    
    






});
