<?php

ini_set('memory_limit', '-1');


class imprimirController extends Controller
{
	private $_pdf;
	private $html =
	'<html> 
		   	<head> 
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
	public function __construct()
	{
		parent::__construct();
		session_start();
	}

	public function index()
	{
		$this->_view->titulo = '';
		$this->_view->renderizar('index');
	}

	private function style_default($style = '')
	{
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


	public function impresion_hoja_de_envio()
	{

		$inicioexp = trim($_GET["min"]);
		$finexp = trim($_GET["max"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$descripcion_actor = trim($_SESSION["usuario"]["descripcion_actor"]);
		$nombres_para_archivo  = $inicioexp . ' _ ' . $finexp;
		$nombre_archivo_pdf = "HOJA_DE_ENVIO_" . $nombres_para_archivo . "_" . date("d-m-Y") . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$this->_expe = $this->loadModel('expediente');
		$cabecera = $this->_expe->VerDatosCabecera($inicioexp, $finexp, $actor_registra);
		$array = json_decode($cabecera, true);

		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= '</head>';
				$html .= '<body>';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="65%" rowspan="2"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
				$html .= '<td width="15%"  >Impresion:</td>';
				$html .= '<td width="20%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td width="15%"  >Usuario:</td>';
				$html .= '<td>' . $user . '</td>';
				$html .= '</tr>';
				$html .= '</table>';
				$html .= '<h3 class="title">HOJA DE ENVIO - TRAMITE GENERAL</h3>';


				$html .= '<table width="100%">';
				$html .= ' <tr> ';
				$html .= ' <td width="30%">Tipo documento :</td> ';
				$html .= ' <td width="35%"><strong>' . $mostrar['tipo_doc'] . '</strong></td> ';
				$html .= ' <td width="30%">Nro. Expediente : </td> ';
				$html .= ' <td width="42%"><strong><font size=4>' . $mostrar['expediente_id'] . '</font></strong></td> ';
				$html .= ' </tr> ';
				$html .= ' <tr> ';
				$html .= ' <td>Nro documento : </td> ';
				$html .= ' <td><strong>' . utf8_decode($mostrar['nro_documento']) . '</strong></td> ';
				$html .= ' <td>Operador :</td> ';
				$html .= ' <td width="60%"><strong>' . mb_strtoupper(utf8_decode($descripcion_actor), 'UTF-8') . '</strong></td> ';
				$html .= ' </tr> ';
				$html .= '<tr> ';
				$html .= '<td></td>';
				$html .= '<td></td>';
				$html .= '<td>Fecha Registro :</td>';
				$html .= '<td>' . $mostrar['fecha'] . ' ' . $mostrar['hora'] . '</td>';
				$html .= '</tr>';
				$html .= '</table> ';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="10%">Interesado :</td>';
				$html .= '<td width="93%"><strong><font size=2><u>' . utf8_decode($mostrar['actor_nombre']) . '</u></font></strong></td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td>Asunto :</td>';
				$html .= '<td><strong>' . utf8_decode(trim($mostrar['asunto'])) . '</strong></td>';
				$html .= '</tr>';
				$html .= '</table>';


				$html .= '<table width="100%" border="1px" cellpadding="0" cellspacing="0">';
				$html .= ' <tr> ';
				$html .= '			  <td width="5%" bgcolor="#CCCCCC">NRO</td>';
				$html .= '            <td width="35%" bgcolor="#CCCCCC"><center>DESTINATARIO</center></td> ';
				$html .= '            <td width="5%" bgcolor="#CCCCCC"><center>PR</center></td> ';
				$html .= '            <td width="8%" bgcolor="#CCCCCC"><center>CLAVE</center></td> ';
				$html .= '            <td width="11%" bgcolor="#CCCCCC"><center>FECHA</center></td> ';
				$html .= '            <td width="36%" bgcolor="#CCCCCC"><center>REMITIDO POR :</center></td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>01</center></td> ';
				$html .= '            <td>' . $mostrar['actor-atencion'] . '</td> ';
				$html .= '            <td><center>' . $mostrar['prioridad'] . '</center></td> ';
				$html .= '            <td><center>' . $mostrar['ac1'] . '&nbsp;&nbsp;&nbsp;&nbsp;' . $mostrar['ac2'] . '</center></td> ';
				$html .= '            <td><center>' . $mostrar['fecha'] . '</center></td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>02</center></td>';
				$html .= '            <td><p>&nbsp;</p></td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>03</center></td>';
				$html .= '            <td><p>&nbsp;</p></td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>04</center></td> ';
				$html .= '            <td><p>&nbsp;</p></td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>05</center></td> ';
				$html .= '            <td><p>&nbsp;</p></td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '            <td>&nbsp;</td> ';
				$html .= '        </tr> ';
				$html .= '        <tr> ';
				$html .= '            <td><center>06</center></td> ';
				$html .= '            <td><p>&nbsp;</p></td> ';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';
				$html .= '        <tr>';
				$html .= '            <td><center>07</center></td> ';
				$html .= '            <td><p>&nbsp;</p></td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';
				$html .= '        <tr>';
				$html .= '            <td><center>08</center></td>';
				$html .= '            <td><p>&nbsp;</p></td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';
				$html .= '        <tr>';
				$html .= '            <td><center>09</center></td>';
				$html .= '            <td><p>&nbsp;</p></td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';
				$html .= '        <tr>';
				$html .= '            <td><center>10</center></td>';
				$html .= '            <td><p>&nbsp;</p></td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';
				$html .= '        <tr>';
				$html .= '            <td><center>11</center></td>';
				$html .= '            <td><p>&nbsp;</p></td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '            <td>&nbsp;</td>';
				$html .= '        </tr>';

				$html .= '    </table>';
				$html .= '    <br/>';
				$html .= ' <table width="100%">';
				$html .= ' <tr> ';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Motivo del Pase: (Clave)</td>';
				$html .= '    <td width="34%">&nbsp;</td>';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Pr. - Prioridad</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>01.- Aprobacion</td>';
				$html .= '    <td>09.- Segun solicitado</td>';
				$html .= '    <td>01.- Baja</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>02.- Atencion</td>';
				$html .= '    <td>10.- Tomara nota y devolver</td>';
				$html .= '    <td>02.- Normal</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>03.- Su conocimiento</td>';
				$html .= '    <td>11.- Archivar</td>';
				$html .= '    <td>03.- Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>04.- Opinion</td>';
				$html .= '    <td>12.- Accion inmediata</td>';
				$html .= '    <td>04.- Muy Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>05.- Informe y devolver</td>';
				$html .= '    <td>13.- Prepare contestacion</td>';
				$html .= '    <td>05.- Confidencial</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>06.- Por corresponder</td>';
				$html .= '    <td>14.- Proyecto resolucion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>07.- Para conversar</td>';
				$html .= '    <td>15.- Ver Observacion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>08.- Acompañar Antecedentes</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '</table>';
				$html .= '<br/>';
				$html .= '<table width="100%" border="1" cellpadding="1" cellspacing="1">';
				$html .= ' <tr> ';
				$html .= ' <td><strong>OBSERVACIONES :</strong>';


				$html .= ' <p>&nbsp;</p></td> ';
				$html .= ' </tr> ';
				$html .= '</table>';
				$html .= '	<script type="text/php">
				if (isset($pdf)) {
					$footer = $pdf->open_object();
					$w = $pdf->get_width();
					$h = $pdf->get_height();
					$font = Font_Metrics::get_font("helvetica", "normal");
					$txtHeight = Font_Metrics::get_font_height($font, 8);
					$y = $h - 2 * $txtHeight - 24;
					$color = array(0, 0, 0);
					$width = Font_Metrics::get_text_width($text, $font, 8);
					$pdf->page_text($w - $width - 550, $y-2,"_____________________________________________________________________________________________________________________" , $font, 8, $color);
					$pdf->page_text($w - $width - 350, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
					$pdf->close_object();
					$pdf->add_object($footer, "all");
				}
				  </script>
				</body>';
			};
		};

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "portrait");
		ini_set("memory_limit", "2048M");
		set_time_limit(500);
		$pdf->render();

		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}


	public function cargo_derivado()

	{
		$cargo = trim($_GET["cargo"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$oficina = utf8_decode(trim($_SESSION["usuario"]["abreviatura"]));
		$nombre_actor = trim($_SESSION["usuario"]["apellidos_nombres"]);
		$nombres_para_archivo  = $cargo;
		$nombre_archivo_pdf = "HOJA_DE_CARGO_" . $nombres_para_archivo . "_" . date("d-m-Y") . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 10px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .= '<table width="100%">';
		$html .= '<tr>';
		$html .= '<td width="21%">&nbsp;</td>';
		$html .= '<td width="59%" rowspan="3" valign="top"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
		$html .= '<td width="7%" valign="top">Impresion:</td>';
		$html .= '<td width="12%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
		$html .= '</tr>';
		$html .= '<tr>';
		$html .= '<td>&nbsp;</td>';
		$html .= '<td>Usuario:</td>';
		$html .= '<td>' . $user . '</td>';
		$html .= '</tr>';
		$html .= '</table>';
		$html .= '<table width="100%">';
		$html .= ' <tr>';
		$html .= ' <td>&nbsp;</td>';
		$html .= '<td><center><strong><font size=2>HOJA DE CARGO DEL SISTEMA DE TRAMITE DOCUMENTARIO</font></strong></center></td>';
		$html .= ' <td></td>';
		$html .= '  </tr>';
		$html .= '  <tr>';
		$html .= '    <td>&nbsp;</td>';
		$html .= '    <td><center><strong><font size=2>Cargo Nro :&nbsp;&nbsp; <font size=4>' . $cargo . '</font></font></strong></center></td>';
		$html .= '   <td>&nbsp;</td> ';
		$html .= '  </tr>';
		$html .= '</table>';
		$html .= '<h4 class="title">Operador : ' . $nombre_actor . '</h4>';
		$html .= '<table width="100%" border = "1" cellpadding="0" cellspacing="0">';
		$html .= ' <tr> ';
		$html .= '  <td><center><strong>NRO</strong></center></td> ';
		$html .= '  <td><center><strong>EXPEDIENTE</strong></center></td> ';
		$html .= '  <td><center><strong>FECHA</strong></center></td> ';
		$html .= '  <td><center><strong>REMITENTE</strong></center></td>';
		$html .= '  <td><center><strong>ASUNTO</strong></center></td>';
		$html .= '  <td><center><strong>DESTINATARIO</strong></center></td>';
		$html .= '  <td><center><strong>CLAVES</strong></center></td>';
		$html .= '  <td><center><strong>PR</strong></center></td>';
		$html .= '  <td><center><strong>FIRMA</strong></center></td>';
		$html .= ' </tr>';

		$this->_expe = $this->loadModel('expediente');
		$cabecera = $this->_expe->VerCabeceraHojaDerivado($cargo);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= ' <tr>';
				$html .= ' <td width="2%"><center>' . $mostrar['correlativo'] . '</center></td>';
				$html .= ' <td width="10%"><center> <strong><font size=1>' . $mostrar['expediente_id'] . '</font><strong></center></td>';
				$html .= ' <td width="8%"><center><strong><font size=1>' . $mostrar['fecha'] . '</font><strong></center></td>';
				if (strlen($mostrar['nombre']) <= 60) {
					$html .= ' <td width="20%">' . utf8_decode($mostrar['nombre']) . '<br>' . $mostrar['descripcion'] . '<br>' . utf8_decode($mostrar['nro_documento']) . '<br><br>' . $oficina . '<br><br><br></td>';
				} else {
					$html .= ' <td width="20%">' . utf8_decode($mostrar['nombre']) . '<br>' . $mostrar['descripcion'] . '<br>' . utf8_decode($mostrar['nro_documento']) . '<br>' . $oficina . '</td>';
				};
				$html .= ' <td width="20%">' . utf8_decode($mostrar['asunto']) . '<br><strong> FOLIOS:</strong> ' . $mostrar['folios'] . '<br>' . $mostrar['adjunto'] . '</td>';

				//$html .= ' <td width="20%">' . utf8_decode($mostrar['asunto']) . '<br><strong> FOLIOS:</strong> ' . $mostrar['folios'] . '</td>';

				// adjunto'

				$html .= ' <td width="12%">' . utf8_decode($mostrar['actor_2_descripcion']) . '</td>';
				$html .= ' <td width="8%"><center>' . $mostrar['accion1'] . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $mostrar['accion2'] .  '</center></td>';
				$html .= ' <td width="5%"><center>' . $mostrar['prioridad'] . '</center></td>';
				$html .= ' <td width="20%"></td>';
				$html .= '  </tr> ';
			};
		};
		$html .= ' </table> ';
		$html .= '    <br/>';
		$html .= '	<script type="text/php">
		  if (isset($pdf)) {
			  $footer = $pdf->open_object();
			  $w = $pdf->get_width();
			  $h = $pdf->get_height();
			  $font = Font_Metrics::get_font("helvetica", "normal");
			  $txtHeight = Font_Metrics::get_font_height($font, 8);
			  $y = $h - 2 * $txtHeight - 24;
			  $color = array(0, 0, 0);
			  $width = Font_Metrics::get_text_width($text, $font, 8);
			  $pdf->page_text($w - $width - 650, $y-2,"_________________________________________________________________________________________________" , $font, 8, $color);
			  $pdf->page_text($w - $width - 450, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
			  $pdf->close_object();
			  $pdf->add_object($footer, "all");
		  }
			</script>
		  </body>';

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "landscape");
		ini_set("memory_limit", "2048M");
		set_time_limit(1000);
		$pdf->render();
		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}






	public function impresion_de_kardex()

	{
		$expediente = trim($_GET["exp"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$oficina = utf8_decode(trim($_SESSION["usuario"]["abreviatura"]));
		$nombre_actor = trim($_SESSION["usuario"]["apellidos_nombres"]);
		$nombres_para_archivo  = $expediente;
		$nombre_archivo_pdf = "KARDEX_EXPEDIENTE_" . $nombres_para_archivo . "_" . date("d-m-Y") . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 9px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .= '<table width="100%">';
		$html .= '<tr>';
		$html .= '<td width="21%">&nbsp;</td>';
		$html .= '<td width="59%" rowspan="3" valign="top"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
		$html .= '<td width="7%" valign="top">Impresion:</td>';
		$html .= '<td width="12%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
		$html .= '</tr>';
		$html .= '<tr>';
		$html .= '<td>&nbsp;</td>';
		$html .= '<td>Usuario:</td>';
		$html .= '<td>' . $user . '</td>';
		$html .= '</tr>';
		$html .= '</table>';
		$this->_ver_detalle = $this->loadModel('consultas');
		$datos = $this->_ver_detalle->VerDatosKardexCabecera($expediente);
		$final = json_decode($datos, true);
		foreach ($final  as $mostrar) {
			$html .= '<center><h3 class="title">KARDEX DE EXPEDIENTE : <strong><font size=3>' .   $mostrar['expediente_id'] . '<font><strong></h3></center>';
			$html .= '<table width="100%" border="0">';
			$html .= '<tr>';
			$html .= '<td width="7%" align="right" bgcolor="#CCCCCC">Tipo Doc.</td> ';
			$html .= '<td width="33%">' . $mostrar["tipo_documento"] . '</td> ';
			$html .= '<td width="9%" align="right" bgcolor="#CCCCCC">Nro. Documento :</td> ';
			$html .= '<td width="26%">' . $mostrar["nro_documento"] . '</td>';
			$html .= '<td width="8%" align="right" bgcolor="#CCCCCC">Usuario Registro : </td>';
			$html .= '<td width="17%">' . $mostrar["actor_registro"] . '</td>';
			$html .= '</tr> ';
			$html .= '<tr> ';
			$html .= ' <td align="right" bgcolor="#CCCCCC">Asunto :</td> ';
			$html .= '  <td>' . $mostrar["asunto"] . '</td> ';
			$html .= '  <td align="right" bgcolor="#CCCCCC">Derivaciones : </td> ';
			$html .= '  <td>' . $mostrar["ocurrencia"] . '</td> ';
			$html .= '  <td align="right" bgcolor="#CCCCCC">Fecha Registro : </td> ';
			$html .= '  <td>' . $mostrar["fecha"] . '</td> ';
			$html .= '	</tr> ';
			$html .= '  </table>';
		};

		$html .= ' <table width="100%" > ';
		$html .= ' <tr border = "1" cellpadding="0" cellspacing="0"> ';
		$html .= ' <td width="2%" rowspan="2" align="center" bgcolor="#CCCCCC">Nro</td> ';
		$html .= ' <td width="9%" rowspan="2" align="center" bgcolor="#CCCCCC">FECHA</td> ';
		$html .= ' <td width="7%" rowspan="2" align="center" bgcolor="#CCCCCC">HORA</td> ';
		$html .= ' <td width="24%" rowspan="2" align="center" bgcolor="#CCCCCC">REMITENTE</td> ';
		$html .= ' <td width="22%" rowspan="2" align="center" bgcolor="#CCCCCC">DESTINATARIO</td> ';
		$html .= ' <td colspan="3" align="center" bgcolor="#CCCCCC">ACCION</td> ';
		$html .= ' <td colspan="2" align="center" bgcolor="#CCCCCC">CARGO</td> ';
		$html .= ' <td colspan="2" align="center" bgcolor="#CCCCCC">RECEPCION</td> ';
		$html .= '</tr> ';
		$html .= '<tr > ';
		$html .= ' <td width="3%" align="center" bgcolor="#CCCCCC">01</td> ';
		$html .= ' <td width="3%" align="center" bgcolor="#CCCCCC">02</td> ';
		$html .= ' <td width="6%" align="center" bgcolor="#CCCCCC">03</td> ';
		$html .= ' <td width="6%" align="center" bgcolor="#CCCCCC">FECHA</td> ';
		$html .= ' <td width="7%" align="center" bgcolor="#CCCCCC">HORA</td> ';
		$html .= ' <td width="5%" align="center" bgcolor="#CCCCCC">FECHA</td> ';
		$html .= ' <td width="6%" align="center" bgcolor="#CCCCCC">HORA</td> ';
		$html .= '</tr> ';
		$this->_ver_detalle_table = $this->loadModel('consultas');
		$datos_table = $this->_ver_detalle_table->VerDatosContenidoKardex($expediente);
		$detalle = json_decode($datos_table, true);
		foreach ($detalle  as $kardex) {
			$html .= '<tr>';
			$html .= '<td>' . $kardex["nro"] . '</td>';
			$html .= '<td>' . $kardex["fecha"] . '</td>';
			$html .= '<td>' . $kardex["hora"] . '</td>';
			$html .= '<td>' . $kardex["remitente_de"] . '</td>';
			$html .= '<td>' . $kardex["destinatario_a"] . '</td>';
			$html .= '<td>' . $kardex["a1"] . '</td>';
			$html .= '<td>' . $kardex["a2"] . '</td>';
			$html .= '<td>' . $kardex["a3"] . '</td>';
			$html .= '<td>' . $kardex["cargo_fecha"] . '</td>';
			$html .= '<td>' . $kardex["cargo_hora"] . '</td>';
			$html .= '<td>' . $kardex["f_recepcion"] . '</td>';
			$html .= '<td>' . $kardex["h_recepcion"] . '</td>';
			$html .= '</tr>';
			$html .= '<tr>';
			$html .= '<td colspan="2" bgcolor="#CCCCCC">Doc. Adjunto :</td>';
			$html .= '<td colspan="9">' . $kardex["doc_adj1"] . '</td>';
			$html .= '</tr>';
			$html .= '<tr>';
			$html .= '<td colspan="2" bgcolor="#CCCCCC">Exp. Adjunto :</td>';
			$html .= '<td colspan="9">' . $kardex["doc_adj2"] . '</td>';
			$html .= '</tr>';
			$html .= '<tr>';
			$html .= '<td colspan="2" bgcolor="#CCCCCC">Observaciones :</td>';
			$html .= '<td colspan="9">' . $kardex["observacion"] . '</td>';
			$html .= '</tr>';
		};
		$html .= '<tr><td><strong>SITUACION:</strong></td><td> -- ' . $mostrar["condicion_culminacion"] . ' -- <td><strong> </tr>';
		$html .= '</table>';
		$html .= '    <br/>';
		$html .= '	<script type="text/php">
		  if (isset($pdf)) {
			  $footer = $pdf->open_object();
			  $w = $pdf->get_width();
			  $h = $pdf->get_height();
			  $font = Font_Metrics::get_font("helvetica", "normal");
			  $txtHeight = Font_Metrics::get_font_height($font, 8);
			  $y = $h - 2 * $txtHeight - 24;
			  $color = array(0, 0, 0);
			  $width = Font_Metrics::get_text_width($text, $font, 8);
			  $pdf->page_text($w - $width - 650, $y-2,"_________________________________________________________________________________________________" , $font, 8, $color);
			  $pdf->page_text($w - $width - 450, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
			  $pdf->close_object();
			  $pdf->add_object($footer, "all");
		  }
			</script>
		  </body>';

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "landscape");
		ini_set("memory_limit", "2048M");
		set_time_limit(1000);
		$pdf->render();
		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}

	public function EnvioArchivoExcelRecibidos()
	{
		$fecha1 = trim($_GET["Ini"]);
		$fecha2 = trim($_GET["Fin"]);
		$actor_actual = trim($_SESSION["usuario"]["actor"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		header("Content-Type: application/xls");
		header("Content-Disposition: attachment; filename=ExpedientesRecibidos_" . date('Y:m:d:m:s') . ".xls");
		header("Pragma: no-cache");
		header("Expires: 0");
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 9px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .= '<table width="100%">';
		$html .= '<tr>';
		$html .= '<td width="21%">&nbsp;</td>';
		$html .= '<td width="59%" rowspan="3" valign="top"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
		$html .= '<td width="7%" valign="top">Impresion:</td>';
		$html .= '<td width="12%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
		$html .= '</tr>';
		$html .= '<tr>';
		$html .= '<td>&nbsp;</td>';
		$html .= '<td>Usuario:</td>';
		$html .= '<td>' . $user . '</td>';
		$html .= '</tr>';
		$html .= '</table><br>';
		$html .= '<h2> Reporte de Expedientes Recibidos desde : ' . $fecha1 . ' Hasta : ' . $fecha2 . '</h2>';
		for ($i = 0; $i < 3; $i++) {
			$html .= '<br>';
		}
		$html .= '<table width="100%" border = "1" cellpadding="0" cellspacing="0">';
		$html .= ' <tr> ';
		$html .= '  <td><center><strong>EXPEDIENTE</strong></center></td> ';
		$html .= '  <td><center><strong>FECHA</strong></center></td> ';
		$html .= '  <td><center><strong>REMITENTE</strong></center></td>';
		$html .= '  <td><center><strong>ASUNTO</strong></center></td>';
		$html .= '  <td><center><strong>Documento</strong></center></td>';
		$html .= '  <td><center><strong>Nro</strong></center></td>';
		$html .= '  <td><center><strong>Observaciones</strong></center></td>';
		$html .= '  <td><center><strong>Estado Actual</strong></center></td>';
		$html .= ' </tr>';
		$this->_expe_reci = $this->loadModel('expediente');
		$cabecera = $this->_expe_reci->ReportesExpedientesRecibidos($fecha1, $fecha2, $actor_actual);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= ' <tr>';
				$html .= ' <td width="2%">' . $mostrar['expediente_id'] . '</td>';
				$html .= ' <td width="10%"><font size=1>' . $mostrar['fecha_recepcion'] . '</font><strong></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['actor_abreviatura']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['asunto']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['descripcion']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['nro_documento']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['observaciones']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['condicion_estado']) . '</font></td>';
				$html .= '  </tr> ';
			};
		};
		$html .= ' </table> ';
		$html .= '</body>';
		$html .= '</html>';
		echo $html;
	}


	public function EnvioArchivoExcelRecibidosDetallado()
	{
		$fecha1 = trim($_GET["Ini"]);
		$fecha2 = trim($_GET["Fin"]);
		$actor_actual = trim($_SESSION["usuario"]["actor"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		header("Content-Type: application/xls");
		header("Content-Disposition: attachment; filename=ExpedientesDetalladoRecibidos_" . date('Y:m:d:m:s') . ".xls");
		header("Pragma: no-cache");
		header("Expires: 0");
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 9px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '.xl65
				{
					mso-style-parent:style0;
					mso-number-format:"\@";
					}';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .=
		'<table style="width:100%">
		<tr>
		  <th><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></th>
		</tr>
		<tr>
		</tr>
	  </table><br><br>';
		$html .= '<h2> Reporte de Expedientes Recibidos desde : ' . $fecha1 . ' Hasta : ' . $fecha2 . '</h2>';
		$html .= '<h3> Impresion: ' . date("d/m/Y") . ' ' . date("H:i:s", time()) .'</h3>';
		$html .= '<h3> Usuario: ' . $user .'</h3>';
		for ($i = 0; $i < 3; $i++) {
			$html .= '<br>';
		}
		$html .= '<table width="100%" border = "1" cellpadding="0" cellspacing="0">';
		$html .= ' <tr> ';
		$html .= '  <td><center><strong>EXPEDIENTE</strong></center></td> ';
		$html .= '  <td><center><strong>OCURRENCIA</strong></center></td> ';
		$html .= '  <td><center><strong>FECHA</strong></center></td> ';
		$html .= '  <td><center><strong>RECEPCION</strong></center></td> ';
		$html .= '  <td><center><strong>HORA</strong></center></td> ';
		$html .= '  <td><center><strong>REMITENTE</strong></center></td>';
		$html .= '  <td><center><strong>ASUNTO</strong></center></td>';
		$html .= '  <td><center><strong>Documento</strong></center></td>';
		$html .= '  <td><center><strong>Nro</strong></center></td>';
		$html .= '  <td><center><strong>Folios</strong></center></td>';
		$html .= '  <td><center><strong>Observaciones</strong></center></td>';
		$html .= '  <td><center><strong>Estado Actual</strong></center></td>';
		$html .= '  <td><center><strong>Cargo Fecha</strong></center></td>';
		$html .= '  <td><center><strong>Cargo Hora</strong></center></td>';
		$html .= '  <td><center><strong>Cargo Usuario</strong></center></td>';
		$html .= '  <td><center><strong>Fecha Culminacion</strong></center></td>';
		$html .= '  <td><center><strong>Comentario Culminacion</strong></center></td>';
		$html .= '  <td><center><strong>Recepcion Comentario</strong></center></td>';
		$html .= ' </tr>';
		$this->_expe_reci = $this->loadModel('expediente');
		$cabecera = $this->_expe_reci->ReportesExpedientesRecibidosDetallado();
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= ' <tr>';
				$html .= ' <td width="2%">' . $mostrar['expediente_id'] . '</td>';
  			    $html .= ' <td width="10%">' . $mostrar['ocurrencia'] . '</td>';
				$html .= ' <td width="10%" class="xl65">' . $mostrar['fecha_documento'] . '</td>';
				$html .= ' <td width="10%" class="xl65">' .$mostrar['recepcion_fecha'] . '</td>';
				$html .= ' <td width="10%">' . $mostrar['recepcion_hora'] . '</td>';
				$html .= ' <td width="8%">' . $mostrar['actor_abreviaturade'] . '</td>';
				$html .= ' <td width="8%">' . $mostrar['asunto'] . '</td>';
				$html .= ' <td width="8%">' . $mostrar['descripcion'] . '</td>';
				$html .= ' <td width="8%">' . $mostrar['nro_documento'] . '</td>';
				$html .= ' <td width="8%">' . $mostrar['folios'] . '</td>';
   			    $html .= ' <td width="8%">' . $mostrar['observaciones'] . '</td>';
  			    $html .= ' <td width="8%">' . $mostrar['condicion_estado'] . '</td>';
  			     $html .= ' <td width="8%" class="xl65">' . $mostrar['cargo_fecha'] . '</td>';
				  $html .= ' <td width="8%">' .$mostrar['cargo_hora'] . '</td>';
				  $html .= ' <td width="8%">' .$mostrar['cargo_usuario'] . '</td>';
				  $html .= ' <td width="8%" class="xl65">' .$mostrar['fecha_culminacion'] . '</td>';
				  $html .= ' <td width="8%">' .$mostrar['comentario_culminacion'] . '</td>';
				  $html .= ' <td width="8%">' .$mostrar['recepcion_comentario'] . '</td>';
				$html .= '  </tr> ';
			};
		};
		$html .= ' </table> ';
		$html .= '</body>';
		$html .= '</html>';
		echo $html;
		
		 
	}




	public function EnvioArchivoPDFRecibidos()
	{
		$fecha1 = trim($_GET["Ini"]);
		$fecha2 = trim($_GET["Fin"]);
		$actor_actual = trim($_SESSION["usuario"]["actor"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$nombre_archivo_pdf = "ReporteRecibidos_" . $user . "_" . date('Y:m:d:m:s') . ".PDF";
		header("Pragma: no-cache");
		header("Expires: 0");
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 9px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .= '<table width="100%">';
		$html .= '<tr>';
		$html .= '<td width="21%">&nbsp;</td>';
		$html .= '<td width="59%" rowspan="3" valign="top"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
		$html .= '<td width="7%" valign="top">Impresion:</td>';
		$html .= '<td width="12%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
		$html .= '</tr>';
		$html .= '<tr>';
		$html .= '<td>&nbsp;</td>';
		$html .= '<td>Usuario:</td>';
		$html .= '<td>' . $user . '</td>';
		$html .= '</tr>';
		$html .= '</table><br>';
		$html .= '<h2> Reporte de Expedientes Recibidos desde : ' . $fecha1 . ' Hasta : ' . $fecha2 . '</h2>';
		for ($i = 0; $i < 3; $i++) {
			$html .= '<br>';
		}
		$html .= '<table width="100%" border = "1" cellpadding="0" cellspacing="0">';
		$html .= ' <tr> ';
		$html .= '  <td><center><strong>EXPEDIENTE</strong></center></td> ';
		$html .= '  <td><center><strong>FECHA</strong></center></td> ';
		$html .= '  <td><center><strong>REMITENTE</strong></center></td>';
		$html .= '  <td><center><strong>ASUNTO</strong></center></td>';
		$html .= '  <td><center><strong>Documento</strong></center></td>';
		$html .= '  <td><center><strong>Nro</strong></center></td>';
		$html .= '  <td><center><strong>Observaciones</strong></center></td>';
		$html .= '  <td><center><strong>Estado Actual</strong></center></td>';
		$html .= ' </tr>';
		$this->_expe_reci = $this->loadModel('expediente');
		$cabecera = $this->_expe_reci->ReportesExpedientesRecibidos($fecha1, $fecha2, $actor_actual);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= ' <tr>';
				$html .= ' <td width="2%">' . $mostrar['expediente_id'] . '</td>';
				$html .= ' <td width="10%"><font size=1>' . $mostrar['fecha_recepcion'] . '</font><strong></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['actor_abreviatura']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['asunto']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['descripcion']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['nro_documento']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['observaciones']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['condicion_estado']) . '</font></td>';
				$html .= '  </tr> ';
			};
		};
		$html .= ' </table> ';
		$html .= '    <br/>';
		$html .= '	<script type="text/php">
		  if (isset($pdf)) {
			  $footer = $pdf->open_object();
			  $w = $pdf->get_width();
			  $h = $pdf->get_height();
			  $font = Font_Metrics::get_font("helvetica", "normal");
			  $txtHeight = Font_Metrics::get_font_height($font, 8);
			  $y = $h - 2 * $txtHeight - 24;
			  $color = array(0, 0, 0);
			  $width = Font_Metrics::get_text_width($text, $font, 8);
			  $pdf->page_text($w - $width - 650, $y-2,"_________________________________________________________________________________________________" , $font, 8, $color);
			  $pdf->page_text($w - $width - 450, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
			  $pdf->close_object();
			  $pdf->add_object($footer, "all");
		  }
			</script>
		  </body>';

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));
		$pdf->set_paper("A4", "landscape");
		ini_set("memory_limit", "2048M");
		set_time_limit(1000);
		$pdf->render();
		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}


	// DescargarExcelOTD
	public function DescargarExcelOTD()
	{
		$fecha1 = trim($_GET["Ini"]);
		$fecha2 = trim($_GET["Fin"]);
		$TodoUser = trim($_GET["todosuser"]);
		$actor_actual = trim($_SESSION["usuario"]["actor"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);

		header("Content-Type: application/xls");
		header("Content-Disposition: attachment; filename=ExpedientesRegistrados_" . date('Y:m:d:m:s') . ".xls");
		header("Pragma: no-cache");
		header("Expires: 0");
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 9px; font-family: "DejaVu Sans, sans-serif"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$html .= '<table width="100%">';
		$html .= '<tr>';
		$html .= '<td width="21%">&nbsp;</td>';
		$html .= '<td width="59%" rowspan="3" valign="top"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
		$html .= '<td width="7%" valign="top">Impresion:</td>';
		$html .= '<td width="12%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
		$html .= '</tr>';
		$html .= '<tr>';
		$html .= '<td>&nbsp;</td>';
		$html .= '<td>Usuario:</td>';
		$html .= '<td>' . $user . '</td>';
		$html .= '</tr>';
		$html .= '</table><br>';
		$html .= '<h2> Reporte de Expedientes Registrados desde : ' . $fecha1 . ' Hasta : ' . $fecha2 . '</h2>';
		for ($i = 0; $i < 3; $i++) {
			$html .= '<br>';
		}
		$html .= '<table width="100%" border = "1" cellpadding="0" cellspacing="0">';
		$html .= ' <tr> ';
		$html .= '  <td><center><strong>EXPEDIENTE</strong></center></td> ';
		$html .= '  <td><center><strong>FECHA</strong></center></td> ';
		$html .= '  <td><center><strong>HORA</strong></center></td> ';
		$html .= '  <td><center><strong>REMITENTE</strong></center></td>';
		$html .= '  <td><center><strong>ASUNTO</strong></center></td>';
		$html .= '  <td><center><strong>Nro</strong></center></td>';
		$html .= '  <td><center><strong>Observaciones</strong></center></td>';
		$html .= '  <td><center><strong>Estado Actual</strong></center></td>';
		$html .= ' </tr>';
		$this->_expe_reci = $this->loadModel('expediente');
		// $cabecera = $this->_expe_reci->ReportesExpedientesRecibidos($fecha1, $fecha2, $actor_actual);
		$cabecera = $this->_expe_reci->ReportesExpedientesOTD($fecha1, $fecha2, $actor_actual, $TodoUser, $user);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= ' <tr>';
				$html .= ' <td width="2%">' . $mostrar['expediente_id'] . '</td>';
				$html .= ' <td width="10%"><font size=1>' . $mostrar['fecha'] . '</font><strong></td>';
				$html .= ' <td width="10%"><font size=1>' . $mostrar['hora'] . '</font><strong></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['actor_nombre']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['asunto']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['nro_docu']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['observaciones']) . '</font></td>';
				$html .= ' <td width="8%"><font size=1>' . utf8_decode($mostrar['estado']) . '</font></td>';
				$html .= '  </tr> ';
			};
		};
		$html .= ' </table> ';
		$html .= '</body>';
		$html .= '</html>';
		echo $html;
	}


	public function impresion_hoja_de_tramite_total()
	{
		$iduser = trim($_GET["id"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$descripcion_actor = trim($_SESSION["usuario"]["descripcion_actor"]);
		$nombres_para_archivo  = $iduser;
		$nombre_archivo_pdf = "HOJA_DE_TRAMITE_" . $nombres_para_archivo . "_" . date("d-m-Y") . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$html .= '</head>';
		$html .= '<body>';
		$this->_list = $this->loadModel('expediente');
		$listado = $this->_list->VerListadoExpedientes($iduser);
		$array = json_decode($listado, true);
		foreach ($array  as $ver_expe) {
		 	if ($ver_expe['respuesta'] == 1) {
				$inicioexp = $ver_expe['expediente_id'];
				$finexp = $inicioexp;
				$this->_expe = $this->loadModel('expediente');
				$cabecera = $this->_expe->VerDatosCabeceraHT($inicioexp, $finexp, $actor_registra);
				$array = json_decode($cabecera, true);
				foreach ($array  as $mostrar) {
					if ($mostrar['respuesta'] == 1) {
						$html .= '</head>';
						$html .= '<body>';
						$html .= '<table width="100%">';
						$html .= '<tr>';
						$html .= '<td width="65%" rowspan="2"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
						$html .= '<td width="15%"  >Impresion:</td>';
						$html .= '<td width="20%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
						$html .= '</tr>';
						$html .= '<tr>';
						$html .= '<td width="15%"  >Usuario:</td>';
						$html .= '<td>' . $user . '</td>';
						$html .= '</tr>';
						$html .= '</table>';
						$html .= '<h4 class="title"> <center>-- HOJA DE TRAMITE -- </center> </h4>';
						$html .= '<table width="100%">';
						$html .= ' <tr> ';
						$html .= ' <td width="30%">Tipo documento :</td> ';
						$html .= ' <td width="35%"><strong>' . $mostrar['tipo_doc'] . '</strong></td> ';
						$html .= ' <td width="30%">Nro. Expediente : </td> ';
						$html .= ' <td width="42%"><strong><font size=4>' . $mostrar['expediente_id'] . '</font></strong></td> ';
						$html .= ' </tr> ';
						$html .= ' <tr> ';
						$html .= ' <td>Nro documento : </td> ';
						$html .= ' <td><strong>' . utf8_decode($mostrar['nro_documento']) . '</strong></td> ';
						$html .= ' <td>Operador :</td> ';
						$html .= ' <td width="60%"><strong>' . mb_strtoupper(utf8_decode($descripcion_actor), 'UTF-8') . '</strong></td> ';
						$html .= ' </tr> ';
						$html .= '<tr> ';
						$html .= '<td></td>';
						$html .= '<td></td>';
						$html .= '<td>Fecha Registro :</td>';
						$html .= '<td>' . $mostrar['fecha'] . ' ' . $mostrar['hora'] . '</td>';
						$html .= '</tr>';
						$html .= '</table> ';
						$html .= '<table width="100%">';
						$html .= '<tr>';
						$html .= '<td width="10%">Interesado :</td>';
						$html .= '<td width="93%"><strong><font size=2><u>' . utf8_decode($mostrar['actor_nombre']) . '</u></font></strong></td>';
						$html .= '</tr>';
						$html .= '<tr>';
						$html .= '<td>Asunto :</td>';
						$html .= '<td><strong>' . utf8_decode(trim($mostrar['asunto'])) . '</strong></td>';
						$html .= '</tr>';
						$html .= '</table>';
						$html .= '<table width="100%" border="1px" cellpadding="0" cellspacing="0">';
						$html .= ' <tr> ';
						$html .= '			  <td width="5%" bgcolor="#CCCCCC">NRO</td>';
						$html .= '            <td width="35%" bgcolor="#CCCCCC"><center>DESTINATARIO</center></td> ';
						$html .= '            <td width="5%" bgcolor="#CCCCCC"><center>PR</center></td> ';
						$html .= '            <td width="8%" bgcolor="#CCCCCC"><center>CLAVE</center></td> ';
						$html .= '            <td width="11%" bgcolor="#CCCCCC"><center>FECHA</center></td> ';
						$html .= '            <td width="36%" bgcolor="#CCCCCC"><center>REMITIDO POR :</center></td> ';
						$html .= '        </tr> ';
						$this->_expe = $this->loadModel('expediente');
						$cabecera = $this->_expe->VerDetalleExpediente($inicioexp);
						$array = json_decode($cabecera, true);
						foreach ($array  as $mostrar) {
							if ($mostrar['respuesta'] == 1) {
								$registros = max($mostrar['correlativo'], 0);
								$html .= ' <tr>';
								$html .= ' <td width="2%"><center>' . str_pad($mostrar['correlativo'], 2, "0", STR_PAD_LEFT) . '</center></td>';
								$html .= '            <td>' . $mostrar['actor_2_descripcion'] . '</td> ';
								$html .= '            <td><center>' . $mostrar['prioridad'] . '</center></td> ';
								$html .= '            <td><center>' . $mostrar['accion1'] . '&nbsp;&nbsp;&nbsp;&nbsp;' . $mostrar['accion2'] . '</center></td> ';
								$html .= '            <td><center>' . $mostrar['fecha'] . '</center></td> ';
								$html .= '            <td>&nbsp;</td> ';
								$html .= '  </tr> ';
							};
						};

						switch ($registros) {
							case $registros < 15:
								for ($i = $registros + 1; $i < 15; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 14 and $registros  < 27:
								for ($i = $registros + 1; $i < 27; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;
							case $registros > 26 and $registros  < 39:
								for ($i = $registros + 1; $i < 39; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 38 and $registros  < 53:
								for ($i = $registros + 1; $i < 53; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 52 and $registros  < 65:
								for ($i = $registros + 1; $i < 65; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 64 and $registros  < 78:
								for ($i = $registros + 1; $i < 78; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 78 and $registros  < 92:
								for ($i = $registros + 1; $i < 92; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 91 and $registros  < 105:
								for ($i = $registros + 1; $i < 105; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 104 and $registros  < 118:
								for ($i = $registros + 1; $i < 118; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 117 and $registros  < 131:
								for ($i = $registros + 1; $i < 131; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							case $registros > 130:
								for ($i = $registros + 1; $i < $registros + 11; $i++) {
									$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
									$html .= '  <tr>';
									$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td><br></td>';
									$html .= '    <td>&nbsp;<br><br></td> ';
									$html .= '  </tr>';
								}
								break;

							default:
								echo "no definido";
						}
						$html .= '    </table>';
						$html .= '    <br/>';
						$html .= ' <table width="100%">';
						$html .= ' <tr> ';
						$html .= '    <td width="33%" bgcolor="#CCCCCC">Motivo del Pase: (Clave)</td>';
						$html .= '    <td width="34%">&nbsp;</td>';
						$html .= '    <td width="33%" bgcolor="#CCCCCC">Pr. - Prioridad</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>01.- Aprobacion</td>';
						$html .= '    <td>09.- Segun solicitado</td>';
						$html .= '    <td>01.- Baja</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>02.- Atencion</td>';
						$html .= '    <td>10.- Tomara nota y devolver</td>';
						$html .= '    <td>02.- Normal</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>03.- Su conocimiento</td>';
						$html .= '    <td>11.- Archivar</td>';
						$html .= '    <td>03.- Alta</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>04.- Opinion</td>';
						$html .= '    <td>12.- Accion inmediata</td>';
						$html .= '    <td>04.- Muy Alta</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>05.- Informe y devolver</td>';
						$html .= '    <td>13.- Prepare contestacion</td>';
						$html .= '    <td>05.- Confidencial</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>06.- Por corresponder</td>';
						$html .= '    <td>14.- Proyecto resolucion</td>';
						$html .= '    <td>&nbsp;</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>07.- Para conversar</td>';
						$html .= '    <td>15.- Ver Observacion</td>';
						$html .= '    <td>&nbsp;</td>';
						$html .= '  </tr>';
						$html .= '  <tr>';
						$html .= '    <td>08.- Acompañar Antecedentes</td>';
						$html .= '    <td>&nbsp;</td>';
						$html .= '    <td>&nbsp;</td>';
						$html .= '  </tr>';
						$html .= '</table>';
						$html .= '<br/>';
						$html .= '<table width="100%" border="1" cellpadding="1" cellspacing="1">';
						$html .= ' <tr> ';
						$html .= ' <td><strong>OBSERVACIONES :</strong>';
						$html .= ' <p>&nbsp;</p></td> ';
						$html .= ' </tr> ';
						$html .= '</table>';
						$html .= '	<script type="text/php">
						if (isset($pdf)) {
							$footer = $pdf->open_object();
							$w = $pdf->get_width();
							$h = $pdf->get_height();
							$font = Font_Metrics::get_font("helvetica", "normal");
							$txtHeight = Font_Metrics::get_font_height($font, 8);
							$y = $h - 2 * $txtHeight - 24;
							$color = array(0, 0, 0);
							$width = Font_Metrics::get_text_width($text, $font, 8);
							$pdf->page_text($w - $width - 550, $y-2,"_____________________________________________________________________________________________________________________" , $font, 8, $color);
							$pdf->page_text($w - $width - 350, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
							$pdf->close_object();
							$pdf->add_object($footer, "all");
						}
						  </script>
						</body><div style="page-break-before: always;"></div>';
					};
				};
			};

		};

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "portrait");
		ini_set("memory_limit", "2048M");
		set_time_limit(500);
		$pdf->render();

		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}

	public function impresion_hoja_de_tramite()
	{

		$inicioexp = trim($_GET["min"]);
		$finexp = trim($_GET["max"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$descripcion_actor = trim($_SESSION["usuario"]["descripcion_actor"]);

		$nombres_para_archivo  = $inicioexp . ' _ ' . $finexp;
		$nombre_archivo_pdf = "HOJA_DE_TRAMITE_" . $nombres_para_archivo . "_" . date("d-m-Y") . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$this->_expe = $this->loadModel('expediente');
		$cabecera = $this->_expe->VerDatosCabeceraHT($inicioexp, $finexp, $actor_registra);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= '</head>';
				$html .= '<body>';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="65%" rowspan="2"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
				$html .= '<td width="15%"  >Impresion:</td>';
				$html .= '<td width="20%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td width="15%"  >Usuario:</td>';
				$html .= '<td>' . $user . '</td>';
				$html .= '</tr>';
				$html .= '</table>';
				$html .= '<h4 class="title"> <center>-- HOJA DE TRAMITE -- </center> </h4>';
				$html .= '<table width="100%">';
				$html .= ' <tr> ';
				$html .= ' <td width="30%">Tipo documento :</td> ';
				$html .= ' <td width="35%"><strong>' . $mostrar['tipo_doc'] . '</strong></td> ';
				$html .= ' <td width="30%">Nro. Expediente : </td> ';
				$html .= ' <td width="42%"><strong><font size=4>' . $mostrar['expediente_id'] . '</font></strong></td> ';
				$html .= ' </tr> ';
				$html .= ' <tr> ';
				$html .= ' <td>Nro documento : </td> ';
				$html .= ' <td><strong>' . utf8_decode($mostrar['nro_documento']) . '</strong></td> ';
				$html .= ' <td>Operador :</td> ';
				$html .= ' <td width="60%"><strong>' . mb_strtoupper(utf8_decode($descripcion_actor), 'UTF-8') . '</strong></td> ';
				$html .= ' </tr> ';
				$html .= '<tr> ';
				$html .= '<td></td>';
				$html .= '<td></td>';
				$html .= '<td>Fecha Registro :</td>';
				$html .= '<td>' . $mostrar['fecha'] . ' ' . $mostrar['hora'] . '</td>';
				$html .= '</tr>';
				$html .= '</table> ';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="10%">Interesado :</td>';
				$html .= '<td width="93%"><strong><font size=2><u>' . utf8_decode($mostrar['actor_nombre']) . '</u></font></strong></td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td>Asunto :</td>';
				$html .= '<td><strong>' . utf8_decode(trim($mostrar['asunto'])) . '</strong></td>';
				$html .= '</tr>';
				$html .= '</table>';


				$html .= '<table width="100%" border="1px" cellpadding="0" cellspacing="0">';
				$html .= ' <tr> ';
				$html .= '			  <td width="5%" bgcolor="#CCCCCC">NRO</td>';
				$html .= '            <td width="35%" bgcolor="#CCCCCC"><center>DESTINATARIO</center></td> ';
				$html .= '            <td width="5%" bgcolor="#CCCCCC"><center>PR</center></td> ';
				$html .= '            <td width="8%" bgcolor="#CCCCCC"><center>CLAVE</center></td> ';
				$html .= '            <td width="11%" bgcolor="#CCCCCC"><center>FECHA</center></td> ';
				$html .= '            <td width="36%" bgcolor="#CCCCCC"><center>REMITIDO POR :</center></td> ';
				$html .= '        </tr> ';

				$this->_expe = $this->loadModel('expediente');
				$cabecera = $this->_expe->VerDetalleExpediente($inicioexp);
				$array = json_decode($cabecera, true);
				foreach ($array  as $mostrar) {
					if ($mostrar['respuesta'] == 1) {
						$registros = max($mostrar['correlativo'], 0);
						$html .= ' <tr>';
						$html .= ' <td width="2%"><center>' . str_pad($mostrar['correlativo'], 2, "0", STR_PAD_LEFT) . '</center></td>';
						$html .= '            <td>' . $mostrar['actor_2_descripcion'] . '</td> ';
						$html .= '            <td><center>' . $mostrar['prioridad'] . '</center></td> ';
						$html .= '            <td><center>' . $mostrar['accion1'] . '&nbsp;&nbsp;&nbsp;&nbsp;' . $mostrar['accion2'] . '</center></td> ';
						$html .= '            <td><center>' . $mostrar['fecha'] . '</center></td> ';
						$html .= '            <td>&nbsp;</td> ';
						$html .= '  </tr> ';
					};
				};

				switch ($registros) {
					case $registros < 15:
						for ($i = $registros + 1; $i < 15; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 14 and $registros  < 27:
						for ($i = $registros + 1; $i < 27; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;
					case $registros > 26 and $registros  < 39:
						for ($i = $registros + 1; $i < 39; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 38 and $registros  < 53:
						for ($i = $registros + 1; $i < 53; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 52 and $registros  < 65:
						for ($i = $registros + 1; $i < 65; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 64 and $registros  < 78:
						for ($i = $registros + 1; $i < 78; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 78 and $registros  < 92:
						for ($i = $registros + 1; $i < 92; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 91 and $registros  < 105:
						for ($i = $registros + 1; $i < 105; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 104 and $registros  < 118:
						for ($i = $registros + 1; $i < 118; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 117 and $registros  < 131:
						for ($i = $registros + 1; $i < 131; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 130:
						for ($i = $registros + 1; $i < $registros + 11; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					default:
						echo "no definido";
				}
				$html .= '    </table>';
				$html .= '    <br/>';
				$html .= ' <table width="100%">';
				$html .= ' <tr> ';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Motivo del Pase: (Clave)</td>';
				$html .= '    <td width="34%">&nbsp;</td>';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Pr. - Prioridad</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>01.- Aprobacion</td>';
				$html .= '    <td>09.- Segun solicitado</td>';
				$html .= '    <td>01.- Baja</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>02.- Atencion</td>';
				$html .= '    <td>10.- Tomara nota y devolver</td>';
				$html .= '    <td>02.- Normal</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>03.- Su conocimiento</td>';
				$html .= '    <td>11.- Archivar</td>';
				$html .= '    <td>03.- Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>04.- Opinion</td>';
				$html .= '    <td>12.- Accion inmediata</td>';
				$html .= '    <td>04.- Muy Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>05.- Informe y devolver</td>';
				$html .= '    <td>13.- Prepare contestacion</td>';
				$html .= '    <td>05.- Confidencial</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>06.- Por corresponder</td>';
				$html .= '    <td>14.- Proyecto resolucion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>07.- Para conversar</td>';
				$html .= '    <td>15.- Ver Observacion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>08.- Acompañar Antecedentes</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '</table>';
				$html .= '<br/>';
				$html .= '<table width="100%" border="1" cellpadding="1" cellspacing="1">';
				$html .= ' <tr> ';
				$html .= ' <td><strong>OBSERVACIONES :</strong>';


				$html .= ' <p>&nbsp;</p></td> ';
				$html .= ' </tr> ';
				$html .= '</table>';
				$html .= '	<script type="text/php">
				if (isset($pdf)) {
					$footer = $pdf->open_object();
					$w = $pdf->get_width();
					$h = $pdf->get_height();
					$font = Font_Metrics::get_font("helvetica", "normal");
					$txtHeight = Font_Metrics::get_font_height($font, 8);
					$y = $h - 2 * $txtHeight - 24;
					$color = array(0, 0, 0);
					$width = Font_Metrics::get_text_width($text, $font, 8);
					$pdf->page_text($w - $width - 550, $y-2,"_____________________________________________________________________________________________________________________" , $font, 8, $color);
					$pdf->page_text($w - $width - 350, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
					$pdf->close_object();
					$pdf->add_object($footer, "all");
				}
				  </script>
				</body>';
			};
		};

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "portrait");
		ini_set("memory_limit", "2048M");
		set_time_limit(500);
		$pdf->render();

		$pdf->get_canvas()->get_page_count();
		$pdf->stream($nombre_archivo_pdf, array('Attachment' => false));
	}


	public function impresion_hoja_de_tramite_adjunto()
	{

		$inicioexp = trim($_GET["min"]);
		$finexp = trim($_GET["max"]);
		$user = trim($_SESSION["usuario"]["nombreusuario"]);
		$actor_registra = trim($_SESSION["usuario"]["actor"]);
		$descripcion_actor = trim($_SESSION["usuario"]["descripcion_actor"]);
		$nombres_para_archivo  = $inicioexp;


		$nombre_archivo_pdf = "HOJA_DE_TRAMITE_" . $nombres_para_archivo . ".PDF";
		$html = $this->html;
		$html = '<html>';
		$html .= '<head>';
		$html .= '<meta content="text/html; charset=utf-8"/>';
		$html .= '<style>';
		$html .= 'body { font-size: 12px; font-family: "Arial"; margin-top: 0; padding-top: 0; }';
		$html .= '</style>';
		$this->_expe = $this->loadModel('expediente');
		$cabecera = $this->_expe->VerDatosCabeceraHT($inicioexp, $finexp, $actor_registra);
		$array = json_decode($cabecera, true);
		foreach ($array  as $mostrar) {
			if ($mostrar['respuesta'] == 1) {
				$html .= '</head>';
				$html .= '<body>';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="65%" rowspan="2"><img src="' . BASE_URL . 'public/gra/logo_hjatch.jpg" width="443" hight = "10"></td>';
				$html .= '<td width="15%"  >Impresion:</td>';
				$html .= '<td width="20%">' . date("d/m/Y") . ' ' . date("H:i:s", time()) . '</td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td width="15%"  >Usuario:</td>';
				$html .= '<td>' . $user . '</td>';
				$html .= '</tr>';
				$html .= '</table>';
				$html .= '<h4 class="title"> <center>-- HOJA DE TRAMITE -- </center> </h4>';
				$html .= '<table width="100%">';
				$html .= ' <tr> ';
				$html .= ' <td width="30%">Tipo documento :</td> ';
				$html .= ' <td width="35%"><strong>' . $mostrar['tipo_doc'] . '</strong></td> ';
				$html .= ' <td width="30%">Nro. Expediente : </td> ';
				$html .= ' <td width="42%"><strong><font size=4>' . $mostrar['expediente_id'] . '</font></strong></td> ';
				$html .= ' </tr> ';
				$html .= ' <tr> ';
				$html .= ' <td>Nro documento : </td> ';
				$html .= ' <td><strong>' . utf8_decode($mostrar['nro_documento']) . '</strong></td> ';
				$html .= ' <td>Operador :</td> ';
				$html .= ' <td width="60%"><strong>' . mb_strtoupper(utf8_decode($descripcion_actor), 'UTF-8') . '</strong></td> ';
				$html .= ' </tr> ';
				$html .= '<tr> ';
				$html .= '<td></td>';
				$html .= '<td></td>';
				$html .= '<td>Fecha Registro :</td>';
				$html .= '<td>' . $mostrar['fecha'] . ' ' . $mostrar['hora'] . '</td>';
				$html .= '</tr>';
				$html .= '</table> ';
				$html .= '<table width="100%">';
				$html .= '<tr>';
				$html .= '<td width="10%">Interesado :</td>';
				$html .= '<td width="93%"><strong><font size=2><u>' . utf8_decode($mostrar['actor_nombre']) . '</u></font></strong></td>';
				$html .= '</tr>';
				$html .= '<tr>';
				$html .= '<td>Asunto :</td>';
				$html .= '<td><strong>' . utf8_decode(trim($mostrar['asunto'])) . '</strong></td>';
				$html .= '</tr>';
				$html .= '</table>';


				$html .= '<table width="100%" border="1px" cellpadding="0" cellspacing="0">';
				$html .= ' <tr> ';
				$html .= '			  <td width="5%" bgcolor="#CCCCCC">NRO</td>';
				$html .= '            <td width="35%" bgcolor="#CCCCCC"><center>DESTINATARIO</center></td> ';
				$html .= '            <td width="5%" bgcolor="#CCCCCC"><center>PR</center></td> ';
				$html .= '            <td width="8%" bgcolor="#CCCCCC"><center>CLAVE</center></td> ';
				$html .= '            <td width="11%" bgcolor="#CCCCCC"><center>FECHA</center></td> ';
				$html .= '            <td width="36%" bgcolor="#CCCCCC"><center>REMITIDO POR :</center></td> ';
				$html .= '        </tr> ';

				$this->_expe = $this->loadModel('expediente');
				$cabecera = $this->_expe->VerDetalleExpediente($inicioexp);
				$array = json_decode($cabecera, true);
				foreach ($array  as $mostrar) {
					if ($mostrar['respuesta'] == 1) {
						$registros = max($mostrar['correlativo'], 0);
						$html .= ' <tr>';
						$html .= ' <td width="2%"><center>' . str_pad($mostrar['correlativo'], 2, "0", STR_PAD_LEFT) . '</center></td>';
						$html .= '            <td>' . $mostrar['actor_2_descripcion'] . '</td> ';
						$html .= '            <td><center>' . $mostrar['prioridad'] . '</center></td> ';
						$html .= '            <td><center>' . $mostrar['accion1'] . '&nbsp;&nbsp;&nbsp;&nbsp;' . $mostrar['accion2'] . '</center></td> ';
						$html .= '            <td><center>' . $mostrar['fecha'] . '</center></td> ';
						$html .= '            <td>&nbsp;</td> ';
						$html .= '  </tr> ';
					};
				};

				switch ($registros) {
					case $registros < 15:
						for ($i = $registros + 1; $i < 15; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 14 and $registros  < 27:
						for ($i = $registros + 1; $i < 27; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;
					case $registros > 26 and $registros  < 39:
						for ($i = $registros + 1; $i < 39; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 38 and $registros  < 53:
						for ($i = $registros + 1; $i < 53; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 52 and $registros  < 65:
						for ($i = $registros + 1; $i < 65; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 64 and $registros  < 78:
						for ($i = $registros + 1; $i < 78; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 78 and $registros  < 92:
						for ($i = $registros + 1; $i < 92; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 91 and $registros  < 105:
						for ($i = $registros + 1; $i < 105; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 104 and $registros  < 118:
						for ($i = $registros + 1; $i < 118; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 117 and $registros  < 131:
						for ($i = $registros + 1; $i < 131; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					case $registros > 130:
						for ($i = $registros + 1; $i < $registros + 11; $i++) {
							$numeroConCeros = str_pad($i, 2, "0", STR_PAD_LEFT);
							$html .= '  <tr>';
							$html .= ' <td width="2%"><center>' . $numeroConCeros . '<br></center></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td><br></td>';
							$html .= '    <td>&nbsp;<br><br></td> ';
							$html .= '  </tr>';
						}
						break;

					default:
						echo "no definido";
				}
				$html .= '    </table>';
				$html .= '    <br/>';
				$html .= ' <table width="100%">';
				$html .= ' <tr> ';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Motivo del Pase: (Clave)</td>';
				$html .= '    <td width="34%">&nbsp;</td>';
				$html .= '    <td width="33%" bgcolor="#CCCCCC">Pr. - Prioridad</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>01.- Aprobacion</td>';
				$html .= '    <td>09.- Segun solicitado</td>';
				$html .= '    <td>01.- Baja</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>02.- Atencion</td>';
				$html .= '    <td>10.- Tomara nota y devolver</td>';
				$html .= '    <td>02.- Normal</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>03.- Su conocimiento</td>';
				$html .= '    <td>11.- Archivar</td>';
				$html .= '    <td>03.- Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>04.- Opinion</td>';
				$html .= '    <td>12.- Accion inmediata</td>';
				$html .= '    <td>04.- Muy Alta</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>05.- Informe y devolver</td>';
				$html .= '    <td>13.- Prepare contestacion</td>';
				$html .= '    <td>05.- Confidencial</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>06.- Por corresponder</td>';
				$html .= '    <td>14.- Proyecto resolucion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>07.- Para conversar</td>';
				$html .= '    <td>15.- Ver Observacion</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '  <tr>';
				$html .= '    <td>08.- Acompañar Antecedentes</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '    <td>&nbsp;</td>';
				$html .= '  </tr>';
				$html .= '</table>';
				$html .= '<br/>';
				$html .= '<table width="100%" border="1" cellpadding="1" cellspacing="1">';
				$html .= ' <tr> ';
				$html .= ' <td><strong>OBSERVACIONES :</strong>';


				$html .= ' <p>&nbsp;</p></td> ';
				$html .= ' </tr> ';
				$html .= '</table>';
				$html .= '	<script type="text/php">
				if (isset($pdf)) {
					$footer = $pdf->open_object();
					$w = $pdf->get_width();
					$h = $pdf->get_height();
					$font = Font_Metrics::get_font("helvetica", "normal");
					$txtHeight = Font_Metrics::get_font_height($font, 8);
					$y = $h - 2 * $txtHeight - 24;
					$color = array(0, 0, 0);
					$width = Font_Metrics::get_text_width($text, $font, 8);
					$pdf->page_text($w - $width - 550, $y-2,"_____________________________________________________________________________________________________________________" , $font, 8, $color);
					$pdf->page_text($w - $width - 350, $y+7, "Pag: {PAGE_NUM} de {PAGE_COUNT}" , $font, 8, $color);
					$pdf->close_object();
					$pdf->add_object($footer, "all");
				}
				  </script>
				</body>';
			};
		};

		$html .= '</html>';
		$this->getLibrary("dompdf/dompdf_config.inc");
		$pdf = new DOMPDF();
		$pdf->load_html(utf8_decode($html));

		$pdf->set_paper("A4", "portrait");
		ini_set("memory_limit", "2048M");
		set_time_limit(500);
		$pdf->render();

		$pdf->get_canvas()->get_page_count();
		// $pdf->stream($nombre_archivo_pdf, array('Attachment' => true));
		$pdf->stream($nombre_archivo_pdf);
	}
}
