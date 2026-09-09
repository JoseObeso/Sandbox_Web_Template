<?php

$idfuncion = '260';
$mes = 3;
$anio = 2019;

    


 $consulta_sql = "select FECHA_DATETIME, CONVERT(VARCHAR(10), FECHA_DATETIME, 103) AS FECHA_TURNO, TURNO, HORARIO_INICIO, HORARIO_FINAL,  SERVICIO FROM [HEVES_RRHH].[dbo].[V_TOTAL_PROGRAMACION_FIJA]  WHERE IDFUNCIONAL = '" . $idfuncion . "' AND MES = " . $mes . " AND ANIO = " . $anio." and NOMBRE_DIA = 'LUNES'";


echo $consulta_sql;



?>