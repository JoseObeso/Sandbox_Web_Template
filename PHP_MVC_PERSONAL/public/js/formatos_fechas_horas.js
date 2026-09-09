var nombre_mes = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
    nombre_dia = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"],
 gd_fecha_total, gd_anio, gn_mes, gn_dia, gn_numero_dia, gn_horas, gn_minutos, gn_segundos, gt_hora_actual, lc_fecha_en_curso_dd_mm_aaaa_real_time, lc_hora_minuto_segundo_real_time, lc_nombres_dia_mes_anio_real_time;

gd_fecha_total = new Date();
gd_anio = gd_fecha_total.getFullYear();
gn_mes = gd_fecha_total.getMonth() + 1;
gn_dia = gd_fecha_total.getDate();
gn_numero_dia = gd_fecha_total.getDay();


gn_horas = gd_fecha_total.getHours();
gn_minutos = gd_fecha_total.getMinutes();
gn_segundos = gd_fecha_total.getSeconds();
gt_hora_actual = gn_horas + ':' + gn_minutos + ':' + gn_segundos;

function dia_mes_anio_real_time() {
    "use strict";
    lc_fecha_en_curso_dd_mm_aaaa_real_time = (('' + gn_dia).length < 2 ? '0' : '') + gn_dia + '/' + (('' + gn_mes).length < 2 ? '0' : '') + gn_mes + '/' + gd_anio;
    return lc_fecha_en_curso_dd_mm_aaaa_real_time;
}

function hora_minuto_segundo_en_curso() {
    "use strict";
    lc_hora_minuto_segundo_real_time = (('' + gn_horas).length < 2 ? '0' : '') + gn_horas + ':' + (('' + gn_minutos).length < 2 ? '0' : '') + gn_minutos + ':' + (('' + gn_segundos).length < 2 ? '0' : '') + gn_segundos;
    return lc_hora_minuto_segundo_real_time;
}


function nombre_dia_mes_anio()
{
    "use strict";
    lc_nombres_dia_mes_anio_real_time = nombre_dia[gn_numero_dia-1] + ', ' + (('' + gn_dia).length < 2 ? '0' : '') + gn_dia + ' DE ' +  nombre_mes[gn_mes]  + ' DEL AÑO ' + gd_anio ;
    return lc_nombres_dia_mes_anio_real_time;
    
    
}
