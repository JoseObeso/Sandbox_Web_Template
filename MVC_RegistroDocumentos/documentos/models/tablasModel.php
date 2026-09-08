<?php
class tablasModel extends Model
{
    public  function __construct()
    {
        parent::__construct();
    }

    public function ListarActoresTipo01($actor)
    {
        $sentencia = " select * from v_actor_descripcion where tipo_actor = '01' and actor_descripcion like '%' + '" . $actor . "' + '%'  COLLATE Latin1_general_CI_AI order by actor";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'area_de_actor' => utf8_encode(trim($imprimir->AREA_DE_ACTOR)),
                    'tramite' => utf8_encode($imprimir->TRAMITE),
                    'direccion' => utf8_encode($imprimir->DIRECCION),
                    'telefono' => utf8_encode($imprimir->TELEFONO),
                    'ruc' => trim($imprimir->RUC),
                    'actor_descripcion' => utf8_encode(trim($imprimir->ACTOR_DESCRIPCION))
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }



    public function ListarActoresTipo0103($no_actor)
    {
        $sentencia = " select * from v_actor_descripcion where tipo_actor in ('01', '03') and actor not in ('".$no_actor."', '0101', '0109')  order by actor ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'actor' => trim($imprimir->ACTOR),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'area_de_actor' => utf8_encode(trim($imprimir->AREA_DE_ACTOR)),
                    'tramite' => utf8_encode($imprimir->TRAMITE),
                    'direccion' => utf8_encode($imprimir->DIRECCION),
                    'telefono' => utf8_encode($imprimir->TELEFONO),
                    'ruc' => trim($imprimir->RUC),
                    'actor_descripcion' => utf8_encode(trim($imprimir->ACTOR_DESCRIPCION)),
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }


    public function GrabarActoresTipo01($idactor, $descripcion, $abreviatura, $responsable, $codigo, $idareaactor, $tramite, $user)
    {
        $sentencia = " insert into actor(actor, descripcion, abreviatura, tipo_actor, responsable, direccion, telefono, codigo, distribucion, ruc, estado, area_de_actor,
                     tramite, abreviatura2, usuarioregistra)
                     values('" . $idactor . "', upper('" . $descripcion . "'), upper('" . $abreviatura . "'), '01', upper('" . $responsable . "'), '', '', upper('" . $codigo . "'), '', '', '1', '" . $idareaactor . "', upper('" . $tramite . "'), '', '" . $user . "');";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function UpdaterActoresTipo01($idactor, $descripcion, $abreviatura, $responsable, $codigo, $idareaactor, $tramite)
    {
        $sentencia = " update actor set descripcion = upper('" . $descripcion . "'), abreviatura = upper('" . $abreviatura . "'),  responsable = upper('" . $responsable . "'),
        codigo = upper('" . $codigo . "'), area_de_actor = '" . $idareaactor . "',   tramite = upper('" . $tramite . "')  where actor =  '" . $idactor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $update_actor_usuario = "update usuario_actor set abreviatura = upper('" . $abreviatura . "'), descripcion = upper('" . $descripcion . "'), responsable = upper('" . $responsable . "')  where actor = '" . $idactor . "'";
        $resultado_actor_usuario = $this->_db->prepare($update_actor_usuario);
        $resultado_actor_usuario->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }
    


    public function DeleteActoresTipo01($idactor)
    {

        $sentencia = " if ((select count(*) from usuario  where actor = '" . $idactor . "') +  (select count(*) from expediente_detalle  where actor_origen = '" . $idactor . "')
                                      +  (select count(*) from expediente_detalle  where Actor_Destino = '" . $idactor . "')) = 0 
                                         begin
                                          delete from actor where actor =  '" . $idactor . "';
                                        end";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function obtener_documentos($user, $actor, $fecha, $buscar)
    {
        $query = " select  * from v_expediente where  fecha = convert(datetime, '" . $fecha . "', 103) and actor_registro =  '" . $actor . "' AND   ";
        $query = $query . "  LTRIM(RTRIM(SUBSTRING(SYSINSERT,17,33))) = '" . $user . "' and  actor_nombre like '%' +'" . $buscar . "' + '%'  order by fecha desc ";
        $prepare = $this->_db->prepare($query);
        $prepare->execute();
        return $prepare;
    }




    public function ListarActorTramite($actor)
    {
        $sentencia = " SELECT * FROM V_ACTOR_DESCRIPCION WHERE ACTOR_DESCRIPCION LIKE '%' + '".$actor . "' + '%'";
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
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function MostrarDirector($actor)
    {
        $sentencia = " SELECT * FROM V_ACTOR_DESCRIPCION WHERE ACTOR = '" . $actor . "'";
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
        $sentencia = " SELECT TIPO_REPORTE, UPPER(NOMBRE) AS NOMBRE, ESTADO,  TIPO_REPORTE + ' [' + UPPER(NOMBRE) + ']' as RESULTADO  FROM TIPO_REPORTE where TIPO_REPORTE = '" . $treporte . "'";
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
        $sentencia = " SELECT * FROM V_TIPO_DOCUMENTO WHERE RESULTADO LIKE '%' + '" . $tdoc . "' + '%'";
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
        $sentencia = " select prioridad, descripcion, dias, estado, resultado  from v_prioridad  where resultado like '%' + '" . $prio . "' + '%'";
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






 





    public  function ObtenerListadoEntidades($id)
    {
        $sentencia = " select top 1000 * from v_actor_descripcion where tipo_actor = '02' and actor_descripcion like '%' + '" . $id . "' + '%' order by actor desc";
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



 



    public function VerDatosCabecera($inicioexp, $finexp, $actor_registra)
    {

        $sentencia = "select * from v_expediente where expediente between '" . $inicioexp . "' and '" . $finexp . "' and ACTOR_REGISTRO = '" . $actor_registra . "' and estado = '1'";
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
        $sentencia = "if  (select count(*) from expediente where actor = RTRIM('" . $id . "')) > 0 ";
        $sentencia = $sentencia . "  begin ";
        $sentencia = $sentencia . "   select 'ESTA REGISTRADO EN EXPEDIENTE' as EXISTE, '1' AS CONFIRMA ";
        $sentencia = $sentencia . "    end ";
        $sentencia = $sentencia . "   else  ";
        $sentencia = $sentencia . "    begin  ";
        $sentencia = $sentencia . "    select ' - ELIMINADO - ' as EXISTE, '0' AS CONFIRMA ";
        $sentencia = $sentencia . "     end ";
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
        $sentencia = " UPDATE TIPO_DOCUMENTO SET descripcion = UPPER(RTRIM('" . $descripcion . "')) where TIPO_DOCUMENTO = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function  EliminarTdoc($id)
    {


        $sentencia = " if (select count(*) from expediente where tipo_documento = rtrim('" . $id . "')) > 0  ";
        $sentencia = $sentencia . " begin ";
        $sentencia = $sentencia . " select 'ESTA REGISTRADO EN EXPEDIENTE' as EXISTE, '1' AS CONFIRMA; ";
        $sentencia = $sentencia . " end ; ";
        $sentencia = $sentencia . "   else ";
        $sentencia = $sentencia . " begin ";
        $sentencia = $sentencia . "  select ' - ELIMINADO - ' as EXISTE, '0' AS CONFIRMA  ";
        $sentencia = $sentencia . "  end ; ";
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
        $sentencia =  " DELETE FROM TIPO_DOCUMENTO WHERE TIPO_DOCUMENTO = '" . $id . "'";
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




    public function MostrarTaccion($taccion)
    {
        $sentencia = "  select * from v_accion where resultado like '%' + '" . $taccion . "'  + '%' ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_accion' => utf8_encode(trim($imprimir->ACCION)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GrabarTipoAccion($descripcion, $tipo_operacion, $id)
    {
        if ($tipo_operacion == '1') {
            $sentencia = " insert into accion (accion, descripcion, estado) ";
            $sentencia = $sentencia . " values ((select convert(varchar(2), convert(int, count(*) + 1))  from accion), '" . $descripcion . "', '1') ";
        } else {
            $sentencia = " update accion set descripcion = '" . $descripcion . "' where accion = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }





    public function DeleteAccion($id)
    {
        $sentencia = "  if ((SELECT count(*) FROM EXPEDIENTE WHERE ACCION1 = '" . $id . "' or ACCION2 = '" . $id . "' or ACCION3 = '" . $id . "') +  (SELECT count(*) FROM EXPEDIENTE_detalle WHERE ACCION1 = '" . $id . "' or ACCION2 = '" . $id . "' or ACCION3 = '" . $id . "')) = 0   ";
        $sentencia = $sentencia . "     begin  ";
        $sentencia = $sentencia . "      delete from accion where accion = '" . $id . "'";
        $sentencia = $sentencia . "     end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* Inicio de prioridad */

    public function MostrarPrioridad()
    {
        $sentencia = "select * from v_prioridad";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_prioridad' => trim($imprimir->PRIORIDAD),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'dias' => trim($imprimir->DIAS),
                    'resultado' => utf8_encode(trim($imprimir->RESULTADO))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GrabarTipoPrioridad($descripcion, $dias, $tipo_operacion, $id)
    {
        if ($tipo_operacion === '1') {
            $sentencia = " insert into prioridad (prioridad, descripcion, dias, estado) ";
            $sentencia = $sentencia . " values (right('00' + (select convert(varchar(2), convert(int, count(*) + 1))  from prioridad),2), upper('" . $descripcion . "'), " . $dias . ", '1') ";
        } else {
            $sentencia = " update prioridad set descripcion = upper('" . $descripcion . "'), dias = " . $dias . "   where prioridad = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function EliminarTipoPrioridad($id)
    {
        $sentencia = " if ((SELECT top 1 count(*) FROM EXPEDIENTE WHERE PRIORIDAD = '" . $id . "') +  (SELECT top 1 count(*) FROM EXPEDIENTE_DETALLE WHERE PRIORIDAD = '" . $id . "')) = 0  ";
        $sentencia = $sentencia . "     begin  ";
        $sentencia = $sentencia . "       delete from prioridad where prioridad = '" . $id . "'";
        $sentencia = $sentencia . "     end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function MostrarTipoReporte()
    {
        $sentencia = " SELECT TIPO_REPORTE, UPPER(NOMBRE) AS NOMBRE, ESTADO,  TIPO_REPORTE + ' [' + UPPER(NOMBRE) + ']' as RESULTADO  FROM TIPO_REPORTE";
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



    public function GrabarTipoReporte($descripcion, $tipo_operacion, $id)
    {
        if ($tipo_operacion === "1") {
            $sentencia = "exec GrabarTipoReporte '" . $descripcion . "'";
        } else {
            $sentencia = " update tipo_reporte set nombre = '" . $descripcion . "' where tipo_reporte = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function EliminarTipoReporte($id)
    {
        $sentencia = "if (SELECT top 1 count(*) FROM EXPEDIENTE WHERE TIPO_REPORTE = '" . $id . "') = 0  ";
        $sentencia = $sentencia . "    begin  ";
        $sentencia = $sentencia . "     delete from tipo_reporte where tipo_reporte = '" . $id . "' ";
        $sentencia = $sentencia . "    end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function MostrarTipoActor()
    {
        $sentencia = "select tipo_actor, descripcion, tipo, estado  from tipo_actor";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tipo_actor' => trim($imprimir->tipo_actor),
                    'descripcion' => utf8_encode(trim($imprimir->descripcion)),
                    'tipo' => trim($imprimir->tipo)

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GrabarEditarTactor($descripcion, $tipo_operacion, $id, $tipo)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into tipo_actor (tipo_actor, descripcion, tipo, estado) ";
            $sentencia = $sentencia .  " values((select right('00' + convert(varchar(2), convert(int, max(tipo_actor) + 1)),2) from tipo_actor), upper('" . $descripcion . "'), upper('" . $tipo . "'), 1) ";
        } else {
            $sentencia = " update tipo_actor set descripcion = upper('" . $descripcion . "'), tipo = upper('" . $tipo . "') where tipo_actor = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function EliminarTipoActor($id)
    {

        $sentencia = " if (SELECT TOP 1 COUNT(*)  FROM V_EXPEDIENTE WHERE TIPO_ACTOR = '" . $id . "') = 0 ";
        $sentencia = $sentencia .  "    begin   ";
        $sentencia = $sentencia .  "      delete from tipo_actor where tipo_actor = '" . $id . "'";
        $sentencia = $sentencia .  "    end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* inicio de empleados */




    public function MostrarEmpleados($id)
    {
        $sentencia = "select actor, descripcion, abreviatura, tipo_actor, ruc, actor_descripcion from v_actor_descripcion where tipo_actor = '03' and ";
        $sentencia = $sentencia . " actor_descripcion like '%' + '" . $id . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => trim($imprimir->actor),
                    'descripcion' => utf8_encode(trim($imprimir->descripcion)),
                    'abreviatura' => utf8_encode(trim($imprimir->abreviatura)),
                    'tipo' => trim($imprimir->tipo_actor),
                    'ruc' => trim($imprimir->ruc)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GrabarEditarEmpleado($descripcion, $abreviatura, $ruc, $tipo_operacion, $id)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into actor(actor, descripcion, abreviatura, tipo_actor, ruc) ";
            $sentencia = $sentencia . " values ('P' + right('00000' +  (convert(varchar(5), (convert(int, substring(((select max(actor)  from actor where tipo_actor = '03')),2,5)) + 1))), '5'), upper('" . $descripcion . "'), upper('" . $abreviatura . "'), '03', '" . $ruc . "') ";
        } else {
            $sentencia = " update actor set descripcion = upper('" . $descripcion . "'), abreviatura = upper('" . $abreviatura . "'), ruc = upper('" . $ruc . "') where actor = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function EliminarEmpleado($id)
    {
        $sentencia = " if ((SELECT count(*) FROM expediente WHERE actor = '" . $id . "') +  (SELECT count(*) FROM expediente_detalle WHERE actor_origen = '" . $id . "' or actor_destino = '" . $id . "')) = 0 ";
        $sentencia = $sentencia .  "     begin ";
        $sentencia = $sentencia .  "      delete from actor where actor = '" . $id . "' ";
        $sentencia = $sentencia .  "     end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    /* fin  de empleados */


    /* inicio comites */


    public function MostrarComite($id)
    {
        $sentencia = "select actor, descripcion, abreviatura, tipo_actor, ruc, actor_descripcion from v_actor_descripcion where tipo_actor = '04' and ";
        $sentencia = $sentencia . " actor_descripcion like '%' + '" . $id . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'actor' => trim($imprimir->actor),
                    'descripcion' => utf8_encode(trim($imprimir->descripcion)),
                    'abreviatura' => utf8_encode(trim($imprimir->abreviatura)),
                    'tipo' => trim($imprimir->tipo_actor),
                    'ruc' => trim($imprimir->ruc)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public function GrabarEditarComite($descripcion, $tipo_operacion, $id)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into actor(actor, descripcion, abreviatura, tipo_actor, ruc) ";
            $sentencia = $sentencia . "  values ('C' + right('00000' +  (convert(varchar(5), (convert(int, substring(((select max(actor)  from actor where substring(actor,1,1) = 'C' and tipo_actor = '04')),2,5)) + 1))), '5'), upper('" . $descripcion . "'), upper('" . $descripcion . "'), '04', '0'); ";
        } else {
            $sentencia = " update actor set descripcion = upper('" . $descripcion . "'), abreviatura = upper('" . $descripcion . "') where actor = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function EliminarComite($id)
    {
        $sentencia = " if ((SELECT count(*) FROM expediente WHERE actor = '" . $id . "') +  (SELECT count(*) FROM expediente_detalle WHERE actor_origen = '" . $id . "' or actor_destino = '" . $id . "')) = 0   ";
        $sentencia = $sentencia .  "     begin ";
        $sentencia = $sentencia .  "      delete from actor where actor = '" . $id . "' ";
        $sentencia = $sentencia .  "     end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* fin de comites */


    /* Inicio de fdocu */
    public function MostrarFdocu()
    {
        $sentencia = "select upper(forma_documento) as fd, upper(nombre) as nombre, estado from forma_documento";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'forma_documento' => trim($imprimir->fd),
                    'nombre' => utf8_encode(trim($imprimir->nombre))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GrabarEditarFdocu($descripcion, $tipo_operacion, $id)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into forma_documento(forma_documento,nombre, estado) ";
            $sentencia = $sentencia . "       values (right('00' +  (select convert(varchar(2), count(*) + 1) from forma_documento), 2), upper('" . $descripcion . "'),1) ";
        } else {
            $sentencia = " update forma_documento set nombre = upper('" . $descripcion . "') where forma_documento = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function EliminarFdocu($id)
    {
        $sentencia = " if (select count(*) from expediente where forma_documento = '" . $id . "') = 0   ";
        $sentencia = $sentencia .  "     begin  ";
        $sentencia = $sentencia .  "      delete from forma_documento where forma_documento = '" . $id . "' ";
        $sentencia = $sentencia .  "    end  ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    /* fin de fdocu */


    /* inicio de tramite */
    public function MostrarTramitador()
    {
        $sentencia = "select tramitador, descripcion, estado from tramitador";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'tramitador' => trim($imprimir->tramitador),
                    'descripcion' => utf8_encode(trim($imprimir->descripcion))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GrabarEditarTramitador($descripcion, $tipo_operacion, $id)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into tramitador(tramitador,descripcion, estado)  ";
            $sentencia = $sentencia . "     values (right('00' +  (select convert(varchar(2), count(*) + 1) from tramitador), 2), upper('" . $descripcion . "'),1) ";
        } else {

            $sentencia = " update tramitador set descripcion= upper('" . $descripcion . "') where tramitador = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function EliminarFtramite($id)
    {
        $sentencia = " if (select count(*) from expediente_detalle where tramitador = '" . $id . "') = 0   ";
        $sentencia = $sentencia . "    begin ";
        $sentencia = $sentencia . "     delete from tramitador where tramitador = '" . $id . "'";
        $sentencia = $sentencia . "   end ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    /* fin de tramite */


    /* inicio de plazo expediente */




    public function MostrarPlazoExpediente()
    {
        $sentencia = "select plazo_expediente, upper(nombre) as nombre, color from plazo_expediente";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'plazo' => trim($imprimir->plazo_expediente),
                    'color' => trim($imprimir->color),
                    'nombre' => utf8_encode(trim($imprimir->nombre))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GrabarEditarPlazoExpediente($descripcion, $tipo_operacion, $id, $color)
    {
        if ($tipo_operacion === "1") {
            $sentencia = " insert into plazo_expediente(plazo_expediente,nombre, color) ";
            $sentencia = $sentencia . "     values( right('00' +  (select convert(varchar(2), count(*) + 1) from plazo_expediente), 2), upper('" . $descripcion . "'), upper('" . $color . "'))";
        } else {
            $sentencia = " update plazo_expediente set nombre = upper('" . $descripcion . "'), color = upper('" . $color . "') where plazo_expediente = '" . $id . "'";
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function EliminarPlazoExpe($id)
    {
        $sentencia = "delete from plazo_expediente where plazo_expediente = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    /* fin de plazo expediente */


    /* inicio de alerta */



    public function MostrarAlerta()
    {
        $sentencia = "select alerta, nombre, color, mayora, menora from alerta";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'alerta' => trim($imprimir->alerta),
                    'nombre' => utf8_encode(trim($imprimir->nombre)),
                    'color' => trim($imprimir->color),
                    'mayora' => trim($imprimir->mayora),
                    'menora' => trim($imprimir->menora)


                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    

    public function GrabarEditarAlerta($descripcion, $tipo_operacion, $id, $color, $mayora, $menora)
    {
        if ($tipo_operacion === "1") {
            $sentencia = "  insert into alerta(alerta, nombre, color, mayora, menora) ";
            $sentencia = $sentencia . "  values ( right('00' +  (select convert(varchar(2), count(*) + 1) from alerta), 2), upper('".$descripcion."'),'".$color."', '".$mayora."', '".$menora."') ";

        } else {
            $sentencia = " update alerta set nombre = upper('" . $descripcion . "'), color = upper('" . $color . "'), mayora = '".$mayora."', menora = '".$menora."' where alerta = '".$id."'"; 
        }
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function EliminarAlerta($id)
    {
        $sentencia = "delete from alerta where alerta = '".$id."'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    /* fin de alerta */

  
    public function RevisarCodigo($codigo)
    {
        $sentencia = "select codigo, actor_descripcion from v_actor_descripcion where codigo = '".$codigo."'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'codigo' => trim($imprimir->codigo),
                    'actor_descripcion' => trim($imprimir->actor_descripcion)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }






}
