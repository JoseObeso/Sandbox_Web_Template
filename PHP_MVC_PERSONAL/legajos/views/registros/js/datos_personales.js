var url = 'http://'+document.domain+'/rrhh/legajos/';
  

 

function isJSON(data) {
     "use strict";
    var isJson = false;
    try {
       var json = $.parseJSON(data);
       isJson = typeof json === 'object' ;
    } catch (ex) {
		console.error('data is not JSON');
    }
    return isJson;
}

 

function recargar_personal_rrhh(){
    "use strict";
	var nombres = $("#nombres").val();
	var posting = $.post(url+"registros/recargar_personal_rrhh",{nombres:nombres});
		posting.done(function(data){
			if(isJSON(data)===true){
				var imprimir = $.parseJSON(data);
				var tabla = '', mensaje='';			
				if(imprimir[0]["estado_respuesta"]==1){
					var longitud = imprimir.length;					
					$('#mostrar-datos-busqueda tr').remove();
					$.each(imprimir,function(key, value){					
						tabla += '<tr>';
						tabla += '<td><label class="px-single"><input type="radio" id="'+imprimir[key]['idpersonal']+'" name="single-radio" value="" class="px usuarios"><span class="lbl"></span></label></td>';
                        
						tabla += '<td>'+imprimir[key]['dni']+'</td>';
                        tabla += '<td>'+imprimir[key]['plaza']+'</td>';
                        tabla += '<td>'+imprimir[key]['nro_contrato']+'</td>';
                        tabla += '<td>'+imprimir[key]['nro_proceso']+'</td>';                        
						tabla += '<td>'+imprimir[key]['apellidosnombres']+'</td>';
                        tabla += '<td>'+imprimir[key]['ruc']+'</td>';
                        tabla += '<td>'+imprimir[key]['cargo']+'</td>';                        
                        tabla += '<td>'+imprimir[key]['servicio']+'</td>';
						tabla += '<td>'+imprimir[key]['fechaingreso']+'</td>';
						tabla += '<td>'+imprimir[key]['fechatermino']+'</td>';                        
						tabla += '<td>'+imprimir[key]['fechaultimoretiro']+'</td>';                                                
						tabla += '<td>'+imprimir[key]['direccion']+'</td>';
						tabla += '<td>'+imprimir[key]['tipo_personal']+'</td>';
                        tabla += '<td>'+imprimir[key]['sueldo']+'</td>';                        
                        tabla += '<td>'+imprimir[key]['estado']+'</td>';                        
						tabla += '</tr>';
					});
					mensaje += 'Resultado: '+longitud+' - Empleados encontrados ';
					if(nombres!='') 
						mensaje += ', apellidos: '+nombres;
					$('#mostrar-datos-busqueda').append(tabla);
					$("#mostrar-cebera-busqueda").text(mensaje);			
				}else if(imprimir[0]["estado_respuesta"]==0){
					$('#mostrar-datos-busqueda tr').remove();
					var longitud = 0;
					tabla += '<tr>';
					tabla += '<td colspan="11"><div class="alert alert-danger"><strong>'+imprimir[0]['mensaje']+'</strong></div></td>';
					tabla += '</tr>';
					mensaje += 'Resultado: '+longitud+' usuarios encontrados';
					if(nombres!='') 
						mensaje += ', apellidos: '+nombres;
					$('#mostrar-datos-busqueda').append(tabla);
					$("#mostrar-cebera-busqueda").text(mensaje);
				}
			}else{
				 
			}
		});
		posting.fail(function(){
            
		});
}







$(document).ready(function(){
     "use strict";
	$('.crear-tooltip').tooltip(); 
    
	$(document).delegate("#nombres","keyup",function(){
		recargar_personal_rrhh();
	});
    
});