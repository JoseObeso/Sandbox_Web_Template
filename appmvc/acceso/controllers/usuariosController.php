<?php

class usuariosController extends Controller
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
        $this->_view->titulo = 'Usuarios ' . INSTITUCION;
        $this->_view->setJs(array('usuarios'));
        $this->_view->renderizar('index', false);
    }



    public function lista_usuarios()
    {
        $this->_listar_usuarios = $this->loadModel('usuarios');
        $datos = $this->_listar_usuarios->lista_usuarios();
        echo $datos;
    }

    public function lista_usuarios_todos()
    {
        $this->_listar_usuarios = $this->loadModel('usuarios');
        $datos = $this->_listar_usuarios->lista_usuarios_todos();
        echo $datos;
    }


    public function buscar_por_user_si_existe()
    {
        $user = $_POST["user"];
        $this->_busqueda = $this->loadModel('usuarios');
        $this->_view->ver_resultado = $this->_busqueda->RevisarUserExistente($user);
        echo $this->_view->ver_resultado;
    }



    public function grabar_nuevo_usuario()
    {
        $user = utf8_decode(rtrim(strtoupper($_POST["user"])));
        $dni = $_POST["dni"];
        $nombre = utf8_decode(rtrim(strtoupper($_POST["nombre"])));
        $paterno = utf8_decode(rtrim(strtoupper($_POST["paterno"])));
        $materno = utf8_decode(rtrim(strtoupper($_POST["materno"])));
        $oficina = utf8_decode(rtrim(strtoupper($_POST["oficina"])));
        $sexo = $_POST["sexo"];
        $this->registrar_nuevo_usuario = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->registrar_nuevo_usuario->GrabarNuevoUsuario($user, $dni, $nombre, $paterno, $materno, $oficina, $sexo);
        echo $ejecutar_grabar_user;
    }


    public function modificar_usuario()
    {
        $user = $_POST["user"];
        $dni = $_POST["dni"];
        $nombre = utf8_decode(rtrim(strtoupper($_POST["nombre"])));
        $paterno = utf8_decode(rtrim(strtoupper($_POST["paterno"])));
        $materno = utf8_decode(rtrim(strtoupper($_POST["materno"])));
        $oficina = utf8_decode(rtrim(strtoupper($_POST["oficina"])));
        $sexo = $_POST["sexo"];
        $this->registrar_mod_usuario = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->registrar_mod_usuario->ModificarUsuario($user, $dni, $nombre, $paterno, $materno, $oficina, $sexo);
        echo $ejecutar_grabar_user;
    }


    public function eliminar_usuarios()
    {
        $dni = $_POST["user"];
        $this->eliminar_usuario = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->eliminar_usuario->EliminarUsuario($dni);
        echo $ejecutar_grabar_user;
    }

    public function reset_clave()
    {
        $dni = $_POST["user"];
        $this->eliminar_usuario = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->eliminar_usuario->ResetClave($dni);
        echo $ejecutar_grabar_user;
    }


    public function habilitar_usuario()
    {
        $dni = $_POST["user"];
        $this->eliminar_usuario = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->eliminar_usuario->HabilitarUser($dni);
        echo $ejecutar_grabar_user;
    }


    public function listar_permisos()
    {
        $user = $_POST["user"];
        $this->listar_permiso = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->listar_permiso->PermisosUsuarios($user);
        echo $ejecutar_grabar_user;
    }

    public function EliminarPermisosApp()
    {
        $id = $_POST["id"];
        $this->listar_id = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->listar_id->EliminarPermisoApp($id);
        echo $ejecutar_grabar_user;
    }


    public function lista_app()
    {
        $this->_listar_app = $this->loadModel('usuarios');
        $datos = $this->_listar_app->lista_app();
        echo $datos;
    }

    public function GrabarApp()
    {

        $id = $_POST["id"];
        $vapp = utf8_decode(rtrim(strtoupper($_POST["vapp"])));
        $imagen = $_POST["imagen"];
        $vapp_url = $_POST["vapp_url"];
        $vgm = $_POST["vgm"];

        $this->registrar_app = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->registrar_app->RegistrarApp($id, $vapp, $imagen, $vapp_url, $vgm);
        echo $ejecutar_grabar_user;
    }

    public function EliminarApp()
    {
        $id = $_POST["id"];
        $this->registrar_app = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->registrar_app->EliminarApp($id);
        echo $ejecutar_grabar_user;
    }

    public function GrabarUsuarioApp()
    {

        $id_user = $_POST["id_user"];
        $id_app = $_POST["id_app"];
        $vapp = $_POST["vapp"];
        $imagen = $_POST["imagen"];
        $vapp_url = $_POST["vapp_url"];
        $this->registrar_user_app = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->registrar_user_app->GrabarUsuarioApp($id_user, $id_app, $vapp, $imagen, $vapp_url);
        echo $ejecutar_grabar_user;
    }


    public function nuevo_n_user()
    {
        $dni = $_POST["dni"];
        $nuser = $_POST["nuser"];
        $this->cambiar_nuser = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->cambiar_nuser->CambiarNUser($dni, $nuser);
        echo $ejecutar_grabar_user;
    }


    public function versiexistedni()
    {
        $dni = $_POST["dni"];
        $this->cambiar_nuser = $this->loadModel('usuarios');
        $ejecutar_grabar_user = $this->cambiar_nuser->RevisarExisteDNI($dni);
        echo $ejecutar_grabar_user;
    }
}
