<?php


class asistenciaModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public

    function getListadoPersonalTempus( $nombres ) {
        $sentencia = "declare @lc_nombre varchar(250) = '" . $nombres . "'
         SELECT CODIGO, PATERNO, MATERNO, NOMBRES, APELLIDOS_NOMBRES_TOTALES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, CONDICION, CARGO_PLANILLA, ESTADO_TB, ESTADO_TB as ESTADOTB, BDATOS, FECHAMIGRACION,USUARIOMIGRACION   FROM [HEVES_RRHH].[dbo].[PERSONAL_TEMPUS] where APELLIDOS_NOMBRES_TOTALES  LIKE  '%' + @lc_nombre + '%' OR DNI LIKE '%' + @lc_nombre + '%' ORDER BY PATERNO, MATERNO, NOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'codigo' => trim( $imprimir->CODIGO ),
                    'apellidos_nombres_totales' => utf8_encode( strtoupper( trim( $imprimir->APELLIDOS_NOMBRES_TOTALES ) ) ),
                    'paterno' => utf8_encode( strtoupper( trim( $imprimir->PATERNO ) ) ),
                    'materno' => utf8_encode( strtoupper( trim( $imprimir->MATERNO ) ) ),
                    'nombres' => utf8_encode( strtoupper( trim( $imprimir->NOMBRES ) ) ),
                    'dni' => utf8_encode( trim( $imprimir->DNI ) ),
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION ) ),
                    'ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_DE_INGRESO ) ) ),
                    'cargo_planilla' => utf8_encode( trim( $imprimir->CARGO_PLANILLA ) ),
                    'tarjeta_tmp' => utf8_encode( trim( $imprimir->TARJETA_TMP ) ),
                    'estadotb' => trim( $imprimir->ESTADOTB ),
                    'tipo_horario' => trim( $imprimir->TIPO_HORARIO_TMP ) );
            }
        } else {}
        return json_encode( $array );
    }



    public

    function getUpdateTempus() {
        $instruccion_sql = 'EXEC [dbo].[SP_ACTUALIZAR_DESDE_TEMPUS]';
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );
    }


    public

    function getUpdateMarcaciones() {
        $instruccion_sql_update = 'EXEC [dbo].[SP_ACTUALIZAR_MARCACIONES_PERSONAL_TEMPUS]';
        $resultado = $this->_db->prepare( $instruccion_sql_update );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );
    }


    public

    function getUpdateMarcacionesUltimo() {
        $instruccion_sql_update = "SELECT top 1 (fecha_mostrar + ' - ' + horatxt) as fecha_hora_completa   FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] order by fechahora desc";
        $resultado = $this->_db->prepare( $instruccion_sql_update );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'fecha_ultimo' => utf8_encode( trim( $imprimir->fecha_hora_completa ) ) );
            }
        } else {}
        return json_encode( $array );
    }




    public

    function getListadoMarcaciones( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "SELECT CODIGO, FECHAHORA,  case when DATEPART(dw,FECHAHORA) = 1 then 'DOMINGO' when DATEPART(dw,FECHAHORA) = 2 then 'LUNES' when DATEPART(dw,FECHAHORA) = 3 then 'MARTES' when DATEPART(dw,FECHAHORA) = 4 then 'MIERCOLES' when DATEPART(dw,FECHAHORA) = 5 then 'JUEVES' when DATEPART(dw,FECHAHORA) = 6 then 'VIERNES' when DATEPART(dw,FECHAHORA) = 7 then 'SABADO' END AS NOMBRE_DIA, NUMERO_TARJETA, HORATXT, FECHA_MOSTRAR, HORA, IDTERMINAL, IDLECTORA, DNI  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where DNI= '" . $dni_proce . "' and MONTH(fechahora) = " . $mes_proce . "  and year(fechahora) = " . $anio_proce . "   order by fechahora";
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'nombre_dia' => utf8_encode( trim( $imprimir->NOMBRE_DIA ) ),
                    'fecha_mostrar' => $imprimir->FECHA_MOSTRAR,
                    'hora_mostrar' => utf8_encode( trim( $imprimir->HORATXT ) ),
                    'terminal' => trim( $imprimir->IDTERMINAL ) );
            }
        } else {
            $array[] = array(
                'estado_respuesta' => 0,
                'nombre_dia' => '',
                'fecha_mostrar' => '',
                'hora_mostrar' => '',
                'terminal' => '' );
        }
        return json_encode( $array );
    }



    public

    function getListadoMarcacionesReporte( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "SELECT ROW_NUMBER() OVER(ORDER BY FECHA_MOSTRAR) AS NRO,  FECHA_MOSTRAR, case when DATEPART(dw,FECHAHORA) = 1 then 'DOMINGO' when DATEPART(dw,FECHAHORA) = 2 then 'LUNES' when DATEPART(dw,FECHAHORA) = 3 then 'MARTES' when DATEPART(dw,FECHAHORA) = 4 then 'MIERCOLES' when DATEPART(dw,FECHAHORA) = 5 then 'JUEVES' when DATEPART(dw,FECHAHORA) = 6 then 'VIERNES' when DATEPART(dw,FECHAHORA) = 7 then 'SABADO' END AS NOMBRE_DIA, HORATXT, IDTERMINAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where DNI= '" . $dni_proce . "' and MONTH(fechahora) = " . $mes_proce . "  and year(fechahora) = " . $anio_proce . " order by fechahora";
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'nro' => $imprimir->NRO,
                    'nombre_dia' => utf8_encode( trim( $imprimir->NOMBRE_DIA ) ),
                    'fecha_mostrar' => $imprimir->FECHA_MOSTRAR,
                    'hora_mostrar' => utf8_encode( trim( $imprimir->HORATXT ) ),
                    'terminal' => trim( $imprimir->IDTERMINAL ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0 );
        }
        return $array;
    }


    public

    function getListadoMarcacionesSegundoAdmin( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ADMINISTRATIVO] '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'nro' => '',
                'fecha' => '',
                'ingreso' => '',
                'salida' => '' );
        }

        return json_encode( $array );
    }

// getListadoMarcacionesEntradaSalidaAdministrativo

    public

    function getListadoMarcacionesEntradaSalidaAdministrativo( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ADMINISTRATIVO_V02] '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'nombre_dia' => utf8_encode( trim( $imprimir->NOMBRE_DIA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'nro' => '',
                'fecha' => '',
                'nombre_dia' => '',
                'ingreso' => '',
                'salida' => '' );
        }

        return json_encode( $array );
    }

 

    public

    function getListadoMarcacionesSegundoAdmin_sin_json( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ADMINISTRATIVO] '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        }

        return $array;
    }




    public

    function getListadoMarcacionesSegundoAdmin_sin_json_v02( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ADMINISTRATIVO_V02] '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'dia' => utf8_encode( trim( $imprimir->NOMBRE_DIA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        }

        return $array;
    }









    public

    function getListadoMarcacionesAsistencial( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta_asistencial = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ASISTENCIAL]  '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta_asistencial );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'nro' => '',
                'fecha' => '',
                'ingreso' => '',
                'salida' => '' );

        }

        return json_encode( $array );


    }




    public

    function getListadoMarcacionesAsistencial_v02( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta_asistencial = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ASISTENCIAL_V04]  '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta_asistencial );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'nro' => $imprimir->nro,
                    'entrada' => $imprimir->entrada,
                    'entrada_dia_entrada' => $imprimir->nombre_dia_entrada,
                    'hentrada' => $imprimir->hentrada,
                    'salida' => $imprimir->salida,
                    'entrada_dia_salida' => $imprimir->nombre_dia_salida,
                    'hsalida' => $imprimir->hsalida,
                    'horas' => $imprimir->horas );
            }
        } else {
            $array[] = array(
                'nro' => '',
                'entrada' => '',
                'entrada_dia_entrada' => '',
                'hentrada' => '',
                'salida' => '',
                'entrada_dia_salida' => '',
                'hsalida' => '',
                'horas' => '' );
        }

        return json_encode( $array );


    }



    public

    function getListadoMarcacionesAsistencial_sin_json( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta_asistencial = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ASISTENCIAL]  '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta_asistencial );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'nro' => $imprimir->NRO,
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'nro' => '',
                'fecha' => '',
                'ingreso' => '',
                'salida' => '' );
        }
        return $array;
    }


    public

    function getListadoMarcacionesAsistencial_sin_json_v02( $dni_proce, $mes_proce, $anio_proce ) {
        $consulta_asistencial = "EXEC [dbo].[SP_ORDENAR_ASISTENCIA_ENTRADA_SALIDA_ASISTENCIAL_V04]  '" . $dni_proce . "', " . $mes_proce . ", " . $anio_proce;
        $marcaciones = $this->_db->prepare( $consulta_asistencial );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'nro' => $imprimir->nro,
                    'entrada' => $imprimir->entrada,
                    'entrada_dia_entrada' => $imprimir->nombre_dia_entrada,
                    'hentrada' => $imprimir->hentrada,
                    'salida' => $imprimir->salida,
                    'entrada_dia_salida' => $imprimir->nombre_dia_salida,
                    'hsalida' => $imprimir->hsalida,
                    'horas' => $imprimir->horas );
            }
        } else {
            $array[] = array(
                'nro' => '',
                'entrada' => '',
                'entrada_dia_entrada' => '',
                'hentrada' => '',
                'salida' => '',
                'entrada_dia_salida' => '',
                'hsalida' => '',
                'horas' => '' );
        }

        return $array;


    }




    public

    function Listado_Reportes_Masivos( $mes, $anio ) {
        $consulta_masiva = "EXEC [dbo].[SP_REPORTE_MASIVO_ADMINISTRATIVOS_ENTRADA_SALIDA] " . $mes . ", " . $anio;
        $marcaciones = $this->_db->prepare( $consulta_masiva );
        $marcaciones->execute();
        if ( $marcaciones->rowCount() ) {
            while ( $imprimir = $marcaciones->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'dni' => utf8_encode( trim( $imprimir->DNI ) ),
                    'nombres' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES ) ),
                    'fecha' => utf8_encode( trim( $imprimir->FECHA ) ),
                    'ingreso' => utf8_encode( trim( $imprimir->HINGRESO ) ),
                    'salida' => utf8_encode( trim( $imprimir->HSALIDA ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0,
                'dni' => '',
                'nombres' => '',
                'fecha' => '',
                'ingreso' => '',
                'salida' => '' );

        }

        return $array;


    }



    public

    function VerTodoElPersonal() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10),  FECHAULTIMORETIRO, 101)  else '' end as FECHA_ULTIMO_RETIRO, SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL]
        WHERE ESTADO = '1'   ORDER BY APELLIDOSNOMBRES ";
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

    function ver_programacion_mes( $mes, $anio, $dni ) {
        $read_sql = "SELECT IDASISTENCIAPERSONAL, IDPERSONAL, DNI, CASE WHEN CODIGO_HORARIO = 'D' THEN 'DES' ELSE CODIGO_HORARIO END AS CODIGO_HORARIO,  CODIGO_TURNO, RIGHT('00' + Ltrim(Rtrim(DIA)),2) as DIA,  MES, ANIO, HORA_ENTRADA_HORARIO, HORA_SALIDA_HORARIO, HORA_ENTRADA_MARCACION, HORA_SALIDA_MARCACION, DIA_NOMBRE, HORAS FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] where dni = '" . $dni . "' and mes = " . $mes . " and anio = " . $anio;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDASISTENCIAPERSONAL,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'horario' => trim( $read_filas->CODIGO_HORARIO ),
                    'turno' => trim( $read_filas->CODIGO_TURNO ),
                    'dia_nombre' => trim( $read_filas->DIA_NOMBRE ),
                    'dia' => trim( $read_filas->DIA ),
                    'mes' => trim( $read_filas->MES ),
                    'anio' => trim( $read_filas->ANIO ),
                    'entrada' => trim( $read_filas->HORA_ENTRADA_HORARIO ),
                    'salida' => trim( $read_filas->HORA_SALIDA_HORARIO ),
                    'horas' => $read_filas->HORAS );
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
                'horas' => '' );
        }
        return json_encode( $datos_read );
    }




    public

    function BuscarPersonalNombres( $nombres ) {
        $read_sql = "SELECT IDPERSONAL,DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CASE WHEN TIPO_PERSONAL = 'A' THEN 'ADMINISTRATIVO'    WHEN TIPO_PERSONAL = 'S' THEN 'ASISTENCIAL'   ELSE  'NO DEFINIDO' END AS CONDICION, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10),  FECHAULTIMORETIRO, 101)  else '' end as FECHA_ULTIMO_RETIRO, SUELDOACTUAL, CODHORARIO, ESTADO  FROM [HEVES_RRHH].[dbo].[PERSONAL]  where  APELLIDOSNOMBRES LIKE '%' + '" . $nombres . "' + '%'  OR DNI LIKE '%' + '" . $nombres . "' + '%'   ORDER BY APELLIDOSNOMBRES ";
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
                    'condicion' => utf8_encode( $read_filas->CONDICION ),
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
                'condicion' => '',
                'fecha_ingreso' => '',
                'fecha_termino' => '',
                'codhorario' => '' );
        }
        return json_encode( $datos_read );
    }




    /* para tempus */

    public

    function ver_todo_el_personal_tempus( $lc_busqueda ) {
        $read_personal = "declare @lc_busqueda varchar(250) = '" . $lc_busqueda . "'
                        SELECT  [CODIGO], [CENTRO_DE_COSTO], UPPER([APELLIDO_PATERNO]) AS PATERNO, UPPER([APELLIDO_MATERNO]) AS MATERNO, APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES as APELLIDOS_NOMBRES_TOTALES, UPPER([NOMBRES]) AS NOMBRES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, case when TIPO_HORARIO_TMP is null then '' when TIPO_HORARIO_TMP = 'A' then 'ADMINISTRATIVO' when TIPO_HORARIO_TMP = 'S' then 'ASISTENCIAL' ELSE '' END CONDICION, CARGO_PLANILLA, ESTADOTB  FROM [HEVES_RRHH].[dbo].[V_TEMPUS_PERSONAL] WHERE ESTADOTB = 1 AND  APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES	LIKE '%' + RTRIM(@lc_busqueda) + '%'  or codigo like   '%' + RTRIM(@lc_busqueda) + '%' ORDER BY APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'codigo' => $read_filas->CODIGO,
                    'paterno' => $read_filas->PATERNO,
                    'materno' => $read_filas->MATERNO,
                    'nombres' => $read_filas->NOMBRES,
                    'apellidos_nombres' => $read_filas->APELLIDOS_NOMBRES_TOTALES,
                    'dni' => $read_filas->DNI,
                    'condicion' => $read_filas->CONDICION,
                    'tipo_horario' => $read_filas->TIPO_HORARIO_TMP,
                    'cargo_planilla' => $read_filas->CARGO_PLANILLA );
            }
        } else {
            $datos_read[] = array(
                'codigo' => '',
                'paterno' => '',
                'materno' => '',
                'nombres' => '',
                'apellidos_nombres' => '',
                'dni' => '',
                'condicion' => '',
                'tipo_horario' => '',
                'cargo_planilla' => '' );

        }
        // return json_encode( $datos_read );
        return $datos_read;
    }



    public

    function FrecuenciaMarcaciones( $mes, $anio ) {
        $read_sql = " SELECT DNI, FECHA_MOSTRAR, count(FECHA_MOSTRAR) as MARCACIONES  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where  month(fecha) = " . $mes . " and year(fecha) = " . $anio . "  group by dni, fecha_mostrar having count(FECHA_MOSTRAR) > 2 order by count(FECHA_MOSTRAR)   desc";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'fecha' => utf8_encode( $read_filas->FECHA_MOSTRAR ),
                    'marcaciones' => $read_filas->MARCACIONES );
            }
        } else {
            $datos_read[] = array(
                'dni' => '',
                'fecha' => '',
                'marcaciones' => '' );

        }
        return json_encode( $datos_read );

    }

    public

    function ver_datos_dni( $dni ) {
        $read_sql = "SELECT CODIGO, PATERNO, MATERNO, NOMBRES, APELLIDOS_NOMBRES_TOTALES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, CONDICION, CARGO_PLANILLA, ESTADO_TB, BDATOS, FECHAMIGRACION, USUARIOMIGRACION FROM [HEVES_RRHH].[dbo].[PERSONAL_TEMPUS] where DNI = '" . $dni . "'";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOS_NOMBRES_TOTALES ),
                    'condicion' => utf8_encode( $read_filas->CONDICION ),
                    'cargo' => utf8_encode( $read_filas->CARGO_PLANILLA ) );
            }
        } else {
            $datos_read[] = array(
                'apellidos_nombres' => '',
                'condicion' => '',
                'cargo' => '' );

        }
        return json_encode( $datos_read );

    }


    public

    function ver_marcaciones_dni( $dni, $mes, $anio ) {
        $read_sql = "SELECT FECHA_MOSTRAR, count(FECHA_MOSTRAR) as MARCACIONES  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where dni = '" . $dni . "' and month(fecha) = " . $mes . " and year(fecha) = " . $anio . "  group by fecha_mostrar having count(FECHA_MOSTRAR) > 2 order by count(FECHA_MOSTRAR) desc";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'fecha' => utf8_encode( $read_filas->FECHA_MOSTRAR ),
                    'marcaciones' => $read_filas->MARCACIONES );
            }
        } else {
            $datos_read[] = array(
                'fecha' => '',
                'marcaciones' => '' );
        }
        return json_encode( $datos_read );

    }


    public

    function VerMarcacionesDia( $dni, $mes, $anio, $dia ) {
        $read_sql = "SELECT ROW_NUMBER() OVER(ORDER BY FECHA_MOSTRAR) AS NRO,  FECHA_MOSTRAR, case when DATEPART(dw,FECHAHORA) = 1 then 'DOMINGO' when DATEPART(dw,FECHAHORA) = 2 then 'LUNES' when DATEPART(dw,FECHAHORA) = 3 then 'MARTES' when DATEPART(dw,FECHAHORA) = 4 then 'MIERCOLES' when DATEPART(dw,FECHAHORA) = 5 then 'JUEVES' when DATEPART(dw,FECHAHORA) = 6 then 'VIERNES' when DATEPART(dw,FECHAHORA) = 7 then 'SABADO' END AS NOMBRE_DIA, HORATXT, IDTERMINAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where   month(fecha) = " . $mes . " and year(fecha) = " . $anio . " and day(fecha) = " . $dia . " and dni = '" . $dni . "' order by fechahora  ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'fecha' => utf8_encode( $read_filas->FECHA_MOSTRAR ),
                    'dia' => $read_filas->NOMBRE_DIA,
                    'horatxt' => $read_filas->HORATXT,
                    'terminal' => $read_filas->IDTERMINAL );
            }
        } else {
            $datos_read[] = array(
                'fecha' => '',
                'dia' => '',
                'horatxt' => '',
                'terminal' => '' );

        }
        return json_encode( $datos_read );


    }

    public

    function EjecutarGrabarPersonalSeleccionado( $dni, $mes, $anio, $nombres, $tipo_asistencia, $cargo, $fecha_marcacion, $marcacion, $usuario ) {
        $sql_insert = "declare @ln_anio int = " . $anio . "
        declare @ln_mes int = " . $mes . "
        declare @lc_dni varchar(8) = '" . $dni . "'
        declare @lc_apellidos_nombres varchar(200) = '" . utf8_decode( $nombres ) . "'
        declare @lc_tipo_personal varchar(50) = '" . $tipo_asistencia . "'
        declare @lc_cargo varchar(150) = '" . utf8_decode( $cargo ) . "'
        declare @ld_fecha_datetime datetime = convert(datetime, '" . $fecha_marcacion . "', 103)
        declare @lc_nombre_dia varchar(150) = (case when DATEPART(dw,@ld_fecha_datetime) = 1 then 'DOMINGO' when DATEPART(dw,@ld_fecha_datetime) = 2 then 'LUNES' when DATEPART(dw,@ld_fecha_datetime) = 3 then 'MARTES' when DATEPART(dw,@ld_fecha_datetime) = 4 then 'MIERCOLES' when DATEPART(dw,@ld_fecha_datetime) = 5 then 'JUEVES' when DATEPART(dw,@ld_fecha_datetime) = 6 then 'VIERNES' when DATEPART(dw,@ld_fecha_datetime) = 7 then 'SABADO' END)
        declare @ld_fecha_marcacion varchar(10) = '" . $fecha_marcacion . "'
        declare @ln_marcacion int = " . $marcacion . "
        declare @lc_usuario varchar(8) = '" . $usuario . "'
        INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_SELECCION_MARCACIONES] (ANIO, MES, DNI, APELLIDOS_NOMBRES, TIPO_PERSONAL, CARGO, FECHA_DATETIME, NOMBRE_DIA, FECHA_MARCACION, MARCACIONES, USUARIO, FECHAREGISTRO)  VALUES (@ln_anio, @ln_mes, @lc_dni, @lc_apellidos_nombres, @lc_tipo_personal, @lc_cargo, @ld_fecha_datetime, @lc_nombre_dia, @ld_fecha_marcacion, @ln_marcacion, @lc_usuario, getdate())";
        $ejecucion_insert = $this->_db->prepare( $sql_insert );
        $ejecucion_insert->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function SeleccionPersonal( $mes, $anio ) {
        $read_sql = "SELECT IDSELECCION, DNI,APELLIDOS_NOMBRES, FECHA_MARCACION, NOMBRE_DIA, MARCACIONES from [HEVES_RRHH].[dbo].[PERSONAL_SELECCION_MARCACIONES] where mes = " . $mes . " and anio = " . $anio . " order by APELLIDOS_NOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'idseleccion' => $read_filas->IDSELECCION,
                    'dni' => $read_filas->DNI,
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOS_NOMBRES ),
                    'dia' => utf8_encode( $read_filas->NOMBRE_DIA ),
                    'fecha_marcacion' => $read_filas->FECHA_MARCACION,
                    'marcacion' => $read_filas->MARCACIONES );
            }
        } else {
            $datos_read[] = array(
                'idseleccion' => '',
                'dni' => '',
                'apellidos_nombres' => '',
                'dia' => '',
                'fecha_marcacion' => '',
                'marcacion' => '' );

        }
        return json_encode( $datos_read );

    }


    public

    function EliminarSeleccionPersonal( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_SELECCION_MARCACIONES] WHERE IDSELECCION = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }




    public

    function getListadoPersonal_sin_json( $mes, $anio ) {
        $consulta_asistencial = "select ROW_NUMBER() OVER(ORDER BY APELLIDOS_NOMBRES) AS NRO, DNI,APELLIDOS_NOMBRES, TIPO_PERSONAL, CARGO, FECHA_MARCACION, NOMBRE_DIA, MARCACIONES from [HEVES_RRHH].[dbo].[PERSONAL_SELECCION_MARCACIONES] where mes = " . $mes . " and anio = " . $anio . " order by APELLIDOS_NOMBRES";
        $ver_resultado = $this->_db->prepare( $consulta_asistencial );
        $ver_resultado->execute();
        if ( $ver_resultado->rowCount() ) {
            while ( $imprimir = $ver_resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'nro' => $imprimir->NRO,
                    'dni' => $imprimir->DNI,
                    'apellidos_nombres' => $imprimir->APELLIDOS_NOMBRES,
                    'tipo_personal' => $imprimir->TIPO_PERSONAL,
                    'cargo' => $imprimir->CARGO,
                    'fecha_marcacion' => $imprimir->FECHA_MARCACION,
                    'dia' => $imprimir->NOMBRE_DIA,
                    'marcacion' => $imprimir->MARCACIONES );
            }
        } else {
            $array[] = array(
                'nro' => '',
                'dni' => '',
                'apellidos_nombres' => '',
                'tipo_personal' => '',
                'cargo' => '',
                'fecha_marcacion' => '',
                'dia' => '',
                'marcacion' => '' );

        }

        return $array;



    }

    public

    function VerificarProcesoAdmin( $mes, $anio, $tipo ) {
        $sql_verifica = "SELECT COUNT(*) AS REGISTROS FROM [HEVES_RRHH].[dbo].[PERSONAL_DESCUENTOS] where MES = " . $mes . " and ANIO = " . $anio . " and TIPO_PERSONAL= '" . $tipo . "'";
        $ejecucion_sql = $this->_db->prepare( $sql_verifica );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'registros' => $read_filas->REGISTROS );
            }
        } else {
            $datos_read[] = array(
                'registros' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function VisualizarDescuentoAdmin( $mes, $anio, $tipo ) {
        $sql_visualizar = "SELECT * FROM [HEVES_RRHH].[dbo].[PERSONAL_DESCUENTOS] where MES = " . $mes . " and ANIO = " . $anio . " and TIPO_PERSONAL= '" . $tipo . "' order by APELLIDOS_NOMBRES";
        $ejecucion_sql = $this->_db->prepare( $sql_visualizar );
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


    public

    function IniciarProcesodescuentoAdministrativo( $mes, $anio, $tipo, $usuario ) {
        $sql_procesar = "EXEC [dbo].[SP_PROCESAR_DESCUENTOS_ADMINISTRATIVOS] " . $mes . ", " . $anio . ", '" . $tipo . "', '" . $usuario . "'";
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



    public

    function VerAsistenciaPersonalAdministrativo( $dni, $mes, $anio ) {
        $sql_visualizar = "DECLARE @lc_dni varchar(8) = '" . $dni . "'
                          declare @ln_mes int = " . $mes . "
                          declare @ln_anio int = " . $anio . "
                          SELECT IDASISTENCIAPERSONAL, CODIGO_HORARIO, CODIGO_TURNO, FECHA_DATETIME,  convert(varchar(10), FECHA_DATETIME, 103) as FECHA_MOSTRAR, DIA, MES, ANIO, DIA_NOMBRE, HORA_ENTRADA_HORARIO, HORA_ENTRADA_MARCACION, HORA_SALIDA_HORARIO, HORA_SALIDA_MARCACION, HORAS, HORAS_TRABAJADAS, MINUTOS_TARDE, MINUTOS_HORAS_EXTRA, MINUTOS_ANTES_SALIDA, MINUTOS_DESCONTAR_TARDANZA, INASISTENCIA, MINUTOS_DESCONTAR_ANTES_HORA, LICENCIAS, LICENCIAS_DESCRIPCION, LICENCIAS_DESCUENTO, FERIADO, DESCRIPCION_FERIADO, INDICADOR, TIPO_PERSONAL, IDDEPARTAMENTOUNIDAD FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] where dni = @lc_dni and mes = @ln_mes and anio = @ln_anio";
        $ejecucion_sql = $this->_db->prepare( $sql_visualizar );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'fecha_mostrar' => utf8_encode( trim( $read_filas->FECHA_MOSTRAR ) ),
                    'turno' => utf8_encode( trim( $read_filas->CODIGO_TURNO ) ),
                    'dia_nombre' => utf8_encode( trim( $read_filas->DIA_NOMBRE ) ),
                    'entrada_horario' => utf8_encode( trim( $read_filas->HORA_ENTRADA_HORARIO ) ),
                    'entrada_marcacion' => utf8_encode( trim( $read_filas->HORA_ENTRADA_MARCACION ) ),
                    'salida_horario' => utf8_encode( trim( $read_filas->HORA_SALIDA_HORARIO ) ),
                    'salida_marcacion' => utf8_encode( trim( $read_filas->HORA_SALIDA_MARCACION ) ),
                    'minutos_tarde' => $read_filas->MINUTOS_TARDE,
                    'minutos_descontar_tardanza' => $read_filas->MINUTOS_DESCONTAR_TARDANZA,
                    'minutos_extra' => $read_filas->MINUTOS_HORAS_EXTRA,
                    'inasistencia' => $read_filas->INASISTENCIA,
                    'feriado' => $read_filas->FERIADO
                );


            }
        } else {
            $datos_read[] = array(
                'fecha_mostrar' => '',
                'dia_nombre' => '',
                'entrada_horario' => '',
                'entrada_marcacion' => '',
                'salida_horario' => '',
                'salida_marcacion' => '',
                'minutos_tarde' => '',
                'minutos_descontar_tardanza' => '',
                'minutos_extra' => '',
                'inasistencia' => '',
                'feriado' => ''
            );

        }
        return json_encode( $datos_read );

    }





    public

    function Grabar_data_personal_tempus( $cargo, $estado, $tipo, $dni )

    {
        $sql_update = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TEMPUS] SET TIPO_HORARIO_TMP = '" . $tipo . "', CARGO_PLANILLA = '" . $cargo . "', ESTADO_TB = " . $estado . " WHERE DNI = '" . $dni . "'";
        $ejecucion = $this->_db->prepare( $sql_update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function Ver_Ultima_Marcacion( $dni ) {
        $sql_visualizar = "SELECT top 1 FECHA_MOSTRAR,HORATXT  FROM [HEVES_RRHH].[dbo].[PERSONAL_MARCACIONES] where dni = '" . $dni . "' order by fechahora desc";
        $ejecucion_sql = $this->_db->prepare( $sql_visualizar );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'fecha' => utf8_encode( trim( $read_filas->FECHA_MOSTRAR ) ),
                    'hora' => utf8_encode( trim( $read_filas->HORATXT ) ) );
            }
        } else {
            $datos_read[] = array(
                'fecha' => '',
                'hora' => '' );
        }
        return json_encode( $datos_read );


    }


    public

    function ver_no_marcacion( $mes, $anio, $dia ) {

        $sql_visualizar = "exec [dbo].[SP_NO_MARCARON_EN_N_DIAS] " . $mes . ", " . $anio . ", " . $dia;
        $ejecucion_sql = $this->_db->prepare( $sql_visualizar );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'dni' => utf8_encode( trim( $read_filas->DNI ) ),
                    'apellidos_nombres' => utf8_encode( trim( $read_filas->APELLIDOS_NOMBRES ) ),
                    'cargo' => utf8_encode( trim( $read_filas->CARGO ) ),
                    'fecha' => utf8_encode( trim( $read_filas->FECHA_DE_INGRESO ) ),
                    'estado' => utf8_encode( trim( $read_filas->ESTADO ) ) );
            }
        } else {
            $datos_read[] = array(
                'dni' => '',
                'apellidos_nombres' => '' );
        }
        return json_encode( $datos_read );

    }

    public

    function Ejecutar_Update_Descuento( $dni, $tarde, $falta, $antes_salida, $exoneracion, $descuento, $usuario ) {
        $sql_update = "declare @lc_dni varchar(8) = '" . $dni . "'
         DECLARE @ln_minutos_tarde int = " . $tarde . "
         declare @ln_falta int = " . $falta . "
         declare @ln_minutos_antes_salida int = " . $antes_salida . "
         declare @ln_exoneracion int = " . $exoneracion . "
         declare @ln_descuento numeric(12,2) = " . $descuento . "
         declare @user_modifico varchar(8) = '" . $usuario . "'
         UPDATE [HEVES_RRHH].[dbo].[PERSONAL_DESCUENTOS] SET MINUTOS_TARDANZAS = @ln_minutos_tarde, falta =  @ln_falta, MINUTOS_ANTES_SALIDA = @ln_minutos_antes_salida, EXONERACION = @ln_exoneracion, USUARIOMODIFICO = @user_modifico,  DESCUENTO = @ln_descuento, fechamodificacion = getdate()  where dni = @lc_dni";
        $ejecucion = $this->_db->prepare( $sql_update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function getListadoPersonalDescuento_sin_json( $mes, $anio, $tipo ) {
        $consulta_descuento = "SELECT *  FROM [HEVES_RRHH].[dbo].[PERSONAL_DESCUENTOS] where mes = " . $mes . " and anio = " . $anio . " and tipo_personal = '" . $tipo . "' order by APELLIDOS_NOMBRES";
        $ver_resultado = $this->_db->prepare( $consulta_descuento );
        $ver_resultado->execute();
        if ( $ver_resultado->rowCount() ) {
            while ( $imprimir = $ver_resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'dni' => $imprimir->DNI,
                    'apellidos_nombres' => utf8_encode( $imprimir->APELLIDOS_NOMBRES ),
                    'cargo' => utf8_encode( $imprimir->CARGO ),
                    'sueldo' => $imprimir->SUELDO,
                    'faltas' => $imprimir->FALTA,
                    'tardanza' => $imprimir->MINUTOS_TARDANZAS,
                    'descuento' => $imprimir->DESCUENTO );
            }
        } else {
            $array[] = array(
                'dni' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'sueldo' => '' );

        }

        return $array;





    }



    public

    function VerificarProcesoAsis( $mes, $anio, $tipo ) {
        $sql_verifica = "SELECT COUNT(*) AS REGISTROS FROM [HEVES_RRHH].[dbo].[PERSONAL_DESCUENTOS] where MES = " . $mes . " and ANIO = " . $anio . " and TIPO_PERSONAL= '" . $tipo . "'";
        $ejecucion_sql = $this->_db->prepare( $sql_verifica );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'registros' => $read_filas->REGISTROS );
            }
        } else {
            $datos_read[] = array(
                'registros' => '0' );
        }
        return json_encode( $datos_read );

    }

    /* VerificarProcesoAsis( $mes, $anio, $tipo ) */

    public

    function IniciarProcesodescuentoAsistencial( $mes, $anio, $tipo, $usuario ) {
        $sql_procesar = "EXEC [dbo].[SP_PROCESAR_DESCUENTOS_ADMINISTRATIVOS] " . $mes . ", " . $anio . ", '" . $tipo . "', '" . $usuario . "'";
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


    public

    function VerListadoNoMarcan() {
        $sql_visualizar = "SELECT ROW_NUMBER() OVER(ORDER BY apellidos_nombres ASC) AS NRO, DNI, APELLIDOS_NOMBRES, UPPER(CARGO) AS CARGO, FECHA_DE_INGRESO, CASE WHEN ESTADO = '1' THEN 'ACTIVO' WHEN ESTADO = '0' THEN 'DE BAJA' ELSE 'NO DEFINIDO' END AS ESTADO, CONVERT(VARCHAR(10), ULTIMA_MARCACION, 103) AS ULTIMA_FECHA_MARCACION, convert(char(8), ULTIMA_MARCACION, 108) AS ULTIMA_HORA_MARCACION FROM [HEVES_RRHH].[dbo].[TMP_NO_MARCARON]";
        $ejecucion_sql = $this->_db->prepare( $sql_visualizar );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $read_filas = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'nro' => $read_filas->NRO,
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'apellidos_nombres' => utf8_encode( trim( $read_filas->APELLIDOS_NOMBRES ) ),
                    'cargo' => utf8_encode( trim( $read_filas->CARGO ) ),
                    'fecha_de_ingreso' => utf8_encode( trim( $read_filas->FECHA_DE_INGRESO ) ),
                    'estado' => utf8_encode( trim( $read_filas->ESTADO ) ),
                    'fecha_ultima_marcacion' => utf8_encode( trim( $read_filas->ULTIMA_FECHA_MARCACION ) ),
                    'hora_ultima_marcacion' => utf8_encode( trim( $read_filas->ULTIMA_HORA_MARCACION ) ) );
            }
        } else {
            $datos_read[] = array(
                'nro' => '',
                'dni' => '',
                'apellidos_nombres' => '',
                'cargo' => '',
                'fecha_de_ingreso' => '',
                'estado' => '',
                'fecha_ultima_marcacion' => '',
                'hora_ultima_marcacion' => '' );

        }
        return $datos_read;

    }








}
?>