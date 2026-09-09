<?php


class turnosModel extends Model {
    public
    function __construct() {
        parent::__construct();

    }


    public

    function getListadoPersonal( usuario_web $u ) {
        $sentencia = " select idempleado, apellidopaterno, apellidomaterno, nombres, (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) as ApellidosNombres, a.IdCondicionTrabajo,a.IdTipoEmpleado, dni, CodigoPlanilla, usuario, FechaNacimiento, idTipoDocumento,  case when sexo = 1 then 'MASCULINO' when sexo = '2' then 'FEMENINO' else 'NO REGISTRADO' END as sexo, usuario, upper(b.Descripcion) as Tipo_condicion_trabajo, upper(c.descripcion) as Tipo_Condicion_empleado, esActivo as activo   FROM [SIGH].[dbo].[Empleados] a left join [SIGH].[dbo].[TiposCondicionTrabajo] b on a.idcondiciontrabajo = b.idcondiciontrabajo left join [SIGH].[dbo].[TiposEmpleado] c on  a.idtipoempleado = c.IdTipoEmpleado where 
       (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) like  ?  order by ApellidoPaterno, ApellidoMaterno, nombres";

        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'idempleado' => $imprimir->idempleado,
                    'dni' => trim( $imprimir->dni ),
                    'nombres' => utf8_encode( trim( $imprimir->ApellidosNombres ) ),
                    'Tipo_condicion_trabajo' => utf8_encode( trim( $imprimir->Tipo_condicion_trabajo ) ),
                    'FechaNacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FechaNacimiento ) ) ),
                    'Tipo_Condicion_empleado' => utf8_encode( trim( $imprimir->Tipo_Condicion_empleado ) ),
                    'sexo' => trim( $imprimir->sexo ),
                    'activo' => trim( $imprimir->activo ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }

    public

    function getListadoPersonalTempus( usuario_web $u ) {
        include( 'application/Config_Tempus.php' );
        $sentencia = "SELECT  [CODIGO], [CENTRO_DE_COSTO], UPPER([APELLIDO_PATERNO]) AS PATERNO, UPPER([APELLIDO_MATERNO]) AS MATERNO, APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES as APELLIDOS_NOMBRES_TOTALES, UPPER([NOMBRES]) AS NOMBRES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, case when TIPO_HORARIO_TMP is null then '' when TIPO_HORARIO_TMP = 'A' then 'ADMINISTRATIVO' when TIPO_HORARIO_TMP = 'S' then 'ASISTENCIAL' ELSE '' END CONDICION, CARGO_PLANILLA, ESTADOTB   FROM [TEMPUS].[TEMPUS].[PERSONAL] WHERE ESTADOTB = 1 AND  APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES 	COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI LIKE ?  or codigo like  ? ORDER BY APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES ";
        $resultado = $cnx_tempus->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%', '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => trim( $imprimir->CODIGO ),
                    'apellidos_nombres_totales' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES_TOTALES ) ),
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION ) ),
                    'ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_DE_INGRESO ) ) ),
                    'cargo_planilla' => utf8_encode( trim( $imprimir->CARGO_PLANILLA ) ),
                    'tarjeta_tmp' => trim( $imprimir->TARJETA_TMP ),
                    'estadotb' => trim( $imprimir->ESTADOTB ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }

    public

    function getListadoPersonal_rrhh( usuario_web $u ) {
        $sentencia = "select idpersonal, plaza, rtrim(dni) as dni, apellidosnombres, cargo, fechaingreso, case when tipo_personal = 'A' then 'ADMINISTRATIVO' when tipo_personal = 'S' then 'ASISTENCIAL' ELSE 'NO DEFINIDO' END AS tipo_personal, estado FROM [HEVES_RRHH].[dbo].[PERSONAL]  where apellidosnombres like ? order by APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'plaza' => trim( $imprimir->plaza ),
                    'dni' => trim( $imprimir->dni ),
                    'apellidosnombres' => utf8_encode( trim( $imprimir->apellidosnombres ) ),
                    'cargo' => utf8_encode( trim( $imprimir->cargo ) ),
                    'fechaingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->fechaingreso ) ) ),
                    'tipo_personal' => utf8_encode( trim( $imprimir->tipo_personal ) ),
                    'estado' => trim( $imprimir->estado ) );

            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    public

    function SetAsignacionHorarios( $id_empleado, $mes, $anio, $codigo_horario, $dni_empleado, $usuario_registro ) {
        $ejecutar_en_el_server = "EXEC [dbo].[SP_CREAR_HORARIO_ASISTENCIA] " . $mes . "," . $anio . "," . $id_empleado . "," . $dni_empleado . ", 'SIGH.EMPLEADO', " . $codigo_horario . "," . $usuario_registro;


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
    function SetProcesamientoAdmin( $mes_procesar_a, $anio_procesar_a ) {
        include( 'application/Config_Tempus.php' );

        $sentencia = "SELECT  [CODIGO]    FROM [TEMPUS].[TEMPUS].[PERSONAL] WHERE ESTADOTB = 1  and  TIPO_HORARIO_TMP = 'A' ORDER BY APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES";

        $resultado = $cnx_tempus->prepare( $sentencia );

        $resultado->execute( array( '%' . $u->getNombres() . '%', '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => trim( $imprimir->CODIGO ),
                    'apellidos_nombres_totales' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES_TOTALES ) ),
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION ) ),
                    'ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_DE_INGRESO ) ) ),
                    'cargo_planilla' => utf8_encode( trim( $imprimir->CARGO_PLANILLA ) ),
                    'tarjeta_tmp' => trim( $imprimir->TARJETA_TMP ),
                    'estadotb' => trim( $imprimir->ESTADOTB ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }









    public

    function CambiarMiClave( usuario_web $uw ) {
        $sentencia = "EXEC SP_CAMBIAR_CLAVE_USUARIO_WEB ?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $uw->getDni(), $uw->getClave(), $uw->getNueva_clave() ) );
        $imprimir = $resultado->fetchAll( PDO::FETCH_ASSOC );
        $array = array( 'estado_respuesta' => $imprimir[ 0 ][ "ESTADO" ], 'mensaje' => $imprimir[ 0 ][ "MENSAJE" ] );
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

    function getListarHorarios() {
        $sentencia = " SELECT [IDHORARIO],[CODIGOHORARIO],[CODIGOTURNO],[HORAINGRESO],[HORASALIDA],  ltrim(rtrim([CODIGOHORARIO])) + ' -- ' + ltrim(rtrim([CODIGOTURNO]))
 + ' -- ' + ltrim(rtrim([HORAINGRESO])) + ' -- ' + ltrim(rtrim([HORASALIDA])) as UNIRCODIGOS   FROM [HEVES_RRHH].[dbo].[T_HORARIOS]  ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'codigohorario' => utf8_encode( trim( $imprimir->CODIGOHORARIO ) ),
                    'horaingreso' => utf8_encode( trim( $imprimir->HORAINGRESO ) ),
                    'horasalida' => utf8_encode( trim( $imprimir->HORASALIDA ) ),
                    'unircodigos' => utf8_encode( trim( $imprimir->UNIRCODIGOS ) ) );

            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
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
?>