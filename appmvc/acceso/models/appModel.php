<?php

class appModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}



	public function get_acceso_app($user)
	{

		$query = "select * from  usuarios_app where vapp_user = '" . $user . "'  order by vapp_nombre ";
		$prepare = $this->_db->prepare($query);
		$prepare->execute();
		$array = $prepare->fetchAll();
		return $array;
	}
}
