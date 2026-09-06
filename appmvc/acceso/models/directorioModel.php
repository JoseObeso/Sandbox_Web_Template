<?php
class directorioModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function ListaDirectorio()
    {
        $sentencia = "select * from directorio order by directorio asc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'directorio' => trim($imprimir->directorio),
                    'cargo' => trim($imprimir->cargo),
                    'nombre' => trim($imprimir->nombre),
                    'nombre' => trim($imprimir->nombre),
                    'email' => trim($imprimir->email),
                    'anexo' => trim($imprimir->anexo),
                    'rpm' => trim($imprimir->rpm),
                    'sede' => trim($imprimir->sede),
                    'celular' => trim($imprimir->celular),


                    'cabecera' => trim($imprimir->cabecera),
                    'orden' => trim($imprimir->orden),
                    'activo' => trim($imprimir->activo)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }



    public
    function GrabarDirectorio($id, $cargo, $nombre, $email, $anexo, $celular, $rpm, $dni)
    {
        $sql_update_registro = " update directorio set  cargo= '" . $cargo . "', nombre='" . $nombre . "',  email= '" . $email . "', anexo= '" . $anexo . "',  celular= '" . $celular . "',  rpm= '" . $rpm . "',  usuario= '" . $dni . "',  publicado=now()   where directorio= '" . $id . "'";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public
    function DesactivarDirectorio($id)
    {
        $sql_update_registro = "update directorio set activo = '0' where directorio =  '" . $id . "'";
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
