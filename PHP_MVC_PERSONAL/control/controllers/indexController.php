<?php
class indexController extends Controller
{
	public function __construct() {
		parent::__construct();
		session_start();
		if(isset($_SESSION["usuario"]["dni"])){
			header('location: modulos');
		}
	}

	public function index()
	{
		$this->_view->titulo = 'Monitoreo de RRHH - Gestion de Personal';
		$this->_view->renderizar('index',true);
	}
}
?>