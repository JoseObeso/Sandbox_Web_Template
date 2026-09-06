<?php

class salirController extends Controller {
	public
	function __construct() {
		parent::__construct();
		session_start();
		if ( isset( $_SESSION[ "usuario" ][ "nombreusuario" ] ) ) {} else {
			$this->redireccionar();
		}
	}



	public function index() {

        $user = $_SESSION["usuario"]["nombreusuario"];
        $this->_verificar = $this->loadModel('validar');
        $this->_view->verificar = $this->_verificar->setCerrarSession($user);
		$this->redireccionar();
    }






}
