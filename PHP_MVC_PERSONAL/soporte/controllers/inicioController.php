<?php
class inicioController extends Controller {
    public
    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {

        } else {
            header( 'location: ../' );
        }
    }
    public
    function index() {
        $this->_view->titulo = 'Estadisticas y Procesamiento de Datos HEVES - ' . INSTITUCION;
        $this->_view->setJs( array( 'inicio' ) );
        $this->_modulos = $this->loadModel( 'permisos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
?>