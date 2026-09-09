<?php
class registrosModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }


    public
    function getListadoPersonal_rrhh( usuario_web $u ) {
        $sentencia = "SELECT IDPERSONAL, PLAZA, NRO_CONTRATO, NRO_PROCESO, APELLIDOSNOMBRES, FECHANACIMIENTO, DNI, RUC, CARGO, SERVICIO, 
FECHAINGRESO, case when FECHAINGRESO >= convert(datetime, '2016-01-01',101) then convert(varchar(10), FECHAINGRESO, 103)  else '' end as FECHA_INGRESO,
 FECHATERMINOCONTRATO, case when  FECHATERMINOCONTRATO >= convert(datetime, '2016-01-01',101) then convert(varchar(10),  FECHATERMINOCONTRATO, 103)  else '' end as  FECHA_TERMINOCONTRATO,
FECHAULTIMORETIRO, case when  FECHAULTIMORETIRO >= convert(datetime, '2016-01-01',101) then convert(varchar(10),  FECHAULTIMORETIRO, 103)  else '' end as  FECHA_ULTIMORETIRO,
SUELDOACTUAL,  DIRECCION_DESCRIPCION, ESTADO, TIPO_PERSONAL  FROM  [HEVES_RRHH].[dbo].[PERSONAL]  where apellidosnombres like ? or dni like ?  or cargo like ? ORDER BY APELLIDOSNOMBRES";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute( array( '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%', '%' . utf8_decode( $u->getNombres() ) . '%'  ) );
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array( 
                    'estado_respuesta' => 1,
                    'idpersonal' => $imprimir->IDPERSONAL,
                    'plaza' => trim( $imprimir->PLAZA ),
                    'nro_contrato' => trim( $imprimir->NRO_CONTRATO ),
                    'nro_proceso' => trim( $imprimir->NRO_PROCESO ),
                    'dni' => trim( $imprimir->DNI ),
                    'ruc' => trim( $imprimir->RUC ),
                    'apellidosnombres' => utf8_encode( trim( $imprimir->APELLIDOSNOMBRES ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO) ),
                    'servicio' => utf8_encode( trim( $imprimir->SERVICIO ) ),
                    'fechaingreso' => utf8_encode(trim( $imprimir->FECHA_INGRESO  ) ),
                    'fechatermino' => utf8_encode( trim( $imprimir->FECHA_TERMINOCONTRATO)  ),
                    'fechaultimoretiro' => utf8_encode(trim( $imprimir->FECHA_ULTIMORETIRO)  ),
                    'direccion'  => utf8_encode( trim( $imprimir->DIRECCION_DESCRIPCION ) ),
                    'tipo_personal' => utf8_encode( trim( $imprimir->TIPO_PERSONAL ) ),
                    'sueldo' => utf8_encode( trim( $imprimir->SUELDOACTUAL) ),
                    'estado' => trim( $imprimir->ESTADO ) );

            }
        } else {
            
            $array[] = array( 'estado_respuesta' => 0, 'mensaje' => 'No se encontro personal buscado' );
      
            
        }
        return json_encode( $array );
    }




}
?>