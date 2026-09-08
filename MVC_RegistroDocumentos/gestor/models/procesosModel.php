<?php

 
class procesosModel extends Model
{
    public    function __construct()
    {
        parent::__construct();
    }

    

    public function DesactivarUsuarioConPermisos($user)
    {
        $consulta = "update USUARIO  set activo = 0 where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($consulta);
        $resultado->execute();
        $array = array('verificar_estado_eliminacion' => 1);
        return json_encode($array);
    }

    public function HabilitarUsuario($user)
    {
        $consulta = "update USUARIO  set activo = 1 where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($consulta);
        $resultado->execute();
        $array = array('verificar_estado_eliminacion' => 1);
        return json_encode($array);
    }


   


    public

    function RevisarUserExistente($user)
    {
        $read_personal = "select NOMBRE, ACTIVO from usuario where modulo = 'TRAMITE' and usuario = ltrim(rtrim((upper('" . $user . "'))))";
        $ejecucion_read = $this->_db->prepare($read_personal);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'nombres' =>  utf8_encode($read->NOMBRE),
                    'activo' =>  $read->ACTIVO
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
    function GrabarNuevoUsuario($user, $nombre, $apellidos, $fono, $direccion, $expiracion, $cargo, $actor, $jefatura)
    {
        $sql_insert_registro = " INSERT INTO  USUARIO(MODULO, USUARIO, NOMBRE, APELLIDOS, TELEFONO, DIRECCION, FECHA_EXPIRACION, CARGO, ACTOR, JEFATURA, CONTRASENA, CONSULTORIO) ";
        $sql_insert_registro = $sql_insert_registro . " VALUES ('TRAMITE', '" . $user . "', '" . $nombre . "', '" . $apellidos . "', '" . $fono . "', '" . $direccion . "', convert(datetime,  '" . $expiracion . "', 103), '" . $cargo . "', '" . $actor . "', '" . $jefatura . "', '1234', '') ";
        $ejecucion = $this->_db->prepare($sql_insert_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public
    function ModificarUsuario($idusuario, $user, $nombre, $apellidos, $fono, $direccion, $expiracion, $cargo, $actor, $jefatura)
    {
        $sql_update_registro = "UPDATE USUARIO SET USUARIO = '" . $user . "', NOMBRE = '" . $nombre . "', APELLIDOS = '" . $apellidos . "', ";
        $sql_update_registro =  $sql_update_registro . "  TELEFONO = '" . $fono . "', DIRECCION = '" . $direccion . "', FECHA_EXPIRACION = convert(datetime,  '" . $expiracion . "', 103), ";
        $sql_update_registro =  $sql_update_registro . " CARGO = '" . $cargo . "', ACTOR = '" . $actor . "', JEFATURA = '" . $jefatura . "' WHERE  IDUSUARIO = " . $idusuario;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public
    function VerModulosPorUser($user)
    {
        $read_modulos = "select * from app_permisos where usuario = '" . $user . "'";
        $ejecucion_read = $this->_db->prepare($read_modulos);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'resultado' => 1,
                    'idapppermiso' => $read->ID_APP_PERMISOS,
                    'id_app' => $read->ID_APP,
                    'nombre' => utf8_encode($read->NOMBRE),
                    'estado' => $read->ESTADO
                );
            }
        } else {
            $datos_read[] = array(
                'resultado' => 0
            );
        }
        return json_encode($datos_read);
    }


    public
    function VerMenuPorID($user_seleccion, $id_app)
    {
        $read_menu = "SELECT * FROM APP_MENU_ACCESOS where  USUARIOMENU = '" . $user_seleccion . "' AND ID_APP = '" . $id_app . "'";
        $ejecucion_read = $this->_db->prepare($read_menu);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->ID_MENUACCESO,
                    'nombre' => utf8_encode($read->NOMBRE),
                    'estado' => $read->ESTADO,
                    'idmenu'=> $read->ID_MENU
                );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0'
            );
        }
        return json_encode($datos_read);
    }

  

    public function VerSubMenuPorID($user_seleccion, $id_app, $idmenu)
    {
        $read_submenu = "SELECT * FROM APP_SUBMENU_ACCESO where  USUARIO = '" . $user_seleccion . "' AND ID_APP = '" . $id_app . "' AND ID_MENUACCESO = '".$idmenu."' order by orden";
        $ejecucion_read = $this->_db->prepare($read_submenu);
        $ejecucion_read->execute();
        if ($ejecucion_read->rowCount()) {
            while ($read = $ejecucion_read->fetch(PDO::FETCH_OBJ)) {
                $datos_read[] = array(
                    'encontro' => 1,
                    'id' => $read->ID_SUBACCESO,
                    'nombre' => utf8_encode($read->NOMBRE),
                    'estado' => $read->ESTADO
                );
            }
        } else {
            $datos_read[] = array(
                'encontro' => 0
            );
        }
        return json_encode($datos_read);
    }





    public function GuardarAppUsuario($idapp,  $appuser, $nombre, $user, $userregistro)
    {
        $sentencia = "exec GuardarAppUsuario '" . $appuser . "', '" . $idapp . "', '" . $nombre . "', '" . $user . "',  '" . $userregistro . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }




    public

    function EliminarModulo($id, $user)
    {

        $sentencia = "exec EliminarModulo '" . $id . "', '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }


    public

    function ActivarEstadoMenu($estado, $id)
    {
        $sentencia = "UPDATE app_menu_accesos set estado = '" . $estado . "' where ID_MENUACCESO = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }

    
 

    public

    function ActivarEstadoSubMenu($estado, $id)
    {
        $sentencia = "UPDATE  app_submenu_acceso set estado = '" . $estado . "' where ID_SUBACCESO = '" . $id . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }

    

    public

    function ResetarClaveUsuario($user)
    {
        $sentencia = "update usuario set contrasena = '1234' where usuario = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }


    
    public
    function ActivarTodosLosSubmenu($idmenu, $user)
    {
        $sentencia = "UPDATE app_submenu_acceso SET ESTADO = '1'  where  ID_MENUACCESO = '" . $idmenu . "' and usuario = '".$user."'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }



    public

    function DesactivarTodosLosSubmenu($idmenu, $user)

    {
        $sentencia = "UPDATE app_submenu_acceso SET ESTADO = '0'  where  ID_MENUACCESO = '" . $idmenu . "' and usuario = '".$user."'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $verificar = array('indicador' => '1');
        return json_encode($verificar);
    }



    function ListarModulos($user)
    {
        $sentencia = "SELECT *  FROM APP_PERMISOS WHERE USUARIO =  '" . $user . "' AND ESTADO=1 ORDER BY ID_APP_PERMISOS";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array('estado_respuesta' => 1,
                 'id_am' => $imprimir->ID_APP_PERMISOS, 
                 'nombre' => utf8_encode(trim($imprimir->NOMBRE)), 
                 'url' => trim($imprimir->URL),
                 'imagen' => trim($imprimir->IMAGEN),
                 'archivo_manual' => trim($imprimir->ARCHIVO)
            );
        }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'Usted no tiene permisos para ningun modulo.');
        }
        return json_encode($array);
    }


    public function ListarApp()
    {
        $sentencia = "SELECT * FROM APP_MAESTRO ORDER BY ID_APP";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'estado_respuesta' => 1, 'id_pl_m' => $imprimir->ID_APP, 'nombre' => strtoupper($imprimir->NOMBRE),
                    'url' => $imprimir->URL,
                    'descripcion' => utf8_encode($imprimir->DESCRIPCION),
                    'imagen' => $imprimir->IMAGEN, 'estado' => $imprimir->ESTADO, 'plantilla' => $imprimir->PLANTILLA
                );
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.');
        }
        return json_encode($array);
    }

    function ListarPlantillaMenus()
    {
        $sentencia = "SELECT * FROM APP_MENU_ACCESOS";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array('estado_respuesta' => 1, 'id_pl_menu' => $imprimir->ID_MENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_APP);
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.');
        }
        return json_encode($array);
    }


    function ListarPlantillaSubMenus()
    {
        $sentencia = "SELECT * FROM APP_MENU_SUBMENU_MAESTRO";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array('estado_respuesta' => 1, 'id_pl_submenu' => $imprimir->ID_SUBMENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO);
            }
        } else {
            $array[] = array('estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.');
        }
        return json_encode($array);
    }

    public function getPlantillaModulo($user, $modulo)
    {
        $sentencia = "select * from APP_MAESTRO_PERMISOS  where NOMBRE = '" . $modulo . "' AND USUARIO = '" . $user . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $imprimir = $resultado->fetch(PDO::FETCH_OBJ);
        return $imprimir->PLANTILLA;
    }


    public function getListarMenuySubmenu($user, $modulo)
    {
        $sentencia = "SELECT * FROM V_USER_MOD_MENU_SUBMENU WHERE USUARIO='" . $user . "' AND NOMBRE_MODULO='" . $modulo . "'   ORDER BY ORDEN_MENU, ORDEN_SUB  ASC";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        return $resultado;
    }

    public function getVerificarPermisos($user)
    {
        $sentencia = "SELECT *  FROM USUARIO where usuario = '" . $user . "'";
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
        $sentencia = "SELECT * FROM APP_MENU_SUBMENU_PERMISOS WHERE USUARIO = '" . $a_submenu_user . "' AND ESTADO = 1";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            $array = array('estado' => 1, 'mensaje' => 'Datos correctos');
        } else {
            $array = array('estado' => 0, 'mensaje' => 'No tiene permisos suficientes para poder utilizar esta opción.');
        }
        return $array;
    }


    public function GuardarApp($nombreapp, $urlapp, $imagenapp, $descripcionapp, $archivoapp, $user)
    {

        $sentencia = " INSERT INTO APP(NOMBRE, URL, IMAGEN, DESCRIPCION, ARCHIVO, USUARIOREGISTRA) ";
        $sentencia = $sentencia . " VALUES (upper('" . $nombreapp . "'), '" . $urlapp . "',  '" . $imagenapp . "',  upper('" . $descripcionapp . "'), '" . $archivoapp . "', '" . $user . "' )";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => $resultado->rowCount());
        return json_encode($RetornaValor);
    }


    public function ListarActorTramite($actor)
    {
        $sentencia ="   SELECT ACTOR, DESCRIPCION, ABREVIATURA, TIPO_ACTOR, RESPONSABLE, CODIGO, AREA_DE_ACTOR, TRAMITE, ltrim(RTRIM(ACTOR)) + ' - ' + ltrim(rtrim(DESCRIPCION))";
        $sentencia = $sentencia . "  ACTOR_DESCRIPCION FROM ACTOR where RTRIM(ACTOR) LIKE  + '" . $actor . "'  + '%' OR  DESCRIPCION like '%' +'" . $actor . "' + '%'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'actor_descripcion' => utf8_encode($imprimir->ACTOR_DESCRIPCION),
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR)
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }



    


    public function ListarActorComite($actor)
    {
        $sentencia = " SELECT ACTOR, DESCRIPCION, ABREVIATURA, TIPO_ACTOR, RESPONSABLE, CODIGO, AREA_DE_ACTOR, TRAMITE, ltrim(RTRIM(ACTOR)) + ' - ' + ltrim(rtrim(DESCRIPCION))";
        $sentencia = $sentencia . "  ACTOR_DESCRIPCION FROM ACTOR   where  ACTOR like  + '" . $actor . "' + '%' OR DESCRIPCION like '%' + '" . $actor . "' + '%' COLLATE Latin1_general_CI_AI ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => '1',
                    'actor' => utf8_encode(trim($imprimir->ACTOR)),
                    'descripcion' => utf8_encode(trim($imprimir->DESCRIPCION)),
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA)),
                    'responsable' => utf8_encode(trim($imprimir->RESPONSABLE)),
                    'tipo_actor' => utf8_encode($imprimir->TIPO_ACTOR),
                    'codigo' => utf8_encode($imprimir->CODIGO),
                    'actor_descripcion' => utf8_encode($imprimir->ACTOR_DESCRIPCION),
                    'area_de_actor' => utf8_encode($imprimir->AREA_DE_ACTOR)
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
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
                    'abreviatura' => utf8_encode(trim($imprimir->ABREVIATURA))
                );
            }
        } else {
            $array[] = array('respuesta' => '0');
        }
        return json_encode($array);
    }


    public function GrabarUserActor($user, $actor, $abreviatura, $usuarioregistro,  $responsable, $descripcion)
    {

        $sentencia = " IF(EXISTS(SELECT * FROM usuario_actor WHERE usuario = UPPER('" . $user . "') AND ACTOR = '" . $actor . "')) ";
        $sentencia = $sentencia . "  BEGIN ";
        $sentencia = $sentencia . " 	SELECT '' ";
        $sentencia = $sentencia . "  END ";
        $sentencia = $sentencia . " ELSE ";
        $sentencia = $sentencia . "	BEGIN ";
        $sentencia = $sentencia . " insert into USUARIO_ACTOR (usuario, actor, abreviatura, usuarioregistro, responsable, descripcion) ";
        $sentencia = $sentencia . " values ('" . $user . "', '" . $actor . "', '" . utf8_decode(trim($abreviatura)) . "', '" . $usuarioregistro . "', upper('" . $responsable . "'), upper('".$descripcion."'))";
        $sentencia = $sentencia . " 	END  ";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => 1);
        return json_encode($RetornaValor);
    }


    public function EliminarUserActor($user, $actor)
    {
        $sentencia = " delete from usuario_actor WHERE usuario = '" . $user . "' AND ACTOR = '" . $actor . "'";
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        $RetornaValor = array('registros' => 1);
        return json_encode($RetornaValor);
    }
}
