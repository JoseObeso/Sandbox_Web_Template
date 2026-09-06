<?php
class contratacionesModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }



    public function Listar()
    {
        $query =  "select  a.idcalidad_documentos, a.vanio, a.fechadocumentos, a.idcategoria, a.descripcion, a.archivo, a.usuario, a.dfecharegistro, b.nombre as nombre_categoria ";
        $query = $query . " from calidad_documentos a left join calidad_categoria b on b.idcalidad_categoria = a.idcategoria  where a.tipo = 'R' order by a.vanio";
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
        $query =  "select  idcalidad_documentos, fechadocumentos, descripcion, archivo, usuario, dfecharegistro, galerias from calidad_documentos  where tipo = 'R' order by vanio";
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
        $query =  "select idcalidad_categoria, nombre, usuario, dfecharegistro from calidad_categoria where tipo = 'R';";
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
        $sql_update_registro = $sql_update_registro . " values ('".$anio."', '', ".$idcategoria.", upper('".$descripcion."'), '".$archivo."', '".$user."', now(), 'R') ";
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
        $sql = $sql . "  values('" . $fecha . "', upper('" . $titulo . "') , now(), '" . $user . "', 'E', replace('" . $galerias . "', ',', ';'))";
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


   

    public function GrabarCategoria($categoria, $user)
    {
        $sql = "insert into calidad_categoria(nombre, dfecharegistro, usuario, tipo)";
        $sql = $sql . "  values(upper('" . $categoria . "'), now(), '" . $user . "', 'R')";
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function EliminarGaleria($id)
    {
        $sql = "delete from calidad_documentos where idcalidad_documentos = ".$id;
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  EliminarCategoria($id) 
    {
        $sql = "delete from calidad_documentos where idcategoria = " . $id;
        $sql = $sql . "; delete from calidad_categoria where idcalidad_categoria = " . $id;
        $ejecucion = $this->_db->prepare($sql);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

}
