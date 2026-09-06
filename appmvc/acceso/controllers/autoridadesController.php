<?php
class autoridadesController extends Controller
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
        $this->_view->titulo = 'Autoridad ' . INSTITUCION;
        $this->_view->setJs(array('autoridades'));
        $this->_view->renderizar('index', false);
    }

    public function lista_autoridades()
    {
        $this->_listar_autoridades = $this->loadModel('autoridades');
        $datos = $this->_listar_autoridades->ListaAutoridades();
        echo $datos;
    }

    public function subir_cv()
    {
        $curriculum_nombre = $_FILES['txt_curriculum']['name'];
        $ruta_cv = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/personal/autoridades/';
        if (move_uploaded_file($_FILES["txt_curriculum"]["tmp_name"], $ruta_cv . $curriculum_nombre)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }

    public function subir_nepotismo()
    {
        $nombre_archivo = $_FILES['txt_nepotismo']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/personal/autoridades/';
        if (move_uploaded_file($_FILES["txt_nepotismo"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_bienes()
    {
        $nombre_archivo = $_FILES['txt_bienes']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/personal/autoridades/';
        if (move_uploaded_file($_FILES["txt_bienes"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_intereses()
    {
        $nombre_archivo = $_FILES['txt_intereses']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/personal/autoridades/';
        if (move_uploaded_file($_FILES["txt_intereses"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }

    public function grabar_autoridades()
    {
        $id = $_POST["id"];
        $cargo = $_POST["cargo"];
        $nombre = trim($_POST["nombre"]);
        $cv = trim($_POST["cv"]);
        $nepotismo = trim($_POST["nepotismo"]);
        $bienes = trim($_POST["bienes"]);
        $intereses = trim($_POST["intereses"]);
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_autoridad = $this->loadModel('autoridades');
        $ejecutar_grabar = $this->registrar_autoridad->ActualizarAutoridad($id, $cargo, $nombre, $cv, $nepotismo, $bienes, $intereses, $dni);
        echo $ejecutar_grabar;
    }





    public function eliminar_adjuntos()
    {
        $id = $_POST["id"];
        $cv = trim($_POST["cv"]);
        $nepotismo = trim($_POST["np"]);
        $bienes = trim($_POST["bien"]);
        $intereses = trim($_POST["inte"]);
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_autoridad = $this->loadModel('autoridades');
        $ejecutar_grabar = $this->registrar_autoridad->EliminarAdjuntoAutoridad($id, $cv, $nepotismo, $bienes, $intereses, $dni);
        echo $ejecutar_grabar;
    }
}
