<?php
class estadisticaController extends Controller
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
        $this->_view->titulo = 'estadistica - ' . INSTITUCION;
        $this->_view->setJs(array('estadistica'));
        $this->_view->renderizar('index', false);
    }

    public function listar()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->Listar();
        echo $datos;
    }


    public function listar_categoria()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->Listar_categorias();
        echo $datos;
    }


    public function listar_galerias()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->ListarGalerias();
        echo $datos;
    }



    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $anio = $_POST["anio"];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/unidades/estadistica/maq_estadistica/pdf/' . $anio . '/';
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
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->Grabar($anio, $idcategoria, $descripcion, $archivo, $user);
        echo $ejecutar_grabar;
    }


    public function grabar_categoria()
    {
        $categoria = $_POST["nombre"];
        $user = trim($_SESSION["usuario"]["user"]);
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->GrabarCategoria($categoria, $user);
        echo $ejecutar_grabar;
    }




    public function eliminar()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->eliminar_->Eliminar($id);
        echo $ejecutar_grabar;
    }




    public function eliminar_categoria()
    {
        $id = $_POST["id"];
        $this->eliminar_ = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->eliminar_->EliminarCategoria($id);
        echo $ejecutar_grabar;
    }


    public function multiples_imagenes()
    {
        $nombre_archivo = $_FILES['imagen-multiple']['name'];
        $ruta = $_SERVER['DOCUMENT_ROOT'] . '/unidades/estadistica/maq_estadistica/images/galerias/';
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
        $this->registrar_agenda = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar_agenda->GrabarGaleria($fecha, $titulo, $galerias, $user);
        echo $ejecutar_grabar;
    }
    public function eliminar_galeria()
    {
        $id = $_POST["id"];
        $this->eliminar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->eliminar->EliminarGaleria($id);
        echo $ejecutar_grabar;
    }

    // Inicio baner y jefe

    public function listarbanner()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->Listarbanner();
        echo $datos;
    }

    public function activar()
    {
        $id = $_POST["id"];
        $activar = $_POST["activar"];
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->Activar($id, $activar);
        echo $ejecutar_grabar;
    }

    public function grabarbanner()
    {
        $descripcion = $_POST["descripcion"];
        $imagen1 = $_POST["imagen1"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->Grabarbanner($descripcion, $imagen1, $dni);
        echo $ejecutar_grabar;
    }
    public function listarjefe()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->Listarjefe();
        echo $datos;
    }

    public function grabarjefe()
    {
        $jefe = $_POST["nombre"];
        $cargo = $_POST["cargo"];
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->grabarjefe($jefe, $cargo);
        echo $ejecutar_grabar;
    }

    public function activarjefe()
    {
        $id = $_POST["id"];
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->ActivarJefe($id);
        echo $ejecutar_grabar;
    }

    // Fin de baner y jefe


    // inicio de RH

    public function listarrh()
    {
        $this->_listar = $this->loadModel('estadistica');
        $datos = $this->_listar->listarrh();
        echo $datos;
    }

    public function grabarrh()
    {
        $jefe = $_POST["nombre"];
        $cargo = $_POST["cargo"];
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->grabarrh($jefe, $cargo);
        echo $ejecutar_grabar;
    }

    public function activarrh()
    {
        $id = $_POST["id"];
        $this->registrar = $this->loadModel('estadistica');
        $ejecutar_grabar = $this->registrar->ActivarRH($id);
        echo $ejecutar_grabar;
    }

    // fin de RH



}
