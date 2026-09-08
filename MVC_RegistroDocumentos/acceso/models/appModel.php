<?php

class appModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}



	public function get_acceso_app($user)
	{
		$query = "SELECT * FROM  app_permisos WHERE USUARIO = '" . $user . "' AND ESTADO = 1 order by ID_APP_PERMISOS;";
		$prepare = $this->_db->prepare($query);
		$prepare->execute();
		$array = $prepare->fetchAll();
		return $array;
	}
}
