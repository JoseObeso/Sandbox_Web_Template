var url = 'http://' + document.domain + '/tramite/documentos/',
    url_grafico = 'http://' + document.domain + '/tramite/public/gra',
    url_js = 'http://' + document.domain + '/tramite/public/js',
    lc_primer_dia_del_anio = '01/01/' + numero_del_anio(),
    lc_fecha1_vigente = primer_dia_mes_anio_real_time(),
    lc_fecha2_vigente = dia_mes_anio_real_time();


function crear_grafico(ValorX, ValorY, TipoGrafico, Titulo) {

    var xValues = ValorX;
    var yValues = ValorY;


    var barColorsMes = ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];



    new Chart("PrimerGraficoBarras", {
        type: TipoGrafico,
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColorsMes,
                data: yValues

            }]
        },
        options: {
            legend: { display: false },



            title: {
                display: true,
                text: Titulo
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}



function crear_grafico3(ValorX, ValorY, TipoGrafico, Titulo) {

    var xValues = ValorX;
    var yValues = ValorY;


    var barColorsMes = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];


    new Chart("TercerGraficoBarras", {
        type: TipoGrafico,
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColorsMes,
                data: yValues

            }]
        },
        options: {
            legend: { display: false },



            title: {
                display: true,
                text: Titulo
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}



function crear_graficoH(ValorX, ValorY, TipoGrafico, Titulo) {

    var xValues = ValorX;
    var yValues = ValorY;


    var barColorsMes = ["blue", "blue", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];


    new Chart("SegundoGraficoBarras", {
        type: TipoGrafico,
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColorsMes,
                data: yValues

            }]
        },
        options: {
            legend: { display: false },



            title: {
                display: true,
                text: Titulo
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}



function mostrar_grafico_datos_mes() {


    var lc_actor = $("#Titulo_OTD").val(),
        lc_titulo = "";
    if (lc_actor == '0109') {
        lc_titulo = 'EXPEDIENTES INGRESADOS : \n\t' + nombre_del_mes() + ' DEL ' + numero_del_anio();
    } else {
        lc_titulo = 'RECIBIDOS : ' + nombre_del_mes() + ' DEL ' + numero_del_anio();
    }


    var data_fechas_vigentes = { "fecha1": lc_fecha1_vigente, "fecha2": lc_fecha2_vigente };

    $.ajax({
        data: data_fechas_vigentes,
        dataType: 'json',
        url: url + 'inicio/get_recibidos',
        type: 'post',
        beforeSend: function () {
            $("#Nro_resultados").html("<center><strong>Un Momento, por favor, cargando expediente mensual...</strong><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#Nro_resultados").html("");
            var xValuesFechas = [];
            var yValuesTotal = [];
            for (let index = 0; index < datos.length; index++) {
                xValuesFechas.push(datos[index].fecha);
                yValuesTotal.push(datos[index].total);
            }
            crear_grafico(xValuesFechas, yValuesTotal, "bar", lc_titulo);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

}

function mostrar_grafico_datos_anio() {


    var lc_actor = $("#Titulo_OTD").val(),
        lc_titulo = "";
    if (lc_actor == '0109') {
        lc_titulo = "INGRESADOS TODO EL AÑO : " + numero_del_anio();

    } else {
        lc_titulo = "RECIBIDOS TODO EL AÑO : " + numero_del_anio();
    }






    var data_anios_vigentes = { "anio": numero_del_anio() };

    $.ajax({
        data: data_anios_vigentes,
        dataType: 'json',
        url: url + 'inicio/get_recibidos_anio',
        type: 'post',
        beforeSend: function () {
            $("#Nro_resultados2").html("<center><strong>Un Momento, por favor, <br>cargando expedientes de todo el año...</strong><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {

            $("#Nro_resultados2").html("");
            var xValuesFechas = [];
            var yValuesTotal = [];
            for (let index = 0; index < datos.length; index++) {
                xValuesFechas.push(datos[index].mes);
                yValuesTotal.push(datos[index].total);
            }
            crear_graficoH(xValuesFechas, yValuesTotal, "horizontalBar", lc_titulo);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });

}


function mostrar_grafico_expedientes_tramite() {

    var lc_actor = $("#Titulo_OTD").val(),
        lc_titulo = "";

    if (lc_actor == '0109') {
        lc_titulo = 'EXPEDIENTES NO ENTREGADOS :\n\t' + nombre_del_mes() + ' DEL ' + numero_del_anio();
    } else {
        lc_titulo = 'EN TRAMITE O NO RECIBIDOS :\n\t' + nombre_del_mes() + ' DEL ' + numero_del_anio();
    }



    var data_fechas_vigentes = { "fecha1": lc_fecha1_vigente, "fecha2": lc_fecha2_vigente };

    $.ajax({
        data: data_fechas_vigentes,
        dataType: 'json',
        url: url + 'inicio/get_en_tramite',
        type: 'post',
        beforeSend: function () {
            $("#Nro_resultados3").html("<center><strong>Un Momento, por favor, cargando expedientes en Tramite...</strong><br><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
        },
        success: function (datos) {
            $("#Nro_resultados3").html("");
            var xValuesFechas = [];
            var yValuesTotal = [];
            for (let index = 0; index < datos.length; index++) {
                xValuesFechas.push(datos[index].fecha);
                yValuesTotal.push(datos[index].total);
            }
            crear_grafico3(xValuesFechas, yValuesTotal, "bar", lc_titulo);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error, Revisar consola ');
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
    $('.crear-tooltip').tooltip();
    mostrar_grafico_datos_mes();
    mostrar_grafico_datos_anio();
    mostrar_grafico_expedientes_tramite();





});