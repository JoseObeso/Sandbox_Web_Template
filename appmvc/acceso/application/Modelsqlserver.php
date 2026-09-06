<?php
 
class Modelsqlserver {
	protected $_dbssqlserver;
	protected $_dblab;
	public function __construct() {
		$this->_dbssqlserver = new Databasessqlserver();
	}

}