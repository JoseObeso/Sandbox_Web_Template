<?php

class inicioController extends Controller
{
    public
    function __construct()
    {
        parent::__construct();
        session_start();
        if (isset($_SESSION["usuario"]["nombreusuario"]) && $_SESSION["usuario"]["nombreusuario"] != '') {
        } else {
            header('location: http://192.168.0.9/tramite/acceso/');
        }
    }

    public
    function index()
    {
        $this->_view->titulo = 'Bienvenido al Modulo de Expedientes - ' . INSTITUCION;
        $nombre_vista = "index";
        $this->_view->setJs( array( 'inicio' ) );
        $user = utf8_decode(trim($_SESSION["usuario"]["nombreusuario"]));
        $this->_modulos = $this->loadModel('procesos');
        $this->_view->listar_modulos = $this->_modulos->ListarModulos($user);
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo($user, NOMBRE_APP);
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($user, NOMBRE_APP);
        $this->_permisos = $this->loadModel('permisos');
        $permiso = $this->_permisos->getVerificarPermisos($user);
        if ($permiso["estado"] == 1) {
            $this->_permisos = $this->loadModel('permisos');
            $permiso_menu = $this->_permisos->getVerificarMenu($user);
            if ($permiso_menu["estado"] == 1) {
                $this->_view->renderizar($nombre_vista, false);
            } else {
                $this->_view->mensaje = $permiso_menu["mensaje"];
                $this->_view->renderizar('error', false);
            }
        } else {
            $this->_view->mensaje = $permiso["mensaje"];
            $this->_view->renderizar('error', false);
        }
    }


    public function get_recibidos() {
        $fecha = trim($_POST["fecha1"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
         $this->_doc = $this->loadModel('consultas');
        $datos = $this->_doc->getDataRecibido($fecha, $fecha2,  $actor);
        echo $datos;
    }

    public function get_recibidos_anio() {
        $anio = $_POST["anio"];
        $actor = trim($_SESSION["usuario"]["actor"]);
         $this->_doc = $this->loadModel('consultas');
        $datos = $this->_doc->getDataRecibidoAnio($anio,  $actor);
        echo $datos;
    }

    
    public function get_en_tramite() {
        $fecha = trim($_POST["fecha1"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
         $this->_doc = $this->loadModel('consultas');
        $datos = $this->_doc->getDataRecibidoTramite($fecha, $fecha2,  $actor);
        echo $datos;
    }


    
    



    


}
