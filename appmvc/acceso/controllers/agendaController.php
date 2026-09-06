<?php
class agendaController extends Controller
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
        $this->_view->titulo = 'Agenda ' . INSTITUCION;
        $this->_view->setJs(array('agenda'));
        $this->_view->renderizar('index', false);
    }

    public function lista_agenda()
    {
        $this->_listar_agenda = $this->loadModel('agenda');
        $datos = $this->_listar_agenda->ListaAgenda();
        echo $datos;
    }

 


    

    public function grabar_agenda()
    {
        $id = $_POST["id"];
        $tipo = $_POST["tipo"];
        $actividad =  $_POST["actividad"];
        $lugar =  $_POST["lugar"];
        $fecha =  $_POST["fecha"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->registrar_agenda = $this->loadModel('agenda');
        $ejecutar_grabar = $this->registrar_agenda->GrabarAgenda($id, $tipo, $actividad, $lugar, $fecha, $dni);
        echo $ejecutar_grabar;
    }

    


    public function eliminar_agenda()
    {
        $id = $_POST["id"];
        $dni = trim($_SESSION["usuario"]["usuario"]);
        $this->eliminar_agenda = $this->loadModel('agenda');
        $ejecutar_grabar = $this->eliminar_agenda->EliminarAgenda($id);
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
