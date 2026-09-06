<?php
class supervisorController extends Controller
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
        $this->_view->titulo = 'Supervisor - ' . INSTITUCION;
        $this->_view->setJs(array('supervisor'));
        $this->_view->renderizar('index', false);
    }

    public function getusuariodni()
    {
        $dni =  $_POST["dni"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->GetUserDNI($dni);
        echo $datos;
    }

    public function getusuario()
    {
        $user =  $_POST["user"];
        $modulo = $_POST["modulo"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->GetUser($user, $modulo);
        echo $datos;
    }

    public function getnombres()
    {
        $nombres =  $_POST["nombres"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->GetNombres($nombres);
        echo $datos;
    }

    

    public function getnombres_tramite()
    {
        $nombres =  $_POST["nombres"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->GetNombresTramite($nombres);
        echo $datos;
    }
    public function cambiar_clave()
    {
        $dni =  $_POST["dni"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->CambiarClave($dni);
        echo $datos;
    }




    public function cambiar_clave_user()
    {
        $user =  $_POST["user"];
        $modulo = $_POST["modulo"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->CambiarClaveUser($user, $modulo);
        echo $datos;
    }

    public function cambiar_clave_tramite()
    {
        $user =  $_POST["user"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->CambiarClaveTramite($user);
        echo $datos;
    }


    public function aumentarexpiracion()
    {
        $dni =  $_POST["dni"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->AumentarExpiracion($dni);
        echo $datos;
    }



    public function expirar_aumentar_user()
    {
        $user =  $_POST["user"];
        $modulo = $_POST["modulo"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->ExpirarAumentarUser($user, $modulo);
        echo $datos;
    }


    public function expirar_tramite()
    {
        $user =  $_POST["user"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->ExpirarTramite($user);
        echo $datos;
    }

    


    public function desactivar()
    {
        $dni =  $_POST["dni"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->desactivar($dni);
        echo $datos;
    }




    public function desactivar_user()
    {
        $user =  $_POST["user"];
        $modulo = $_POST["modulo"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->DesactivarUser($user, $modulo);
        echo $datos;
    }


    public function desactivar_tramite()
    {
        $user =  $_POST["user"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->DesactivarTramite($user);
        echo $datos;
    }


    public function activar_tramite()
    {
        $user =  $_POST["user"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->ActivarTramite($user);
        echo $datos;
    }
    

    public function activar()
    {
        $dni =  $_POST["dni"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->activar($dni);
        echo $datos;
    }



    public function ActivarUser()
    {
        $user =  $_POST["user"];
        $modulo = $_POST["modulo"];
        $this->_listar = $this->loadModel('supervisor');
        $datos = $this->_listar->ActivarUser($user, $modulo);
        echo $datos;
    }
}
