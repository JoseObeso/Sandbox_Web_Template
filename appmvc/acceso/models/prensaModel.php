<?php
class prensaModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }


    public function ListaPrensa($nota, $anio, $mes)
    {
        $filtro = " and YEAR(fecha) = " . $anio;
        if ($nota == '') {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and titulo like '%" . $nota . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(fecha) = " . $mes;
        }
        $order = " order by prensa desc";
        $query = " select prensa, fecha, titulo, subtitulo, imagen, imagen_alternative, detalle, contenido, galeria, autor, activo, case when galeria is null then '0' else '1' end as tiene_galeria, ";
        $query = $query . " case when imagen is null then '0' else '1' end as tiene_imagen  from v_prensa where 1 = 1 " . $filtro . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'prensa' => trim($imprimir->prensa),
                    'fecha' => date("d/m/Y", strtotime($imprimir->fecha)),
                    'titulo' => trim($imprimir->titulo),
                    'subtitulo' => trim($imprimir->subtitulo),
                    'imagen' => trim($imprimir->imagen),
                    'imagen_alternative' => trim($imprimir->imagen_alternative),
                    'detalle' => trim($imprimir->detalle),
                    'galeria' => trim($imprimir->galeria),
                    'tiene_galeria' => trim($imprimir->tiene_galeria),
                    'tiene_imagen' => trim($imprimir->tiene_imagen),
                    'autor' => trim($imprimir->galeria),
                    'activo' => trim($imprimir->activo)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function GrabarImagen2($idprensa,  $imagen2)
    {
        $sql_update_registro =  " update prensa set  imagen = '" . $imagen2 . "'  where prensa = " . $idprensa;
        $sql_update_registro = $sql_update_registro . "; update prensa_mov set  imagen = '" . $imagen2 . "'  where prensa = " . $idprensa;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }










    public function MostrarConte($id)
    {
        $sentencia = "select contenido from v_prensa where prensa = " . $id;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'contenido' => trim($imprimir->contenido)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function  MostrarTextoConte($id)
    {
        
        $sentencia = "select prensa, fecha, titulo, subtitulo, detalle, contenido  from v_prensa where prensa = ".$id;
        $resultado = $this->_db->prepare($sentencia);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'fecha' => date("d/m/Y", strtotime($imprimir->fecha)),
                    'titulo' => trim($imprimir->titulo),
                    'subtitulo' => trim($imprimir->subtitulo),
                    'detalle' => trim($imprimir->detalle)
                    
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


   


    

    public function actualizarGaleria($id, $galeria2)
    {
        $sentencia = "update prensa set galeria = replace('" . $galeria2 . "', ',', ';') where prensa =  " . $id;
        $sentencia = $sentencia . "; update prensa_mov set galeria = replace('" . $galeria2 . "', ',', ';') where prensa =  " . $id;
        $ejecucion = $this->_db->prepare($sentencia);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    



    public function GrabarPrensa($fecha, $titulo, $subtitulo, $detalle, $contenido, $imagen1, $galerias, $dni)
    {
        $sql_update_registro = " insert into prensa (fecha, titulo, subtitulo, imagen, detalle, contenido, galeria, categoria, usuario, publicado, activo) ";
        $sql_update_registro = $sql_update_registro . "  values(STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'), upper('" . $titulo . "') ,  '" . $subtitulo . "', '" . $imagen1 . "', '" . $detalle . "', '" . $contenido . "', ";
        $sql_update_registro = $sql_update_registro . "  replace('" . $galerias . "', ',', ';'), '1', '" . $dni . "', now(), '1') ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function GrabarPrensaModificar($id, $fecha, $titulo, $subtitulo, $detalle, $contenido, $dni)
    {
        $sql_update_registro = "update prensa set fecha = STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'), titulo = upper('" . $titulo . "'), subtitulo = '" . $subtitulo . "', ";
        $sql_update_registro = $sql_update_registro . " detalle = '" . $detalle . "', contenido = '" . $contenido . "' where prensa = ".$id;

        $sql_update_registro = $sql_update_registro ."; update prensa_mov set fecha = STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'), titulo = upper('" . $titulo . "'), subtitulo = '" . $subtitulo . "', ";
        $sql_update_registro = $sql_update_registro . " detalle = '" . $detalle . "', contenido = '" . $contenido . "' where prensa = ".$id;


       

        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    



    public
    function EliminarPrensa($id)
    {
        $sql_update_registro = " delete from prensa where prensa = " . $id;
        $sql_update_registro = $sql_update_registro . "; delete from prensa_mov where prensa = " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }
}
