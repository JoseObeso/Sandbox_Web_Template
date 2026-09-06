<?php
class autoridadesModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function ListaAutoridades()
    {
        $sentencia = "select * from autoridad";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'autoridad' => trim($imprimir->autoridad),
                    'cargo' => trim($imprimir->cargo),
                    'nombre' => trim($imprimir->nombre),
                    'curriculum' => trim($imprimir->curriculum),
                    'nepotismo' => trim($imprimir->nepotismo),
                    'bienes' => trim($imprimir->bienes),
                    'intereses' => trim($imprimir->interes)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public
    function ActualizarAutoridad($id, $cargo, $nombre, $cv, $nepotismo, $bienes, $intereses, $dni)
    {
        $sql_update_registro = " update autoridad set nombre = '" . $nombre . "',  curriculum = '" . $cv . "', nepotismo = '" . $nepotismo . "',";
        $sql_update_registro = $sql_update_registro . " bienes = '" . $bienes . "', interes = '" . $intereses . "', publicado = now(), usuario = '" . $dni . "' where autoridad = '" . $id . "'";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public
    function EliminarAdjuntoAutoridad($id, $cv, $nepotismo, $bienes, $intereses, $dni)
    {
        // $cv, $nepotismo, $bienes, $intereses

        if ($cv == '1' ) {
            $sql_update_registro = " update autoridad set curriculum = '', publicado = now(), usuario = '" . $dni . "' where autoridad = '" . $id . "'";
            $ejecucion = $this->_db->prepare($sql_update_registro);
            $ejecucion->execute();
        }

        if ($nepotismo == '1' ) {
            $sql_update_registro2 = " update autoridad set nepotismo = '', publicado = now(), usuario = '" . $dni . "' where autoridad = '" . $id . "'";
            $ejecucion = $this->_db->prepare($sql_update_registro2);
            $ejecucion->execute();
        }


        if ($bienes == '1' ) {
            $sql_update_registro3 = " update autoridad set  bienes = '', publicado = now(), usuario = '" . $dni . "' where autoridad = '" . $id . "'";
            $ejecucion = $this->_db->prepare($sql_update_registro3);
            $ejecucion->execute();
        }

        if ($intereses == '1' ) {
            $sql_update_registro4 = " update autoridad set  interes = '', publicado = now(), usuario = '" . $dni . "' where autoridad = '" . $id . "'";
            $ejecucion = $this->_db->prepare($sql_update_registro4);
            $ejecucion->execute();
        }



        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
