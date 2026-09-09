var url = 'http://' + document.domain + '/rrhh/personal/',  url_js = 'http://' + document.domain + '/rrhh/public/js',
    usuario_seleccion, unidad_seleccion, codigo_uo, dni_usuario, datos_grabar_unidad;


function mostrar_datatable_unidad() {
    "use strict";

    $('#tabla_unidad').DataTable({
        "language": {
            "url": url_js + "/es_es.lang",
        },
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"]
        ],
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}





function procesar_desactivar_usuario_en_unidad_organica(id_uo) {
    "use strict";
    $.post(url + 'parametros/desactivar_usuario_uo', {
        id_uo_desactivar: id_uo
    }, function (data) {
        if (data.estado === 1) {
            window.location.reload();
        } else if (data.estado === 2) {
            swal("No existe registro...");
        } else {
            swal("Error del sistema");
        }
    }, 'json');
}



$(document).ready(function () {
    "use strict";
    $('.crear-tooltip').tooltip();

    mostrar_datatable_unidad();


    $("#seleccion-unidad-organica").select2({
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


    $("#seleccion-unidad-organica").select2({
        allowClear: true,
        placeholder: "Selecionar",

    });


    $(document).delegate("#asignar_usuario_uo", "click", function () {

        $('#modal-asignar-usuario-a-uo').modal({
            show: true,
            backdrop: 'static'
        });

        $("#seleccion-unidad-organica").change(function () {
            $('#seleccion-unidad-organica').css("background-color", "#FCFBA0");
            unidad_seleccion = $('#seleccion-unidad-organica option:selected').attr('nombre_uo');
            codigo_uo = $('#seleccion-unidad-organica option:selected').attr('codigo_uo');
            $('#seleccion-usuarios').attr("disabled", false);
            $("#seleccion-usuarios").css("background-color", "#FCFBA0");
            $("#unidad_organica_seleccion").text("Unidad Seleccionada : " + unidad_seleccion);
        });

        $("#seleccion-usuarios").click(function () {
            usuario_seleccion = $('#seleccion-usuarios option:selected').attr('usuario_seleccion');
            dni_usuario = $('#seleccion-usuarios option:selected').attr('dni_usuario');

            $('#seleccion-usuarios').attr("disabled", false);
            $("#usuario_seleccion").text("Usuario Autorizado : " + usuario_seleccion);
            $('#btn-guardar-asignacion-usuario').attr("disabled", false);
        });

    });




    $("#btn-guardar-asignacion-usuario").click(function () {
        datos_grabar_unidad = {
            "dni_usuario": dni_usuario,
            "codigo_uo": codigo_uo
        };
        $.ajax({
            data: datos_grabar_unidad,
            dataType: 'json',
            url: url + 'parametros/guardar_usuario_asignado_a_uo',
            type: 'post',
            beforeSend: function () {

            },
            success: function () {
                $('#btn-guardar-asignacion-usuario').attr("disabled", true);
                swal("Usuario :  " + usuario_seleccion + "   ... Asignado Correctamente...", "", "success");
                window.location.reload();
            }

        });


    });


    $("#desactivar_usuarios_uo").click(function () {
        if ($('.usuarios:checked').length > 0) {
            if ($('.usuarios:checked').length === 1) {
                var id_uo = $(".usuarios:checked").attr("id");
                swal({
                    title: "¿Seguro de Desactivar Usuario ",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                      procesar_desactivar_usuario_en_unidad_organica(id_uo);
                      swal("Todo conforme...  ");
                     window.location.reload();
                
                });

            } else {
                swal("Solo escoja una sola unidad...");
            }
        } else {
            swal("Debe seleccionar Unidad Organica para anular al usuario respectivo...");
        }

    });

 

});
