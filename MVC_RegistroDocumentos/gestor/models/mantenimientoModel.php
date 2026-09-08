<?php




class mantenimientoModel extends Model {
    public

    function __construct() {
        parent::__construct();

    }

    

    public
    function ListaUsuariosRegistrados( $buscar_nombre ) {
        $sql_read = " select A.USUARIO, A.NOMBRE, A.DIRECCION, A.JEFATURA, CASE WHEN A.JEFATURA = 'N' THEN 'NO' ELSE 'SI' END AS TIENE_JEFATURA,
        A.ACTOR, B.DESCRIPCION, B.ABREVIATURA, B.RESPONSABLE from [TRAMITE].[dbo].[USUARIO] A 
             LEFT JOIN [TRAMITE].[dbo].[ACTOR] B ON A.ACTOR = B.ACTOR   WHERE MODULO = 'TRAMITE' AND NOMBRE LIKE '%' + '" . $buscar_nombre . "' + '%' order by  NOMBRE";
        $resultado = $this->_db->prepare( $sql_read );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'resultado' => '1',
                    'usuario' => trim( $imprimir->USUARIO ),
                    'nombre' => utf8_encode( trim( $imprimir->NOMBRE ) ),
                    'direccion' => utf8_encode(trim( $imprimir->DIRECCION )),
                    'jefatura' => utf8_encode(trim( $imprimir->JEFATURA )),
                    'actor_descripcion' => utf8_encode(trim( $imprimir->DESCRIPCION))
                );
            }
        } else {
            $array[] = array( 'resultado' => '0' );
        }
       return  $array ;

    }


    public

    function getListadoUsuarios( $buscar_nombre ) {
        $sentencia = "SELECT DNI, NOMBRES, UNIDAD_ORGANICA, EMAIL, CARGO, FECHA_EXPIRACION, SESION, 
         CASE WHEN SESION = 1 THEN 'EN LINEA' WHEN SESION = 0 THEN 'NO INICIO' ELSE 'NO EXISTE' END AS TIPO_SESION, 
         CASE WHEN ESTADO = 1 THEN 'OPERATIVO' ELSE 'DESACTIVADO' END AS TIPO_ESTADO, ESTADO, UNIDAD, FECH_ULT_INGRESO, 
         CASE WHEN FECH_ULT_INGRESO IS NULL THEN '' ELSE CONVERT(VARCHAR(10),  FECH_ULT_INGRESO, 103) END AS FECHA_ULTIMO_INGRESO_TXT, CASE WHEN FECH_ULT_INGRESO IS NULL THEN '' ELSE CONVERT(VARCHAR, FECH_ULT_INGRESO, 108) END AS HORA_ULTIMO_INGRESO_TXT  FROM [HEVES_RRHH].[DBO].[V_USUARIO_WEB] WHERE NOMBRES LIKE '%' + '" . $buscar_nombre . "' + '%' ORDER BY NOMBRES ASC";
        $resultado = $this->_db->prepare( $sentencia );
        $resultado->execute();
        if ( $resultado->rowCount() ) {
            while ( $imprimir = $resultado->fetch( PDO::FETCH_OBJ ) ) {
                $array[] = array(
                    'resultado' => '1',
                    'dni' => trim( $imprimir->DNI ),
                    'nombres' => utf8_encode( trim( $imprimir->NOMBRES ) ),
                    'email' => utf8_encode( trim( $imprimir->EMAIL ) ),
                    'cargo' => utf8_encode( trim( $imprimir->CARGO ) ),
                    'fecha_expiracion' => date( 'd/m/Y', strtotime( trim( $imprimir->FECHA_EXPIRACION ) ) ),
                    'tipo_sesion' => utf8_encode( trim( $imprimir->TIPO_SESION ) ),
                    'tipo_estado' => utf8_encode( trim( $imprimir->TIPO_ESTADO ) ),
                    'unidad' => utf8_encode( trim( $imprimir->UNIDAD ) ),
                    'fecha_ultimo_ingreso' => utf8_encode( trim( $imprimir->FECHA_ULTIMO_INGRESO_TXT ) ),
                    'hora_ultimo_ingreso' => utf8_encode( trim( $imprimir->HORA_ULTIMO_INGRESO_TXT ) ) );
            }
        } else {
            $array[] = array( 'resultado' => '0' );
        }
        return json_encode( $array );
    }


   
  

     









}
