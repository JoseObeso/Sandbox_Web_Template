<?php
class bannerController extends Controller
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
        $this->_view->titulo = 'Prensa' . INSTITUCION;
        $this->_view->setJs(array('banner'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $descripcion = $_POST["descripcion"];
        $anio = $_POST["anio"];
        $mes = $_POST["mes"];
        $this->_listar = $this->loadModel('banner');
        $datos = $this->_listar->Listar($descripcion, $anio, $mes);
        echo $datos;
    }

 

    public function subir_imagen1()
    {
        $nombre_archivo = $_FILES['imagen1']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/images/slider/';
        if (move_uploaded_file($_FILES["imagen1"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


  


    public function grabar()
    {
        $descripcion = $_POST["descripcion"];
        $imagen1 = $_POST["imagen1"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar = $this->loadModel('banner');
        $ejecutar_grabar = $this->registrar->Grabar($descripcion, $imagen1, $dni);
        echo $ejecutar_grabar;
    }

    public function activar()
    {
        $id = $_POST["id"];
        $activar = $_POST["activar"];
        $this->registrar = $this->loadModel('banner');
        $ejecutar_grabar = $this->registrar->Activar($id, $activar);
        echo $ejecutar_grabar;
    }


 



    public function eliminar()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->eliminar_prensa = $this->loadModel('banner');
        $ejecutar_grabar = $this->eliminar_prensa->Eliminar($id);
        echo $ejecutar_grabar;
    }
}
