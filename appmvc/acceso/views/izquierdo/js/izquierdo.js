 var modulo = "/appmvc",
     url = 'http://' + document.domain + modulo + '/acceso/',
     publico = "/public/",
     url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
     url_ruta_archivos = 'http://' + document.domain + '/images/izquierdo/',
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
         url: url + 'izquierdo/listar',
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
                         datos_en_fila += '<tr>';
                         datos_en_fila += '<td>' + (i + 1) + '</td>';
                         datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                         datos_en_fila += '<td>' + (data[i].descripcion) + '</td>';
                         datos_en_fila += '<td><a href = "' + (url_ruta_archivos + '/' + data[i].archivo) + '" target = _black data-lightbox = "smile" </a>  <img height="42" width="42" src="' + (url_ruta_archivos + '/' + data[i].archivo) + '"> </a></td>';
                         datos_en_fila += '<td><a href = "' + (data[i].enlace) + '" target = _black </a> ' + (data[i].enlace) + '</td>';
                         datos_en_fila += '<td>' + (data[i].tipo_estado) + '</td>';
                         datos_en_fila += '<td><button type="button" name="activar" id="' + data[i].id + '" class="btn btn-success  btn_activar">Mostrar</button></td>';
                         datos_en_fila += '<td><button type="button" name="desactivar" id="' + data[i].id + '" class="btn btn-info  btn_desactivar">NO Mostrar</button></td>';
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

 function activar_desactivar_mostrar(lc_leer_id, lc_activar) {
     data = { 'id': lc_leer_id, 'activar': lc_activar };

     $.ajax({
         data: data,
         dataType: 'json',
         url: url + 'izquierdo/activar',
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

     $(document).on('click', '.btn_ver_imagen', function() {
         var lc_leer_id = $(this).attr("id"),
             arrayDeCadenas = lc_leer_id.split('*'),
             lc_get_id = arrayDeCadenas[0],
             lc_get_imagen1 = arrayDeCadenas[1];
         $("#img-imagen1").attr("src", url_ruta_archivos + '/' + lc_get_imagen1);
         $('#crud_imagen1').modal({ show: true, backdrop: 'static' });
     });

     $(document).on('click', '.btn_activar', function() {
         var lc_leer_id = $(this).attr("id"),
             lc_activar = '1';

         activar_desactivar_mostrar(lc_leer_id, lc_activar);


     });

     $(document).on('click', '.btn_desactivar', function() {
         var lc_leer_id = $(this).attr("id"),
             lc_activar = '0';
         activar_desactivar_mostrar(lc_leer_id, lc_activar);


     });

     $(document).on('click', '.btn_eliminar', function() {
         var lc_leer_id = $(this).attr("id");
         $('#id').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar').modal({ show: true, backdrop: 'static' });
     });

     $("#imagen1").change(function() {
         $("#txtEnlace").attr("disabled", false);
         $("#btn_grabar").attr("disabled", false);
         subir_imagen1 = this.files[0],
             lc_nombre_archivo_imagen1 = subir_imagen1["name"],
             etiqueta_dom_txt = 'imagen1', etiqueta_dom = $("#imagen1"), msj_dom = $("#msj_imagen");
         if (subir_imagen1["type"] != "image/jpeg" && subir_imagen1["type"] != "image/png" && subir_imagen1["type"] != "image/jpg") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato JPG, Vuelva a subir  --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, subir_imagen1);
             $.ajax({
                 dataType: 'json',
                 url: url + 'izquierdo/subir_imagen1',
                 type: 'post',
                 data: data_form,
                 contentType: false,
                 cache: false,
                 processData: false,
                 beforeSend: function() {
                     msj_dom.html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
                 },
                 success: function(datos) {
                     if (datos == "1") {
                         msj_dom.html("<center><strong><font color='green'> --- Imagen Conforme  subido --- </font><strong></center>").show();
                         $("#btn_grabar").attr("disabled", false);
                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                         $("#btn_grabar").attr("disabled", true);
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
     });




     $("#btn_nuevo").click(function() {
         $("#txtDescripcion").val('').attr("disabled", false);
         $("#imagen1").val('').attr("disabled", true);
         $("#txtEnlace").val('').attr("disabled", true);
         $("#btn_grabar").attr("disabled", true);
         $('#registrar').modal({ show: true, backdrop: 'static' });

     });

     $("#txtDescripcion")
         .focus()
         .keypress(function() {
             $("#imagen1").val('').attr("disabled", false);
         });

     $("#btn_grabar").click(function() {
         var lc_txtDescripcion = $("#txtDescripcion").val(),
             lc_enlace = $("#txtEnlace").val(),
             datos = {
                 'descripcion': lc_txtDescripcion,
                 'imagen1': lc_nombre_archivo_imagen1,
                 'enlace': lc_enlace,
             };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'izquierdo/grabar',
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
         var leer_id = $('#id').val();
         data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'izquierdo/eliminar',
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