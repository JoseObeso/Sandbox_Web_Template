<?php
 
class Model {

	protected $_db;
	protected $_dblab;

	public function __construct() {
		$this->_db = new Database();
	}

}