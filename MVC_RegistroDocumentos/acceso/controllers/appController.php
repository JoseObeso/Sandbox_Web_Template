<?php

class appController extends Controller
{

	public function __construct()
	{
		parent::__construct();
		session_start();
	}

	public function index()
	{
		$this->_view->titulo = 'Acceso Aplicativos';
		$this->_modulos = $this->loadModel('app');
		$user = utf8_decode($_SESSION["usuario"]["nombreusuario"]);
		$verificar = $this->_modulos->get_acceso_app($user);
		if ($verificar != false) {
			$this->_view->listar_modulos = array('encontro' => 1, 'data' => $verificar);
		} else {
			$this->_view->listar_modulos = array('encontro' => 0, 'msg' => 'No tiene permiso para ningun app, contactese con el administrador.');
		}
		$this->_view->renderizar('index', false);
	}
}
