<?php
class resolucionModel extends Model
{
    public
    function __construct()
    {
        parent::__construct();
    }

    public function ListaResolucion($nro, $anio, $mes)
    {
        $filtro = " and YEAR(a.fecha) =  " . $anio;
        if ($nro == '') {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and a.nombre like '%" . $nro . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(a.fecha) = " . $mes;
        }
        $order = " order by a.resolucion desc";
        $query = " select a.resolucion, a.nombre, a.url, a.descripcion, substring(a.nombre,10,2) as unidad, a.fecha, date_format(a.fecha, '%d/%m/%y') fecha_dmy, year(a.fecha) as anio, a.oficina, a.usuario, a.registro, ";
        $query = $query . " b.oficina as idoficina, b.nombre as descripcion_oficina from resolucion a left join oficina b on a.oficina = b.oficina  where b.oficina in (1,3,11) " . $filtro . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'resolucion' => trim($imprimir->resolucion),
                    'fecha_dmy' => trim($imprimir->fecha_dmy),
                    'unidad' => trim($imprimir->unidad),
                    'nombre' => trim($imprimir->nombre),
                    'descripcion' => trim($imprimir->descripcion),
                    'url' => trim($imprimir->url),
                    'anio' => trim($imprimir->anio),
                    'idoficina' => trim($imprimir->idoficina),
                    'oficina' => trim($imprimir->descripcion_oficina),
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function ListaPlanTrabajo($nro, $anio, $mes)
    {
        $filtro = " and YEAR(fecha) =  " . $anio;
        if ($nro == '') {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and url like '%" . $nro . "%'";
        }
        if ($mes == '0' or $mes == null) {
            $filtro = $filtro . '';
        } else {
            $filtro = $filtro . " and MONTH(fecha) = " . $mes;
        }
        $order = " order by plan_trabajo desc";
        $query = "select a.plan_trabajo, a.oficina, a.fecha, a.descripcion, a.url, a.activo, DATE_FORMAT(a.fecha, '%d/%m/%Y') fecha_dmy, YEAR(a.fecha) as anio, a.registro, b.oficina idoficina, b.nombre ";
        $query = $query . "   from plan_trabajo a left join oficina b on a.oficina = b.oficina where 1 = 1 " . $filtro . $order;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'plan_trabajo' => trim($imprimir->plan_trabajo),
                    'fecha_dmy' => trim($imprimir->fecha_dmy),
                    'oficina' => trim($imprimir->oficina),
                    'descripcion' => trim($imprimir->descripcion),
                    'oficina_descripcion' => trim($imprimir->nombre),
                    'url' => trim($imprimir->url),
                    'anio' => trim($imprimir->anio)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }


    public function GrabarResolucion($tipo, $idoficina, $fecha, $descripcion, $archivo_pdf, $nombre, $dni)
    {
        if ($tipo == 0) {

            $sql_update_registro = "insert into resolucion(nombre,url,descripcion,fecha,oficina,usuario,registro) ";
            $sql_update_registro = $sql_update_registro . " values ('" . $nombre . "', '" . $archivo_pdf . "', '" . $descripcion . "', STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'), '" . $idoficina . "', '" . $dni . "', now());";
        } else {
            $sql_update_registro = "update resolucion set nombre  = '" . $nombre . "', url = '" . $archivo_pdf . "', descripcion = '" . $descripcion . "',  fecha = STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'),";
            $sql_update_registro = $sql_update_registro . "  oficina = ''" . $idoficina . "',  usuario = '" . $dni . "', registro = now() where resolucion = " . $tipo;
        }
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public function GrabarPlanTrabajo($idofiplan, $fecha, $nombreplan, $archivo_pdf, $idoficina)
    {
        $sql_update_registro = " insert into plan_trabajo(oficina, fecha, descripcion, url, activo, registro) ";
        $sql_update_registro = $sql_update_registro . " values( '" . $idofiplan . "', STR_TO_DATE('" . $fecha . "', '%d/%m/%Y %T.%f'), '" . $nombreplan . "', '" . $archivo_pdf . "', '" . $idoficina . "', now()) ";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }




    public function  EliminarResolucion($id, $archivo_pdf)
    {
        $sql_update_registro = " delete from resolucion where  resolucion = " . $id;
        $sql_update_registro = $sql_update_registro . " ; delete from plan_trabajo where url = '" . $archivo_pdf . "'";
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }

    public function  EliminarPlanTrabajo($id)
    {
        $sql_update_registro = " delete from plan_trabajo where plan_trabajo =  " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }


    public function GetResolucion($idresolucion)
    {
        $query = "select fecha, oficina, resolucion, DATE_FORMAT(fecha, '%d/%m/%Y') fecha_dmy, nombre, descripcion, url,  YEAR(fecha) as anio  from resolucion where resolucion  = " . $idresolucion;
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'resolucion' => trim($imprimir->resolucion),
                    'fecha_dmy' => trim($imprimir->fecha_dmy),
                    'nombre' => trim($imprimir->nombre),
                    'oficina' => trim($imprimir->oficina),
                    'descripcion' => trim($imprimir->descripcion),
                    'url' => trim($imprimir->url),
                    'anio' => trim($imprimir->anio)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }

    public function GetOficina()
    {
        $query = "select oficina, nombre from oficina";
        $resultado = $this->_db->prepare($query);
        $resultado->execute();
        if ($resultado->rowCount()) {
            while ($imprimir = $resultado->fetch(PDO::FETCH_OBJ)) {
                $array[] = array(
                    'respuesta' => 1,
                    'oficina' => trim($imprimir->oficina),
                    'nombre' => trim($imprimir->nombre)
                );
            }
        } else {
            $array[] = array('respuesta' => 0);
        }
        return json_encode($array);
    }




    public function   UPdatePL($id,  $idoficina, $descrip)
    {
        $sql_update_registro = " update plan_trabajo set oficina = '" . $idoficina . "', descripcion = '" . $descrip . "' where plan_trabajo =  " . $id;
        $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }



    public function  UpdateResolucion($id, $descripcion)
    {
        $sql_update_registro = " update resolucion set descripcion = '" . $descripcion . "'  where resolucion =  " . $id;
         $ejecucion = $this->_db->prepare($sql_update_registro);
        $ejecucion->execute();
        $verificar = array('verificar' => 1);
        return json_encode($verificar);
    }











}
