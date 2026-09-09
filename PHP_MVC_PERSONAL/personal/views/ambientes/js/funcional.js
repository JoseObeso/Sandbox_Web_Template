var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_pisos, leer_idpisos, leer_bloques, leer_idbloque, dato_listar_bloques, leer_area_funcional, lc_operacion_area_funcional, leer_idarea_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos;

function listar_pisos_fisico() {
    "use strict";
    var datos_listar_pisos = {
        "piso": ''
    };
    $.ajax({
        data: datos_listar_pisos,
        dataType: 'json',
        url: url + 'ambientes/listar_pisos_registrados',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga").html("");
            $("#slt_lista_pisos")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_pisos").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_pisos").attr("disabled", false);
                    } else {
                        $("#slt_lista_pisos")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_pisos").empty();
            }
        }
    });
}


function leer_pisos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
    var lc_ver_si_seleccion_idpiso = (typeof leer_idpisos === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idpiso === '1') {
        leer_idpisos = $('#slt_lista_pisos option:selected').attr('id');
        leer_pisos = $('#slt_lista_pisos option:selected').attr('descripcion');
        $('#txt_area_funcional')
            .attr("disabled", true)
            .val('');
    
        listar_bloques_de_pisos(leer_idpisos);
        
    } else {}

}

function listar_bloques_de_pisos(leer_idpisos) {
    "use strict";
    dato_listar_bloques = {
        'idpiso': leer_idpisos
    };
    $.ajax({
        data: dato_listar_bloques,
        dataType: 'json',
        url: url + 'ambientes/listar_bloques_totales_de_pisos',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_bloques").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_bloques").html("");
            $("#slt_lista_bloques")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_bloques").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_bloques").attr("disabled", false);
                    } else {
                        $("#slt_lista_bloques")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_bloques").empty();
            }
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

    $("#slt_lista_bloques").select2({
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

function listar_bloques_mostrarlo_en_etiquetas() {
    "use strict";
    leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
    var lc_ver_si_seleccion_idbloque = (typeof leer_idbloque === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idbloque === '1') {
        leer_idbloque = $('#slt_lista_bloques option:selected').attr('id');
        leer_bloques = $('#slt_lista_bloques option:selected').attr('descripcion');
        leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque);
        $('#btn_agregar_area_funcional').attr("disabled", false);
    } else {

    }

}

function leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque) {
    "use strict";
    var data_bloque_funcional = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: data_bloque_funcional,
        dataType: 'json',
        url: url + 'ambientes/listar_areas_funcionales',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_funcionales").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_funcionales").html("");
            $("#slt_lista_funcionales").html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_funcionales").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_funcionales").attr("disabled", false);
                    } else {
                        $("#slt_lista_funcionales")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_funcionales").empty();
            }
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

function grabar_area_funcional(leer_idpisos, leer_idbloque, leer_area_funcional) {
    "use strict";
    var data_grabar_area_funcional = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque,
        'area_funcional': leer_area_funcional
    };
    $.ajax({
        data: data_grabar_area_funcional,
        dataType: 'json',
        url: url + 'ambientes/grabar_area_funcional_bloque_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_funcionales").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#txt_area_funcional').attr("disabled", true);
            $('#btn_grabar_area_funcional').attr("disabled", true);
            $('#btn_grabar_area_funcional').attr("disabled", true);
            $('#btn_modificar_area_funcional').attr("disabled", true);
            $('#btn_eliminar_area_funcional').attr("disabled", true);

            leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque);

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

function modificar_area_funcional(leer_idarea_funcional, leer_area_funcional) {

    "use strict";
    var data_modificar_area_funcional = {
        'idarea': leer_idarea_funcional,
        'area_funcional': leer_area_funcional
    };
    $.ajax({
        data: data_modificar_area_funcional,
        dataType: 'json',
        url: url + 'ambientes/modificar_area_funcional_bloque_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_funcionales").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#txt_area_funcional').attr("disabled", true);
            $('#btn_grabar_area_funcional').attr("disabled", true);
            $('#btn_modificar_area_funcional').attr("disabled", true);
            $('#btn_eliminar_area_funcional').attr("disabled", true);

            leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque);

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

function leer_area_funcional_y_mostrarlo() {
    "use strict";
    leer_idarea_funcional = $('#slt_lista_funcionales option:selected').attr('id');
    var lc_ver_si_seleccion_idarea = (typeof leer_idarea_funcional === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_idarea === '1') {
        leer_idarea_funcional = $('#slt_lista_funcionales option:selected').attr('id');
        leer_area_funcional = $('#slt_lista_funcionales option:selected').attr('descripcion');
        $('#txt_area_funcional')
            .attr("disabled", true)
            .val(leer_area_funcional);
        $('#btn_modificar_area_funcional').attr("disabled", false);
        $('#btn_eliminar_area_funcional').attr("disabled", false);
        $('#btn_grabar_area_funcional').attr("disabled", true);
        $('#btn_agregar_ambiente_funcional').attr("disabled", false);

    } else {}

}

function eliminar_area_funcional(leer_idarea_funcional) {
    "use strict";
    var data_eliminar_area_funcional = {
        'idarea': leer_idarea_funcional,
    };
    $.ajax({
        data: data_eliminar_area_funcional,
        dataType: 'json',
        url: url + 'ambientes/eliminar_area_funcional_bloque_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_funcionales").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#txt_area_funcional')
                .val('')
                .attr("disabled", true);
            
            $('#btn_grabar_area_funcional').attr("disabled", true);
            $('#btn_modificar_area_funcional').attr("disabled", true);
            $('#btn_eliminar_area_funcional').attr("disabled", true);

            leer_idbloque_mostrar_area_funcional(leer_idpisos, leer_idbloque);

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



function listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque) {
    "use strict";
    var dato_listar_ambientes = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque
    };
    $.ajax({
        data: dato_listar_ambientes,
        dataType: 'json',
        url: url + 'ambientes/listar_todos_ambientes_de_bloques_y_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_ambientes").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_de_carga_ambientes").html("");
            $("#slt_lista_ambientes")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verifico === '1') {
                        $("#slt_lista_ambientes").append('<option id="' + filas.id + '" descripcion = "' + filas.descripcion +
                            '"  >' + filas.descripcion + '</option>');
                        $("#slt_lista_ambientes").attr("disabled", false);
                    } else {
                        $("#slt_lista_ambientes")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_lista_ambientes").empty();
            }
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

    $("#slt_lista_ambientes").select2({
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




function grabacion_ambiente_funcional(leer_idpisos, leer_idbloque, leer_idarea_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos) {
    "use strict";
    var dato_ambiente_funcional = {
        'idpiso': leer_idpisos,
        'idbloque': leer_idbloque,
        'idareafuncional': leer_idarea_funcional,
        'idambiente': leer_idambientes,
        'ambiente_funcional': leer_ambiente_funcional,
        'nro_cupos': leer_nro_cupos
    };

    $.ajax({
        data: dato_ambiente_funcional,
        dataType: 'json',
        url: url + 'ambientes/grabar_ambiente_funcional_area_bloque_piso',
        type: 'post',
        beforeSend: function () {
            $("#espera_de_carga_mantenimiento_funcional").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_de_carga_mantenimiento_funcional").html("");
            listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
            inicializar_botones_grabacion_ambiente_funcional();


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


function inicializar_botones_grabacion_ambiente_funcional(){
    "use strict";
    $('#slt_lista_ambientes').attr("disabled", true);
    $('#txt_ambiente_funcional').attr("disabled", true);
    $('#txt_cupos').attr("disabled", true);
    $('#btn_grabar_ambiente_funcional').attr("disabled", true);
    
}





$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
  
    listar_pisos_fisico();
 //   $('#btn_agregar_area_funcional').attr("disabled", false);
    $("#slt_lista_pisos")
        .click(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        })
        .keydown(function () {
            leer_pisos_mostrarlo_en_etiquetas();
        });

    /* para bloques fisicos */

    $("#slt_lista_bloques").change(function () {
        listar_bloques_mostrarlo_en_etiquetas();
    });



    $("#slt_lista_funcionales")
        .click(function () {
            leer_area_funcional_y_mostrarlo();
        })
        .keyup(function () {
            leer_area_funcional_y_mostrarlo();
        })
        .keydown(function () {
            leer_area_funcional_y_mostrarlo();
        });





    $('#btn_agregar_area_funcional').click(function () {
        lc_operacion_area_funcional = '1';
        $('#txt_area_funcional')
            .attr("disabled", false)
            .val('')
            .focus();
    });



    $('#btn_modificar_area_funcional').click(function () {
        lc_operacion_area_funcional = '2';
        $('#txt_area_funcional')
            .attr("disabled", false)
            .focus();
    });

    $('#btn_eliminar_area_funcional').click(function () {
        eliminar_area_funcional(leer_idarea_funcional);
    });






    $('#txt_area_funcional')
        .keypress(function (e) {
            $("#btn_grabar_area_funcional").attr("disabled", false);
            if (e.which === 13) {
                $("#btn_grabar_ambientes").focus();
            }
        })

    .click(function () {
        $("#btn_grabar_area_funcional").attr("disabled", false);
    });




    $("#btn_grabar_area_funcional").click(function () {
        leer_area_funcional = $('#txt_area_funcional').val();
        if (lc_operacion_area_funcional === '1') {
            grabar_area_funcional(leer_idpisos, leer_idbloque, leer_area_funcional);
        } else {
            modificar_area_funcional(leer_idarea_funcional, leer_area_funcional);

        }

    });



    /* añadidos : agregar boton */
    
    
    
    $('#btn_agregar_ambiente_funcional').click(function () {
        listar_ambientes_bloques_de_pisos(leer_idpisos, leer_idbloque);
        $('#slt_lista_ambientes').attr("disabled", false);
        $('#txt_ambiente_funcional').val('');
        $('#txt_cupos').val('');
        $('#btn_grabar_ambiente_funcional').attr("disabled", true);
    
    });
    
    
    // leer_idambientes, leer_ambiente_funcional, leer_nro_cupos
    
    $("#slt_lista_ambientes").change(function () {
        leer_idambientes = $('#slt_lista_ambientes option:selected').attr('id');
        $('#txt_ambiente_funcional')
            .attr("disabled", false)
            .focus();
    });
    
    
     $('#txt_ambiente_funcional')
        .click(function () {
            $('#txt_cupos').attr("disabled", false);
        })
        .keypress(function (e) {
            $('#txt_cupos').attr("disabled", false);
            if (e.which === 13) {
                $('#txt_cupos').focus();
            }
        });


    $('#txt_cupos')
        .on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
          })
        .click(function () {
            $('#btn_grabar_ambiente_funcional').attr("disabled", false);
        })
        .keypress(function (e) {
            $('#btn_grabar_ambiente_funcional').attr("disabled", false);
            if (e.which === 13) {
                $('#btn_grabar_ambiente_funcional').focus();
            }
        });

    $('#btn_grabar_ambiente_funcional').click(function () {
        leer_ambiente_funcional = $('#txt_ambiente_funcional').val();
        leer_nro_cupos = $('#txt_cupos').val();
        //if (lc_operacion_ambiente_funcional === '1') {
            grabacion_ambiente_funcional(leer_idpisos, leer_idbloque, leer_idarea_funcional, leer_idambientes, leer_ambiente_funcional, leer_nro_cupos);
        /* } else {
            leer_ver_idpisos = (leer_idpiso === 'undefined') ? leer_idpiso_registrado : leer_idpiso;
            leer_ver_idbloque = (leer_idbloque === 'undefined') ? leer_idbloque_registrado : leer_idbloque;
            leer_ver_idareafuncional = (leer_idarea_funcional === 'undefined') ? leer_idareafuncional_registrado : leer_idareafuncional;
            leer_ver_idambiente = (leer_idambiente === 'undefined') ? leer_idambiente_registrado : leer_idambiente;
            modificacion_ambiente_funcional(leer_idfuncional, leer_ver_idpisos, leer_ver_idbloque, leer_ver_idareafuncional, leer_ver_idambiente, leer_ambiente_funcional, leer_nro_cupos);
        }
        */

    });

    
    
    
    
    
    
    
    
    /*
    $('#txt_ambiente_funcional').attr("disabled", true);
        $('#txt_cupos').attr("disabled", true);
        $('#btn_grabar_ambiente_funcional').attr("disabled", true);
        
    
    */









});
