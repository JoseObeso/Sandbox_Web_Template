 var url = 'http://' + document.domain + '/rrhh/control/';
 var url_grafico = 'http://' + document.domain + '/rrhh/public/gra/';




 $(document).ready(function () {
     "use strict";

     $("#form-verificar-ingreso").validate({
         focusInvalid: true,
         errorPlacement: function () {}
     });
     $("#dni").rules("add", {
         required: true,
         minlength: 8
     });
     $('#dni').css("background-color", "#FCFBA0");
     $('#clave').attr("disabled", true);
     $("#dni").on("change keyup paste", function () {
         $('#clave').css("background-color", "#FCFBA0");
         $('#clave').attr("disabled", false);
     });
     $("#clave").focus(function () {
         $('#dni').css("background-color", "#FFFFFF");
         if ($("#dni").val().length !== 8) {
             var dialog = bootbox.dialog({
                 message: '<p class="text-center"><strong>...DNI  DEBE  SER  DE   8   --  (OCHO)  DIGITOS ....<br><hr><center> <img src="' + url_grafico + 'mano.gif" width="39" height="43" /></center></strong></p>',
                 closeButton: false
             });
             setInterval(function () {
                 window.location.href = url;
             }, 5000);
             $('#clave').attr("disabled", true);
             $('#clave').css("background-color", "#FFFFFF");
             $('#dni').css("background-color", "#FCFBA0");
             $('#dni').focus();
             return;




         } else {
             $('#dni').css("background-color", "#FFFFFF");
         }
     });
     $("#dni").keypress(function (e) {
         if (e.which === 13) {
             $('#clave').focus();
         }
     });


     $("#clave").on("change keyup paste", function () {
         $('#clave').css("background-color", "#FCFBA0");
         $("#ingresar").attr("disabled", false);
     });

     $("#clave").keypress(function (e) {
         if (e.which === 13) {
             $("#form-verificar-ingreso").submit();
         }
     });

     $("#ingresar").click(function () {
         $("#form-verificar-ingreso").submit();

     });


     $(document).delegate('#form-verificar-ingreso', 'submit', function () {
         var datos = $("#form-verificar-ingreso").serialize();

         $.post(url + 'verificar/verificar_ingreso', datos, function (data) {
             if (data['estado'] == 1) {
                 $('#usuario').attr("disabled", true);
                 $('#clave').attr("disabled", true);
                 $('#ingresar').attr("disabled", true);
                 swal({
                     title: '...Bienvenido...',
                     timer: 1000,
                     showConfirmButton: false
                 });
                 setInterval(function () {
                     window.location.href = url + 'modulos';
                 }, 1000);
             } else if (data['estado'] == 0) {
                 var dialog = bootbox.dialog({
                     message: '<p class="text-center"><strong>...DNI / CLAVE INCORRECTO / CUENTA EXPIRO ....<br><hr><center> <img src="' + url_grafico + 'mano.gif" width="39" height="43" /></center></strong></p>',
                     closeButton: false
                 });
                 setInterval(function () {
                     window.location.href = url;
                 }, 5000);
             }
         }, 'json');
         return false;
     });
 });
