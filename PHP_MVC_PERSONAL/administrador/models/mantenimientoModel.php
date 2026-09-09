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

    function ListaUsuariosRegistrados( $buscar_nombre ) {
        $sql_read = "declare @lc_nombre varchar(200) = '" . $buscar_nombre . "'
         SELECT DNI, NOMBRES, UNIDAD_ORGANICA, EMAIL, CARGO, FECHA_EXPIRACION, USU_NOMBRE, USU_PATERNO, USU_MATERNO, FECH_ULT_INGRESO, A.ESTADO, SEXO, SESION, FOTO, FECHA_REGISTRO, B.DESCRIPCION
 FROM [HEVES_RRHH].[dbo].[USUARIO_WEB] A left join    [SIGH].[dbo].[CentrosCosto] B  ON A.UNIDAD_ORGANICA = B.Codigo COLLATE Modern_Spanish_CI_AS
   where NOMBRES LIKE '%' + @lc_nombre + '%' order by  NOMBRES  ";
        $resultado = $this->_db->prepare( $sql_read );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'resultado' => '1',
                    'dni' => trim( $imprimir->DNI ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'unidad_organica' => trim( $imprimir->UNIDAD_ORGANICA ),
                    'email' => trim( $imprimir->EMAIL ),
                    'cargo' => trim( $imprimir->CARGO ),
                    'fecha_expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ),
                    'usu_nombre' => utf8_encode( trim( $imprimir->USU_NOMBRE ) ),
                    'usu_paterno' => utf8_encode( trim( $imprimir->USU_PATERNO ) ),
                    'usu_materno' => utf8_encode( trim( $imprimir->USU_MATERNO ) ),
                    'fecha_ultimo_ingreso' => date( 'd/m/Y', strtotime( trim( $imprimir->FECH_ULT_INGRESO ) ) ),
                    'estado' => trim( $imprimir->ESTADO ),
                    'sexo' => trim( $imprimir->SEXO ),
                    'descripcion' => utf8_encode( trim( $imprimir->DESCRIPCION ) ) );
            }
        } else {
            $array[] = array( 'resultado' => '0' );
        }
        return json_encode( $array );

    }


    public

    function getListadoUsuarios( $buscar_nombre ) {
        $sentencia = "DECLARE @LC_NOMBRE VARCHAR(200) = '" . $buscar_nombre . "' SELECT DNI, NOMBRES, UNIDAD_ORGANICA, EMAIL, CARGO, FECHA_EXPIRACION, SESION, CASE WHEN SESION = 1 THEN 'EN LINEA' WHEN SESION = 0 THEN 'NO INICIO' ELSE 'NO EXISTE' END AS TIPO_SESION, CASE WHEN ESTADO = 1 THEN 'OPERATIVO' ELSE 'DESACTIVADO' END AS TIPO_ESTADO, ESTADO, UNIDAD, FECH_ULT_INGRESO, CASE WHEN FECH_ULT_INGRESO IS NULL THEN '' ELSE CONVERT(VARCHAR(10),  FECH_ULT_INGRESO, 103) END AS FECHA_ULTIMO_INGRESO_TXT, CASE WHEN FECH_ULT_INGRESO IS NULL THEN '' ELSE CONVERT(VARCHAR, FECH_ULT_INGRESO, 108) END AS HORA_ULTIMO_INGRESO_TXT  FROM [HEVES_RRHH].[DBO].[V_USUARIO_WEB] WHERE NOMBRES LIKE '%' + @LC_NOMBRE + '%' ORDER BY NOMBRES ASC";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'resultado' => '1',
                    'dni' => trim( $imprimir->DNI ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'email' => utf8_encode( trim( $imprimir->EMAIL ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'fecha_expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ),
                    'tipo_sesion' => utf8_encode( trim( $imprimir->TIPO_SESION ) ),
                    'tipo_estado' => utf8_encode( trim( $imprimir->TIPO_ESTADO ) ),
                    'unidad' => utf8_encode( trim( $imprimir->UNIDAD ) ),
                    'fecha_ultimo_ingreso' => utf8_encode( trim( $imprimir->FECHA_ULTIMO_INGRESO_TXT ) ),
                    'hora_ultimo_ingreso' => utf8_encode( trim( $imprimir->HORA_ULTIMO_INGRESO_TXT ) ) );
            }
        } else {
            $array[] = array( 'resultado' => '0' );
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
            $array = array( 'estadorespuesta' => 1,
                'dni' => $imprimir->DNI,
                'nombres' => utf8_encode( $imprimir->USU_NOMBRE ),
                'paterno' => utf8_encode( $imprimir->USU_PATERNO ),
                'materno' => utf8_encode( $imprimir->USU_MATERNO ),
                'cargo' => utf8_encode( $imprimir->CARGO ),
                'sesion' => $imprimir->SESION,
                'sexo' => $imprimir->SEXO,
                'email' => $imprimir->EMAIL,
                'fecha-expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ),
                'estado' => $imprimir->ESTADO,
                'unidad_organica' => $imprimir->UNIDAD_ORGANICA );
        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }



    public

    function ConseguirNombreUsuario( $dni ) {
        $consulta = "SELECT DNI, NOMBRES FROM [HEVES_RRHH].[dbo].[USUARIO_WEB] WHERE DNI = '" . $dni . "'";
        $resultado = $this->_db->prepare( $consulta );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            $imprimir = $resultado->fetch( PDO::FETCH_OBJ );
            $array = array( 'estadorespuesta' => 1,
                'nombres' => utf8_encode( $imprimir->NOMBRES ) );
        } else {
            $array = array( 'estadorespuesta' => 0, 'mensaje' => 'No se ha encontrado, ningun registro con el dato consultado' );
        }
        return json_encode( $array );
    }

    public

    function BorrarUsuarioConPermisos( $dni ) {
        $consulta = "exec [dbo].[SP_ELIMINAR_USUARIO_CON_PERMISOS] '" . $dni . "'";
        $resultado = $this->_db->prepare( $consulta );
        $resultado->execute();
        $array = array( 'verificar_estado_eliminacion' => 1 );
        return json_encode( $array );
    }


    public

    function UpdateEdicionUsuario( $dniusuario, $enombre, $epaterno, $ematerno, $esexo, $idunidad_organica_grabar, $email, $cargo_grabar, $efecha_expiracion, $eestado ) {
        $nombres_completos = $epaterno . ' ' . $ematerno . ' ' . $enombre;
        $ejecucion_update = "UPDATE [HEVES_RRHH].[dbo].[USUARIO_WEB] SET USU_NOMBRE = '" . $enombre . "', USU_PATERNO = '" . $epaterno . "', USU_MATERNO = '" . $ematerno . "', SEXO = '" . $esexo . "', UNIDAD_ORGANICA = '" . $idunidad_organica_grabar . "', EMAIL = '" . $email . "', CARGO = '" . $cargo_grabar . "', FECHA_EXPIRACION =  convert(datetime,'" . $efecha_expiracion . "', 103), ESTADO = " . $eestado . ", NOMBRES = '" . $nombres_completos . "' WHERE DNI = '" . $dniusuario . "'";
        $resultado_ejecucion = $this->_db->prepare( $ejecucion_update );
        $resultado_ejecucion->execute();

        if ( $resultado_ejecucion->rowCount() ) {
            while ( $imprimir = $resultado_ejecucion->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 'estado' => '1' );
            }
        } else {
            $array[] = array( 'estado' => 0, 'mensaje' => 'Digite Correctamente o no existe registro del personal' );
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


    public

    function RevisarDNIExistente( $dni ) {
        $read_personal = "declare @lc_nombre varchar(20) = '" . $dni . "' SELECT DNI, NOMBRES, UNIDAD_ORGANICA, EMAIL, CARGO, FECHA_EXPIRACION, USU_NOMBRE, USU_PATERNO, USU_MATERNO, FECH_ULT_INGRESO, ESTADO, CLAVE, SEXO, SESION, FOTO, FECHA_REGISTRO  FROM [HEVES_RRHH].[dbo].[USUARIO_WEB] where dni =  @lc_nombre  order by  NOMBRES";
        $ejecucion_read = $this->_db->prepare( $read_personal );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1' );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0' );
        }
        return json_encode( $datos_read );
    }




    public

    function GrabarNuevoUsuario( $dni, $paterno, $materno, $nombres, $correo, $sexo, $cargo, $unidad, $fecha_expiracion, $estado ) {
        $nuevo_registro = "declare @lc_dni varchar(8) = '" . $dni . "'
           declare @lc_paterno varchar(100) = '" . utf8_decode( $paterno ) . "'
           declare @lc_materno varchar(100) = '" . utf8_decode( $materno ) . "'
           declare @lc_nombres varchar(100) = '" . utf8_decode( $nombres ) . "'
           declare @lc_correo varchar(80) = '" . $correo . "'
           declare @lc_sexo varchar(1) = '" . $sexo . "'
           declare @lc_cargo varchar(60) = '" . $cargo . "'
           declare @lc_unidad varchar(3) = '" . $unidad . "'
           declare @ld_fecha_expiracion datetime = convert(datetime, '" . $fecha_expiracion . "', 103)
           declare @lc_estado varchar(1) = " . $estado . "
           declare @lc_foto varchar(20) = case when @lc_sexo = 'M' then '55555555.jpg' when @lc_sexo = 'F' then '44444444.jpg' else '' end
           INSERT INTO [HEVES_RRHH].[dbo].[USUARIO_WEB](DNI, NOMBRES, UNIDAD_ORGANICA, EMAIL, CARGO, FECHA_EXPIRACION, USU_NOMBRE, USU_PATERNO, USU_MATERNO, FECH_ULT_INGRESO, ESTADO, CLAVE, SEXO, SESION, FOTO, FECHA_REGISTRO)  VALUES (@lc_dni, @lc_paterno + ' ' + @lc_materno + ' ' + @lc_nombres,  @lc_unidad, @lc_correo, @lc_cargo,  @ld_fecha_expiracion, @lc_nombres, @lc_paterno, @lc_materno, '', @lc_estado, '1234', @lc_sexo, 0, @lc_foto, getdate())";
        $ejecucion = $this->_db->prepare( $nuevo_registro );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }

    public

    function UpdateUsuario( $dni, $paterno, $materno, $nombres, $nombres_completos, $correo, $sexo, $foto, $nombre_cargo, $unidad, $fecha_expiracion, $estado ) {
        $registro_update = "UPDATE  [HEVES_RRHH].[dbo].[USUARIO_WEB]  SET [DNI] = '" . $dni . "', USU_MATERNO = '" . utf8_decode( $materno ) . "', USU_PATERNO = '" . utf8_decode( $paterno ) . "', USU_NOMBRE = '" . utf8_decode( $nombres ) . "', NOMBRES = '" . utf8_decode( $nombres_completos ) . "', EMAIL = '" . $correo . "', SEXO = '" . $sexo . "', FOTO = '" . $foto . "', UNIDAD_ORGANICA = '" . $unidad . "', FECHA_EXPIRACION =   convert(datetime, '" . $fecha_expiracion . "', 103), CARGO = '" . $nombre_cargo . "', ESTADO = " . $estado . "  where DNI = '" . $dni . "'";
        $ejecucion = $this->_db->prepare( $registro_update );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );




    }


    public

    function VerModulosPorDNI( $dni ) {
        $read_modulos = "SELECT *  FROM [HEVES_RRHH].[dbo].[ACCESO_MODULO] where DNI = '" . $dni . "'";
        $ejecucion_read = $this->_db->prepare( $read_modulos );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->ID_AM,
                    'nombre' => utf8_encode( $read->NOMBRE ),
                    'estado' => $read->ESTADO );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0' );
        }
        return json_encode( $datos_read );


    }


    public

    function VerMenuPorID( $id_am ) {
        $read_menu = "SELECT *  FROM [HEVES_RRHH].[dbo].[ACCESO_MENU] where  id_am = '" . $id_am . "' order by orden";
        $ejecucion_read = $this->_db->prepare( $read_menu );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->ID_MENU,
                    'nombre' => utf8_encode( $read->NOMBRE ),
                    'estado' => $read->ESTADO );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0' );
        }
        return json_encode( $datos_read );

    }



    public

    function VerSubMenuPorID( $id_menu ) {

        $read_submenu = "SELECT *  FROM [HEVES_RRHH].[dbo].[ACCESO_SUBMENU] where  ID_MENU = '" . $id_menu . "' order by orden ";
        $ejecucion_read = $this->_db->prepare( $read_submenu );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'id' => $read->ID_SUBMENU,
                    'nombre' => utf8_encode( $read->NOMBRE ),
                    'estado' => $read->ESTADO );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0' );
        }
        return json_encode( $datos_read );

    }


    public

    function VerAccesoModuloExiste( $id ) {
        $consulta = "SELECT *  FROM [HEVES_RRHH].[dbo].[ACCESO_MODULO] where ID_AM = '" . $id . "'";
        $ejecucion_read = $this->_db->prepare( $consulta );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'encontro' => '1',
                    'nombre' => utf8_encode( $read->NOMBRE ) );
            }
        } else {
            $datos_read[] = array(
                'encontro' => '0' );
        }
        return json_encode( $datos_read );


    }


    public

    function GuardarModuloByUsuario( $nombre, $id, $dni ) {
        $sentencia = "EXEC SP_GUARDAR_MODULO_BYUSUARIO '" . $nombre . "', '" . $id . "', '" . $dni . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );
    }




    public

    function EliminarModulo( $id ) {
        $sentencia = "EXEC SP_ELIMINAR_MODULO  '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );

    }


    public

    function ActivarEstadoMenu( $estado, $id ) {
        $sentencia = "UPDATE  [HEVES_RRHH].[dbo].[ACCESO_MENU] set estado = '" . $estado . "' where id_menu = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );

    }

    public

    function ActivarEstadoSubMenu( $estado, $id ) {
        $sentencia = "UPDATE  [HEVES_RRHH].[dbo].[ACCESO_SUBMENU] set estado = '" . $estado . "' where ID_SUBMENU = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );

    }

    public

    function ActualizarModulosAllUsuarios( $id, $nombre ) {
        $sentencia = "EXEC SP_ACTUALIZAR_MODULOS_WEB '" . $nombre . "', '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );
    }

    public

    function ResetarClaveUsuario( $dni ) {
        $sentencia = "UPDATE [HEVES_RRHH].[dbo].[USUARIO_WEB]  SET CLAVE = '1234'  WHERE DNI = '" . $dni . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );
    }


    public

    function ActivarTodosLosSubmenu( $id )

    {
        $sentencia = "UPDATE [HEVES_RRHH].[dbo].[ACCESO_SUBMENU] SET ESTADO = '1'  where  id_menu = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );
    }



    public

    function DesactivarTodosLosSubmenu( $id )

    {
        $sentencia = "UPDATE [HEVES_RRHH].[dbo].[ACCESO_SUBMENU] SET ESTADO = '0'  where  id_menu = '" . $id . "'";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        $verificar = array( 'indicador' => '1' );
        return json_encode( $verificar );
    }









}
?>