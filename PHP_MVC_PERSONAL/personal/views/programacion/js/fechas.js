var url = 'http://' + document.domain + '/rrhh/personal/',
    // url_grafico = 'http://' + document.domain + '/rrhh/public/gra', */
    ln_meses, lc_fecha_inicial, lc_fecha_final, ln_dias, lc_fecha_inicial_registro, lc_fecha_final_registro, ln_meses_seleccionado, lc_fecha_inicio_programacion, lc_fecha_fin_programacion, ln_dias_seleccionado, lc_dias_registro_inicio, lc_dias_registro_fin, leer_idperiodo_registrado;

$('#txt_inicio_fecha').datepicker({
    format: 'dd/mm/yyyy',
    /* startDate: "-70y",
    endDate: "-18y", */
    autoclose: true,
    placeholder: "Inicio de Fecha de Programacion",
}).on('show', function () {});


$('#txt_inicio_registro').datepicker({
    format: 'dd/mm/yyyy',
    /* startDate: "-70y",
    endDate: "-18y", */
    autoclose: true,
    placeholder: "Inicio de Fecha de Programacion",
}).on('show', function () {});



function sumar_restar_fechas(fecha, intervalo, dma, separador) {
    "use strict";
    separador = separador || "-";
    var arrayFecha = fecha.split(separador);
    var dia = arrayFecha[0];
    var mes = arrayFecha[1];
    var anio = arrayFecha[2];

    var fechaInicial = new Date(anio, mes - 1, dia);
    var fechaFinal = fechaInicial;
    if (dma === "m" || dma === "M") {
        fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
    } else if (dma === "y" || dma === "Y") {
        fechaFinal.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
    } else if (dma === "d" || dma === "D") {
        fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
    } else {
        return fecha;
    }
    dia = fechaFinal.getDate();
    mes = fechaFinal.getMonth() + 1;
    anio = fechaFinal.getFullYear();

    dia = (dia.toString().length === 1) ? "0" + dia.toString() : dia;
    mes = (mes.toString().length === 1) ? "0" + mes.toString() : mes;

    return dia + "/" + mes + "/" + anio;
}



function ver_resultado_fecha() {
    "use strict";
    ln_meses = $("#meses").val();
    lc_fecha_inicial = $('#txt_inicio_fecha').val();
    lc_fecha_final = sumar_restar_fechas(lc_fecha_inicial, ln_meses, "m", "/");
    $('#txt_fecha_fin').val(lc_fecha_final);

}


function ver_resultado_dias() {
    "use strict";
    ln_dias = $("#dias").val();
    lc_fecha_inicial_registro = $('#txt_inicio_registro').val();
    lc_fecha_final_registro = sumar_restar_fechas(lc_fecha_inicial_registro, ln_dias, "d", "/");
    $('#txt_fin_registro').val(lc_fecha_final_registro);
    $("#btn_grabar_fechas").attr("disabled", false);
}


function grabar_fechas_programacion_registro(ln_meses_seleccionado, lc_fecha_inicio_programacion, lc_fecha_fin_programacion, ln_dias_seleccionado, lc_dias_registro_inicio, lc_dias_registro_fin) {
    "use strict";
    var data_fechas_programacion = {
        'mes': ln_meses_seleccionado,
        'fecha_inicio_programacion': lc_fecha_inicio_programacion,
        'fecha_fin_programacion': lc_fecha_fin_programacion,
        'dias': ln_dias_seleccionado,
        'fecha_registro_inicio': lc_dias_registro_inicio,
        'fecha_registro_fin': lc_dias_registro_fin
    };

    $.ajax({
        data: data_fechas_programacion,
        dataType: 'json',
        url: url + 'programacion/registrar_fechas_programacion_registro',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            mostrar_fechas_programacion();
            $("#btn_grabar_fechas").attr("disabled", true);
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



}


function mostrar_fechas_programacion() {
    "use strict";

    var data_fecha = {
        'fecha': ''
    };


    $.ajax({
        data: data_fecha,
        dataType: 'json',
        url: url + 'programacion/ver_fechas_programacion',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            console.log("mostrar");
            $("#slt_periodos_registrados").html("");
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_periodos_registrados").append('<option id="' + filas.id + '"  indicador = "' + filas.indicador + '" meses = "' + filas.meses + '" fecha_inicio_programacion = "' + filas.fecha_inicio_programacion + '"  fecha_fin_programacion = "' + filas.fecha_fin_programacion + '" dias = "' + filas.dias + '" fecha_inicio_registro = "' + filas.fecha_inicio_registro +'"  fecha_fin_registro = "' + filas.fecha_fin_registro  + '"  >'  +  filas.indicador + ' &nbsp;|&nbsp; ' + filas.fecha_inicio_programacion + ' &nbsp;|&nbsp; ' + filas.fecha_fin_programacion + ' &nbsp;|&nbsp; ' + filas.meses + ' &nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + filas.fecha_inicio_registro + ' &nbsp;|&nbsp; ' + filas.fecha_fin_registro + ' &nbsp;|&nbsp; ' + filas.dias + '</option>');
                        $("#slt_periodos_registrados").attr("disabled", false);


                    } else {
                        $("#slt_periodos_registrados").attr("disabled", true);
                        

                    }

                });
            } else {
                $("#select_personal_cas_existente").attr("disabled", true);
            }
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


}



function eliminar_periodo_registrado(leer_idperiodo_registrado){
    "use strict";
    var data_idperiodo = {
        'idperiodo': leer_idperiodo_registrado
    };

    $.ajax({
        data: data_idperiodo,
        dataType: 'json',
        url: url + 'programacion/eliminar_data_periodos_registrados',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            mostrar_fechas_programacion();
            $("#btn_eliminar_registrados").attr("disabled", true);
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

    
}


function aperturar_periodo(leer_idperiodo_registrado){
    
    "use strict";
    var data_aperturar = {
         'idperiodo': leer_idperiodo_registrado
    };

    $.ajax({
        data: data_aperturar,
        dataType: 'json',
        url: url + 'programacion/aperturar_periodo',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            mostrar_fechas_programacion();
            $("#btn_aperturar").attr("disabled", true);

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
    
}





$(document).ready(function () {
    "use strict";
    mostrar_fechas_programacion();
    $("#meses")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keyup(function () {
            var ln_digito_meses = $("#meses").val().length;
            if (ln_digito_meses <= 2) {
                var ln_valor = $("#meses").val();
                if (ln_valor >= 1 || ln_valor >= 12) {
                    ver_resultado_fecha();
                } else {
                    console.log('Fuera de rango' + ln_valor);
                }
            } else {
                console.log('mas de dos digitos');
                var ln_valor2;
                if (ln_valor2 >= 1 || ln_valor2 >= 12) {
                    console.log('valor conforme : ' + ln_valor2);
                } else {
                    console.log('Fuera de rango' + ln_valor2);
                }

                $("#meses")
                    .val('1')
                    .focus();
            }
        })
        .click(function () {
            ver_resultado_fecha();
        });

    $("#txt_inicio_fecha").change(function () {
        ver_resultado_fecha();

    });

    $("#dias")
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        })
        .keypress(function () {
            ver_resultado_dias();
        })
        .click(function () {
            ver_resultado_dias();
        });




    $("#txt_inicio_registro").change(function () {
        ver_resultado_dias();
    });







    $("#btn_grabar_fechas").click(function () {
        ln_meses_seleccionado = $("#meses").val();
        lc_fecha_inicio_programacion = $("#txt_inicio_fecha").val();
        lc_fecha_fin_programacion = $('#txt_fecha_fin').val();
        ln_dias_seleccionado = $("#dias").val();
        lc_dias_registro_inicio = $("#txt_inicio_registro").val();
        lc_dias_registro_fin = $("#txt_inicio_registro").val();
        grabar_fechas_programacion_registro(ln_meses_seleccionado, lc_fecha_inicio_programacion, lc_fecha_fin_programacion, ln_dias_seleccionado, lc_dias_registro_inicio, lc_dias_registro_fin);


    });



   $("#slt_periodos_registrados").change(function(){
       leer_idperiodo_registrado = $('#slt_periodos_registrados  option:selected').attr('id');   
       $("#btn_eliminar_registrados").attr("disabled", false);     
       $("#btn_aperturar").attr("disabled", false);     
       
       
   });
    
    $("#btn_eliminar_registrados").click(function(){
       eliminar_periodo_registrado(leer_idperiodo_registrado); 
        
    });
    
    
    $("#btn_aperturar").click(function(){
        
        aperturar_periodo(leer_idperiodo_registrado);
        
    });
    
   
    








});
