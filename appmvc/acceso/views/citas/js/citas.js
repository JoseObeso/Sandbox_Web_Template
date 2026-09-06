 var modulo = "/appmvc",
     url = 'http://' + document.domain + modulo + '/acceso/',
     publico = "/public/",
     url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
     url_ruta_archivos = 'http://' + document.domain + '/citas/maq_citas/images/voucher/',
     ln_indicador = 0,
     lc_nombre_archivo_imagen1, lc_nombre_archivo_imagen2, lc_nombre_archivo, datos_en_fila, archivo_subir_bien, imagen,
     gd_fecha_total = new Date(),
     gt_hora_actual = gd_fecha_total.getHours() + ':' + gd_fecha_total.getMinutes() + ':' + gd_fecha_total.getSeconds();



 function mostrar_mensaje_en_modal(tipo_alerta, mensaje_alerta) {
     var timeslide = 100;
     $("#mostrar_mensaje_emergente").animate({ scrollTop: 0 }, 100);
     $("#mostrar_mensaje_emergente").find(".mensajes").html('<div class="alert ' + tipo_alerta + ' mensajes-descripcion"></div>');
     $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").hide(0).html('<strong>' + mensaje_alerta + '</strong>')
     $("#mostrar_mensaje_emergente").find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
     $("#mostrar_mensaje_emergente").modal({ show: true, backdrop: 'static' });
 }




 function listar() {
     var lc_buscar = $("#buscar").val(),
         lc_anio = $("#anio").val(),
         lc_mes = $("#mes").val(),
         data = { 'descripcion': lc_buscar, 'anio': lc_anio, 'mes': lc_mes };
     $.ajax({
         data: data,
         dataType: 'json',
         url: url + 'citas/listar',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
             console.log(data);
             $("#msj-titular").html("");
             $('#mostrar-datos-busqueda').html("");
             if (data[0].respuesta == 1) {
                 if (data.length > 0) {
                     var datos_en_fila = '';
                     for (var i = 0; i < data.length; i++) {
                         var ln_id = data[i].idcitasigsalud;
                         if (ln_id == 0 | ln_id.length == 0) {
                             datos_en_fila += '<tr>';
                         } else {
                             datos_en_fila += '<tr class = "alert-info">';
                         }


                         datos_en_fila += '<td>' + (i + 1) + '</td>';
                         datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                         datos_en_fila += '<td>' + (data[i].dni_paciente) + '</td>';
                         datos_en_fila += '<td>' + (data[i].nombres_paciente) + '</td>';
                         datos_en_fila += '<td>' + (data[i].celular_paciente) + '</td>';
                         datos_en_fila += '<td>' + (data[i].nombreconsultorio) + '</td>';
                         datos_en_fila += '<td>' + (data[i].turno) + '</td>';
                         datos_en_fila += '<td>' + (data[i].nro_operacion) + '</td>';
                         datos_en_fila += '<td><a href = "' + (url_ruta_archivos + '/' + data[i].voucher) + '" target = _black data-lightbox = "smile" </a>  <img height="42" width="42" src="' + (url_ruta_archivos + '/' + data[i].voucher) + '"> </a></td>';
                         datos_en_fila += '<td>' + (data[i].idcitasigsalud) + '</td>';
                         datos_en_fila += '<td>' + (data[i].fechaotorgacita) + '</td>';
                         datos_en_fila += '<td><button type="button" name="activar" id="' + data[i].id + '*' + data[i].idcitasigsalud + '" class="btn btn-success  btn_activar">Otorgar</button></td>';
                         datos_en_fila += '<td><button type="button" name="desactivar" id="' + data[i].id + '*' + data[i].idcitasigsalud + '" class="btn btn-info  btn_desactivar">Desactivar</button></td>';
                         datos_en_fila += '<td><button type="button" name="eliminar" id="' + data[i].id + '" class="btn btn-danger  btn_eliminar">X</button></td>';
                         datos_en_fila += '</tr>';
                     }
                     $('#mostrar-datos-busqueda').append(datos_en_fila);
                     $('#msj-titular').html("<center><strong>Se ubicaron " + data.length + " -- Registros  -- </center></strong>");
                 }
             } else {
                 $('#mostrar-datos-busqueda').html("<center><strong>...No existe registros ... </strong></center>");
                 $('#msj-titular').html(" ... No existen registros ....");
             }
         },
         error: function(jqXHR, textStatus, errorThrown) {
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


 function limpiar_filtros_busqueda() {
     $("#buscar").val('');
     $("#anio").val(numero_del_anio());
     listar();
 }

 function activar_desactivar_mostrar(lc_get_id, lc_activar) {
     var data = { 'id': lc_get_id, 'activar': lc_activar };
     $.ajax({
         data: data,
         dataType: 'json',
         url: url + 'citas/activar',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
             $("#msj-titular").html("");
             listar();
         },

         error: function(jqXHR, textStatus, errorThrown) {
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

 $(document).ready(function() {
     $('.crear-tooltip').tooltip();
     listar();

     $("#btn_busqueda").click(function() {
         listar();
     });
     $("#btn_limpiar").click(function() {
         limpiar_filtros_busqueda();

     });

     $('#fecha_cita')
         .datepicker({
             format: 'dd/mm/yyyy',

             autoclose: true
         })
         .on('changeDate', function(e) {});





     $(document).on('click', '.btn_activar', function() {
         var lc_leer_id = $(this).attr("id"),
             arrayDeCadenas = lc_leer_id.split('*'),
             lc_get_id = arrayDeCadenas[0],
             lc_get_idcitas = arrayDeCadenas[1],
             ln_verificar = lc_get_idcitas.length;
         if (ln_verificar == 0 | lc_get_idcitas == 0) {
             $('#txtIdCitaWeb').val(lc_get_id);
             $('#txtIdcita').val('').attr("disabled", false);
             $('#fecha_cita').val(dia_mes_anio_real_time()).attr("disabled", true);
             $('#txtPrecio').val(10).attr("disabled", true);
             $("#btn_grabar").attr("disabled", true);
             $('#registrar').modal({ show: true, backdrop: 'static' });
         } else {
             mostrar_mensaje_en_modal("alert-danger", '<center> -- Ya tiene Cita Otorgada -- </center>');
         }
     });

     $("#txtIdcita")
         .on('input', function() {
             this.value = this.value.replace(/[^0-9]/g, '');
         });

     $("#txtPrecio")
         .on('input', function() {
             this.value = this.value.replace(/[^0-9]/g, '');
         });




     $(document).on('click', '.btn_desactivar', function() {
         var lc_leer_id = $(this).attr("id"),
             arrayDeCadenas = lc_leer_id.split('*'),
             lc_get_id = arrayDeCadenas[0],
             lc_get_idcitas = arrayDeCadenas[1],
             lc_activar = '0',
             ln_verificar = lc_get_idcitas.length;
         if (ln_verificar == 0 | lc_get_idcitas == 0) {
             mostrar_mensaje_en_modal("alert-danger", '<center> -- NO tiene CITA Asignada -- </center>');
         } else {
             activar_desactivar_mostrar(lc_get_id, lc_activar);
         }





     });

     $(document).on('click', '.btn_eliminar', function() {
         var lc_leer_id = $(this).attr("id");
         $('#id').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar').modal({ show: true, backdrop: 'static' });

     });






     $('#txtIdcita')
         .focus()
         .click(function() {
             $('#fecha_cita').attr("disabled", false);
             $('#txtPrecio').attr("disabled", false);
             $("#btn_grabar").attr("disabled", false);

         })
         .keypress(function() {
             $('#fecha_cita').attr("disabled", false);
             $('#txtPrecio').attr("disabled", false);
             $("#btn_grabar").attr("disabled", false);
         });




     $("#btn_grabar").click(function() {
         var lc_idcitaweb = $("#txtIdCitaWeb").val(),
             lc_txtidcita = $("#txtIdcita").val(),
             lc_fechacita = $("#fecha_cita").val(),
             lc_precio = $("#txtPrecio").val(),
             datos = {
                 'id': lc_idcitaweb,
                 'idcitasigsalud': lc_txtidcita,
                 'fecha': lc_fechacita,
                 'precio': lc_precio
             };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'citas/grabar',
             type: 'post',
             beforeSend: function() {
                 $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#msj_imagen").html("");
                 $('#registrar').modal("toggle");
                 $("#btn_grabar").attr("disabled", true);
                 listar();
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Error, Revisar consola ');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });

     $("#si_eliminar").click(function() {
         var leer_id = $('#id').val(),
             data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'citas/eliminar',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar').modal("toggle");
                 listar();
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Error, Revisar consola ');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });




     });


     $("#cancelar").click(function() {
         $('#mostrar_confirmar_eliminar').modal("toggle");
         listar();

     });





 });