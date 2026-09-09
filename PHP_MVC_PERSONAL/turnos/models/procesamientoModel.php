<?php


class procesamientoModel extends Model {
    public

    function __construct() {
        parent::__construct();
    }

    public

    function SetProcesarProgramacionAdmin( $mes_procesar_a, $anio_procesar_a, $usuario_registro ) {
        $ejecutar_en_el_server ="EXEC SP_PROCESAR_MASIVAMENTE_ADMINISTRATIVOS " . $mes_procesar_a. "," . $anio_procesar_a.",".$usuario_registro ;
        $resultado = $this->_db->prepare( $ejecutar_en_el_server );
        $resultado->execute();
        if ( $resultado ) {
            $array = array( 'estado' => 1, 'mensaje' => "Grabacion Ok" );
        } else {
            $array = array( 'estado' => 0, 'mensaje' => "Error de Grabacion" );
        }

        return json_encode( $array );
    }


    public

    function EjecutaCierre( $mes_seleccion, $anio_seleccion ) {
        $sentencia_a_ejecutar = "EXEC [dbo].[SP_CIERRE_TURNOS] " . $mes_seleccion . "," . $anio_seleccion;
        $resultado = $this->_db->prepare( $sentencia_a_ejecutar );
        $resultado->execute();
        if ( $resultado ) {
            $array = array( 'estado' => 1, 'mensaje' => "Grabacion Ok" );
        } else {
            $array = array( 'estado' => 0, 'mensaje' => "Error de Grabacion" );
        }
        return json_encode( $array );
    }


    public

    function EjecutaAbrir( $mes_seleccion, $anio_seleccion ) {
        $sentencia_a_ejecutar = "EXEC [dbo].[SP_ABRIR_TURNOS] " . $mes_seleccion . "," . $anio_seleccion;
        $resultado = $this->_db->prepare( $sentencia_a_ejecutar );
        $resultado->execute();
        if ( $resultado) {
            $array = array( 'estado' => 1, 'mensaje' => "Grabacion Ok" );
        } else {
            $array = array( 'estado' => 0, 'mensaje' => "Error de Grabacion" );
        }
        return json_encode( $array );
    }






    public

    function getListarUnidadesOrganicas() {
        $sentencia = "SELECT CODIGO, upper(descripcion) as NOMBRE  FROM [SIGH].[dbo].[CentrosCosto] order by nombre";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => $imprimir->CODIGO, 'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }




    public

    function getDatosUsuario( usuario_web $u ) {
        $sentencia = "select * from usuario_web where dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni() ) );
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estadorespuesta' => 1, 'dni' => $imprimir->DNI, 'nombres' => $imprimir->USU_NOMBRE, 'paterno' => $imprimir->USU_PATERNO, 'materno' => $imprimir->USU_MATERNO, 'cargo' => $imprimir->CARGO, 'sesion' => $imprimir->SESION, 'sexo' => $imprimir->SEXO, 'email' => $imprimir->EMAIL, 'fecha-expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ), 'estado' => $imprimir->ESTADO );

        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    /* para datos de personal para traer */

    public

    function getDatosProfesional( $id_empleado ) {
        $sentencia = "select idempleado, apellidopaterno, apellidomaterno, nombres, (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) as ApellidosNombres, a.IdCondicionTrabajo,a.IdTipoEmpleado, dni, CodigoPlanilla, usuario, FechaNacimiento, idTipoDocumento, case when sexo = 1 then 'MASCULINO' when sexo = '2' then 'FEMENINO' else 'NO REGISTRADO' END as sexo,  usuario, upper(b.Descripcion) as Tipo_condicion_trabajo, upper(c.descripcion) as Tipo_Condicion_empleado, esActivo as activo  FROM [SIGH].[dbo].[Empleados] a left join [SIGH].[dbo].[TiposCondicionTrabajo] b on a.idcondiciontrabajo = b.idcondiciontrabajo left join [SIGH].[dbo].[TiposEmpleado] c on  a.idtipoempleado = c.IdTipoEmpleado where 	idempleado = " . $id_empleado;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estadorespuesta' => 1,
                'idempleado' => $imprimir->idempleado,
                'dni' => $imprimir->dni,
                'nombres' => utf8_encode( $imprimir->ApellidosNombres ),
                'tipocondiciontrabajo' => utf8_encode( $imprimir->Tipo_condicion_trabajo ),
                'tipocondicionempleado' => utf8_encode( $imprimir->Tipo_Condicion_empleado ) );


        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }

        return json_encode( $array );
    }

    
   


        
        
        
    }
    
    
    
    
    

}
?>