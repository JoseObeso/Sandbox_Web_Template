<?php

class consultasController extends Controller
{

    public   function __construct()
    {
        parent::__construct();
        session_start();
        // session_start([
        //     'cookie_lifetime' => 86400,
        //     'gc_maxlifetime' => 86400,
        // ]);

        if (isset($_SESSION["usuario"]["nombreusuario"]) && $_SESSION["usuario"]["nombreusuario"] != '') {
        } else {
            header('location: http://192.168.0.9/tramite/acceso/');
        }
    }


    public
    function index()
    {
        $this->_view->titulo = 'Sistema : ';
        $this->_view->setJs(array('index'));
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($_SESSION["usuario"]["dni"], NOMBRE_APP);
        $this->_view->renderizar('index', false);
    }


    public   function detalles()
    {
        $this->_view->titulo = 'Consulta de expedientes';
        $this->_view->setJs(array('detalles'));

        $this->_modulos = $this->loadModel('procesos');
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor = trim($_SESSION["usuario"]["actor"]);



        $this->_view->listar_modulos = $this->_modulos->ListarModulos($user);
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo($user, NOMBRE_APP);


        $this->_permisos = $this->loadModel('permisos');
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($user, NOMBRE_APP);

        $this->_permisos = $this->loadModel('permisos');
        $permiso = $this->_permisos->getVerificarPermisos($user);

        if ($permiso["estado"] == 1) {
            // $a_submenu_user = $_SESSION["usuario"]["nombreusuario"];
            $this->_permisos = $this->loadModel('permisos');
            $permiso_menu = $this->_permisos->getVerificarMenu($user);
            if ($permiso_menu["estado"] == 1) {
                $this->_lista_expedientes = $this->loadModel( 'consultas' );
                $this->_view->listar_expedientes_consolidado = $this->_lista_expedientes->MostrarListaExpedientes();

                $this->_permisos = $this->loadModel('permisos');
                $this->_view->renderizar('detalles', false);
            } else {
                $this->_view->mensaje = $permiso_menu["mensaje"];
                $this->_view->renderizar('error', false);
            }
        } else {
            $this->_view->mensaje = $permiso["mensaje"];
            $this->_view->renderizar('error', false);
        }
    }


    /* Inicio kardex  de expediente */

    public  function kardex()
    {
        $this->_view->titulo = 'Kardex de Expediente, busqueda por Nro de expediente' . INSTITUCION;
        $nombre_vista = "kardex";
        $this->_view->setJs(array($nombre_vista));
        $this->_modulos = $this->loadModel('procesos');
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
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




    public function mostrar_kardex_expediente()
    {
        $this->_kardex = $this->loadModel('consultas');
        $datos = $this->_kardex->MostarKardexExpediente();
        echo $datos;
    }

    public function recuperar_expediente_kardex()
    {
        $id = trim($_POST["id"]);
        $this->_kardex_ver = $this->loadModel('consultas');
        $datos = $this->_kardex_ver->RecuperarExpedienteKardex($id);
        echo $datos;
    }

    public function Listar_expediente_detalle()
    {
        $id = trim($_POST["id"]);
        $this->_kardex_ver = $this->loadModel('consultas');
        $datos = $this->_kardex_ver->ListarExpedienteDetalle($id);
        echo $datos;
    }


    /* Fin de kardex  de expediente */


    /* inicio de datelle de expedientes */


    public function mostrar_expedientes()
    {

        $this->_ver_todos_expedientes = $this->loadModel('consultas');
        $datos = $this->_ver_todos_expedientes->MostrarListaExpedientes();
        echo $datos;
    }

    public function tipo_documento()
    {
        $this->_ver_tipo_doc = $this->loadModel('consultas');
        $datos = $this->_ver_tipo_doc->ListarTipoDocumento();
        echo $datos;
    }


    

    public function consultar_expediente()
    {
        $inicio = trim($_POST["inicio"]);
        $fin = trim($_POST["fin"]);
        $nro_expediente = trim($_POST["nro_expediente"]);
        $remitente = trim($_POST["remitente"]);
        $asunto = trim($_POST["asunto"]);
        $nro_doc = trim($_POST["nro_doc"]);
        $tipo_doc = trim($_POST["tipo_doc"]);
        $this->_consulta_ver = $this->loadModel('consultas');
        $datos = $this->_consulta_ver->ConsultarExpediente($inicio, $fin, $nro_expediente, $remitente, $asunto, $nro_doc, $tipo_doc);
        echo $datos;
    }


    /* fin de detalle de expedientes */
}
