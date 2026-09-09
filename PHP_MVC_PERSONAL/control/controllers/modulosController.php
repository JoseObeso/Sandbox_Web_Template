<?php

class modulosController extends Controller {

	public function __construct() {
		parent::__construct();
		session_start();
	}

	public function index() {
		$this->_view->titulo = 'Acceso Modulos';
		$this->_modulos = $this->loadModel('modulos');
		$u = $this->loadEntity('usuario_web');
		$u->setDni(trim($_SESSION["usuario"]["dni"]));
		$result = $this->_modulos->get_acceso_modulo_1($u);
		if($result != false) {
			$this->_view->listar_modulos = array('success' => 1, 'data' => $result);
		} else {
			$this->_view->listar_modulos = array('success' => 0, 'msg' => 'No tiene permiso para ningun modulo, contactese con el administrador.');
		}
		$this->_view->renderizar('index', false);
	}

	public function cambiar_clave() {
		$uw = $this->loadEntity('usuario_web');
		$uw->setDni(trim($_SESSION["usuario"]["dni"]));
		$uw->setClave(trim($_POST["clave_antigua"]));
		$uw->setNueva_clave(trim($_POST["nueva_clave"]));
		$this->_modulos = $this->loadModel('modulos');
		$datos = $this->_modulos->CambiarMiClave($uw);
		echo $datos;
	}

}