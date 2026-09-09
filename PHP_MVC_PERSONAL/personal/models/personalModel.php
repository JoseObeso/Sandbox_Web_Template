<?php
class personalModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    // ListarUnidadOrganica()
    
    // ObtenerContratosdeJuridicos( $ruc )

    public

    function getListadoPersonal( $lc_buscar_personal ) {
        $sentencia = "declare @lc_buscar varchar(150) = '%' + '" . $lc_buscar_personal . "' + '%'
        select idempleado, apellidopaterno, apellidomaterno, nombres, (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) as ApellidosNombres, a.IdCondicionTrabajo,a.IdTipoEmpleado, dni, CodigoPlanilla, usuario, FechaNacimiento, idTipoDocumento,  case when sexo = 1 then 'MASCULINO' when sexo = '2' then 'FEMENINO' else 'NO REGISTRADO' END as sexo, usuario, upper(b.Descripcion) as Tipo_condicion_trabajo, upper(c.descripcion) as Tipo_Condicion_empleado, esActivo as activo, case when esActivo = 1 then 'ACTIVO' ELSE 'DADO DE BAJA' END AS TIPO_CONDICION,  a.telefono, a.correo, DATEDIFF(year, a.FechaNacimiento, getdate()) as edad FROM [SIGH].[dbo].[Empleados] a left join [SIGH].[dbo].[TiposCondicionTrabajo] b on a.idcondiciontrabajo = b.idcondiciontrabajo left join [SIGH].[dbo].[TiposEmpleado] c on  a.idtipoempleado = c.IdTipoEmpleado where (upper(apellidopaterno) + ' '  + upper(apellidomaterno) + ' ' + upper(nombres)) like  @lc_buscar  or dni like @lc_buscar or c.Descripcion like @lc_buscar order by ApellidoPaterno, ApellidoMaterno, nombres";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'indicador' => '1',
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
                    'tipo_condicion' => $imprimir->TIPO_CONDICION,
                    'correo' => utf8_encode( trim( $imprimir->correo ) ) );

            }
        } else {
            $array[] = array(
                'indicador' => '0'
            );

        }

        return json_encode( $array );

    }


    public

    function getListadoPersonalTempus( usuario_web $u ) {
        $sentencia = "SELECT CODIGO, PATERNO, MATERNO, NOMBRES, APELLIDOS_NOMBRES_TOTALES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, CONDICION, CARGO_PLANILLA, ESTADO_TB, BDATOS,  FECHAMIGRACION, USUARIOMIGRACION FROM [HEVES_RRHH].[dbo].[PERSONAL_TEMPUS]  WHERE ESTADO_TB = 1 AND  RTRIM(LTRIM(PATERNO)) + ' ' +  RTRIM(LTRIM(MATERNO)) + ' ' + RTRIM(LTRIM(NOMBRES)) LIKE  ?  or codigo like  ?  ORDER BY PATERNO, MATERNO, NOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => trim( $imprimir->CODIGO ),
                    'apellidos_nombres_totales' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES_TOTALES ) ),
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION ) ),
                    'ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_DE_INGRESO ) ) ),
                    'cargo_planilla' => utf8_encode( trim( $imprimir->CARGO_PLANILLA ) ),
                    'tarjeta_tmp' => trim( $imprimir->TARJETA_TMP ),
                    'estadotb' => trim( $imprimir->ESTADO_TB ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontro personal buscado' );
        }
        return json_encode( $array );
    }

    public

    function getListadoPersonal_rrhh( usuario_web $u ) {
        $sentencia = "SELECT IDPERSONAL, case when b.IdEmpleado is null then '' else b.IdEmpleado end as IDEMPLEADO,  A.TIPO_CONTRATO, PLAZA, NRO_CONTRATO, NRO_PROCESO, APELLIDOSNOMBRES, A.FECHANACIMIENTO, A.DNI, RUC, SERVICIO, A.FECHAINGRESO, FECHATERMINOCONTRATO, FECHADESVINCULACION, SUELDOACTUAL,  DIRECCION_DESCRIPCION, CASE WHEN DIRECCION_DISTRITO  IS NULL THEN DIRECCION_DESCRIPCION ELSE DIRECCION_DESCRIPCION + ' - ' + DIRECCION_DISTRITO  + ' - ' + DIRECCION_PROVINCIA + ' - ' + DIRECCION_DEPARTAMENTO END AS DIRECCION_TOTAL,  TIPO_PERSONAL, GRUPO_OCUPACIONAL, CARGO, PROFESION,UNIDAD_ORGANICA, ESPECIALIDAD,  CASE WHEN ESTADO = '1'  THEN 'ACTIVO' ELSE 'DESACTIVADO' END AS CONDICION_ESTADO FROM  [HEVES_RRHH].[dbo].[PERSONAL] A LEFT JOIN [SIGH].[dbo].[Empleados] B ON A.dni = b.dni where apellidosnombres like ? or a.dni like ?  or cargo like ?  or profesion  like ? or especialidad  like ? ORDER BY APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'idpersonal' => $imprimir->IDPERSONAL,
                    'idsigalen' => $imprimir->IDEMPLEADO,
                    'plaza' => trim( $imprimir->PLAZA ),
                    'nro_contrato' => trim( $imprimir->NRO_CONTRATO ),
                    'nro_proceso' => trim( $imprimir->NRO_PROCESO ),
                    'dni' => trim( $imprimir->DNI ),
                    'ruc' => trim( $imprimir->RUC ),
                    'apellidosnombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'grupo_ocupacional' => utf8_encode( trim( $imprimir->GRUPO_OCUPACIONAL ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'especialidad' => utf8_encode( trim( $imprimir->ESPECIALIDAD ) ),
                    'profesional' => utf8_encode( trim( $imprimir->PROFESION ) ),
                    'unidad_organica' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA ) ),
                    'fechaingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAINGRESO ) ) ),
                    'direccion' => utf8_encode( trim( $imprimir->DIRECCION_TOTAL ) ),
                    'tipo_personal' => utf8_encode( trim( $imprimir->TIPO_PERSONAL ) ),
                    'estado' => trim( $imprimir->CONDICION_ESTADO ) );

            }
        } else {

            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontro personal buscado' );



        }
        return json_encode( $array );
    }



    public

    function getListadoPersonal_Renunciante( $lc_buscar_personal ) {
        $sentencia = "declare @lc_nombre varchar(200) = '" . $lc_buscar_personal . "'
        SELECT  IDPERSONALRENUNCIA, APELLIDOS_NOMBRES, DNI, CARGO, UNIDAD, FECHA_INGRESO, FECHA_RENUNCIA, FECHA_ULTIMO_DIA_TRABAJO, MOTIVO, OBSERVACION, IDTIPOEMPLEADO, IDCENTROSUBCOSTO, ID_MOTIVO_CESE, case when  FECHA_RENUNCIA = convert(datetime, '01/01/1900', 101) then '' else convert(varchar(10),  FECHA_RENUNCIA, 103) end as FECHA_RENUNCIA_TXT, case when FECHA_ULTIMO_DIA_TRABAJO = convert(datetime, '01/01/1900', 101) then '' else convert(varchar(10), FECHA_ULTIMO_DIA_TRABAJO, 103) end as FECHA_ULTIMO_DIA_TXT 
		FROM [HEVES_RRHH].[dbo].[V_PERSONAL_RENUNCIA]  where apellidos_nombres like '%'  + @lc_nombre +  '%' or DNI like  '%' + @lc_nombre + '%' order by APELLIDOS_NOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array() );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idpersonal' => $imprimir->IDPERSONALRENUNCIA,
                    'apellidosnombres' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES ) ),
                    'dni' => trim( $imprimir->DNI ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'unidad' => utf8_encode( trim( $imprimir->UNIDAD ) ),
                    'fechaingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INGRESO ) ) ),
                    'fecharenuncia' => trim( $imprimir->FECHA_RENUNCIA_TXT ),
                    'fechaultimodiatrabajo' => trim( $imprimir->FECHA_ULTIMO_DIA_TXT ),
                    'motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0', );
        }
        return json_encode( $array );
    }


    public

    function getListadoHorarios( usuario_web $u ) {
        $sentencia = "SELECT [IDHORARIO], [CODIGOHORARIO], [CODIGOTURNO], [HORAINGRESO], [HORASALIDA], [HORAS], [LUNES], [MARTES], [MIERCOLES], [JUEVES], [VIERNES], [SABADO], [DOMINGO], [TIPO_HORARIO], [USUARIOREGISTRO], [FECHAREGISTRO], [USUARIOMODIFICO], [FECHAMODIFICACION], [USUARIODIODEBAJA], [FECHADEBAJA]
	  FROM [HEVES_RRHH].[dbo].[T_HORARIOS] where CODIGOTURNO like ?  order by IDHORARIO";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'IDHORARIO' => trim( $imprimir->IDHORARIO ),
                    'CODIGOHORARIO' => trim( $imprimir->CODIGOHORARIO ),
                    'CODIGOTURNO' => trim( $imprimir->CODIGOTURNO ),
                    'HORAINGRESO' => trim( $imprimir->HORAINGRESO ),
                    'HORASALIDA' => trim( $imprimir->HORASALIDA ),
                    'HORAS' => trim( $imprimir->HORAS ),
                    'LUNES' => trim( $imprimir->LUNES ),
                    'MARTES' => trim( $imprimir->MARTES ),
                    'MIERCOLES' => trim( $imprimir->MIERCOLES ),
                    'JUEVES' => trim( $imprimir->JUEVES ),
                    'VIERNES' => trim( $imprimir->VIERNES ),
                    'SABADO' => trim( $imprimir->SABADO ),
                    'DOMINGO' => trim( $imprimir->DOMINGO ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }

    public

    function getListadoLicencias( usuario_web $u ) {
        $sentencia = "SELECT [IDTIPOLICENCIA], [NOMBRE], [PROCEDE_DESCUENTO]  FROM [HEVES_RRHH].[dbo].[T_TIPO_DE_LICENCIA] where NOMBRE  like ? ORDER BY NOMBRE";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1,
                    'IDTIPOLICENCIA' => trim( $imprimir->IDTIPOLICENCIA ),
                    'NOMBRE' => trim( $imprimir->NOMBRE ),
                    'PROCEDE_DESCUENTO' => trim( $imprimir->PROCEDE_DESCUENTO ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }


    public

    function ProcesoEliminarPersonalRenunciante( $id_personal ) {
        $instruccion_sql = "EXEC [dbo].[SP_ELIMINAR_PERSONAL_RENUNCIANTE] " . $id_personal;
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
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


    // VerSiExisteNro

    public

    function BuscarPersonal( $nombre_personal ) {
        $sentencia = "EXEC [dbo].[SP_BUSCAR_PERSONAL_EN_TODAS_LAS_BDATOS] " . utf8_decode( $nombre_personal );
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estadorespuesta' => 1,
                    'dni' => trim( $imprimir->DNI ),
                    'apellidos_nombre' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES ) ),
                    'paterno' => utf8_encode( trim( $imprimir->PATERNO ) ),
                    'materno' => utf8_encode( trim( $imprimir->MATERNO ) ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'idcodigotempus' => utf8_encode( trim( $imprimir->IDCODIGOTEMPUS ) ),
                    'origen' => utf8_encode( trim( $imprimir->ORIGEN ) )
                );
            }
        } else {
            $array[] = array( 'estadorespuesta' => 0, 'mensaje' => 'Digite Correctamente o no existe registro del personal' );
        }
        return json_encode( $array );
    }

    public

    function GrabacionPersonalRenunciante( $dni_personal, $origen_personal, $paterno_personal, $materno_personal, $solo_nombres_personal, $codigo_tempus, $nombres_personal, $seleccion_cargo, $seleccion_unidad_servicios, $fecha_ingreso, $fecha_renuncia, $fecha_ultimo_dia_trabajo, $seleccion_motivo, $txt_area_observacion, $usuario ) {

        $instruccion_sql = "EXEC SP_GRABAR_PERSONAL_RENUNCIANTE '" . $dni_personal . "', '" . utf8_decode( $paterno_personal ) . "', '" . utf8_decode( $materno_personal ) . "', '" . utf8_decode( $solo_nombres_personal ) . "', " . $seleccion_cargo . ", " . $seleccion_unidad_servicios . ", '" . $fecha_ingreso . "', '" . $fecha_renuncia . "', '" . $fecha_ultimo_dia_trabajo . "', " . $seleccion_motivo . ", '" . $origen_personal . "', '" . utf8_decode( $txt_area_observacion ) . "', '" . $usuario . "'";
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();

        $instruccion_sql_2 = "EXEC [dbo].[SP_DAR_DE_BAJA_REGISTRO_TEMPUS]'" . $dni_personal;
        $resultado2 = $this->_db->prepare( $instruccion_sql_2 );
        $resultado2->execute();


        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado' => '1' );
            }
        } else {
            $array[] = array( 'estado' => 0, 'mensaje' => 'Digite Correctamente o no existe registro del personal' );
        }
        return json_encode( $array );
    }


    public

    function getListarServicios() {
        $sentencia = "SELECT IdCentrosubCosto, codigo, CodigoCentroCosto, descripcion  FROM [SIGH].[dbo].[CentrosSubCosto] order by Descripcion";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => $imprimir->IdCentrosubCosto, 'nombre' => utf8_encode( trim( $imprimir->descripcion ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }


    public

    function getListadoCargosPersonal() {
        $sentencia = "SELECT IDTIPOEMPLEADO, upper(Descripcion) DESCRIPCION   FROM [SIGH].[dbo].[TiposEmpleado] ORDER BY Descripcion";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'idtipoempleado' => $imprimir->IDTIPOEMPLEADO, 'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }


    public

    function getListadoMotivosRenuncias() {
        $sentencia = "SELECT IDMOTIVO, MOTIVO  FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]  ORDER BY MOTIVO";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'idtipomotivo' => $imprimir->IDMOTIVO, 'motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }



    public

    function GetDatosPersonalRenunciante( $idpersonal ) {
        $sentencia = "SELECT  IDPERSONALRENUNCIA, APELLIDOS_NOMBRES, DNI, CARGO, UNIDAD, FECHA_INGRESO, FECHA_RENUNCIA, FECHA_ULTIMO_DIA_TRABAJO, MOTIVO, OBSERVACION, IDTIPOEMPLEADO, IDCENTROSUBCOSTO, ID_MOTIVO_CESE, case when  FECHA_RENUNCIA = convert(datetime, '01/01/1900', 101) then '' else convert(varchar(10),  FECHA_RENUNCIA, 103) end as FECHA_RENUNCIA_TXT, case when FECHA_ULTIMO_DIA_TRABAJO = convert(datetime, '01/01/1900', 101) then '' else convert(varchar(10), FECHA_ULTIMO_DIA_TRABAJO, 103) end as FECHA_ULTIMO_DIA_TXT FROM [HEVES_RRHH].[dbo].[V_PERSONAL_RENUNCIA] WHERE IDPERSONALRENUNCIA = " . $idpersonal;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estadorespuesta' => 1,
                'idpersonal' => $imprimir->IDPERSONALRENUNCIA,
                'dni' => $imprimir->DNI,
                'apellidos_nombres' => utf8_encode( $imprimir->APELLIDOS_NOMBRES ),
                'cargo' => utf8_encode( $imprimir->CARGO ),
                'unidad' => utf8_encode( $imprimir->UNIDAD ),
                'fecha_ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INGRESO ) ) ),
                'fecha_renuncia' => trim( $imprimir->FECHA_RENUNCIA_TXT ),
                'fecha_ultimo_dia_trabajo' => trim( $imprimir->FECHA_ULTIMO_DIA_TXT ),
                'motivo' => utf8_encode( $imprimir->MOTIVO ),
                'observacion' => utf8_encode( $imprimir->OBSERVACION ),
                'idtipoempleado' => $imprimir->IDTIPOEMPLEADO,
                'idcentrosubcosto' => $imprimir->IDCENTROSUBCOSTO,
                'id_motivo_cese' => $imprimir->ID_MOTIVO_CESE );

        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }

        return json_encode( $array );
    }


    public

    function UpdateDatosPersonalRenunciante( $idpersonal, $idseleccion_empleado_modificar, $idseleccion_unidad_modificar, $fecha_ingreso_modificar, $fecha_renuncia_modificar, $fecha_ultimo_dia_modificar, $seleccion_motivo_m, $txt_area_observaciones_m_final ) {
        $sentencia = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_RENUNCIA]  SET IDTIPOEMPLEADO =  " . $idseleccion_empleado_modificar . ", IDCENTROSUBCOSTO = " . $idseleccion_unidad_modificar . ", FECHA_INGRESO = convert(datetime,'" . $fecha_ingreso_modificar . "', 103), FECHA_RENUNCIA = convert(datetime,'" . $fecha_renuncia_modificar . "', 103), FECHA_ULTIMO_DIA_TRABAJO = convert(datetime,'" . $fecha_ultimo_dia_modificar . "', 103), ID_MOTIVO_CESE = " . $seleccion_motivo_m . ", OBSERVACION = '" . $txt_area_observaciones_m_final . "'   WHERE IDPERSONALRENUNCIA = " . $idpersonal;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado' => '1' );
            }
        } else {
            $array[] = array( 'estado' => 0, 'mensaje' => 'Digite Correctamente o no existe registro del personal' );
        }
        return json_encode( $array );
    }






    public

    function MostrarRegistros( $id ) {
        $sentencia = "  declare @lid_empleado int = " . $id . "
          select case when accion= 'a' then 'REGISTRO POR      : ' when  accion= 'm' then 'MODIFICADO POR  : '   when  accion= 'e' then 'EELIMINADO POR  : ' else
            'NO DEFINIDO   ' END  +  (upper(apellidopaterno) + ' ' + upper(apellidomaterno) + ' ' + upper(nombres)) as ApellidosNombres, 
              CONVERT(VARCHAR(10), fechahora, 103) AS FECHA_OPERACION, CONVERT(CHAR(8), fechahora, 108) AS HORA_OPERACION,  tabla,  a.IdEmpleado, idlistitem from [SIGH].[dbo].[Auditoria] A left join [SIGH].[dbo].[Empleados] B on a.idempleado = b.idempleado   where   idregistro =  @lid_empleado and tabla = 'Empleados' order by FechaHora ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->ApellidosNombres ) ),
                    'fecha_operacion' => utf8_encode( trim( $imprimir->FECHA_OPERACION ) ),
                    'hora_operacion' => utf8_encode( trim( $imprimir->HORA_OPERACION ) ) );
            }
        } else {
            $array[] = array(
                'apellidos_nombres' => '',
                'fecha_operacion' => '',
                'hora_operacion' => '' );

        }

        return json_encode( $array );

    }




    public

    function MostrarColegiatura( $id ) {
        $sentencia = "select idmedico, Colegiatura, case when rne is null then '' else rne end as rne from [SIGH].[dbo].[medicos] where IdEmpleado = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'idmedico' => $imprimir->idmedico,
                    'rne' => $imprimir->rne,
                    'colegiatura' => $imprimir->Colegiatura );
            }
        } else {
            $array[] = array(
                'idmedico' => '',
                'rne' => '',
                'colegiatura' => '' );

        }

        return json_encode( $array );

    }



    public

    function VerEspecialidad( $id ) {
        $sentencia = "SELECT upper(c.Nombre) as departamento, upper(a.Nombre) as especialidad   FROM [SIGH].[dbo].[Especialidades] A left join [SIGH].[dbo].[MedicosEspecialidad]  b on a.IdEspecialidad = b.IdEspecialidad left join [SIGH].[dbo].[DepartamentosHospital] c on a.IdDepartamento = c.IdDepartamento where b.IdMedico = " . $id;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'departamento' => $imprimir->departamento,
                    'especialidad' => $imprimir->especialidad );
            }
        } else {
            $array[] = array(

                'departamento' => '',
                'especialidad' => '' );

        }

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
                    'horas' => $read_filas->HORAS );
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


    public

    function LeerCitas( $id, $mes, $anio ) {
        $read_sql = "declare @lid_empleado int = " . $id . "
                declare @ln_mes int = " . $mes . "
                declare @ln_anio int = " . $anio . "
                declare @lid_medico int = (select idmedico from [SIGH].[dbo].[medicos] where IdEmpleado = @lid_empleado)
                SELECT idcita, convert(varchar(10), fecha, 103) as Fecha, HoraInicio, HoraFin, a.IdEstadoCita, upper(b.Descripcion) as Descripcion, a.IdEspecialidad, c.nombre as departamento, a.IdServicio, d.Nombre as servicio, case when SMS <> '0' then 'SMS ENVIADO' ELSE '' END AS SMS, e.ApellidoPaterno + ' ' + e.ApellidoMaterno + ' ' + e.PrimerNombre as Paciente FROM [SIGH].[dbo].[Citas] a left join [SIGH].[dbo].[TiposEstadosCita] b on a.IdEstadoCita = b.IdEstadoCita left join [SIGH].[dbo].[Especialidades] c on a.IdEspecialidad = c.IdEspecialidad left join [SIGH].[dbo].[Servicios] d on a.IdServicio = d.IdServicio left join [SIGH].[dbo].[pacientes] e on a.IdPaciente = e.IdPaciente where idmedico =  @lid_medico  and month(fecha) = @ln_mes and year(fecha) = @ln_anio order by a.fecha, a.HoraInicio";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'fecha' => $read_filas->Fecha,
                    'inicio' => $read_filas->HoraInicio,
                    'fin' => $read_filas->HoraFin,
                    'cita' => utf8_encode( $read_filas->Descripcion ),
                    'paciente' => utf8_encode( $read_filas->Paciente ),
                    'departamento' => utf8_encode( $read_filas->departamento ),
                    'servicio' => utf8_encode( $read_filas->servicio ) );
            }
        } else {
            $datos_read[] = array(
                'fecha' => '',
                'inicio' => '',
                'fin' => '',
                'cita' => '',
                'paciente' => '',
                'departamento' => '',
                'servicio' => '' );

        }
        return json_encode( $datos_read );

    }



    public

    function LeerAtencionCitas( $mes, $anio, $id ) {
        $read_sql = "declare @ln_mes int = " . $mes . "
              declare @ln_anio int = " . $anio . "
              declare @lid_empleado int =  " . $id . "
              declare @lid_tipo_servicio int = 1
              select  convert(varchar(10), a.fechaingreso, 103)  + ' -- '  + a.horaingreso as FechaHoraProgramada, b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.PrimerNombre  as ApellidosNombres, case when e.Descripcion is null then '' else  upper(e.Descripcion)  end as  Destino, case when FyHInicioI is null then '' else convert(varchar(10), FyHInicioI, 103) end as FechaInicioAtencion, case when FyHInicioI is null then '' else CONVERT(char(8), FyHInicioI, 108) end as HoraInicioAtencion, case when FyHFinal is null then '' else convert(varchar(10), FyHFinal, 103) end as FechaFinalAtencion, case when FyHFinal is null then '' else CONVERT(char(8), FyHFinal, 108) end  AS HoraFinalAtencion,  upper(f.Descripcion) as Condicion, case when DATEDIFF(minute,    FyHInicioI, FyHFinal) is null then 0 else DATEDIFF(minute,    FyHInicioI, FyHFinal) end as diferencia_minutos from [SIGH].[dbo].[Atenciones] a left join [SIGH].[dbo].[Pacientes] b on  a.IdPaciente = b.IdPaciente left join [SIGH].[dbo].[TiposServicio] c on a.IdTipoServicio = c.IdTipoServicio   left join [SIGH].[dbo].[medicos] d on a.IdMedicoIngreso = d.IdMedico  left join [SIGH].[dbo].[TiposDestinoAtencion]  e  on a.IdDestinoAtencion = e.IdDestinoAtencion left join  [SIGH].[dbo].[EstadosAtencion] f on a.idEstadoAtencion = f.IdEstadoAtencion  where month(a.fechaingreso) = @ln_mes  and year(a.fechaingreso) = @ln_anio and d.Idempleado = @lid_empleado  and  c.IdTipoServicio = @lid_tipo_servicio  order by a.fechaingreso, a.HoraIngreso";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'fechahoraprogramada' => $read_filas->FechaHoraProgramada,
                    'apellidosnombres' => utf8_encode( $read_filas->ApellidosNombres ),
                    'destino' => utf8_encode( $read_filas->Destino ),
                    'fechainicioatencion' => utf8_encode( $read_filas->FechaInicioAtencion ),
                    'horainicioatencion' => utf8_encode( $read_filas->HoraInicioAtencion ),
                    'fechafinalatencion' => utf8_encode( $read_filas->FechaFinalAtencion ),
                    'horafinalatencion' => utf8_encode( $read_filas->HoraFinalAtencion ),
                    'condicion' => utf8_encode( $read_filas->Condicion ),
                    'diferencia' => $read_filas->diferencia_minutos );
            }
        } else {
            $datos_read[] = array(
                'verificar' => '0' );

        }
        return json_encode( $datos_read );



    }



    public

    function LeerAtencionEmergencia( $mes, $anio, $id ) {
        $read_sql = "declare @ln_mes int = " . $mes . "
              declare @ln_anio int = " . $anio . "
              declare @lid_empleado int =  " . $id . "
                declare @lid_tipo_servicio int = 2
                 select  convert(varchar(10), a.fechaingreso, 103)  + ' -- '  + a.horaingreso as FechaHoraIngreso, b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.PrimerNombre  as ApellidosNombres, case when e.Descripcion is null then '' else  upper(e.Descripcion)  end as  Destino, case when fechaEgreso  is null then '' else    convert(varchar(10), a.FechaEgreso, 103)  end as FechaEgreso, case when a.HoraEgreso is null then '' else a.HoraEgreso end as HoraEgreso, case when FyHInicioI is null then '' else convert(varchar(10), FyHInicioI, 103) end as FechaInicioAtencion, case when FyHInicioI is null then '' else CONVERT(char(8), FyHInicioI, 108) end as HoraInicioAtencion,	 case when FyHFinal is null then '' else convert(varchar(10), FyHFinal, 103) end as FechaFinalAtencion, case when FyHFinal is null then '' else CONVERT(char(8), FyHFinal, 108) end  AS HoraFinalAtencion,  upper(f.Descripcion) as Condicion 	 from [SIGH].[dbo].[Atenciones] a left join [SIGH].[dbo].[Pacientes] b on  a.IdPaciente = b.IdPaciente left join [SIGH].[dbo].[TiposServicio] c on a.IdTipoServicio = c.IdTipoServicio   left join [SIGH].[dbo].[medicos] d on a.IdMedicoIngreso = d.IdMedico  left join [SIGH].[dbo].[TiposDestinoAtencion]  e  on a.IdDestinoAtencion = e.IdDestinoAtencion left join  [SIGH].[dbo].[EstadosAtencion] f on a.idEstadoAtencion = f.IdEstadoAtencion   where month(a.fechaingreso) = @ln_mes  and year(a.fechaingreso) = @ln_anio and d.Idempleado = @lid_empleado  and  c.IdTipoServicio = @lid_tipo_servicio  order by a.fechaingreso, a.HoraIngreso";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'fechahoraingreso' => $read_filas->FechaHoraIngreso,
                    'apellidosnombres' => utf8_encode( $read_filas->ApellidosNombres ),
                    'destino' => utf8_encode( $read_filas->Destino ),
                    'fechaegreso' => utf8_encode( $read_filas->FechaEgreso ),
                    'horaegreso' => utf8_encode( $read_filas->HoraEgreso ),
                    'condicion' => utf8_encode( $read_filas->Condicion ) );
            }
        } else {
            $datos_read[] = array(
                'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }

    // GrabarHabilidadesPorCarrera(

    public

    function LeerAtencionHospitalizacion( $mes, $anio, $id ) {
        $read_sql = "declare @ln_mes int = " . $mes . "
              declare @ln_anio int = " . $anio . "
              declare @lid_empleado int =  " . $id . "
               declare @lid_tipo_servicio int = 3
               select  convert(varchar(10), a.fechaingreso, 103)  + ' -- '  + a.horaingreso as FechaHoraIngreso, b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.PrimerNombre  as ApellidosNombres, case when e.Descripcion is null then '' else  upper(e.Descripcion)  end as  Destino, case when fechaEgreso  is null then '' else    convert(varchar(10), a.FechaEgreso, 103)  end as FechaEgreso, case when a.HoraEgreso is null then '' else a.HoraEgreso end as HoraEgreso, case when FyHInicioI is null then '' else convert(varchar(10), FyHInicioI, 103) end as FechaInicioAtencion, case when FyHInicioI is null then '' else CONVERT(char(8), FyHInicioI, 108) end as HoraInicioAtencion,	 case when FyHFinal is null then '' else convert(varchar(10), FyHFinal, 103) end as FechaFinalAtencion, case when FyHFinal is null then '' else CONVERT(char(8), FyHFinal, 108) end  AS HoraFinalAtencion,  upper(f.Descripcion) as Condicion from [SIGH].[dbo].[Atenciones] a left join [SIGH].[dbo].[Pacientes] b on  a.IdPaciente = b.IdPaciente left join [SIGH].[dbo].[TiposServicio] c on a.IdTipoServicio = c.IdTipoServicio   left join [SIGH].[dbo].[medicos] d on a.IdMedicoIngreso = d.IdMedico  left join [SIGH].[dbo].[TiposDestinoAtencion]  e  on a.IdDestinoAtencion = e.IdDestinoAtencion left join  [SIGH].[dbo].[EstadosAtencion] f on a.idEstadoAtencion = f.IdEstadoAtencion  where month(a.fechaingreso) = @ln_mes  and year(a.fechaingreso) = @ln_anio and d.Idempleado = @lid_empleado  and  c.IdTipoServicio = @lid_tipo_servicio  order by a.fechaingreso, a.HoraIngreso";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'fechahoraingreso' => $read_filas->FechaHoraIngreso,
                    'apellidosnombres' => utf8_encode( $read_filas->ApellidosNombres ),
                    'destino' => utf8_encode( $read_filas->Destino ),
                    'fechaegreso' => utf8_encode( $read_filas->FechaEgreso ),
                    'horaegreso' => utf8_encode( $read_filas->HoraEgreso ),
                    'condicion' => utf8_encode( $read_filas->Condicion ) );
            }
        } else {
            $datos_read[] = array(
                'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function LeerAtencionTratamiento( $mes, $anio, $id ) {
        $read_sql = "declare @ln_mes int = " . $mes . "
              declare @ln_anio int = " . $anio . "
              declare @lid_empleado int =  " . $id . "
                declare @lid_tipo_servicio int = 5
                select  convert(varchar(10), a.fechaingreso, 103)  + ' -- '  + a.horaingreso as FechaHoraIngreso, b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.PrimerNombre  as ApellidosNombres, case when e.Descripcion is null then '' else  upper(e.Descripcion)  end as  Destino, case when fechaEgreso  is null then '' else    convert(varchar(10), a.FechaEgreso, 103)  end as FechaEgreso, case when a.HoraEgreso is null then '' else a.HoraEgreso end as HoraEgreso, case when FyHInicioI is null then '' else convert(varchar(10), FyHInicioI, 103) end as FechaInicioAtencion, case when FyHInicioI is null then '' else CONVERT(char(8), FyHInicioI, 108) end as HoraInicioAtencion,	 case when FyHFinal is null then '' else convert(varchar(10), FyHFinal, 103) end as FechaFinalAtencion, case when FyHFinal is null then '' else CONVERT(char(8), FyHFinal, 108) end  AS HoraFinalAtencion,  upper(f.Descripcion) as Condicion from [SIGH].[dbo].[Atenciones] a left join [SIGH].[dbo].[Pacientes] b on  a.IdPaciente = b.IdPaciente left join [SIGH].[dbo].[TiposServicio] c on a.IdTipoServicio = c.IdTipoServicio   left join [SIGH].[dbo].[medicos] d on a.IdMedicoIngreso = d.IdMedico  left join [SIGH].[dbo].[TiposDestinoAtencion]  e  on a.IdDestinoAtencion = e.IdDestinoAtencion left join  [SIGH].[dbo].[EstadosAtencion] f on a.idEstadoAtencion = f.IdEstadoAtencion  where month(a.fechaingreso) = @ln_mes  and year(a.fechaingreso) = @ln_anio and d.Idempleado = @lid_empleado  and  c.IdTipoServicio = @lid_tipo_servicio  order by a.fechaingreso, a.HoraIngreso";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'fechahoraingreso' => $read_filas->FechaHoraIngreso,
                    'apellidosnombres' => utf8_encode( $read_filas->ApellidosNombres ),
                    'destino' => utf8_encode( $read_filas->Destino ),
                    'fechaegreso' => utf8_encode( $read_filas->FechaEgreso ),
                    'horaegreso' => utf8_encode( $read_filas->HoraEgreso ),
                    'condicion' => utf8_encode( $read_filas->Condicion ) );
            }
        } else {
            $datos_read[] = array(
                'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function LeerCentroQx( $mes, $anio, $id ) {
        $read_sql = "declare @ln_mes int = " . $mes . "
              declare @ln_anio int = " . $anio . "
              declare @ln_id_empleado int =  " . $id . " SELECT idCqxControl, convert(varchar(20), fechaRegistro,103) + ' ' + convert(varchar(8), convert(time(0), fechaRegistro)) as FechaHoraRegistro, a.idCuentaAtencion, (d.ApellidoPaterno + ' ' + d.ApellidoMaterno + ' '  + d.PrimerNombre) as PACIENTE,  a.idEmpleado, UPPER(b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.Nombres) as EMPLEADO, e.Colegiatura, e.rne,   fechaLlegadaCqx, fechaIngresoSala,fechaSalidaSala, convert(int, ((convert(numeric(10,0), DATEDIFF(Minute,fechaIngresoSala,fechaSalidaSala))*60 % (24 * 60 * 60)) % (60 * 60)) / 60) AS DIFERENCIA_MINUTOS_INGRESO_SALA,  fechaInicioAnestesia, fechaTerminoAnestesia, convert(int, ((convert(numeric(10,0), DATEDIFF(Minute,fechaInicioAnestesia, fechaTerminoAnestesia))*60 % (24 * 60 * 60)) % (60 * 60)) / 60) AS DIFERENCIA_MINUTOS_ANESTESIA,     fechaInicioCirugia, fechaTerminoCirugia,  convert(int, ((convert(numeric(10,0), DATEDIFF(Minute,fechaInicioCirugia, fechaTerminoCirugia))*60 % (24 * 60 * 60)) % (60 * 60)) / 60) AS DIFERENCIA_MINUTOS_CIRUGIA, idTipoAnestesia, f.Descripcion as anestecia,   idQuirofano, a.idTipoCirugia, upper(g.descTipoCirugia) as cirugia, descTecnica, hallazgosOperatorios, complicaciones, examenes, descSuspension, case when idEstado = '0' then 'ANULADO' ELSE 'OPERATIVO' END AS ESTADO  FROM [efimedic].[dbo].[cqxControl] A LEFT JOIN 	 [SIGH].[dbo].[Empleados] b on a.idEmpleado = b.IdEmpleado LEFT JOIN [SIGH].[dbo].[Atenciones] C ON A.idCuentaAtencion = c.IdAtencion	 left join [SIGH].[dbo].[Pacientes] D on c.IdPaciente = d.IdPaciente LEFT JOIN [SIGH].[dbo].[Medicos] E ON e.IdEmpleado = b.IdEmpleado left join [SIGH].[dbo].[TiposAnestesia] f on a.idTipoAnestesia = f.IdAnestesia left join [efimedic].[dbo].[cqxTiposCirugia] g on a.idTipoCirugia = g.idTipoCirugia	 where month(fecharegistro) =  @ln_mes  and year(fecharegistro) = @ln_anio AND A.IDEMPLEADO =  @ln_id_empleado order by fechaRegistro";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'fechahoraregistro' => utf8_encode( $read_filas->FechaHoraRegistro ),
                    'paciente' => utf8_encode( $read_filas->PACIENTE ),
                    'cirugia' => utf8_encode( $read_filas->cirugia ),
                    'fecha_ingreso_sala' => date( 'd/m/Y', strtotime( trim( $read_filas->fechaIngresoSala ) ) ),
                    'fecha_salida_sala' => date( 'd/m/Y', strtotime( trim( $read_filas->fechaSalidaSala ) ) ),
                    'condicion' => utf8_encode( $read_filas->ESTADO ) );
            }
        } else {
            $datos_read[] = array(
                'verificar' => '0' );
        }
        return json_encode( $datos_read );


        // fechahoraregistro, paciente, empleado as medico, fechaIngresoSala, fechaSalidaSala, cirugia, estado 



    }



    public

    function BuscarNombresPersonalRRHH( $lc_buscar_personal ) {
        $sentencia = "declare @lc_busqueda varchar(250) = '" . $lc_buscar_personal . "' SELECT IDPERSONAL, case when b.IdEmpleado is null then '' else b.IdEmpleado end as IDEMPLEADO,  A.TIPO_CONTRATO, PLAZA, NRO_CONTRATO, NRO_PROCESO, APELLIDOSNOMBRES, A.FECHANACIMIENTO, A.DNI, RUC, SERVICIO, a.FECHANACIMIENTO as FECHA_NACIMIENTO_RRHH, DATEDIFF(year, A.FECHANACIMIENTO, getdate()) as EDAD,  A.FECHAINGRESO, FECHATERMINOCONTRATO, FECHADESVINCULACION, SUELDOACTUAL,  DIRECCION_DESCRIPCION, CASE WHEN DIRECCION_DISTRITO  IS NULL THEN DIRECCION_DESCRIPCION ELSE DIRECCION_DESCRIPCION + ' - ' + DIRECCION_DISTRITO  + ' - ' + DIRECCION_PROVINCIA + ' - ' + DIRECCION_DEPARTAMENTO END AS DIRECCION_TOTAL, TIPO_PERSONAL, GRUPO_OCUPACIONAL, CARGO, PROFESION, UNIDAD_ORGANICA, ESPECIALIDAD,  CASE WHEN ESTADO = '1'  THEN 'ACTIVO' ELSE 'DESACTIVADO' END AS CONDICION_ESTADO, A.ESTADO_CIVIL, CORREO_ELECTRONICO, HIJOS, TELEFONO_CELULAR, UNIVERSIDAD_INSTITUTO, COLEGIATURA, SEGUNDA_ESPECIALIDAD, UNIVERSIDAD_ESPECIALIDAD, MAESTRIA_DOCTORADO  FROM  [HEVES_RRHH].[dbo].[PERSONAL] A LEFT JOIN [SIGH].[dbo].[Empleados] B ON A.dni = b.dni where apellidosnombres like '%' + @lc_busqueda + '%' or  a.dni like '%' + @lc_busqueda + '%'  or cargo like '%' + @lc_busqueda + '%'   or profesion  like '%' + @lc_busqueda + '%'  or especialidad  like '%' + @lc_busqueda + '%'  ORDER BY APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idpersonal' => $imprimir->IDPERSONAL,
                    'idsigalen' => $imprimir->IDEMPLEADO,
                    'plaza' => trim( $imprimir->PLAZA ),
                    'nro_contrato' => trim( $imprimir->NRO_CONTRATO ),
                    'nro_proceso' => trim( $imprimir->NRO_PROCESO ),
                    'dni' => trim( $imprimir->DNI ),
                    'ruc' => trim( $imprimir->RUC ),
                    'apellidosnombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'grupo_ocupacional' => utf8_encode( trim( $imprimir->GRUPO_OCUPACIONAL ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'especialidad' => utf8_encode( trim( $imprimir->ESPECIALIDAD ) ),
                    'profesional' => utf8_encode( trim( $imprimir->PROFESION ) ),
                    'unidad_organica' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA ) ),
                    'fechaingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAINGRESO ) ) ),
                    'nacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_NACIMIENTO_RRHH ) ) ),
                    'edad' => $imprimir->EDAD,
                    'direccion' => utf8_encode( trim( $imprimir->DIRECCION_TOTAL ) ),
                    'tipo_personal' => utf8_encode( trim( $imprimir->TIPO_PERSONAL ) ),
                    'hijos' => utf8_encode( trim( $imprimir->HIJOS ) ),
                    'estado_civil' => utf8_encode( trim( $imprimir->ESTADO_CIVIL ) ),
                    'correo_electronico' => utf8_encode( trim( $imprimir->CORREO_ELECTRONICO ) ),
                    'telefono' => trim( $imprimir->TELEFONO_CELULAR ),
                    'sueldo' => $imprimir->SUELDOACTUAL,
                    'servicio' => utf8_encode( trim( $imprimir->SERVICIO ) ),
                    'grupo_ocupacional' => utf8_encode( trim( $imprimir->GRUPO_OCUPACIONAL ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'profesion' => utf8_encode( trim( $imprimir->PROFESION ) ),
                    'unidad' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA ) ),
                    'especialidad' => utf8_encode( trim( $imprimir->ESPECIALIDAD ) ),
                    'universidad' => utf8_encode( trim( $imprimir->UNIVERSIDAD_INSTITUTO ) ),
                    'colegiatura' => utf8_encode( trim( $imprimir->COLEGIATURA ) ),
                    'segunda_especialidad' => utf8_encode( trim( $imprimir->SEGUNDA_ESPECIALIDAD ) ),
                    'universidad_especialidad' => utf8_encode( trim( $imprimir->UNIVERSIDAD_ESPECIALIDAD ) ),
                    'maestria_doctorado' => utf8_encode( trim( $imprimir->MAESTRIA_DOCTORADO ) ),
                    'estado' => trim( $imprimir->CONDICION_ESTADO ) );


            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }






    /* INICIO MODELO DE DATOS PERSONAL TERCERO */
    // ListarPersonalTercero
    public

    function ListarPersonalTercero( $id ) {
        $sentencia = "declare @lc_buscar varchar(200) = '" . $id . "'SELECT IDTERCERO, IDPAIS,B.DESCRIPCION AS NOMBRE_PAIS, TIPO_DOCUMENTO,  c.DESCRIPCION  as NOMBRE_DOCUMENTO, NRO_DOCUMENTO, SEXO, case when sexo = 'M' then 'MASCULINO' when sexo = 'F' then 'FEMENINO' ELSE 'NO REGISTRADO' END NOMBRE_SEXO, RUC, APELLIDO_PATERNO, APELLIDO_MATERNO, APELLIDO_CASADA, NOMBRES, APELLIDOSNOMBRES, FECHANACIMIENTO, case when year(FECHANACIMIENTO) = 1900 then '' else convert(varchar(10), fechanacimiento, 103) END as FECHA_NACIMIENTO, CASE WHEN  year(FECHANACIMIENTO) = 1900 then '' else DATEDIFF(YY, fechanacimiento, getdate()) END as EDAD, IDDEPARTAMENTO, CASE WHEN IDDEPARTAMENTO = 0 THEN '' ELSE d.nombre END  as NOMBRE_DEPARTAMENTO, IDPROVINCIA, CASE WHEN IDPROVINCIA = 0 THEN '' ELSE e.nombre END  as NOMBRE_PROVINCIA, IDDISTRITO,  CASE WHEN IDDISTRITO = 0 THEN '' ELSE f.nombre END  as NOMBRE_DISTRITO, DIRECCION, CORREO_ELECTRONICO, TELEFONO_FIJO, CELULAR, CELULAR_EMERGENCIA, OBSERVACION, A.ESTADO, CASE WHEN A.ESTADO = '1' THEN 'PERSONAL TERCERO ACTIVO' WHEN A.ESTADO = '0' THEN 'PERSONAL TERCERO DE BAJA' ELSE 'NO DEFINIDO' END AS NOMBRE_ESTADO, A.USUARIOREGISTRO,  A.FECHAREGISTRO, case when year(A.FECHAREGISTRO) = 1900 then '' else convert(varchar(10), A.FECHAREGISTRO, 103) END as FECHA_REGISTRO, A.USUARIOMODIFICO, A.FECHAMODIFICO, case when year(A.FECHAMODIFICO) = 1900 then '' else convert(varchar(10), A.FECHAMODIFICO, 103) END as FECHA_MODIFICO, USUARIODEBAJA, FECHADEBAJA, case when year(A.FECHADEBAJA) = 1900 then '' else convert(varchar(10), A.FECHADEBAJA, 103) END as FECHA_DEBAJA FROM   [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] A left join  [HEVES_RRHH].[dbo].[T_TIPO_PAISES] B ON A.IDPAIS = B.CODIGO  LEFT JOIN [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO] C ON A.TIPO_DOCUMENTO = C.CODIGO  left join [HEVES_RRHH].[dbo].[LGJ_UBIGEO] D on A.iddepartamento = d.CODDPTO  AND D.codprov = '0' and D.CODDIST = '0'  LEFT JOIN [HEVES_RRHH].[dbo].[LGJ_UBIGEO] E on A.idprovincia = e.CODPROV  AND A.iddepartamento  = E.coddpto  and E.CODDIST = '0'  LEFT JOIN [HEVES_RRHH].[dbo].[LGJ_UBIGEO] F on A.idprovincia = F.CODPROV  AND A.iddepartamento  = F.coddpto  and f.CODDIST = A.IDDISTRITO  where A.estado = '1'   order by APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->IDTERCERO,
                    'idpais' => $imprimir->IDPAIS,
                    'nombre_pais' => utf8_encode( trim( $imprimir->NOMBRE_PAIS ) ),
                    'tipo_documento' => $imprimir->TIPO_DOCUMENTO,
                    'nombre_documento' => $imprimir->NOMBRE_DOCUMENTO,
                    'nro_documento' => $imprimir->NRO_DOCUMENTO,
                    'sexo' => $imprimir->SEXO,
                    'nombre_sexo' => utf8_encode( trim( $imprimir->NOMBRE_SEXO ) ),
                    'ruc' => $imprimir->RUC,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( $imprimir->APELLIDO_MATERNO ),
                    'apellido_casada' => utf8_encode( $imprimir->APELLIDO_CASADA ),
                    'nombres' => utf8_encode( $imprimir->NOMBRES ),
                    'apellidosnombres' => utf8_encode( $imprimir->APELLIDOSNOMBRES ),
                    'nacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHANACIMIENTO ) ) ),
                    'fecha_nacimiento' => utf8_encode( $imprimir->FECHA_NACIMIENTO ),
                    'edad' => $imprimir->EDAD,
                    'iddepartamento' => $imprimir->IDDEPARTAMENTO,
                    'nombre_departamento' => utf8_encode( $imprimir->NOMBRE_DEPARTAMENTO ),
                    'idprovincia' => $imprimir->IDPROVINCIA,
                    'nombre_provincia' => utf8_encode( $imprimir->NOMBRE_PROVINCIA ),
                    'iddistrito' => $imprimir->IDDISTRITO,
                    'nombre_distrito' => utf8_encode( $imprimir->NOMBRE_DISTRITO ),
                    'direccion' => utf8_encode( trim( $imprimir->DIRECCION ) ),
                    'correo_electronico' => utf8_encode( trim( $imprimir->CORREO_ELECTRONICO ) ),
                    'telefono_fijo' => utf8_encode( trim( $imprimir->TELEFONO_FIJO ) ),
                    'celular' => utf8_encode( trim( $imprimir->CELULAR ) ),
                    'celular_emergencia' => utf8_encode( trim( $imprimir->CELULAR_EMERGENCIA ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'estado' => $imprimir->ESTADO,
                    'nombre_estado' => $imprimir->NOMBRE_ESTADO,
                    'usuario' => utf8_encode( trim( $imprimir->USUARIOREGISTRO ) ),
                    'fecha_registro' => utf8_encode( trim( $imprimir->FECHA_REGISTRO ) ),
                    'usuario_modifico' => utf8_encode( trim( $imprimir->USUARIOMODIFICO ) ),
                    'fecha_modifico' => utf8_encode( trim( $imprimir->FECHA_MODIFICO ) ),
                    'usuario_debaja' => utf8_encode( trim( $imprimir->USUARIODEBAJA ) ),
                    'fecha_debaja' => utf8_encode( trim( $imprimir->FECHA_DEBAJA ) )
                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    // VerContratosTerceroFinal

    public

    function ListarPersonalTerceroNuevo( $id ) {

        $sentencia = "declare @lc_buscar varchar(200) = '" . $id . "'SELECT * FROM  [HEVES_RRHH].[dbo].[V_PERSONAL_TERCEROS] where apellidosnombres like '%' + @lc_buscar + '%'   order by APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->IDTERCERO,
                    'idpais' => $imprimir->IDPAIS,
                    'nombre_pais' => utf8_encode( trim( $imprimir->NOMBRE_PAIS ) ),
                    'tipo_documento' => $imprimir->TIPO_DOCUMENTO,
                    'nombre_documento' => $imprimir->NOMBRE_DOCUMENTO,
                    'nro_documento' => $imprimir->NRO_DOCUMENTO,
                    'sexo' => $imprimir->SEXO,
                    'nombre_sexo' => utf8_encode( trim( $imprimir->NOMBRE_SEXO ) ),
                    'ruc' => $imprimir->RUC,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( $imprimir->APELLIDO_MATERNO ),
                    'apellido_casada' => utf8_encode( $imprimir->APELLIDO_CASADA ),
                    'nombres' => utf8_encode( $imprimir->NOMBRES ),
                    'apellidosnombres' => utf8_encode( $imprimir->APELLIDOSNOMBRES ),
                    'nacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHANACIMIENTO ) ) ),
                    'fecha_nacimiento' => utf8_encode( $imprimir->FECHA_NACIMIENTO ),
                    'edad' => $imprimir->EDAD,
                    'iddepartamento' => $imprimir->IDDEPARTAMENTO,
                    'nombre_departamento' => utf8_encode( $imprimir->NOMBRE_DEPARTAMENTO ),
                    'idprovincia' => $imprimir->IDPROVINCIA,
                    'nombre_provincia' => utf8_encode( $imprimir->NOMBRE_PROVINCIA ),
                    'iddistrito' => $imprimir->IDDISTRITO,
                    'nombre_distrito' => utf8_encode( $imprimir->NOMBRE_DISTRITO ),
                    'direccion' => utf8_encode( trim( $imprimir->DIRECCION ) ),
                    'correo_electronico' => utf8_encode( trim( $imprimir->CORREO_ELECTRONICO ) ),
                    'telefono_fijo' => utf8_encode( trim( $imprimir->TELEFONO_FIJO ) ),
                    'celular' => utf8_encode( trim( $imprimir->CELULAR ) ),
                    'celular_emergencia' => utf8_encode( trim( $imprimir->CELULAR_EMERGENCIA ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'estado' => $imprimir->ESTADO,
                    'nombre_estado' => $imprimir->NOMBRE_ESTADO,
                    'usuario' => utf8_encode( trim( $imprimir->USUARIOREGISTRO ) ),
                    'fecha_registro' => utf8_encode( trim( $imprimir->FECHA_REGISTRO ) ),
                    'usuario_modifico' => utf8_encode( trim( $imprimir->USUARIOMODIFICO ) ),
                    'fecha_modifico' => utf8_encode( trim( $imprimir->FECHA_MODIFICO ) ),
                    'usuario_debaja' => utf8_encode( trim( $imprimir->USUARIODEBAJA ) ),
                    'fecha_debaja' => utf8_encode( trim( $imprimir->FECHA_DEBAJA ) ),
                    'fecha_vencimiento_ultimo_contrato' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_VENCIMIENTO_ULTIMO_CONTRATO ) ) )




                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }









    public

    function ListarPersonalTercero_debaja( $estado ) {
        $sentencia = "declare @lc_buscar varchar(200) = '' declare @lc_estado varchar(1) = '" . $estado . "' SELECT IDTERCERO, IDPAIS,B.DESCRIPCION AS NOMBRE_PAIS, TIPO_DOCUMENTO,  c.DESCRIPCION  as NOMBRE_DOCUMENTO, NRO_DOCUMENTO, SEXO, case when sexo = 'M' then 'MASCULINO' when sexo = 'F' then 'FEMENINO' ELSE 'NO REGISTRADO' END NOMBRE_SEXO, RUC, APELLIDO_PATERNO, APELLIDO_MATERNO, APELLIDO_CASADA, NOMBRES, APELLIDOSNOMBRES, FECHANACIMIENTO, case when year(FECHANACIMIENTO) = 1900 then '' else convert(varchar(10), fechanacimiento, 103) END as FECHA_NACIMIENTO,  CASE WHEN  year(FECHANACIMIENTO) = 1900 then '' else DATEDIFF(YY, fechanacimiento, getdate()) END as EDAD, IDDEPARTAMENTO, CASE WHEN IDDEPARTAMENTO = 0 THEN '' ELSE d.nombre END  as NOMBRE_DEPARTAMENTO, IDPROVINCIA, CASE WHEN IDPROVINCIA = 0 THEN '' ELSE e.nombre END  as NOMBRE_PROVINCIA, IDDISTRITO,   CASE WHEN IDDISTRITO = 0 THEN '' ELSE f.nombre END  as NOMBRE_DISTRITO, DIRECCION, CORREO_ELECTRONICO, TELEFONO_FIJO, CELULAR, CELULAR_EMERGENCIA, OBSERVACION, A.ESTADO,    CASE WHEN A.ESTADO = '1' THEN 'PERSONAL TERCERO ACTIVO' WHEN A.ESTADO = '0' THEN 'PERSONAL TERCERO DE BAJA' ELSE 'NO DEFINIDO' END AS NOMBRE_ESTADO, A.USUARIOREGISTRO,  	A.FECHAREGISTRO, case when year(A.FECHAREGISTRO) = 1900 then '' else convert(varchar(10), A.FECHAREGISTRO, 103) END as FECHA_REGISTRO, A.USUARIOMODIFICO, A.FECHAMODIFICO, 	case when year(A.FECHAMODIFICO) = 1900 then '' else convert(varchar(10), A.FECHAMODIFICO, 103) END as FECHA_MODIFICO, USUARIODEBAJA, FECHADEBAJA, case when year(A.FECHADEBAJA) = 1900 then '' else convert(varchar(10), A.FECHADEBAJA, 103) END as FECHA_DEBAJA, FECHA_VENCIMIENTO_ULTIMO_CONTRATO  FROM   [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] A left join  [HEVES_RRHH].[dbo].[T_TIPO_PAISES] B ON A.IDPAIS = B.CODIGO  LEFT JOIN 	[HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO] C ON A.TIPO_DOCUMENTO = C.CODIGO  left join [HEVES_RRHH].[dbo].[LGJ_UBIGEO] D on A.iddepartamento = d.CODDPTO 	 AND D.codprov = '0' and D.CODDIST = '0'  LEFT JOIN [HEVES_RRHH].[dbo].[LGJ_UBIGEO] E on A.idprovincia = e.CODPROV  AND A.iddepartamento  = E.coddpto  and E.CODDIST = '0'   LEFT JOIN [HEVES_RRHH].[dbo].[LGJ_UBIGEO] F on A.idprovincia = F.CODPROV  AND A.iddepartamento  = F.coddpto  and f.CODDIST = A.IDDISTRITO  where   A.estado = @lc_estado   order by APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->IDTERCERO,
                    'idpais' => $imprimir->IDPAIS,
                    'nombre_pais' => utf8_encode( trim( $imprimir->NOMBRE_PAIS ) ),
                    'tipo_documento' => $imprimir->TIPO_DOCUMENTO,
                    'nombre_documento' => $imprimir->NOMBRE_DOCUMENTO,
                    'nro_documento' => $imprimir->NRO_DOCUMENTO,
                    'sexo' => $imprimir->SEXO,
                    'nombre_sexo' => utf8_encode( trim( $imprimir->NOMBRE_SEXO ) ),
                    'ruc' => $imprimir->RUC,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( $imprimir->APELLIDO_MATERNO ),
                    'apellido_casada' => utf8_encode( $imprimir->APELLIDO_CASADA ),
                    'nombres' => utf8_encode( $imprimir->NOMBRES ),
                    'apellidosnombres' => utf8_encode( $imprimir->APELLIDOSNOMBRES ),
                    'nacimiento' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHANACIMIENTO ) ) ),
                    'fecha_nacimiento' => utf8_encode( $imprimir->FECHA_NACIMIENTO ),
                    'edad' => $imprimir->EDAD,
                    'iddepartamento' => $imprimir->IDDEPARTAMENTO,
                    'nombre_departamento' => utf8_encode( $imprimir->NOMBRE_DEPARTAMENTO ),
                    'idprovincia' => $imprimir->IDPROVINCIA,
                    'nombre_provincia' => utf8_encode( $imprimir->NOMBRE_PROVINCIA ),
                    'iddistrito' => $imprimir->IDDISTRITO,
                    'nombre_distrito' => utf8_encode( $imprimir->NOMBRE_DISTRITO ),
                    'direccion' => utf8_encode( trim( $imprimir->DIRECCION ) ),
                    'correo_electronico' => utf8_encode( trim( $imprimir->CORREO_ELECTRONICO ) ),
                    'telefono_fijo' => utf8_encode( trim( $imprimir->TELEFONO_FIJO ) ),
                    'celular' => utf8_encode( trim( $imprimir->CELULAR ) ),
                    'celular_emergencia' => utf8_encode( trim( $imprimir->CELULAR_EMERGENCIA ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'estado' => $imprimir->ESTADO,
                    'nombre_estado' => $imprimir->NOMBRE_ESTADO,
                    'usuario' => utf8_encode( trim( $imprimir->USUARIOREGISTRO ) ),
                    'fecha_registro' => utf8_encode( trim( $imprimir->FECHA_REGISTRO ) ),
                    'usuario_modifico' => utf8_encode( trim( $imprimir->USUARIOMODIFICO ) ),
                    'fecha_modifico' => utf8_encode( trim( $imprimir->FECHA_MODIFICO ) ),
                    'usuario_debaja' => utf8_encode( trim( $imprimir->USUARIODEBAJA ) ),
                    'fecha_debaja' => utf8_encode( trim( $imprimir->FECHA_DEBAJA ) ),
                    'fecha_vencimiento_ultimo_contrato' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_VENCIMIENTO_ULTIMO_CONTRATO ) ) )


                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }



    public

    function VerSiExisteNro( $id ) {
        $sentencia = "SELECT IDTERCERO, APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES, APELLIDOSNOMBRES   FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where NRO_DOCUMENTO = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->IDTERCERO,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $imprimir->APELLIDO_MATERNO ) ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    public

    function GrabarRegistroPersonalTercero( $idpais, $iddocumento, $nro_documento, $sexo, $ruc, $paterno, $materno, $apellido_casada, $nombres, $nacimiento, $id_depar, $id_provin, $id_distrito, $direccion, $correo, $fijo, $celular, $celular_emergencia, $observacion, $usuario ) {
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombres;
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_TERCERO](IDPAIS, TIPO_CONDICION_LABORAL, TIPO_DOCUMENTO, NRO_DOCUMENTO, SEXO, RUC, APELLIDO_PATERNO, APELLIDO_MATERNO, APELLIDO_CASADA, NOMBRES, APELLIDOSNOMBRES, FECHANACIMIENTO, IDDEPARTAMENTO, IDPROVINCIA, IDDISTRITO, DIRECCION, CORREO_ELECTRONICO, TELEFONO_FIJO, CELULAR, CELULAR_EMERGENCIA, OBSERVACION, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO, USUARIODEBAJA, FECHADEBAJA)
        VALUES (" . $idpais . ", 8, " . $iddocumento . ", '" . $nro_documento . "', '" . $sexo . "', '" . $ruc . "', upper('" . $paterno . "'), upper('" . $materno . "'), upper('" . $apellido_casada . "'), upper('" . $nombres . "'), upper('" . $apellidos_nombres . "'), convert(datetime, '" . $nacimiento . "',103), " . $id_depar . ", " . $id_provin . ", " . $id_distrito . ", upper('" . $direccion . "'), '" . $correo . "', '" . $fijo . "', '" . $celular . "', '" . $celular_emergencia . "', upper('" . $observacion . "'), '1', '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function GrabarUpdatePersonalTercero( $idpais, $iddocumento, $nro_documento, $sexo, $ruc, $paterno, $materno, $apellido_casada, $nombres, $nacimiento, $id_depar, $id_provin, $id_distrito, $direccion, $correo, $fijo, $celular, $celular_emergencia, $observacion, $usuario, $id ) {
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombres;
        $update_sql = "declare @lc_fecha varchar(10) = '" . $nacimiento . "'declare @ld_fecha datetime = case when @lc_fecha is null then '' else convert(datetime, @lc_fecha, 103) end
        declare @lc_sexo varchar(10) = '" . $sexo . "'declare @lc_sexo_grabar varchar(1) = case when @lc_sexo is null then '' else @lc_sexo end UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] SET IDPAIS = " . $idpais . ", TIPO_DOCUMENTO = " . $iddocumento . ",  NRO_DOCUMENTO = '" . $nro_documento . "', SEXO = @lc_sexo_grabar,  RUC = '" . $ruc . "',  APELLIDO_PATERNO = upper('" . $paterno . "'), APELLIDO_MATERNO = upper('" . $materno . "'),  APELLIDO_CASADA = upper('" . $apellido_casada . "'),  NOMBRES = upper('" . $nombres . "'), APELLIDOSNOMBRES = upper('" . $apellidos_nombres . "'),  FECHANACIMIENTO =  @ld_fecha, IDDEPARTAMENTO = " . $id_depar . ", IDPROVINCIA = " . $id_provin . ",  IDDISTRITO = " . $id_distrito . ",  DIRECCION = upper('" . $direccion . "'),  CORREO_ELECTRONICO = '" . $correo . "', TELEFONO_FIJO = '" . $fijo . "', CELULAR = '" . $celular . "', CELULAR_EMERGENCIA = '" . $celular_emergencia . "',  OBSERVACION = upper('" . $observacion . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICO = getdate()   WHERE  IDTERCERO = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function ObtenerDatoPersonal( $id ) {
        $sentencia = "SELECT idtercero, APELLIDOSNOMBRES, ESTADO FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where nro_documento = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->idtercero,
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'estado' => $imprimir->ESTADO );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }




    public

    function EliminarPersonalTercero( $usuario, $id ) {
        $dar_de_baja = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] set ESTADO = '0', USUARIODEBAJA = '" . $usuario . "', FECHADEBAJA = getdate() where IDTERCERO = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function HabilitarPersonalTercero( $usuario, $id ) {
        $dar_de_baja = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] set ESTADO = '1', FECHAMODIFICO = getdate(), USUARIOMODIFICO = '" . $usuario . "' where IDTERCERO = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function EstadisticaEmpleadosHabilesDesactivados() {
        $sentencia = "SELECT 'HABILES  ' AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where estado = '1'
        UNION ALL SELECT 'DE BAJA  '  AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where estado = '0'
        UNION ALL SELECT 'TOTAL' AS EMPLEADOS, CONVERT(INT, count(estado))  AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'empleados' => $imprimir->EMPLEADOS,
                    'total' => $imprimir->TOTAL );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }


    public

    function VerContratosTerceroFinal( $id_personal ) {
        $sentencia = "SELECT * FROM [HEVES_RRHH].[dbo].[V_TERCEROS_SERVICIOS]  WHERE IDPERSONAL = " . $id_personal;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idservicio' => $imprimir->IDSERVICIO,
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'tiempo_duracion' => $imprimir->TIEMPO_DURACION,
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'nro_expediente' => trim( $imprimir->NRO_EXPEDIENTE ),
                    'nota_informativa' => utf8_encode( trim( $imprimir->NOTA_INFORMATIVA ) ),
                    'nro_pedido' => trim( $imprimir->NRO_PEDIDO ),
                    'meta_actual_usuaria' => trim( $imprimir->META_ACTUAL_USUARIA ),
                    'meta_actual_certificada' => trim( $imprimir->META_ACTUAL_CERTIFICADA ),
                    'id_fuente_actual_financiamiento' => trim( $imprimir->FUENTE_ACTUAL_FINANCIAMIENTO ),
                    'descripcion_fuente_financiamiento' => utf8_encode( trim( $imprimir->DESCRIPCION_FUENTE_FINANCIAMIENTO ) ),
                    'meta_anterior_certificada' => trim( $imprimir->META_ANTERIOR_CERTIFICADA ),
                    'fuente_anterior_certificada' => trim( $imprimir->FUENTE_ANTERIOR_FINANCIAMIENTO ),
                    'pao' => trim( $imprimir->PAO ),
                    'ccp' => trim( $imprimir->CCP ),
                    'monto_total' => $imprimir->MONTO_TOTAL,
                    'mes1' => $imprimir->MES1,
                    'mes2' => $imprimir->MES2,
                    'mes3' => $imprimir->MES3,
                    'descripcion_servicio' => utf8_encode( trim( $imprimir->DESCRIPCION_SERVICIO ) ),
                    'idcargo' => $imprimir->IDCARGO,
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'condicion_profesion' => utf8_encode( trim( $imprimir->CONDICION_PROFESION ) ),
                    'descripcion_profesion' => utf8_encode( trim( $imprimir->DESCRIPCION_CONDICION_PROFESION ) ),
                    'grupo_ocupacional' => utf8_encode( trim( $imprimir->GRUPO_OCUPACIONAL ) ),
                    'tipo_empleado' => trim( $imprimir->TIPO_EMPLEADO ),
                    'descripcion_tipo_empleado' => utf8_encode( trim( $imprimir->DESCRIPCION_TIPO_EMPLEADO ) ),
                    'id_subcosto_upss' => trim( $imprimir->ID_SUBCOSTO_UPSS ),
                    'descripcion_centro_de_costo' => utf8_encode( trim( $imprimir->DESCRIPCION_CENTRO_DE_COSTO)),
                    'descripcion_centro_subcosto' => utf8_encode( trim( $imprimir->DESCRIPCION_CENTRO_SUBCOSTO)),
                    'descripcion_sub_trascosto' => utf8_encode( trim( $imprimir->DESCRIPCION_SUB_TRASCOSTO)),
                    'unidad_organica' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA)),
                    'organo' => utf8_encode( trim( $imprimir->ORGANO ) ),
                    'idupss' => utf8_encode( trim( $imprimir->ID_UPSS)),
                    'descripcion_upss' => utf8_encode( trim( $imprimir->DESCRIPCION_UPSS)),
                    'idespecialidad' => $imprimir->IDESPECIALIDAD,
                    'nombre_especialidad' => utf8_encode( trim( $imprimir->NOMBRE_ESPECIALIDAD ) ),
                    'colegio' => utf8_encode( trim( $imprimir->COLEGIO ) ),
                    'rne' => trim( $imprimir->NRO_RNE ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'cese_motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ),
                    'cese_idmotivo' => $imprimir->CESE_IDMOTIVO,
                    'cese_fecha' => date( 'd/m/Y', strtotime( trim( $imprimir->CESE_FECHA ) ) ),
                    'cese_monto' => $imprimir->CESE_MONTO_FINAL,
                    'cese_observacion' => utf8_encode( trim( $imprimir->CESE_OBSERVACION ) ),
                    'cese_usuario' => trim( $imprimir->CESE_USUARIO ),
                    'cese_fecharegistro' => utf8_encode( trim( $imprimir->CESE_FECHA_REGISTRO ) ),
                    'mostrar_fecha_de_cese' => utf8_encode( trim( $imprimir->MOSTRAR_FECHA_DE_CESE) ), 
                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }


    public

    function GrabarPersonalTerceroServicios( $idpersonal, $fecha_ingreso, $duracion, $fin_servicio, $expediente, $nota_informativa, $nro_pedido, $meta_actual_usuaria, $meta_actual_certificada, $id_fuente_actual_financiamiento, $meta_anterior, $fuente_anterior, $pao, $ccp, $monto_total, $mes1, $mes2, $mes3, $descripcion_servicio, $idcargo, $condicion_profesion, $tipo_empleado, $id_sub_costo, $idupss, $idespecialidad, $rne, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_SERVICIOS] (IDPERSONAL, FECHA_INICIO, TIEMPO_DURACION, FECHA_FIN, NRO_EXPEDIENTE, NOTA_INFORMATIVA, NRO_PEDIDO, META_ACTUAL_USUARIA, META_ACTUAL_CERTIFICADA,  FUENTE_ACTUAL_FINANCIAMIENTO, META_ANTERIOR_CERTIFICADA, FUENTE_ANTERIOR_FINANCIAMIENTO, PAO, CCP, MONTO_TOTAL, MES1, MES2, MES3, DESCRIPCION_SERVICIO, IDCARGO, CONDICION_PROFESION, TIPO_EMPLEADO, ID_SUBCOSTO_UPSS, ID_UPSS, IDESPECIALIDAD, NRO_RNE, OBSERVACION, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO, CESE_IDMOTIVO, CESE_FECHA, CESE_MONTO_FINAL, CESE_OBSERVACION, CESE_USUARIO, CESE_FECHAREGISTRO)  VALUES (" . $idpersonal . ", convert(datetime, '" . $fecha_ingreso . "', 103), '" . $duracion . "', convert(datetime, '" . $fin_servicio . "', 103), '" . $expediente . "', upper('" . $nota_informativa . "'), '" . $nro_pedido . "', '" . $meta_actual_usuaria . "', '" . $meta_actual_certificada . "', '" . $id_fuente_actual_financiamiento . "', '" . $meta_anterior . "', '" . $fuente_anterior . "', '" . $pao . "', '" . $ccp . "', " . $monto_total . ", " . $mes1 . ", " . $mes2 . ", " . $mes3 . ", upper('" . $descripcion_servicio . "'), '" . $idcargo . "', '" . $condicion_profesion . "', '" . $tipo_empleado . "', '" . $id_sub_costo . "',  '".$idupss."',  '" . $idespecialidad . "', '" . $rne . "', upper('" . $observacion . "'), '" . $usuario . "', getdate(), '', '', '20', convert(datetime, '" . $fin_servicio . "', 103), " . $monto_total . ", '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

    // $idupss,

    public

    function grabar_actualizacion_fecha_ultimo_servicio_tercero( $idpersonal, $fin_servicio ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO]    SET FECHA_VENCIMIENTO_ULTIMO_CONTRATO = convert(datetime, '" . $fin_servicio . "', 103)  WHERE IDTERCERO = " . $idpersonal;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }




    public

    function EliminarContratosServiciosTerceros( $id ) {
        $dar_de_baja = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_SERVICIOS] WHERE IDSERVICIO = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function GrabarModificacionTerceros( $fecha_ingreso, $duracion, $fin_servicio, $expediente, $nota_informativa, $nro_pedido, $meta_actual_usuaria, $meta_actual_certificada, $id_fuente_actual_financiamiento, $pao, $ccp, $monto_total, $mes1, $mes2, $mes3, $descripcion_servicio, $idcargo, $condicion_profesion, $tipo_empleado, $id_sub_costo, $idupss, $idespecialidad, $rne, $observacion, $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_SERVICIOS]  SET FECHA_INICIO = convert(datetime, '" . $fecha_ingreso . "', 103), TIEMPO_DURACION = '" . $duracion . "', FECHA_FIN = convert(datetime, '" . $fin_servicio . "', 103), NRO_EXPEDIENTE = upper('" . $expediente . "'), NOTA_INFORMATIVA = '" . $nota_informativa . "', NRO_PEDIDO = '" . $nro_pedido . "', META_ACTUAL_USUARIA =  '" . $meta_actual_certificada . "',  META_ACTUAL_CERTIFICADA = '" . $meta_actual_certificada . "', FUENTE_ACTUAL_FINANCIAMIENTO = '" . $id_fuente_actual_financiamiento . "', PAO = '" . $pao . "',  CCP = '" . $ccp . "', MONTO_TOTAL = " . $monto_total . ", MES1 = " . $mes1 . ", MES2 = " . $mes2 . ", MES3 = " . $mes3 . ", DESCRIPCION_SERVICIO = upper('" . $descripcion_servicio . "'), IDCARGO = '" . $idcargo . "', CONDICION_PROFESION = '" . $condicion_profesion . "', TIPO_EMPLEADO = '" . $tipo_empleado . "', ID_SUBCOSTO_UPSS = '" . $id_sub_costo . "', ID_UPSS = '" . $idupss . "',   IDESPECIALIDAD =  '" . $idespecialidad . "', NRO_RNE = '" . $rne . "', OBSERVACION = upper('" . $observacion . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICO = getdate() WHERE IDSERVICIO = " . $id;;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function MostrarCarreraPersonalTercero( $id ) {
        $sentencia = "SELECT A.IDCARRERA, A.IDPERSONAL, A.IDPROFESION, B.DESCRIPCION AS CARRERA, A.IDCOLEGIO, C.DESCRIPCION AS DESCRIPCION_COLEGIO,  A.NRO_COLEGIO  FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA] A LEFT JOIN [HEVES_RRHH].[dbo].[T_CARRERA_PROFESION] B ON A.IDPROFESION = B.IDPROFESION LEFT JOIN [HEVES_RRHH].[dbo].[T_COLEGIOS_PROFESIONALES] C ON A.IDCOLEGIO = C.CODIGO  where idpersonal = '" . $id . "' order by b.DESCRIPCION";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idcarrera' => $imprimir->IDCARRERA,
                    'idpersonal' => $imprimir->IDPERSONAL,
                    'idprofesion' => $imprimir->IDPROFESION,
                    'carrera' => utf8_encode( trim( $imprimir->CARRERA ) ),
                    'idcolegio' => $imprimir->IDCOLEGIO,
                    'colegio' => utf8_encode( trim( $imprimir->DESCRIPCION_COLEGIO ) ),
                    'nro_colegio' => utf8_encode( trim( $imprimir->NRO_COLEGIO ) )
                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    public

    function GrabarCarreraPersonalTercero( $idpersonal, $idprofesion, $idcolegio, $nro_colegio, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA] (IDPERSONAL, IDPROFESION, IDCOLEGIO, NRO_COLEGIO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION) VALUES  ( " . $idpersonal . ", " . $idprofesion . ", " . $idcolegio . ", '" . $nro_colegio . "', '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function GrabarModificacionPersonalTercero( $idprofesion, $idcolegio, $nro_colegio, $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA] SET IDPROFESION = " . $idprofesion . ", IDCOLEGIO = " . $idcolegio . ", NRO_COLEGIO = '" . $nro_colegio . "', USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDCARRERA = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminarCarreraDePersonalTercero( $id ) {
        $dar_de_baja = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA] WHERE IDCARRERA = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function VerTodasLasHabilidesPorCarrera( $id ) {
        $sentencia = "SELECT IDHABILIDAD, IDCARRERA, FECHA_INICIO, FECHA_FIN, NRO_HABILIDAD, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION  FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA_HABILIDAD] WHERE IDCARRERA = " . $id;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idhabilidad' => $imprimir->IDHABILIDAD,
                    'idcarrera' => $imprimir->IDCARRERA,
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'nro_habilidad' => trim( $imprimir->NRO_HABILIDAD )
                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }

    // GrabarRegistroPersonalTercero
    public

    function GrabarHabilidadesPorCarrera( $idcarrera, $inicio, $fin, $nro, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA_HABILIDAD] (IDCARRERA, FECHA_INICIO, FECHA_FIN, NRO_HABILIDAD, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION)  VALUES (" . $idcarrera . ", convert(datetime, '" . $inicio . "', 103), convert(datetime, '" . $fin . "', 103), upper('" . $nro . "'), '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function GrabarModificacionHabilidadesPorCarrera( $inicio, $fin, $nro, $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA_HABILIDAD] SET FECHA_INICIO = convert(datetime, '" . $inicio . "', 103),  FECHA_FIN = convert(datetime, '" . $fin . "', 103), NRO_HABILIDAD = upper('" . $nro . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDHABILIDAD = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function EliminarHabilidadProfesional( $id ) {
        $dar_de_baja = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA_HABILIDAD] WHERE IDHABILIDAD = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }




    public

    function VerExistenciaRUC( $id ) {
        $sentencia = "SELECT IDTERCERO, NRO_DOCUMENTO, APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES, APELLIDOSNOMBRES, RUC FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where RUC = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idtercero' => $imprimir->IDTERCERO,
                    'nro_docu' => $imprimir->NRO_DOCUMENTO,
                    'ruc' => $imprimir->RUC,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $imprimir->APELLIDO_MATERNO ) ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    public

    function VerExistenciaCarrera( $idpersonal, $idcarrera ) {
        $sentencia = "select idcarrera from  [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA] where idpersonal = " . $idpersonal . " and idprofesion = " . $idcarrera;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idcarrera' => $imprimir->idcarrera );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }



    public

    function VerSiExisteHabilidad( $idcarrera, $fecha_inicio ) {
        $sentencia = "SELECT idhabilidad   FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_CARRERA_HABILIDAD] where idcarrera = " . $idcarrera . " and FECHA_FIN > convert(datetime, '" . $fecha_inicio . "', 103)";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idhabilidad' => $imprimir->idhabilidad );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }

    public

    function VerUpdateFechas( $id_servicio, $id_personal ) {
        $update_sql = "update [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] set FECHA_VENCIMIENTO_ULTIMO_CONTRATO = (select case when max(fecha_fin) is null then '' else max(fecha_fin) end  from [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_SERVICIOS] WHERE IDSERVICIO = " . $id_servicio . ")  where IDTERCERO = " . $id_personal;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );



    }



    public

    function VerUltimaFechaServicio( $idperso ) {
        $sentencia = "SELECT convert(varchar(10), FECHA_VENCIMIENTO_ULTIMO_CONTRATO, 103) as FECHA_ULTIMA FROM [HEVES_RRHH].[dbo].[PERSONAL_TERCERO] where idtercero = " . $idperso;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'fecha_ultima' => trim( $imprimir->FECHA_ULTIMA ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );



    }








    /* FIN DE MODELO DE DATOS PERSONAL TERCERO */



    public

    function LeerTodosDepartamentos() {
        $sentencia = "select CODDPTO, NOMBRE from [HEVES_RRHH].[dbo].[LGJ_UBIGEO] where   codprov = '0' and CODDIST = '0' order by nombre";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'codigo_departamento' => $imprimir->CODDPTO,
                    'nombre_departamento' => utf8_encode( trim( $imprimir->NOMBRE ) ) );

            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }


    public

    function LeerProvincias( $id ) {
        $sentencia = "select codprov, nombre from [HEVES_RRHH].[dbo].[LGJ_UBIGEO] where   coddpto = '" . $id . "' and CODPROV <> '0' and  CODDIST = '0' order by nombre";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'codigo_provincia' => $imprimir->codprov,
                    'nombre_provincia' => utf8_encode( trim( $imprimir->nombre ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }



    public

    function LeerDistritos( $id_depar, $id_provin ) {

        $sentencia = "select coddist, nombre  from [HEVES_RRHH].[dbo].[LGJ_UBIGEO] where   coddpto = '" . $id_depar . "'  and CODPROV = '" . $id_provin . "' and CODDIST <> '0' order by nombre ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'codigo_distrito' => $imprimir->coddist,
                    'nombre_distrito' => utf8_encode( trim( $imprimir->nombre ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    public

    function LeerRecetasMedicos( $id, $mes, $anio ) {
        $sql = "declare @lid_medico varchar(6) = '" . $id . "' declare @ln_mes int = " . $mes . "  declare @ln_anio int = " . $anio . " SELECT idReceta, IdPuntoCarga, convert(varchar(10), FechaReceta, 103) registro, a.idCuentaAtencion, idServicioReceta, case when a.idEstado = '1' then 'EMITIDO' ELSE 'DESPACHADO' END ESTADO, DocumentoDespacho, idComprobantePago, idMedicoReceta, fechaVigencia, c.apellidopaterno + ' ' + c.ApellidoMaterno + ' ' + c.PrimerNombre as Apellidos_Nombres, d.nombre as servicio   FROM [SIGH].[dbo].[RecetaCabecera] A left join [SIGH].[dbo].[Atenciones] B on a.idCuentaAtencion = b.idatencion left join [SIGH].[dbo].[Pacientes] c    on b.IdPaciente = c.IdPaciente  LEFT JOIN [SIGH].[dbo].[Servicios] d on a.idServicioReceta = d.IdServicio  where idMedicoReceta = @lid_medico and month(fechareceta) = @ln_mes and year(fechareceta) = @ln_anio order by a.FechaReceta, c.ApellidoPaterno, c.ApellidoMaterno";
        $ejecucion_sql = $this->_db->prepare( $sql );
        $ejecucion_sql->execute();
        if ( $ejecucion_sql->rowCount() ) {
            while ( $mostrar = $ejecucion_sql->fetch( PDO::FETCH_OBJ ) ) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'registro' => $mostrar->registro,
                    'paciente' => utf8_encode( trim( $mostrar->Apellidos_Nombres ) ),
                    'servicio' => utf8_encode( trim( $mostrar->servicio ) ),
                    'estado' => utf8_encode( trim( $mostrar->ESTADO ) ) );
            }
        } else {
            $obtenido[] = array( 'verificar' => '0' );
        }
        return json_encode( $obtenido );

    }



    public

    function getListadoPersonalCas( $buscar_por_nombre ) {
        $read_personal = "DECLARE @lc_nombre varchar(200) = '" . $buscar_por_nombre . "'
         SELECT IDPERSONAL, IDPAIS, b.DESCRIPCION AS DESCRIPCION_PAIS,  PLAZA, NRO_CONTRATO, NRO_PROCESO, TIPO_PERSONAL, SEXO, CASE WHEN SEXO = 'M' THEN 'MASCULINO' ELSE 'FEMENINO' END NOMBRE_SEXO, PATERNO, MATERNO, NOMBRE, APELLIDOSNOMBRES, FECHANACIMIENTO, CASE WHEN FECHANACIMIENTO = CONVERT(DATETIME, '1900-01-01', 103) THEN '' ELSE (cast(datediff(dd,FECHANACIMIENTO,GETDATE()) / 365.25 as int)) END AS EDAD, LN_DEPARTAMENTO, LN_PROVINCIA,LN_DISTRITO, TIPO_DOCUMENTO, NRO_TIPO_DOCUMENTO, c.DESCRIPCION as NOMBRE_DOCUMENTO, DNI, RUC, META, IDTIPOSITUACION, IDCARGOFUNCIONAL, IDGRUPO_OCUPACIONAL, GRUPO_OCUPACIONAL, CARGO, SERVICIO, IDPROFESION, PROFESION, IDUPSS,UPSS, IDSERVICIO, IDUNIDADORGANICA, UNIDAD_ORGANICA, IDREGIMENLABORAL, IDREGIMENPENSION, IDTIPOSEGURO, IDFECHAS, FECHAINGRESO, FECHATERMINOCONTRATO, CODHORARIO, IDSUELDO, SUELDOACTUAL, IDFINANCIERA, CUENTA_BANCO, NRO_CCI, DIRECCION_DEPARTAMENTO, DIRECCION_PROVINCIA, DIRECCION_DISTRITO, DIRECCION_DESCRIPCION, DIRECCION_REFERENCIA, ESTADO, A.USUARIOREGISTRO, A.FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA, ESTADO_CIVIL, CARNET_EXTRANJERIA, ESSALUD, GRUPO_SANGUINEO, TELEFONO_FIJO, TELEFONO_CELULAR,  CORREO_ELECTRONICO, HIJOS, FECHADESVINCULACION  FROM [HEVES_RRHH].[dbo].[PERSONAL] A left join [HEVES_RRHH].[dbo].[T_TIPO_PAISES] B on a.idpais = b.codigo left join [HEVES_RRHH].[dbo].[T_TIPO_DOCUMENTO] C on a.TIPO_DOCUMENTO = c.codigo   WHERE APELLIDOSNOMBRES LIKE '%' + @lc_nombre + '%' OR DNI like '%' + @lc_nombre + '%' order by APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->IDPERSONAL,
                    'idpais' => $read->IDPAIS,
                    'nombre_pais' => utf8_encode( $read->DESCRIPCION_PAIS ),
                    'tipo_documento' => utf8_encode( $read->TIPO_DOCUMENTO ),
                    'nombre_documento' => utf8_encode( $read->NOMBRE_DOCUMENTO ),
                    'dni' => $read->DNI,
                    'ruc' => $read->RUC,
                    'essalud' => $read->ESSALUD,
                    'carnet_extranjeria' => $read->CARNET_EXTRANJERIA,
                    'gs' => $read->GRUPO_SANGUINEO,
                    'telefono_fijo' => $read->TELEFONO_FIJO,
                    'telefono_celular' => $read->TELEFONO_CELULAR,
                    'plaza' => utf8_encode( $read->PLAZA ),
                    'nro_contrato' => utf8_encode( $read->NRO_CONTRATO ),
                    'nro_proceso' => utf8_encode( $read->NRO_PROCESO ),
                    'tipo_personal' => utf8_encode( $read->TIPO_PERSONAL ),
                    'sexo' => utf8_encode( $read->SEXO ),
                    'nombre_sexo' => utf8_encode( $read->NOMBRE_SEXO ),
                    'paterno' => utf8_encode( $read->PATERNO ),
                    'materno' => utf8_encode( $read->MATERNO ),
                    'nombre' => utf8_encode( $read->NOMBRE ),
                    'correo' => utf8_encode( $read->CORREO_ELECTRONICO ),
                    'hijos' => utf8_encode( $read->HIJOS ),
                    'apellidos_nombres' => utf8_encode( $read->APELLIDOSNOMBRES ),
                    'estado_civil' => utf8_encode( $read->ESTADO_CIVIL ),
                    'direccion' => utf8_encode( $read->DIRECCION_DESCRIPCION ),
                    'direccion_distrito' => utf8_encode( $read->DIRECCION_DISTRITO ),
                    'direccion_provincia' => utf8_encode( $read->DIRECCION_PROVINCIA ),
                    'direccion_departamento' => utf8_encode( $read->DIRECCION_DEPARTAMENTO ),
                    'sueldo' => $read->SUELDOACTUAL,
                    'cargo' => utf8_encode( $read->CARGO ),
                    'fecha_nacimiento' => date( 'd/m/Y', strtotime( trim( $read->FECHANACIMIENTO ) ) ),
                    'fecha_ingreso' => date( 'd/m/Y', strtotime( trim( $read->FECHAINGRESO ) ) ),
                    'fecha_termino' => date( 'd/m/Y', strtotime( trim( $read->FECHATERMINOCONTRATO ) ) ),
                    'fecha_desvinculacion' => date( 'd/m/Y', strtotime( trim( $read->FECHADESVINCULACION ) ) ),
                    'edad' => $read->EDAD );
            }
        } else {
            $datos_read[] = array( 'encontro' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function ListarUnidadOrganica() {
        $read_servicio = "SELECT A.IDUNIDADORGANICA, A.DESCRIPCION as UNIDAD_ORGANICA,  B.IDORGANO, B.DESCRIPCION AS ORGANO   FROM [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] A LEFT JOIN [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] B ON A.IDORGANO = B.IDORGANO ORDER BY A.DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $read_servicio );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idunidadorganica' => trim( $read->IDUNIDADORGANICA ),
                    'unidad_organica' => utf8_encode( trim( $read->UNIDAD_ORGANICA ) ),
                    'idorgano' => trim( $read->IDORGANO ),
                    'organo' => utf8_encode( trim( $read->ORGANO ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function ListarCentroCostoConUnidadOrganica() {
        $read_servicio = "SELECT IDCCUO, CODIGO_CENTRO_COSTO, DESCRIPCION_CENTRO_DE_COSTO, SUB_CODIGO_CENTRO_COSTO, DESCRIPCION_CENTRO_SUBCOSTO, SUB_TRASCODIGO_CENTRO_COSTO, DESCRIPCION_SUB_TRASCOSTO, DESCRIPCION_CC, CODIGO_UNIDAD_ORGANICA, IDUNIDADORGANICA, UNIDAD_ORGANICA, IDORGANO, ORGANO   FROM [HEVES_RRHH].[dbo].[V_CENTRO_COSTO_UNIDAD_ORGANICA] ORDER BY DESCRIPCION_CC";
        $ejecucion_read = $this->_db->prepare( $read_servicio );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idccuo' => $read->IDCCUO,
                    'codigo_centro_costo' => utf8_encode( trim( $read->CODIGO_CENTRO_COSTO)),
                    'descripcion_centro_costo' => utf8_encode( trim( $read->DESCRIPCION_CENTRO_DE_COSTO)),
                    'sub_codigo_centro_costo' => utf8_encode( trim( $read->SUB_CODIGO_CENTRO_COSTO)),
                    'descripcion_centro_subcosto' => utf8_encode( trim( $read->DESCRIPCION_CENTRO_SUBCOSTO)),
                    'sub_trascodigo_centro_costo' => utf8_encode( trim( $read->SUB_TRASCODIGO_CENTRO_COSTO)),
                    'descripcion_sub_trascosto' => utf8_encode( trim( $read->DESCRIPCION_SUB_TRASCOSTO)),
                    'descripcion_total' => utf8_encode( trim( $read->DESCRIPCION_CC)),
                    'codigo_unidad_organica' => utf8_encode( trim( $read->CODIGO_UNIDAD_ORGANICA)),
                    'unidad_organica' => utf8_encode( trim( $read->UNIDAD_ORGANICA)),
                    'idorganio' => utf8_encode( trim( $read->IDORGANO)),
                    'organo' => utf8_encode( trim( $read->ORGANO)));
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }

    
        
    
    
    
    
    // VerContratosTerceroFinal( $id_personal )
    
    
    
    public

    function ListarUnidadOrganica_centro_costo() {
        $read_servicio = "SELECT ID_V_UPSS, CENTRO_COSTO, CENTRO_SUBCOSTO,  CENTRO_TRASCOSTO, CENTRO_SUBCOSTO_TRASCOSTO  FROM [HEVES_RRHH].[dbo].[V_UPSS]";
        $ejecucion_read = $this->_db->prepare( $read_servicio );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id_upss' => $read->ID_V_UPSS,
                    'centro_costo' => utf8_encode( trim( $read->CENTRO_COSTO ) ),
                    'centro_subcosto' => utf8_encode( trim( $read->CENTRO_SUBCOSTO ) ),
                    'centro_trascosto' => utf8_encode( trim( $read->CENTRO_TRASCOSTO ) ),
                    'centro_subcosto_trascosto' => utf8_encode( trim( $read->CENTRO_SUBCOSTO_TRASCOSTO ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }
    
    
    
    
    public function ListarCentroCostoSubCosto(){
        $read_servicio = "SELECT ID_V_UPSS, IDCENTROCOSTO, CODIGO_CENTRO_COSTO, CENTRO_COSTO, CODIGO_SUBCOSTO, CENTRO_SUBCOSTO, CODIGO_SUBTRASCOSTO, CENTRO_TRASCOSTO, CENTRO_SUBCOSTO_TRASCOSTO   FROM [HEVES_RRHH].[dbo].[CENTRO_COSTO_SUB_COSTO]";
        $ejecucion_read = $this->_db->prepare( $read_servicio );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id_upss' => $read->ID_V_UPSS,
                    'centro_costo' => utf8_encode( trim( $read->CENTRO_COSTO ) ),
                    'centro_subcosto' => utf8_encode( trim( $read->CENTRO_SUBCOSTO ) ),
                    'centro_trascosto' => utf8_encode( trim( $read->CENTRO_TRASCOSTO ) ),
                    'centro_subcosto_trascosto' => utf8_encode( trim( $read->CENTRO_SUBCOSTO_TRASCOSTO ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

        
        
        
    }
    
    
    
        
    
    
    
    
    // ListarCentroCostoConUnidadOrganica()
    
    

    public

    function getListarUniversidad() {
        $read_sql = "SELECT IDUNIVERIDAD, NOMBRE, GESTION, SITUACION, REGION, DIRECCION, WEB, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA  FROM [HEVES_RRHH].[dbo].[LGJ_UNIVERSIDADES] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read_field->IDUNIVERIDAD,
                    'nombre' => utf8_encode( trim( $read_field->NOMBRE ) ),
                    'gestion' => utf8_encode( trim( $read_field->GESTION ) ),
                    'situacion' => utf8_encode( trim( $read_field->SITUACION ) ),
                    'region' => utf8_encode( trim( $read_field->REGION ) ),
                    'direccion' => utf8_encode( trim( $read_field->DIRECCION ) ),
                    'web' => utf8_encode( trim( $read_field->WEB ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }



    public

    function ObtenerContratosPersonal( $id ) {
        $read_sql = " SELECT IDCONTRATO, IDPERSONAL, NRO_CONTRATO, NRO_PROCESO, RUC, SUELDO, CASE WHEN FECHAINGRESO IS NULL THEN '' ELSE CONVERT(VARCHAR(10), FECHAINGRESO, 103) END AS FECHA_INGRESO, CASE WHEN FECHATERMINOCONTRATO IS NULL THEN '' ELSE CONVERT(VARCHAR(10), FECHATERMINOCONTRATO, 103) END AS FECHA_TERMINO_CONTRATO, CASE WHEN FECHA_DESVINCULACION  IS NULL THEN '' ELSE CONVERT(VARCHAR(10), FECHA_DESVINCULACION , 103) END AS FECHA_DESVINCULACION FROM [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS]  WHERE IDPERSONAL = " . $id;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read_field->IDCONTRATO,
                    'nro_contrato' => utf8_encode( trim( $read_field->NRO_CONTRATO ) ),
                    'nro_proceso' => utf8_encode( trim( $read_field->NRO_PROCESO ) ),
                    'fecha_ingreso' => utf8_encode( trim( $read_field->FECHA_INGRESO ) ),
                    'ruc' => utf8_encode( trim( $read_field->RUC ) ),
                    'sueldo' => utf8_encode( trim( $read_field->SUELDO ) ),
                    'fecha_termino' => utf8_encode( trim( $read_field->FECHA_TERMINO_CONTRATO ) ),
                    'fecha_desvinculacion' => utf8_encode( trim( $read_field->FECHA_DESVINCULACION ) ),
                );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function ObtenerAdendasDeUnContrato( $id ) {
        $read_sql = "SELECT IDADENDAS, IDCONTRATOS, NRO_ADENDA, NRO_CONTRATO, NRO_ADENDA_CONTRATO, FECHA_INICIO, FECHA_FIN, CASE WHEN ESTADO_ADENDA = 'V' THEN 'VIGENTE' ELSE '' END AS ESTADO, FECHA_DESVINCULACION FROM [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS_ADENDAS]  where IDCONTRATOS = " . $id;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read_field->IDADENDAS,
                    'idcontrato' => $read_field->IDCONTRATOS,
                    'nro_adenda' => $read_field->NRO_ADENDA,
                    'nro_contrato' => utf8_encode( trim( $read_field->NRO_CONTRATO ) ),
                    'nro_adenda_contrato' => utf8_encode( trim( $read_field->NRO_ADENDA_CONTRATO ) ),
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $read_field->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $read_field->FECHA_FIN ) ) ),
                    'fecha_desvinculacion' => date( 'd/m/Y', strtotime( trim( $read_field->FECHA_DESVINCULACION ) ) ),
                    'estado' => utf8_encode( trim( $read_field->ESTADO ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }



    /* personal juridicos */
    public

    function ObtenerListadoJuridicos( $id ) {
        $read_sql = "declare @lc_buscar varchar(200) = '" . $id . "'SELECT IDJURIDICAS, RUC, RAZON_SOCIAL, REPRESENTANTE_LEGAL, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION, CASE WHEN year(FECHAMODIFICACION) = 1900 THEN '' ELSE CONVERT(VARCHAR(10), FECHAMODIFICACION, 103) END AS FECHA_MODIFICACION, USUARIODEBAJA, FECHADEBAJA, CASE WHEN year(FECHADEBAJA) = 1900 THEN '' ELSE CONVERT(VARCHAR(10), FECHADEBAJA, 103) END AS FECHA_DEBAJA FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS]  WHERE RUC like '%' + @lc_buscar + '%'  or RAZON_SOCIAL like  '%' + @lc_buscar + '%' order by razon_social";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idjuridicos' => $read_field->IDJURIDICAS,
                    'ruc' => $read_field->RUC,
                    'razon_social' => utf8_encode( trim( $read_field->RAZON_SOCIAL ) ),
                    'representante_legal' => utf8_encode( trim( $read_field->REPRESENTANTE_LEGAL ) ),
                    'estado' => $read_field->ESTADO,
                    'usuarioregistro' => $read_field->USUARIOREGISTRO,
                    'fecharegistro' => date( 'd/m/Y', strtotime( trim( $read_field->FECHAREGISTRO ) ) ),
                    'usuariomodifico' => $read_field->USUARIOMODIFICACION,
                    'fecha_modificacion' => trim( $read_field->FECHA_MODIFICACION ),
                    'usuariodebaja' => $read_field->USUARIODEBAJA,
                    'fecha_debaja' => trim( $read_field->FECHA_DEBAJA )
                );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }
    // GrabarEmpleadosdeJuridicos

    public

    function ObtenerListadoJuridicosDeBaja( $estado ) {
        $read_sql = "declare @lc_estado varchar(2) = '" . $estado . "' SELECT IDJURIDICAS, RUC, RAZON_SOCIAL, REPRESENTANTE_LEGAL, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION, CASE WHEN year(FECHAMODIFICACION) = 1900 THEN '' ELSE CONVERT(VARCHAR(10), FECHAMODIFICACION, 103) END AS FECHA_MODIFICACION, USUARIODEBAJA, FECHADEBAJA, CASE WHEN year(FECHADEBAJA) = 1900 THEN '' ELSE CONVERT(VARCHAR(10), FECHADEBAJA, 103) END AS FECHA_DEBAJA FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS] WHERE ESTADO = @lc_estado  order by razon_social";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idjuridicos' => $read_field->IDJURIDICAS,
                    'ruc' => $read_field->RUC,
                    'razon_social' => utf8_encode( trim( $read_field->RAZON_SOCIAL ) ),
                    'representante_legal' => utf8_encode( trim( $read_field->REPRESENTANTE_LEGAL ) ),
                    'estado' => $read_field->ESTADO,
                    'usuarioregistro' => $read_field->USUARIOREGISTRO,
                    'fecharegistro' => date( 'd/m/Y', strtotime( trim( $read_field->FECHAREGISTRO ) ) ),
                    'usuariomodifico' => $read_field->USUARIOMODIFICACION,
                    'fecha_modificacion' => trim( $read_field->FECHA_MODIFICACION ),
                    'usuariodebaja' => $read_field->USUARIODEBAJA,
                    'fecha_debaja' => trim( $read_field->FECHA_DEBAJA )
                );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );


    }

    // GrabarPersonalJuridico( $ruc, $razon, $representante_legal, $usuario )
    public

    function GrabarPersonalJuridico( $ruc, $razon, $representante_legal, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS](RUC, RAZON_SOCIAL, REPRESENTANTE_LEGAL, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICACION, FECHAMODIFICACION, USUARIODEBAJA, FECHADEBAJA) VALUES('" . $ruc . "', upper('" . $razon . "'), upper('" . $representante_legal . "'),  '1', '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }



    public

    function GrabarPersonalJuridicoModificacion( $ruc, $razon, $representante_legal, $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS]  SET RUC = '" . $ruc . "', RAZON_SOCIAL = upper('" . $razon . "'), REPRESENTANTE_LEGAL = upper('" . $representante_legal . "'),  USUARIOMODIFICACION = '" . $usuario . "', FECHAMODIFICACION = getdate()  WHERE IDJURIDICAS = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function DardeBajaPersonasJuridicas( $usuario, $id ) {
        $dar_de_baja = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS]  SET ESTADO = '0', USUARIODEBAJA = '" . $usuario . "', FECHADEBAJA = getdate() WHERE IDJURIDICAS = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function DarHabilitacionPersonasJuridicas( $usuario, $id ) {
        $dar_de_baja = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS]  SET ESTADO = '1', USUARIOMODIFICACION = '" . $usuario . "',  FECHAMODIFICACION = getdate()  WHERE IDJURIDICAS = " . $id;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EstadisticaJuridicosHabiles() {
        $sentencia = "SELECT 'HABILES  ' AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS] where estado = '1' UNION ALL SELECT 'DE BAJA  '  AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS] where estado = '0' UNION ALL SELECT 'TOTAL' AS EMPLEADOS, CONVERT(INT, count(estado))  AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'empleados' => $imprimir->EMPLEADOS,
                    'total' => $imprimir->TOTAL );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );



    }




    /* fin de personal juridicos */



    /* inicio de contratos por servicios juridicos */







    public

    function ObtenerContratosdeJuridicos( $ruc ) {
        $sentencia = "SELECT * FROM [HEVES_RRHH].[dbo].[V_PERSONAL_JURIDICOS_SERVICIOS] where  ruc = '" . $ruc . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idjuridico' => $imprimir->IDJURIDICOSSERVICIOS,
                    'idjuridico_empresa' => $imprimir->IDJURIDICOS,
                    'ruc' => trim( $imprimir->RUC ),
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'nota_informativa' => utf8_encode( trim( $imprimir->NOTA_INFORMATIVA ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    
                    'idunidad' => $imprimir->IDUNIDADORGANICA,
                    'unidad_organica' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA ) ),
                    'organo' => utf8_encode( trim($imprimir->ORGANO)),
                    'descripcion_centro_costo' => utf8_encode( trim( $imprimir->DESCRIPCION_CENTRO_DE_COSTO ) ),
                    
                    'nro_expediente' => utf8_encode( trim( $imprimir->NRO_EXPEDIENTE ) ),
                    'meta_actual' => trim( $imprimir->META_ACTUAL ),
                    'meta_anterior' => trim( $imprimir->META_ANTERIOR ),
                    'meta_siga' => trim( $imprimir->META_SIGA ),
                    'pao' => trim( $imprimir->PAO ),
                    'ccp' => trim( $imprimir->CCP ),
                    'cantidad_medicos' => $imprimir->CANTIDAD_MEDICOS,
                    'cantidad_horas' => $imprimir->CANTIDAD_HORAS,
                    'tipo_distribucion' => $imprimir->TIPO_DISTRIBUCION_MESES,
                    'mes1' => $imprimir->MES1,
                    'mes2' => $imprimir->MES2,
                    'monto_total' => $imprimir->MONTO_TOTAL,
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'cese_motivo' => utf8_encode( trim( $imprimir->MOTIVO ) ),
                    'cese_idmotivo' => $imprimir->CESE_IDMOTIVO,
                    'cese_fecha' => date( 'd/m/Y', strtotime( trim( $imprimir->CESE_FECHA ) ) ),
                    'cese_monto' => $imprimir->CESE_MONTO_FINAL,
                    'cese_observacion' => utf8_encode( trim( $imprimir->CESE_OBSERVACION ) ),
                    'cese_usuario' => trim( $imprimir->CESE_USUARIO ),
                    'cese_fecharegistro' => utf8_encode( trim( $imprimir->CESE_FECHA_REGISTRO ) )


                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    // grabar_contratos_de_juridicos_modificacion

    public

    function GrabarContratosServiciosJuridicos( $idjuridico, $ruc, $fecha_inicio, $fecha_fin, $nota_informativa, $nro_expediente, $cargo, $idunidad, $meta_actual, $meta_anterior, $meta_siga, $pao, $ccp, $cantidad_medicos, $cantidad_horas, $mes1, $mes2, $monto_total, $distribucion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_SERVICIOS] (IDJURIDICOS, RUC, FECHA_INICIO, FECHA_FIN, NOTA_INFORMATIVA, NRO_EXPEDIENTE, CARGO, IDUNIDADORGANICA, META_ACTUAL, META_ANTERIOR, META_SIGA, PAO, CCP, CANTIDAD_MEDICOS, CANTIDAD_HORAS, MES1, MES2, TIPO_DISTRIBUCION_MESES, MONTO_TOTAL, OBSERVACION, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, CESE_IDMOTIVO, CESE_FECHA, CESE_MONTO_FINAL, CESE_OBSERVACION, CESE_USUARIO, CESE_FECHAREGISTRO)  values (" . $idjuridico . ", '" . $ruc . "', convert(datetime, '" . $fecha_inicio . "',103), convert(datetime, '" . $fecha_fin . "',103), upper('" . $nota_informativa . "'), '" . $nro_expediente . "', upper('" . $cargo . "'),  '" . $idunidad . "',  '" . $meta_anterior . "', '" . $meta_actual . "',  '" . $meta_siga . "', '" . $pao . "', '" . $ccp . "', " . $cantidad_medicos . ", " . $cantidad_horas . ", " . $mes1 . ", " . $mes2 . ",  '" . $distribucion . "', " . $monto_total . ", upper('" . $observacion . "'), '" . $usuario . "', getdate(), '', '', '20', convert(datetime, '" . $fecha_fin . "',103)," . $monto_total . ",'', '','')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }




    public

    function GrabarContratosServiciosJuridicosModificacion( $idjuridico, $ruc, $fecha_inicio, $fecha_fin, $nota_informativa, $nro_expediente, $cargo, $idunidad, $meta_actual, $meta_anterior, $meta_siga, $pao, $ccp, $cantidad_medicos, $cantidad_horas, $mes1, $mes2, $monto_total, $distribucion, $observacion, $usuario, $idjuridicos_Servicios ) {

        $update_sql = "UPDATE [dbo].[PERSONAL_JURIDICOS_SERVICIOS]   SET FECHA_INICIO = convert(datetime, '" . $fecha_inicio . "',103 ), FECHA_FIN = convert(datetime, '" . $fecha_fin . "',103 ),  NOTA_INFORMATIVA = upper('" . $nota_informativa . "'),    NRO_EXPEDIENTE = '" . $nro_expediente . "',  CARGO = upper('" . $cargo . "'),     IDUNIDADORGANICA = '" . $idunidad . "',   META_ACTUAL = '" . $meta_actual . "', META_ANTERIOR = '" . $meta_anterior . "',  META_SIGA = '" . $meta_siga . "',  PAO = '" . $pao . "',  CCP = '" . $ccp . "',   CANTIDAD_MEDICOS = " . $cantidad_medicos . ", CANTIDAD_HORAS = " . $cantidad_horas . ",   MES1 = " . $mes1 . ",   MES2 = " . $mes1 . ",  TIPO_DISTRIBUCION_MESES = '" . $distribucion . "',   MONTO_TOTAL = " . $monto_total . ",   OBSERVACION = upper('" . $observacion . "'),   USUARIOMODIFICO = '" . $usuario . "',  FECHAMODIFICACION = getdate()  WHERE IDJURIDICOSSERVICIOS = " . $idjuridicos_Servicios;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function EliminarContratosPorJuridicos( $idjuridicos_servicios ) {
        $dar_de_baja = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_SERVICIOS] WHERE IDJURIDICOSSERVICIOS = " . $idjuridicos_servicios;
        $ejecucion = $this->_db->prepare( $dar_de_baja );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function ValidarNotaInformativaRegistrada( $nota ) {
        $sentencia = "SELECT IDJURIDICOSSERVICIOS, IDJURIDICOS, RUC, FECHA_INICIO, FECHA_FIN, NOTA_INFORMATIVA, NRO_EXPEDIENTE FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_SERVICIOS]  where NOTA_INFORMATIVA  like '%' + upper('" . utf8_encode( $nota ) . "')  + '%'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idjuridicoservicios' => $imprimir->IDJURIDICOSSERVICIOS );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );



    }






    /**  Inicio de modelo de empleados de empresa juridica */
// GrabarEmpleadosdeEmpresaJuridicos( $idjuridicoservicio, $ruc_servicios, $dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $observacion, $idunidad_organica, $usuario )

    public

    function GrabarEmpleadosdeEmpresaJuridicos($idjuridicoservicio, $ruc_servicios, $dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $observacion, $idunidad_organica, $usuario) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_EMPLEADOS] (IDJURIDICOSSERVICIOS, RUC, DNI_EMPLEADO, APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES, APELLIDOS_NOMBRES, IDCARGO, TIPO_EMPLEADO, OBSERVACION, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, IDUNIDAD_ORGANICA)  VALUES ('" . $idjuridicoservicio . "', '" . $ruc_servicios . "', '" . $dni . "', upper('" . $paterno . "'), upper('" . $materno . "'), upper('" . $nombres . "'), upper('" . $apellidos_nombres . "'), '" . $idcargo . "', '" . $tipo_labor . "', upper('" . $observacion . "'), '1', '" . $usuario . "', getdate(), '', '', ".$idunidad_organica.")";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }



    public

    function EmpleadosPorContratoJuridico( $idjuridicosservicios ) {
      $sentencia = "SELECT IDEMPLEADOSJURIDICOS, IDJURIDICOSSERVICIOS, RUC, DNI_EMPLEADO, APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES, APELLIDOS_NOMBRES, A.IDCARGO, b.DESCRIPCION as CARGO, C.DESCRIPCION AS GRUPO_OCUPACION, TIPO_EMPLEADO, A.IDUNIDAD_ORGANICA, D.UNIDAD_ORGANICA, D.DESCRIPCION_CENTRO_DE_COSTO, D.ORGANO, OBSERVACION, ESTADO, A.USUARIOREGISTRO, A.FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_EMPLEADOS] A left join [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL_CARGO] B on a.IDCARGO = b.IDCARGO LEFT JOIN  [HEVES_RRHH].[dbo].[T_GRUPO_OCUPACIONAL] C ON B.IDGRUPO_OCUPACIONAL = C.IDGRUPO left join [HEVES_RRHH].[dbo].[V_CENTRO_COSTO_UNIDAD_ORGANICA] D ON A.IDUNIDAD_ORGANICA = D.IDCCUO WHERE IDJURIDICOSSERVICIOS = " . $idjuridicosservicios . " ORDER BY APELLIDOS_NOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idjuridicoempleado' => $imprimir->IDEMPLEADOSJURIDICOS,
                    'ruc' => trim( $imprimir->RUC ),
                    'dni' => trim( $imprimir->DNI_EMPLEADO ),
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $imprimir->APELLIDO_MATERNO ) ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES ) ),
                    'idcargo' => trim( $imprimir->IDCARGO ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'grupo_ocupacion' => utf8_encode( trim( $imprimir->GRUPO_OCUPACION ) ),
                    'tipo_empleado' => utf8_encode( trim( $imprimir->TIPO_EMPLEADO ) ),
                    'idunidad_organica' => $imprimir->IDUNIDAD_ORGANICA,
                    'unidad_organica' => utf8_encode( trim( $imprimir->UNIDAD_ORGANICA) ),
                    'organo' => utf8_encode( trim( $imprimir->ORGANO) ),
                    'descripcion_centro_costo' => utf8_encode( trim( $imprimir->DESCRIPCION_CENTRO_DE_COSTO) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'estado' => utf8_encode( trim( $imprimir->ESTADO ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }


    public

    function ModificarEmpleadosJuridicos( $dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $idunidad_organica, $observacion, $usuario, $id_juridico_servicios ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_EMPLEADOS]  set DNI_EMPLEADO = '" . $dni . "', APELLIDO_PATERNO = upper('" . $paterno . "'), APELLIDO_MATERNO = upper('" . $materno . "'), NOMBRES = upper('" . $nombres . "'), APELLIDOS_NOMBRES = upper('" . $apellidos_nombres . "'), IDCARGO = '" . $idcargo . "', TIPO_EMPLEADO = '" . $tipo_labor . "', IDUNIDAD_ORGANICA = ".$idunidad_organica.", OBSERVACION = upper('" . $observacion . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate() WHERE IDEMPLEADOSJURIDICOS = " . $id_juridico_servicios;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    
     
    

    public

    function DeleteEmpleadoJuridico( $id_juridico_empleado_servicios ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_EMPLEADOS] WHERE IDEMPLEADOSJURIDICOS = " . $id_juridico_empleado_servicios;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function DeleteTodosEmpleadoJuridico( $id_juridico_servicios ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_EMPLEADOS]  WHERE IDJURIDICOSSERVICIOS = " . $id_juridico_servicios;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    /**  Fin de modelo de empleados de empresa juridica */

    // VerContratosTerceroFinal( $id_personal )
    /* registro de cese */
    public

    function Grabar_RegistroCese( $id_motivo, $fecha_cese, $monto_cese, $observacion_cese, $usuario, $id_servicio ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_TERCERO_SERVICIOS]  SET CESE_IDMOTIVO = '" . $id_motivo . "', CESE_FECHA = convert(datetime, '" . $fecha_cese . "', 103),  CESE_MONTO_FINAL = " . $monto_cese . ", CESE_OBSERVACION = upper('" . $observacion_cese . "'), CESE_USUARIO = '" . $usuario . "', CESE_FECHAREGISTRO = GETDATE()  WHERE  IDSERVICIO = " . $id_servicio . "";
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    /* fin de cese */


    /**  Cese juridico */
    public

    function Grabar_RegistroCeseJuridico( $id_motivo, $fecha_cese, $monto_cese, $observacion_cese, $usuario, $id_servicio ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_JURIDICOS_SERVICIOS]  SET CESE_IDMOTIVO = '" . $id_motivo . "', CESE_FECHA = convert(datetime, '" . $fecha_cese . "', 103),  CESE_MONTO_FINAL = " . $monto_cese . ", CESE_OBSERVACION = upper('" . $observacion_cese . "'), CESE_USUARIO = '" . $usuario . "', CESE_FECHAREGISTRO = GETDATE()  WHERE  IDJURIDICOSSERVICIOS = " . $id_servicio . "";
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    /*
    GrabarEmpleadosdeEmpresaJuridicos( $idjuridicoservicio, $ruc_servicios, $dni, $paterno, $materno, $nombres, $apellidos_nombres, $idcargo, $tipo_labor, $observacion, $idunidad_organica, $usuario );
    
    */

    
    /*
    
    GrabarContratosServiciosJuridicos( $idjuridico, $ruc, $fecha_inicio, $fecha_fin, $nota_informativa, $nro_expediente, $cargo, $idunidad, $meta_actual, $meta_anterior, $meta_siga, $pao, $ccp, $cantidad_medicos, $cantidad_horas, $mes1, $mes2, $monto_total, $distribucion, $observacion, $usuario );
    
    */
    

    /* fin de cese juridico */







    /* fin de contratos por servicios juridicos */




}
?>