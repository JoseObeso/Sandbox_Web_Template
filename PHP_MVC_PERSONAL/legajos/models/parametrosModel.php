<?php
class parametrosModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }


    public

    function getListarDocumentos() {
        $read_documentos = "SELECT IDREF, NOMBRE, FECHAREGISTRO, USUARIO, CONSTANCIA   FROM [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOREFERENCIA] order by NOMBRE ";
        $ejecucion_read = $this->_db->prepare( $read_documentos );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'idref' => $read->IDREF,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ),
                    'registro' => date( 'd/m/Y', strtotime( trim( $read->FECHAREGISTRO ) ) ),
                    'constancia' => trim( $read->CONSTANCIA ) );

            }
        } else {
            $datos_read[] = array( 'idref' => '', 'nombre' => '', 'registro' => '', 'constancia' => '' );
        }
        return json_encode( $datos_read );

    }



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



    public

    function getListarParticipaciones() {
        $read_participaciones = "SELECT IDPARTICIPACION, NOMBRE, FECHAREGISTRO, USUARIO   FROM [HEVES_RRHH].[dbo].[LGJ_PARTICIPACION] ORDER BY NOMBRE";
        $ejecucion_read = $this->_db->prepare( $read_participaciones );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'idparti' => $read->IDPARTICIPACION,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );

            }
        } else {
            $datos_read[] = array( 'idparti' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );

    }



    public

    function GrabarNuevaParticipacion( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_PARTICIPACION] (NOMBRE, FECHAREGISTRO, USUARIO)   VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function GrabarEdicionParticipacion( $nombre, $id_parti ) {
        $update_parti = "UPDATE [HEVES_RRHH].[dbo].[LGJ_PARTICIPACION]  SET NOMBRE = '" . utf8_decode( $nombre ) . "' WHERE IDPARTICIPACION = " . $id_parti;
        $ejecucion = $this->_db->prepare( $update_parti );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function EliminarParticipacion( $id_ref ) {
        $delete = "DELETE FROM  [HEVES_RRHH].[dbo].[LGJ_PARTICIPACION]  WHERE IDPARTICIPACION = " . $id_ref;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }






    public

    function getListarEventos() {
        $read_eventos = "SELECT IDEVENTO, NOMBRE, FECHAREGISTRO, USUARIO  FROM [HEVES_RRHH].[dbo].[LGJ_EVENTO] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_eventos );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDEVENTO,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );

            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );

    }



    public

    function GrabarNuevoEvento( $nombre, $usuario )

    {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_EVENTO]  (NOMBRE, FECHAREGISTRO, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionEvento( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_EVENTO] SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDEVENTO = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarEvento( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_EVENTO] WHERE IDEVENTO = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function getListarModalidad() {
        $read_modalidad = "SELECT IDMODA, NOMBRE, FECHAREGISTRO, USUARIO  FROM [HEVES_RRHH].[dbo].[LGJ_MODALIDAD] order by nombre";
        $ejecucion_read = $this->_db->prepare( $read_modalidad );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDMODA,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoModalidad( $nombre, $usuario )

    {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_MODALIDAD]  (NOMBRE, FECHAREGISTRO, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionModalidad( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_MODALIDAD]  SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDMODA = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarModalidad( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_MODALIDAD] WHERE IDMODA = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function getListarFechas() {
        $read_modalidad = "SELECT IDFECHA, NOMBRE, FECHAREGISTRO, USUARIO   FROM [HEVES_RRHH].[dbo].[LGJ_TIPOFECHA] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_modalidad );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDFECHA,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoFechas( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_TIPOFECHA]  (NOMBRE, FECHAREGISTRO, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionFechas( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_TIPOFECHA]  SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDFECHA = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarFechas( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_TIPOFECHA] WHERE IDFECHA  = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function getListarServicios() {
        $read_modalidad = "SELECT IDDOCSERVICIO, NOMBRE, FECHAREGISTRO, USUARIO FROM [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOSERVICIOS] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_modalidad );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDDOCSERVICIO,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoServicios( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOSERVICIOS] (NOMBRE, FECHAREGISTRO, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionServicios( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOSERVICIOS]  SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDDOCSERVICIO = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarServicios( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_DOCUMENTOSERVICIOS]   WHERE IDDOCSERVICIO  = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }




    public

    function getListarCulminacion() {
        $read_tabla = "SELECT IDMOTIVO, MOTIVO, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION   FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE] order by motivo";
        $ejecucion_read = $this->_db->prepare( $read_tabla );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDMOTIVO,
                    'nombre' => utf8_encode( trim( $read->MOTIVO ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoCulminacion( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]  (MOTIVO, FECHAREGISTRO, USUARIOREGISTRO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionCulminacion( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]  SET MOTIVO = '" . utf8_decode( $nombre ) . "' where IDMOTIVO = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarCulminacion( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[T_MOTIVO_CESE]  WHERE IDMOTIVO = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }




    public

    function getListarCargo_laboral() {
        $read_tabla = "SELECT IDCARGOLABORAL, NOMBRE, FECHAREGISTRO, USUARIO   FROM [HEVES_RRHH].[dbo].[LGJ_CARGO_LABORAL] ORDER BY NOMBRE";
        $ejecucion_read = $this->_db->prepare( $read_tabla );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDCARGOLABORAL,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoCargo_laboral( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_CARGO_LABORAL]  (NOMBRE, FECHAREGISTRO, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdicionCargo_laboral( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_CARGO_LABORAL] SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDCARGOLABORAL = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }



    public

    function EliminarCargo_laboral( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_CARGO_LABORAL]  WHERE IDCARGOLABORAL = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function getListartipo_educacion() {
        $read_tabla = "SELECT IDTIPOE, NOMBRE, USUARIO, FECHA   FROM [HEVES_RRHH].[dbo].[LGJ_TIPOEDUCACION] ORDER BY NOMBRE ";
        $ejecucion_read = $this->_db->prepare( $read_tabla );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDTIPOE,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'nombre' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevotipo_educacion( $nombre, $usuario ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_TIPOEDUCACION]   (NOMBRE, FECHA, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarEdiciontipo_educacion( $nombre, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_TIPOEDUCACION]  SET NOMBRE = '" . utf8_decode( $nombre ) . "' where IDTIPOE = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function Eliminartipo_educacion( $id ) {
        $delete = "DELETE FROM [HEVES_RRHH].[dbo].[LGJ_TIPOEDUCACION]  WHERE IDTIPOE = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }





    public

    function getListarEdad() {
        $read_tabla = "SELECT IDCESE, SEXO, case when SEXO = 'F' then 'FEMENINO' else 'MASCULINO' END AS GENERO, EDAD, FECHA, USUARIO   FROM [HEVES_RRHH].[dbo].[LGJ_EDAD_CESE]";
        $ejecucion_read = $this->_db->prepare( $read_tabla );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDCESE,
                    'genero' => utf8_encode( trim( $read->GENERO ) ),
                    'edad' => utf8_encode( trim( $read->EDAD ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'genero' => '', 'edad' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarEdad( $edad, $id ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_EDAD_CESE]  SET  EDAD = '" . $edad . "' where IDCESE = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function getListarMeritos() {
        $read_tabla = "SELECT IDDOCMERITO, NOMBRE, TIPO, FECHA, USUARIO   FROM [HEVES_RRHH].[dbo].[LGJ_DOCUMENTO_MERITO] order by nombre";
        $ejecucion_read = $this->_db->prepare( $read_tabla );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read->IDDOCMERITO,
                    'nombre' => utf8_encode( trim( $read->NOMBRE ) ),
                    'tipo' => utf8_encode( trim( $read->TIPO ) ) );
            }
        } else {
            $datos_read[] = array( 'id' => '', 'genero' => '', 'edad' => '' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarNuevoMerito( $nombre, $usuario, $tipo ) {
        $crear = "INSERT INTO [HEVES_RRHH].[dbo].[LGJ_DOCUMENTO_MERITO] (NOMBRE, TIPO, FECHA, USUARIO)  VALUES ( '" . utf8_decode( $nombre ) . "', '" . $tipo . "', getdate(), '" . $usuario . "')";
        $ejecucion = $this->_db->prepare( $crear );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }



    public

    function GrabarEdicionMerito( $nombre, $id, $tipo ) {
        $update = "UPDATE [HEVES_RRHH].[dbo].[LGJ_DOCUMENTO_MERITO]  SET NOMBRE = '" . utf8_decode( $nombre ) . "', TIPO = '" . $tipo . "' WHERE IDDOCMERITO = " . $id;
        $ejecucion = $this->_db->prepare( $update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function EliminartipoMerito( $id ) {
        $delete = "DELETE FROM  [HEVES_RRHH].[dbo].[LGJ_DOCUMENTO_MERITO]  WHERE IDDOCMERITO = " . $id;
        $ejecucion = $this->_db->prepare( $delete );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }





    public

    function getListarUniversidad() {
        $read_sql = "SELECT IDUNIVERIDAD, NOMBRE, GESTION, SITUACION, REGION, DIRECCION, WEB, USUARIOREGISTRO, FECHAREGISTRO, USUARIOMODIFICO, FECHAMODIFICACION, USUARIODIODEBAJA, FECHADEBAJA  FROM [HEVES_RRHH].[dbo].[LGJ_UNIVERSIDADES] order by nombre ";
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'id' => $read_field->IDUNIVERIDAD,
                    'nombre' => utf8_encode( trim( $read_field->NOMBRE ) ),
                    'gestion' => utf8_encode( trim( $read_field->GESTION ) ),
                    'situacion' => utf8_encode( trim( $read_field->SITUACION ) ),
                    'region' => utf8_encode( trim( $read_field->REGION ) ),
                    'direccion' => utf8_encode( trim( $read_field->DIRECCION ) ),
                    'web' => utf8_encode( trim( $read_field->WEB ) ) );
            }
        } else {
            $datos_read[] = array(
                'id' => '',
                'nombre' => '',
                'gestion' => '',
                'situacion' => '',
                'region' => '',
                'direccion' => '',
                'web' => '' );
        }
        return json_encode( $datos_read );
    }









}
?>