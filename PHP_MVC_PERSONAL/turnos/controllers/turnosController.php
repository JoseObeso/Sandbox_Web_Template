<?php

class turnosController extends Controller {
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
        $this->_view->titulo = 'Sistema : ' . ENLACE;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }


    public

    function personal() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal de Monitoreo de RRHH';
        $this->_view->setJs( array( 'personal' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );
                $this->_personal = $this->loadModel( 'turnos' );
                $this->_view->listarpersonal = $this->_personal->getListadoPersonal( $u );
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( 'Ver turnos' );
                $a_submenu->setNombre( "personal" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );

                $this->_horarios = $this->loadModel( 'turnos' );
                $this->_view->listar_horarios = $this->_horarios->getListarHorarios();


                $this->_view->renderizar( 'personal', false );
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

    function ver_personal_tempus() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal tempus de Monitoreo de RRHH';
        $this->_view->setJs( array( 'ver_personal_tempus' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );

                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal_tempus = $this->_personal->getListadoPersonalTempus( $u );

                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Ver Personal TEMPUS" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'ver_personal_tempus', false );
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

    function ver_personal_rrhh() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal RRHH de Monitoreo de RRHH';
        $this->_view->setJs( array( 'ver_personal_rrhh' ) );
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
                $u = $this->loadEntity( 'usuario_web' );
                $u->setNombres( trim( '' ) );
                $this->_personal = $this->loadModel( 'personal' );
                $this->_view->listarpersonal = $this->_personal->getListadoPersonal_rrhh( $u );

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
                $this->_view->listar_unidad_organica = $this->_mantenimiento->getListarUnidadesOrganicas();
                $this->_view->renderizar( 'ver_personal_rrhh', false );
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

    function guardar_asignacion_horarios() {

        $id_empleado = $_POST[ "as-idempleado" ];
        $mes = trim( $_POST[ "mes" ] );
        $anio = trim( $_POST[ "anio" ] );
        $codigo_horario = trim($_POST[ "seleccion_horarios" ]);
        $dni_empleado = trim($_POST[ "as-dni" ]);
        $usuario_registro = $_SESSION[ "usuario" ][ "dni" ] ;
        $this->_asignacion = $this->loadModel( 'turnos' );
        $enviar_horarios = $this->_asignacion->SetAsignacionHorarios( $id_empleado, $mes, $anio, $codigo_horario, $dni_empleado, $usuario_registro);
        echo $enviar_horarios;
 
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
    }


    public

    function recargar_personal() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'turnos' );
        $this->_view->listarpersonal = $this->_personal->getListadoPersonal( $u );
        echo $this->_view->listarpersonal;
    }


    function recargar_personal_tempus() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal = $this->loadModel( 'personal' );
        $this->_view->listarpersonal_tempus = $this->_personal->getListadoPersonalTempus( $u );
        echo $this->_view->listarpersonal_tempus;
    }

    public

    function guardar_imagen() {
        $imagen = $_FILES[ 'foto' ];
        $this->_mantenimiento = $this->loadModel( 'mantenimiento' );
        $datos = $this->_mantenimiento->GuardarImagen( $imagen );
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
    function getDatosUsuario() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_POST[ "dni" ] );
        $this->_usuarios = $this->loadModel( 'mantenimiento' );
        $this->_view->datos = $this->_usuarios->getDatosUsuario( $u );
        echo $this->_view->datos;
    }



    public
    function getDatosProfesional() {
        $id_empleado = $_POST[ "idempleado" ];
        $this->_usuarios = $this->loadModel( 'turnos' );
        $this->_view->datos = $this->_usuarios->getDatosProfesional( $id_empleado );
        echo $this->_view->datos;

    }

 
   
  
     
}
?>