<?php

class Databasessqlserver extends PDO{
	public $_paginacion = array();
	public function __construct() {
	 
		$dsn = "dblib:host=192.168.0.10;dbname=sigsalud;";

		 

    	// $dsn =  DB_ENGINE_SQLSERVER .':host='. DB_HOST_SQLSERVER .';dbname='.DB_NAME_SQLSERVER;

        // parent::__construct($dsn,DB_USER_SQLSERVER, DB_PASS_SQLSERVER);

		parent::__construct($dsn,"sa", "S0p0rt3ch@");

		parent::setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

		 
    }


 
}
?>
 