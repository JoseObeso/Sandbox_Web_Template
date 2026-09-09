<?php
class programacionModel extends Model {
    public

    function __construct() {
        parent::__construct();
    }


    /* inicio de listar turnos */

    public

    function ListarTurnosRegistrados() {
        $consulta_sql = "SELECT IDTIPOTURNO, TURNO  FROM [HEVES_RRHH].[dbo].[PISOS_TIPOS_TURNOS] ORDER BY TURNO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDTIPOTURNO,
                    'turnos' => utf8_encode( trim( $read->TURNO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarTiposdeTurnos( $tipo_horario, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_TIPOS_TURNOS](TURNO, USUARIO, FECHAREGISTRO)  VALUES ( upper('" . $tipo_horario . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function ModificarTiposdeTurnos( $tipo_horario, $idturno ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_TIPOS_TURNOS] SET TURNO =  upper('" . $tipo_horario . "') WHERE IDTIPOTURNO = " . $idturno;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function EliminarTiposdeTurnos( $idturno ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_TIPOS_TURNOS] WHERE IDTIPOTURNO =  " . $idturno;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function VerCorrelativoenBD( $hf ) {
        $consulta_sql = "declare @lc_tipo_turno varchar(6) = '" . $hf . "' DECLARE @ln_contar int = (SELECT count(*) AS CNT    FROM [HEVES_RRHH].[dbo].[PISOS_HORARIOS] WHERE HORARIOABREVIADO LIKE @lc_tipo_turno + '%') DECLARE @ln_final int = case when @ln_contar is null then 0 else @ln_contar end  select @lc_tipo_turno + RIGHT('00' +  CONVERT(VARCHAR(2),@ln_final + 1),2) as horario_abreviado";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'horario_abreviado' => utf8_encode( trim( $read->horario_abreviado ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    // VerCorrelativoenBD
    public

    function GrabarRegisyroTH( $idturno, $nombre_th, $hora_total, $inicial, $final, $horario_abreviado, $observacion, $turno_final, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_HORARIOS] (IDTIPOHORARIO, DESCRIPCION, HORATOTAL, HORAINICIO, HORAFIN, HORARIOABREVIADO, OBSERVACION, HORARIO_ACTIVIDAD, USUARIO, FECHAREGISTRO) VALUES (" . $idturno . ", upper('" . $nombre_th . "'), '" . $hora_total . "', '" . $inicial . "', '" . $final . "', UPPER('" . $horario_abreviado . "'), upper('" . $observacion . "'), upper(substring('" . $turno_final . "',2,3)), '" . $usuario . "', getdate() )";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }



    public

    function ListarTotalHT() {
        $consulta_sql = "SELECT A.IDHORARIOTURNO, A.IDTIPOHORARIO, B.TURNO, A.DESCRIPCION, A.HORATOTAL, A.HORAINICIO, A.HORAFIN, A.HORARIOABREVIADO, A.OBSERVACION, A.USUARIO, A.FECHAREGISTRO, CASE WHEN LEN(A.HORARIOABREVIADO) = 4 THEN SUBSTRING(A.HORARIOABREVIADO,2,1)  ELSE SUBSTRING(A.HORARIOABREVIADO,2,2)  END AS HORARIO_MNT  FROM [HEVES_RRHH].[dbo].[PISOS_HORARIOS] A LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_TIPOS_TURNOS] B ON A.IDTIPOHORARIO = B.IDTIPOTURNO order by  A.HORAINICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDHORARIOTURNO,
                    'idtipohorario' => $read->IDTIPOHORARIO,
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'horatoral' => $read->HORATOTAL,
                    'horainicio' => $read->HORAINICIO,
                    'horafin' => $read->HORAFIN,
                    'horario_abreviado' => utf8_encode( trim( $read->HORARIOABREVIADO ) ),
                    'observacion' => utf8_encode( trim( $read->OBSERVACION ) ),
                    'horario_mnt' => utf8_encode( trim( $read->HORARIO_MNT ) )


                );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function EliminarHorarioTurnoFinal( $idturnohorario ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_HORARIOS]  WHERE  IDHORARIOTURNO = " . $idturnohorario;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    /* inicio de modelo upss - servicios */


    public

    function GrabarNuevoRegistroUPSS( $upss, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_UPSS] (UPSS, USUARIO, FECHAREGISTRO) VALUES (upper('" . $upss . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function ListarRegistroUPSS() {
        $consulta_sql = "SELECT IDUPSS, UPSS FROM [HEVES_RRHH].[dbo].[PISOS_UPSS] order by UPSS";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDUPSS,
                    'upss' => utf8_encode( trim( $read->UPSS ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function ModificarRegistroUPSS( $upss, $idupss ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_UPSS]  SET UPSS = upper('" . $upss . "') where IDUPSS = " . $idupss;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminarRegistroUPSS( $idupss ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_UPSS] where IDUPSS = " . $idupss;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function GrabarRegistroDepartamento( $idupss_seleccion, $departamento, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO] (IDUPSS, DEPARTAMENTO, USUARIO, FECHAREGISTRO)  VALUES (" . $idupss_seleccion . ", upper('" . $departamento . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }




    public

    function ListarDepartamentodeUPSS( $idupss ) {
        $consulta_sql = "SELECT A.IDDEPARTAMENTO, A.IDUPSS, b.UPSS,  A.DEPARTAMENTO   FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO]  A left join [HEVES_RRHH].[dbo].[PISOS_UPSS] b on a.idupss = b.idupss where A.IDUPSS = " . $idupss . " order by idupss";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDDEPARTAMENTO,
                    'idupss' => $read->IDUPSS,
                    'upss' => utf8_encode( trim( $read->UPSS ) ),
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function ModificarRegistroDepartamento( $idupss_seleccion, $departamento, $iddepar ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO]  SET IDUPSS = " . $idupss_seleccion . ", DEPARTAMENTO = upper('" . $departamento . "') WHERE IDDEPARTAMENTO = " . $iddepar;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }


    public

    function EliminarRegistroDepartamento( $iddepar ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO] WHERE IDDEPARTAMENTO = " . $iddepar;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    /* inicio de departamento servicios */


    public

    function DepartamentoDeUPSS( $idupss_seleccion ) {
        $consulta_sql = "select IDDEPARTAMENTO, IDUPSS, DEPARTAMENTO  from [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO] where idupss = '" . $idupss_seleccion . "' ORDER BY DEPARTAMENTO ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDDEPARTAMENTO,
                    'idupss' => $read->IDUPSS,
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function ServiciosdeDepartamentoDeUPSS( $idupss_seleccion, $iddepar_seleccion ) {
        $consulta_sql = "SELECT A.IDSERVICIOSDEPAR, A.IDUPSS, B.UPSS, A.IDDEPAR, C.DEPARTAMENTO,  A.SERVICIO  FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO] A LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_UPSS] B ON  A.IDUPSS = B.IDUPSS LEFT JOIN   [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO] C ON A.IDDEPAR = C.IDDEPARTAMENTO where a.idupss = " . $idupss_seleccion . " and a.iddepar = " . $iddepar_seleccion . "  ORDER BY  A.SERVICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDSERVICIOSDEPAR,
                    'idupss' => $read->IDUPSS,
                    'upss' => utf8_encode( trim( $read->UPSS ) ),
                    'iddepar' => $read->IDDEPAR,
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }



    public

    function GrabarregistroServicio( $idupss, $iddepar, $servicio, $usuario ) {
        $insertar_sql = "INSERT INTO [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO] (IDUPSS, IDDEPAR, SERVICIO, USUARIO, FECHAREGISTRO)  VALUES  (" . $idupss . ", " . $iddepar . ", upper('" . $servicio . "'), '" . $usuario . "', getdate())";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }



    public

    function ModificarRegistroServicio( $idupss, $iddepar, $servicio, $idservi ) {
        $update_sql = "UPDATE [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO] SET IDUPSS = " . $idupss . ", IDDEPAR = " . $iddepar . ", SERVICIO = upper('" . $servicio . "') WHERE IDSERVICIOSDEPAR = " . $idservi;
        $ejecucion = $this->_db->prepare( $update_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }

    public

    function EliminarRegistroServicio( $idservi ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO]  WHERE  IDSERVICIOSDEPAR = " . $idservi;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    /*** inicio de departamento servicio */

    public

    function VerUPSSDepartamentoServicio( $idupss_seleccion, $iddepar_seleccion ) {
        $consulta_sql = "SELECT IDSERVICIOSDEPAR, IDUPSS, IDDEPAR, SERVICIO  FROM [HEVES_RRHH].[dbo].[PISOS_UPSS_DEPARTAMENTO_SERVICIO] where idupss = " . $idupss_seleccion . " and iddepar = " . $iddepar_seleccion . " order by SERVICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDSERVICIOSDEPAR,
                    'idupss' => $read->IDUPSS,
                    'iddepar' => $read->IDDEPAR,
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }



    /* fin de modelo upss - servicio */

    public

    function VerAFTotal() {
        $consulta_sql = "SELECT A.IDAREAFUNCIONAL, A.IDPISO, b.DESCRIPCION as DESCRIPCION_PISO, A.IDBLOQUE, RIGHT('00' + Ltrim(Rtrim(A.IDBLOQUE)),2) AS BLOQUE,    C.DESCRIPCION AS DESCRIPCION_BLOQUE,  A.DESCRIPCION,  'BLOQUE  ' + RIGHT('00' + Ltrim(Rtrim(A.IDBLOQUE)),2) + '    -     '  + A.DESCRIPCION  AS DESCRIPCION_UNIDO_FINAL FROM [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL] A left join [HEVES_RRHH].[dbo].[PISOS_FISICOS] b ON A.IDPISO = B.IDPISO LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS]  C ON A.IDBLOQUE = C.IDBLOQUES ORDER BY C.DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDAREAFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_PISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'bloque' => $read->BLOQUE,
                    'descripcion_bloque' => utf8_encode( trim( $read->DESCRIPCION_BLOQUE ) ),
                    'descripcion_area_funcional' => utf8_encode( trim( $read->DESCRIPCION ) ),
                    'descripcion_unido_final' => utf8_encode( trim( $read->DESCRIPCION_UNIDO_FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function TrasladoSeleccionAF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf, $usuario ) {
        $consulta_sql = "EXEC [dbo].[SP_AGRUPAR_AREAS_FUNCIONALES]  '" . $idupss_seleccion . "', " . $iddepar_seleccion . ", " . $iddepar_upss_servicio . ", " . $idaf . ", '" . $usuario . "'";
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


    public

    function VerRegistrosTrasladoAF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio ) {
        $consulta_sql = "SELECT A.IDPAFAG, A.IDUPSS_SELECCION, A.IDDEPAR_SELECCION, A.IDSERV_SELECCION, A.IDAF, B.DESCRIPCION  FROM [HEVES_RRHH].[dbo].[PISOS_AREA_FUNCIONAL_AGRUPAR] A LEFT JOIN  [HEVES_RRHH].[dbo].[PISOS_BLOQUES_AREAFUNCIONAL] B ON A.IDAF = B.IDAREAFUNCIONAL where A.IDUPSS_SELECCION = " . $idupss_seleccion . " and A.IDDEPAR_SELECCION = " . $iddepar_seleccion . " and A.IDSERV_SELECCION = " . $iddepar_upss_servicio . " ORDER BY B.DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPAFAG,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function EliminarSeleccionAF( $idaf ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_AREA_FUNCIONAL_AGRUPAR]  WHERE IDPAFAG = " . $idaf;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function VerAmbientesFuncionales() {
        $consulta_sql = "SELECT A.IDFUNCIONAL, A.IDPISO, B.DESCRIPCION AS DESCRIPCION_PISO, A.IDBLOQUE, C.DESCRIPCION AS DESCRIPCION_BLOQUE,  A.IDAREAFUNCIONAL, A.IDAMBIENTE, A.DESCRIPCION  FROM [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL] A LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_FISICOS] B ON A.IDPISO = B.IDPISO LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_BLOQUES_FISICOS] C ON A.IDBLOQUE = C.IDBLOQUES order by a.DESCRIPCION";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDFUNCIONAL,
                    'idpiso' => $read->IDPISO,
                    'descripcion_piso' => utf8_encode( trim( $read->DESCRIPCION_PISO ) ),
                    'idbloque' => $read->IDBLOQUE,
                    'descripcion_bloque' => utf8_encode( trim( $read->DESCRIPCION_BLOQUE ) ),
                    'descripcion_ambiente_funcional' => utf8_encode( trim( $read->DESCRIPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }



    public

    function TrasladoSeleccionAmbienteF( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf, $idamf, $usuario ) {
        $consulta_sql = "EXEC [dbo].[SP_AGRUPAR_AMBIENTES_FUNCIONALES] '" . $idupss_seleccion . "', " . $iddepar_seleccion . ", " . $iddepar_upss_servicio . ", " . $idaf . ", " . $idamf . ", '" . $usuario . "'";
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


    public

    function TrasladoSeleccionAmbienteVer( $idupss_seleccion, $iddepar_seleccion, $iddepar_upss_servicio, $idaf ) {
        $consulta_sql = "SELECT A.IDPAMF, A.IDUPSS_SELECCION, A.IDDEPAR_SELECCION, A.IDSERV_SELECCION, A.IDAF, A.IDAMF, B.DESCRIPCION AS DESCRIPCION_AMBIENTE_FUNCIONAL FROM [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL_AGRUPAR] A LEFT JOIN [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL] B ON A.IDAMF = B.IDFUNCIONAL WHERE A.IDUPSS_SELECCION = " . $idupss_seleccion . " and A.IDDEPAR_SELECCION = " . $iddepar_seleccion . " and A.IDSERV_SELECCION = " . $iddepar_upss_servicio . " AND  IDAF = " . $idaf . "  ORDER BY DESCRIPCION_AMBIENTE_FUNCIONAL ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPAMF,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION_AMBIENTE_FUNCIONAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function EliminarSeleccionAMF( $idamf ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PISOS_AMBIENTE_FUNCIONAL_AGRUPAR] WHERE IDPAMF =  " . $idamf;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    /* inicio de modelo excepciones */

    public

    function ListarExcepcionesRegistradas() {
        $consulta_sql = "SELECT IDEXCEPCIONES, DESCRIPCION, TIPO_EXCEPCION, case when TIPO_EXCEPCION = 'H' then 'HORAS' when TIPO_EXCEPCION = 'D' then 'DIAS' ELSE '' END AS DESCRIPCION_TIPO_EXCEPCION,  CUANTITATIVA, NOMENCLATURA, DESCRIPCION + ' / ' +   RIGHT('00' + Ltrim(Rtrim(CUANTITATIVA)),2) + ' / ' + case when TIPO_EXCEPCION = 'H' then 'HORAS' when TIPO_EXCEPCION = 'D' then 'DIAS' ELSE '' END  AS DESCRIPCION_EXCEPCION FROM [HEVES_RRHH].[dbo].[T_EXCEPCIONES]";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDEXCEPCIONES,
                    'tipo_excepcion' => $read->TIPO_EXCEPCION,
                    'cuantitativa' => $read->CUANTITATIVA,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION_EXCEPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function GrabarExcepcionPersonal( $idpersonal, $idprofesion, $idexcepcion, $tipo_exepcion, $cuantitativo, $idupss, $iddepar, $idservicio, $mes, $anio, $usuario ) {
        $insertar_sql = "EXEC SP_ASIGNAR_EXCEPCION_A_PERSONAL '" . $idpersonal . "', " . $idprofesion . ", " . $idexcepcion . ", '" . $tipo_exepcion . "', " . $cuantitativo . ", " . $idupss . ", " . $iddepar . ", " . $idservicio . ", '" . $mes . "', '" . $anio . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );

    }


    public

    function VisualizarExcepcionesdelPersonal( $dni, $mes, $anio ) {
        $consulta_sql = "select A.IDPERSONALEXCEPCION, B.DESCRIPCION + ' / ' +   RIGHT('00' + Ltrim(Rtrim(CUANTITATIVA)),2) + ' / ' + case when B.TIPO_EXCEPCION = 'H' then 'HORAS' when B.TIPO_EXCEPCION = 'D' then 'DIAS' ELSE '' END  AS DESCRIPCION_EXCEPCION   from [HEVES_RRHH].[dbo].[PERSONAL_EXCEPCION] A LEFT JOIN  [HEVES_RRHH].[dbo].[T_EXCEPCIONES]  B ON B.IDEXCEPCIONES = A.IDEXCEPCION where A.dni = '" . $dni . "' and A.mes = '" . $mes . "' and A.anio = '" . $anio . "' order by cuantitativo  ";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPERSONALEXCEPCION,
                    'descripcion' => utf8_encode( trim( $read->DESCRIPCION_EXCEPCION ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );
    }


    public

    function EliminarExcepcionDePersonal( $id ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[PERSONAL_EXCEPCION] WHERE IDPERSONALEXCEPCION =  " . $id;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    /* fin de modelo excepciones */


    // GrabarDetalleProgramacionSOP( $idfuncional, $fecha, $nombre_dia, $idupss, $iddepar, $idservicio, $mes, $anio, $turno, $hora_inicio, $hora_fin, $usuario )


    /* inicio de sala de operaciones  */



    public

    function GenerarProgramacionSalaOperaciones( $idupss, $iddepar, $idservicio, $idfuncional, $mes, $anio, $usuario ) {
        $ejecuta_sql = "EXEC [HEVES_RRHH].[dbo].[SP_CREAR_PROGRAMACION_SALA_OPERACIONES] '" . $idupss . "', '" . $iddepar . "', '" . $idservicio . "', '" . $idfuncional . "', " . $mes . ", " . $anio . ", '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function VisualizarSalaOperaciones( $idupss, $iddepar, $idservicio, $idfuncional, $mes, $anio ) {
        $consulta_sql = "SELECT IDPROGRAMACIONSALAOPERACIONES, IDUPSS, IDDEPARTAMENTO, IDSERVICIO, IDAMBIENTEFUNCIONAL, FECHA_DATETIME, DIA, MES, ANIO, DIA_NOMBRE, HORARIO, TURNO, FECHA_SELECCIONADA, USUARIOREGISTRO, FECHAREGISTRO  FROM [HEVES_RRHH].[dbo].[SALA_OPERACIONES_PROGRAMACION] where IDUPSS = '" . $idupss . "' and IDDEPARTAMENTO = '" . $iddepar . "' and IDSERVICIO = '" . $idservicio . "' and IDAMBIENTEFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio;
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPROGRAMACIONSALAOPERACIONES,
                    'idupss' => $read->IDUPSS,
                    'iddepar' => $read->IDDEPARTAMENTO,
                    'idservi' => $read->IDSERVICIO,
                    'idambiente' => $read->IDAMBIENTEFUNCIONAL,
                    'fecha' => date( 'd/m/Y', strtotime( trim( $read->FECHA_DATETIME ) ) ),
                    'nombre_dia' => utf8_encode( trim( $read->DIA_NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function GrabarDetalleProgramacionSOP( $idfuncional, $fecha, $nombre_dia, $idupss, $iddepar, $idservicio, $mes, $anio, $turno, $hora_inicio, $hora_fin, $usuario ) {
        $ejecuta_sql = "EXEC [dbo].[SP_ASIGNAR_SALA_OPERACIONES_A_PROGRAMACION] '" . $idfuncional . "', '" . $fecha . "', '" . $nombre_dia . "', '" . $idupss . "', '" . $iddepar . "', '" . $idservicio . "', " . $mes . ", " . $anio . ", '" . $turno . "', '" . $hora_inicio . "', '" . $hora_fin . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function MostrarTurnoDiaLunes( $idfuncional, $mes, $anio ) {
        $consulta_sql = "select  *  FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " and NOMBRE_DIA = 'LUNES' ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'fecha' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'dia' => utf8_encode( trim( $read->DIA ) ),
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }



    public

    function MostrarTurnoDiaMartes( $idfuncional, $mes, $anio ) {
        $consulta_sql = "select  *  FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " and NOMBRE_DIA = 'MARTES' ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'fecha' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'dia' => utf8_encode( trim( $read->DIA ) ),
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }



    public

    function MostrarTurnoDiaMiercoles( $idfuncional, $mes, $anio ) {
        $consulta_sql = "select  *  FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " and NOMBRE_DIA = 'MIERCOLES' ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'fecha' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'dia' => utf8_encode( trim( $read->DIA ) ),
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function MostrarTurnoDiaJueves( $idfuncional, $mes, $anio ) {
        $consulta_sql = "select  *  FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " and NOMBRE_DIA = 'JUEVES' ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'fecha' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'dia' => utf8_encode( trim( $read->DIA ) ),
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function MostrarTurnoDiaViernes( $idfuncional, $mes, $anio ) {
        $consulta_sql = "select  *  FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " and NOMBRE_DIA = 'VIERNES' ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'fecha' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'dia' => utf8_encode( trim( $read->DIA ) ),
                    'turno' => utf8_encode( trim( $read->TURNO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function VerAmbienteFuncionalRegistrado( $idfuncional, $mes, $anio ) {
        $consulta_sql = "SELECT IDPROGRAMACIONCQX, FECHA_TURNO  + ' --  ' +  NOMBRE_DIA + '  --  '  +  TURNO + ' -- ' + SERVICIO  as TOTAL FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA] WHERE IDFUNCIONAL = '" . $idfuncional . "' AND MES = " . $mes . " AND ANIO = " . $anio . " ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDPROGRAMACIONCQX,
                    'total' => utf8_encode( trim( $read->TOTAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function EliminarProgramacion( $idprogram ) {
        $delete_sql = "DELETE FROM [HEVES_RRHH].[dbo].[SALA_OPERACIONES_PROGRAMACION_DETALLE]  WHERE IDPROGRAMACIONCQX =  " . $idprogram;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }


    public

    function GrabarDetalleProgramacionSOPPorDia( $idfuncional, $nombre_dia, $idupss, $iddepar, $idservicio, $mes, $anio, $turno, $hora_inicio, $hora_fin, $usuario ) {
        $ejecuta_sql = "EXEC [dbo].[SP_ASIGNAR_SALA_OPERACIONES_A_PROGRAMACION_POR_DIA] '" . $idfuncional . "', '" . $nombre_dia . "', '" . $idupss . "', '" . $iddepar . "', '" . $idservicio . "', " . $mes . ", " . $anio . ", '" . $turno . "', '" . $hora_inicio . "', '" . $hora_fin . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    public

    function EliminaTurnoSOP( $dni, $fecha ) {
        $ejecuta_sql = "delete from [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE] where DNIPERSONAL = '" . $dni . "' and fecha_datetime = convert(datetime, '" . $fecha . "', 103)";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );








    }




    /** fin de sala de operaciones   */





    /* nicio de registrar operaciones  */



    // "EXEC [dbo].[SP_CREAR_PROGRAMACION_HORARIO_PERSONAL] 

    // CrearProgramacionPersonal($idupss, $iddepar, $idservicio, $dni, $condicion, $mes, $anio, $usuario)
    public

    function CrearProgramacionPersonal( $idupss, $iddepar, $idservicio, $dni, $condicion, $mes, $anio, $usuario ) {
        $ejecuta_sql = "EXEC [dbo].[SP_CREAR_PROGRAMACION_HORARIO_PERSONAL]  '" . $idupss . "', '" . $iddepar . "', '" . $idservicio . "', '" . $dni . "', '" . $condicion . "', " . $mes . ", " . $anio . ", '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }


    // ListarRegistroUPSS


    public

    function ListarProgramacionPersonal( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT *   FROM [HEVES_RRHH].[dbo].[V_PERSONAL_ASISTENCIA_PROGRAMADO] where DNI = '" . $dni . "' and  MES = " . $mes . " and ANIO = " . $anio . " ORDER BY FECHA_DATETIME";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'id' => $read->IDASISTENCIAPERSONAL,
                    'upss' => utf8_encode( trim( $read->UPSS ) ),
                    'fecha_turno' => utf8_encode( trim( $read->FECHA_TURNO ) ),
                    'departamento' => utf8_encode( trim( $read->DEPARTAMENTO ) ),
                    'servicio' => utf8_encode( trim( $read->SERVICIO ) ),
                    'dia' => $read->DIA,
                    'dia_nombre' => utf8_encode( trim( $read->DIA_NOMBRE ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    // ListarRegistroUPSS()

    public

    function EliminarProgramacionPersonal( $dni, $mes, $anio ) {
        $delete_sql = "delete from [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] where DNI = '" . $dni . "' and  MES = " . $mes . " and ANIO = " . $anio;
        $ejecucion = $this->_db->prepare( $delete_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );

    }

    public

    function GrabarDatosProgramacion( $idfuncional, $nhoras, $hora_inicial, $hora_final, $codigo_horario, $codigo_turno, $usuario, $dni, $mes, $anio, $dia ) {
        $ejecuta_sql = "update [HEVES_RRHH].[dbo].[PERSONAL_ASISTENCIA_PROGRAMADO] set idfuncional = '" . $idfuncional . "', codigo_horario = '" . $codigo_horario . "', codigo_turno = '" . $codigo_turno . "', hora_entrada_horario = '" . $hora_inicial . "', hora_salida_horario = '" . $hora_final . "', horas = " . $nhoras . ", USUARIO_PROGRAMO = '" . $usuario . "', FECHA_PROGRAMACION = getdate() where dni = '" . $dni . "' and mes = " . $mes . " and anio = " . $anio . " and dia = '" . $dia . "'";
        $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );
    }








    public

    function GrabarDatosProgramacionActividad( $idupss, $iddepar, $idservicio, $dni, $condicion, $codigo_horario, $codigo_turno, $idfuncional, $fecha_datetime, $idactividad, $dia, $mes, $anio, $horas, $hora_inicio, $hora_fin, $dia_nombre, $usuario ) {
        $insertar_sql = "EXEC [dbo].[SP_ASIGNAR_ACTIVIDAD_A_PERSONAL] '" . $idupss . "', '" . $iddepar . "', '" . $idservicio . "', '" . $dni . "', '" . $condicion . "',  '" . $codigo_horario . "', '" . $codigo_turno . "', '" . $idfuncional . "', '" . $fecha_datetime . "', " . $idactividad . ", " . $dia . ", " . $mes . ", " . $anio . ", " . $horas . ", '" . $hora_inicio . "', '" . $hora_fin . "', '" . $dia_nombre . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }





    public

    function MostrarProgramacionLunes( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'LUNES' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function MostrarProgramacionMartes( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'MARTES' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );


    }

    public

    function MostrarProgramacionMiercoles( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'MIERCOLES' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function MostrarProgramacionJueves( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'JUEVES' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    public

    function MostrarProgramacionViernes( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'VIERNES' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function MostrarProgramacionSabado( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'SABADO' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function MostrarProgramacionDomingo( $dni, $mes, $anio ) {
        $consulta_sql = "SELECT FECHA_DATETIME, CODIGO_TURNO, HORAS, HORA_INICIO, HORA_FIN, SUBSTRING(convert(varchar(10), FECHA_DATETIME, 103),1,2)  + ' | ' + CODIGO_TURNO + ' | ' + HORA_INICIO + ' - ' + HORA_FIN AS FINAL  FROM [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  WHERE  DNIPERSONAL = '" . $dni . "'  AND MES = " . $mes . " AND ANIO = " . $anio . " AND DIA_NOMBRE = 'DOMINGO' ORDER BY FECHA_DATETIME, HORA_INICIO";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'final' => utf8_encode( trim( $read->FINAL ) ) );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }

    /*
        AsignarDiasAActividad($dni, $codigo_horario, $codigo_turno, $idfuncional, $idactividad, $mes, $anio, $horas, $hora_inicio, $hora_fin, $dia_nombre, $usuario)
            */


    public

    function AsignarDiasAActividad( $dni, $codigo_horario, $codigo_turno, $idfuncional, $idactividad, $mes, $anio, $horas, $hora_inicio, $hora_fin, $dia_nombre, $usuario ) {
        $insertar_sql = "EXEC SP_ASIGNAR_ACTIVIDAD_POR_DIA '" . $dni . "', '" . $codigo_horario . "', '" . $codigo_turno . "', '" . $idfuncional . "', " . $idactividad . ", " . $mes . ", " . $anio . ", " . $horas . ", '" . $hora_inicio . "', '" . $hora_fin . "', '" . $dia_nombre . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }


    public

    function Contabilizar_Horas_Personal( $dni, $mes, $anio ) {
        $consulta_sql = "select case when sum(horas) is null then 0 else sum(horas) end  as total  from [HEVES_RRHH].[dbo].[ACTIVIDADES_MEDNOMED_DETALLE]  where dnipersonal = '" . $dni . "' and mes = " . $mes . " and anio = " . $anio;
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verifico' => '1',
                    'total' => $read->total );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );




    }

    // ListarTotalHT()

    /** fin de registrar operaciones  */


    public

    function ListarActividadTipoActividad() {
        $consulta_sql = "  select A.IDACTIVIDAD, A.ACTIVIDAD, A.IDTIPO_ACTIVIDAD, B.TIPO_ACTIVIDAD from [HEVES_RRHH].[dbo].[ACTIVIDAD]  A  LEFT JOIN  [HEVES_RRHH].[dbo].[TIPO_ACTIVIDAD] B ON B.IDTIPO_ACTIVIDAD = A.IDTIPO_ACTIVIDAD";
        $ejecucion_read = $this->_db->prepare( $consulta_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'verificar' => '1',
                    'idactividad' => $read->IDACTIVIDAD,
                    'actividad' => utf8_encode( trim( $read->ACTIVIDAD ) ),
                    'idtipo_actividad' => $read->IDTIPO_ACTIVIDAD,
                    'tipo_actividad' => utf8_encode( trim( $read->TIPO_ACTIVIDAD ) )


                );
            }
        } else {
            $datos_read[] = array( 'verifico' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function ListadoPersonalConsolidadoProgramacion() {
        $sentencia = "EXEC [dbo].[SP_PERSONAL_CONSOLIDADO_PARA_PROGRAMACION]";
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



    public

    function GrabarFechaProgramacionregistro( $mes, $fecha_inicio_programacion, $fecha_fin_programacion, $dias, $fecha_registro_inicio, $fecha_registro_fin, $usuario ) {
        $insertar_sql = "EXEC [dbo].[SP_GRABAR_FECHAS_PROGRAMACION] " . $mes . ", '" . $fecha_inicio_programacion . "', '" . $fecha_fin_programacion . "', " . $dias . ", '" . $fecha_registro_inicio . "', '" . $fecha_registro_fin . "', '" . $usuario . "'";
        $ejecucion = $this->_db->prepare( $insertar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );


    }


    public

    function mostrar_fechas_programacion() {
        $sentencia = "SELECT * FROM [HEVES_RRHH].[dbo].[FECHAS_PROGRAMACION]";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'verificar' => '1',
                    'id' => $imprimir->IDFECHAPROGRAMACION,
                    'indicador' => $imprimir->INDICADOR,
                    'meses' => $imprimir->MESES,
                    'fecha_inicio_programacion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAINICIOPROGRAMACION ) ) ),
                    'fecha_fin_programacion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAFINPROGRAMACION ) ) ),
                    'dias' => $imprimir->DIAS,
                    'fecha_inicio_registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAINICIOREGISTRO ) ) ),
                    'fecha_fin_registro' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHAFINREGISTRO ) ) )
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

    function EliminaDataPeriodosRegistrados( $idperiodo ) {
        $eliminar_sql = "delete from [HEVES_RRHH].[dbo].[FECHAS_PROGRAMACION] where IDFECHAPROGRAMACION = " . $idperiodo;
        $ejecucion = $this->_db->prepare( $eliminar_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
    }
    
    
    
    
    public function Aperturafecha($idperiodo) {
        $ejecuta_sql = "update [HEVES_RRHH].[dbo].[FECHAS_PROGRAMACION] set INDICADOR = '1' where IDFECHAPROGRAMACION = ".$idperiodo."
         update [HEVES_RRHH].[dbo].[FECHAS_PROGRAMACION] set INDICADOR = '0' where IDFECHAPROGRAMACION <> ".$idperiodo;
          $ejecucion = $this->_db->prepare( $ejecuta_sql );
        $ejecucion->execute();
        $verificar = array( 'verificar' => '1' );
        return json_encode( $verificar );
        
        
        
    }
    
    
    



}



?>