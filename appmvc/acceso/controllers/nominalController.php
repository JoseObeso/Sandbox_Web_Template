<?php
class nominalController extends Controller
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
        $this->_view->titulo = 'nominal - ' . INSTITUCION;
        $this->_view->setJs(array('nominal'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('nominal');
        $datos = $this->_listar->Listar();
        echo $datos;
    }


    public function listar_mes()
    {
        $this->_listar = $this->loadModel('nominal');
        $datos = $this->_listar->Listar_mes();
        echo $datos;
    }


    



    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/personal/listado/' . $anio . '/';
        if (!file_exists($destino)) {
            mkdir($destino, 777);
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
        $mes = $_POST["mes"];
        $nro_mes = $_POST["nro_mes"];
        $archivo = $_POST["archivo"];
        $descripcion = $_POST["descripcion"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('nominal');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $mes, $nro_mes, $archivo, $user, $descripcion);
        echo $ejecutar_grabar;
    }

 

    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('nominal');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }


 

    
  
}
