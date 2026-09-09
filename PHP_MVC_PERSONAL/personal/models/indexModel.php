<?php


class indexModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public
    function getUpdateTempus() {
        $instruccion_sql = 'EXEC [dbo].[SP_ACTUALIZAR_DESDE_TEMPUS]';
        $resultado = $this->_db->prepare( $instruccion_sql );
        $resultado->execute();
        $array = array( 'estado' => 1 );
        return json_encode( $array );
    }

}
?>