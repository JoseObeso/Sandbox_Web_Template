<?php
class soporteModel extends Model {
    public

    function __construct() {
        parent::__construct();
    }




    public

    function grabar_soporte( $dni, $nombre_usuario, $problema ) {
        $sql_insert = "INSERT INTO [HEVES_RRHH].[dbo].[T_SOPORTE_TECNICO](DNI, APELLIDOS_NOMBRES, UNIDAD, CORREO, PROBLEMA, FECHAREGISTRO)
             VALUES ('" . $dni . "', '" . $nombre_usuario . "', '', '', upper('" . $problema . "'), getdate())";
        $ejecucion = $this->_db->prepare( $sql_insert );
        $ejecucion->execute();
        $verificar = array( 'verificar' => 1 );
        return json_encode( $verificar );


    }







}
?>