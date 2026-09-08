<?php
class expedienteModel extends Model
{
    public  function __construct()
    {
        parent::__construct();
    }

    public  function ListarExpedientes()
    {
        $sentencia = "select  top 2500 * from v_expediente order by expediente desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'verificar' => '1',
                    'estado' =>  $imprimir->ESTADO,
                    'expediente' => utf8_encode(trim($imprimir->EXPEDIENTE)),
                    'fecha' => utf8_encode(trim($imprimir->FECHA_MOSTRAR)),
                    'hora' => utf8_encode(trim($imprimir->HORA)),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'actor_nombre_atencion' => utf8_encode(trim($imprimir->ACTOR_ATENCION_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tipo' => utf8_encode(trim($imprimir->Tipo)),
                    'prioridad' => utf8_encode(trim($imprimir->Prioridad)),
                    'actor_actual_nombre' => utf8_encode(trim($imprimir->ACTOR_ACTUAL_NOMBRE))
                );
            }
        } else {
            $array[] = array(
                'verificar' => '0',
            );
        }
        return json_encode($array);
    }

    public function obtener_documentos($user, $actor, $fecha, $buscar)
    {
        $query = "  select  * from v_expediente where  fecha = convert(datetime, '" . $fecha . "', 103) and actor_registro =  '" . $actor . "' AND   ";
        $query = $query . "  LTRIM(RTRIM(SUBSTRING(SYSINSERT,17,33))) = '" . $user . "' and  actor_nombre like '%' + '" . $buscar . "' + '%'  order by fecha desc ";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        return $prepare;
    }



    public function recargar_documentos($user, $actor, $fecha, $fecha2, $buscar, $asunto, $usuarios,  $tdocumento)
    {
        if ($usuarios == '0') {
            $seleccion_usuario = $user;
        } else {
            $seleccion_usuario = '';
        }
        $query = "  select  * from v_expediente where  fecha between convert(datetime, '" . $fecha . "', 103) and   convert(datetime,'" . $fecha2 . "', 103) and ";
        $query = $query . "  actor_registro = '" . $actor . "' AND  SYSINSERT LIKE '%' + '" . $seleccion_usuario . "' and 	 rtrim(actor) LIKE '%' +'" . $buscar . "' + '%'  AND ";
        $query = $query . "  TIPO_DOCUMENTO LIKE '%' + '" . $tdocumento . "' + '%'  AND 	 asunto like '%' +  '" . $asunto . "' + '%'  order by expediente desc;";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'expediente' => utf8_encode(trim($imprimir->EXPEDIENTE)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    'fecha' => utf8_encode(trim($imprimir->FECHA_MOSTRAR)),
                    'hora' => utf8_encode(trim($imprimir->HORA)),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'actor_atencion_nombre' => utf8_encode(trim($imprimir->ACTOR_ATENCION_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'nro_docu' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tipo' => utf8_encode(trim($imprimir->Tipo)),
                    'prioridad' => strtoupper(utf8_encode(trim($imprimir->Prioridad))),
                    'accion1' => strtoupper(utf8_encode(trim($imprimir->ACCION1_NOMBRE))),
                    'observaciones' => strtoupper(utf8_encode(trim($imprimir->OBSERVACIONES))),
                    'adjunto' => utf8_encode(trim($imprimir->ADJUNTO)),
                    'estado' => trim($imprimir->ESTADO),
                    'comentario_culminacion' => strtoupper(utf8_encode(trim($imprimir->COMENTARIO_CULMINACION))),
                    'actor' => utf8_encode(trim($imprimir->ACTOR_REGISTRO))
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado');
        }
        return json_encode($array, true);
    }


    public function ListarActorTramite($actor)
    {
        $sentencia = " SELECT * FROM V_ACTOR_DESCRIPCION WHERE ACTOR_DESCRIPCION LIKE '%' + '" . $actor . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode(trim($imprimir->TIPO_ACTOR)),
                    'mostrar_actor' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'codigo' => utf8_encode(trim($imprimir->CODIGO)),
                    'actor_descripcion' => utf8_encode(trim($imprimir->ACTOR_DESCRIPCION)),
                    'tipo_actor_descripcion' => utf8_encode(trim($imprimir->DESCRIPCION_TIPO_ACTOR)),
                    'area_de_actor' => utf8_encode(trim($imprimir->AREA_DE_ACTOR))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function ListarActorTramiteAreas($actor, $actor_busqueda)
    {

        switch ($actor) {
            case strlen($actor) == 2:
                $sentencia = " select * from v_actor_descripcion where len(actor) < 5 and actor not in ('0109', '" . $actor . "') and  actor_descripcion like '%" . $actor_busqueda . "%' order by DESCRIPCION";
                break;
            default:
                $sentencia = " select * from v_actor_descripcion where actor_descripcion like '%" . $actor_busqueda . "%' order by actor_descripcion";
                break;
        }

        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode(trim($imprimir->TIPO_ACTOR)),
                    'mostrar_actor' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'codigo' => utf8_encode(trim($imprimir->CODIGO)),
                    'actor_descripcion' => utf8_encode(trim($imprimir->ACTOR_DESCRIPCION)),
                    'tipo_actor_descripcion' => utf8_encode(trim($imprimir->DESCRIPCION_TIPO_ACTOR)),
                    'area_de_actor' => utf8_encode(trim($imprimir->AREA_DE_ACTOR))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function  ListarActorTramiteUbicando($actor)
    {
        $sentencia = "select ACTOR, DESCRIPCION, ABREVIATURA, RESPONSABLE, TIPO_ACTOR,CODIGO, ACTOR_DESCRIPCION, DESCRIPCION_TIPO_ACTOR, ";
        $sentencia = $sentencia . " AREA_DE_ACTOR from V_ACTOR_DESCRIPCION where actor = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode(trim($imprimir->TIPO_ACTOR)),
                    'mostrar_actor' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'codigo' => utf8_encode(trim($imprimir->CODIGO)),
                    'actor_descripcion' => utf8_encode(trim($imprimir->ACTOR_DESCRIPCION)),
                    'tipo_actor_descripcion' => utf8_encode(trim($imprimir->DESCRIPCION_TIPO_ACTOR)),
                    'area_de_actor' => utf8_encode(trim($imprimir->AREA_DE_ACTOR))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }





    public function MostrarDirector($actor)
    {
        $sentencia = "SELECT * FROM V_ACTOR_DESCRIPCION WHERE ACTOR = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'mostrar_actor' => utf8_encode($imprimir->DESCRIPCION),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'actor_descripcion' => utf8_encode($imprimir->ACTOR_DESCRIPCION),
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR),
                    'descripcion_tipo_actor' => utf8_encode(trim($imprimir->DESCRIPCION_TIPO_ACTOR))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function MostrarDirectorArea($actor)
    {
        $sentencia = "SELECT * FROM V_ACTOR_DESCRIPCION WHERE ACTOR = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'mostrar_actor' => utf8_encode($imprimir->DESCRIPCION),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'actor_descripcion' => utf8_encode($imprimir->ACTOR_DESCRIPCION),
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR),
                    'descripcion_tipo_actor' => utf8_encode(trim($imprimir->DESCRIPCION_TIPO_ACTOR))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function MostrarTreporte($treporte)
    {
        $sentencia = " select TIPO_REPORTE, UPPER(NOMBRE) AS NOMBRE, ESTADO, TIPO_REPORTE + ' [' + upper(NOMBRE) + ']' as RESULTADO ";
        $sentencia = $sentencia . " from TIPO_REPORTE where TIPO_REPORTE =  '" . $treporte . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_reporte' => utf8_encode(trim($imprimir->TIPO_REPORTE)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function ListarTdoc($tdoc)
    {
        $sentencia = " select * from v_tipo_documento where resultado like '%' + '" . $tdoc . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_documento' => trim($imprimir->TIPO_DOCUMENTO),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function ListarTdocDefecto($tdocu)
    {
        $sentencia = " select * from V_TIPO_DOCUMENTO where TIPO_DOCUMENTO = '" . $tdocu . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_documento' => trim($imprimir->TIPO_DOCUMENTO),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function ListarPrioridad($prio)
    {
        $sentencia = " select PRIORIDAD, DESCRIPCION, DIAS, ESTADO, RESULTADO  from v_prioridad  where resultado like '%' + '" . $prio . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_prioridad' => trim($imprimir->PRIORIDAD),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'dias' => $imprimir->DIAS,
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function ListarPrioridadUbicar($prio)
    {
        $sentencia = "select PRIORIDAD, DESCRIPCION, DIAS, ESTADO, RESULTADO  from v_prioridad  where prioridad = '" . $prio . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_prioridad' => trim($imprimir->PRIORIDAD),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'dias' => $imprimir->DIAS,
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }







    public function ListarAccion($accion)
    {
        $sentencia = " select * from V_ACCION   WHERE RESULTADO LIKE '%' + '" . $accion . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_accion' => trim($imprimir->ACCION),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function ListarAccion1($accion1)
    {
        $sentencia = "select ACCION, DESCRIPCION, RESULTADO from V_ACCION   WHERE ACCION = '" . $accion1 . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_accion' => trim($imprimir->ACCION),
                    'nombre' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function ListarReferencia($referencia)
    {
        $sentencia = " select EXPEDIENTE, N_EXPEDIENTE_ID, FECHA, ACTOR_NOMBRE,   N_EXPEDIENTE_ID +  '  (' + CONVERT(VARCHAR(10), FECHA,103) + ')  ' + ACTOR_NOMBRE   AS RESULTADO  ";
        $sentencia = $sentencia . " from V_EXPEDIENTE WHERE EXPEDIENTE LIKE '%' + '" . $referencia . "' + '%' order by expediente desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->EXPEDIENTE),
                    'expediente_id' => trim($imprimir->N_EXPEDIENTE_ID),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }





    public function  ListarUbicacionExpediente($ubicar)
    {
        $sentencia = " select expediente, estado, n_expediente_id, convert(varchar(10), fecha, 103) as fecha, hora, actor_nombre, asunto,  nro_documento, tipo, prioridad, accion1_nombre, observaciones, adjunto,  n_expediente_id +  '  (' + convert(varchar(10), fecha,103) + ')  ' + actor_nombre   as resultado  ";
        $sentencia = $sentencia . " from v_expediente where resultado like '%' + '" . $ubicar . "' + '%' order by expediente desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->expediente),
                    'expediente_id' => trim($imprimir->n_expediente_id),
                    'estado' => trim($imprimir->estado),
                    'fecha' => utf8_encode(trim($imprimir->fecha)),
                    'hora' => utf8_encode(trim($imprimir->hora)),
                    'asunto' => utf8_encode(trim($imprimir->asunto)),
                    'actor_nombre' => utf8_encode(trim($imprimir->actor_nombre)),
                    'nro_documento' => utf8_encode(trim($imprimir->nro_documento)),
                    'tipo' => utf8_encode(trim($imprimir->tipo)),
                    'prioridad' => utf8_encode(trim($imprimir->prioridad)),
                    'accion1_nombre' => utf8_encode(trim($imprimir->accion1_nombre)),
                    'observaciones' => utf8_encode(trim($imprimir->observaciones)),
                    'adjunto' => utf8_encode(trim($imprimir->adjunto)),
                    'resultado' => utf8_encode(trim($imprimir->resultado))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }






    public function ListarReferenciaExpediente($referencia)
    {
        $sentencia = " select EXPEDIENTE, N_EXPEDIENTE_ID, FECHA, ACTOR_NOMBRE,  RESULTADO     from V_EXPEDIENTE WHERE  RESULTADO  LIKE '%' + upper('" . $referencia . "') + '%' order by expediente desc;";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->EXPEDIENTE),
                    'expediente_id' => trim($imprimir->N_EXPEDIENTE_ID),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    // RecargarTramite
    public function GrabarExpediente($fecha_expediente, $hora_expediente, $user, $actor_registra, $actor_remitente, $remitente, $asunto, $prioridad, $plazo, $tipo_doc, $nro_doc, $folios, $actor_atencion, $accion1, $accion2, $referencia, $tipo_reporte, $observacion, $adjunto)
    {
        $sentencia = "exec GrabarExpediente '" . $actor_registra . "', '" . $fecha_expediente . "', '" .  $hora_expediente . "',   '" . $actor_remitente . "', '" . $remitente . "',   '" . $asunto . "', '" . $prioridad . "',  " . $plazo . ", '" . $tipo_doc . "',  '" . $nro_doc . "',   " . $folios . ",  '" . $actor_atencion . "',  '" . $actor_atencion . "', '" . $user . "', '" . $accion1 . "', '" . $accion2 . "', '00', '" . $referencia . "',  '" . $tipo_reporte . "', '" . $observacion . "', '" . $adjunto . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function  EditarExpediente($id, $fecha_expediente, $hora_expediente, $user, $actor_remitente, $remitente, $asunto, $prioridad, $plazo, $tipo_doc, $nro_doc, $folios, $accion1, $accion2, $referencia, $observacion)
    {

        $sentencia = " update Expediente set Fecha = convert(datetime, '" . $fecha_expediente . "', 104),     Hora = substring('" .  $hora_expediente . "', 1,5), Actor ='" . $actor_remitente . "', NOMBRE =  upper('" . $remitente . "'),
           ASUNTO = UPPER('" . $asunto . "'), PRIORIDAD =  '" . $prioridad . "', DIAS = " . $plazo . ", Tipo_Documento = '" . $tipo_doc . "',   Nro_Documento = upper('" . $nro_doc . "'), Folios = " . $folios . ", 
                SYSUPDATE = convert(varchar(10), getdate(), 103) + ' ' + CONVERT(VARCHAR(5), GETDATE(), 108) + ' ' + '" . $user . "',   Accion1 = '" . $accion1 . "', Accion2 = '" . $accion2 . "', Referencia = '" . $referencia . "', observaciones = UPPER('" . $observacion . "') WHERE Expediente = RTRIM('" . $id . "') ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }






    public  function ObtenerListadoEntidades($id)
    {
        $sentencia = " select top 1000 * from v_actor_descripcion where tipo_actor = '02' and actor_descripcion like '%' + '" . $id . "' + '%' COLLATE Latin1_general_CI_AI order by actor desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'mostrar_actor' => utf8_encode($imprimir->DESCRIPCION),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'actor_descripcion' => utf8_encode($imprimir->ACTOR_DESCRIPCION),
                    'descripcion_tipo_actor' => utf8_encode($imprimir->DESCRIPCION_TIPO_ACTOR),
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR),
                    'direccion' => utf8_encode($imprimir->DIRECCION),
                    'telefono' => utf8_encode($imprimir->TELEFONO),
                    'ruc' => utf8_encode($imprimir->RUC)

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }






    public  function  VerMinMax($actor_registra, $fecha1, $fecha2)
    {

        $sentencia = " select (select min(expediente) Minimo  from v_expediente where fecha between  convert(datetime, '" . $fecha1 . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)  and actor_registro = '" . $actor_registra . "' and estado <> 0) inicial, 
                (select max(expediente) Minimo from v_expediente where fecha between  convert(datetime, '" . $fecha1 . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)  and actor_registro = '" . $actor_registra . "' and estado <> 0) final; ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'inicial' => utf8_encode(trim($imprimir->inicial)),
                    'final' => utf8_encode(trim($imprimir->final))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public  function VerMinMaxProcesar($actor_registra, $fecha1, $fecha2)
    {
        $sentencia =  " select (select min(expediente) Minimo  from v_expediente where fecha between convert(datetime, '" . $fecha1 . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)  and actor_registro =  '" . $actor_registra . "' and estado = 1) inicial,
                (select max(expediente) Minimo from v_expediente where fecha between convert(datetime, '" . $fecha1 . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)  and actor_registro = '" . $actor_registra . "' and estado = 1)  final; ";

        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'inicial' => utf8_encode(trim($imprimir->inicial)),
                    'final' => utf8_encode(trim($imprimir->final))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function VerDatosCabecera($inicioexp, $finexp, $actor_registra)
    {
        $sentencia = "select * from v_expediente where expediente between '" . $inicioexp . "' and '" . $finexp . "' and estado <> 0 and ACTOR_REGISTRO = '" . $actor_registra . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_doc' => utf8_encode(trim($imprimir->Tipo)),
                    'expediente' => utf8_encode(trim($imprimir->EXPEDIENTE)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'fecha' => utf8_encode(trim($imprimir->FECHA_MOSTRAR)),
                    'hora' => utf8_encode(trim($imprimir->HORA)),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor-atencion' => utf8_encode(trim($imprimir->ACTOR_ATENCION_NOMBRE)),
                    'prioridad' => utf8_encode(trim($imprimir->PRIORIDAD_COD)),
                    'ac1' => utf8_encode(trim($imprimir->ACCION1)),
                    'ac2' => utf8_encode(trim($imprimir->ACCION2))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function VerDatosCabeceraHT($inicioexp, $finexp, $actor_registra)
    {
        $lc_unidad = substr($inicioexp, -9, 2);
        if ($lc_unidad == 'TD') {
            $sentencia = "select * from v_expediente where expediente between '" . $inicioexp . "' and '" . $finexp . "' and estado <> 0 and ACTOR_ACTUAL = '" . $actor_registra . "'";
        } else {
            // $sentencia = "select * from v_expediente where expediente between '" . $inicioexp . "' and '" . $finexp . "' and estado <> 0 and ACTOR_REGISTRO = '" . $actor_registra . "'";
            $sentencia = "select * from v_expediente where expediente between '" . $inicioexp . "' and '" . $finexp . "' and estado <> 0";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_doc' => utf8_encode(trim($imprimir->Tipo)),
                    'expediente' => utf8_encode(trim($imprimir->EXPEDIENTE)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'fecha' => utf8_encode(trim($imprimir->FECHA_MOSTRAR)),
                    'hora' => utf8_encode(trim($imprimir->HORA)),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor-atencion' => utf8_encode(trim($imprimir->ACTOR_ATENCION_NOMBRE)),
                    'prioridad' => utf8_encode(trim($imprimir->PRIORIDAD_COD)),
                    'ac1' => utf8_encode(trim($imprimir->ACCION1)),
                    'ac2' => utf8_encode(trim($imprimir->ACCION2))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }





    public function EditarEntidades($id, $descripcion, $abreviatura, $direccion, $telefono, $ruc)
    {

        $sentencia = " UPDATE ACTOR SET DESCRIPCION = upper('" . $descripcion . "'),    ABREVIATURA =  upper('" . $abreviatura . "'),      DIRECCION = upper('" . $direccion . "'),      TELEFONO = '" . $telefono . "', ";
        $sentencia = $sentencia .  " RUC = '" . $ruc . "' WHERE ACTOR = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function GrabarEntidades($user, $descripcion, $abreviatura, $direccion, $telefono, $ruc)
    {
        $sentencia = " insert into ACTOR (ACTOR, DESCRIPCION, ABREVIATURA, TIPO_ACTOR, RESPONSABLE, CODIGO, AREA_DE_ACTOR, TRAMITE, DIRECCION, TELEFONO, RUC, USUARIOREGISTRA) ";
        $sentencia = $sentencia . " VALUES((SELECT case when MAX(SUBSTRING(Actor,2,5)) is null then 'E00001' ELSE  'E' + RIGHT('00000' + CONVERT(VARCHAR(5), MAX(SUBSTRING(Actor,2,5)) + 1), 5) END FROM Actor WHERE LEFT(Actor,1)='E'), UPPER('" . $descripcion . "'), UPPER('" . $abreviatura . "'), '02', '', 'O', 'O', 'N',  UPPER('" . $direccion . "'), '" . $telefono . "', '" . $ruc . "', '" . $user . "' )";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function  EliminarEntidad($id)
    {
        $sentencia = " exec EliminarEntidad  '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'confirma' => trim($imprimir->CONFIRMA),
                    'existe' => trim($imprimir->EXISTE)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function  EliminarEntidadConfirmar($id)
    {
        $sentencia =  " DELETE FROM ACTOR WHERE ACTOR ='" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function RecuperacionExpediente($id)
    {
        $sentencia = " select  * from V_EXPEDIENTE WHERE EXPEDIENTE = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'fecha' => date("d/m/Y", strtotime($imprimir->FECHA)),
                    'hora' => trim($imprimir->HORA),
                    'tipo_documento' => trim($imprimir->TIPO_DOCUMENTO),
                    'descrip_documento' => utf8_encode(trim($imprimir->Tipo)),
                    'nro_doc' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'folios' => utf8_encode(trim($imprimir->FOLIOS)),
                    'nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'tipo_actor' => utf8_encode(trim($imprimir->TIPO_ACTOR)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'idprioridad' => trim($imprimir->PRIORIDAD_COD),
                    'prioridad' => trim($imprimir->Prioridad),
                    'dias' => trim($imprimir->DIAS),
                    'accion1' => trim($imprimir->ACCION1),
                    'accion1_nombre' => utf8_encode(trim($imprimir->ACCION1_NOMBRE)),
                    'accion2' => trim($imprimir->ACCION2),
                    'accion2_nombre' => utf8_encode(trim($imprimir->ACCION2_NOMBRE)),
                    'referencia' => utf8_encode(trim($imprimir->REFERENCIA)),
                    'observacion' => utf8_encode(trim($imprimir->OBSERVACIONES))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function ObtenerTdoc($id)
    {
        $sentencia = " select  * from v_tipo_documento where RESULTADO like '%' +  '" . $id . "' + '%' ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_documento' => trim($imprimir->TIPO_DOCUMENTO),
                    'descrip_documento' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function  GrabarTdoc($descripcion)
    {
        $sentencia = " exec GrabarTdoc '" . $descripcion . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function  EditarTdoc($id, $descripcion)
    {
        $sentencia = " update tipo_documento set descripcion = upper(rtrim('" . $descripcion . "')) where tipo_documento = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function  EliminarTdoc($id)
    {

        $sentencia = " exec EliminarTdoc  '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'confirma' => utf8_encode(trim($imprimir->CONFIRMA)),
                    'existe' => utf8_encode(trim($imprimir->EXISTE))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function EliminarTdocConfirmar($id)
    {
        $sentencia =  " delete from tipo_documento where tipo_documento = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function ListarReporte($reporte)
    {
        $sentencia = " SELECT Tipo_Reporte, upper(Nombre) as nombre, Tipo_reporte + ' - ' + upper(Nombre)  as reporte_nombre FROM Tipo_Reporte where estado='1'  ";
        $sentencia = $sentencia . " and RTRIM(tipo_reporte) like  '" . $reporte . "' + '%'   OR  nombre like '%' + '" . $reporte . "' + '%'  ORDER BY tipo_reporte;";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'treporte' => $imprimir->Tipo_Reporte,
                    'nombre' => utf8_encode(trim($imprimir->nombre)),
                    'reporte_nombre' => utf8_encode(trim($imprimir->reporte_nombre))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function EliminacionExpediente($id, $actor)
    {
        $sentencia =  " exec EliminacionExpediente  '" . $actor . "', '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function RecuperarEstado_1($id)
    {
        $sentencia =   "  update expediente set estado = '1', comentario_culminacion = '', usuario_culminacion = '', hora_culminacion = '', fecha_culminacion = null ";
        $sentencia =  $sentencia .  "       where expediente = '" . $id . "' ";
        $sentencia =  $sentencia .  "  delete from expediente_detalle where expediente = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function ProcesarEstado_2($actor_registra, $inicio, $fin)
    {
        $sentencia =  " update expediente set estado = '2'  where expediente between '" . $inicio . "' and '" . $fin . "' and estado = 1 and actor_registro = '" . $actor_registra . "'";
        $sentencia =  $sentencia .  " insert into expediente_detalle (expediente, numero, fecha, hora, Actor_Origen, Actor_Destino, documento, observaciones, copias, Cargo_Id, ";
        $sentencia =  $sentencia .  "    Recepcion_Hora, sysinsert, sysupdate, estado, accion1, accion2, accion3, TRASLADO_RECEPCION_FECHA, PRIORIDAD, envio, DIAS) ";
        $sentencia =  $sentencia .  " select expediente, '01' numero, fecha, convert(char(5), getdate(), 108) as hora, actor_registro as Actor_Origen, actor_atencion as Actor_Destino, nro_documento as  documento, ";
        $sentencia =  $sentencia .  "   observaciones, '' copias, '' Cargo_Id,    '' Recepcion_Hora,  sysinsert, '' sysupdate,  2 as  estado, accion1, accion2, accion3, '' TRASLADO_RECEPCION_FECHA, ";
        $sentencia =  $sentencia .  "   PRIORIDAD, 'D' envio, '0' DIAS from  expediente where expediente between '" . $inicio . "' and '" . $fin . "' and estado = 2 and ACTOR_REGISTRO = '" . $actor_registra . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function RecargarDerivados($actor, $fecha, $fecha2, $mostrar)
    {

        $previo_mostrar = "update Expediente_Detalle set cargo_id = '' where  substring(cargo_id,5,7) = '0000000'";
        $prepare = $this->_db->prepare($previo_mostrar);
        $prepare->execute();

        if ($mostrar == 0) {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            }
        } else {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
                Cargo_Usuario = '' order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
                Cargo_Usuario = '' order by expediente desc;";
            }
        }

        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE)
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }


    public function RecargarDerivadosOTD($actor, $fecha, $fecha2, $mostrar)
    {

        $previo_mostrar = "update Expediente_Detalle set cargo_id = '' where  substring(cargo_id,5,7) = '0000000'";
        $prepare = $this->_db->prepare($previo_mostrar);
        $prepare->execute();

        if ($mostrar == 0) {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            }
        } else {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
                Cargo_Usuario = '' order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
                Cargo_Usuario = '' order by expediente desc;";
            }
        }

        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE)
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }


    public function RecargarDerivadosINTERNO($actor, $fecha, $fecha2, $mostrar)
    {

        $previo_mostrar = "update Expediente_Detalle set cargo_id = '' where  substring(cargo_id,5,7) = '0000000'";
        $prepare = $this->_db->prepare($previo_mostrar);
        $prepare->execute();

        if ($mostrar == 0) {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
            }
        } else {
            if ($actor == '0109') {
                $query = "  select *   from v_Expediente_Det where estado = 2 and numero = '01' and actor_registro = '0109' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
            Cargo_Usuario = '' order by expediente desc;";
            } else {
                $query = "  select *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 2 and numero = ocurrencia and actor_de = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103) and
            Cargo_Usuario = '' order by expediente desc;";
            }
        }

        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE)
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }


    public function GenerarCargo($actor)
    {
        $query = " exec GenerarCargo '" . $actor . "'";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'cargo_id' => utf8_encode(trim($imprimir->cargo_id))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array, true);
    }


    public function  GrabarCargoExpediente($expediente, $cargo, $user, $fecha, $numero, $actor_origen)
    {
        $sentencia = " update expediente_detalle set cargo_hora = convert(char(5), getdate(), 108), cargo_fecha = convert(datetime, '" . $fecha . "', 103), cargo_id = '" . $cargo . "', cargo_usuario = '" . $user . "'";
        $sentencia = $sentencia . " where expediente = '" . $expediente . "' and numero = '" . $numero . "' and Actor_Origen = '" . $actor_origen . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function VerCabeceraHojaDerivado($cargo)
    {
        $sentencia = "  select Expediente,Fecha,Nombre,Actor_1_Descripcion,Actor_2_Descripcion,  Asunto,Nro_Documento,Actor_AbreviaturaDe,Numero,Cargo_Id, ";
        $sentencia = $sentencia . "    Traslado,N_Expediente_Id,Observaciones,  Accion1,Accion2,Accion3,Prioridad, Descripcion, folios,   case when ADJUNTO <> '' then ADJUNTO else '' end as adjunto,  RANK() OVER(ORDER BY expediente) Correlativo   FROM v_Expediente_det  ";
        $sentencia = $sentencia . "        where cargo_id = '" . $cargo . "'  order by   n_expediente_id asc; ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'correlativo' => $imprimir->Correlativo,
                    'expediente' => utf8_encode(trim($imprimir->Expediente)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_Expediente_Id)),
                    'fecha' =>  date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->Nombre)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'accion1' => trim($imprimir->Accion1),
                    'accion2' => trim($imprimir->Accion2),
                    'accion3' => trim($imprimir->Accion3),
                    'prioridad' => trim($imprimir->Prioridad),
                    'asunto' => utf8_encode(trim($imprimir->Asunto)),
                    'folios' => trim($imprimir->folios),
                    'descripcion' => utf8_encode(trim($imprimir->Descripcion)),
                    'nro_documento' => utf8_encode(trim($imprimir->Nro_Documento)),
                    'adjunto' => utf8_encode(trim($imprimir->adjunto)) == '' ? '' : "<strong>Adjunto Digital: </strong>" . utf8_encode(trim($imprimir->adjunto))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function VerDetalleExpediente($inicioexp)
    {
        $sentencia = " select Expediente,Fecha,Nombre,Actor_1_Descripcion,Actor_2_Descripcion,  Asunto,Nro_Documento,Actor_AbreviaturaDe,Numero,Cargo_Id, ";
        $sentencia = $sentencia . "   Traslado,N_Expediente_Id,Observaciones,  Accion1,Accion2,Accion3,Prioridad, Descripcion, folios,  RANK() OVER(ORDER BY  numero) Correlativo    FROM v_Expediente_det  ";
        $sentencia = $sentencia . "     where Expediente = '" . $inicioexp . "'  order by   n_expediente_id asc ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'correlativo' => trim($imprimir->Correlativo),
                    'expediente' => utf8_encode(trim($imprimir->Expediente)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_Expediente_Id)),
                    'fecha' =>  date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->Nombre)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'accion1' => trim($imprimir->Accion1),
                    'accion2' => trim($imprimir->Accion2),
                    'accion3' => trim($imprimir->Accion3),
                    'prioridad' => trim($imprimir->Prioridad),
                    'asunto' => utf8_encode(trim($imprimir->Asunto)),
                    'folios' => trim($imprimir->folios),
                    'descripcion' => utf8_encode(trim($imprimir->Descripcion)),
                    'nro_documento' => utf8_encode(trim($imprimir->Nro_Documento))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function MostrarCargosGenerados($fechafin, $actor_registra)
    {
        $sentencia = "  Select Cargo_Id From Expediente_Detalle  Where Left(Cargo_Id,2)= substring(convert(varchar(4), year( convert(datetime, '" . $fechafin . "', 103))), 3,2)  and Substring(Cargo_Id,3,2) in (select rtrim(codigo) from actor where actor = '" . $actor_registra . "')";
        $sentencia = $sentencia . "  group by Cargo_Id   order by Cargo_Id desc ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'cargo_id' => utf8_encode(trim($imprimir->Cargo_Id))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function RecargarDesactivados($actor, $fecha, $fecha2)
    {
        $query = "  select *   from v_Expediente_Det where Estado = 0 and Actor_De = '" . $actor . "' and fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103) order by expediente desc;";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => (is_null($imprimir->Cargo_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => (is_null($imprimir->Recepcion_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => (is_null($imprimir->TRASLADO_RECEPCION_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE)
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }


    public function  ActivarExpediente($id, $actor)
    {
        $sentencia =  " update expediente set estado = '1' where expediente =  rtrim('" . $id . "') and actor_registro = '" . $actor . "'";
        $sentencia =  $sentencia .  " delete from expediente_detalle where expediente = rtrim('" . $id . "')";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* seccion tramite, recepcion, culminacion */

    public function RecargarTramite($actor, $fecha, $fecha2, $tramite)
    {
        switch ($tramite) {
            case 'T':
                $query = " select 'T' AS tramite, *   from v_Expediente_Det where estado = 2 and actor_a = '" . $actor . "' and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha is null and FECHA_CULMINACION is null order by expediente desc ";
                break;
            case 'R':
                $query = "select 'R' AS tramite, *   from v_Expediente_Det where estado = 2 and actor_a = '" . $actor . "'  and   Recepcion_fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . "   and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION is null order  by expediente desc ";
                break;

            case 'D':
                $query =  " select 'D' AS tramite, *   from v_Expediente_Det where estado = 2 and actor_de = '" . $actor . "'  and  fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and Recepcion_Fecha is null and ocurrencia = numero  order by expediente desc ;";
                break;
            case 'C':
                $query = " select 'C' AS tramite, *   from v_Expediente_Det where estado = 3 and actor_a = '" . $actor . "'  and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION <> '' order by expediente desc ";
                break;
            default:
                break;
        }
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'tramite' => trim($imprimir->tramite),
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => (is_null($imprimir->Cargo_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => (is_null($imprimir->Recepcion_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => (is_null($imprimir->TRASLADO_RECEPCION_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->Hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE),
                    'comentario_recepcion' => utf8_encode(trim($imprimir->Recepcion_comentario)),
                    'adjunto' => utf8_encode(trim($imprimir->ADJUNTO))

                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }




    public function RecargarTramiteOTD($actor, $fecha, $fecha2, $tramite)
    {
        switch ($tramite) {
            case 'T':
                $query = " select 'T' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 2 and actor_a = '" . $actor . "' and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha is null and FECHA_CULMINACION is null order by expediente desc ";
                break;
            case 'R':
                $query = "select 'R' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 2 and actor_a = '" . $actor . "'  and   Recepcion_fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . "   and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION is null order  by expediente desc ";
                break;

            case 'D':
                $query =  " select 'D' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 2 and actor_de = '" . $actor . "'  and  fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and Recepcion_Fecha is null and ocurrencia = numero  order by expediente desc ;";
                break;
            case 'C':
                $query = " select 'C' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) = 'TD' and estado = 3 and actor_a = '" . $actor . "'  and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION <> '' order by expediente desc ";
                break;
            default:
                break;
        }
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'tramite' => trim($imprimir->tramite),
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => (is_null($imprimir->Cargo_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => (is_null($imprimir->Recepcion_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => (is_null($imprimir->TRASLADO_RECEPCION_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->Hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE),
                    'comentario_recepcion' => utf8_encode(trim($imprimir->Recepcion_comentario)),
                    'adjunto' => utf8_encode(trim($imprimir->ADJUNTO))

                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }



    public function RecargarTramiteInterno($actor, $fecha, $fecha2, $tramite)
    {
        switch ($tramite) {
            case 'T':
                $query = " select 'T' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 2 and actor_a = '" . $actor . "' and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha is null and FECHA_CULMINACION is null order by expediente desc ";
                break;
            case 'R':
                $query = "select 'R' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 2 and actor_a = '" . $actor . "'  and   Recepcion_fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . "   and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION is null order  by expediente desc ";
                break;

            case 'D':
                $query =  " select 'D' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 2 and actor_de = '" . $actor . "'  and  fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and Recepcion_Fecha is null and ocurrencia = numero  order by expediente desc ;";
                break;
            case 'C':
                $query = " select 'C' AS tramite, *   from v_Expediente_Det where substring(Expediente,3,2) <> 'TD' and estado = 3 and actor_a = '" . $actor . "'  and   fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
                $query = $query . " and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha <> '' and FECHA_CULMINACION <> '' order by expediente desc ";
                break;
            default:
                break;
        }
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1,
                    'tramite' => trim($imprimir->tramite),
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'numero' => trim($imprimir->Numero),
                    'fecha' => date("d/m/Y", strtotime($imprimir->Fecha)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'estado' => $imprimir->ESTADO,
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'actor_actuald' => utf8_encode(trim($imprimir->Actor_actuald)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_actual' => trim($imprimir->ACTOR_ACTUAL),
                    'decripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tramitador' => trim($imprimir->Tramitador),
                    'actor_abreviaturade' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'actor_abreviaturaa' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'cargo_fecha' => (is_null($imprimir->Cargo_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Cargo_Fecha)),
                    'cargo_id' => trim($imprimir->Cargo_Id),
                    'ocurrencia' => trim($imprimir->OCURRENCIA),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->Actor_2_Descripcion)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->Actor_1_Descripcion)),
                    'accion1' => trim($imprimir->accion1),
                    'accion2' => trim($imprimir->accion2),
                    'accion3' => trim($imprimir->accion3),
                    'recepcion_fecha' => (is_null($imprimir->Recepcion_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'recepcion_hora' => trim($imprimir->Recepcion_Hora),
                    'cargo_hora' => trim($imprimir->Cargo_Hora),
                    'cargo_usuario' => trim($imprimir->Cargo_Usuario),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => trim($imprimir->HORA_CULMINACION),
                    'traslado' => trim($imprimir->traslado),
                    'estado_cabecera' => trim($imprimir->Estado_Cabecera),
                    'actor_registro' => trim($imprimir->ACTOR_REGISTRO),
                    'actor_registro_nombre' => utf8_encode(trim($imprimir->Actor_Registro_Nombre)),
                    'forma_documento' =>  trim($imprimir->FORMA_DOCUMENTO),
                    'traslado_recepcion_fecha' => (is_null($imprimir->TRASLADO_RECEPCION_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->TRASLADO_RECEPCION_FECHA)),
                    'traslado_recepcion_hora' => trim($imprimir->TRASLADO_RECEPCION_HORA),
                    'hora' => trim($imprimir->Hora),
                    'hora_registro' => utf8_encode(trim($imprimir->HORA_REGISTRO)),
                    'n_expediente_id' => trim($imprimir->N_Expediente_Id),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'comentario_culminacion' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'prioridad_nombre' => utf8_encode(trim($imprimir->Prioridad_Nombre)),
                    'nro_documento_detalle' => utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'tipo_reporte' => trim($imprimir->TIPO_REPORTE),
                    'comentario_recepcion' => utf8_encode(trim($imprimir->Recepcion_comentario)),
                    'adjunto' => utf8_encode(trim($imprimir->ADJUNTO))

                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'NO existe registros');
        }
        return json_encode($array, true);
    }

    public function   GrabarRecepcion($fecha, $actor, $expediente, $comentario, $user, $nro)
    {
        $sentencia =  " exec GrabarRecepcion '" . $expediente . "', '" . $actor . "', '" . $user . "', '" . $fecha . "', '" . $nro . "', '" . $comentario . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function  GrabarActorCC($actor, $id, $user, $nro_expe)
    {
        $sentencia =  " exec sp_grabar_expediente_copia '" . $id . "', '" . $actor . "', '" . $user . "', '" . $nro_expe . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function MostrarActorCC($id, $user, $nro_expe)
    {
        if ($nro_expe === '1') {
            $sentencia =  " select a.Expediente, a.Actor, a.NUMERO, a.dfecharegistro, a.condicion, a.usuario, B.DESCRIPCION from expediente_copia a ";
            $sentencia =  $sentencia . " left join actor b on b.ACTOR = a.Actor WHERE a.expediente like substring('" . $id . "',1,10) + '%' and a.condicion = 'A' and a.usuario = '" . $user . "'";
        } else {
            $sentencia =  " select a.Expediente, a.Actor, a.NUMERO, a.dfecharegistro, a.condicion, a.usuario, B.DESCRIPCION from expediente_copia a ";
            $sentencia =  $sentencia . " left join actor b on b.ACTOR = a.Actor WHERE  a.condicion = 'A' and a.usuario = '" . $user . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->Expediente),
                    'actor' => utf8_encode(trim($imprimir->Actor)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function  EliminarActorCC($id, $actor)
    {
        $sentencia =  " delete from expediente_copia where expediente = '" . $id . "' and actor = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* derivar nuevo documento */


    public function  GrabarDerivarExpedienteCC($user, $actor_actual, $expediente, $tipo_operacion, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $nro_doc, $observacion, $doc_adj1, $doc_adj2)
    {
        if ($tipo_operacion === '1') {
            $sentencia = "exec GrabarDerivarExpedienteCC '" . $expediente . "', '" . $fecha . "', '" . $hora . "', '" . $user . "', '" . $actor_actual . "', '" . $actor_destino . "', '" . $prioridad . "', '" . $accion1 . "', '" . $accion2 . "', '00', '" . $nro_doc . "', '" . $observacion . "',  '" . $doc_adj1 . "', '" . $doc_adj2 . "'";
        } else {
            // modificacion
        }

        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function  GrabarDerivarExpedienteBloqueCC($user, $actor_actual, $expediente, $tipo_operacion, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $observacion, $doc_adj1, $doc_adj2)
    {
        if ($tipo_operacion === '1') {
            $sentencia = "exec GrabarDerivarExpedienteBloqueCC '" . $expediente . "', '" . $fecha . "', '" . $hora . "', '" . $user . "', '" . $actor_actual . "', '" . $actor_destino . "', '" . $prioridad . "', '" . $accion1 . "', '" . $accion2 . "', '00', '" . $observacion . "', '" . $doc_adj1 . "', '" . $doc_adj2 . "'";
        } else {
            // modificacion
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function RecuperarExpedienteDerivado($id, $nro, $actor)
    {
        $sentencia =  "exec RecuperarExpedienteDerivado  '" . $actor . "', '" . $id . "',  '" . $nro . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function RecuperarDerivadoEmitidoEditar($id, $nro, $actor)
    {
        $sentencia =  "  select Expediente, EXPEDIENTE_ID, Fecha, Hora, Actor_A, Actor_AbreviaturaA, PRIORIDAD, Prioridad_Nombre, accion1, DESCRIPCION_ACCION1, accion2, DESCRIPCION_ACCION2, NRO_DOCUMENTO_DETALLE, Observaciones, ASUNTO  from v_Expediente_Det where expediente = '" . $id . "' and numero = '" . $nro . "' and Actor_De = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->Expediente),
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'fecha' => (is_null($imprimir->Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Fecha)),
                    'hora' => trim($imprimir->Hora),
                    'actor_a' => trim($imprimir->Actor_A),
                    'actor_abreviatura' => utf8_encode(trim($imprimir->Actor_AbreviaturaA)),
                    'prioridad' => trim($imprimir->PRIORIDAD),
                    'prioridad_nombre' => utf8_encode(strtoupper(trim($imprimir->Prioridad_Nombre))),
                    'id_accion1' => trim($imprimir->accion1),
                    'descripcion_accion1' =>  utf8_encode(trim($imprimir->DESCRIPCION_ACCION1)),
                    'id_accion2' => trim($imprimir->accion2),
                    'descripcion_accion2' =>  utf8_encode(trim($imprimir->DESCRIPCION_ACCION2)),
                    'nro_documento_detalle' =>  utf8_encode(trim($imprimir->NRO_DOCUMENTO_DETALLE)),
                    'asunto' =>  utf8_encode(trim($imprimir->ASUNTO)),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GrabarEdicionDerivar($user, $actor_actual, $expediente, $nro, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $nro_doc, $observacion, $asunto, $codigo_tramite)
    {
        $sentencia =  " exec GrabarEdicionDerivar '" . $expediente . "', '" . $nro . "', '" . $fecha . "', '" . $hora . "', '" . $user . "', '" . $actor_actual . "', ";
        $sentencia = $sentencia . "  '" . $actor_destino . "', '" . $prioridad . "', '" . $accion1 . "', '" . $accion2 . "', '" . $nro_doc . "',  '" . $observacion . "', '" . $asunto . "', '" . $codigo_tramite . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function CulminarExpediente($id, $user, $comentario)
    {
        $sentencia =  " exec CulminarExpediente '" . $user . "', '" . $id . "', '" . $comentario . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function RecuperarCulminarExpediente($id,  $user)
    {
        $sentencia =  "  update expediente set ESTADO = '2',    FECHA_CULMINACION = null,  USUARIO_CULMINACION = '', COMENTARIO_CULMINACION = '', ";
        $sentencia =  $sentencia .  "  HORA_CULMINACION = ''  where expediente = '" . $id . "' ";
        $sentencia =  $sentencia .  "  update EXPEDIENTE_DETALLE set ESTADO = '2'  where expediente = '" . $id . "' and Numero in (select ocurrencia FROM Expediente WHERE Expediente= '" . $id . "') ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function  VerNroDocumento($id)
    {
        $sentencia =   "select NRO_DOCUMENTO from v_Expediente_Det where Expediente ='" . $id . "'";
        $prepare = $this->_db->prepare($sentencia);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array, true);
    }


    public function ActualizarOcurrenciaExpedientes()
    {
        $sentencia =  " exec ActualizaOcurrenciaNumeroExpediente";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }





    public function ReportesExpedientesRecibidos($fecha1, $fecha2, $actor_actual)
    {

        $sentencia =  "select a.EXPEDIENTE_ID, a.Fecha, a.Recepcion_Fecha, a.Actor_AbreviaturaDe, a.asunto, a.Descripcion, a.Nro_documento, a.folios, a.observaciones,";
        $sentencia =  $sentencia .  " case b.ESTADO when '2' Then 'EN PROCESO' when '3' then 'CULMINADO' when '4' then 'ARCHIVADO' end as condicion_estado";
        $sentencia =  $sentencia . "    from v_Expediente_Det a      left join Expediente b on a.EXPEDIENTE  = b.EXPEDIENTE ";
        $sentencia =  $sentencia . "     where a.Recepcion_Fecha between convert(datetime, '" . $fecha1 . "', 103) and convert(datetime, '" . $fecha2 . "', 103)";
        $sentencia =  $sentencia . " and a.Actor_A = '" . $actor_actual . "' and a.actor_actual = '" . $actor_actual . "' order by a.Recepcion_Fecha desc; ";

        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'fecha' => (is_null($imprimir->Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Fecha)),
                    'fecha_recepcion' => (is_null($imprimir->Recepcion_Fecha) == true) ? '' : date("d/m/Y", strtotime($imprimir->Recepcion_Fecha)),
                    'actor_abreviatura' => utf8_encode(trim($imprimir->Actor_AbreviaturaDe)),
                    'asunto' => utf8_encode(trim($imprimir->asunto)),
                    'descripcion' => utf8_encode(trim($imprimir->Descripcion)),
                    'nro_documento' =>  utf8_encode(trim($imprimir->Nro_documento)),
                    'folios' => trim($imprimir->folios),
                    'observaciones' => utf8_encode(trim($imprimir->Observaciones)),
                    'condicion_estado' => trim($imprimir->condicion_estado)

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function ReportesExpedientesRecibidosDetallado()
    {
        $sentencia_sql = "select * from tmp_recdetalle";
        $resultado_sql = $this->_db->prepare($sentencia_sql);
        $resultado_sql->execute();
        if ($resultado_sql->rowCount()) {
            while ($imprimir = $resultado_sql->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente_id' => trim($imprimir->EXPEDIENTE_ID),
                    'ocurrencia' => utf8_decode(trim($imprimir->OCURRENCIA)),
                    'fecha_documento' => str_pad(utf8_decode(trim($imprimir->FECHA_DOCUMENTO)),10,"0", STR_PAD_LEFT),
                    'recepcion_fecha' => (is_null($imprimir->RECEPCION_FECHA) == true) ? '' : str_pad(utf8_decode(trim($imprimir->RECEPCION_FECHA)),10,"0", STR_PAD_LEFT),
                    'recepcion_hora' => trim($imprimir->RECEPCION_HORA),
                    'actor_abreviaturade' => utf8_decode(trim($imprimir->ACTOR_ABREVIATURADE)),
                    'asunto' => utf8_decode(trim($imprimir->ASUNTO)),
                    'descripcion' => utf8_decode(trim($imprimir->DESCRIPCION)),
                    'nro_documento' => utf8_decode(trim($imprimir->NRO_DOCUMENTO)), 
                    'folios' => trim($imprimir->FOLIOS),
                    'observaciones' => utf8_decode(trim($imprimir->OBSERVACIONES)),
                    'condicion_estado' => utf8_decode(trim($imprimir->CONDICION_ESTADO)),
                    'cargo_fecha' => (is_null($imprimir->CARGO_FECHA) == true) ? '' :str_pad(trim($imprimir->CARGO_FECHA),10,"0", STR_PAD_LEFT),
                    'cargo_hora' => trim($imprimir->CARGO_HORA),
                    'cargo_usuario' => trim($imprimir->CARGO_USUARIO),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? '' :str_pad(trim($imprimir->FECHA_CULMINACION),10,"0", STR_PAD_LEFT),
                    'comentario_culminacion' => utf8_decode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'recepcion_comentario' => utf8_decode(trim($imprimir->RECEPCION_COMENTARIO))  
                    
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function ReportesExpedientesOTD($fecha1, $fecha2, $actor_actual, $TodoUser, $user)
    {

        if ($TodoUser == '0') {
            $seleccion_usuario = $user;
        } else {
            $seleccion_usuario = '';
        }
        $query = "  select  * from v_expediente where  fecha between convert(datetime, '" . $fecha1 . "', 103) and   convert(datetime,'" . $fecha2 . "', 103) and ";
        $query = $query . "  actor_registro = '" . $actor_actual . "' AND  SYSINSERT LIKE '%' + '" . $seleccion_usuario . "' order by expediente desc;";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        if ($prepare->rowCount()) {
            while ($imprimir = $prepare->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => utf8_encode(trim($imprimir->EXPEDIENTE)),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    'fecha' => utf8_encode(trim($imprimir->FECHA_MOSTRAR)),
                    'hora' => utf8_encode(trim($imprimir->HORA)),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'actor_atencion_nombre' => utf8_encode(trim($imprimir->ACTOR_ATENCION_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'nro_docu' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'tipo' => utf8_encode(trim($imprimir->Tipo)),
                    'prioridad' => strtoupper(utf8_encode(trim($imprimir->Prioridad))),
                    'accion1' => strtoupper(utf8_encode(trim($imprimir->ACCION1_NOMBRE))),
                    'estado' => trim($imprimir->CONDICION_ESTADO),
                    'actor' => utf8_encode(trim($imprimir->ACTOR_REGISTRO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado');
        }
        return json_encode($array, true);
    }

    public function GrabarActorCCTemp($actor_cc,  $actor_actual,  $user, $descripcion)
    {
        $sentencia =  " delete from tmp_expediente_cc where actor_cc = '" . $actor_cc . "' and usuario = '" . $user . "' and actor_origen = '" . $actor_actual . "' and condicion = 'T'; ";
        $sentencia =  $sentencia . " insert into tmp_expediente_cc (actor_cc, actor_origen, dfecharegistro, condicion, usuario, descripcion_cc) ";
        $sentencia =  $sentencia . "  values ( '" . $actor_cc . "', '" . $actor_actual . "', getdate(), 'T', '" . $user . "', '" . $descripcion . "' ) ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public  function  ListarActorCCTemp($user)
    {
        $sentencia = "select idexpedientecc, actor_cc, descripcion_cc, actor_origen from tmp_expediente_cc where usuario = '" . $user . "' and condicion = 'T'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'idexpedientecc' =>  $imprimir->idexpedientecc,
                    'actor_cc' => trim($imprimir->actor_cc),
                    'descripcion_cc' => utf8_encode(trim($imprimir->descripcion_cc))
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public function eliminarCCTemp($id)
    {
        $sentencia =  " delete from tmp_expediente_cc where idexpedientecc = " . $id;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function  GrabarExpedienteAreas(
        $fecha_expediente,
        $hora_expediente,
        $idactor_remitente,
        $remitente,
        $idreporte,
        $idtipo_doc,
        $nro_doc,
        $folios,
        $idactor_atencion,
        $asunto,
        $idprioridad,
        $plazo,
        $idaccion1,
        $idaccion2,
        $referencia,
        $observacion,
        $user,
        $actor_registra,
        $actor_codigo,
        $lc_nombre_destino,
        $adjunto
    ) {
        $sentencia = " exec GrabarExpedienteAreas '" . $fecha_expediente . "', '" . $hora_expediente . "', '" . $idactor_remitente . "', '" . $remitente . "', '" . $idreporte . "', '" . $idtipo_doc . "', '" . $nro_doc . "', " . $folios . ", '" . $idactor_atencion . "', '" . $asunto . "', '" . $idprioridad . "', " . $plazo . ", '" . $idaccion1 . "', '" . $idaccion2 . "', '" . $referencia . "', '" . $observacion . "', '" . $user . "', '" . $actor_registra . "', '" . $actor_codigo . "', '" . $lc_nombre_destino . "', '" . $adjunto . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function  ActualizarAdjunto($expediente, $adjunto)
    {
        $sentencia = " update EXPEDIENTE set adjunto = '" . $adjunto . "' where expediente = '" . $expediente . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function  EliminarAdjunto($expediente)
    {
        $sentencia = " update EXPEDIENTE set adjunto = '' where expediente = '" . $expediente . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public  function  ListarOcurrencias($expediente)
    {
        $sentencia = " select numero, convert(varchar(10), fecha, 103) as fecha, actor_1_descripcion, actor_2_descripcion, convert(varchar(10), cargo_fecha, 103) as fecha_cargo, ";
        $sentencia = $sentencia . " cargo_usuario  from  v_expediente_det   where expediente = '" . $expediente . "' order by numero ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'numero' =>  utf8_encode(trim($imprimir->numero)),
                    'fecha' =>  utf8_encode(trim($imprimir->fecha)),
                    'actor_1_descripcion' => utf8_encode(trim($imprimir->actor_1_descripcion)),
                    'actor_2_descripcion' => utf8_encode(trim($imprimir->actor_2_descripcion)),
                    'fecha_cargo' => utf8_encode(trim($imprimir->fecha_cargo)),
                    'cargo_usuario' => utf8_encode(trim($imprimir->cargo_usuario))
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public function  ExpedienteImpresion($expediente, $user, $id)
    {
        $sentencia = " insert into temp_impresion (expediente, userid, condicion, identificador) ";
        $sentencia = $sentencia . " values ( '" . $expediente . "', '" . $user . "', 'I', '" . $id . "')";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public  function  VerListadoExpedientes($iduser)
    {
        $sentencia = " select expediente  from temp_impresion where identificador = '".$iduser."' order by expediente; ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente_id' =>  utf8_encode(trim($imprimir->expediente))
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public  function ExpedienteSeleccion($fecha1, $fecha2, $actor_actual) {
        $sentencia_sp = "exec ExpedientesRecibidosDetallado '".$fecha1."', '".$fecha2."', '".$actor_actual."'";
        $resultado_sp = $this->_db->prepare($sentencia_sp);
        $resultado_sp->execute();
        $RetornaValor = array('registros' => $resultado_sp->rowCount());
        return json_encode($RetornaValor);
    }


}
