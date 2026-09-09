var url = 'http://' + document.domain + '/rrhh/personal/',
    url_grafico = 'http://' + document.domain + '/rrhh/public/gra',
    url_js  = 'http://' + document.domain + '/rrhh/public/js',nombres_completos, cargo, unidad, fecha_ingreso, fecha_renuncia, fecha_ultimo_dia_trabajo, motivo, observacion, idtipoempleado, idcentrosubcosto, id_motivo_cese, leer_id_personal, leer_dni, leer_unidad, leer_cargo, leer_fecha_ingreso, leer_fecha_renuncia, leer_fecha_ultimo_dia_trabajo, leer_motivo, leer_observacion, lc_buscar_nombre, dato_buscar, nro_registros, lc_registro_verificar, leer_apellidos_nombres, fecha1, fecha2;




function inicializar_botones() {
    "use strict";
    $('#nuevo_registro').attr("disabled", false);
    $('#modificacion_registro').attr("disabled", true);
    $('#eliminacion_registro').attr("disabled", true);
}

function mostrar_datatable() {
    "use strict";

    $('#Tabla_Personal_Renuncia').DataTable({

        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [5, 10, 20, 25, 50, -1],
            [5, 10, 20, 25, 50, "Todos"]
        ] 
        
        
    });
}


function leer_nombre_y_mostrar_resultado(lc_buscar_nombre) {
    "use strict";
    dato_buscar = {
        "nombres": lc_buscar_nombre
    };
    $.ajax({
        data: dato_buscar,
        dataType: 'json',
        url: url + 'personal/buscar_por_nombre_en_renunciantes',
        type: 'post',
        beforeSend: function () {},
        success: function (encontrados) {
            $("#slc_personal_renuncia").html('');
            $("#slc_personal_renuncia").show();
            nro_registros = encontrados.length;
            encontrados.forEach(function (filas) {
                lc_registro_verificar = filas.verificar;
                if (lc_registro_verificar === '1') {
                    $("#slc_personal_renuncia").append('<option value="' + filas.idpersonal + '"  idpersonal = "' + filas.idpersonal + '" apellidos_nombres =  "' + filas.apellidosnombres + '"  dni = "' + filas.dni + '"  unidad = "' + filas.unidad + '" cargo = "' + filas.cargo + '" fechaingreso = "' + filas.fechaingreso + '" fecharenuncia = "' + filas.fecharenuncia + '" fechaultimodiatrabajo = "' + filas.fechaultimodiatrabajo + '" motivo = "' + filas.motivo + '" observacion = "' + filas.observacion + '"apellidosnombres = "' + filas.apellidosnombres + '"  >' + filas.dni + ' - ' + filas.apellidosnombres + '</option>');
                    $("#total_personal_registrado").text(nro_registros + ' - Registros.');
                    lc_registro_verificar = '0';
                    $("#slc_personal_renuncia").attr('disabled', false);
                } else {
                    $("#total_personal_registrado").text('No Existe Registros.');
                    lc_registro_verificar = '0';
                    $("#slc_personal_renuncia").empty();
                    $("#slc_personal_renuncia").attr('disabled', true);
                }
            });
        }
    });
}



function leer_datos_mostrarlo_en_etiquetas() {
    "use strict";
    leer_id_personal = $('#slc_personal_renuncia  option:selected').attr('idpersonal');
    leer_dni = $('#slc_personal_renuncia  option:selected').attr('dni');
    leer_unidad = $('#slc_personal_renuncia  option:selected').attr('unidad');
    leer_cargo = $('#slc_personal_renuncia  option:selected').attr('cargo');
    leer_fecha_ingreso = $('#slc_personal_renuncia  option:selected').attr('fechaingreso');
    leer_fecha_renuncia = $('#slc_personal_renuncia  option:selected').attr('fecharenuncia');
    leer_fecha_ultimo_dia_trabajo = $('#slc_personal_renuncia  option:selected').attr('fechaultimodiatrabajo');
    leer_motivo = $('#slc_personal_renuncia  option:selected').attr('motivo');
    leer_observacion = $('#slc_personal_renuncia  option:selected').attr('observacion');
    leer_apellidos_nombres = $('#slc_personal_renuncia  option:selected').attr('apellidos_nombres');
    $("#apellidos_nombres").val(leer_apellidos_nombres);
    $("#dni").val(leer_dni);
    $("#cargo").val(leer_cargo);
    $("#unidad").val(leer_unidad);
    $("#ingreso").val(leer_fecha_ingreso);
    $("#renuncia").val(leer_fecha_renuncia);
    $("#ultimo").val(leer_fecha_ultimo_dia_trabajo);
    $("#motivo").val(leer_motivo);
    $("#observacion").val(leer_observacion);
    $('#modificacion_registro').attr("disabled", false);
    $('#eliminacion_registro').attr("disabled", false);
}




function habilitar_y_limpiar_registro_personal_renunciante() {
    "use strict";
    $('#modal-registrar-personal-renunciante').modal({
        show: true,
        backdrop: 'static'
    });
    $('#btn-guardar-personal-renunciante').attr("disabled", true);
    $('#nombres_personal').val('');
    $('#nombres_personal').css("background-color", "#FCFBA0");
    $('#nombres_personal').css("text-transform", "uppercase");

    $('#modal-registrar-personal-renunciante').on('shown.bs.modal', function () {
        $('#nombres_personal').trigger('focus');
    });

    $('#seleccion-cargo').attr("disabled", true);
    $('#seleccion-cargo').select2("val", "");
    $('#seleccion-unidad-organica').attr("disabled", true);
    $('#seleccion-unidad-organica').select2("val", "");
    $("#fecha-ingreso").css("background-color", "#FFFFFF");
    $('#fecha-ingreso').attr("disabled", true);
    $('#fecha-ingreso').attr("disabled", true);
    $('#fecha-ingreso').val('');
    $("#fecha-renuncia").css("background-color", "#FFFFFF");
    $('#fecha-renuncia').attr("disabled", true);
    $('#fecha-renuncia').val('');
    $('#fecha-ultimo-dia-trabajo').css("background-color", "#FFFFFF");
    $('#fecha-ultimo-dia-trabajo').attr("disabled", true);
    $('#fecha-ultimo-dia-trabajo').val('');
    $('#seleccion-motivo').css("background-color", "#FFFFFF");
    $('#seleccion-motivo').attr("disabled", true);
    $('#seleccion-motivo').val('');
    $('#txt_area_observaciones').css("background-color", "#FFFFFF");
    $('#txt_area_observaciones').attr("disabled", true);
    $('#txt_area_observaciones').css("text-transform", "uppercase");
    $('#txt_area_observaciones').val('');

}


function poner_en_color_blanco_todos_los_controles() {
    "use strict";
    $('#nombres_personal').css("background-color", "#FFFFFF");
    $("#fecha-ingreso").css("background-color", "#FFFFFF");
    $("#fecha-renuncia").css("background-color", "#FFFFFF");
    $("#fecha-ultimo-dia-trabajo").css("background-color", "#FFFFFF");
    $("#seleccion-motivo").css("background-color", "#FFFFFF");

}



function procesar_eliminacion_personal_renunciante(idpersonal) {
    "use strict";
    var id_personal = idpersonal;
    $.post(url + 'personal/Eliminar_Datos_Personal_Renunciante', {
        id_personal: id_personal
    }, function (data) {
        if (data.estado === 1) {
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        } else if (data.estado === 2) {
            swal("No existe Registro");
        } else {
            swal("No existe Sistema");
        }
    }, 'json');


}



function procesar_actualizacion_datos_persoal_renunciante() {
    "use strict";
    var id_personal = idpersonal;
    $.post(url + "personal/guardar_modificacion_renunciante", {
        id_personal: id_personal
    }, function (data) {
        if (data.estado === 1) {
            $('#modal-modificar-personal-renunciante').modal('hide');
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        } else if (data.estado === 2) {
            lc_buscar_nombre = '';
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        } else {
           swal("Error de Sistema");
        }
    }, 'json');

}




$(document).ready(function () {
    "use strict";
    inicializar_botones();
    mostrar_datatable();
    $("#txt_buscar_nombre")
        .focus()
        .keypress(function () {
            lc_buscar_nombre = $("#txt_buscar_nombre").val();
            leer_nombre_y_mostrar_resultado(lc_buscar_nombre);
        });

    $("#slc_personal_renuncia")
        .click(function () {
            leer_datos_mostrarlo_en_etiquetas();
        })
        .keyup(function () {
            leer_datos_mostrarlo_en_etiquetas();
        });


    $(document).delegate("#nuevo_registro", "click", function () {
        $('#modal-registrar-personal-renunciante').modal({
            show: true,
            backdrop: 'static'
        });

    });


    $("#nombres_personal").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: url + "personal/buscar_personal_por_nombre_todos_bdatos",
                type: 'POST',
                dataType: "json",
                data: {
                    nombres_personal: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        if (item.estadorespuesta === 1) {
                            return {
                                label: item.origen + ' - ' + item.apellidos_nombre + ' - ' + item.dni,
                                dni: item.dni,
                                origen: item.origen,
                                paterno: item.paterno,
                                materno: item.materno,
                                nombres: item.nombres,
                                codigotempus: item.idcodigotempus
                            };
                        } else {
                            return {
                                label: item.mensaje,
                                value: item.estadorespuesta
                            };
                        }
                    }));
                }


            });

        },
        minLength: 2,
        focus: function () {
            return false;
        },
        select: function (event, ui) {
            if (ui.item.value === 0) {
                return false;
            } else {
                $("#nombres_personal").val(ui.item.label);
                $("#dni_personal").val(ui.item.dni);
                $("#origen_personal").val(ui.item.origen);
                $("#paterno_personal").val(ui.item.paterno);
                $("#materno_personal").val(ui.item.materno);
                $("#solo_nombres_personal").val(ui.item.nombres);
                $("#codigo-tempus").val(ui.item.codigotempus);
                $('#seleccion-cargo').attr("disabled", false);
                $('#seleccion-cargo').css("background-color", "#FCFBA0");
                return false;
            }
        }
    });
    $("#nombres_personal").autocomplete("option", "appendTo", ".posicion_fn");


    $("#seleccion-cargo").focus(function () {
        $('#nombres_personal').css("background-color", "#FFFFFF");
        $('#seleccion-cargo').css("background-color", "#FCFBA0");
        $("#seleccion-motivo").css("background-color", "#FFFFFF");
    });

    $("#seleccion-cargo").change(function () {
        $('#seleccion-cargo').css("background-color", "#FFFFFF");
        $('#seleccion-unidad-organica').css("background-color", "#FCFBA0");
        $('#seleccion-unidad-organica').attr("disabled", false);
        $("#seleccion-motivo").css("background-color", "#FFFFFF");

    });

    $("#seleccion-cargo").select2({
        allowClear: true,
        placeholder: "Selecionar un cargo",
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


    $("#seleccion-cargo").select2({
        allowClear: true,
        placeholder: "Selecionar",

    });


    $("#seleccion-unidad-organica").change(function () {
        $('#seleccion-unidad-organica').css("background-color", "#FFFFFF");
        $('#fecha-ingreso').css("background-color", "#FCFBA0");
        $('#fecha-ingreso').attr("disabled", false);
        $("#seleccion-motivo").css("background-color", "#FFFFFF");

    });


    $("#seleccion-unidad-organica").select2({
        allowClear: true,
        placeholder: "Selecionar una unidad",
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
    $("#seleccion-unidad-organica").select2({
        allowClear: true,
        placeholder: "Selecionar"
    });



    $('#fecha-ingreso').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar fecha de ingreso"
    }).on('show', function () {
        var modal = $('#fecha-ingreso').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $("#fecha-ingreso").css("background-color", "#FCFBA0");
        $('#nombres_personal').css("background-color", "#FFFFFF");
        $("#fecha-renuncia").css("background-color", "#FCFBA0");
        $("#fecha-renuncia").attr("disabled", false);
        $("#seleccion-motivo").css("background-color", "#FFFFFF");
    });


    $('#fecha-renuncia').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar fecha de ingreso"
    }).on('show', function () {
        var modal = $('#fecha-renuncia').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);

        $("#fecha-renuncia").css("background-color", "#FCFBA0");
        $("#fecha-ingreso").css("background-color", "#FFFFFF");
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FCFBA0");
        $("#fecha-ultimo-dia-trabajo").attr("disabled", false);
        $("#seleccion-motivo").css("background-color", "#FFFFFF");



    });

    $("#chk_ver_fecha_renuncia_blanco").click(function () {
        $("#fecha-renuncia").val("");
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FCFBA0");
        $("#fecha-ultimo-dia-trabajo").attr("disabled", false);


    });


    $("#fecha-ultimo-dia-trabajo").click(function () {
        var lc_fecha_ingreso = $("#fecha-ingreso").val();
        var lc_fecha_renuncia = $("#fecha-renuncia").val();
        if (lc_fecha_renuncia !== '') {
            fecha1 = moment(lc_fecha_ingreso, 'DD/MM/YYYY', true).format();
            fecha2 = moment(lc_fecha_renuncia, 'DD/MM/YYYY', true).format();
            if (fecha2 < fecha1) {
                swal("Fecha de Renuncia es menor que la fecha de Ingreso a la Institucion, corrija en el casillero verde oliva");
                $("#fecha-renuncia").focus();
                $("#fecha-renuncia").css("background-color", "#87DBA4");
                $("#fecha-ultimo-dia-trabajo").attr("disabled", true);
                $("#seleccion-motivo").attr("disabled", true);
                $('#btn-guardar-personal-renunciante').attr("disabled", true);
                return;
            }
        }

    });


    $('#fecha-ultimo-dia-trabajo').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar fecha de ingreso"
    }).on('show', function () {
        var modal = $('#fecha-ultimo-dia-trabajo').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FCFBA0");
        $("#fecha-ingreso").css("background-color", "#FFFFFF");
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FCFBA0");
        $("#seleccion-motivo").attr("disabled", false);
        $("#seleccion-motivo").css("background-color", "#FCFBA0");

    });

    $("#chk_ver_fecha_ultimo_dia_trabajo").click(function () {
        $("#fecha-ultimo-dia-trabajo").val("");
        $("#seleccion-motivo").css("background-color", "#FCFBA0");
        $("#seleccion-motivo").attr("disabled", false);

    });

    $("#seleccion-motivo").focus(function () {
        $('#seleccion-motivo').css("background-color", "#FCFBA0");
        $("#fecha-ingreso").css("background-color", "#FFFFFF");
        $("#fecha-renuncia").css("background-color", "#FFFFFF");
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FFFFFF");
        $('#txt_area_observaciones').attr("disabled", false);
        $('#txt_area_observaciones').css("background-color", "#FCFBA0");
        $('#btn-guardar-personal-renunciante').attr("disabled", false);
        $("#seleccion-motivo").click(function () {
            var lc_fecha_ingreso = $("#fecha-ingreso").val();
            var lc_fecha_ultimo_dia = $("#fecha-ultimo-dia-trabajo").val();
            if (lc_fecha_ultimo_dia !== '') {
                  fecha1 = moment(lc_fecha_ingreso, 'DD/MM/YYYY', true).format();
                  fecha2 = moment(lc_fecha_ultimo_dia, 'DD/MM/YYYY', true).format();
                if (fecha2 < fecha1) {
                    swal("Fecha de ultimo dia de trabajo menor que la fecha de Ingreso a la Institucion, corrija en el casillero verde oliva");
                    $("#fecha-ultimo-dia-trabajo").focus();
                    $("#fecha-ultimo-dia-trabajo").css("background-color", "#87DBA4");
                    $("#seleccion-motivo").attr("disabled", true);
                    $('#btn-guardar-personal-renunciante').attr("disabled", true);
                    return;
                }
            }
        });
    });



    $("#txt_area_observaciones").focus(function () {
        $('#txt_area_observaciones').css("background-color", "#FCFBA0");
        $("#seleccion-motivo").css("background-color", "#FFFFFF");
        $("#fecha-ingreso").css("background-color", "#FFFFFF");
        $("#fecha-renuncia").css("background-color", "#FFFFFF");
        $("#fecha-ultimo-dia-trabajo").css("background-color", "#FFFFFF");
        $("#seleccion-motivo").css("background-color", "#FFFFFF");
        $('#txt_area_observaciones').attr("disabled", false);
        $('#btn-guardar-personal-renunciante').attr("disabled", false);


    });


    /*** Boton de Inicio de Grabacion **/
    $(document).delegate("#btn-guardar-personal-renunciante", "click", function () {
        var Verifica_Seleccion_Motivo_Renuncia = $("#seleccion-motivo").val();
        if (Verifica_Seleccion_Motivo_Renuncia === '') {
            swal(" ... Dato Faltante....", "Debe seleccionar el tipo de MOTIVO DE RENUNCIA, en caso contrario no podra continuar con la Grabacion del Registro.... ");
            $('#btn-guardar-personal-renunciante').attr("disabled", true);
        } else {
            var apellido_paterno = $("#paterno_personal").val();
            var apellido_materno = $("#materno_personal").val();
            var solo_nombres = $("#solo_nombres_personal").val();
            var apellidos_nombres_completos = apellido_paterno + ' ' + apellido_materno + ' ' + solo_nombres;
            swal({
                    title: "Confirme Grabacion ",
                    text: "Se procedera a grabar el registro de Personal Renunciante : " + apellidos_nombres_completos,
                    type: "info",
                    showCancelButton: true,
                    confirmButtonClass: "btn-info",
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: true,
                    closeOnCancel: true,
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $("#frm-registrar-personal-renunciante").submit();

                    }
                });
        }

    });

    $(document).delegate("#frm-registrar-personal-renunciante", "submit", function () {
        var datos = $(this).serialize();
        var posting = $.post(url + "personal/grabar_personal_renunciante", datos);
        posting.done(function (data) {
            if (isJSON(data) !== true) {
                habilitar_y_limpiar_registro_personal_renunciante();
                $('#nombres_personal').css("background-color", "#59EBA4");
                $('#modal-registrar-personal-renunciante').on('hidden.bs.modal', function () {
                    $(this).removeData('bs.modal');
                    $(this).find('.modal-content').empty();
                });

            }

        });
        posting.fail(function () {
            swal("...Error en el servidor o de la red de datos...", "Reporte a Soporte Tecnico", "warning");
        });
        return false;
    });

    /* Fin de Procesamiento de grabacion de personal renunciante  */


    /* para cargo en modificacion de personal */





    $("#seleccion-cargo-m").select2({
        allowClear: true,
        placeholder: "Selecionar un cargo",
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

    $("#seleccion-cargo-m").select2({
        allowClear: true,
        placeholder: "Selecionar"


    });



    $("#seleccion-cargo-m").change(function () {
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);
    });



    $("#seleccion-unidad-organica-m").select2({
        allowClear: true,
        placeholder: "Selecionar una unidad",
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
    $("#seleccion-unidad-organica-m").select2({
        allowClear: true,
        placeholder: "Selecionar"
    });

    $("#seleccion-unidad-organica-m").change(function () {
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);
    });


    $('#fecha_ingreso_m').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar fecha de ingreso"
    }).on('show', function () {
        var modal = $('#fecha_ingreso_m').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $("#fecha_ingreso_m").css("background-color", "#6AF097");
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);

    });



    $("#seleccion-unidad-organica-m").change(function () {
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);
    });


    $('#fecha_renuncia_m').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar fecha de ingreso"
    }).on('show', function () {
        var modal = $('#fecha_renuncia_m').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $("#fecha_renuncia_m").css("background-color", "#6AF097");
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);
    });



    $("#chk_ver_fecha_renuncia_blanco_m").click(function () {
        $("#fecha_renuncia_m").val("");


    });

    $('#fecha_ultimo_dia_trabajo_m').datepicker({
        format: 'dd/mm/yyyy',
        startDate: "-3y",
        autoclose: true,
        placeholder: "Selecionar ultimo dia de trabajo"
    }).on('show', function () {
        var modal = $('#fecha_ultimo_dia_trabajo_m').closest('.modal');
        var datePicker = $('body').find('.datepicker');
        if (!modal.length) {
            $(datePicker).css('z-index', 'auto');
            return;
        }
        var zIndexModal = $(modal).css('z-index');
        $(datePicker).css('z-index', zIndexModal + 1);
        $("#fecha_ultimo_dia_trabajo_m").css("background-color", "#6AF097");
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);

    });
    $("#chk_ver_fecha_ultimo_dia_trabajo_m").click(function () {
        $("#fecha_ultimo_dia_trabajo_m").val("");


    });

    
    
      
                
    
    

    $("#chk_regresar_todas_las_fechas").click(function () {

        var idpersonal = $(".usuarios:checked").attr("id");
        $.post(url + 'personal/ConseguirDatosPersonalRenunciante', {
            idpersonal: idpersonal
        }, function (data) {
            if (data["estadorespuesta"] === 1) {
                nombres_completos = data.apellidos_nombres;
                cargo = data.cargo;
                unidad = data.unidad;
                fecha_ingreso = data["fecha_ingreso"];
                fecha_renuncia = data["fecha_renuncia"];
                fecha_ultimo_dia_trabajo = data["fecha_ultimo_dia_trabajo"];
                motivo = data["motivo"];
                observacion = data["observacion"];
                idtipoempleado = data["idtipoempleado"];
                idcentrosubcosto = data["idcentrosubcosto"];
                id_motivo_cese = data["id_motivo_cese"];

                $("#fecha_ingreso_m").val(fecha_ingreso);
                $("#fecha_renuncia_m").val(fecha_renuncia);
                $("#fecha_ultimo_dia_trabajo_m").val(fecha_ultimo_dia_trabajo);


            } else {
                swal("No existe conexion");
            }
        }, 'json');



    });


    /* fin de cargo para modificacion personal */

    $("#seleccion-motivo-m").click(function () {
        $('#seleccion-motivo-m').css("background-color", "#6AF097");
        $("#fecha-ingreso-m").css("background-color", "#FFFFFF");
        $("#fecha-renuncia-m").css("background-color", "#FFFFFF");
        $("#fecha-ultimo-dia-trabajo-m").css("background-color", "#FFFFFF");
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);
        $("#seleccion-motivo-m").click(function () {
            var lc_fecha_ingreso = $("#fecha-ingreso-m").val();
            var lc_fecha_ultimo_dia = $("#fecha-ultimo-dia-trabajo-m").val();
            if (lc_fecha_ultimo_dia !== '') {
                var fecha1 = moment(lc_fecha_ingreso, 'DD/MM/YYYY', true).format();
                var fecha2 = moment(lc_fecha_ultimo_dia, 'DD/MM/YYYY', true).format();
                if (fecha2 < fecha1) {
                    mensaje_emergente_aviso('Fecha de ultimo dia de trabajo menor que la fecha de Ingreso a la Institucion, corrija en el casillero verde oliva');
                    $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", true);

                    return;
                }
            }
        });
    });

    $("#txt_area_observaciones_m").click(function () {
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", false);

    });



    /* Inicio de Modificacion de Personal renunciante */
    $(document).delegate("#modificar-personal-renuncia", "click", function () {
        
                var idpersonal = $('#slc_personal_renuncia  option:selected').attr('idpersonal');
                $.post(url + 'personal/ConseguirDatosPersonalRenunciante', {
                    idpersonal: idpersonal
                }, function (data) {
                    if (data["estadorespuesta"] == 1) {
                        var nombres_completos = data["apellidos_nombres"];
                        var cargo = data["cargo"];
                        var unidad = data["unidad"];
                        var fecha_ingreso = data["fecha_ingreso"];
                        var fecha_renuncia = data["fecha_renuncia"];
                        var fecha_ultimo_dia_trabajo = data["fecha_ultimo_dia_trabajo"];
                        var motivo = data["motivo"];
                        var observacion = data["observacion"];
                        var idtipoempleado = data["idtipoempleado"];
                        var idcentrosubcosto = data["idcentrosubcosto"];
                        var id_motivo_cese = data["id_motivo_cese"];
                        $("#id_personal").val(idpersonal);
                        $("#nombres_personal_m").val(nombres_completos);
                        $("#cargo_m").val(cargo);
                        $("#unidad_m").val(unidad);
                        $("#fecha_ingreso_m").val(fecha_ingreso);
                        $("#fecha_renuncia_m").val(fecha_renuncia);
                        $("#fecha_ultimo_dia_trabajo_m").val(fecha_ultimo_dia_trabajo);
                        $("#motivo_m").val(motivo);
                        $("#txt_area_observaciones_m").val(observacion);
                        $("#idtipoempleado").val(idtipoempleado);
                        $("#idcentrosubcosto").val(idcentrosubcosto);
                        $("#id_motivo_cese").val(id_motivo_cese);
                        $("#fecha_ingreso_registrada").val(fecha_ingreso);
                        $("#fecha_renuncia_registrada").val(fecha_renuncia);
                        $("#fecha_ultimo_dia_registrada").val(fecha_ultimo_dia_trabajo);

                        $('#modal-modificar-personal-renunciante').modal({
                            show: true,
                            backdrop: 'static'
                        });

                    } else {
                        swal("No existe conexion...");
                    }
                }, 'json');

           
    });


    $(document).delegate("#btn-guardar-modificacion-personal-renunciante", "click", function () {
        $("#frm-modificar-personal-renunciante").submit();

    });

    $(document).delegate("#frm-modificar-personal-renunciante", "submit", function () {
        $('#btn-guardar-modificacion-personal-renunciante').attr("disabled", true);
        var datos = $(this).serialize();
        var posting = $.post(url + "personal/guardar_modificacion_renunciante", datos);
        posting.done(function (data) {

            if (isJSON(data) !== true) {
                recargar_personal_renunciante();
                swal("Grabacion Conforme...");
                $('#modal-modificar-personal-renunciante').on('hidden.bs.modal', function (e) {
                    $(this).removeData('bs.modal');
                    $(this).find('.modal-content').empty();
                });

            } else {
                mensaje_emergente_aviso('Error');
            }

        });
        posting.fail(function () {
            swal("...Error en el servidor o de la red de datos...", "Reporte a Soporte Tecnico", "warning");
        });
        return false;


    });

    /* Fin de Modificacion de Personal renunciante */

    /* Inicio de Eliminacion de personal renunciante */

    $(document).delegate("#eliminar-personal-renunciante", "click", function () {
  
         
                 var idpersonal = $('#slc_personal_renuncia  option:selected').attr('idpersonal');
                $.post(url + 'personal/ConseguirDatosPersonalRenunciante', {
                    idpersonal: idpersonal
                }, function (data) {
                    if (data["estadorespuesta"] === 1) {
                        var nombres_completos = data["apellidos_nombres"];
                        var cargo = data.cargo;
                        swal({
                                title: "¿Seguro de Eliminar Personal Renunciante?",
                                text: nombres_completos + ' - ' + cargo,
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "Cancelar Eliminacion",
                                confirmButtonColor: "#E13B1B",
                                confirmButtonText: "Proceder a Eliminar",
                                closeOnConfirm: true
                            },
                            function () {
                                procesar_eliminacion_personal_renunciante(idpersonal);

                            });
                    } else {
                        swal("No existe conexion");
                    }
                }, 'json');

  
    });








});
