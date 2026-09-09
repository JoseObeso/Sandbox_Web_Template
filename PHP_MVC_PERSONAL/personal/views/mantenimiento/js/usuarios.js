var url = 'http://'+document.domain+'/rrhh/administrador/';
var conn = true;
var timeslide = 1000;
 
function checkConnection() {
	$.ajax({
		url: url+'application/verificarconexion.php',
		async: false,
		data: {'tag' : 'connection'}
	})
	.fail(function() { conn = false; })
	.done(function() { conn = true; })
}


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


function limpiar_frm_nuevo(){
	$("#n-dni").val('');
	$("#n-clave").val('');
	$("#n-nombres").val('');
	$("#n-clave-conf").val('');
	$("#n-paterno").val('');
	$("#n-materno").val('');
	$("#n-sexo").val('');
	$("#n-email").val('');
	$("#n-cargo").val('');
	$("#n-fecha-expiracion").val('');
	$("#n-unidad-organica").select2("val", "");
}

function mostrar_mensaje_error(mensaje){
	$("#mensaje-error-descripcion").text(mensaje);
	$("#mensaje-error").modal({show:true,backdrop:'static'});
}


function recargar_usuarios(){
	var nombres = $("#nombres").val();
	var posting = $.post(url+"mantenimiento/recargar_usuarios",{nombres:nombres});
		posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				var tabla = '', mensaje='';			
				if(imprimir[0]["estado_respuesta"]==1){
					var longitud = imprimir.length;					
					$('#mostrar-datos-busqueda tr').remove();
					$.each(imprimir,function(key, value){					
						tabla += '<tr>';
						tabla += '<td><label class="px-single"><input type="radio" id="'+imprimir[key]['dni']+'" name="single-radio" value="" class="px usuarios"><span class="lbl"></span></label></td>';
						tabla += '<td>'+imprimir[key]['dni']+'</td>';
						tabla += '<td>'+imprimir[key]['nombres']+'</td>';
						tabla += '<td>'+imprimir[key]['cargo']+'</td>';
						tabla += '<td>'+imprimir[key]['fecha_expiracion']+'</td>';
						tabla += '<td>'+imprimir[key]['sesion']+'</td>';
						tabla += '<td>'+imprimir[key]['estado']+'</td>';
						tabla += '</tr>';
					});
					mensaje += 'Resultado: '+longitud+' usuarios encontrados ';
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
				mostrar_mensaje_error("Error del Sistema: <br/>"+data);
			}
		});
		posting.fail(function(){
			$('html,body').animate({ scrollTop: 0 }, 500);
			var existe = $(".conexion-red-error:visible").length;
			if(existe==0){
				setTimeout(function () {
					var options = {
						type: 'danger',
						namespace: 'pa_page_alerts_dark',
						classes: 'alert-dark conexion-red-error' 
					};
					PixelAdmin.plugins.alerts.add('<strong class="conexion-red-error">No tiene conexion con el servidor</strong>', options);
				}, 800);
			}
		})
}
$(document).ready(function(){
    
	$('.crear-tooltip').tooltip();
	$(document).delegate("#actualizar_modulos","click",function(){
		$('#modal_actualizar_modulo').modal({show:true,backdrop:'static'});	
	})
    
	$(document).delegate("#nombres","keyup",function(){
		recargar_usuarios();
	})
	$(document).delegate("#btn_actualizar_modulo","click",function(){
		var codigo_modulo = $("#modulo").val();
		var modulo = $('#modulo :selected').text();
		var posting = $.post(url+"mantenimiento/actulizar_modulo",{modulo:modulo, codigo_modulo:codigo_modulo});
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						mostrar_mensaje_en_modal("#modal_actualizar_modulo","alert-success",imprimir["mensaje"],true);				
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_actualizar_modulo","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_actualizar_modulo","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_actualizar_modulo","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate(".btn-permiso-menu","click",function(){
		var id_menu = '', dni ='', estado='';
		id_menu = $(this).attr("id");
		dni = $("#usuario-dni").val();
		estado = $(this).attr("data-value");
		$.post(url+"mantenimiento/cambiar_estado_menu",{id_menu:id_menu,dni:dni,estado:estado},function(data){
			$("#cargar-permisos").html(data);
			$("#cargar-botones").html('<table class="table"><thead><tr><th align="center">Mostrar Botones:</th></tr></thead><tbody><tr><td><div class="alert alert-info"><strong>Mensaje:</strong> para poder visualizar los botones, debe seleccionar primero en uno de los SUB MENUS.</div></td></tr></tbody></table>');
		});
	});
	$(document).delegate(".btn-permiso-submenu","click",function(){
		var id_submenu='', dni='', estado='';
		id_submenu = $(this).attr("id");
		dni = $("#usuario-dni").val();
		estado = $(this).attr("data-value");
		$.post(url+"mantenimiento/cambiar_estado_submenu",{id_submenu:id_submenu,dni:dni,estado:estado},function(data){
			$("#cargar-permisos").html(data);
			$("#cargar-botones").html('<table class="table"><thead><tr><th align="center">Mostrar Botones:</th></tr></thead><tbody><tr><td><div class="alert alert-info"><strong>Mensaje:</strong> para poder visualizar los botones, debe seleccionar primero en uno de los SUB MENUS.</div></td></tr></tbody></table>');
		});
	});
	$(document).delegate(".btn-permiso-botones","click",function(){
		var id_boton = '', dni='', id_submenu='', estado='',nombre_submenu='';
		dni = $("#usuario-dni").val();
		id_boton = $(this).attr("id");
		id_submenu = $("#usuario-submenu").val();
		estado = $(this).attr("data-value");
		nombre_submenu = $("#usuario-submenu-nombre").val();
		$.post(url+"mantenimiento/cambiar_estado_boton",{id_boton:id_boton,dni:dni,id_submenu:id_submenu,estado:estado,nombre_submenu:nombre_submenu},function(data){
			$("#cargar-botones").html(data);
		})
	});
	$(document).delegate(".abrir-submenus","click",function(){
		var dni='', nombre_submenu = '';
		dni = $("#usuario-dni").val();
		nombre_submenu = $(this).text();
		var id_submenu = $(this).attr("data-value");
		$(".menu-permisos li").removeClass('submenu-abierto');
		$(this).closest('li').addClass('submenu-abierto');
		$.post(url+"mantenimiento/getTodosLosBotones",{id_submenu:id_submenu,dni:dni,nombre_submenu:nombre_submenu},function(data){
			$("#cargar-botones").html(data);
			$("#usuario-submenu").val(id_submenu);
			$("#usuario-submenu-nombre").val(nombre_submenu);

		})
	})
    

	$('#n-fecha-expiracion').datepicker({
		format: 'dd/mm/yyyy',
		startDate: "+0d",
		autoclose: true
	}).on('show', function() {
		var modal = $('#n-fecha-expiracion').closest('.modal');
		var datePicker = $('body').find('.datepicker');
		if(!modal.length) {
			$(datePicker).css('z-index', 'auto');
			return;
		}
		var zIndexModal = $(modal).css('z-index');
		$(datePicker).css('z-index', zIndexModal + 1);
	})	
	$('#e-fecha-expiracion').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true
	}).on('show', function() {
		var modal = $('#e-fecha-expiracion').closest('.modal');
		var datePicker = $('body').find('.datepicker');
		if(!modal.length) {
			$(datePicker).css('z-index', 'auto');
			return;
		}
		var zIndexModal = $(modal).css('z-index');
		$(datePicker).css('z-index', zIndexModal + 1);
	})
    

    
	$("#unidad-organica").select2({
		allowClear: true,
		placeholder: "Selecionar una opcion",
		formatNoMatches: function (term)
        {
            var cont = $("<div />");
            var link = $("<a />", { "class": "test1", "data-title": term, href: "javascript:void(0)", text: "de '" + term + "'" });
            cont.append(link.clone());
            var html = cont.html();
            return "<span>No hay resultados - </span> " + (term.length > 0 ? html : "");
        }
	});	
	$("#n-unidad-organica").select2({
		allowClear: true,
		placeholder: "Selecionar"
	});
	$(document).delegate("#registrar-usuario","click",function(){
		$('#modal-nuevo').modal({show:true,backdrop:'static'});
        $("#n-dni").focus();
	})
    
	$(document).delegate("#permisos","click",function(){
		checkConnection();
		if(conn){
			if($('.usuarios:checked').length>0){
				if($('.usuarios:checked').length==1){
					var tr = '', td ='', nombres='', dni='';
					tr = $(".usuarios:checked").closest('tr');
					td = tr.find("td").eq(2);
					nombres = td.text();
					dni = $(".usuarios:checked").attr('id');
					$("#usuario-dni").val(dni);
					$("#modal-permisos-title").text(nombres);
					$("#cargar-botones").html('<table class="table"><thead><tr><th align="center">Mostrar Botones:</th></tr></thead><tbody><tr><td><div class="alert alert-info"><strong>Mensaje:</strong> para poder visualizar los botones, debe seleccionar primero en uno de los SUB MENUS.</div></td></tr></tbody></table>');
					$.post(url+"mantenimiento/getPermisosUsuario",{dni:dni},function(data){
						$("#cargar-permisos").html(data);
						$("#modal-permisos").modal({show:true,backdrop:'static'});
					});					
				}else{
					mostrar_mensaje_error('solo puede seleccionar un solo usuario');
				}
			}else{
				mostrar_mensaje_error("Debe de selecionar un usuario");
			}
		}else{
			$('#mostrar-datos-busqueda tr').find("input, button").attr("disabled", true);
			$('html,body').animate({ scrollTop: 0 }, 500);
			var existe = $(".conexion-red-error:visible").length;
			if(existe==0){
				setTimeout(function () {
					var options = {
						type: 'danger',
						namespace: 'pa_page_alerts_dark',
						classes: 'alert-dark conexion-red-error' 
					};
					PixelAdmin.plugins.alerts.add('<strong class="conexion-red-error">No tiene conexion con la red</strong>', options);
				}, 800);
			}
		}
	})
	$(document).delegate("#editar","click",function(){
		checkConnection();
		if(conn){
			if($('.usuarios:checked').length>0){
				if($('.usuarios:checked').length==1){
					var dni = $(".usuarios:checked").attr("id");
					$.post(url+'mantenimiento/getDatosUsuario',{dni:dni},function(data){
						if(data["estadorespuesta"]==1){
							$("#e-dni").val(data["dni"]);
							$("#e-nombres").val(data["nombres"]);
							$("#e-paterno").val(data["paterno"]);
							$("#e-materno").val(data["materno"]);
							$("#e-sexo").val(data["sexo"]);
							$("#e-unidad-organica").val(data["unidad-organica"]);
							$("#e-email").val(data["email"]);
							$("#e-cargo").val(data["cargo"]);
							$("#e-fecha-expiracion").val(data["fecha-expiracion"]);
							$("#e-estado").val(data["estado"])
							$('#modal-editar').modal({show:true,backdrop:'static'});
                            
						}else if(data["estadorespuesta"]==2){
							mostrar_mensaje_error("No se encontro ninguno registro");
						}else{
							mostrar_mensaje_error("Error problemas con el sistema");
						}						
					},'json');				
				}else{
					mostrar_mensaje_error('solo puede seleccionar un solo usuario');
				}
			}else{ 
				//mostrar_mensaje_error("Debe de selecionar un usuario");
                alert("Debe seleccionar un usuario");
                
			}
            
		}else{
			$('#mostrar-datos-busqueda tr').find("input, button").attr("disabled", true);
			$('html,body').animate({ scrollTop: 0 }, 500);
			var existe = $(".conexion-red-error:visible").length;
			if(existe==0){
				setTimeout(function () {
					var options = {
						type: 'danger',
						namespace: 'pa_page_alerts_dark',
						classes: 'alert-dark conexion-red-error' 
					};
					PixelAdmin.plugins.alerts.add('<strong class="conexion-red-error">No tiene conexion con la red</strong>', options);
				}, 800);
			}
		}
	})
    
	$(document).delegate("#recargar","click",function(){
		checkConnection();
		if(conn){
			recargar_usuarios();
		}else{
			$('#mostrar-datos-busqueda tr').find("input, button").attr("disabled", true);
			$('html,body').animate({ scrollTop: 0 }, 500);
			var existe = $(".conexion-red-error:visible").length;
			if(existe==0){
				setTimeout(function () {
					var options = {
						type: 'danger',
						namespace: 'pa_page_alerts_dark',
						classes: 'alert-dark conexion-red-error' 
					};
					PixelAdmin.plugins.alerts.add('<strong class="conexion-red-error">No tiene conexion con la red</strong>', options);
				}, 800);
			}
		}
	});
	$("#frm-registrar").validate({
		focusInvalid: false,
		rules: {
			'n-dni': {
			  required: true,
			  minlength: 8
			},
			'n-nombres': {
			  required: true
			},
			'n-paterno': {
			  required: true
			},
			'n-materno': {
			  required: true
			},
			'n-sexo': {
			  required: true
			},
			'n-unidad-organica': {
			  required: true
			},
			'n-cargo': {
			  required: true
			},
			'n-clave': {
			  required: true
			},
			'n-clave-conf': {
			  required: true,
			  equalTo: "#n-clave"
			},			
			'n-fecha-expiracion': {
			  required: true
			},
			'n-email': {
			  required: true
			},
			'n-estado': {
			  required: true
			}
		},
		messages: {
			'n-dni': {
				required: 'Este campo es requerido',
				minlength: 'Minimo 8 caracteres'
			},
			'n-nombres': {
			  required: 'Este campo es requerido'
			},
			'n-paterno': {
			  required: 'Este campo es requerido'
			},
			'n-materno': {
			  required: 'Este campo es requerido'
			},
			'n-sexo': {
			  required: 'Este campo es requerido'
			},
			'n-unidad-organica': {
			  required: 'Este campo es requerido'
			},
			'n-cargo': {
			  required: 'Este campo es requerido'
			},
			'n-clave': {
			  required: 'Este campo es requerido'
			},
			'n-clave-conf': {
			  required: 'Este campo es requerido',
			  equalTo: 'Tiene que ser la misma clave'
			},			
			'n-fecha-expiracion': {
			  required: 'Este campo es requerido'
			},
			'n-email': {
			  required: 'Este campo es requerido'
			},
			'n-estado': {
			  required: 'Este campo es requerido'
			}

		}
	});
	$(document).delegate("#buscar_medico","click",function(){
		var dni = $("#n-dni").val();
		if(dni!='' && dni.length==8){
			var posting = $.post(url+"mantenimiento/buscar_medico",{dni:dni});
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado"]==1){
						$("#n-nombres").val(imprimir["nombres"]);
					}else if(imprimir["estado"]==0){
						mostrar_mensaje_en_modal("#modal-nuevo","alert-danger",imprimir["mensaje"],false);
					}
				}else{
					mostrar_mensaje_en_modal("#modal-nuevo","alert-success","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal-nuevo","alert-danger","No hay conexion con el servidor.",false);
			})
		}else{
			mostrar_mensaje_en_modal("#modal-nuevo","alert-danger","Debe digitar un N° de DNI valido con 8 caracteres.",false);
		}		
	})
	$(document).delegate("#frm-registrar","submit",function(){		
		var datos = $("#frm-registrar").serialize();
		var posting = $.post(url+"mantenimiento/nuevo_usuario",datos);
		posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				if(imprimir["estado"]==1){
					limpiar_frm_nuevo();
					mostrar_mensaje_en_modal("#modal-nuevo","alert-success",imprimir["mensaje"],true);
                    recargar_usuarios();
				}else if(imprimir["estado"]==0){
					mostrar_mensaje_en_modal("#modal-nuevo","alert-danger",imprimir["mensaje"],false);
				}
			}else{
				mostrar_mensaje_en_modal("#modal-nuevo","alert-success","Posiblemente algun dato no es compatible, empezando por el DNI: <br/>",false);
			}
		});
		posting.fail(function(){
			mostrar_mensaje_en_modal("#modal-nuevo","alert-danger","No hay conexion con el servidor.",false);
		})
		return false;
	})
});