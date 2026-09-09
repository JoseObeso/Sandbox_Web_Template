<?php

class impresion_formato2 extends FPDF {
    function Header() {
        $this->Image( RUTA_PUBLIC_GRA . 'banerheves.jpg', 10, 8, 90 );
        $this->SetFont( 'Arial', 'B', 8 );
        $this->SetXY( 165, 8 );
        $this->Cell( 15, 7, '   FECHA: ' );
        $this->SetXY( 180, 8 );
        $this->Cell( 15, 7, date( "d/m/Y" ) );

        $this->SetXY( 165, 12 );
        $this->Cell( 15, 7, '   HORA :' );
        $this->SetXY( 180, 12 );
        $this->Cell( 15, 7, date( "H:i:s" ) );

        $this->SetXY( 165, 16 );
        $this->Cell( 15, 7, 'USUARIO: ' );

        $this->SetXY( 180, 16 );
        $this->Cell( 15, 7, $_SESSION[ "usuario" ][ "dni" ] );
        $this->Ln( 25 );

        $this->SetXY( 55, 25 );
        $this->Cell( 15, 7, 'REPORTE DE ASISTENCIA : ' . $GLOBALS[ 'nombre_personal_imprimir' ] );
        $this->SetXY( 75, 30 );
        $this->Cell( 15, 7, $GLOBALS[ 'cargo_personal_imprimir' ] );
        $this->SetXY( 65, 35 );
        $this->Cell( 45, 7, 'ENTRADAS / SALIDAS AL MES DE ' . $GLOBALS[ 'mes_seleccion_imprimir' ] . utf8_decode( ' DEL AÑO ' ) . $GLOBALS[ 'anio_seleccion_imprimir' ] );
        $this->Line( 15, 42, 180, 42 );

        $this->SetXY( 60, 41 );
        $this->Cell( 32, 7, 'NRO', 0, 0, 'L' );

        
        $this->SetXY( 75, 41 );
        $this->Cell( 32, 7, 'FECHA', 0, 0, 'L' );

        $this->SetXY( 95, 41 );
        $this->Cell( 32, 7, 'DIA', 0, 0, 'L' );

        $this->SetXY( 127, 41 );
        $this->Cell( 32, 7, 'ENTRADA', 0, 0, 'L' );

        
        
        $this->SetXY( 152, 41 );
        $this->Cell( 32, 7, 'SALIDA', 0, 0, 'L' );
        $this->Line( 15, 46, 180, 46 );

        $this->Ln( 6 );

    }

    // Pie de página
    function Footer() {
        $this->Line( 10, 275, 200, 275 );
        $this->SetY( -20 );
        $this->SetFont( 'Arial', '', 8 );
        $this->Cell( 0, 10, 'Pag. :  ' . $this->PageNo() . '/{nb}', 0, 0, 'C' );
    }


    function datosHorizontal( $datos ) {
        $this->SetXY( 45, 46 );
        $this->SetFont( 'Arial', '', 9 );
        $this->SetLeftMargin( 45 );
        foreach ( $datos as $fila ) {
            $this->Cell( 24, 5, utf8_decode( $fila[ 'nro' ] ), 0, 0, 'R' );
            $this->Cell( 24, 5, utf8_decode( $fila[ 'fecha' ] ), 0, 0, 'R' );
            $this->Cell( 24, 5, utf8_decode( $fila[ 'dia' ] ), 0, 0, 'L' );
            $this->Cell( 24, 5, utf8_decode( $fila[ 'ingreso' ] ), 0, 0, 'R' );
            $this->Cell( 25, 5, utf8_decode( $fila[ 'salida' ] ), 0, 0, 'R' );
            $this->Ln( 4 );
        }

    }


    function tablaHorizontal( $datosHorizontal ) {
        $this->datosHorizontal( $datosHorizontal );
    }

}
?>