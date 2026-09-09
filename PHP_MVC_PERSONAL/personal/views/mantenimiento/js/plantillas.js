var url = 'http://'+document.domain+'/rrhh/administrador/';
var modulo_seleccionado = '', modulo_nombre_seleccionado='';
var menu_seleccionado = '',  menu_nombre_seleccionado='';
var submenu_seleccionado = '', submenu_nombre_seleccionado='';
var boton_seleccionado = '';

function mostrar_mensaje_error(mensaje){
	$("#mensaje-error").find(".modal-body").html(mensaje);	
	$('#mensaje-error').modal({show:true,backdrop:'static'});	
}
function limpiar_nuevo_modulo(){
	$("#n_nombre_modulo").val("");
	$("#n_url_modulo").val("");
	$("#n_plantilla_modulo").val("");
    $("#n_imagen_modulo").val("");
    
}
function limpiar_nuevo_menu(){
	$("#n_nombre_menu").val("");
	$("#n_icono_menu").val("");
	$("#n_url_menu").val("");
	$("#n_orden_menu").val("");
}
function limpiar_nuevo_submenu(){
	$("#n_nombre_submenu").val("");
	$("#n_icono_submenu").val("");
	$("#n_url_submenu").val("");
	$("#n_orden_submenu").val("");
}


function limpiar_botones(){
	$("#n_nombre_boton").val("");
	$("#n_icono_boton").val("");
	$("#n_id_html_boton").val("");

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


function listar_modulos()
{
	var posting = $.post(url+"mantenimiento/listar_plantilla_modulos");
    	posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				var html_modulos = '';
				if(imprimir[0]["estado_respuesta"]==1){
					$.each(imprimir,function(indice,valor){
						html_modulos += '<div class="ticket puntero">';
						if(imprimir[indice]["estado"]==1){
							html_modulos += '<span class="label label-success ticket-label">Activo</span>';
						}else{
							html_modulos += '<span class="label label-danger ticket-label">Desactivado</span>';
						}
						html_modulos += '<input type="hidden" value="'+imprimir[indice]["id_pl_m"]+'">'
						html_modulos += '<a title="" class="ticket-title">'+imprimir[indice]["nombre"]+'</a>';
						html_modulos += '</div>';
					});
					$("#listado_plantilla_modulos").html(html_modulos);
				}else{
					mostrar_mensaje_error(imprimir[0]["mensaje"]);
				}						
			}else{
				mostrar_mensaje_error("Error del Sistema: <br/>"+data);
			}
		});
		posting.fail(function(){
			mostrar_mensaje_error("No hay conexion con el servidor.");
		})
}
function listar_menus()
{
	var posting = $.post(url+"mantenimiento/getListadoPlantillaMenus",{id_pl_m:modulo_seleccionado});
		posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				var html_menus = '';
				if(imprimir[0]["estado_respuesta"]==1){
					$.each(imprimir,function(indice,valor){
						html_menus += '<div class="ticket puntero">';
						if(imprimir[indice]["estado"]==1){
							html_menus += '<span class="label label-success ticket-label">Activo</span>';
						}else{
							html_menus += '<span class="label label-danger ticket-label">Desactivado</span>';
						}
						html_menus += '<input type="hidden" value="'+imprimir[indice]["id_pl_menu"]+'">'
						html_menus += '<a title="" class="ticket-title">'+imprimir[indice]["icono"]+' '+imprimir[indice]["nombre"]+'</a>';
						html_menus += '</div>';
					});
					$("#listado_plantilla_menu").html(html_menus);
				}else{
					mostrar_mensaje_error(imprimir[0]["mensaje"]);
				}						
			}else{
				mostrar_mensaje_error("Error del Sistema: <br/>"+data);
			}
		});
		posting.fail(function(){
			mostrar_mensaje_error("No hay conexion con el servidor.");
		})
}
function listar_submenus()
{
	var posting = $.post(url+"mantenimiento/getListadoPlantillaSubMenus",{id_pl_menu:menu_seleccionado});
		posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				var html_submenus = '';
				if(imprimir[0]["estado_respuesta"]==1){
					$.each(imprimir,function(indice,valor){
						html_submenus += '<div class="ticket puntero">';
						if(imprimir[indice]["estado"]==1){
							html_submenus += '<span class="label label-success ticket-label">Activo</span>';
						}else{
							html_submenus += '<span class="label label-danger ticket-label">Desactivado</span>';
						}
						html_submenus += '<input type="hidden" value="'+imprimir[indice]["id_pl_submenu"]+'">'
						html_submenus += '<a title="" class="ticket-title">'+imprimir[indice]["nombre"]+'</a>';
						html_submenus += '</div>';
					});
					$("#listado_plantilla_submenu").html(html_submenus);
				}else{
					mostrar_mensaje_error(imprimir[0]["mensaje"]);
				}						
			}else{
				mostrar_mensaje_error("Error del Sistema: <br/>"+data);
			}
		});
		posting.fail(function(){
			mostrar_mensaje_error("No hay conexion con el servidor.");
		})
}
function listar_botones()
{
	var posting = $.post(url+"mantenimiento/getListadoPlantillaBotones",{id_pl_submenu:submenu_seleccionado});
		posting.done(function(data){
			if(isJSON(data)==true){
				var imprimir = $.parseJSON(data);
				var html_botones = '';
				if(imprimir[0]["estado_respuesta"]==1){
					$.each(imprimir,function(indice,valor){
						html_botones += '<div class="ticket puntero">';
						if(imprimir[indice]["estado"]==1){
							html_botones += '<span class="label label-success ticket-label">Activo</span>';
						}else{
							html_botones += '<span class="label label-danger ticket-label">Desactivado</span>';
						}
						html_botones += '<input type="hidden" value="'+imprimir[indice]["id_pl_boton"]+'">'
						html_botones += '<button class="btn btn-labeled btn-primary"><span class="btn-label">'+imprimir[indice]["icono"]+'</span>'+imprimir[indice]["nombre"]+'</button>';
						html_botones += '</div>';
					});
					$("#listado_plantilla_botones").html(html_botones);
				}else{
					mostrar_mensaje_error(imprimir[0]["mensaje"]);
				}						
			}else{
				mostrar_mensaje_error("Error del Sistema: <br/>"+data);
			}
		});
		posting.fail(function(){
			mostrar_mensaje_error("No hay conexion con el servidor.");
		})
}
$(document).ready(function(){
	$('.srcollpanel .panel-body > div').slimScroll({ height: 220, alwaysVisible: true, color: '#888',allowPageScroll: true });
	$(document).delegate("#nuevo_modulo","click",function(){
		$('#modal_nuevo_modulo').modal({show:true,backdrop:'static'});
        $('#n_nombre_modulo').focus();
	})
    
	$(document).delegate("#btn_nuevo_modulo","click",function(){
		var datos = $("#frm_nuevo_modulo").serialize();
		var posting = $.post(url+"mantenimiento/guardar_plantilla_modulo",datos);
        limpiar_nuevo_modulo()
         mostrar_mensaje_en_modal("#modal_nuevo_modulo","alert-success","Grabacion Conforme ",true);
        listar_modulos()	
        
			posting.done(function(data){
				if(isJSON(data)==true){
            
					if(imprimir["estado_respuesta"]==1){
						limpiar_nuevo_modulo()
						mostrar_mensaje_en_modal("#modal_nuevo_modulo","alert-success",imprimir["mensaje"],true);
						listar_modulos()					
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_nuevo_modulo","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_nuevo_modulo","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_nuevo_modulo","alert-danger","No hay conexion con el servidor.",false);
			})
	})
    
	$(document).delegate("#btn_editar_modulo","click",function(){
		var datos = $("#frm_editar_modulo").serialize();
		var posting = $.post(url+"mantenimiento/editar_plantilla_modulo",datos);
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						mostrar_mensaje_en_modal("#modal_editar_modulo","alert-success",imprimir["mensaje"],true);
						listar_modulos()					
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_editar_modulo","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_editar_modulo","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_editar_modulo","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate("#editar_modulo","click",function(){
		if(modulo_seleccionado!=''){
			var id_pl_m = modulo_seleccionado;
			var posting = $.post(url+"mantenimiento/getDatosModulo",{id_pl_m:id_pl_m});
				posting.done(function(data){
					if(isJSON(data)==true){
						var imprimir = $.parseJSON(data);
						if(imprimir["estado_respuesta"]==1){
							$("#e_id_pl_m_modulo").val(imprimir["id_pl_m"]);
							$("#e_nombre_modulo").val(imprimir["nombre"]);
							$("#e_url_modulo").val(imprimir["url"]);
							$("#e_plantilla_modulo").val(imprimir["plantilla"]);
							$('#modal_editar_modulo').modal({show:true,backdrop:'static'});
						}else{
							mostrar_mensaje_error(imprimir["mensaje"]);
						}						
					}else{
						mostrar_mensaje_error("Error del Sistema: <br/>"+data);
					}
				});
				posting.fail(function(){
					mostrar_mensaje_error("No hay conexion con el servidor.");
				})
		}else{
			mostrar_mensaje_error("Debe seleccionar primero un Modulo, para poder editar.")
		}
	})
	$(document).delegate("#listado_plantilla_modulos .ticket","click",function(){
		$("#listado_plantilla_modulos .ticket").removeClass('ticket_seleccionado');
		var id_pl_m = $(this).find('input').val();		
		$(this).addClass('ticket_seleccionado');
		modulo_nombre_seleccionado = $(this).find('.ticket-title').text();
		modulo_seleccionado = id_pl_m;
		var posting = $.post(url+"mantenimiento/getListadoPlantillaMenus",{id_pl_m:id_pl_m});
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					var html_menus = '';
					if(imprimir[0]["estado_respuesta"]==1){
						$.each(imprimir,function(indice,valor){
							html_menus += '<div class="ticket puntero">';
							if(imprimir[indice]["estado"]==1){
								html_menus += '<span class="label label-success ticket-label">Activo</span>';
							}else{
								html_menus += '<span class="label label-danger ticket-label">Desactivado</span>';
							}
							html_menus += '<input type="hidden" value="'+imprimir[indice]["id_pl_menu"]+'">'
							html_menus += '<a title="" class="ticket-title">'+imprimir[indice]["icono"]+' '+imprimir[indice]["nombre"]+'</a>';
							html_menus += '</div>';
						});
						$("#listado_plantilla_menu").html(html_menus);						
					}else{
						$("#listado_plantilla_menu").html("<div class='alert'>El Modulo seleccionado, no tiene menus.</div>");
					}
					$("#listado_plantilla_submenu").html('<div class="alert">Debe de seleccionar un "Menu".</div>');
					$("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
				}else{
					mostrar_mensaje_error("Error del Sistema: <br/>"+data);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_error("No hay conexion con el servidor.");
			})
	})
	$(document).delegate("#btn_nuevo_menu","click",function(){
		var datos = $("#frm_nuevo_menu").serialize();
		var posting = $.post(url+"mantenimiento/guardar_plantilla_menu",datos);
         mostrar_mensaje_en_modal("#modal_nuevo_menu","alert-success","Grabacion Conforme",true);
        limpiar_nuevo_menu();
        listar_menus();					 
        
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						limpiar_nuevo_menu();
						mostrar_mensaje_en_modal("#modal_nuevo_menu","alert-success",imprimir["mensaje"],true);
						listar_menus();					
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_nuevo_menu","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					//mostrar_mensaje_en_modal("#modal_nuevo_menu","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_nuevo_menu","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate("#btn_editar_menu","click",function(){
		var datos = $("#frm_editar_menu").serialize();
		var posting = $.post(url+"mantenimiento/editar_plantilla_menu",datos);
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						mostrar_mensaje_en_modal("#modal_editar_menu","alert-success",imprimir["mensaje"],true);
						listar_menus();					
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_editar_menu","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_editar_menu","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_editar_menu","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate("#listado_plantilla_menu .ticket","click",function(){
		$("#listado_plantilla_menu .ticket").removeClass('ticket_seleccionado');
		var id_pl_menu = $(this).find('input').val();
		menu_nombre_seleccionado = $(this).find('.ticket-title').text();
		menu_seleccionado = id_pl_menu;
		$(this).addClass('ticket_seleccionado');
		var posting = $.post(url+"mantenimiento/getListadoPlantillaSubMenus",{id_pl_menu:id_pl_menu});
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					var html_submenus = '';
					if(imprimir[0]["estado_respuesta"]==1){
						$.each(imprimir,function(indice,valor){
							html_submenus += '<div class="ticket puntero">';
							if(imprimir[indice]["estado"]==1){
								html_submenus += '<span class="label label-success ticket-label">Activo</span>';
							}else{
								html_submenus += '<span class="label label-danger ticket-label">Desactivado</span>';
							}
							html_submenus += '<input type="hidden" value="'+imprimir[indice]["id_pl_submenu"]+'">'
							html_submenus += '<a title="" class="ticket-title">'+imprimir[indice]["nombre"]+'</a>';
							html_submenus += '</div>';
						});
						$("#listado_plantilla_submenu").html(html_submenus);
						$("#listado_plantilla_botones").html('<div class="alert">Debe de seleccionar un "Sub Menu".</div>');
					}else{
						$("#listado_plantilla_submenu").html('<div class="alert">El Menu "'+menu_nombre_seleccionado+'" del Modulo "'+modulo_nombre_seleccionado+'", no tiene Sub Menus.</div>');
					}					
				}else{
					mostrar_mensaje_error("Error del Sistema: <br/>"+data);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_error("No hay conexion con el servidor.");
			})
	})
	$(document).delegate("#listado_plantilla_submenu .ticket","click",function(){
		$("#listado_plantilla_submenu .ticket").removeClass('ticket_seleccionado');
		var id_pl_submenu = $(this).find('input').val();
		submenu_seleccionado = id_pl_submenu;
		submenu_nombre_seleccionado = $(this).find('.ticket-title').text();
		$(this).addClass('ticket_seleccionado');
		var posting = $.post(url+"mantenimiento/getListadoPlantillaBotones",{id_pl_submenu:id_pl_submenu});
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					var html_botones = '';
					if(imprimir[0]["estado_respuesta"]==1){
						$.each(imprimir,function(indice,valor){
							html_botones += '<div class="ticket puntero">';
							if(imprimir[indice]["estado"]==1){
								html_botones += '<span class="label label-success ticket-label">Activo</span>';
							}else{
								html_botones += '<span class="label label-danger ticket-label">Desactivado</span>';
							}
							html_botones += '<button class="btn btn-labeled btn-primary"><span class="btn-label">'+imprimir[indice]["icono"]+'</span>'+imprimir[indice]["nombre"]+'</button>';
							html_botones += '</div>';
						});
						$("#listado_plantilla_botones").html(html_botones);
					}else{
						$("#listado_plantilla_botones").html("<div class='alert'>El SubMenu seleccionado, no tiene botones.</div>");
					}					
				}else{
					mostrar_mensaje_error("Error del Sistema: <br/>"+data);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_error("No hay conexion con el servidor.");
			})
	})
	$(document).delegate("#nuevo_menu","click",function(){
		if(modulo_seleccionado!=''){
			$("#n_id_pl_m_menu").val(modulo_seleccionado);
			$("#n_menu_modulo").val(modulo_nombre_seleccionado);
			$('#modal_nuevo_menu').modal({show:true,backdrop:'static'});
            $("#n_nombre_menu").focus();
            
		}else{
			mostrar_mensaje_error("Debe de seleccionar un modulo, para poder agregar un nuevo menu.");
		}
	})
	$(document).delegate("#editar_menu","click",function(){
		if(menu_seleccionado!=''){
			var id_pl_menu = menu_seleccionado;
			var posting = $.post(url+"mantenimiento/getDatosMenu",{id_pl_menu:id_pl_menu});
				posting.done(function(data){
					if(isJSON(data)==true){
						var imprimir = $.parseJSON(data);
						if(imprimir["estado_respuesta"]==1){
							$("#e_id_pl_menu_menu").val(imprimir["id_pl_menu"]);
							$("#e_menu_modulo").val(imprimir["nombre_modulo"]);
							$("#e_nombre_menu").val(imprimir["nombre"]);
							$("#e_icono_menu").val(imprimir["icono"]);
							$("#e_url_menu").val(imprimir["url"]);
							$("#e_orden_menu").val(imprimir["orden"]);
							$('#modal_editar_menu').modal({show:true,backdrop:'static'});
						}else{
							mostrar_mensaje_error(imprimir["mensaje"]);
						}						
					}else{
						mostrar_mensaje_error("Error del Sistema: <br/>"+data);
					}
				});
				posting.fail(function(){
					mostrar_mensaje_error("No hay conexion con el servidor.");
				})
		}else{
			mostrar_mensaje_error("Debe seleccionar primero un Menu, para poder editar.")
		}
	})
	$(document).delegate("#nuevo_submenu","click",function(){
		if(menu_seleccionado!=''){
			$("#n_id_pl_m_submenu").val(modulo_seleccionado);
			$("#n_submenu_modulo").val(modulo_nombre_seleccionado);
			$("#n_id_pl_menu_submenu").val(menu_seleccionado);
			$("#n_submenu_menu").val(menu_nombre_seleccionado);
			$('#modal_nuevo_submenu').modal({show:true,backdrop:'static'});
            $("#n_nombre_submenu").focus();
		}else{
			mostrar_mensaje_error("Debe de seleccionar un modulo, para poder agregar un nuevo menu.");
		}
	})
	$(document).delegate("#btn_nuevo_submenu","click",function(){
		var datos = $("#frm_nuevo_submenu").serialize();
		var posting = $.post(url+"mantenimiento/guardar_plantilla_submenu",datos);
        limpiar_nuevo_submenu();
        mostrar_mensaje_en_modal("#modal_nuevo_submenu","alert-success","Sub menu grabado conforme...",true);
        listar_submenus();				
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						limpiar_nuevo_submenu();
						mostrar_mensaje_en_modal("#modal_nuevo_submenu","alert-success",imprimir["mensaje"],true);
						listar_submenus();				
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_nuevo_submenu","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					// mostrar_mensaje_en_modal("#modal_nuevo_submenu","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_nuevo_submenu","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate("#editar_submenu","click",function(){
		if(submenu_seleccionado!=''){
			var id_pl_submenu = submenu_seleccionado;
			var posting = $.post(url+"mantenimiento/getDatosSubMenu",{id_pl_submenu:id_pl_submenu});
				posting.done(function(data){
					if(isJSON(data)==true){
						var imprimir = $.parseJSON(data);
						if(imprimir["estado_respuesta"]==1){
							$("#e_id_pl_submenu_submenu").val(imprimir["id_pl_submenu"]);
							$("#e_submenu_menu").val(imprimir["nombre_menu"]);
							$("#e_submenu_modulo").val(imprimir["nombre_modulo"]);
							$("#e_nombre_submenu").val(imprimir["nombre"]);
							$("#e_icono_submenu").val(imprimir["icono"]);
							$("#e_url_submenu").val(imprimir["url"]);
							$("#e_orden_submenu").val(imprimir["orden"]);
							$('#modal_editar_submenu').modal({show:true,backdrop:'static'});
						}else{
							mostrar_mensaje_error(imprimir["mensaje"]);
						}						
					}else{
						mostrar_mensaje_error("Error del Sistema: <br/>"+data);
					}
				});
				posting.fail(function(){
					mostrar_mensaje_error("No hay conexion con el servidor.");
				})
		}else{
			mostrar_mensaje_error("Debe de seleccionar un Sub Menu, para poder editar.");
		}
	})
	$(document).delegate("#btn_editar_submenu","click",function(){
		var datos = $("#frm_editar_submenu").serialize();
		var posting = $.post(url+"mantenimiento/editar_plantilla_submenu",datos);
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						mostrar_mensaje_en_modal("#modal_editar_submenu","alert-success",imprimir["mensaje"],true);
						listar_submenus();					
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_editar_submenu","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_editar_submenu","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_editar_submenu","alert-danger","No hay conexion con el servidor.",false);
			})
	})
	$(document).delegate("#nuevo_boton","click",function(){
		if(submenu_seleccionado!=''){
			$("#n_id_pl_m_boton").val(modulo_seleccionado);
			$("#n_boton_modulo").val(modulo_nombre_seleccionado);
			$("#n_id_pl_menu_boton").val(menu_seleccionado);
			$("#n_boton_menu").val(menu_nombre_seleccionado);
			$("#n_id_pl_submenu_boton").val(submenu_seleccionado);
			$("#n_boton_submenu").val(submenu_nombre_seleccionado);
			$('#modal_nuevo_boton').modal({show:true,backdrop:'static'});
            $("#n_nombre_boton").focus();
		}else{
			mostrar_mensaje_error("Debe de seleccionar un modulo, para poder agregar un nuevo menu.");
		}
	})
	$(document).delegate("#btn_nuevo_boton","click",function(){
		var datos = $("#frm_nuevo_boton").serialize();
		var posting = $.post(url+"mantenimiento/guardar_plantilla_boton",datos);
        mostrar_mensaje_en_modal("#modal_nuevo_boton","alert-success","Grabacion de boton conforme",true);
        limpiar_botones();
        listar_botones();	
        
			posting.done(function(data){
				if(isJSON(data)==true){
					var imprimir = $.parseJSON(data);
					if(imprimir["estado_respuesta"]==1){
						limpiar_nuevo_boton();
						mostrar_mensaje_en_modal("#modal_nuevo_boton","alert-success",imprimir["mensaje"],true);
						listar_botones();				
					}else if(imprimir["estado_respuesta"]==0){
						mostrar_mensaje_en_modal("#modal_nuevo_boton","alert-danger",imprimir["mensaje"],true);
					}
				}else{
					mostrar_mensaje_en_modal("#modal_nuevo_boton","alert-danger","Error del Sistema: <br/>"+data,false);
				}
			});
			posting.fail(function(){
				mostrar_mensaje_en_modal("#modal_nuevo_boton","alert-danger","No hay conexion con el servidor.",false);
			})
	})
});