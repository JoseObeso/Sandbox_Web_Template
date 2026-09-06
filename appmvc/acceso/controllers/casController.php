<?php
class casController extends Controller
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
        $this->_view->titulo = 'CAS - ' . INSTITUCION;
        $this->_view->setJs(array('cas'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('cas');
        $datos = $this->_listar->Listar();
        echo $datos;
    }


    public function listar_categoria()
    {
        $this->_listar = $this->loadModel('cas');
        $datos = $this->_listar->Listar_categorias();
        echo $datos;
    }




    public function listar_interno()
    {
        $this->_listar = $this->loadModel('cas');
        $datos = $this->_listar->ListarInterno();
        echo $datos;
    }




    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/personal/pdf/' . $anio . '/';
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
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('cas');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $idcategoria, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }


    public function grabar_categoria()
    {
        $categoria = $_POST["nombre"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('cas');
        $ejecutar_grabar = $this->registrar->GrabarCategoria($categoria, $user);
        echo $ejecutar_grabar;
    }


    public function grabar_interno()
    {
        $categoria = $_POST["nombre"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('cas');
        $ejecutar_grabar = $this->registrar->GrabarInterno($categoria, $user);
        echo $ejecutar_grabar;
    }



    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('cas');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }




    public function eliminar_categoria()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('cas');
        $ejecutar_grabar = $this->eliminar_->EliminarCategoria($id);
        echo $ejecutar_grabar;
    }


    

    public function eliminar_interno()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('cas');
        $ejecutar_grabar = $this->eliminar_->EliminarInterno($id);
        echo $ejecutar_grabar;
    }


    public function multiples_imagenes()
    {
        $nombre_archivo = $_FILES['imagen-multiple']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/unidades/personal/maq_personal/images/galeria/';
        if (move_uploaded_file($_FILES["imagen-multiple"]["tmp_name"], $ruta . $nombre_archivo)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function grabar_galeria()
    {
        $fecha = $_POST["fecha"];
        $titulo = $_POST["titulo"];
        $galerias = $_POST["galerias"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar_agenda = $this->loadModel('cas');
        $ejecutar_grabar = $this->registrar_agenda->GrabarGaleria($fecha, $titulo, $galerias, $user);
        echo $ejecutar_grabar;
    }





    public function eliminar_galeria()
    {
        $id = $_POST["id"];
        $this->eliminar = $this->loadModel('cas');
        $ejecutar_grabar = $this->eliminar->EliminarGaleria($id);
        echo $ejecutar_grabar;
    }







}
