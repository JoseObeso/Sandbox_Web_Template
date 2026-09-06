<?php
class fotodirectorController extends Controller
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
        $this->_view->titulo = 'Foto director' . INSTITUCION;
        $this->_view->setJs(array('fotodirector'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $descripcion = $_POST["descripcion"];
        $anio = $_POST["anio"];
        $mes = $_POST["mes"];
        $this->_listar = $this->loadModel('fotodirector');
        $datos = $this->_listar->Listar($descripcion, $anio, $mes);
        echo $datos;
    }



    public function subir_imagen1()
    {
        $nombre_archivo = $_FILES['imagen1']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/fotodirector/';
        if (move_uploaded_file($_FILES["imagen1"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }

    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/fotodirector/';
        if (move_uploaded_file($_FILES["subir_archivo"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function grabar()
    {
        $descripcion = $_POST["nombre"];
        $imagen1 = $_POST["imagen1"];
        $resolucion = $_POST["resolucion"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar = $this->loadModel('fotodirector');
        $ejecutar_grabar = $this->registrar->Grabar($descripcion, $imagen1, $resolucion, $dni);
        echo $ejecutar_grabar;
    }

    public function activar()
    {
        $id = $_POST["id"];
        $activar = $_POST["activar"];
        $this->registrar = $this->loadModel('fotodirector');
        $ejecutar_grabar = $this->registrar->Activar($id, $activar);
        echo $ejecutar_grabar;
    }






    public function eliminar()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->eliminar_prensa = $this->loadModel('fotodirector');
        $ejecutar_grabar = $this->eliminar_prensa->Eliminar($id);
        echo $ejecutar_grabar;
    }
}
