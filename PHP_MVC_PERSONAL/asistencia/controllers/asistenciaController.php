<?php

// ini_set('max_execution_time', 300);

class asistenciaController extends Controller {
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

    function personal_tempus() {
        $this->_view->titulo = 'Mantenimiento y Gestion de Personal TEMPUS de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'personal_tempus' ) );
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
                $this->_ver_tempus = $this->loadModel( 'asistencia' );
                $this->_view->ultima_actualizacion_tempus = $this->_ver_tempus->getUpdateTempus();
                $this->_view->ultima_actualizacion_marcaciones_tempus = $this->_ver_tempus->getUpdateMarcaciones();
                $this->_personal_tempus = $this->loadModel( 'asistencia' );
                $this->_view->listarpersonal_tempus = $this->_personal_tempus->getListadoPersonalTempus( $u );
                $dni_proce = '';
                $mes_proce = 0;
                $anio_proce = 0;
                $this->_marcaciones_tempus = $this->loadModel( 'asistencia' );
                $this->_view->marcaciones_personal_tempus = $this->_marcaciones_tempus->getListadoMarcacionesAsistencial( $dni_proce, $mes_proce, $anio_proce );
                $this->_ver_ultima_marcacion = $this->loadModel( 'asistencia' );
                $this->_view->ver_ultima_marcacion = $this->_ver_ultima_marcacion->getUpdateMarcacionesUltimo();
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "asistencia" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'personal_tempus', false );
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

    function marcaciones() {
        $this->_view->titulo = 'Marcaciones del Personal en Control de Asistencia TEMPUS de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'marcaciones' ) );
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
                $this->_view->renderizar( 'marcaciones', false );
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

    function mayor() {
        $this->_view->titulo = 'Mayor Cantidad de Marcaciones del Personal en Control de Asistencia TEMPUS de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'mayor' ) );
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
                $mes = intval( date( "m" ) );
                $anio = date( "Y" );
                $this->_ver_tempus_directo = $this->loadModel( 'asistencia' );
                $this->_view->ultima_actualizacion_tempus = $this->_ver_tempus_directo->getUpdateTempus();
                $this->_view->ultima_actualizacion_marcaciones_tempus = $this->_ver_tempus_directo->getUpdateMarcaciones();
                $this->_view->ver_ultima_marcacion = $this->_ver_tempus_directo->getUpdateMarcacionesUltimo();
                $this->_view->ver_mayor_frecuencia_marcaciones = $this->_ver_tempus_directo->FrecuenciaMarcaciones( $mes, $anio );
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "asistencia" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'mayor', false );
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

    function reportes_masivos() {
        $this->_view->titulo = 'Reportes Masivos Personal TEMPUS de Monitoreo de RRHH - ' . INSTITUCION;
        $this->_view->setJs( array( 'reportes_masivos' ) );
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
                $this->_ver_tempus = $this->loadModel( 'asistencia' );
                $this->_view->ultima_actualizacion_tempus = $this->_ver_tempus->getUpdateTempus();
                $this->_view->ultima_actualizacion_marcaciones_tempus = $this->_ver_tempus->getUpdateMarcaciones();
                $this->_personal_tempus = $this->loadModel( 'asistencia' );
                $this->_view->listarpersonal_tempus = $this->_personal_tempus->getListadoPersonalTempus( $u );
                $dni_proce = '';
                $mes_proce = 0;
                $anio_proce = 0;
                $this->_marcaciones_tempus = $this->loadModel( 'asistencia' );
                $this->_view->marcaciones_personal_tempus = $this->_marcaciones_tempus->getListadoMarcacionesAsistencial( $dni_proce, $mes_proce, $anio_proce );
                $this->_ver_ultima_marcacion = $this->loadModel( 'asistencia' );
                $this->_view->ver_ultima_marcacion = $this->_ver_ultima_marcacion->getUpdateMarcacionesUltimo();
                $this->_todoslosmodulos = $this->loadModel( 'plantillas' );
                $this->_view->todoslosmodulos = $this->_todoslosmodulos->ListarPlantillaModulos();
                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "Reportes" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'reportes_masivos', false );
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

    function recargar_personal_tempus() {
        $u = $this->loadEntity( 'usuario_web' );
        $u->setNombres( trim( $_POST[ "nombres" ] ) );
        $this->_personal_tempus = $this->loadModel( 'asistencia' );
        $this->_view->listarpersonal_tempus = $this->_personal_tempus->getListadoPersonalTempus( $u );
        echo $this->_view->listarpersonal_tempus;


    }


    public

    function ver_marcaciones_de_asistencia() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_en_tempus = $this->loadModel( 'asistencia' );
        $this->_view->marcaciones_personal_tempus = $this->_ver_marcaciones_en_tempus->getListadoMarcaciones( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_personal_tempus;
    }

    public

    function ver_marcaciones_de_asistencia_administrativo() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_en_tempus_segundo_formato = $this->loadModel( 'asistencia' );
        $this->_view->marcaciones_personal_tempus_segundo_formato = $this->_ver_marcaciones_en_tempus_segundo_formato->getListadoMarcacionesSegundoAdmin( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_personal_tempus_segundo_formato;
    }



    public

    function ver_marcaciones_de_asistencia_entrada_salida() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_entrada_salida_admin = $this->loadModel( 'asistencia' );
        $this->_view->marcaciones_personal_tempus_segundo_formato = $this->_ver_marcaciones_entrada_salida_admin->getListadoMarcacionesEntradaSalidaAdministrativo( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_personal_tempus_segundo_formato;
    }





    public

    function ver_marcaciones_de_asistencia_asistencial() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_asistencial = $this->loadModel( 'asistencia' );
        $this->_view->marcaciones_asistencial = $this->_ver_marcaciones_asistencial->getListadoMarcacionesAsistencial( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_asistencial;
    }




    public

    function ver_marcaciones_de_asistencia_asistencial_v02() {
        $dni_proce = $_POST[ "dni" ];
        $mes_proce = $_POST[ "mes" ];
        $anio_proce = $_POST[ "anio" ];
        $this->_ver_marcaciones_asistencial = $this->loadModel( 'asistencia' );
        $this->_view->marcaciones_asistencial = $this->_ver_marcaciones_asistencial->getListadoMarcacionesAsistencial_v02( $dni_proce, $mes_proce, $anio_proce );
        echo $this->_view->marcaciones_asistencial;
    }







    public

    function procesar_reporte_masivo()

    {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_ver_reportes_masivos = $this->loadModel( 'asistencia' );
        $this->_view->reportes_masivos = $this->_ver_reportes_masivos->Listado_Reportes_Masivos( $mes, $anio );
        echo $this->_view->reportes_masivos;


    }



    public

    function descuentos() {
        $this->_view->titulo = 'Descuentos del Personal Asistencial - Administrativos - ' . INSTITUCION;
        $this->_view->setJs( array( 'descuentos' ) );
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
                $this->_ver_todo_el_personal = $this->loadModel( 'asistencia' );
                $this->_view->ver_todo_el_personal = $this->_ver_todo_el_personal->VerTodoElPersonal();
                /*
                $mes = 8;
                $anio = 2018;
                $tipo = 'A';
                $dni = '32921099';
                
                */
                // $this->_view->ver_proceso = $this->_ver_todo_el_personal->IniciarProcesodescuentoAdministrativo( $mes, $anio, $tipo, $usuario );






                $this->_permisos = $this->loadModel( 'permisos' );
                $am = $this->loadEntity( 'acceso_modulo' );
                $a_menu = $this->loadEntity( 'acceso_menu' );
                $a_submenu = $this->loadEntity( 'acceso_submenu' );
                $am->setNombre( NOMBRE_APP );
                $am->setDni( $_SESSION[ "usuario" ][ "dni" ] );
                $a_menu->setNombre( ENLACE );
                $a_submenu->setNombre( "asistencia" );
                $this->_view->listarbotones = $this->_permisos->getListadoBotones( $am, $a_menu, $a_submenu );
                $this->_view->renderizar( 'descuentos', false );
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

    function ver_datos_asistencia_administrativos() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $dni = $_POST[ "dni" ];
        $this->_ver_asistencia = $this->loadModel( 'asistencia' );
        $ejecutar_ver = $this->_ver_asistencia->ver_programacion_mes( $mes, $anio, $dni );
        echo $ejecutar_ver;
    }




    public

    function buscar_por_nombre_tempus() {
        $nombres = $_POST[ "nombres" ];
        $this->_buscar_nombres_tempus = $this->loadModel( 'asistencia' );
        $buscar_y_traer_tempus = $this->_buscar_nombres_tempus->getListadoPersonalTempus( $nombres );
        echo $buscar_y_traer_tempus;

    }





    public

    function frecuencia_marcaciones() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_ver_frecuencia = $this->loadModel( 'asistencia' );
        $ver_frecuencia = $this->_ver_frecuencia->FrecuenciaMarcaciones( $mes, $anio );
        echo $ver_frecuencia;



    }


    public

    function ver_datos_por_dni() {
        $dni = $_POST[ "dni" ];
        $this->_ver_datos_dni = $this->loadModel( 'asistencia' );
        $ver_datos_dni = $this->_ver_datos_dni->ver_datos_dni( $dni );
        echo $ver_datos_dni;

    }


    public

    function ver_marcaciones_por_mes() {

        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->_ver_marcaciones = $this->loadModel( 'asistencia' );
        $ver_marcaciones_dni = $this->_ver_marcaciones->ver_marcaciones_dni( $dni, $mes, $anio );
        echo $ver_marcaciones_dni;

    }


    public

    function ver_detalle_dia() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $dia = $_POST[ "dia" ];
        $this->_ver_marcaciones_dia = $this->loadModel( 'asistencia' );
        $ver_marcaciones_dni_dia = $this->_ver_marcaciones_dia->VerMarcacionesDia( $dni, $mes, $anio, $dia );
        echo $ver_marcaciones_dni_dia;
    }



    public

    function grabar_seleccion_personal() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $nombres = $_POST[ "nombres" ];
        $tipo_asistencia = $_POST[ "tipo_asistencia" ];
        $cargo = $_POST[ "cargo" ];
        $fecha_marcacion = $_POST[ "fecha_marcacion" ];
        $marcacion = $_POST[ "marcacion" ];
        $this->grabar_personal = $this->loadModel( 'asistencia' );
        $ver_grabacion = $this->grabar_personal->EjecutarGrabarPersonalSeleccionado( $dni, $mes, $anio, $nombres, $tipo_asistencia, $cargo, $fecha_marcacion, $marcacion, $usuario );
        echo $ver_grabacion;
    }




    public

    function mostrar_personal_seleccion() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->seleccion_personal = $this->loadModel( 'asistencia' );
        $ver_seleccion = $this->seleccion_personal->SeleccionPersonal( $mes, $anio );
        echo $ver_seleccion;

    }

    public

    function eliminar_personal_seleccion() {
        $id = $_POST[ "id" ];
        $this->eliminar_personal = $this->loadModel( 'asistencia' );
        $eliminar_seleccion = $this->eliminar_personal->EliminarSeleccionPersonal( $id );
        echo $eliminar_seleccion;
    }




    public

    function verificar_procesamiento_administrativos() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }

        $this->verificar_proceso_descuento_admin = $this->loadModel( 'asistencia' );
        $verificar_proceso_descuento_admin = $this->verificar_proceso_descuento_admin->VerificarProcesoAdmin( $mes, $anio, $tipo );
        echo $verificar_proceso_descuento_admin;

    }




    public

    function visualizar_descuentos_administrativos()

    {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }

        $this->visualizar_proceso_descuento_admin = $this->loadModel( 'asistencia' );
        $visualiza_proceso_descuento_admin = $this->visualizar_proceso_descuento_admin->VisualizarDescuentoAdmin( $mes, $anio, $tipo );
        echo $visualiza_proceso_descuento_admin;

    }




    public

    function procesar_descuentos_administrativos() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->procesar_descuento_admin = $this->loadModel( 'asistencia' );
        $procesar_descuento_admin = $this->procesar_descuento_admin->IniciarProcesodescuentoAdministrativo( $mes, $anio, $tipo, $usuario );
        echo $procesar_descuento_admin;

    }




    public

    function ver_datos_asistencia_personal_administrativos() {
        $dni = $_POST[ "dni" ];
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $this->datos_asistencia_personal_administrativo = $this->loadModel( 'asistencia' );
        $datos_asistencia_admin = $this->datos_asistencia_personal_administrativo->VerAsistenciaPersonalAdministrativo( $dni, $mes, $anio );
        echo $datos_asistencia_admin;

    }



    public

    function grabar_data_tempus() {
        $dni = $_POST[ "dni" ];
        $cargo = $_POST[ "cargo" ];
        $lee_tipo = $_POST[ "tipo" ];
        switch ( $lee_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            default:
                $tipo = '';
                break;
        }

        $estado = $_POST[ "estado" ];
        $this->data_tempus = $this->loadModel( 'asistencia' );
        $data_tempu = $this->data_tempus->Grabar_data_personal_tempus( $cargo, $estado, $tipo, $dni );
        echo $data_tempu;

    }




    public

    function ver_ultima_marcacion_tempus() {
        $dni = $_POST[ "dni" ];
        $this->ultima_marcacion_data_tempus = $this->loadModel( 'asistencia' );
        $data_ultima_marcacion_tempu = $this->ultima_marcacion_data_tempus->Ver_Ultima_Marcacion( $dni );
        echo $data_ultima_marcacion_tempu;



    }


    public

    function no_marcan() {
        $this->_view->titulo = 'Personal que no Marcan segun cantidad de DIAS -  ' . INSTITUCION;
        $this->_view->setJs( array( 'no_marcan' ) );
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
                $this->_view->renderizar( 'no_marcan', false );
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

    function ver_no_marcaron() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $dia = $_POST[ "dia" ];
        $this->ver_no_marcacion = $this->loadModel( 'asistencia' );
        $ver_no_marcaron = $this->ver_no_marcacion->ver_no_marcacion( $mes, $anio, $dia );
        echo $ver_no_marcaron;



    }



    public

    function grabar_nuevo_descuento() {
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $dni = $_POST[ "dni" ];
        $tarde = $_POST[ "tarde" ];
        $falta = $_POST[ "falta" ];
        $antes_salida = $_POST[ "antes_salida" ];
        $exoneracion = $_POST[ "exoneracion" ];
        $descuento = $_POST[ "descuento" ];
        $this->proceder_descuento = $this->loadModel( 'asistencia' );
        $proceder_update_descuento = $this->proceder_descuento->Ejecutar_Update_Descuento( $dni, $tarde, $falta, $antes_salida, $exoneracion, $descuento, $usuario );
        echo $proceder_update_descuento;

    }




    public

    function verificar_proce_asistencial() {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }

        $this->verificar_proceso_descuento_asis = $this->loadModel( 'asistencia' );
        $verificar_proceso_descuento_asis = $this->verificar_proceso_descuento_asis->VerificarProcesoAsis( $mes, $anio, $tipo );
        echo $verificar_proceso_descuento_asis;

    }






    public
    function procesar_descuentos_asistencial() {

        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }
        $usuario = $_SESSION[ "usuario" ][ "dni" ];
        $this->procesar_descuento_asis = $this->loadModel( 'asistencia' );
        $procesar_descuento_asis = $this->procesar_descuento_asis->IniciarProcesodescuentoAsistencial( $mes, $anio, $tipo, $usuario );
        echo $procesar_descuento_asis;



    }

 


    public

    function visualizar_descuentos_asistencial()

    {
        $mes = $_POST[ "mes" ];
        $anio = $_POST[ "anio" ];
        $ver_tipo = $_POST[ "tipo" ];
        switch ( $ver_tipo ) {
            case 1:
                $tipo = 'A';
                break;
            case 2:
                $tipo = 'S';
                break;
            case 3:
                $tipo = 'C';
                break;
        }

        $this->visualizar_proceso_descuento_admin = $this->loadModel( 'asistencia' );
        $visualiza_proceso_descuento_admin = $this->visualizar_proceso_descuento_admin->VisualizarDescuentoAdmin( $mes, $anio, $tipo );
        echo $visualiza_proceso_descuento_admin;

    }

    
    
    
        
        
        
        
        
    
    




}
?>