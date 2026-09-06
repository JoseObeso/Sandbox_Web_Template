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
        $user = utf8_decode(rtrim($_POST["user"]));
        $clave = utf8_decode(rtrim($_POST["clave"]));
        $this->_verificar_user = $this->loadModel('validar');
        $this->_view->ver_resultado = $this->_verificar_user->RevisarUser($user, $clave);
        echo $this->_view->ver_resultado;
    }

    


    public function cambio_de_clave()
    {

        $user = $_SESSION["usuario"]["user"];
        $nueva = $_POST["clave"];
        $this->_cambios = $this->loadModel('validar');
        $datos = $this->_cambios->CambiarClave($user, $nueva);
        echo $datos;
    }
}
