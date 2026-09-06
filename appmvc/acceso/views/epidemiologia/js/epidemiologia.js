 var modulo = "/appmvc",
     url = 'http://' + document.domain + modulo + '/acceso/',
     publico = "/public/",
     url_grafico = 'http://' + document.domain + modulo + publico + '/gra/',
     url_ruta_archivos = 'http://' + document.domain + '/unidades/epidemiologia/pdf/boletin/',
     url_ruta_archivos_ficha = 'http://' + document.domain + '/unidades/epidemiologia/pdf/fichas/',
     url_ruta_archivos_alerta = 'http://' + document.domain + '/unidades/epidemiologia/pdf/alerta/',
     url_ruta_archivos_sala = 'http://' + document.domain + '/unidades/epidemiologia/pdf/sala/',
     url_ruta_archivos_analisis = 'http://' + document.domain + '/unidades/epidemiologia/pdf/analisis/',
     url_grafico_imagen = 'http://' + document.domain + '/images/slider',
     datos_en_fila, archivo_subir, imagen, gd_fecha_total = new Date(),
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
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listar',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
             $("#msj-titular").html("");
             $('#mostrar-datos-boletin').html("");
             if (data[0].respuesta == 1) {
                 if (data.length > 0) {
                     var datos_en_fila = '';
                     for (var i = 0; i < data.length; i++) {
                         datos_en_fila += '<tr>';
                         datos_en_fila += '<td>' + (i + 1) + '</td>';
                         datos_en_fila += '<td>' + (data[i].anio) + '</td>';
                         datos_en_fila += '<td>' + (data[i].descripcion) + '</td>';
                         datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                         datos_en_fila += '<td>' + (data[i].usuario) + '</td>';
                         datos_en_fila += '<td><a href = "' + (url_ruta_archivos + data[i].anio) + '/' + data[i].archivo + '" target = _black </a> ' + data[i].archivo + '</td>';
                         datos_en_fila += '<td><button type="button" name="eliminar" id="' + data[i].id + '" class="btn btn-danger  btn_eliminar">X</button></td>';
                         datos_en_fila += '</tr>';
                     }
                 }

                 $('#mostrar-datos-boletin').append(datos_en_fila);
                 $('#msj-titular').html("<center><strong>Se ubicaron " + data.length + " -- Registros  -- </center></strong>");

             } else {
                 $('#mostrar-datos-boletin').html("<center><strong>...No existe registros ... </strong></center>");
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

 function listar_fichas() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listar_fichas',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular-fichas").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(fichas) {
             $("#msj-titular-fichas").html("");
             $('#mostrar-datos-fichas').html("");
             if (fichas[0].respuesta_ficha == 1) {
                 if (fichas.length > 0) {
                     var datos_en_fila_ficha = '';
                     for (var n = 0; n < fichas.length; n++) {
                         datos_en_fila_ficha += '<tr>';
                         datos_en_fila_ficha += '<td>' + (n + 1) + '</td>';
                         datos_en_fila_ficha += '<td>' + (fichas[n].anio_ficha) + '</td>';
                         datos_en_fila_ficha += '<td>' + (fichas[n].descripcion_ficha) + '</td>';
                         datos_en_fila_ficha += '<td><a href = "' + (url_ruta_archivos_ficha + fichas[n].anio_ficha) + '/' + fichas[n].archivo_ficha + '" target = _black </a> ' + fichas[n].archivo_ficha + '</td>';
                         datos_en_fila_ficha += '<td>' + (fichas[n].dfecharegistro_ficha) + '</td>';
                         datos_en_fila_ficha += '<td>' + (fichas[n].usuario_ficha) + '</td>';
                         datos_en_fila_ficha += '<td><button type="button" name="eliminar_ficha" id_ficha="' + fichas[n].id_ficha + '" class="btn btn-danger  btn_eliminar_ficha">X</button></td>';
                         datos_en_fila_ficha += '</tr>';
                     }
                 }
                 $('#mostrar-datos-fichas').append(datos_en_fila_ficha);
                 $('#msj-titular-ficha').html("<center><strong>Se ubicaron " + fichas.length + " -- Registros  -- </center></strong>");

             } else {
                 $('#mostrar-datos-fichas').html("<center><strong>...No existe registros ... </strong></center>");
                 $('#msj-titular-ficha').html(" ... No existen registros ....");
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

 function listar_alertas() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listar_alertas',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular-alerta").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(alerta) {
             $("#msj-titular-alerta").html("");
             $('#mostrar-datos-alerta').html("");
             if (alerta[0].respuesta_alerta == 1) {
                 if (alerta.length > 0) {
                     var datos_en_fila_alerta = '';
                     for (var a = 0; a < alerta.length; a++) {
                         datos_en_fila_alerta += '<tr>';
                         datos_en_fila_alerta += '<td>' + (a + 1) + '</td>';
                         datos_en_fila_alerta += '<td>' + (alerta[a].anio_alerta) + '</td>';
                         datos_en_fila_alerta += '<td>' + (alerta[a].codigo) + '</td>';
                         datos_en_fila_alerta += '<td>' + (alerta[a].descripcion_alerta) + '</td>';
                         datos_en_fila_alerta += '<td><a href = "' + (url_ruta_archivos_alerta + alerta[a].anio_alerta) + '/' + alerta[a].archivo_alerta + '" target = _black </a> ' + alerta[a].archivo_alerta + '</td>';
                         datos_en_fila_alerta += '<td>' + (alerta[a].dfecharegistro_alerta) + '</td>';
                         datos_en_fila_alerta += '<td>' + (alerta[a].usuario_alerta) + '</td>';
                         datos_en_fila_alerta += '<td><button type="button" name="eliminar_alerta" id_alerta="' + alerta[a].id_alerta + '" class="btn btn-danger  btn_eliminar_alerta">X</button></td>';
                         datos_en_fila_alerta += '</tr>';
                     }
                 }
                 $('#mostrar-datos-alerta').append(datos_en_fila_alerta);
                 $('#msj-titular-alerta').html("<center><strong>Se ubicaron " + alerta.length + " -- Registros  -- </center></strong>");

             } else {
                 $('#mostrar-datos-alerta').html("<center><strong>...No existe registros ... </strong></center>");
                 $('#msj-titular-alerta').html(" ... No existen registros ....");
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


 function listar_sala() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listar_salas',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular-sala").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(sala) {
             $("#msj-titular-sala").html("");
             $('#mostrar-datos-sala').html("");
             if (sala[0].respuesta_sala == 1) {
                 if (sala.length > 0) {
                     var datos_en_fila_sala = '';
                     for (var s = 0; s < sala.length; s++) {
                         datos_en_fila_sala += '<tr>';
                         datos_en_fila_sala += '<td>' + (s + 1) + '</td>';
                         datos_en_fila_sala += '<td>' + (sala[s].anio_sala) + '</td>';
                         datos_en_fila_sala += '<td>' + (sala[s].descripcion_sala) + '</td>';
                         datos_en_fila_sala += '<td><a href = "' + (url_ruta_archivos_sala + sala[s].anio_sala) + '/' + sala[s].archivo_sala + '" target = _black </a> ' + sala[s].archivo_sala + '</td>';
                         datos_en_fila_sala += '<td>' + (sala[s].dfecharegistro_sala) + '</td>';
                         datos_en_fila_sala += '<td>' + (sala[s].usuario_sala) + '</td>';
                         datos_en_fila_sala += '<td><button type="button" name="eliminar_sala" id_sala="' + sala[s].id_sala + '" class="btn btn-danger  btn_eliminar_sala">X</button></td>';
                         datos_en_fila_sala += '</tr>';
                     }
                 }
                 $('#mostrar-datos-sala').append(datos_en_fila_sala);
                 $('#msj-titular-sala').html("<center><strong>Se ubicaron " + sala.length + " -- Registros  -- </center></strong>");

             } else {
                 $('#mostrar-datos-sala').html("<center><strong>...No existe registros ... </strong></center>");
                 $('#msj-titular-sala').html(" ... No existen registros ....");
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

 function listar_analisis() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listar_analisis',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular-analisis").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(analisis) {
             $("#msj-titular-analisis").html("");
             $('#mostrar-datos-analisis').html("");
             if (analisis[0].arespuesta == 1) {
                 if (analisis.length > 0) {
                     var datos_en_fila_analisis = '';
                     for (var l = 0; l < analisis.length; l++) {
                         datos_en_fila_analisis += '<tr>';
                         datos_en_fila_analisis += '<td>' + (l + 1) + '</td>';
                         datos_en_fila_analisis += '<td>' + (analisis[l].aanio) + '</td>';
                         datos_en_fila_analisis += '<td>' + (analisis[l].adescripcion) + '</td>';
                         datos_en_fila_analisis += '<td><a href = "' + (url_ruta_archivos_analisis + analisis[l].aanio) + '/' + analisis[l].aarchivo + '" target = _black </a> ' + analisis[l].aarchivo + '</td>';
                         datos_en_fila_analisis += '<td>' + (analisis[l].adfecharegistro) + '</td>';
                         datos_en_fila_analisis += '<td>' + (analisis[l].ausuario) + '</td>';
                         datos_en_fila_analisis += '<td><button type="button" name="eliminar_analisis" id_analisis="' + analisis[l].aid + '" class="btn btn-danger  btn_eliminar_analisis">X</button></td>';
                         datos_en_fila_analisis += '</tr>';
                     }
                 }
                 $('#mostrar-datos-analisis').append(datos_en_fila_analisis);
                 $('#msj-titular-analisis').html("<center><strong>Se ubicaron " + analisis.length + " -- Registros  -- </center></strong>");

             } else {
                 $('#mostrar-datos-analisis').html("<center><strong>...No existe registros ... </strong></center>");
                 $('#msj-titular-analisis').html(" ... No existen registros ....");
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


 // inicio de baner y jefe



 function listarbanner() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listarbanner',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
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
                         datos_en_fila += '<td>' + (data[i].archivo) + '</td>';
                         datos_en_fila += '<td><button type="button"  id="' + data[i].id + '*' + data[i].archivo + '" class="btn btn-info  btn_ver_imagen" >Ver Img</button>' + '</td>';
                         datos_en_fila += '<td>' + (data[i].tipo_estado) + '</td>';
                         datos_en_fila += '<td><button type="button" name="activar" id_baner="' + data[i].id + '" class="btn btn-success  btn_activar">Mostrar</button></td>';
                         datos_en_fila += '<td><button type="button" name="desactivar" id_baner="' + data[i].id + '" class="btn btn-info  btn_desactivar">NO Mostrar</button></td>';
                         datos_en_fila += '<td><button type="button" name="eliminar" id_baner="' + data[i].id + '" class="btn btn-danger  btn_eliminar">X</button></td>';
                         datos_en_fila += '</tr>';
                     }
                     $('#mostrar-datos-busqueda').append(datos_en_fila);
                     $('#msj-titular').html("<center><strong>Se ubicaron " + data.length + " -- Banner /  Sliders -- </center></strong>");
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


 function activar_desactivar_mostrar(lc_leer_id_baner, lc_activar) {
     data = { 'id': lc_leer_id_baner, 'activar': lc_activar };

     $.ajax({
         data: data,
         dataType: 'json',
         url: url + 'epidemiologia/activar',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
             $("#msj-titular").html("");
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

 function activar_desactivar_mostrar_jefe(lc_leer_id) {
     var data_desactivar = { 'id': lc_leer_id };

     $.ajax({
         data: data_desactivar,
         dataType: 'json',
         url: url + 'epidemiologia/activarjefe',
         type: 'post',
         beforeSend: function() {},
         success: function(data) {
             $("#msj-titular").html("");
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


 // Listado de Jefe


 function listarjefe() {
     $.ajax({
         dataType: 'json',
         url: url + 'epidemiologia/listarjefe',
         type: 'post',
         beforeSend: function() {
             $("#msj-titular").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
         },
         success: function(data) {
             $("#msj-titular").html("");
             $('#mostrar-datos-busqueda-jefe').html("");
             if (data[0].respuesta == 1) {
                 if (data.length > 0) {
                     var datos_en_fila = '';
                     for (var i = 0; i < data.length; i++) {
                         datos_en_fila += '<tr>';
                         datos_en_fila += '<td>' + (i + 1) + '</td>';
                         datos_en_fila += '<td>' + (data[i].dfecharegistro) + '</td>';
                         datos_en_fila += '<td>' + (data[i].nombrejefe) + '</td>';
                         datos_en_fila += '<td>' + (data[i].cargojefe) + '</td>';
                         datos_en_fila += '<td>' + (data[i].tipo_estado) + '</td>';
                         datos_en_fila += '<td><button type="button" name="activar" id="' + data[i].id + '" class="btn btn-success  btn_activar_jefe">Mostrar</button></td>';
                         datos_en_fila += '<td><button type="button" name="eliminar" id="' + data[i].id + '" class="btn btn-danger  btn_eliminar_jefe">X</button></td>';
                         datos_en_fila += '</tr>';
                     }
                     $('#mostrar-datos-busqueda-jefe').append(datos_en_fila);
                     $('#msj-titular').html("<center><strong>Se ubicaron " + data.length + " -- Banner /  Sliders -- </center></strong>");
                 }
             } else {
                 $('#mostrar-datos-busqueda-jefe').html("<center><strong>...No existe registros ... </strong></center>");
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





 // fin de baner y jefe


 $(document).ready(function() {
     $('.crear-tooltip').tooltip();
     listar();
     listar_fichas();
     listar_alertas();
     listar_sala();
     listar_analisis();
     listarbanner();
     listarjefe();



     $("#MostrarMsjCargando").hide();
     $("#btn_nuevo").click(function() {
         $("#txtDescripcion").val("Boletín Epidemiológico Nº ");
         $("#btn_grabar").attr("disabled", true);
         $("#subir_archivo").val('').attr("disabled", false);
         $('#registrar').modal({ show: true, backdrop: 'static' });

     });

     $("#btn_nuevo_ficha").click(function() {
         $("#txtDescripcion_ficha").val("FICHA DE INVESTIGACIÓN  ");
         $("#btn_grabar_ficha").attr("disabled", true);
         $("#subir_archivo_ficha").val('').attr("disabled", true);
         $('#registrar_ficha').modal({ show: true, backdrop: 'static' });

     });

     $("#btn_nuevo_alerta").click(function() {
         $("#txtCodigo_alerta").val("");
         $("#txtDescripcion_alerta").val("  ");
         $("#btn_grabar_alerta").attr("disabled", true);
         $("#subir_archivo_alerta").val('').attr("disabled", true);
         $('#registrar_alerta').modal({ show: true, backdrop: 'static' });

     });


     $("#btn_nuevo_sala").click(function() {
         $("#txtDescripcion_sala").val("  ");
         $("#btn_grabar_sala").attr("disabled", true);
         $("#subir_archivo_sala").val('').attr("disabled", true);
         $('#registrar_sala').modal({ show: true, backdrop: 'static' });

     });

     $("#btn_nuevo_analisis").click(function() {
         $("#txtDescripcion_analisis").val("");
         $("#btn_grabar_analisis").attr("disabled", true);
         $("#subir_archivo_analisis").val('').attr("disabled", true);
         $('#registrar_analisis').modal({ show: true, backdrop: 'static' });

     });




     $("#txtDescripcion_ficha").keypress(function() {
         $("#subir_archivo_ficha").attr("disabled", false);
     });

     $("#txtDescripcion_alerta").keypress(function() {
         $("#subir_archivo_alerta").attr("disabled", false);
     });

     $("#txtDescripcion_sala").keypress(function() {
         $("#subir_archivo_sala").attr("disabled", false);
     });

     $("#txtDescripcion_analisis").keypress(function() {
         $("#subir_archivo_analisis").attr("disabled", false);
     });


     $("#subir_archivo").change(function() {
         var lc_anio = $("#anio").val();
         $("#btn_grabar").attr("disabled", false);
         archivo_subir = this.files[0],
             lc_nombre_archivo = archivo_subir["name"],
             etiqueta_dom_txt = 'subir_archivo',
             etiqueta_dom = $("#subir_archivo"),
             msj_dom = $("#msj_subida");
         if (archivo_subir["type"] != "application/pdf") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
         } else if (archivo_subir["size"] > 50000000) {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo 20 Megas, Vuelva a subir --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, archivo_subir);
             data_form.append('anio', lc_anio);
             $.ajax({
                 dataType: 'json',
                 url: url + 'epidemiologia/subir_pdf',
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
                         msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();
                         $("#btn_grabar_autoridad").attr("disabled", false);
                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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




     $("#subir_archivo_ficha").change(function() {
         var lc_anio = $("#anio_ficha").val();
         $("#btn_grabar_ficha").attr("disabled", false);
         archivo_subir = this.files[0],
             lc_nombre_archivo = archivo_subir["name"],
             etiqueta_dom_txt = 'subir_archivo_ficha',
             etiqueta_dom = $("#subir_archivo_ficha"),
             msj_dom = $("#msj_subida_ficha");
         if (archivo_subir["type"] != "application/pdf") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
         } else if (archivo_subir["size"] > 50000000) {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo 20 Megas, Vuelva a subir --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, archivo_subir);
             data_form.append('anio', lc_anio);
             $.ajax({
                 dataType: 'json',
                 url: url + 'epidemiologia/subir_pdf_ficha',
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
                         msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();
                         $("#btn_grabar_autoridad").attr("disabled", false);
                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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


     $("#subir_archivo_alerta").change(function() {
         var lc_anio = $("#anio_alerta").val();
         $("#btn_grabar_alerta").attr("disabled", false);
         archivo_subir = this.files[0],
             lc_nombre_archivo = archivo_subir["name"],
             etiqueta_dom_txt = 'subir_archivo_alerta',
             etiqueta_dom = $("#subir_archivo_alerta"),
             msj_dom = $("#msj_subida_alerta");
         if (archivo_subir["type"] != "application/pdf") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
         } else if (archivo_subir["size"] > 50000000) {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo 20 Megas, Vuelva a subir --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, archivo_subir);
             data_form.append('anio', lc_anio);
             $.ajax({
                 dataType: 'json',
                 url: url + 'epidemiologia/subir_pdf_alerta',
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
                         msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();

                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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

     $("#subir_archivo_sala").change(function() {
         var lc_anio = $("#anio_sala").val();
         $("#btn_grabar_sala").attr("disabled", false);
         archivo_subir = this.files[0],
             lc_nombre_archivo = archivo_subir["name"],
             etiqueta_dom_txt = 'subir_archivo_sala',
             etiqueta_dom = $("#subir_archivo_sala"),
             msj_dom = $("#msj_subida_sala");
         if (archivo_subir["type"] != "application/pdf") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
         } else if (archivo_subir["size"] > 50000000) {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo 20 Megas, Vuelva a subir --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, archivo_subir);
             data_form.append('anio', lc_anio);
             $.ajax({
                 dataType: 'json',
                 url: url + 'epidemiologia/subir_pdf_sala',
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
                         msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();

                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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

     $("#subir_archivo_analisis").change(function() {
         var lc_anio = $("#anio_analisis").val();
         $("#btn_grabar_analisis").attr("disabled", false);
         archivo_subir = this.files[0],
             lc_nombre_archivo = archivo_subir["name"],
             etiqueta_dom_txt = 'subir_archivo_analisis',
             etiqueta_dom = $("#subir_archivo_analisis"),
             msj_dom = $("#msj_subida_analisis");
         if (archivo_subir["type"] != "application/pdf") {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Archivo debe estar en formato PDF, Vuelva a subir  --- </font><strong></center>").show();
         } else if (archivo_subir["size"] > 50000000) {
             etiqueta_dom.val("");
             msj_dom.html("<center><strong><font color='red'> --- Tamaño Maximo  20 Megas, Vuelva a subir --- </font><strong></center>").show();
         } else {
             var data_form = new FormData();
             data_form.append(etiqueta_dom_txt, archivo_subir);
             data_form.append('anio', lc_anio);
             $.ajax({
                 dataType: 'json',
                 url: url + 'epidemiologia/subir_pdf_analisis',
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
                         msj_dom.html("<center><strong><font color='green'> --- Archivo subido Conforme --- </font><strong></center>").show();

                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
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





     $(document).on('click', '.btn_eliminar', function() {
         var lc_leer_id = $(this).attr("id");
         $('#id').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar').modal({ show: true, backdrop: 'static' });
     });


     $(document).on('click', '.btn_eliminar_ficha', function() {
         var lc_leer_id = $(this).attr("id_ficha");
         $('#id_ficha').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar_ficha').modal({ show: true, backdrop: 'static' });
     });




     $(document).on('click', '.btn_eliminar_alerta', function() {
         var lc_leer_id = $(this).attr("id_alerta");
         $('#id_alerta').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar_alerta').modal({ show: true, backdrop: 'static' });
     });

     $(document).on('click', '.btn_eliminar_sala', function() {
         var lc_leer_id = $(this).attr("id_sala");
         $('#id_sala').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar_sala').modal({ show: true, backdrop: 'static' });
     });

     $(document).on('click', '.btn_eliminar_analisis', function() {
         var lc_leer_id = $(this).attr("id_analisis");
         $('#id_analisis').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar_analisis').modal({ show: true, backdrop: 'static' });
     });



     $("#btn_grabar").click(function() {
         var lc_anio = $("#anio").val(),
             lc_descripcion = $("#txtDescripcion").val();

         datos = {
             'anio': lc_anio,
             'descripcion': lc_descripcion,
             'archivo': lc_nombre_archivo
         };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabar',
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


     $("#btn_grabar_ficha").click(function() {
         var lc_anio = $("#anio_ficha").val(),
             lc_descripcion = $("#txtDescripcion_ficha").val();

         datos = {
             'anio': lc_anio,
             'descripcion': lc_descripcion,
             'archivo': lc_nombre_archivo
         };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabar_ficha',
             type: 'post',
             beforeSend: function() {

             },
             success: function() {
                 $('#registrar_ficha').modal("toggle");
                 $("#btn_grabar_ficha").attr("disabled", true);
                 listar_fichas();
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



     $("#btn_grabar_alerta").click(function() {
         var lc_anio = $("#anio_alerta").val(),
             lc_codigo = $("#txtCodigo_alerta").val(),
             lc_descripcion = $("#txtDescripcion_alerta").val();

         datos = {
             'anio': lc_anio,
             'codigo': lc_codigo,
             'descripcion': lc_descripcion,
             'archivo': lc_nombre_archivo
         };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabar_alerta',
             type: 'post',
             beforeSend: function() {

             },
             success: function() {
                 $('#registrar_alerta').modal("toggle");
                 $("#btn_grabar_alerta").attr("disabled", true);
                 listar_alertas();
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

     $("#btn_grabar_sala").click(function() {
         var lc_anio = $("#anio_sala").val(),
             lc_descripcion = $("#txtDescripcion_sala").val();

         datos = {
             'anio': lc_anio,
             'descripcion': lc_descripcion,
             'archivo': lc_nombre_archivo
         };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabar_sala',
             type: 'post',
             beforeSend: function() {

             },
             success: function() {
                 $('#registrar_sala').modal("toggle");
                 $("#btn_grabar_sala").attr("disabled", true);
                 listar_sala();
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


     $("#btn_grabar_analisis").click(function() {
         var lc_anio = $("#anio_analisis").val(),
             lc_descripcion = $("#txtDescripcion_analisis").val();

         datos = {
             'anio': lc_anio,
             'descripcion': lc_descripcion,
             'archivo': lc_nombre_archivo
         };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabar_analisis',
             type: 'post',
             beforeSend: function() {

             },
             success: function() {
                 $('#registrar_analisis').modal("toggle");
                 $("#btn_grabar_analisis").attr("disabled", true);
                 listar_analisis();
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
             url: url + 'epidemiologia/eliminar',
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


     $("#si_eliminar_ficha").click(function() {
         var leer_id = $('#id_ficha').val(),
             data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'epidemiologia/eliminar_ficha',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_ficha').modal("toggle");
                 listar_fichas();
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





     $("#si_eliminar_alerta").click(function() {
         var leer_id = $('#id_alerta').val(),
             data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'epidemiologia/eliminar_alerta',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_alerta').modal("toggle");
                 listar_alertas();
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




     $("#si_eliminar_sala").click(function() {
         var leer_id = $('#id_sala').val(),
             data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'epidemiologia/eliminar_sala',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_sala').modal("toggle");
                 listar_sala();
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



     $("#si_eliminar_analisis").click(function() {
         var leer_id = $('#id_analisis').val(),
             data_eliminar = { 'id': leer_id };
         $.ajax({
             data: data_eliminar,
             dataType: 'json',
             url: url + 'epidemiologia/eliminar_analisis',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_analisis').modal("toggle");
                 listar_analisis();
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


     // inicio de baner y jefe


     // banner
     $(document).on('click', '.btn_ver_imagen', function() {
         var lc_leer_id = $(this).attr("id"),
             arrayDeCadenas = lc_leer_id.split('*'),
             lc_get_idprensa = arrayDeCadenas[0],
             lc_get_imagen1 = arrayDeCadenas[1];

         $('#id_prensa_imagen').val(lc_get_idprensa);
         $("#imagen2").val('').attr("disabled", false);
         $("#img-imagen1").attr("src", url_grafico_imagen + '/' + lc_get_imagen1);
         $("#btn_grabar_imagen2").attr("disabled", true);
         $('#crud_imagen1').modal({ show: true, backdrop: 'static' });

     });

     $(document).on('click', '.btn_activar', function() {
         var lc_leer_id_baner = $(this).attr("id_baner"),
             lc_activar = '1';
         activar_desactivar_mostrar(lc_leer_id_baner, lc_activar);
         listarbanner();

     });

     $(document).on('click', '.btn_desactivar', function() {
         var lc_leer_id_baner = $(this).attr("id_baner"),
             lc_activar = '0';
         activar_desactivar_mostrar(lc_leer_id_baner, lc_activar);
         listarbanner();

     });


     $(document).on('click', '.btn_eliminar', function() {
         var lc_leer_id_baner = $(this).attr("id_baner");
         $('#id').val(lc_leer_id_baner);
         $('#mostrar_confirmar_eliminar_banner').modal({ show: true, backdrop: 'static' });
     });



     $("#si_eliminar_banner").click(function() {
         var leer_id = $('#id').val(),
             data_eliminar_banner = { 'id': leer_id };
         $.ajax({
             data: data_eliminar_banner,
             dataType: 'json',
             url: url + 'banner/eliminar',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_banner').modal("toggle");
                 listarbanner();

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




     $("#btn_nuevo_banner").click(function() {
         $("#txtDescripcionbanner").val('').attr("disabled", false);
         $("#imagen1").val('').attr("disabled", true);
         $("#btn_grabar_banner").attr("disabled", true);
         $('#registrar_emergente').modal({ show: true, backdrop: 'static' });

     });




     $("#txtDescripcionbanner")
         .focus()
         .keypress(function() {
             $("#imagen1").val('').attr("disabled", false);
         });



     $("#btn_grabar_banner").click(function() {
         $("#msj_grabar").html("");
         var lc_txtDescripcion = $("#txtDescripcionbanner").val(),
             datos = {
                 'descripcion': lc_txtDescripcion,
                 'imagen1': lc_nombre_archivo_imagen1
             };
         $.ajax({
             data: datos,
             dataType: 'json',
             url: url + 'epidemiologia/grabarbanner',
             type: 'post',
             beforeSend: function() {
                 $("#msj_imagen").html("<center><img src='" + url_grafico + "/cargando.gif' width='128' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#msj_imagen").html("");
                 $('#registrar_emergente').modal("toggle");
                 $("#btn_grabar_banner").attr("disabled", true);
                 listarbanner();

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


     $("#imagen1").change(function() {
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
                 url: url + 'banner/subir_imagen1',
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
                         $("#btn_grabar_banner").attr("disabled", false);
                     } else {
                         msj_dom.html("<center><strong><font color='red'> --- Archivo No Subido - o ya no existe --- </font><strong></center>").show();
                         $("#btn_grabar_banner").attr("disabled", true);
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

     // fin de banner



     // Seccion de Cambio de Jefatura
     $("#btn_nuevo_jefe").click(function() {
         $("#txtjefedearea").val("").attr("disabled", false).focus();
         $("#txtcargojefe").val("").attr("disabled", true);
         $("#grabar_jefatura").attr("disabled", true);
         $('#registrar_jefe').modal({ show: true, backdrop: 'static' });
     });

     $("#txtjefedearea")
         .focus()
         .keypress(function() {
             $("#txtcargojefe").val('').attr("disabled", false);
         });

     $("#txtcargojefe")
         .focus()
         .keypress(function() {
             $("#grabar_jefatura").attr("disabled", false);
         });


     $("#grabar_jefatura").click(function() {
         var lc_nombrejefe = $("#txtjefedearea").val(),
             lc_cargo_jefe = $("#txtcargojefe").val(),
             data_jefe = { 'nombre': lc_nombrejefe, 'cargo': lc_cargo_jefe };
         $.ajax({
             data: data_jefe,
             dataType: 'json',
             url: url + 'epidemiologia/grabarjefe',
             type: 'post',
             beforeSend: function() {

             },
             success: function() {
                 $('#registrar_jefe').modal("toggle");
                 $("#grabar_jefatura").attr("disabled", true);
                 listarjefe();

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


     $(document).on('click', '.btn_activar_jefe', function() {
         var lc_leer_id = $(this).attr("id");
         activar_desactivar_mostrar_jefe(lc_leer_id);
         listarjefe();
     });


     $(document).on('click', '.btn_eliminar_jefe', function() {
         var lc_leer_id = $(this).attr("id");
         $('#id').val(lc_leer_id);
         $('#mostrar_confirmar_eliminar_jefe').modal({ show: true, backdrop: 'static' });
     });


     $("#mostrar_confirmar_eliminar_jefe").click(function() {
         var leer_id = $('#id').val(),
             data_eliminar_banner = { 'id': leer_id };
         $.ajax({
             data: data_eliminar_banner,
             dataType: 'json',
             url: url + 'banner/eliminar',
             type: 'post',
             beforeSend: function() {},
             success: function() {
                 $('#mostrar_confirmar_eliminar_jefe').modal("toggle");
                 listarjefe();

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

     // Termino de Cambio de Jefatura

     // fin de baner y jefe




 });