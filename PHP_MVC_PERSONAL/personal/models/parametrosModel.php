<?php
class parametrosModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    // getListadoTurnos( $id )
    public

    function getListadoHorarios( $id ) {
        $sql = "declare @lc_buscar_horarios varchar(100) = '" . $id . "'  SELECT [IDHORARIO], [CODIGOHORARIO], [CODIGOTURNO], CASE WHEN B.NOMBRE IS NULL THEN '--FALTA REGISTRAR TIPO DE TURNO ----' ELSE B.NOMBRE END AS NOMBRE,  [HORAINGRESO], [HORASALIDA], [HORAS], RIGHT('00' + Ltrim(Rtrim( CONVERT(VARCHAR(2), HORAS))),2) as HORAS_MOSTRAR,  a.FECHAREGISTRO, a.FECHAMODIFICACION, CASE WHEN a.FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  a.FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MOSTRAR, A.OBSERVACION FROM [HEVES_RRHH].[dbo].[T_HORARIOS] A LEFT JOIN [HEVES_RRHH].[dbo].[T_TIPO_TURNO] B ON A.CODIGOTURNO = B.CODIGO  WHERE CODIGOHORARIO  like '%' + @lc_buscar_horarios +'%' or b.nombre like '%' + @lc_buscar_horarios +'%' or a.HORAS LIKE '%' + @lc_buscar_horarios +'%' OR  a.CODIGOTURNO  LIKE '%' + @lc_buscar_horarios +'%'  order by HORAINGRESO";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDHORARIO,
                    'codigo_horario' => $mostrar->CODIGOHORARIO,
                    'codigo_turno' => $mostrar->CODIGOTURNO,
                    'nombre_turno' => utf8_encode( trim( $mostrar->NOMBRE ) ),
                    'ingreso' => $mostrar->HORAINGRESO,
                    'salida' => $mostrar->HORASALIDA,
                    'horas' => $mostrar->HORAS,
                    'observacion' => utf8_encode( $mostrar->OBSERVACION ),
                    'horas_mostrar' => utf8_encode( $mostrar->HORAS_MOSTRAR )

                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function GrabarNuevoHorario( $codigo_horario, $codigo_turno, $entrada, $salida, $horas, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[T_HORARIOS] (CODIGOHORARIO, CODIGOTURNO, HORAINGRESO, HORASALIDA, HORAS, OBSERVACION, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA) VALUES ( '" . $codigo_horario . "', '" . $codigo_turno . "', '" . $entrada . "', '" . $salida . "', '" . $horas . "', '" . $observacion . "'  , '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarEdicionHorario( $id, $codigo_horario, $codigo_turno, $entrada, $salida, $horas, $observacion, $usuario ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[T_HORARIOS] SET CODIGOHORARIO = '" . $codigo_horario . "', CODIGOTURNO = '" . $codigo_turno . "', HORAINGRESO = '" . $entrada . "', HORASALIDA = '" . $salida . "',  HORAS = '" . $horas . "', OBSERVACION = '" . $observacion . "', USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDHORARIO = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function DardeBajaHorario( $id ) {
        $dar_de_baja = "DELETE FROM [HEVES_RRHH].[dbo].[T_HORARIOS] WHERE IDHORARIO = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    /* fin de modelo de datos : horarios */




    public

    function VerExistenciaCodigo( $id )

    {
        $sql = "declare @lc_buscar_horarios varchar(100) = '" . $id . "'SELECT [IDHORARIO], [CODIGOHORARIO], [CODIGOTURNO], CASE WHEN B.NOMBRE IS NULL THEN '--FALTA REGISTRAR TIPO DE TURNO ----' ELSE B.NOMBRE END AS NOMBRE, [HORAINGRESO], [HORASALIDA], [HORAS], RIGHT('00' + Ltrim(Rtrim( CONVERT(VARCHAR(2), HORAS))),2) as HORAS_MOSTRAR,  a.FECHAREGISTRO, a.FECHAMODIFICACION, CASE WHEN a.FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  a.FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MOSTRAR FROM [HEVES_RRHH].[dbo].[T_HORARIOS] A LEFT JOIN [HEVES_RRHH].[dbo].[T_TIPO_TURNO] B  ON A.CODIGOTURNO = B.CODIGO  WHERE CODIGOHORARIO =  @lc_buscar_horarios";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1' );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }



    public

    function getListadoLicencias( usuario_web $u ) {
        $sentencia = "SELECT IDTIPOLICENCIA, NOMBRE, PROCEDE_DESCUENTO,case when PROCEDE_DESCUENTO = '1' then 'DESCONTAR' ELSE 'NO DESCUENTO' END AS TIPO_DESCUENTO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR FROM [HEVES_RRHH].[dbo].[T_TIPO_DE_LICENCIA] where NOMBRE  like ? ORDER BY NOMBRE";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'IDTIPOLICENCIA' => trim( $imprimir->IDTIPOLICENCIA ),
                    'NOMBRE' => utf8_encode( trim( $imprimir->NOMBRE ) ),
                    'PROCEDE_DESCUENTO' => trim( $imprimir->PROCEDE_DESCUENTO ),
                    'tipo_descuento' => utf8_encode( trim( $imprimir->TIPO_DESCUENTO ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'modificacion' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    public

    function getListadoFeriados( usuario_web $u ) {
        $sentencia = "SELECT IDFERIADO, MES, case when MES = '01' then 'ENERO'   WHEN MES = '02' THEN 'FEBRERO'   WHEN MES = '03' THEN 'MARZO'   WHEN MES = '04' THEN 'ABRIL'   WHEN MES = '05' THEN 'MAYO' WHEN MES = '06' THEN 'JUNIO'   WHEN MES = '07' THEN 'JULIO'   WHEN MES = '08' THEN 'AGOSTO'    WHEN MES = '09' THEN 'SEPTIEMBRE'   WHEN MES = '10' THEN 'OCTUBRE'
	     WHEN MES = '11' THEN 'NOVIEMBRE'   WHEN MES = '12' THEN 'DICIEMBRE'   ELSE 'MES ERRONEO' END AS TIPO_MES,  DIA, DESCRIPCION, CONDICION, CASE WHEN CONDICION = 'R' THEN 'REPETITIVO' WHEN CONDICION = 'U' THEN 'UNICO' ELSE '' END AS TIPO_CONDICION, FECHAREGISTRO, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR, CASE WHEN ANIO IS NULL THEN '' ELSE ANIO END AS ANIO  FROM [HEVES_RRHH].[dbo].[T_FERIADOS]  WHERE DESCRIPCION LIKE ? ORDER BY MES ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'idferiado' => $imprimir->IDFERIADO,
                    'mes' => utf8_encode( trim( $imprimir->MES ) ),
                    'tipo_mes' => utf8_encode( trim( $imprimir->TIPO_MES ) ),
                    'dia' => utf8_encode( trim( $imprimir->DIA ) ),
                    'anio' => trim( $imprimir->ANIO ),
                    'condicion' => trim( $imprimir->CONDICION ),
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ),
                    'tipo_condicion' => utf8_encode( trim( $imprimir->TIPO_CONDICION ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'fecha_mostrar' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'idferiado' => '',
                'mes' => '',
                'tipo_mes' => '',
                'dia' => '',
                'anio' => '',
                'condicion' => '',
                'descripcion' => '',
                'tipo_condicion' => '',
                'registro' => '',
                'fecha_mostrar' => '' );
        }
        return json_encode( $array );

    }



    public

    function getListadoCondicion( usuario_web $u ) {
        $sentencia = "SELECT IDTIPOSITUACION, NOMBRE, ESTADO,  CASE WHEN ESTADO = '1' THEN 'ACTIVO'  WHEN ESTADO = '0' THEN 'INOPERATIVO' ELSE 'NO DEFINIDO' END AS TIPO_ESTADO, FECHAREGISTRO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR  FROM [HEVES_RRHH].[dbo].[T_TIPOCONDICIONLABORAL] WHERE NOMBRE LIKE ?  ORDER BY NOMBRE";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'idtiposituacion' => trim( $imprimir->IDTIPOSITUACION ),
                    'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ),
                    'tipo_estado' => utf8_encode( trim( $imprimir->TIPO_ESTADO ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'fecha_mostrar' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'idtiposituacion' => '',
                'nombre' => '',
                'tipo_estado' => '',
                'registro' => '',
                'fecha_mostrar' => '' );

        }
        return json_encode( $array );


    }



    public

    function ListarTodosCondicionLaboral() {
        $sentencia = "SELECT IDTIPOSITUACION, NOMBRE, ESTADO,  CASE WHEN ESTADO = '1' THEN 'ACTIVO'  WHEN ESTADO = '0' THEN 'INOPERATIVO' ELSE 'NO DEFINIDO' END AS TIPO_ESTADO, FECHAREGISTRO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR  FROM [HEVES_RRHH].[dbo].[T_TIPOCONDICIONLABORAL]  where IDTIPOSITUACION <> 8";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'verificar' => '1',
                    'idtiposituacion' => trim( $imprimir->IDTIPOSITUACION ),
                    'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ),
                    'tipo_estado' => utf8_encode( trim( $imprimir->TIPO_ESTADO ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'fecha_mostrar' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );

        }
        return json_encode( $array );


    }


    /* inicio de actividades */



    public

    function getListadoActividades() {
        $sentencia = "SELECT IDACTIVIDAD, NOMBRE, ABREVIATURA, IDCLASIFICACION,  CASE WHEN IDCLASIFICACION = 1 THEN 'MEDICOS' ELSE '' END AS PROFESIONAL, TITULO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR, USUARIODIODEBAJA, FECHADEBAJA  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED]  ORDER BY NOMBRE";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idactividad' => trim( $imprimir->IDACTIVIDAD ),
                    'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ),
                    'abreviatura' => utf8_encode( trim( $imprimir->ABREVIATURA ) ),
                    'profesional' => utf8_encode( trim( $imprimir->PROFESIONAL ) ),
                    'titulo' => utf8_encode( trim( $imprimir->TITULO ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'modificacion' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }



    // GuardarNuevaActividad( $nombre, $abreviatura, $titulo, $usuario )


    public

    function GuardarNuevaActividad( $nombre, $abreviatura, $titulo, $usuario ) {
        $insertar_actividad = "INSERT INTO [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED] (NOMBRE, ABREVIATURA, IDCLASIFICACION, TITULO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA) VALUES (upper('" . $nombre . "'), upper('" . $abreviatura . "'), 1, '" . $titulo . "', '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function GuardarEdicionActividad( $nombre, $abreviatura, $titulo, $usuario, $id_actividad ) {
        $update_actividad = "UPDATE [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED] SET [NOMBRE] = upper('" . utf8_decode( $nombre ) . "'), [ABREVIATURA] = upper('" . utf8_decode( $abreviatura ) . "'), [IDCLASIFICACION] = 1, [TITULO] = upper('" . utf8_decode( $titulo ) . "'), [USUARIOMODIFICO] = '" . $usuario . "', [FECHAMODIFICACION] = GETDATE() WHERE IDACTIVIDAD = " . $id_actividad;
        $ejecucion = $this->_db->prepare( $update_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );




    }

    public

    function EliminarActividad( $id_actividad ) {
        $delete_actividad = "DELETE FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED] WHERE IDACTIVIDAD=" . $id_actividad;
        $ejecucion = $this->_db->prepare( $delete_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function GuardarSubActividad( $idactividad, $nombre_sub_actividad, $usuario ) {
        $insertar_actividad = "INSERT INTO [HEVES_RRHH].[dbo].[ACTIVIDADES_SUB_MEDICASNOMEDICAS](IDACTIVIDAD, SUBACTIVIDAD, USUARIO, FECHAREGISTRO)   VALUES  (" . $idactividad . ", upper('" . $nombre_sub_actividad . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }




    public

    function ListarSubActividades( $idactividad ) {
        $sentencia = "SELECT IDSUBACTIVIDAD, IDACTIVIDAD, SUBACTIVIDAD, USUARIO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_SUB_MEDICASNOMEDICAS] where IDACTIVIDAD = " . $idactividad;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idsubactividad' => $imprimir->IDSUBACTIVIDAD,
                    'idactividad' => $imprimir->IDACTIVIDAD,
                    'subactividad' => utf8_encode( trim( $imprimir->SUBACTIVIDAD ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }


    public

    function ModificarSubActividades( $nombre_sub_actividad, $idsubactividad ) {
        $update_actividad = "UPDATE [HEVES_RRHH].[dbo].[ACTIVIDADES_SUB_MEDICASNOMEDICAS] SET SUBACTIVIDAD = upper('" . $nombre_sub_actividad . "') WHERE IDSUBACTIVIDAD = " . $idsubactividad;
        $ejecucion = $this->_db->prepare( $update_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function EliminarSubActividades( $idsubactividad ) {
        $delete_actividad = "DELETE FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_SUB_MEDICASNOMEDICAS]  WHERE IDSUBACTIVIDAD = " . $idsubactividad;
        $ejecucion = $this->_db->prepare( $delete_actividad );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    /* fin de actividades */


    public

    function getListadoMotivos( usuario_web $u ) {
        $sentencia = "SELECT IDMOTIVO, MOTIVO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR  FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE] where MOTIVO LIKE ?  ORDER BY MOTIVO";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'idmotivo' => trim( $imprimir->IDMOTIVO ),
                    'motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ),
                    'fecha' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'modificacion' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    public

    function getListadoMotivosRenuncia() {
        $sentencia = "SELECT IDMOTIVO, MOTIVO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, CASE WHEN FECHAMODIFICACION >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  FECHAMODIFICACION, 103)  ELSE '' END AS FECHA_MODIFICACION_MOSTRAR  FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]   ORDER BY MOTIVO";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'verificar' => '1',
                    'idmotivo' => trim( $imprimir->IDMOTIVO ),
                    'motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ),
                    'fecha' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAREGISTRO ) ) ),
                    'modificacion' => utf8_encode( trim( $imprimir->FECHA_MODIFICACION_MOSTRAR ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }





    public

    function getListadoTurnos() {
        $sql = "SELECT ID_TURNO, CODIGO, NOMBRE, USUARIOREGISTRO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[T_TIPO_TURNO] order by nombre";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->ID_TURNO,
                    'codigo_turno' => utf8_encode( $mostrar->CODIGO ),
                    'nombre' => utf8_encode( trim( $mostrar->NOMBRE ) )
                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }
    
    
    public
    function RegistrarTurno( $codigo_turno, $nombre_turno,  $usuario ) {
        $instruccion_sql = "INSERT INTO  [HEVES_RRHH].[dbo].[T_TIPO_TURNO] (CODIGO, NOMBRE, USUARIOREGISTRO, FECHAREGISTRO)  VALUES ( upper('" . $codigo_turno . "'), upper('" . $nombre_turno . "'), '" . $usuario . "', getdate())";
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );

    }

    
    
    // ModificarTurno( $idturno, $codigo_turno, $nombre_turno )
    
    public
    function ModificarTurno($codigo_turno, $nombre_turno, $idturno) {
        $instruccion_sql = "UPDATE  [HEVES_RRHH].[dbo].[T_TIPO_TURNO]  SET CODIGO = upper('".$codigo_turno."'), NOMBRE = upper('".$nombre_turno."') WHERE ID_TURNO = ".$idturno;
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );

    }


    public

    function EliminarTurno( $idturno )

    {
        $delete_turno = "DELETE FROM [HEVES_RRHH].[dbo].[T_TIPO_TURNO] WHERE ID_TURNO  = " . $idturno;
        $ejecucion = $this->_db->prepare( $delete_turno );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    
    
    
    
    
    
    
    
    
    
    public

    function getListadoUnidad( usuario_web $u ) {
        $sentencia = "SELECT IdCentroCosto, Codigo, Descripcion,  usuario_autorizado, usuarioregistro, fecharegistro, b.nombres as nombres_autorizado, c.nombres as nombre_registro,   CASE WHEN fecharegistro >= CONVERT(DATETIME, '2018-01-01', 103) THEN CONVERT(VARCHAR(10),  fecharegistro, 103)  ELSE '' END AS fecharegistro_mostrar
      FROM [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA] a left join [HEVES_RRHH].[dbo].[USUARIO_WEB] B ON A.USUARIO_AUTORIZADO = B.DNI left join [HEVES_RRHH].[dbo].[USUARIO_WEB] C ON A.USUARIOREGISTRO = C.DNI where DESCRIPCION LIKE ? ORDER BY DESCRIPCION";

        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'codigo' => trim( $imprimir->Codigo ),
                    'descripcion' => utf8_encode( trim( $imprimir->Descripcion ) ),
                    'dni_autorizado' => utf8_encode( trim( $imprimir->usuario_autorizado ) ),
                    'nombres_autorizado' => utf8_encode( trim( $imprimir->nombres_autorizado ) ),
                    'nombres_registro' => trim( $imprimir->nombre_registro ),
                    'fecha' => trim( $imprimir->fecharegistro_mostrar ) );

            }
        } else {
            $array[] = array( 'estado_respuesta' => 0 );
        }
        return json_encode( $array );


    }

    public

    function getListadoUsuarios() {
        $sentencia = "SELECT dni, nombres, UNIDAD_ORGANICA, email, cargo, fecha_expiracion, sesion, estado, unidad, FECH_ULT_INGRESO, case when FECH_ULT_INGRESO is null then '' else convert(varchar(10),  FECH_ULT_INGRESO, 103) end as FECHA_ULTIMO_INGRESO_TXT  FROM [HEVES_RRHH].[dbo].[V_USUARIO_WEB] order by nombres asc";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'dni' => trim( $imprimir->dni ),
                    'nombres' => utf8_encode( trim( $imprimir->nombres ) ),
                    'cargo' => trim( $imprimir->cargo ),
                    'fecha_expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->fecha_expiracion ) ) ),
                    'sesion' => trim( $imprimir->sesion ),
                    'estado' => trim( $imprimir->estado ),
                    'unidad' => utf8_encode( trim( $imprimir->unidad ) ),
                    'fecha_ultimo_ingreso' => utf8_encode( trim( $imprimir->FECHA_ULTIMO_INGRESO_TXT ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    public

    function GrabarUsuarioAutorizado( $captura_unidad_organica, $captura_seleccion_usuario, $usuario_registro ) {
        $sentencia = "UPDATE [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA] set usuario_autorizado = '" . $captura_seleccion_usuario . "', usuarioregistro = '" . $usuario_registro . "', fecharegistro = getdate() WHERE IdCentroCosto = '" . $captura_unidad_organica . "'";
        $ejecucion = $this->_db->prepare( $sentencia );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    // ListarTodosLosUPSS()

    public

    function DesactivarUsuarioUO( $id_uo ) {
        $instruccion_sql = "UPDATE [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA] set usuario_autorizado = '', usuarioregistro = '" . $usuario_registro . "', fecharegistro = getdate() WHERE codigo = '" . $id_uo . "'";
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );
    }


    






    public

    function GuardarLicencias( $descripcion, $procede ) {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $insert_licencia = "INSERT INTO [HEVES_RRHH].[dbo].[T_TIPO_DE_LICENCIA] (NOMBRE, PROCEDE_DESCUENTO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION)
              VALUES ( '" . utf8_decode( $descripcion ) . "', '" . $procede . "', '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insert_licencia );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function GuardarEdicionLicencia( $usuario, $id_licencia, $descripcion, $procede_descuento ) {
        $sql_edicion_licencia = "UPDATE [HEVES_RRHH].[dbo].[T_TIPO_DE_LICENCIA]  SET NOMBRE = '" . utf8_decode( $descripcion ) . "', PROCEDE_DESCUENTO = '" . $procede_descuento . "', USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() where IDTIPOLICENCIA = " . $id_licencia;
        $ejecucion = $this->_db->prepare( $sql_edicion_licencia );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function DeleteLicencias( $id_licencias ) {
        $delete_licencia = "delete from [HEVES_RRHH].[dbo].[T_TIPO_DE_LICENCIA]  where IDTIPOLICENCIA = " . $id_licencias;
        $ejecucion = $this->_db->prepare( $delete_licencia );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GuardarFeriado( $usuario, $dia, $mes, $descripcion, $condicion_nuevo, $anio_unico ) {
        $insertar_feriado =
            "declare @lcmes varchar(2) = convert(varchar(2), RIGHT('00' + Ltrim(" . $mes . "),2))
          declare @lcdia varchar(2) = convert(varchar(2), RIGHT('00' + Ltrim(" . $dia . "),2))
          declare @lcanio varchar(4) = convert(varchar(4),  year(getdate()))
          declare @lcdescripcion varchar(150) = '" . utf8_decode( $descripcion ) . "'
          declare @lc_condicion varchar(1) = '" . $condicion_nuevo . "'
          declare @ln_anio_condicion int  = " . $anio_unico . "
          declare @lc_usuario varchar(8) = '" . $usuario . "'
          declare @ldfecha datetime = convert(datetime, @lcanio + '-' + @lcmes + '-' + @lcdia, 101)
          INSERT INTO [HEVES_RRHH].[dbo].[T_FERIADOS] (MES, DIA, FECHA, DESCRIPCION, CONDICION, ANIO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION)
          VALUES (@lcmes, @lcdia, @ldfecha, @lcdescripcion, @lc_condicion,@ln_anio_condicion, @lc_usuario, getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_feriado );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function GuardarEdicionFeriado( $usuario, $id_feriado, $dia, $mes, $descripcion, $condicion_grabar, $anio_unico ) {
        $update_feriado = "UPDATE [HEVES_RRHH].[dbo].[T_FERIADOS] SET MES = convert(varchar(2), RIGHT('00' + Ltrim(" . $mes . "),2)), DIA = convert(varchar(2), RIGHT('00' + Ltrim(" . $dia . "),2)), FECHA =  convert(datetime, convert(varchar(4), year(getdate())) + '-' + RIGHT('00' + Ltrim(Rtrim(" . $mes . ")),2) + '-' + RIGHT('00' + Ltrim(Rtrim(" . $dia . ")),2), 101),
           DESCRIPCION = '" . utf8_decode( $descripcion ) . "', CONDICION = '" . $condicion_grabar . "', USUARIOMODIFICACION = '" . $usuario . "', FECHAMODIFICACION = getdate(), ANIO = " . $anio_unico . "  WHERE  IDFERIADO = " . $id_feriado;
        $ejecucion = $this->_db->prepare( $update_feriado );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function EliminarFeriado( $id_tipo_feriado ) {
        $delete_feriado = "delete from [HEVES_RRHH].[dbo].[T_FERIADOS]  where IDFERIADO = " . $id_tipo_feriado;
        $ejecucion = $this->_db->prepare( $delete_feriado );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GuardarNuevaCondicion( $usuario, $nombre_condicion ) {
        $insertar_condicion = "INSERT INTO [HEVES_RRHH].[dbo].[T_TIPOCONDICIONLABORAL] (NOMBRE, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA) VALUES ( ' " . utf8_decode( $nombre_condicion ) . "', '1', '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_condicion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );



    }



    public

    function GrabarEdicionCondicion( $usuario, $id_condicion, $nombre_asignado ) {
        $update_condicion =
            "declare @lc_descripcion varchar(60) = '" . utf8_decode( $nombre_asignado ) . "'
             declare @lid_condicion int = " . $id_condicion . "
             declare @usuario varchar(50) = '" . $usuario . "'
             UPDATE [HEVES_RRHH].[dbo].[T_TIPOCONDICIONLABORAL] SET NOMBRE = @lc_descripcion, ESTADO = '1', USUARIOMODIFICO =  @usuario, FECHAMODIFICACION = getdate()  WHERE IDTIPOSITUACION = @lid_condicion";
        $ejecucion = $this->_db->prepare( $update_condicion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function EliminarCondicion( $id_tipo ) {
        $delete_condicion = "DELETE FROM [HEVES_RRHH].[dbo].[T_TIPOCONDICIONLABORAL] WHERE IDTIPOSITUACION = " . $id_tipo;
        $ejecucion = $this->_db->prepare( $delete_condicion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function GuardarMotivo( $usuario, $motivo ) {
        $insertar_motivo = "INSERT INTO [HEVES_RRHH].[dbo].[T_MOTIVO_CESE] (MOTIVO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION)
             VALUES ( '" . utf8_decode( $motivo ) . "', '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_motivo );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function GuardarEdicionMotivo( $id_motivo, $usuario, $motivo ) {
        $update_motivo = "UPDATE [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]   SET MOTIVO = '" . utf8_decode( $motivo ) . "',  [USUARIOMODIFICO] = '" . $usuario . "', [FECHAMODIFICACION] = GETDATE() WHERE idmotivo = " . $id_motivo;
        $ejecucion = $this->_db->prepare( $update_motivo );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function EliminarMotivo( $id_tipo ) {
        $delete_motivo = "DELETE FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]   WHERE IDMOTIVO =" . $id_tipo;
        $ejecucion = $this->_db->prepare( $delete_motivo );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );



    }


    public

    function ObtenerUnidadesOrganicas()

    {
        $sql_select_unidades = "select IdCentroCosto, codigo, Descripcion, usuario_autorizado, case when b.NOMBRES is null then '' else b.NOMBRES  end as NOMBRES_COMPLETO  from [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA]  A left join [HEVES_RRHH].[dbo].[USUARIO_WEB] B ON A.USUARIO_AUTORIZADO = B.DNI  order by codigo";
        $ejecucion_sql = $this->_db->prepare( $sql_select_unidades );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array( 'idcentrocosto' => $mostrar->IdCentroCosto,
                    'codigo' => utf8_encode( trim( $mostrar->codigo ) ),
                    'descripcion' => utf8_encode( trim( $mostrar->Descripcion ) ),
                    'nombres' => utf8_encode( trim( $mostrar->NOMBRES_COMPLETO ) ) );
            }
        } else {
            $obtenido[] = array( 'idcentrocosto' => '',
                'codigo' => '',
                'descripcion' => '' );
        }
        return json_encode( $obtenido );
    }


    public

    function BuscarServiciosdeCentroCosto( $codigo_unidad ) {
        $sql_select_servicios = "SELECT IDSERVICIOS, CODIGO_UNIDAD_ORGANICA, NOMBRE, USUARIO_AUTORIZADO, USUARIOREGISTRO, FECHAREGISTRO   FROM [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA_SERVICIOS] 
  where CODIGO_UNIDAD_ORGANICA= '" . trim( $codigo_unidad ) . "' order by nombre ";
        $ejecucion_sql = $this->_db->prepare( $sql_select_servicios );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array( 'idservicio' => $mostrar->IDSERVICIOS,
                    'codigo' => utf8_encode( trim( $mostrar->CODIGO_UNIDAD_ORGANICA ) ),
                    'nombre' => utf8_encode( trim( $mostrar->NOMBRE ) ),
                    'usuario_autorizado' => utf8_encode( trim( $mostrar->USUARIO_AUTORIZADO ) ) );
            }

        } else {
            $obtenido[] = array( 'idservicio' => '',
                'codigo' => '',
                'nombre' => '',
                'usuario_autorizado' => '' );

        }
        return json_encode( $obtenido );

    }

    public

    function GrabacionServicio_UO( $usuario, $codigo_unidad, $nombre_del_servicio ) {
        $insertar_servicio = "INSERT INTO [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA_SERVICIOS] (CODIGO_UNIDAD_ORGANICA, NOMBRE, USUARIO_AUTORIZADO, USUARIOREGISTRO, FECHAREGISTRO)
           VALUES ( '" . $codigo_unidad . "', '" . utf8_decode( $nombre_del_servicio ) . "', ' ', '" . $usuario . "', getdate() )";
        $ejecucion = $this->_db->prepare( $insertar_servicio );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarCambioServicio( $id_servicio, $nombre_servicio ) {
        $update_servicio = "UPDATE [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA_SERVICIOS]  SET NOMBRE = '" . $nombre_servicio . "' WHERE IDSERVICIOS = " . $id_servicio;
        $ejecucion = $this->_db->prepare( $update_servicio );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminarServicio( $id_servicio ) {
        $delete_servicio = "DELETE FROM  [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA_SERVICIOS] WHERE IDSERVICIOS = " . $id_servicio;
        $ejecucion = $this->_db->prepare( $delete_servicio );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function getListarServicios() {
        $sentencia = "SELECT IdCentroCosto, codigo, Descripcion FROM [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA]  order by Descripcion";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => $imprimir->IdCentroCosto, 'nombre' => utf8_encode( trim( $imprimir->Descripcion ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }

    public

    function GrabarNuevaDescripcion( $nueva_descripcion ) {
        $insertar_descripcion = "declare @lc_descripcion varchar(200) = '" . $nueva_descripcion . "'
                                declare @lc_maxi_codigo varchar(3) = convert(varchar(3), (select max(convert(int, codigo)) + 1  from [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA]))
                                INSERT INTO   [HEVES_RRHH].[dbo].[UNIDAD_ORGANICA] (Codigo, Descripcion, sec_ejec, abreviado_depend, usuario_autorizado, usuarioregistro, fecharegistro)
                                 VALUES (@lc_maxi_codigo, @lc_descripcion, '1670', @lc_descripcion, '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function ListarTipoDocumento() {
        $sql_select = "SELECT CODIGO, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO]";
        $ejecucion_sql = $this->_db->prepare( $sql_select );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'encontrado' => '1',
                    'codigo' => $mostrar->CODIGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ),
                    'fecha' => date( 'd/m/Y', strtotime( trim( $mostrar->FECHAREGISTRO ) ) ) );
            }
        } else {
            $obtenido[] = array( 'encontrado' => '0' );
        }
        return json_encode( $obtenido );


    }


    public

    function RegistrarTipoDocumento( $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO](DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)    VALUES ('" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function RegistrarModificacionTipoDocumento( $codigo, $descripcion ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO]  SET DESCRIPCION = '" . $descripcion . "'  WHERE CODIGO = " . $codigo;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function EliminarTipoDocumento( $codigo ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO] WHERE CODIGO = " . $codigo;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function ListarPaises() {
        $sql = "SELECT CODIGO, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_TIPO_PAISES]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'codigo' => $mostrar->CODIGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'encontrado' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function ListarColegiosProfesionales() {
        $sql = "SELECT CODIGO, CODIGO_MINSA, DESCRIPCION FROM [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES] ORDER BY CONVERT(INT, CODIGO_MINSA)";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => $mostrar->CODIGO,
                    'codigo_minsa' => $mostrar->CODIGO_MINSA,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function GrabarNuevoRegistroColegio( $codigo_minsa, $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES] (CODIGO_MINSA, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)    VALUES ('" . $codigo_minsa . "', '" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function UpdateRegistroColegios( $codigo_minsa, $descripcion, $usuario, $codigo ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES] SET CODIGO_MINSA = '" . $codigo_minsa . "', DESCRIPCION = '" . utf8_decode( $descripcion ) . "', USUARIOREGISTRO = '" . $usuario . "'  WHERE CODIGO = " . $codigo;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function EliminarRegistroColegio( $codigo ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES]   WHERE codigo = " . $codigo;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function ListarTiposEspecialidad() {
        $sql = "SELECT IDESPECIALIDAD, A.CODIGO_MINSA, A.DESCRIPCION, CODIGO_COLEGIO, A.USUARIOREGISTRO, A.FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, B.DESCRIPCION AS COLEGIO   FROM [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES] B ON  A.CODIGO_COLEGIO = B.CODIGO_MINSA";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDESPECIALIDAD,
                    'codigo_minsa' => $mostrar->CODIGO_MINSA,
                    'codigo_colegio' => $mostrar->CODIGO_COLEGIO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ),
                    'colegio' => utf8_encode( trim( $mostrar->COLEGIO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }

    public

    function VerUltimoNumeroEspecialidad() {
        $sql = "SELECT CASE WHEN (MAX(CODIGO_MINSA)  + 1) IS NULL THEN 1 ELSE (MAX(CODIGO_MINSA)  + 1) END as NUMERO FROM [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'numero' => $mostrar->NUMERO );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }




    public

    function GrabarRegistroEspecialidad( $codigo_minsa, $descripcion, $codigo_colegio, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD] (CODIGO_MINSA, DESCRIPCION, CODIGO_COLEGIO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION)  VALUES ( '" . $codigo_minsa . "', '" . utf8_decode( $descripcion ) . "', '" . $codigo_colegio . "', '" . $usuario . "', getdate(), '','')";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function GrabarModificacionEspecialidad( $id, $codigo_minsa, $descripcion, $codigo_colegio, $usuario ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD]  SET CODIGO_MINSA = '" . $codigo_minsa . "', DESCRIPCION = '" . utf8_decode( $descripcion ) . "', CODIGO_COLEGIO = '" . $codigo_colegio . "', USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDESPECIALIDAD = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarRegistroEspecialidad( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD]   WHERE IDESPECIALIDAD = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function ListarCentroDeCosto() {
        $sql = "SELECT IDCENTROCOSTO, CODIGO_CENTRO_COSTO, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_CENTRO_COSTO]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCENTROCOSTO,
                    'codigo_centro_costo' => $mostrar->CODIGO_CENTRO_COSTO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    // ListarEstablecimientos($id)
    public

    function ListarUnidadesOrganicas( $id ) {
        $sql = "declare @lc_buscar_unidad varchar(100) = '" . $id . "' SELECT IDUNIDADORGANICA, a.DESCRIPCION AS ORGANICA, A.IDORGANO, B.DESCRIPCION AS ORGANO  FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] A left join [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] B on  A.IDORGANO = B.IDORGANO where a.DESCRIPCION like '%' + @lc_buscar_unidad + '%' order by A.DESCRIPCION";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDUNIDADORGANICA,
                    'organica' => utf8_encode( trim( $mostrar->ORGANICA ) ),
                    'idorgano' => $mostrar->IDORGANO,
                    'organo' => utf8_encode( trim( $mostrar->ORGANO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }



    public

    function ListarTodosLosOrganos( $id ) {

        $sql = "SELECT IDORGANO, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] where descripcion like '%' + '" . $id . "' + '%'  order by DESCRIPCION";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDORGANO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }

    public

    function GrabarNuevoRegistroUnidadOrganica( $descripcion, $id_organica, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] (DESCRIPCION, IDORGANO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION)
             VALUES ('" . utf8_decode( $descripcion ) . "',  " . $id_organica . ", '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function GrabarModificacionUnidadOrganica( $descripcion, $id_organo, $usuario, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] SET DESCRIPCION = '" . utf8_decode( $descripcion ) . "', IDORGANO = " . $id_organo . ", USUARIOMODIFICACION = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDUNIDADORGANICA = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function EliminarRegistroUnidad( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA]  WHERE IDUNIDADORGANICA = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarNuevoRegistroOrgano( $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] (DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)   VALUES  ( '" . utf8_decode( $descripcion ) . "',  '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarModificacionOrgano( $descripcion, $id )

    {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] SET DESCRIPCION = '" . utf8_decode( $descripcion ) . "' WHERE IDORGANO = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );






    }



    public

    function EliminarRegistroOrgano( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO]  WHERE IDORGANO  = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function ListarTodosLosUPSS() {
        $sql = "SELECT IDUPSS, CODIGO_UPSS, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_UPSS]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDUPSS,
                    'codigo_upss' => $mostrar->CODIGO_UPSS,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function UltimoUPSS() {
        $sql = "SELECT max(convert(int, codigo_upss)) + 1 as ultimo FROM [HEVES_RRHH].[dbo].[T_UPSS]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'ultimo' => $mostrar->ultimo );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }



    public

    function GrabarRegistroUPSS( $codigo, $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_UPSS] (CODIGO_UPSS, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION)   VALUES  ('" . $codigo . "', upper('" . utf8_decode( $descripcion ) . "'), '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function GrabarModificarRegistroUPSS( $descripcion, $usuario, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_UPSS] SET DESCRIPCION = upper('" . utf8_decode( $descripcion ) . "'), USUARIOMODIFICACION = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDUPSS = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }




    public

    function EliminarUPSS( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_UPSS] WHERE IDUPSS = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function ListarTodosLasCompetencias() {
        $sql = "SELECT IDCOMPETENCIAS, CODIGO, DESCRIPCION FROM [HEVES_RRHH].[dbo].[T_COMPETENCIAS]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCOMPETENCIAS,
                    'codigo' => $mostrar->CODIGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }

    public

    function GrabarCompetencias( $codigo, $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO  [HEVES_RRHH].[dbo].[T_COMPETENCIAS] (CODIGO, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)  
        VALUES ( '" . $codigo . "',  '" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function ModificarCompetencias( $codigo, $descripcion, $usuario, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_COMPETENCIAS]  SET CODIGO = '" . $codigo . "', DESCRIPCION = '" . $descripcion . "'  WHERE IDCOMPETENCIAS = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function EliminarCompetencia( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_COMPETENCIAS]  WHERE IDCOMPETENCIAS = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function ListarTodosLasCapacitacion() {
        $sql = "SELECT IDCAPACITACION, CODIGO, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_CAPACITACION]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCAPACITACION,
                    'codigo' => $mostrar->CODIGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function GrabarCapacitacion( $codigo, $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO  [HEVES_RRHH].[dbo].[T_CAPACITACION] (CODIGO, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)  
        VALUES ( '" . $codigo . "',  '" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function ModificarCapacitacion( $codigo, $descripcion, $usuario, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_CAPACITACION]  SET CODIGO = '" . $codigo . "', DESCRIPCION = '" . $descripcion . "'  WHERE IDCAPACITACION = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function EliminarCapacitacion( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_CAPACITACION]  WHERE IDCAPACITACION = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }







    public

    function ListarTodosLosEntrenamiento() {
        $sql = "SELECT IDENTRENAMIENTO, CODIGO, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_ENTRENAMIENTO]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDENTRENAMIENTO,
                    'codigo' => $mostrar->CODIGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function GrabarEntrenamiento( $codigo, $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO  [HEVES_RRHH].[dbo].[T_ENTRENAMIENTO] (CODIGO, DESCRIPCION, USUARIOREGISTRO, FECHAREGISTRO)  
        VALUES ( '" . $codigo . "',  '" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function ModificarEntrenamiento( $codigo, $descripcion, $usuario, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_ENTRENAMIENTO]  SET CODIGO = '" . $codigo . "', DESCRIPCION = '" . $descripcion . "'  WHERE IDENTRENAMIENTO = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function EliminarEntrenamiento( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_ENTRENAMIENTO] WHERE IDENTRENAMIENTO = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function ListarGrupos( $grupo ) {
        $sql = "SELECT IDGRUPO, DESCRIPCION, USUARIO, FECHA  FROM [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] where DESCRIPCION like '%' + '" . $grupo . "' + '%'";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'idgrupo' => $mostrar->IDGRUPO,
                    'descripcion_grupo' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarCargoEncontrado( $cargo ) {
        $sql = "DECLARE @lc_cargo varchar(150) = '" . $cargo . "' SELECT IDCARGO, CODIGO, a.DESCRIPCION, IDGRUPO_OCUPACIONAL, b.DESCRIPCION AS GRUPO, b.IDGRUPO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO] A left join [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] B on a.IDGRUPO_OCUPACIONAL = b.IDGRUPO   WHERE a.DESCRIPCION like '%' + @lc_cargo + '%'";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCARGO,
                    'cargo' => utf8_encode( trim( $mostrar->DESCRIPCION ) ),
                    'id_grupo_ocupacional' => $mostrar->IDGRUPO_OCUPACIONAL,
                    'grupo' => utf8_encode( trim( $mostrar->GRUPO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function GrabarNuevoRegistroCargo( $descripcion, $id_grupo, $usuario ) {
        $insertar_descripcion = "declare @lc_codigo int = (select case when max(codigo) is null then 1 else max(convert(int, codigo)) + 1 end  from  [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO]) INSERT INTO [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO](CODIGO, DESCRIPCION, IDGRUPO_OCUPACIONAL, USUARIOREGISTRO, FECHAREGISTRO)   VALUES (@lc_codigo, '" . $descripcion . "', " . $id_grupo . ", '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function GrabarModificacionRegistro( $descripcion, $id_grupo, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO] SET DESCRIPCION = '" . $descripcion . "', IDGRUPO_OCUPACIONAL = " . $id_grupo . "  WHERE IDCARGO = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminarRegistroCargo( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO]  WHERE IDCARGO = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function GrabarNuevoRegistroGrupo( $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] (DESCRIPCION, USUARIO, FECHA)    
        VALUES   ('" . $descripcion . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarRegistroGrupoModificar( $descripcion, $id ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] SET DESCRIPCION = '" . $descripcion . "'  WHERE IDGRUPO = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }




    public

    function EliminarRegistroGrupo( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL]  WHERE IDGRUPO = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function MostrarUnidadesOrganicas( $id ) {
        $sql = "SELECT DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] where IDORGANO = '" . $id . "'";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }

    public

    function ListarCentroCosto() {
        $sql = "SELECT IdCentroCosto, Codigo, Descripcion, sec_ejec, abreviado_depend  FROM [HEVES_RRHH].[dbo].[T_CENTROCOSTO]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => utf8_encode( trim( $mostrar->Codigo ) ),
                    'descripcion' => utf8_encode( trim( $mostrar->abreviado_depend ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }



    public

    function ListarCentroSubCosto( $id ) {
        $sql = "SELECT IdCentrosubCosto, Codigo, CodigoCentroCosto, Descripcion  FROM [HEVES_RRHH].[dbo].[T_CENTROSUBCOSTO] where codigocentrocosto = '" . $id . "'";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => utf8_encode( trim( $mostrar->Codigo ) ),
                    'descripcion' => utf8_encode( trim( $mostrar->Descripcion ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }



    public

    function ListarCentroSubCostoSub( $id ) {
        $sql = "SELECT IdCentrosSubtrasCosto, Codigo, IdCentrosubCosto, Descripcion  FROM [HEVES_RRHH].[dbo].[T_CENTROSUBTRASCOSTO] where IdCentrosubCosto = '" . $id . "'";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => utf8_encode( trim( $mostrar->Codigo ) ),
                    'descripcion' => utf8_encode( trim( $mostrar->Descripcion ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function TodoReporteCentroCosto() {

        $sql = "SELECT *  FROM [HEVES_RRHH].[dbo].[V_CENTRO_COSTO] where CODIGO <> '00'  order by codigo, subcodigo, subtras";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => trim( $mostrar->Codigo ),
                    'subcodigo' => trim( $mostrar->subcodigo ),
                    'subtras' => trim( $mostrar->subtras ),
                    'descripcion' => utf8_encode( trim( $mostrar->Descripcion ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }

    public

    function TodosEstadosCiviles() {
        $sql = "SELECT IDESTADOCIVIL, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_TIPO_ESTADO_CIVIL]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDESTADOCIVIL,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );



    }

    public

    function GrabarRegistrosEstadoCivil( $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_TIPO_ESTADO_CIVIL] (DESCRIPCION, USUARIO, FECHA) VALUES   ('" . $descripcion . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function ModificacionRegistroEstadoCivil( $id, $descripcion ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_TIPO_ESTADO_CIVIL] SET DESCRIPCION = '" . $descripcion . "'  where IDESTADOCIVIL = " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function EliminarRegistroEstadoCivil( $id ) {
        $delete_descripcion = "DELETE FROM  [HEVES_RRHH].[dbo].[T_TIPO_ESTADO_CIVIL] WHERE IDESTADOCIVIL = " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function ListarRegistrosPisos() {
        $sql = "SELECT IDPISO, DESCRIPCION, AMBIENTE  FROM [HEVES_RRHH].[dbo].[T_PISOS]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDPISO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ),
                    'ambiente' => utf8_encode( trim( $mostrar->AMBIENTE ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function ListarTipoAtenciones() {
        $sql = "SELECT IDTIPOATENCION, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[T_TIPO_ATENCION]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDTIPOATENCION,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }


    public

    function ListarConsultorios() {
        $sql = "SELECT IdEspecialidad, upper(Nombre) as consultorio, IdDepartamento, TiempoPromedioAtencion, MedicoNoMedico, servicio  FROM [SIGH].[dbo].[Especialidades]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IdEspecialidad,
                    'consultorio' => utf8_encode( trim( $mostrar->consultorio ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function ReporteCargosGrupos() {
        $sql = "SELECT a.IDCARGO, a.CODIGO, a.DESCRIPCION as CARGO, b.DESCRIPCION as GRUPO_OCUPACIONAL  FROM [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO] A left join [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] B on  a.idgrupo_ocupacional = b.idgrupo";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCARGO,
                    'codigo' => $mostrar->CODIGO,
                    'cargo' => utf8_encode( trim( $mostrar->CARGO ) ),
                    'descripcion' => utf8_encode( trim( $mostrar->GRUPO_OCUPACIONAL ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarTiposEspecialidadTabla()

    {
        $sql = "SELECT IDESPECIALIDAD, A.CODIGO_MINSA, A.DESCRIPCION, CODIGO_COLEGIO, b.DESCRIPCION as COLEGIO FROM [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD] A left join [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES]  B on A.codigo_colegio = b.CODIGO_MINSA";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => $mostrar->CODIGO_MINSA,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ),
                    'colegio' => utf8_encode( trim( $mostrar->COLEGIO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );


    }


    public

    function ListarUnidadOrganica() {
        $sql = "SELECT IDUNIDADORGANICA, a.DESCRIPCION UNIDAD_ORGANICA, b.DESCRIPCION ORGANO   FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] A left join  [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] b on a.IDORGANO = b.IDORGANO";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'codigo' => $mostrar->IDUNIDADORGANICA,
                    'unidad' => utf8_encode( trim( $mostrar->UNIDAD_ORGANICA ) ),
                    'organo' => utf8_encode( trim( $mostrar->ORGANO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }



    public

    function ListarCarrerasProfesion() {
        $sql = "SELECT IDPROFESION, DESCRIPCION, USUARIO, FECHA  FROM [HEVES_RRHH].[dbo].[T_CARRERA_PROFESION]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDPROFESION,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }




    public

    function ListarCarrerasProfesionUnido() {
        $sql = "SELECT IDPROFESION_CARGO, DESCRIPCION FROM [HEVES_RRHH].[dbo].[T_PROFESION_CARGO]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDPROFESION_CARGO,
                    'descripcion' => utf8_encode( trim( $mostrar->DESCRIPCION ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }







    public

    function GrabarCarrerasProfesion( $descripcion, $usuario ) {
        $insertar_descripcion = "INSERT INTO [HEVES_RRHH].[dbo].[T_CARRERA_PROFESION](DESCRIPCION, USUARIO, FECHA)   VALUES (  '" . utf8_decode( $descripcion ) . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function GrabarModificacionCarrerasProfesion( $id, $descripcion ) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[T_CARRERA_PROFESION]  SET DESCRIPCION = '" . utf8_decode( $descripcion ) . "'  WHERE IDPROFESION =  " . $id;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    // ListarTipoDocumento()



    public

    function EliminarRegistroCarrerasProfesion( $id ) {
        $delete_descripcion = "DELETE FROM [HEVES_RRHH].[dbo].[T_CARRERA_PROFESION] WHERE IDPROFESION =  " . $id;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function ListarEstablecimientos( $id ) {
        $sql = "DECLARE @lc_buscar VARCHAR(200) = '" . $id . "'SELECT IDESTABLECIMIENTOS,  UPPER(EESS + '-- ' + UEJE_DESCRIPCION + ' -- ' + ESSS_NOMBRE) as ESTABLECIMIENTOS  FROM [HEVES_RRHH].[dbo].[T_ESTABLECIMIENTOS] where UEJE_DESCRIPCION + ESSS_NOMBRE LIKE '%' + @lc_buscar + '%' OR EESS_FINAL LIKE '%' + @lc_buscar + '%' order by ESSS_NOMBRE";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDESTABLECIMIENTOS,
                    'nombre' => utf8_encode( trim( $mostrar->ESTABLECIMIENTOS ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarCadenaProgramatica() {
        $sql = "SELECT IDCADENA, SECUENCIA_FUNCIONAL, NOMBRE_META, PROGRAMA, PRODUCTO, ACTIVIDAD, NOMBRE_TAREA, NRO_TAREA, DEPENDENCIA  FROM [HEVES_RRHH].[dbo].[T_CADENA_PROGRAMATICA]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDCADENA,
                    'nombre_tarea' => utf8_encode( trim( $mostrar->NOMBRE_TAREA ) ),
                    'actividad' => utf8_encode( trim( $mostrar->ACTIVIDAD ) ),


                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarFuentesFinanciamiento() {
        $sql = "SELECT IDFUENTE, NOMBRE + ' ( ' + ABREVIATURA + ' ) ' as FUENTE_FINANCIAMIENTO   FROM [HEVES_RRHH].[dbo].[T_FUENTE_FINANCIAMIENTO] ORDER BY NOMBRE ";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDFUENTE,
                    'fuente_finaciamiento' => utf8_encode( trim( $mostrar->FUENTE_FINANCIAMIENTO ) )
                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarTipoEducacion() {
        $sql = "SELECT IDTIPOE, NOMBRE, USUARIO, FECHA   FROM [HEVES_RRHH].[dbo].[LGJ_TIPOEDUCACION]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'idtipo' => $mostrar->IDTIPOE,
                    'nombre' => utf8_encode( trim( $mostrar->NOMBRE ) )
                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }


    public

    function ListarParentesco() {
        $sql = "SELECT IDPARENTESCO, PARENTESCO   FROM [HEVES_RRHH].[dbo].[T_PARENTESCO]";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDPARENTESCO,
                    'nombre' => utf8_encode( trim( $mostrar->PARENTESCO ) )
                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }


    public

    function GrabarTipoActividad( $idactividad_add, $tipo_actividad, $usuario ) {
        $insertar_descripcion = "INSERT INTO  [HEVES_RRHH].[dbo].[ACTIVIDAD_TIPO] (IDACTIVIDAD_ADD, TIPO_ACTIVIDADES, USUARIO, FECHAREGISTRO)  VALUES  ( ".$idactividad_add.", upper('" . $tipo_actividad . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public
    function ListarTipoActividad() {
        $sql = "SELECT a.IDTIPOACTIVIDADES, a.IDACTIVIDAD_ADD, b.nombre as ACTIVIDAD,  a.TIPO_ACTIVIDADES  FROM [HEVES_RRHH].[dbo].[ACTIVIDAD_TIPO] a left join [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED] b on a.idactividad_add = b.IDACTIVIDAD ";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->IDTIPOACTIVIDADES,
                    'id_actividad_add' => $mostrar->IDACTIVIDAD_ADD,
                    'nombre_actividad_add' => $mostrar->ACTIVIDAD,
                    'tipo_actividad' => utf8_encode( trim( $mostrar->TIPO_ACTIVIDADES ) )
                );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );
    }

    // ModificarTipoActividadTotal($idactividad_add, $tipo_actividad, $idtipo_actividad)
    
    
     
         
    
    public
    function ModificarTipoActividadTotal($idactividad_add, $tipo_actividad, $idtipo_actividad) {
        $update_descripcion = "UPDATE [HEVES_RRHH].[dbo].[ACTIVIDAD_TIPO]  SET IDACTIVIDAD_ADD = ".$idactividad_add.", TIPO_ACTIVIDADES = upper('" . utf8_decode(  $tipo_actividad) . "')  WHERE IDTIPOACTIVIDADES =  " . $idtipo_actividad;
        $ejecucion = $this->_db->prepare( $update_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }
    
    
    public function ElminarTipoActividadTotal($idtipo_actividad){
        $delete_descripcion = "DELETE FROM  [HEVES_RRHH].[dbo].[ACTIVIDAD_TIPO]  WHERE IDTIPOACTIVIDADES =  " . $idtipo_actividad;
        $ejecucion = $this->_db->prepare( $delete_descripcion );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
        
        
    }
    









}


?>