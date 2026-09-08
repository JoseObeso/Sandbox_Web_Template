<?php
class permisosModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function getPlantillaModulo($user, $modulo)
	{
		$sentencia = "select * from app_permisos  where NOMBRE = '" . $modulo . "' AND USUARIO = '" . $user . "'";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute();
		$imprimir = $resultado->fetch(PDO::FETCH_OBJ);
		return $imprimir->PLANTILLA;
	}

	public function getListarMenuySubmenu($user, $modulo)
	{
		$sentencia = "SELECT * FROM V_USER_MOD_MENU_SUBMENU WHERE USUARIO='" . $user . "' AND NOMBRE_MODULO='" . $modulo . "'   ORDER BY ORDEN_MENU, ORDEN_SUB  ASC";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute();
		return $resultado;
	}


	public function getVerificarPermisos($user)
	{
		$sentencia = "SELECT *  FROM USUARIO where usuario = '".$user."'";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute();
		$row = $resultado->fetch(PDO::FETCH_OBJ);
		if ($row->ACTIVO == 1) {
			$fecha_hoy = strtotime(date('Y-m-d'));
			$fecha_bd = strtotime($row->FECHA_EXPIRACION);
			$nombre_user = trim($row->NOMBRE);
			if ($fecha_hoy <= $fecha_bd) {
				$array = array('estado' => 1, 'mensaje' => 'Datos correctos.');
			} else {
				$array = array('estado' => 0, 'mensaje' => 'Su usuario ha caducado, contacte con el administrador.');
			}
		} else {
			$array = array('estado' => 0, 'mensaje' => 'Su usuario ha sido desactivado, contacte con el administrador.');
		}
		return $array;
	}


	public function getVerificarMenu($a_submenu_user)
	{
		$sentencia = "SELECT * FROM app_submenu_acceso WHERE USUARIO = '" . $a_submenu_user . "' AND ESTADO = 1";
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute();
		if ($resultado->rowCount()) {
			$array = array('estado' => 1, 'mensaje' => 'Datos correctos');
		} else {
			$array = array('estado' => 0, 'mensaje' => 'No tiene permisos suficientes para poder utilizar esta opción.');
		}
		return $array;
	}
}
