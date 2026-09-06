 var modulo = "/appmvc",
     url = 'http://' + document.domain + modulo + '/acceso/',
     publico = "/public/",
     url_grafico = 'http://' + document.domain + modulo + publico + 'gra/';


 function leer_user_mostrarlo_etiqueta() {
     var leer_user = $('#slt_resultado  option:selected').attr('id'),
         lc_ver_si_selecciono = (typeof leer_user === 'undefined') ? '' : '1';
     if (lc_ver_si_selecciono === '1') {
         var leer_user = $('#slt_resultado  option:selected').attr('id'),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo'),
             leer_nombre = $('#slt_resultado  option:selected').attr('nombre');
         $('#apellidos_nombres').html("&#187;&nbsp;" + leer_nombre + "&#187;&nbsp;" + leer_modulo).show();
         $('#txtUsuario').val(leer_user).attr("disabled", true);
         $("#btn_consultar_usuario").attr("disabled", false);
     } else {
         $("#btn_consultar_usuario").attr("disabled", true);
         $('#txtUsuario').val('').attr("disabled", true);
         $('#apellidos_nombres').html("").hide();

     };
     $("#resultado_consulta_user").hide();

     $("#msj_user").hide();
 }


 function leer_user_mostrarlo_etiqueta_tramite() {
     var leer_user = $('#slt_resultado_tramite  option:selected').attr('id'),
         lc_ver_si_selecciono = (typeof leer_user === 'undefined') ? '' : '1';
     if (lc_ver_si_selecciono === '1') {
         var leer_user = $('#slt_resultado_tramite  option:selected').attr('usuario'),
             leer_expiracion = $('#slt_resultado_tramite  option:selected').attr('expiracion'),
             leer_activo = $('#slt_resultado_tramite  option:selected').attr('condicion_activo'),
             leer_nombre = $('#slt_resultado_tramite  option:selected').attr('descripcion');
         $('#apellidos_nombres_tramite').html("&#187;&nbsp; Usuario : " + leer_user + "<br>&#187;&nbsp; Identificador : " + leer_nombre + "<br>&#187;&nbsp; Expira :" + leer_expiracion + "<br>&#187;&nbsp; Condicion :" + leer_activo).show();
         $("#resultado_consulta_user_tramite").show();
         $("#btn_cambiarclave_user_tramite").show().attr("disabled", false);
         $("#btn_aumentar_user_tramite").show().attr("disabled", false);
         $("#btn_desactivado_user_tramite").show().attr("disabled", false);
         $("#btn_activo_user_tramite").show().attr("disabled", false);

     } else {
         $('#apellidos_nombres_tramite').html("").hide();
         $("#resultado_consulta_user_tramite").hide();
         $("#btn_cambiarclave_user_tramite").hide().attr("disabled", true);
         $("#btn_aumentar_user_tramite").hide().attr("disabled", true);
         $("#btn_desactivado_user_tramite").hide().attr("disabled", true);
         $("#btn_activo_user_tramite").hide().attr("disabled", true);


     };

 }

 function consultar_dni() {
     var lc_idcita = $("#txtDNIUsuario").val().substring(0, 8),
         data = {
             'dni': lc_idcita
         };
     $.ajax({
         type: "POST",
         url: url + 'supervisor/getusuariodni',
         data: data,
         beforeSend: function() {
             $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
         },
         success: function(filas) {
             $("#msj").html("");
             jsondecoded = $.parseJSON(filas);
             $.each(jsondecoded, function(index, value) {
                 if (value.respuesta === 1) {
                     $("#vnombres").html("&#187;&nbsp;" + value.nombres);
                     $("#vexpira").html(value.expiracion);
                     $("#vtipoestado").html(value.tipo_estado);
                     $("#resultado_consulta").fadeIn("slow");
                     $("#btn_cambiarclave").attr("disabled", false);
                     $("#btn_aumentar").attr("disabled", false);
                     $("#btn_desactivado").attr("disabled", false);
                     $("#btn_activo").attr("disabled", false);

                 } else {
                     $("#msj").html("<center><strong><font color='red'>DNI 8 DIGITOS, INCORRECTO O NO EXISTE </font><strong></center>").show();
                     $("#resultado_consulta").hide();
                     $("#btn_cambiarclave").attr("disabled", true);
                     $("#btn_aumentar").attr("disabled", true);
                     $("#btn_desactivado").attr("disabled", true);
                     $("#btn_activo").attr("disabled", true);
                     var lc_dniocho = $("#txtDNIUsuario").val().substring(0, 8);
                     $("#txtDNIUsuario").val(lc_dniocho);



                 }
             });
         },
         error: function(jqXHR, textStatus, errorThrown) {
             alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

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

 $(document).ready(function() {
     $('.crear-tooltip').tooltip();

     //#region 


     $("#btn_consultar").attr("disabled", true);
     $("#btn_consultar_usuario").attr("disabled", true);
     $("#btn_consultar_apellidos").attr("disabled", true);
     $("#resultado_consulta").hide();
     $("#resultado_consulta_user").hide();
     $("#btn_consultar_apellidos_tramite").attr("disabled", true);
     $("#msj_user_apellido_tramite").html("");
     $("#slt_resultado").html("").attr("disabled", true);
     $("#slt_resultado_tramite").html("").attr("disabled", true);
     $("#apellidos_nombres_tramite").html("").attr("disabled", true);
     $("#txtUsuario_tramite").val("").attr("disabled", true);
     $("#btn_consultar_usuario_tramite").attr("disabled", true);
     $("#msj_user_tramite").html("").attr("disabled", true);
     $("#resultado_consulta_user_tramite").hide();
     $("#txtnombre_tramite").val("");
     $("#txtDNIUsuario")
         .val('')
         .on('input', function() {
             this.value = this.value.replace(/[^0-9]/g, '');
             if ($("#txtDNIUsuario").val().length > 7) {
                 consultar_dni();

             }
         })


     .click(function() {
             $("#btn_consultar").attr("disabled", false);

         })
         .keypress(function() {


             $("#btn_consultar").attr("disabled", false);
             $("#resultado_consulta").hide();
         });




     $("#txtUsuario")
         .val('')
         .click(function() {
             $("#btn_consultar_usuario").attr("disabled", false);
             $("#resultado_consulta_user").hide();

         })
         .keypress(function() {
             $("#btn_consultar_usuario").attr("disabled", false);
             $("#resultado_consulta_user").hide();

         });



     $("#txtnombre")
         .val('')
         .click(function() {
             $("#btn_consultar_apellidos").attr("disabled", false);
             $("#resultado_consulta_user").hide();
             $("#msj_user_apellido").html("").hide();
             $("#apellidos_nombres").html("").hide();
             $("#txtUsuario").val('');
             $("#btn_consultar_usuario").attr("disabled", true);
             $("#slt_resultado").html("").attr("disabled", true);
             $("#msj_user").html("").hide();




         })
         .keypress(function() {
             $("#btn_consultar_apellidos").attr("disabled", false);
             $("#msj_user_apellido").html("").hide();
             $("#apellidos_nombres").html("").hide();
             $("#txtUsuario").val('');
             $("#btn_consultar_usuario").attr("disabled", true);
             $("#slt_resultado").html("").attr("disabled", true);
             $("#msj_user").html("").hide();
         });




     $("#txtnombre_tramite")
         .val('')
         .click(function() {
             $("#btn_consultar_apellidos_tramite").attr("disabled", false);
             $("#resultado_consulta_user_tramite").hide();
             $("#msj_user_apellido_tramite").html("").hide();
             $("#apellidos_nombres_tramite").html("").hide();
             $("#txtUsuario_tramite").val('');
             $("#btn_consultar_usuario_tramite").attr("disabled", true);
             $("#slt_resultado_tramite").html("").attr("disabled", true);
             $("#msj_user_tramite").html("").hide();




         })
         .keypress(function() {
             $("#btn_consultar_apellidos_tramite").attr("disabled", false);
             $("#msj_user_apellido_tramite").html("").hide();
             $("#apellidos_nombres_tramite").html("").hide();
             $("#txtUsuario_tramite").val('');
             $("#btn_consultar_usuario_tramite").attr("disabled", true);
             $("#slt_resultado_tramite").html("").attr("disabled", true);
             $("#msj_user_tramite").html("").hide();
         });


     $("#btn_consultar").click(function() {


         var lc_idcita = $("#txtDNIUsuario").val(),
             data = {
                 'dni': lc_idcita
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/getusuariodni',
             data: data,
             beforeSend: function() {
                 $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function(filas) {
                 $("#msj").html("");
                 jsondecoded = $.parseJSON(filas);
                 $.each(jsondecoded, function(index, value) {
                     if (value.respuesta === 1) {
                         $("#vnombres").html("&#187;&nbsp;" + value.nombres);
                         $("#vexpira").html(value.expiracion);
                         $("#vtipoestado").html(value.tipo_estado);
                         $("#resultado_consulta").fadeIn("slow");
                         $("#btn_cambiarclave").attr("disabled", false);
                         $("#btn_aumentar").attr("disabled", false);
                         $("#btn_desactivado").attr("disabled", false);
                         $("#btn_activo").attr("disabled", false);

                     } else {
                         $("#msj").html("<center><strong><font color='red'>DNI INCORRECTO O NO EXISTE</font><strong></center>").show();
                         $("#resultado_consulta").hide();
                         $("#btn_cambiarclave").attr("disabled", true);
                         $("#btn_aumentar").attr("disabled", true);
                         $("#btn_desactivado").attr("disabled", true);
                         $("#btn_activo").attr("disabled", true);

                     }
                 });
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });

     $("#btn_consultar_apellidos").click(function() {
         var etiqueta_select = $("#slt_resultado"),
             lc_nombre = $("#txtnombre").val(),
             data_user = {
                 'nombres': lc_nombre
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/getnombres',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user_apellido").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function(encontrados) {
                 $("#msj_user_apellido").html("");
                 etiqueta_select.html("");
                 jsondecoded = $.parseJSON(encontrados);
                 $.each(jsondecoded, function(index, filas) {
                     if (filas.respuesta === 1) {
                         etiqueta_select.append(
                             '<option id="' + filas.usuario +
                             '"  nombre = "' + filas.nombre +
                             '"  modulo = "' + filas.modulo +
                             '"  >' + filas.apellidos + '</option>').attr("disabled", false);
                     } else {
                         etiqueta_select.attr("disabled", true);
                         $('#txtUsuario').val('').attr("disabled", true);
                         $('#apellidos_nombres').html("");
                         $("#btn_consultar_usuario").attr("disabled", true);
                         $("#msj_user_apellido").html("<center><strong><font color='red'>NOMBRES NO EXISTEN O INCORRECTOS</font><strong></center>").show();
                     }

                 });
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });



     $("#btn_consultar_apellidos_tramite").click(function() {
         var etiqueta_select = $("#slt_resultado_tramite"),
             lc_nombre = $("#txtnombre_tramite").val(),
             data_user = {
                 'nombres': lc_nombre
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/getnombres_tramite',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user_apellido_tramite").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function(tramite) {
                 $("#msj_user_apellido_tramite").html("");
                 etiqueta_select.html("");
                 jsondecoded = $.parseJSON(tramite);
                 $.each(jsondecoded, function(index, filas) {
                     if (filas.respuesta === 1) {
                         etiqueta_select.append(
                             '<option id="' + filas.idusuario +
                             '"  usuario = "' + filas.usuario +
                             '"  descripcion = "' + filas.descripcion +
                             '"  expiracion = "' + filas.expiracion +
                             '"  condicion_activo = "' + filas.condicion_activo +
                             '"  >' + filas.apellidos + '</option>').attr("disabled", false);
                     } else {
                         etiqueta_select.attr("disabled", true);
                         $('#txtUsuario_tramite').val('').attr("disabled", true);
                         $('#apellidos_nombres_tramite').html("");
                         $("#btn_consultar_usuario_tramite").attr("disabled", true);
                         $("#msj_user_apellido_tramite").html("<center><strong><font color='red'>NOMBRES NO EXISTEN O INCORRECTOS</font><strong></center>").show();
                     }

                 });
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });

     $("#slt_resultado")
         .click(function() {
             leer_user_mostrarlo_etiqueta();
         })
         .keyup(function() {
             leer_user_mostrarlo_etiqueta();
         });


     $("#slt_resultado_tramite")
         .click(function() {
             leer_user_mostrarlo_etiqueta_tramite();
         })
         .keyup(function() {
             leer_user_mostrarlo_etiqueta_tramite();
         });

     $("#btn_consultar_usuario").click(function() {
         var lc_user = $("#txtUsuario").val(),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo');
         data_user = {
             'user': lc_user,
             'modulo': leer_modulo
         };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/getusuario',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function(data) {
                 $("#msj_user").html("");
                 jsondecoded = $.parseJSON(data);
                 $.each(jsondecoded, function(index, value) {
                     if (value.respuesta === 1) {
                         $("#vnombres_user").html("&#187;&nbsp;" + value.nombres);
                         $("#vexpira_user").html(value.expiracion);
                         $("#vtipoestado_user").html(value.tipo_estado);
                         $("#resultado_consulta_user").fadeIn("slow");
                         $("#btn_cambiarclave_user").attr("disabled", false);
                         $("#btn_aumentar_user").attr("disabled", false);
                         $("#btn_desactivado_user").attr("disabled", false);
                         $("#btn_activo_user").attr("disabled", false);

                     } else {
                         $("#msj_user").html("<center><strong><font color='red'>DNI INCORRECTO O NO EXISTE</font><strong></center>").show();
                         $("#resultado_consulta_user").hide();
                         $("#btn_cambiarclave_user").attr("disabled", true);
                         $("#btn_aumentar_user").attr("disabled", true);
                         $("#btn_desactivado_user").attr("disabled", true);
                         $("#btn_activo_user").attr("disabled", true);

                     }
                 });
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });







     $("#btn_cambiarclave").click(function() {
         var lc_dni = $("#txtDNIUsuario").val(),
             data = {
                 'dni': lc_dni
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/cambiar_clave',
             data: data,
             beforeSend: function() {
                 $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_cambiarclave").attr("disabled", true);
                 $("#msj").html("<center><strong><font color='blue'>Clave cambiada a 1234</font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });


     $("#btn_cambiarclave_user").click(function() {
         var lc_user = $("#txtUsuario").val(),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo');
         data_user = {
             'user': lc_user,
             'modulo': leer_modulo
         };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/cambiar_clave_user',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_cambiarclave_user").attr("disabled", true);
                 $("#msj_user").html("<center><strong><font color='blue'>Clave: 1234, Modulo : " + leer_modulo + " </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });




     $("#btn_aumentar").click(function() {
         var lc_dni = $("#txtDNIUsuario").val(),
             data = {
                 'dni': lc_dni
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/aumentarexpiracion',
             data: data,
             beforeSend: function() {
                 $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_aumentar").attr("disabled", true);
                 $("#msj").html("<center><strong><font color='blue'>Ahora Expira: Fecha Actual + 1 año</font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });

     $("#btn_aumentar_user").click(function() {
         var lc_user = $("#txtUsuario").val(),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo');
         data_user = {
             'user': lc_user,
             'modulo': leer_modulo
         };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/expirar_aumentar_user',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_aumentar_user").attr("disabled", true);
                 $("#msj_user").html("<center><strong><font color='blue'>Expira: Fecha Actual + 1 año, Modulo : " + leer_modulo + " </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });


     $("#btn_desactivado").click(function() {
         var lc_dni = $("#txtDNIUsuario").val(),
             data = {
                 'dni': lc_dni
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/desactivar',
             data: data,
             beforeSend: function() {
                 $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_desactivado").attr("disabled", true);
                 $("#msj").html("<center><strong><font color='blue'>DNI Desactivado</font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });


     $("#btn_desactivado_user").click(function() {
         var lc_user = $("#txtUsuario").val(),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo');
         data_user = {
             'user': lc_user,
             'modulo': leer_modulo
         };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/desactivar_user',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_desactivado_user").attr("disabled", true);
                 $("#msj_user").html("<center><strong><font color='blue'>Desactivado en el Modulo : " + leer_modulo + " </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });




     $("#btn_activo").click(function() {
         var lc_dni = $("#txtDNIUsuario").val(),
             data = {
                 'dni': lc_dni
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/activar',
             data: data,
             beforeSend: function() {
                 $("#msj").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_activo").attr("disabled", true);
                 $("#msj").html("<center><strong><font color='blue'>DNI Activado</font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });




     $("#btn_activo_user").click(function() {
         var lc_user = $("#txtUsuario").val(),
             leer_modulo = $('#slt_resultado  option:selected').attr('modulo');
         data_user = {
             'user': lc_user,
             'modulo': leer_modulo
         };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/ActivarUser',
             data: data_user,
             beforeSend: function() {
                 $("#msj_user").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>");
             },
             success: function() {
                 $("#btn_activo_user").attr("disabled", true);
                 $("#msj_user").html("<center><strong><font color='blue'>Activado en el Modulo : " + leer_modulo + " </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });



     });

     //#endregion

     $("#btn_cambiarclave_user_tramite").click(function() {
         var lc_user_tramite = $('#slt_resultado_tramite  option:selected').attr('usuario'),
             data_tramite = {
                 'user': lc_user_tramite
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/cambiar_clave_tramite',
             data: data_tramite,
             beforeSend: function() {
                 $("#msj_user_apellido_tramite").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>").show();
             },
             success: function() {
                 $("#btn_cambiarclave_user_tramite").attr("disabled", true);
                 $("#msj_user_apellido_tramite").html("<center><strong><font color='blue'>Clave: 1234, en Tramite </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });


     $("#btn_aumentar_user_tramite").click(function() {
         var lc_user_tramite = $('#slt_resultado_tramite  option:selected').attr('usuario'),
             data_tramite = {
                 'user': lc_user_tramite
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/expirar_tramite',
             data: data_tramite,
             beforeSend: function() {
                 $("#msj_user_apellido_tramite").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>").show();
             },
             success: function() {
                 $("#btn_aumentar_user_tramite").attr("disabled", true);
                 $("#msj_user_apellido_tramite").html("<center><strong><font color='blue'>Aumentado 1 año </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });

     // 

     $("#btn_desactivado_user_tramite").click(function() {
         var lc_user_tramite = $('#slt_resultado_tramite  option:selected').attr('usuario'),
             data_tramite = {
                 'user': lc_user_tramite
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/desactivar_tramite',
             data: data_tramite,
             beforeSend: function() {
                 $("#msj_user_apellido_tramite").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>").show();
             },
             success: function() {
                 $("#btn_desactivado_user_tramite").attr("disabled", true);
                 $("#msj_user_apellido_tramite").html("<center><strong><font color='blue'>Usuario desactivado </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });



     $("#btn_activo_user_tramite").click(function() {
         var lc_user_tramite = $('#slt_resultado_tramite  option:selected').attr('usuario'),
             data_tramite = {
                 'user': lc_user_tramite
             };
         $.ajax({
             type: "POST",
             url: url + 'supervisor/activar_tramite',
             data: data_tramite,
             beforeSend: function() {
                 $("#msj_user_apellido_tramite").html("<center><img src='" + url_grafico + "/cargando.gif'  width='198' height='15' alt=''/></center>").show();
             },
             success: function() {
                 $("#btn_activo_user_tramite").attr("disabled", true);
                 $("#msj_user_apellido_tramite").html("<center><strong><font color='blue'>Usuario activado </font><strong></center><hr>").fadeIn("slow");
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 alert('Existe un ERROR ... Mira la consola (Ctrl + Shift + K) Pestaña : Consola para revisar !');

                 $('#result').html('<p>codigo estado: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                 console.log('jqXHR:');
                 console.log(jqXHR);
                 console.log('textStatus:');
                 console.log(textStatus);
                 console.log('errorThrown:');
                 console.log(errorThrown);
             }
         });
     });



 });