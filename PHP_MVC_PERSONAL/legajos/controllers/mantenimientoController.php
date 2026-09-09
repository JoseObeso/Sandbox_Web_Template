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
        $this->_view->titulo = 'Sistema : '.ENLACE;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
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

    
}
?>