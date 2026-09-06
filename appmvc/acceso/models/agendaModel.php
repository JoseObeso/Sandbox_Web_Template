<?php
class agendaModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function ListaAgenda()
    {
        $sentencia = "select agenda, actividad, lugar, fecha, usuario, publicado from v_agenda_directoral where year(fecha) = year(now()) order by fecha desc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'agenda' => trim($imprimir->agenda),
                    'actividad' => trim($imprimir->actividad),
                    'lugar' => trim($imprimir->lugar),
                    'fecha' => date("d/m/Y", strtotime($imprimir->fecha)),
                    'publicado' => date("d/m/Y", strtotime($imprimir->publicado)) 
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public
    function GrabarAgenda($id, $tipo, $actividad, $lugar, $fecha, $dni)
    {

        if ($tipo == 1) {
            $sql_update_registro = " update agenda_mov set  actividad = '".$actividad."', lugar = '".$lugar."', fecha = STR_TO_DATE('".$fecha."', '%d/%m/%Y'),  usuario = '".$dni."', publicado = now() where agenda = '".$id."'";
        }
        else {
            $sql_update_registro = " insert into agenda_directoral(actividad,lugar,fecha,usuario,publicado) values ('".$actividad."', '".$lugar."', STR_TO_DATE('".$fecha."', '%d/%m/%Y'),  '".$dni."', now())";
        }
        
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
        
    }


    public
    function EliminarAgenda($id)
    {
        $sql_update_registro = "delete from agenda_mov where agenda =  " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    
    public
    function ActivarDirectorio($id)
    {
        $sql_update_registro = "update directorio set activo = '1' where directorio =  '" . $id . "'";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



}
