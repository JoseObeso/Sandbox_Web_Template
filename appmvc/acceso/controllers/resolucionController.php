<?php
class resolucionController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        session_start();
        if (isset($_SESSION["usuario"]["user"]) && $_SESSION["usuario"]["user"] != '') {
        } else {
            header('location: /');
        }
    }

    public function index()
    {
        $this->_view->titulo = 'Resolucion' . INSTITUCION;
        $this->_view->setJs(array('resolucion'));
        $this->_view->renderizar('index', false);
    }

    public function mostrar_resolucion()
    {
        $nro = $_POST["nro"];
        $anio = $_POST["anio"];
        $mes = $_POST["mes"];
        $this->_listar_resolucion = $this->loadModel('resolucion');
        $datos = $this->_listar_resolucion->ListaResolucion($nro, $anio, $mes);
        echo $datos;
    }

    public function mostrar_plan_trabajo()
    {
        $nro = $_POST["nro"];
        $anio = $_POST["anio"];
        $mes = $_POST["mes"];
        $this->_listar_plan_trabajo = $this->loadModel('resolucion');
        $datos = $this->_listar_plan_trabajo->ListaPlanTrabajo($nro, $anio, $mes);
        echo $datos;
    }





    public function subir_resolucion()
    {
        $nombre_archivo = $_FILES['subir_archivo_resolucion']['name'];
        $anio = $_POST["anio"];
        $numero = $_POST["numero"];
        $folder = $anio;
        $oficina = $_POST["oficina"];
        switch ($oficina) {
            case '1':
                $formato = '-DE-HJATCH';
                break;
            case '3':
                $formato = '-OA-HJATCH';
                break;
            case '11':
                $formato = '-UP-HJATCH';
                break;
            default:
                $formato = '';
                break;
        }

        if ($_POST['oficina'] == 1) {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones/' . $folder . '/';
        } elseif ($_POST['oficina'] == 3) {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones-adm/' . $folder . '/';
        } else {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones-personal/' . $folder . '/';
        }
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $nombrePdf = str_pad($numero, 3, '0', STR_PAD_LEFT) . '-' . $anio . $formato;
        $directorio =  $destino . $nombrePdf . '.pdf';
        if (move_uploaded_file($_FILES["subir_archivo_resolucion"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_resolucion_mod()
    {
        $nombre_archivo = $_FILES['subir_archivo_resolucion_mod']['name'];
        $anio = $_POST["anio"];
        $numero = $_POST["numero"];
        $folder = $anio;
        $oficina = $_POST["oficina"];
        switch ($oficina) {
            case '1':
                $formato = '-DE-HJATCH';
                break;
            case '3':
                $formato = '-OA-HJATCH';
                break;
            case '11':
                $formato = '-UP-HJATCH';
                break;
            default:
                $formato = '';
                break;
        }

        if ($_POST['oficina'] == 1) {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones/' . $folder . '/';
        } elseif ($_POST['oficina'] == 3) {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones-adm/' . $folder . '/';
        } else {
            $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/resoluciones-personal/' . $folder . '/';
        }
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $nombrePdf = str_pad($numero, 3, '0', STR_PAD_LEFT) . '-' . $anio . $formato;
        $directorio =  $destino . $nombrePdf . '.pdf';
        if (move_uploaded_file($_FILES["subir_archivo_resolucion_mod"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }



    public function grabar_resolucion()
    {
        $tipo = $_POST["tipo"];
        $fecha = $_POST["fecha"];
        $idoficina = $_POST["idoficina"];
        $descripcion = $_POST["descripcion"];
        $archivo_pdf = $_POST["archivo_pdf"];
        $nombre = $_POST["nombre"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_resolucion = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->registrar_resolucion->GrabarResolucion($tipo, $idoficina, $fecha, $descripcion, $archivo_pdf, $nombre, $dni);
        echo $ejecutar_grabar;
    }


    public function grabar_plan_trabajo()
    {
        $idofiplan = $_POST["idofiplan"];
        $fecha = $_POST["fecha"];
        $nombreplan = $_POST["nombreplan"];
        $archivo_pdf = $_POST["archivo_pdf"];
        $idoficina = $_POST["idoficina"];
        $this->registrar_resolucion = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->registrar_resolucion->GrabarPlanTrabajo($idofiplan, $fecha, $nombreplan, $archivo_pdf, $idoficina);
        echo $ejecutar_grabar;
    }






    public function eliminar_resolucion()
    {
        $id = $_POST["id"];
        $archivo_pdf = $_POST["archivoPDF"];
        $this->eliminar_resolucion = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->eliminar_resolucion->EliminarResolucion($id, $archivo_pdf);
        echo $ejecutar_grabar;
    }


    public function eliminar_plan_trabajo()
    {
        $id = $_POST["id"];
        $this->eliminar_pl = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->eliminar_pl->EliminarPlanTrabajo($id);
        echo $ejecutar_grabar;
    }



    public function get_data_resolucion()
    {
        $idresolucion = $_POST["id"];
        $this->get_resol = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->get_resol->GetResolucion($idresolucion);
        echo $ejecutar_grabar;
    }

    public function Oficinas()
    {
        $this->get_ofi = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->get_ofi->GetOficina();
        echo $ejecutar_grabar;
    }

    public function update_plan_trabajo()
    {
        $id = $_POST["id"];
        $idoficina = $_POST["idoficina"];
        $descrip = $_POST["descrip"];
        $this->upd_pl = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->upd_pl->UPdatePL($id,  $idoficina, $descrip);
        echo $ejecutar_grabar;
    }



    public function update_resolucion()
    {
        $id = $_POST["id"];
        $descripcion = $_POST["descripcion"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_resolucion = $this->loadModel('resolucion');
        $ejecutar_grabar = $this->registrar_resolucion->UpdateResolucion($id, $descripcion);
        echo $ejecutar_grabar;
    }
}
