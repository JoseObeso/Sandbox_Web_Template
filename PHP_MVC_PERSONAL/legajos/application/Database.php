<?php

class Database extends PDO {

    public
    function __construct() {

        parent::__construct( DSN_W );
        parent::setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );


    }



}
?>