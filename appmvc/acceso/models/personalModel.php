<?php
class personalModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }



    public function Listar()
    {
        $query =  "select  a.idcalidad_documentos, a.vanio, a.fechadocumentos, a.idcategoria, a.descripcion, a.archivo, a.usuario, a.dfecharegistro, b.nombre as nombre_categoria ";
        $query = $query . " from calidad_documentos a left join calidad_categoria b on b.idcalidad_categoria = a.idcategoria  where a.tipo = 'P' order by a.vanio";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => $imprimir->idcalidad_documentos,
                    'anio' => trim($imprimir->vanio),
                    'descripcion' => trim($imprimir->descripcion),
                    'archivo' => trim($imprimir->archivo),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'usuario' => trim($imprimir->usuario),
                    'categoria' => trim($imprimir->nombre_categoria)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }





    public function ListarGalerias()
    {
        $query =  "select  idcalidad_documentos, fechadocumentos, descripcion, archivo, usuario, dfecharegistro, galerias from calidad_documentos  where tipo = 'L' order by vanio";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->idcalidad_documentos),
                    'fecha' => trim($imprimir->fechadocumentos),
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





    public function Listar_categorias()
    {
        $query =  "select idcalidad_categoria, nombre, usuario, dfecharegistro from calidad_categoria where tipo = 'P';";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_cate' => $imprimir->idcalidad_categoria,
                    'nombre' => trim($imprimir->nombre),
                    'usuario' => trim($imprimir->usuario),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }





    public function Grabar($anio, $idcategoria, $descripcion, $archivo, $user)
    {

        $sql_update_registro = " insert into calidad_documentos (vanio, fechadocumentos, idcategoria, descripcion, archivo, usuario, dfecharegistro, tipo) ";
        $sql_update_registro = $sql_update_registro . " values ('" . $anio . "', '', " . $idcategoria . ", upper('" . $descripcion . "'), '" . $archivo . "', '" . $user . "', now(), 'P') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }






    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from calidad_documentos where idcalidad_documentos = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }




    public function GrabarGaleria($fecha, $titulo, $galerias, $user)
    {
        $sql = "insert into calidad_documentos(fechadocumentos, descripcion, dfecharegistro, usuario, tipo, galerias)";
        $sql = $sql . "  values('" . $fecha . "', upper('" . $titulo . "') , now(), '" . $user . "', 'L', replace('" . $galerias . "', ',', ';'))";

        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }




    public function GrabarCategoria($categoria, $user)
    {

        $sql = "insert into calidad_categoria(nombre, dfecharegistro, usuario, tipo)";
        $sql = $sql . "  values(upper('" . $categoria . "'), now(), '" . $user . "', 'P')";
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function EliminarGaleria($id)
    {
        $sql = "delete from calidad_documentos where idcalidad_documentos = " . $id;
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  EliminarCategoria($id)
    {
        $sql = "delete from calidad_categoria where idcalidad_categoria = " . $id;
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Listarbanner()
    {
        $order = " order by dfecharegistro desc";
        $query = " select id, descripcion, archivo, estado,  case when estado = '1' then 'mostrar' else 'no' end as tipo_estado, dfecharegistro from banner where tipo = 'L'  " . $order;
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
        $sql_update_registro =  $sql_update_registro . "    values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '0', now(), 'L') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function Listarjefe()
    {
        $query = " select id, nombrejefe, cargojefe, estado, dfecharegistro,case when estado = '1' then 'MOSTRAR' else 'NO MOSTRAR' end as tipo_estado from banner where unidad = 'PE' ";
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
        $sql_update_registro =  " insert into banner (nombrejefe, cargojefe, unidad, estado, dfecharegistro) values (upper('" . $jefe . "'), upper('" . $cargo . "'), 'PE', '0', now())";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  ActivarJefe($id)
    {
        $sql_update_registro = " update banner set estado = '1' where unidad = 'PE' and  id = " . $id;
        $sql_update_registro = $sql_update_registro . "; update banner set estado = '0' where unidad = 'PE' and  id <> " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
