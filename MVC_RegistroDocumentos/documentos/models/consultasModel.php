<?php


class consultasModel extends Model
{
    public  function __construct()
    {
        parent::__construct();
    }

    public  function MostarKardexExpediente()
    {
        $sentencia = "select top 1 EXPEDIENTE, N_EXPEDIENTE_ID from v_Expediente where substring(expediente,3,2) = 'TD' order by EXPEDIENTE desc;";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->EXPEDIENTE),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID))

                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public  function RecuperarExpedienteKardex($id)
    {
        $sentencia = "select  * from v_Expediente where expediente = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->EXPEDIENTE),
                    'expediente_id' => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    'fecha' => (is_null($imprimir->FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA)),
                    'hora' => trim($imprimir->HORA),
                    'actor_nombre' => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    'asunto' => utf8_encode(trim($imprimir->ASUNTO)),
                    'tipo_documento' => utf8_encode(trim($imprimir->Tipo)),
                    'actor_actual' => utf8_encode(trim($imprimir->ACTOR_ACTUAL_NOMBRE)),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? 'Expediente en curso' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => (is_null($imprimir->HORA_CULMINACION) == true) ? 'Expediente en curso' : trim($imprimir->HORA_CULMINACION),
                    'usuario_culminacion' => (is_null($imprimir->USUARIO_CULMINACION) == true) ? 'Expediente en curso' : utf8_encode(trim($imprimir->USUARIO_CULMINACION)),
                    'estado' => utf8_encode(trim($imprimir->CONDICION_ESTADO)),
                    'nro_documento' => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    'dias' => trim($imprimir->DIAS),
                    'observacion' => utf8_encode(trim($imprimir->OBSERVACIONES)),
                    'comentario' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION))

                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }




    public  function ListarExpedienteDetalle($id)
    {
        $sentencia = "SELECT Expediente, NUMERO as NRO,FECHA, HORA, (CASE WHEN NUMERO='01' THEN Nombre ELSE Actor_AbreviaturaDe END) as REMITENTE_DE, Actor_De, Actor_A, ";
        $sentencia = $sentencia . "    Actor_2_Descripcion as DESTINATARIO_A,ACCION1 as A1,ACCION2 as A2, ACCION3 as A3,Actor_Actuald as ACTOR_ACTUAL,CARGO_ID, ";
        $sentencia = $sentencia . "   CARGO_FECHA as CARGO_FECHA,  CARGO_HORA, (CASE WHEN TRASLADO='M' THEN TRASLADO_RECEPCION_FECHA ELSE RECEPCION_FECHA END) as F_RECEPCION, ";
        $sentencia = $sentencia . "    (CASE WHEN TRASLADO='M' THEN TRASLADO_RECEPCION_HORA ELSE RECEPCION_HORA END) as H_RECEPCION,    FECHA_CULMINACION,HORA_CULMINACION,OBSERVACIONES,COMENTARIO_CULMINACION,  DESCRIPCION_ACCION1, DESCRIPCION_ACCION2, doc_adj1, doc_adj2";
        $sentencia = $sentencia . "        FROM V_Expediente_Det WHERE Expediente='" . $id . "' ORDER BY Numero;";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->Expediente),
                    'nro' => trim($imprimir->NRO),
                    'fecha' => (is_null($imprimir->FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA)),
                    'hora' => trim($imprimir->HORA),
                    'remitente_de' => utf8_encode(trim($imprimir->REMITENTE_DE)),
                    'actor_de' => trim($imprimir->Actor_De),
                    'actor_a' => trim($imprimir->Actor_A),
                    'destinatario_a' => utf8_encode(trim($imprimir->DESTINATARIO_A)),
                    'a1' => trim($imprimir->A1),
                    'a2' => trim($imprimir->A2),
                    'a3' => trim($imprimir->A3),
                    'actor_actual' => utf8_encode(trim($imprimir->ACTOR_ACTUAL)),
                    'cargo_id' => (is_null($imprimir->CARGO_ID) == true) ? '' : trim($imprimir->CARGO_ID),
                    'cargo_fecha' => (is_null($imprimir->CARGO_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->CARGO_FECHA)),
                    'cargo_hora' => trim($imprimir->CARGO_HORA),
                    'f_recepcion' => (is_null($imprimir->F_RECEPCION) == true) ? '' : date("d/m/Y", strtotime($imprimir->F_RECEPCION)),
                    'h_recepcion' => trim($imprimir->H_RECEPCION),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? 'Expediente en curso' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => (is_null($imprimir->HORA_CULMINACION) == true) ? 'Expediente en curso' : trim($imprimir->HORA_CULMINACION),
                    'observacion' => utf8_encode(trim($imprimir->OBSERVACIONES)),
                    'descripcion_accion1' => utf8_encode(trim($imprimir->DESCRIPCION_ACCION1)),
                    'descripcion_accion2' => utf8_encode(trim($imprimir->DESCRIPCION_ACCION2)),
                    'comentario' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'doc_adj1' => utf8_encode((is_null($imprimir->doc_adj1) == true) ? '' : trim($imprimir->doc_adj1)),
                    'doc_adj2' => utf8_encode((is_null($imprimir->doc_adj2) == true) ? '' : trim($imprimir->doc_adj2))

                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public  function MostrarListaExpedientes()
    {
        $sentencia = "select top 10000 EXPEDIENTE, N_EXPEDIENTE_ID, FECHA,  HORA, ACTOR_NOMBRE, ASUNTO, Tipo, ACTOR_ACTUAL_NOMBRE, FECHA_CULMINACION, HORA_CULMINACION, USUARIO_CULMINACION, CONDICION_ESTADO, NRO_DOCUMENTO, OBSERVACIONES, COMENTARIO_CULMINACION  from v_Expediente order by EXPEDIENTE desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    "respuesta" => 1,
                    "expediente" => trim($imprimir->EXPEDIENTE),
                    "expediente_id" => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    "fecha" => (is_null($imprimir->FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA)),
                    "hora" => trim($imprimir->HORA),
                    "actor_nombre" => utf8_encode(trim($imprimir->ACTOR_NOMBRE)),
                    "asunto" => utf8_encode(trim($imprimir->ASUNTO)),
                    "tipo_documento" => utf8_encode(trim($imprimir->Tipo)),
                    "actor_actual" => utf8_encode(trim($imprimir->ACTOR_ACTUAL_NOMBRE)),
                    "fecha_culminacion" => (is_null($imprimir->FECHA_CULMINACION) == true) ? 'Expediente en curso' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    "hora_culminacion" => (is_null($imprimir->HORA_CULMINACION) == true) ? 'Expediente en curso' : trim($imprimir->HORA_CULMINACION),
                    "usuario_culminacion" => (is_null($imprimir->USUARIO_CULMINACION) == true) ? 'Expediente en curso' : utf8_encode(trim($imprimir->USUARIO_CULMINACION)),
                    "estado" => utf8_encode(trim($imprimir->CONDICION_ESTADO)),
                    "nro_documento" => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    "dias" => trim($imprimir->DIAS),
                    "observacion" => utf8_encode(trim($imprimir->OBSERVACIONES)),
                    "comentario" => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION))

                );
            }
        } else {
            $array[] = array(
                "respuesta" => 0,
            );
        }
        return json_encode($array);
    }



    public function VerDatosKardexCabecera($expediente)
    {
        $sentencia = " select N_EXPEDIENTE_ID, FECHA, HORA, ESTADO, ASUNTO, NRO_DOCUMENTO, Tipo, ACTOR_REGISTRO_NOMBRE, OCURRENCIA, FECHA_CULMINACION,";
        $sentencia = $sentencia . " CASE WHEN FECHA_CULMINACION IS NULL THEN 'EN PROCESO' ELSE ' CULMINADO' END AS CONDICION_CULMINACION  ";
        $sentencia = $sentencia . " from v_Expediente where Expediente='" . $expediente . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    "respuesta" => 1,
                    "expediente_id" => utf8_encode(trim($imprimir->N_EXPEDIENTE_ID)),
                    "fecha" => (is_null($imprimir->FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA)),
                    "hora" => trim($imprimir->HORA),
                    "asunto" => utf8_encode(trim($imprimir->ASUNTO)),
                    "nro_documento" => utf8_encode(trim($imprimir->NRO_DOCUMENTO)),
                    "tipo_documento" => utf8_encode(trim($imprimir->Tipo)),
                    "actor_registro" => utf8_encode(trim($imprimir->ACTOR_REGISTRO_NOMBRE)),
                    "condicion_culminacion" => utf8_encode(trim($imprimir->CONDICION_CULMINACION)),
                    "ocurrencia" => trim($imprimir->OCURRENCIA)
                );
            }
        } else {
            $array[] = array(
                "respuesta" => 0,
            );
        }
        return json_encode($array);
    }




    public  function VerDatosContenidoKardex($expediente)
    {
        $sentencia = "SELECT Expediente, NUMERO as NRO,FECHA, HORA, (CASE WHEN NUMERO='01' THEN Nombre ELSE Actor_AbreviaturaDe END) as REMITENTE_DE, ";
        $sentencia = $sentencia . "    Actor_2_Descripcion as DESTINATARIO_A,ACCION1 as A1,ACCION2 as A2, ACCION3 as A3,Actor_Actuald as ACTOR_ACTUAL,CARGO_ID, ";
        $sentencia = $sentencia . "   CARGO_FECHA as CARGO_FECHA,  CARGO_HORA, (CASE WHEN TRASLADO='M' THEN TRASLADO_RECEPCION_FECHA ELSE RECEPCION_FECHA END) as F_RECEPCION, ";
        $sentencia = $sentencia . "    (CASE WHEN TRASLADO='M' THEN TRASLADO_RECEPCION_HORA ELSE RECEPCION_HORA END) as H_RECEPCION,    FECHA_CULMINACION,HORA_CULMINACION,OBSERVACIONES,COMENTARIO_CULMINACION, doc_adj1, doc_adj2  ";
        $sentencia = $sentencia . "        FROM V_Expediente_Det WHERE Expediente='" . $expediente . "' ORDER BY Numero;";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'expediente' => trim($imprimir->Expediente),
                    'nro' => trim($imprimir->NRO),
                    'fecha' => (is_null($imprimir->FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->FECHA)),
                    'hora' => trim($imprimir->HORA),
                    'remitente_de' => utf8_encode(trim($imprimir->REMITENTE_DE)),
                    'destinatario_a' => utf8_encode(trim($imprimir->DESTINATARIO_A)),
                    'a1' => trim($imprimir->A1),
                    'a2' => trim($imprimir->A2),
                    'a3' => trim($imprimir->A3),
                    'actor_actual' => utf8_encode(trim($imprimir->ACTOR_ACTUAL)),
                    'cargo_id' => (is_null($imprimir->CARGO_ID) == true) ? '' : trim($imprimir->CARGO_ID),
                    'cargo_fecha' => (is_null($imprimir->CARGO_FECHA) == true) ? '' : date("d/m/Y", strtotime($imprimir->CARGO_FECHA)),
                    'cargo_hora' => trim($imprimir->CARGO_HORA),
                    'f_recepcion' => (is_null($imprimir->F_RECEPCION) == true) ? '' : date("d/m/Y", strtotime($imprimir->F_RECEPCION)),
                    'h_recepcion' => trim($imprimir->H_RECEPCION),
                    'fecha_culminacion' => (is_null($imprimir->FECHA_CULMINACION) == true) ? 'Expediente en curso' : date("d/m/Y", strtotime($imprimir->FECHA_CULMINACION)),
                    'hora_culminacion' => (is_null($imprimir->HORA_CULMINACION) == true) ? 'Expediente en curso' : trim($imprimir->HORA_CULMINACION),
                    'observacion' => utf8_encode(trim($imprimir->OBSERVACIONES)),
                    'comentario' => utf8_encode(trim($imprimir->COMENTARIO_CULMINACION)),
                    'doc_adj1' => (is_null($imprimir->doc_adj1) == true) ? '' : utf8_encode(trim($imprimir->doc_adj1)),
                    'doc_adj2' => (is_null($imprimir->doc_adj2) == true) ? '' : utf8_encode(trim($imprimir->doc_adj2))
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }


    public  function getDataRecibido($fecha, $fecha2,  $actor)
    {
        if ($actor == '0109') {
            $sentencia = "select convert(varchar(10), Fecha, 103) fecha, count(fecha) as total from expediente 
                        where Fecha  between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)
                                  and actor_registro = '" . $actor . "' group by fecha order by fecha";
        } else {
            $sentencia = "select convert(varchar(10), Recepcion_Fecha, 103) as fecha, count(Recepcion_Fecha) total from v_Expediente_Det
        where Recepcion_Fecha  between convert(datetime, '" . $fecha . "', 103)  and convert(datetime, '" . $fecha2 . "', 103)
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'   group by Recepcion_Fecha order by Recepcion_Fecha;";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'fecha' => substr(utf8_encode(trim($imprimir->fecha)), 0, 2),
                    'total' => $imprimir->total
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }




    public  function getDataRecibidoAnio($anio,  $actor)
    {
        if ($actor == '0109') {
            $sentencia = "select  'ENERO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 1 and year(Fecha) =" . $anio . "
        and actor_registro = '0109'
        union all
        select  'FEBRERO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 2 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'MARZO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 3 and year(Fecha) =" . $anio . "
        and actor_registro = '0109'
        union all
        select  'ABRIL' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 4 and year(Fecha) = " . $anio . " 
        and actor_registro = '0109'
        union all
        select  'MAYO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 5 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'JUNIO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 6 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'JULIO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 7 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'AGOSTO' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 8 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'SEPTIEMBRE' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 9 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'OCTUBRE' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 10 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'NOVIEMBRE' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 11 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'
        union all
        select  'DICIEMBRE' AS MES, COUNT(*) AS TOTAL   from expediente
        where  month(Fecha) = 12 and year(Fecha) = " . $anio . "
        and actor_registro = '0109'";
        } else {

            $sentencia = "select  'ENERO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 1 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'FEBRERO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 2 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'MARZO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 3 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'ABRIL' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 4 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'MAYO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 5 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'JUNIO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 6 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'JULIO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 7 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'AGOSTO' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 8 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'  
        UNION ALL
        select  'SEPTIEMBRE' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 9 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'OCTUBRE' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 10 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'NOVIEMBRE' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 11 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'
        UNION ALL
        select  'DICIEMBRE' AS MES, COUNT(*) AS TOTAL   from v_Expediente_Det
        where year(Recepcion_Fecha) = " . $anio . " and month(Recepcion_Fecha) = 12 
        and Actor_A = '" . $actor . "' and actor_actual = '" . $actor . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'mes' => trim($imprimir->MES),
                    'total' => $imprimir->TOTAL
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }




    public  function getDataRecibidoTramite($fecha, $fecha2,  $actor)
    {
        if ($actor == '0109') {
            $sentencia = "select  convert(varchar(10), Fecha, 103) fecha_doc, count(fecha) as total   from v_Expediente_Det 
                              where estado = 2 and numero = '01' 
                              and actor_de= '0109' and cargo_fecha is null and
                               Fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)
                               and  Recepcion_Fecha  is null  group by Fecha  order by Fecha desc;";
        } else {
            $sentencia = " select  convert(varchar(10),  Fecha, 103) as fecha_doc, count( Fecha) total   from v_Expediente_Det where estado = 2 and actor_a = '" . $actor . "' and 
        fecha between convert(datetime, '" . $fecha . "', 103) and convert(datetime, '" . $fecha2 . "', 103)
        and cargo_id <> '' and ocurrencia = numero and Recepcion_Fecha is null and FECHA_CULMINACION is null        group by Fecha order by Fecha;";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'fecha' => substr(utf8_encode(trim($imprimir->fecha_doc)), 0, 2),
                    'total' => $imprimir->total
                );
            }
        } else {
            $array[] = array(
                'respuesta' => 0,
            );
        }
        return json_encode($array);
    }

    public function ListarTipoDocumento()
    {
        $sql = "select tipo_documento, descripcion from tipo_documento where estado = 1 order by tipo_documento;";
        $ejecucion_sql = $this->_db->prepare($sql);
        $ejecucion_sql->execute();
        if ($ejecucion_sql->rowCount()) {
            while ($mostrar = $ejecucion_sql->fetch(PDO::FETCH_OBJ)) {
                $obtenido[] = array(
                    'verificar' => '1',
                    'id' => $mostrar->tipo_documento,
                    'descripcion' => utf8_encode(trim($mostrar->descripcion))
                );
            }
        } else {
            $obtenido[] = array('verificar' => '0');
        }
        return json_encode($obtenido);
    }

    public function ConsultarExpediente($inicio, $fin, $nro_expediente, $remitente, $asunto, $nro_doc, $tipo_doc)
    {
        $query = "";
        if (!empty($inicio) &&  empty($fin)) {
            $query = " and fecha = convert(datetime, '" . $inicio . "', 104)";
        }
        if (empty($inicio) &&  !empty($fin)) {
            $query = " and fecha = convert(datetime, '" . $fin . "', 104)";
        }
        if (empty($inicio) &&  empty($fin)) {
            $query = "";
        }
        if (!empty($inicio) &&  !empty($fin)) {
            $query = " and a.fecha between convert(datetime, '" . $inicio . "', 104) and convert(datetime, '" . $fin . "', 104)";
        }

        if (!empty($nro_expediente)) {
            $query = $query . " and a.expediente like '%" . $nro_expediente . "%'";
        }

        if (!empty($remitente)) {
            $query = $query . " and a.nombre like '%" . $remitente . "%'";
        }

        if (!empty($asunto)) {
            $query = $query . " and a.asunto  like '%" . $asunto . "%'";
        }

        if (!empty($nro_doc)) {
            $query = $query . " and a.nro_documento like '%" . $nro_doc . "%'";
        }

        if (!empty($tipo_doc)) {
            if ($tipo_doc != '0' or $tipo_doc != '00') {
                $query = $query . " and a.tipo_documento like '%" . $tipo_doc . "%'";
            }
        }

        if (!empty($query)) {
            $sql = "select a.expediente, a.fecha, a.hora, a.actor, a.nombre, a.asunto, a.tipo_documento, a.nro_documento, a.ocurrencia, a.actor_registro,
            b.DESCRIPCION as documento, case when a.estado = '0' then 'ELIMINADO' when a.estado = '1' then 'REGISTRADO' when a.estado = '2' then 'EN PROCESO' when a.estado = '3' then 'CULMINADO'
            when a.estado = '4' then 'ARCHIVO' else 'NO DEFINIDO' end as condicion_estado
            from expediente a left join tipo_documento b on a.tipo_documento = b.TIPO_DOCUMENTO
            where 1=1 " . $query . " order by expediente desc";
            $ejecucion_sql = $this->_db->prepare($sql);
            $ejecucion_sql->execute();
            if ($ejecucion_sql->rowCount()) {
                while ($mostrar = $ejecucion_sql->fetch(PDO::FETCH_OBJ)) {
                    $obtenido[] = array(
                        'verificar' => '1',
                        'expediente' =>  utf8_encode(trim($mostrar->expediente)),
                        'ocurrencia' => trim($mostrar->ocurrencia),
                        'fecha' => (is_null($mostrar->fecha) == true) ? '' : date("d/m/Y", strtotime($mostrar->fecha)),
                        'hora' => trim($mostrar->hora),
                        'nombre' => utf8_encode(trim($mostrar->nombre)),
                        'asunto' => utf8_encode(trim($mostrar->asunto)),
                        'documento' => utf8_encode(trim($mostrar->documento)),
                        'nro_documento' => utf8_encode(trim($mostrar->nro_documento)),
                        'condicion_estado' => utf8_encode(trim($mostrar->condicion_estado))




                        
                    );
                }
            } else {
                $obtenido[] = array('verificar' => '0');
            }
            
        }
        else {
            $obtenido[] = array('verificar' => '0');
        }
        return json_encode($obtenido);
    }
}
