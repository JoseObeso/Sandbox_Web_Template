 
var url = 'http://'+document.domain+'/rrhh/turnos/';
var timeslide = 1000;
$(document).ready(function(e){
	var init = [];
	 
	init.push(function () {
		var $ph  = $('#page-signin-bg'),
		    $img = $ph.find('> img');

		$(window).on('resize', function () {
			$img.attr('style', '');
			if ($img.height() < $ph.height()) {
				$img.css({
					height: '100%',
					width: 'auto'
				});
			}
		});
	});

	
	init.push(function () {		
		$('#forgot-password-link').click(function () {
			$('#password-reset-form').fadeIn(400);
			return false;
		});
		$('#password-reset-form .close').click(function () {
			$('#password-reset-form').fadeOut(400);
			return false;
		});
	});

	
	init.push(function () {
		$("#form-verificar-ingreso").validate({ focusInvalid: true, errorPlacement: function () {} });
		
	
		$("#dni").rules("add", {
			required: true,
			minlength: 8
		});

	
		$("#clave").rules("add", {
			required: true,
			minlength: 2
		});
	});

	
	init.push(function () {
		$("#password-reset-form_id").validate({ focusInvalid: true, errorPlacement: function () {} });
		
	
		$("#p_email_id").rules("add", {
			required: true,
			email: true
		});
	});

	window.PixelAdmin.start(init);
	$("#mensajes-verificacion").hide();
	$("#cargando-verificacion").hide();

	var conn = true;	
	function checkConnection() {
		$.ajax({
			url: url+'application/verificarconexion.php',
			async: false,
			data: {'tag' : 'connection'}
		})
		.fail(function() { conn = false; })
		.done(function() { conn = true; })
  	}

	$(document).delegate('.cerraralerta','click',function(){
    	$("#desarrollado").show();
	})
	$("#progressbar-cargando").hide();
	$("#progressbar-cargando").progressbar({ value: 0 });
	$(document).delegate('#form-verificar-ingreso','submit',function(){
		checkConnection();
		$("#mensajes-verificacion").slideUp(timeslide);
		if(conn){
			setTimeout(function(){
				var datos = $("#form-verificar-ingreso").serialize();		
				$.post(url+'index/verificar_ingreso',datos,function(data){
					if(data['estado']==1){
						$("#desarrollado").hide();
						$(".msg-error").html('<div class="alert alert-success alert-dark" id="mensajes-verificacion"></div>');
						$("#mensajes-verificacion").hide(0).html('<button type="button" class="close cerraralerta" data-dismiss="alert">×</button><strong>'+data['mensaje']+'</strong>')
						$("#mensajes-verificacion").slideDown(timeslide);
						$("#progressbar-cargando").slideDown(timeslide);
						$('#usuario').attr("disabled", true);
						$('#clave').attr("disabled", true);
						$('#ingresar').attr("disabled", true);
						setInterval(function(){
							var valor = $("#progressbar-cargando").progressbar( "value" );
							var nuevovalor = valor +Math.floor( Math.random() * 3 );
							if(valor==100){
								window.location.href= url+'inicio';
							}else{
								$("#progressbar-cargando").progressbar({ value: nuevovalor });
							}						
						}, 40);
					}else if(data['estado']==0){
						$(".msg-error").html('<div class="alert alert-danger alert-dark" id="mensajes-verificacion"></div>');
						$("#mensajes-verificacion").hide(0).html('<button type="button" class="close cerraralerta" data-dismiss="alert">×</button><strong>'+data['mensaje']+'</strong>')
						$("#mensajes-verificacion").slideDown(timeslide);
					}
				},'json');
			},timeslide);
		}else{
			$(".msg-error").html('<div class="alert alert-danger alert-dark" id="mensajes-verificacion"></div>');
			$("#mensajes-verificacion").hide(0).html('<button type="button" class="close cerraralerta" data-dismiss="alert">×</button><strong>No tiene conexion con la red.</strong>')
			$("#mensajes-verificacion").slideDown(timeslide);
		}
		return false;
	})
});