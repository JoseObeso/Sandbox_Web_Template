<?php

class permisosModel extends Model {
    public
    function __construct() {
        parent::__construct();
    }

    public
    function getVerificarPermisos( usuario_web $u ) {
        $sentencia = "select * from usuario_web where dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni() ) );
        $row = $resultado->fetch( PDO::FETCH_OBJ );
        if ( $row->ESTADO == 1 ) {
            $fecha_hoy = strtotime( date( 'Y-m-d' ) );
            $fecha_bd = strtotime( $row->FECHA_EXPIRACION );
            if ( $fecha_hoy <= $fecha_bd ) {
                $array = array( 'estado' => 1, 'mensaje' => 'Datos correctos.' );
            } else {
                $array = array( 'estado' => 0, 'mensaje' => 'Su usuario ha caducado, contacte con el administrador.' );
            }
        } else {
            $array = array( 'estado' => 0, 'mensaje' => 'Su usuario ha sido desactivado, contacte con el administrador.' );
        }
        return $array;

    }
    public
    function getVerificarMenu( acceso_submenu $a_submenu ) {
        $sentencia = "select * from acceso_submenu where dni=? and url=? and estado=1";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_submenu->getDni(), $a_submenu->getUrl() ) );
        if ( $resultado->rowCount() ) {
            $array = array( 'estado' => 1, 'mensaje' => 'Datos correctos.' . $a_submenu->getDni() . $a_submenu->getUrl() );
        } else {
            $array = array( 'estado' => 0, 'mensaje' => 'No tiene permisos suficientes para poder utilizar esta opción.' );
        }
        return $array;
    }
    public
    function getListarMenuySubmenu( $dni, $modulo ) {
        $sentencia = "EXEC SP_LISTAR_MENU_Y_SUBMENU '" . $dni . "','" . $modulo . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        return $resultado;
    }
    public
    function getListadoBotones( acceso_modulo $am, acceso_menu $a_menu, acceso_submenu $a_submenu ) {
        $sentencia = "EXEC SP_BOTONES_USUARIO_WEB ?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $am->getDni(), $am->getNombre(), $a_menu->getNombre(), $a_submenu->getNombre() ) );
        return $resultado;
    }
}
?>