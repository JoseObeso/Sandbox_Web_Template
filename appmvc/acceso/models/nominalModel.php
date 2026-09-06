<?php
class nominalModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function Listar()
    {
        $query =  "select  a.idcalidad_documentos, a.vanio, a.fechadocumentos, a.idcategoria, a.descripcion, a.archivo, a.usuario, a.dfecharegistro, a.clasificador as numero_mes, a.mes as nombre_mes ";
        $query = $query . " from calidad_documentos a left join calidad_categoria b on b.idcalidad_categoria = a.idcategoria  where a.tipo = 'M' order by a.vanio  desc";
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
                    'mes' => trim($imprimir->nombre_mes)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function Listar_mes()
    {
        $query =  " select idcalidad_categoria, nombre, usuario, dfecharegistro, clasificador from calidad_categoria where tipo = 'M' ";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_cate' => $imprimir->idcalidad_categoria,
                    'nombre' => trim($imprimir->nombre),
                    'usuario' => trim($imprimir->usuario),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'clasificador' => trim($imprimir->clasificador)
                    

                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function Grabar($anio, $mes, $nro_mes, $archivo, $user, $descripcion)
    {
        $sql_update_registro = "delete from calidad_documentos where clasificador = '".$nro_mes."' and tipo = 'M' and vanio = '".$anio."'; ";
        $sql_update_registro = $sql_update_registro . " insert into calidad_documentos (vanio, descripcion, archivo, usuario, dfecharegistro, tipo, clasificador, mes) ";
        $sql_update_registro = $sql_update_registro . " values ('".$anio."', upper('".$descripcion."'), '".$archivo."', '".$user."', now(), 'M', '".$nro_mes."', '".$mes."' ); ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function Eliminar($id)
    {
        $sql_update_registro = " delete from calidad_documentos where idcalidad_documentos = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

   

    public function GrabarCategoria($categoria, $user, $clasificador)
    {
        $sql = "insert into calidad_categoria(nombre, dfecharegistro, usuario, tipo, clasificador)";
        $sql = $sql . "  values(upper('" . $categoria . "'), now(), '" . $user . "', 'N', upper('".$clasificador."'))";
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
