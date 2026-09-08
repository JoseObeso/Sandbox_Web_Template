<?php
class indexController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "nombreusuario" ] ) ) {
            header( 'location: inicio' );
        } else {
            header( 'location: / ' );
        }
    }

    public

    function index() {
       
        $this->_view->titulo = 'Sistema de tramite - '.INSTITUCION;
        $this->_view->renderizar( 'index', true );
    }

    
}
?>