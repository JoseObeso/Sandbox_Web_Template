var url = 'http://' + document.domain + '/rrhh/estadistica/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    fecha_total, anio, mes, dia, hora, minutos, segundos, hora_total, lc_opcion_trama;

fecha_total = new Date();
anio = fecha_total.getFullYear();
mes = fecha_total.getMonth() + 1;
dia = fecha_total.getDate();
hora = fecha_total.getHours();
minutos = fecha_total.getMinutes();
segundos = fecha_total.getSeconds();
hora_total = hora + ':' + minutos + ':' + segundos;

function desabilitar_radio_button_tramas()
{
    "use strict";
    $("#mes").attr("disabled", true);
    $("#anio").attr("disabled", true);
    $("#tramas_0").attr("disabled", true);
    $("#tramas_1").attr("disabled", true);
    $("#tramas_2").attr("disabled", true);
    $("#btn_procesar").attr("disabled", true);
    
}


function habilitar_radio_button_tramas()
{
    "use strict";
    $("#mes").attr("disabled", false);
    $("#anio").attr("disabled", false);
    $("#tramas_0").attr("disabled", false);
    $("#tramas_1").attr("disabled", false);
    $("#tramas_2").attr("disabled", false);
    $("#btn_procesar").attr("disabled", false);
    
}




$(document).ready(function () {
    "use strict";

    $('.crear-tooltip').tooltip();
    $("#mes").val(mes).attr("selected", "selected");
    $("#anio").val(anio);
    $("input[name=tramas]").click(function () {
        lc_opcion_trama = $('input:radio[name=tramas]:checked').val();
        $("#espera_proceso_tramas").html("");
        $("#btn_procesar").attr("disabled", false);
        
    });
    $("#btn_procesar").click(function () {
        switch (lc_opcion_trama) {
            case '1':
                desabilitar_radio_button_tramas();
                $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Iniciando Trama Egresos (SEEM).<br>No podra realizar ninguna otra operacion,<br>Mientras no termine este proceso... ...</font><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                 setInterval(function () {
                     $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Proceso de Trama de Egreso(SEEM) Culminado...</center><font>");
                      habilitar_radio_button_tramas();
                 }, 5000);
                break;
            case '2':
                desabilitar_radio_button_tramas();
                $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Iniciando Trama Emergencias (SEEM).<br>No podra realizar ninguna otra operacion,<br>Mientras no termine este proceso... </font><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setInterval(function () {
                     $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Proceso de Trama de Emergencia (SEEM) Culminado...</center><font>");
                      habilitar_radio_button_tramas();
                 }, 5000);

                break;
            case '3':
                desabilitar_radio_button_tramas();
                $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Iniciando Trama Consulorios Externos <br>No podra realizar ninguna otra operacion,<br>Mientras no termine este proceso... .</font><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                setInterval(function () {
                     $("#espera_proceso_tramas").html("<font color='#153DF9'><center>Proceso de Consultorio CE Culminado...</center><font>");
                      habilitar_radio_button_tramas();
                 }, 5000);
                
                break;
            default:
                break;
        }
    });

    
    
    


});
