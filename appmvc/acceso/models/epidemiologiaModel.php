<?php
class epidemiologiaModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }



    public function Listar()
    {

        $query =  "select idepidemiologia, anio, descripcion, archivo, dfecharegistro, usuario from epidemiologia where tipo = 'B' order by anio;";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->idepidemiologia),
                    'anio' => trim($imprimir->anio),
                    'descripcion' => trim($imprimir->descripcion),
                    'archivo' => trim($imprimir->archivo),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario' => trim($imprimir->usuario)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function Listar_fichas()
    {
        $query =  "select idepidemiologia, anio, descripcion, archivo, dfecharegistro, usuario from epidemiologia where tipo = 'F' order by anio";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta_ficha' => 1,
                    'id_ficha' => trim($imprimir->idepidemiologia),
                    'anio_ficha' => trim($imprimir->anio),
                    'descripcion_ficha' => trim($imprimir->descripcion),
                    'archivo_ficha' => trim($imprimir->archivo),
                    'dfecharegistro_ficha' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario_ficha' => trim($imprimir->usuario)
                );
            }
        } else {
            $array[] = array('respuesta_ficha' => 0);
        }
        return json_encode($array);
    }




    public function Listar_alertas()
    {
        $query =  "select idepidemiologia, anio, descripcion, archivo, dfecharegistro, usuario, codigo from epidemiologia where tipo = 'A' order by anio";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta_alerta' => 1,
                    'id_alerta' => trim($imprimir->idepidemiologia),
                    'anio_alerta' => trim($imprimir->anio),
                    'descripcion_alerta' => trim($imprimir->descripcion),
                    'archivo_alerta' => trim($imprimir->archivo),
                    'dfecharegistro_alerta' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario_alerta' => trim($imprimir->usuario),
                    'codigo' => trim($imprimir->codigo)
                );
            }
        } else {
            $array[] = array('respuesta_alerta' => 0);
        }
        return json_encode($array);
    }


    public function Listar_salas()
    {
        $query =  "select idepidemiologia, anio, descripcion, archivo, dfecharegistro, usuario from epidemiologia where tipo = 'S' order by anio;";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta_sala' => 1,
                    'id_sala' => trim($imprimir->idepidemiologia),
                    'anio_sala' => trim($imprimir->anio),
                    'descripcion_sala' => trim($imprimir->descripcion),
                    'archivo_sala' => trim($imprimir->archivo),
                    'dfecharegistro_sala' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario_sala' => trim($imprimir->usuario)
                );
            }
        } else {
            $array[] = array('respuesta_sala' => 0);
        }
        return json_encode($array);
    }


    public function listar_analisis()
    {
        $query =  "select idepidemiologia, anio, descripcion, archivo, dfecharegistro, usuario from epidemiologia where tipo = 'L' order by anio;";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'arespuesta' => 1,
                    'aid' => trim($imprimir->idepidemiologia),
                    'aanio' => trim($imprimir->anio),
                    'adescripcion' => trim($imprimir->descripcion),
                    'aarchivo' => trim($imprimir->archivo),
                    'adfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'ausuario' => trim($imprimir->usuario)
                );
            }
        } else {
            $array[] = array('arespuesta' => 0);
        }
        return json_encode($array);
    }

    




    public function Grabar($anio, $descripcion, $archivo, $user)
    {

        $sql_update_registro = " insert into epidemiologia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'B', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Grabar_ficha($anio, $descripcion, $archivo, $user)
    {

        $sql_update_registro = " insert into epidemiologia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'F', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Grabar_alerta($anio, $codigo, $descripcion, $archivo, $user)
    {
        $sql_update_registro = " insert into epidemiologia(anio, descripcion, archivo, usuario, tipo, codigo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'A', '" . $codigo . "', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Grabar_sala($anio, $descripcion, $archivo, $user)
    {
        $sql_update_registro = " insert into epidemiologia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'S', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Grabar_analisis($anio, $descripcion, $archivo, $user)
    {
        $sql_update_registro = " insert into epidemiologia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'L', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from epidemiologia where idepidemiologia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function Eliminar_ficha($id)
    {
        $sql_update_registro = " delete from epidemiologia where idepidemiologia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function Eliminar_Alerta($id)
    {
        $sql_update_registro = " delete from epidemiologia where idepidemiologia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public function  Eliminar_sala($id)
    {
        $sql_update_registro = " delete from epidemiologia where idepidemiologia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  Eliminar_analisis($id)
    {
        $sql_update_registro = " delete from epidemiologia where idepidemiologia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    // inicio de baner y jefe


    public function Listarbanner()
    {
        $order = " order by dfecharegistro desc";
        $query = " select id, descripcion, archivo, estado,  case when estado = '1' then 'mostrar' else 'no' end as tipo_estado, dfecharegistro from banner where tipo = 'E'  " . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->id),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'descripcion' => trim($imprimir->descripcion),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'archivo' => trim($imprimir->archivo),
                    'estado' => trim($imprimir->estado)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function  Activar($id, $activar)
    {
        if ($activar == '1') {
            $sql_update_registro = " update banner set estado = '1' where id = " . $id;
        } else {
            $sql_update_registro = " update banner set estado = '0' where id = " . $id;
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function Grabarbanner($descripcion, $imagen1, $dni)
    {
        $sql_update_registro =  " insert into banner (descripcion, archivo, estado, dfecharegistro, tipo) ";
        $sql_update_registro =  $sql_update_registro . "    values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '0', now(), 'E') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Listarjefe()
    {
        $query = " select id, nombrejefe, cargojefe, estado, dfecharegistro,case when estado = '1' then 'MOSTRAR' else 'NO MOSTRAR' end as tipo_estado from banner where unidad = 'EP' ";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->id),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'nombrejefe' => trim($imprimir->nombrejefe),
                    'cargojefe' => trim($imprimir->cargojefe),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'estado' => trim($imprimir->estado)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function grabarjefe($jefe, $cargo)
    {
        $sql_update_registro =  " insert into banner (nombrejefe, cargojefe, unidad, estado, dfecharegistro) values (upper('" . $jefe . "'), upper('" . $cargo . "'), 'EP', '0', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  ActivarJefe($id)
    {
        $sql_update_registro = " update banner set estado = '1' where unidad = 'EP' and  id = " . $id;
        $sql_update_registro = $sql_update_registro . "; update banner set estado = '0' where unidad = 'EP' and  id <> " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    // fin de baner y jefe


    

}
