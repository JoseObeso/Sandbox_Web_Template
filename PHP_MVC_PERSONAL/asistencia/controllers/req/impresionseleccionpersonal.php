<?php

class impresion_seleccion extends FPDF {
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
        $this->Cell( 15, 7, 'REPORTE DE PERSONAL CON MAYOR FRECUENCIA DE MARCACIONES  ' );
        $this->SetXY( 75, 30 );
        $this->Cell( 45, 7, 'MES DE ' . $GLOBALS[ 'mes_seleccion_imprimir' ] . utf8_decode( ' DEL AÑO ' ) . $GLOBALS[ 'anio_seleccion_imprimir' ] );
        $this->Line( 13, 42, 205, 42 );

        $this->SetXY( 13, 41 );
        $this->Cell( 32, 7, 'NRO', 0, 0, 'L' );

        
        $this->SetXY( 23, 41 );
        $this->Cell( 32, 7, 'DNI', 0, 0, 'L' );


        
        $this->SetXY( 33, 41 );
        $this->Cell( 32, 7, 'APELLIDOS Y NOMBRES', 0, 0, 'L' );


        
        
        $this->SetXY( 90, 41 );
        $this->Cell( 32, 7, 'TIPO', 0, 0, 'L' );

        
        
        $this->SetXY( 111, 41 );
        $this->Cell( 32, 7, 'CARGO', 0, 0, 'L' );

        $this->SetXY( 162, 41 );
        $this->Cell( 32, 7, 'FECHA', 0, 0, 'L' );

        
        $this->SetXY( 177, 41 );
        $this->Cell( 32, 7, 'DIA', 0, 0, 'L' );
        

        
        $this->SetXY( 190, 41 );
        $this->Cell( 32, 7, 'MARCACION', 0, 0, 'L' );

        
        
        $this->Line( 13, 46, 205, 46 );

        $this->Ln( 6 );

    }

    // Pie de página
    function Footer() {
        $this->Line( 10, 275, 200, 275 );
        $this->SetY( -20 );
        $this->SetFont( 'Arial', '', 8 );
        $this->Cell( 0, 10, 'Pag. :  ' . $this->PageNo() . '/{nb}', 0, 0, 'C' );
    }


    function datos_en_fila( $datos ) {
        $this->SetXY( 3, 46 );
        $this->SetFont( 'Arial', '', 7 );
        $this->SetLeftMargin( 3 );
        foreach ( $datos as $fila ) {
            
            $this->Cell( 15, 5, utf8_decode( $fila[ 'nro' ] ), 0, 0, 'R' );
            $this->Cell( 15, 5, utf8_decode( $fila[ 'dni' ] ), 0, 0, 'R' );
            $this->Cell( 55, 5, utf8_decode( $fila[ 'apellidos_nombres' ] ), 0, 0, 'L' );
            $this->Cell( 23, 5, utf8_decode( $fila[ 'tipo_personal' ] ), 0, 0, 'L' );
            $this->Cell( 50, 5, utf8_decode( $fila[ 'cargo' ] ), 0, 0, 'L' );
            $this->Cell( 15, 5, utf8_decode( $fila[ 'fecha_marcacion' ] ), 0, 0, 'L' );
            $this->Cell( 18, 5, utf8_decode( $fila[ 'dia' ] ), 0, 0, 'L' );
            $this->Cell( 8, 5, utf8_decode( $fila[ 'marcacion' ] ), 0, 0, 'L' );
            
            
            $this->Ln( 4 );
            
        }

    }

    
    
        
        
    
    

    function tablaHorizontal( $datosHorizontal ) {
        $this->datosHorizontal( $datosHorizontal );
    }

}
?>