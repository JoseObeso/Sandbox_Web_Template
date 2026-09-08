<?php
class gestorModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ListarApp()
    {
        $sentencia = "select * from app";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_app' => $imprimir->ID_APP,
                    'nombre' => utf8_encode($imprimir->NOMBRE),
                    'url' => $imprimir->URL,
                    'descripcion' => utf8_encode($imprimir->DESCRIPCION),
                    'imagen' => $imprimir->IMAGEN,
                    'estado' => $imprimir->ESTADO
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron aplicaciones registrados');
        }
        return json_encode($array);
    }

    public function ListarMenu()
    {
        $sentencia = "select * from app_menu";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_menu' => $imprimir->ID_MENU,
                    'id_app' => $imprimir->ID_APP,
                    'nombre' => utf8_encode($imprimir->NOMBRE),
                    'icono' => $imprimir->ICONO,
                    'url' => $imprimir->URL,
                    'estado' => $imprimir->ESTADO
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.');
        }
        return json_encode($array);
    }


    public function ListarSubMenu()
    {
        $sentencia = "select * from app_submenu";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_submenu' => $imprimir->ID_SUBMENU,
                    'id_menu' => $imprimir->ID_MENU,
                    'id_app' => $imprimir->ID_APP,
                    'nombre' => utf8_encode($imprimir->NOMBRE),
                    'icono' => $imprimir->ICONO,
                    'url' => $imprimir->URL,
                    'estado' => $imprimir->ESTADO
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.');
        }
        return json_encode($array);
    }


    public function ListarMenuPorIDAPP($id_app)
    {
        $sentencia = " select    b.id_app, b.id_menu, a.nombre as nombre_app,  b.nombre as nombre_menu, b.icono, b.url, b.orden, b.estado  ";
        $sentencia = $sentencia . " from  app a inner join app_menu  b on a.id_app = b.id_app where a.id_app = '" . $id_app . "' order by b.orden";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_app' => $imprimir->id_app,
                    'id_menu' => $imprimir->id_menu,
                    'nombre_app' => utf8_encode($imprimir->nombre_app),
                    'nombre_menu' => utf8_encode($imprimir->nombre_menu),
                    'icono' => $imprimir->icono,
                    'url' => $imprimir->url,
                    'orden' => $imprimir->orden,
                    'estado' => $imprimir->estado
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron menus registrados.');
        }
        return json_encode($array);
    }

    public function GuardarApp($nombreapp, $urlapp, $imagenapp, $descripcionapp, $archivoapp, $user)
    {
        $sentencia = " insert into app (nombre, url, imagen, descripcion, archivo, usuarioregistra) ";
        $sentencia = $sentencia . " values (upper('" . $nombreapp . "'), '" . $urlapp . "',  '" . $imagenapp . "',  upper('" . $descripcionapp . "'), '" . $archivoapp . "', '" . $user . "' )";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

    public function GuardarMenudeApp($v_id_app, $v_menu, $v_idhtml, $v_icono, $v_orden, $user)
    {
        $sentencia = " insert into app_menu(id_app, nombre, icono, url, orden, usuarioregistra) ";
        $sentencia = $sentencia . " values (" . $v_id_app . ", '" . $v_menu . "', '" . $v_icono . "', '" . $v_idhtml . "', " . $v_orden . ", '" . $user . "')";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }

   
    public function ActualizarMenuEnUsuarios($v_id_app, $v_menu, $v_idhtml, $v_icono, $v_orden, $user)
   
    {
        $sentencia = "exec ActualizarMenuEnUsuarios '" . $user . "', " . $v_id_app . ", '" . $v_menu . "', '" . $v_idhtml . "', '" . $v_icono . "', " . $v_orden;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }



    public function GuardarSubMenudeApp($v_id_app, $v_id_menu, $v_nombre_submenu, $v_url_submenu, $v_icono_submenu, $v_orden_submenu, $user)
    {
        $sentencia = " insert into app_submenu(id_menu, id_app, nombre, icono, url, orden, usuarioregistra) ";
        $sentencia = $sentencia . " values ( " . $v_id_menu . ", " . $v_id_app . ", '" . $v_nombre_submenu . "', '" . $v_icono_submenu . "',  '" . $v_url_submenu . "', " . $v_orden_submenu . ", '" . $user . "')";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());

        return json_encode($RetornaValor);
    }




    public function ActualizarSubMenuEnTodosUsuarios($v_id_app, $v_id_menu, $v_nombre_submenu, $v_url_submenu, $v_icono_submenu, $v_orden_submenu, $user)
    {

        $sentencia = "exec ActualizarSubMenuEnTodosUsuarios  '" . $user . "', " . $v_id_app . ", " . $v_id_menu . ",  '" . $v_nombre_submenu . "', '" . $v_url_submenu . "', '" . $v_icono_submenu . "' ,  " . $v_orden_submenu;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }




    public function MostrarSubmenu($id_menu, $id_app)
    {
        $sentencia = "select * from app_submenu where id_menu  = " . (int)$id_menu . " and id_app = " . (int)$id_app;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_submenu' => $imprimir->ID_SUBMENU,
                    'id_menu' => $imprimir->ID_MENU,
                    'id_app' => $imprimir->ID_APP,
                    'nombre' => utf8_encode($imprimir->NOMBRE),
                    'icono' => utf8_encode($imprimir->ICONO),
                    'url' => utf8_encode($imprimir->URL),
                    'estado' => $imprimir->ESTADO,
                    'orden' => $imprimir->ORDEN

                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron Submenu registrados.');
        }
        return json_encode($array);
    }



    public function ListarPlantillaSubMenusById($id_menu, $id_app)
    {
        $sentencia = "select * from app_submenu where id_menu  = " . $id_menu . " and id_app = " . $id_app . ",  order by orden";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'id_submenu' => $imprimir->ID_SUBMENU,
                    'nombre' => utf8_encode($imprimir->NOMBRE),
                    'icono' => $imprimir->ICONO,
                    'url' => $imprimir->URL,
                    'estado' => $imprimir->ESTADO
                );
            }
        } else {
            $array[] = array('respuesta' => 0, 'mensaje' => 'No se encontraron Submenu registrados.');
        }
        return json_encode($array);
    }



    public function getListarMenuySubmenu($user, $modulo)
    {
        $sentencia = "select * from v_user_mod_menu_submenu where usuario='" . $user . "' and nombre_modulo='" . $modulo . "'   order by orden_menu, orden_sub  asc";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        return $resultado;
    }


    public function getVerificarPermisos($user)
    {
        $sentencia = "select *  from usuario where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $row = $resultado->fetch(PDO::FETCH_OBJ);
        if ($row->ACTIVO == 1) {
            $fecha_hoy = strtotime(date('Y-m-d'));
            $fecha_bd = strtotime($row->FECHA_EXPIRACION);
            $nombre_user = trim($row->NOMBRE);
            if ($fecha_hoy <= $fecha_bd) {
                $array = array('estado' => 1, 'mensaje' => 'Datos correctos.');
            } else {
                $array = array('estado' => 0, 'mensaje' => 'Su usuario ha caducado, contacte con el administrador.');
            }
        } else {
            $array = array('estado' => 0, 'mensaje' => 'Su usuario ha sido desactivado, contacte con el administrador.');
        }
        return $array;
    }


    public function getVerificarMenu($a_submenu_user)
    {
        $sentencia = "select * from app_menu_submenu_permisos where usuario = '" . $a_submenu_user . "' and estado = 1";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            $array = array('estado' => 1, 'mensaje' => 'Datos correctos');
        } else {
            $array = array('estado' => 0, 'mensaje' => 'No tiene permisos suficientes para poder utilizar esta opción.');
        }
        return $array;
    }






    public   function ListaUsuariosRegistrados($buscar_nombre)
    {
        $sql_read =   " select * from v_usuario where modulo = 'tramite' and ";
        $sql_read = $sql_read . " nombre like '%' + '" . $buscar_nombre . "' + '%' or usuario like  '%' + '" . $buscar_nombre . "' + '%' or responsable like  '%' + '" . $buscar_nombre . "' + '%' ";
        $sql_read = $sql_read . " or nombre_apellidos like  '%' + '" . $buscar_nombre . "' + '%'  order by  nombre;";
        $resultado = $this->_db->prepare($sql_read);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'resultado' => 1,
                    'idusuario' => $imprimir->IDUSUARIO,
                    'usuario' => utf8_encode(trim($imprimir->USUARIO)),
                    'nombre' => utf8_encode(trim($imprimir->NOMBRE)),
                    'apellidos' => utf8_encode(trim($imprimir->APELLIDOS)),
                    'telefono' => trim($imprimir->TELEFONO),
                    'direccion' => utf8_encode(trim($imprimir->DIRECCION)),
                    'activo' => $imprimir->ACTIVO,
                    'condicion_activo' => utf8_encode(trim($imprimir->CONDICION_ACTIVO)),
                    'fecha_expiraction' => date('d/m/Y', strtotime(trim($imprimir->FECHA_EXPIRACION))),
                    'cargo' => utf8_encode(trim($imprimir->CARGO)),
                    'idactor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion_actor' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'responsable_actor' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'jefatura' => utf8_encode(trim($imprimir->JEFATURA)),
                    'nombre_apellidos' => utf8_encode(trim($imprimir->NOMBRE_APELLIDOS))
                );
            }
        } else {
            $array[] = array('resultado' => 0);
        }
        return json_encode($array);
    }



    public

    function grabar_soporte($nombre_usuario, $apellidos_nombres, $problema)
    {
        $sql_insert = "insert into t_soporte_tecnico  (usuario, apellidos_nombres, problema)
        values ('" . $nombre_usuario . "', '" . $apellidos_nombres . "', upper('" . $problema . "'))";
        $ejecucion = $this->_db->prepare($sql_insert);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
