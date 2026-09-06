<?php
class fotodirectorModel extends Model
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
            $filtro = $filtro . " and nombredirector like '%" . $descripcion . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(dfecharegistro) = " . $mes;
        }
        $order = " order by dfecharegistro desc";
        $query =  "select  idfotodirector, nombredirector, fotodirector, resolucion, estado, dfecharegistro, case when estado = '1' then 'MOSTRAR' else 'NO' end as tipo_estado  ";
        $query = $query . " from fotodirector where 1 = 1 " . $filtro . $order;
        
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->idfotodirector),
                    'nombredirector' => trim($imprimir->nombredirector),
                    'fotodirector' => trim($imprimir->fotodirector),
                    'resolucion' => trim($imprimir->resolucion),
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

 

    public function Grabar($descripcion, $imagen1, $resolucion, $dni)
    {
        $sql_update_registro = " insert into fotodirector(nombredirector, fotodirector, resolucion, estado, dfecharegistro, usuario) ";
        $sql_update_registro = $sql_update_registro . "  values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '" . $resolucion . "','0', now(), '" . $dni. "')";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  Activar($id, $activar)
    {
        if ($activar == '1') {
            $sql_update_registro = " update fotodirector set estado = '1' where idfotodirector = " . $id;
            $sql_update_registro = $sql_update_registro . "; update fotodirector set estado = '0' where idfotodirector <> " . $id;
        } else {
            $sql_update_registro = " update fotodirector set estado = '0' where 1 = 1 ";
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }





    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from fotodirector where idfotodirector= " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
