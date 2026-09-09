function valida_ingreso_de_dni(e) {
    "use strict";
    var tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla === 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


  
function validar_anio_4_digitos(e) {
    "use strict";
    var anio = e;
    var valor = anio;
    var min = 4;
    var mensaje;
    var numberFormat = /^\d{4}$/;
    if (valor.length === min) {
        if (numberFormat.test(valor))
            {
            }
        else
            {
                mensaje = "Usted Ingreso : " + anio + " .. y deben ser de 4 digitos numericos, año desde 2016 al 2100";
                
            }
    }
    else {
        mensaje = "Usted Ingreso : " + anio + " .. y deben ser de 4 digitos";
    }
        
  return mensaje;

}

function Solo_Texto(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex  = /^[\ba-zA-Z\s-]$/;
    if (AllowRegex.test(character)) return true;     
    return false; 
}



/*
<input type="text" onkeypress="return Solo_Texto(event);" >
*/


