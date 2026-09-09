<?php


class actividadesModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public

    function getListarPersonalAsistencialSigalen( $lc_buscar ) {
        $sentencia = "declare @lc_buscar varchar(150) = '%' + '" . $lc_buscar . "' + '%' select idempleado, apellidopaterno, apellidomaterno, nombres, (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) as ApellidosNombres, a.IdCondicionTrabajo,a.IdTipoEmpleado, dni, CodigoPlanilla, usuario, FechaNacimiento, idTipoDocumento,  case when sexo = 1 then 'MASCULINO' when sexo = '2' then 'FEMENINO' else 'NO REGISTRADO' END as sexo, usuario, upper(b.Descripcion) as Tipo_condicion_trabajo, upper(c.descripcion) as Tipo_Condicion_empleado, esActivo as activo,  a.telefono, a.correo, DATEDIFF(year, a.FechaNacimiento, getdate()) as edad  FROM [SIGH].[dbo].[Empleados] a left join [SIGH].[dbo].[TiposCondicionTrabajo] b on a.idcondiciontrabajo = b.idcondiciontrabajo left join [SIGH].[dbo].[TiposEmpleado] c on  a.idtipoempleado = c.IdTipoEmpleado  where (upper(apellidopaterno) + ' '  + upper(apellidomaterno) + ' ' + upper(nombres)) like  @lc_buscar  and  a.IdEmpleado in (select IdEmpleado from [SIGH].[dbo].[medicos]) and a.esActivo = 1  order by ApellidoPaterno, ApellidoMaterno, nombres";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'idempleado' => trim( $imprimir->idempleado ),
                    'dni' => trim( $imprimir->dni ),
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->ApellidosNombres ) ),
                    'FechaNacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FechaNacimiento ) ) ),
                    'sexo' => trim( $imprimir->sexo ),
                    'Tipo_condicion_trabajo' => utf8_encode( trim( $imprimir->Tipo_condicion_trabajo ) ),
                    'Tipo_Condicion_empleado' => utf8_encode( trim( $imprimir->Tipo_Condicion_empleado ) ),
                    'activo' => trim( $imprimir->activo ),
                    'telefono' => trim( $imprimir->telefono ),
                    'usuario' => utf8_encode( trim( $imprimir->usuario ) ),
                    'edad' => $imprimir->edad,
                    'correo' => utf8_encode( trim( $imprimir->correo ) ) );
            }
        } else {
            $array[] = array(
                'idempleado' => '',
                'dni' => '',
                'apellidos_nombres' => '',
                'FechaNacimiento' => '',
                'sexo' => '',
                'Tipo_condicion_trabajo' => '',
                'Tipo_Condicion_empleado' => '',
                'activo' => '',
                'telefono' => '',
                'usuario' => '',
                'edad' => '',
                'correo' => '' );

        }
        return json_encode( $array );
    }

    public

    function getListarturnos() {
        $read_sql = "SELECT CODIGO, NOMBRE  FROM [HEVES_RRHH].[dbo].[T_TIPO_TURNO]";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'codigo' => $read->CODIGO,
                    'nombre' => utf8_encode( $read->NOMBRE ) );
            }
        } else {
            $datos_read[] = array(
                'codigo' => '',
                'nombre' => '' );
        }
        return json_encode( $datos_read );

    }



    public

    function VerAsistenciaProgramacion( $dni, $mes, $anio ) {
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

    function CrearHorarioAsistencial( $mes, $anio, $id, $dni, $usuario ) {
        $procesar = "exec [dbo].[SP_CREAR_HORARIO_ASISTENCIA] " . $mes . ", " . $anio . ", " . $id . ", '" . $dni . "', '[SIGH].[dbo].[EMPLEADOS]', 'R', '" . $usuario . "', 'S'";
        $ejecucion = $this->_db->prepare( $procesar );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function getListarDepartamentosHospital() {
        $read_sql = "SELECT IdDepartamento, upper(nombre) as nombre    FROM [SIGH].[dbo].[DepartamentosHospital] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IdDepartamento,
                    'nombre' => utf8_encode( $read_filas->nombre ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'nombre' => '' );
        }
        return json_encode( $datos_read );

    }



    public

    function getListarActividades() {
        $read_sql = "SELECT IDACTIVIDAD, NOMBRE, ABREVIATURA  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED]";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDACTIVIDAD,
                    'nombre' => utf8_encode( $read_filas->NOMBRE ),
                    'abreviatura' => trim( $read_filas->ABREVIATURA ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'nombre' => '',
                'abreviatura' => '' );
        }
        return json_encode( $datos_read );

    }



    public

    function ListarServicios( $id ) {
        $read_sql = "declare @liddepartamento int = " . $id . "
  SELECT IdEspecialidad, upper(nombre) as nombre, MedicoNoMedico  FROM [SIGH].[dbo].[Especialidades] WHERE IdDepartamento in (SELECT IdDepartamento  FROM [SIGH].[dbo].[DepartamentosHospital] where IdDepartamento = @liddepartamento and MedicoNoMedico = 1) order by nombre";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IdEspecialidad,
                    'nombre' => utf8_encode( $read_filas->nombre ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'nombre' => '' );
        }
        return json_encode( $datos_read );
    }

    public

    function GrabarActividades( $iddepartamento, $idservicio, $idactividad, $idempleado, $dni, $dia, $mes, $anio, $turno, $horas, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE](IDDEPARTAMENTO, IDSERVICIO, IDACTIVIDAD, IDPERSONAL, DNIPERSONAL, DIA, MES, ANIO, ESTADO, TURNO, HORAS,  USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA)
         VALUES ( " . $iddepartamento . ", " . $idservicio . ",  " . $idactividad . ",  " . $idempleado . ", '" . $dni . "', " . $dia . ",  " . $mes . ",  " . $anio . ", '1', '" . $turno . "', " . $horas . ",  '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public
    function LeerActividad( $dni, $mes, $anio ) {
        $read_sql = "DECLARE @lc_dni VARCHAR(8) = '" . $dni . "'
        declare @ln_mes int = " . $mes . "
        declare @ln_anio int = " . $anio . "
        SELECT A.IDACTIVIDAD_DETALLE, UPPER(B.NOMBRE) AS DEPARTAMENTO, UPPER(C.NOMBRE) AS SERVICIO,  D.NOMBRE,  A.DIA, A.MES, A.ANIO, A.TURNO, A.HORAS FROM [HEVES_RRHH].[DBO].[ACTIVIDADES_MEDNOMED_DETALLE] A LEFT JOIN  [SIGH].[DBO].[DEPARTAMENTOSHOSPITAL] B ON A.IDDEPARTAMENTO = B.IDDEPARTAMENTO LEFT JOIN [SIGH].[DBO].[ESPECIALIDADES]  C ON A.IDSERVICIO = C.IDESPECIALIDAD LEFT JOIN [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED] D ON A.IDACTIVIDAD = D.IDACTIVIDAD WHERE A.DNIPERSONAL = @lc_dni AND A.MES = @ln_mes AND A.ANIO = @ln_anio order by dia";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_filas->IDACTIVIDAD_DETALLE,
                    'departamento' => utf8_encode( $read_filas->DEPARTAMENTO ),
                    'servicio' => utf8_encode( $read_filas->SERVICIO ),
                    'actividad' => utf8_encode( $read_filas->NOMBRE ),
                    'dia' => $read_filas->DIA,
                    'mes' => $read_filas->MES,
                    'anio' => $read_filas->ANIO,
                    'turno' => utf8_encode( $read_filas->TURNO ),
                    'horas' => $read_filas->HORAS);
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'departamento' => '',
                'servicio' => '',
                'actividad' => '',
                'dia' => '',
                'mes' => '',
                'anio' => '',
                'turno' => '',
                'horas' => ''
            );
        }
        // var_dump($datos_read);
        return json_encode( $datos_read );

 
    }

 


}
?>