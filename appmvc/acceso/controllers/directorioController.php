<?php
class directorioController extends Controller
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
        $this->_view->titulo = 'Directorio ' . INSTITUCION;
        $this->_view->setJs(array('directorio'));
        $this->_view->renderizar('index', false);
    }

    public function lista_directorio()
    {
        $this->_listar_directorio = $this->loadModel('directorio');
        $datos = $this->_listar_directorio->ListaDirectorio();
        echo $datos;
    }

 


    

    public function grabar_directorio()
    {
        $id = $_POST["id"];
        $cargo = $_POST["cargo"];
        $nombre = trim($_POST["nombre"]);
        $email =  trim($_POST["email"]);
        $anexo =  trim($_POST["anexo"]);
        $celular =  trim($_POST["celular"]);
        $rpm =  trim($_POST["rpm"]);
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_autoridad = $this->loadModel('directorio');
        $ejecutar_grabar = $this->registrar_autoridad->GrabarDirectorio($id, $cargo, $nombre, $email, $anexo, $celular, $rpm, $dni);
        echo $ejecutar_grabar;
    }

    


    public function desactivar_directorio()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_autoridad = $this->loadModel('directorio');
        $ejecutar_grabar = $this->registrar_autoridad->DesactivarDirectorio($id);
        echo $ejecutar_grabar;
    }

    public function activar_directorio()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_autoridad = $this->loadModel('directorio');
        $ejecutar_grabar = $this->registrar_autoridad->ActivarDirectorio($id);
        echo $ejecutar_grabar;
    }


}
