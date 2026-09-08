<?php
class ayudaController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "nombreusuario" ] ) && $_SESSION[ "usuario" ][ "nombreusuario" ] != '' ) {

        } else {
            header( 'location: /' );
        }
    }

    public
    function index() {
        $this->_view->titulo = 'Soporte Técnico  - ' . INSTITUCION;
        $this->_view->titulo = 'Mantenimiento y Gestion de Usuarios del Sistema de Tramite Documentario - ' . INSTITUCION;
        $this->_view->setJs(array('ayuda'));
        $user = trim($_SESSION["usuario"]["nombreusuario"]);

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
                $this->_view->renderizar('index', false);
            } else {
                $this->_view->mensaje = $permiso_menu["mensaje"];
                $this->_view->renderizar('error', false);
            }
        } else {
            $this->_view->mensaje = $permiso["mensaje"];
            $this->_view->renderizar('error', false);
        }
        
    }



    public
    function grabar_problema() {
        $nombre_usuario = $_SESSION[ "usuario" ][ "nombreusuario" ];
        $apellidos_nombres = $_SESSION["usuario"]["apellidos_nombres"];
        $problema = $_POST[ "problema" ];
        $this->_grabar = $this->loadModel( 'gestor' );
        $datos = $this->_grabar->grabar_soporte($nombre_usuario, $apellidos_nombres, $problema);
        echo $datos;



    }




}
