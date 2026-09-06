<?php
class internoModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }



    public function Listar()
    {

        $query =  "select iddocencia, anio, descripcion, archivo, dfecharegistro, usuario, tipo, codigo  from docencia where tipo = 'I' order by anio desc;";
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




 



    public function Grabar($anio, $descripcion, $archivo, $user)
    {

        $sql_update_registro = " insert into docencia(anio, descripcion, archivo, usuario, tipo, dfecharegistro) ";
        $sql_update_registro = $sql_update_registro . " values ( '" . $anio . "', '" . $descripcion . "', '" . $archivo . "', '" . $user . "', 'I', now())";
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



  

}
