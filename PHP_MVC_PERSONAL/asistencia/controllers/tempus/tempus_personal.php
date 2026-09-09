<?php





public

function ver_todo_el_personal_tempus( $lc_busqueda ) {
    $read_personal = "declare @lc_busqueda varchar(250) = '" . $lc_busqueda . "'
                        SELECT  [CODIGO], [CENTRO_DE_COSTO], UPPER([APELLIDO_PATERNO]) AS PATERNO, UPPER([APELLIDO_MATERNO]) AS MATERNO, APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES as APELLIDOS_NOMBRES_TOTALES, UPPER([NOMBRES]) AS NOMBRES, FECHA_DE_INGRESO, TARJETA_TMP, DNI, TIPO_HORARIO_TMP, case when TIPO_HORARIO_TMP is null then '' when TIPO_HORARIO_TMP = 'A' then 'ADMINISTRATIVO' when TIPO_HORARIO_TMP = 'S' then 'ASISTENCIAL' ELSE '' END CONDICION, CARGO_PLANILLA, ESTADOTB  FROM [PUSAQ].[TEMPUS].[TEMPUS].[PERSONAL] WHERE ESTADOTB = 1 AND  APELLIDO_PATERNO + ' ' +  APELLIDO_MATERNO + ' ' + NOMBRES	LIKE '%' + RTRIM(@lc_busqueda) + '%'  or codigo like   '%' + RTRIM(@lc_busqueda) + '%' ORDER BY APELLIDO_PATERNO, APELLIDO_MATERNO, NOMBRES";
    $ejecucion_read = $this->_db->prepare( $read_personal );
    $ejecucion_read->execute();
    if ( $ejecucion_read->rowCount() ) {
        while ( $read_filas = $ejecucion_read->fetch( PDO::FETCH_OBJ ) ) {
            $datos_read[] = array(
                'codigo' => $read_filas->CODIGO,
                'paterno' => $read_filas->PATERNO,
                'materno' => $read_filas->MATERNO,
                'nombres' => $read_filas->NOMBRES,
                'apellidos_nombres' => $read_filas->APELLIDOS_NOMBRES_TOTALES,
                'dni' => $read_filas->DNI,
                'condicion' => $read_filas->CONDICION,
                'tipo_horario' => $read_filas->TIPO_HORARIO_TMP,
                'cargo_planilla' => $read_filas->CARGO_PLANILLA );
        }
    } else {
        $datos_read[] = array(
            'codigo' => '',
            'paterno' => '',
            'materno' => '',
            'nombres' => '',
            'apellidos_nombres' => '',
            'dni' => '',
            'condicion' => '',
            'tipo_horario' => '',
            'cargo_planilla' => '' );

    }
    // return json_encode( $datos_read );
    return $datos_read;
}



?>