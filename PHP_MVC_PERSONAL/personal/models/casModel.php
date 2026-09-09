<?php
class casModel extends Model {
    public

    function __construct() {
        parent::__construct();
    }

    // GrabarContratoCasModificar
    public

    function getListadoPersonalCas( $buscar_por_nombre ) {
        $read_personal = "DECLARE @lc_nombre varchar(200) = '" . $buscar_por_nombre . "'SELECT * FROM [HEVES_RRHH].[dbo].[V_PERSONAL_CAS] where  APELLIDOSNOMBRES like '%' + @lc_nombre + '%' or NRO_DOCUMENTO like '%' + @lc_nombre + '%'	  order by APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPERSONAL,
                    'idpais' => $read->IDPAIS,
                    'nombre_pais' => utf8_encode( trim( $read->NOMBRE_PAIS ) ),
                    'tipo_documento' => utf8_encode( $read->TIPODOCUMENTO ),
                    'nombre_documento' => utf8_encode( trim( $read->NOMBRE_TIPODOCUMENTO ) ),
                    'nro_documento' => $read->NRO_DOCUMENTO,
                    'sexo' => $read->SEXO,
                    'paterno' => utf8_encode( trim( $read->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $read->APELLIDO_MATERNO ) ),
                    'apellido_casada' => utf8_encode( trim( $read->APELLIDO_CASADA ) ),
                    'nombres' => utf8_encode( trim( $read->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $read->APELLIDOSNOMBRES ) ),
                    'fecha_nacimiento' => date( 'd/m/Y', strtotime( trim( $read->FECHANACIMIENTO ) ) ),
                    'edad' => $read->EDAD,
                    'idestadocivil' => $read->IDESTADOCIVIL,
                    'estado_civil' => utf8_encode( trim( $read->ESTADO_CIVIL ) ),
                    'iddepartamento' => utf8_encode( $read->DIRECCION_IDDEPARTAMENTO ),
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ),
                    'idprovincia' => utf8_encode( $read->DIRECCION_IDPROVINCIA ),
                    'provincia' => utf8_encode( trim( $read->PROVINCIA ) ),
                    'iddistrito' => utf8_encode( $read->DIRECCION_IDDISTRITO ),
                    'distrito' => utf8_encode( trim( $read->DISTRITO ) ),
                    'direccion' => utf8_encode( trim( $read->DIRECCION_DESCRIPCION ) ),
                    'correo_electronico' => utf8_encode( trim( $read->CORREO_ELECTRONICO ) ),
                    'telefono_fijo' => utf8_encode( trim( $read->TELEFONO_FIJO ) ),
                    'celular_personal' => utf8_encode( trim( $read->CELULAR_PERSONAL ) ),
                    'celular_emergencia' => utf8_encode( trim( $read->CELULAR_EMERGENCIA ) ),
                    'observacion' => utf8_encode( trim( $read->OBSERVACION ) ),
                    'estado' => $read->ESTADO,
                    'usuario' => utf8_encode( trim( $read->USUARIOREGISTRO ) ),
                    'fecharegistro' => date( 'd/m/Y', strtotime( trim( $read->FECHAREGISTRO ) ) ),
                    'usuario_modifico' => utf8_encode( $read->USUARIOMODIFICO ),
                    'fecha_modifico' => utf8_encode( $read->FECHA_MODIFICACION ),
                    'usuariodebaja' => utf8_encode( $read->USUARIODIODEBAJA ),
                    'fechadebaja' => utf8_encode( $read->FECHA_DEBAJA ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function getListadoPersonalCasDeBaja() {
        $read_personal = "SELECT * FROM [HEVES_RRHH].[dbo].[V_PERSONAL_CAS] where estado = '0' order by APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPERSONAL,
                    'idpais' => $read->IDPAIS,
                    'nombre_pais' => utf8_encode( trim( $read->NOMBRE_PAIS ) ),
                    'tipo_documento' => utf8_encode( $read->TIPODOCUMENTO ),
                    'nombre_documento' => utf8_encode( trim( $read->NOMBRE_TIPODOCUMENTO ) ),
                    'nro_documento' => $read->NRO_DOCUMENTO,
                    'sexo' => $read->SEXO,
                    'paterno' => utf8_encode( trim( $read->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $read->APELLIDO_MATERNO ) ),
                    'apellido_casada' => utf8_encode( trim( $read->APELLIDO_CASADA ) ),
                    'nombres' => utf8_encode( trim( $read->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $read->APELLIDOSNOMBRES ) ),
                    'fecha_nacimiento' => date( 'd/m/Y', strtotime( trim( $read->FECHANACIMIENTO ) ) ),
                    'edad' => $read->EDAD,
                    'idestadocivil' => $read->IDESTADOCIVIL,
                    'estado_civil' => utf8_encode( trim( $read->ESTADO_CIVIL ) ),
                    'iddepartamento' => utf8_encode( $read->DIRECCION_IDDEPARTAMENTO ),
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ),
                    'idprovincia' => utf8_encode( $read->DIRECCION_IDPROVINCIA ),
                    'provincia' => utf8_encode( trim( $read->PROVINCIA ) ),
                    'iddistrito' => utf8_encode( $read->DIRECCION_IDDISTRITO ),
                    'distrito' => utf8_encode( trim( $read->DISTRITO ) ),
                    'direccion' => utf8_encode( trim( $read->DIRECCION_DESCRIPCION ) ),
                    'correo_electronico' => utf8_encode( trim( $read->CORREO_ELECTRONICO ) ),
                    'telefono_fijo' => utf8_encode( trim( $read->TELEFONO_FIJO ) ),
                    'celular_personal' => utf8_encode( trim( $read->CELULAR_PERSONAL ) ),
                    'celular_emergencia' => utf8_encode( trim( $read->CELULAR_EMERGENCIA ) ),
                    'observacion' => utf8_encode( trim( $read->OBSERVACION ) ),
                    'estado' => $read->ESTADO,
                    'usuario' => utf8_encode( trim( $read->USUARIOREGISTRO ) ),
                    'fecharegistro' => date( 'd/m/Y', strtotime( trim( $read->FECHAREGISTRO ) ) ),
                    'usuario_modifico' => utf8_encode( $read->USUARIOMODIFICO ),
                    'fecha_modifico' => utf8_encode( $read->FECHA_MODIFICACION ),
                    'usuariodebaja' => utf8_encode( $read->USUARIODIODEBAJA ),
                    'fechadebaja' => utf8_encode( $read->FECHA_DEBAJA ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function GrabarRegistroCAS( $idpais, $iddocu, $nro_doc, $sexo, $paterno, $materno, $apellido_casada, $nombres, $apellidos_nombres, $nacimiento, $idestado_civil, $iddepar, $idprovin, $iddistri, $direccion, $correo, $fijo, $celular, $emergencia, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL](IDPAIS, TIPO_CONDICION_LABORAL, TIPODOCUMENTO, NRO_DOCUMENTO, SEXO, APELLIDO_PATERNO, APELLIDO_MATERNO, APELLIDO_CASADA, NOMBRES, APELLIDOSNOMBRES,FECHANACIMIENTO, LN_DEPARTAMENTO, LN_PROVINCIA, LN_DISTRITO, IDESTADOCIVIL, DIRECCION_IDDEPARTAMENTO, DIRECCION_IDPROVINCIA, DIRECCION_IDDISTRITO, DIRECCION_DESCRIPCION, CORREO_ELECTRONICO,TELEFONO_FIJO, CELULAR_PERSONAL, CELULAR_EMERGENCIA, OBSERVACION, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA)  values ( " . $idpais . ", '4', '" . $iddocu . "', '" . $nro_doc . "', '" . $sexo . "', upper('" . $paterno . "'), upper('" . $materno . "'), upper('" . $apellido_casada . "'), upper('" . $nombres . "'), upper('" . $apellidos_nombres . "'),  convert(datetime, '" . $nacimiento . "', 103 ),  '', '', '', " . $idestado_civil . ", '" . $iddepar . "', '" . $idprovin . "', '" . $iddistri . "', upper('" . $direccion . "'), '" . $correo . "', '" . $fijo . "', '" . $celular . "', '" . $emergencia . "', upper('" . $observacion . "'), '1', '" . $usuario . "', getdate(), '', '', '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function GrabarRegistroCASModificado( $idpais, $iddocu, $nro_doc, $sexo, $paterno, $materno, $apellido_casada, $nombres, $apellidos_nombres, $nacimiento, $idestado_civil, $iddepar, $idprovin, $iddistri, $direccion, $correo, $fijo, $celular, $emergencia, $observacion, $usuario, $idpersonal ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL] SET IDPAIS = " . $idpais . ", TIPODOCUMENTO = '" . $iddocu . "', NRO_DOCUMENTO = '" . $nro_doc . "', SEXO = '" . $sexo . "', APELLIDO_PATERNO = upper('" . $paterno . "'),  APELLIDO_MATERNO = upper('" . $materno . "'), APELLIDO_CASADA = upper('" . $apellido_casada . "'),  NOMBRES = upper('" . $nombres . "'),  APELLIDOSNOMBRES = upper('" . $apellidos_nombres . "'), FECHANACIMIENTO = convert(datetime, '" . $nacimiento . "', 103 ),  IDESTADOCIVIL = " . $idestado_civil . ", DIRECCION_IDDEPARTAMENTO = '" . $iddepar . "',  DIRECCION_IDPROVINCIA =  '" . $idprovin . "',  DIRECCION_IDDISTRITO = '" . $iddistri . "', DIRECCION_DESCRIPCION = upper('" . $direccion . "'),  CORREO_ELECTRONICO =  '" . $correo . "', TELEFONO_FIJO = '" . $fijo . "',  CELULAR_PERSONAL = CELULAR_PERSONAL, CELULAR_EMERGENCIA = '" . $emergencia . "', OBSERVACION = upper('" . $observacion . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate()  WHERE IDPERSONAL = " . $idpersonal;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function DardeBajaCAS( $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL] SET ESTADO= '0', USUARIODIODEBAJA = '" . $usuario . "', FECHADEBAJA = getdate()  WHERE IDPERSONAL = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function HabilitarCAS( $usuario, $id ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL] SET ESTADO= '1', USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate()  WHERE IDPERSONAL = " . $id;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EstadisticaPersonalCas() {
        $sentencia = "SELECT 'HABILES  ' AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM  [HEVES_RRHH].[dbo].[PERSONAL] where estado = '1' UNION ALL  SELECT 'DE BAJA  '  AS EMPLEADOS, CONVERT(INT, count(estado)) AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL]  where estado = '0' UNION ALL SELECT 'TOTAL' AS EMPLEADOS, CONVERT(INT, count(estado))  AS TOTAL  FROM [HEVES_RRHH].[dbo].[PERSONAL]";
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

    function ObtenerContratosPersonal( $id ) {
        $read_sql = " SELECT *  FROM [HEVES_RRHH].[dbo].[V_PERSONAL_CAS_CONTRATOS]  WHERE IDPERSONAL = " . $id;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idcontrato' => $read_field->IDCONTRATO,
                    'idpersonal' => $read_field->IDPERSONAL,
                    'idcondicionlaboral' => $read_field->IDCONDICIONLABORAL,
                    'condicionlaboral' => utf8_encode( trim( $read_field->CONDICION_LABORAL ) ),
                    'idrenaes' => $read_field->IDRENAES,
                    'establecimientos' => utf8_encode( trim( $read_field->ESTABLECIMIENTOS ) ),
                    'ruc' => trim( $read_field->RUC ),
                    'nro_proceso' => utf8_encode( trim( $read_field->NRO_PROCESO ) ),
                    'nro_contrato' => utf8_encode( trim( $read_field->NRO_CONTRATO ) ),
                    'fecha_ingreso' => utf8_encode( trim( $read_field->FECHA_INGRESO ) ),
                    'fecha_termino' => utf8_encode( trim( $read_field->FECHA_TERMINO ) ),
                    'fecha_desvinculacion' => utf8_encode( trim( $read_field->FECHADESVINCULACION ) ),
                    'sueldo' => $read_field->SUELDO,
                    'idcargo' => $read_field->IDCARGO,
                    'cargo' => utf8_encode( trim( $read_field->NOMBRE_CARGO ) ),
                    'idgrupo' => $read_field->IDGRUPO,
                    'grupo_ocupacional' => utf8_encode( trim( $read_field->GRUPO_OCUPACIONAL ) ),
                    'idcadena' => $read_field->IDCADENA_PROGRAMATICA,
                    'cadena' => utf8_encode( trim( $read_field->NOMBRE_TAREA ) ),
                    'meta' => $read_field->META,
                    'plaza' => $read_field->NRO_PLAZA,
                    'tipo_personal' => $read_field->TIPO_PERSONAL,
                    'idprofesion' => $read_field->IDPROFESION,
                    'nombre_profesion' => utf8_encode( trim($read_field->NOMBRE_PROFESION)),
                    'condicion_profesion' => $read_field->CONDICION_PROFESION,
                    'descripcion_condicion_profesion' => $read_field->DESCRIPCION_CONDICION_PROFESION,
                    'idunidad' => $read_field->IDUNIDADORGANICA,
                    'unidad_organica' => utf8_encode( trim( $read_field->UNIDAD_ORGANICA) ),
                    'organo' => utf8_encode( trim( $read_field->ORGANO ) ),
                    'idcentrocosto' =>$read_field->IDCENTROCOSTO,
                    'descripcion_cc' =>utf8_encode( trim($read_field->DESCRIPCION_CENTRO_DE_COSTO)),
                    'descripcion_centro_sub_costo' =>utf8_encode( trim($read_field->DESCRIPCION_CENTRO_SUBCOSTO)),
                    'descripcion_centro_sub_trascosto' =>utf8_encode( trim($read_field->DESCRIPCION_SUB_TRASCOSTO)),
                    'idupss' =>$read_field->IDUPSS,
                    'descripcion_upss' =>utf8_encode( trim($read_field->DESCRIPCION_UPSS)),
                    'idespecialidad' => $read_field->IDESPECIALIDAD,
                    'especialidad' => utf8_encode( trim( $read_field->ESPECIALIDAD ) ),
                    'colegio' => utf8_encode( trim( $read_field->COLEGIO ) ),
                    'rne' => trim( $read_field->RNE ),
                    'idadenda' => $read_field->IDADENDA_VIGENTE,
                    'adenda' => utf8_encode( trim( $read_field->ADENDA )),
                    'idmotivo' => $read_field->CESE_IDMOTIVO,
                    'motivo_renuncia' => utf8_encode( trim( $read_field->MOTIVO)),
                    'fecha_renuncia' => utf8_encode( trim( $read_field->FECHA_DE_CESE)));
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }


    // GrabarContratoCas( $idpersonal, $idcondicion_laboral, $renaes, $ruc, $nro_proceso, $nro_contrato, $fecha_ingreso, $fecha_termino, $sueldo, $idcargo, $idcadena, $meta, $plaza, $tipo, $idprofesion, $condicion_profesion, $idunidad, $idcentrocosto, $idupss, $idespecialidad, $rne, $usuario );
    
    


    public

    function ObtenerVerificacionRUC( $id ) {
        $read_sql = "SELECT B.RUC, A.APELLIDOSNOMBRES  FROM [HEVES_RRHH].[dbo].[PERSONAL] A LEFT JOIN [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS] B ON A.IDPERSONAL = B.IDPERSONAL WHERE B.RUC =  '" . $id . "'";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'ruc' => $read_field->RUC,
                    'apellidos_nombres' => utf8_encode( trim( $read_field->APELLIDOSNOMBRES ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }




    public

    function VerFechas( $ruc, $fecha ) {
        $read_sql = "select * from [HEVES_RRHH].[dbo].[V_PERSONAL_CAS_CONTRATOS] where ruc = '" . $ruc . "' and fechaterminocontrato >= convert(datetime, '" . $fecha . "', 103)";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1' );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }

    
    public

    function GrabarContratoCas( $idpersonal, $idcondicion_laboral, $renaes, $ruc, $nro_proceso, $nro_contrato, $fecha_ingreso, $fecha_termino, $sueldo, $idcargo, $idcadena, $meta, $plaza, $tipo, $idprofesion, $condicion_profesion, $idunidad, $idcentrocosto, $idupss, $idespecialidad, $rne, $usuario)  {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS] (IDPERSONAL, IDCONDICIONLABORAL, IDRENAES, RUC, NRO_PROCESO, NRO_CONTRATO, FECHAINGRESO, FECHATERMINOCONTRATO, FECHA_DESVINCULACION, SUELDO, IDCARGO, IDCADENA_PROGRAMATICA, META, NRO_PLAZA, TIPO_PERSONAL, IDPROFESION, CONDICION_PROFESION, IDUNIDADORGANICA, IDCENTROCOSTO, IDUPSS, IDESPECIALIDAD, RNE, IDADENDA_VIGENTE, USUARIO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO)   VALUES (" . $idpersonal . ", '" . $idcondicion_laboral . "', '" . $renaes . "', '" . $ruc . "', '" . $nro_proceso . "', '" . $nro_contrato . "', convert(datetime, '" . $fecha_ingreso . "',103),  convert(datetime, '" . $fecha_termino . "',103), convert(datetime, '" . $fecha_termino . "',103), " . $sueldo . ", '" . $idcargo . "', '" . $idcadena . "' , '" . $meta . "',  '" . $plaza . "', '" . $tipo . "',  '".$idprofesion."' , '".$condicion_profesion."',         
        '" . $idunidad . "', '" . $idcentrocosto . "', '" . $idupss . "',   '" . $idespecialidad . "', '" . $rne . "', 0, '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }

    
    
    public

    function GrabarContratoCasModificar( $idcondicion_laboral, $renaes, $nro_proceso, $nro_contrato, $fecha_ingreso, $fecha_termino, $sueldo, $idcargo, $idcadena, $meta, $plaza, $tipo, $idprofesion, $condicion_profesion, $idcentrocosto, $idunidad, $idupss, $idespecialidad, $rne, $usuario, $idcontrato ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS]  SET IDCONDICIONLABORAL = '" . $idcondicion_laboral . "', IDRENAES = '" . $renaes . "', NRO_PROCESO = '" . $nro_proceso . "', NRO_CONTRATO = '" . $nro_contrato . "', FECHAINGRESO = convert(datetime, '" . $fecha_ingreso . "',103),  FECHATERMINOCONTRATO  = convert(datetime, '" . $fecha_termino . "',103), FECHA_DESVINCULACION  = convert(datetime, '" . $fecha_termino . "',103), SUELDO = " . $sueldo . ",  IDCARGO = '" . $idcargo . "', IDCADENA_PROGRAMATICA = '" . $idcadena . "' , META = '" . $meta . "', NRO_PLAZA =  '" . $plaza . "', TIPO_PERSONAL = '" . $tipo . "', IDPROFESION = '".$idprofesion."', CONDICION_PROFESION = '".$condicion_profesion."', IDCENTROCOSTO = '".$idcentrocosto."', IDUNIDADORGANICA =  '" . $idunidad . "', IDUPSS = '".$idupss."', IDESPECIALIDAD =   '" . $idespecialidad . "', RNE = '" . $rne . "',  USUARIOMODIFICO =  '" . $usuario . "',   FECHAMODIFICO = getdate()  WHERE  IDCONTRATO = " . $idcontrato;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function EliminarContratoCas( $idcontrato ) {
        $delete_sql = "DELETE FROM[HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS]  WHERE  IDCONTRATO = " . $idcontrato;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }







    public

    function ObtenerAdendasDeUnContrato( $id ) {
        $read_sql = "SELECT IDADENDAS, IDCONTRATOS, NRO_ADENDA, NRO_CONTRATO, FECHA_INICIO, FECHA_FIN, A.IDUNIDADORGANICA, b.DESCRIPCION as UNIDAD_ORGANICA, C.DESCRIPCION AS ORGANO, A.ESTADO_ADENDA, case when A.ESTADO_ADENDA = 'T' then 'TERMINO' ELSE 'VIGENTE ' END AS DESCRIPCION_ESTADO_ADENDA,   a.FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO FROM [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS_ADENDAS] A left join [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANICA] B on A.IDUNIDADORGANICA = B.IDUNIDADORGANICA LEFT JOIN  [HEVES_RRHH].[dbo].[T_UNIDAD_ORGANO] C ON B.IDORGANO = C.IDORGANO  where IDCONTRATOS = ".$id." ORDER BY FECHA_INICIO"; 
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read_field->IDADENDAS,
                    'idcontrato' => utf8_encode( trim( $read_field->IDCONTRATOS ) ),
                    'nro_adenda' => utf8_encode( trim( $read_field->NRO_ADENDA ) ),
                    'nro_contrato' => utf8_encode( trim( $read_field->NRO_CONTRATO ) ),
                    'fecha_inicio' => date( 'd/m/Y', strtotime( trim( $read_field->FECHA_INICIO ) ) ),
                    'fecha_fin' => date( 'd/m/Y', strtotime( trim( $read_field->FECHA_FIN ) ) ),
                    'idunidad' => $read_field->IDUNIDADORGANICA,
                    'unidad_organica' =>  utf8_encode(trim($read_field->UNIDAD_ORGANICA)),
                    'organo' =>  utf8_encode(trim($read_field->ORGANO)),
                    'estado_adenda' => utf8_encode( $read_field->ESTADO_ADENDA ),
                    'descripcion_estado_adenda' => utf8_encode( $read_field->DESCRIPCION_ESTADO_ADENDA)) ;
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function VerFechaCasAdenda( $id, $fecha ) {
        $read_sql = "SELECT IDADENDAS  FROM [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS_ADENDAS] where idcontratos = '" . $id . "'  and FECHA_FIN >= convert(datetime, '" . $fecha . "', 103)";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1' );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );


    }


    public

    function GrabarRegistroAdenda($id, $nro_adenda, $nro_contrato, $fecha_inicio, $fecha_fin, $idunidad_adenda, $estado, $usuario) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS_ADENDAS] (IDCONTRATOS, NRO_ADENDA, NRO_CONTRATO, FECHA_INICIO, FECHA_FIN, IDUNIDADORGANICA,  ESTADO_ADENDA,   USUARIO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO)  VALUES (" . $id . ", '" . $nro_adenda . "', '".$nro_contrato."', convert(datetime, '" . $fecha_inicio . "',103), convert(datetime, '" . $fecha_fin . "',103), '".$idunidad_adenda."', '" . $estado . "', '" . $usuario . "', getdate(), '', '') update [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS] set IDADENDA_VIGENTE = 1, FECHA_FIN_ADENDA = convert(datetime, '" . $fecha_fin . "',103) WHERE IDCONTRATO =  " . $id;
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

     
    

    public

    function GrabarRegistroAdendaModificar($nro_adenda, $fecha_inicio, $fecha_fin, $estado, $unidad_adenda, $usuario, $idadenda) {
        $update_sql = "UPDATE [dbo].[PERSONAL_CONTRATOS_ADENDAS]   SET NRO_ADENDA = '".$nro_adenda."' , FECHA_INICIO = convert(datetime, '" . $fecha_inicio . "',103), FECHA_FIN = convert(datetime, '" . $fecha_fin . "',103), ESTADO_ADENDA = '" . $estado . "',  IDUNIDADORGANICA = '".$unidad_adenda."', USUARIOMODIFICO = '" . $usuario . "',  FECHAMODIFICO = getdate()  WHERE  IDADENDAS = ".$idadenda;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }





    public

    function EliminarAdenda( $idadenda ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS_ADENDAS]  WHERE  IDADENDAS = " . $idadenda;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();

        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }



    /* inicio de modelo profesion */

    public

    function GrabarRegistroEducacion( $idpersonal, $tipoe, $fechadesde, $fechahasta, $condicion, $iduniversidad, $institucion, $idcargo, $status, $idcolegio, $nro_colegiatura, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION] (IDPERSONAL, TIPO_EDUCACION, FECHA_DESDE, FECHA_HASTA, CONDICION, IDUNIVERSIDAD, INSTITUCION, IDPROFESION, ESTATUS, IDCOLEGIO, NRO_COLEGIO, OBSERVACION, USUARIO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICO)   VALUES   ( " . $idpersonal . ", '" . $tipoe . "', convert(datetime, '" . $fechadesde . "',103), convert(datetime, '" . $fechahasta . "',103), '" . $condicion . "', '" . $iduniversidad . "',  upper('" . $institucion . "'), '" . $idcargo . "', upper('" . $status . "'), 
        '" . $idcolegio . "', '" . $nro_colegiatura . "', upper('" . $observacion . "'), '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function VerTodosRegistrosEducacion( $idpersonal ) {
        $read_sql = "SELECT *  FROM [HEVES_RRHH].[dbo].[V_PERSONAL_EDUCACION] WHERE IDPERSONAL = " . $idpersonal . " order by tipo_educacion  ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'ideducacion' => $read_field->IDEDUCACION,
                    'tipo_educacion' => $read_field->TIPO_EDUCACION,
                    'descripcion_educacion' => utf8_encode( trim( $read_field->DESCRIPCION_UNIVERSIDAD ) ),
                    'fecha_inicial' => utf8_encode( trim( $read_field->FECHA_INICIAL ) ),
                    'fecha_final' => utf8_encode( trim( $read_field->FECHA_FINAL ) ),
                    'condicion' => utf8_encode( trim( $read_field->CONDICION ) ),
                    'descripcion_condicion' => utf8_encode( trim( $read_field->DESCRIPCION_CONDICION ) ),
                    'iduniversidad' => trim( $read_field->IDUNIVERSIDAD ),
                    'institucion' => utf8_encode( trim( $read_field->INSTITUCION ) ),
                    'idprofesion' => trim( $read_field->IDPROFESION ),
                    'profesion' => utf8_encode( trim( $read_field->PROFESION ) ),
                    'grupo_ocupacional' => utf8_encode( trim( $read_field->GRUPO_OCUPACIONAL ) ),
                    'idcolegio' => $read_field->IDCOLEGIO,
                    'nombre_colegio' => utf8_encode( trim( $read_field->NOMBRE_COLEGIO ) ),
                    'nro_colegio' => utf8_encode( trim( $read_field->NRO_COLEGIO ) ),
                    'estatus' => utf8_encode( trim( $read_field->ESTATUS ) ),
                    'observacion' => utf8_encode( trim( $read_field->OBSERVACION ) )
                );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function ModificarRegistroEducacion( $tipoe, $fechadesde, $fechahasta, $condicion, $iduniversidad, $institucion, $idcargo, $status, $idcolegio, $nro_colegiatura, $observacion, $usuario, $ideducacion ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION] SET TIPO_EDUCACION = '" . $tipoe . "', FECHA_DESDE = convert(datetime, '" . $fechadesde . "',103), FECHA_HASTA = convert(datetime, '" . $fechahasta . "',103), CONDICION = '" . $condicion . "', IDUNIVERSIDAD =  '" . $iduniversidad . "', INSTITUCION =  upper('" . $institucion . "'), IDPROFESION = '" . $idcargo . "', ESTATUS = upper('" . $status . "'), IDCOLEGIO = '" . $idcolegio . "', NRO_COLEGIO  = '" . $nro_colegiatura . "',  OBSERVACION = upper('" . $observacion . "'), USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICO = getdate()  WHERE IDEDUCACION = " . $ideducacion;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }


    public

    function EliminarRegistroEducacion( $ideducacion ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION] WHERE IDEDUCACION = " . $ideducacion;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );



    }


    /* fin de modelo profesion */



    /* inicio de seccion habilidad */

    public

    function VerSiExisteHabilidadRegistrado( $fecha_inicio, $ideducacion ) {
        $sentencia = "SELECT IDHABILIDAD, IDEDUCACION, FECHAINICIO, FECHAFIN, NRO_HABILIDAD, USUARIOREGISTRO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION_HABILIDAD] where IDEDUCACION = " . $ideducacion . " and FECHAFIN > convert(datetime, '" . $fecha_inicio . "', 103)";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1' );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }




    public

    function GrabarRegistrodeHabilidad( $ideducacion, $fecha_inicio, $fecha_fin, $nro_habilidad, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION_HABILIDAD] (IDEDUCACION, FECHAINICIO, FECHAFIN, NRO_HABILIDAD, USUARIOREGISTRO, FECHAREGISTRO)    VALUES (" . $ideducacion . ", convert(datetime, '" . $fecha_inicio . "',103), convert(datetime, '" . $fecha_fin . "',103), '" . $nro_habilidad . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }



    public

    function VerTodasHabilides( $ideducacion ) {
        $sentencia = "SELECT IDHABILIDAD, IDEDUCACION,  FECHAINICIO, convert(varchar(10), FECHAINICIO, 103) as FECHA_INICIO, FECHAFIN, convert(varchar(10), FECHAFIN, 103) AS FECHA_FIN, NRO_HABILIDAD, USUARIOREGISTRO, FECHAREGISTRO FROM [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION_HABILIDAD] where IDEDUCACION = " . $ideducacion . " order by FECHAINICIO";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idhabilidad' => $imprimir->IDHABILIDAD,
                    'ideducacion' => $imprimir->IDEDUCACION,
                    'fecha_inicio' => utf8_encode( trim( $imprimir->FECHA_INICIO ) ),
                    'fecha_fin' => utf8_encode( trim( $imprimir->FECHA_FIN ) ),
                    'nro_habilidad' => $imprimir->NRO_HABILIDAD );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }


    public

    function EliminarTodasHabilidades( $id ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_EDUCACION_HABILIDAD] WHERE  IDHABILIDAD = " . $id;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }




    /* fin de seccion habilidad */



    public

    function GrabarRegistroEspe( $idpersonal, $tipo_table, $id_espe, $inicio, $fin, $nro, $institucion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] (IDPERSONAL, TIPO_TABLE, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION, USUARIO, FECHAREGISTRO) VALUES (" . $idpersonal . ", '" . $tipo_table . "', '" . $id_espe . "', '" . $nro . "', convert(datetime, '" . $inicio . "',103), convert(datetime, '" . $fin . "',103),   upper('" . $institucion . "'),    upper('" . $observacion . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }



    public

    function VerRegistroEspe( $idpersonal, $tipo_table ) {
        $sentencia = "SELECT IDEECC, IDPERSONAL, TIPO_TABLE, B.DESCRIPCION, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION  FROM [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_TIPO_ESPECIALIDAD] B ON A.NRO_ID_EECCC = B.IDESPECIALIDAD WHERE IDPERSONAL = " . $idpersonal . " and TIPO_TABLE = '" . $tipo_table . "' ORDER BY DESCRIPCION ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'ideecc' => $imprimir->IDEECC,
                    'nro_id_eecc' => utf8_encode( trim( $imprimir->NRO_ID_EECCC ) ),
                    'nro_eecc' => $imprimir->NRO_EECC,
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ),
                    'inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'institucion' => utf8_encode( trim( $imprimir->INSTITUCION ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );

    }



    public

    function EliminarRegistroEspe( $id_eecc ) {
        $delete_sql = "DELETE FROM  [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD]  WHERE IDEECC = " . $id_eecc;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }




    /* inicio de competencia */


    public

    function VerRegistroCompetencia( $idpersonal, $tipo_table ) {
        $sentencia = "SELECT IDEECC, IDPERSONAL, TIPO_TABLE, B.DESCRIPCION, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION FROM [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_COMPETENCIAS] B ON A.NRO_ID_EECCC = B.IDCOMPETENCIAS WHERE IDPERSONAL = " . $idpersonal . " and TIPO_TABLE = '" . $tipo_table . "' ORDER BY DESCRIPCION ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'ideecc' => $imprimir->IDEECC,
                    'nro_id_eecc' => utf8_encode( trim( $imprimir->NRO_ID_EECCC ) ),
                    'nro_eecc' => $imprimir->NRO_EECC,
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ),
                    'inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'institucion' => utf8_encode( trim( $imprimir->INSTITUCION ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }






    public

    function GrabarRegistroCompetencias( $idpersonal, $tipo_table, $id_compe, $inicio, $fin, $nro, $institucion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] (IDPERSONAL, TIPO_TABLE, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION, USUARIO, FECHAREGISTRO) VALUES (" . $idpersonal . ", '" . $tipo_table . "', '" . $id_compe . "', '" . $nro . "', convert(datetime, '" . $inicio . "',103), convert(datetime, '" . $fin . "',103),   upper('" . $institucion . "'),    upper('" . $observacion . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }




    public

    function EliminarRegistroCompetencia( $id_eecc_c ) {
        $delete_sql = "DELETE FROM  [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD]  WHERE IDEECC = " . $id_eecc_c;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );



    }



    /* fin de competencia */


    /* inicio de capacitacion */

    public

    function VerRegistroCapacitaciones( $idpersonal, $tipo_table ) {
        $sentencia = "SELECT IDEECC, IDPERSONAL, TIPO_TABLE, B.DESCRIPCION, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION FROM [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_CAPACITACION] B ON A.NRO_ID_EECCC = B.IDCAPACITACION WHERE IDPERSONAL = " . $idpersonal . " and TIPO_TABLE = '" . $tipo_table . "' ORDER BY DESCRIPCION ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'ideecc' => $imprimir->IDEECC,
                    'nro_id_eecc' => utf8_encode( trim( $imprimir->NRO_ID_EECCC ) ),
                    'nro_eecc' => $imprimir->NRO_EECC,
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ),
                    'inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'institucion' => utf8_encode( trim( $imprimir->INSTITUCION ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );
    }




// ObtenerContratosPersonal( $id )


    public

    function GrabarRegistroCapacitacion( $idpersonal, $tipo_table, $id_capa, $inicio, $fin, $nro, $institucion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] (IDPERSONAL, TIPO_TABLE, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION, USUARIO, FECHAREGISTRO) VALUES (" . $idpersonal . ", '" . $tipo_table . "', '" . $id_capa . "', '" . $nro . "', convert(datetime, '" . $inicio . "',103), convert(datetime, '" . $fin . "',103),   upper('" . $institucion . "'),    upper('" . $observacion . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function EliminarRegistroCapacitacion( $id_idcapa ) {
        $delete_sql = "DELETE FROM  [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD]  WHERE IDEECC = " . $id_idcapa;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );




    }








    /* fin de capacitacion */



    /* entrenamiento */



    public

    function VerRegistroEntrenamiento( $idpersonal, $tipo_table ) {
        $sentencia = "  SELECT IDEECC, IDPERSONAL, TIPO_TABLE, B.DESCRIPCION, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION  FROM [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_ENTRENAMIENTO] B ON A.NRO_ID_EECCC = B.IDENTRENAMIENTO  WHERE IDPERSONAL = " . $idpersonal . " and TIPO_TABLE = '" . $tipo_table . "' ORDER BY DESCRIPCION ";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'ideecc' => $imprimir->IDEECC,
                    'nro_id_eecc' => utf8_encode( trim( $imprimir->NRO_ID_EECCC ) ),
                    'nro_eecc' => $imprimir->NRO_EECC,
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ),
                    'inicio' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_INICIO ) ) ),
                    'fin' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_FIN ) ) ),
                    'institucion' => utf8_encode( trim( $imprimir->INSTITUCION ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ) );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );


    }



    public

    function GrabarRegistroEntrenamiento( $idpersonal, $tipo_table, $id_entre, $inicio, $fin, $nro, $institucion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD] (IDPERSONAL, TIPO_TABLE, NRO_ID_EECCC, NRO_EECC, FECHA_INICIO, FECHA_FIN, INSTITUCION, OBSERVACION, USUARIO, FECHAREGISTRO) VALUES (" . $idpersonal . ", '" . $tipo_table . "', '" . $id_entre . "', '" . $nro . "', convert(datetime, '" . $inicio . "',103), convert(datetime, '" . $fin . "',103),   upper('" . $institucion . "'),    upper('" . $observacion . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }





    public

    function EliminarRegistroEntrenamiento( $id_identre ) {
        $delete_sql = "DELETE FROM  [HEVES_RRHH].[dbo].[PERSONAL_ESPECIALIDAD]  WHERE IDEECC = " . $id_identre;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );




    }


    /* fin de entrenamiento */



    /* inicio de cese */

    public  function Grabar_RegistroCeseCAS( $id_motivo, $fecha_cese, $monto_cese, $observacion_cese, $usuario, $id_contrato ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_CONTRATOS]  SET CESE_IDMOTIVO = '" . $id_motivo . "', CESE_FECHA = convert(datetime, '" . $fecha_cese . "', 103),  CESE_MONTO_FINAL = " . $monto_cese . ", CESE_OBSERVACION = upper('" . $observacion_cese . "'), CESE_USUARIO = '" . $usuario . "', CESE_FECHAREGISTRO = GETDATE()  WHERE  IDCONTRATO = " . $id_contrato;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }




    /* fin de CESE */


    /* inicio de grabacion de familiar CAS */

    public

    function GrabarRegistroFamiliar( $id_personal, $id_parent, $registro_dni, $dni, $fecha_nacimiento, $paterno, $materno, $nombres, $apellidos_nombres, $ocupacion, $observacion, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PERSONAL_FAMILIAR](IDPERSONAL, IDPARENT, REGISTRO_DNI, DNI, FECHA_NACIMIENTO, APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES, APELLIDOS_NOMBRES,  OCUPACION, OBSERVACION, USUARIO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION)    VALUES (" . $id_personal . ", '" . $id_parent . "', '" . $registro_dni . "', '" . $dni . "', CONVERT(DATETIME, '" . $fecha_nacimiento . "', 103), UPPER('" . $paterno . "'), UPPER('" . $materno . "'),	UPPER('" . $nombres . "'), UPPER('" . $apellidos_nombres . "'), UPPER('" . $ocupacion . "'), UPPER('" . $observacion . "'), '" . $usuario . "', getdate(), '', '')";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }


    public

    function VerTotalFamilia( $id_personal ) {
        $sentencia = "  SELECT A.IDFAMILIAR, A.IDPERSONAL, A.IDPARENT, b.PARENTESCO,   A.REGISTRO_DNI, A.DNI, A.FECHA_NACIMIENTO, convert(varchar(10), A.FECHA_NACIMIENTO, 103) as FECHA_NACIMIENTO_DDMMAAAA, A.APELLIDO_PATERNO, A.APELLIDO_MATERNO, A.NOMBRES, A.APELLIDOS_NOMBRES, A.OCUPACION, A.OBSERVACION, A.USUARIO,  A.FECHAREGISTRO, convert(varchar(10), A.FECHAREGISTRO, 103) as FECHA_REGISTRO_DDMMAAAA, A.USUARIOMODIFICO, A.FECHAMODIFICACION   FROM [HEVES_RRHH].[dbo].[PERSONAL_FAMILIAR] A  left join [HEVES_RRHH].[dbo].[T_PARENTESCO] B on A.idparent = b.IDPARENTESCO WHERE IDPERSONAL = " . $id_personal;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'idfamiliar' => $imprimir->IDFAMILIAR,
                    'idparent' => $imprimir->IDPARENT,

                    'paretesco' => utf8_encode( trim( $imprimir->PARENTESCO ) ),
                    'registro_dni' => $imprimir->REGISTRO_DNI,
                    'dni' => $imprimir->DNI,
                    'nacimiento' => $imprimir->FECHA_NACIMIENTO_DDMMAAAA,
                    'paterno' => utf8_encode( trim( $imprimir->APELLIDO_PATERNO ) ),
                    'materno' => utf8_encode( trim( $imprimir->APELLIDO_MATERNO ) ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'apellidos_nombres' => utf8_encode( trim( $imprimir->APELLIDOS_NOMBRES ) ),
                    'ocupacion' => utf8_encode( trim( $imprimir->OCUPACION ) ),
                    'observacion' => utf8_encode( trim( $imprimir->OBSERVACION ) ),
                    'usuario' => $imprimir->USUARIO

                );
            }
        } else {
            $array[] = array( 'verificar' => '0' );
        }
        return json_encode( $array );


    }



    public

    function GrabarRegistroFamiliarUpDate( $id_parent, $registro_dni, $dni, $fecha_nacimiento, $paterno, $materno, $nombres, $apellidos_nombres, $ocupacion, $observacion, $usuario, $id_familiar ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PERSONAL_FAMILIAR] set IDPARENT = " . $id_parent . ", REGISTRO_DNI = '" . $registro_dni . "', DNI = '" . $dni . "', FECHA_NACIMIENTO = CONVERT(DATETIME, '" . $fecha_nacimiento . "', 103), APELLIDO_PATERNO = UPPER('" . $paterno . "'), APELLIDO_MATERNO = UPPER('" . $materno . "'), NOMBRES = UPPER('" . $nombres . "'), APELLIDOS_NOMBRES = UPPER('" . $apellidos_nombres . "'), OCUPACION = UPPER('" . $ocupacion . "'), OBSERVACION = UPPER('" . $observacion . "'),  USUARIOMODIFICO = '" . $usuario . "', FECHAMODIFICACION = getdate()
        where IDFAMILIAR = " . $id_familiar;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public
    function EliminarRegistroFamiliar( $id_familiar ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_FAMILIAR]   WHERE  IDFAMILIAR = " . $id_familiar;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }



    /* Fin de grabacion CAS */









}

?>