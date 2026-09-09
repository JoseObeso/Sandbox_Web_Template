<?php

ini_set('memory_limit', '-1'); 


class imprimirController extends Controller
{
	private $_pdf;
	private $html =
		   	'<html> 
		   	<head> 
		   	<meta http-equiv="content-type" content="image/png">
	   		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		   	<style>
		   	body{
		   		font-size: 14px;
		   	}
			.page {
				margin-top: 1.3em;
				margin-left: 0.6em;
			}
		   	.titulos{
			    background: #f3f3f3;
			    font-weight: bold;		    
			    color: #000;
			    font-size: 16px;
			    width: 100px;
			}
			.titulos2{
			    background: #f3f3f3;
			    font-weight: bold;		    
			    color: #000;
			    font-size: 16px;
			}
			#datos-personales-paciente{
			    border:1px solid #999;
			    margin-top:5px;
			    margin-bottom:15px;
			}
			#datos-personales-paciente .cuerpo > tr > td{
			    border:1px solid #999;
			    font-family: "Times New Roman", Times, serif;
			    font-size: 12px;
			    padding: 4px;
			}
			hr{
				color:#000;
				border:1px solid #000;
			}
			table {
			border-collapse: collapse;
			border-spacing: 0;
			}
			.sub-titulos{
				font-size:17px;
			}
			table.table{
				border-color: #d6d6d6;
			}
			table.table-bordered{
				border: 0px solid #e4e4e4;
			}
			table.table thead {
			display: table-header-group;
			vertical-align: middle;
			border-color: inherit;
			}
			th {
			text-align: left;
			}
			table.table	tbody {
			display: table-row-group;
			vertical-align: middle;
			border-color: inherit;
			}
			.emergencia-id{
				font-size:21px;
				text-align:right;
			}
			.profesional{
				font-size:13px;
				border-top: 1px solid #999;
				border-bottom: 1px solid #999;
				padding-left:5px;
			}
			h1.saltodepagina
			{
			PAGE-BREAK-AFTER: always
			}
			.rotar-letra{
				-webkit-transform: rotate(-90deg);
				-moz-transform: rotate(-90deg);
			}
			.diagnosticos tbody tr td{
				border:1px solid #999;
				padding:5px;
			}
			.border-tabla td{
				border:1px solid #999;
			}
			.border-tabla th{
				border:1px solid #999;
			}
		   	</style>	    
		   	</head>
		   	<body>		   		
		   	';
	public function __construct() {
		parent::__construct();
		session_start();
		if(isset($_SESSION["usuario"]["dni"]) && $_SESSION["usuario"]["dni"]!=''){
			
		}else{
			header('location: ../');
		}
	}

	public function index() {
		$this->_view->titulo = '';
		$this->_view->renderizar('index');
	}

	private function style_default($style = '') {
		$html = '<html>';
			$html .= '<head>';
				$html .= '<meta content="text/html; charset=utf-8"/>';
				$html .= '<style>';
					$html .= 'body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }
							.title { text-align: center; }		
							table { border-collapse: collapse; border-spacing: 0;width: 100%; }
							table td { border: 1px solid #000; padding: 2px 4px; }
							.text_center { text-align: center; }
							.text_right { text-align: right; }
							.text_left { text-align: left; }
							th.th_line_right,
							td.td_line_right { border-right: 1px solid #000; }
							th.th_line_right_bottom,
							td.td_line_right_bottom { border-right: 1px solid #000; border-bottom: 1px solid #000; }
							th.th_line_bottom,
							td.td_line_bottom { border-bottom: 1px solid #000; }';
					$html .= $style;
				$html .= '</style>';
			$html .= '</head>';
			$html .= '<body>';
		return $html;
	}

	public function procedimientos_dia() {
		$_GET['fecha'] = !empty($_GET['fecha']) ? $_GET['fecha'] : date('d/m/Y');
		$_GET['turno'] = !empty($_GET['turno']) ? $_GET['turno'] : '';
		$array = array('D' => 'Diurno <br> 07:30 AM a 19:30 PM', 'G' => 'Noche <br> 19:30 PM a 07:30 AM');

		if(!empty($_GET['fecha']) && isset($_GET['turno'])) {
			$style = '	.tbl_procedimientos_otras_atenciones { font-size: 11px; }';

			$html = $this->style_default($style);
					$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
					$html .= '<h2 class="title">';
						$html .= 'Procedimientos de Enfermería del día ' . $_GET['fecha'];
						if(!empty($_GET['turno']) && array_key_exists($_GET['turno'], $array)) {
							$html .= ' - Turno: ' . $array[$_GET['turno']];
						} else {
							$html .= ' / 00:00 AM a 23:59 PM';
						}
					$html .= '</h2>';

					$html .= '<table class="tbl_procedimientos_otras_atenciones">';
						$html .= '<tr>';
							$html .= '<td><b>N°</b></td>';
							$html .= '<td><b>Fecha</b></td>';
							$html .= '<td><b>Hora</b></td>';
							$html .= '<td><b>Nombres</b></td>';
							$html .= '<td><b>Edad</b></td>';
							$html .= '<td><b>Seguro</b></td>';
							$html .= '<td><b>N° de Boleta</b></td>';
							$html .= '<td><b>Procedimiento</b></td>';
							$html .= '<td><b>Tratamiento</b></td>';
							$html .= '<td><b>Zona Aplicación</b></td>';
							$html .= '<td><b>Profesional</b></td>';
						$html .= '</tr>';
						$EmergenciaProcWeb = $this->loadModel('EmergenciaProcWeb');
						$EmergenciaProcWeb = $EmergenciaProcWeb->get_emergencia_proc_web_9(array('fecha' => $_GET['fecha'], 'turno' => $_GET['turno']));

						$i = 0;
						foreach($EmergenciaProcWeb as $k) {
							$html .= '<tr>';
								$html .= '<td>' . ++$i . '</td>';
								$html .= '<td>' . $k['fecha'] . '</td>';
								$html .= '<td>' . $k['hora'] . '</td>';
								$html .= '<td>' . utf8_encode($k['nombres']) . '</td>';
								$html .= '<td>' . $k['edad'] . '</td>';
								$html .= '<td>' . $k['seguro'] . '</td>';
								$html .= '<td>' . $k['nro_ticket'] . '</td>';
								$html .= '<td>' . utf8_encode($k['procedimiento']) . '</td>';
								$html .= '<td>' . utf8_encode($k['tratamiento']) . '</td>';
								$html .= '<td>' . $k['zona_aplicacion'] . '</td>';
								$html .= '<td>' . utf8_encode($k['profesional']) . '</td>';
							$html .= '</tr>';
						}

					$html .= '</table>';

				$html .= '</body>';
			$html .= '</html>';

			$this->getLibrary('dompdf/dompdf_config.inc');
			$pdf = new DOMPDF();
			$pdf->set_paper('legal','landscape');
			$pdf->load_html(utf8_decode($html));
			$pdf->render();
			$pdf->get_canvas()->get_page_count();
			$pdf->stream('procedimientos_' . date('d_m_Y') . '.pdf', array('Attachment' => false));
		} else {
			$this->redireccionar('area_trabajo/otras_atenciones');
		}
	}

	public function reporte_procedimientos() {
		$_GET['fecha'] = !empty($_GET['fecha']) ? $_GET['fecha'] : date('d/m/Y');
		$_GET['fecha2'] = !empty($_GET['fecha2']) ? $_GET['fecha2'] : date('d/m/Y');		
		$_GET['turno'] = !empty($_GET['turno']) ? $_GET['turno'] : '';
			  
		 $array = array('D' => 'Diurno <br> 07:30 AM a 19:30 PM', 'G' => 'Noche <br> 19:30 PM a 07:30 AM');

		if(!empty($_GET['fecha']) && !empty($_GET['fecha2'])  && isset($_GET['turno'])) {
			$style = '	.tbl_reporte_procedimientos { margin: 0 auto; width:80%; }';

			$html = $this->style_default($style);
					$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
					$html .= '<h2 class="title">';
						$html .= 'Reporte de Procedimientos de Enfermería del día ' . $_GET['fecha'].' al '. $_GET['fecha2'];
						if(!empty($_GET['turno']) && array_key_exists($_GET['turno'], $array)) {
							$html .= ' - Turno: ' . $array[$_GET['turno']];
						} else {
							$html .= '<br> 00:00 AM a 23:59 PM';
						}
					$html .= '</h2>';

					$html .= '<table class="tbl_reporte_procedimientos">';
						$html .= '<tr>';
							$html .= '<td><b>N°</b></td>';
							$html .= '<td><b>Procedimiento</b></td>';
							$html .= '<td><b>Cantidad</b></td>';
						$html .= '</tr>';
						$EmergenciaProcWeb = $this->loadModel('EmergenciaProcWeb');
						$EmergenciaProcWeb = $EmergenciaProcWeb->get_emergencia_proc_web_8_2_fechas(array('fecha' => $_GET['fecha'], 'fecha2' => $_GET['fecha2'], 'turno' => $_GET['turno']));
						$i = 0;
						foreach($EmergenciaProcWeb as $k) {
							$html .= '<tr>';
								$html .= '<td>' . ++$i . '</td>';
								$html .= '<td>' . utf8_encode($k['Descripcion']) . '</td>';
								$html .= '<td class="text_right">' . $k['Cantidad'] . '</td>';
							$html .= '</tr>';
						}
					$html .= '</table>';
				$html .= '</body>';
			$html .= '</html>';
			$this->getLibrary('dompdf/dompdf_config.inc');
			$pdf = new DOMPDF();
			$pdf->load_html(utf8_decode($html));
			$pdf->render();
			$pdf->get_canvas()->get_page_count();
			$pdf->stream('reporte_procedimientos_' . date('d_m_Y') . '.pdf', array('Attachment' => false));
		} else {
			$this->redireccionar('reporte/procedimientos');
		}		
		
		 }
		 

	
	
		public function reporte_procedimientos_uci() {
		$_GET['fecha'] = !empty($_GET['fecha']) ? $_GET['fecha'] : date('d/m/Y');
		$_GET['fecha2'] = !empty($_GET['fecha2']) ? $_GET['fecha2'] : date('d/m/Y');		
		$_GET['turno'] = !empty($_GET['turno']) ? $_GET['turno'] : '';
			  
		 $array = array('D' => 'Diurno <br> 07:30 AM a 19:30 PM', 'G' => 'Noche <br> 19:30 PM a 07:30 AM');

		if(!empty($_GET['fecha']) && !empty($_GET['fecha2'])  && isset($_GET['turno'])) {
			$style = '	.tbl_reporte_procedimientos { margin: 0 auto; width:80%; }';

			$html = $this->style_default($style);
					$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
					$html .= '<h2 class="title">';
						$html .= 'Reporte de Procedimientos UCI de Enfermería del día ' . $_GET['fecha'].' al '. $_GET['fecha2'];
						if(!empty($_GET['turno']) && array_key_exists($_GET['turno'], $array)) {
							$html .= ' - Turno: ' . $array[$_GET['turno']];
						} else {
							$html .= '<br> 00:00 AM a 23:59 PM';
						}
					$html .= '</h2>';

					$html .= '<table class="tbl_reporte_procedimientos">';
						$html .= '<tr>';
							$html .= '<td><b>N°</b></td>';
							$html .= '<td><b>Procedimiento</b></td>';
							$html .= '<td><b>Cantidad</b></td>';
						$html .= '</tr>';
						$EmergenciaProcWeb = $this->loadModel('EmergenciaProcWeb');
						$EmergenciaProcWeb = $EmergenciaProcWeb->get_emergencia_proc_web_8_2_fechas_uci(array('fecha' => $_GET['fecha'], 'fecha2' => $_GET['fecha2'], 'turno' => $_GET['turno']));
						$i = 0;
						foreach($EmergenciaProcWeb as $k) {
							$html .= '<tr>';
								$html .= '<td>' . ++$i . '</td>';
								$html .= '<td>' . utf8_encode($k['Descripcion']) . '</td>';
								$html .= '<td class="text_right">' . $k['Cantidad'] . '</td>';
							$html .= '</tr>';
						}
					$html .= '</table>';
				$html .= '</body>';
			$html .= '</html>';
			$this->getLibrary('dompdf/dompdf_config.inc');
			$pdf = new DOMPDF();
			$pdf->load_html(utf8_decode($html));
			$pdf->render();
			$pdf->get_canvas()->get_page_count();
			$pdf->stream('reporte_procedimientos_uci_' . date('d_m_Y') . '.pdf', array('Attachment' => false));
		} else {
			$this->redireccionar('reporte/procedimientos_uci');
		}		
		
		 }
		 

	
	
	
		


	public function reporte_libro_emergencia() {
		ini_set('memory_limit', '-1');

		$header = array('# Orden', 'Fecha', 'Hora', 'Paciente', 'Genero', 'Prioridad', 'Seguro', 'Dirección', 'Acompañante', 'Ocupación', 'Motivo', 
						'Diagnóstico', 'Tipo DX', 'Atención', 'Tratamiento', 'Destino', 'Profesional', 'Firma', 'Observación');
		$header = array_map('utf8_decode', $header);
		$emergencia = $this->loadModel('emergencia');
		$data = $emergencia->get_emergencia_20(array('date_from' => $_POST['fecha_inicio'], 'date_to' => $_POST['fecha_fin']));
		$this->getLibrary('fpdf/mc_table');
		$pdf = new PDF_MC_Table('L', 'mm', 'A3');
		$pdf->AddPage();
		$pdf->SetFont('Arial','', 20);
		$pdf->Cell(425, 10,'Libro de Emergencia', 0, 1, 'C');
		$pdf->Ln();
		$pdf->SetFont('Arial','', 7);
		$width = array(15, 15, 10, 35, 14, 21, 25, 35, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21);
		$pdf->SetWidths($width);
    	$pdf->row($header);
		$pdf->SetWidths($width);
		foreach($data as $row) {
			$pdf->row($row);
		}
    	$pdf->Ln();
		$pdf->Output();
	}

	public function certificado_medico() {
		if(isset($_POST["emergencia_id_certificado"])):
			$e = $this->loadEntity('emergencia');
			$e->setEmergencia_id($_POST["emergencia_id_certificado"]);
			$this->_print = $this->loadModel('imprimir');		
			$resultado = $this->_print->setUtilizarHistoria($e);
			$imprimir = json_decode($resultado);
			$html = $this->html;
		   	$html.='
		   			<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo-top-hjatch.jpg">
		   			<hr>
		   			<h3 style="text-align:center;">CONSTANCIA DE ATENCION:</h3>
		   			El m&eacute;dico '.utf8_decode($_SESSION["nombres"]).' que suscribe
		   			<br><br>
		   			Deja constancia que, el paciente: '.$imprimir->nombres.' de '.$imprimir->edad.' de edad, ha sido atendido en el Servicio de Emergencia del Hospital "Jos&eacute; Agurto Tello" - Chosica el d&iacute;a '.$imprimir->fecha_aten.' a la hora '.$imprimir->hora_aten.'.
		   			<br><br>
		   			Historia Clinica N&deg;: '.$imprimir->historia.'
		   			<br><br>
		   			Presenta diagn&oacute;stico:
		   			<br><br>
		   			<table class="diagnosticos">
		   			<tbody>
		   			<tr>
		   			<td class="titulos2">#</td>
		   			<td class="titulos2">Nombre</td>
		   			<td class="titulos2">Ciex 10</td>
		   			</tr>
		   			<tr>
		   			<td>1</td>
		   			<td>'.utf8_decode($imprimir->nombre_diagnostico1).'</td>
		   			<td>'.$imprimir->ciex1.'</td>
		   			</tr>		   			
		   		';
		   			if($imprimir->ciex2!='' && $imprimir->ciex2!="0"):
						$html.='<tr>
					   			<td>1</td>
					   			<td>'.utf8_decode($imprimir->nombre_diagnostico2).'</td>
					   			<td>'.$imprimir->ciex2.'</td>
					   			</tr>';
					endif;
					if($imprimir->ciex3!='' && $imprimir->ciex3!="0"):
						$html.='<tr>
					   			<td>1</td>
					   			<td>'.utf8_decode($imprimir->nombre_diagnostico3).'</td>
					   			<td>'.$imprimir->ciex3.'</td>
					   			</tr>';
					endif;
		   	$html.='
		   			</tbody>
		   			</table>
		   			<br><br>
		   			Por lo que requiere descanso m&eacute;dico para el restablecimiento de su salud.
		   			Se expide el presente a solicitud del interesado(a) para los fines que crea conveniente.
		   			<br><br>
		   			Sin valor legal,
		   			<br><br><br><br><br><br>
		   			<table width="100%" border="0">
		   				<tr>
		   					<td>Fecha: '.date("d/m/Y").'</td>
		   					<td style="text-align:center;width:320px;">
		   					__________________________<br>
		   					Firma</td>
		   				</tr>
		   			</table>
	        ';
		   	$html.='		
					<script type="text/php">
			if (isset($pdf)) {
			    $footer = $pdf->open_object();
			    $w = $pdf->get_width();
			    $h = $pdf->get_height();
			    $font = Font_Metrics::get_font("helvetica", "normal");
			    $txtHeight = Font_Metrics::get_font_height($font, 8);
			    $y = $h - 2 * $txtHeight - 24;
			    $color = array(0, 0, 0);
			    $width = Font_Metrics::get_text_width($text, $font, 8);
			    $pdf->page_text($w - $width - 86, $y+4, "Pagina: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
			    $pdf->close_object();
			    $pdf->add_object($footer, "all");
			}
			  </script>
					</body>
					</html>';
			$this->getLibrary('dompdf/dompdf_config.inc');
			$this->_pdf = new DOMPDF();
			//$this->_pdf->set_paper('legal','landscape');
			$this->_pdf->load_html($html);
			$this->_pdf->render();
			$this->_pdf->get_canvas()->get_page_count();
			$this->_pdf->stream("factura.pdf",array("Attachment"=>false));
		else:
			$this->_view->renderizar('diario_clinico',false);
		endif;
	}
	public function balance_hidrico($emergencia_id)
	{
		$e = $this->loadEntity('emergencia');
		$e->setEmergencia_id($emergencia_id);
		$this->_print = $this->loadModel('imprimir');		
		$resultado = $this->_print->balance_hidrico($e);
		$listar_balance_hidrico=json_decode($resultado);
		$html = $this->html;
	   	$html.='
	   			<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo-top-hjatch.jpg">
	   			<hr>
	   			<h3 style="text-align:center;">BALANCE HIDRICO:</h3>	   			
	   	';
	   	if($listar_balance_hidrico[0]->estado_respuesta==1):
	   	$html.='	
	   			<b>Paciente:</b> '.$listar_balance_hidrico[0]->nombre_paciente.'<br>
	   			<b>N&deg; Historia Emergencia:</b> '.$listar_balance_hidrico[0]->emergencia_id.'
	   			<table width="100%" id="datos-personales-paciente">
        		<tbody class="cuerpo">
        			<tr><td colspan="6"><b>Fecha:</b> '.date("d/m/Y",strtotime($listar_balance_hidrico[0]->fecha)).'</td></tr>
        			<tr>
        				<td class="titulos2" style="width:30px;">Turno</td>
        				<td class="titulos">Ingreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos">Egreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos2" style="width:50px;">BH Parcial</td>
        			</tr>        			
        ';
        	$primera_fecha = false;
        		foreach($listar_balance_hidrico as $imprimir):
        			$total_ingreso += $imprimir->subtotal_i;
        			$total_egreso += $imprimir->subtotal_e; 
        			$total_horas += intval($imprimir->nro_horas);
        			if($primera_fecha==false){
        				$primera_fecha = strtotime($imprimir->fecha);
        				//$primera_hora = intval(date('H',strtotime(trim($imprimir->hora))));
        			}
        			$fecha = strtotime($imprimir->fecha);		
        			$hora = intval(date('H',strtotime(trim($imprimir->hora))));
        			if($fecha>$primera_fecha && $hora>7){
        				$html.='</tbody></table>';
        				$html.='
	   			<h1 class="saltodepagina"></h1>
	   			<table width="100%" id="datos-personales-paciente">
        		<tbody class="cuerpo">
        			<tr><td colspan="6"><b>Fecha:</b> '.date("d/m/Y",strtotime($imprimir->fecha)).'</td></tr>
        			<tr>
        				<td class="titulos2" style="width:30px;">Turno</td>
        				<td class="titulos">Ingreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos">Egreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos2" style="width:50px;">BH Parcial</td>
        			</tr>        			
        ';
        			}
        	//$html.='<tr><td colspan="6"><b>Fecha:</b> '.date("d/m/Y",strtotime($imprimir->fecha)).'</td></tr>';
        	$html.='<tr>
        				<td rowspan="8" style="text-align:center !important;">';
        				$cadena=utf8_decode($imprimir->turno);
						$num=strlen($cadena);
						for($a=0; $a<=$num; $a++){
							$html.='<b>'.$cadena[$a]."</b><br>";
						}
        	$html.='	</td>
        				<td>Via Oral</td>
        				<td>'.$imprimir->via_oral.'</td>
        				<td>Diuresis</td>
        				<td>'.$imprimir->diuresis.'</td>
        				<td rowspan="7">N&deg; de Horas:<br>'.$imprimir->nro_horas.'</td>
        			</tr>
        			<tr>
        				<td>Parenteral</td>
        				<td>'.$imprimir->parenteral.'</td>
        				<td>Deposiciones</td>
        				<td>'.$imprimir->deposiciones.'</td>
        			</tr>
        			<tr>
        				<td>Tratamiento</td>
        				<td>'.$imprimir->tratamiento.'</td>
        				<td>Drenajes</td>
        				<td>'.$imprimir->drenajes.'</td>
        			</tr>
        			<tr>
        				<td>Transfusiones</td>
        				<td>'.$imprimir->transfusiones.'</td>
        				<td>Vomitos</td>
        				<td>'.$imprimir->vomitos.'</td>
        			</tr>
        			<tr>
        				<td>Infusiones</td>
        				<td>'.$imprimir->infusiones.'</td>
        				<td>Perd. Insens.</td>
        				<td>'.$imprimir->perd_insens.'</td>
        			</tr>
        			<tr>
        				<td>H2O Oxidaci&oacute;n:</td>
        				<td>'.$imprimir->h2o.'</td>
        				<td>Otros</td>
        				<td>'.$imprimir->otros_e.'</td>
        			</tr>
        			<tr>
        				<td>Otros</td>
        				<td>'.$imprimir->otros_i.'</td>
        				<td></td>
        				<td></td>
        			</tr>
        			<tr>
        				<td class="titulos">Sub Total:</td>
        				<td>'.$imprimir->subtotal_i.'</td>
        				<td class="titulos">Sub Total:</td>
        				<td>'.$imprimir->subtotal_e.'</td>
        				<td>'.$imprimir->bh_parcial.'</td>
        			</tr>
        		';
        		endforeach;
        		$bh_total = $total_ingreso - $total_egreso;
        		$html.='
        			<tr>
        				<td></td>
        				<td class="titulos">Total Ingreso:</td>
        				<td>'.$total_ingreso.'</td>
        				<td class="titulos">Total Egreso:</td>
        				<td>'.$total_egreso.'</td>
        				<td></td>
        			</tr>
        		';
        $html.='</tbody>
        		</table>';
        if($bh_total>0){
        	$descripcion_bh = "Positivo";
        }else{
        	$descripcion_bh = "Negativo";
        }
       	$html.='
       		<b>Balance Total:</b> '.$bh_total.'<br>
       		<b>Balance:</b> '.$descripcion_bh.' <br>
       		<b>N&deg; de Horas:</b> '.$total_horas.' Horas<br>
       		';
       	else:
       		$html .= '<b>'.$listar_balance_hidrico[0]->mensaje.'</b>';
       	endif;
	   	$html.='		
				<script type="text/php">
		if (isset($pdf)) {
		    $footer = $pdf->open_object();
		    $w = $pdf->get_width();
		    $h = $pdf->get_height();
		    $font = Font_Metrics::get_font("helvetica", "normal");
		    $txtHeight = Font_Metrics::get_font_height($font, 8);
		    $y = $h - 2 * $txtHeight - 24;
		    $color = array(0, 0, 0);
		    $width = Font_Metrics::get_text_width($text, $font, 8);
		    $pdf->page_text($w - $width - 86, $y+4, "Pagina: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
		    $pdf->close_object();
		    $pdf->add_object($footer, "all");
		}
		  </script>
				</body>
				</html>';
		$this->getLibrary('dompdf/dompdf_config.inc');
		$this->_pdf = new DOMPDF();
		//$this->_pdf->set_paper('legal','landscape');
		$this->_pdf->load_html($html);
		$this->_pdf->render();
		$this->_pdf->get_canvas()->get_page_count();
		$this->_pdf->stream("factura.pdf",array("Attachment"=>false));
	}
	public function balance_hidrico2($emergencia_id)
	{
		$e = $this->loadEntity('emergencia');
		$e->setEmergencia_id($emergencia_id);
		$this->_print = $this->loadModel('imprimir');		
		$resultado = $this->_print->balance_hidrico($e);
		$listar_balance_hidrico=json_decode($resultado);
		$html =
	   	'<html> 
	   	<head> 

	   	<style>
	   	.titulos{
		    background: #f3f3f3;
		    font-weight: bold;		    
		    color: #000;
		    font-size: 16px;
		    width: 100px;
		}
		.titulos2{
		    background: #f3f3f3;
		    font-weight: bold;		    
		    color: #000;
		    font-size: 16px;
		}
		#datos-personales-paciente{
		    border:1px solid #999;
		    margin-top:5px;
		    margin-bottom:15px;
		}
		#datos-personales-paciente .cuerpo > tr > td{
		    border:1px solid #999;
		    font-family: "Times New Roman", Times, serif;
		    font-size: 12px;
		    padding: 4px;
		}
		hr{
			color:#000;
			border:1px solid #000;
		}
		table {
		border-collapse: collapse;
		border-spacing: 0;
		}
		.sub-titulos{
			font-size:17px;
		}
		table.table{
			border-color: #d6d6d6;
		}
		table.table-bordered{
			border: 0px solid #e4e4e4;
		}
		table.table thead {
		display: table-header-group;
		vertical-align: middle;
		border-color: inherit;
		}
		th {
		text-align: left;
		}
		table.table	tbody {
		display: table-row-group;
		vertical-align: middle;
		border-color: inherit;
		}
		.emergencia-id{
			font-size:21px;
			text-align:right;
		}
		h1.saltodepagina
		{
		PAGE-BREAK-AFTER: always
		}
		.rotar-letra{
			-webkit-transform: rotate(-90deg);
			-moz-transform: rotate(-90deg);
		}
	   	</style>	    
	   	</head>
	   	<body>
	   		<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo-top-hjatch.jpg">
	   		<hr>
	   	';
	   	$html.='
	   			<h3 style="text-align:center;">BALANCE HIDRICO:</h3>
	   			<b>Paciente:</b> '.$listar_balance_hidrico[0]->nombre_paciente.'<br>
	   			<b>N&deg; Historia Emergencia:</b> '.$listar_balance_hidrico[0]->emergencia_id.'
	   			<table width="100%" id="datos-personales-paciente">
        		<tbody class="cuerpo">
        			<tr>
        				<td class="titulos2" style="width:30px;">Turno</td>
        				<td class="titulos">Ingreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos">Egreso</td>
        				<td class="titulos">Cantidad</td>
        				<td class="titulos2" style="width:50px;">BH Parcial</td>
        			</tr>
        ';
        		foreach($listar_balance_hidrico as $imprimir):
        			$total_ingreso += $imprimir->subtotal_i;
        			$total_egreso += $imprimir->subtotal_e; 
        			$total_horas += intval($imprimir->nro_horas);
        	$html.='<tr>
        				<td rowspan="8" style="text-align:center !important;">';
        				$cadena=utf8_decode($imprimir->turno);
						$num=strlen($cadena);
						for($a=0; $a<=$num; $a++){
							$html.='<b>'.$cadena[$a]."</b><br>";
						}
        	$html.='	</td>
        				<td>Via Oral</td>
        				<td>'.$imprimir->via_oral.'</td>
        				<td>Diuresis</td>
        				<td>'.$imprimir->diuresis.'</td>
        				<td rowspan="7">N&deg; de Horas:<br>'.$imprimir->nro_horas.'</td>
        			</tr>
        			<tr>
        				<td>Parenteral</td>
        				<td>'.$imprimir->parenteral.'</td>
        				<td>Deposiciones</td>
        				<td>'.$imprimir->deposiciones.'</td>
        			</tr>
        			<tr>
        				<td>Tratamiento</td>
        				<td>'.$imprimir->tratamiento.'</td>
        				<td>Drenajes</td>
        				<td>'.$imprimir->drenajes.'</td>
        			</tr>
        			<tr>
        				<td>Transfusiones</td>
        				<td>'.$imprimir->transfusiones.'</td>
        				<td>Vomitos</td>
        				<td>'.$imprimir->vomitos.'</td>
        			</tr>
        			<tr>
        				<td>Infusiones</td>
        				<td>'.$imprimir->infusiones.'</td>
        				<td>Perd. Insens.</td>
        				<td>'.$imprimir->perd_insens.'</td>
        			</tr>
        			<tr>
        				<td>H2O Oxidaci&oacute;n:</td>
        				<td>'.$imprimir->h2o.'</td>
        				<td>Otros</td>
        				<td>'.$imprimir->otros_e.'</td>
        			</tr>
        			<tr>
        				<td>Otros</td>
        				<td>'.$imprimir->otros_i.'</td>
        				<td></td>
        				<td></td>
        			</tr>
        			<tr>
        				<td class="titulos">Sub Total:</td>
        				<td>'.$imprimir->subtotal_i.'</td>
        				<td class="titulos">Sub Total:</td>
        				<td>'.$imprimir->subtotal_e.'</td>
        				<td>'.$imprimir->bh_parcial.'</td>
        			</tr>
        		';
        		endforeach;
        		$bh_total = $total_ingreso - $total_egreso;
        		$html.='
        			<tr>
        				<td></td>
        				<td class="titulos">Total Ingreso:</td>
        				<td>'.$total_ingreso.'</td>
        				<td class="titulos">Total Egreso:</td>
        				<td>'.$total_egreso.'</td>
        				<td></td>
        			</tr>
        		';
        $html.='</tbody>
        		</table>';
       	$html.='
       		<b>Balance Total:</b> '.$bh_total.'<br>
       		<b>N&deg; de Horas:</b> '.$total_horas.' Horas<br>
       		';
	   	$html.='		
				<script type="text/php">
		if (isset($pdf)) {
		    $footer = $pdf->open_object();
		    $w = $pdf->get_width();
		    $h = $pdf->get_height();
		    $font = Font_Metrics::get_font("helvetica", "normal");
		    $txtHeight = Font_Metrics::get_font_height($font, 8);
		    $y = $h - 2 * $txtHeight - 24;
		    $color = array(0, 0, 0);
		    $width = Font_Metrics::get_text_width($text, $font, 8);
		    $pdf->page_text($w - $width - 86, $y+4, "Pagina: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
		    $pdf->close_object();
		    $pdf->add_object($footer, "all");
		}
		  </script>
				</body>
				</html>';
		$this->getLibrary('dompdf/dompdf_config.inc');
		$this->_pdf = new DOMPDF();
		//$this->_pdf->set_paper('legal','landscape');
		$this->_pdf->load_html($html);
		$this->_pdf->render();
		$this->_pdf->get_canvas()->get_page_count();
		$this->_pdf->stream("factura.pdf",array("Attachment"=>false));
	}

	public function historia() {
		$emergencia = $this->loadModel('emergencia');
		$emergencia = $emergencia->get_emergencia_15(array('id_emergencia' => $_GET['id_emergencia']));
		if($emergencia != false) {

			$html = '<html>';
				$html .= '<head>';
					$html .= '<meta content="text/html; charset=utf-8"/>';
					$html .= '<style>';
						$html .= '
								body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }
								
								table { border-collapse: collapse; border-spacing: 0;width: 100%; }
								
								table td { border: 1px solid #000; padding: 2px 4px; }
								
								.tbl_dx_egreso th,
								.tbl_dx_ingreso th { border-bottom: 1px solid #000; }
								
								.tbl_dx_egreso td,
								.tbl_dx_ingreso td { border: 0; }
								
								.text_center { text-align: center; }

								th.th_line_right,
								td.td_line_right { border-right: 1px solid #000; }
								
								th.th_line_right_bottom,
								td.td_line_right_bottom { border-right: 1px solid #000; border-bottom: 1px solid #000; }
								
								th.th_line_bottom,
								td.td_line_bottom { border-bottom: 1px solid #000; }
								
								.title { text-align: center; }

								.title_diario { font-size: 28px; text-align: center; margin: 0; padding: 0; }
								.subtitle_diario { text-align: center; margin: 0; padding: 0; font-weight: normal;}

								.subtitle { display:block; font-size: 14px; padding-bottom: 10px; }
								
								.subtitle2 { display:block; font-size: 14px; padding: 15px 0; }

								.content_diario_clinico,
								.content_nota_enfermeria {
									margin: 30px 0 10px 0;
								}

								.content_diario_clinico_tipo,
								.content_nota_enfermeria_tipo {
									border: 1px solid #000;
									margin-bottom: 20px;
								}

								.content_diario_clinico_tipo .body span,
								.content_nota_enfermeria_tipo .body span {
									display:block;
									font-weight: bold;
									padding: 0 0 5px 0;
								}

								.content_diario_clinico_tipo .body,
								.content_nota_enfermeria_tipo .body {
									padding: 10px 5px;
								}

								.content_diario_clinico_tipo .footer,
								.content_nota_enfermeria_tipo .footer {
									background: #f1f1f1;
									border-top: 1px sol
									id #000;
									font-size: 11px;
									padding: 5px;
								}

								.tbl_funciones_vitales {
									padding:5px 20px;
								}

								.tbl_funciones_vitales thead td {
									font-weight: bold;
								}

								.list_antecedente_medico {
									padding: 0px 20px 5px 20px;
								}

								.tbl_nota_enfermeria_detalle_procedimiento {
									padding: 15px 0;
									width: 500px;
								}

							';
					$html .= '</style>';
				$html .= '</head>';
				$html .= '<body>';

					$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
					$html .= '<h2 class="title"> Numero de Atencion en Emergencia : ' . $emergencia['id_emergencia'] . '</h2>';
					$html .= '<span class="subtitle">Datos del Paciente</span>';

					$html .= '<table>';
						$html .= '<tr>';
							$html .= '<td><b>Historia</b></td>';
							$html .= '<td>' . $emergencia['historia'] . '</td>';
							$html .= '<td><b>Seguro</b></td>';
							$html .= '<td>' . $emergencia['seguro'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Apellidos y Nombres</b></td>';
							$html .= '<td>' . utf8_encode($emergencia['nombres']) . '</td>';
							$html .= '<td><b>N° Orden</b></td>';
							$html .= '<td>' . $emergencia['orden'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Edad</b></td>';
							$html .= '<td>' . $emergencia['edad'] . '</td>';
							$html .= '<td><b>Fecha</b></td>';
							$html .= '<td>' . $emergencia['fecha'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Sexo</b></td>';
							$html .= '<td>' . $emergencia['sexo'] . '</td>';
							$html .= '<td><b>Hora</b></td>';
							$html .= '<td>' . $emergencia['hora'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>DNI</b></td>';
							$html .= '<td>' . $emergencia['dni'] . '</td>';
							$html .= '<td><b>Religión</b></td>';
							$html .= '<td>' . $emergencia['religion'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Consultorio</b></td>';
							$html .= '<td>' . $emergencia['consultorio'] . '</td>';
							$html .= '<td><b>Ocupación</b></td>';
							$html .= '<td>' . $emergencia['ocupacion'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Antecedentes</b></td>';
							$AntecedenteMedico = $this->loadModel('AntecedenteMedico');
							$AntecedenteMedico = $AntecedenteMedico->get_antecedente_medico_2(array('id_paciente' => $emergencia['paciente']));
							$html .= '<td colspan="3">';
								$html .= '<ul class="list_antecedente_medico">';
								foreach($AntecedenteMedico as $k) {	
									$html .= '<li>' . $k['descripcion'] . '</li>';
								}
								$html .= '</ul>';
							$html .= '</td>';
						$html .= '</tr>';
					$html .= '</table>';
					
					$html .= '<span class="subtitle2">Funciones Vitales de Ingreso (' . $emergencia['usuario_fn_vitales'] . ')</span>';
					
					$html .= '<table>';
						$html .= '<tr>';
							$html .= '<td><b>TEMP.</b></td>';
							$html .= '<td>' . $emergencia['temp'] . '</td>';
							$html .= '<td><b>PA</b></td>';
							$html .= '<td>' . $emergencia['pa'] . ' / ' . $emergencia['pad'] .  '</td>';
							$html .= '<td><b>FC</b></td>';
							$html .= '<td>' . $emergencia['fc'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>FR</b></td>';
							$html .= '<td>' . $emergencia['fr'] . '</td>';
							$html .= '<td><b>SAT. OX.</b></td>';
							$html .= '<td>' . $emergencia['sat_ox'] . '</td>';
							$html .= '<td><b>PESO</b></td>';
							$html .= '<td>' . $emergencia['peso'] . '</td>';
						$html .= '</tr>';
					$html .= '</table>';
					
					$html .= '<span class="subtitle2">Atención del Profesional Medico (' .nl2br(utf8_encode($emergencia['nombre_medico'])) . ')</span>';
					
					$html .= '<table border="1">';
						$html .= '<tr>';
							$html .= '<td width="80"><b>Hora</b></td>';
							$html .= '<td>' . $emergencia['hora_aten'] . '</td>';
							$html .= '<td><b>Fecha</b></td>';
							$html .= '<td>' . $emergencia['fecha_aten'] . '</td>';
							$html .= '<td><b>Prioridad</b></td>';
							$html .= '<td>' . $emergencia['prioridad'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Sintomas</b></td>';
							$html .= '<td colspan="5">' . nl2br(utf8_encode($emergencia['sintomas'])) . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Relato</b></td>';
							$html .= '<td colspan="5">' . nl2br(utf8_encode($emergencia['relato'])) . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Examen Físico</b></td>';
							$html .= '<td colspan="5">' . nl2br(utf8_encode($emergencia['examen_fisico'])) . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td colspan="6"><b>Diagnóstico de Ingreso</b></td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td colspan="6">';
								$html .= '<table class="tbl_dx_ingreso">';
									$html .= '<tr>';
										$html .= '<th class="th_line_right">#</th>';
										$html .= '<th class="th_line_right">Diagnóstico</th>';
										$html .= '<th class="th_line_right">CIEX</th>';
										$html .= '<th>Tipo DX</th>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right_bottom">1</td>';
										$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['nombre_diagnostico4']) . '</td>';
										$html .= '<td class="td_line_right_bottom">' . $emergencia['ciex4'] . '</td>';
										$html .= '<td class="td_line_bottom" align="center">' . $emergencia['tipo_ciex4'] . '</td>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right_bottom">2</td>';
										$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['nombre_diagnostico5']) . '</td>';
										$html .= '<td class="td_line_right_bottom">' . $emergencia['ciex5'] . '</td>';
										$html .= '<td class="td_line_bottom" align="center">' . $emergencia['tipo_ciex5'] . '</td>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right">3</td>';
										$html .= '<td class="td_line_right">' . utf8_encode($emergencia['nombre_diagnostico6']) . '</td>';
										$html .= '<td class="td_line_right">' . $emergencia['ciex6'] . '</td>';
										$html .= '<td align="center">' . $emergencia['tipo_ciex6'] . '</td>';
									$html .= '</tr>';
								$html .= '</table>';
							$html .= '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Tratamiento</b></td>';
							$html .= '<td colspan="5">' . nl2br(utf8_encode($emergencia['tratamiento'])) . '</td>';
						$html .= '</tr>';
					$html .= '</table>';

					if ($emergencia['hora_aten'] <> '')
					  { 
					   if ($emergencia['medico1'] <> NULL or $emergencia['medico1'] <> '0')
					    {
						  $html .= '<center><img src="'.$_SERVER['DOCUMENT_ROOT'].'/perfil/firmas/'.utf8_encode(rtrim($emergencia['MEDICO1'])).'.JPG" width="150"></center>';
						};
					  };


                 if ($emergencia['PROCE_MED_1'] <> '0' or $emergencia['PROCE_MED_2'] <> '0' or $emergencia['PROCE_MED_3'] <>'0')
				   {

					$html .= '<span class="subtitle2">Procedimientos Medicos Realizados</span>';
					$html .= '<table>';
						$html .= '<tr>';
        						$html .= '<td class="th_line_right">#</td>';
							$html .= '<td class="th_line_right">Diagnóstico</td>';
							$html .= '<td class="th_line_right">Código</td>';
                                                $html .= '</tr>';        
						$html .= '<tr>';
							$html .= '<td class="td_line_right_bottom">1</td>';
							$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['pmed1']) . '</td>';
							$html .= '<td class="td_line_right_bottom">' . $emergencia['PROCE_MED_1'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td class="td_line_right_bottom">2</td>';
							$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['pmed2']) . '</td>';
							$html .= '<td class="td_line_right_bottom">' . $emergencia['PROCE_MED_2'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td class="td_line_right_bottom">3</td>';
							$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['pmed3']) . '</td>';
							$html .= '<td class="td_line_right_bottom">' . $emergencia['PROCE_MED_3'] . '</td>';
						$html .= '</tr>';
					$html .= '</table>';
                     };
					
					                    
					$html .= '<br/><br/>'; 
					$html .= '<div style="page-break-before: always;"></div>'; 
					                  
					$html .= '<span class="subtitle2">Destino del Paciente</span>';
					$html .= '<table border="1">';
						$html .= '<tr>';
							$html .= '<td width="80"><b>Hora</b></td>';
							$html .= '<td>' . $emergencia['hora_sal'] . '</td>';
							$html .= '<td><b>Fecha</b></td>';
							$html .= '<td>' . $emergencia['fecha_sal'] . '</td>';
							$html .= '<td><b>Destino</b></td>';
							$html .= '<td>' . $emergencia['destino'] . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Establecimiento</b></td>';
							$html .= '<td colspan="5">' . utf8_encode($emergencia['establecimiento']) . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td colspan="6"><b>Diagnóstico de Egreso</b></td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td colspan="6">';
								$html .= '<table class="tbl_dx_egreso">';
									$html .= '<tr>';
										$html .= '<th class="th_line_right">#</th>';
										$html .= '<th class="th_line_right">Diagnóstico</th>';
										$html .= '<th class="th_line_right">CIEX</th>';
										$html .= '<th>Tipo DX</th>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right_bottom">1</td>';
										$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['nombre_diagnostico1']) . '</td>';
										$html .= '<td class="td_line_right_bottom">' . $emergencia['ciex1'] . '</td>';
										$html .= '<td class="td_line_bottom" align="center">' . $emergencia['tipo_ciex1'] . '</td>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right_bottom">2</td>';
										$html .= '<td class="td_line_right_bottom">' . utf8_encode($emergencia['nombre_diagnostico2']) . '</td>';
										$html .= '<td class="td_line_right_bottom">' . $emergencia['ciex2'] . '</td>';
										$html .= '<td class="td_line_bottom" align="center">' . $emergencia['tipo_ciex2'] . '</td>';
									$html .= '</tr>';
									$html .= '<tr>';
										$html .= '<td class="td_line_right">3</td>';
										$html .= '<td class="td_line_right">' . utf8_encode($emergencia['nombre_diagnostico3']) . '</td>';
										$html .= '<td class="td_line_right">' . $emergencia['ciex3'] . '</td>';
										$html .= '<td align="center">' . $emergencia['tipo_ciex3'] . '</td>';
									$html .= '</tr>';
								$html .= '</table>';
							$html .= '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
							$html .= '<td><b>Observación</b></td>';
							$html .= '<td colspan="5">' . utf8_encode($emergencia['observacion_egreso']) . '</td>';
						$html .= '</tr>';
					$html .= '</table>';

					
					
					if ($emergencia['hora_aten'] <> '')
					  { 
					   if ($emergencia['tiene_firma'] == '1')
					    {
						  $html .= '<center><img src="'.$_SERVER['DOCUMENT_ROOT'].'/perfil/firmas/'.utf8_encode($emergencia['quien_atiende']).'.JPG" width="150"></center>';
						};
					  };
					  

					if($emergencia['estado'] == 5) {
						$html .= '<span class="subtitle2">Cierre de la Historia</span>';
						$html .= '<table>';
							$html .= '<tr>';
								$html .= '<td><b>Profesional</b></td>';
								$html .= '<td>' . $emergencia['usuario_alta_enf'] . '</td>';
								$html .= '<td><b>Hora</b></td>';
								$html .= '<td>' . $emergencia['hora_cierre'] . '</td>';
								$html .= '<td><b>Fecha</b></td>';
								$html .= '<td>' . $emergencia['fecha_cierre'] . '</td>';
							$html .= '</tr>';
						$html .= '</table>';
					}

					$MyEmergenciaDetWeb = $this->loadModel('EmergenciaDetWeb');
					$emergencia_det_web = $MyEmergenciaDetWeb->get_emergencia_det_web_10(array('id_emergencia' => $emergencia['id_emergencia']));

					if($emergencia_det_web != false) {
						$html .= '<div style="page-break-before: always;"></div>';

						$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
						$html .= '<h1 class="title_diario">Diario Clínico</h1>';
						$html .= '<h3 class="subtitle_diario text_center">Hoja de Emergencia N° ' . $emergencia['id_emergencia'] . '</h3>';

						$html .= '<div class="content_diario_clinico">';
						foreach($emergencia_det_web as $k) {

							if($k['tipo_proceso'] == 'P01') { /* AQUI REGISTRAR */
								$html .= '<div class="content_diario_clinico_tipo">';
									$html .= '<div class="body">';
										$html .= '<span>Evolución Médica</span>';
										if(empty($k['factor1']) && empty($k['factor2']) && empty($k['factor3']) && empty($k['factor4']))
										  {echo '';}
										else 
										 {
											 $html .=  'FACTORES : '.$k['factor1'].' '.$k['factor2'].' '.$k['factor3'].' '.$k['factor4'].'<br/>';
										 }; 
										$html .= strtoupper(nl2br(utf8_encode($k['detalle'])));
									$html .= '</div>';
									$html .= '<div class="footer">';
										$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
					        			$html .= $k['profesional'] . ' registró en ' . $k['lugar'];
 									    $html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/perfil/firmas/'.utf8_encode($k['codigo_profesional']).'.JPG" width="170">';
									$html .= '</div>';
								$html .= '</div>';
							}

					        if($k['tipo_proceso'] == 'P04') {
					        	$html .= '<div class="content_diario_clinico_tipo">';
						        	$html .= '<div class="body">';
						        		$html .= '<span>Funciones Vitales</span>';
							        	$html .= '<table class="tbl_funciones_vitales">';
							        		$html .= '<thead>';
									        	$html .= '<tr>';
									        		$html .= '<td>TEMP</td>';
									        		$html .= '<td>PA</td>';
									        		$html .= '<td>FC</td>';
									        		$html .= '<td>FR</td>';
									        		$html .= '<td>SAT</td>';
									        		$html .= '<td>PESO</td>';
									        	$html .= '</tr>';
									        $html .= '</thead>';
								        	$html .= '<tr>';
								        		$html .= '<td>' . $k['temp'] . '</td>';
								        		$html .= '<td>' . $k['pa'] . '</td>';
								        		$html .= '<td>' . $k['fc'] . '</td>';
								        		$html .= '<td>' . $k['fr'] . '</td>';
								        		$html .= '<td>' . $k['sat_ox'] . '</td>';
								        		$html .= '<td>' . $k['peso'] . '</td>';
								        	$html .= '</tr>';
							        	$html .= '</table>';
						        	$html .= '</div>';
						        	$html .= '<div class="footer">';
					        			$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
					        			$html .= $k['profesional'] . ' registró en ' . $k['lugar'];
						        	$html .= '</div>';
					        	$html .= '</div>';
					        }

							if($k['tipo_proceso'] == 'P06') {
								$html .= '<div class="content_diario_clinico_tipo">';
									$html .= '<div class="footer">';
										$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
										$html .= $k['profesional'] . ' asignó la historia al médico: ' . $k['ahora_profesional'];
									$html .= '</div>';
								$html .= '</div>';
							}

							if($k['tipo_proceso'] == 'P07') {
								$html .= '<div class="content_diario_clinico_tipo">';
									$html .= '<div class="footer">';
										$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
										$html .= $k['profesional'] . ' hizo cierre de turno.';
									$html .= '</div>';
								$html .= '</div>';
							}

							if($k['tipo_proceso'] == 'P10') {
								$html .= '<div class="content_diario_clinico_tipo">';
									$html .= '<div class="footer">';
										$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
										$html .= $k['profesional'] . ' reasignó la historia al médico: ' . $k['ahora_profesional'];
									$html .= '</div>';
								$html .= '</div>';
							}

							if($k['tipo_proceso'] == 'EXA') {
					        	$html .= '<div class="content_diario_clinico_tipo">';
						        	$html .= '<div class="body">';
						        		$html .= '<span>N° de Orden: ' . $k['id_eme_det_web'] . '</span>';
							        	$html .= '<span>Detalle de la Orden:</span>';
							        	$OrdenExamenDetWeb = $this->loadModel('OrdenExamenDetWeb');
							        	$OrdenExamenDetWeb = $OrdenExamenDetWeb->get_orden_examen_det_web_2(array('id_eme_det_web' => $k['id_eme_det_web']));
							        	$i = 1;
							        	foreach($OrdenExamenDetWeb as $kk) {
							        		$html .= $i++ . '.- ' . $kk['nombre_examen'] . '<br>';
							        	}
						        	$html .= '</div>';
						        	$html .= '<div class="footer">';
					        			$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
					        			$html .= $k['profesional'] . ' solicitó examen a ' . $k['lugar'];
						        	$html .= '</div>';
					        	$html .= '</div>';
							}

						}
						$html .= '</div>';

						$ii = 0;
						foreach($emergencia_det_web as $v => $k) {

							if($k['tipo_proceso'] == 'P02' || $k['tipo_proceso'] == 'P04') {

								if(isset($k['tipo_proceso'])) {

									if($ii == 0) {
										$html .= '<div style="page-break-before: always;"></div>';

										$html .= '<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo.jpg" width="450">';
										$html .= '<h1 class="title_diario">Nota de Enfermería</h1>';
										$html .= '<h3 class="subtitle_diario text_center">Hoja de Emergencia N° ' . $emergencia['id_emergencia'] . '</h3>';
										$html .= '<div class="content_nota_enfermeria">';
									}
							        
							        if($k['tipo_proceso'] == 'P02') {
							        	$html .= '<div class="content_nota_enfermeria_tipo">';
							        		$html .= '<div class="body">';
							        			$html .= '<span>Nota de Enfermería</span>';
							        			$html .= 'Procedimiento :';

							        			$EmergenciaDetalleProcedimiento = $this->loadModel('EmergenciaDetalleProcedimiento');
							        			$EmergenciaDetalleProcedimiento = $EmergenciaDetalleProcedimiento->get_emergencia_detalle_procedimiento_2(array('id_emergencia_detalle' => $k['id_eme_det_web']));

							        			$iii = 0;
							        			$html .= '<table class="tbl_nota_enfermeria_detalle_procedimiento">';
							        				$html .= '<tr>';
							        					$html .= '<td>#</td>';
							        					$html .= '<td>Descripción</td>';
							        					$html .= '<td>Cantidad</td>';
							        				$html .= '</tr>';
							        			foreach($EmergenciaDetalleProcedimiento as $kk) {
							        				$html .= '<tr>';
							        					$html .= '<td>' . ++$iii . '</td>';
							        					$html .= '<td>' . utf8_encode($kk['Descripcion']) . '</td>';
							        					$html .= '<td class="text_right">' . $kk['Cantidad'] . '</td>';
							        				$html .= '</tr>';
							        			}
							        			$html .= '</table>';
							        		    $html .= '';
							        			$html .= nl2br(rtrim(utf8_encode($k['detalle']))); 
							        		$html .= '</div>';
							        		$html .= '<div class="footer">';
							        			$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
							        			$html .= $k['profesional'] . ' registró en ' . $k['lugar'];
							        		$html .= '</div>';
							        	$html .= '</div>';
							        }

							        if($k['tipo_proceso'] == 'P04' && $k['abreviatura'] == 'ENF') {
							        	$html .= '<div class="content_nota_enfermeria_tipo">';
								        	$html .= '<div class="body">';
								        		$html .= '<span>Funciones Vitales</span>';
									        	$html .= '<table class="tbl_funciones_vitales">';
									        		$html .= '<thead>';
											        	$html .= '<tr>';
											        		$html .= '<td>TEMP</td>';
											        		$html .= '<td>PA</td>';
											        		$html .= '<td>FC</td>';
											        		$html .= '<td>FR</td>';
											        		$html .= '<td>SAT</td>';
											        		$html .= '<td>PESO</td>';
											        	$html .= '</tr>';
											        $html .= '</thead>';
										        	$html .= '<tr>';
										        		$html .= '<td>' . $k['temp'] . '</td>';
										        		$html .= '<td>' . $k['pa'] . '</td>';
										        		$html .= '<td>' . $k['fc'] . '</td>';
										        		$html .= '<td>' . $k['fr'] . '</td>';
										        		$html .= '<td>' . $k['sat_ox'] . '</td>';
										        		$html .= '<td>' . $k['peso'] . '</td>';
										        	$html .= '</tr>';
									        	$html .= '</table>';
								        	$html .= '</div>';
								        	$html .= '<div class="footer">';
							        			$html .= $k['fecha'] . ' ' . $k['hora'] . ' &nbsp;&nbsp; | &nbsp;&nbsp; ';
							        			$html .= $k['profesional'] . ' registró en ' . $k['lugar'];
								        	$html .= '</div>';
							        	$html .= '</div>';
							        }

							        if($ii == 0) {
							        	$html .= '</div>';
							        }

							        $ii++;
							    }
						    }
						}

					}

				$html .= '<script type="text/php">
							if (isset($pdf)) {
							    $footer = $pdf->open_object();
							    $w = $pdf->get_width();
							    $h = $pdf->get_height();
							    $font = Font_Metrics::get_font("helvetica", "normal");
							   	$txtHeight = Font_Metrics::get_font_height($font, 8);
							    $y = $h - 2 * $txtHeight - 24;
							    $color = array(0, 0, 0);
							    $width = Font_Metrics::get_text_width($txtHeight, $font, 8);
                                                            $pdf->page_text($w - $width - 550, $y-2,"_____________________________________________________________________________________________________________________" , $font, 8, $color);
                                                            $pdf->page_text($w - $width - 550, $y+7,"H.C.: '. utf8_encode($emergencia['historia']) . utf8_encode($emergencia['nombres']) .'" , $font, 10, $color);
                                                            $pdf->page_text($w - $width - 86, $y+7,"Pagina: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);    
                                                            
							    $pdf->close_object();
							    $pdf->add_object($footer, "all");
							}
							</script>';

				$html .= '</body>';

			$html .= '</html>';
			$this->getLibrary('dompdf/dompdf_config.inc');
			$pdf = new DOMPDF();
			$pdf->load_html(utf8_decode($html));
			$pdf ->set_paper("A4", "portrait"); 
			ini_set("memory_limit","1024M");
			set_time_limit(500);
			$pdf->render();
			$pdf->stream('historia_emergencia.pdf', array('Attachment' => FALSE)); 

		}
	}

	public function orden_examen_ticket(){
		if(isset($_POST["id_orden_examen"]) && $_POST["id_orden_examen"]!=""):
			$n_orden = trim($_POST["id_orden_examen"]);
			$i = 0;
			$oew = $this->loadEntity('orden_examen_web');
			$oew->setId_orden_examen(trim($n_orden));
			$this->_emergencia = $this->loadModel('pacientes');
			$detalle_ordenes = $this->_emergencia->ListarDetalleOrdenExamen($oew);
			$this->_emergencia = $this->loadModel('pacientes');
			$cabecera_orden = json_decode($this->_emergencia->CabeceraOrdenExamen($oew));
			$ordenes = json_decode($detalle_ordenes);
			$v = $this->loadEntity('validar');

			$file = fopen("/var/www/html/tmp/ticket_".$n_orden.".txt", "w");
			fwrite($file, "........................................" .chr(13).chr(10));
			fwrite($file, "******   SERVICIO DE EMERGENCIA   ******" .chr(13).chr(10));
			fwrite($file, "........................................" .chr(13).chr(10));
			fwrite($file, "HOSPITAL JOSE AGURTO TELLO" .chr(13).chr(10));
			fwrite($file, "Jr.Arequipa 214-218 - Chosica" .chr(13).chr(10));
			fwrite($file, "Lurigancho - Lima - Lima" .chr(13).chr(10));
			fwrite($file, "Telefono: (51-1) 418-3232" .chr(13).chr(10));
			fwrite($file, "========================================" .chr(13).chr(10));
			fwrite($file, "Historia: ".$cabecera_orden->historia_pac.chr(13).chr(10));
			fwrite($file, "Paciente: ".$v->getImpLetrasTicket($cabecera_orden->nombre_pac).chr(13).chr(10));
			fwrite($file, "Orden Para: ".$cabecera_orden->area.chr(13).chr(10));
			fwrite($file, "Nro Orden: ".$n_orden."".chr(13).chr(10));
			fwrite($file, "========================================" .chr(13).chr(10));	
			fwrite($file, "Detalle: ".chr(13).chr(10));
			fwrite($file, chr(13).chr(10));
			foreach($ordenes as $orden):
				$i++;
				fwrite($file, $i."). ".$v->getImpLetrasTicket($orden->nombre_examen)." - ".$orden->cantidad."".chr(13).chr(10));
			endforeach;
			fwrite($file, "========================================" .chr(13).chr(10));
			fwrite($file, "Usuario: ".$cabecera_orden->medico.chr(13).chr(10));
			fwrite($file, "Fecha: ".$cabecera_orden->fecha." ".$cabecera_orden->hora.chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
    		fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
    		fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file, $v->getImpLetrasTicket("").chr(13).chr(10));
			fwrite($file,chr(4));
			fwrite($file,chr(8));
			fwrite($file,chr(27));
			fwrite($file,chr(105));
			
			fclose($file);
			
			//$salida = shell_exec('lp /var/www/html/ticket.txt');
			$array = array('estado_respuesta' => 1, 'mensaje' => "Se genero correctamente el txt.", 'id_orden_examen' => $n_orden);
			$response = json_encode($array);
		else:
			$array = array('estado_respuesta' => 0, 'mensaje' => "No se ah enviado el ID de la orden, contacte con el administrador del sistema.");
			$response = json_encode($array);
		endif;	
		echo $response;
	}
	public function atenciones_ce()
	{
		$e = $this->loadEntity('emergencia');
		$e->setPaciente($_POST["paciente"]);
		$this->_imprimir = $this->loadModel('imprimir');
		$paciente = json_decode($this->_imprimir->getDatosPaciente($e));
		$this->_imprimir = $this->loadModel('imprimir');
		$cabecera_atencion = json_decode($this->_imprimir->getAtencionesCEXTERNA($e));
		$this->_imprimir = $this->loadModel('imprimir');
		$detalle_atencion = json_decode($this->_imprimir->getAtencionesDETCEXTERNA($e));
		$html = $this->html;
		$html.='
			<img src="'.$_SERVER['DOCUMENT_ROOT'].'/emergencia/public/img/logo-top-hjatch.jpg">
		   	<hr>
		   	<h3 style="text-align:center;">REGISTRO DE ATENCIONES DE CONSULTORIO EXTERNO:</h3>
		   	<br>
		   	<table width="100%" id="datos-personales-paciente">
				<tbody class="cuerpo">
					<tr>
						<td class="titulos">Nombres:</td>
						<td colspan="5">'.$paciente->nombres.'</td>															
					</tr>
					<tr>						
						<td class="titulos">Historia:</td>
						<td>'.$paciente->historia.'</td>
						<td class="titulos">Edad:</td>
						<td>'.$paciente->edad.'</td>
						<td class="titulos">Sexo:</td>
						<td>'.$paciente->sexo.'</td>
					</tr>
				</tbody>
			</table>
		   	';
		if($cabecera_atencion[0]->estado_respuesta==1):
		foreach ($cabecera_atencion as $atencion) {
			$html.='
				<table width="100%" style="border-bottom:1px dashed #000; margin-bottom: 20px;">
					<tr>
						<td width="80px">Consultorio:</td>
						<td>'.$atencion->consultorio.'</td>
						<td width="50px">Fecha:</td>
						<td width="50px">'.$atencion->fecha.'</td>
					</tr>
					<tr>
						<td>Medico:</td>
						<td colspan="3">'.$atencion->medico.'</td>
					</tr>
					<tr>
						<td colspan="4" style="padding: 10px;">
							<table width="80%" align="center">
								<tr>
									<td style="background: #ccc; width:50px;">Tipo Dx</td>
									<td style="background: #ccc; width:50px;">Lab</td>
									<td style="background: #ccc; width:50px;">CIEX</td>
									<td style="background: #ccc;">Descripcion</td>
								</tr>
				';
				foreach ($detalle_atencion as $detalle) {
					if($atencion->id_cita == $detalle->id_cita):
					$html.='<tr>
								<td>'.$detalle->tipodx.'</td>
								<td>'.$detalle->lab.'</td>
								<td>'.$detalle->dx.'</td>
								<td>'.$detalle->dx_des.'</td>
							</tr>
					';
					endif;
				}
			$html.='
							</table>
						</td>
					</tr>
				</table>
				';			
		}
		else:
			$html.= ''.$cabecera_atencion[0]->mensaje;
		endif;
		$html.='		
		<script type="text/php">
		if (isset($pdf)) {
		    $footer = $pdf->open_object();
		    $w = $pdf->get_width();
		    $h = $pdf->get_height();
		    $font = Font_Metrics::get_font("helvetica", "normal");
		    $txtHeight = Font_Metrics::get_font_height($font, 8);
		    $y = $h - 2 * $txtHeight - 24;
		    $color = array(0, 0, 0);
		    $width = Font_Metrics::get_text_width($text, $font, 8);
		    $pdf->page_text($w - $width - 86, $y+7, "Pagina: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
		    $pdf->close_object();
		    $pdf->add_object($footer, "all");
		}
		  </script>
		</body>
		</html>';
		$this->getLibrary('dompdf/dompdf_config.inc');
		$this->_pdf = new DOMPDF();
		//$this->_pdf->set_paper('legal','landscape');
		$this->_pdf->load_html($html);
		$this->_pdf->render();
		$this->_pdf->get_canvas()->get_page_count();
		$this->_pdf->stream("registro_atenciones_ce_".$paciente->nombres.".pdf",array("Attachment"=>false));

	}
}