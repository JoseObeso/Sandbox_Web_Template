<?php


class mantenimientoModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public

    function CambiarMiClave( usuario_web $uw ) {
        $sentencia = "EXEC SP_CAMBIAR_CLAVE_USUARIO_WEB ?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $uw->getDni(), $uw->getClave(), $uw->getNueva_clave() ) );
        $imprimir = $resultado->fetchAll( PDO::FETCH_ASSOC );
        $array = array( 'estado_respuesta' => $imprimir[ 0 ][ "ESTADO" ], 'mensaje' => $imprimir[ 0 ][ "MENSAJE" ] );
        return json_encode( $array );
    }



    public

    function getListadoUsuarios( usuario_web $u ) {
        $sentencia = "select * from usuario_web where nombres like ? order by nombres asc";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . $u->getNombres() . '%' ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'dni' => trim( $imprimir->DNI ), 'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ), 'cargo' => trim( $imprimir->CARGO ), 'fecha_expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ), 'sesion' => trim( $imprimir->SESION ), 'estado' => trim( $imprimir->ESTADO ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }

 

    public
    function setNuevo_usuario( usuario_web $u, acceso_modulo $am ) {
        $sentencia = "EXEC SP_GUARDAR_USUARIO_NUEVO ?,?,?,?,?,?,?,?,?,?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni(), $u->getClave(), $u->getUsu_nombre(), $u->getUsu_paterno(), $u->getUsu_materno(), $u->getUnidad_organica(), $u->getSexo(), $u->getEmail(), $u->getCargo(), $u->getFecha_expiracion(), $u->getEstado(), $am->getNombre() ) );
        $imprimir = $resultado->fetchAll( PDO::FETCH_ASSOC );
        $array = array( 'estado' => $imprimir[ 0 ][ "ESTADO" ], 'mensaje' => $imprimir[ 0 ][ "MENSAJE" ] );
        return json_encode( $array );

    }

    public

    function getListarUnidadesOrganicas() {
        $sentencia = "SELECT CODIGO, upper(descripcion) as NOMBRE  FROM [SIGH].[dbo].[CentrosCosto] order by nombre";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado_respuesta' => 1, 'codigo' => $imprimir->CODIGO, 'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ) );
            }
        } else {
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No existen registros' );
        }
        return json_encode( $array );
    }

    public

    function getDatosUsuario( usuario_web $u ) {
        $sentencia = "select * from usuario_web where dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni() ) );
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estadorespuesta' => 1, 'dni' => $imprimir->DNI, 'nombres' => $imprimir->USU_NOMBRE, 'paterno' => $imprimir->USU_PATERNO, 'materno' => $imprimir->USU_MATERNO, 'cargo' => $imprimir->CARGO, 'sesion' => $imprimir->SESION, 'sexo' => $imprimir->SEXO, 'email' => $imprimir->EMAIL, 'fecha-expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ), 'estado' => $imprimir->ESTADO );

        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }
    public

    function getPermisosUsuario( usuario_web $u, acceso_modulo $am ) {
        $sentencia = "EXEC SP_LISTAR_MENU_Y_SUBMENU ?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni(), $am->getNombre() ) );
        $html = '<ul class="menu-permisos">';
        $ultimo_menu = false;
        $ok = false;
        while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
            if ( $imprimir->NOMBRE_MENU != $ultimo_menu ) {
                if ( $imprimir->ESTADO_MENU == 1 ) {
                    $btn_menu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_MENU . '" data-value="' . $imprimir->ESTADO_MENU . '" class="btn btn-success btn-xs btn-permiso-menu"><i class="fa fa-check"></i></button>';
                } else {
                    $btn_menu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_MENU . '" data-value="' . $imprimir->ESTADO_MENU . '" class="btn btn-danger btn-xs btn-permiso-menu"><i class="fa fa-times"></i></button>';
                }
                if ( $ok )$html .= "</ul></li>";
                if ( $imprimir->NOMBRE_SUBMENU ) {
                    $html .= '<li class="mm-dropdown"><a  >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a><span>' . $btn_menu . '</span><ul>';
                    $ok = true;
                } else {
                    $html .= '<li><a >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a><span>' . $btn_menu . '</span></li>';
                    $ok = false;
                }
                $ultimo_menu = $imprimir->NOMBRE_MENU;
            }
            if ( $imprimir->ESTADO_SUBMENU == 1 ) {
                $btn_submenu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_SUBMENU . '" data-value="' . $imprimir->ESTADO_SUBMENU . '" class="btn btn-success btn-xs btn-permiso-submenu"><i class="fa fa-check"></i></button>';
            } else {
                $btn_submenu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_SUBMENU . '" data-value="' . $imprimir->ESTADO_SUBMENU . '" class="btn btn-danger btn-xs btn-permiso-submenu"><i class="fa fa-times"></i></button>';
            }
            if ( $imprimir->NOMBRE_SUBMENU != null ) {
                $html .= '<li><a data-value="' . $imprimir->ID_SUBMENU . '" class="abrir-submenus">' . trim( $imprimir->NOMBRE_SUBMENU ) . '</a><span>' . $btn_submenu . '</span></li>';
            }
        }
        $html .= "</ul></li>";
        $html .= "</ul>";
        return $html;
    }
    public

    function cambiar_estado_menu( acceso_modulo $am, acceso_menu $a_menu ) {
        $sentencia = "update acceso_menu set estado=? where id_menu=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_menu->getEstado(), $a_menu->getId_menu(), $a_menu->getDni() ) );
        return true;
    }
    public

    function cambiar_estado_submenu( acceso_submenu $a_submenu, usuario_web $u, acceso_modulo $am ) {
        $sentencia = "update acceso_submenu set estado=? where id_submenu=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_submenu->getEstado(), $a_submenu->getId_submenu(), $u->getDni() ) );

        $sentencia = "EXEC SP_LISTAR_MENU_Y_SUBMENU ?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $u->getDni(), $am->getNombre() ) );
        $html = '<ul class="menu-permisos">';
        $ultimo_menu = false;
        $ok = false;
        while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
            if ( $imprimir->NOMBRE_MENU != $ultimo_menu ) {
                if ( $imprimir->ESTADO_MENU == 1 ) {
                    $btn_menu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_MENU . '" class="btn btn-success btn-xs btn-permiso-menu"><i class="fa fa-check"></i></button>';
                } else {
                    $btn_menu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_MENU . '" class="btn btn-danger btn-xs btn-permiso-menu"><i class="fa fa-times"></i></button>';
                }
                if ( $ok )$html .= "</ul></li>";
                if ( $imprimir->NOMBRE_SUBMENU ) {
                    $html .= '<li class="mm-dropdown"><a  >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a><span>' . $btn_menu . '</span><ul>';
                    $ok = true;
                } else {
                    $html .= '<li><a >' . $imprimir->ICONO_MENU . ' <span class="mm-text">' . trim( $imprimir->NOMBRE_MENU ) . '</span></a><span>' . $btn_menu . '</span></li>';
                    $ok = false;
                }
                $ultimo_menu = $imprimir->NOMBRE_MENU;
            }
            if ( $imprimir->ESTADO_SUBMENU == 1 ) {
                $btn_submenu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_SUBMENU . '" data-value="' . $imprimir->ESTADO_SUBMENU . '" class="btn btn-success btn-xs btn-permiso-submenu"><i class="fa fa-check"></i></button>';
            } else {
                $btn_submenu = '<i class="fa fa-long-arrow-right"></i> <button id="' . $imprimir->ID_SUBMENU . '" data-value="' . $imprimir->ESTADO_SUBMENU . '" class="btn btn-danger btn-xs btn-permiso-submenu"><i class="fa fa-times"></i></button>';
            }
            if ( $imprimir->NOMBRE_SUBMENU != null ) {
                $html .= '<li><a data-value="' . $imprimir->ID_SUBMENU . '" class="abrir-submenus">' . trim( $imprimir->NOMBRE_SUBMENU ) . '</a><span>' . $btn_submenu . '</span></li>';
            }
        }
        $html .= "</ul></li>";
        $html .= "</ul>";
        return $html;
    }
    public

    function cambiar_estado_boton( acceso_botones $a_boton, usuario_web $u, acceso_submenu $a_submenu ) {
        $sentencia = "update acceso_botones set estado=? where id_boton=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_boton->getEstado(), $a_boton->getId_boton(), $u->getDni() ) );

        $sentencia = "select * from acceso_botones where id_submenu=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_boton->getId_submenu(), $u->getDni() ) );
        $html = 'Botones del Sub Menu: ' . $a_submenu->getNombre();
        $html .= '
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Icono</th>
					<th>Nombre</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>			
		';
        while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
            if ( $imprimir->ESTADO == 1 ) {
                $btn_boton = '<button id="' . $imprimir->ID_BOTON . '" data-value="' . $imprimir->ESTADO . '" class="btn btn-success btn-xs btn-permiso-botones"><i class="fa fa-check"></i></button>';
            } else {
                $btn_boton = '<button id="' . $imprimir->ID_BOTON . '" data-value="' . $imprimir->ESTADO . '" class="btn btn-danger btn-xs btn-permiso-botones"><i class="fa fa-times"></i></button>';
            }
            $html .= '<tr>';
            $html .= '<td><button class="btn btn-rounded" >' . $imprimir->ICONO . '</button></td>';
            $html .= '<td>' . $imprimir->NOMBRE . '</td>';
            $html .= '<td>' . $btn_boton . '</td>';
            $html .= '</tr>';
        }
        $html .= '
			</tbody>
		</table>
		';
        return $html;
    }
    public

    function getTodosLosBotones( acceso_submenu $a_submenu, usuario_web $u ) {
        $sentencia = "select * from acceso_botones where id_submenu=? and dni=?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $a_submenu->getId_submenu(), $u->getDni() ) );
        $html = 'Botones del Sub Menu: ' . $a_submenu->getNombre();
        $html .= '
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Icono</th>
					<th>Nombre</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>			
		';
        while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
            if ( $imprimir->ESTADO == 1 ) {
                $btn_boton = '<button id="' . $imprimir->ID_BOTON . '" data-value="' . $imprimir->ESTADO . '" class="btn btn-success btn-xs btn-permiso-botones"><i class="fa fa-check"></i></button>';
            } else {
                $btn_boton = '<button id="' . $imprimir->ID_BOTON . '" data-value="' . $imprimir->ESTADO . '" class="btn btn-danger btn-xs btn-permiso-botones"><i class="fa fa-times"></i></button>';
            }
            $html .= '<tr>';
            $html .= '<td><button class="btn btn-rounded" >' . $imprimir->ICONO . '</button></td>';
            $html .= '<td>' . $imprimir->NOMBRE . '</td>';
            $html .= '<td>' . $btn_boton . '</td>';
            $html .= '</tr>';
        }
        $html .= '
			</tbody>
		</table>
		';
        return $html;
    }
}
?>