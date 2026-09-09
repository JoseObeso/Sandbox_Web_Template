<?php

include( 'application/Config_Tempus.php' );


// para el listado de todo el personal de Relog Tempus

 


    $query = "SELECT  [CODIGO], [CENTRO_DE_COSTO], UPPER([APELLIDO_PATERNO]) AS PATERNO, UPPER([APELLIDO_MATERNO]) AS MATERNO, APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES as APELLIDOS_NOMBRES_TOTALES, UPPER([NOMBRES]) AS NOMBRES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, case when TIPO_HORARIO_TMP is null then '' when TIPO_HORARIO_TMP = 'A' then 'ADMINISTRATIVO' when TIPO_HORARIO_TMP = 'S' then 'ASISTENCIAL' ELSE '' END CONDICION, CARGO_PLANILLA, ESTADOTB FROM [TEMPUS].[TEMPUS].[PERSONAL] ORDER BY APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES";
    $resultado = $cnx_tempus->prepare( $query );
    $resultado->execute();
    $datos_obtenidos = $resultado->fetchAll();
  

 





?>