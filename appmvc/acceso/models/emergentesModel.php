<?php
class emergentesModel extends Model
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
        $query = " select  idemergentes, descripcion, archivo, estado, dfecharegistro, case when estado = '1' then 'MOSTRAR' else 'NO' end as tipo_estado, case when tipo_dimension = 'v' then 'VERTICAL' when tipo_dimension = 'h' then 'HORIZONTAL' else ' -- NO DIMENSIONES -- ' end
        dimension from emergentes where 1 = 1 " . $filtro . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'idemergentes' => trim($imprimir->idemergentes),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'descripcion' => trim($imprimir->descripcion),
                    'tipo_estado' => trim($imprimir->tipo_estado),
                    'archivo' => trim($imprimir->archivo),
                    'estado' => trim($imprimir->estado),
                    'dimension' => trim($imprimir->dimension)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    
    
    public function Grabar($descripcion, $imagen1, $dni, $tipo_dimension)
    {
        $sql_update_registro = " insert into emergentes(descripcion, archivo, estado, dfecharegistro, tipo_dimension) ";
        $sql_update_registro = $sql_update_registro . "  values(upper('" . $descripcion . "') ,  '" . $imagen1 . "', '0', now(), '".$tipo_dimension."') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  Activar($id, $activar)
    {
        if ($activar == '1') {
            $sql_update_registro = " update emergentes set estado = '1' where idemergentes = " . $id;
            $sql_update_registro = $sql_update_registro . "; update emergentes set estado = '0' where idemergentes <> " . $id;
        } else {
            $sql_update_registro = " update emergentes set estado = '0' where 1 = 1 ";
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }





    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from emergentes where idemergentes = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
