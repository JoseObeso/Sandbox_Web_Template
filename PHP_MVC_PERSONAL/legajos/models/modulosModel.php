<?php
class modulosModel extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function ListarModulos(usuario_web $u)
	{
        $sentencia = "select * from [HEVES_RRHH].[dbo].[ACCESO_MODULO] where dni=? and estado=1 order by id_am"; 
		$resultado = $this->_db->prepare($sentencia);
		$resultado->execute(array($u->getDni()));
		if($resultado->rowCount()){
			while($imprimir = $resultado->fetch(PDO::FETCH_OBJ)){
				$array[] = array('estado_respuesta' => 1, 'id_am' => $imprimir->ID_AM, 'nombre' => $imprimir->NOMBRE, 'url' => $imprimir->URL, 'imagen' => $imprimir->IMAGEN, 'archivo_manual' => $imprimir -> MANUAL);
			}
		}else{
			$array[] = array('estado_respuesta' => 0, 'mensaje' => 'Usted no tiene permisos para ningun modulo.');
		}
		return json_encode($array);
	}
}
?>