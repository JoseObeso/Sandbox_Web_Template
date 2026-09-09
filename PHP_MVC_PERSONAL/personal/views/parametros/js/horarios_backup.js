var url = 'http://' + document.domain + '/rrhh/personal/',
    url_js = 'http://' + document.domain + '/rrhh/public/js',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    lc_buscar_horario = '',
    dato_listar,  cantidad_registros;
    
var dato_listar, id_horario, codigo_horario, nombre_horario, hora_ingreso, hora_salida, horas, codigo_turno, tipo_operacion_horario = '0',
    habilitar_los_dias, codigo_horario_inicial, codigo_turno_inicial, hora_ingreso_inicial, hora_salida_inicial, codigo_horario_seleccion, codigo_turno_seleccion, horas_inicial, hora_ingreso_seleccion, hora_salida_seleccion, hora_salida_seleccion, horas_seleccion;



function mostrar_lista_de_horario(lc_buscar_horario) {
    "use strict";
    dato_listar = {
        "id": lc_buscar_horario
    };

    $.ajax({
        data: dato_listar,
        dataType: 'json',
        url: url + 'parametros/procesar_lista_de_horario',
        type: 'post',
        beforeSend: function () {
            $("#espera_grabacion_horarios").html("<center><img src='" + url_grafico + "/espera.gif' width='198' height='198' alt=''/></center>");
        },
        success: function (datos) {
            $("#slt_lista_horarios")
                .html('');
            $("#espera_grabacion_horarios").html('');
            cantidad_registros = datos.length;
            datos.forEach(function (filas) {
                if (filas.verificar === '1') {
                    $("#slt_lista_horarios")
                        .show()
                        .append('<option id="' + filas.id +
                            '"  codigo_horario = "' + filas.codigo_horario +
                            '"  codigo_turno = "' + filas.codigo_turno +
                            '"  nombre_turno = "' + filas.nombre_turno +
                            '"  ingreso = "' + filas.ingreso +
                            '"  salida = "' + filas.salida +
                            '"  horas = "' + filas.horas + '">' + filas.codigo_horario + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#124;' + filas.nombre_turno + '&#124;' + filas.ingreso + '&#124;' + filas.salida + '&#124;' +  filas.horas + '&#124;' + '</option>')
                        .attr("disabled", false);
                } else {
                    $("#slt_lista_horarios").attr("disabled", true);
                }
            });
        }
    });


}

/*

ho "<table border = '1'>";
echo "<tr>  <td>" . $arr[0] . "</td> <td>" . $arr[1] ."</td>  </tr>" ;
echo "</table>";



*/


/*
'<tr><td>&nbsp;' + response[i].departamento + '</td><td>&nbsp;' + response[i].especialidad + '</td></tr>';

*/


/*

'verificar' => '1',
                    'id' => $mostrar->IDHORARIO,
                    'codigo_horario' => $mostrar->CODIGOHORARIO,
                    'codigo_turno' => $mostrar->CODIGOTURNO,
                    'nombre_turno' => utf8_encode( trim( $mostrar->NOMBRE ) ),
                    'ingreso' => $mostrar->HORAINGRESO,
                    'salida' => $mostrar->HORASALIDA,
                    'horas' => $mostrar->HORAS
                    

*/






function ver_horarios_mostrarlo_en_etiquetas() {
    "use strict";
    id_horario = $('#horarios_registrados option:selected').attr('id_horario');
    codigo_horario = $('#horarios_registrados option:selected').attr('codigo_horario');
    codigo_turno = $('#horarios_registrados option:selected').attr('codigo_turno');
    nombre_horario = $('#horarios_registrados option:selected').attr('nombre_horario');
    hora_ingreso = $('#horarios_registrados option:selected').attr('hora_ingreso');
    hora_salida = $('#horarios_registrados option:selected').attr('hora_salida');
    horas = $('#horarios_registrados option:selected').attr('horas');
    $("#codigo_horario").val(codigo_horario);
    $("#ver_codigo_turno").text(codigo_turno + ' - ' + nombre_horario);
    $("#hora_ingreso").val(hora_ingreso);
    $("#hora_salida").val(hora_salida);
    $("#total_horas").val(horas);
    $("#id_horario_mostrar").text("ID : " + id_horario);

    $("#operacion_horario1").attr("checked", false);
    $("#operacion_horario2").attr("checked", false);
    $("#operacion_horario2").prop("disabled", false);

    $('#btn-guardar-nuevo-edicion-turno').attr("disabled", true);

}



function grabar_nuevo_horario(codigo_horario, codigo_turno, hora_ingreso, hora_salida, horas, habilitar_los_dias) {
    "use strict";
    var datos_horarios = {
        "codigo_horario": codigo_horario,
        "codigo_turno": codigo_turno,
        "hora_ingreso": hora_ingreso,
        "hora_salida": hora_salida,
        "horas": horas,
        "habilitar_los_dias": habilitar_los_dias
    };

    $.ajax({
        data: datos_horarios,
        dataType: 'json',
        url: url + 'parametros/grabar_nuevo_horarios',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            tipo_operacion_horario = '0';
            $('#btn-guardar-nuevo-edicion-horario').attr("disabled", true);
            swal({
                title: "...Horario Registrado con exito... ",
                text: "...Continue ......",
                timer: 2000,
                showConfirmButton: false
            });
            $("#codigo_horario").val('');
            $('#codigo_horario').attr("disabled", true);
            $("#seleccion-turno").attr("disabled", true);
            $("#hora_ingreso").val('');
            $('#hora_ingreso').attr("disabled", true);
            $("#hora_salida").val('');
            $('#hora_salida').attr("disabled", true);
            $("#total_horas").val('');
            $('#total_horas').attr("disabled", true);
            $("#operacion_horario1").attr("checked", false);
            $("#operacion_horario2").attr("checked", false);
            $("#operacion_horario1").prop("disabled", true);
            $("#operacion_horario2").prop("disabled", true);
            $("#todos_los_dias_0").attr("checked", false);
            $("#todos_los_dias_0").prop("disabled", true);
            $("#todos_los_dias_1").attr("checked", false);
            $("#todos_los_dias_1").prop("disabled", true);

        }
    });


}


function grabar_edicion_horarios(id_horario, codigo_horario_seleccion, codigo_turno_seleccion, hora_ingreso_seleccion, hora_salida_seleccion, horas_seleccion, habilitar_los_dias) {
    "use strict";

    var datos_horarios_modificar = {
        "id_horario": id_horario,
        "codigo_horario": codigo_horario_seleccion,
        "codigo_turno": codigo_turno_seleccion,
        "hora_ingreso": hora_ingreso_seleccion,
        "hora_salida": hora_salida_seleccion,
        "horas": horas_seleccion
    };


    $.ajax({
        data: datos_horarios_modificar,
        dataType: 'json',
        url: url + 'parametros/grabar_edicion_horarios',
        type: 'post',
        beforeSend: function () {

        },
        success: function () {
            tipo_operacion_horario = '0';
            $('#btn-guardar-nuevo-edicion-horario').attr("disabled", true);
            swal({
                title: "...Edicion.. Registrado con exito... ",
                text: "...Continue ......",
                timer: 2000,
                showConfirmButton: false
            });
            $("#codigo_horario").val('');
            $('#codigo_horario').attr("disabled", true);
            $("#seleccion-turno").attr("disabled", true);
            $("#hora_ingreso").val('');
            $('#hora_ingreso').attr("disabled", true);
            $("#hora_salida").val('');
            $('#hora_salida').attr("disabled", true);
            $("#total_horas").val('');
            $('#total_horas').attr("disabled", true);
            $("#operacion_horario1").attr("checked", false);
            $("#operacion_horario2").attr("checked", false);
            $("#operacion_horario1").prop("disabled", false);
            $("#operacion_horario2").prop("disabled", true);
            $("#todos_los_dias_0").attr("checked", false);
            $("#todos_los_dias_0").prop("disabled", true);
            $("#todos_los_dias_1").attr("checked", false);
            $("#todos_los_dias_1").prop("disabled", true);
        }
    });


}


function mostrar_datatable_horarios() {
    "use strict";

    $('#tabla_horarios_cabecera').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 20, 25, 50, -1],
            [10, 20, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}



$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();
    $("#txt_buscar_horarios").focus();
    
    
    mostrar_lista_de_horario(lc_buscar_horario);
    
    
    mostrar_datatable_horarios();

    $("#agregar_editar_horarios").click(function () {
        $('#modal-agregar-horarios').modal({
            show: true,
            backdrop: 'static'
        });
        $("#horarios_registrados").click(function () {
            ver_horarios_mostrarlo_en_etiquetas();
        });
        $("#horarios_registrados").keyup(function () {
            ver_horarios_mostrarlo_en_etiquetas();
        });
    });


    $("input[name=operacion_horario]").click(function () {
        tipo_operacion_horario = $('input:radio[name=operacion_horario]:checked').val();
        if (tipo_operacion_horario === '1') {
            $("#codigo_horario")
                .val('')
                .attr("disabled", false);

            $('#codigo_horario').focus();

            $("#ver_codigo_turno").text('');
            $("#seleccion-turno").attr("disabled", false);

            $("#hora_ingreso").val('');
            $("#hora_ingreso").attr("disabled", false);


            $("#hora_salida").val('');
            $("#hora_salida").attr("disabled", false);


            $("#total_horas").val('');
            $("#total_horas").attr("disabled", false);

            $("#operacion_horario2").prop("disabled", true);

            $("#todos_los_dias_0").attr("checked", false);
            $("#todos_los_dias_0").prop("disabled", false);

            $("#todos_los_dias_1").attr("checked", false);
            $("#todos_los_dias_1").prop("disabled", false);

            $('#btn-guardar-nuevo-edicion-horario').attr("disabled", true);

        } else {

            $('#codigo_horario').focus();
            $('#codigo_horario').attr("disabled", false);
            $("#seleccion-turno").attr("disabled", false);
            $("#hora_ingreso").attr("disabled", false);
            $("#hora_salida").attr("disabled", false);
            $("#total_horas").attr("disabled", false);
            $("#todos_los_dias_0").attr("checked", false);
            $("#todos_los_dias_0").prop("disabled", false);
            $("#todos_los_dias_1").attr("checked", false);
            $("#todos_los_dias_1").prop("disabled", false);
            $('#btn-guardar-nuevo-edicion-horario').attr("disabled", false);


        }
    });

    $("input[name=todos_los_dias]").click(function () {
        $('#btn-guardar-nuevo-edicion-horario').attr("disabled", false);
    });

    $(document).delegate("#btn-guardar-nuevo-edicion-horario", "click", function () {
        if (tipo_operacion_horario === '1') {
            codigo_horario = $('#codigo_horario').val();
            codigo_turno = $('#seleccion-turno option:selected').attr('codigo_turno');
            hora_ingreso = $('#hora_ingreso').val();
            hora_salida = $('#hora_salida').val();
            horas = $('#total_horas').val();
            habilitar_los_dias = $('input:radio[name=todos_los_dias]:checked').val();
            grabar_nuevo_horario(codigo_horario, codigo_turno, hora_ingreso, hora_salida, horas, habilitar_los_dias);

        } else {
            id_horario = $('#horarios_registrados option:selected').attr('id_horario');
            codigo_horario_inicial = $('#horarios_registrados option:selected').attr('codigo_horario');
            codigo_turno_inicial = $('#horarios_registrados option:selected').attr('codigo_turno');
            hora_ingreso_inicial = $('#horarios_registrados option:selected').attr('hora_ingreso');
            hora_salida_inicial = $('#horarios_registrados option:selected').attr('hora_salida');
            horas_inicial = $('#horarios_registrados option:selected').attr('horas');
            codigo_horario = $('#codigo_horario').val();
            codigo_turno = $('#seleccion-turno option:selected').attr('codigo_turno');
            hora_ingreso = $('#hora_ingreso').val();
            hora_salida = $('#hora_salida').val();
            horas = $('#total_horas').val();
            if (codigo_horario === codigo_horario_inicial) {
                codigo_horario_seleccion = codigo_horario_inicial;
            } else {
                codigo_horario_seleccion = codigo_horario;
            }
            if (codigo_turno === null || codigo_turno === undefined) {
                codigo_turno_seleccion = codigo_turno_inicial;
            } else {
                codigo_turno_seleccion = codigo_turno;
            }
            hora_ingreso_seleccion = (hora_ingreso_inicial === hora_ingreso) ? hora_ingreso_inicial : hora_ingreso;
            hora_salida_seleccion = (hora_salida_inicial === hora_salida) ? hora_salida_inicial : hora_salida;
            horas_seleccion = (horas_inicial === horas) ? horas_inicial : horas;
            grabar_edicion_horarios(id_horario, codigo_horario_seleccion, codigo_turno_seleccion, hora_ingreso_seleccion, hora_salida_seleccion, horas_seleccion);

        }
    });



    $("#anular_horarios").click(function () {
        if ($('.horarios:checked').length > 0) {
            if ($('.horarios:checked').length === 1) {
                var id_horario = $(".horarios:checked").attr("id");
                var datos_eliminar = {
                    "id_horario": id_horario
                };
                swal({
                    title: "Seguro de Eliminar...?",
                    text: "Se eliminara un registro de horario...",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    $.ajax({
                        data: datos_eliminar,
                        dataType: 'json',
                        url: url + 'parametros/eliminar_horarios',
                        type: 'post',
                        beforeSend: function () {},
                        success: function () {

                        }
                    });
                    setTimeout(function () {
                        swal("Eliminacion con exito...!!!");
                    }, 1000);
                });
            } else {
                swal("...Solo escoja un profesional...");
            }
        } else {
            swal("..Debe seleccionar el turno correspondiente...");
        }

    });

});
