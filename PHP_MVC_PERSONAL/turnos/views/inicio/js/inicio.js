var url = 'http://'+document.domain+'/rrhh/turnos/'

 

var conn = true;
var minutos = '';
var segundos = '';	
function checkConnection() {
	$.ajax({
		url: url+'application/verificarconexion.php',
		async: false,
		data: {'tag' : 'connection'}
	})
	.fail(function() { conn = false; })
	.done(function() { conn = true; })
}
function cuentaRegresiva(){
	minutos = $("#minutos").val();
	segundos = $("#segundos").val();
	var existe = $("#modal-validar-cuenta:visible").length;
	var printSegundos = '';
	var printMinutos = '';
	if($("#hora-session").text()!='00:00'){
		if(segundos==0){
			segundos = '00';
		}
		if(segundos=='00'){
			segundos = 60;
			minutos--;
		}
		segundos--;
		if(segundos<10){
			printSegundos = '0'+segundos;
		}else{
			printSegundos = segundos;
		}
		if(minutos<10){
			printMinutos = '0'+minutos;
		}else{
			printMinutos = minutos;
		}
		$("#hora-session").text(printMinutos+':'+printSegundos);
		$("#minutos").val(minutos);
		$("#segundos").val(segundos);
	}else{
		if(existe==0){
			var dni = $("#dni").val();
			$.post(url+'inicio/salir',{dni:dni},function(data){
				if(data['estado']==1){
					$('#modal-validar-cuenta').modal({show:true,backdrop:'static'});
				}else{
					alert(data["mensaje"]);
				}
			},'json');			
		}		
	}
}
$(document).ready(function(){
	cuentaRegresiva();
	$('.crear-tooltip').tooltip();
	init.push(function () {
		$("#frm-validar-cuenta").validate({ focusInvalid: true, errorPlacement: function () {} });

		// Validar clave
		$("#clave").rules("add", {
			required: true,
			minlength: 2
		});
	});
	setInterval(cuentaRegresiva, 1000);
	$(document).delegate('#frm-validar-cuenta','submit',function(){
		var datos = $(this).serialize();
		
		$.post(url+'index/verificar_ingreso',datos,function(data){
			if(data['estado']==1){
				$("#hora-session").text('05:00');
				$("#minutos").val(5);
				$("#segundos").val('00');
				$('#modal-validar-cuenta').modal('hide');
				$("#clave").val('');
			}else{
				alert(data['mensaje']);
			}
		},'json')
		return false;			
	});
});