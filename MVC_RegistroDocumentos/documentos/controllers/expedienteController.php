<?php

class expedienteController extends Controller
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
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu($_SESSION["usuario"]["nombreusuario"], NOMBRE_APP);
        $this->_view->renderizar('index', false);
    }



    public
    function entrada()
    {
        $this->_view->titulo = 'Bandeja de entrada - Registro de expedientes ' . INSTITUCION;
        $nombre_vista = "entrada";
        $this->_view->setJs(array($nombre_vista));
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

    public
    function derivados()
    {
        $this->_view->titulo = 'Derivados - Registro de expedientes ' . INSTITUCION;
        $this->_view->setJs(array('derivados'));
        $nombre_vista = "derivados";
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

    public
    function tramite()
    {
        $this->_view->titulo = 'Tramite, Recepcion, Culminados ' . INSTITUCION;
        $nombre_vista = "tramite";
        $this->_view->setJs(array($nombre_vista));
        $this->_view->setJs(array("registro"));
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


    public
    function desactivados()
    {
        $this->_view->titulo = 'Desactivados, suspendidos, anulados' . INSTITUCION;
        $nombre_vista = "desactivados";
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

    public function recargar_expedientes()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $buscar = trim($_POST["buscar"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $asunto = trim($_POST["asunto"]);
        $usuarios = trim($_POST["usuarios"]);
        $tdocumento = trim($_POST["tdocumento"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->recargar_documentos($user, $actor, $fecha, $fecha2, $buscar, $asunto, $usuarios,  $tdocumento);
        echo $datos;
    }



    public function mostrar_director()
    {
        $actor = trim($_POST["atencion"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->MostrarDirector($actor);
        echo $datos;
    }



    public function mostrar_director_areas()
    {
        $actor = trim($_SESSION["usuario"]["actor"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->MostrarDirectorArea($actor);
        echo $datos;
    }



    public function mostrar_treporte()
    {
        $treporte = trim($_POST["treporte"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->MostrarTreporte($treporte);
        echo $datos;
    }


    public function mostrar_tipo_documento()
    {
        $tdoc = trim($_GET["tdoc"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarTdoc($tdoc);
        echo $datos;
    }

    public function mostrar_tipo_documento_defecto()
    {
        $tdocu = trim($_POST["tdoc_defecto"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarTdocDefecto($tdocu);
        echo $datos;
    }


    public function ver_prioridad()
    {
        $prio = trim($_GET["prio"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarPrioridad($prio);
        echo $datos;
    }

    public function ver_prioridad_ubicar()
    {
        $prio = trim($_POST["ubicar_prioridad"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarPrioridadUbicar($prio);
        echo $datos;
    }






    public function mostrar_accion()
    {
        $accion = trim($_GET["accion"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarAccion($accion);
        echo $datos;
    }



    public function mostrar_accion1()
    {
        $accion1 = trim($_POST["ubi_accion1"]);
        $this->_listartdoc = $this->loadModel('expediente');
        $datos = $this->_listartdoc->ListarAccion1($accion1);
        echo $datos;
    }





    public function mostrar_referencia()
    {
        $referencia = trim($_GET["referencia"]);
        $this->_listarrefe = $this->loadModel('expediente');
        $datos = $this->_listarrefe->ListarReferencia($referencia);
        echo $datos;
    }





    public function mostrar_expediente_ubicado()
    {
        $ubicar = trim($_GET["ubicar"]);
        $this->_listarrefe = $this->loadModel('expediente');
        $datos = $this->_listarrefe->ListarUbicacionExpediente($ubicar);
        echo $datos;
    }



    public function mostrar_referencia_expediente()
    {
        $referencia = trim($_GET["referencia"]);
        $this->_listarrefe = $this->loadModel('expediente');
        $datos = $this->_listarrefe->ListarReferenciaExpediente($referencia);
        echo $datos;
    }


    public function mostrar_expedientes()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $fecha = $_POST['fecha'];
        $buscar = $_POST['buscar'];
        $this->_doc = $this->loadModel('expediente');
        $this->_view->listardocumentos = $this->_doc->obtener_documentos($user, $actor, $fecha, $buscar);
        echo $this->_view->listardocumentos;
    }

    public function listar_remitente()
    {
        $actor = trim($_GET["actor"]);
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->ListarActorTramite($actor);
        echo $datos;
    }


    public function listar_remitente_areas()
    {
        $actor = trim($_SESSION["usuario"]["actor"]);
        $actor_busqueda =  trim($_GET["actor"]);
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->ListarActorTramiteAreas($actor, $actor_busqueda);
        echo $datos;
    }



    public function listar_remitente_buscando_Actor()
    {
        $actor_ubicar = trim($_POST["ubicar_actor"]);
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->ListarActorTramiteUbicando($actor_ubicar);
        echo $datos;
    }

    public function listar_reportes()
    {
        $reporte = trim($_GET["reporte"]);
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->ListarReporte($reporte);
        echo $datos;
    }



    public function registrar_expediente()
    {

        $fecha_expediente = trim($_POST["fecha_expediente"]);
        $hora_expediente = trim($_POST["hora_expediente"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $actor_remitente = trim($_POST["idactor"]);
        $remitente = utf8_decode(trim($_POST["remitente"]));
        $asunto = utf8_decode(trim($_POST["asunto"]));
        $prioridad = trim($_POST["idprioridad"]);
        $plazo = $_POST["plazo"];
        $tipo_doc = trim($_POST["tipo_doc"]);
        $nro_doc = utf8_decode(trim($_POST["nro_doc"]));
        $folios = $_POST["folios"];
        $actor_atencion = trim($_POST["actor_atencion"]);
        $accion1 = trim($_POST["accion1"]);
        $accion2 = trim($_POST["accion2"]);
        $referencia = trim($_POST["referencia"]);
        $tipo_reporte = trim($_POST["tipo_reporte"]);
        $observacion = utf8_decode(trim($_POST["observacion"]));
        $adjunto = trim($_POST["adjunto"]);
        $this->_grabar_expe = $this->loadModel('expediente');
        $datos = $this->_grabar_expe->GrabarExpediente($fecha_expediente, $hora_expediente, $user, $actor_registra, $actor_remitente, $remitente, $asunto, $prioridad, $plazo, $tipo_doc, $nro_doc, $folios, $actor_atencion, $accion1, $accion2, $referencia, $tipo_reporte, $observacion, $adjunto);
        echo $datos;
    }


    public function editar_expediente()
    {

        $id = trim($_POST["id"]);
        $fecha_expediente = trim($_POST["fecha_expediente"]);
        $hora_expediente = trim($_POST["hora_expediente"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_remitente = trim($_POST["idactor"]);
        $remitente = utf8_decode(trim($_POST["remitente"]));
        $asunto =  utf8_decode(trim($_POST["asunto"]));
        $prioridad = trim($_POST["idprioridad"]);
        $plazo = $_POST["plazo"];
        $tipo_doc = trim($_POST["tipo_doc"]);
        $nro_doc = utf8_decode(trim($_POST["nro_doc"]));
        $folios = $_POST["folios"];
        $accion1 = trim($_POST["accion1"]);
        $accion2 = trim($_POST["accion2"]);
        $referencia =  utf8_decode(trim($_POST["referencia"]));
        $observacion =  utf8_decode(trim($_POST["observacion"]));
        $this->_editar_expe = $this->loadModel('expediente');
        $datos = $this->_editar_expe->EditarExpediente($id, $fecha_expediente, $hora_expediente, $user, $actor_remitente, $remitente, $asunto, $prioridad, $plazo, $tipo_doc, $nro_doc, $folios, $accion1, $accion2, $referencia, $observacion);
        echo $datos;
    }



    public function mostrar_entidades()
    {
        $id = $_POST["id"];
        $this->listar_entidad = $this->loadModel('expediente');
        $buscar = $this->listar_entidad->ObtenerListadoEntidades($id);
        echo $buscar;
    }


    public function actualizar_datos_entidad()
    {
        $id = $_POST["id"];
        $descripcion = trim($_POST["descripcion"]);
        $direccion = trim($_POST["direccion"]);
        $abreviatura = trim($_POST["abreviatura"]);
        $telefono = trim($_POST["telefono"]);
        $ruc = trim($_POST["ruc"]);
        $this->editar_entidad = $this->loadModel('expediente');
        $buscar = $this->editar_entidad->EditarEntidades($id, $descripcion, $abreviatura, $direccion, $telefono, $ruc);
        echo $buscar;
    }


    public function eliminar_datos_entidad()
    {
        $id = rtrim($_POST["id"]);
        $this->eliminar_entidad = $this->loadModel('expediente');
        $buscar = $this->eliminar_entidad->EliminarEntidad($id);
        echo $buscar;
    }


    public function eliminar_datos_tdoc()
    {
        $id = rtrim($_POST["id"]);
        $this->eliminar_tdoc = $this->loadModel('expediente');
        $buscar = $this->eliminar_tdoc->EliminarTdoc($id);
        echo $buscar;
    }

    public function eliminar_entidad_confirmar()
    {
        $id = rtrim($_POST["id"]);
        $this->eliminar_entidad_confirmar = $this->loadModel('expediente');
        $buscar = $this->eliminar_entidad_confirmar->EliminarEntidadConfirmar($id);
        echo $buscar;
    }


    public function eliminar_tdoc_confirmar()
    {
        $id = rtrim($_POST["id"]);
        $this->eliminar_toc_confirmar = $this->loadModel('expediente');
        $buscar = $this->eliminar_toc_confirmar->EliminarTdocConfirmar($id);
        echo $buscar;
    }







    public function mostrar_tdocu()
    {
        $id = $_POST["id"];
        $this->listar_treporte = $this->loadModel('expediente');
        $buscar = $this->listar_treporte->ObtenerTdoc($id);
        echo $buscar;
    }

    public function grabar_tdoc()
    {
        $descripcion = $_POST["descripcion"];
        $this->grabar_tdoc = $this->loadModel('expediente');
        $buscar = $this->grabar_tdoc->GrabarTdoc($descripcion);
        echo $buscar;
    }

    public function editar_tdoc()
    {
        $id = $_POST["id"];
        $descripcion = $_POST["descripcion"];
        $this->editar_tdoc = $this->loadModel('expediente');
        $buscar = $this->editar_tdoc->EditarTdoc($id, $descripcion);
        echo $buscar;
    }




    public function grabar_datos_entidad()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $descripcion = trim($_POST["descripcion"]);
        $direccion = trim($_POST["direccion"]);
        $abreviatura = trim($_POST["abreviatura"]);
        $telefono = trim($_POST["telefono"]);
        $ruc = trim($_POST["ruc"]);
        $this->editar_entidad = $this->loadModel('expediente');
        $buscar = $this->editar_entidad->GrabarEntidades($user, $descripcion, $abreviatura, $direccion, $telefono, $ruc);
        echo $buscar;
    }


    public function dato_recuperacion_expediente()
    {
        $id = $_POST["id"];
        $this->listar_expediente = $this->loadModel('expediente');
        $buscar = $this->listar_expediente->RecuperacionExpediente($id);
        echo $buscar;
    }



    public function ver_min_max()
    {
        $fecha1 = trim($_POST["fecha1"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $this->_ver_min_max = $this->loadModel('expediente');
        $buscar = $this->_ver_min_max->VerMinMax($actor_registra, $fecha1, $fecha2);
        echo $buscar;
    }

    public function ver_min_max_procesar()
    {
        $fecha1 = trim($_POST["fecha1"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $this->_ver_min_max = $this->loadModel('expediente');
        $buscar = $this->_ver_min_max->VerMinMaxProcesar($actor_registra, $fecha1, $fecha2);
        echo $buscar;
    }



    public function eliminar_expediente_estado_cero()
    {
        $id = trim($_POST["id"]);
        $actor =  trim($_SESSION["usuario"]["actor"]);
        $this->_eliminar_expe = $this->loadModel('expediente');
        $buscar = $this->_eliminar_expe->EliminacionExpediente($id, $actor);
        echo $buscar;
    }

    public function recuperar_a_estado_1()
    {
        $id = trim($_POST["id"]);
        $this->_eliminar_expe1 = $this->loadModel('expediente');
        $buscar = $this->_eliminar_expe1->RecuperarEstado_1($id);
        echo $buscar;
    }

    public function procesar_estado_2()
    {
        $inicio = trim($_POST["inicio"]);
        $fin = trim($_POST["fin"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $this->_ver_min_max = $this->loadModel('expediente');
        $buscar = $this->_ver_min_max->ProcesarEstado_2($actor_registra, $inicio, $fin);
        echo $buscar;
    }

    /* seccion de derivados */

    public function recargar_derivados()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $mostrar = $_POST["mostrar"];
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarDerivados($actor, $fecha, $fecha2, $mostrar);
        echo $datos;
    }


    public function recargar_derivados_otd()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $mostrar = $_POST["mostrar"];
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarDerivadosOTD($actor, $fecha, $fecha2, $mostrar);
        echo $datos;
    }


    public function recargar_derivados_interno()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $mostrar = $_POST["mostrar"];
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarDerivadosINTERNO($actor, $fecha, $fecha2, $mostrar);
        echo $datos;
    }


    public function generar_cargo()
    {
        $actor = trim($_SESSION["usuario"]["actor"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->GenerarCargo($actor);
        echo $datos;
    }

    public function grabar_cargo_expediente()
    {
        $expediente = trim($_POST["expediente"]);
        $cargo = trim($_POST["cargo"]);
        $fecha = trim($_POST["fecha"]);
        $numero = trim($_POST["numero"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_origen = trim($_SESSION["usuario"]["actor"]);
        $this->_cargo_expe = $this->loadModel('expediente');
        $datos = $this->_cargo_expe->GrabarCargoExpediente($expediente, $cargo, $user, $fecha, $numero, $actor_origen);
        echo $datos;
    }



    public function seleccion_cargos_vigente()
    {
        $fechafin = trim($_POST["fechafin"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $this->_cargo_expe = $this->loadModel('expediente');
        $datos = $this->_cargo_expe->MostrarCargosGenerados($fechafin, $actor_registra);
        echo $datos;
    }


    /* deactivados */

    public function recargar_desactivados()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarDesactivados($actor, $fecha, $fecha2);
        echo $datos;
    }


    public function activar_expediente()
    {
        $id = trim($_POST["id"]);
        $actor =  trim($_SESSION["usuario"]["actor"]);
        $this->_eliminar_expe = $this->loadModel('expediente');
        $buscar = $this->_eliminar_expe->ActivarExpediente($id, $actor);
        echo $buscar;
    }

    public function recargar_tramite()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $tramite = trim($_POST["tipo_tramite"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarTramite($actor, $fecha, $fecha2, $tramite);
        echo $datos;
    }

    public function recargar_tramite_otd()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $tramite = trim($_POST["tipo_tramite"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarTramiteOTD($actor, $fecha, $fecha2, $tramite);
        echo $datos;
    }


    public function recargar_tramite_interno()
    {
        $fecha = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $tramite = trim($_POST["tipo_tramite"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->RecargarTramiteInterno($actor, $fecha, $fecha2, $tramite);
        echo $datos;
    }

    public function grabar_recepcion()
    {
        $fecha = trim($_POST["fecha"]);
        $actor = trim($_SESSION["usuario"]["actor"]);
        $expediente = trim($_POST["id"]);
        $comentario = utf8_decode(trim($_POST["comentario"]));
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $nro = trim($_POST["nro"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->GrabarRecepcion($fecha, $actor, $expediente, $comentario, $user, $nro);
        echo $datos;
    }

    /* derivacion */


    public function grabar_actor_cc()
    {
        $actor = trim($_POST["actor"]);
        $id = trim($_POST["id"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $nro_expe = trim($_POST["nro_expe"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->GrabarActorCC($actor, $id, $user, $nro_expe);
        echo $datos;
    }



    public function mostrar_actor_cc()
    {
        $id = trim($_POST["id"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $nro_expe = trim($_POST["nro_expe"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->MostrarActorCC($id, $user, $nro_expe);
        echo $datos;
    }



    public function eliminar_actor_cc()
    {
        $id = trim($_POST["expediente"]);
        $actor = trim($_POST["actor"]);
        $this->_doc = $this->loadModel('expediente');
        $datos = $this->_doc->EliminarActorCC($id, $actor);
        echo $datos;
    }

    /* deriva expediente con o sin copia */
    public function derivar_nuevo_expediente()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $expediente = trim($_POST["expediente"]);
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $fecha = trim($_POST["fecha"]);
        $hora = trim($_POST["hora"]);
        $actor_destino = trim($_POST["actor_destino"]);
        $accion1 = trim($_POST["accion1"]);
        $accion2 = trim($_POST["accion2"]);
        $prioridad = trim($_POST["prioridad"]);
        $nro_doc = utf8_decode(trim($_POST["nro_doc"]));
        $doc_adj1 = utf8_decode(trim($_POST["doc_adj1"]));
        $doc_adj2 = utf8_decode(trim($_POST["doc_adj2"]));
        $observacion = utf8_decode(trim($_POST["observacion"]));
        $this->_derivar_doc = $this->loadModel('expediente');
        $datos = $this->_derivar_doc->GrabarDerivarExpedienteCC($user, $actor_actual, $expediente, $tipo_operacion, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $nro_doc, $observacion, $doc_adj1, $doc_adj2);
        echo $datos;
    }

    public function derivar_nuevo_expediente_bloque()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $expediente = trim($_POST["expediente"]);
        $tipo_operacion = trim($_POST["tipo_operacion"]);
        $fecha = trim($_POST["fecha"]);
        $hora = trim($_POST["hora"]);
        $actor_destino = trim($_POST["actor_destino"]);
        $accion1 = trim($_POST["accion1"]);
        $accion2 = trim($_POST["accion2"]);
        $prioridad = trim($_POST["prioridad"]);
        $observacion = utf8_decode(trim($_POST["observacion"]));
        $doc_adj1 = utf8_decode(trim($_POST["doc_adj1"]));
        $doc_adj2 = utf8_decode(trim($_POST["doc_adj2"]));
        $this->_derivar_doc = $this->loadModel('expediente');
        $datos = $this->_derivar_doc->GrabarDerivarExpedienteBloqueCC($user, $actor_actual, $expediente, $tipo_operacion, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $observacion, $doc_adj1, $doc_adj2);
        echo $datos;
    }





    public function recuperar_derivado_emitido()
    {
        $id = trim($_POST["id"]);
        $nro = trim($_POST["nro"]);
        $actor =  trim($_SESSION["usuario"]["actor"]);
        $this->_recuperar_derivado = $this->loadModel('expediente');
        $buscar = $this->_recuperar_derivado->RecuperarExpedienteDerivado($id, $nro, $actor);
        echo $buscar;
    }




    public function recuperar_expediente_editar()
    {
        $id = trim($_POST["id"]);
        $nro = trim($_POST["nro"]);
        $actor =  trim($_SESSION["usuario"]["actor"]);
        $this->_recuperar_derivado = $this->loadModel('expediente');
        $buscar = $this->_recuperar_derivado->RecuperarDerivadoEmitidoEditar($id, $nro, $actor);
        echo $buscar;
    }


    public function grabar_edicion_expediente_derivado()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $codigo_tramite = trim($_SESSION["usuario"]["codigo_tramite"]);
        $expediente = trim($_POST["expediente"]);
        $nro = trim($_POST["nro"]);
        $fecha = trim($_POST["fecha_expediente"]);
        $hora = trim($_POST["hora_expediente"]);
        $actor_destino = trim($_POST["idactor"]);
        $accion1 = trim($_POST["accion1"]);
        $accion2 = trim($_POST["accion2"]);
        $prioridad = trim($_POST["prioridad"]);
        $nro_doc = utf8_decode(trim($_POST["nro_doc"]));
        $asunto = utf8_decode(trim($_POST["asunto"]));
        $observacion = utf8_decode(trim($_POST["observacion"]));
        $this->_derivar_doc_edicion = $this->loadModel('expediente');
        $datos = $this->_derivar_doc_edicion->GrabarEdicionDerivar($user, $actor_actual, $expediente, $nro, $fecha, $hora, $actor_destino, $accion1, $accion2, $prioridad, $nro_doc, $observacion, $asunto, $codigo_tramite);
        echo $datos;
    }

    public function culminar_expediente()
    {
        $id = trim($_POST["id"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $comentario = utf8_decode(trim($_POST["comentario"]));
        $this->_culminar_expe = $this->loadModel('expediente');
        $buscar = $this->_culminar_expe->CulminarExpediente($id,  $user, $comentario);
        echo $buscar;
    }


    public function recuperar_culminar_expediente()
    {
        $id = trim($_POST["id"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $this->_culminar_expe = $this->loadModel('expediente');
        $buscar = $this->_culminar_expe->RecuperarCulminarExpediente($id,  $user);
        echo $buscar;
    }

    public function ver_nro_documento()
    {
        $id = trim($_POST["id"]);
        $this->_ver_nro = $this->loadModel('expediente');
        $buscar = $this->_ver_nro->VerNroDocumento($id);
        echo $buscar;
    }

    public function actualizar_ocurrencias_expedientes()
    {
        $this->_update_expe = $this->loadModel('expediente');
        $buscar = $this->_update_expe->ActualizarOcurrenciaExpedientes();
        echo $buscar;
    }

    public function verExpedienteRecibidos()
    {

        $fecha1 = trim($_POST["fecha"]);
        $fecha2 = trim($_POST["fecha2"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $this->_Ver_Expe_Rec = $this->loadModel('expediente');
        $buscar = $this->_Ver_Expe_Rec->ReportesExpedientesRecibidos($fecha1, $fecha2, $actor_actual);
        echo $buscar;
    }


    public function grabar_actor_cc_temporal()
    {
        $actor_cc = trim($_POST["actor"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $descripcion = utf8_decode(trim($_POST["descripcion"]));
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $this->_con_copia_cc = $this->loadModel('expediente');
        $buscar = $this->_con_copia_cc->GrabarActorCCTemp($actor_cc,  $actor_actual,  $user, $descripcion);
        echo $buscar;
    }


    public function listar_actores_cc_temp()
    {
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->ListarActorCCTemp($user);
        echo $datos;
    }


    public function eliminar_cc_temp()
    {
        $id = $_POST["id"];
        $this->_listado_actor = $this->loadModel('expediente');
        $datos = $this->_listado_actor->eliminarCCTemp($id);
        echo $datos;
    }

    public function registrar_expediente_areas()
    {
        $fecha_expediente = trim($_POST["fecha"]);
        $hora_expediente = trim($_POST["hora"]);
        $idactor_remitente = trim($_POST["idactor_remitente"]);
        $remitente = trim($_POST["remitente"]);
        $idreporte = trim($_POST["idreporte"]);
        $idtipo_doc = trim($_POST["idtipodoc"]);
        $nro_doc = utf8_decode(trim($_POST["nro_doc"]));
        $folios = $_POST["folios"];
        $idactor_atencion = trim($_POST["idactor_atencion"]);
        $lc_nombre_destino =  utf8_decode(trim($_POST["nombre_destino"]));
        $asunto = utf8_decode(trim($_POST["asunto"]));
        $idprioridad = trim($_POST["idprioridad"]);
        $plazo = $_POST["plazo"];
        $idaccion1 = trim($_POST["idaccion1"]);
        $idaccion2 = trim($_POST["idaccion2"]);
        $referencia = trim($_POST["referencia"]);
        $observacion = utf8_decode(trim($_POST["observacion"]));
        $adjunto = utf8_decode(trim($_POST["adjunto"]));
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $actor_registra = trim($_SESSION["usuario"]["actor"]);
        $actor_codigo = trim($_SESSION["usuario"]["codigo_tramite"]);
        $this->_grabar_expe_area = $this->loadModel('expediente');
        $datos = $this->_grabar_expe_area->GrabarExpedienteAreas(
            $fecha_expediente,
            $hora_expediente,
            $idactor_remitente,
            $remitente,
            $idreporte,
            $idtipo_doc,
            $nro_doc,
            $folios,
            $idactor_atencion,
            $asunto,
            $idprioridad,
            $plazo,
            $idaccion1,
            $idaccion2,
            $referencia,
            $observacion,
            $user,
            $actor_registra,
            $actor_codigo,
            $lc_nombre_destino,
            $adjunto
        );
        echo $datos;
    }



    public function subir_pdf()
    {
        $nombre_archivo = $_FILES['subir_archivo']['name'];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/tramite/public/pdf/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_pdf_add()
    {
        $nombre_archivo = $_FILES['subir_archivo_add']['name'];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/tramite/public/pdf/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_add"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function subir_pdf_area()
    {
        $nombre_archivo = $_FILES['subir_archivo_area']['name'];
        $destino = $_SERVER['DOCUMENT_ROOT'] . '/tramite/public/pdf/';
        if (!file_exists($destino)) {
            mkdir($destino, 0777);
        }
        $directorio =  $destino . $nombre_archivo;
        if (move_uploaded_file($_FILES["subir_archivo_area"]["tmp_name"], $directorio)) {
            $datos = "1";
        } else {
            $datos = "0";
        }
        echo $datos;
    }


    public function actualizar_adjunto()
    {
        $expediente = trim($_POST["expe"]);
        $adjunto = trim($_POST["adjunto"]);
        $this->_actualizar_ad = $this->loadModel('expediente');
        $datos = $this->_actualizar_ad->ActualizarAdjunto($expediente, $adjunto);
        echo $datos;
    }

    public function eliminar_adjunto()
    {
        $expediente = trim($_POST["expe"]);
        $this->_eliminar_ad = $this->loadModel('expediente');
        $datos = $this->_eliminar_ad->EliminarAdjunto($expediente);
        echo $datos;
    }


    public function ver_ocurrencias()
    {
        $expediente = trim($_POST["expe"]);
        $this->_listado_expe = $this->loadModel('expediente');
        $datos = $this->_listado_expe->ListarOcurrencias($expediente);
        echo $datos;
    }



    public function expedientes_impresion()
    {
        $expediente = trim($_POST["expe"]);
        $user = trim($_SESSION["usuario"]["nombreusuario"]);
        $id = trim($_POST["iduser"]);
        $this->_listado_expe = $this->loadModel('expediente');
        $datos = $this->_listado_expe->ExpedienteImpresion($expediente, $user, $id);
        echo $datos;
    }

    public function seleccionexpediente()
    {
        $fecha1 = trim($_POST["ini"]);
		$fecha2 = trim($_POST["fin"]);
        $actor_actual = trim($_SESSION["usuario"]["actor"]);
        $this->_selec_expe = $this->loadModel('expediente');
        $datos = $this->_selec_expe ->ExpedienteSeleccion($fecha1, $fecha2, $actor_actual);
        echo $datos;
        
    }

    


    





}
