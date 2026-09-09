<?php

class parametrosController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {} else {
            header( 'location: /' );
        }
    }

    public

    function index() {
        $this->_view->titulo = 'Sistema : ' . ENLACE;
        $this->_view->setJs( array( 'index' ) );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_view->renderizar( 'index', false );
    }



    public

    function documentos() {
        $this->_view->titulo = 'Documentos referenciales - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'documentos' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_documentos = $this->loadModel( 'parametros' );
                $this->_view->listardocumentos = $this->_documentos->getListarDocumentos();
                $this->_view->renderizar( 'documentos', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    public

    function grabar_nuevo_documento() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $constancia = $_POST[ "constancia" ];
        $this->_grabar_documento = $this->loadModel( 'parametros' );
        $ejecutar_grabar_nuevo = $this->_grabar_documento->GrabarNuevoDocumento( $nombre, $constancia, $usuario );
        echo $ejecutar_grabar_nuevo;


    }

    public

    function grabar_edicion_documento_ref() {
        $id_ref = $_POST[ "id_ref" ];
        $nombre = $_POST[ "nombre" ];
        $constancia = $_POST[ "constancia" ];
        $this->_grabar_edicion_documento = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion_documento->GrabarEdicionDocumento( $nombre, $constancia, $id_ref );
        echo $ejecutar_grabar_edicion;
    }

    public

    function eliminar_documento() {
        $id_ref = $_POST[ "id_ref" ];
        $this->_eliminar_documento = $this->loadModel( 'parametros' );
        $ejecutar_eliminar_documento = $this->_eliminar_documento->EliminarDocumento( $id_ref );
        echo $ejecutar_eliminar_documento;


    }




    public

    function participaciones() {
        $this->_view->titulo = 'Tipo de Participaciones  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'participaciones' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_participaciones = $this->loadModel( 'parametros' );
                $this->_view->listar_todos_participaciones = $this->_participaciones->getListarParticipaciones();

                $this->_view->renderizar( 'participaciones', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_participacion() {

        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_parti = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_parti->GrabarNuevaParticipacion( $nombre, $usuario );
        echo $ejecutar_grabar;

    }


    public

    function grabar_edicion_participacion() {

        $id_parti = $_POST[ "id_ref" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion_parti = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion_parti->GrabarEdicionParticipacion( $nombre, $id_parti );
        echo $ejecutar_grabar_edicion;


    }


    public

    function eliminar_participacion() {
        $id_ref = $_POST[ "id_ref" ];
        $this->_eliminar_participacion = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_participacion->EliminarParticipacion( $id_ref );
        echo $ejecutar_eliminar;


    }

    public

    function eventos() {
        $this->_view->titulo = 'Tipo de Eventos  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'eventos' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_eventos = $this->loadModel( 'parametros' );
                $this->_view->listar_todos_eventos = $this->_eventos->getListarEventos();

                $this->_view->renderizar( 'eventos', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_evento() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_evento = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_evento->GrabarNuevoEvento( $nombre, $usuario );
        echo $ejecutar_grabar;
    }


    public

    function grabar_edicion_evento() {

        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion_evento = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion_evento->GrabarEdicionEvento( $nombre, $id );
        echo $ejecutar_grabar_edicion;


    }


    public

    function eliminar_evento() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_evento = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_evento->EliminarEvento( $id );
        echo $ejecutar_eliminar;



    }




    public

    function modalidad() {
        $this->_view->titulo = 'Tipos de Modalidad  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'modalidad' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_modalidad = $this->loadModel( 'parametros' );
                $this->_view->listar_modalidad = $this->_modalidad->getListarModalidad();

                $this->_view->renderizar( 'modalidad', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_modalidad() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_modalidad = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_modalidad->GrabarNuevoModalidad( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_modalidad() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion_modalidad = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion_modalidad->GrabarEdicionModalidad( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_modalidad() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_modalidad = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_modalidad->EliminarModalidad( $id );
        echo $ejecutar_eliminar;



    }





    public

    function fechas() {
        $this->_view->titulo = 'Tipos de Fechas  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'fechas' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_fechas = $this->loadModel( 'parametros' );
                $this->_view->listar_fechas = $this->_fechas->getListarFechas();

                $this->_view->renderizar( 'fechas', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_fechas() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_fecha = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_fecha->GrabarNuevoFechas( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_fechas() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionFechas( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_fechas() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_fechas = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_fechas->EliminarFechas( $id );
        echo $ejecutar_eliminar;



    }




    public

    function servicios() {
        $this->_view->titulo = 'Tipos de Servicios  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'servicios' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_servicios = $this->loadModel( 'parametros' );
                $this->_view->listar_servicios = $this->_servicios->getListarServicios();

                $this->_view->renderizar( 'servicios', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_servicios() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_servicios = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_servicios->GrabarNuevoServicios( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_servicios() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionServicios( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_servicios() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_tipo_servicios = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_tipo_servicios->EliminarServicios( $id );
        echo $ejecutar_eliminar;



    }





    public

    function culminacion() {
        $this->_view->titulo = 'Tipos de Culminacion - Motivos de Cese  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'culminacion' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_culminacion = $this->loadModel( 'parametros' );
                $this->_view->listar_culminacion = $this->_culminacion->getListarCulminacion();

                $this->_view->renderizar( 'culminacion', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_culminacion() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_culminacion = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_culminacion->GrabarNuevoCulminacion( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_culminacion() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionCulminacion( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_culminacion() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_tipo_Culminacion = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_tipo_Culminacion->EliminarCulminacion( $id );
        echo $ejecutar_eliminar;



    }




    public

    function cargo_laboral() {
        $this->_view->titulo = 'Tipos de Cargo Laboral  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'cargo_laboral' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_cargo_laboral = $this->loadModel( 'parametros' );
                $this->_view->listar_cargo_laboral = $this->_cargo_laboral->getListarCargo_laboral();

                $this->_view->renderizar( 'cargo_laboral', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_cargo_laboral() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_cargo_laboral = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_cargo_laboral->GrabarNuevoCargo_laboral( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_cargo_laboral() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionCargo_laboral( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_cargo_laboral() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_tipo_cargo_laboral = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_tipo_cargo_laboral->EliminarCargo_laboral( $id );
        echo $ejecutar_eliminar;



    }






    public

    function tipo_educacion() {
        $this->_view->titulo = 'Tipos de Educacion  - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'tipo_educacion' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_tipo_educacion = $this->loadModel( 'parametros' );
                $this->_view->listar_tipo_educacion = $this->_tipo_educacion->getListartipo_educacion();

                $this->_view->renderizar( 'tipo_educacion', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nueva_tipo_educacion() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_tipo_educacion = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_tipo_educacion->GrabarNuevotipo_educacion( $nombre, $usuario );
        echo $ejecutar_grabar;
    }



    public

    function grabar_edicion_tipo_educacion() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdiciontipo_educacion( $nombre, $id );
        echo $ejecutar_grabar_edicion;
    }


    public

    function eliminar_tipo_educacion() {
        $id = $_POST[ "id_ref" ];
        $this->_eliminar_tipo_educacion = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_tipo_educacion->Eliminartipo_educacion( $id );
        echo $ejecutar_eliminar;
    }






    public

    function edad() {
        $this->_view->titulo = 'Tipos de Edad para Cese - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'edad' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {

                $this->_tipo_edad = $this->loadModel( 'parametros' );
                $this->_view->listar_tipo_edad = $this->_tipo_edad->getListarEdad();

                $this->_view->renderizar( 'edad', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }

    public

    function grabar_edad_cese() {
        $id = $_POST[ "id" ];
        $edad = $_POST[ "edad" ];
        $this->_grabar_edad = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edad->GrabarEdad( $edad, $id );
        echo $ejecutar_grabar_edicion;

    }




    public

    function meritos_demeritos() {
        $this->_view->titulo = 'Tipos de Meritos Demeritos Otros - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'meritos_demeritos' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_meritos_demeritos = $this->loadModel( 'parametros' );
                $this->_view->listar_tipo_meritos_demeritos = $this->_meritos_demeritos->getListarMeritos();
                $this->_view->renderizar( 'meritos_demeritos', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }



    public

    function grabar_nuevo_merito() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $nombre = $_POST[ "nombre" ];
        $tipo = $_POST[ "tipo" ];
        $this->_grabar_nuevo_merito = $this->loadModel( 'parametros' );
        $ejecutar_grabar = $this->_grabar_nuevo_merito->GrabarNuevoMerito( $nombre, $usuario, $tipo );
        echo $ejecutar_grabar;
    }



    public
    function grabar_edicion_merito() {
        $id = $_POST[ "id" ];
        $nombre = $_POST[ "nombre" ];
        $tipo = $_POST[ "tipo" ];
        $this->_grabar_edicion = $this->loadModel( 'parametros' );
        $ejecutar_grabar_edicion = $this->_grabar_edicion->GrabarEdicionMerito( $nombre, $id, $tipo );
        echo $ejecutar_grabar_edicion;
    }


    public
    function eliminar_tipo_merito() {
        $id = $_POST[ "id" ];
        $this->_eliminar_tipo = $this->loadModel( 'parametros' );
        $ejecutar_eliminar = $this->_eliminar_tipo->EliminartipoMerito( $id );
        echo $ejecutar_eliminar;
    }


    
    public

    function universidades() {
        $this->_view->titulo = 'Lista de Universidades   - Parametros Legajos ' . INSTITUCION;;
        $this->_view->setJs( array( 'universidades' ) );
        $this->_modulos = $this->loadModel( 'modulos' );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( trim( $_SESSION[ "usuario" ][ "dni" ] ) );
        $this->_view->listar_modulos = $this->_modulos->ListarModulos( $u );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->plantilla_modulo = $this->_permisos->getPlantillaModulo( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $u = $this->loadEntity( 'usuario_web' );
        $u->setDni( $_SESSION[ "usuario" ][ "dni" ] );
        $this->_permisos = $this->loadModel( 'permisos' );
        $this->_view->listarmenuysubmenu = $this->_permisos->getListarMenuySubmenu( $_SESSION[ "usuario" ][ "dni" ], NOMBRE_APP );
        $this->_permisos = $this->loadModel( 'permisos' );
        $permiso = $this->_permisos->getVerificarPermisos( $u );
        if ( $permiso[ "estado" ] == 1 ) {
            $a_submenu = $this->loadEntity( 'acceso_submenu' );
            $a_submenu->setDni( $_SESSION[ "usuario" ][ "dni" ] );
            $a_submenu->setUrl( substr( $_SERVER[ "REQUEST_URI" ], 8 ) );
            $this->_permisos = $this->loadModel( 'permisos' );
            $permiso_menu = $this->_permisos->getVerificarMenu( $a_submenu );
            if ( $permiso_menu[ "estado" ] == 1 ) {
                $this->_universidad = $this->loadModel( 'parametros' );
                $this->_view->listar_universidad = $this->_universidad->getListarUniversidad();
                $this->_view->renderizar( 'universidades', false );
            } else {
                $this->_view->mensaje = $permiso_menu[ "mensaje" ];
                $this->_view->renderizar( 'error', false );
            }
        } else {
            $this->_view->mensaje = $permiso[ "mensaje" ];
            $this->_view->renderizar( 'error', false );
        }
    }


    




}
?>