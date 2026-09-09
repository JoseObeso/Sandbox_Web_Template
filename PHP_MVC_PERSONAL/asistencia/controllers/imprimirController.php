<?php

class imprimirController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {

        } else {
            header( 'location: /' );
        }
    }


    public

    function index() {
        $this->_view->titulo = '';
        $this->_view->renderizar( 'index' );
    }


    public

    function imprimir_asistencia_reporte() {
        $destino_pdf = $_GET[ 'destino' ];
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'nombre_personal_imprimir' ] = utf8_decode( $_GET[ 'nombre' ] );
        $GLOBALS[ 'cargo_personal_imprimir' ] = utf8_decode( $_GET[ 'cargo' ] );
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionMarcacionesF1.php' );
        $pdf = new impresion_formato1();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $nombre_personal_archivo = 'MARCACIONES_' . $GLOBALS[ 'nombre_personal_imprimir' ] . '_' . $mes_seleccion . '_' . $anio . '.PDF';
        $codigo = $_GET[ 'codigo' ];
        $cargo_personal = $_GET[ 'cargo' ];
        $datos_marcaciones1 = $this->loadModel( 'asistencia' );
        $datos_marcaciones1_mostrar = $datos_marcaciones1->getListadoMarcacionesReporte( $codigo, $mes, $anio );
        $pdf->tablaHorizontal( $datos_marcaciones1_mostrar );

        switch ( $destino_pdf ) {
            case 1:
                $pdf->Output( $nombre_personal_archivo, "D" );
                break;
            case 2:
                $pdf->Output();
                break;
            case 0:
                break;
        }


    }


    public

    function imprimir_asistencia_reporte_entrada_salida_administrativo() {
        $destino_pdf = $_GET[ 'destino' ];
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'nombre_personal_imprimir' ] = utf8_decode( $_GET[ 'nombre' ] );
        $GLOBALS[ 'cargo_personal_imprimir' ] = utf8_decode( $_GET[ 'cargo' ] );
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionMarcacionesF2.php' );
        $pdf = new impresion_formato2();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $nombre_personal_archivo = 'ENTRADA_SALIDA_' . $GLOBALS[ 'nombre_personal_imprimir' ] . '_' . $mes_seleccion . '_' . $anio . '.PDF';
        $codigo = $_GET[ 'codigo' ];
        $cargo_personal = $_GET[ 'cargo' ];

        $datos_marcaciones2 = $this->loadModel( 'asistencia' );
        $datos_marcaciones2_mostrar = $datos_marcaciones2->getListadoMarcacionesSegundoAdmin_sin_json( $codigo, $mes, $anio );

        $pdf->tablaHorizontal( $datos_marcaciones2_mostrar );

        switch ( $destino_pdf ) {
            case 1:
                $pdf->Output( $nombre_personal_archivo, "D" );
                break;
            case 2:
                $pdf->Output( 'IMPRESION_ENTRADA_SALIDA.PDF', 'I' );
                break;
            case 0:
                break;
        }


    }


    public

    function imprimir_asistencia_reporte_entrada_salida_administrativo_v02() {
        $destino_pdf = $_GET[ 'destino' ];
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'nombre_personal_imprimir' ] = utf8_decode( $_GET[ 'nombre' ] );
        $GLOBALS[ 'cargo_personal_imprimir' ] = utf8_decode( $_GET[ 'cargo' ] );
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionMarcacionesF2_V02.php' );
        $pdf = new impresion_formato2();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $nombre_personal_archivo = 'ENTRADA_SALIDA_' . $GLOBALS[ 'nombre_personal_imprimir' ] . '_' . $mes_seleccion . '_' . $anio . '.PDF';
        $codigo = $_GET[ 'codigo' ];
        $cargo_personal = $_GET[ 'cargo' ];

        $datos_marcaciones2 = $this->loadModel( 'asistencia' );
        $datos_marcaciones2_mostrar = $datos_marcaciones2->getListadoMarcacionesSegundoAdmin_sin_json_v02( $codigo, $mes, $anio );

        $pdf->tablaHorizontal( $datos_marcaciones2_mostrar );

        switch ( $destino_pdf ) {
            case 1:
                $pdf->Output( $nombre_personal_archivo, "D" );
                break;
            case 2:
                $pdf->Output( 'IMPRESION_ENTRADA_SALIDA.PDF', 'I' );
                break;
            case 0:
                break;
        }


    }







    public

    function imprimir_asistencia_reporte_entrada_salida_asistencial() {
        $destino_pdf = $_GET[ 'destino' ];
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'nombre_personal_imprimir' ] = utf8_decode( $_GET[ 'nombre' ] );
        $GLOBALS[ 'cargo_personal_imprimir' ] = utf8_decode( $_GET[ 'cargo' ] );
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionMarcacionesF2.php' );
        $pdf = new impresion_formato2();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $nombre_personal_archivo = 'ENTRADA_SALIDA_' . $GLOBALS[ 'nombre_personal_imprimir' ] . '_' . $mes_seleccion . '_' . $anio . '.PDF';
        $codigo = $_GET[ 'codigo' ];
        $cargo_personal = $_GET[ 'cargo' ];

        $datos_marcaciones2 = $this->loadModel( 'asistencia' );
        $datos_marcaciones2_mostrar = $datos_marcaciones2->getListadoMarcacionesAsistencial_sin_json( $codigo, $mes, $anio );

        $pdf->tablaHorizontal( $datos_marcaciones2_mostrar );

        switch ( $destino_pdf ) {
            case 1:
                $pdf->Output( $nombre_personal_archivo, "D" );
                break;
            case 2:
                $pdf->Output( 'IMPRESION_ENTRADA_SALIDA.PDF', 'I' );
                break;
            case 0:
                break;
        }


    }



    public

    function imprimir_asistencia_reporte_entrada_salida_asistencial_v02() {
        $destino_pdf = $_GET[ 'destino' ];
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'nombre_personal_imprimir' ] = utf8_decode( $_GET[ 'nombre' ] );
        $GLOBALS[ 'cargo_personal_imprimir' ] = utf8_decode( $_GET[ 'cargo' ] );
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionMarcacionesF3.php' );
        $pdf = new impresion_formato2();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $nombre_personal_archivo = 'ENTRADA_SALIDA_' . $GLOBALS[ 'nombre_personal_imprimir' ] . '_' . $mes_seleccion . '_' . $anio . '.PDF';
        $codigo = $_GET[ 'codigo' ];
        $cargo_personal = $_GET[ 'cargo' ];

        $datos_marcaciones2 = $this->loadModel( 'asistencia' );
        $datos_marcaciones2_mostrar = $datos_marcaciones2->getListadoMarcacionesAsistencial_sin_json_v02( $codigo, $mes, $anio );

        $pdf->tablaHorizontal( $datos_marcaciones2_mostrar );

        switch ( $destino_pdf ) {
            case 1:
                $pdf->Output( $nombre_personal_archivo, "D" );
                break;
            case 2:
                $pdf->Output( 'IMPRESION_ENTRADA_SALIDA.PDF', 'I' );
                break;
            case 0:
                break;
        }


    }



    public

    function imprimir_reporte_personal_seleccionado() {
        require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
        $mes = $_GET[ 'mes' ];
        $anio = $_GET[ 'anio' ];
        $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
        $mes_seleccion = $nombre_meses[ $mes - 1 ];
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        require( 'req/impresionseleccionpersonal.php' );
        $pdf = new impresion_seleccion();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $datos_personal = $this->loadModel( 'asistencia' );
        $datos_personal_imprimir = $datos_personal->getListadoPersonal_sin_json( $mes, $anio );
        $pdf->datos_en_fila( $datos_personal_imprimir );
        $pdf->Output( 'IMPRESION_PERSONAL.PDF', 'I' );



    }


    public
    function imprimir_reporte_descuentos() {
         require( RUTA_PUBLIC_LIB . '/fpdf/fpdf.php' );
         $mes = $_GET[ 'mes'];
         $anio = $_GET[ 'anio' ];
         $tipo = $_GET[ 'tipo' ];
         $nombre_meses = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE" ];
         $mes_seleccion = $nombre_meses[ $mes - 1 ];
        /* agregado */
        require( 'req/impresiondescuentos.php');
        $GLOBALS[ 'mes_seleccion_imprimir' ] = $mes_seleccion;
        $GLOBALS[ 'anio_seleccion_imprimir' ] = $_GET[ 'anio' ];
        $pdf = new impresion_descuento();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $datos_personal_descuento = $this->loadModel( 'asistencia' );
        $datos_personal_imprimir = $datos_personal_descuento->getListadoPersonalDescuento_sin_json( $mes, $anio, $tipo );
        $pdf->datos_en_fila( $datos_personal_imprimir );
        $pdf->Output( 'IMPRESION_PERSONAL.PDF', 'I' );
        /* fin de agregado */
    }
    
    
    public function imprimir_listado_no_marcan()
    {
       
		// Definimos el archivo exportado
		$arquivo = 'archivos-no-marcan.xls';
		
		// Crear la tabla HTML
		$html = '';
		$html .= '<table border="1">';
		$html .= '<tr>';
		$html .= '<td colspan="5">Registro de Personas que no Marcan </tr>';
		$html .= '</tr>';
		
		$html .= '<tr>';
		$html .= '<td><b>NRO</b></td>';
        $html .= '<td><b>DNI</b></td>';
		$html .= '<td><b>Apellidos y Nombres</b></td>';
		$html .= '<td><b>Ingreso</b></td>';
		$html .= '<td><b>Cargo</b></td>';
        $html .= '<td><b>Estado</b></td>';
        $html .= '<td><b>Ultima Marcacion</b></td>';
		$html .= '<td><b>Marcacion Posterior</b></td>';
		$html .= '</tr>';
        $style='mso-number-format:"@";';
		
		//Seleccionar todos los elementos de la tabla
        $datos_para_mostrar_excel = $this->loadModel( 'asistencia' );
        $datos_no_marcan_excel = $datos_para_mostrar_excel->VerListadoNoMarcan();
        foreach($datos_no_marcan_excel as $ver => $final):
			$html .= '<tr>';
			$html .= '<td>'. $final['nro'].'</td>';
            $html .= "<td style='".$style."'>" . $final['dni'] . "</td>";
            $html .= '<td>'. utf8_decode($final['apellidos_nombres']).'</td>';
            $html .= '<td>'. $final['fecha_de_ingreso'].'</td>';        
            $html .= '<td>'. utf8_decode($final['cargo']).'</td>';
            $html .= '<td>'. $final['estado'].'</td>';
            $html .= '<td>'. $final['fecha_ultima_marcacion'].'</td>';
            $html .= '<td>'. $final['hora_ultima_marcacion'].'</td>';
			$html .= '</tr>';
        endforeach;
        
        
		// Configuración en la cabecera
		header ("Expires: Mon, 26 Jul 2500 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=\"{$arquivo}\"" );
		header ("Content-Description: PHP Generado Data" );
	 
		echo $html;
		exit;  
        
        
        
        
    }
    




}