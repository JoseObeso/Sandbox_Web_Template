<?php
class soporteController extends Controller {
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
        $this->_view->titulo = 'Soporte Técnico  Administracion y Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'inicio' ) );
        $this->_ver_estadistica = $this->loadModel( 'modulos' );
        $this->_view->ver_estadistica_final = $this->_ver_estadistica->VerEstadisticaAdministracion();
        $this->_view->ver_estadistica_modulo = $this->_ver_estadistica->VerEstadisticaModulos();
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }





    public

    function grabar_problema() {
        $dni = $_SESSION[ "usuario" ][ "dni" ];
        $nombre_usuario = $_SESSION[ "usuario" ][ "nombres" ];
        $problema = $_POST[ "problema" ];
        $this->_grabar = $this->loadModel( 'soporte' );
        $datos = $this->_grabar->grabar_soporte( $dni, $nombre_usuario, $problema );
        echo $datos;



    }




}
?>