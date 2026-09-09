var id_plantilla = '';
var url_enlace = 'http://'+document.domain+'/rrhh/asistencia/';
function isJSON(data) {
    var isJson = false
    try {
        
       var json = $.parseJSON(data);
       isJson = typeof json === 'object' ;
    } catch (ex) {
    console.error('data is not JSON');
    }
    return isJson;
}


function mostrar_mensaje_en_modal(id_modal,tipo_alerta,mensaje_alerta,ocultar){
  var timeslide = 1000;
   
  $(""+id_modal).animate({ scrollTop: 0 }, 500);        
  $(""+id_modal).find(".mensajes").html('<div class="alert '+tipo_alerta+' mensajes-descripcion"></div>');
  $(""+id_modal).find(".mensajes").find(".mensajes-descripcion").hide(0).html('<button type="button" class="close cerraralerta" data-dismiss="alert">×</button><strong>'+mensaje_alerta+'</strong>')
  $(""+id_modal).find(".mensajes").find(".mensajes-descripcion").slideDown(timeslide);
  if(ocultar==true){
    setTimeout(function(){
      $(""+id_modal).find(".mensajes").find('.mensajes-descripcion').slideUp('2000');
    },3000) ;
  } 
}




$(document).ready(function(){
  $(document).delegate(".btn-abrir-modal-cambiar-clave","click",function(){
    $('#modal-cambiar-clave').modal({show:true,backdrop:'static'});
    $("#clave_antigua").focus();
      
  });
  $("#frm_cambiar_clave").validate({
    focusInvalid: false,
    rules: {
      'clave_antigua': {
        required: true
      },
      'nueva_clave': {
        required: true
      },
      'confirmar_clave_nueva': {
        required: true,
        equalTo: "#nueva_clave"
      }
    },
    messages: {
      'clave_antigua': {
        required: 'Ingrese su clave antigua'
      },
      'nueva_clave': {
        required: 'Ingrese su nueva clave'
      },
      'confirmar_clave_nueva': {
        required: 'Confirme su nueva clave',
        equalTo: 'Las claves nuevas deben ser iguales'
      }
    }
  });
  $(document).delegate("#btn_cambiar_mi_clave","click",function(){
    $("#frm_cambiar_clave").submit();
  })
  $(document).delegate("#frm_cambiar_clave","submit",function(){
    var datos = $(this).serialize();  
     
      
    var posting = $.post(url_enlace +"mantenimiento/cambiar_clave",datos);
      
        posting.done(function(data){
            if(isJSON(data)==true){
              var imprimir = $.parseJSON(data);
              if(imprimir["estado_respuesta"]==1){
                mostrar_mensaje_en_modal("#modal-cambiar-clave","alert-success",imprimir["mensaje"],true);
                $("#clave_antigua").val('');
                $("#nueva_clave").val('');
                $("#confirmar_clave_nueva").val('');
              }else{
                mostrar_mensaje_en_modal("#modal-cambiar-clave","alert-danger",imprimir["mensaje"],false);
              }
            }else{
              mostrar_mensaje_en_modal("#modal-cambiar-clave","alert-danger","Error del Sistema: <br/>"+data,false);
            }
          });
          posting.fail(function(){
            mostrar_mensaje_en_modal("#modal-cambiar-clave","alert-danger","No hay conexion con el servidor.",false);
          })
    return false;
  })
    
  $(document).delegate(".btn-abrir-modal-plantilla","click",function(){
    $('#modal-cambiar-plantilla').modal({show:true,backdrop:'static'});
  })
  $(document).delegate(".plantilla","click",function(){
    $('.plantilla').removeClass('selected-plantilla');
    $(this).addClass('selected-plantilla');
    id_plantilla = $(this).attr('id');    
  })
  $(document).delegate("#btn-cambiar-plantilla","click",function(){
    var nueva_plantilla = "theme-"+id_plantilla;
    var posting = $.post(url_enlace  + "mantenimiento/cambiar_plantilla",{nueva_plantilla:nueva_plantilla});
          posting.done(function(data){
            if(isJSON(data)==true){
              var imprimir = $.parseJSON(data);
              if(imprimir["estado_respuesta"]==1){
                $("body").removeClass();
                $("body").addClass(nueva_plantilla+" main-menu-animated page-pricing fondo-medico main-navbar-fixed main-menu-fixed dont-animate-mm-content-sm animate-mm-md animate-mm-lg");
                $('#modal-cambiar-plantilla').modal('hide');
              }else{
                mostrar_mensaje_error("Para poder imprimir la historia de emergencia debe estar en estado 5.");
              }
            }else{
              mostrar_mensaje_error("Error del Sistema: <br/>"+data);
            }
          });
          posting.fail(function(){
            mostrar_mensaje_error("No hay conexion con el servidor.");
          })    
  })
});