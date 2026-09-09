<?php
class asignacionModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public

    function getListarPersonal() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL]
        WHERE ESTADO = '1'  ORDER BY APELLIDOSNOMBRES ";
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
        $read_sql = "SELECT IDPERSONAL,DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL] where  ESTADO = '1' AND APELLIDOSNOMBRES LIKE '%' + '" . $nombres . "' + '%'  ORDER BY APELLIDOSNOMBRES ";
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

    function AsignarHorario( $codhorario, $idpersonal, $usuario ) {
        $update_documento = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL] SET CODHORARIO = '" . $codhorario . "', USUARIOMODIFICO =  '" . $usuario . "', FECHAMODIFICACION = getdate()  WHERE IDPERSONAL = " . $idpersonal;
        $ejecucion = $this->_db->prepare( $update_documento );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }




    public

    function getListarAdministrativos() {
        $read_sql = "SELECT IDPERSONAL, DNI, TIPO_PERSONAL, APELLIDOSNOMBRES, CARGO, SERVICIO, FECHAINGRESO, case when FECHAINGRESO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHAINGRESO, 101)  else '' end as FECHA_INGRESO, case when FECHATERMINOCONTRATO > = convert(datetime, '2016-01-01', 101) then convert(varchar(10), FECHATERMINOCONTRATO, 101)  else '' end as FECHA_TERMINO_CONTRATO,  SUELDOACTUAL, CODHORARIO  FROM [HEVES_RRHH].[dbo].[PERSONAL]
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

    function MostrarProgramacionMes( $mes, $anio ) {
        $read_sql = "SELECT a.DNI, case when A.TIPO_PERSONAL = 'A' then 'ADMINISTRATIVO' ELSE 'ASISTENCIAL' END AS TIPO_PERSONAL, b.APELLIDOSNOMBRES, case when a.indicador = '1' then 'REGISTRAR' ELSE 'CERRADO' END AS ESTADO FROM [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] A left join [HEVES_RRHH].[dbo].[PERSONAL] B on a.dni = b.dni where a.MES = " . $mes . " and a.ANIO = " . $anio . " group by A.dni, A.TIPO_PERSONAL, APELLIDOSNOMBRES, INDICADOR ORDER BY b.APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'dni' => utf8_encode( $read_filas->DNI ),
                    'tipo_personal' => utf8_encode( $read_filas->TIPO_PERSONAL ),
                    'apellidos_nombres' => utf8_encode( $read_filas->APELLIDOSNOMBRES ),
                    'estado' => utf8_encode( $read_filas->ESTADO ) );
            }

        } else {
            $datos_read[] = array(
                'verificar' => '0' );
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









}
?>