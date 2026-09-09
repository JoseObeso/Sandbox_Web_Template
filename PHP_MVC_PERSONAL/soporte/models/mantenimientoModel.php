<?php


class mantenimientoModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    public

    function CambiarMiClave( usuario_web $uw ) {
        $sentencia = "EXEC SP_CAMBIAR_CLAVE_USUARIO_WEB ?,?,?";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( $uw->getDni(), $uw->getClave(), $uw->getNueva_clave() ) );
        $imprimir = $resultado->fetchAll( PDO::FETCH_ASSOC );
        $array = array( 'estado_respuesta' => $imprimir[ 0 ][ "ESTADO" ], 'mensaje' => $imprimir[ 0 ][ "MENSAJE" ] );
        return json_encode( $array );
    }



}
?>