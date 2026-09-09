<?php

class verificarModel extends Model {

    public
    function __construct() {
        parent::__construct();
    }

    public
    function getVerificarUsuario( usuario_web $u ) {
        $query = "EXEC SP_GET_USUARIO_WEB ?, ?";
        $result = $this->_db->prepare( $query );
        $result->execute( array( $u->getDni(), $u->getClave() ) );
        $result->execute();
        if ( $result->rowCount() ) {
            $row = $result->fetch( PDO::FETCH_OBJ );
            if ( $u->getClave() == $row->CLAVE || $row->CLAVE == $row->CLAVE2 ) {
                $fecha_hoy = strtotime( date( 'Y-m-d' ) );
                $fecha_bd = strtotime( $row->FECHA_EXPIRACION );
                if ( $fecha_hoy <= $fecha_bd ) {
                    if ( $row->ESTADO == 1 ) {
                        $query = "update [HEVES_RRHH].[dbo].[USUARIO_WEB] set sesion=1 where dni=?";
                        $result = $this->_db->prepare( $query );
                        $result->execute( array( $u->getDni() ) );
                        
                        $datos = array( 'dni' => $row->DNI,
                                       'nombres' => utf8_encode($row->NOMBRES), 
                                       'nombre' => utf8_encode($row->USU_NOMBRE),
                                       'cargo' => utf8_encode($row->CARGO),
                                       'foto' => $row->FOTO,
                                       'sexo' => $row->SEXO,
                                       'sesion' => $row->SESION );
                        
                        $_SESSION[ "usuario" ] = $datos;
                        $array = array( 'estado' => 1, 'mensaje' => 'Datos correctos, espere un momento.' );
                        return json_encode( $array );

                    } else {
                        $array = array( 'estado' => 0, 'mensaje' => 'Su cuenta ha sido desactivado.' );
                        return json_encode( $array );
                    }
                } else {
                    $array = array( 'estado' => 0, 'mensaje' => 'Su cuenta ha expirado.' );
                    return json_encode( $array );
                }
            } else {

                $array = array( 'estado' => 0, 'mensaje' => 'Usuario o Contraseña incorrecta.' );
                return json_encode( $array );
            }
        } else {
            $array = array( 'estado' => 0, 'mensaje' => 'Usted no esta registrado.' );
            return json_encode( $array );
        }

    }



    function setCerrarSession() {
        $dni_cerrar = $_SESSION[ "usuario" ][ "dni" ];
        $sentencia = "update [HEVES_RRHH].[dbo].[USUARIO_WEB] set SESION=0, fech_ult_ingreso=getdate() where dni=" . $dni_cerrar;
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado ) {
            $array = array( 'estado' => 1, 'mensaje' => 'Cierre de sesion conforme' );
            session_destroy();
        } else {
            $array = array( 'estado' => 0, 'mensaje' => 'error al cerrar la sesion.' );
        }
        return json_encode( $array );
    }







}