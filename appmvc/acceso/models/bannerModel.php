<?php
class bannerModel extends Model
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
        $query = " select id, descripcion, archivo, estado,  case when estado = '1' then 'mostrar' else 'no' end as tipo_estado, dfecharegistro from banner where tipo = 'P'  " . $filtro . $order;
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

    
    
    public function Grabar($descripcion, $imagen1, $dni)
    {
        $sql_update_registro =  " insert into banner (descripcion, archivo, estado, dfecharegistro, tipo) ";
        $sql_update_registro =  $sql_update_registro . "    values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '0', now(), 'P') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
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





    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from banner where id = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
