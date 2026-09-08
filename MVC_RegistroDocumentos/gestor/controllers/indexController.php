<?php
class indexController extends Controller {
    public
    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "nombreusuario" ] ) ) {
            header( 'location: inicio' );
        } else {
            header( 'location: /' );
        }
    }

    public
    function index( $pagina = 1 ) {
        $this->_view->titulo = 'Gestion de Usuarios ';
        $this->_view->renderizar( 'index', true );
    }
    
    // public
    // function verificar_ingreso() {
    //     $u = $this->loadEntity( 'usuario_web' );
    //     $u->setDni( trim( $_POST[ "dni" ] ) );
    //     $u->setClave( trim( $_POST[ "clave" ] ) );
    //     $this->_verificar = $this->loadModel( 'verificar' );
    //     $this->_view->verificar = $this->_verificar->getVerificarUsuario( $u );
    //     echo $this->_view->verificar;
    // }
    
    public
    function salir() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "dni" ] ) );
        $this->_verificar = $this->loadModel( 'verificar' );
        $this->_view->verificar = $this->_verificar->setCerrarSession( $u );
        header( 'location: /' );
    }
}
