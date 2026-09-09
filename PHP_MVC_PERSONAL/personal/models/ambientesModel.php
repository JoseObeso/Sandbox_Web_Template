<?php
class ambientesModel extends Model {
    public

    function __construct() {
        parent::__construct();
    }

    /* Inicio de modelo de pisos fisico */
    public

    function ListarPisosRegistrados() {
        $consulta_sql = "SELECT IDPISO, DESCRIPCION, USUARIO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[PISOS_FISICOS] order by descripcion ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPISO,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }

    // ListarAmbientesFuncionalesCqx

    // VerTotalBloque()

    public

    function GrabarRegistroPisos( $piso, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_FISICOS] (DESCRIPCION, USUARIO, FECHAREGISTRO)   VALUES ( upper('" . $piso . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function ModificacionRegistroPisos( $piso, $idpiso ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_FISICOS] SET DESCRIPCION = upper('" . $piso . "') WHERE IDPISO = " . $idpiso;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminacionRegistroPisos( $idpiso ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_FISICOS] WHERE IDPISO = " . $idpiso;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    /* fin de modelo de pisos fisico */


    public

    function GrabarBloquesdePiso( $idpiso, $bloque, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS](IDPISO, DESCRIPCION, USUARIO, FECHAREGISTRO)    VALUES ( " . $idpiso . ", UPPER('" . $bloque . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function ListarBloquesdePiso( $idpiso ) {
        $consulta_sql = "SELECT IDBLOQUES, IDPISO, DESCRIPCION   FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS] where idpiso = " . $idpiso . " order by descripcion ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDBLOQUES,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }

    public

    function ModificarBloquesdePiso( $bloque, $idbloque ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS] SET DESCRIPCION = upper('" . $bloque . "')  WHERE IDBLOQUES = " . $idbloque;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }



    public

    function EliminarBloquesdePiso( $idbloque ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS]   WHERE  IDBLOQUES = " . $idbloque;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }






    public

    function GrabarAmbienteFisicos( $idpiso, $idbloque, $ambientes, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AMBIENTES] (IDPISO, IDBLOQUE, DESCRIPCION, USUARIO, FECHAREGISTRO)  VALUES ( " . $idpiso . ", " . $idbloque . ", UPPER('" . $ambientes . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }



    public

    function VerTodosAmbientesFisicos( $idpiso, $idbloque ) {
        $consulta_sql = "SELECT IDAMBIENTE, IDPISO, IDBLOQUE, DESCRIPCION, USUARIO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AMBIENTES] where idpiso = " . $idpiso . "  and idbloque = " . $idbloque . " order by descripcion ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDAMBIENTE,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }

    public

    function UpdateAmbientesFisicos( $idambiente, $ambientes ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AMBIENTES] set DESCRIPCION = upper('" . $ambientes . "') where IDAMBIENTE = " . $idambiente;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function DeleteAmbientesFisicos( $idambiente ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AMBIENTES] where  IDAMBIENTE = " . $idambiente;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    /* Inicio mantenedor de area funcional */



    public

    function ListarAmbienteFuncional( $idpiso, $idbloque ) {
        $consulta_sql = "SELECT IDAREAFUNCIONAL, IDPISO, IDBLOQUE, DESCRIPCION, USUARIO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL] WHERE IDPISO = '" . $idpiso . "' AND IDBLOQUE = '" . $idbloque . "'  order by descripcion";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDAREAFUNCIONAL,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarAreaFuncionalBloquePiso( $idpiso, $idbloque, $area_funcional, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL] (IDPISO, IDBLOQUE, DESCRIPCION, USUARIO, FECHAREGISTRO)    VALUES (" . $idpiso . ", " . $idbloque . ", UPPER('" . $area_funcional . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

    public

    function ModificarAreaFuncionalBloquePiso( $area_funcional, $idarea ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL] set DESCRIPCION = upper('" . $area_funcional . "') where IDAREAFUNCIONAL = " . $idarea;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function EliminarAreaFuncionalBloquePiso( $idarea ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL]  where IDAREAFUNCIONAL = " . $idarea;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }



    /* fin mantenedor de area funcional */




    /* inicio de ambiente funcional */




    public

    function GrabarAmbienteFuncionalBloque( $idpiso, $idbloque, $idareafuncional, $idambiente, $ambiente_funcional, $nro_cupos, $nro_cupos_adicional, $idservicio, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL] (IDPISO, IDBLOQUE, IDAREAFUNCIONAL, IDAMBIENTE, DESCRIPCION, NRO_CUPOS, NRO_CUPOS_ADICIONAL, IDSERVICIO, USUARIO, FECHAREGISTRO)  VALUES (" . $idpiso . ", " . $idbloque . ", " . $idareafuncional . ", " . $idambiente . ", upper('" . $ambiente_funcional . "'), " . $nro_cupos . ", " . $nro_cupos_adicional . ", '" . $idservicio . "',  '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function ListarAmbientesFuncionales() {
        $consulta_sql = "SELECT *   FROM [HEVES_RRHH].[dbo].[V_PISO_AMBIENTE_FUNCIONAL] ORDER BY DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_IDPISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion_idbloque' => utf8_encode( trim( $read->DESCRIPCION_IDBLOQUE ) ),
                    'idareafuncional' => $read->IDAREAFUNCIONAL,
                    'descripcion_area_funcional' => utf8_encode( trim( $read->DESCRIPCION_AREA_FUNCIONAL ) ),
                    'idambiente' => $read->IDAMBIENTE,
                    'idservicio' => $read->IDSERVICIO,
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ),
                    'descripcion_ambiente' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE ) ),
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'nro_cupos' => $read->NRO_CUPOS,
                    'nro_cupos_adicional' => $read->NRO_CUPOS_ADICIONAL
                );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function ListarAmbientesFuncionalesCqx() {

        $consulta_sql = "SELECT *   FROM [HEVES_RRHH].[dbo].[V_PISO_AMBIENTE_FUNCIONAL] ORDER BY DESCRIPCION_AMBIENTE desc";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_IDPISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion_idbloque' => utf8_encode( trim( $read->DESCRIPCION_IDBLOQUE ) ),
                    'idareafuncional' => $read->IDAREAFUNCIONAL,
                    'descripcion_area_funcional' => utf8_encode( trim( $read->DESCRIPCION_AREA_FUNCIONAL ) ),
                    'idambiente' => $read->IDAMBIENTE,
                    'descripcion_ambiente' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE ) ),
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'nro_cupos' => $read->NRO_CUPOS );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );




    }






    public

    function ListarAmbientesFuncionalesPorServicio( $idservicio ) {

        $consulta_sql = "SELECT *   FROM [HEVES_RRHH].[dbo].[V_PISO_AMBIENTE_FUNCIONAL] where IDSERVICIO = " . $idservicio . " ORDER BY DESCRIPCION_AMBIENTE desc";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_IDPISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion_idbloque' => utf8_encode( trim( $read->DESCRIPCION_IDBLOQUE ) ),
                    'idareafuncional' => $read->IDAREAFUNCIONAL,
                    'descripcion_area_funcional' => utf8_encode( trim( $read->DESCRIPCION_AREA_FUNCIONAL ) ),
                    'idambiente' => $read->IDAMBIENTE,
                    'descripcion_ambiente' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE ) ),
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'nro_cupos' => $read->NRO_CUPOS );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );




    }





    public

    function ModificarAmbienteFuncionalBloque( $idpiso, $idbloque, $idareafuncional, $idambiente, $ambiente_funcional, $nro_cupos, $nro_cupos_adicional, $idservicio, $usuario, $idfuncional ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL] SET IDPISO = " . $idpiso . ", IDBLOQUE = " . $idbloque . ", IDAREAFUNCIONAL = " . $idareafuncional . ", IDAMBIENTE = " . $idambiente . ",  DESCRIPCION = upper('" . $ambiente_funcional . "'), NRO_CUPOS = " . $nro_cupos . ", NRO_CUPOS_ADICIONAL = " . $nro_cupos_adicional . ", IDSERVICIO = " . $idservicio . " where IDFUNCIONAL = " . $idfuncional;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function EliminarAmbienteFuncionalBloque( $idfuncional ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL]  WHERE IDFUNCIONAL = " . $idfuncional;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }



    /* fin de ambiente funcional */


    /* inicio de bloque de programacion */


    public

    function VerAmbienteFuncional( $idpiso, $idbloque ) {
        $consulta_sql = "select IDFUNCIONAL, IDPISO, IDBLOQUE, IDAREAFUNCIONAL, IDAMBIENTE, DESCRIPCION, NRO_CUPOS  from [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL]  where IDPISO = " . $idpiso . " and idbloque = " . $idbloque . " order by DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'idbloque' => $read->IDBLOQUE,
                    'idareafuncional' => $read->IDAREAFUNCIONAL,
                    'idambiente' => $read->IDAMBIENTE,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'nro_cupos' => $read->NRO_CUPOS );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function IniciarTraslado( $nombre, $idpisos, $idbloques, $idfuncional, $usuario ) {
        $consulta_sql = "EXEC [dbo].[SP_REGISTRAR_BLOQUE_PROGRAMACION]  '" . $nombre . "', " . $idpisos . ", " . $idbloques . ", " . $idfuncional . ", '" . $usuario . "'";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'condicion' => $read->condicion_grabacion );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }

        return json_encode( $datos_read );
    }



    /* fin de bloque de programacion  */


    public

    function VerRegistrosTraslado( $bloque_programacion ) {
        $consulta_sql = "SELECT IDPISOBLOQUE, NOMBRE_BLOQUE, IDPISO, DESCRIPCION_PISO, IDBLOQUE, DESCRIPCION_BLOQUE, IDAMBIENTEFUNCIONAL, DESCRIPCION_AMBIENTE_FUNCIONAL, NRO_CUPOS  FROM [HEVES_RRHH].[dbo].[V_PISOS_BLOQUES_PROGRAMACION] WHERE NOMBRE_BLOQUE = '" . $bloque_programacion . "'  order by DESCRIPCION_AMBIENTE_FUNCIONAL";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPISOBLOQUE,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE_FUNCIONAL ) ),
                    'nro_cupos' => $read->NRO_CUPOS );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function EliminarRegistroTraslado( $idbloque ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUE_PROGRAMACION]   WHERE IDPISOBLOQUE = " . $idbloque;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

    public

    function VerTotalBloque() {
        $consulta_sql = "SELECT NOMBRE_BLOQUE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUE_PROGRAMACION] GROUP BY NOMBRE_BLOQUE";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'bloque' => $read->NOMBRE_BLOQUE );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function EliminarBloqueProgramacion( $nombre_blo ) {
        $delete_sql = "DELETE FROM  [HEVES_RRHH].[dbo].[PISOS_BLOQUE_PROGRAMACION] WHERE NOMBRE_BLOQUE = '" . $nombre_blo . "'";
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function NombreBloqueProgramacionDetalle( $nombre_blo ) {
        $consulta_sql = "SELECT IDPISOBLOQUE, NOMBRE_BLOQUE, IDPISO, DESCRIPCION_PISO, IDBLOQUE, DESCRIPCION_BLOQUE, IDAMBIENTEFUNCIONAL, DESCRIPCION_AMBIENTE_FUNCIONAL, NRO_CUPOS  FROM [HEVES_RRHH].[dbo].[V_PISOS_BLOQUES_PROGRAMACION] where NOMBRE_BLOQUE = '" . $nombre_blo . "'";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPISOBLOQUE,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_PISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion_bloque' => utf8_encode( trim( $read->DESCRIPCION_BLOQUE ) ),
                    'idambiente' => $read->IDAMBIENTEFUNCIONAL,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE_FUNCIONAL ) ),
                    'nro_cupos' => $read->NRO_CUPOS );

            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }



    public

    function VerCabeceradeBloqueProgramado( $detalle ) {
        $consulta_sql = "SELECT IDPISOBLOQUE, NOMBRE_BLOQUE, IDPISO, DESCRIPCION_PISO, IDBLOQUE, DESCRIPCION_BLOQUE, IDAMBIENTEFUNCIONAL, DESCRIPCION_AMBIENTE_FUNCIONAL, NRO_CUPOS  FROM [HEVES_RRHH].[dbo].[V_PISOS_BLOQUES_PROGRAMACION] where DESCRIPCION_AMBIENTE_FUNCIONAL = '" . $detalle . "'";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read->IDPISOBLOQUE,
                    'nombre_bloque' => utf8_encode( trim( $read->NOMBRE_BLOQUE ) ));
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }









    /* modelo de asignacion de personal */


    public

    function GrabarAsignacionPersonalAmbienteFuncional( $idfuncional, $nro_profesional, $idprofesion, $inclusivo, $individual_conjunto, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_AF_ASIGNACION_PERSONAL](IDFUNCIONAL, NRO_PROFESIONAL, IDPROFESION, INCLUSIVO, PROFESIONAL_UNICO, USUARIO, FECHAREGISTRO)  VALUES (" . $idfuncional . ", " . $nro_profesional . ", " . $idprofesion . ", '" . $inclusivo . "', upper('" . $individual_conjunto . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

    public

    function MostrarProfesionalesAsignados( $idfuncional ) {
        $consulta_sql = "SELECT A.IDASIGNACIONAF, A.IDFUNCIONAL, A.NRO_PROFESIONAL, A.IDPROFESION, b.DESCRIPCION,  A.INCLUSIVO, A.PROFESIONAL_UNICO,  case when A.PROFESIONAL_UNICO = 'I' then 'UNICO' ELSE 'EN ELECCION' END AS DESCRIPCION_UNICO,   A.USUARIO, A.FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[PISOS_AF_ASIGNACION_PERSONAL] A left join  [HEVES_RRHH].[dbo].[T_PROFESION_CARGO]  B on A.idprofesion = b.IDPROFESION_CARGO   where a.idfuncional = " . $idfuncional;
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read->IDASIGNACIONAF,
                    'nro_profesional' => $read->NRO_PROFESIONAL,
                    'profesional_unico' => $read->PROFESIONAL_UNICO,
                    'descripcion_unico' => $read->DESCRIPCION_UNICO,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function CantidadProfesionales( $idfuncional ) {
        $consulta_sql = "declare @ln_personal_unico int = (SELECT count(PROFESIONAL_UNICO)   FROM [HEVES_RRHH].[dbo].[PISOS_AF_ASIGNACION_PERSONAL] where profesional_unico = 'I' and IDFUNCIONAL = " . $idfuncional . ") declare @ln_personal_conjunto int = (SELECT count(PROFESIONAL_UNICO)  FROM [HEVES_RRHH].[dbo].[PISOS_AF_ASIGNACION_PERSONAL] where profesional_unico = 'C' and IDFUNCIONAL = " . $idfuncional . ") select @ln_personal_unico + case when @ln_personal_conjunto = 0 then 0 else 1 end as personal_total";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'personal_total' => $read->personal_total );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );





    }









    public

    function EliminarProfesionalesAsignado( $idasignacion ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_AF_ASIGNACION_PERSONAL] WHERE IDASIGNACIONAF = " . $idasignacion;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }



    /* fin de asignacion de personal */


    /* inicio para bloques */

    public

    function GrabarAsignacionPersonalAmbienteBloque( $nombre_bloque, $nro_profesional, $idprofesion, $inclusivo, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_BLOQUE_ASIGNACION_PERSONAL](NOMBRE_BLOQUE, NRO_PROFESIONAL, IDPROFESION, INCLUSIVO, USUARIO, FECHAREGISTRO)   VALUES ('" . $nombre_bloque . "', " . $nro_profesional . ", " . $idprofesion . ", '" . $inclusivo . "', '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function MostrarProfesionalesAsignadosDelBloque( $nombre_bloque ) {
        $consulta_sql = "SELECT IDASIGNACIONBLOQ, NOMBRE_BLOQUE, NRO_PROFESIONAL, IDPROFESION, B.DESCRIPCION  FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUE_ASIGNACION_PERSONAL] A left join [HEVES_RRHH].[dbo].[T_PROFESION_CARGO]  B on A.idprofesion = b.IDPROFESION_CARGO  where NOMBRE_BLOQUE = '" . $nombre_bloque . "'";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read->IDASIGNACIONBLOQ,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function EliminarProfesionalesAsignadoBloque( $idasignadobloque ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUE_ASIGNACION_PERSONAL]  WHERE IDASIGNACIONBLOQ = " . $idasignadobloque;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }

    /* fin para bloques */



    public

    function ListarAmbienteFuncionalBloquePiso( $idpiso, $idbloque ) {
        $consulta_sql = "SELECT IDFUNCIONAL, IDPISO, IDBLOQUE, IDAREAFUNCIONAL, IDAMBIENTE, DESCRIPCION   FROM [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL] where idbloque = " . $idbloque . " and idpiso = " . $idpiso . " order by DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }

    public

    function VerDetallePisoBloqueAmbienteFuncional( $data_cap ) {
        $consulta_sql = "SELECT IDFUNCIONAL, DESCRIPCION_IDPISO, DESCRIPCION_IDBLOQUE, DESCRIPCION  FROM [HEVES_RRHH].[dbo].[V_PISO_AMBIENTE_FUNCIONAL]  where IDFUNCIONAL = " . $data_cap;
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_IDPISO ) ),
                    'descripcion_bloque' => utf8_encode( trim( $read->DESCRIPCION_IDBLOQUE ) ),
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );



    }


    public

    function VerTodosLosServiciosParaAmbienteFuncional() {
        $consulta_sql = "SELECT A.IDSERVICIOSDEPAR, A.IDUPSS, B.UPSS, A.IDDEPAR, C.DEPARTAMENTO, A.SERVICIO   FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO] A LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_UPSS] B ON A.IDUPSS = B.IDUPSS LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO]  C ON A.IDDEPAR = C.IDDEPARTAMENTO order by servicio";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idservicio' => $read->IDSERVICIOSDEPAR,
                    'upss' => utf8_encode( trim( $read->UPSS ) ),
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }

    /*

    GrabarAmbienteFuncionalBloque($idpiso, $idbloque, $idareafuncional, $idambiente, $ambiente_funcional, $nro_cupos, $nro_cupos_adicional, $idservicio, $usuario);

    */



}



?>