<?php

 
class verificarController extends Controller {

	public function __construct() {
		parent::__construct();
		session_start();
	}

	public function index() {
		$this->_view->titulo = '';
		$this->_view->renderizar('index',true);
	}

	public function verificar_ingreso() {
		$u = $this->loadEntity('usuario_web');
		$u->setDni(trim($_POST["dni"]));
		$u->setClave(trim($_POST["clave"]));
		$this->_verificar = $this->loadModel('verificar');
		$this->_view->verificar = $this->_verificar->getVerificarUsuario($u);
		echo $this->_view->verificar;
	}

}