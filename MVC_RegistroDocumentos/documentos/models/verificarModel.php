<?php
class verificarModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}
 




	public function setCerrarSession($user)
	{
		$sentencia = "UPDATE USUARIO SET SESION = '0', FECHA_CIERRE_SESION = getdate() WHERE USUARIO = '" . $user . "'";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute();
		if ($resultado) {
			$array = array('estado' => 1, 'mensaje' => 'Sesion Culminada');
			session_destroy();
		} else {
			$array = array('estado' => 0, 'mensaje' => 'Error en cierre de sesion');
		}
		return json_encode($array);
	}
}
