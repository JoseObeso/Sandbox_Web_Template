<?php

class usuariosModel extends Model
{

    public
    function __construct()
    {
        parent::__construct();
    }


    public function lista_usuarios()
    {
        $sentencia = "select usuario, nombre, paterno, materno, upper(nombres) as nombres, user, cargo, modulo, sexo, foto, estado from usuario where estado = 1";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'usuario' => trim($imprimir->usuario),
                    'nombre' => trim($imprimir->nombre),
                    'paterno' => trim($imprimir->paterno),
                    'materno' => trim($imprimir->materno),
                    'nombres' => trim($imprimir->nombres),
                    'user' => trim($imprimir->user),
                    'cargo' => trim($imprimir->cargo),
                    'modulo' => trim($imprimir->modulo),
                    'sexo' => trim($imprimir->sexo),
                    'foto' => trim($imprimir->foto),
                    'estado' => $imprimir->estado == 1 ? 'USUARIO OPERATIVO' : 'USUARIO DESACTIVADO'
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }

    public function  lista_usuarios_todos()
    {
        $sentencia = "select usuario, nombre, paterno, materno, upper(nombres) as nombres, user, cargo, modulo, sexo, foto, estado from usuario";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'usuario' => trim($imprimir->usuario),
                    'nombre' => trim($imprimir->nombre),
                    'paterno' => trim($imprimir->paterno),
                    'materno' => trim($imprimir->materno),
                    'nombres' => trim($imprimir->nombres),
                    'user' => trim($imprimir->user),
                    'cargo' => trim($imprimir->cargo),
                    'modulo' => trim($imprimir->modulo),
                    'sexo' => trim($imprimir->sexo),
                    'foto' => trim($imprimir->foto),
                    'estado' => $imprimir->estado == 1 ? 'USUARIO OPERATIVO' : 'USUARIO DESACTIVADO'
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }




    public
    function RevisarUserExistente($user)
    {
        $read_personal = "select nombres from usuario where user = ltrim(rtrim((upper('" . $user . "'))))";
        $ejecucion_read = $this->_db->prepare($read_personal);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'nombres' =>  $read->nombres
                );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0'
            );
        }
        return json_encode($datos_read);
    }


    public
    function GrabarNuevoUsuario($user, $dni, $nombre, $paterno, $materno, $oficina, $sexo)
    {
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombre;
        $sql_insert_registro = "insert into usuario (usuario, nombre, paterno, materno, nombres, user, password, cargo, modulo, registerDate, lastvisitDate, block, foto, sexo)";
        $sql_insert_registro = $sql_insert_registro . " values ('" . $dni . "', '" . $nombre . "', '" . $paterno . "' ,  '" . $materno . "',  '" . $apellidos_nombres . "', '" . $user . "', '1234', '" . $oficina . "','" . $oficina . "', now(), now(), 1, '" . $sexo . "', '" . $sexo . "')";
        $ejecucion = $this->_db->prepare($sql_insert_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function ModificarUsuario($user, $dni, $nombre, $paterno, $materno, $oficina, $sexo)
    {
        $apellidos_nombres = $paterno . ' ' . $materno . ' ' . $nombre;
        $foto = $sexo . '.jpg';
        $sql_update_registro = "update usuario set usuario = '" . $dni . "', nombre = '" . $nombre . "', paterno = '" . $paterno . "', materno = '" . $materno . "', lastvisitDate = now(),";
        $sql_update_registro = $sql_update_registro . " nombres = upper('" . $apellidos_nombres . "'), cargo = '" . $oficina . "', modulo = '" . $oficina . "', foto = '" . $foto . "', sexo = '" . $sexo . "'";
        $sql_update_registro = $sql_update_registro . " where user = '" . $user . "'";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public
    function  EliminarUsuario($dni)
    {
        $sql_delete_registro = "update usuario set estado = 0 where usuario = '" . $dni . "'";
        $ejecucion = $this->_db->prepare($sql_delete_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public
    function  ResetClave($dni)
    {
        $sql_delete_registro = "update usuario set password = '1234' where usuario = '" . $dni . "'";
        $ejecucion = $this->_db->prepare($sql_delete_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public
    function  HabilitarUser($dni)
    {
        $sql_delete_registro = "update usuario set estado = 1 where usuario = '" . $dni . "'";
        $ejecucion = $this->_db->prepare($sql_delete_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function PermisosUsuarios($user)
    {
        $read_personal = "select iduser_app, vapp_user, vapp_nombre, imagen, vapp_url from usuarios_app where vapp_user = ltrim(rtrim((upper('" . $user . "')))) order by vapp_nombre";
        $ejecucion_read = $this->_db->prepare($read_personal);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'respuesta' => '1',
                    'iduser_app' => $read->iduser_app,
                    'vapp_user' => $read->vapp_user,
                    'vapp_nombre' => $read->vapp_nombre,
                    'imagen' => $read->imagen,
                    'vapp_url' => $read->vapp_url
                );
            }
        } else {
            $datos_read[] = array(
                'respuesta' => '0'
            );
        }
        return json_encode($datos_read);
    }


    public
    function EliminarPermisoApp($id)
    {
        $sql_delete_registro = "delete from usuarios_app where iduser_app = '" . $id . "'";
        $ejecucion = $this->_db->prepare($sql_delete_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function lista_app()
    {
        $sentencia = "select idapp,vapp, imagen, vapp_url from app order by vapp";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'idapp' => $imprimir->idapp,
                    'vapp' => trim($imprimir->vapp),
                    'imagen' => trim($imprimir->imagen),
                    'vapp_url' => trim($imprimir->vapp_url)
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }




    public
    function RegistrarApp($id, $vapp, $imagen, $vapp_url, $vgm)
    {
        if ($vgm == "1") {
            $sql_registro = "insert into app (vapp, imagen, vapp_url) values ('" . $vapp . "', '" . $imagen . "', '" . $vapp_url . "')";
        } else {
            $sql_registro = "update app set  vapp = '" . $vapp . "', imagen = '" . $imagen . "', vapp_url = '" . $vapp_url . "' where idapp = " . $id;
        }
        $ejecucion = $this->_db->prepare($sql_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function EliminarApp($id)
    {
        $sql_registro = "delete from app where idapp = " . $id;
        $ejecucion = $this->_db->prepare($sql_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function GrabarUsuarioApp($id_user, $id_app, $vapp, $imagen, $vapp_url)
    {
        $sql_registro = "delete from usuarios_app where id_app = '" . $id_app . "' and  vapp_user =  '" . $id_user . "';";
        $sql_registro = $sql_registro . " insert into usuarios_app (vapp_user, id_app, vapp_nombre, imagen, vapp_url) values ('" . $id_user . "', '" . $id_app . "', '" . $vapp . "', '" . $imagen . "', '" . $vapp_url . "');";
        $ejecucion = $this->_db->prepare($sql_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function CambiarNUser($dni, $nuser)
    {
        $sql_registro = "update usuario set user = '" . $nuser . "' where usuario = " . $dni;
        $ejecucion = $this->_db->prepare($sql_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public
    function RevisarExisteDNI($dni)
    {
        $sentencia = "select nombres from usuario where usuario = '".$dni."'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'nombres' => trim($imprimir->nombres)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }
}
