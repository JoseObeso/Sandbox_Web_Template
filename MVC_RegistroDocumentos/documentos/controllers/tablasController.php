<?php

class tablasController extends Controller
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
        $this->_view->titulo = 'Sistema : ';
        $this->_view->setJs(array('index'));
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($_SESSION["usuario"]["dni"], NOMBRE_APP);
        $this->_view->renderizar('index', false);
    }

    public function actor()
    {
        $this->_view->titulo = 'Actor, origen y/o destinatario de los expedientes - Tramite - ' . INSTITUCION;
        $nombre_vista = "actor";
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


    public function entidades()
    {
        $this->_view->titulo = 'Entidades, acciones, prioritarios, tipo de actor, documentos - Tramite - ' . INSTITUCION;
        $nombre_vista = "entidades";
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


    public function empleados()
    {

        $this->_view->titulo = 'Empleados, comites, forma documentos, tramitador, plazo, alertas - Tramite - ' . INSTITUCION;
        $nombre_vista = "empleados";
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


    public function listar_todos_los_actores_tipo_01()
    {
        $actor = trim($_POST["actor"]);
        $this->_listado_actor = $this->loadModel('tablas');
        $datos = $this->_listado_actor->ListarActoresTipo01($actor);
        echo $datos;
    }


    public function listar_todos_los_actores_tipo_0103()
    {
        $no_actor = trim($_POST["no_actor"]);
        $this->_listado_actor = $this->loadModel('tablas');
        $datos = $this->_listado_actor->ListarActoresTipo0103($no_actor);
        echo $datos;
    }


    public function listar_actores_jerarquia_tipo_01()
    {
        $actor = trim($_GET["actor"]);
        $this->_listado_actor = $this->loadModel('tablas');
        $datos = $this->_listado_actor->ListarActoresTipo01($actor);
        echo $datos;
    }



    public function grabar_actor_tramite_tipo_01()
    {

        $idactor = trim($_POST["idactor"]);
        $descripcion = trim($_POST["descripcion"]);
        $abreviatura = trim($_POST["abreviatura"]);
        $responsable = trim($_POST["responsable"]);
        $codigo = trim($_POST["codigo"]);
        $idareaactor = trim($_POST["idareaactor"]);
        $tramite = trim($_POST["tramite"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $this->_grabar_actor = $this->loadModel('tablas');
        $datos = $this->_grabar_actor->GrabarActoresTipo01($idactor, $descripcion, $abreviatura, $responsable, $codigo, $idareaactor, $tramite, $user);
        echo $datos;
    }

    public function update_actor_tramite_tipo_01()
    {

        $idactor = trim($_POST["idactor"]);
        $descripcion = trim(utf8_decode($_POST["descripcion"]));
        $abreviatura = trim(utf8_decode($_POST["abreviatura"]));
        $responsable = trim(utf8_decode($_POST["responsable"]));
        $codigo = trim($_POST["codigo"]);
        $idareaactor = trim($_POST["idareaactor"]);
        $tramite = trim($_POST["tramite"]);
        $this->_grabar_actor = $this->loadModel('tablas');
        $datos = $this->_grabar_actor->UpdaterActoresTipo01($idactor, $descripcion, $abreviatura, $responsable, $codigo, $idareaactor, $tramite);
        echo $datos;
    }


    public function delete_actor_tramite_tipo_01()
    {

        $idactor = trim($_POST["idactor"]);
        $this->_grabar_actor = $this->loadModel('tablas');
        $datos = $this->_grabar_actor->DeleteActoresTipo01($idactor);
        echo $datos;
    }



    /* tipo de accion */


    public function mostrar_taccion()
    {
        $taccion = trim($_POST["id"]);
        $this->_doc = $this->loadModel('tablas');
        $datos = $this->_doc->MostrarTaccion($taccion);
        echo $datos;
    }



    public function  grabar_taccion()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_accion = $this->loadModel('tablas');
        $datos = $this->_grabar_accion->GrabarTipoAccion($descripcion, $tipo_operacion, $id);
        echo $datos;
    }


    public function eliminar_datos_tacc()
    {

        $id = trim($_POST["id"]);
        $this->_delete_accion = $this->loadModel('tablas');
        $datos = $this->_delete_accion->DeleteAccion($id);
        echo $datos;
    }

    /* fin de tipo de accion */

    /* Tipo de prioridad */


    public function mostrar_tprioridad()
    {
        $this->_tprioridad = $this->loadModel('tablas');
        $datos = $this->_tprioridad->MostrarPrioridad();
        echo $datos;
    }


    public function  grabar_editar_tprio()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $dias = trim($_POST["dias"]);
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_tprioridad = $this->loadModel('tablas');
        $datos = $this->_grabar_tprioridad->GrabarTipoPrioridad($descripcion, $dias, $tipo_operacion, $id);
        echo $datos;
    }



    public function  eliminar_datos_tprioridad()
    {
        $id = $_POST["id"];
        $this->_eliminar_tprioridad = $this->loadModel('tablas');
        $datos = $this->_eliminar_tprioridad->EliminarTipoPrioridad($id);
        echo $datos;
    }

    /* fin de tipo de prioridad */


    /* inicio de tipo de reporte */



    public function mostrar_treporte()
    {
        $this->_trepor = $this->loadModel('tablas');
        $datos = $this->_trepor->MostrarTipoReporte();
        echo $datos;
    }



    public function grabar_editar_treporte()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_treporte = $this->loadModel('tablas');
        $datos = $this->_grabar_treporte->GrabarTipoReporte($descripcion, $tipo_operacion, $id);
        echo $datos;
    }



    public function  eliminar_datos_trepor()
    {
        $id = $_POST["id"];
        $this->_eliminar_trepor = $this->loadModel('tablas');
        $datos = $this->_eliminar_trepor->EliminarTipoReporte($id);
        echo $datos;
    }


    /* fin de tipo de reporte */


    /* inicio tipo de actor */
    public function mostrar_tactor()
    {
        $this->_treportactor = $this->loadModel('tablas');
        $datos = $this->_treportactor->MostrarTipoActor();
        echo $datos;
    }


    public function grabar_editar_tactor()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $tipo = $_POST["tipo"];
        $this->_grabar_treporte = $this->loadModel('tablas');
        $datos = $this->_grabar_treporte->GrabarEditarTactor($descripcion, $tipo_operacion, $id, $tipo);
        echo $datos;
    }



    public function  eliminar_datos_tactor()
    {
        $id = $_POST["id"];
        $this->_eliminar_tactor = $this->loadModel('tablas');
        $datos = $this->_eliminar_tactor->EliminarTipoActor($id);
        echo $datos;
    }
    /* Fin de tipo de actor */


    /* Inicio de seccion de empleados */

    public function mostrar_empleados()
    {
        $id = $_POST["id"];
        $this->_mempleado = $this->loadModel('tablas');
        $datos = $this->_mempleado->MostrarEmpleados($id);
        echo $datos;
    }
    public function grabar_editar_empleado()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $abreviatura = utf8_decode(trim($_POST["abreviatura"]));
        $ruc = utf8_decode(trim($_POST["ruc"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_templeado = $this->loadModel('tablas');
        $datos = $this->_grabar_templeado->GrabarEditarEmpleado($descripcion, $abreviatura, $ruc, $tipo_operacion, $id);
        echo $datos;
    }
    public function eliminar_datos_empleado()
    {
        $id = $_POST["id"];
        $this->_eliminar_emple = $this->loadModel('tablas');
        $datos = $this->_eliminar_emple->EliminarEmpleado($id);
        echo $datos;
    }

    /* fin de seccion de empleados */

    /* inicio comites */

    public function mostrar_comite()
    {
        $id = $_POST["id"];
        $this->_mcomite = $this->loadModel('tablas');
        $datos = $this->_mcomite->MostrarComite($id);
        echo $datos;
    }


    public function grabar_editar_comite()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_templeado = $this->loadModel('tablas');
        $datos = $this->_grabar_templeado->GrabarEditarComite($descripcion, $tipo_operacion, $id);
        echo $datos;
    }


    public function eliminar_datos_comite()
    {
        $id = $_POST["id"];
        $this->_eliminar_comite = $this->loadModel('tablas');
        $datos = $this->_eliminar_comite->EliminarComite($id);
        echo $datos;
    }

    /* fin de comites */

    /* Inicio de Fdocu */

    public function mostrar_fdocu()
    {
        $this->_treportefdocu = $this->loadModel('tablas');
        $datos = $this->_treportefdocu->MostrarFdocu();
        echo $datos;
    }


    public function grabar_editar_fdocu()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_templeado = $this->loadModel('tablas');
        $datos = $this->_grabar_templeado->GrabarEditarFdocu($descripcion, $tipo_operacion, $id);
        echo $datos;
    }


    public function eliminar_datos_fdocu()
    {

        $id = $_POST["id"];
        $this->_eliminar_fdocu = $this->loadModel('tablas');
        $datos = $this->_eliminar_fdocu->EliminarFdocu($id);
        echo $datos;
    }

    /* Fin de Fdocu */


    /* inicio de tramitador */


    public function mostrar_tramitador()
    {
        $this->_treportetrami = $this->loadModel('tablas');
        $datos = $this->_treportetrami->MostrarTramitador();
        echo $datos;
    }


    public function grabar_editar_tramitador()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $this->_grabar_tra = $this->loadModel('tablas');
        $datos = $this->_grabar_tra->GrabarEditarTramitador($descripcion, $tipo_operacion, $id);
        echo $datos;
    }


    public function eliminar_datos_tramitador()
    {
        $id = $_POST["id"];
        $this->_eliminar_tra = $this->loadModel('tablas');
        $datos = $this->_eliminar_tra->EliminarFtramite($id);
        echo $datos;
    }


    /* fin de tramitador */


    /* inicio de plazo expediente */



    public function mostrar_plazo_expe()
    {
        $this->_treportepexpe = $this->loadModel('tablas');
        $datos = $this->_treportepexpe->MostrarPlazoExpediente();
        echo $datos;
    }


    public function grabar_editar_plazo_expe()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $color = $_POST["color"];
        $this->_grabar_tra = $this->loadModel('tablas');
        $datos = $this->_grabar_tra->GrabarEditarPlazoExpediente($descripcion, $tipo_operacion, $id, $color);
        echo $datos;
    }



    public function eliminar_datos_pexpe()
    {
        $id = $_POST["id"];
        $this->_eliminar_tra = $this->loadModel('tablas');
        $datos = $this->_eliminar_tra->EliminarPlazoExpe($id);
        echo $datos;
    }




    /* fin de plazo expediente */

    /* inicio de alerta */


    public function mostrar_alerta()
    {
        $this->_treportepexpe = $this->loadModel('tablas');
        $datos = $this->_treportepexpe->MostrarAlerta();
        echo $datos;
    }


    public function grabar_editar_alerta()
    {
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $id = $_POST["id"];
        $color = $_POST["color"];
        $mayora = $_POST["mayora"];
        $menora = $_POST["menora"];
        $this->_grabar_tra = $this->loadModel('tablas');
        $datos = $this->_grabar_tra->GrabarEditarAlerta($descripcion, $tipo_operacion, $id, $color, $mayora, $menora);
        echo $datos;
    }



    public function eliminar_datos_alerta()
    {
        $id = $_POST["id"];
        $this->_eliminar_tra = $this->loadModel('tablas');
        $datos = $this->_eliminar_tra->EliminarAlerta($id);
        echo $datos;
    }


    public function revisar_codigo()
    {
        $codigo = $_POST["codigo"];
        $this->_ver_codigo = $this->loadModel('tablas');
        $datos = $this->_ver_codigo->RevisarCodigo($codigo);
        echo $datos;
    }



 










    /* fin de alerta */
}
