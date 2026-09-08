<?php

class procesosController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        session_start();
        if (isset($_SESSION["usuario"]["nombreusuario"]) && $_SESSION["usuario"]["nombreusuario"] != '') {
        } else {
            header('location: /');
        }
    }

    public function index()
    {
        $this->_view->titulo = 'Usuarios ' . INSTITUCION;
        $this->_view->setJs(array('index'));
        $this->_permisos = $this->loadModel('permisos');
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($_SESSION["usuario"]["nombreusuario"], NOMBRE_APP);
        $this->_view->renderizar('index', false);
    }


    public function usuarios()
    {
        $this->_view->titulo = 'Mantenimiento y Gestion de Usuarios del Sistema de Tramite Documentario - ' . INSTITUCION;
        $this->_view->setJs(array('usuarios'));
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
                $this->_view->renderizar('usuarios', false);
            } else {
                $this->_view->mensaje = $permiso_menu["mensaje"];
                $this->_view->renderizar('error', false);
            }
        } else {
            $this->_view->mensaje = $permiso["mensaje"];
            $this->_view->renderizar('error', false);
        }
    }




    public function aplicativos()
    {
        $this->_view->titulo = 'Gestion de Aplicativos, Menus, Sub Menus - Sistema de Tramite Documentario ' . INSTITUCION;
        $this->_view->setJs(array('aplicativos'));
        $user = utf8_decode($_SESSION["usuario"]["nombreusuario"]);
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
                $this->_app_menu_submenu = $this->loadModel('gestor');
                $this->_view->todoslosmodulos = $this->_app_menu_submenu->ListarApp();
                $this->_view->listar_app = $this->_app_menu_submenu->ListarApp();
                $this->_view->listar_menu = $this->_app_menu_submenu->ListarMenu();
                $this->_view->listar_submenu = $this->_app_menu_submenu->ListarSubMenu();
                $this->_view->renderizar('aplicativos', false);
            } else {
                $this->_view->mensaje = $permiso_menu["mensaje"];
                $this->_view->renderizar('error', false);
            }
        } else {
            $this->_view->mensaje = $permiso["mensaje"];
            $this->_view->renderizar('error', false);
        }
    }





    public function desactivar_usuarios_con_permisos()
    {
        $user = trim($_POST["user"]);
        $this->_proceder_a_desactivar_usuario = $this->loadModel('procesos');
        $desactivar_usuario = $this->_proceder_a_desactivar_usuario->DesactivarUsuarioConPermisos($user);
        echo $desactivar_usuario;
    }





    public function ListarApp()
    {
        $id_app = $_POST["app"];
        $this->_listado_app = $this->loadModel('gestor');
        $datos = $this->_listado_app->ListarApp();
        echo $datos;
    }




    public function buscar_por_nombre_usuario()
    {
        $buscar_nombre = utf8_decode($_POST["nombres"]);
        $this->_listar_usuarios = $this->loadModel('gestor');
        $datos = $this->_listar_usuarios->ListaUsuariosRegistrados($buscar_nombre);
        echo $datos;
    }



    public function buscar_por_user_si_existe()
    {
        $user = $_POST["user"];
        $this->_busqueda = $this->loadModel('procesos');
        $this->_view->ver_resultado = $this->_busqueda->RevisarUserExistente($user);
        echo $this->_view->ver_resultado;
    }




    public function grabar_nuevo_usuario()
    {
        $user = utf8_decode(rtrim(strtoupper($_POST["user"])));
        $nombre = utf8_decode(rtrim(strtoupper($_POST["nombre"])));
        $apellidos = utf8_decode(rtrim(strtoupper($_POST["apellidos"])));
        $fono = rtrim($_POST["fono"]);
        $direccion = rtrim(strtoupper($_POST["direccion"]));
        $expiracion = $_POST["expiracion"];
        $cargo = rtrim(strtoupper($_POST["cargo"]));
        $actor = rtrim(strtoupper($_POST["actor"]));
        $jefatura = strtoupper($_POST["jefatura"]);
        $this->registrar_nuevo_usuario = $this->loadModel('procesos');
        $ejecutar_grabar_user = $this->registrar_nuevo_usuario->GrabarNuevoUsuario($user, $nombre, $apellidos, $fono, $direccion, $expiracion, $cargo, $actor, $jefatura);
        echo $ejecutar_grabar_user;
    }


    public function modificar_usuario()
    {
        $idusuario = $_POST["iduser"];
        $user = utf8_decode(rtrim(strtoupper($_POST["user"])));
        $nombre = utf8_decode(rtrim(strtoupper($_POST["nombre"])));
        $apellidos = utf8_decode(rtrim(strtoupper($_POST["apellidos"])));
        $fono = rtrim($_POST["fono"]);
        $direccion = rtrim(strtoupper($_POST["direccion"]));
        $expiracion = $_POST["expiracion"];
        $cargo = rtrim(strtoupper($_POST["cargo"]));
        $actor = rtrim(strtoupper($_POST["actor"]));
        $jefatura = strtoupper($_POST["jefatura"]);
        $this->registrar_modificar_usuario = $this->loadModel('procesos');
        $ejecutar_modificar_user = $this->registrar_modificar_usuario->ModificarUsuario($idusuario, $user, $nombre, $apellidos, $fono, $direccion, $expiracion, $cargo, $actor, $jefatura);
        echo $ejecutar_modificar_user;
    }


    public function ListarMenudeApp()
    {
        $id_app = $_POST["id_app"];
        $this->_plantillas = $this->loadModel('gestor');
        $datos = $this->_plantillas->ListarMenuPorIDAPP($id_app);
        echo $datos;
    }





    public function mostrar_submenu()
    {
        $id_menu = $_POST["id_menu"];
        $id_app =  $_POST["id_app"];
        $this->_plantillas = $this->loadModel('gestor');
        $datos = $this->_plantillas->MostrarSubmenu($id_menu, $id_app);
        echo $datos;
    }







    public function getListadoPlantillaSubMenus()
    {
        $id_menu = $_POST["id_menu"];
        $id_app =  $_POST["id_app"];
        $this->_plantillas = $this->loadModel('gestor');
        $datos = $this->_plantillas->ListarPlantillaSubMenusById($id_menu, $id_app);
        echo $datos;
    }





    public function seleccion_modulos_por_user()
    {
        $user = utf8_decode($_POST["user"]);
        $this->modulos_user = $this->loadModel('procesos');
        $datos = $this->modulos_user->VerModulosPorUser($user);
        echo $datos;
    }




    public function seleccion_menu_por_id()
    {
        $user_seleccion = trim($_POST["user"]);
        $id_app = $_POST["id_app"];
        $this->acceso_menu_id = $this->loadModel('procesos');
        $datos = $this->acceso_menu_id->VerMenuPorID($user_seleccion, $id_app);
        echo $datos;
    }


    public function seleccion_sub_menu_por_id()
    {
        $user_seleccion = trim($_POST["user"]);
        $id_app = $_POST["id_app"];
        $idmenu = $_POST["idmenu"];
        $this->acceso_sub_menu_id = $this->loadModel('procesos');
        $datos = $this->acceso_sub_menu_id->VerSubMenuPorID($user_seleccion, $id_app, $idmenu);
        echo $datos;
    }





    public function registrar_app_user()
    {
        $idapp = rtrim($_POST["idapp"]);
        $appuser = rtrim($_POST["idappuser"]);
        $nombre = rtrim($_POST["nombre"]);
        $user = rtrim($_POST["user"]);
        $userregistro =  trim($_SESSION["usuario"]["nombreusuario"]);
        $this->grabar_app_user = $this->loadModel('procesos');
        $datos = $this->grabar_app_user->GuardarAppUsuario($idapp, $appuser, $nombre, $user, $userregistro);
        echo $datos;
    }


    public function desactivar_modulo()
    {
        $id = $_POST["id"];
        $user = rtrim($_POST["user"]);
        $this->desactivar_modulo = $this->loadModel('procesos');
        $datos = $this->desactivar_modulo->EliminarModulo($id, $user);
        echo $datos;
    }



    public function activar_menu()
    {
        $id = $_POST["id"];
        $estado = $_POST["estado"];
        $this->activar_estado_menu = $this->loadModel('procesos');
        $datos = $this->activar_estado_menu->ActivarEstadoMenu($estado, $id);
        echo $datos;
    }



    public function activar_desactivar_submenu()
    {
        $id = $_POST["id"];
        $estado = $_POST["estado"];
        $this->activar_estado_sub_menu = $this->loadModel('procesos');
        $datos = $this->activar_estado_sub_menu->ActivarEstadoSubMenu($estado, $id);
        echo $datos;
    }

    public function reset_clave_usuario()
    {
        $user = trim($_POST["user"]);
        $this->reset_clave_user = $this->loadModel('procesos');
        $datos = $this->reset_clave_user->ResetarClaveUsuario($user);
        echo $datos;
    }


    public function habilitar_usuario()
    {
        $user = trim($_POST["user"]);
        $this->habilitar_user = $this->loadModel('procesos');
        $datos = $this->habilitar_user->HabilitarUsuario($user);
        echo $datos;
    }


    public function activar_todos_los_submenus()
    {
        $idmenu = $_POST["id"];
        $user = $_POST["user"];
        $this->activar_todos_los_submenus = $this->loadModel('procesos');
        $datos = $this->activar_todos_los_submenus->ActivarTodosLosSubmenu($idmenu, $user);
        echo $datos;
    }




    public function desactivar_todos_los_submenus()
    {
        $idmenu = $_POST["id"];
        $user = $_POST["user"];
        $this->desactivar_todos_los_submenus = $this->loadModel('procesos');
        $datos = $this->desactivar_todos_los_submenus->DesactivarTodosLosSubmenu($idmenu, $user);
        echo $datos;
    }




    public function grabar_app()
    {
        $nombreapp = $_POST["nombre_app"];
        $urlapp = $_POST["url_app"];
        $imagenapp = $_POST["imagen_app"];
        $descripcionapp = utf8_decode($_POST["descripcion_app"]);
        $archivoapp = $_POST["archivo_app"];
        $user = $_SESSION["usuario"]["nombreusuario"];
        $this->grabar_app = $this->loadModel('gestor');
        $datos = $this->grabar_app->GuardarApp($nombreapp, $urlapp, $imagenapp, $descripcionapp, $archivoapp, $user);
        echo $datos;
    }


    public function grabar_menu()
    {
        $v_id_app = $_POST["id_app"];
        $v_menu = $_POST["v_menu"];
        $v_idhtml = $_POST["v_idhtml"];
        $v_icono = $_POST["v_icono"];
        $v_orden = $_POST["v_orden"];
        $user = $_SESSION["usuario"]["nombreusuario"];
        $this->grabar_app = $this->loadModel('gestor');
        $datos = $this->grabar_app->GuardarMenudeApp($v_id_app, $v_menu, $v_idhtml, $v_icono, $v_orden, $user);
        $this->update_menu = $this->loadModel('gestor');
        $up_menu = $this->update_menu->ActualizarMenuEnUsuarios($v_id_app, $v_menu, $v_idhtml, $v_icono, $v_orden, $user);
        echo $up_menu;
    }



    public function grabar_submenu()
    {
        $v_id_app = $_POST["id_app"];
        $v_id_menu = $_POST["id_menu"];
        $v_nombre_submenu = $_POST["nombre_submenu"];
        $v_url_submenu = $_POST["url_submenu"];
        $v_icono_submenu =  $_POST["icono_submenu"];
        $v_orden_submenu =  $_POST["orden_submenu"];
        $user = $_SESSION["usuario"]["nombreusuario"];
        $this->update_submenu = $this->loadModel('gestor');
        $actualizar = $this->update_submenu->ActualizarSubMenuEnTodosUsuarios($v_id_app, $v_id_menu, $v_nombre_submenu, $v_url_submenu, $v_icono_submenu, $v_orden_submenu, $user);

        $this->grabar_app = $this->loadModel('gestor');
        $datos = $this->grabar_app->GuardarSubMenudeApp($v_id_app, $v_id_menu, $v_nombre_submenu, $v_url_submenu, $v_icono_submenu, $v_orden_submenu, $user);
        echo $datos;
    }


    /* Para seccion usuarios */

    


    public function listar_actor_tramite()
    {

        $actor = trim($_GET["actor"]);
        $this->_listado_actor = $this->loadModel('procesos');
        $datos = $this->_listado_actor->ListarActorTramite($actor);
        echo $datos;
    }


    
    public function listar_actor_para_comite()
    {

        $actor = $_POST["actor"];
        $this->_listado_actor = $this->loadModel('procesos');
        $datos = $this->_listado_actor->ListarActorComite($actor);
        echo $datos;
    }


    public function listar_comites_por_usuario()
    {

        $user = utf8_decode(trim($_POST["user"]));
        $this->_listado_actor_user = $this->loadModel('procesos');
        $datos = $this->_listado_actor_user->ListarUsuarioActor($user);
        echo $datos;
    }



    public function seleccion_actor_user_grabarlo()
    {

        $user = utf8_decode($_POST["user"]);
        $actor = trim($_POST["actor"]);
        $abreviatura = trim($_POST["abreviatura"]);
        $responsable = utf8_decode(trim($_POST["responsable"]));
        $descripcion = trim($_POST["descripcion"]);
        $usuarioregistro =  $_SESSION["usuario"]["nombreusuario"];
        $this->_listado_actor_user_abre = $this->loadModel('procesos');
        $datos = $this->_listado_actor_user_abre->GrabarUserActor($user, $actor, $abreviatura, $usuarioregistro,  $responsable, $descripcion);
        echo $datos;
    }



    public function eliminar_user_actor()
    {

        $user = utf8_decode(trim($_POST["user"]));
        $actor = trim($_POST["actor"]);
        $this->_listado_actor_user_delete = $this->loadModel('procesos');
        $datos = $this->_listado_actor_user_delete->EliminarUserActor($user, $actor);
        echo $datos;
    }



   














}
