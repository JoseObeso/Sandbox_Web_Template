<?php
class citasModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }


/*
idcitasweb, fechacita, idconsultorio, nombreconsultorio, idturno, turno, dni_paciente, nombres_paciente, celular_paciente,
nro_operacion, voucher, dfecharegistro, idcitasigsalud, precio, dfecharegistrocita, usuarioasigna, fechaotorgacita
*/

    public function Listar($descripcion, $anio, $mes)
    {
        $filtro = " and YEAR(dfecharegistro) = " . $anio;
        if ($descripcion == '') {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and nombres_paciente like '%" . $descripcion . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(dfecharegistro) = " . $mes;
        }
        $order = " order by dfecharegistro desc";
        // $query =  "select  id, descripcion, archivo, enlace, estado, dfecharegistro, case when estado = '1' then 'MOSTRAR' else 'NO' end as tipo_estado  ";
        $query =  "select idcitasweb, fechacita, idconsultorio, nombreconsultorio, idturno, turno, dni_paciente, nombres_paciente, celular_paciente, ";
        $query =  $query . " nro_operacion, voucher, dfecharegistro, idcitasigsalud, precio, dfecharegistrocita, usuarioasigna, fechaotorgacita ";
        $query =  $query . " from citasweb where 1 = 1 " . $filtro . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id' => trim($imprimir->idcitasweb),
                    'fechacita' => trim($imprimir->fechacita),
                    'idconsultorio' => trim($imprimir->idconsultorio),
                    'nombreconsultorio' => trim($imprimir->nombreconsultorio),
                    'idturno' => trim($imprimir->idturno),
                    'turno' => trim($imprimir->turno),
                    'dni_paciente' => trim($imprimir->dni_paciente),
                    'nombres_paciente' => trim($imprimir->nombres_paciente),
                    'celular_paciente' => trim($imprimir->celular_paciente),
                    'nro_operacion' => trim($imprimir->nro_operacion),
                    'voucher' => trim($imprimir->voucher),
                    'dfecharegistro' => date("d/m/Y", strtotime($imprimir->dfecharegistro)),
                    'idcitasigsalud' => trim($imprimir->idcitasigsalud),
                    'fechaotorgacita' => trim($imprimir->fechaotorgacita)
                    
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function Grabar($id, $idcitasigsalud,  $fecha, $precio, $dni)
    {
        $sql_update_registro = " update citasweb set  idcitasigsalud = '".$idcitasigsalud."', fechaotorgacita = '".$fecha."', precio = ".$precio.", usuarioasigna = '".$dni."', ";
        $sql_update_registro = $sql_update_registro . " dfecharegistrocita = now() where idcitasweb = ".$id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);



    }

    public function  Activar($id, $activar)
    {
        if ($activar === '0') {
            $sql_update_registro = " update citasweb set  idcitasigsalud = 0, fechaotorgacita = '', precio = 0, usuarioasigna = '', ";
            $sql_update_registro = $sql_update_registro . " dfecharegistrocita = now() where idcitasweb = ".$id;
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }





    public
    function Eliminar($id)
    {
        $sql_update_registro = " delete from citasweb where idcitasweb = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
