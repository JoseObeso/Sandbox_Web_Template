<?php
class reportesModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }


    public

    function LeerReporteCentroQX( $mes, $anio ) {
        $sentencia = "declare @ln_mes int = " . $mes . "
        declare @ln_anio int = " . $anio . "SELECT idCqxControl, convert(varchar(20), fechaRegistro,103) + ' ' + convert(varchar(8), convert(time(0), fechaRegistro)) as FechaHoraRegistro, a.idCuentaAtencion, case when d.ApellidoPaterno is null then '' else upper((d.ApellidoPaterno + ' ' + d.ApellidoMaterno + ' '  + d.PrimerNombre)) end as PACIENTE, a.idEmpleado, UPPER(b.ApellidoPaterno + ' ' + b.ApellidoMaterno + ' ' + b.Nombres) as medico, case when e.Colegiatura is null then '' else e.Colegiatura end as colegiatura,  case when e.rne is null then '' else e.rne end as rne, fechaLlegadaCqx, case when fechaLlegadaCqx = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaLlegadaCqx, 103) + ' ' + convert(varchar(8), convert(time(0), fechaLlegadaCqx)) end as fecha_Llegada_Cqx,   fechaIngresoSala, case when fechaIngresoSala = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaIngresoSala, 103) + ' ' + convert(varchar(8), convert(time(0), fechaIngresoSala)) end as fecha_Ingreso_Sala,fechaSalidaSala, case when fechaSalidaSala = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaSalidaSala, 103) + ' ' + convert(varchar(8), convert(time(0), fechaSalidaSala)) end as fecha_Salida_Sala, case when year(fechaIngresoSala) > 2017  and year(fechaSalidaSala) > 2017 then  DATEDIFF(minute,  fechaIngresoSala,fechaSalidaSala)  else 0 end AS DIFERENCIA_MINUTOS_INGRESO_SALA, fechaInicioAnestesia, case when fechaInicioAnestesia = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaInicioAnestesia, 103) + ' ' + convert(varchar(8), convert(time(0), fechaInicioAnestesia)) end as fecha_Inicio_Anestesia,	 fechaTerminoAnestesia, case when fechaTerminoAnestesia = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaTerminoAnestesia, 103) + ' ' + convert(varchar(8), convert(time(0), fechaTerminoAnestesia)) end as fecha_Termino_Anestesia,	 case when year(fechaInicioAnestesia) > 2017  and year(fechaTerminoAnestesia) > 2017 then  DATEDIFF(minute,  fechaInicioAnestesia,fechaTerminoAnestesia)  else 0 end AS DIFERENCIA_MINUTOS_ANESTECIA,  fechaInicioCirugia,  case when fechaInicioCirugia = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaInicioCirugia, 103) + ' ' + convert(varchar(8), convert(time(0), fechaInicioCirugia)) end as fecha_Inicio_Cirugia,   fechaTerminoCirugia,	case when fechaTerminoCirugia = convert(datetime, '1900-01-01 00:00:00.000')  then '' else convert(varchar(20), fechaTerminoCirugia, 103) + ' ' + convert(varchar(8), convert(time(0), fechaTerminoCirugia)) end as fecha_Termino_Cirugia,	 case when year(fechaInicioCirugia) > 2017  and year(fechaTerminoCirugia) > 2017 then   DATEDIFF(minute, fechaInicioCirugia, fechaTerminoCirugia)   else 0 end AS DIFERENCIA_MINUTOS_CIRUGIA,   idTipoAnestesia, f.Descripcion as anestecia,   idQuirofano, a.idTipoCirugia, upper(g.descTipoCirugia) cirugia, descTecnica, hallazgosOperatorios, complicaciones, examenes, descSuspension, 	 case when idEstado = '0' then 'ANULADO' ELSE 'OPERATIVO' END AS ESTADO, idEstado  FROM [efimedic].[dbo].[cqxControl] A LEFT JOIN  [SIGH].[dbo].[Empleados] b on a.idEmpleado = b.IdEmpleado LEFT JOIN [SIGH].[dbo].[Atenciones] C ON 	 rtrim(A.idCuentaAtencion) = rtrim(c.IdAtencion)  left join [SIGH].[dbo].[Pacientes] D on c.IdPaciente = d.IdPaciente LEFT JOIN [SIGH].[dbo].[Medicos] E ON e.IdEmpleado = b.IdEmpleado  left join [SIGH].[dbo].[TiposAnestesia] f on a.idTipoAnestesia = f.IdAnestesia left join [efimedic].[dbo].[cqxTiposCirugia] g on a.idTipoCirugia = g.idTipoCirugia	 where month(fecharegistro) =  @ln_mes  and year(fecharegistro) = @ln_anio  order by fechaRegistro";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'registro' => utf8_encode( trim( $imprimir->FechaHoraRegistro ) ),
                    'paciente' => utf8_encode( trim( $imprimir->PACIENTE ) ),
                    'medico' => utf8_encode( trim( $imprimir->medico ) ),
                    'colegiatura' => utf8_encode( trim( $imprimir->colegiatura ) ),
                    'rne' => utf8_encode( trim( $imprimir->rne ) ),
                    'fecha_llegada' => utf8_encode( trim( $imprimir->fecha_Llegada_Cqx ) ),
                    'fecha_ingreso_sala' => utf8_encode( trim( $imprimir->fecha_Ingreso_Sala ) ),
                    'fecha_salida_sala' => utf8_encode( trim( $imprimir->fecha_Salida_Sala ) ),
                    'diferencia_sala' => utf8_encode( trim( $imprimir->DIFERENCIA_MINUTOS_INGRESO_SALA ) ),
                    'fecha_inicio_anestecia' => utf8_encode( trim( $imprimir->fecha_Inicio_Anestesia ) ),
                    'fecha_fin_anestesia' => utf8_encode( trim( $imprimir->fecha_Termino_Anestesia ) ),
                    'diferencia_anestecia' => utf8_encode( trim( $imprimir->DIFERENCIA_MINUTOS_ANESTECIA ) ),
                    'fecha_inicio_cirugia' => utf8_encode( trim( $imprimir->fecha_Inicio_Cirugia ) ),
                    'fecha_fin_cirugia' => utf8_encode( trim( $imprimir->fecha_Termino_Cirugia ) ),
                    'diferencia_cirugia' => utf8_encode( trim( $imprimir->DIFERENCIA_MINUTOS_CIRUGIA ) ),
                    'cirugia' => utf8_encode( trim( $imprimir->cirugia ) ),
                    'estado' => utf8_encode( trim( $imprimir->ESTADO ) ),
                    'idestado' => $imprimir->idEstado


                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }

        return json_encode( $array );

    }


    public

    function LeerReporteCentroQXAnulados( $mes, $anio ) {
        $sentencia = "declare @ln_mes int = " . $mes . "
        declare @ln_anio int = " . $anio . " SELECT  case when idEstado = '0' then 'ANULADO' ELSE 'OPERATIVO' END AS CONDICION, count(idestado) as TOTAL   FROM [efimedic].[dbo].[cqxControl]	 where month(fecharegistro) =  @ln_mes  and year(fecharegistro) = @ln_anio  group by idEstado";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION ) ),
                    'total' => utf8_encode( trim( $imprimir->TOTAL ) )
                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }
        return json_encode( $array );
    }


    public

    function LeerReporteCentroQXTotal( $mes, $anio ) {
        $sentencia = "declare @ln_mes int = " . $mes . "
        declare @ln_anio int = " . $anio . "SELECT 	sum(DATEDIFF(minute, fechaInicioCirugia, fechaTerminoCirugia)) as total FROM [efimedic].[dbo].[cqxControl]  WHERE IDESTADO = 1AND year(fechaInicioCirugia) >= @ln_anio  and year(fechaTerminoCirugia) >=  @ln_anio AND   month(fecharegistro) =  @ln_mes  and year(fecharegistro) = @ln_anio  AND  DATEDIFF(minute, fechaInicioCirugia, fechaTerminoCirugia) >0";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'total' => $imprimir->total
                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }
        return json_encode( $array );
    }



    public

    function LeerVencimientosAdendas( $mes, $anio ) {
        $sentencia = "declare @ln_fecha_mes int = " . $mes . " declare @ln_fecha_anio  int = " . $anio . " SELECT A.IDCONTRATO, A.IDPERSONAL, B.RUC, B.DNI, B.APELLIDOSNOMBRES, A.IDCONDICIONLABORAL, C.NOMBRE AS CONDICION_LABORAL, a.NRO_CONTRATO,  A.FECHAINGRESO, A.FECHATERMINOCONTRATO, A.SUELDO, A.TIPO_PERSONAL, CASE WHEN A.TIPO_PERSONAL = 'S' THEN 'ASISTENCIAL' ELSE 'ADMINISTRATIVO' END AS TIPO_LABOR, A.FECHA_FIN_ADENDA FROM [HEVES_RRHH].[DBO].[PERSONAL_CONTRATOS] A LEFT JOIN [HEVES_RRHH].[DBO].[PERSONAL] B ON A.IDPERSONAL = B.IDPERSONAL LEFT JOIN [HEVES_RRHH].[DBO].[T_TIPOCONDICIONLABORAL] C ON C.IDTIPOSITUACION = A.IDCONDICIONLABORAL where month(a.FECHA_FIN_ADENDA) = @ln_fecha_mes and year(a.FECHA_FIN_ADENDA) = @ln_fecha_anio and b.estado = '1'  ORDER BY FECHA_FIN_ADENDA DESC";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'id' => $imprimir->IDCONTRATO,
                    'idpersonal' => $imprimir->IDPERSONAL,
                    'ruc' => $imprimir->RUC,
                    'dni' => $imprimir->DNI,
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'condicion_laboral' => utf8_encode( trim( $imprimir->CONDICION_LABORAL ) ),
                    'nro_contrato' => utf8_encode( trim( $imprimir->NRO_CONTRATO ) ),
                    'fecha_ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAINGRESO ) ) ),
                    'fecha_termino' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHATERMINOCONTRATO ) ) ),
                    'sueldo' => $imprimir->SUELDO,
                    'tipo_labor' => utf8_encode( trim( $imprimir->TIPO_LABOR ) ),
                    'fin_adenda' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN_ADENDA ) ) )
                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }
        return json_encode( $array );

    }



    public
    function ListadoProfesionalNoProfesional() {
        $sentencia = "EXEC [dbo].[SP_OBTENER_REPORTE_PROFESIONAL_NO_PROFESIONAL]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'dni' => $imprimir->DNI,
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'profesion' => utf8_encode( trim( $imprimir->PROFESION ) ),
                    'colegio_profesional' => utf8_encode( trim( $imprimir->COLEGIO_PROFESIONAL ) ),
                    'especialidad' => utf8_encode( trim( $imprimir->ESPECIALIDAD ) ),
                    'rne' => $imprimir->RNE,
                    'servcio' => utf8_encode( trim( $imprimir->SERVICIO ) ) );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }
        return json_encode( $array );



    }



    public
    function ListadoPersonalTerceros() {
        $sentencia = "SELECT *  FROM [HEVES_RRHH].[dbo].[V_TERCEROS_SERVICIOS_CONSULTA]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'dni' => $imprimir->NRO_DOCUMENTO,
                    'ruc' => $imprimir->RUC,
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'nota_informativa' => utf8_encode( trim( $imprimir->NOTA_INFORMATIVA ) ),
                    'nro_pedido' => utf8_encode( trim( $imprimir->NRO_PEDIDO ) ),
                    'meta_actual_usuaria' => utf8_encode( trim( $imprimir->META_ACTUAL_USUARIA ) ),
                    'fuente_financiamiento' => utf8_encode( trim( $imprimir->DESCRIPCION_FUENTE_FINANCIAMIENTO ) ),
                    'pao' => utf8_encode( trim( $imprimir->PAO ) ),
                    'ccp' => utf8_encode( trim( $imprimir->CCP ) ),
                    'monto_total' => $imprimir->MONTO_TOTAL,
                    'mes1' => $imprimir->MES1,
                    'mes2' => $imprimir->MES2,
                    'mes3' => $imprimir->MES3,
                    'cargo' => utf8_encode( trim( $imprimir->DESCRIPCION_SERVICIO ) ),
                    'profesion' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'condicion' => utf8_encode( trim( $imprimir->DESCRIPCION_CONDICION_PROFESION ) ),
                    'tipo_labor' => utf8_encode( trim( $imprimir->DESCRIPCION_TIPO_EMPLEADO ) ),
                    'centro_costo' => utf8_encode( trim( $imprimir->CENTRO_COSTO_MOSTRAR ) ) );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );

        }
        return json_encode( $array );



    }


    public
    function ListadoPersonalConsolidado() {
        $sentencia = "EXEC [dbo].[SP_PERSONAL_CONSOLIDADO]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'condicion' => utf8_encode( trim( $imprimir->CONDICION_LABORAL ) ),
                    'dni' => $imprimir->NRO_DOCUMENTO,
                    'ruc' => $imprimir->RUC,
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'fecha_inicio' => utf8_encode( trim( $imprimir->FECHAINGRESO ) ),
                    'fecha_fin' => utf8_encode( trim( $imprimir->FECHATERMINOCONTRATO ) ),
                    'condicion_profesion' => utf8_encode( trim( $imprimir->DESCRIPCION_CONDICION_PROFESION ) ),
                    'profesion' => utf8_encode( trim( $imprimir->NOMBRE_PROFESION ) ),
                    'servicio' => utf8_encode( trim( $imprimir->SERVICIO ) ),
                    'colegio' => utf8_encode( trim( $imprimir->COLEGIO_PROFESIONAL ) ),
                    'condicion_estado' => utf8_encode( trim( $imprimir->CONDICION_ESTADO ) ),
                    'descripcion_tipo_empleado' => utf8_encode( trim( $imprimir->DESCRIPCION_TIPO_EMPLEADO ) ),
                    'idprofesion' => $imprimir->IDPROFESION,
                    'descripcion_total_profesion' => utf8_encode( trim( $imprimir->DESCRIPCION_TOTAL_PROFESION ) ),
                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );
        }
        return json_encode( $array );

    }


    
    







}
?>