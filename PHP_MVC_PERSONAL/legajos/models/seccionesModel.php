<?php
class seccionesModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }


    public

    function getListadoPersonalLegajos( $buscar_por_nombre ) {
        $read_personal = "DECLARE @lc_nombre varchar(200) = '" . $buscar_por_nombre . "'
        SELECT IDPERSONAL, PLAZA, NRO_CONTRATO, NRO_PROCESO, TIPO_PERSONAL, SEXO, PATERNO, MATERNO, NOMBRE, APELLIDOSNOMBRES, FECHANACIMIENTO, CASE WHEN FECHANACIMIENTO = CONVERT(DATETIME, '1900-01-01', 103) THEN '' ELSE (cast(datediff(dd,FECHANACIMIENTO,GETDATE()) / 365.25 as int)) END AS EDAD, LN_DEPARTAMENTO, LN_PROVINCIA,LN_DISTRITO, DNI, RUC, META, IDTIPOSITUACION, IDCARGOFUNCIONAL, IDGRUPO_OCUPACIONAL, GRUPO_OCUPACIONAL, CARGO, SERVICIO, IDPROFESION, PROFESION, IDUPSS,UPSS, IDSERVICIO, IDUNIDADORGANICA, UNIDAD_ORGANICA, IDREGIMENLABORAL, IDREGIMENPENSION, IDTIPOSEGURO, IDFECHAS, FECHAINGRESO, FECHATERMINOCONTRATO, FECHAULTIMORETIRO, CODHORARIO, IDSUELDO, SUELDOACTUAL, IDFINANCIERA, CUENTA_BANCO, NRO_CCI, DIRECCION_DEPARTAMENTO, DIRECCION_PROVINCIA, DIRECCION_DISTRITO, DIRECCION_DESCRIPCION, DIRECCION_REFERENCIA, ESTADO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA, ESTADO_CIVIL, CARNET_EXTRANJERIA, ESSALUD, GRUPO_SANGUINEO, TELEFONO_FIJO, TELEFONO_CELULAR, CORREO_ELECTRONICO, HIJOS  FROM [HEVES_RRHH].[dbo].[PERSONAL] WHERE APELLIDOSNOMBRES LIKE '%' + @lc_nombre + '%' OR DNI like '%' + @lc_nombre + '%' order by APELLIDOSNOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->IDPERSONAL,
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
                    'edad' => $read->EDAD );
            }
        } else {
            $datos_read[] = array( 'encontro' => '0' );
        }
        return json_encode( $datos_read );

    }


    public
    function getListarDepartamentos() {
        $read_departamentos = "SELECT CODDPTO, CODPROV, CODDIST, NOMBRE   FROM [HEVES_RRHH].[dbo].[LGJ_UBIGEO] where  CODPROV = '0' and coddist = '0'";
        $ejecucion_read = $this->_db->prepare( $read_departamentos );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '0',
                    'dpto' => $read->CODDPTO,
                    'prov' => $read->CODPROV,
                    'dist' => $read->CODDIST,
                    'nombre' => $read->NOMBRE );
            }

        } else {
            $datos_read[] = array( 'encontro' => '0' );
        }
        return json_encode( $datos_read );

    }





    /* TRAIDO PARA DEMO */
    public

    function GrabarNuevoDocumento( $nombre, $constancia, $usuario ) {
        $crear_documento = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOREFERENCIA] (NOMBRE, FECHAREGISTRO, USUARIO, CONSTANCIA) VALUES ('" . $nombre . "', getdate(), '" . $usuario . "', " . $constancia . ")";
        $ejecucion = $this->_db->prepare( $crear_documento );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarEdicionDocumento( $nombre, $constancia, $id_ref ) {
        $update_documento = "UPDATE [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOREFERENCIA] SET [NOMBRE] = '" . utf8_decode( $nombre ) . "', CONSTANCIA = " . $constancia . " where IDREF = " . $id_ref;
        $ejecucion = $this->_db->prepare( $update_documento );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminarDocumento( $id_ref ) {
        $delete_documento = "DELETE FROM  [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOREFERENCIA]  where IDREF = " . $id_ref;
        $ejecucion = $this->_db->prepare( $delete_documento );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    /* FIN DE TRAIDO PARA DEMO */




}
?>