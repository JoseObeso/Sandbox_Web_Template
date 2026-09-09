<?php
class programacionModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public
    function getListarPersonalAdministrativo() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL]   WHERE ESTADO = '1' AND TIPO_PERSONAL = 'A' ORDER BY APELLIDOSNOMBRES ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'cargo' => utf8_encode( $read_filas->CARGO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'fecha_ingreso' => utf8_encode( $read_filas->FECHA_INGRESO ),
                    'fecha_termino' => utf8_encode( $read_filas->FECHA_TERMINO_CONTRATO ),
                    'codhorario' => utf8_encode( $read_filas->CODHORARIO ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'dni' => '',
                'tipo_personal' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'servicio' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );

        }
        return json_encode( $datos_read );
    }
    
    
    
    
    public
    function  getListarPersonalAsistencial() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO, SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL] WHERE ESTADO = '1' AND TIPO_PERSONAL = 'S' ORDER BY APELLIDOSNOMBRES ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'cargo' => utf8_encode( $read_filas->CARGO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'fecha_ingreso' => utf8_encode( $read_filas->FECHA_INGRESO ),
                    'fecha_termino' => utf8_encode( $read_filas->FECHA_TERMINO_CONTRATO ),
                    'codhorario' => utf8_encode( $read_filas->CODHORARIO ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'dni' => '',
                'tipo_personal' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'servicio' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );

        }
        return json_encode( $datos_read );
    }
    

    
    
    
    
    
    
     public

    function BuscarPersonalNombresAsistencial( $nombres ) {
        $read_sql = "SELECT IDPERSONAL,DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10),  FECHAULTIMORETIRO, 101)  else '' end as FECHA_ULTIMO_RETIRO, SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL] where  ESTADO = '1' AND TIPO_PERSONAL = 'S'  AND APELLIDOSNOMBRES LIKE '%' + '" . $nombres . "' + '%'  ORDER BY APELLIDOSNOMBRES ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'cargo' => utf8_encode( $read_filas->CARGO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'fecha_ingreso' => utf8_encode( $read_filas->FECHA_INGRESO ),
                    'fecha_termino' => utf8_encode( $read_filas->FECHA_TERMINO_CONTRATO ),
                    'codhorario' => utf8_encode( $read_filas->CODHORARIO ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'dni' => '',
                'tipo_personal' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'servicio' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );
        }
        return json_encode( $datos_read );
    }

    
    
    

    public

    function BuscarPersonalNombres( $nombres ) {
        $read_sql = "SELECT IDPERSONAL,DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10),  FECHAULTIMORETIRO, 101)  else '' end as FECHA_ULTIMO_RETIRO, SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL] where  ESTADO = '1' AND TIPO_PERSONAL = 'A'  AND APELLIDOSNOMBRES LIKE '%' + '" . $nombres . "' + '%'  ORDER BY APELLIDOSNOMBRES ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'cargo' => utf8_encode( $read_filas->CARGO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'fecha_ingreso' => utf8_encode( $read_filas->FECHA_INGRESO ),
                    'fecha_termino' => utf8_encode( $read_filas->FECHA_TERMINO_CONTRATO ),
                    'codhorario' => utf8_encode( $read_filas->CODHORARIO ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'dni' => '',
                'tipo_personal' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'servicio' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function getListarHorarios() {
        $read_sql = "SELECT IDHORARIO, CODIGOHORARIO, CODIGOTURNO, HORAINGRESO, HORASALIDA, HORAS   FROM [HEVES_RRHH].[dbo].[T_HORARIOS]";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDHORARIO,
                    'codigo' => utf8_encode( trim( $read->CODIGOHORARIO ) ),
                    'codigoturno' => utf8_encode( trim( $read->CODIGOTURNO ) ),
                    'horaingreso' => utf8_encode( trim( $read->HORAINGRESO ) ),
                    'horasalida' => utf8_encode( trim( $read->HORASALIDA ) ),
                    'horas' => utf8_encode( trim( $read->HORAS ) ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'codigo' => '',
                'codigoturno' => '',
                'horaingreso' => '',
                'horasalida' => '',
                'horas' => '' );
        }
        return json_encode( $datos_read );

    }

    
    public
    function ver_programacion_mes( $mes, $anio, $dni ) {
        $read_sql = "SELECT IDASISTENCIAPERSONAL, IDPERSONAL, DNI, CASE WHEN CODIGO_HORARIO = 'D' THEN 'DES' ELSE CODIGO_HORARIO END AS CODIGO_HORARIO,  CODIGO_TURNO, RIGHT('00' + Ltrim(Rtrim(DIA)),2) as DIA,  MES, ANIO, HORA_ENTRADA_HORARIO, HORA_SALIDA_HORARIO, HORA_ENTRADA_MARCACION, HORA_SALIDA_MARCACION, DIA_NOMBRE, HORAS FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] where dni = '".$dni."' and mes = ".$mes." and anio = ".$anio;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDASISTENCIAPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'horario' => trim($read_filas->CODIGO_HORARIO),
                    'turno' => trim($read_filas->CODIGO_TURNO),
                    'dia_nombre' => trim($read_filas->DIA_NOMBRE),
                    'dia' => trim($read_filas->DIA),
                    'mes' => trim($read_filas->MES),
                    'anio' => trim($read_filas->ANIO),
                    'entrada' => trim($read_filas->HORA_ENTRADA_HORARIO),
                    'salida' => trim($read_filas->HORA_SALIDA_HORARIO),
                    'horas' => $read_filas->HORAS);
            }
        } else {
            $datos_read[] = array(
                    'id' => '',
                    'dni' => '',
                    'horario' => '',
                    'turno' => '',
                    'dia_nombre' => '',                
                    'dia' => '',
                    'mes' => '',
                    'anio' => '',
                    'entrada' => '',
                    'salida' => '',
                    'horas' => '');
        }
        return json_encode( $datos_read );
    }









    public

    function AsignarHorario( $codhorario, $idpersonal, $usuario ) {
        $update_documento = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL] SET CODHORARIO = '" . $codhorario . "', USUARIOMODIFICO =  '" . $usuario . "', FECHAMODIFICACION = getdate()  WHERE IDPERSONAL = " . $idpersonal;
        $ejecucion = $this->_db->prepare( $update_documento );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }




    public

    function getListarAdministrativos() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10),  FECHAULTIMORETIRO, 101)  else '' end as FECHA_ULTIMO_RETIRO, SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL]
        WHERE  ESTADO = '1'  ORDER BY APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'cargo' => utf8_encode( $read_filas->CARGO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'fecha_ingreso' => utf8_encode( $read_filas->FECHA_INGRESO ),
                    'fecha_termino' => utf8_encode( $read_filas->FECHA_TERMINO_CONTRATO ),
                    'codhorario' => utf8_encode( $read_filas->CODHORARIO ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'dni' => '',
                'tipo_personal' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'servicio' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );

        }
        return json_encode( $datos_read );
    }


    public

    function Procesar_Todo_Administrativo_Asistencial( $mes, $anio, $usuario ) {
        $procesar_administrativos = "EXEC [dbo].[SP_PROCESAR_MASIVAMENTE_ADMINISTRATIVOS_ASISTENCIAL] " . $mes . ", " . $anio . ", '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $procesar_administrativos );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function Eliminar_administrativo( $mes, $anio ) {
        $eliminar_administrativos = "delete from [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] where mes = " . $mes . " and anio = " . $anio;
        $ejecucion = $this->_db->prepare( $eliminar_administrativos );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function getVerProgramacion( $dni, $mes, $anio ) {
        $read_sql = "SELECT a.IDASISTENCIAPERSONAL, a.IDPERSONAL, a.DNI, a.CODIGO_HORARIO, case when A.TIPO_PERSONAL = 'A' then 'ADMINISTRATIVO' ELSE 'ASISTENCIAL' END AS TIPO_PERSONAL, b.APELLIDOSNOMBRES, a.CODIGO_TURNO, a.DIA, a.MES, a.ANIO, a.HORA_ENTRADA_HORARIO, a.HORA_SALIDA_HORARIO,  case when a.indicador = '1' then 'ABIERTO' ELSE 'CERRADO' END AS ESTADO FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] A left join [HEVES_RRHH].[dbo].[PERSONAL] B on a.dni = b.dni where a.MES = " . $mes . " and a.ANIO = " . $anio . " ORDER BY b.APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'codigo_horario' => utf8_encode( $read_filas->CODIGO_HORARIO ),
                    'codigo_turno' => utf8_encode( $read_filas->CODIGO_TURNO ),
                    'dia' => trim( $read_filas->DIA ),
                    'mes' => trim( $read_filas->MES ),
                    'anio' => trim( $read_filas->ANIO ),
                    'entrada' => trim( $read_filas->HORA_ENTRADA_HORARIO ),
                    'salida' => trim( $read_filas->HORA_SALIDA_HORARIO ),
                    'estado' => utf8_encode( $read_filas->ESTADO ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ) );
            }

        } else {
            $datos_read[] = array(
                'verificar' => '0',
                'dni' => '',
                'apellidos_nombres' => '',
                'codigo_horario' => '',
                'codigo_turno' => '',
                'dia' => '',
                'mes' => '',
                'anio' => '',
                'entrada' => '',
                'salida' => '',
                'estado' => '',
                'tipo_personal' => '' );

        }
        return json_encode( $datos_read );

    }


    public

    function VerificarProgramacionMes( $mes, $anio ) {
        $read_sql = " SELECT MES, ANIO FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO]  where MES = " . $mes . " and ANIO = " . $anio . " group by mes, anio";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'mes' => trim( $read_filas->MES ),
                    'anio' => trim( $read_filas->ANIO ) );
            }

        } else {
            $datos_read[] = array(
                'mes' => '0',
                'anio' => '0' );

        }
        return json_encode( $datos_read );

    }


    
    public
    function Asignar_Turno($id_personal, $cod_horario,$cod_turno , $ingreso, $salida, $horas, $usuario) {
        $asignar = "update [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] set codigo_horario = '".$cod_horario."',  codigo_turno = '".$cod_turno."', hora_entrada_horario = '".$ingreso."',  hora_salida_horario  = '".$salida."', horas = ".$horas.", usuario_programo = '".$usuario."', fecha_programacion = getdate() where  idasistenciapersonal = ".$id_personal;
        $ejecucion = $this->_db->prepare($asignar);
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    
    
    
    public function ProcesarDescuento($dni, $mes, $anio, $tipo, $usuario )

        
    {
        $sql_procesar = "exec [dbo].[SP_PROCESAR_DESCUENTOS_ASISTENCIAL_INDIVIDUAL] '".$dni."', ".$mes.", ".$anio.", 'S', '".$usuario."'";
        $ejecucion_sql = $this->_db->prepare( $sql_procesar );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id_descuentos' => trim( $read_filas->IDDESCUENTOS ),
                    'mes' => trim( $read_filas->MES ),
                    'anio' => trim( $read_filas->ANIO ),
                    'dni' => trim( $read_filas->DNI ),
                    'apellidos_nombres' => trim( utf8_encode( $read_filas->APELLIDOS_NOMBRES ) ),
                    'cargo' => trim( utf8_encode( $read_filas->CARGO ) ),
                    'unidad_organica' => trim( utf8_encode( $read_filas->UNIDAD_ORGANICA ) ),
                    'tipo_personal' => trim( utf8_encode( $read_filas->TIPO_PERSONAL ) ),
                    'ingreso' => trim( utf8_encode( $read_filas->FECHA_INGRESO ) ),
                    'grupo_ocupacional' => trim( utf8_encode( $read_filas->GRUPO_OCUPACIONAL ) ),
                    'codigo_horario' => trim( utf8_encode( $read_filas->CODIGO_HORARIO ) ),
                    'horas_trabajo' => trim( $read_filas->HORAS_TRABAJO ),
                    'sueldo' => $read_filas->SUELDO,
                    'costo_hora' => $read_filas->COSTO_HORA,
                    'minutos_tardanza' => $read_filas->MINUTOS_TARDANZAS,
                    'falta' => $read_filas->FALTA,
                    'minutos_antes_salida' => $read_filas->MINUTOS_ANTES_SALIDA,
                    'permisos' => $read_filas->PERMISOS,
                    'licencias' => $read_filas->LICENCIAS,
                    'exoneracion' => $read_filas->EXONERACION,
                    'extra' => $read_filas->MINUTOS_EXTRA,
                    'descuentos' => $read_filas->DESCUENTO,
                    'fecharegistro' => date( 'd/m/Y', strtotime( trim( $read_filas->FECHAREGISTRO ) ) ) );


            }
        } else {
            $datos_read[] = array(
                'id_descuentos' => '',
                'mes' => '',
                'anio' => '',
                'dni' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'unidad_organica' => '',
                'tipo_personal' => '',
                'grupo_ocupacional' => '',
                'codigo_horario' => '',
                'horas_trabajo' => '',
                'sueldo' => '',
                'costo_hora' => '',
                'minutos_tardanza' => '',
                'falta' => '',
                'minutos_antes_salida' => '',
                'permisos' => '',
                'licencias' => '',
                'exoneracion' => '',
                'extra' => '',
                'descuentos' => '',
                'fecharegistro' => '' );
        }
        return json_encode( $datos_read );


 
    }






}
?>