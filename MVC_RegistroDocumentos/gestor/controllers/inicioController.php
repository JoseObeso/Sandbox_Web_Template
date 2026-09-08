<?php
class inicioController extends Controller {
    public
    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "nombreusuario" ] ) && $_SESSION[ "usuario" ][ "nombreusuario" ] != '' ) {

        } else {
            header( 'location: /' );
        }
    }

    public
    function index() {
        $this->_view->titulo = 'Bienvenido al Modulo de Gestion de Usuarios - ' . INSTITUCION;
        $this->_view->setJs( array( 'inicio' ) );
        $user = trim( $_SESSION[ "usuario" ][ "nombreusuario" ] ) ;
        
        
        $this->_modulos = $this->loadModel( 'procesos' );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $user );
        

        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "nombreusuario" ], NOMBRE_APP );

        


        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "nombreusuario" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }

 
}
