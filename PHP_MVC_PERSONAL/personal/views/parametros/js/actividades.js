var url = 'http://' + document.domain + '/rrhh/personal/',
    /* url_js = 'http://' + document.domain + '/rrhh/public/js', */
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    leer_id_actividad, nombre, abreviatura, titulo, tipo_operacion, lc_ver_si_seleccion_id_actividad, dato_procesar_actividad, dato_eliminar_actividad, lc_tipo_operacion_sub_actividad, leer_sub_actividad, data_sub_actividad, data_listar_sub_actividad, leer_id_sub_actividad, lc_ver_si_seleccion_sub_id_actividad, data_sub_actividad_modificacion, data_eliminar_sub_actividad, lc_operacion_tipo_actividad, leer_tipo_actividad, data_grabar_tipo_actividad, data_listar_tipo_actividad, leer_id_tipo_actividad, lc_ver_si_seleccion_id_tipo_actividad, data_modificar_tipo_actividad, data_eliminar_tipo_actividad, leer_id_actividad_add, lc_ver_si_seleccion_id_actividad_add, leer_nombre_actividad_add, leer_id_actividad_add_registrado;



function listar_todas_las_actividades() {
    "use strict";
    var datos_listar_actividades = {
        "actividad": ''
    };
    $.ajax({
        data: datos_listar_actividades,
        dataType: 'json',
        url: url + 'parametros/listar_actividades_en_general',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga").html("");
            $("#slt_actividad")
                .html('');
            $("#slt_actividad_add")
                .html('')
                .append('<option id=0> Seleccione </option>');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_actividad").append('<option idactividad="' + filas.idactividad + '" nombre = "' + filas.nombre + '" abreviatura = "' + filas.abreviatura + '" profesional = "' + filas.profesional + '" titulo = "' + filas.titulo + '"  >' + filas.nombre + '</option>');

                        $("#slt_actividad_add").append('<option idactividad="' + filas.idactividad + '" nombre = "' + filas.nombre + '" abreviatura = "' + filas.abreviatura + '" profesional = "' + filas.profesional + '" titulo = "' + filas.titulo + '"  >' + filas.nombre + '</option>');

                        $("#slt_actividad").attr("disabled", false);


                    } else {
                        $("#slt_actividad")
                            .attr("disabled", true)
                            .empty();
                        $("#slt_actividad_add")
                            .attr("disabled", true)
                            .empty();

                    }
                });
            } else {
                $("#slt_actividad").empty();
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



function leer_datos_actividades_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id_actividad = $('#slt_actividad option:selected').attr('idactividad');
    lc_ver_si_seleccion_id_actividad = (typeof leer_id_actividad === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id_actividad === '1') {
        leer_id_actividad = $('#slt_actividad option:selected').attr('idactividad');
        nombre = $('#slt_actividad option:selected').attr('nombre');
        abreviatura = $('#slt_actividad option:selected').attr('abreviatura');
        titulo = $('#slt_actividad option:selected').attr('titulo');
        $('#nombre')
            .val(nombre)
            .attr("disabled", true);
        $('#abreviatura')
            .val(abreviatura)
            .attr("disabled", true);
        $('#titulo')
            .val(titulo)
            .attr("disabled", true);
        $('#btn_modificar_actividad').attr("disabled", false);
        $('#btn_eliminar_actividad').attr("disabled", false);
        $('#btn_grabar_actividad').attr("disabled", true);
        $('#btn_agregar_sub_actividad').attr("disabled", false);
        listar_sub_actividades_medicas(leer_id_actividad);

    } else {
        $('#btn_modificar_actividad').attr("disabled", true);
        $('#btn_eliminar_actividad').attr("disabled", true);
        $('#btn_agregar_sub_actividad').attr("disabled", true);

    }

}




function leer_datos_actividades_add_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id_actividad_add = $('#slt_actividad_add option:selected').attr('idactividad');
    lc_ver_si_seleccion_id_actividad_add = (typeof leer_id_actividad_add === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id_actividad_add === '1') {
        leer_id_actividad_add = $('#slt_actividad_add option:selected').attr('idactividad');
        $('#btn_agregar_sub_actividad').attr("disabled", false);
        

    } else {
        $('#btn_modificar_actividad').attr("disabled", true);
        $('#btn_eliminar_actividad').attr("disabled", true);
        $('#btn_agregar_sub_actividad').attr("disabled", true);

    }

}


/*
<select name="slt_actividad_add" class="form-control alert-warning" id="slt_actividad_add"><option id="0"> Seleccione </option><option idactividad="25" nombre="ADMINISTRATIVO" abreviatura="ADM" profesional="MEDICOS" titulo="ADMINISTRATIVO">ADMINISTRATIVO</option><option idactividad="9" nombre="AUDITORIA" abreviatura="AUD" profesional="MEDICOS" titulo="AUTITORIA MEDICOS">AUDITORIA</option><option idactividad="13" nombre="CAPACITACION" abreviatura="CAP" profesional="MEDICOS" titulo="CAPACITACION - MEDICOS">CAPACITACION</option><option idactividad="5" nombre="CENTRO OBSTETRICO" abreviatura="COB" profesional="MEDICOS" titulo="CENTRO OBSTETRICO">CENTRO OBSTETRICO</option><option idactividad="10" nombre="COMITE" abreviatura="CMT" profesional="MEDICOS" titulo="COMITE MEDICOS">COMITE</option><option idactividad="28" nombre="COMITE DE MORTALIDAD" abreviatura="CMOR" profesional="MEDICOS" titulo="COMITE DE MORTALIDAD">COMITE DE MORTALIDAD</option><option idactividad="1" nombre="CONSULTA EXTERNA" abreviatura="CEX" profesional="MEDICOS" titulo="CONSULTA EXTERNA MEDICOS">CONSULTA EXTERNA</option><option idactividad="27" nombre="ECOGRAFIA" abreviatura="ECO" profesional="MEDICOS" titulo="ECOGRAFIA">ECOGRAFIA</option><option idactividad="24" nombre="EMERGENCIA" abreviatura="EME" profesional="MEDICOS" titulo="EMERGENCIA">EMERGENCIA</option><option idactividad="14" nombre="INFORMACION, EDUCACION Y COMUNICACION" abreviatura="IEC" profesional="MEDICOS" titulo="INFORMACION, EDUCACION Y COMUNICACION">INFORMACION, EDUCACION Y COMUNICACION</option><option idactividad="6" nombre="INTERCONSULTA" abreviatura="INT" profesional="MEDICOS" titulo="INTERCONSULTA MEDICOS">INTERCONSULTA</option><option idactividad="15" nombre="INVESTIGACION" abreviatura="INV" profesional="MEDICOS" titulo="INVESTIGACION - MEDICOS">INVESTIGACION</option><option idactividad="7" nombre="JUNTA MEDICA" abreviatura="JUN" profesional="MEDICOS" titulo="JUNTA MEDICA">JUNTA MEDICA</option><option idactividad="2" nombre="PROCEDIMIENTOS DIAGNOSTICOS Y TERAPEUTICOS" abreviatura="PRD" profesional="MEDICOS" titulo="PROCEDIMIENTOS DIAGNOSTICOS Y TERAPEUTICOS MEDICOS">PROCEDIMIENTOS DIAGNOSTICOS Y TERAPEUTICOS</option><option idactividad="11" nombre="REFERENCIAS Y CONTRAREFERENCIAS" abreviatura="RYC" profesional="MEDICOS" titulo="REFERENCIAS Y CONTRAREFERENCIAS MEDICOS">REFERENCIAS Y CONTRAREFERENCIAS</option><option idactividad="4" nombre="SALA DE OPERACIONES" abreviatura="SOP" profesional="MEDICOS" titulo="SALA DE OPERACIONES MEDICOS">SALA DE OPERACIONES</option><option idactividad="12" nombre="SUPERVISION" abreviatura="SUP" profesional="MEDICOS" titulo="SUPERVISION - MEDICOS">SUPERVISION</option><option idactividad="26" nombre="TELEGESTION" abreviatura="TEG" profesional="MEDICOS" titulo="TELEGESTION">TELEGESTION</option><option idactividad="8" nombre="TELEMEDICINA" abreviatura="TEM" profesional="MEDICOS" titulo="TELEMEDICINA">TELEMEDICINA</option><option idactividad="3" nombre="VISITA MEDICA EN HOSPITALIZACION" abreviatura="VMH" profesional="MEDICOS" titulo="VISITA MEDICA EN HOSPITALIZACION MEDICOS">VISITA MEDICA EN HOSPITALIZACION</option></select>

*/



function grabar_nueva_actividad(nombre, abreviatura, titulo) {
    "use strict";
    var datos_grabar = {
        "nombre": nombre,
        "abreviatura": abreviatura,
        "titulo": titulo
    };
    $.ajax({
        data: datos_grabar,
        dataType: 'json',
        url: url + 'parametros/grabar_actividad',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_grabar_actividad').attr("disabled", true);
            $('#nombre').attr("disabled", true);
            $('#abreviatura').attr("disabled", true);
            $('#titulo').attr("disabled", true);
            listar_todas_las_actividades();
        }
    });

}




function grabar_edicion_actividad(leer_id_actividad, nombre, abreviatura, titulo) {
    "use strict";
    dato_procesar_actividad = {
        "id_actividad": leer_id_actividad,
        "nombre": nombre,
        "abreviatura": abreviatura,
        "titulo": titulo
    };
    $.ajax({
        data: dato_procesar_actividad,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_actividad_total',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_grabar_actividad').attr("disabled", true);
            listar_todas_las_actividades();

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


function inicializar_etiquetas() {
    "use strict";
    $('#nombre').attr("disabled", true);
    $('#abreviatura').attr("disabled", true);
    $('#titulo').attr("disabled", true);
    $('#btn_modificar_actividad').attr("disabled", true);
    $('#btn_eliminar_actividad').attr("disabled", true);
    $('#btn_grabar_actividad').attr("disabled", true);
}


function eliminar_registro_actividad(leer_id_actividad) {
    "use strict";
    dato_eliminar_actividad = {
        "id_actividad": leer_id_actividad
    };
    $.ajax({
        data: dato_eliminar_actividad,
        dataType: 'json',
        url: url + 'parametros/eliminar_registro_actividad',
        type: 'post',
        beforeSend: function () {},
        success: function () {
            $('#btn_grabar_actividad').attr("disabled", true);
            listar_todas_las_actividades();
            inicializar_etiquetas();
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


/** procesamiento sub actividades ** */



function inicializar_sub_actividad() {
    "use strict";
    $('#btn_agregar_sub_actividad').attr("disabled", false);
    $('#btn_modificar_sub_actividad').attr("disabled", true);
    $('#btn_eliminar_sub_actividad').attr("disabled", true);
    $("#nombre_sub_actividad").attr("disabled", true);
    $('#btn_grabar_sub_actividad').attr("disabled", true);


}



/* fin de funciones sub actividades */


function grabar_sub_actividad(leer_id_actividad, leer_sub_actividad) {
    "use strict";
    data_sub_actividad = {
        'idactividad': leer_id_actividad,
        'nombre_sub_actividad': leer_sub_actividad
    };

    $.ajax({
        data: data_sub_actividad,
        dataType: 'json',
        url: url + 'parametros/grabar_sub_actividad_de_actividad',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_en_carga").html("");
            listar_sub_actividades_medicas(leer_id_actividad);
            inicializar_sub_actividad();
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


function listar_sub_actividades_medicas(leer_id_actividad) {
    "use strict";
    data_listar_sub_actividad = {
        'idactividad': leer_id_actividad
    };
    $.ajax({
        data: data_listar_sub_actividad,
        dataType: 'json',
        url: url + 'parametros/listar_sub_actividades_de_actividades',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga").html("");
            $("#slt_sub_actividad")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_sub_actividad").append('<option idsubactividad ="' + filas.idsubactividad + '" subactividad = "' + filas.subactividad + '"  >' + filas.subactividad + '</option>');
                        $("#slt_sub_actividad").attr("disabled", false);

                    } else {
                        $("#slt_sub_actividad")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_sub_actividad").empty();
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


function leer_sub_actividad_y_mostrarlo() {
    "use strict";
    leer_id_sub_actividad = $('#slt_sub_actividad option:selected').attr('idsubactividad');
    lc_ver_si_seleccion_sub_id_actividad = (typeof leer_id_sub_actividad === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_sub_id_actividad === '1') {
        leer_id_sub_actividad = $('#slt_sub_actividad option:selected').attr('idsubactividad');
        leer_sub_actividad = $('#slt_sub_actividad option:selected').attr('subactividad');
        $('#nombre_sub_actividad').val(leer_sub_actividad);
        $('#btn_agregar_sub_actividad').attr("disabled", false);
        $('#btn_modificar_sub_actividad').attr("disabled", false);
        $('#btn_eliminar_sub_actividad').attr("disabled", false);
        $('#btn_grabar_sub_actividad').attr("disabled", true);

    } else {
        $('#btn_agregar_sub_actividad').attr("disabled", true);
        $('#btn_modificar_sub_actividad').attr("disabled", true);
        $('#btn_eliminar_sub_actividad').attr("disabled", true);
        $('#btn_grabar_sub_actividad').attr("disabled", true);

    }


}



function modificacion_sub_actividad(leer_id_sub_actividad, leer_sub_actividad) {
    "use strict";
    data_sub_actividad_modificacion = {
        'idsubactividad': leer_id_sub_actividad,
        'nombre_sub_actividad': leer_sub_actividad
    };

    $.ajax({
        data: data_sub_actividad_modificacion,
        dataType: 'json',
        url: url + 'parametros/modificacion_sub_actividad_de_actividad',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_en_carga").html("");
            listar_sub_actividades_medicas(leer_id_actividad);
            inicializar_sub_actividad();
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


function eliminar_sub_actividad(leer_id_sub_actividad) {
    "use strict";
    data_eliminar_sub_actividad = {
        'idsubactividad': leer_id_sub_actividad,
    };

    $.ajax({
        data: data_eliminar_sub_actividad,
        dataType: 'json',
        url: url + 'parametros/eliminar_sub_actividad_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $("#espera_en_carga").html("");
            listar_sub_actividades_medicas(leer_id_actividad);
            inicializar_sub_actividad();
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


/* inicio de tipo de actividades */

function inicializar_etiquetas_tipo_actividad() {
    "use strict";
    $('#slt_tipo_actividad').attr("disabled", false);
    $('#slt_actividad_add').attr("disabled", true);
    $('#espera_en_carga_tipo_actividad').html("");
    $('#btn_agregar_tipo_actividad').attr("disabled", false);
    $('#btn_modificar_tipo_actividad').attr("disabled", true);
    $('#btn_eliminar_tipo_actividad').attr("disabled", true);
    $('#slt_actividad_add').attr("disabled", true);
    listar_todas_las_actividades();
    $('#txt_ver_actividad')
        .val('')
        .attr("disabled", true);
    
    $('#nombre_tipo_actividad')
        .val('')
        .attr("disabled", true);
    
    $('#btn_grabar_tipo_actividad').attr("disabled", true);

}

 

function grabar_tipo_actividad(leer_id_actividad_add, leer_tipo_actividad) {
    "use strict";
    data_grabar_tipo_actividad = {
        'idactividad_add' : leer_id_actividad_add,
        'tipo_actividad': leer_tipo_actividad
    };

    $.ajax({
        data: data_grabar_tipo_actividad,
        dataType: 'json',
        url: url + 'parametros/grabar_tipo_actividad_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_en_carga_tipo_actividad').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_en_carga_tipo_actividad').html("");
            inicializar_etiquetas_tipo_actividad();
            listar_tipos_de_actividad();
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




function listar_tipos_de_actividad() {
    "use strict";
    data_listar_tipo_actividad = {
        'idactividad': ''
    };
    $.ajax({
        data: data_listar_tipo_actividad,
        dataType: 'json',
        url: url + 'parametros/listar_tipo_de_actividades_total',
        type: 'post',
        beforeSend: function () {
            $("#espera_en_carga_tipo_actividad").html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function (encontrados) {
            $("#espera_en_carga_tipo_actividad").html("");
            $("#slt_tipo_actividad")
                .html('');
            var nro_registros = encontrados.length;
            if (nro_registros > 0) {
                encontrados.forEach(function (filas) {
                    if (filas.verificar === '1') {
                        $("#slt_tipo_actividad").append('<option id ="' + filas.id + '" id_actividad_add = "' + filas.id_actividad_add +  '" nombre_actividad_add = "' + filas.nombre_actividad_add +  '" tipo_actividad = "' + filas.tipo_actividad + '"  >' + filas.tipo_actividad + '</option>');
                        $("#slt_tipo_actividad").attr("disabled", false);

                    } else {
                        $("#slt_tipo_actividad")
                            .attr("disabled", true)
                            .empty();
                    }
                });
            } else {
                $("#slt_sub_actividad").empty();
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


// leer_id_tipo_actividad, lc_ver_si_seleccion_id_tipo_actividad

function leer_tipo_actividad_y_mostrarlo() {
    "use strict";
    leer_id_tipo_actividad = $('#slt_tipo_actividad  option:selected').attr('id');
    lc_ver_si_seleccion_id_tipo_actividad = (typeof leer_id_tipo_actividad === 'undefined') ? '' : '1';
    if (lc_ver_si_seleccion_id_tipo_actividad === '1') {
        leer_id_tipo_actividad = $('#slt_tipo_actividad  option:selected').attr('id');
        leer_tipo_actividad = $('#slt_tipo_actividad  option:selected').attr('tipo_actividad');
        leer_id_actividad_add = $('#slt_tipo_actividad  option:selected').attr('id_actividad_add');
        leer_id_actividad_add_registrado = leer_id_actividad_add;
        leer_nombre_actividad_add = $('#slt_tipo_actividad  option:selected').attr('nombre_actividad_add');
        $('#nombre_tipo_actividad').val(leer_tipo_actividad);
        $('#txt_ver_actividad').val(leer_nombre_actividad_add);
        $('#btn_modificar_tipo_actividad').attr("disabled", false);
        $('#btn_eliminar_tipo_actividad').attr("disabled", false);
        $('#btn_grabar_tipo_actividad').attr("disabled", true);
    } else {
        $('#nombre_tipo_actividad').attr("disabled", true);
        $('#btn_modificar_tipo_actividad').attr("disabled", true);
        $('#btn_eliminar_tipo_actividad').attr("disabled", true);
        $('#btn_grabar_tipo_actividad').attr("disabled", true);

    }

}

// id_actividad_add="11" 

function  modificar_tipo_actividad(leer_id_tipo_actividad, leer_id_actividad_add, leer_tipo_actividad) {
    "use strict";
    data_modificar_tipo_actividad = {
        'idtipo': leer_id_tipo_actividad,
        'idactividad_add' : leer_id_actividad_add,
        'tipo_actividad': leer_tipo_actividad
    };

    $.ajax({
        data: data_modificar_tipo_actividad,
        dataType: 'json',
        url: url + 'parametros/modificar_tipo_actividad_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_en_carga_tipo_actividad').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_en_carga_tipo_actividad').html("");
            inicializar_etiquetas_tipo_actividad();
            listar_tipos_de_actividad();
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


function eliminar_tipo_de_actividad(leer_id_tipo_actividad) {
    "use strict";
    data_eliminar_tipo_actividad = {
        'idtipo': leer_id_tipo_actividad
    };

    $.ajax({
        data: data_eliminar_tipo_actividad,
        dataType: 'json',
        url: url + 'parametros/eliminar_tipo_actividad_total',
        type: 'post',
        beforeSend: function () {
            $('#espera_en_carga_tipo_actividad').html("<img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/>");
        },
        success: function () {
            $('#espera_en_carga_tipo_actividad').html("");
            inicializar_etiquetas_tipo_actividad();
            listar_tipos_de_actividad();
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


/* fin de tipo de actividades */



$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    inicializar_etiquetas();
    listar_todas_las_actividades();

    $('#btn_modificar_actividad').click(function () {
        tipo_operacion = '2';
        $('#nombre').attr("disabled", false);
        $('#abreviatura').attr("disabled", false);
        $('#titulo').attr("disabled", false);
        $('#btn_grabar_actividad').attr("disabled", false);
    });

    $("#slt_actividad")
        .click(function () {
            leer_datos_actividades_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_actividades_mostrarlo_en_etiquetas();
        })
        .change(function () {
            leer_datos_actividades_mostrarlo_en_etiquetas();
        });


    $("#btn_agregar_actividad").click(function () {
        tipo_operacion = '1';
        $('#abreviatura')
            .val('')
            .attr("disabled", false);
        $('#titulo')
            .val('')
            .attr("disabled", false);

        $('#nombre')
            .val('')
            .attr("disabled", false)
            .focus();
    });

    $('#nombre')
        .keypress(function (e) {
            $('#abreviatura').attr("disabled", false);
            if (e.which === 13) {
                $('#abreviatura').focus();
            }
        })
        .click(function () {
            $('#abreviatura').attr("disabled", false);
        });

    $('#abreviatura')
        .keypress(function (e) {
            $('#titulo').attr("disabled", false);
            if (e.which === 13) {
                $('#titulo').focus();
            }
        })
        .click(function () {
            $('#titulo').attr("disabled", false);
        });

    $("#titulo").keypress(function () {
        $('#btn_grabar_actividad').attr("disabled", false);
    });




    $("#btn_grabar_actividad").click(function () {
        nombre = $('#nombre').val();
        abreviatura = $('#abreviatura').val();
        titulo = $('#titulo').val();
        if (tipo_operacion === '1') {
            grabar_nueva_actividad(nombre, abreviatura, titulo);
        } else {
            grabar_edicion_actividad(leer_id_actividad, nombre, abreviatura, titulo);
        }
    });



    $('#btn_eliminar_actividad').click(function () {
        eliminar_registro_actividad(leer_id_actividad);
    });



    /* inicio de botones */

    inicializar_sub_actividad();



    $('#btn_agregar_sub_actividad').click(function () {
        lc_tipo_operacion_sub_actividad = '1';
        $("#nombre_sub_actividad")
            .attr("disabled", false)
            .val('')
            .focus();
    });


    $("#nombre_sub_actividad").keypress(function (e) {
        $('#btn_grabar_sub_actividad').attr("disabled", false);
        if (e.which === 13) {
            $('#btn_grabar_sub_actividad').focus();
        }
    });

    $("#slt_sub_actividad")
        .click(function () {
            leer_sub_actividad_y_mostrarlo();

        })
        .keyup(function () {
            leer_sub_actividad_y_mostrarlo();
        })
        .change(function () {
            leer_sub_actividad_y_mostrarlo();
        });


    $("#btn_modificar_sub_actividad").click(function () {
        lc_tipo_operacion_sub_actividad = '2';
        $("#nombre_sub_actividad")
            .attr("disabled", false)
            .focus();
    });



    $('#btn_grabar_sub_actividad').click(function () {
        leer_sub_actividad = $("#nombre_sub_actividad").val();
        if (lc_tipo_operacion_sub_actividad === '1') {
            grabar_sub_actividad(leer_id_actividad, leer_sub_actividad);
        } else {
            modificacion_sub_actividad(leer_id_sub_actividad, leer_sub_actividad);
        }

    });


    $("#btn_eliminar_sub_actividad").click(function () {
        eliminar_sub_actividad(leer_id_sub_actividad);
    });


    /** inicio de tipo de actividad */

    inicializar_etiquetas_tipo_actividad();
    listar_tipos_de_actividad();
    $('#btn_agregar_tipo_actividad').click(function () {
        lc_operacion_tipo_actividad = '1';
        $('#nombre_tipo_actividad')
            .val('')
            .attr("disabled", false)
            .focus();
    });

    $('#btn_modificar_tipo_actividad').click(function () {
        lc_operacion_tipo_actividad = '2';
        $('#nombre_tipo_actividad')
            .attr("disabled", false)
            .focus();
        $("#slt_actividad_add")
            .attr("disabled", false);
        
        $('#btn_grabar_tipo_actividad').attr("disabled", false);
        
        
          
        
        
    });


    $('#nombre_tipo_actividad')
        .keypress(function (e) {
            $("#btn_grabar_tipo_actividad").attr("disabled", false);
            $('#slt_actividad_add').attr("disabled", false);
        
            if (e.which === 13) {
                $('#slt_actividad_add').attr("disabled", false);
                $("#btn_grabar_tipo_actividad").focus();
            }
        })

    .click(function () {
        $("#btn_grabar_tipo_actividad").attr("disabled", false);
    });

    
  

    $("#slt_actividad_add")
        .click(function () {
            leer_datos_actividades_add_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_actividades_add_mostrarlo_en_etiquetas();
        })
        .change(function () {
          leer_datos_actividades_add_mostrarlo_en_etiquetas();
        
        });



    $("#btn_grabar_tipo_actividad").click(function () {
        leer_tipo_actividad = $('#nombre_tipo_actividad').val();
        if (lc_operacion_tipo_actividad === '1') {
            grabar_tipo_actividad(leer_id_actividad_add, leer_tipo_actividad);
        } else {
            leer_id_actividad_add = ($('#slt_actividad_add option:selected').attr('idactividad') === 'undefined') ?  leer_id_actividad_add_registrado : leer_id_actividad_add;
            modificar_tipo_actividad(leer_id_tipo_actividad, leer_id_actividad_add, leer_tipo_actividad);

        }

    });


    $("#slt_tipo_actividad")
        .click(function () {
            leer_tipo_actividad_y_mostrarlo();
        })
        .keyup(function () {
            leer_tipo_actividad_y_mostrarlo();
        })
        .change(function () {
            leer_tipo_actividad_y_mostrarlo();
        });



    $('#btn_eliminar_tipo_actividad').click(function () {
        eliminar_tipo_de_actividad(leer_id_tipo_actividad);

    });



    /* fin de tipo de actividad */





});
