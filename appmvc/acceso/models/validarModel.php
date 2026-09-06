<?php

class validarModel extends Model
{

    public
    function __construct()
    {
        parent::__construct();
    }

    public
    function RevisarUser($user, $clave)
    {
        $read_user =  "select * from usuario where user = '".$user."' and password = '".$clave."' and estado = 1";
        $ejecucion_read = $this->_db->prepare($read_user);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'user' => $read->user,
                    'usuario' => $read->usuario,
                    'nombres' => $read->nombres,
                    'foto' => $read->foto,
                    'modulo' => $read->modulo
                );
                $solo_array = array(
                    'encontro' => '1',
                    'user' => $read->user,
                    'usuario' => $read->usuario,
                    'nombres' => $read->nombres,
                    'foto' => $read->foto,
                    'modulo' => $read->modulo
                );
                $_SESSION["usuario"] = $solo_array ;
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0'
            );
        }
       return json_encode($datos_read);
    }



     


    public function setCerrarSession($user)
    {
        $sentencia = "update usuario set sesion = '0', fecha_cierre_sesion = getdate() where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado) {
            $array = array('estado' => 1, 'mensaje' => 'Sesion Culminada');
            session_destroy();
        } else {
            $array = array('estado' => 0, 'mensaje' => 'Error en cierre de sesion');
        }
        return json_encode($array);
    }


    public function CambiarClave($user, $nueva)
    {
        $sentencia = "update usuario set password = '" . $nueva . "'  where user = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado) {
            $array = array('estado' => 1, 'mensaje' => 'Actualizacion Ok');
        } else {
            $array = array('estado' => 0, 'mensaje' => 'Error ');
        }
        return json_encode($array);
    }
}
