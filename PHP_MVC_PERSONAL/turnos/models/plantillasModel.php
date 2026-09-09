<?php
class plantillasModel extends Model {
    public
    function __construct() {
        parent::__construct();
    }


    public
    function ActualizarModulosAllUsuarios( plantilla_modulo $pm ) {
        $sentencia = "EXEC SP_ACTUALIZAR_MODULOS_WEB ?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pm->getNombre(), $pm->getId_pl_m() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => utf8_encode( $imprimir->MENSAJE ) );
        return json_encode( $array );
    }




    public
    function GuardarModuloByUsuario( acceso_modulo $am ) {
        $sentencia = "EXEC SP_GUARDAR_MODULO_BYUSUARIO ?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $am->getNombre(), $am->getId_am(), $am->getDni() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => utf8_encode( $imprimir->MENSAJE ) );
        return json_encode( $array );
    }
    public
    function EliminarModulo( acceso_modulo $am ) {
        $sentencia = "EXEC SP_ELIMINAR_MODULO_BYUSUARIO ?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $am->getId_am(), $am->getDni() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => utf8_encode( $imprimir->MENSAJE ) );
        return json_encode( $array );
    }
    public
    function ListarPlantillaModulos() {
        $sentencia = "select * from plantilla_modulo";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre' => $imprimir->NOMBRE, 'url' => $imprimir->URL, 'imagen' => $imprimir->IMAGEN, 'estado' => $imprimir->ESTADO, 'plantilla' => $imprimir->PLANTILLA );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function getDatosModulo( $id_pl_m ) {
        $sentencia = "select * from plantilla_modulo where id_pl_m='" . $id_pl_m . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estado_respuesta' => 1, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre' => $imprimir->NOMBRE, 'url' => $imprimir->URL, 'imagen' => $imprimir->IMAGEN, 'estado' => $imprimir->ESTADO, 'plantilla' => $imprimir->PLANTILLA );
        } else {
            $array = array( 'estado_respuesta' => 0, 'mensaje' => 'No se pudo cargar los datos del modulo seleccionado.' );
        }
        return json_encode( $array );
    }

    public
    function ListarPlantillaMenus() {
        $sentencia = "select * from plantilla_menu";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_menu' => $imprimir->ID_PL_MENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function getDatosMenu( $id_pl_menu ) {
        $sentencia = "select * from v_plantilla_menu where id_pl_menu='" . $id_pl_menu . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estado_respuesta' => 1, 'id_pl_menu' => $imprimir->ID_PL_MENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'orden' => $imprimir->ORDEN, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre_modulo' => $imprimir->NOMBRE_MODULO );
        } else {
            $array = array( 'estado_respuesta' => 0, 'mensaje' => 'No se pudo cargar los datos del modulo seleccionado.' );
        }
        return json_encode( $array );
    }
    public
    function ListarPlantillaMenusById( $id_pl_m ) {
        $sentencia = "select * from v_plantilla_menu where id_pl_m='" . $id_pl_m . "' order by orden";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_menu' => $imprimir->ID_PL_MENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre_modulo' => $imprimir->NOMBRE_MODULO );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function ListarPlantillaSubMenus() {
        $sentencia = "select * from plantilla_submenu";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_submenu' => $imprimir->ID_PL_SUBMENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function getDatosSubMenu( $id_pl_submenu ) {
        $sentencia = "select * from v_plantilla_submenu where id_pl_submenu='" . $id_pl_submenu . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estado_respuesta' => 1, 'id_pl_submenu' => $imprimir->ID_PL_SUBMENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'orden' => $imprimir->ORDEN, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre_modulo' => $imprimir->NOMBRE_MODULO, 'id_pl_menu' => $imprimir->ID_PL_MENU, 'nombre_menu' => $imprimir->NOMBRE_MENU );
        } else {
            $array = array( 'estado_respuesta' => 0, 'mensaje' => 'No se pudo cargar los datos del modulo seleccionado.' );
        }
        return json_encode( $array );
    }
    public
    function ListarPlantillaSubMenusById( $id_pl_menu ) {
        $sentencia = "select * from plantilla_submenu where id_pl_menu='" . $id_pl_menu . "' order by orden";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_submenu' => $imprimir->ID_PL_SUBMENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function ListarAccesoSubMenusByDNI( $id_pl_menu, $dni ) {
        $sentencia = "select * from acceso_submenu where id_menu='" . $id_pl_menu . "' and dni='" . $dni . "' order by orden";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_submenu' => $imprimir->ID_SUBMENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_pl_m' => $imprimir->ID_PL_M );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
    public
    function ListarPlantillaBotones() {
        $sentencia = "select * from plantilla_botones";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_boton' => $imprimir->ID_PL_BOTON, 'nombre' => utf8_encode( $imprimir->NOMBRE ), 'icono' => $imprimir->ICONO, 'estado' => $imprimir->ESTADO );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }


 

    public
    function ListarAccesoBotonesByDNI( acceso_botones $ab ) {
        $sentencia = "select * from acceso_botones where id_submenu=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $ab->getId_submenu(), $ab->getDni() ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_boton' => $imprimir->ID_BOTON, 'nombre' => utf8_encode( $imprimir->NOMBRE ), 'icono' => $imprimir->ICONO, 'estado' => $imprimir->ESTADO );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }



 
 



    public
    function ListarAccesoModulosByDNI( usuario_web $u ) {
        $sentencia = "select a.ID_AM, a.NOMBRE, a.URL, a.IMAGEN, a.ESTADO, a.DNI, a.PLANTILLA, b.NOMBRES from acceso_modulo a inner join USUARIO_WEB b on a.DNI = b.DNI where a.dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni() ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_am' => $imprimir->ID_AM, 'nombre' => $imprimir->NOMBRE, 'url' => $imprimir->URL, 'imagen' => $imprimir->IMAGEN, 'estado' => $imprimir->ESTADO, 'plantilla' => $imprimir->PLANTILLA, 'nombres' => $imprimir->NOMBRES );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }



    public
    function ListarAccesoMenusByDNI( $id_pl_m, $dni ) {
        $sentencia = "select * from acceso_menu where id_am='" . $id_pl_m . "' and dni='" . $dni . "' order by orden";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_menu' => $imprimir->ID_MENU, 'nombre' => $imprimir->NOMBRE, 'icono' => $imprimir->ICONO, 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO, 'id_am' => $imprimir->ID_AM );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontraron modulos registrados.' );
        }
        return json_encode( $array );
    }
}
?>