<?php
class docenciaModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }



    public function Listar()
    {

        $query =  "select iddocencia, anio, descripcion, archivo, dfecharegistro, usuario, tipo, codigo  from docencia where tipo = 'R' order by anio desc;";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->iddocencia),
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





    public function ListarGalerias()
    {

        $query =  "select iddocencia, fechagaleria, descripcion, dfecharegistro, tipo, galerias, usuario from docencia where tipo = 'G' order by dfecharegistro desc";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->iddocencia),
                    'fechagaleria' => trim($imprimir->fechagaleria),
                    'descripcion' => trim($imprimir->descripcion),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario' => trim($imprimir->usuario),
                    'galerias' => trim($imprimir->galerias)

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function Grabar($anio, $descripcion, $archivo, $user)
    {

        $sql_update_registro = " insert into docencia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'R', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }






    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from docencia where iddocencia = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }




    public function GrabarGaleria($fecha, $titulo, $galerias, $user)
    {
        $sql = "insert into docencia(fechagaleria, descripcion, dfecharegistro, usuario, tipo, galerias)";
        $sql = $sql . "  values('" . $fecha . "', upper('" . $titulo . "') , now(), '" . $user . "', 'G', replace('" . $galerias . "', ',', ';'))";
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function EliminarGaleria($id)
    {
        $sql = "delete from docencia where iddocencia = ".$id;
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    
    // inicio de baner y jefe


    public function Listarbanner()
    {
        $order = " order by dfecharegistro desc";
        $query = " select id, descripcion, archivo, estado,  case when estado = '1' then 'mostrar' else 'no' end as tipo_estado, dfecharegistro from banner where tipo = 'D'  " . $order;
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
        $sql_update_registro =  $sql_update_registro . "    values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '0', now(), 'D') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Listarjefe()
    {
        $query = " select id, nombrejefe, cargojefe, estado, dfecharegistro,case when estado = '1' then 'MOSTRAR' else 'NO MOSTRAR' end as tipo_estado from banner where unidad = 'DO' ";
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
        $sql_update_registro =  " insert into banner (nombrejefe, cargojefe, unidad, estado, dfecharegistro) values (upper('" . $jefe . "'), upper('" . $cargo . "'), 'DO', '0', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  ActivarJefe($id)
    {
        $sql_update_registro = " update banner set estado = '1' where unidad = 'DO' and  id = " . $id;
        $sql_update_registro = $sql_update_registro . "; update banner set estado = '0' where unidad = 'DO' and  id <> " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    // fin de baner y jefe



    // inicio de recursos humanos

    public function listarrh()
    {
        $query = " select id, nombrejefe, cargojefe, estado, dfecharegistro,case when estado = '1' then 'MOSTRAR' else 'NO MOSTRAR' end as tipo_estado from banner where unidad = 'DR' ";
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


    public function grabarrh($jefe, $cargo)
    {
        $sql_update_registro =  " insert into banner (nombrejefe, cargojefe, unidad, estado, dfecharegistro) values (upper('" . $jefe . "'), upper('" . $cargo . "'), 'DR', '0', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  Activarrh($id)
    {
        $sql_update_registro = " update banner set estado = '1' where unidad = 'DR' and  id = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    // fin de recursos humanos








}
