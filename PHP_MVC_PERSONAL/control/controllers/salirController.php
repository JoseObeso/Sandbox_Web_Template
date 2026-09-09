
<?php
class salirController extends Controller {
	public
	function __construct() {
		parent::__construct();
		session_start();
		if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) ) {} else {
			$this->redireccionar();
		}
	}
	public function index() {
		$u = $this->loadEntity( 'usuario_web' );
		$u->setDni( trim( $_SESSION[ "dni" ] ) );
		$this->_verificar = $this->loadModel( 'verificar' );
		$this->_view->verificar = $this->_verificar->setCerrarSession();
		$this->redireccionar();
	}
}
?>