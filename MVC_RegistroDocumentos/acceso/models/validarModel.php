<?php

class validarModel extends Model
{

    public
    function __construct()
    {
        parent::__construct();
    }


    public function ListarUsuarioActor($user)
    {
        $sentencia = "select * from usuario_actor where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'id_usuario_actor' => $imprimir->ID_USUARIO_ACTOR,
                    'usuario' => utf8_encode(trim($imprimir->USUARIO)),
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA))
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }


    public
    function  RevisarUser($user, $clave)
    {
        $read_user =  "select USUARIO, NOMBRE_APELLIDOS, DESCRIPCION, NOMBRE, VFOTO, ACTIVO, TIPO_VIGENTE
         from v_usuario where modulo = 'tramite' and usuario = '" . $user . "' and contrasena = '" . $clave . "'";
        $ejecucion_read = $this->_db->prepare($read_user);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'usuario' => utf8_encode($read->USUARIO),
                    'nombre_apellidos' => utf8_encode($read->NOMBRE_APELLIDOS),
                    'descripcion' => utf8_encode($read->DESCRIPCION),
                    'nombre' => utf8_encode($read->NOMBRE),
                    'foto' => trim($read->VFOTO),
                    'activo' => trim($read->ACTIVO),
                    'vigencia' => trim($read->TIPO_VIGENTE)
                );
            }
        } else {
            $datos_read[] = array('encontro' => '0');
        }
        return json_encode($datos_read);
    }

    public  function  RevisarUserSesion($user, $actor, $abreviatura, $responsable)
    {
        $read_user =  "select * from v_actor_codigo where usuario = '" . $user . "' and actor = '" . $actor . "' and activo = 1";
        $ejecucion_read = $this->_db->prepare($read_user);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array('encontro' => '1');
                $solo_array = array(
                    'encontro' => '1',
                    'nombreusuario' => utf8_encode($read->USUARIO),
                    'actor' => $actor,
                    'abreviatura' => utf8_encode($abreviatura),
                    'apellidos_nombres' => utf8_encode($read->NOMBRE_APELLIDOS),
                    'descripcion_actor' => utf8_encode($read->DESCRIPCION),
                    'responsable' => utf8_encode($responsable),
                    'nombre' => utf8_encode($read->NOMBRE),
                    'foto' => utf8_encode($read->VFOTO),
                    'codigo_tramite' => trim($read->CODIGO_TRAMITE)
                );
                $_SESSION["usuario"] = $solo_array;
            }
        } else {
            $datos_read[] = array('encontro' => '0');
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
        $sentencia = "update usuario set contrasena = '" . $nueva . "'  where usuario = '" . $user . "'";
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
