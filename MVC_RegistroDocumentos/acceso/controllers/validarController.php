<?php

class validarController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function index()
    {
        $this->_view->titulo = '';
        $this->_view->renderizar('index', true);
    }


    public function verificar_ingreso_usuario()
    {
        $user = utf8_decode($_POST["user"]);
        $clave = $_POST["clave"];
        $this->_verificar_user = $this->loadModel('validar');
        $this->_view->ver_resultado = $this->_verificar_user->RevisarUser($user, $clave);
        echo $this->_view->ver_resultado;
    }

    public function verificar_usuario_sesion()
    {
        $user = utf8_decode($_POST["user"]);
        $actor = $_POST["actor"];
        $abreviatura = utf8_decode($_POST["abreviatura"]);
        $responsable = utf8_decode($_POST["responsable"]);
        $this->_verificar_user = $this->loadModel('validar');
        $this->_view->ver_resultado = $this->_verificar_user->RevisarUserSesion($user, $actor, $abreviatura, $responsable);
        echo $this->_view->ver_resultado;
    }

    public function listar_comites_por_usuario()
    {

        $user = utf8_decode(trim($_POST["user"]));
        $this->_listado_actor_user = $this->loadModel('validar');
        $datos = $this->_listado_actor_user->ListarUsuarioActor($user);
        echo $datos;
    }



    public function cambio_de_clave()
    {

        $user = $_SESSION["usuario"]["nombreusuario"];
        $nueva = $_POST["nueva"];
        $this->_cambios = $this->loadModel('validar');
        $datos = $this->_cambios->CambiarClave($user, $nueva);
        echo $datos;
    }
}
