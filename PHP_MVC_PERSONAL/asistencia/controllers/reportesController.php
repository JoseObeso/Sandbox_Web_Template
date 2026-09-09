<?php

// ini_set('max_execution_time', 300);

class reportesController extends Controller {
    public

    function __construct() {
        parent::__construct();
        session_start();
        if ( isset( $_SESSION[ "usuario" ][ "dni" ] ) && $_SESSION[ "usuario" ][ "dni" ] != '' ) {

        } else {
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

    function masivo() {
        $this->_view->titulo = 'Reporte Masivo de Marcaciones - ' . INSTITUCION;
        $this->_view->setJs( array( 'masivo' ) );
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
                $nombres = '';
                $this->_ver_tempus_directo = $this->loadModel( 'asistencia' );
                $this->_view->ultima_actualizacion_tempus = $this->_ver_tempus_directo->getUpdateTempus();
                $this->_view->ultima_actualizacion_marcaciones_tempus = $this->_ver_tempus_directo->getUpdateMarcaciones();
                $this->_view->ver_ultima_marcacion = $this->_ver_tempus_directo->getUpdateMarcacionesUltimo();
                $this->_view->ver_personal_tempus = $this->_ver_tempus_directo->getListadoPersonalTempus( $nombres );

                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "asistencia" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'masivo', false );
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

    function procesar_reporte_masivo_admin() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->procesar_reporte_total = $this->loadModel( 'reportes' );
        $datos = $this->procesar_reporte_total->ObtenerReporteMasivoAdministrativo( $mes, $anio );
        echo $datos;
    }


    public
    function procesar_reporte_masivo_asistencial_marcaciones() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->procesar_reporte_total = $this->loadModel( 'reportes' );
        $datos = $this->procesar_reporte_total->ObtenerReporteMasivoAsistencial( $mes, $anio );
        echo $datos;



    }









}
?>