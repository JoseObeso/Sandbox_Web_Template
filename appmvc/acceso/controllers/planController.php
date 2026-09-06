<?php
class planController extends Controller
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
        $this->_view->titulo = 'plan - ' . INSTITUCION;
        $this->_view->setJs(array('plan'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('plan');
        $datos = $this->_listar->Listar();
        echo $datos;
    }


    public function listar_categoria()
    {
        $this->_listar = $this->loadModel('plan');
        $datos = $this->_listar->Listar_categorias();
        echo $datos;
    }


    



    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/transparencia/planeamiento/pdf/' . $anio . '/';
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
        $idcategoria = $_POST["idcategoria"];
        $descripcion = $_POST["descripcion"];
        $archivo = $_POST["archivo"];
        $clasificador = $_POST["clasificador"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('plan');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $idcategoria, $descripcion, $archivo, $user, $clasificador);
        echo $ejecutar_grabar;
    }


    public function grabar_categoria()
    {
        $categoria = $_POST["nombre"];
        $clasificador = $_POST["clasificador"]; 
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('plan');
        $ejecutar_grabar = $this->registrar->GrabarCategoria($categoria, $user, $clasificador);
        echo $ejecutar_grabar;
    }




    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('plan');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }




    public function eliminar_categoria()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('plan');
        $ejecutar_grabar = $this->eliminar_->EliminarCategoria($id);
        echo $ejecutar_grabar;
    }


    
  
}
