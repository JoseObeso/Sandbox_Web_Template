<?php
class izquierdoModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }


    public function Listar($descripcion, $anio, $mes)
    {
        $filtro = " and YEAR(dfecharegistro) = " . $anio;
        if ($descripcion == '') {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and descripcion like '%" . $descripcion . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(dfecharegistro) = " . $mes;
        }
        $order = " order by dfecharegistro desc";
        $query =  "select  id, descripcion, archivo, enlace, estado, dfecharegistro, case when estado = '1' then 'MOSTRAR' else 'NO' end as tipo_estado  ";
        $query = $query . " from izquierdo where 1 = 1 " . $filtro . $order;

        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->id),
                    'descripcion' => trim($imprimir->descripcion),
                    'archivo' => trim($imprimir->archivo),
                    'enlace' => trim($imprimir->enlace),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'estado' => trim($imprimir->estado),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro))
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function Grabar($descripcion, $imagen1, $enlace, $dni)
    {
        $sql_update_registro = " insert into izquierdo(descripcion, archivo, enlace, estado, dfecharegistro, usuario) ";
        $sql_update_registro = $sql_update_registro . "  values('" . $descripcion . "',  '" . $imagen1 . "', '" . $enlace . "','0', now(), '" . $dni . "')";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  Activar($id, $activar)
    {
        if ($activar == '1') {
            $sql_update_registro = " update izquierdo set estado = '1' where id= " . $id;
        } else {
            $sql_update_registro = " update izquierdo set estado = '0' where id= " . $id;
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }





    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from izquierdo where id = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
