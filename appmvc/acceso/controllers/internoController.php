<?php
class internoController extends Controller
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
        $this->_view->titulo = 'Control Interno - ' . INSTITUCION;
        $this->_view->setJs(array('interno'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('interno');
        $datos = $this->_listar->Listar();
        echo $datos;
    }
  

    
    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/pdf/control-interno/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }







    public function grabar()
    {
        $anio = $_POST["anio"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('interno');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }

    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('interno');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }

 
 
  
}
