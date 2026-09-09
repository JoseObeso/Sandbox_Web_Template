<?php

class modulosModel extends Model {

	public function __construct() {
		parent::__construct();
	}

	public function get_acceso_modulo_1(usuario_web $u) {
		$query = "EXEC SP_GET_ACCESO_MODULO :dni";
		$prepare = $this->_db->prepare($query);
		$prepare->bindValue(':dni', $u->getDni());
		$prepare->execute();
		$array = $prepare->fetchAll();
		return $array;
	}

	public function CambiarMiClave(usuario_web $uw) {
		$query = "EXEC SP_CAMBIAR_CLAVE_USUARIO_WEB ?,?,?";
		$prepare = $this->_db->prepare($query);
		$prepare->execute(array($uw->getDni(),$uw->getClave(),$uw->getNueva_clave()));
		$imprimir = $prepare->fetchAll(PDO::FETCH_ASSOC);
		$array = array('estado_respuesta' => $imprimir[0]["ESTADO"], 'mensaje' => $imprimir[0]["MENSAJE"]);
		return json_encode($array);
	}

}