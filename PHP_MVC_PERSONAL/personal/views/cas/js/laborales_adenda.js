var url = 'http://' + document.domain + '/rrhh/personal/',
    lc_tipo_operacion_adenda, cantidad_registros, leer_id_contrato, lc_ver_si_se_selecciono_aden, leer_idadenda, lc_ver_si_se_selecciono_aden, lc_ver_si_se_selecciono_aden, leer_idadenda, leer_nro_adenda, leer_nro_contrato, leer_nro_adenda_contrato, leer_estado_adenda, leer_fecha_inicio, leer_fecha_fin, dato_verificar_adenda, dato_grabar_adenda_mod, dato_elim_adenda, dato_listar_adenda, leer_id_unidad_adenda, lc_unidad_organica_adenda, lc_idorgano_adenda, lc_organo_adenda, dato_grabar_adenda_final, leer_descripcion_estado_adenda, leer_idunidad_adenda, leer_unidad_organica_adenda, leer_organo_adenda, leer_nro_contrato_para_adenda;


// leer_nro_contrato


function leer_adendas_mostrar_datos() {
    "use strict";
    leer_idadenda = $('#slc_contratos_adendas  option:selected').attr('id');
    lc_ver_si_se_selecciono_aden = (typeof leer_idadenda === 'undefined') ? '' : '1';
    if (lc_ver_si_se_selecciono_aden === '1') {
        leer_idadenda = $('#slc_contratos_adendas  option:selected').attr('id');
        leer_id_contrato = $('#slc_contratos_adendas  option:selected').attr('idcontrato');
        leer_nro_adenda = $('#slc_contratos_adendas  option:selected').attr('nro_adenda');
        leer_nro_contrato = $('#slc_contratos_adendas  option:selected').attr('nro_contrato');
        leer_estado_adenda = $('#slc_contratos_adendas  option:selected').attr('estado_adenda');
        leer_fecha_inicio = $('#slc_contratos_adendas  option:selected').attr('fecha_inicio');
        leer_fecha_fin = $('#slc_contratos_adendas  option:selected').attr('fecha_fin');
        leer_descripcion_estado_adenda = $('#slc_contratos_adendas  option:selected').attr('descripcion_estado_adenda');
        leer_idunidad_adenda = $('#slc_contratos_adendas  option:selected').attr('idunidad');
        leer_unidad_organica_adenda = $('#slc_contratos_adendas  option:selected').attr('unidad_organica');
        leer_organo_adenda = $('#slc_contratos_adendas  option:selected').attr('organo');
        $("#btn_agregar_adenda").attr("disabled", false);
        $("#btn_modificar_adenda").attr("disabled", false);
        $("#btn_eliminar_adenda").attr("disabled", false);
        $("#msj_estado_adenda").text('');
        
        $("#fecha_inicio_adenda").val(leer_fecha_inicio);
        $("#fecha_fin_adenda").val(leer_fecha_fin);
        $("#txt_nro_adenda").val(leer_nro_adenda);
        $("#txt_descripcion_upss_adenda").val(leer_unidad_organica_adenda  + ' -- ' + leer_organo_adenda);
        
        $("#fecha_inicio_adenda").attr("disabled", true);
        $("#fecha_fin_adenda").attr("disabled", true);
        $("#slt_servicio_upss_adenda").attr("disabled", true);
        $("#txt_nro_adenda").attr("disabled", true);
        
        
        if (leer_estado_adenda === 'V') {
            $("#estado_adenda_0")
                .attr("disabled", true)
                .prop("checked", true);
        } else {
            $("#estado_adenda_1")
                .attr("disabled", true)
                .prop("checked", true);
        }
        
        $("#btn_grabar_adenda").attr("disabled", true);
        $("#btn_reporte_adenda").attr("disabled", false);



    } else {
        inicilizar_etiquetas_adendas();
    }
}


 


function listar_unidad_organica_de_organo_adenda() {
    "use strict";
    dato_listar_adenda = {
        'id': ''
    };
    $.ajax({
        data: dato_listar_adenda,
        dataType: 'json',
        url: url + 'personal/listar_unidad_organica_total',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            $("#slt_servicio_upss_adenda")
                .html('')
                .show()
                .append('<option id=0> Seleccione </option>');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_servicio_upss_adenda").append('<option id="' + filas.idunidadorganica + '"  unidad_organica = "' + filas.unidad_organica + '"  idorgano = "' + filas.idorgano + '"  organo = "' + filas.organo + '"  >' + filas.unidad_organica + '</option>');

                } else {
                    $("#slt_servicio_upss_adenda").attr("disabled", true);
                }

            });

        }
    });
    $("#slt_servicio_upss_adenda").select2({
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




function inicilizar_etiquetas_adendas() {
    "use strict";

    $("#fecha_inicio_adenda").val('');
     listar_unidad_organica_de_organo_adenda();
    $("#slt_servicio_upss_adenda").attr("disabled", true);
    $("#txt_descripcion_upss_adenda")
        .val('');

    $("#fecha_fin_adenda").val('');
    $("#txt_nro_adenda").val('');
    $("#estado_adenda_0")
        .attr("disabled", true)
        .prop("checked", false);
    $("#estado_adenda_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#btn_agregar_adenda").attr("disabled", false);
    $("#btn_modificar_adenda").attr("disabled", true);
    $("#btn_eliminar_adenda").attr("disabled", true);
    $("#btn_grabar_adenda").attr("disabled", true);
    $("#btn_reporte_adenda").attr("disabled", true);



}

function limpiar_etiquetas_adendas() {
    "use strict";

    $("#fecha_fin_adenda").val('');
    $("#txt_nro_adenda").val('');
    $("#estado_adenda_0")
        .attr("disabled", true)
        .prop("checked", false);
    $("#estado_adenda_1")
        .attr("disabled", true)
        .prop("checked", false);
    $("#fecha_inicio_adenda")
        .attr("disabled", false)
        .val('')
        .focus();

}


function ver_fecha_inicio_que_no_se_repita_adenda(leer_id_contrato, leer_fecha_inicio) {
    "use strict";
    // ver_fecha_inicio_que_no_se_repita_adenda(leer_id_contrato, leer_fecha_inicio);

    dato_verificar_adenda = {
        'id': leer_id_contrato,
        'fecha': leer_fecha_inicio
    };
    $.ajax({
        data: dato_verificar_adenda,
        dataType: 'json',
        url: url + 'cas/verificar_fecha_adenda',
        type: 'post',
        beforeSend: function () {},
        success: function (datos) {
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#msj_estado_adenda").html('<center><font size="-1" color="#F5000F">Fecha seleccionada debe ser mayor que fecha fin de Adenda Anterior </font></center>');
                    $("#fecha_inicio_adenda")
                        .attr("disabled", false);

                } else {
                    $("#msj_estado_adenda").html('<center><font size="-1" color="#0152F7"> ....  </font></center>');
                    $('#fecha_fin_adenda')
                        .attr("disabled", false)
                        .focus();
                }
            });
        }
    });
}


function grabar_registro_de_adenda(leer_id_contrato, leer_fecha_inicio, leer_fecha_fin, leer_nro_contrato_para_adenda, leer_id_unidad_adenda, leer_nro_adenda_contrato, leer_estado_adenda) {

    "use strict";

    dato_grabar_adenda_final = {
        'id': leer_id_contrato,
        'fecha_inicio': leer_fecha_inicio,
        'fecha_fin': leer_fecha_fin,
        'nro_contrato' : leer_nro_contrato_para_adenda,
        'idunidad_adenda' : leer_id_unidad_adenda,
        'nro_adenda_conrato': leer_nro_adenda_contrato,
        'estado': leer_estado_adenda
    };
    $.ajax({
        data: dato_grabar_adenda_final,
        dataType: 'json',
        url: url + 'cas/grabar_registro_adenda',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicilizar_etiquetas_adendas();
            ver_contratos_y_consultar_adendas(leer_id_contrato);
            ver_contratos_personal_seleccion(leer_idpersonal);
            $('#btn_grabar_contrato').attr("disabled", false);


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


function desabilitar_etiquetas_para_edicion_adenda() {
    "use strict";
    
    $("#slt_servicio_upss_adenda").attr("disabled", false);
    $("#fecha_inicio_adenda").attr("disabled", false);
    $("#fecha_fin_adenda").attr("disabled", false);
    $("#txt_nro_adenda").attr("disabled", false);
    $("#estado_adenda_0")
        .attr("disabled", false);
    $("#estado_adenda_1")
        .attr("disabled", false);
    $("#btn_modificar_adenda").attr("disabled", false);
    $("#btn_grabar_adenda").attr("disabled", false);
    
    
    
    
}

function modificar_registro_de_adenda(leer_idadenda, leer_fecha_inicio, leer_fecha_fin, leer_id_unidad_adenda, leer_nro_adenda_contrato, leer_estado_adenda) {
    "use strict";
    dato_grabar_adenda_mod = {
        'idadenda': leer_idadenda,
        'fecha_inicio': leer_fecha_inicio,
        'fecha_fin': leer_fecha_fin,
        'idunidad_adenda' : leer_id_unidad_adenda,
        'nro_adenda': leer_nro_adenda_contrato,
        'estado': leer_estado_adenda
    };
    $.ajax({
        data: dato_grabar_adenda_mod,
        dataType: 'json',
        url: url + 'cas/modificar_registro_adenda',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicilizar_etiquetas_adendas();
            ver_contratos_y_consultar_adendas(leer_id_contrato);
            $('#btn_grabar_contrato').attr("disabled", false);


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


function eliminar_adenda(leer_idadenda) {

    "use strict";
    dato_elim_adenda = {
        'idadenda': leer_idadenda
    };
    $.ajax({
        data: dato_elim_adenda,
        dataType: 'json',
        url: url + 'cas/eliminar_registro_adenda',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            inicilizar_etiquetas_adendas();
            ver_contratos_y_consultar_adendas(leer_id_contrato);
            $('#btn_grabar_contrato').attr("disabled", false);
 
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
    inicilizar_etiquetas_adendas();
    $("#slc_contratos_adendas")
        .click(function () {
            leer_adendas_mostrar_datos();
        })
        .keyup(function () {
            leer_adendas_mostrar_datos();
        });
    $("#btn_agregar_adenda").attr("disabled", false);


    $("#fecha_inicio_adenda").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio de Adenda"
    }).on('show', function () {

    });

    $("#fecha_fin_adenda").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio de Adenda"
    }).on('show', function () {

    });

    
    $("#btn_mostrar_adenda").click(function () {
        inicilizar_etiquetas_adendas();
        ver_contratos_y_consultar_adendas(leer_id_contrato);
        $('#modal_registrar_adendas').modal({
            show: true,
            backdrop: 'static'
        });
    });



    $("#btn_agregar_adenda").click(function () {
        lc_tipo_operacion_adenda = '1';
        limpiar_etiquetas_adendas();

    });

    $("#btn_modificar_adenda").click(function () {
        lc_tipo_operacion_adenda = '2';
        desabilitar_etiquetas_para_edicion_adenda();

    });


    $("#btn_eliminar_adenda").click(function () {
        eliminar_adenda(leer_idadenda);

    });




    $("#fecha_inicio_adenda").datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-70y",
        autoclose: true,
        placeholder: "Fecha Inicio de Adenda"
    }).on('show', function () {

    });

    $('#fecha_inicio_adenda').change(function () {
        leer_fecha_inicio = $("#fecha_inicio_adenda").val();
        ver_fecha_inicio_que_no_se_repita_adenda(leer_id_contrato, leer_fecha_inicio);

    });

    $('#fecha_fin_adenda').change(function () {
        leer_fecha_inicio = convertir_fecha_caracter_a_date($("#fecha_inicio_adenda").val());
        leer_fecha_fin = convertir_fecha_caracter_a_date($("#fecha_fin_adenda").val());
        if (leer_fecha_fin > leer_fecha_inicio) {
            $("#msj_estado_adenda").html('');
            $("#estado_adenda_0")
                .attr("disabled", false);
            $("#estado_adenda_1")
                .attr("disabled", false);
            $("#slt_servicio_upss_adenda")
                .attr("disabled", false)
                 .focus();
            $("#txt_nro_adenda")
                .attr("disabled", false);
   
        } else {
            $("#msj_estado_adenda").html('<center><strong><font size="-1" color="#D08800">Fecha Fin Menor que fecha Inicio, corregir fechas....</font></strong></center>');
            $("#estado_adenda_0")
                .attr("disabled", true);

            $("#estado_adenda_1")
                .attr("disabled", true);

            $("#txt_nro_adenda")
                .attr("disabled", true);
        }
    });
    
        

    
    
    $("#slt_servicio_upss_adenda").change(function () {
        leer_id_unidad_adenda = $('#slt_servicio_upss_adenda  option:selected').attr('id');
        lc_unidad_organica_adenda = $('#slt_servicio_upss_adenda  option:selected').attr('unidad_organica');
        lc_idorgano_adenda = $('#slt_servicio_upss_adenda  option:selected').attr('idorgano');
        lc_organo_adenda = $('#slt_servicio_upss_adenda  option:selected').attr('organo');
        $("#txt_descripcion_upss_adenda").val(lc_unidad_organica_adenda + ' -- ' + lc_organo_adenda);
        $("#txt_nro_adenda")
                .attr("disabled", false)
                .focus();

    });
    
    

    $("#txt_nro_adenda").keypress(function (e) {
        $("#estado_adenda_0").attr("disabled", false);
        if (e.which === 13) {
            $("#estado_adenda_0").focus();
        }

    });


    $("#estado_adenda_0").click(function () {
        leer_estado_adenda = 'V';
        $('#btn_grabar_adenda').attr("disabled", false);
    });

    $("#estado_adenda_1").click(function () {
        leer_estado_adenda = 'T';
        $('#btn_grabar_adenda').attr("disabled", false);
    });




    $('#btn_grabar_adenda').click(function () {
        // leer_idadenda, leer_id_contrato|
        leer_fecha_inicio = $("#fecha_inicio_adenda").val();
        leer_fecha_fin = $("#fecha_fin_adenda").val();
        leer_nro_adenda_contrato = $("#txt_nro_adenda").val();
        leer_nro_contrato_para_adenda = $("#adenda_del_contrato").text();
        
        
        if (lc_tipo_operacion_adenda === '1') {
            grabar_registro_de_adenda(leer_id_contrato, leer_fecha_inicio, leer_fecha_fin, leer_nro_contrato_para_adenda, leer_id_unidad_adenda, leer_nro_adenda_contrato, leer_estado_adenda);
        } else {
            leer_id_unidad_adenda = (typeof leer_id_unidad_adenda  === 'undefined') ? leer_idunidad_adenda : leer_id_unidad_adenda;
            modificar_registro_de_adenda(leer_idadenda, leer_fecha_inicio, leer_fecha_fin, leer_id_unidad_adenda, leer_nro_adenda_contrato, leer_estado_adenda);

        }

    });








});
