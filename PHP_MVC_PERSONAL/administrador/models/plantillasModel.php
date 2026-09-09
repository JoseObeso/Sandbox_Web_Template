<?php
/*
 ListarAccesoModulosByDNI
 ListarAccesoModulosByDNI
 
*/

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
        $sentencia = "select * from [HEVES_RRHH].[dbo].[plantilla_modulo]   order by id_pl_m";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'id_pl_m' => $imprimir->ID_PL_M, 'nombre' => $imprimir->NOMBRE, 
                                 'url' => $imprimir->URL,
                                 'descripcion' => utf8_encode($imprimir->DESCRIPCION),
                                 'imagen' => $imprimir->IMAGEN, 'estado' => $imprimir->ESTADO, 'plantilla' => $imprimir->PLANTILLA );
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
        $sentencia = "select * from [HEVES_RRHH].[dbo].[PLANTILLA_MENU]";
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
                $array[] = array( 'estado_respuesta' => 1, 'id_submenu' => $imprimir->ID_SUBMENU, 'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ), 'icono' => utf8_encode( $imprimir->ICONO ), 'url' => $imprimir->URL, 'estado' => $imprimir->ESTADO );

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

    function ListarPlantillaBotonesById( $id_pl_submenu ) {
        $sentencia = "select * from plantilla_botones where id_pl_submenu='" . $id_pl_submenu . "'";
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

    function GuardarPlantillaModulo( plantilla_modulo $pm ) {
        $sentencia = "EXEC SP_NUEVO_PLANTILLA_MODULO ?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pm->getNombre(), $pm->getUrl(), $pm->getPlantilla(), $pm->getImagen() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }






    public

    function EditarPlantillaModulo( plantilla_modulo $pm ) {
        $sentencia = "EXEC SP_EDITAR_PLANTILLA_MODULO ?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pm->getId_pl_m(), $pm->getNombre(), $pm->getUrl(), $pm->getPlantilla() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }
    public

    function GuardarPlantillaMenu( plantilla_menu $pm ) {
        $sentencia = "EXEC SP_NUEVO_PLANTILLA_MENU ?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pm->getId_pl_m(), $pm->getNombre(), $pm->getIcono(), $pm->getUrl(), $pm->getOrden() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }
    public

    function EditarPlantillaMenu( plantilla_menu $pm ) {
        $sentencia = "EXEC SP_EDITAR_PLANTILLA_MENU ?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pm->getId_pl_menu(), $pm->getNombre(), $pm->getIcono(), $pm->getUrl(), $pm->getOrden() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }
    public

    function GuardarPlantillaSubMenu( plantilla_submenu $ps ) {
        $sentencia = "EXEC SP_NUEVO_PLANTILLA_SUBMENU ?,?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $ps->getId_pl_m(), $ps->getId_pl_menu(), $ps->getNombre(), $ps->getIcono(), $ps->getUrl(), $ps->getOrden() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }
    public

    function EditarPlantillaSubMenu( plantilla_submenu $ps ) {
        $sentencia = "EXEC SP_EDITAR_PLANTILLA_SUBMENU ?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $ps->getId_pl_submenu(), $ps->getNombre(), $ps->getIcono(), $ps->getUrl(), $ps->getOrden() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }
    public

    function GuardarPlantillaBoton( plantilla_botones $pb ) {
        $sentencia = "EXEC SP_NUEVO_PLANTILLA_BOTON ?,?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $pb->getId_pl_m(), $pb->getId_pl_menu(), $pb->getId_pl_submenu(), $pb->getNombre(), $pb->getIcono(), $pb->getId_html() ) );
        $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
        $array = array( 'estado_respuesta' => $imprimir->ESTADO, 'mensaje' => $imprimir->MENSAJE );
        return json_encode( $array );
    }

    public

    function ver_nombre_por_dni( $dni ) {
        $ver_dni = $dni;
        $sentencia = "select nombres from USUARIO_WEB where DNI = '" . $dni . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $nombre_encontrado = $imprimir->nombres;
            }
        } else {
            $nombre_encontrado = 'DNI No Registrado, usuario no existe ';
        }
        return json_encode( $nombre_encontrado );
    }

    public

    function ListarAccesoModulosByDNI( usuario_web $u ) {
        $sentencia = "select a.ID_AM, a.NOMBRE, a.URL, a.IMAGEN, a.ESTADO, a.DNI, a.PLANTILLA, b.NOMBRES from [HEVES_RRHH].[dbo].[ACCESO_MODULO] a inner join  [HEVES_RRHH].[dbo].[USUARIO_WEB]  b on a.DNI = b.DNI where a.dni=? order by a.id_am ";
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