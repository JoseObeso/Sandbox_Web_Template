<?php

class asignacionController extends Controller {
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

    function horario() {
        $this->_view->titulo = 'Asignacion de Horarios Administrativos - Asistencial - Turnos ' . INSTITUCION;;
        $this->_view->setJs( array( 'horario' ) );
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
                $this->_personal = $this->loadModel( 'asignacion' );
                $this->_view->listarpersonal = $this->_personal->getListarPersonal();
                $this->_view->listarhorario = $this->_personal->getListarHorarios();


                $this->_view->renderizar( 'horario', false );
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

    function buscar_por_nombre() {
        $nombres = $_POST[ "nombres" ];
        $this->_buscar_nombres = $this->loadModel( 'asignacion' );
        $buscar_y_traer = $this->_buscar_nombres->BuscarPersonalNombres( $nombres );
        echo $buscar_y_traer;
    }


    public

    function asignar_horario() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $codhorario = $_POST[ "codhorario" ];
        $idpersonal = $_POST[ "idpersonal" ];
        $this->_asignar_horario_personal = $this->loadModel( 'asignacion' );
        $ejecutar_asignar = $this->_asignar_horario_personal->AsignarHorario( $codhorario, $idpersonal, $usuario );
        echo $ejecutar_asignar;
    }



    public

    function asistencia() {
        $this->_view->titulo = 'Programacion de Horarios Administrativos - Turnos ' . INSTITUCION;;
        $this->_view->setJs( array( 'asistencia' ) );
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
                $this->_administrativos = $this->loadModel( 'asignacion' );
                $this->_view->listar_administrativos = $this->_administrativos->getListarAdministrativos();
                $mes = intval( date( "m" ) );
                $anio = date( "Y" );
                $this->_view->listar_programacion = $this->_administrativos->MostrarProgramacionMes( $mes, $anio );
                $this->_view->renderizar( 'asistencia', false );
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

    function procesar_todo_administrativo_asistencial() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_procesar_administrativo = $this->loadModel( 'asignacion' );
        $ejecutar_procesar = $this->_procesar_administrativo->Procesar_Todo_Administrativo_Asistencial( $mes, $anio, $usuario );
        echo $ejecutar_procesar;
    }


    public

    function eliminar_todo_administrativo() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_eliminar_proceso = $this->loadModel( 'asignacion' );
        $ejecutar_procesar = $this->_eliminar_proceso->Eliminar_administrativo( $mes, $anio );
        echo $ejecutar_procesar;
    }




    public

    function ver_programacion_seleccion() {
        $mes = $_POST[ "mes_mostrar" ];
        $anio = $_POST[ "anio_mostrar" ];
        $this->_ver_programacion = $this->loadModel( 'asignacion' );
        $ejecutar_ver = $this->_ver_programacion->MostrarProgramacionMes( $mes, $anio );
        echo $ejecutar_ver;
    }


    public

    function verificar_si_existe_programacion() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_ver_si_existe = $this->loadModel( 'asignacion' );
        $ejecutar_ver = $this->_ver_si_existe->VerificarProgramacionMes( $mes, $anio );
        echo $ejecutar_ver;

    }









}
?>