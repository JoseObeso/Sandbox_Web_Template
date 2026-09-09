<?php



class mantenimientoController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {

        } else {
            header( 'location: /' );
        }
    }

    public

    function index() {
        $this->_view->titulo = 'Usuarios  HEVES' . INSTITUCION;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }
    public

    function usuarios() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Usuarios del Sistema de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'usuarios' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $buscar_nombre = '';
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listarusuarios_web = $this->_mantenimiento->ListaUsuariosRegistrados( $buscar_nombre );
                $this->_view->listarusuarios_reporte = $this->_mantenimiento->getListadoUsuarios( $buscar_nombre );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( "Mantenimiento" );
                $a_submenu->setNombre( "Usuarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );

                $this->_view->renderizar( 'usuarios', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }
    public

    function plantillas() {
        $this->_view->titulo = 'Gestion de Modulos, Menus, Sub Menus, Botones del sistema - Sistema de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'plantillas' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();

                $this->_plantillas = $this->loadModel( 'plantillas' );
                $this->_view->listar_plantilla_modulos = $this->_plantillas->ListarPlantillaModulos();
                $this->_plantillas = $this->loadModel( 'plantillas' );
                $this->_view->listar_plantilla_menus = $this->_plantillas->ListarPlantillaMenus();
                $this->_plantillas = $this->loadModel( 'plantillas' );
                $this->_view->listar_plantilla_submenus = $this->_plantillas->ListarPlantillaSubMenus();
                $this->_plantillas = $this->loadModel( 'plantillas' );
                $this->_view->listar_plantilla_botones = $this->_plantillas->ListarPlantillaBotones();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( "Mantenimiento" );
                $a_submenu->setNombre( "Usuarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'plantillas', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }
    public

    function permisos() {
        $this->_view->titulo = 'Gestion de Permisos para usuarios del sistema - Sistema de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'permisos' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();

                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( "Mantenimiento" );
                $a_submenu->setNombre( "Usuarios" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'permisos', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    public

    function ConseguirDatosUsuarios() {
        $dni = $_POST[ "dni" ];
        $this->_obtener_datos_usuario = $this->loadModel( 'mantenimiento' );
        $datosusuario = $this->_obtener_datos_usuario->ConseguirNombreUsuario( $dni );
        echo $datosusuario;
    }


    public

    function eliminar_usuarios_con_permisos() {
        $dni = $_POST[ "dni" ];
        $this->_proceder_a_eliminar_usuario = $this->loadModel( 'mantenimiento' );
        $eliminar_usuario = $this->_proceder_a_eliminar_usuario->BorrarUsuarioConPermisos( $dni );
        echo $eliminar_usuario;
    }



    public

    function cambiar_clave() {
        $uw = $this->loadEntity( 'usuario_web' );
        $uw->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $uw->setClave( trim( $_POST[ "clave_antigua" ] ) );
        $uw->setNueva_clave( trim( $_POST[ "nueva_clave" ] ) );
        $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
        $datos = $this->_mantenimiento->CambiarMiClave( $uw );
        echo $datos;
    }


    public

    function ver_permisos() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $this->_view->listar_acceso_modulos = $this->_plantillas->ListarAccesoModulosByDNI( $u );
        $this->_view->renderizar( 'ver_permisos', true );
        $ver_acceso_modulos = $this->_view->listar_acceso_modulos;
        $this->_view->renderizar( 'ver_permisos', true );

    }


    public

    function guardar_datos_editados_usuarios() {
        $dniusuario = $_POST[ "e-dni" ];
        $enombre = $_POST[ "e-nombres" ];
        $epaterno = $_POST[ "e-paterno" ];
        $ematerno = $_POST[ "e-materno" ];
        $esexo = $_POST[ "e-sexo" ];
        $unidad_organica_r = $_POST[ "id_unidad_organica" ];
        $idunidad_organica_grabar = ( empty( $_POST[ "e-unidad-organica" ] ) ) ? $unidad_organica_r : $_POST[ "e-unidad-organica" ];
        $cargo_registrado = $_POST[ "cargo_registro" ];
        $cargo_grabar = ( empty( $_POST[ "e-cargo" ] ) ) ? $cargo_registrado : $_POST[ "e-cargo" ];
        $email = $_POST[ "e-email" ];
        $efecha_expiracion = $_POST[ "e-fecha-expiracion" ];
        $eestado = $_POST[ "e-estado" ];
        $this->_guardar_edicion_usuario = $this->loadModel( 'mantenimiento' );
        $guardar_edicion_usuario = $this->_guardar_edicion_usuario->UpdateEdicionUsuario( $dniusuario, $enombre, $epaterno, $ematerno, $esexo, $idunidad_organica_grabar, $email, $cargo_grabar, $efecha_expiracion, $eestado );
        echo $guardar_edicion_usuario;
    }



    public

    function actualizar_modulo() {

        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->Actualizar_modulo_seleccion = $this->loadModel( 'mantenimiento' );
        $dato = $this->Actualizar_modulo_seleccion->ActualizarModulosAllUsuarios( $id, $nombre );
        echo $dato;
    }
    public

    function listar_plantilla_modulos() {
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarPlantillaModulos();
        echo $datos;
    }
    public

    function eliminar_modulo() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $am->setId_am( trim( $_POST[ "id_am" ] ) );
        $am->setDni( trim( $_POST[ "dni" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $dato = $this->_plantillas->EliminarModulo( $am );
        echo $dato;
    }
    public

    function buscar_por_nombre_usuario() {
        $buscar_nombre = $_POST[ "nombres" ];
        $this->_listar_usuarios_web = $this->loadModel( 'mantenimiento' );
        $this->_view->listarusuarios = $this->_listar_usuarios_web->ListaUsuariosRegistrados( $buscar_nombre );
        echo $this->_view->listarusuarios;
    }








    public

    function buscar_por_dni_si_existe() {
        $dni = $_POST[ "dni" ];
        $this->_busqueda = $this->loadModel( 'mantenimiento' );
        $this->_view->ver_resultado = $this->_busqueda->RevisarDNIExistente( $dni );
        echo $this->_view->ver_resultado;

    }



    public

    function grabar_datos_usuario() {
        $dni = $_POST[ "dni" ];
        $paterno = strtoupper( $_POST[ "paterno" ] );
        $materno = strtoupper( $_POST[ "materno" ] );
        $nombres = strtoupper( $_POST[ "nombres" ] );
        $correo = $_POST[ "correo" ];
        $sexo = $_POST[ "sexo" ];
        $cargo = $_POST[ "cargo" ];
        $unidad = $_POST[ "unidad" ];
        $fecha_expiracion = $_POST[ "fecha_expiracion" ];
        $estado = ( $_POST[ "estado" ] = '1' ) ? 1 : 0;
        $this->grabar_nuevo_usuario = $this->loadModel( 'mantenimiento' );
        $ejecucion_nuevo_usuario = $this->grabar_nuevo_usuario->GrabarNuevoUsuario( $dni, $paterno, $materno, $nombres, $correo, $sexo, $cargo, $unidad, $fecha_expiracion, $estado );
        echo $ejecucion_nuevo_usuario;

    }


    public

    function grabar_modificacion_usuario() {
        $dni = $_POST[ "dni" ];
        $paterno = strtoupper( $_POST[ "paterno" ] );
        $materno = strtoupper( $_POST[ "materno" ] );
        $nombres = strtoupper( $_POST[ "nombres" ] );
        $nombres_completos = $paterno . ' ' . $materno . ' ' . $nombres;
        $correo = $_POST[ "correo" ];
        $sexo = ( $_POST[ "sexo" ] = '1' ? 'M' : 'F' );
        $foto = ( $sexo = 'M' ) ? '55555555.jpg' : '44444444.jpg';
        $cargo = $_POST[ "cargo" ];

        switch ( $cargo ) {
            case 1:
                $nombre_cargo = 'ADMINISTRATIVO';
                break;
            case 2:
                $nombre_cargo = 'ASISTENCIAL';
                break;
            default:
                $nombre_cargo = '';
                break;
        }

        $unidad = $_POST[ "unidad" ];
        $fecha_expiracion = $_POST[ "fecha_expiracion" ];
        $estado = ( $_POST[ "estado" ] = '1' ) ? 1 : 0;
        $this->grabar_nuevo_usuario = $this->loadModel( 'mantenimiento' );
        $ejecucion_nuevo_usuario = $this->grabar_nuevo_usuario->UpdateUsuario( $dni, $paterno, $materno, $nombres, $nombres_completos, $correo, $sexo, $foto, $nombre_cargo, $unidad, $fecha_expiracion, $estado );
        echo $ejecucion_nuevo_usuario;

    }


    public

    function guardar_modulo_usuario() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $am->setDni( trim( $_POST[ "dni" ] ) );
        $am->setNombre( trim( $_POST[ "modulo" ] ) );
        $am->setId_am( trim( $_POST[ "codigo_modulo" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->GuardarModuloByUsuario( $am );
        echo $datos;
    }


    public

    function getnombrepordni() {
        $u = $this->loadEntity( 'usuario_web' );
        $dni = trim( $_POST[ "dni" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datosdni = $this->_plantillas->ver_nombre_por_dni( $dni );
        echo $datosdni;
    }


    public

    function getListadoAccesoModulos() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarAccesoModulosByDNI( $u );
        echo $datos;
    }
    public

    function getDatosModulo() {
        $id_pl_m = trim( $_POST[ "id_pl_m" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->getDatosModulo( $id_pl_m );
        echo $datos;
    }
    public

    function getDatosMenu() {
        $id_pl_menu = trim( $_POST[ "id_pl_menu" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->getDatosMenu( $id_pl_menu );
        echo $datos;
    }
    public

    function getDatosSubMenu() {
        $id_pl_submenu = trim( $_POST[ "id_pl_submenu" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->getDatosSubMenu( $id_pl_submenu );
        echo $datos;
    }
    public

    function getListadoPlantillaMenus() {
        $id_pl_m = trim( $_POST[ "id_pl_m" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarPlantillaMenusById( $id_pl_m );
        echo $datos;
    }
    public

    function getListadoAccesoMenus() {
        $id_pl_m = trim( $_POST[ "id_pl_m" ] );
        $dni = trim( $_POST[ "dni" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarAccesoMenusByDNI( $id_pl_m, $dni );
        echo $datos;
    }
    public

    function getListadoPlantillaSubMenus() {
        $id_pl_menu = trim( $_POST[ "id_pl_menu" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarPlantillaSubMenusById( $id_pl_menu );
        echo $datos;
    }
    public

    function getListadoAccesoSubMenus() {
        $id_pl_menu = trim( $_POST[ "id_pl_menu" ] );
        $dni = trim( $_POST[ "dni" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarAccesoSubMenusByDNI( $id_pl_menu, $dni );
        echo $datos;
    }
    public

    function getListadoPlantillaBotones() {
        $id_pl_submenu = trim( $_POST[ "id_pl_submenu" ] );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarPlantillaBotonesById( $id_pl_submenu );
        echo $datos;
    }
    public

    function getListadoAccesoBotones() {
        $ab = $this->loadEntity( 'acceso_botones' );
        $ab->setId_submenu( trim( $_POST[ "id_pl_submenu" ] ) );
        $ab->setDni( trim( $_POST[ "dni" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->ListarAccesoBotonesByDNI( $ab );
        echo $datos;
    }
    public

    function cambiar_plantilla() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $am->setPlantilla( trim( $_POST[ "nueva_plantilla" ] ) );
        $am->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $am->setNombre( trim( NOMBRE_APP ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $datos = $this->_permisos->CambiarPlantilla( $am );
        echo $datos;
    }


    public

    function nuevo_usuario() {
        $u = $this->loadEntity( 'usuario_web' );
        $am = $this->loadEntity( 'acceso_modulo' );
        $am->setNombre( NOMBRE_APP );
        $u->setDni( trim( $_POST[ "n-dni" ] ) );
        $u->setUsu_nombre( utf8_decode( trim( $_POST[ "n-nombres" ] ) ) );
        $u->setUsu_paterno( utf8_decode( trim( $_POST[ "n-paterno" ] ) ) );
        $u->setUsu_materno( utf8_decode( trim( $_POST[ "n-materno" ] ) ) );
        $u->setUnidad_organica( trim( $_POST[ "n-unidad-organica" ] ) );
        $u->setEmail( trim( $_POST[ "n-email" ] ) );
        $u->setCargo( trim( $_POST[ "n-cargo" ] ) );
        $u->setSexo( trim( $_POST[ "n-sexo" ] ) );
        $u->setClave( trim( $_POST[ "n-clave" ] ) );
        $u->setFecha_expiracion( trim( $_POST[ "n-fecha-expiracion" ] ) );
        $u->setEstado( trim( $_POST[ "n-estado" ] ) );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->setNuevo_usuario( $u, $am );
        echo $this->_view->datos;
    }

    public

    function getDatosUsuario() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->getDatosUsuario( $u );
        echo $this->_view->datos;
    }
    public


    // grabar_datos_usuario

    function getPermisosUsuario() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $am->setNombre( 'SYSMAN' );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->getPermisosUsuario( $u, $am );
        echo $this->_view->datos;
    }
    public

    function getTodosLosBotones() {
        $a_submenu = $this->loadEntity( 'acceso_submenu' );
        $u = $this->loadEntity( 'usuario_web' );
        $a_submenu->setId_submenu( $_POST[ "id_submenu" ] );
        $a_submenu->setNombre( $_POST[ "nombre_submenu" ] );
        $u->setDni( $_POST[ "dni" ] );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->getTodosLosBotones( $a_submenu, $u );
        echo $this->_view->datos;
    }
    public

    function cambiar_estado_menu() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $a_menu = $this->loadEntity( 'acceso_menu' );
        $am->setNombre( NOMBRE_APP );
        $a_menu->setId_menu( $_POST[ "id_menu" ] );
        if ( $_POST[ "estado" ] == 1 ) {
            $estado = 0;
        } else {
            $estado = 1;
        }
        $a_menu->setEstado( $estado );
        $a_menu->setDni( $_POST[ "dni" ] );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->cambiar_estado_menu( $am, $a_menu );
        echo $this->_view->datos;
    }
    public

    function cambiar_estado_submenu() {
        $am = $this->loadEntity( 'acceso_modulo' );
        $a_submenu = $this->loadEntity( 'acceso_submenu' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $am->setNombre( NOMBRE_APP );
        $a_submenu->setId_submenu( $_POST[ "id_submenu" ] );
        if ( $_POST[ "estado" ] == 1 ) {
            $estado = 0;
        } else {
            $estado = 1;
        }
        $a_submenu->setEstado( $estado );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->cambiar_estado_submenu( $a_submenu, $u, $am );
        echo $this->_view->datos;
    }
    public

    function cambiar_estado_boton() {
        $a_submenu = $this->loadEntity( 'acceso_submenu' );
        $a_boton = $this->loadEntity( 'acceso_botones' );
        $u = $this->loadEntity( 'usuario_web' );
        $a_boton->setId_boton( $_POST[ "id_boton" ] );
        $a_boton->setId_submenu( $_POST[ "id_submenu" ] );
        $a_submenu->setNombre( $_POST[ "nombre_submenu" ] );
        if ( $_POST[ "estado" ] == 1 ) {
            $estado = 0;
        } else {
            $estado = 1;
        }
        $a_boton->setEstado( $estado );
        $u->setDni( $_POST[ "dni" ] );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->cambiar_estado_boton( $a_boton, $u, $a_submenu );
        echo $this->_view->datos;
    }
    public

    function guardar_plantilla_modulo() {
        $pm = $this->loadEntity( 'plantilla_modulo' );
        $pm->setNombre( trim( $_POST[ "n_nombre_modulo" ] ) );
        $pm->setUrl( trim( $_POST[ "n_url_modulo" ] ) );
        $pm->setPlantilla( trim( $_POST[ "n_plantilla_modulo" ] ) );
        $pm->setImagen( trim( $_POST[ "n_imagen_modulo" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->GuardarPlantillaModulo( $pm );
        echo $datos;
    }


    public

    function editar_plantilla_modulo() {
        $pm = $this->loadEntity( 'plantilla_modulo' );
        $pm->setId_pl_m( trim( $_POST[ "e_id_pl_m_modulo" ] ) );
        $pm->setNombre( trim( $_POST[ "e_nombre_modulo" ] ) );
        $pm->setUrl( trim( $_POST[ "e_url_modulo" ] ) );
        $pm->setPlantilla( trim( $_POST[ "e_plantilla_modulo" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->EditarPlantillaModulo( $pm );
        echo $datos;
    }
    public

    function guardar_plantilla_menu() {
        $pm = $this->loadEntity( 'plantilla_menu' );
        $pm->setNombre( trim( $_POST[ "n_nombre_menu" ] ) );
        $pm->setIcono( trim( $_POST[ "n_icono_menu" ] ) );
        $pm->setUrl( trim( $_POST[ "n_url_menu" ] ) );
        $pm->setOrden( trim( $_POST[ "n_orden_menu" ] ) );
        $pm->setId_pl_m( trim( $_POST[ "n_id_pl_m_menu" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->GuardarPlantillaMenu( $pm );
        echo $datos;
    }
    public

    function editar_plantilla_menu() {
        $pm = $this->loadEntity( 'plantilla_menu' );
        $pm->setNombre( trim( $_POST[ "e_nombre_menu" ] ) );
        $pm->setIcono( trim( $_POST[ "e_icono_menu" ] ) );
        $pm->setUrl( trim( $_POST[ "e_url_menu" ] ) );
        $pm->setOrden( trim( $_POST[ "e_orden_menu" ] ) );
        $pm->setId_pl_menu( trim( $_POST[ "e_id_pl_menu_menu" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->EditarPlantillaMenu( $pm );
        echo $datos;
    }
    public

    function guardar_plantilla_submenu() {
        $ps = $this->loadEntity( 'plantilla_submenu' );
        $ps->setNombre( trim( $_POST[ "n_nombre_submenu" ] ) );
        $ps->setIcono( trim( $_POST[ "n_icono_submenu" ] ) );
        $ps->setUrl( trim( $_POST[ "n_url_submenu" ] ) );
        $ps->setOrden( trim( $_POST[ "n_orden_submenu" ] ) );
        $ps->setId_pl_m( trim( $_POST[ "n_id_pl_m_submenu" ] ) );
        $ps->setId_pl_menu( trim( $_POST[ "n_id_pl_menu_submenu" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->GuardarPlantillaSubMenu( $ps );
        echo $datos;
    }
    public

    function editar_plantilla_submenu() {
        $ps = $this->loadEntity( 'plantilla_submenu' );
        $ps->setNombre( trim( $_POST[ "e_nombre_submenu" ] ) );
        $ps->setIcono( trim( $_POST[ "e_icono_submenu" ] ) );
        $ps->setUrl( trim( $_POST[ "e_url_submenu" ] ) );
        $ps->setOrden( trim( $_POST[ "e_orden_submenu" ] ) );
        $ps->setId_pl_submenu( trim( $_POST[ "e_id_pl_submenu_submenu" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->EditarPlantillaSubMenu( $ps );
        echo $datos;
    }
    public

    function guardar_plantilla_boton() {
        $pb = $this->loadEntity( 'plantilla_botones' );
        $pb->setNombre( trim( $_POST[ "n_nombre_boton" ] ) );
        $pb->setIcono( trim( $_POST[ "n_icono_boton" ] ) );
        $pb->setId_html( trim( $_POST[ "n_id_html_boton" ] ) );
        $pb->setId_pl_m( trim( $_POST[ "n_id_pl_m_boton" ] ) );
        $pb->setId_pl_menu( trim( $_POST[ "n_id_pl_menu_boton" ] ) );
        $pb->setId_pl_submenu( trim( $_POST[ "n_id_pl_submenu_boton" ] ) );
        $this->_plantillas = $this->loadModel( 'plantillas' );
        $datos = $this->_plantillas->GuardarPlantillaBoton( $pb );
        echo $datos;
    }

    public

    function seleccion_modulos_por_dni() {
        $dni = $_POST[ "dni" ];
        $this->modulos_dni = $this->loadModel( 'mantenimiento' );
        $datos = $this->modulos_dni->VerModulosPorDNI( $dni );
        echo $datos;

    }




    public

    function seleccion_menu_por_id() {
        $id_am = $_POST[ "id_am" ];
        $this->acceso_menu_id = $this->loadModel( 'mantenimiento' );
        $datos = $this->acceso_menu_id->VerMenuPorID( $id_am );
        echo $datos;

    }




    public

    function seleccion_sub_menu_por_id()

    {
        $id_menu = $_POST[ "id_menu" ];
        $this->acceso_sub_menu_id = $this->loadModel( 'mantenimiento' );
        $datos = $this->acceso_sub_menu_id->VerSubMenuPorID( $id_menu );
        echo $datos;



    }

    public

    function ubicar_acceso_modulo_si_existe() {
        $id = $_POST[ "id" ];
        $this->ubicar_si_existe = $this->loadModel( 'mantenimiento' );
        $datos = $this->ubicar_si_existe->VerAccesoModuloExiste( $id );
        echo $datos;

    }



    public

    function grabar_modulo_a_usuario() {
        $nombre = $_POST[ "nombre" ];
        $id = $_POST[ "id" ];
        $dni = $_POST[ "dni" ];
        $this->grabar_modulo_dni = $this->loadModel( 'mantenimiento' );
        $datos = $this->grabar_modulo_dni->GuardarModuloByUsuario( $nombre, $id, $dni );
        echo $datos;

    }


    public

    function desactivar_modulo() {
        $id = $_POST[ "id" ];
        $this->desactivar_modulo = $this->loadModel( 'mantenimiento' );
        $datos = $this->desactivar_modulo->EliminarModulo( $id );
        echo $datos;

    }



    public

    function activar_menu() {
        $id = $_POST[ "id" ];
        $estado = $_POST[ "estado" ];
        $this->activar_estado_menu = $this->loadModel( 'mantenimiento' );
        $datos = $this->activar_estado_menu->ActivarEstadoMenu( $estado, $id );
        echo $datos;
    }


    public

    function activar_desactivar_submenu() {
        $id = $_POST[ "id" ];
        $estado = $_POST[ "estado" ];
        $this->activar_estado_sub_menu = $this->loadModel( 'mantenimiento' );
        $datos = $this->activar_estado_sub_menu->ActivarEstadoSubMenu( $estado, $id );
        echo $datos;
    }

    public

    function reset_clave_usuario() {
        $dni = $_POST[ "dni" ];
        $this->reset_clave_user = $this->loadModel( 'mantenimiento' );
        $datos = $this->reset_clave_user->ResetarClaveUsuario( $dni );
        echo $datos;
    }


    public
    function activar_todos_los_submenus() {
        $id = $_POST[ "id" ];
        $this->activar_todos_los_submenus = $this->loadModel( 'mantenimiento' );
        $datos = $this->activar_todos_los_submenus->ActivarTodosLosSubmenu( $id );
        echo $datos;

    }




    public
    function desactivar_todos_los_submenus() {
        $id = $_POST[ "id" ];
        $this->desactivar_todos_los_submenus = $this->loadModel( 'mantenimiento' );
        $datos = $this->desactivar_todos_los_submenus->DesactivarTodosLosSubmenu( $id );
        echo $datos;

    }


}
?>