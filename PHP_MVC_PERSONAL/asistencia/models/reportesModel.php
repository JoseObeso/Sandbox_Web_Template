<?php


class reportesModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }


    public

    function ObtenerReporteMasivoAdministrativo( $mes, $anio ) {
        $read_sql = "exec [dbo].[SP_REPORTE_MASIVO_ADMINISTRATIVOS_ENTRADA_SALIDA_v02] " . $mes . ", " . $anio;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'dni' => $read_field->DNI,
                    'apellidos_nombres' => utf8_encode( trim( $read_field->APELLIDOS_NOMBRES ) ),
                    'cargo' => utf8_encode( trim( $read_field->cargo ) ),
                    'fecha' => utf8_encode( trim( $read_field->FECHA ) ),
                    'nombre_dia' => utf8_encode( trim( $read_field->NOMBRE_DIA ) ),
                    'hingreso' => utf8_encode( trim( $read_field->HINGRESO ) ),
                    'hsalida' => utf8_encode( trim( $read_field->HSALIDA ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );


    }



    public
    function ObtenerReporteMasivoAsistencial( $mes, $anio ) {
        $read_sql = "exec SP_REPORTE_MASIVO_ASISTENCIAL_MARCACIONES  " . $mes . ", " . $anio;
        $ejecucion_read = $this->_db->prepare( $read_sql );
        $ejecucion_read->execute();
        if ( $ejecucion_read->rowCount() ) {
            while ( $read_field = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
                $datos_read[] = array(
                    'dni' => $read_field->DNI,
                    'apellidos_nombres' => utf8_encode( trim( $read_field->APELLIDOS_NOMBRES ) ),
                    'cargo' => utf8_encode( trim( $read_field->CARGO ) ),
                    'nombre_dia' => utf8_encode( trim( $read_field->NOMBRE_DIA ) ),
                    'fecha' => utf8_encode( trim( $read_field->FECHA_MOSTRAR ) ),
                    'hora' => utf8_encode( trim( $read_field->HORATXT ) ) );
            }
        } else {
            $datos_read[] = array( 'verificar' => '0' );
        }
        return json_encode( $datos_read );
    }
    
    
    
    
    
    
}
?>