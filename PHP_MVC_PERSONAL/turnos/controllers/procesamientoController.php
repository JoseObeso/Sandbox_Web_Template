<?php

class procesamientoController extends Controller {

    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {} else {
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

    function turnos_administrativos() {
        $this->_view->titulo = 'Asignacion de Horarios Administrativos';
        $this->_view->setJs( array( 'procesar_administrativos' ) );
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

                $this->_view->renderizar( 'index', false );
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

    function cierreturnos() {
        $this->_view->titulo = 'Asignacion de Horarios Administrativos';
        $this->_view->setJs( array( 'procesar_administrativos' ) );
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

                $this->_view->renderizar( 'cierreturnos', false );
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

    function procesar_programacion_admin() {
        $mes_procesar_a = $_POST[ "mes_procesar_a" ];
        $anio_procesar_a = $_POST[ "anio_procesar_a" ];
        $usuario_registro =  $_SESSION[ "usuario" ][ "dni" ] ;
        $this->_procesar_admin = $this->loadModel( 'procesamiento' );
        $enviar_proceso_admin = $this->_procesar_admin->SetProcesarProgramacionAdmin( $mes_procesar_a, $anio_procesar_a, $usuario_registro );
        echo $enviar_proceso_admin;

    }

    public

    function abrir_turnos() {
        $mes_seleccion = $_POST[ "mes_cierre" ];
        $anio_seleccion = $_POST[ "anio_cierre" ];
        $this->inicia_abrir_turnos = $this->loadmodel( 'procesamiento' );
        $enviar_al_server_abrir_turnos = $this->inicia_abrir_turnos->EjecutaAbrir( $mes_seleccion, $anio_seleccion );
        echo $enviar_al_server_abrir_turnos;



    }

    public

    function cerrar_turnos() {
        $mes_seleccion = $_POST[ "mes_cierre" ];
        $anio_seleccion = $_POST[ "anio_cierre" ];
        $this->inicia_cierre_turnos = $this->loadmodel( 'procesamiento' );
        $enviar_al_server_cierre_turnos = $this->inicia_cierre_turnos->EjecutaCierre( $mes_seleccion, $anio_seleccion );
        echo $enviar_al_server_cierre_turnos;

    }


}
?>